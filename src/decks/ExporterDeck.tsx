import React, { useState } from 'react';
import { HardDrive, Sparkles } from 'lucide-react';
import { ExportPlatformId, ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, HelpBadge } from '../components/Tooltip';
import { compilePlatformContract } from '../services/compiler';
import { CodeViewer } from '../components/CodeViewer';

interface ExporterDeckProps {
  state: ProjectState;
  onOpenSaveModal: () => void;
  onUpdateVariable: (key: string, value: string) => void;
}

const PLATFORMS: Array<{
  id: ExportPlatformId;
  label: string;
  tooltipKey: string;
}> = [
  { id: 'stitch', label: 'Google Stitch', tooltipKey: 'platform-stitch' },
  { id: 'aistudio', label: 'Google AI Studio', tooltipKey: 'platform-aistudio' },
  { id: 'antigravity', label: 'Google Antigravity (AGY)', tooltipKey: 'platform-antigravity' },
  { id: 'copilot', label: 'GitHub Copilot', tooltipKey: 'platform-copilot' },
  { id: 'canvas', label: 'Gemini Canvas', tooltipKey: 'platform-canvas' },
];

export function ExporterDeck({
  state,
  onOpenSaveModal,
  onUpdateVariable,
}: ExporterDeckProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<ExportPlatformId>('stitch');

  const compiled = compilePlatformContract(state, selectedPlatform);

  return (
    <DeckCard
      id="deck-exporter"
      stepNumber="06."
      title="Targeted Multi-Platform Contract Exporter"
      subtitle="Select your target AI platform to generate a ready-to-paste prompt contract, or write spec.md, plan.md, tasks.md, and AGENTS.md directly to your computer."
      tooltipKey="deck-exporter"
      headerRight={
        <span className="inline-flex items-center gap-1.5">
          <ExplainerTooltip tooltipKey="action-save-computer" side="top">
            <button
              type="button"
              onClick={onOpenSaveModal}
              className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Save Bundle to Computer</span>
            </button>
          </ExplainerTooltip>
          <HelpBadge tooltipKey="action-save-computer" side="top" />
        </span>
      }
    >
      <div className="space-y-4">
        {/* Platform Selector Tabs */}
        <div
          role="tablist"
          aria-label="Target AI Platform Contracts"
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0F0C1B]/90 border border-[#C084FC]/20"
        >
          {PLATFORMS.map((plat) => {
            const active = selectedPlatform === plat.id;
            return (
              <ExplainerTooltip key={plat.id} tooltipKey={plat.tooltipKey} side="top">
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedPlatform(plat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#8B5CF6] text-white shadow-sm'
                      : 'text-[#CBC3D7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {plat.label}
                </button>
              </ExplainerTooltip>
            );
          })}
        </div>

        {/* Platform Context Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#141120] border border-[#C084FC]/20 text-xs">
          <div className="flex items-center gap-2 text-[#E9D5FF]">
            <Sparkles className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
            <span className="font-semibold text-white">{compiled.title}</span>
            <span aria-hidden="true" className="text-[#958EA0]">·</span>
            <span className="text-[#CBC3D7]">{compiled.subtitle}</span>
          </div>
          <span className="font-mono text-[11px] text-[#A78BFA]">{compiled.badge}</span>
        </div>

        {/* Live Compiled Prompt Contract */}
        <CodeViewer
          filename={`${state.appName.toLowerCase().replace(/\s+/g, '-')}-${selectedPlatform}-prompt.md`}
          content={compiled.promptText}
          badgeLabel={compiled.badge}
          templateVariables={state.proConfig.templateVariables}
          onUpdateVariable={onUpdateVariable}
        />
      </div>
    </DeckCard>
  );
}
