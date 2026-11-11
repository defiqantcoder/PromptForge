import React from 'react';
import { CheckCircle2, Loader2, MessageSquare, RefreshCw, Sparkles, Trash2 } from 'lucide-react';
import { ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, HelpBadge } from '../components/Tooltip';

interface GrillDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onGrillMe: () => Promise<void>;
  isGrilling: boolean;
  isAutoRefreshing?: boolean;
  lastSyncedAt?: string | null;
}

export function GrillDeck({
  state,
  onUpdate,
  onGrillMe,
  isGrilling,
  isAutoRefreshing = false,
  lastSyncedAt = null,
}: GrillDeckProps) {
  const handleSelectAnswer = (questionId: string, option: string) => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.map((item) =>
        item.id === questionId ? { ...item, selectedAnswer: option } : item
      ),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleRemoveQuestion = (questionId: string) => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.filter((item) => item.id !== questionId),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleClearAllQuestions = () => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: [],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleAutoSelectRecommended = () => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.map((item) => {
        const rec = item.options.find((o) => o.startsWith('(Recommended)')) || item.options[0];
        return { ...item, selectedAnswer: rec };
      }),
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <DeckCard
      id="deck-grill"
      stepNumber="03."
      title={'"Grill Me" — Dynamic Clarification Interview'}
      subtitle="Runs an in-depth 8-question clarification interview (Q1–Q8) resolving edge cases and technical decisions while keeping all prior answers remembered."
      tooltipKey="deck-grill"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          {state.clarifications.length > 0 && (
            <button
              type="button"
              onClick={handleAutoSelectRecommended}
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Auto-Pick Recommended (AI)</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0C1B]/85 border border-[#C084FC]/20 text-[11px] text-[#CBC3D7]">
            {isAutoRefreshing || isGrilling ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-[#EC4899]" />
                <span>Appending fresh questions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-[#34D399]" />
                <span>
                  {lastSyncedAt
                    ? `${state.clarifications.length} saved · synced ${new Date(
                        lastSyncedAt
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : `${state.clarifications.length} remembered Q&A (Q1–Q${Math.max(8, state.clarifications.length)})`}
                </span>
              </>
            )}
          </span>

          {state.clarifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllQuestions}
              className="pf-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-[#CBC3D7] hover:text-[#FFB4AB] whitespace-nowrap shrink-0 cursor-pointer"
              title="Clear saved clarification questions"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1">
            <ExplainerTooltip tooltipKey="action-grill-me" side="bottom">
              <button
                type="button"
                onClick={onGrillMe}
                disabled={isGrilling}
                className="pf-btn-primary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isGrilling ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MessageSquare className="w-3.5 h-3.5" />
                )}
                <span>
                  {isGrilling
                    ? 'Asking 8 Questions...'
                    : state.clarifications.length > 0
                    ? 'Grill Me (+8 More Questions)'
                    : 'Grill Me (Ask 8 Questions)'}
                </span>
              </button>
            </ExplainerTooltip>
            <HelpBadge tooltipKey="action-grill-me" side="bottom" />
          </span>
        </div>
      }
    >
      {state.clarifications.length === 0 ? (
        <div className="p-6 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 text-center space-y-3">
          <Sparkles className="w-6 h-6 text-[#A78BFA] mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">
              No Clarification Questions Generated Yet
            </h3>
            <p className="text-xs text-[#CBC3D7] max-w-md mx-auto">
              Click "Grill Me" above so AI can spot edge cases and suggest 8 tailored multiple-choice decisions (Q1–Q8) while remembering your prior answers.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {state.clarifications.map((item, qIndex) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#0F0C1B]/85 border border-[#C084FC]/20 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-[#A78BFA]">
                  <span className="font-mono font-semibold tabular-nums">
                    Q{qIndex + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#EC4899]">{item.category}</span>
                  <HelpBadge tooltipKey="deck-grill" />
                </div>
                <div className="flex items-center gap-2">
                  {item.selectedAnswer && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#34D399]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Folded into spec.md & AGENTS.md</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(item.id)}
                    aria-label={`Remove question ${qIndex + 1}`}
                    className="p-1 rounded-md text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-sm font-semibold text-white">{item.question}</p>

              <div className="grid grid-cols-1 gap-2">
                {item.options.map((opt) => {
                  const selected =
                    (item.selectedAnswer || item.options[0]) === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectAnswer(item.id, opt)}
                      className={`px-3.5 py-2.5 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        selected
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white font-medium'
                          : 'bg-[#141120]/90 border-[#C084FC]/15 text-[#CBC3D7] hover:border-[#C084FC]/40'
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                            : 'border-[#958EA0]/50'
                        }`}
                      >
                        {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </DeckCard>
  );
}
