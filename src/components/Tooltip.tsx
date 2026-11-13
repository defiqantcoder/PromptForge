import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { HelpCircle, Sparkles } from 'lucide-react';
import { TOOLTIP_DICTIONARY } from '../services/tooltips';

interface ExplainerTooltipProps {
  tooltipKey: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function ExplainerTooltip({
  tooltipKey,
  children,
  side = 'top',
  align = 'center',
}: ExplainerTooltipProps) {
  const entry = TOOLTIP_DICTIONARY[tooltipKey];
  if (!entry) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            role="tooltip"
            side={side}
            align={align}
            sideOffset={8}
            className="pf-popover z-50 max-w-xs rounded-xl p-3.5 text-left animate-in fade-in-0 zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-white tracking-tight">
                {entry.title}
              </span>
              <span className="text-[11px] font-medium text-[#A78BFA] whitespace-nowrap shrink-0">
                Plain English Guide
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#E9D5FF] mb-2">
              {entry.description}
            </p>
            <div className="pt-2 border-t border-[#C084FC]/20 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
              <p className="text-[11px] leading-snug text-[#CBC3D7]">
                <span className="font-semibold text-[#34D399]">How AI uses this: </span>
                {entry.aiUsage}
              </p>
            </div>
            <TooltipPrimitive.Arrow className="fill-[#261E41]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

interface LabelWithTooltipProps {
  label: string;
  tooltipKey: string;
  stepBadge?: string;
  htmlFor?: string;
}

export function LabelWithTooltip({
  label,
  tooltipKey,
  stepBadge,
  htmlFor,
}: LabelWithTooltipProps) {
  return (
    <ExplainerTooltip tooltipKey={tooltipKey} side="top" align="start">
      <label
        htmlFor={htmlFor}
        className="inline-flex items-center gap-2 text-sm font-semibold text-white cursor-help group select-none"
      >
        {stepBadge && (
          <span className="text-xs font-mono font-medium text-[#A78BFA] tabular-nums">
            {stepBadge}
          </span>
        )}
        <span className="group-hover:text-[#D0BCFF] transition-colors">{label}</span>
        <HelpCircle className="w-3.5 h-3.5 text-[#A78BFA]/70 group-hover:text-[#8B5CF6] transition-colors shrink-0" />
      </label>
    </ExplainerTooltip>
  );
}

interface HelpBadgeProps {
  tooltipKey: string;
  label?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function HelpBadge({
  tooltipKey,
  label = 'Show plain-English help',
  side = 'top',
  align = 'center',
}: HelpBadgeProps) {
  return (
    <ExplainerTooltip tooltipKey={tooltipKey} side={side} align={align}>
      <button
        type="button"
        aria-label={label}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[#A78BFA]/80 hover:text-[#D0BCFF] hover:bg-[#8B5CF6]/20 transition-colors cursor-help shrink-0 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
    </ExplainerTooltip>
  );
}
