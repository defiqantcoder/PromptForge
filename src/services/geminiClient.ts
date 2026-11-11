import { invoke } from '@tauri-apps/api/core';
import { ClarificationItem, GroundRules, ProjectState, TargetPlatform } from '../types/project';
import { isTauriEnvironment } from './tauriBridge';

const TIMEOUT_MS = 30000;

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

export async function generateRandomAppIdea(categoryHint?: string): Promise<RandomIdeaResponse> {
  return postGemini<RandomIdeaResponse>('/api/gemini/random-idea', { categoryHint });
}

export interface GrillMeResponse {
  questions: ClarificationItem[];
}

export async function generateGrillQuestions(state: ProjectState): Promise<GrillMeResponse> {
  return postGemini<GrillMeResponse>('/api/gemini/grill', {
    appName: state.appName,
    coreIdea: state.coreIdea,
    targetPlatform: state.targetPlatform,
    features: state.features,
    groundRules: state.groundRules,
  });
}
