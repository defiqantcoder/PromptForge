import React, { useState } from 'react';
import {
  Globe,
  Laptop,
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
import { ProjectState, TargetPlatform } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, LabelWithTooltip } from '../components/Tooltip';

interface ManifestDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFleshOutIdea: () => Promise<void>;
  onRandomAiIdea: () => Promise<void>;
  isExpanding: boolean;
  isGeneratingRandom: boolean;
  canUndoExpansion: boolean;
  onUndoExpansion: () => void;
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
  isExpanding,
  isGeneratingRandom,
  canUndoExpansion,
  onUndoExpansion,
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

  return (
    <DeckCard
      id="deck-manifest"
      stepNumber="01."
      title="Project Manifest & Plain-Language Idea"
      subtitle="Answer three everyday questions—your big idea, the target device, and the main user steps. PromptForge handles the engineering translation."
      tooltipKey="deck-manifest"
      headerRight={
        <div className="flex items-center gap-2">
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
        </div>
      }
    >
      <div className="space-y-6">
        {/* App Name & Tagline Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 space-y-1.5">
            <LabelWithTooltip
              label="App Name"
              tooltipKey="field-app-name"
              htmlFor="input-app-name"
            />
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
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm font-medium text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="md:col-span-8 space-y-1.5">
            <LabelWithTooltip
              label="One-Sentence Summary"
              tooltipKey="field-app-name"
              htmlFor="input-tagline"
            />
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
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
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
            <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
              {state.coreIdea.length} chars · Click "Flesh Out My Idea" to auto-expand
            </span>
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
              placeholder="Describe your app idea in plain, everyday words. Who is it for, what problem does it solve, and how should it feel?"
              className="w-full p-4 bg-transparent text-sm leading-relaxed text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none resize-y rounded-2xl"
            />
          </div>
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

        {/* Question 3: What Are the Main Steps? */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q3"
              label="What are the main steps or actions a user takes?"
              tooltipKey="field-features"
            />
            <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
              {state.features.length} steps defined
            </span>
          </div>

          <div className="space-y-2">
            {state.features.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 focus-within:border-[#8B5CF6]"
              >
                <span className="w-6 text-center text-xs font-mono font-semibold text-[#A78BFA] tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleUpdateStep(index, e.target.value)}
                  aria-label={`User step ${index + 1}`}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-[#E9D5FF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  aria-label={`Remove step ${index + 1}`}
                  className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add New Step Input */}
            <div className="flex items-center gap-2 pt-1">
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
                placeholder="Add another plain-English step (e.g., Export monthly summary as a clean PDF)..."
                className="flex-1 px-3.5 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
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
        </div>
      </div>
    </DeckCard>
  );
}
