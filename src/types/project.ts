export type ComplexityMode = 'simple' | 'balanced' | 'pro';

export type TargetPlatform = 'desktop' | 'web' | 'mobile' | 'cli';

export type CodingLanguageId =
  | 'auto'
  | 'typescript-react'
  | 'rust-tauri'
  | 'python'
  | 'dart-flutter'
  | 'kotlin-android'
  | 'swift-ios'
  | 'go'
  | 'csharp-dotnet';

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
  | 'codingLanguageNote'
  | 'stackSummary'
  | 'architectureStyle'
  | 'testingStrategy'
  | 'securityBoundary'
  | 'templateVariable'
  | 'customRule'
  | 'stitchVisualDirection'
  | 'uploadedResultNotes';

export type MiniGrillTopic =
  | 'idea'
  | 'features'
  | 'groundRules'
  | 'codingLanguage'
  | 'proArch'
  | 'stitchUi';

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

export interface UploadedIdeaImage {
  id: string;
  name: string;
  mimeType: string;
  dataUrl: string;
}

export interface StitchUiConfig {
  visualDirection: string;
  uiClarifications: ClarificationItem[];
  ideaImages: UploadedIdeaImage[];
  uploadedResultName?: string;
  uploadedResultContent?: string;
  uploadedResultNotes?: string;
}

export interface WorkflowProgress {
  stitchDone: boolean;
  builderDone: boolean;
  polishDone: boolean;
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
  codingLanguage?: CodingLanguageId;
  codingLanguageNote?: string;
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
  stitchUi?: StitchUiConfig;
  workflowProgress?: WorkflowProgress;
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

export interface RecentBlueprintItem {
  id: string;
  name: string;
  badge: string;
  summary: string;
  savedAt: string;
  state: ProjectState;
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
