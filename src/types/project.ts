export type ComplexityMode = 'simple' | 'balanced' | 'pro';

export type TargetPlatform = 'desktop' | 'web' | 'mobile' | 'cli';

export type AiModelId =
  | 'gemini-3.5-flash-lite'
  | 'gemini-3.6-flash'
  | 'gemini-3.8-flash'
  | 'gemini-3.1-pro-preview'
  | 'gemini-4-argon';

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
  | 'canvas'
  | 'local-ollama'
  | 'copilot';

export type SpecFileId =
  | 'spec.md'
  | 'plan.md'
  | 'tasks.md'
  | 'AGENTS.md'
  | 'COLLABORATION.md'
  | '.continuerules'
  | 'src-tauri/src/lib.rs';

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
  | 'stitchScreenNotes'
  | 'uploadedResultNotes'
  | 'localAgentNotes'
  | 'multiAgentProtocol';

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

export type StitchScreenKind = 'screen' | 'menu' | 'modal' | 'component';

export interface StitchScreenPrompt {
  id: string;
  name: string;
  kind: StitchScreenKind;
  notes: string;
}

export interface StitchUiConfig {
  visualDirection: string;
  uiClarifications: ClarificationItem[];
  ideaImages: UploadedIdeaImage[];
  screens?: StitchScreenPrompt[];
  uploadedResultName?: string;
  uploadedResultContent?: string;
  uploadedResultNotes?: string;
}

export interface WorkflowProgress {
  stitchDone: boolean;
  builderDone: boolean;
  polishDone: boolean;
}

export interface LocalAgentsConfig {
  enabled: boolean;
  provider: 'ollama' | 'continue' | 'both';
  ollamaModel: string;
  ollamaEndpoint: string;
  notes: string;
}

export interface AgentLane {
  id: string;
  agentName: string;
  focusArea: string;
  workOnPaths: string;
  stayAwayPaths: string;
  status: 'ready' | 'in-progress' | 'done';
  handoffNote: string;
}

export interface MultiAgentConfig {
  enabled: boolean;
  lanes: AgentLane[];
  sharedProtocolNotes: string;
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
  aiModel?: AiModelId;
  codingLanguage?: CodingLanguageId;
  codingLanguageNote?: string;
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
  stitchUi?: StitchUiConfig;
  workflowProgress?: WorkflowProgress;
  localAgents?: LocalAgentsConfig;
  multiAgent?: MultiAgentConfig;
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
