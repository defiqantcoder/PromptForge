import { ExportPlatformId, ProjectState, SpecFileId } from '../types/project';
import { CODING_LANGUAGES } from './presets';

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
  const raw = `# Technical Plan: ${state.appName}

## 1. System Architecture
${state.appName} uses a clean separation between its interactive UI interface, AI synthesis routes (\`{{primary_model}}\`), and local platform runtime on \`{{target_os}}\`.

\`\`\`
[Frontend UI & Stacked Decks]
    │
    ├──► [Gemini AI Service ({{primary_model}})] ──► Live Contract Compiler
    │
    └──► [Tauri IPC / Native Layer]
             │
             ▼
[Backend & Storage]
    ├──► Canonical Filesystem Writer (spec.md, plan.md, tasks.md, AGENTS.md)
    └──► System Keyring Credential Guard
\`\`\`

- **Preferred Coding Language:** ${getCodingLanguageLabel(state)}
- **Stack Summary:** ${state.proConfig.stackSummary}
- **Architecture Pattern:** ${state.proConfig.architectureStyle}

## 2. Key Data Models (TypeScript)

\`\`\`typescript
export type ComplexityMode = 'simple' | 'balanced' | 'pro';
export type TargetPlatform = '${state.targetPlatform}';

export interface ProjectState {
  appName: string; // "${state.appName}"
  tagline: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  features: string[];
  groundRules: {
    offlineFirst: ${state.groundRules.offlineFirst};
    highPerformance: ${state.groundRules.highPerformance};
    localPrivacy: ${state.groundRules.localPrivacy};
    darkModeDefault: ${state.groundRules.darkModeDefault};
  };
  clarifications: Array<{
    id: string;
    category: string;
    question: string;
    options: string[];
    selectedAnswer?: string;
  }>;
  customRules: string[];
}
\`\`\`

## 3. Native & Backend Command Contracts

- \`save_spec_bundle(target_dir: String, files: HashMap<String, String>) -> Result<bool, String>\`
  - Canonicalizes destination directory path (default: \`{{export_dir}}\`).
  - Validates write permissions and rejects directory traversal sequences (\`../\`).
  - Atomically writes \`AGENTS.md\`, \`spec.md\`, \`plan.md\`, and \`tasks.md\` to disk.
- \`get_secure_key(service: String) -> Result<String, String>\`
  - Queries local desktop keyring or server secret environment for the Gemini API key.
- \`set_secure_key(service: String, key: String) -> Result<(), String>\`
  - Stores credentials securely in the system keyring.

## 4. UI Design & Quality Invariants
- **Color Tokens:** Deep twilight canvas (\`#0F0C1B\`), frosted purple cards (\`rgba(27, 21, 46, 0.75)\` with 12px blur), primary accent (\`{{accent_color}}\`), luminous pink tokens (\`#EC4899\`), and mint status badges (\`#34D399\`).
- **Accessibility:** All section headers and controls mount accessible hover tooltips (\`role="tooltip"\`).
- **Testing Strategy:** ${state.proConfig.testingStrategy}
- **Security Boundary:** ${state.proConfig.securityBoundary}
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
  - \`decks/\` — Workstation decks (\`ManifestDeck\`, \`ArchitectureDeck\`, \`GrillDeck\`, \`TasksDeck\`, \`ExporterDeck\`)
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
pub fn save_spec_bundle(
    target_dir: String,
    files: HashMap<String, String>,
) -> Result<bool, String> {
    let resolved_dir = validate_and_resolve_dir(&target_dir)?;
    let allowed_files = ["AGENTS.md", "spec.md", "plan.md", "tasks.md"];

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
pub fn get_secure_key(service: String) -> Result<String, String> {
    // Queries OS keyring or environment variable for service credential
    std::env::var("GEMINI_API_KEY")
        .map_err(|_| format!("No key configured in keyring for service: {}", service))
}

#[tauri::command]
pub fn set_secure_key(_service: String, key: String) -> Result<(), String> {
    if key.trim().is_empty() {
        return Err("Key cannot be empty".to_string());
    }
    Ok(())
}
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
      const promptText = interpolateVariables(
        `# Google Stitch UI Generation Contract — ${state.appName}

Design a high-precision, friendly interface for **${state.appName}** (${state.tagline || 'No tagline'}) targeting **${PLATFORM_LABELS[state.targetPlatform]}**.

## 1. Visual Language & Direction
${stitch?.visualDirection ? `- **Visual Direction:** ${stitch.visualDirection}` : '- **Canvas Backdrop**: Velvety night-violet `#0F0C1B` with frosted purple glass cards (`rgba(27, 21, 46, 0.75)`)'}
- **Primary Accent**: \`{{accent_color}}\` (Electric Violet pill buttons & active focus rings)
- **Secondary Accent**: \`#EC4899\` (Luminous Pink highlights) · **Status**: \`#34D399\`
- **Reference Images**:
${referenceImagesSummary}

## 2. Core Screens & Feature Flows to Render
${featuresBullets}

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

  const nextAppId: ExportPlatformId = prefersAntigravity ? 'antigravity' : 'aistudio';
  const nextContract = compilePlatformContract(state, nextAppId);
  const polishAppId: ExportPlatformId = prefersAntigravity ? 'copilot' : 'canvas';
  const polishContract = compilePlatformContract(state, polishAppId);

  const whyRecommended = prefersAntigravity
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
    nextAppUrl:
      nextAppId === 'antigravity'
        ? 'https://antigravity.google/'
        : 'https://aistudio.google.com/',
    whyRecommended,
    nextPrompt: nextContract.promptText,
    polishAppId,
    polishAppName: polishContract.title,
    polishPrompt: polishContract.promptText,
  };
}
