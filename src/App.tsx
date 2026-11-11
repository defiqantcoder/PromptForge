import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FileCode2,
  FileText,
  FolderKanban,
  HardDrive,
  KeyRound,
  Layers,
  Loader2,
  RotateCcw,
  Terminal,
  Wand2,
  X,
} from 'lucide-react';
import {
  AiModelId,
  ClarificationItem,
  ComplexityMode,
  ExportPlatformId,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  RecentBlueprintItem,
  SpecFileId,
  WorkstationPageId,
} from './types/project';
import {
  AI_MODELS,
  createInitialRecentBlueprints,
  DEFAULT_LOCAL_AGENTS,
  DEFAULT_MULTI_AGENT,
  DEFAULT_PROJECT_STATE,
  DEFAULT_STITCH_UI,
  FALLBACK_RANDOM_IDEAS,
  MAX_RECENT_BLUEPRINTS,
  upsertRecentBlueprint,
} from './services/presets';
import {
  compilePlatformContract,
  compileSpecFile,
} from './services/compiler';
import {
  expandProjectIdea,
  FillFieldResponse,
  fillFieldWithAi,
  generateGrillQuestions,
  generateMiniGrillQuestions,
  generateRandomAppIdea,
  generateStitchSurprise,
  LanguageAdvisorResponse,
  recommendCodingLanguage,
} from './services/geminiClient';
import { hasSecureKey, isTauriEnvironment } from './services/tauriBridge';
import { ModeSwitcher } from './components/ModeSwitcher';
import { ExplainerTooltip, HelpBadge } from './components/Tooltip';
import { CodeViewer } from './components/CodeViewer';
import { SaveModal } from './components/SaveModal';
import { KeyringModal } from './components/KeyringModal';
import { ManifestDeck } from './decks/ManifestDeck';
import { ArchitectureDeck } from './decks/ArchitectureDeck';
import { GrillDeck } from './decks/GrillDeck';
import { TasksDeck } from './decks/TasksDeck';
import { StitchStudioDeck } from './decks/StitchStudioDeck';
import { BuildStageDeck } from './decks/BuildStageDeck';
import { LocalAgentsDeck } from './decks/LocalAgentsDeck';
import { MultiAgentDeck } from './decks/MultiAgentDeck';
import { ExporterDeck } from './decks/ExporterDeck';

const STORAGE_KEY = 'promptforge_workstation_state_v1';
const MODE_STORAGE_KEY = 'promptforge_complexity_mode_v1';
const RECENT_BLUEPRINTS_KEY = 'promptforge_recent_blueprints_v1';

function mergeClarifications(
  existing: ClarificationItem[],
  incoming: ClarificationItem[]
): ClarificationItem[] {
  const result = [...existing];
  const seenQuestions = new Set(
    existing.map((q) => q.question.trim().toLowerCase())
  );
  const seenIds = new Set(existing.map((q) => q.id));

  for (const item of incoming) {
    const normalizedQ = item.question.trim().toLowerCase();
    if (!normalizedQ || seenQuestions.has(normalizedQ)) {
      continue;
    }
    const uniqueId = seenIds.has(item.id)
      ? `${item.id}-${result.length + 1}`
      : item.id;
    seenQuestions.add(normalizedQ);
    seenIds.add(uniqueId);
    result.push({
      ...item,
      id: uniqueId,
      selectedAnswer: item.selectedAnswer || item.options[0] || '',
    });
  }
  return result;
}

function getSecureRandomIndex(length: number): number {
  if (length <= 1) return 0;
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Date.now() % length;
}

function normalizeProjectState(raw: Partial<ProjectState> | null | undefined): ProjectState {
  if (!raw || typeof raw.appName !== 'string') {
    return DEFAULT_PROJECT_STATE;
  }
  return {
    ...DEFAULT_PROJECT_STATE,
    ...raw,
    workflowPlan: raw.workflowPlan ?? DEFAULT_PROJECT_STATE.workflowPlan ?? '',
    suggestedAppOverride: raw.suggestedAppOverride,
    aiModel: raw.aiModel ?? DEFAULT_PROJECT_STATE.aiModel ?? 'gemini-3.8-flash',
    codingLanguage: raw.codingLanguage ?? DEFAULT_PROJECT_STATE.codingLanguage,
    codingLanguageNote: raw.codingLanguageNote ?? '',
    groundRules: {
      ...DEFAULT_PROJECT_STATE.groundRules,
      ...(raw.groundRules ?? {}),
    },
    proConfig: {
      ...DEFAULT_PROJECT_STATE.proConfig,
      ...(raw.proConfig ?? {}),
    },
    stitchUi: {
      ...DEFAULT_STITCH_UI,
      ...(raw.stitchUi ?? {}),
      ideaImages: Array.isArray(raw.stitchUi?.ideaImages) ? raw.stitchUi.ideaImages : [],
      uiClarifications: Array.isArray(raw.stitchUi?.uiClarifications)
        ? raw.stitchUi.uiClarifications
        : [],
      screens: Array.isArray(raw.stitchUi?.screens) ? raw.stitchUi.screens : [],
    },
    localAgents: {
      ...DEFAULT_LOCAL_AGENTS,
      ...(raw.localAgents ?? {}),
    },
    multiAgent: {
      ...DEFAULT_MULTI_AGENT,
      ...(raw.multiAgent ?? {}),
      lanes: Array.isArray(raw.multiAgent?.lanes)
        ? raw.multiAgent.lanes
        : DEFAULT_MULTI_AGENT.lanes,
    },
    workflowProgress: {
      stitchDone:
        raw.workflowProgress?.stitchDone ??
        DEFAULT_PROJECT_STATE.workflowProgress?.stitchDone ??
        false,
      builderDone:
        raw.workflowProgress?.builderDone ??
        DEFAULT_PROJECT_STATE.workflowProgress?.builderDone ??
        false,
      polishDone:
        raw.workflowProgress?.polishDone ??
        DEFAULT_PROJECT_STATE.workflowProgress?.polishDone ??
        false,
    },
  };
}

export interface WorkstationPageConfig {
  id: WorkstationPageId;
  pageNumber: string;
  title: string;
  shortTitle: string;
  badge: string;
  tooltipKey: string;
  minMode?: ComplexityMode;
}

export const WORKSTATION_PAGES: WorkstationPageConfig[] = [
  {
    id: 'manifest',
    pageNumber: '01',
    title: '01. Manifest & Plain Language Ideas',
    shortTitle: '01. Manifest & Ideas',
    badge: 'Q1–Q4 Core Inputs',
    tooltipKey: 'page-manifest',
  },
  {
    id: 'architecture',
    pageNumber: '02',
    title: '02. Everyday Ground Rules & Quality Guardrails',
    shortTitle: '02. Ground Rules',
    badge: 'Guardrails & Principles',
    tooltipKey: 'page-architecture',
    minMode: 'balanced',
  },
  {
    id: 'grill',
    pageNumber: '03',
    title: '03. "Grill Me" — Dynamic Clarification Interview',
    shortTitle: '03. Grill Me Interview',
    badge: 'Q1–Q8 Interview',
    tooltipKey: 'page-grill',
    minMode: 'balanced',
  },
  {
    id: 'tasks',
    pageNumber: '04',
    title: '04. Pro Architect Controls, Task Slicing & AGENTS.md Sections',
    shortTitle: '04. Pro Controls & Tasks',
    badge: 'Tasks & Overrides',
    tooltipKey: 'page-tasks',
    minMode: 'pro',
  },
  {
    id: 'stitch',
    pageNumber: '05',
    title: '05. Guided Build Workflow & Google Stitch UI Studio',
    shortTitle: '05. Stitch UI Studio',
    badge: 'Stages 1a & 1b',
    tooltipKey: 'page-stitch',
  },
  {
    id: 'build-workflow',
    pageNumber: '06',
    title: 'Stage 2 — Next Build App & Full Workflow Plan',
    shortTitle: '06. Stage 2 Workflow',
    badge: 'Next App & Plan',
    tooltipKey: 'page-build-workflow',
  },
  {
    id: 'local-agents',
    pageNumber: '07',
    title: 'Optional · Local AI Agents (Ollama / Continue)',
    shortTitle: '07. Local AI Agents',
    badge: 'Offline Ollama',
    tooltipKey: 'page-local-agents',
  },
  {
    id: 'multi-agent',
    pageNumber: '08',
    title: 'Optional · Multi-Agent Coordination (COLLABORATION.md)',
    shortTitle: '08. Multi-Agent Board',
    badge: 'Lanes & Protocols',
    tooltipKey: 'page-multi-agent',
  },
  {
    id: 'exporter',
    pageNumber: '09',
    title: '06. Targeted Multi-Platform Contract Exporter',
    shortTitle: '09. Multi-Platform Exporter',
    badge: 'Targeted Prompts',
    tooltipKey: 'page-exporter',
  },
];

const SPEC_FILES: Array<{ id: SpecFileId; label: string; desc: string }> = [
  {
    id: 'AGENTS.md',
    label: 'AGENTS.md',
    desc: '10-section persistent AI coding instructions & repository rules',
  },
  {
    id: 'spec.md',
    label: 'spec.md',
    desc: 'Product objective, target users & EARS behavioral requirements',
  },
  {
    id: 'plan.md',
    label: 'plan.md',
    desc: 'Comprehensive architecture, domain models, IPC contracts & test matrix',
  },
  {
    id: 'tasks.md',
    label: 'tasks.md',
    desc: 'Ordered HITL/AFK implementation tasks & verification steps',
  },
  {
    id: 'COLLABORATION.md',
    label: 'COLLABORATION.md',
    desc: 'Multi-agent coordination board with Work-On vs. Stay-Away path lanes',
  },
  {
    id: '.continuerules',
    label: '.continuerules',
    desc: 'Optional offline local AI instructions for Ollama & Continue IDE',
  },
  {
    id: 'src-tauri/src/lib.rs',
    label: 'lib.rs',
    desc: 'Compiled Rust Tauri v2 command handlers with canonical path guard',
  },
];

const PLATFORM_TABS: Array<{ id: ExportPlatformId; label: string }> = [
  { id: 'stitch', label: 'Stitch' },
  { id: 'aistudio', label: 'AI Studio' },
  { id: 'antigravity', label: 'Antigravity' },
  { id: 'canvas', label: 'Canvas' },
  { id: 'local-ollama', label: 'Local AI' },
  { id: 'copilot', label: 'Copilot' },
];

export function App() {
  const [mode, setMode] = useState<ComplexityMode>(() => {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY);
      if (saved === 'simple' || saved === 'balanced' || saved === 'pro') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'balanced';
  });

  const [projectState, setProjectState] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return normalizeProjectState(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROJECT_STATE;
  });

  const [recentBlueprints, setRecentBlueprints] = useState<RecentBlueprintItem[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_BLUEPRINTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .slice(0, MAX_RECENT_BLUEPRINTS)
            .map((item: RecentBlueprintItem) => ({
              ...item,
              state: normalizeProjectState(item.state),
            }));
        }
      }
    } catch {
      // ignore storage errors
    }
    return createInitialRecentBlueprints();
  });

  const [previousSnapshot, setPreviousSnapshot] = useState<ProjectState | null>(null);
  const [activePage, setActivePage] = useState<WorkstationPageId>('manifest');
  const [inspectorMode, setInspectorMode] = useState<'files' | 'platforms'>('files');
  const [activeSpecFile, setActiveSpecFile] = useState<SpecFileId>('AGENTS.md');
  const [activePlatform, setActivePlatform] = useState<ExportPlatformId>('stitch');
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [keyringModalOpen, setKeyringModalOpen] = useState(false);
  const [hasDesktopKey, setHasDesktopKey] = useState(false);
  const isNativeDesktop = isTauriEnvironment();

  const currentPageIndex = Math.max(
    0,
    WORKSTATION_PAGES.findIndex((p) => p.id === activePage)
  );
  const currentPageConfig = WORKSTATION_PAGES[currentPageIndex] || WORKSTATION_PAGES[0];
  const prevPage = currentPageIndex > 0 ? WORKSTATION_PAGES[currentPageIndex - 1] : null;
  const nextPage =
    currentPageIndex < WORKSTATION_PAGES.length - 1
      ? WORKSTATION_PAGES[currentPageIndex + 1]
      : null;

  const goToPrevPage = () => {
    if (prevPage) {
      if (prevPage.minMode === 'balanced' && mode === 'simple') setMode('balanced');
      if (prevPage.minMode === 'pro' && mode !== 'pro') setMode('pro');
      setActivePage(prevPage.id);
    }
  };

  const goToNextPage = () => {
    if (nextPage) {
      if (nextPage.minMode === 'balanced' && mode === 'simple') setMode('balanced');
      if (nextPage.minMode === 'pro' && mode !== 'pro') setMode('pro');
      setActivePage(nextPage.id);
    }
  };

  useEffect(() => {
    if (!isNativeDesktop) return;
    hasSecureKey('gemini')
      .then(setHasDesktopKey)
      .catch(() => setHasDesktopKey(false));
  }, [isNativeDesktop]);

  // AI Loading & Toast States
  const [isExpanding, setIsExpanding] = useState(false);
  const isExpandingRef = useRef(false);
  isExpandingRef.current = isExpanding;
  const latestStateRef = useRef<ProjectState>(projectState);
  latestStateRef.current = projectState;
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [isGrilling, setIsGrilling] = useState(false);
  const [isAutoRefreshingGrill, setIsAutoRefreshingGrill] = useState(false);
  const [lastGrillSyncedAt, setLastGrillSyncedAt] = useState<string | null>(null);
  const [fillingField, setFillingField] = useState<FillableFieldId | null>(null);
  const [miniGrillLoadingTopic, setMiniGrillLoadingTopic] =
    useState<MiniGrillTopic | null>(null);
  const [miniGrillQuestions, setMiniGrillQuestions] = useState<
    Partial<Record<MiniGrillTopic, ClarificationItem[]>>
  >({});
  const [isGeneratingSurprise, setIsGeneratingSurprise] = useState(false);
  const [isRecommendingLanguage, setIsRecommendingLanguage] = useState(false);
  const [languageAdvice, setLanguageAdvice] = useState<LanguageAdvisorResponse | null>(null);
  const [bannerMessage, setBannerMessage] = useState<{
    type: 'success' | 'warning';
    text: string;
  } | null>(null);

  // Persist project state & maintain most recent 3 blueprints
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectState));
    } catch {
      // ignore quota errors
    }
    setRecentBlueprints((prev) => upsertRecentBlueprint(prev, projectState));
  }, [projectState]);

  useEffect(() => {
    try {
      localStorage.setItem(
        RECENT_BLUEPRINTS_KEY,
        JSON.stringify(recentBlueprints.slice(0, MAX_RECENT_BLUEPRINTS))
      );
    } catch {
      // ignore quota errors
    }
  }, [recentBlueprints]);

  useEffect(() => {
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  // Global keyboard shortcuts (Alt+1/2/3 for modes, Ctrl+Enter for Flesh Out)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        setMode('simple');
      } else if (e.altKey && e.key === '2') {
        e.preventDefault();
        setMode('balanced');
      } else if (e.altKey && e.key === '3') {
        e.preventDefault();
        setMode('pro');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFleshOutIdea();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  const showToast = (type: 'success' | 'warning', text: string) => {
    setBannerMessage({ type, text });
  };

  const handleUpdateVariable = (key: string, value: string) => {
    setProjectState((prev) => ({
      ...prev,
      proConfig: {
        ...prev.proConfig,
        templateVariables: {
          ...prev.proConfig.templateVariables,
          [key]: value,
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  // 1. Flesh Out My Idea with Gemini
  const handleFleshOutIdea = async () => {
    const currentState = latestStateRef.current;
    if (isExpandingRef.current) return;
    if (!currentState.coreIdea.trim()) {
      showToast(
        'warning',
        'Type at least a few words in "What is the big idea?" before clicking Flesh Out.'
      );
      return;
    }

    setIsExpanding(true);
    setBannerMessage(null);
    setPreviousSnapshot(currentState);

    try {
      const result = await expandProjectIdea({
        appName: currentState.appName,
        coreIdea: currentState.coreIdea,
        targetPlatform: currentState.targetPlatform,
        features: currentState.features,
        aiModel: currentState.aiModel,
      });

      setProjectState((prev) => ({
        ...prev,
        appName: result.appName || prev.appName,
        tagline: result.tagline || prev.tagline,
        coreIdea: result.expandedIdea || prev.coreIdea,
        features:
          Array.isArray(result.suggestedFeatures) && result.suggestedFeatures.length > 0
            ? result.suggestedFeatures
            : prev.features,
        lastUpdated: new Date().toISOString(),
      }));

      showToast(
        'success',
        `Expanded "${result.appName || currentState.appName}" into a complete product vision and ${
          result.suggestedFeatures?.length || currentState.features.length
        } user steps.`
      );
    } catch (err: any) {
      // Non-destructive fallback warning while retaining active form text
      showToast(
        'warning',
        err?.message ||
          'Gemini expansion encountered an interruption. Your original text is safely preserved.'
      );
    } finally {
      setIsExpanding(false);
    }
  };

  // 2. Generate Random App Idea with AI (with instant curated fallback if offline/key missing)
  const handleRandomAiIdea = async () => {
    if (isGeneratingRandom) return;
    setIsGeneratingRandom(true);
    setBannerMessage(null);
    setPreviousSnapshot(projectState);

    try {
      const result = await generateRandomAppIdea(undefined, projectState.aiModel);
      const validPlatform =
        result.targetPlatform === 'desktop' ||
        result.targetPlatform === 'web' ||
        result.targetPlatform === 'mobile' ||
        result.targetPlatform === 'cli'
          ? result.targetPlatform
          : 'desktop';

      setProjectState((prev) => ({
        ...prev,
        id: `ai-idea-${Date.now()}`,
        appName: result.appName,
        tagline: result.tagline,
        coreIdea: result.coreIdea,
        targetPlatform: validPlatform,
        features: result.features,
        groundRules: result.groundRules || prev.groundRules,
        clarifications:
          Array.isArray(result.clarifications) && result.clarifications.length > 0
            ? result.clarifications
            : prev.clarifications,
        proConfig: {
          ...prev.proConfig,
          stackSummary: result.stackSummary || prev.proConfig.stackSummary,
          architectureStyle: result.architectureStyle || prev.proConfig.architectureStyle,
          templateVariables: {
            ...prev.proConfig.templateVariables,
            export_dir: `~/Projects/${result.appName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-specs`,
          },
        },
        lastUpdated: new Date().toISOString(),
      }));

      showToast(
        'success',
        `Generated fresh AI app concept: "${result.appName}" — ${result.tagline}`
      );
    } catch {
      // Fallback to rich curated idea if offline so button always delights the user
      const fallback =
        FALLBACK_RANDOM_IDEAS[getSecureRandomIndex(FALLBACK_RANDOM_IDEAS.length)];
      setProjectState({
        ...fallback,
        aiModel: projectState.aiModel ?? 'gemini-3.8-flash',
        id: `curated-idea-${Date.now()}`,
        lastUpdated: new Date().toISOString(),
      });
      showToast(
        'success',
        `Loaded fresh app concept: "${fallback.appName}" — ${fallback.tagline}`
      );
    } finally {
      setIsGeneratingRandom(false);
    }
  };

  // 3. Socratic Interrogator ("Grill Me") — remembers old answers & appends 5 fresh questions
  const handleGrillMe = async () => {
    if (isGrilling) return;
    setIsGrilling(true);
    setBannerMessage(null);

    try {
      const result = await generateGrillQuestions(projectState);
      if (Array.isArray(result.questions) && result.questions.length > 0) {
        let addedCount = 0;
        setProjectState((prev) => {
          const merged = mergeClarifications(prev.clarifications, result.questions);
          addedCount = merged.length - prev.clarifications.length;
          return {
            ...prev,
            clarifications: merged,
            lastUpdated: new Date().toISOString(),
          };
        });
        setLastGrillSyncedAt(new Date().toISOString());
        showToast(
          'success',
          addedCount > 0
            ? `Added ${addedCount} new clarification questions while keeping all prior Q&A remembered.`
            : 'Refreshed clarifications; all generated topics are already answered above.'
        );
      }
    } catch (err: any) {
      showToast(
        'warning',
        err?.message ||
          'Could not generate new interview questions right now. Your existing clarification answers remain intact.'
      );
    } finally {
      setIsGrilling(false);
    }
  };

  const grillContextFingerprint = JSON.stringify({
    appName: projectState.appName,
    tagline: projectState.tagline,
    coreIdea: projectState.coreIdea,
    targetPlatform: projectState.targetPlatform,
    codingLanguage: projectState.codingLanguage,
    features: projectState.features,
    groundRules: projectState.groundRules,
  });
  const initialGrillFingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialGrillFingerprintRef.current === null) {
      initialGrillFingerprintRef.current = grillContextFingerprint;
      return;
    }
    if (initialGrillFingerprintRef.current === grillContextFingerprint) {
      return;
    }

    const snapState = latestStateRef.current;
    if (
      snapState.coreIdea.trim().length < 15 ||
      isGrilling ||
      isExpanding ||
      isGeneratingRandom
    ) {
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      if (cancelled) return;
      setIsAutoRefreshingGrill(true);
      try {
        const result = await generateGrillQuestions(latestStateRef.current);
        if (!cancelled && Array.isArray(result.questions) && result.questions.length > 0) {
          setProjectState((prev) => ({
            ...prev,
            clarifications: mergeClarifications(prev.clarifications, result.questions),
          }));
          setLastGrillSyncedAt(new Date().toISOString());
        }
      } catch {
        // Silent in background dynamic sync so offline usage shows no noisy errors
      } finally {
        if (!cancelled) setIsAutoRefreshingGrill(false);
      }
    }, 2200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [grillContextFingerprint, isExpanding, isGeneratingRandom, isGrilling]);

  // 4. Context-Aware Single-Field Fill with AI (unlimited runs per field)
  const handleFillField = async (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ): Promise<FillFieldResponse | null> => {
    if (fillingField === field) return null;
    setFillingField(field);
    setBannerMessage(null);

    try {
      const result = await fillFieldWithAi(field, projectState, {
        currentValue: options?.currentValue,
      });
      const val = result.value?.trim();
      if (!val) {
        showToast(
          'warning',
          'Gemini returned an empty suggestion. Your existing text is unchanged.'
        );
        return null;
      }

      const now = new Date().toISOString();
      if (
        field === 'appName' ||
        field === 'tagline' ||
        field === 'coreIdea' ||
        field === 'codingLanguageNote'
      ) {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({ ...prev, [field]: val, lastUpdated: now }));
      } else if (field === 'stitchVisualDirection') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), visualDirection: val },
          lastUpdated: now,
        }));
      } else if (field === 'uploadedResultNotes') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), uploadedResultNotes: val },
          lastUpdated: now,
        }));
      } else if (field === 'localAgentNotes') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          localAgents: { ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS), notes: val },
          lastUpdated: now,
        }));
      } else if (field === 'multiAgentProtocol') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          multiAgent: {
            ...(prev.multiAgent ?? DEFAULT_MULTI_AGENT),
            sharedProtocolNotes: val,
          },
          lastUpdated: now,
        }));
      } else if (
        field === 'stackSummary' ||
        field === 'architectureStyle' ||
        field === 'testingStrategy' ||
        field === 'securityBoundary'
      ) {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          proConfig: { ...prev.proConfig, [field]: val },
          lastUpdated: now,
        }));
      }

      showToast(
        'success',
        options?.currentValue?.trim()
          ? 'Refined field with a fresh AI variation—click again anytime for another pass.'
          : 'Filled field using context from all other filled sections.'
      );
      return result;
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not fill this field with AI right now. Your existing text is safely preserved.'
      );
      return null;
    } finally {
      setFillingField(null);
    }
  };

  // 5. Mini Grill Me for individual sections
  const handleMiniGrill = async (topic: MiniGrillTopic) => {
    if (miniGrillLoadingTopic) return;
    setMiniGrillLoadingTopic(topic);
    setBannerMessage(null);

    try {
      const images =
        topic === 'stitchUi' ? projectState.stitchUi?.ideaImages ?? [] : undefined;
      const res = await generateMiniGrillQuestions(topic, projectState, images);
      const qs = Array.isArray(res.questions) ? res.questions : [];
      if (topic === 'stitchUi') {
        setProjectState((prev) => ({
          ...prev,
          stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), uiClarifications: qs },
          lastUpdated: new Date().toISOString(),
        }));
      } else {
        setMiniGrillQuestions((prev) => ({ ...prev, [topic]: qs }));
      }
      showToast('success', 'Mini Grill questions ready—pick any option to add detail.');
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not generate Mini Grill questions right now.'
      );
    } finally {
      setMiniGrillLoadingTopic(null);
    }
  };

  const handleSelectMiniGrillAnswer = (
    topic: MiniGrillTopic,
    questionId: string,
    option: string
  ) => {
    setMiniGrillQuestions((prev) => ({
      ...prev,
      [topic]: (prev[topic] ?? []).map((q) =>
        q.id === questionId ? { ...q, selectedAnswer: option } : q
      ),
    }));
  };

  const handleDismissMiniGrill = (topic: MiniGrillTopic) => {
    setMiniGrillQuestions((prev) => {
      const next = { ...prev };
      delete next[topic];
      return next;
    });
  };

  // 6. Stitch UI "Surprise Me" (multimodal with ideaImages)
  const handleStitchSurprise = async () => {
    if (isGeneratingSurprise) return;
    setIsGeneratingSurprise(true);
    setBannerMessage(null);
    setPreviousSnapshot(projectState);

    try {
      const res = await generateStitchSurprise(
        projectState,
        projectState.stitchUi?.ideaImages ?? []
      );
      setProjectState((prev) => {
        const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
        return {
          ...prev,
          stitchUi: {
            ...currentStitch,
            visualDirection: res.visualDirection || currentStitch.visualDirection,
            uiClarifications:
              Array.isArray(res.uiClarifications) && res.uiClarifications.length > 0
                ? res.uiClarifications
                : currentStitch.uiClarifications,
          },
          lastUpdated: new Date().toISOString(),
        };
      });
      showToast(
        'success',
        `Generated Stitch UI concept: "${res.designConceptName || 'Visual Direction'}"`
      );
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not generate a Surprise Me UI direction right now.'
      );
    } finally {
      setIsGeneratingSurprise(false);
    }
  };

  // 7. Coding Language Advisor ("What's best for what?")
  const handleRecommendLanguage = async () => {
    if (isRecommendingLanguage) return;
    setIsRecommendingLanguage(true);
    setBannerMessage(null);

    try {
      const advice = await recommendCodingLanguage(projectState);
      setLanguageAdvice(advice);
      showToast(
        'success',
        `AI recommends ${advice.recommendedLabel} based on your app idea and target device.`
      );
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not run the AI Language Advisor right now.'
      );
    } finally {
      setIsRecommendingLanguage(false);
    }
  };

  const handleLoadBlueprint = (blueprintId: string) => {
    const found = recentBlueprints.find((b) => b.id === blueprintId);
    if (!found) return;
    setPreviousSnapshot(projectState);
    setLanguageAdvice(null);
    setProjectState(
      normalizeProjectState({
        ...found.state,
        lastUpdated: new Date().toISOString(),
      })
    );
    showToast('success', `Loaded blueprint: "${found.name}"`);
  };

  const handleClearCanvas = () => {
    setPreviousSnapshot(projectState);
    setLanguageAdvice(null);
    setProjectState({
      id: `blank-${Date.now()}`,
      appName: 'Untitled App',
      tagline: 'A clean-slate application specification.',
      coreIdea: '',
      targetPlatform: 'desktop',
      aiModel: projectState.aiModel ?? 'gemini-3.8-flash',
      codingLanguage: 'auto',
      codingLanguageNote: '',
      features: [
        'Open the main workspace and view a clear welcome state',
        'Create and save a new item with instant visual confirmation',
      ],
      groundRules: {
        offlineFirst: true,
        highPerformance: true,
        localPrivacy: true,
        darkModeDefault: true,
      },
      clarifications: [],
      proConfig: {
        ...DEFAULT_PROJECT_STATE.proConfig,
      },
      stitchUi: {
        ...DEFAULT_STITCH_UI,
      },
      localAgents: {
        ...DEFAULT_LOCAL_AGENTS,
      },
      multiAgent: {
        ...DEFAULT_MULTI_AGENT,
      },
      workflowProgress: {
        stitchDone: false,
        builderDone: false,
        polishDone: false,
      },
      lastUpdated: new Date().toISOString(),
    });
    showToast('success', 'Started a blank project canvas. Click "Undo" anytime to restore.');
  };

  const handleUndoSnapshot = () => {
    if (!previousSnapshot) return;
    setProjectState(previousSnapshot);
    setPreviousSnapshot(null);
    showToast('success', 'Restored previous project state.');
  };

  const activeFileContent = compileSpecFile(projectState, activeSpecFile);
  const activePlatformContract = compilePlatformContract(projectState, activePlatform);

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-[#E6DFF5] flex flex-col">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-5 py-3.5 bg-[#141120]/90 backdrop-blur-md border-b border-[#C084FC]/20">
        {/* Zone 1: Brand Wordmark + HelpBadge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap"
          >
            PromptForge
          </a>
          <HelpBadge tooltipKey="header-brand" side="bottom" />
        </div>

        {/* Zone 2: Concise navigation links + HelpBadge */}
        <nav
          aria-label="Workstation Sections"
          className="hidden lg:flex items-center gap-4 text-xs font-medium text-[#CBC3D7]"
        >
          <button
            type="button"
            onClick={() => setActivePage('manifest')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'manifest' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            01. Manifest
          </button>
          <button
            type="button"
            onClick={() => {
              if (mode === 'simple') setMode('balanced');
              setActivePage('architecture');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'architecture' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            02. Rules
          </button>
          <button
            type="button"
            onClick={() => {
              if (mode === 'simple') setMode('balanced');
              setActivePage('grill');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'grill' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            03. Grill Me
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('pro');
              setActivePage('tasks');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'tasks' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            04. Pro Tasks
          </button>
          <button
            type="button"
            onClick={() => setActivePage('stitch')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'stitch' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            05. Stitch UI
          </button>
          <button
            type="button"
            onClick={() => setActivePage('build-workflow')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'build-workflow' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            06. Stage 2
          </button>
          <button
            type="button"
            onClick={() => setActivePage('local-agents')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'local-agents' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            07. Local AI
          </button>
          <button
            type="button"
            onClick={() => setActivePage('multi-agent')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'multi-agent' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            08. Multi-Agent
          </button>
          <button
            type="button"
            onClick={() => setActivePage('exporter')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              activePage === 'exporter' ? 'text-white font-semibold underline underline-offset-4' : ''
            }`}
          >
            09. Exporters
          </button>
          <HelpBadge tooltipKey="header-nav" side="bottom" />
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <ExplainerTooltip tooltipKey="action-save-computer" side="bottom" align="end">
            <button
              type="button"
              onClick={() => setSaveModalOpen(true)}
              className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Save to Computer</span>
            </button>
          </ExplainerTooltip>
          <HelpBadge tooltipKey="action-save-computer" side="bottom" />
        </div>
      </header>

      {/* Workstation Control Sub-Bar (Breadcrumbs + Three-Tier Mode Switcher + Random AI Idea) */}
      <div className="px-5 py-3 bg-[#1D1929]/70 border-b border-[#C084FC]/15">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb & Active Spec Summary */}
          <div className="flex items-center gap-2 text-xs text-[#CBC3D7] min-w-0">
            <Terminal className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
            <span className="text-[#958EA0]">Ubuntu Workstation</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white truncate">
              {projectState.appName || 'Untitled Project'}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[#958EA0]">
              ·
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#34D399] tabular-nums">
              {projectState.features.length} features · {projectState.clarifications.length} clarifications
            </span>
          </div>

          {/* Center: Three-Tier Complexity Mode Switcher & AI Model Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <ModeSwitcher mode={mode} onChange={setMode} />

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0C1B]/90 border border-[#C084FC]/25">
              <Cpu className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
              <label htmlFor="select-ai-model" className="sr-only">
                AI Model
              </label>
              <select
                id="select-ai-model"
                value={projectState.aiModel ?? 'gemini-3.8-flash'}
                onChange={(e) => {
                  const nextModel = e.target.value as AiModelId;
                  setProjectState((prev) => ({
                    ...prev,
                    aiModel: nextModel,
                    lastUpdated: new Date().toISOString(),
                  }));
                }}
                className="bg-transparent text-xs font-medium text-[#E9D5FF] focus:outline-none cursor-pointer pr-1"
              >
                {AI_MODELS.map((m) => (
                  <option
                    key={m.id}
                    value={m.id}
                    className="bg-[#141122] text-white"
                  >
                    {m.label} ({m.speedTag})
                  </option>
                ))}
              </select>
              <HelpBadge tooltipKey="action-model-selector" side="bottom" />
            </div>

            <span className="inline-flex items-center gap-1">
              <ExplainerTooltip tooltipKey="action-random-ai" side="bottom">
                <button
                  type="button"
                  onClick={handleRandomAiIdea}
                  disabled={isGeneratingRandom}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingRandom ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EC4899]" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5 text-[#EC4899]" />
                  )}
                  <span>{isGeneratingRandom ? 'Generating...' : 'Random AI App Idea'}</span>
                </button>
              </ExplainerTooltip>
              <HelpBadge tooltipKey="action-random-ai" side="bottom" />
            </span>

            {isNativeDesktop && (
              <span className="inline-flex items-center gap-1">
                <ExplainerTooltip tooltipKey="action-keyring" side="bottom" align="end">
                  <button
                    type="button"
                    onClick={() => setKeyringModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      hasDesktopKey
                        ? 'bg-[#34D399]/10 border-[#34D399]/35 text-[#34D399] hover:bg-[#34D399]/20'
                        : 'bg-[#F59E0B]/15 border-[#F59E0B]/40 text-[#FDE68A] hover:bg-[#F59E0B]/25'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{hasDesktopKey ? 'Gemini Key Ready' : 'Set Gemini Key'}</span>
                  </button>
                </ExplainerTooltip>
                <HelpBadge tooltipKey="action-keyring" side="bottom" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Non-Destructive Feedback / Error Banner */}
      {bannerMessage && (
        <div className="px-5 pt-3">
          <div
            role="status"
            className={`max-w-[1440px] mx-auto px-4 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
              bannerMessage.type === 'success'
                ? 'bg-[#34D399]/10 border-[#34D399]/35 text-[#E6DFF5]'
                : 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#FFDAD6]'
            }`}
          >
            <div className="flex items-center gap-2">
              {bannerMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#FFB4AB] shrink-0" />
              )}
              <span>{bannerMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBannerMessage(null)}
              aria-label="Dismiss notification"
              className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main 3-Column Workstation Shell (1440px Desktop Baseline) */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 py-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Column 1: Left Recent Blueprints & Mode Guide Sidebar (3 cols on lg) */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-20">
          {/* Workstation Screen Navigator (Screens 01–09) */}
          <div className="pf-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <Layers className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Workstation Screens</span>
                <HelpBadge tooltipKey="page-nav" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#D0BCFF]">
                {currentPageIndex + 1} of 9
              </span>
            </div>
            <p className="text-[11px] text-[#CBC3D7] leading-relaxed">
              Every phase lives on its own dedicated screen:
            </p>
            <div className="space-y-1.5">
              {WORKSTATION_PAGES.map((page) => {
                const isActive = activePage === page.id;
                const isHiddenByMode =
                  (page.minMode === 'balanced' && mode === 'simple') ||
                  (page.minMode === 'pro' && mode !== 'pro');

                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => {
                      if (page.minMode === 'balanced' && mode === 'simple') {
                        setMode('balanced');
                      } else if (page.minMode === 'pro' && mode !== 'pro') {
                        setMode('pro');
                      }
                      setActivePage(page.id);
                    }}
                    className={`w-full px-2.5 py-2 rounded-xl text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                        : 'bg-[#0F0C1B]/60 border border-[#C084FC]/10 text-[#CBC3D7] hover:border-[#C084FC]/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                          isActive
                            ? 'bg-[#8B5CF6] text-white'
                            : 'bg-[#1D1929] text-[#A78BFA] border border-[#C084FC]/20'
                        }`}
                      >
                        {page.pageNumber}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-medium truncate">
                          {page.shortTitle}
                        </div>
                        {page.badge && (
                          <div className="text-[10px] text-[#A78BFA] truncate">
                            {page.badge}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isHiddenByMode && (
                        <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#958EA0]">
                          {page.minMode}+
                        </span>
                      )}
                      <HelpBadge tooltipKey={page.tooltipKey} side="right" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Starter Blueprints (Most Recent 3) */}
          <div className="pf-card rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <FolderKanban className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="text-xs font-semibold text-white">
                  Starter Blueprints
                </h3>
                <HelpBadge tooltipKey="sidebar-blueprints" />
              </div>
              <span className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  className="text-[11px] font-medium text-[#A78BFA] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  New Blank App
                </button>
                <HelpBadge tooltipKey="sidebar-new-blank" />
              </span>
            </div>

            <div className="text-[10.5px] font-mono text-[#A78BFA]">
              Most recent 3 blueprints
            </div>

            <div className="space-y-2">
              {recentBlueprints.slice(0, MAX_RECENT_BLUEPRINTS).map((bp) => {
                const active = projectState.id === bp.id;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    onClick={() => handleLoadBlueprint(bp.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                        : 'bg-[#0F0C1B]/75 border-[#C084FC]/15 text-[#CBC3D7] hover:border-[#C084FC]/35'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-white truncate">
                        {bp.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#A78BFA] shrink-0">
                        {new Date(bp.savedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A78BFA] mb-1">{bp.badge}</p>
                    <p className="text-[11px] text-[#CBC3D7] line-clamp-2 leading-snug">
                      {bp.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* AI Random Idea Spark Button */}
            <button
              type="button"
              onClick={handleRandomAiIdea}
              disabled={isGeneratingRandom}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#EC4899]/15 hover:bg-[#EC4899]/25 border border-[#EC4899]/35 text-xs font-semibold text-[#FFB0CD] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingRandom ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Wand2 className="w-3.5 h-3.5 text-[#EC4899]" />
              )}
              <span>
                {isGeneratingRandom ? 'Inventing Idea...' : 'Surprise Me (AI App Idea)'}
              </span>
            </button>

            {previousSnapshot && (
              <button
                type="button"
                onClick={handleUndoSnapshot}
                className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-medium text-[#CBC3D7] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restore Previous Project Snapshot</span>
              </button>
            )}
          </div>

          {/* Active Complexity Lens Summary */}
          <div className="pf-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <span>Active Complexity Lens</span>
                <HelpBadge tooltipKey="sidebar-complexity-lens" />
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#D0BCFF] capitalize">
                {mode} Mode
              </span>
            </div>

            <p className="text-xs text-[#CBC3D7] leading-relaxed">
              {mode === 'simple' &&
                'Showing the plain-English essentials (Idea, Device, Features, Language), Guided Build Workflow, and Multi-Platform Exporter.'}
              {mode === 'balanced' &&
                'Showing Manifest, Ground Rules, Dynamic "Grill Me" interview, Guided Build Workflow, and Multi-Platform Exporter.'}
              {mode === 'pro' &&
                'Showing all 6 decks including Pro AGENTS.md overrides, {{variable}} tokens, Guided Build Workflow, and Multi-Platform Exporter.'}
            </p>

            <div className="pt-2 border-t border-[#C084FC]/15 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>01. Project Manifest & Language</span>
                <span className="font-mono text-[#34D399]">Visible</span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>02. Everyday Ground Rules</span>
                <span
                  className={`font-mono ${
                    mode === 'simple' ? 'text-[#958EA0]' : 'text-[#34D399]'
                  }`}
                >
                  {mode === 'simple' ? 'Auto-Managed' : 'Visible'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>03. Dynamic Grill Me Interview</span>
                <span
                  className={`font-mono ${
                    mode === 'simple' ? 'text-[#958EA0]' : 'text-[#34D399]'
                  }`}
                >
                  {mode === 'simple' ? 'Auto-Managed' : 'Visible'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>04. Pro Tasks & AGENTS.md</span>
                <span
                  className={`font-mono ${
                    mode === 'pro' ? 'text-[#34D399]' : 'text-[#958EA0]'
                  }`}
                >
                  {mode === 'pro' ? 'Visible' : 'Auto-Managed'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>05. Guided Workflow & Stitch</span>
                <span className="font-mono text-[#34D399]">Visible</span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>06. Platform Exporter</span>
                <span className="font-mono text-[#34D399]">Visible</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Column 2: Central Dedicated Workstation Screen (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Screen Pagination & Fast Step Navigation Bar */}
          <div className="pf-card rounded-2xl p-3 sm:p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={goToPrevPage}
                  disabled={currentPageIndex === 0}
                  className="pf-btn-secondary inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous Screen"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Step Pills 01-09 */}
                <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                  {WORKSTATION_PAGES.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => {
                        if (page.minMode === 'balanced' && mode === 'simple') setMode('balanced');
                        if (page.minMode === 'pro' && mode !== 'pro') setMode('pro');
                        setActivePage(page.id);
                      }}
                      className={`w-7 h-7 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                        activePage === page.id
                          ? 'bg-[#8B5CF6] text-white shadow-md'
                          : 'bg-[#0F0C1B] border border-[#C084FC]/15 text-[#CBC3D7] hover:text-white hover:border-[#C084FC]/35'
                      }`}
                      title={page.title}
                    >
                      {page.pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPageIndex === WORKSTATION_PAGES.length - 1}
                  className="pf-btn-secondary inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next Screen"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-mono text-[#D0BCFF] px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40">
                  Screen {currentPageConfig.pageNumber} of 09
                </span>
                <HelpBadge tooltipKey={currentPageConfig.tooltipKey} />
              </div>
            </div>

            <div className="pt-2 border-t border-[#C084FC]/15 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-white truncate">
                  {currentPageConfig.title}
                </h2>
                <p className="text-[11px] text-[#A78BFA] truncate">
                  {currentPageConfig.badge}
                </p>
              </div>
            </div>
          </div>

          {/* Simple Mode Switch Banner for higher screens */}
          {mode === 'simple' &&
            (activePage === 'architecture' || activePage === 'grill' || activePage === 'tasks') && (
              <div className="pf-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white">
                    This screen is typically auto-managed in Simple Mode.
                  </div>
                  <div className="text-[11px] text-[#CBC3D7]">
                    Switch to Balanced or Pro Mode to customize ground rules and pro architect controls.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMode(activePage === 'tasks' ? 'pro' : 'balanced')}
                  className="pf-btn-secondary px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Switch to {activePage === 'tasks' ? 'Pro' : 'Balanced'} Mode
                </button>
              </div>
            )}

          {/* Screen 01: Manifest & Plain Language Ideas (Q1-Q4) */}
          {activePage === 'manifest' && (
            <ManifestDeck
              state={projectState}
              onUpdate={setProjectState}
              onFleshOutIdea={handleFleshOutIdea}
              onRandomAiIdea={handleRandomAiIdea}
              onFillField={handleFillField}
              fillingField={fillingField}
              isExpanding={isExpanding}
              isGeneratingRandom={isGeneratingRandom}
              canUndoExpansion={Boolean(previousSnapshot)}
              onUndoExpansion={handleUndoSnapshot}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
              onRecommendLanguage={handleRecommendLanguage}
              isRecommendingLanguage={isRecommendingLanguage}
              languageAdvice={languageAdvice}
            />
          )}

          {/* Screen 02: Everyday Ground Rules & Quality Guardrails */}
          {activePage === 'architecture' && (
            <ArchitectureDeck
              state={projectState}
              onUpdate={setProjectState}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
            />
          )}

          {/* Screen 03: Dynamic Grill Me Clarification Interview (Q1-Q8) */}
          {activePage === 'grill' && (
            <GrillDeck
              state={projectState}
              onUpdate={setProjectState}
              onGrillMe={handleGrillMe}
              isGrilling={isGrilling}
              isAutoRefreshing={isAutoRefreshingGrill}
              lastSyncedAt={lastGrillSyncedAt}
            />
          )}

          {/* Screen 04: Pro Architect Controls, Task Slicing & AGENTS.md Sections */}
          {activePage === 'tasks' && (
            <TasksDeck
              state={projectState}
              onUpdate={setProjectState}
              onFillField={handleFillField}
              fillingField={fillingField}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
            />
          )}

          {/* Screen 05: Guided Build Workflow & Google Stitch UI Studio (Stages 1a-1b) */}
          {activePage === 'stitch' && (
            <StitchStudioDeck
              state={projectState}
              onUpdate={setProjectState}
              onFillField={handleFillField}
              fillingField={fillingField}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              onStitchSurprise={handleStitchSurprise}
              isGeneratingSurprise={isGeneratingSurprise}
            />
          )}

          {/* Screen 06: Stage 2 — Next Build App & Full Workflow Plan */}
          {activePage === 'build-workflow' && (
            <BuildStageDeck
              state={projectState}
              onUpdate={setProjectState}
              onFillField={handleFillField}
              fillingField={fillingField}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
              onOpenSaveModal={() => setSaveModalOpen(true)}
            />
          )}

          {/* Screen 07: Optional · Local AI Agents (Ollama / Continue) */}
          {activePage === 'local-agents' && (
            <LocalAgentsDeck
              state={projectState}
              onUpdate={setProjectState}
              onFillField={handleFillField}
              fillingField={fillingField}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
            />
          )}

          {/* Screen 08: Optional · Multi-Agent Coordination (COLLABORATION.md) */}
          {activePage === 'multi-agent' && (
            <MultiAgentDeck
              state={projectState}
              onUpdate={setProjectState}
              onFillField={handleFillField}
              fillingField={fillingField}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
            />
          )}

          {/* Screen 09: Targeted Multi-Platform Contract Exporter */}
          {activePage === 'exporter' && (
            <ExporterDeck
              state={projectState}
              onOpenSaveModal={() => setSaveModalOpen(true)}
              onUpdateVariable={handleUpdateVariable}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
            />
          )}

          {/* Bottom Screen Pagination Footer */}
          <div className="pf-card rounded-2xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
            {prevPage ? (
              <button
                type="button"
                onClick={goToPrevPage}
                className="pf-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back: {prevPage.shortTitle}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="text-xs font-mono text-[#CBC3D7] flex items-center gap-1.5">
              <span>Screen {currentPageConfig.pageNumber} of 09:</span>
              <span className="text-[#8B5CF6] font-semibold">{currentPageConfig.shortTitle}</span>
            </div>

            {nextPage ? (
              <button
                type="button"
                onClick={goToNextPage}
                className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <span>Next: {nextPage.shortTitle}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSaveModalOpen(true)}
                className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <HardDrive className="w-4 h-4" />
                <span>Save Blueprint & Export</span>
              </button>
            )}
          </div>
        </div>

        {/* Column 3: Right Inspector Panel — Live Specification & Platform Compiler (4 cols on lg) */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <div className="pf-card rounded-2xl p-4 space-y-4">
            {/* Inspector Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#C084FC]/15">
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold text-white tracking-tight">
                    Live Contract Compiler
                  </h2>
                  <HelpBadge tooltipKey="inspector-compiler" />
                </div>
                <p className="text-[11px] text-[#CBC3D7]">
                  Real-time synthesis of specification files & platform prompts
                </p>
              </div>

              {/* Switch between Spec Files and Platform Contracts */}
              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20">
                <button
                  type="button"
                  onClick={() => setInspectorMode('files')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    inspectorMode === 'files'
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-[#CBC3D7] hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Spec Files</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorMode('platforms')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    inspectorMode === 'platforms'
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-[#CBC3D7] hover:text-white'
                  }`}
                >
                  <FileCode2 className="w-3 h-3" />
                  <span>Platforms</span>
                </button>
              </div>
            </div>

            {inspectorMode === 'files' ? (
              <div className="space-y-3">
                {/* Spec File Selector Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {SPEC_FILES.map((file) => {
                    const active = activeSpecFile === file.id;
                    return (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => setActiveSpecFile(file.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6] text-white font-semibold'
                            : 'bg-[#0F0C1B]/80 border border-[#C084FC]/15 text-[#CBC3D7] hover:text-white'
                        }`}
                      >
                        {file.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-[#A78BFA]">
                  {SPEC_FILES.find((f) => f.id === activeSpecFile)?.desc}
                </p>

                <CodeViewer
                  filename={activeSpecFile}
                  content={activeFileContent}
                  badgeLabel="Auto-Compiled"
                  templateVariables={projectState.proConfig.templateVariables}
                  onUpdateVariable={handleUpdateVariable}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Platform Contract Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {PLATFORM_TABS.map((plat) => {
                    const active = activePlatform === plat.id;
                    return (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => setActivePlatform(plat.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6] text-white font-semibold'
                            : 'bg-[#0F0C1B]/80 border border-[#C084FC]/15 text-[#CBC3D7] hover:text-white'
                        }`}
                      >
                        {plat.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-[#A78BFA]">
                  {activePlatformContract.subtitle}
                </p>

                <CodeViewer
                  filename={`${projectState.appName
                    .toLowerCase()
                    .replace(/\s+/g, '-')}-${activePlatform}.md`}
                  content={activePlatformContract.promptText}
                  badgeLabel={activePlatformContract.badge}
                  templateVariables={projectState.proConfig.templateVariables}
                  onUpdateVariable={handleUpdateVariable}
                />
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Simulated Ubuntu Directory Picker & Save Bundle Modal */}
      <SaveModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        state={projectState}
      />

      {isNativeDesktop && (
        <KeyringModal
          open={keyringModalOpen}
          onOpenChange={setKeyringModalOpen}
          hasKey={hasDesktopKey}
          onSaved={() => {
            setHasDesktopKey(true);
            showToast('success', 'Gemini API key saved securely to your desktop keyring.');
          }}
        />
      )}
    </div>
  );
}

export default App;
