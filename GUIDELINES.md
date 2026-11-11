# PromptForge System Guidelines & Design System Invariants

## Core Architectural Invariants

### 1. Universal Explainer Tooltip ("?") Pattern
Every user-facing label, input card, toggle switch, action button, option card, and section header in PromptForge **MUST** mount a plain-English `HelpBadge` (`?` icon) with accessible ARIA semantics (`role="tooltip"`):
- Hover delay: 100 milliseconds.
- Dictionary source: `TOOLTIP_DICTIONARY` in `src/services/tooltips.ts`.
- Content structure:
  - **Title**: Plain-language naming with zero intimidating jargon.
  - **Description**: What the element does in everyday English.
  - **AI Usage**: How the AI models (Gemini / Ollama / Copilot) use this setting when generating specifications and prompts.
- **Rule**: Never leave an interactive control, header, or blank input without a corresponding `?` explainer.

### 2. Context-Aware AI Autofill Pattern
Every single input field, text area, token, and configuration section **MUST** offer an AI Autofill ("Fill with AI") action button:
- Component: `FillWithAiButton` (`Sparkles` / `Wand2` icon).
- **Mandatory Invariant**: The AI fill request **ALWAYS** transmits the entire project state context (`serializedContext` containing all filled fields: app name, tagline, core idea, platform, language, feature list, ground rules, clarifications, Stitch UI direction, Pro configuration, local agents, and multi-agent coordination).
- Non-destructive execution: The user's previous draft is preserved in an Undo snapshot, and the existing text is provided as seed context so subsequent clicks generate fresh, complementary refinements rather than duplicate output.

### 3. Contextual "Mini Grill Me" Pattern
Every major section and screen **MUST** feature a dedicated "Mini Grill Me" button:
- Component: `MiniGrillButton` and `MiniGrillPanel`.
- Query context: Sends full project context to Gemini to ask 2 targeted multiple-choice clarification questions directly related to that section.
- Recommended choice: Every question prefixes the optimal option with `(Recommended) ` and auto-selects it.
- Folding: Selecting any answer automatically updates that section's content and injects into the compiled specifications (`spec.md`, `plan.md`, `AGENTS.md`).

### 4. Screen-by-Screen Paged Navigation Architecture
PromptForge organizes the application into distinct, spacious screens rather than a single cramped vertical column:
- **Persistent Left Column**: Active Complexity Lens, Starter / Recent Blueprints, New Blank App button, and Screen Page Navigation index.
- **Persistent Right Column**: Live Contract Compiler (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, `COLLABORATION.md`, `.continuerules`, `lib.rs`, and platform prompt previews) with instant copy, download, and variable tokens.
- **Center Canvas (Paged Screens)**:
  1. **Page 1: 01. Manifest & Plain Language Ideas** (Q1: What is the Big Idea?, Q2: Where will people use it?, Q3: Coding Language & Stack Advisor, Q4: Main Steps & Feature List).
  2. **Page 2: 02. Everyday Ground Rules & Quality Guardrails** (Offline-First, Sub-200ms Screen Speed, Local Device Privacy, Twilight Dark Theme).
  3. **Page 3: 03. "Grill Me" — Dynamic Clarification Interview** (Q1 through Q8 cards with multiple-choice options and recommended defaults).
  4. **Page 4: 04. Pro Architect Controls, Task Slicing & AGENTS.md Sections** (Tech stack, architecture style, testing strategy, security boundary, HITL vs AFK slicing, custom conventions, {{variable}} tokens).
  5. **Page 5: 05. Guided Build Workflow & Google Stitch UI Studio** (Stage 1a: Design UI in Google Stitch with visual direction, image upload, and Surprise Me AI; Stage 1b: Stitch Result & Screen Prompts).
  6. **Page 6: Stage 2 — Next Build App & Full Workflow Plan** (Dynamic to suggested builder app, user ability to change/override the recommended app, and a rich, editable full workflow plan compiled into `plan.md`).
  7. **Page 7: Optional · Local AI Agents (Ollama / Continue)** (100% private offline inference, Ollama model/endpoint presets, and `.continuerules`).
  8. **Page 8: Optional · Multi-Agent Coordination (COLLABORATION.md)** (Parallel agent lane locks, work-on vs stay-away paths, and coordination protocols).
  9. **Page 9: 06. Targeted Multi-Platform Contract Exporter** (Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, Gemini Canvas, and Local Ollama).

### 5. Configurable Next App & Full Workflow Plan
In Stage 2 of the Guided Build Workflow:
- The system suggests the ideal next build tool based on the app's target platform and language (e.g. Google Antigravity for desktop/Rust/Python, Google AI Studio for web/React).
- The user can freely change/override the suggested next app to any supported tool (AI Studio, Antigravity, Copilot, Canvas, Ollama/Local, Custom).
- A fleshed-out, editable end-to-end workflow plan is generated and saved in `state.workflowPlan`, which is compiled into `plan.md` and `AGENTS.md`.
- Stage 3 provides options for polish and testing, or substitution with local open-weight models via Ollama for a 100% free offline development experience.
