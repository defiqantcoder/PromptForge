import React, { useState } from 'react';
import { Bot, Plus, Trash2, UserCheck, Workflow } from 'lucide-react';
import {
  ClarificationItem,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  TaskSlicingMode,
} from '../types/project';
import { FillFieldResponse } from '../services/geminiClient';
import { DeckCard } from '../components/Card';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface TasksDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFillField: (field: FillableFieldId) => Promise<FillFieldResponse | null>;
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

const PRO_FIELDS: Array<{
  field: 'stackSummary' | 'architectureStyle' | 'testingStrategy' | 'securityBoundary';
  label: string;
  tooltipKey: string;
}> = [
  {
    field: 'stackSummary',
    label: 'Preferred Tech Stack Summary (Section 2: Stack)',
    tooltipKey: 'field-pro-stack',
  },
  {
    field: 'architectureStyle',
    label: 'System Architecture Pattern (Section 5: Architecture)',
    tooltipKey: 'field-pro-architecture',
  },
  {
    field: 'testingStrategy',
    label: 'Verification & Testing Rules (Section 7: Testing)',
    tooltipKey: 'field-pro-testing',
  },
  {
    field: 'securityBoundary',
    label: 'Security & Filesystem Boundary (Section 8: Security)',
    tooltipKey: 'field-pro-security',
  },
];

export function TasksDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
}: TasksDeckProps) {
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

  const handleFillVariable = async () => {
    const res = await onFillField('templateVariable');
    if (res?.value) {
      setNewVarKey(res.value.trim().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase());
      setNewVarVal(res.secondaryValue || '');
    }
  };

  const handleFillCustomRule = async () => {
    const res = await onFillField('customRule');
    if (res?.value) {
      setNewRule(res.value);
    }
  };

  const applyProMiniGrill = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const ruleText = `${q.category}: ${clean}`;
    onUpdate((prev) => {
      if (prev.proConfig.customRules.includes(ruleText)) return prev;
      return {
        ...prev,
        proConfig: {
          ...prev.proConfig,
          customRules: [...prev.proConfig.customRules, ruleText],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  return (
    <DeckCard
      id="deck-tasks"
      stepNumber="04."
      title="Pro Architect Controls, Task Slicing & AGENTS.md Sections"
      subtitle="Fine-tune how autonomous coding agents slice tasks (HITL vs AFK), customize the 10-section AGENTS.md contract, and manage dynamic {{variable}} tokens."
      tooltipKey="deck-tasks"
      headerRight={
        <MiniGrillButton
          label="Mini Grill Architecture"
          loading={miniGrillLoadingTopic === 'proArch'}
          disabled={Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'proArch'}
          onClick={() => void onMiniGrill('proArch')}
        />
      }
    >
      <div className="space-y-6">
        <MiniGrillPanel
          title="Sharpen Architecture & Conventions"
          questions={miniGrillQuestions.proArch ?? []}
          onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('proArch', qId, opt)}
          onApplyToSection={applyProMiniGrill}
          onClose={() => onDismissMiniGrill('proArch')}
        />

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

        {/* 10-Section AGENTS.md Core Overrides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRO_FIELDS.map(({ field, label, tooltipKey }) => (
            <div key={field} className="space-y-1.5">
              <LabelWithTooltip
                label={label}
                tooltipKey={tooltipKey}
                htmlFor={`pro-field-${field}`}
              />
              <div className="flex items-center gap-2">
                <input
                  id={`pro-field-${field}`}
                  type="text"
                  value={state.proConfig[field]}
                  onChange={(e) => updateProField(field, e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
                <FillWithAiButton
                  fieldLabel={label}
                  loading={fillingField === field}
                  disabled={Boolean(fillingField) && fillingField !== field}
                  onClick={() => void onFillField(field)}
                />
              </div>
            </div>
          ))}
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
            <HelpBadge tooltipKey="field-pro-new-token" />
            <FillWithAiButton
              fieldLabel="Dynamic Token"
              loading={fillingField === 'templateVariable'}
              disabled={Boolean(fillingField) && fillingField !== 'templateVariable'}
              onClick={() => void handleFillVariable()}
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
          <LabelWithTooltip
            label="Persistent AI Coding Rules (Section 6: Coding Conventions)"
            tooltipKey="field-pro-custom-rules"
          />
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

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1">
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
              className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
            <FillWithAiButton
              fieldLabel="Custom Coding Rule"
              loading={fillingField === 'customRule'}
              disabled={Boolean(fillingField) && fillingField !== 'customRule'}
              onClick={() => void handleFillCustomRule()}
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
