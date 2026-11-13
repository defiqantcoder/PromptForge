import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Circle,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  HardDrive,
  Loader2,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react';
import {
  ClarificationItem,
  ExportPlatformId,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
} from '../types/project';
import {
  compilePlatformContract,
  generateDefaultWorkflowPlan,
  recommendBuildWorkflow,
} from '../services/compiler';
import { FillFieldResponse } from '../services/geminiClient';
import { DeckCard } from '../components/Card';
import { CodeViewer } from '../components/CodeViewer';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface BuildStageDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFillField: (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ) => Promise<FillFieldResponse | null>;
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
  onOpenSaveModal: () => void;
}

const BUILDER_APPS: Array<{
  id: ExportPlatformId;
  label: string;
  badge: string;
  summary: string;
  url: string;
}> = [
  {
    id: 'gemini-cli',
    label: 'Google Gemini CLI',
    badge: 'Terminal · CLI Coder · GEMINI.md',
    summary: 'Direct terminal AI assistant executing commands, code edits, and verification with GEMINI.md context.',
    url: 'https://github.com/google-gemini/gemini-cli',
  },
  {
    id: 'antigravity',
    label: 'Google Antigravity (AGY)',
    badge: 'Desktop · Native · Terminal',
    summary: 'Autonomous multi-file agent task graph with terminal sandbox & verification gates.',
    url: 'https://antigravity.google/',
  },
  {
    id: 'aistudio',
    label: 'Google AI Studio',
    badge: 'Web · Full-Stack React',
    summary: 'Fast full-stack web scaffolding with server-side Gemini routes and live preview.',
    url: 'https://aistudio.google.com/',
  },
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    badge: 'IDE Workspace Contract',
    summary: 'Repository instructions in .github/copilot-instructions.md with step-by-step edits.',
    url: 'https://github.com/features/copilot',
  },
  {
    id: 'canvas',
    label: 'Gemini Canvas',
    badge: 'Visual Interactive Iteration',
    summary: 'Interactive prototyping canvas for iterative component polish and micro-interactions.',
    url: 'https://gemini.google.com/app',
  },
  {
    id: 'local-ollama',
    label: 'Local AI (Ollama + Continue)',
    badge: '100% Free Offline / Freemium',
    summary: 'Run coding and refactoring locally on your machine with open-weight coder models.',
    url: 'http://127.0.0.1:11434',
  },
];

export function BuildStageDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
  onOpenSaveModal,
}: BuildStageDeckProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [useFreemiumOllama, setUseFreemiumOllama] = useState(
    state.localAgents?.enabled ?? false
  );

  const workflow = recommendBuildWorkflow(state);
  const currentWorkflowPlan =
    state.workflowPlan || generateDefaultWorkflowPlan(state, workflow.nextAppId);

  const handleSelectNextApp = (appId: ExportPlatformId) => {
    onUpdate((prev) => ({
      ...prev,
      suggestedAppOverride: appId,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleResetWorkflowPlan = () => {
    const defaultPlan = generateDefaultWorkflowPlan(state, workflow.nextAppId);
    onUpdate((prev) => ({
      ...prev,
      workflowPlan: defaultPlan,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(workflow.nextPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1600);
    } catch {
      // ignore
    }
  };

  const applyWorkflowMiniGrill = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const detail = `- **${q.category}:** ${clean}`;
    onUpdate((prev) => {
      const plan = prev.workflowPlan || generateDefaultWorkflowPlan(prev, workflow.nextAppId);
      if (plan.includes(clean)) return prev;
      return {
        ...prev,
        workflowPlan: `${plan.trim()}\n${detail}`,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const toggleFreemiumStage3 = () => {
    const nextVal = !useFreemiumOllama;
    setUseFreemiumOllama(nextVal);
    onUpdate((prev) => ({
      ...prev,
      localAgents: {
        ...(prev.localAgents ?? {
          enabled: false,
          provider: 'both',
          ollamaModel: 'qwen2.5-coder:14b',
          ollamaEndpoint: 'http://localhost:11434',
          notes: '',
        }),
        enabled: nextVal,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <DeckCard
      id="deck-build-workflow"
      stepNumber="Stage 2 ·"
      title="Next Build App & End-to-End Workflow Plan"
      subtitle="Select or override the recommended AI tool for full-stack build execution, and customize the complete implementation workflow roadmap."
      tooltipKey="page-build-workflow"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <MiniGrillButton
            label="Mini Grill Workflow"
            tooltipKey="btn-mini-grill-generic"
            loading={miniGrillLoadingTopic === 'workflow'}
            disabled={Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'workflow'}
            onClick={() => void onMiniGrill('workflow')}
          />
          <HelpBadge tooltipKey="workflow-override-app" />
        </div>
      }
    >
      <div className="space-y-8">
        {/* Section 1: Choose / Override Suggested Next App */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                  Configurable Next Build Step
                </span>
                <HelpBadge tooltipKey="workflow-override-app" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Choose Your Next AI Coding Tool
              </h3>
            </div>

            <div className="text-xs text-[#34D399] font-mono">
              Active: {workflow.nextAppName}
            </div>
          </div>

          <p className="text-xs text-[#CBC3D7] leading-relaxed">
            {workflow.whyRecommended} Click any tool below to switch the active build target:
          </p>

          {/* Builder Tool Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BUILDER_APPS.map((app) => {
              const isSelected = workflow.nextAppId === app.id;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleSelectNextApp(app.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/10'
                      : 'bg-[#141120] border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white">{app.label}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-[#958EA0]/50'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A78BFA]">{app.badge}</span>
                  <p className="text-xs text-[#CBC3D7] leading-snug">{app.summary}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Fleshed Out Full Workflow Idea (Editable by User & Compiled into plan.md) */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                  Roadmap & Slices
                </span>
                <HelpBadge tooltipKey="workflow-full-plan" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Fleshed Out End-to-End Implementation Plan
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleResetWorkflowPlan}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                title="Reset to default multi-stage plan"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Default Plan</span>
              </button>

              <FillWithAiButton
                fieldLabel="Workflow Plan"
                loading={fillingField === 'workflowPlan'}
                disabled={fillingField === 'workflowPlan'}
                onClick={() =>
                  void onFillField('workflowPlan', {
                    currentValue: currentWorkflowPlan,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#CBC3D7]">
              <span>
                Edit or refine this plan. It automatically compiles into Section 10 of{' '}
                <code className="text-[#A78BFA]">plan.md</code> and Section 9 of{' '}
                <code className="text-[#A78BFA]">AGENTS.md</code>:
              </span>
              <span className="text-[11px] font-mono text-[#34D399]">Live Compiled</span>
            </div>

            <textarea
              rows={12}
              value={currentWorkflowPlan}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  workflowPlan: e.target.value,
                  lastUpdated: new Date().toISOString(),
                }))
              }
              className="w-full p-4 rounded-xl bg-[#141120] border border-[#C084FC]/25 text-xs sm:text-sm font-mono text-[#E9D5FF] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <MiniGrillPanel
            title="Refine Workflow Plan"
            questions={miniGrillQuestions.workflow ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('workflow', qId, opt)}
            onApplyToSection={applyWorkflowMiniGrill}
            onClose={() => onDismissMiniGrill('workflow')}
          />
        </section>

        {/* Section 3: Next Builder Handoff Action & Prompt */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8B5CF6]/20">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Launch & Handoff to {workflow.nextAppName}
              </h3>
              <p className="text-xs text-[#CBC3D7]">
                Copy this synthesized prompt into {workflow.nextAppName} to start building immediately:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Copied Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Builder Prompt</span>
                  </>
                )}
              </button>

              <a
                href={workflow.nextAppUrl}
                target="_blank"
                rel="noreferrer"
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold cursor-pointer"
              >
                <span>Open {workflow.nextAppName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onOpenSaveModal}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Save Files to Computer</span>
              </button>
            </div>
          </div>

          <CodeViewer
            filename={`${workflow.nextAppId}-workflow-prompt.md`}
            content={workflow.nextPrompt}
            badgeLabel="Stage 2 Prompt"
          />
        </section>

        {/* Section 4: Stage 3 Polish & Freemium Offline Substitution */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                  Stage 3 · Polish & Freemium Alternative
                </span>
                <HelpBadge tooltipKey="workflow-freemium-stage3" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Freemium & Offline Local AI Execution (Ollama)
              </h3>
              <p className="text-xs text-[#CBC3D7] max-w-xl">
                Want to build, test, and refactor without paid cloud API keys? Switch to the 100% free offline path using local open-weight coder models.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleFreemiumStage3}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                useFreemiumOllama
                  ? 'bg-[#34D399]/20 border-[#34D399] text-[#34D399]'
                  : 'bg-[#141120] border-[#C084FC]/30 text-[#CBC3D7] hover:border-[#C084FC]/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>
                {useFreemiumOllama
                  ? 'Freemium Local AI Active'
                  : 'Enable Free Offline Ollama Workflow'}
              </span>
            </button>
          </div>

          {useFreemiumOllama && (
            <div className="p-4 rounded-xl bg-[#141120] border border-[#34D399]/30 text-xs text-[#CBC3D7] space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                <span>Local AI Mode enabled:</span>
              </div>
              <p>
                PromptForge has activated local model rules in <code className="text-[#34D399]">.continuerules</code> and configured Ollama endpoints at <code className="text-[#34D399]">http://localhost:11434</code>. Visit <strong>Screen 07 · Local AI Agents</strong> to configure model tags and presets.
              </p>
            </div>
          )}
        </section>
      </div>
    </DeckCard>
  );
}
