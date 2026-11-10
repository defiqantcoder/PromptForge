import React from 'react';
import { Gauge, Lock, Moon, WifiOff, HelpCircle } from 'lucide-react';
import { GroundRules, ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip } from '../components/Tooltip';

interface ArchitectureDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
}

const RULES_CONFIG: Array<{
  key: keyof GroundRules;
  title: string;
  plainSubtitle: string;
  specEffect: string;
  tooltipKey: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    key: 'offlineFirst',
    title: 'Works Without Internet',
    plainSubtitle: 'Keep forms and user notes working smoothly even when Wi-Fi drops.',
    specEffect: 'Enforces local in-memory & disk state persistence',
    tooltipKey: 'rule-offline-first',
    icon: WifiOff,
  },
  {
    key: 'highPerformance',
    title: 'Instant Screen Speed',
    plainSubtitle: 'Buttons, filters, and tabs respond in under 200ms without lag.',
    specEffect: 'Enforces optimistic UI & compositor-only motion',
    tooltipKey: 'rule-high-performance',
    icon: Gauge,
  },
  {
    key: 'localPrivacy',
    title: 'Keep Data on This Device',
    plainSubtitle: 'Store keys in the system keyring and lock file exports to chosen folders.',
    specEffect: 'Enforces canonical Rust path guards & local privacy',
    tooltipKey: 'rule-local-privacy',
    icon: Lock,
  },
  {
    key: 'darkModeDefault',
    title: 'Twilight Dark Theme Default',
    plainSubtitle: 'Launch with an eye-friendly high-contrast dark surface palette.',
    specEffect: 'Configures WCAG AA dark glassmorphic tokens',
    tooltipKey: 'rule-dark-mode',
    icon: Moon,
  },
];

export function ArchitectureDeck({ state, onUpdate }: ArchitectureDeckProps) {
  const toggleRule = (key: keyof GroundRules) => {
    onUpdate((prev) => ({
      ...prev,
      groundRules: {
        ...prev.groundRules,
        [key]: !prev.groundRules[key],
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const activeCount = Object.values(state.groundRules).filter(Boolean).length;

  return (
    <DeckCard
      id="deck-architecture"
      stepNumber="02."
      title="Everyday Ground Rules & Quality Guardrails"
      subtitle="Toggle how your app should behave in the real world. Each switch automatically writes non-negotiable engineering rules into your specification."
      tooltipKey="deck-architecture"
      headerRight={
        <span className="text-xs font-mono text-[#34D399] tabular-nums">
          {activeCount} of 4 guardrails active
        </span>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {RULES_CONFIG.map((rule) => {
          const Icon = rule.icon;
          const enabled = state.groundRules[rule.key];

          return (
            <ExplainerTooltip key={rule.key} tooltipKey={rule.tooltipKey} side="top">
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => toggleRule(rule.key)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  enabled
                    ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/60 text-white'
                    : 'bg-[#0F0C1B]/75 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        enabled ? 'text-[#34D399]' : 'text-[#958EA0]'
                      }`}
                    />
                    <span className="text-sm font-semibold text-white">{rule.title}</span>
                    <HelpCircle className="w-3.5 h-3.5 text-[#A78BFA]/60 shrink-0" />
                  </div>
                  <p className="text-xs text-[#CBC3D7] leading-relaxed">
                    {rule.plainSubtitle}
                  </p>
                  <p className="text-[11px] font-mono text-[#A78BFA] pt-0.5">
                    → {rule.specEffect}
                  </p>
                </div>

                {/* Pill Toggle Visual */}
                <div
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 mt-0.5 ${
                    enabled ? 'bg-[#8B5CF6]' : 'bg-[#363243]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </button>
            </ExplainerTooltip>
          );
        })}
      </div>
    </DeckCard>
  );
}
