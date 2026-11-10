import React, { useState } from 'react';
import { Plus, Trash2, Bot, UserCheck, Workflow } from 'lucide-react';
import { ProjectState, TaskSlicingMode } from '../types/project';
import { DeckCard } from '../components/Card';
import { LabelWithTooltip } from '../components/Tooltip';

interface TasksDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
}

const SLICING_MODES: Array<{
  id: TaskSlicingMode;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'hitl-first',
    label: 'Check With Me Often (HITL)',
    desc: 'Marks tasks as Human-in-the-Loop so the AI pauses after every step for your review.',
    icon: UserCheck,
  },
  {
    id: 'balanced-slices',
    label: 'Balanced Checkpoints',
    desc: 'Pauses on core architecture & UI flows (HITL) while running styling & tests autonomously (AFK [P]).',
    icon: Workflow,
  },
  {
    id: 'afk-autonomous',
    label: 'Full Autonomous Run (AFK)',
    desc: 'Marks tasks for parallel autonomous execution so agents build end-to-end without stopping.',
    icon: Bot,
  },
];

export function TasksDeck({ state, onUpdate }: TasksDeckProps) {
  const [newRule, setNewRule] = useState('');
  const [newVarKey, setNewVarKey] = useState('');
  const [newVarVal, setNewVarVal] = useState('');

  const updateProField = (
    field: 'stackSummary' | 'architectureStyle' | 'testingStrategy' | 'securityBoundary',
    value: string
  ) => {
    onUpdate((prev) => ({
      ...prev,
      proConfig: {
        ...prev.proConfig,
        [field]: value,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleAddRule = () => {
    const trimmed = newRule.trim();
    if (!trimmed) return;
    onUpdate((prev) => ({
      ...prev,
      proConfig: {
        ...prev.proConfig,
        customRules: [...prev.proConfig.customRules, trimmed],
      },
      lastUpdated: new Date().toISOString(),
    }));
    setNewRule('');
  };

  const handleRemoveRule = (index: number) => {
    onUpdate((prev) => ({
      ...prev,
      proConfig: {
        ...prev.proConfig,
        customRules: prev.proConfig.customRules.filter((_, i) => i !== index),
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleAddVariable = () => {
    const cleanKey = newVarKey.trim().replace(/[^a-zA-Z0-9_]/g, '_');
    const cleanVal = newVarVal.trim();
    if (!cleanKey || !cleanVal) return;
    onUpdate((prev) => ({
      ...prev,
      proConfig: {
        ...prev.proConfig,
        templateVariables: {
          ...prev.proConfig.templateVariables,
          [cleanKey]: cleanVal,
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
    setNewVarKey('');
    setNewVarVal('');
  };

  return (
    <DeckCard
      id="deck-tasks"
      stepNumber="04."
      title="Pro Architect Controls, Task Slicing & AGENTS.md Sections"
      subtitle="Fine-tune how autonomous coding agents slice tasks (HITL vs AFK), customize the 10-section AGENTS.md contract, and manage dynamic {{variable}} tokens."
      tooltipKey="deck-tasks"
    >
      <div className="space-y-6">
        {/* Task Slicing Strategy */}
        <div className="space-y-2.5">
          <LabelWithTooltip
            label="Task Slicing & Autonomy Strategy (tasks.md)"
            tooltipKey="field-task-slicing"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SLICING_MODES.map((item) => {
              const Icon = item.icon;
              const selected = state.proConfig.taskSlicingMode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      proConfig: {
                        ...prev.proConfig,
                        taskSlicingMode: item.id,
                      },
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                      : 'bg-[#0F0C1B]/80 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-white">{item.label}</span>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        selected ? 'text-[#34D399]' : 'text-[#A78BFA]'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#CBC3D7]">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 10-Section AGENTS.md Core Overrides (Plain-English Labels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white">
              Preferred Tech Stack Summary (Section 2: Stack)
            </label>
            <input
              type="text"
              value={state.proConfig.stackSummary}
              onChange={(e) => updateProField('stackSummary', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white">
              System Architecture Pattern (Section 5: Architecture)
            </label>
            <input
              type="text"
              value={state.proConfig.architectureStyle}
              onChange={(e) => updateProField('architectureStyle', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white">
              Verification & Testing Rules (Section 7: Testing)
            </label>
            <input
              type="text"
              value={state.proConfig.testingStrategy}
              onChange={(e) => updateProField('testingStrategy', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white">
              Security & Filesystem Boundary (Section 8: Security)
            </label>
            <input
              type="text"
              value={state.proConfig.securityBoundary}
              onChange={(e) => updateProField('securityBoundary', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>
        </div>

        {/* Interactive Variable Tokens Manager */}
        <div className="space-y-2.5">
          <LabelWithTooltip
            label="Dynamic {{variable}} Tokens (Use in Ideas or Rules)"
            tooltipKey="field-variable-tokens"
          />

          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(state.proConfig.templateVariables).map(([key, val]) => (
              <div
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EC4899]/15 border border-[#EC4899]/35 text-xs font-mono"
              >
                <span className="text-[#EC4899] font-semibold">{`{{${key}}}`}</span>
                <span className="text-white/60">=</span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) =>
                    onUpdate((prev) => ({
                      ...prev,
                      proConfig: {
                        ...prev.proConfig,
                        templateVariables: {
                          ...prev.proConfig.templateVariables,
                          [key]: e.target.value,
                        },
                      },
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className="bg-transparent text-white w-36 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <input
              type="text"
              value={newVarKey}
              onChange={(e) => setNewVarKey(e.target.value)}
              placeholder="token_name"
              className="w-36 px-3 py-1.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
            <input
              type="text"
              value={newVarVal}
              onChange={(e) => setNewVarVal(e.target.value)}
              placeholder="Token value..."
              className="flex-1 min-w-[160px] px-3 py-1.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
            <button
              type="button"
              onClick={handleAddVariable}
              className="pf-btn-secondary inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Token</span>
            </button>
          </div>
        </div>

        {/* Custom Coding & Product Conventions */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-white">
            Persistent AI Coding Rules (Section 6: Coding Conventions)
          </label>
          <div className="space-y-1.5">
            {state.proConfig.customRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#0F0C1B]/80 border border-[#C084FC]/20 text-xs text-[#E9D5FF]"
              >
                <span>• {rule}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRule(idx)}
                  aria-label={`Remove rule ${idx + 1}`}
                  className="p-1 text-[#958EA0] hover:text-[#FFB4AB] cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRule();
                }
              }}
              placeholder="Add a custom instruction for AI agents (e.g., Always include keyboard shortcuts)..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
            <button
              type="button"
              onClick={handleAddRule}
              className="pf-btn-secondary inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rule</span>
            </button>
          </div>
        </div>
      </div>
    </DeckCard>
  );
}
