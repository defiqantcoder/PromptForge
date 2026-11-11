import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { ExplainerTooltip } from './Tooltip';

interface FillWithAiButtonProps {
  fieldLabel: string;
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function FillWithAiButton({
  fieldLabel,
  loading,
  disabled,
  onClick,
}: FillWithAiButtonProps) {
  return (
    <ExplainerTooltip tooltipKey="action-fill-with-ai" side="top">
      <button
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
        aria-label={`Fill ${fieldLabel} with AI`}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/30 border border-[#C084FC]/30 text-[11px] font-medium text-[#D0BCFF] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin text-[#EC4899]" />
        ) : (
          <Sparkles className="w-3 h-3 text-[#EC4899]" />
        )}
        <span>{loading ? 'Filling...' : 'Fill with AI'}</span>
      </button>
    </ExplainerTooltip>
  );
}
