import { ExportPlatformId, ProjectState, SpecFileId, StitchScreenPrompt } from '../types/project';
import {
  CODING_LANGUAGES,
  DEFAULT_LOCAL_AGENTS,
  DEFAULT_MULTI_AGENT,
} from './presets';

const PLATFORM_LABELS: Record<ProjectState['targetPlatform'], string> = {
  desktop: 'Native Ubuntu Desktop Application (Tauri v2 + React 19)',
  web: 'Responsive Full-Stack Web Application (React 19 + Express + Vite)',
  mobile: 'Mobile-First Progressive Web Application (Touch Ergonomic 48px Targets)',
  cli: 'Interactive Command-Line & Developer Terminal Tool',
};

export function getCodingLanguageLabel(state: ProjectState): string {
  const found = CODING_LANGUAGES.find((l) => l.id === (state.codingLanguage || 'auto'));
  const base = found ? found.label : 'Let AI Recommend';
  const note = state.codingLanguageNote?.trim();
  return note ? `${base} (${note})` : base;
}

function interpolateVariables(text: string, vars: Record<string, string>): string {
  if (!vars) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
}

export function compileSpecMd(state: ProjectState): string {
  const safeFeatures = (state.features || [])
    .map((f) => f.replace(/[\r\n]+/g, ' ').trim())
    .filter(Boolean);
  const earsRequirements = safeFeatures.map((feat, idx) => {
    const clean = feat.replace(/\.$/, '');
    return `- **REQ-00${idx + 1} (Feature Flow):** When the user interacts with the workspace to ${clean.charAt(0).toLowerCase() + clean.slice(1)}, the system shall complete the action with clear visual feedback and preserve active session state.`;
  });

  if (state.groundRules.offlineFirst) {
    earsRequirements.push(
      '- **REQ-OFFLINE (Offline Resilience):** When network connectivity is unavailable or interrupted, the system shall retain all active form inputs and local project state in memory without data loss.'
    );
  }
  if (state.groundRules.highPerformance) {
    earsRequirements.push(
      '- **REQ-PERF (Latency Budget):** When the user toggles modes, filters views, or hovers over explainers, the system shall render visual feedback within 100–200 milliseconds.'
    );
  }
  if (state.groundRules.localPrivacy) {
    earsRequirements.push(
      '- **REQ-PRIVACY (Local Security Boundary):** When storing API keys or exporting specification bundles, the system shall route credentials through secure server/keyring storage and canonicalize target file paths.'
    );
  }
  if (state.groundRules.darkModeDefault) {
    earsRequirements.push(
      '- **REQ-DARKMODE (Dark Theme Default):** When the system loads, the system shall render a glassmorphic twilight dark theme by default.'
    );
  }
  if (state.clarifications && state.clarifications.length > 0) {
    state.clarifications.forEach((c) => {
      earsRequirements.push(
        `- **REQ-CLARIFICATION-${c.id} (${c.category}):** When handling ${c.category}, the system shall enforce the confirmed decision: ${c.selectedAnswer || c.options[0]}.`
      );
    });
  }

  const clarificationLines =
    state.clarifications && state.clarifications.length > 0
      ? state.clarifications
          .map(
            (c) =>
              `- **${c.category}** — *${c.question}*\n  - **Confirmed Decision:** ${c.selectedAnswer || c.options[0]}`
          )
          .join('\n')
      : '- No Socratic clarifications recorded yet. Run "Grill Me" to lock in edge-case decisions.';

  const featuresList = safeFeatures.length > 0
    ? safeFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')
    : '1. No features defined yet.';

  const raw = `# Product Specification: ${state.appName}

> **Tagline:** ${state.tagline || 'No tagline provided'}
> **Target Environment:** ${PLATFORM_LABELS[state.targetPlatform]}
> **Coding Language:** ${getCodingLanguageLabel(state)}
> **Primary AI Model:** \`{{primary_model}}\` · **Target OS:** \`{{target_os}}\`

## 1. Objective
${state.coreIdea || 'No core idea provided'}

## 2. Target Users
- **Everyday Builders & Creators:** Users who want a fast, jargon-free experience for ${state.appName} without wrestling with complex setup steps.
- **Power Users & Technical Practitioners:** Users who value deterministic exports, keyboard-first speed, and clear system boundaries.

## 3. Core Capabilities (Feature List)
${featuresList}

## 4. Confirmed Clarification Decisions ("Grill Me" Outcomes)
${clarificationLines}

## 5. Behavioral Requirements (EARS Notation)
${earsRequirements.length > 0 ? earsRequirements.join('\n') : '- No specific behaviors defined.'}
- **REQ-ERROR (Graceful Recovery):** When an external AI or I/O call fails or times out after 30 seconds, the system shall surface a clear, human-readable warning banner and retain all active user text.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compilePlanMd(state: ProjectState): string {
  const safeFeatures = (state.features || []).map((f) => f.trim()).filter(Boolean);
  const featureArchRows =
    safeFeatures.length > 0
      ? safeFeatures
          .map(
            (feat, idx) =>
              `| F-${String(idx + 1).padStart(2, '0')} | ${feat.replace(/\|/g, '/')} | UI Component -> State Store -> Validation -> ${
                state.targetPlatform === 'desktop' ? 'Rust IPC / Local Storage' : 'Express API / Persistence'
              } |`
          )
          .join('\n')
      : '| F-01 | Primary workflow | UI Component -> State Store -> Local/API Handler |';

  const screens = state.stitchUi?.screens ?? [];
  const screensInventory =
    screens.length > 0
      ? screens
          .map(
            (s, i) =>
              `${i + 1}. **${s.name}** (\`${s.kind}\`) — ${s.notes || 'Follow global visual direction'}`
          )
          .join('\n')
      : '1. **Primary Screen** — Core interactive workstation canvas matching Stitch visual tokens.';

  const stitchSection = state.stitchUi?.uploadedResultName
    ? `- **Uploaded Stitch Artifact**: \`${state.stitchUi.uploadedResultName}\`
- **Stitch Handoff Guidance**: ${state.stitchUi.uploadedResultNotes || 'Wire interactive state, form validation, and loading/error states onto imported Stitch layout.'}`
    : '- **Pending Stitch Export**: Generate screens via Google Stitch first, then bind real handlers onto the approved layout.';

  const localAgents = state.localAgents ?? DEFAULT_LOCAL_AGENTS;
  const localAgentPlan = localAgents.enabled
    ? `### 8. Optional Local AI Workflow (${localAgents.provider.toUpperCase()})
- **Ollama Endpoint**: \`${localAgents.ollamaEndpoint}\`
- **Model**: \`${localAgents.ollamaModel}\`
- **Configuration Artifact**: \`.continuerules\` & \`.continue/config.yaml\` rules synced from specification invariants.
- **Usage Note**: ${localAgents.notes || 'Use local models for privacy-sensitive refactoring and offline tests.'}`
    : '### 8. Optional Local AI Workflow\n- Currently disabled (`localAgents.enabled = false`). Can be toggled on at any time to emit `.continuerules` and Ollama prompts.';

  const multiAgent = state.multiAgent ?? DEFAULT_MULTI_AGENT;
  const multiAgentPlan = multiAgent.enabled
    ? `### 9. Multi-Agent Coordination Boundaries
See \`COLLABORATION.md\` for full file-claim rules. Active ownership lanes:
${multiAgent.lanes
  .map(
    (lane) =>
      `- **${lane.agentName}** (${lane.status}): Work On \`${lane.workOnPaths}\` | Stay Away From \`${lane.stayAwayPaths}\``
  )
  .join('\n')}`
    : '### 9. Multi-Agent Coordination\n- Single-agent sequential workflow active (enable Multi-Agent Collaboration to generate `COLLABORATION.md` lane locks).';

  const raw = `# Technical Implementation Plan: ${state.appName}

> **Summary:** ${state.tagline || 'No tagline provided.'}
> **Target Platform:** ${PLATFORM_LABELS[state.targetPlatform]}
> **Preferred Coding Language:** ${getCodingLanguageLabel(state)}

---

## 1. System Architecture & Data Flow
${state.appName} enforces a strict separation between the sandboxed UI layer, deterministic specification/validation logic, AI synthesis adapters (\`{{primary_model}}\`), and local OS/filesystem boundaries on \`{{target_os}}\`.

\`\`\`
[User Interface & Multi-Screen Views]
    │  (Typed Domain State + Optimistic Updates)
    ▼
[State Manager & Live Contract Compiler]
    ├──► [Offline Validation & Persistence] ──► localStorage / Disk Exports
    ├──► [Cloud Gemini Service ({{primary_model}})] ──► Express / Tauri Proxy (30s timeout)
    ${
      localAgents.enabled
        ? `├──► [Local AI Runtime (${localAgents.ollamaModel} @ ${localAgents.ollamaEndpoint})]`
        : '└──► [Tauri IPC / OS Native Bridge]'
    }
    └──► [Tauri IPC / Native Layer]
             ├──► Canonical Path Guard + Atomic Spec Bundle Writer
             └──► System Keyring Credential Guard
\`\`\`

- **Tech Stack Summary:** ${state.proConfig.stackSummary}
- **Architecture Style:** ${state.proConfig.architectureStyle}
- **Slicing Strategy:** \`${state.proConfig.taskSlicingMode}\`

---

## 2. Feature-to-Module Architecture Matrix

| Feature ID | User Capability | Execution Path |
| --- | --- | --- |
${featureArchRows}

---

## 3. UI Surfaces & Multi-Screen Hierarchy
- **Global Visual Direction:** ${state.stitchUi?.visualDirection || 'Twilight dark palette (`#0F0C1B` canvas, frosted cards, `{{accent_color}}` accents, `#34D399` status badges).'}
- **Defined Screens & Menus:**
${screensInventory}
${stitchSection}

---

## 4. Key Domain Models & Validation Rules

\`\`\`typescript
export type TargetPlatform = '${state.targetPlatform}';
export type CodingLanguageId = '${state.codingLanguage || 'auto'}';

export interface ProjectState {
  id: string;
  appName: string; // "${state.appName}"
  tagline: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  codingLanguage?: CodingLanguageId;
  features: string[]; // ${safeFeatures.length} defined features
  groundRules: {
    offlineFirst: ${state.groundRules.offlineFirst};
    highPerformance: ${state.groundRules.highPerformance};
    localPrivacy: ${state.groundRules.localPrivacy};
    darkModeDefault: ${state.groundRules.darkModeDefault};
  };
  clarifications: Array<{ id: string; category: string; question: string; selectedAnswer?: string }>;
}
\`\`\`

- **Input Validation Rules**: Reject empty directory paths, block \`..\` path traversal, validate request payloads before hitting AI SDKs, and enforce O(n) linear scanning on template token inspection.

---

## 5. Native IPC & Backend API Contracts
1. **\`save_spec_bundle(target_dir: String, files: HashMap<String, String>) -> Result<bool, String>\`**
   - Expands \`~/\`, verifies directory boundaries, enforces symlink-escape rejection, atomically renames temporary writes for \`AGENTS.md\`, \`spec.md\`, \`plan.md\`, \`tasks.md\`, \`COLLABORATION.md\`, and \`.continuerules\`.
2. **\`get_secure_key\` / \`set_secure_key\` / \`has_secure_key\`**
   - Reads and persists Gemini API keys via OS keyring without writing credentials to repo files or logs.
3. **\`POST /api/gemini/*\` & \`gemini_proxy_request\`**
   - Supports \`expand\`, \`random-idea\`, \`grill\`, \`fill-field\`, \`mini-grill\`, \`stitch-surprise\`, and \`recommend-language\` with explicit model selection (\`{{primary_model}}\`), fast thinking budgets (\`LOW\`/\`MINIMAL\`), and 30-second AbortController timeouts.
4. **\`POST /api/export/bundle\` & \`POST /api/specs/validate\`**
   - Deterministic ZIP + \`SHA256SUMS.txt\` archive generator and offline spec-readiness auditor.

---

## 6. Offline Resilience, Performance & Error Recovery
- **Offline First (${state.groundRules.offlineFirst ? 'Required' : 'Optional'})**: Form edits and recent blueprints save locally in \`localStorage\`; deterministic compilation and offline checks run without network access.
- **Latency Budget (${state.groundRules.highPerformance ? '<200ms UI' : 'Standard'})**: Use low/minimal model thinking presets on Flash/Lite models for quick interactive AI actions; retain user text non-destructively when upstream AI calls time out or fail.
- **Accessibility**: Every interactive control, header, blank input, and card mounts plain-English \`role="tooltip"\` explainers.

---

## 7. Security Boundaries, Phased Milestones & Verification Matrix
- **Security Boundary:** ${state.proConfig.securityBoundary}
- **Testing Strategy:** ${state.proConfig.testingStrategy}

| Milestone Phase | Deliverable | Required Verification Gate |
| --- | --- | --- |
| Phase 1 · Core Models & UI | Multi-screen Stitch layout + domain types | \`npx tsc --noEmit\` (0 errors) |
| Phase 2 · Backend & IPC | Rate-limited Express routes + Rust IPC guards | \`npm test\` + \`cargo test\` |
| Phase 3 · Packaging & Polish | Production Vite build + Ubuntu Tauri bundle | \`npm run build\` + \`cargo clippy -- -D warnings\` |

---

${localAgentPlan}

${multiAgentPlan}

### 10. End-to-End Implementation Workflow Plan
${state.workflowPlan?.trim() || generateDefaultWorkflowPlan(state, state.suggestedAppOverride)}
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileCollaborationMd(state: ProjectState): string {
  const multiAgent = state.multiAgent ?? DEFAULT_MULTI_AGENT;
  const laneRows = multiAgent.lanes
    .map(
      (lane) =>
        `| ${lane.agentName} | ${lane.focusArea} | \`${lane.workOnPaths}\` | \`${lane.stayAwayPaths}\` | **${lane.status.toUpperCase()}** | ${lane.handoffNote || 'Sync before merging'} |`
    )
    .join('\n');

  const laneSections = multiAgent.lanes
    .map(
      (lane, idx) => `### Lane ${idx + 1}: ${lane.agentName}
- **Focus Area:** ${lane.focusArea}
- **Current Status:** \`${lane.status}\`
- **WORK ON (Owned Scope):** \`${lane.workOnPaths}\`
- **STAY AWAY FROM (Do Not Modify):** \`${lane.stayAwayPaths}\`
- **Handoff & Coordination Note:** ${lane.handoffNote || 'Document any interface changes here before marking done.'}`
    )
    .join('\n\n');

  const raw = `# Multi-Agent Collaboration & File Boundary Board — ${state.appName}

> **Purpose:** Shared coordination ledger for parallel AI coding agents working on **${state.appName}** (${getCodingLanguageLabel(state)}).
> Read this file before touching any code, claim your active lane, respect **Stay Away From** boundaries, and record handoff notes when done.

## 1. Status Overview (${multiAgent.enabled ? 'MULTI-AGENT MODE ACTIVE' : 'SINGLE-AGENT / STANDBY'})

| Agent | Focus Area | Work On (Allowed Paths) | Stay Away From (Restricted) | Status | Handoff Note |
| --- | --- | --- | --- | --- | --- |
${laneRows}

## 2. Detailed Agent Boundaries

${laneSections}

## 3. Shared Coordination Protocol
${multiAgent.sharedProtocolNotes || DEFAULT_MULTI_AGENT.sharedProtocolNotes}

### Mandatory Merge & Handoff Checklist
1. **Before Starting:** Check the status table above and set your lane status to \`in-progress\`. Do not edit files listed under another agent's **Work On** column without leaving a note here first.
2. **Contract Changes:** If a shared domain type (\`src/types/project.ts\` or IPC schema) must change, update the contract summary in Section 4 below before downstream agents consume it.
3. **Before Marking Done:** Run \`npx tsc --noEmit\`, \`npm test\`, and \`cargo test --manifest-path src-tauri/Cargo.toml\` (if Rust changed), update your **Handoff Note**, and switch status to \`done\`.

## 4. Shared Contract Notes & Active Locks
- **Active Project**: \`${state.appName}\` (\`${state.targetPlatform}\`, language: \`${state.codingLanguage || 'auto'}\`)
- **Features Locked for Build**: ${(state.features || []).length} defined features
- **Verification Owner**: Last lane touching integration tests confirms full suite green.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileContinueRules(state: ProjectState): string {
  const local = state.localAgents ?? DEFAULT_LOCAL_AGENTS;
  const raw = `# PromptForge Local AI Rules (.continuerules) — ${state.appName}
# Compatible with Continue IDE Extension + Ollama (${local.ollamaModel} @ ${local.ollamaEndpoint})

## Project Overview
- App: ${state.appName} — ${state.tagline}
- Platform: ${PLATFORM_LABELS[state.targetPlatform]}
- Preferred Language: ${getCodingLanguageLabel(state)}
- Idea: ${state.coreIdea}

## Feature Requirements
${(state.features || []).map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Architectural & Security Guardrails
- Stack: ${state.proConfig.stackSummary}
- Architecture: ${state.proConfig.architectureStyle}
- Testing: ${state.proConfig.testingStrategy}
- Security: ${state.proConfig.securityBoundary}
${(state.proConfig.customRules || []).map((r) => `- Rule: ${r}`).join('\n')}

## Local Model & Continue Instructions
- Provider Preference: ${local.provider}
- Ollama Endpoint: ${local.ollamaEndpoint}
- Recommended Local Model: ${local.ollamaModel}
- Notes: ${local.notes || 'Keep inference 100% local and never embed API keys in repo files.'}
${
  (state.multiAgent?.enabled ?? false)
    ? `- Multi-Agent Active: Respect path ownership boundaries declared in COLLABORATION.md.`
    : ''
}
`;
  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileStitchScreenPrompt(
  state: ProjectState,
  screen: StitchScreenPrompt
): string {
  const stitch = state.stitchUi;
  const raw = `# Google Stitch UI Prompt — ${state.appName} · ${screen.name} (${screen.kind.toUpperCase()})

Design a focused, high-precision **${screen.kind}** view named **"${screen.name}"** for **${state.appName}** (${state.tagline || 'No tagline'}) targeting **${PLATFORM_LABELS[state.targetPlatform]}**.

## Specific Requirements for "${screen.name}"
- **Surface Type:** ${screen.kind}
- **Layout & Component Notes:** ${screen.notes || 'Clean hierarchy matching overall app visual language.'}

## Consistent App Visual Direction
- ${stitch?.visualDirection || 'Deep twilight glassmorphic workstation (#0F0C1B canvas, frosted #1B152E cards, {{accent_color}} primary accents, #34D399 status badges).'}
- Keep spacing, typography, dark contrast ratios (WCAG AA), and component geometry consistent with the rest of ${state.appName}.

## Related Features Connected to This Surface
${(state.features || []).map((f, i) => `${i + 1}. ${f}`).join('\n') || '1. Primary user actions'}
`;
  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileTasksMd(state: ProjectState): string {
  const safeFeatures = (state.features || []).map(f => f.trim()).filter(Boolean);

  const resolveTag = (defaultTag: 'HITL' | 'AFK', isEven: boolean) => {
    switch (state.proConfig.taskSlicingMode) {
      case 'hitl-first': return 'HITL';
      case 'afk-autonomous': return 'AFK';
      case 'balanced-slices': return isEven ? 'HITL' : 'AFK';
      default: return defaultTag;
    }
  };

  const featureTasks = safeFeatures.slice(0, 4).map((feat, idx) => {
    const num = String(idx + 4).padStart(3, '0');
    const tag = resolveTag('HITL', idx % 2 === 0);
    const parallel = tag === 'AFK' ? ' [P]' : '';
    return `- [ ] **T${num}: Feature Slice — ${feat.slice(0, 58)}${feat.length > 58 ? '...' : ''} (${tag})${parallel}**
  - Implement UI controls, state handlers, and plain-English hover tooltip explainers for: *${feat}*.
  - Verification: Interact with the control in the live workspace and confirm state updates immediately without console errors.`;
  });

  const tag001 = resolveTag('HITL', true);
  const tag002 = resolveTag('AFK', false);
  const tag003 = resolveTag('AFK', false);
  const tag008 = resolveTag('HITL', true);

  const raw = `# Implementation Tasks: ${state.appName}

> **Execution Strategy:** \`${state.proConfig.taskSlicingMode}\` · **Target OS:** \`{{target_os}}\`
> **Legend:** \`(HITL)\` = Human-in-the-Loop checkpoint · \`(AFK)\` = Autonomous background execution · \`[P]\` = Safe to parallelize

- [ ] **T001: Project Scaffolding & IPC Foundation (${tag001})**
  - Initialize ${state.proConfig.stackSummary}.
  - Configure least-privilege permissions and typed command bridges for \`{{export_dir}}\`.
  - Verification: Run \`npx tsc --noEmit\` and confirm the application boots cleanly on port 3000 / desktop shell.

- [ ] **T002: Design Tokens & Glassmorphic Surface Theme (${tag002})${tag002 === 'AFK' ? ' [P]' : ''}**
  - Implement the night-violet palette (\`#0F0C1B\`), frosted card surfaces, and \`{{accent_color}}\` primary action styles.
  - Build reusable UI primitives: \`Card\`, \`Tooltip\`, \`ModeSwitcher\`, and \`CodeViewer\`.
  - Verification: Render workspace cards and verify 12px backdrop blur, 1px lilac borders, and tabular numerals.

- [ ] **T003: Universal Hover Explainer System (${tag003})${tag003 === 'AFK' ? ' [P]' : ''}**
  - Wrap Radix UI Tooltip primitives with a 100ms hover delay and \`role="tooltip"\` accessibility semantics.
  - Connect central plain-English dictionary covering all section badges, switches, and exporters.
  - Verification: Hover over any section label and confirm the lilac-bordered explainer callout appears cleanly.

${featureTasks.length > 0 ? featureTasks.join('\n\n') : '- No feature tasks defined.'}

- [ ] **T008: Contract Compiler, Multi-Platform Exporter & Native Save Modal (${tag008})**
  - Compile \`ProjectState\` into \`spec.md\`, \`plan.md\`, \`tasks.md\`, and 10-section \`AGENTS.md\`.
  - Wire the Ubuntu directory export modal with canonical path validation (\`../\` rejection) and direct file downloads.
  - Verification: Click "Save to Computer", verify file sizes, and confirm all 4 specification files export cleanly.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileAgentsMd(state: ProjectState): string {
  const customRules = (state.proConfig.customRules || []).map(r => r.trim()).filter(Boolean);
  const customRulesList = customRules.length > 0
    ? customRules.map((r) => `- ${r}`).join('\n')
    : '- Keep all user-facing labels in plain, jargon-free English.';

  const clarificationsList = (state.clarifications || []).length > 0
    ? state.clarifications.map((c) => `- **${c.category}:** ${c.selectedAnswer || c.options[0]}`).join('\n')
    : '- Follow the tasks in `tasks.md` sequentially, respecting `(HITL)` and `(AFK)` checkpoints.';

  const raw = `# AGENTS.md — ${state.appName} Project Instructions

## 1. Product
${state.appName} (${state.tagline || 'No tagline provided'})
${state.coreIdea || 'No core idea provided'}

## 2. Stack
- **Coding Language:** ${getCodingLanguageLabel(state)}
- **Core Stack:** ${state.proConfig.stackSummary}
- **Target Platform:** ${PLATFORM_LABELS[state.targetPlatform]}
- **AI Engine:** Google Gemini API via official \`@google/genai\` SDK (\`{{primary_model}}\`)
- **Primary Accent Token:** \`{{accent_color}}\` on \`#0F0C1B\` night-violet canvas

## 3. Repository Structure
- \`src/\` — Frontend application
  - \`components/\` — Modular UI blocks (\`Card\`, \`Tooltip\`, \`ModeSwitcher\`, \`CodeViewer\`, \`SaveModal\`)
  - \`decks/\` — Workstation decks (\`ManifestDeck\`, \`ArchitectureDeck\`, \`GrillDeck\`, \`TasksDeck\`, \`WorkflowDeck\`, \`ExporterDeck\`)
  - \`services/\` — Gemini API client, contract compilers, hover tooltip dictionary, and Tauri IPC bridge
  - \`types/\` — Strict TypeScript domain definitions (\`ProjectState\`, \`ComplexityMode\`, \`ClarificationItem\`)
- \`src-tauri/\` — Native Rust desktop backend
  - \`src/lib.rs\` — Tauri command handlers (\`save_spec_bundle\`, \`get_secure_key\`, \`set_secure_key\`)
  - \`capabilities/default.json\` — Least-privilege desktop filesystem permissions

## 4. Commands
- Install dependencies: \`npm install\`
- Launch development workstation: \`npm run dev\` (or \`npm run tauri dev\`)
- Run TypeScript verification: \`npx tsc --noEmit\`
- Build production bundle: \`npm run build\` (or \`npm run tauri build\`)

## 5. Architecture
- **Architecture Style:** ${state.proConfig.architectureStyle}
- **Offline-Safe In-Memory State:** Form state persists locally in memory and localStorage during active sessions so users never lose entered details while toggling modes or running clarification questions.
- **Dynamic Complexity Projections:** Switching between Simple, Balanced, and Pro modes modifies view visibility filters only; underlying specification state remains intact across mode shifts.

## 6. Coding Conventions
- Use functional React components with named exports.
- All section headers and configuration controls must have a corresponding hover tooltip definition explaining the field in plain, jargon-free English.
- Import Tauri \`invoke\` strictly from \`@tauri-apps/api/core\`.
${customRulesList}

## 7. Testing
- ${state.proConfig.testingStrategy}
- Mock all Tauri IPC command invocations (\`@tauri-apps/api/core\`) in automated test suites.
- Assert that hover tooltips mount with accessible ARIA semantics (\`role="tooltip"\`).

## 8. Security
- ${state.proConfig.securityBoundary}
- Never expose \`GEMINI_API_KEY\` in client-side bundles or render UI inputs asking users for raw API keys.
- Canonicalize all file write paths in Rust before writing to prevent directory traversal (\`../\`).

## 9. Workflow & Clarification Decisions
${clarificationsList}

## 10. Generated Files
- Do NOT edit generated build artifacts in \`src-tauri/target/\` or \`dist/\`.
- Default export destination: \`{{export_dir}}\`.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileRustLibRs(state: ProjectState): string {
  const raw = `// src-tauri/src/lib.rs — Generated by PromptForge for ${state.appName}
// Primary Model: {{primary_model}}
// Target OS: {{target_os}}
use std::collections::HashMap;
use std::fs;
use std::path::{Component, Path, PathBuf};

/// Validates and canonicalizes a target directory path, rejecting any '..' traversal segments.
fn validate_and_resolve_dir(target_dir: &str) -> Result<PathBuf, String> {
    let raw_path = Path::new(target_dir.trim());
    for component in raw_path.components() {
        if matches!(component, Component::ParentDir) {
            return Err("Security Error: Directory traversal ('..') is prohibited.".to_string());
        }
    }
    if !raw_path.exists() {
        fs::create_dir_all(raw_path)
            .map_err(|e| format!("Failed to create target directory: {}", e))?;
    }
    fs::canonicalize(raw_path)
        .map_err(|e| format!("Failed to canonicalize path '{}': {}", target_dir, e))
}

#[tauri::command]
fn save_spec_bundle(
    target_dir: String,
    files: HashMap<String, String>,
) -> Result<bool, String> {
    let resolved_dir = validate_and_resolve_dir(&target_dir)?;
    let allowed_files = [
        "AGENTS.md",
        "spec.md",
        "plan.md",
        "tasks.md",
        "COLLABORATION.md",
        ".continuerules",
    ];

    for (filename, content) in files {
        if !allowed_files.contains(&filename.as_str()) {
            return Err(format!("Disallowed specification filename: {}", filename));
        }
        let dest = resolved_dir.join(&filename);
        fs::write(&dest, content.as_bytes())
            .map_err(|e| format!("Failed to write {}: {}", filename, e))?;
    }

    Ok(true)
}

#[tauri::command]
fn get_secure_key(service: String) -> Result<String, String> {
    // Queries OS keyring or environment variable for service credential
    std::env::var("GEMINI_API_KEY")
        .map_err(|_| format!("No key configured in keyring for service: {}", service))
}

#[tauri::command]
fn set_secure_key(_service: String, key: String) -> Result<(), String> {
    if key.trim().is_empty() {
        return Err("Key cannot be empty".to_string());
    }
    Ok(())
}
`;
  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileUserGuideMd(state: ProjectState): string {
  const safeAppName = state.appName || 'MyApplication';
  const langLabel = getCodingLanguageLabel(state);
  const raw = `# ${safeAppName} — Master User Implementation Handbook & Prompt Playbook

> **Audience**: This guide is written directly for **you, the developer/creator**, rather than an AI agent. It details exactly **when**, **where**, and **how** to use each prompt, where to place each generated file, and how to drive the build from initial UI sketches to production deployment.

---

## 1. File Placement & Repository Directory Layout

When exporting or extracting your PromptForge specification bundle, place the files in your project repository as follows:

\`\`\`text
${safeAppName.toLowerCase().replace(/\s+/g, '-')}/
├── spec.md                   # Product scope, user personas & EARS functional requirements
├── plan.md                   # System architecture, data schemas, IPC contracts & testing matrix
├── tasks.md                  # Numbered step-by-step implementation tasks & verification steps
├── AGENTS.md                 # Universal coding instructions, repository rules & constraints
├── GEMINI.md                 # Gemini CLI workspace instructions & terminal rules
├── USER_GUIDE.md             # (This file) Human developer handbook & prompt runbook
├── COLLABORATION.md          # Multi-agent coordination board & directory ownership boundaries
├── .continuerules            # Local AI / Continue IDE assistant configuration
└── src/                      # Your application source code
\`\`\`

---

## 2. The 4-Stage Build Workflow: When & Where to Use Prompts

PromptForge generates specialized contracts tailored for each phase of your build. Follow this sequence:

### Stage 1: Visual Design with Google Stitch
- **When**: Start here BEFORE writing backend code or complex state logic.
- **Where**: Open [Google Stitch](https://stitch.withgoogle.com/).
- **How to Use**:
  1. In PromptForge, open the **Exporter Deck** or **Stitch UI Studio** (Deck 05).
  2. Select the **Google Stitch** prompt tab and click **Copy Complete Google Stitch UI Prompt**.
  3. Paste the prompt into Google Stitch to generate high-fidelity glassmorphic screens and components.
  4. Download the generated HTML/CSS/ZIP export or capture visual screenshots.
  5. Back in PromptForge, drop your Stitch export into Stage 1b **"Upload What Stitch Built"** so subsequent builder prompts inherit the exact markup and classes.

### Stage 2: Full-Stack Implementation with Your Primary Builder
Choose your primary builder tool:
- **Option A: Google Gemini CLI**
  - **When**: When you want interactive terminal coding with direct command execution and file edits.
  - **Where**: Terminal / shell where \`gemini\` CLI is installed.
  - **How**: Run \`gemini "Read GEMINI.md, spec.md, plan.md, and tasks.md. Implement Task 1."\` or copy the **Gemini CLI Prompt** from the Exporter Deck.
- **Option B: Google Antigravity (AGY)**
  - **When**: When you want an autonomous multi-file terminal agent that writes code and runs verification gates.
  - **Where**: Terminal / Antigravity CLI or Antigravity IDE.
  - **How**: Run your Antigravity agent in the repository root. Antigravity reads \`AGENTS.md\`, \`spec.md\`, \`plan.md\`, and \`tasks.md\` automatically.
- **Option C: Google AI Studio**
  - **When**: When building a web application with full-stack React + Express + server-side \`@google/genai\` routes.
  - **Where**: [Google AI Studio](https://aistudio.google.com/).
  - **How**: Paste the **AI Studio Full-Stack Contract** into AI Studio's Build workspace.
- **Option D: GitHub Copilot / Cursor**
  - **When**: When coding inside VS Code / JetBrains / Cursor.
  - **Where**: Place \`AGENTS.md\` or \`.github/copilot-instructions.md\` in the project root.
  - **How**: Open Copilot Edits or Cursor Composer and reference \`@tasks.md\` and \`@plan.md\`.

### Stage 3: Offline & Local AI Refactoring (Ollama + Continue)
- **When**: For offline coding, zero-cost refactoring, documentation generation, or private enterprise work.
- **Where**: Local IDE with the **Continue** extension connected to local **Ollama** (\`http://localhost:11434\`).
- **How**: Ensure \`.continuerules\` is in the root directory. Continue automatically loads your project ground rules and context.

### Stage 4: Multi-Agent Parallel Handoffs
- **When**: When running multiple AI coding agents simultaneously on different parts of the project.
- **Where**: Reference \`COLLABORATION.md\`.
- **How**: Assign each agent to its designated **Work-On Path** (e.g., Agent 1 on UI components, Agent 2 on backend IPC). Verify that neither agent touches the other's **Stay-Away Paths** to prevent git merge conflicts.

---

## 3. Step-by-Step Execution Checklist

1. [ ] **Export the Bundle**: In PromptForge, click **"Export Spec Bundle"** (Alt+S) and save files to your repository root.
2. [ ] **Inspect \`tasks.md\`**: Review the ordered implementation milestones.
3. [ ] **Run Initial Verification**: Confirm baseline compiler / linter commands work (e.g., \`npm run build\` or \`cargo check\`).
4. [ ] **Execute Tasks Sequentially**: Feed one task slice at a time to your builder agent.
5. [ ] **Verify After Each Task**: Run the specified automated verification commands in \`tasks.md\` before marking any task as complete.

---

## 4. Key Security & Quality Rules

- **Offline-First & Local Privacy**: Do not hardcode API keys or credentials in source code. Use system keyring or environment variables (\`GEMINI_API_KEY\`).
- **Path Canonicalization**: When reading or writing user files, reject path traversal attempts containing \`..\`.
- **Latency Standards**: Maintain responsive UI feedback (under 200ms) with tabular numerals for data metrics.
`;
  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileGeminiMd(state: ProjectState): string {
  const safeAppName = state.appName || 'MyApplication';
  const langLabel = getCodingLanguageLabel(state);
  const safeFeatures = (state.features || []).map(f => f.trim()).filter(Boolean);
  const featuresList = safeFeatures.length > 0
    ? safeFeatures.map(f => `- ${f}`).join('\n')
    : '- Core feature set defined in spec.md';

  const raw = `# ${safeAppName} — Gemini CLI Workspace Instructions

Always follow the project specifications and rules in:
- [spec.md](./spec.md)
- [plan.md](./plan.md)
- [tasks.md](./tasks.md)
- [AGENTS.md](./AGENTS.md)
- [USER_GUIDE.md](./USER_GUIDE.md)

## Workspace Overview
- **Application Name**: ${safeAppName}
- **Tagline**: ${state.tagline || 'No tagline'}
- **Target Platform**: ${PLATFORM_LABELS[state.targetPlatform]}
- **Coding Language**: ${langLabel}
- **Architecture**: ${state.proConfig.architectureStyle}
- **Security Boundary**: ${state.proConfig.securityBoundary}

## Core Features
${featuresList}

## Gemini CLI Execution Invariants
- Execute tasks incrementally following the task sequence in \`tasks.md\`. Do not skip verification steps.
- Maintain strict local privacy: never leak API keys, system paths, or uncommitted credentials.
- After every file edit or feature implementation, execute the relevant verification command:
  - Type checking & compilation
  - Linter & formatting checks
  - Unit & integration tests
- Check git status and keep working copy clean before transitioning between tasks.

## CLI Usage Examples
\`\`\`bash
# Bootstrap the project according to plan.md:
gemini "Read GEMINI.md, spec.md, and plan.md. Set up project scaffolding."

# Implement a specific task slice:
gemini "Read tasks.md and implement Task 1.1 with tests. Verify compilation before finishing."
\`\`\`
`;
  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileSpecFile(state: ProjectState, fileId: SpecFileId): string {
  switch (fileId) {
    case 'spec.md':
      return compileSpecMd(state);
    case 'plan.md':
      return compilePlanMd(state);
    case 'tasks.md':
      return compileTasksMd(state);
    case 'AGENTS.md':
      return compileAgentsMd(state);
    case 'GEMINI.md':
      return compileGeminiMd(state);
    case 'USER_GUIDE.md':
      return compileUserGuideMd(state);
    case 'COLLABORATION.md':
      return compileCollaborationMd(state);
    case '.continuerules':
      return compileContinueRules(state);
    case 'src-tauri/src/lib.rs':
      return compileRustLibRs(state);
  }
}

export function compilePlatformContract(
  state: ProjectState,
  platform: ExportPlatformId
): { title: string; subtitle: string; badge: string; promptText: string } {
  const safeClarifications = state.clarifications || [];
  const clarificationsSummary =
    safeClarifications.length > 0
      ? safeClarifications
          .map((c) => `• ${c.category}: ${c.selectedAnswer || c.options[0]}`)
          .join('\n')
      : '• Use clean, accessible defaults.';

  const safeFeatures = (state.features || []).map(f => f.trim()).filter(Boolean);
  const featuresBullets = safeFeatures.length > 0
    ? safeFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')
    : '1. Core functionality to be defined.';

  const rulesSummary = [
    state.groundRules.offlineFirst && 'Offline-First in-memory & local state persistence',
    state.groundRules.highPerformance && 'Sub-200ms UI interaction feedback with tabular-nums metrics',
    state.groundRules.localPrivacy && 'Strict local privacy & canonicalized path security',
    state.groundRules.darkModeDefault && 'Glassmorphic twilight dark theme (#0F0C1B base, #8B5CF6 violet accent)',
  ]
    .filter(Boolean)
    .map((r) => `• ${r}`)
    .join('\n');

  const rulesSummaryFallback = rulesSummary.length > 0 ? rulesSummary : '• Standard best practices apply.';

  const safeCustomRules = (state.proConfig.customRules || []).map(r => r.trim()).filter(Boolean);
  const customRulesSummary = safeCustomRules.length > 0
    ? safeCustomRules.map((r) => `• ${r}`).join('\n')
    : '• Follow standard plain-English labeling conventions.';

  const codingLanguageLabel = getCodingLanguageLabel(state);
  const stitch = state.stitchUi;
  const uiDecisionsSummary =
    stitch?.uiClarifications && stitch.uiClarifications.length > 0
      ? stitch.uiClarifications
          .map((c) => `• ${c.category}: ${c.selectedAnswer || c.options[0]}`)
          .join('\n')
      : '• High-contrast dark glassmorphic layout with clear visual hierarchy.';
  const referenceImagesSummary =
    stitch?.ideaImages && stitch.ideaImages.length > 0
      ? stitch.ideaImages.map((img) => `• Attached reference image: ${img.name}`).join('\n')
      : '• No reference images attached.';
  const stitchResultContext = stitch?.uploadedResultName
    ? `\n## Uploaded Google Stitch UI Result\n- **File / Artifact:** ${stitch.uploadedResultName}\n${
        stitch.uploadedResultNotes ? `- **UI Notes:** ${stitch.uploadedResultNotes}\n` : ''
      }${
        stitch.uploadedResultContent
          ? `- **Result Excerpt:**\n\`\`\`\n${stitch.uploadedResultContent}\n\`\`\`\n`
          : ''
      }`
    : '';

  switch (platform) {
    case 'stitch': {
      const configuredScreens = (stitch?.screens || [])
        .filter((s) => s.name.trim())
        .map((s) => `• **${s.name}** (${s.kind}): ${s.notes || 'Follow shared glassmorphic tokens.'}`)
        .join('\n');
      const promptText = interpolateVariables(
        `# Google Stitch UI Generation Contract — ${state.appName}

Design a high-precision, friendly interface for **${state.appName}** (${state.tagline || 'No tagline'}) targeting **${PLATFORM_LABELS[state.targetPlatform]}**.

## 1. Visual Language & Direction
${stitch?.visualDirection ? `- **Visual Direction:** ${stitch.visualDirection}` : '- **Canvas Backdrop**: Velvety night-violet `#0F0C1B` with frosted purple glass cards (`rgba(27, 21, 46, 0.75)`)'}
- **Primary Accent**: \`{{accent_color}}\` (Electric Violet pill buttons & active focus rings)
- **Secondary Accent**: \`#EC4899\` (Luminous Pink highlights) · **Status**: \`#34D399\`
- **Reference Images**:
${referenceImagesSummary}

## 2. Core Screens, Menus & Feature Flows to Render
${configuredScreens ? `${configuredScreens}\n\n` : ''}${featuresBullets}

## 3. Confirmed UI & Layout Decisions
${uiDecisionsSummary}
${clarificationsSummary}

## 4. Essential UI Components
- Clear top bar with breadcrumbs, mode switcher, and primary export action
- Responsive workspace layout with floating plain-English hover explainer callouts (\`role="tooltip"\`)`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Google Stitch',
        subtitle: 'High-fidelity UI screens, glassmorphic tokens & spatial layout',
        badge: 'UI Design Contract',
        promptText,
      };
    }

    case 'aistudio': {
      const promptText = interpolateVariables(
        `# Google AI Studio Full-Stack Build Prompt — ${state.appName}

Build the complete, working application for **${state.appName}**: ${state.tagline || 'No tagline'}
- **Target Platform**: ${PLATFORM_LABELS[state.targetPlatform]}
- **Coding Language**: ${codingLanguageLabel}

## Product Overview
${state.coreIdea || 'No core idea provided'}

## Core Interactive Capabilities (Feature List)
${featuresBullets}

## Confirmed Product Decisions
${clarificationsSummary}
${stitchResultContext}
## Architecture & Technical Guardrails
- **Stack**: ${state.proConfig.stackSummary}
- **AI Integration**: Server-side Express endpoints in \`server.ts\` using official \`@google/genai\` SDK with model \`{{primary_model}}\` and \`User-Agent: 'aistudio-build'\`. Never call Gemini directly from browser code or render API key input fields.
- **Quality Rules**:
${rulesSummaryFallback}
- **Custom Conventions**:
${customRulesSummary}`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Google AI Studio',
        subtitle: 'Full-stack React 19 + Express + server-side @google/genai app',
        badge: 'Full-Stack Build',
        promptText,
      };
    }

    case 'antigravity': {
      const promptText = interpolateVariables(
        `# Google Antigravity (AGY) Autonomous Engineering Contract — ${state.appName}

Execute the multi-file implementation and verification plan for **${state.appName}** targeting \`{{target_os}}\` using **${codingLanguageLabel}**.

## 1. Mission & Architecture
${state.coreIdea || 'No core idea provided'}
- **Coding Language**: ${codingLanguageLabel}
- **Architecture**: ${state.proConfig.architectureStyle}
- **Security Boundary**: ${state.proConfig.securityBoundary}
- **Default Export Path**: \`{{export_dir}}\`

## 2. Non-Negotiable Ground Rules
${rulesSummaryFallback}

## 3. Confirmed Architectural Decisions
${clarificationsSummary}
${stitchResultContext}
## 4. Phased Execution Tasks (${state.proConfig.taskSlicingMode})
1. **T001 (HITL)**: Verify domain models (\`src/types/project.ts\`) and native IPC / backend bindings.
2. **T002 (AFK [P])**: Implement UI theme tokens (\`#0F0C1B\`, \`{{accent_color}}\`) and 100ms accessible hover tooltips (\`role="tooltip"\`).
3. **T003 (HITL)**: Implement and test all core features:
${featuresBullets}
4. **T004 (HITL)**: Run \`npx tsc --noEmit\` and \`npm run build\` (plus native checks) to verify zero compilation errors.`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Google Antigravity (AGY)',
        subtitle: 'Autonomous agent task graph, native IPC & verification loop',
        badge: 'Agent Execution Spec',
        promptText,
      };
    }

    case 'gemini-cli': {
      const promptText = interpolateVariables(
        `# Google Gemini CLI Implementation Contract — ${state.appName}

You are working in the terminal with the Google Gemini CLI on **${state.appName}** (${state.tagline || 'No tagline'}) targeting **${PLATFORM_LABELS[state.targetPlatform]}** with **${codingLanguageLabel}**.

## Project Context & Rules
Read and adhere to the repository configuration files:
- \`GEMINI.md\` — Workspace rules and execution invariants
- \`spec.md\` — Behavioral product requirements
- \`plan.md\` — Architecture, domain types, and data flow
- \`tasks.md\` — Ordered implementation tasks and verification gates
- \`USER_GUIDE.md\` — Developer runbook and file organization

## Core Interactive Features
${featuresBullets}

## Architecture & Guardrails
- **Language / Stack**: ${codingLanguageLabel} · ${state.proConfig.stackSummary}
- **Quality Rules**:
${rulesSummaryFallback}
- **Custom Conventions**:
${customRulesSummary}
${stitchResultContext}
## Terminal Execution Directive
1. Inspect the workspace and read \`tasks.md\` to identify the next unfinished milestone.
2. Implement required code changes adhering to \`GEMINI.md\` constraints.
3. Run verification commands to ensure zero compiler warnings, errors, or broken tests.
4. Report completed task checklist items cleanly.`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Google Gemini CLI',
        subtitle: 'Terminal AI coder executing multi-file tasks and verification with GEMINI.md',
        badge: 'Terminal CLI Coder',
        promptText,
      };
    }

    case 'copilot': {
      const promptText = interpolateVariables(
        `# GitHub Copilot Workspace & Repository Instructions — ${state.appName}

You are working on **${state.appName}** (${state.tagline || 'No tagline'}) using **${codingLanguageLabel}**.
Follow these repository instructions for all code completions and multi-file edits:

## Stack & Conventions
- **Coding Language**: ${codingLanguageLabel}
- ${state.proConfig.stackSummary}
- Use clean modular components with plain-English hover tooltips (\`role="tooltip"\`).
- Follow all security boundaries: ${state.proConfig.securityBoundary}.

## Feature Checklist
${featuresBullets}
${stitchResultContext}
## Testing & Verification
- ${state.proConfig.testingStrategy}
- Always verify with typechecks and unit tests after modifying interfaces.`,
        state.proConfig.templateVariables
      );
      return {
        title: 'GitHub Copilot',
        subtitle: 'Repository-level .github/copilot-instructions.md & edit rules',
        badge: 'IDE Workspace Contract',
        promptText,
      };
    }

    case 'canvas': {
      const promptText = interpolateVariables(
        `# Gemini Canvas Interactive Refinement Contract — ${state.appName}

Help me interactively polish and expand the user experience of **${state.appName}** (${state.tagline || 'No tagline'}) targeting **${codingLanguageLabel}**.

## Core Concept
${state.coreIdea || 'No core idea provided'}

## Interactive Flows to Prototype & Refine
${featuresBullets}

## Visual & Interaction Style
- ${stitch?.visualDirection || 'Deep twilight canvas (#0F0C1B) with frosted purple glass cards and {{accent_color}} highlights'}
- Three-tier complexity toggle (\`Simple | Balanced | Pro\`) that filters visible fields without resetting user input
- Friendly hover explainers on every badge and control
- Confirmed user choices:
${clarificationsSummary}
${stitchResultContext}`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Gemini Canvas',
        subtitle: 'Interactive live preview iteration, micro-interactions & copy polish',
        badge: 'Canvas Iteration Prompt',
        promptText,
      };
    }

    case 'local-ollama': {
      const local = state.localAgents ?? DEFAULT_LOCAL_AGENTS;
      const promptText = interpolateVariables(
        `# Local AI Agents Setup (Ollama + Continue) — ${state.appName}

Run coding & refactoring assistance 100% locally on your machine using **Ollama** (\`${local.ollamaModel}\`) and **Continue** IDE extension.

## 1. Quick Local Setup Commands
\`\`\`bash
# Pull & run your local coding model via Ollama
ollama pull ${local.ollamaModel}
OLLAMA_HOST=${local.ollamaEndpoint} ollama serve
\`\`\`

## 2. Continue Config Snippet (~/.continue/config.yaml)
\`\`\`yaml
models:
  - name: PromptForge Local Coder (${local.ollamaModel})
    provider: ollama
    model: ${local.ollamaModel}
    apiBase: ${local.ollamaEndpoint}
\`\`\`

## 3. Repository Rules (.continuerules)
${compileContinueRules(state)}`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Local AI (Ollama / Continue)',
        subtitle: 'Offline open-weight model setup, ~/.continue/config.yaml & .continuerules',
        badge: 'Local Agent Contract',
        promptText,
      };
    }
  }
}

export interface GuidedWorkflowRecommendation {
  nextAppId: ExportPlatformId;
  nextAppName: string;
  nextAppUrl: string;
  whyRecommended: string;
  nextPrompt: string;
  polishAppId: ExportPlatformId;
  polishAppName: string;
  polishPrompt: string;
}

export function generateDefaultWorkflowPlan(state: ProjectState, nextAppId?: ExportPlatformId): string {
  const chosenApp =
    nextAppId ||
    state.suggestedAppOverride ||
    (state.targetPlatform === 'desktop' || state.targetPlatform === 'cli' ? 'antigravity' : 'aistudio');
  const appLabel =
    chosenApp === 'antigravity'
      ? 'Google Antigravity (AGY)'
      : chosenApp === 'gemini-cli'
      ? 'Google Gemini CLI'
      : chosenApp === 'aistudio'
      ? 'Google AI Studio'
      : chosenApp === 'local-ollama'
      ? 'Local AI (Ollama + Continue)'
      : chosenApp === 'copilot'
      ? 'GitHub Copilot'
      : chosenApp === 'stitch'
      ? 'Google Stitch'
      : 'Gemini Canvas';

  const safeFeatures = (state.features || []).filter(Boolean);
  const sampleFeatures = safeFeatures.length > 0 ? safeFeatures.slice(0, 3).join(', ') : 'core capabilities';

  return `1. **Phase 1 · UI Blueprint & Visual Tokens (Google Stitch)**
   - Generate high-fidelity visual layout and component hierarchy using the Stitch UI Contract in Stage 1.
   - Refine component hierarchy, WCAG AA contrast tokens, and responsive dimensions.
   - Upload the resulting HTML, screenshot, or ZIP archive back to PromptForge to lock in visual requirements.

2. **Phase 2 · Application Scaffolding & State Wiring (${appLabel})**
   - Import the PromptForge specification bundle (AGENTS.md, spec.md, plan.md, tasks.md) into ${appLabel}.
   - Scaffold the domain state models and core interactive handlers for: ${sampleFeatures}.
   - Wire server/IPC boundaries and ensure form text persists non-destructively.

3. **Phase 3 · Feature Slices & Behavioral Verification**
   - Implement remaining feature requirements in ordered slices (${state.proConfig.taskSlicingMode}).
   - Enforce ground rules: ${state.groundRules.offlineFirst ? 'Offline resilience' : 'Standard networking'}, ${state.groundRules.localPrivacy ? 'local key storage' : 'cloud storage'}, and sub-200ms latency budget.
   - Run typechecks and unit tests to ensure zero regressions.

4. **Phase 4 · Packaging, Polish & Freemium Offline Alternative**
   - Execute production bundle build (${state.targetPlatform === 'desktop' ? 'Tauri native package' : 'production web bundle'}).
   - For offline/free execution: toggle Local AI Agents (Ollama) to refactor code without paid API keys.`;
}

export function recommendBuildWorkflow(state: ProjectState): GuidedWorkflowRecommendation {
  const lang = state.codingLanguage || 'auto';
  const prefersAntigravity =
    state.targetPlatform === 'desktop' ||
    state.targetPlatform === 'cli' ||
    lang === 'rust-tauri' ||
    lang === 'go' ||
    lang === 'python' ||
    lang === 'kotlin-android' ||
    lang === 'swift-ios' ||
    lang === 'dart-flutter' ||
    lang === 'csharp-dotnet';

  const defaultNextAppId: ExportPlatformId = prefersAntigravity ? 'antigravity' : 'aistudio';
  const nextAppId: ExportPlatformId = state.suggestedAppOverride || defaultNextAppId;
  const nextContract = compilePlatformContract(state, nextAppId);
  const polishAppId: ExportPlatformId = prefersAntigravity ? 'copilot' : 'canvas';
  const polishContract = compilePlatformContract(state, polishAppId);

  const APP_URLS: Record<ExportPlatformId, string> = {
    antigravity: 'https://antigravity.google/',
    'gemini-cli': 'https://github.com/google-gemini/gemini-cli',
    aistudio: 'https://aistudio.google.com/',
    copilot: 'https://github.com/features/copilot',
    canvas: 'https://gemini.google.com/app',
    'local-ollama': 'http://127.0.0.1:11434',
    stitch: 'https://stitch.withgoogle.com/',
  };

  const whyRecommended = state.suggestedAppOverride
    ? `User selected ${nextContract.title} as their preferred next build tool for this ${state.targetPlatform} project (${getCodingLanguageLabel(state)}).`
    : prefersAntigravity
    ? `Google Antigravity (AGY) is best here because ${
        state.targetPlatform === 'desktop' || state.targetPlatform === 'cli'
          ? `you are building a ${state.targetPlatform} app`
          : `you selected ${getCodingLanguageLabel(state)}`
      }, which benefits from multi-file editing, native compiler checks, and AGENTS.md + spec.md execution.`
    : `Google AI Studio is best here because your ${state.targetPlatform} app in ${getCodingLanguageLabel(
        state
      )} can be scaffolded, previewed live, and wired with Gemini API routes immediately from your Stitch UI design.`;

  return {
    nextAppId,
    nextAppName: nextContract.title,
    nextAppUrl: APP_URLS[nextAppId] || 'https://antigravity.google/',
    whyRecommended,
    nextPrompt: nextContract.promptText,
    polishAppId,
    polishAppName: polishContract.title,
    polishPrompt: polishContract.promptText,
  };
}
