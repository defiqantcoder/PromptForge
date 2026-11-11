import React, { useRef } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Copy,
  Download,
  ExternalLink,
  FileCode2,
  FolderOutput,
  ImagePlus,
  Loader2,
  Palette,
  Rocket,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  ClarificationItem,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  UploadedIdeaImage,
  WorkflowProgress,
} from '../types/project';
import {
  compileAgentsMd,
  compilePlanMd,
  compilePlatformContract,
  compileSpecMd,
  compileTasksMd,
  recommendBuildWorkflow,
} from '../services/compiler';
import { DEFAULT_STITCH_UI } from '../services/presets';
import { FillFieldResponse } from '../services/geminiClient';
import { triggerBrowserFileDownload } from '../services/tauriBridge';
import { DeckCard } from '../components/Card';
import { CodeViewer } from '../components/CodeViewer';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface WorkflowDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFillField: (field: FillableFieldId) => Promise<FillFieldResponse | null>;
  fillingField: FillableFieldId | null;
  onMiniGrill: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic: MiniGrillTopic | null;
  onStitchSurprise: () => Promise<void>;
  isGeneratingSurprise: boolean;
  onOpenSaveModal: () => void;
  onUpdateVariable: (key: string, value: string) => void;
}

const DEFAULT_PROGRESS: WorkflowProgress = {
  stitchDone: false,
  builderDone: false,
  polishDone: false,
};

const TEXT_EXTENSIONS = new Set([
  'html',
  'htm',
  'txt',
  'md',
  'json',
  'svg',
  'css',
  'js',
  'ts',
  'tsx',
  'jsx',
]);

export function WorkflowDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  onStitchSurprise,
  isGeneratingSurprise,
  onOpenSaveModal,
  onUpdateVariable,
}: WorkflowDeckProps) {
  const ideaImageInputRef = useRef<HTMLInputElement>(null);
  const stitchResultInputRef = useRef<HTMLInputElement>(null);
  const [copiedMdKey, setCopiedMdKey] = React.useState<string | null>(null);

  const stitchUi = state.stitchUi ?? DEFAULT_STITCH_UI;
  const workflowProgress = state.workflowProgress ?? DEFAULT_PROGRESS;

  const workflow = recommendBuildWorkflow(state);
  const stitchContract = compilePlatformContract(state, 'stitch');

  const completedCount = [
    workflowProgress.stitchDone,
    workflowProgress.builderDone,
    workflowProgress.polishDone,
  ].filter(Boolean).length;

  const handleUploadIdeaImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const loaded = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<UploadedIdeaImage | null>((resolve) => {
            if (!file.type.startsWith('image/')) {
              resolve(null);
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                resolve({
                  id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                  name: file.name,
                  mimeType: file.type,
                  dataUrl: reader.result,
                });
              } else {
                resolve(null);
              }
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          })
      )
    );

    const validImages = loaded.filter((img): img is UploadedIdeaImage => img !== null);
    if (validImages.length === 0) return;

    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          ideaImages: [...currentStitch.ideaImages, ...validImages],
        },
        lastUpdated: new Date().toISOString(),
      };
    });

    if (ideaImageInputRef.current) {
      ideaImageInputRef.current.value = '';
    }
  };

  const handleRemoveIdeaImage = (imageId: string) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          ideaImages: currentStitch.ideaImages.filter((img) => img.id !== imageId),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleUploadStitchResult = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    const isTextLike = file.type.startsWith('text/') || TEXT_EXTENSIONS.has(ext);

    let contentText = '';
    if (isTextLike) {
      contentText = await file.text();
    } else if (file.type.startsWith('image/')) {
      contentText = `Uploaded visual UI screenshot from Google Stitch: ${file.name} (${Math.round(
        file.size / 1024
      )} KB). Match this visual layout, color hierarchy, and component placement when implementing.`;
    } else {
      contentText = `Uploaded Google Stitch export archive/file: ${file.name} (${Math.round(
        file.size / 1024
      )} KB).`;
    }

    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      const currentProgress = prev.workflowProgress ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          uploadedResultName: file.name,
          uploadedResultContent: contentText,
        },
        workflowProgress: {
          ...currentProgress,
          stitchDone: true,
        },
        lastUpdated: new Date().toISOString(),
      };
    });

    if (stitchResultInputRef.current) {
      stitchResultInputRef.current.value = '';
    }
  };

  const handleSelectUiClarification = (questionId: string, option: string) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          uiClarifications: currentStitch.uiClarifications.map((item) =>
            item.id === questionId ? { ...item, selectedAnswer: option } : item
          ),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyUiGrillDetail = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const detail = `${q.category}: ${clean}`;
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      if (currentStitch.visualDirection.includes(detail)) return prev;
      const sep = currentStitch.visualDirection.trim() ? '\n' : '';
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          visualDirection: `${currentStitch.visualDirection.trim()}${sep}${detail}`,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleCopyMarkdown = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMdKey(key);
      setTimeout(() => setCopiedMdKey(null), 1600);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const toggleStep = (step: 'stitchDone' | 'builderDone' | 'polishDone') => {
    onUpdate((prev) => {
      const currentProgress = prev.workflowProgress ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        workflowProgress: {
          ...currentProgress,
          [step]: !currentProgress[step],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const mdFiles: Array<{ filename: string; content: string }> = [
    { filename: 'AGENTS.md', content: compileAgentsMd(state) },
    { filename: 'spec.md', content: compileSpecMd(state) },
    { filename: 'plan.md', content: compilePlanMd(state) },
    { filename: 'tasks.md', content: compileTasksMd(state) },
  ];

  const anyBusy =
    Boolean(fillingField) ||
    miniGrillLoadingTopic === 'stitchUi' ||
    isGeneratingSurprise;

  return (
    <DeckCard
      id="deck-workflow"
      stepNumber="05."
      title="Guided Build Workflow & Google Stitch UI Studio"
      subtitle="Start by designing your interface in Google Stitch (with UI grilling, AI Surprise Me, and idea image uploads), upload what Stitch builds, and PromptForge picks your next tool and exact handoff prompt."
      tooltipKey="deck-workflow"
      headerRight={
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#34D399] tabular-nums">
          <span>{completedCount} of 3 build stages done</span>
          <HelpBadge tooltipKey="deck-workflow" />
        </span>
      }
    >
      <div className="space-y-6">
        {/* Stage 1: Google Stitch UI Studio */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleStep('stitchDone')}
                aria-label="Mark Step 1 Google Stitch done"
                className="text-[#A78BFA] hover:text-[#34D399] transition-colors cursor-pointer"
              >
                {workflowProgress.stitchDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA]">
                    Stage 1 · Design UI First
                  </span>
                  <HelpBadge tooltipKey="platform-stitch" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Google Stitch UI Designer Studio
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <MiniGrillButton
                label="Grill Me on UI Design"
                tooltipKey="stitch-ui-grill"
                loading={miniGrillLoadingTopic === 'stitchUi'}
                disabled={anyBusy && miniGrillLoadingTopic !== 'stitchUi'}
                onClick={() => void onMiniGrill('stitchUi')}
              />

              <span className="inline-flex items-center gap-1">
                <ExplainerTooltip tooltipKey="stitch-surprise-me" side="top">
                  <button
                    type="button"
                    onClick={() => void onStitchSurprise()}
                    disabled={isGeneratingSurprise}
                    className="pf-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingSurprise ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Palette className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isGeneratingSurprise ? 'Designing Mood...' : 'Surprise Me (AI UI)'}
                    </span>
                  </button>
                </ExplainerTooltip>
                <HelpBadge tooltipKey="stitch-surprise-me" />
              </span>
            </div>
          </div>

          {/* Upload Inspiration Images */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label="Upload Idea Images / Sketches / Screenshots"
                tooltipKey="stitch-image-upload"
              />
              <div>
                <input
                  ref={ideaImageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => void handleUploadIdeaImages(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => ideaImageInputRef.current?.click()}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5 text-[#D0BCFF]" />
                  <span>Upload Idea Images</span>
                </button>
              </div>
            </div>

            {stitchUi.ideaImages.length === 0 ? (
              <button
                type="button"
                onClick={() => ideaImageInputRef.current?.click()}
                className="w-full p-4 rounded-xl border border-dashed border-[#C084FC]/30 bg-[#141122]/60 hover:bg-[#19152B] text-center text-xs text-[#CBC3D7] transition-colors cursor-pointer"
              >
                Click to attach screenshots, doodles, or inspiration images (Gemini inspects them when you click Grill Me or Surprise Me)
              </button>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stitchUi.ideaImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative rounded-xl overflow-hidden border border-[#C084FC]/30 bg-[#0B0D12]"
                  >
                    <img
                      src={img.dataUrl}
                      alt={img.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="px-2 py-1 text-[10px] font-mono text-[#E9D5FF] truncate bg-[#131620]">
                      {img.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIdeaImage(img.id)}
                      aria-label={`Remove ${img.name}`}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/75 text-white hover:text-[#FFB4AB] cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* UI Design Grill Me Panel */}
          <MiniGrillPanel
            title="UI Design Decisions for Google Stitch"
            questions={stitchUi.uiClarifications}
            onSelectAnswer={handleSelectUiClarification}
            onApplyToSection={applyUiGrillDetail}
            onClose={() =>
              onUpdate((prev) => ({
                ...prev,
                stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), uiClarifications: [] },
              }))
            }
          />

          {/* Visual Direction Input */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label="Visual Direction & UI Notes for Stitch"
                tooltipKey="stitch-visual-direction"
                htmlFor="textarea-stitch-visual"
              />
              <FillWithAiButton
                fieldLabel="Visual Direction"
                loading={fillingField === 'stitchVisualDirection'}
                disabled={anyBusy && fillingField !== 'stitchVisualDirection'}
                onClick={() => void onFillField('stitchVisualDirection')}
              />
            </div>
            <textarea
              id="textarea-stitch-visual"
              rows={3}
              value={stitchUi.visualDirection}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  stitchUi: {
                    ...(prev.stitchUi ?? DEFAULT_STITCH_UI),
                    visualDirection: e.target.value,
                  },
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="Describe the screens, mood, colors, navigation style, or click Surprise Me / Fill with AI..."
              className="w-full p-3.5 rounded-xl bg-[#141122]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] resize-y"
            />
          </div>

          {/* Step 1A: Copy & Run in Google Stitch */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Step 1A · Paste this UI Design Prompt into Google Stitch</span>
                <HelpBadge tooltipKey="platform-stitch" />
              </span>
              <a
                href="https://stitch.withgoogle.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#D0BCFF] hover:text-white underline underline-offset-4"
              >
                <span>Open Google Stitch</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <CodeViewer
              filename="stitch-ui-prompt.txt"
              badgeLabel={stitchContract.badge}
              content={stitchContract.promptText}
              templateVariables={state.proConfig.templateVariables}
              onUpdateVariable={onUpdateVariable}
            />
          </div>

          {/* Step 1B: Upload Stitch Result */}
          <div className="p-4 rounded-xl bg-[#141122]/80 border border-[#34D399]/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label="Step 1B · Upload Your Google Stitch Result"
                tooltipKey="stitch-result-upload"
              />
              <div className="flex items-center gap-2">
                <input
                  ref={stitchResultInputRef}
                  type="file"
                  accept=".html,.htm,.txt,.md,.json,.svg,.tsx,.jsx,.css,.zip,image/*"
                  className="hidden"
                  onChange={(e) => void handleUploadStitchResult(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => stitchResultInputRef.current?.click()}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>
                    {stitchUi.uploadedResultName
                      ? `Replace (${stitchUi.uploadedResultName})`
                      : 'Upload Stitch Export / Screenshot'}
                  </span>
                </button>
              </div>
            </div>

            {stitchUi.uploadedResultName ? (
              <div className="p-3 rounded-lg bg-[#0B0D12] border border-[#34D399]/35 space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[#34D399]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Uploaded: {stitchUi.uploadedResultName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate((prev) => ({
                        ...prev,
                        stitchUi: {
                          ...(prev.stitchUi ?? DEFAULT_STITCH_UI),
                          uploadedResultName: undefined,
                          uploadedResultContent: undefined,
                        },
                      }))
                    }
                    className="text-[11px] text-[#958EA0] hover:text-[#FFB4AB] cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <p className="text-[11px] font-mono text-[#CBC3D7] line-clamp-3">
                  {stitchUi.uploadedResultContent}
                </p>
              </div>
            ) : (
              <p className="text-xs text-[#CBC3D7]">
                Or paste Stitch HTML/React output or notes below once Google Stitch generates your screens.
              </p>
            )}

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <LabelWithTooltip
                  label="Handoff Notes / Stitch Code Snippet (Optional)"
                  tooltipKey="stitch-result-upload"
                  htmlFor="textarea-stitch-handoff"
                />
                <FillWithAiButton
                  fieldLabel="Handoff Notes"
                  loading={fillingField === 'uploadedResultNotes'}
                  disabled={anyBusy && fillingField !== 'uploadedResultNotes'}
                  onClick={() => void onFillField('uploadedResultNotes')}
                />
              </div>
              <textarea
                id="textarea-stitch-handoff"
                rows={2}
                value={stitchUi.uploadedResultNotes ?? ''}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    stitchUi: {
                      ...(prev.stitchUi ?? DEFAULT_STITCH_UI),
                      uploadedResultNotes: e.target.value,
                    },
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                placeholder="Paste any HTML/React code, layout feedback, or interactive behavior notes to pass to the next app..."
                className="w-full p-3 rounded-lg bg-[#0B0D12]/90 border border-[#C084FC]/20 text-xs text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Stage 2: Recommended Next App & Compiled .md Files */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#5E6AD2]/35 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleStep('builderDone')}
                aria-label="Mark Step 2 Build Next App done"
                className="text-[#A78BFA] hover:text-[#34D399] transition-colors cursor-pointer"
              >
                {workflowProgress.builderDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#34D399]">
                    Stage 2 · Recommended Next App
                  </span>
                  <HelpBadge tooltipKey="workflow-next-app" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Open Next: {workflow.nextAppName}</span>
                  <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
                </h3>
              </div>
            </div>

            <a
              href={workflow.nextAppUrl}
              target="_blank"
              rel="noreferrer"
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium"
            >
              <Rocket className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Open {workflow.nextAppName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs leading-relaxed text-[#E2E8F0] bg-[#131620] p-3 rounded-lg border border-[#1D2230]">
            {workflow.whyRecommended}
          </p>

          <CodeViewer
            filename={`${workflow.nextAppId}-next-step-prompt.txt`}
            badgeLabel="Includes Stitch Result + Full Spec"
            content={workflow.nextPrompt}
            templateVariables={state.proConfig.templateVariables}
            onUpdateVariable={onUpdateVariable}
          />

          {/* Quick-Access Bundle Markdown Files */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <FileCode2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Specification Markdown Files to Drop into Your Repo</span>
                <HelpBadge tooltipKey="action-save-computer" />
              </span>
              <button
                type="button"
                onClick={onOpenSaveModal}
                className="pf-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
              >
                <FolderOutput className="w-3.5 h-3.5" />
                <span>Save All 4 .md Files to Computer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {mdFiles.map((file) => (
                <div
                  key={file.filename}
                  className="p-2.5 rounded-xl bg-[#131620] border border-[#1D2230] flex flex-col justify-between gap-2"
                >
                  <span className="text-xs font-mono font-semibold text-white">
                    {file.filename}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void handleCopyMarkdown(file.filename, file.content)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#0B0D12] hover:bg-[#1E2333] text-[11px] text-[#CBC3D7] hover:text-white cursor-pointer"
                    >
                      {copiedMdKey === file.filename ? (
                        <Check className="w-3 h-3 text-[#34D399]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedMdKey === file.filename ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        triggerBrowserFileDownload(file.filename, file.content)
                      }
                      aria-label={`Download ${file.filename}`}
                      className="p-1 rounded-md bg-[#0B0D12] hover:bg-[#1E2333] text-[#CBC3D7] hover:text-white cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage 3: Final Polish App */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#C084FC]/25 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleStep('polishDone')}
                aria-label="Mark Step 3 Polish done"
                className="text-[#A78BFA] hover:text-[#34D399] transition-colors cursor-pointer"
              >
                {workflowProgress.polishDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA]">
                    Stage 3 · Polish & Verify
                  </span>
                  <HelpBadge tooltipKey="platform-canvas" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Final Iteration & Polish in {workflow.polishAppName}
                </h3>
              </div>
            </div>
          </div>

          <CodeViewer
            filename={`${workflow.polishAppId}-polish-prompt.txt`}
            badgeLabel="Final Polish Contract"
            content={workflow.polishPrompt}
            templateVariables={state.proConfig.templateVariables}
            onUpdateVariable={onUpdateVariable}
          />
        </div>
      </div>
    </DeckCard>
  );
}
