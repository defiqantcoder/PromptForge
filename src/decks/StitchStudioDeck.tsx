import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Circle,
  Copy,
  ExternalLink,
  ImagePlus,
  LayoutGrid,
  Loader2,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  ClarificationItem,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  StitchScreenPrompt,
  UploadedIdeaImage,
} from '../types/project';
import {
  compilePlatformContract,
  compileStitchScreenPrompt,
} from '../services/compiler';
import { DEFAULT_STITCH_UI } from '../services/presets';
import { FillFieldResponse } from '../services/geminiClient';
import { DeckCard } from '../components/Card';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface StitchStudioDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFillField: (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ) => Promise<FillFieldResponse | null>;
  fillingField: FillableFieldId | null;
  onMiniGrill: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic: MiniGrillTopic | null;
  onStitchSurprise: () => Promise<void>;
  isGeneratingSurprise: boolean;
}

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

function IdeaImageThumb({ dataUrl, name }: { dataUrl: string; name: string }) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const match = dataUrl
      .trim()
      .match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)$/i);
    if (!match) {
      setObjectUrl(null);
      return;
    }
    const subtype = match[1].toLowerCase() === 'jpg' ? 'jpeg' : match[1].toLowerCase();
    try {
      const binary = atob(match[2]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: `image/${subtype}` });
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } catch {
      setObjectUrl(null);
      return undefined;
    }
  }, [dataUrl]);

  if (!objectUrl) {
    return (
      <div className="w-full h-24 flex items-center justify-center text-[10px] text-[#958EA0] bg-[#141122]">
        Preview unavailable
      </div>
    );
  }

  return <img src={objectUrl} alt={name} className="w-full h-24 object-cover" />;
}

function generateSafeId(prefix: string): string {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

export function StitchStudioDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  onStitchSurprise,
  isGeneratingSurprise,
}: StitchStudioDeckProps) {
  const ideaImageInputRef = useRef<HTMLInputElement>(null);
  const stitchResultInputRef = useRef<HTMLInputElement>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedScreenId, setCopiedScreenId] = useState<string | null>(null);
  const [fillingScreenId, setFillingScreenId] = useState<string | null>(null);

  const stitchUi = state.stitchUi ?? DEFAULT_STITCH_UI;
  const stitchScreens = stitchUi.screens ?? [];
  const stitchContract = compilePlatformContract(state, 'stitch');

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
                  id: generateSafeId(`img-${file.name.replace(/[^a-z0-9]/gi, '')}`),
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

  const handleAddStitchScreen = () => {
    const newScreen: StitchScreenPrompt = {
      id: generateSafeId('screen'),
      name: `Screen ${stitchScreens.length + 1}`,
      kind: 'screen',
      notes: '',
    };
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          screens: [...(currentStitch.screens ?? []), newScreen],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleUpdateStitchScreen = (
    screenId: string,
    patch: Partial<StitchScreenPrompt>
  ) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          screens: (currentStitch.screens ?? []).map((item) =>
            item.id === screenId ? { ...item, ...patch } : item
          ),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleRemoveStitchScreen = (screenId: string) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          screens: (currentStitch.screens ?? []).filter((item) => item.id !== screenId),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleFillStitchScreen = async (screen: StitchScreenPrompt) => {
    setFillingScreenId(screen.id);
    try {
      const res = await onFillField('stitchScreenNotes', {
        currentValue: `${screen.name} (${screen.kind}): ${screen.notes}`,
      });
      if (res?.value) {
        handleUpdateStitchScreen(screen.id, { notes: res.value });
      }
    } finally {
      setFillingScreenId(null);
    }
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
      const currentProgress = prev.workflowProgress ?? {
        stitchDone: false,
        builderDone: false,
        polishDone: false,
      };
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

  const handleCopyStitchPrompt = async () => {
    try {
      await navigator.clipboard.writeText(stitchContract.promptText);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1600);
    } catch {
      // ignore
    }
  };

  const handleCopySingleScreen = async (screen: StitchScreenPrompt) => {
    try {
      const text = compileStitchScreenPrompt(state, screen);
      await navigator.clipboard.writeText(text);
      setCopiedScreenId(screen.id);
      setTimeout(() => setCopiedScreenId(null), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <DeckCard
      id="deck-stitch"
      stepNumber="05."
      title="Guided Build Workflow & Google Stitch UI Studio"
      subtitle="Design your visual screens, glassmorphic layout, and component hierarchy in Google Stitch first with UI grilling and AI Surprise Me ideas."
      tooltipKey="deck-workflow"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#34D399] tabular-nums">
            <span>Stage 1a–1b UI Studio</span>
            <HelpBadge tooltipKey="platform-stitch" />
          </span>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Stage 1a: Design UI First in Google Stitch */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#8B5CF6]/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                  Stage 1a · Visual Direction
                </span>
                <HelpBadge tooltipKey="platform-stitch" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Google Stitch Visual Direction & Concept Studio
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <MiniGrillButton
                label="Grill Me on UI Design"
                tooltipKey="stitch-ui-grill"
                loading={miniGrillLoadingTopic === 'stitchUi'}
                disabled={Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'stitchUi'}
                onClick={() => void onMiniGrill('stitchUi')}
              />

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
            </div>
          </div>

          {/* Visual Direction Text Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Visual Direction & Layout Notes"
                tooltipKey="stitch-visual-direction"
                htmlFor="textarea-visual-direction"
              />
              <FillWithAiButton
                fieldLabel="Visual Direction"
                loading={fillingField === 'stitchVisualDirection'}
                disabled={fillingField === 'stitchVisualDirection'}
                onClick={() =>
                  void onFillField('stitchVisualDirection', {
                    currentValue: stitchUi.visualDirection,
                  })
                }
              />
            </div>
            <textarea
              id="textarea-visual-direction"
              rows={4}
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
              placeholder="Describe colors (e.g., deep night-violet #0F0C1B with electric purple pills), layout density, glass cards, and hierarchy..."
              className="w-full p-4 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] leading-relaxed"
            />
          </div>

          {/* Upload Reference Images for UI Ideas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Reference Images for UI Ideas"
                tooltipKey="stitch-image-upload"
              />
              <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                {stitchUi.ideaImages.length} images attached
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => ideaImageInputRef.current?.click()}
                className="pf-btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <ImagePlus className="w-4 h-4 text-[#A78BFA]" />
                <span>Upload Reference Images</span>
              </button>
              <HelpBadge tooltipKey="stitch-image-upload" />
              <input
                ref={ideaImageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => void handleUploadIdeaImages(e.target.files)}
                className="hidden"
              />
              <span className="text-xs text-[#CBC3D7]">
                Screenshots, wireframes, and moodboard images feed directly into UI Grill Me & Surprise Me.
              </span>
            </div>

            {stitchUi.ideaImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {stitchUi.ideaImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative rounded-xl border border-[#C084FC]/30 overflow-hidden bg-[#141120] group"
                  >
                    <IdeaImageThumb dataUrl={img.dataUrl} name={img.name} />
                    <div className="p-2 flex items-center justify-between gap-1 text-[11px] text-white bg-[#0F0C1B]/90">
                      <span className="truncate">{img.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIdeaImage(img.id)}
                        className="text-[#958EA0] hover:text-[#FFB4AB] transition-colors p-1"
                        aria-label={`Remove image ${img.name}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row: Copy Stitch Prompt & Launch Google Stitch */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyStitchPrompt}
              className="pf-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-4 h-4 text-[#34D399]" />
                  <span>Copied Stitch UI Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Google Stitch UI Prompt</span>
                </>
              )}
            </button>

            <a
              href="https://stitch.withgoogle.com/"
              target="_blank"
              rel="noreferrer"
              className="pf-btn-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium cursor-pointer"
            >
              <span>Open Google Stitch</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <HelpBadge tooltipKey="platform-stitch" />
          </div>

          {/* UI Clarification Questions if any */}
          {stitchUi.uiClarifications.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-[#8B5CF6]/20">
              <div className="text-xs font-semibold text-white">
                Confirmed UI & Visual Decisions (UI Grill Me):
              </div>
              <div className="space-y-2.5">
                {stitchUi.uiClarifications.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-xl bg-[#141120] border border-[#C084FC]/20 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{q.question}</span>
                      <span className="text-[10px] font-mono text-[#EC4899]">{q.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => {
                        const sel = (q.selectedAnswer || q.options[0]) === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSelectUiClarification(q.id, opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                              sel
                                ? 'bg-[#8B5CF6]/25 border-[#8B5CF6] text-white'
                                : 'bg-transparent border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Stage 1b: Upload Stitch Result & Screen/Menu Prompts */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#8B5CF6]/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                  Stage 1b · Import Result & Screen Prompts
                </span>
                <HelpBadge tooltipKey="stitch-result-upload" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Stitch Result Handoff & Multi-Screen Studio
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddStitchScreen}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Add Screen / Menu</span>
              </button>
              <HelpBadge tooltipKey="stitch-multi-screen" />
            </div>
          </div>

          {/* Upload Stitch Result Dropzone / File Picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Upload What Stitch Built (HTML, ZIP, Screenshot, or Code)"
                tooltipKey="stitch-result-upload"
              />
              {stitchUi.uploadedResultName && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#34D399]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{stitchUi.uploadedResultName} attached</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-dashed border-[#8B5CF6]/40 bg-[#141120]">
              <button
                type="button"
                onClick={() => stitchResultInputRef.current?.click()}
                className="pf-btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#A78BFA]" />
                <span>Upload Stitch Export</span>
              </button>
              <input
                ref={stitchResultInputRef}
                type="file"
                onChange={(e) => void handleUploadStitchResult(e.target.files)}
                className="hidden"
              />
              <span className="text-xs text-[#CBC3D7]">
                Importing your Stitch output enables full-stack builders to wire state and handlers directly onto the exact layout.
              </span>
            </div>
          </div>

          {/* Stitch Result Handoff Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Stitch Result Handoff Notes"
                tooltipKey="uploadedResultNotes"
                htmlFor="textarea-result-notes"
              />
              <FillWithAiButton
                fieldLabel="Handoff Notes"
                loading={fillingField === 'uploadedResultNotes'}
                disabled={fillingField === 'uploadedResultNotes'}
                onClick={() =>
                  void onFillField('uploadedResultNotes', {
                    currentValue: stitchUi.uploadedResultNotes,
                  })
                }
              />
            </div>
            <textarea
              id="textarea-result-notes"
              rows={3}
              value={stitchUi.uploadedResultNotes || ''}
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
              placeholder="e.g., Use the imported top bar and cards; wire the 'Export' button to Tauri IPC save_spec_bundle and maintain glassmorphic token classes..."
              className="w-full p-4 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] leading-relaxed"
            />
          </div>

          {/* Multi-Screen Prompts */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Dedicated Screen & Menu Stitch Prompts"
                tooltipKey="stitch-multi-screen"
              />
              <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                {stitchScreens.length} custom views configured
              </span>
            </div>

            {stitchScreens.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#141120] border border-[#C084FC]/20 text-xs text-[#CBC3D7]">
                Need individual prompts for specific screens, modals, or slide-out menus? Click <strong>"Add Screen / Menu"</strong> above to generate tailored Stitch prompts for each one.
              </div>
            ) : (
              <div className="space-y-3">
                {stitchScreens.map((screen, idx) => (
                  <div
                    key={screen.id}
                    className="p-4 rounded-xl bg-[#141120] border border-[#C084FC]/25 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-5 flex items-center gap-2">
                        <span className="text-xs font-mono text-[#A78BFA] shrink-0">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={screen.name}
                          onChange={(e) =>
                            handleUpdateStitchScreen(screen.id, { name: e.target.value })
                          }
                          placeholder="Screen Name (e.g., Settings Modal)"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <select
                          value={screen.kind}
                          onChange={(e) =>
                            handleUpdateStitchScreen(screen.id, {
                              kind: e.target.value as any,
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs text-[#E9D5FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                        >
                          <option value="screen">Full Screen</option>
                          <option value="menu">Menu Drawer</option>
                          <option value="modal">Dialog Modal</option>
                          <option value="component">UI Component</option>
                        </select>
                      </div>

                      <div className="sm:col-span-4 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => void handleFillStitchScreen(screen)}
                          disabled={fillingScreenId === screen.id}
                          className="pf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                          title="Generate screen prompt notes with AI"
                        >
                          {fillingScreenId === screen.id ? (
                            <Loader2 className="w-3 h-3 animate-spin text-[#34D399]" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-[#34D399]" />
                          )}
                          <span>Fill Notes</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => void handleCopySingleScreen(screen)}
                          className="pf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                          title="Copy Stitch prompt for this screen"
                        >
                          {copiedScreenId === screen.id ? (
                            <Check className="w-3 h-3 text-[#34D399]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy Prompt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveStitchScreen(screen.id)}
                          className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-white/5 transition-colors"
                          aria-label="Remove screen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={screen.notes}
                      onChange={(e) =>
                        handleUpdateStitchScreen(screen.id, { notes: e.target.value })
                      }
                      placeholder="Notes for this screen: layout zones, interactive triggers, states..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs text-[#CBC3D7] placeholder-[#958EA0]/50 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </DeckCard>
  );
}
