import React, { useState } from 'react';
import { Download, HardDrive, Sparkles } from 'lucide-react';
import {
  ClarificationItem,
  ExportPlatformId,
  MiniGrillTopic,
  ProjectState,
} from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, HelpBadge } from '../components/Tooltip';
import { compilePlatformContract } from '../services/compiler';
import { CodeViewer } from '../components/CodeViewer';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { triggerBrowserFileDownload } from '../services/tauriBridge';

interface ExporterDeckProps {
  state: ProjectState;
  onOpenSaveModal: () => void;
  onUpdateVariable: (key: string, value: string) => void;
  onMiniGrill?: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic?: MiniGrillTopic | null;
  miniGrillQuestions?: Partial<Record<MiniGrillTopic, ClarificationItem[]>>;
  onSelectMiniGrillAnswer?: (
    topic: MiniGrillTopic,
    questionId: string,
    option: string
  ) => void;
  onDismissMiniGrill?: (topic: MiniGrillTopic) => void;
}

const PLATFORMS: Array<{
  id: ExportPlatformId;
  label: string;
  tooltipKey: string;
  secondary?: boolean;
}> = [
  { id: 'stitch', label: 'Google Stitch', tooltipKey: 'platform-stitch' },
  { id: 'aistudio', label: 'Google AI Studio', tooltipKey: 'platform-aistudio' },
  { id: 'antigravity', label: 'Google Antigravity (AGY)', tooltipKey: 'platform-antigravity' },
  { id: 'canvas', label: 'Gemini Canvas', tooltipKey: 'platform-canvas' },
  { id: 'local-ollama', label: 'Local AI (Ollama)', tooltipKey: 'platform-local-ollama' },
  { id: 'copilot', label: 'Copilot (Optional)', tooltipKey: 'platform-copilot', secondary: true },
];

export function ExporterDeck({
  state,
  onOpenSaveModal,
  onUpdateVariable,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
}: ExporterDeckProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<ExportPlatformId>('stitch');

  const compiled = compilePlatformContract(state, selectedPlatform);

  const applyExporterMiniGrill = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const tokenKey = q.category.toLowerCase().replace(/[^a-z0-9]/g, '_');
    onUpdateVariable(tokenKey, clean);
  };

  return (
    <DeckCard
      id="deck-exporter"
      stepNumber="06."
      title="Targeted Multi-Platform Contract Exporter"
      subtitle="Select your target AI platform to generate a ready-to-paste prompt contract, or write your markdown & agent specs directly to your computer."
      tooltipKey="deck-exporter"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          {onMiniGrill && (
            <MiniGrillButton
              label="Mini Grill Exporter"
              tooltipKey="btn-mini-grill-generic"
              loading={miniGrillLoadingTopic === 'exporter'}
              disabled={Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'exporter'}
              onClick={() => void onMiniGrill('exporter')}
            />
          )}

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
        </div>
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#8B5CF6] text-white font-medium shadow-sm'
                      : plat.secondary
                      ? 'ml-auto text-[11px] font-normal text-[#958EA0] hover:text-[#CBC3D7] hover:bg-white/5'
                      : 'font-medium text-[#CBC3D7] hover:text-white hover:bg-white/5'
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

        {onDismissMiniGrill && onSelectMiniGrillAnswer && (
          <MiniGrillPanel
            title="Refine Exporter Tokens & Contract"
            questions={miniGrillQuestions?.exporter ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('exporter', qId, opt)}
            onApplyToSection={applyExporterMiniGrill}
            onClose={() => onDismissMiniGrill('exporter')}
          />
        )}
      </div>
    </DeckCard>
  );
}
