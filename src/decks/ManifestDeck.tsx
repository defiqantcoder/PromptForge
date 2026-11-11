import React, { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Globe,
  Loader2,
  Monitor,
  Plus,
  RotateCcw,
  Smartphone,
  Sparkles,
  Terminal,
  Trash2,
  Wand2,
} from 'lucide-react';
import {
  ClarificationItem,
  CodingLanguageId,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  TargetPlatform,
} from '../types/project';
import { CODING_LANGUAGES } from '../services/presets';
import { FillFieldResponse, LanguageAdvisorResponse } from '../services/geminiClient';
import { DeckCard } from '../components/Card';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface ManifestDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFleshOutIdea: () => Promise<void>;
  onRandomAiIdea: () => Promise<void>;
  onFillField: (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ) => Promise<FillFieldResponse | null>;
  fillingField: FillableFieldId | null;
  isExpanding: boolean;
  isGeneratingRandom: boolean;
  canUndoExpansion: boolean;
  onUndoExpansion: () => void;
  onMiniGrill: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic: MiniGrillTopic | null;
  miniGrillQuestions: Partial<Record<MiniGrillTopic, ClarificationItem[]>>;
  onSelectMiniGrillAnswer: (
    topic: MiniGrillTopic,
    questionId: string,
    option: string
  ) => void;
  onDismissMiniGrill: (topic: MiniGrillTopic) => void;
  onRecommendLanguage: () => Promise<void>;
  isRecommendingLanguage: boolean;
  languageAdvice: LanguageAdvisorResponse | null;
}

const PLATFORMS: Array<{
  id: TargetPlatform;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'desktop',
    label: 'Desktop App',
    desc: 'Native Ubuntu / Windows / Mac window',
    icon: Monitor,
  },
  {
    id: 'web',
    label: 'Web Browser',
    desc: 'Runs in any modern desktop or mobile browser',
    icon: Globe,
  },
  {
    id: 'mobile',
    label: 'Mobile Phone',
    desc: 'Thumb-friendly layout for iOS & Android',
    icon: Smartphone,
  },
  {
    id: 'cli',
    label: 'Command Line',
    desc: 'Fast keyboard-driven terminal tool',
    icon: Terminal,
  },
];

export function ManifestDeck({
  state,
  onUpdate,
  onFleshOutIdea,
  onRandomAiIdea,
  onFillField,
  fillingField,
  isExpanding,
  isGeneratingRandom,
  canUndoExpansion,
  onUndoExpansion,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
  onRecommendLanguage,
  isRecommendingLanguage,
  languageAdvice,
}: ManifestDeckProps) {
  const [newStepText, setNewStepText] = useState('');

  const handleAddStep = () => {
    const trimmed = newStepText.trim();
    if (!trimmed) return;
    onUpdate((prev) => ({
      ...prev,
      features: [...prev.features, trimmed],
      lastUpdated: new Date().toISOString(),
    }));
    setNewStepText('');
  };

  const handleFillNextStep = async () => {
    const res = await onFillField('nextStep', { currentValue: newStepText });
    if (res?.value) {
      setNewStepText(res.value);
    }
  };

  const handleRemoveStep = (index: number) => {
    onUpdate((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleUpdateStep = (index: number, value: string) => {
    onUpdate((prev) => {
      const updated = [...prev.features];
      updated[index] = value;
      return {
        ...prev,
        features: updated,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const cleanChoice = (opt: string) => opt.replace(/^\(Recommended\)\s*/i, '').trim();

  const applyIdeaMiniGrill = (q: ClarificationItem, opt: string) => {
    const detail = `${q.category}: ${cleanChoice(opt)}`;
    onUpdate((prev) => {
      if (prev.coreIdea.includes(detail)) return prev;
      const sep = prev.coreIdea.trim() ? '\n\n' : '';
      return {
        ...prev,
        coreIdea: `${prev.coreIdea.trim()}${sep}${detail}.`,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyFeatureMiniGrill = (q: ClarificationItem, opt: string) => {
    const featureEntry = `${q.category}: ${cleanChoice(opt)}`;
    onUpdate((prev) => {
      if (prev.features.some((f) => f === featureEntry)) return prev;
      return {
        ...prev,
        features: [...prev.features, featureEntry],
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyLanguageMiniGrill = (q: ClarificationItem, opt: string) => {
    const noteEntry = `${q.category}: ${cleanChoice(opt)}`;
    onUpdate((prev) => {
      const existingNote = prev.codingLanguageNote ?? '';
      if (existingNote.includes(noteEntry)) return prev;
      const sep = existingNote.trim() ? ' • ' : '';
      return {
        ...prev,
        codingLanguageNote: `${existingNote.trim()}${sep}${noteEntry}`,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const anyAiBusy =
    Boolean(fillingField) ||
    isExpanding ||
    isGeneratingRandom ||
    Boolean(miniGrillLoadingTopic) ||
    isRecommendingLanguage;

  const selectedLanguageMeta =
    CODING_LANGUAGES.find((lang) => lang.id === state.codingLanguage) ?? CODING_LANGUAGES[0];

  return (
    <DeckCard
      id="deck-manifest"
      stepNumber="01."
      title="Project Manifest & Plain-Language Idea"
      subtitle="Answer four everyday questions—your big idea, target device, feature list, and coding language. PromptForge translates everything automatically."
      tooltipKey="deck-manifest"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          {canUndoExpansion && (
            <button
              type="button"
              onClick={onUndoExpansion}
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo AI Expansion</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1">
            <ExplainerTooltip tooltipKey="action-random-ai" side="bottom">
              <button
                type="button"
                onClick={onRandomAiIdea}
                disabled={isGeneratingRandom || isExpanding}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingRandom ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EC4899]" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5 text-[#EC4899]" />
                )}
                <span>{isGeneratingRandom ? 'Inventing Idea...' : 'Random AI Idea'}</span>
              </button>
            </ExplainerTooltip>
            <HelpBadge tooltipKey="action-random-ai" side="bottom" />
          </span>

          <span className="inline-flex items-center gap-1">
            <ExplainerTooltip tooltipKey="action-flesh-out" side="bottom">
              <button
                type="button"
                onClick={onFleshOutIdea}
                disabled={isExpanding || isGeneratingRandom}
                className="pf-btn-primary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isExpanding ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isExpanding ? 'Fleshing Out...' : 'Flesh Out My Idea'}</span>
              </button>
            </ExplainerTooltip>
            <HelpBadge tooltipKey="action-flesh-out" side="bottom" />
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* App Name & Tagline Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 space-y-1.5">
            <LabelWithTooltip
              label="App Name"
              tooltipKey="field-app-name"
              htmlFor="input-app-name"
            />
            <div className="flex items-center gap-2">
              <input
                id="input-app-name"
                type="text"
                value={state.appName}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    appName: e.target.value,
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                placeholder="e.g., PulseVault"
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm font-medium text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <FillWithAiButton
                fieldLabel="App Name"
                loading={fillingField === 'appName'}
                disabled={fillingField === 'appName'}
                onClick={() => void onFillField('appName', { currentValue: state.appName })}
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-1.5">
            <LabelWithTooltip
              label="One-Sentence Summary"
              tooltipKey="field-tagline"
              htmlFor="input-tagline"
            />
            <div className="flex items-center gap-2">
              <input
                id="input-tagline"
                type="text"
                value={state.tagline}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    tagline: e.target.value,
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                placeholder="What does this app do in one friendly sentence?"
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <FillWithAiButton
                fieldLabel="One-Sentence Summary"
                loading={fillingField === 'tagline'}
                disabled={fillingField === 'tagline'}
                onClick={() => void onFillField('tagline', { currentValue: state.tagline })}
              />
            </div>
          </div>
        </div>

        {/* Question 1: What's the Big Idea? */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q1"
              label="What is the big idea? (Plain English)"
              tooltipKey="field-core-idea"
              htmlFor="textarea-core-idea"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                {state.coreIdea.length} chars (unlimited)
              </span>
              <MiniGrillButton
                label="Mini Grill Idea"
                loading={miniGrillLoadingTopic === 'idea'}
                disabled={anyAiBusy && miniGrillLoadingTopic !== 'idea'}
                onClick={() => void onMiniGrill('idea')}
              />
              <FillWithAiButton
                fieldLabel="Big Idea"
                loading={fillingField === 'coreIdea'}
                disabled={fillingField === 'coreIdea'}
                onClick={() => void onFillField('coreIdea', { currentValue: state.coreIdea })}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-[#0F0C1B]/85 border border-[#C084FC]/25 focus-within:ring-2 focus-within:ring-[#8B5CF6] transition-shadow">
            <textarea
              id="textarea-core-idea"
              rows={5}
              value={state.coreIdea}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  coreIdea: e.target.value,
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="Write as much detail as you want in plain, everyday words. Who is it for, what problem does it solve, and how should it feel?"
              className="w-full p-4 bg-transparent text-sm leading-relaxed text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none resize-y rounded-2xl"
            />
          </div>

          <MiniGrillPanel
            title="Sharpen Big Idea"
            questions={miniGrillQuestions.idea ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('idea', qId, opt)}
            onApplyToSection={applyIdeaMiniGrill}
            onClose={() => onDismissMiniGrill('idea')}
          />
        </div>

        {/* Question 2: Where Will People Use It? */}
        <div className="space-y-2.5">
          <LabelWithTooltip
            stepBadge="Q2"
            label="Where will people use it?"
            tooltipKey="field-target-platform"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PLATFORMS.map((plat) => {
              const Icon = plat.icon;
              const selected = state.targetPlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      targetPlatform: plat.id,
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.25)]'
                      : 'bg-[#0F0C1B]/75 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-white">{plat.label}</span>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        selected ? 'text-[#D0BCFF]' : 'text-[#A78BFA]/70'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] leading-snug text-[#CBC3D7]">{plat.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Feature List */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q3"
              label="Feature List (What should this app let people do?)"
              tooltipKey="field-features"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                {state.features.length} features listed
              </span>
              <MiniGrillButton
                label="Mini Grill Features"
                loading={miniGrillLoadingTopic === 'features'}
                disabled={anyAiBusy && miniGrillLoadingTopic !== 'features'}
                onClick={() => void onMiniGrill('features')}
              />
            </div>
          </div>

          <div className="space-y-2">
            {state.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 focus-within:border-[#8B5CF6]"
              >
                <span className="w-6 text-center text-xs font-mono font-semibold text-[#A78BFA] tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleUpdateStep(index, e.target.value)}
                  aria-label={`Feature ${index + 1}`}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-[#E9D5FF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  aria-label={`Remove feature ${index + 1}`}
                  className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Step / Feature Input */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1">
              <input
                type="text"
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddStep();
                  }
                }}
                placeholder="Add another feature or user action (e.g., Export monthly summary as a clean PDF)..."
                className="flex-1 min-w-[200px] px-3.5 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <HelpBadge tooltipKey="field-add-step" />
              <FillWithAiButton
                fieldLabel="Next Feature"
                loading={fillingField === 'nextStep'}
                disabled={fillingField === 'nextStep'}
                onClick={() => void handleFillNextStep()}
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          <MiniGrillPanel
            title="Add Missing Features"
            questions={miniGrillQuestions.features ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('features', qId, opt)}
            onApplyToSection={applyFeatureMiniGrill}
            onClose={() => onDismissMiniGrill('features')}
          />
        </div>

        {/* Question 4: Coding Language & AI Advisor */}
        <div className="pt-2 border-t border-[#C084FC]/15 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q4"
              label="Coding Language & Stack Choice"
              tooltipKey="field-coding-language"
            />
            <div className="flex flex-wrap items-center gap-2">
              <MiniGrillButton
                label="Mini Grill Stack"
                loading={miniGrillLoadingTopic === 'codingLanguage'}
                disabled={anyAiBusy && miniGrillLoadingTopic !== 'codingLanguage'}
                onClick={() => void onMiniGrill('codingLanguage')}
              />
              <span className="inline-flex items-center gap-1">
                <ExplainerTooltip tooltipKey="action-language-advisor" side="top">
                  <button
                    type="button"
                    onClick={() => void onRecommendLanguage()}
                    disabled={isRecommendingLanguage}
                    className="pf-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    {isRecommendingLanguage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Code2 className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isRecommendingLanguage
                        ? 'Analyzing Languages...'
                        : "Ask AI: What's Best for What?"}
                    </span>
                  </button>
                </ExplainerTooltip>
                <HelpBadge tooltipKey="action-language-advisor" side="top" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {CODING_LANGUAGES.map((lang) => {
              const isSelected = state.codingLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      codingLanguage: lang.id as CodingLanguageId,
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5E6AD2]/20 border-[#5E6AD2] text-white shadow-[0_0_16px_rgba(94,106,210,0.25)]'
                      : 'bg-[#0F0C1B]/75 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-white">{lang.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A5B4FC] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] leading-snug text-[#D0BCFF]/90">
                    <span className="font-semibold text-[#34D399]">Best for: </span>
                    {lang.bestFor}
                  </p>
                  <p className="text-[10.5px] leading-snug text-[#958EA0] mt-1">
                    {lang.tradeoffs}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Language Advisor AI Result */}
          {languageAdvice && (
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#5E6AD2]/40 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#34D399]">
                    AI Language Recommendation
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Best Match: {languageAdvice.recommendedLabel}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      codingLanguage: languageAdvice.recommendedId,
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className="pf-btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Use {languageAdvice.recommendedLabel}</span>
                </button>
              </div>
              <p className="text-xs leading-relaxed text-[#E2E8F0]">{languageAdvice.summary}</p>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                <span className="font-semibold text-[#C7D2FE]">Trade-offs: </span>
                {languageAdvice.tradeoffs}
              </p>

              {languageAdvice.comparisons.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {languageAdvice.comparisons.map((comp) => (
                    <div
                      key={comp.language}
                      className="p-2.5 rounded-lg bg-[#131620] border border-[#1D2230] space-y-1"
                    >
                      <div className="text-xs font-semibold text-white">{comp.language}</div>
                      <div className="text-[11px] text-[#34D399]">
                        <span className="font-semibold">Best for: </span>
                        {comp.bestFor}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] leading-snug">
                        {comp.whyConsiderOrSkip}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Optional Language Notes Blank */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label={`Language & Library Notes (${selectedLanguageMeta.shortTag})`}
                tooltipKey="field-coding-language-note"
                htmlFor="input-coding-language-note"
              />
              <FillWithAiButton
                fieldLabel="Language Preferences"
                loading={fillingField === 'codingLanguageNote'}
                disabled={fillingField === 'codingLanguageNote'}
                onClick={() =>
                  void onFillField('codingLanguageNote', {
                    currentValue: state.codingLanguageNote,
                  })
                }
              />
            </div>
            <input
              id="input-coding-language-note"
              type="text"
              value={state.codingLanguageNote}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  codingLanguageNote: e.target.value,
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="Optional: specific libraries, UI kits, or coding preferences..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <MiniGrillPanel
            title="Refine Language & Stack"
            questions={miniGrillQuestions.codingLanguage ?? []}
            onSelectAnswer={(qId, opt) =>
              onSelectMiniGrillAnswer('codingLanguage', qId, opt)
            }
            onApplyToSection={applyLanguageMiniGrill}
            onClose={() => onDismissMiniGrill('codingLanguage')}
          />
        </div>
      </div>
    </DeckCard>
  );
}
