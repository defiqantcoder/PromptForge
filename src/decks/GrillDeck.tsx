import React from 'react';
import { CheckCircle2, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import { ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip } from '../components/Tooltip';

interface GrillDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onGrillMe: () => Promise<void>;
  isGrilling: boolean;
}

export function GrillDeck({ state, onUpdate, onGrillMe, isGrilling }: GrillDeckProps) {
  const handleSelectAnswer = (questionId: string, option: string) => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.map((item) =>
        item.id === questionId ? { ...item, selectedAnswer: option } : item
      ),
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <DeckCard
      id="deck-grill"
      stepNumber="03."
      title={'"Grill Me" — 3-Question Clarification Interview'}
      subtitle="Let Gemini inspect your idea and ask 3 quick multiple-choice questions to lock in missing details before generating code."
      tooltipKey="deck-grill"
      headerRight={
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
              {isGrilling ? 'Analyzing Idea...' : 'Grill Me (Ask 3 Fresh Questions)'}
            </span>
          </button>
        </ExplainerTooltip>
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
              Click "Grill Me" above to have Gemini spot edge cases in your app idea and suggest 3 multiple-choice decisions.
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
                </div>
                {item.selectedAnswer && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#34D399]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Folded into spec.md & AGENTS.md</span>
                  </span>
                )}
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
