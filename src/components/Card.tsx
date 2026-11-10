import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ExplainerTooltip } from './Tooltip';

interface DeckCardProps {
  id?: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  tooltipKey: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

export function DeckCard({
  id,
  stepNumber,
  title,
  subtitle,
  tooltipKey,
  headerRight,
  children,
}: DeckCardProps) {
  return (
    <section
      id={id}
      className="pf-card rounded-2xl p-5 md:p-6 transition-colors"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 mb-5 border-b border-[#C084FC]/15">
        <div className="space-y-1">
          <ExplainerTooltip tooltipKey={tooltipKey} side="top" align="start">
            <div className="inline-flex items-center gap-2.5 cursor-help group">
              <span className="text-xs font-mono font-semibold text-[#A78BFA] tabular-nums">
                {stepNumber}
              </span>
              <h2 className="text-lg font-semibold text-white tracking-tight group-hover:text-[#D0BCFF] transition-colors">
                {title}
              </h2>
              <HelpCircle className="w-4 h-4 text-[#A78BFA]/70 group-hover:text-[#8B5CF6] transition-colors shrink-0" />
            </div>
          </ExplainerTooltip>
          <p className="text-xs text-[#CBC3D7] max-w-2xl">{subtitle}</p>
        </div>
        {headerRight && <div className="flex items-center gap-2 shrink-0">{headerRight}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
}
