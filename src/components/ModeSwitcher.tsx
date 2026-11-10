import React from 'react';
import { ComplexityMode } from '../types/project';
import { ExplainerTooltip } from './Tooltip';
import { Layers, Sliders, Sparkles } from 'lucide-react';

interface ModeSwitcherProps {
  mode: ComplexityMode;
  onChange: (mode: ComplexityMode) => void;
}

const MODES: Array<{
  id: ComplexityMode;
  label: string;
  hotkey: string;
  tooltipKey: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'simple',
    label: 'Simple',
    hotkey: 'Alt+1',
    tooltipKey: 'mode-simple',
    icon: Sparkles,
  },
  {
    id: 'balanced',
    label: 'Balanced',
    hotkey: 'Alt+2',
    tooltipKey: 'mode-balanced',
    icon: Layers,
  },
  {
    id: 'pro',
    label: 'Pro',
    hotkey: 'Alt+3',
    tooltipKey: 'mode-pro',
    icon: Sliders,
  },
];

export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Interface Complexity Tier"
      className="inline-flex items-center gap-1 p-1 rounded-full bg-[#0F0C1B]/90 border border-[#C084FC]/25"
    >
      {MODES.map((item) => {
        const Icon = item.icon;
        const active = mode === item.id;
        return (
          <ExplainerTooltip key={item.id} tooltipKey={item.tooltipKey} side="bottom">
            <button
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(item.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#8B5CF6] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_14px_rgba(139,92,246,0.45)]'
                  : 'text-[#CBC3D7] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
              <span
                className={`hidden sm:inline text-[10px] font-mono tabular-nums ${
                  active ? 'text-white/80' : 'text-[#958EA0]'
                }`}
              >
                {item.hotkey}
              </span>
            </button>
          </ExplainerTooltip>
        );
      })}
    </div>
  );
}
