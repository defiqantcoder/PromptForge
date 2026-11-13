import React from 'react';
import { Check, Loader2, MessageSquarePlus, X } from 'lucide-react';
import { ClarificationItem } from '../types/project';
import { ExplainerTooltip, HelpBadge } from './Tooltip';

interface MiniGrillButtonProps {
  label?: string;
  loading: boolean;
  disabled?: boolean;
  tooltipKey?: string;
  onClick: () => void;
}

export function MiniGrillButton({
  label = 'Mini Grill',
  loading,
  disabled,
  tooltipKey = 'action-mini-grill',
  onClick,
}: MiniGrillButtonProps) {
  return (
    <span className="inline-flex items-center gap-1 shrink-0">
      <ExplainerTooltip tooltipKey={tooltipKey} side="top">
        <button
          type="button"
          onClick={onClick}
          disabled={loading || disabled}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131620] hover:bg-[#1E2333] border border-[#5E6AD2]/35 text-[11px] font-medium text-[#A5B4FC] hover:text-white transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin text-[#A5B4FC]" />
          ) : (
            <MessageSquarePlus className="w-3 h-3 text-[#A5B4FC]" />
          )}
          <span>{loading ? 'Asking...' : label}</span>
        </button>
      </ExplainerTooltip>
      <HelpBadge tooltipKey={tooltipKey} side="top" />
    </span>
  );
}

interface MiniGrillPanelProps {
  title: string;
  questions: ClarificationItem[];
  onSelectAnswer: (questionId: string, option: string) => void;
  onApplyToSection?: (question: ClarificationItem, option: string) => void;
  onClose: () => void;
}

export function MiniGrillPanel({
  title,
  questions,
  onSelectAnswer,
  onApplyToSection,
  onClose,
}: MiniGrillPanelProps) {
  if (questions.length === 0) return null;

  return (
    <div className="mt-3 p-3.5 rounded-xl bg-[#0D1017] border border-[#5E6AD2]/35 space-y-3 shadow-inner">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <MessageSquarePlus className="w-3.5 h-3.5 text-[#A5B4FC]" />
          <span className="text-[11px] font-semibold text-[#C7D2FE]">
            Mini Grill · {title}
          </span>
          <HelpBadge tooltipKey="action-mini-grill" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mini grill"
          className="p-1 rounded-md text-[#64748B] hover:text-white hover:bg-[#1E2333] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-3 rounded-lg bg-[#131620] border border-[#1D2230] space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5B4FC]">
                {q.category}
              </span>
              {q.selectedAnswer && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Check className="w-3 h-3 text-emerald-400" /> Applied to Section
                </span>
              )}
            </div>
            <p className="text-[12.5px] font-medium text-[#E2E8F0] leading-snug">
              {q.question}
            </p>
            <div className="grid grid-cols-1 gap-1.5 pt-0.5">
              {q.options.map((opt) => {
                const isSelected = q.selectedAnswer === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onSelectAnswer(q.id, opt);
                      onApplyToSection?.(q, opt);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md border text-[12px] transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#5E6AD2]/15 border-[#5E6AD2]/50 text-white font-medium'
                        : 'bg-[#0B0D12] border-[#1D2230] text-[#94A3B8] hover:text-white hover:border-[#2C3347]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#A5B4FC] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
