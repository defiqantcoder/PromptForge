export type ComplexityMode = 'simple' | 'balanced' | 'pro';

export type TargetPlatform = 'desktop' | 'web' | 'mobile' | 'cli';

export type TaskSlicingMode = 'hitl-first' | 'balanced-slices' | 'afk-autonomous';

export type ExportPlatformId =
  | 'stitch'
  | 'aistudio'
  | 'antigravity'
  | 'copilot'
  | 'canvas';

export type SpecFileId = 'spec.md' | 'plan.md' | 'tasks.md' | 'AGENTS.md' | 'src-tauri/src/lib.rs';

export type FillableFieldId =
  | 'appName'
  | 'tagline'
  | 'coreIdea'
  | 'nextStep'
  | 'stackSummary'
  | 'architectureStyle'
  | 'testingStrategy'
  | 'securityBoundary'
  | 'templateVariable'
  | 'customRule';

export interface GroundRules {
  offlineFirst: boolean;
  highPerformance: boolean;
  localPrivacy: boolean;
  darkModeDefault: boolean;
}

export interface ClarificationItem {
  id: string;
  category: string;
  question: string;
  options: string[];
  selectedAnswer?: string;
}

export interface ProConfiguration {
  stackSummary: string;
  architectureStyle: string;
  testingStrategy: string;
  securityBoundary: string;
  taskSlicingMode: TaskSlicingMode;
  customRules: string[];
  templateVariables: Record<string, string>;
}

export interface ProjectState {
  id: string;
  appName: string;
  tagline: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
  proConfig: ProConfiguration;
  lastUpdated: string;
}

export interface StarterTemplate {
  id: string;
  name: string;
  badge: string;
  summary: string;
  state: Omit<ProjectState, 'lastUpdated'>;
}

export interface SaveBundleResult {
  saved: boolean;
  canonicalDir: string;
  filesWritten: Array<{
    name: string;
    bytes: number;
    sha256Preview: string;
  }>;
  mode: 'tauri-native' | 'browser-simulated';
  timestamp: string;
}
