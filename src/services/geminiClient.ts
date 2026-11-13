import { invoke } from '@tauri-apps/api/core';
import {
  AiModelId,
  ClarificationItem,
  CodingLanguageId,
  FillableFieldId,
  GroundRules,
  MiniGrillTopic,
  ProjectState,
  TargetPlatform,
  UploadedIdeaImage,
} from '../types/project';
import { isTauriEnvironment } from './tauriBridge';

const TIMEOUT_MS = 30000;

function createVariationNonce(): number {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0];
  }
  return Date.now();
}

async function invokeTauriWithTimeout<T>(endpoint: string, payload: unknown): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      invoke<T>('gemini_proxy_request', { endpoint, payload }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new Error(
              'Gemini request timed out after 30 seconds. Your existing project text is untouched—please try again.'
            )
          );
        }, TIMEOUT_MS);
      }),
    ]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error(
      typeof err === 'string'
        ? err
        : 'Gemini request failed in desktop mode. Your active form text has been preserved.'
    );
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithTimeout<T>(url: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        data?.error || `Request failed with status ${response.status}. Your active form text has been preserved.`
      );
    }
    return data as T;
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error(
        'Gemini request timed out after 30 seconds. Your existing project text is untouched—please try again.'
      );
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function postGemini<T>(endpoint: string, body: unknown): Promise<T> {
  if (isTauriEnvironment()) {
    return invokeTauriWithTimeout<T>(endpoint, body);
  }
  return fetchWithTimeout<T>(endpoint, body);
}

export interface ExpandIdeaResponse {
  appName: string;
  tagline: string;
  expandedIdea: string;
  suggestedFeatures: string[];
}

export async function expandProjectIdea(params: {
  appName: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  features: string[];
  aiModel?: AiModelId;
}): Promise<ExpandIdeaResponse> {
  return postGemini<ExpandIdeaResponse>('/api/gemini/expand', params);
}

export interface RandomIdeaResponse {
  appName: string;
  tagline: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
  stackSummary: string;
  architectureStyle: string;
}

export async function generateRandomAppIdea(
  categoryHint?: string,
  aiModel?: AiModelId
): Promise<RandomIdeaResponse> {
  return postGemini<RandomIdeaResponse>('/api/gemini/random-idea', { categoryHint, aiModel });
}

export function buildFullProjectContext(state: ProjectState) {
  const stitch = state.stitchUi;
  return {
    appName: state.appName,
    tagline: state.tagline,
    coreIdea: state.coreIdea,
    targetPlatform: state.targetPlatform,
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    codingLanguage: state.codingLanguage ?? 'auto',
    codingLanguageNote: state.codingLanguageNote ?? '',
    features: state.features,
    groundRules: state.groundRules,
    clarifications: state.clarifications,
    proConfig: state.proConfig,
    stitchUi: {
      visualDirection: stitch?.visualDirection ?? '',
      uiClarifications: stitch?.uiClarifications ?? [],
      ideaImageNames: (stitch?.ideaImages ?? []).map((img) => img.name),
      screens: stitch?.screens ?? [],
      uploadedResultName: stitch?.uploadedResultName,
      uploadedResultContent: stitch?.uploadedResultContent,
      uploadedResultNotes: stitch?.uploadedResultNotes ?? '',
    },
    localAgents: state.localAgents,
    multiAgent: state.multiAgent,
    workflowPlan: state.workflowPlan ?? '',
    suggestedAppOverride: state.suggestedAppOverride,
    workflowProgress: state.workflowProgress ?? {
      stitchDone: false,
      builderDone: false,
      polishDone: false,
    },
  };
}

export interface GrillMeResponse {
  questions: ClarificationItem[];
}

export async function generateGrillQuestions(state: ProjectState): Promise<GrillMeResponse> {
  return postGemini<GrillMeResponse>('/api/gemini/grill', buildFullProjectContext(state));
}

export interface FillFieldResponse {
  value: string;
  secondaryValue?: string;
}

export async function fillFieldWithAi(
  field: FillableFieldId,
  state: ProjectState,
  options?: { currentValue?: string; variationNonce?: number }
): Promise<FillFieldResponse> {
  return postGemini<FillFieldResponse>('/api/gemini/fill-field', {
    field,
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    currentValue: options?.currentValue,
    variationNonce: options?.variationNonce ?? createVariationNonce(),
    context: buildFullProjectContext(state),
  });
}

function getFallbackMiniGrillQuestions(
  topic: MiniGrillTopic,
  state: ProjectState
): ClarificationItem[] {
  const app = state.appName || 'your application';
  switch (topic) {
    case 'stitchUi':
      return [
        {
          id: `mg-stitch-1-${Date.now()}`,
          category: 'Visual Layout Density',
          question: `How dense should the main screen layout and navigation feel for ${app}?`,
          options: [
            '(Recommended) Modern Airy Glassmorphic with sticky header and card padding',
            'Compact Data-Dense Grid with minimal whitespace and high information density',
            'Split-Pane Master-Detail View with collapsible navigation rail',
          ],
          selectedAnswer: '(Recommended) Modern Airy Glassmorphic with sticky header and card padding',
        },
        {
          id: `mg-stitch-2-${Date.now()}`,
          category: 'Color Accent Tone',
          question: `What primary mood and accent scheme should Google Stitch emphasize?`,
          options: [
            '(Recommended) Deep Twilight Night (#0F0C1B) with Electric Violet and Mint Green accents',
            'Cyberpunk Neon Dark (#0B0E14) with Cyan and Amber indicators',
            'Subtle Charcoal (#18181B) with Monochrome Slate and Purple highlights',
          ],
          selectedAnswer: '(Recommended) Deep Twilight Night (#0F0C1B) with Electric Violet and Mint Green accents',
        },
      ];
    case 'idea':
      return [
        {
          id: `mg-idea-1-${Date.now()}`,
          category: 'Primary User Persona',
          question: `Who is the primary daily user for ${app}?`,
          options: [
            '(Recommended) Solo technical developers and engineers building fast prototypes',
            'Non-technical product managers and creators designing workflows',
            'Distributed engineering teams coordinating multi-file codebases',
          ],
          selectedAnswer: '(Recommended) Solo technical developers and engineers building fast prototypes',
        },
        {
          id: `mg-idea-2-${Date.now()}`,
          category: 'Core Value Delivery',
          question: `What is the single most valuable moment for a user in ${app}?`,
          options: [
            '(Recommended) Instant generation of production-ready specification files and prompts',
            'Visual interactive preview and real-time design tweaking',
            'One-click export directly to the local filesystem with zero configuration',
          ],
          selectedAnswer: '(Recommended) Instant generation of production-ready specification files and prompts',
        },
      ];
    case 'features':
      return [
        {
          id: `mg-feat-1-${Date.now()}`,
          category: 'Interactive Flow',
          question: `How should users interact with key items and entries in ${app}?`,
          options: [
            '(Recommended) Quick inline edit with immediate optimistic local persistence',
            'Modal dialog drill-down with detailed field validation',
            'Command palette / keyboard shortcut driven navigation (Alt+1, Alt+2)',
          ],
          selectedAnswer: '(Recommended) Quick inline edit with immediate optimistic local persistence',
        },
        {
          id: `mg-feat-2-${Date.now()}`,
          category: 'Secondary Feature Expansion',
          question: `What secondary power capability should be enabled by default?`,
          options: [
            '(Recommended) One-click AI auto-fill for empty fields using context from all other sections',
            'History undo/redo snapshot stack for exploring prompt variations',
            'Side-by-side split screen diff comparison of generated prompt contracts',
          ],
          selectedAnswer: '(Recommended) One-click AI auto-fill for empty fields using context from all other sections',
        },
      ];
    case 'groundRules':
      return [
        {
          id: `mg-rules-1-${Date.now()}`,
          category: 'Local Storage Strategy',
          question: `How should state and preferences persist when the app closes?`,
          options: [
            '(Recommended) Local in-memory React state with debounced localStorage/disk write cache',
            'Strict atomic file transactions through native Rust IPC commands',
            'Pure ephemeral session memory with explicit user save triggers',
          ],
          selectedAnswer: '(Recommended) Local in-memory React state with debounced localStorage/disk write cache',
        },
        {
          id: `mg-rules-2-${Date.now()}`,
          category: 'Performance Baseline',
          question: `What latency target should all interactive controls uphold?`,
          options: [
            '(Recommended) Sub-200ms immediate UI response with tabular-nums metrics',
            'Strict 60 FPS GPU-accelerated compositing for all transitions and modals',
            'Background worker asynchronous processing with non-blocking progress spinners',
          ],
          selectedAnswer: '(Recommended) Sub-200ms immediate UI response with tabular-nums metrics',
        },
      ];
    case 'proArch':
      return [
        {
          id: `mg-arch-1-${Date.now()}`,
          category: 'Security & Path Boundary',
          question: `How should filesystem paths be validated for ${app}?`,
          options: [
            '(Recommended) Canonicalize paths in Rust/backend and reject parent directory traversal (..)',
            'Strictly whitelist approved export root directories in configuration',
            'Run file operations within an isolated sandbox workspace directory',
          ],
          selectedAnswer: '(Recommended) Canonicalize paths in Rust/backend and reject parent directory traversal (..)',
        },
        {
          id: `mg-arch-2-${Date.now()}`,
          category: 'Component Decomposition',
          question: `What modularity pattern should be enforced in AGENTS.md?`,
          options: [
            '(Recommended) Single-responsibility domain decks with shared typed contracts and services',
            'Atomic design hierarchy (atoms, molecules, organisms, templates)',
            'Layered clean architecture (presentation, application logic, infrastructure)',
          ],
          selectedAnswer: '(Recommended) Single-responsibility domain decks with shared typed contracts and services',
        },
      ];
    case 'workflow':
      return [
        {
          id: `mg-wf-1-${Date.now()}`,
          category: 'Build Tool Handoff',
          question: `What is the primary tool used after designing UI in Google Stitch?`,
          options: [
            '(Recommended) Google Antigravity (AGY) or Gemini CLI for multi-file terminal verification',
            'Google AI Studio for rapid React web preview and server-side routes',
            'Cursor / VS Code with Ollama + Continue for offline local editing',
          ],
          selectedAnswer: '(Recommended) Google Antigravity (AGY) or Gemini CLI for multi-file terminal verification',
        },
        {
          id: `mg-wf-2-${Date.now()}`,
          category: 'Verification Gate',
          question: `How should code completion be verified before concluding each task?`,
          options: [
            '(Recommended) Execute typecheck (tsc), production build, and unit tests after every edit',
            'Interactive visual inspection in live dev preview with console error checks',
            'Automated end-to-end smoke test suite executing critical user journeys',
          ],
          selectedAnswer: '(Recommended) Execute typecheck (tsc), production build, and unit tests after every edit',
        },
      ];
    case 'localAgents':
      return [
        {
          id: `mg-local-1-${Date.now()}`,
          category: 'Local Model Sizing',
          question: `Which Ollama model balance fits your local hardware profile?`,
          options: [
            '(Recommended) qwen2.5-coder:14b (Optimal balance of code reasoning and local VRAM speed)',
            'deepseek-coder-v2:16b (Deep multi-lingual architecture support for 16GB+ RAM)',
            'qwen2.5-coder:7b (Ultra-lightweight low-latency coder for standard laptops)',
          ],
          selectedAnswer: '(Recommended) qwen2.5-coder:14b (Optimal balance of code reasoning and local VRAM speed)',
        },
        {
          id: `mg-local-2-${Date.now()}`,
          category: 'Context Sizing',
          question: `What maximum context window should .continuerules allocate?`,
          options: [
            '(Recommended) 16,384 tokens with prompt caching enabled for file context',
            '32,768 tokens for full repository multi-file analysis',
            '8,192 tokens for maximum inference speed and lower memory pressure',
          ],
          selectedAnswer: '(Recommended) 16,384 tokens with prompt caching enabled for file context',
        },
      ];
    case 'multiAgent':
      return [
        {
          id: `mg-multi-1-${Date.now()}`,
          category: 'File Boundary Enforcement',
          question: `How should concurrent agent lanes avoid editing conflicts?`,
          options: [
            '(Recommended) Strict Work-On vs. Stay-Away path isolation with single-owner file boundaries',
            'Git branch-per-agent with automated rebasing and merge conflict alerts',
            'Shared interface contract locking where only the interface owner may modify signatures',
          ],
          selectedAnswer: '(Recommended) Strict Work-On vs. Stay-Away path isolation with single-owner file boundaries',
        },
        {
          id: `mg-multi-2-${Date.now()}`,
          category: 'Handoff Protocol',
          question: `What artifact signals that a lane task is completed and ready for integration?`,
          options: [
            '(Recommended) Passing test suite logs and an updated status flag in COLLABORATION.md',
            'A completed task checkbox with verified diff summary in tasks.md',
            'A Git commit hash tagged with the agent role identifier',
          ],
          selectedAnswer: '(Recommended) Passing test suite logs and an updated status flag in COLLABORATION.md',
        },
      ];
    case 'codingLanguage':
      return [
        {
          id: `mg-lang-1-${Date.now()}`,
          category: 'Tooling & Package Manager',
          question: `Which package manager and dependency strategy should be standardized?`,
          options: [
            '(Recommended) Standard npm/cargo lockfiles with pinned peer dependencies and zero audit warnings',
            'Modern pnpm workspace structure with strict hoisted monorepo boundaries',
            'Minimal zero-dependency core with selective high-reliability runtime crates',
          ],
          selectedAnswer: '(Recommended) Standard npm/cargo lockfiles with pinned peer dependencies and zero audit warnings',
        },
        {
          id: `mg-lang-2-${Date.now()}`,
          category: 'Compiler & Target Constraints',
          question: `What language edition and compatibility baseline should be enforced?`,
          options: [
            '(Recommended) Strict type checking (strict: true, noImplicitAny) with modern 2024/ESNext idioms',
            'Broad compatibility baseline supporting standard LTS enterprise runtimes',
            'Nightly / bleeding-edge compiler features with experimental flags guarded',
          ],
          selectedAnswer: '(Recommended) Strict type checking (strict: true, noImplicitAny) with modern 2024/ESNext idioms',
        },
      ];
    case 'exporter':
    default:
      return [
        {
          id: `mg-exp-1-${Date.now()}`,
          category: 'Export File Hierarchy',
          question: `Where should PromptForge save generated specification files?`,
          options: [
            '(Recommended) Root repository level (AGENTS.md, spec.md, plan.md, tasks.md, USER_GUIDE.md)',
            'Dedicated .specs/ directory to keep repository root uncluttered',
            'Centralized ~/Projects/promptforge-specs folder as a blueprint archive',
          ],
          selectedAnswer: '(Recommended) Root repository level (AGENTS.md, spec.md, plan.md, tasks.md, USER_GUIDE.md)',
        },
        {
          id: `mg-exp-2-${Date.now()}`,
          category: 'Prompt Contract Slicing',
          question: `How should target-specific prompts be generated?`,
          options: [
            '(Recommended) Tailored single-file contracts per tool (Google Stitch, Gemini CLI, AGY, AI Studio)',
            'One monolithic master prompt combining UI, backend, and testing instructions',
            'Modular multi-prompt sequence with interactive checkpoints between stages',
          ],
          selectedAnswer: '(Recommended) Tailored single-file contracts per tool (Google Stitch, Gemini CLI, AGY, AI Studio)',
        },
      ];
  }
}

export async function generateMiniGrillQuestions(
  topic: MiniGrillTopic,
  state: ProjectState,
  images?: UploadedIdeaImage[]
): Promise<GrillMeResponse> {
  try {
    const res = await postGemini<GrillMeResponse>('/api/gemini/mini-grill', {
      topic,
      aiModel: state.aiModel ?? 'gemini-3.8-flash',
      context: buildFullProjectContext(state),
      images: images && images.length > 0 ? images : undefined,
    });
    if (res && Array.isArray(res.questions) && res.questions.length > 0) {
      return res;
    }
  } catch (err) {
    // Fall back to contextual questions when offline or API call fails
    console.warn('Mini Grill remote call failed, using contextual fallback questions:', err);
  }
  return { questions: getFallbackMiniGrillQuestions(topic, state) };
}

export interface StitchSurpriseResponse {
  designConceptName: string;
  visualDirection: string;
  uiClarifications: ClarificationItem[];
}

export async function generateStitchSurprise(
  state: ProjectState,
  images?: UploadedIdeaImage[]
): Promise<StitchSurpriseResponse> {
  return postGemini<StitchSurpriseResponse>('/api/gemini/stitch-surprise', {
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    context: buildFullProjectContext(state),
    images: images && images.length > 0 ? images : state.stitchUi?.ideaImages,
  });
}

export interface LanguageComparison {
  language: string;
  bestFor: string;
  whyConsiderOrSkip: string;
}

export interface LanguageAdvisorResponse {
  recommendedId: CodingLanguageId;
  recommendedLabel: string;
  summary: string;
  tradeoffs: string;
  comparisons: LanguageComparison[];
}

export async function recommendCodingLanguage(
  state: ProjectState
): Promise<LanguageAdvisorResponse> {
  return postGemini<LanguageAdvisorResponse>('/api/gemini/recommend-language', {
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    context: buildFullProjectContext(state),
  });
}
