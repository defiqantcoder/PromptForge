import React from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileCode2,
  Loader2,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react';
import {
  AgentLane,
  ClarificationItem,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
} from '../types/project';
import { compileCollaborationMd } from '../services/compiler';
import { DEFAULT_MULTI_AGENT } from '../services/presets';
import { FillFieldResponse } from '../services/geminiClient';
import { triggerBrowserFileDownload } from '../services/tauriBridge';
import { DeckCard } from '../components/Card';
import { CodeViewer } from '../components/CodeViewer';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface MultiAgentDeckProps {
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

function generateSafeId(prefix: string): string {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

export function MultiAgentDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
}: MultiAgentDeckProps) {
  const multiAgent = state.multiAgent ?? DEFAULT_MULTI_AGENT;
  const collabContent = compileCollaborationMd(state);

  const toggleEnabled = () => {
    onUpdate((prev) => ({
      ...prev,
      multiAgent: {
        ...(prev.multiAgent ?? DEFAULT_MULTI_AGENT),
        enabled: !(prev.multiAgent ?? DEFAULT_MULTI_AGENT).enabled,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleAddAgentLane = () => {
    const newLane: AgentLane = {
      id: generateSafeId('lane'),
      agentName: `Agent ${multiAgent.lanes.length + 1} (Specialist)`,
      focusArea: 'Feature Implementation',
      status: 'ready',
      workOnPaths: 'src/features/',
      stayAwayPaths: 'src-tauri/, package.json',
      handoffNote: 'Post status update in COLLABORATION.md before finishing.',
    };
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      return {
        ...prev,
        multiAgent: {
          ...current,
          enabled: true,
          lanes: [...current.lanes, newLane],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleUpdateAgentLane = (laneId: string, patch: Partial<AgentLane>) => {
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      return {
        ...prev,
        multiAgent: {
          ...current,
          lanes: current.lanes.map((lane) =>
            lane.id === laneId ? { ...lane, ...patch } : lane
          ),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleRemoveAgentLane = (laneId: string) => {
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      return {
        ...prev,
        multiAgent: {
          ...current,
          lanes: current.lanes.filter((lane) => lane.id !== laneId),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyMultiAgentMiniGrill = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const detail = `${q.category}: ${clean}`;
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      if (current.sharedProtocolNotes.includes(detail)) return prev;
      const sep = current.sharedProtocolNotes.trim() ? '\n' : '';
      return {
        ...prev,
        multiAgent: {
          ...current,
          sharedProtocolNotes: `${current.sharedProtocolNotes.trim()}${sep}${detail}`,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  return (
    <DeckCard
      id="deck-multi-agent"
      stepNumber="Optional ·"
      title="Multi-Agent Coordination (COLLABORATION.md)"
      subtitle="Coordinate parallel AI coding agents cleanly by declaring file ownership boundaries (Work-On vs. Stay-Away paths) and shared merge handoff rules."
      tooltipKey="section-multi-agent"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <MiniGrillButton
            label="Mini Grill Multi-Agent"
            tooltipKey="btn-mini-grill-generic"
            loading={miniGrillLoadingTopic === 'multiAgent'}
            disabled={Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'multiAgent'}
            onClick={() => void onMiniGrill('multiAgent')}
          />
          <button
            type="button"
            role="switch"
            aria-checked={multiAgent.enabled}
            onClick={toggleEnabled}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
              multiAgent.enabled
                ? 'bg-[#34D399]/20 border-[#34D399] text-[#34D399]'
                : 'bg-[#141120] border-[#C084FC]/30 text-[#CBC3D7] hover:border-[#C084FC]/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{multiAgent.enabled ? 'Multi-Agent Active' : 'Enable Multi-Agent'}</span>
          </button>
          <HelpBadge tooltipKey="section-multi-agent" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Agent Lanes Table / Cards */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Parallel Agent Ownership Lanes</span>
                <HelpBadge tooltipKey="section-multi-agent" />
              </h3>
              <p className="text-xs text-[#CBC3D7]">
                Define which paths each agent owns and what restricted directories they must not touch:
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddAgentLane}
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Add Agent Lane</span>
            </button>
          </div>

          <div className="space-y-3">
            {multiAgent.lanes.map((lane, idx) => (
              <div
                key={lane.id}
                className="p-4 rounded-xl bg-[#141120] border border-[#C084FC]/25 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4 flex items-center gap-2">
                    <span className="text-xs font-mono text-[#A78BFA] shrink-0">
                      Lane #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={lane.agentName}
                      onChange={(e) =>
                        handleUpdateAgentLane(lane.id, { agentName: e.target.value })
                      }
                      placeholder="Agent Name (e.g., UI Agent)"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={lane.focusArea}
                      onChange={(e) =>
                        handleUpdateAgentLane(lane.id, { focusArea: e.target.value })
                      }
                      placeholder="Focus Area (e.g., Decks, Forms & Styling)"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs text-[#CBC3D7] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-end gap-2">
                    <select
                      value={lane.status}
                      onChange={(e) =>
                        handleUpdateAgentLane(lane.id, {
                          status: e.target.value as any,
                        })
                      }
                      className="px-2 py-1 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs text-[#34D399] font-mono focus:outline-none"
                    >
                      <option value="ready">READY</option>
                      <option value="in-progress">IN-PROGRESS</option>
                      <option value="done">DONE</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleRemoveAgentLane(lane.id)}
                      className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-white/5 transition-colors"
                      aria-label="Remove agent lane"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#34D399]">
                      WORK ON (Allowed Scope):
                    </label>
                    <input
                      type="text"
                      value={lane.workOnPaths}
                      onChange={(e) =>
                        handleUpdateAgentLane(lane.id, { workOnPaths: e.target.value })
                      }
                      placeholder="e.g., src/decks/, src/components/"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 font-mono text-xs text-[#E9D5FF] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#FFB4AB]">
                      STAY AWAY FROM (Restricted):
                    </label>
                    <input
                      type="text"
                      value={lane.stayAwayPaths}
                      onChange={(e) =>
                        handleUpdateAgentLane(lane.id, { stayAwayPaths: e.target.value })
                      }
                      placeholder="e.g., src-tauri/, package.json"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 font-mono text-xs text-[#FFDAD6] focus:outline-none"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={lane.handoffNote}
                  onChange={(e) =>
                    handleUpdateAgentLane(lane.id, { handoffNote: e.target.value })
                  }
                  placeholder="Handoff note: Interface updates, verified gates before marking done..."
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20 text-xs text-[#CBC3D7] placeholder-[#958EA0]/50 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Shared Protocol Notes with Fill with AI */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between gap-2">
              <LabelWithTooltip
                label="Shared Multi-Agent Protocol & Merge Rules"
                tooltipKey="multiAgentProtocol"
                htmlFor="textarea-multi-agent-protocol"
              />
              <FillWithAiButton
                fieldLabel="Coordination Protocol"
                loading={fillingField === 'multiAgentProtocol'}
                disabled={fillingField === 'multiAgentProtocol'}
                onClick={() =>
                  void onFillField('multiAgentProtocol', {
                    currentValue: multiAgent.sharedProtocolNotes,
                  })
                }
              />
            </div>
            <textarea
              id="textarea-multi-agent-protocol"
              rows={4}
              value={multiAgent.sharedProtocolNotes}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  multiAgent: {
                    ...(prev.multiAgent ?? DEFAULT_MULTI_AGENT),
                    sharedProtocolNotes: e.target.value,
                  },
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="e.g., Run npx tsc --noEmit before marking lane done; post schema updates in Section 4 before merging..."
              className="w-full p-3.5 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-xs text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] leading-relaxed"
            />
          </div>

          <MiniGrillPanel
            title="Refine Multi-Agent Boundaries"
            questions={miniGrillQuestions.multiAgent ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('multiAgent', qId, opt)}
            onApplyToSection={applyMultiAgentMiniGrill}
            onClose={() => onDismissMiniGrill('multiAgent')}
          />
        </div>

        {/* Live COLLABORATION.md Preview */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Generated COLLABORATION.md File</span>
                <HelpBadge tooltipKey="section-multi-agent" />
              </h3>
              <p className="text-xs text-[#CBC3D7]">
                Live multi-agent boundary ledger saved to disk and updated in real time:
              </p>
            </div>

            <button
              type="button"
              onClick={() => triggerBrowserFileDownload('COLLABORATION.md', collabContent)}
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Download COLLABORATION.md</span>
            </button>
          </div>

          <CodeViewer
            filename="COLLABORATION.md"
            content={collabContent}
            badgeLabel="Multi-Agent Board"
          />
        </div>
      </div>
    </DeckCard>
  );
}
