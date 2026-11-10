import { ClarificationItem, GroundRules, ProjectState, TargetPlatform } from '../types/project';

const TIMEOUT_MS = 30000;

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
  return fetchWithTimeout<ExpandIdeaResponse>('/api/gemini/expand', params);
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
  return fetchWithTimeout<RandomIdeaResponse>('/api/gemini/random-idea', { categoryHint });
}

export interface GrillMeResponse {
  questions: ClarificationItem[];
}

export async function generateGrillQuestions(state: ProjectState): Promise<GrillMeResponse> {
  return fetchWithTimeout<GrillMeResponse>('/api/gemini/grill', {
    appName: state.appName,
    coreIdea: state.coreIdea,
    targetPlatform: state.targetPlatform,
    features: state.features,
    groundRules: state.groundRules,
  });
}
