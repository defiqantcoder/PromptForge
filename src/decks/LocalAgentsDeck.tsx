import React from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Loader2,
  Sparkles,
  Terminal,
} from 'lucide-react';
import {
  ClarificationItem,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
} from '../types/project';
import { compileContinueRules } from '../services/compiler';
import { DEFAULT_LOCAL_AGENTS, OLLAMA_MODEL_PRESETS } from '../services/presets';
import { FillFieldResponse } from '../services/geminiClient';
import { triggerBrowserFileDownload } from '../services/tauriBridge';
import { DeckCard } from '../components/Card';
import { CodeViewer } from '../components/CodeViewer';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface LocalAgentsDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFillField: (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ) => Promise<FillFieldResponse | null>;
  fillingField: FillableFieldId | null;
  onMiniGrill: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic: MiniGrillTopic | null;
  miniGrillQuestions: Partial<Record<MiniGrillTopic, ClarificationItem[]>>;
  onSelectMiniGrillAnswer: (
    topic: MiniGrillTopic,
    questionId: string,
    option: string
  ) => void;
  onDismissMiniGrill: (topic: MiniGrillTopic) => void;
}

export function LocalAgentsDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
}: LocalAgentsDeckProps) {
  const localAgents = state.localAgents ?? DEFAULT_LOCAL_AGENTS;
  const continueRulesContent = compileContinueRules(state);

  const toggleEnabled = () => {
    onUpdate((prev) => ({
      ...prev,
      localAgents: {
        ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
        enabled: !(prev.localAgents ?? DEFAULT_LOCAL_AGENTS).enabled,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const applyLocalAgentMiniGrill = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const detail = `${q.category}: ${clean}`;
    onUpdate((prev) => {
      const current = prev.localAgents ?? DEFAULT_LOCAL_AGENTS;
      if (current.notes.includes(detail)) return prev;
      const sep = current.notes.trim() ? '\n' : '';
      return {
        ...prev,
        localAgents: {
          ...current,
          notes: `${current.notes.trim()}${sep}${detail}`,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  return (
    <DeckCard
      id="deck-local-agents"
      stepNumber="Optional ·"
      title="Local AI Agents (Ollama / Continue)"
      subtitle="Run 100% private, offline coding assistance on your machine using Ollama and the Continue IDE extension without paid cloud API keys."
      tooltipKey="section-local-agents"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <MiniGrillButton
            label="Mini Grill Local AI"
            tooltipKey="btn-mini-grill-generic"
            loading={miniGrillLoadingTopic === 'localAgents'}
            disabled={Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'localAgents'}
            onClick={() => void onMiniGrill('localAgents')}
          />
          <button
            type="button"
            role="switch"
            aria-checked={localAgents.enabled}
            onClick={toggleEnabled}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
              localAgents.enabled
                ? 'bg-[#34D399]/20 border-[#34D399] text-[#34D399]'
                : 'bg-[#141120] border-[#C084FC]/30 text-[#CBC3D7] hover:border-[#C084FC]/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{localAgents.enabled ? 'Local AI Enabled' : 'Enable Local AI'}</span>
          </button>
          <HelpBadge tooltipKey="section-local-agents" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Configuration Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Ollama Runtime & IDE Tooling Settings</span>
                <HelpBadge tooltipKey="platform-local-ollama" />
              </h3>
              <p className="text-xs text-[#CBC3D7]">
                Configure which open-weight coding model and local endpoint your editor uses:
              </p>
            </div>

            <span className="text-xs font-mono text-[#34D399]">
              {localAgents.enabled ? 'Active in plan.md' : 'Disabled'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <LabelWithTooltip
                label="Local Extension / Provider"
                tooltipKey="section-local-agents"
                htmlFor="select-local-provider"
              />
              <select
                id="select-local-provider"
                value={localAgents.provider}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    localAgents: {
                      ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                      provider: e.target.value as any,
                    },
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                <option value="both">Continue Extension + Ollama Runtime (Recommended)</option>
                <option value="continue">Continue IDE Extension Only</option>
                <option value="ollama">Ollama Standalone Server</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <LabelWithTooltip
                label="Recommended Local Coder Model"
                tooltipKey="platform-local-ollama"
                htmlFor="select-local-model"
              />
              <select
                id="select-local-model"
                value={localAgents.ollamaModel}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    localAgents: {
                      ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                      ollamaModel: e.target.value,
                    },
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                {OLLAMA_MODEL_PRESETS.map((m) => (
                  <option key={m} value={m}>
                    {m} {m.includes('14b') ? '(Recommended Balanced)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <LabelWithTooltip
              label="Local Ollama Host Endpoint"
              tooltipKey="platform-local-ollama"
              htmlFor="input-local-endpoint"
            />
            <input
              id="input-local-endpoint"
              type="text"
              value={localAgents.ollamaEndpoint}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  localAgents: {
                    ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                    ollamaEndpoint: e.target.value,
                  },
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="http://localhost:11434"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-xs font-mono text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          {/* Local Agent Notes Textarea with Fill with AI */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Local Model Coding Instructions (.continuerules)"
                tooltipKey="localAgentNotes"
                htmlFor="textarea-local-notes"
              />
              <FillWithAiButton
                fieldLabel="Local AI Instructions"
                loading={fillingField === 'localAgentNotes'}
                disabled={fillingField === 'localAgentNotes'}
                onClick={() =>
                  void onFillField('localAgentNotes', {
                    currentValue: localAgents.notes,
                  })
                }
              />
            </div>
            <textarea
              id="textarea-local-notes"
              rows={3}
              value={localAgents.notes}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  localAgents: {
                    ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                    notes: e.target.value,
                  },
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="e.g., Focus on small localized refactorings, never touch database migrations without confirmation, use typed tests..."
              className="w-full p-3.5 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-xs text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] leading-relaxed"
            />
          </div>

          <MiniGrillPanel
            title="Refine Local AI Settings"
            questions={miniGrillQuestions.localAgents ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('localAgents', qId, opt)}
            onApplyToSection={applyLocalAgentMiniGrill}
            onClose={() => onDismissMiniGrill('localAgents')}
          />
        </div>

        {/* Live .continuerules Code Preview */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Generated .continuerules File</span>
                <HelpBadge tooltipKey="section-local-agents" />
              </h3>
              <p className="text-xs text-[#CBC3D7]">
                Drop this file into the root of your project folder so Continue / Ollama adheres to your rules:
              </p>
            </div>

            <button
              type="button"
              onClick={() => triggerBrowserFileDownload('.continuerules', continueRulesContent)}
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Download .continuerules</span>
            </button>
          </div>

          <CodeViewer
            filename=".continuerules"
            content={continueRulesContent}
            badgeLabel="Offline Local AI Rules"
          />
        </div>
      </div>
    </DeckCard>
  );
}
