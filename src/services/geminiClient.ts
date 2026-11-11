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

export async function generateMiniGrillQuestions(
  topic: MiniGrillTopic,
  state: ProjectState,
  images?: UploadedIdeaImage[]
): Promise<GrillMeResponse> {
  return postGemini<GrillMeResponse>('/api/gemini/mini-grill', {
    topic,
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    context: buildFullProjectContext(state),
    images: images && images.length > 0 ? images : undefined,
  });
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
