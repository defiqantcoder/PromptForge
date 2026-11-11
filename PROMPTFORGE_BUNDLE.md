# PromptForge — Complete Codebase & Context Bundle

- **Repository**: `https://github.com/defiqantcoder/PromptForge.git` (HEAD: `4dd9337`)
- **Excluded from bundle**: `bun.lock`, `package-lock.json`, `src-tauri/Cargo.lock` (lockfiles), `src-tauri/icons/*` & `*.zip` (binary assets), `node_modules/`, `.git/`, `target/`, `implementation_plan.md.metadata.json`, and self (`PROMPTFORGE_BUNDLE.md`). All `public/assets/aistudio/*` copies currently diverge from root specs (0 byte-identical omitted).

## Repository File Tree (Tracked)

```text
.agents/skills/promptforge-bundle/SKILL.md
.aistudio/artifacts/brain/0734aaeb-9de7-4a66-b619-9243f0676c2e/implementation_plan.md
.aistudio/artifacts/brain/0734aaeb-9de7-4a66-b619-9243f0676c2e/implementation_plan.md.metadata.json
.env.example
.gitattributes
.github/workflows/ci.yml
.github/workflows/pr_agent.yml
.github/workflows/swe_agent.yml
.gitignore
Agents.md
GEMINI.md
PROMPTFORGE_BUNDLE.md
README.md
Tasks.md
bun.lock
index.html
metadata.json
package-lock.json
package.json
plan.md
public/assets/aistudio/Agents_413324f4.md
public/assets/aistudio/Image_23_b7bd6431.markdown
public/assets/aistudio/Tasks_2350c830.md
public/assets/aistudio/plan_1d322616.md
public/assets/aistudio/spec_b9cfc2d9.md
server.test.ts
server.ts
server/archiveRoute.ts
server/security.ts
server/specValidateRoute.ts
spec.md
src-tauri/.gitignore
src-tauri/Cargo.lock
src-tauri/Cargo.toml
src-tauri/build.rs
src-tauri/capabilities/default.json
src-tauri/icons/128x128.png
src-tauri/icons/128x128@2x.png
src-tauri/icons/32x32.png
src-tauri/icons/Square107x107Logo.png
src-tauri/icons/Square142x142Logo.png
src-tauri/icons/Square150x150Logo.png
src-tauri/icons/Square284x284Logo.png
src-tauri/icons/Square30x30Logo.png
src-tauri/icons/Square310x310Logo.png
src-tauri/icons/Square44x44Logo.png
src-tauri/icons/Square71x71Logo.png
src-tauri/icons/Square89x89Logo.png
src-tauri/icons/StoreLogo.png
src-tauri/icons/icon.icns
src-tauri/icons/icon.ico
src-tauri/icons/icon.png
src-tauri/src/export.rs
src-tauri/src/gemini.rs
src-tauri/src/lib.rs
src-tauri/src/main.rs
src-tauri/tauri.conf.json
src/App.tsx
src/components/Card.tsx
src/components/CodeViewer.tsx
src/components/FillWithAiButton.tsx
src/components/KeyringModal.tsx
src/components/MiniGrillSection.tsx
src/components/ModeSwitcher.tsx
src/components/SaveModal.tsx
src/components/Tooltip.tsx
src/decks/ArchitectureDeck.tsx
src/decks/ExporterDeck.tsx
src/decks/GrillDeck.tsx
src/decks/ManifestDeck.tsx
src/decks/TasksDeck.tsx
src/decks/WorkflowDeck.tsx
src/index.css
src/main.tsx
src/services/compiler.ts
src/services/geminiClient.ts
src/services/presets.ts
src/services/tauriBridge.ts
src/services/tooltips.ts
src/types/project.ts
tests/archiveRoute.test.ts
tests/compiler.test.ts
tests/geminiClient.test.ts
tests/presets.test.ts
tests/serverSecurity.test.ts
tests/specValidateRoute.test.ts
tsconfig.json
vite.config.ts
```

## Project Documentation & Specs

### `.agents/skills/promptforge-bundle/SKILL.md`

```markdown
---
name: promptforge-bundle
description: >-
  Generate or refresh PROMPTFORGE_BUNDLE.md in the repository root as a single
  self-contained codebase handoff file for external AI agents. Use when the user
  asks to bundle, export, or update promptforge_bundle.
---

# PromptForge Single-File Bundle Workflow

## Exclusions
Exclude from file contents (keep listed in the repository tree if tracked):
- `.git/`, `node_modules/`, `target/`
- `bun.lock`, `package-lock.json`, `src-tauri/Cargo.lock`
- Binary assets (`src-tauri/icons/*`, `*.zip`)
- `implementation_plan.md.metadata.json`
- Any file under `public/assets/aistudio/` that is byte-identical to its root counterpart (`diff -q <root> <aistudio_copy>`). Include it if it has diverged (e.g., `plan_1d322616.md`).

## Steps
1. Check `git status` and `git rev-parse --short HEAD`.
2. Diff root docs (`Agents.md`, `spec.md`, `plan.md`, `Tasks.md`) against `public/assets/aistudio/*` to omit exact duplicates.
3. Generate `PROMPTFORGE_BUNDLE.md` with:
   - Repository URL + short `HEAD` SHA + exclusion notes
   - Filtered repository file tree
   - Categorized sections (`Project Documentation & Specs`, `Configuration & CI`, `Backend & Tauri Native Layer`, `Frontend Types, Entry & Core App`, `Frontend Services`, `Frontend Components`, `Frontend Decks`)
   - Dynamic backtick fences (`max_backtick_run + 1`) so embedded Markdown files containing triple backticks render cleanly.
4. Verify line/byte counts (`wc -l -c PROMPTFORGE_BUNDLE.md`) and leave uncommitted unless the user explicitly asks to commit/push.
```

### `.aistudio/artifacts/brain/0734aaeb-9de7-4a66-b619-9243f0676c2e/implementation_plan.md`

````markdown
# PromptForge — Native Specification & Prompt Contract Workstation

PromptForge is a high-performance, jargon-free Ubuntu desktop workstation that translates plain-language app ideas into production-grade specification bundles (`spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`) and platform-tuned prompt contracts for Google Stitch, Google AI Studio, Google Antigravity (AGY), GitHub Copilot, and Gemini Canvas.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX decisions incorporate your confirmed answers from our clarification interview along with the attached PromptForge specifications and design system tokens:

- **Confirmed Decision 1 — Stacked Workstation Decks with Dynamic Mode Filtering**: All five workstation decks (*Manifest Deck*, *Architecture & Ground Rules Deck*, *Grill Me Clarification Deck*, *Tasks Slicing Deck*, and *Multi-Platform Exporter Deck*) render as a cohesive vertical stack in the central workspace. Toggling between **Simple**, **Balanced**, and **Pro** modes dynamically filters visible cards and controls while preserving 100% of underlying project state in memory.
- **Confirmed Decision 2 — Simulated Ubuntu Directory Dialog + Direct File Downloads**: All filesystem and keyring actions route through a typed Tauri IPC bridge (`save_spec_bundle`, `get_secure_key`, `set_secure_key`). When running in the web preview before native Tauri compilation, clicking **Save to Computer** opens an authentic Ubuntu Nautilus-style directory selection & confirmation modal displaying canonicalized Linux paths, path-traversal security verification, byte sizes, and instant direct file downloads (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, and complete bundle).
- **Confirmed Decision 3 — Pre-Loaded Sample Project, Starter Templates & AI Random Idea Generator**: The workspace launches pre-populated with a complete sample project so live markdown compilation and platform prompt contracts are immediately interactive. A top workspace toolbar provides curated starter templates, a **Clear Canvas** action, and a **"Random App Idea with AI"** generator that synthesizes a fresh, creative application concept and auto-populates all core fields.

---

### 1. Overview & Core Concept

- **What It Does**: Bridges the gap between rough human ideas and rigorous software engineering specifications. Users describe what they want to build in everyday language, expand or stress-test their idea using AI ("Flesh Out My Idea" and the 3-question "Grill Me" Socratic interview), and inspect live-compiled specification artifacts and platform-ready prompts side-by-side.
- **Target Audience / Persona**:
  - *Non-technical creators & beginners* who want to build apps in Google Stitch, AI Studio, Antigravity, or Gemini Canvas without learning software architecture jargon.
  - *Power users & AI engineers* who want to rapidly scaffold 10-section `AGENTS.md` contracts, EARS-notation `spec.md` requirements, and HITL/AFK `tasks.md` execution lists without writing boilerplate by hand.
- **Key Value**: Eliminates blank-page paralysis and prompt vagueness by progressively disclosing complexity across three tiers (**Simple**, **Balanced**, **Pro**) and explaining every single control via plain-English hover callouts.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Immediate Exploration / Random AI Spark**: Upon launch, the user sees a pre-loaded sample project compiled live in the right inspector pane. They can switch starter templates from the left sidebar or click **Random App Idea with AI** to have Gemini invent an original app concept, target device, and feature steps on the spot.
  2. **Three-Tier Complexity Progression**:
     - **Simple Mode**: Displays only the three essential plain-language cards (*What's the big idea?*, *Where will people use it?*, and *What are the main steps?*) alongside the **Flesh Out My Idea** AI expansion button.
     - **Balanced Mode**: Reveals the *Everyday Ground Rules* deck (Offline-First, Instant Screen Speed, Local-Only Privacy, Dark Mode Default) and the **Grill Me** 3-question multiple-choice clarification interview.
     - **Pro Mode**: Unlocks the full 10-section `AGENTS.md` customization controls (Stack overrides, Architecture invariants, Testing rules, Security boundaries, Custom rules), Task Slicing strategy controls (`HITL` vs `AFK` and parallel `[P]` markers), and interactive `{{variable}}` token pills.
  3. **Socratic Clarification ("Grill Me")**: Clicking **Grill Me** analyzes the current idea and renders 3 targeted multiple-choice cards with `(Recommended)` defaults. Selecting answers immediately folds those architectural decisions into the live `spec.md`, `plan.md`, and platform prompt contracts.
  4. **Multi-Platform Prompt Contract & Native Export**: In the right-hand Inspector & Live Compiler pane (and the bottom Exporter Deck), users switch between compiled files (`spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`) and platform-specific prompt contracts (**Google Stitch**, **Google AI Studio**, **Google Antigravity**, **GitHub Copilot**, **Gemini Canvas**), copy contracts in one click, or open the **Save to Computer** Ubuntu directory dialog to export files directly.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-performance, keyboard-first native Linux developer workstation inspired by Raycast and Linear, blending surgical layout precision with deep twilight glassmorphic surfaces.
  - *Color Palette & Mood*:
    - **Canvas Base (`--background`)**: Velvety night-violet `#0F0C1B` (`#141120` surface base).
    - **Frosted Workspace Cards**: `rgba(27, 21, 46, 0.75)` with `backdrop-filter: blur(12px)` and crisp `1px solid rgba(192, 132, 252, 0.2)` lilac hairline borders.
    - **Elevated Tooltips & Modals**: `rgba(38, 30, 65, 0.92)` with `rgba(192, 132, 252, 0.35)` border and ambient purple rim illumination.
    - **Primary Accent (`--primary`)**: Electric violet `#8B5CF6` / `#D0BCFF` for active mode switches, primary pill buttons, and focus keylines.
    - **Secondary Accent (`--secondary`)**: Luminous pink `#EC4899` / `#FFB0CD` for interactive `{{variable}}` tokens, dynamic parameter highlights, and complexity indicators.
    - **Tertiary Semantic Status (`--tertiary`)**: Mint emerald `#34D399` / `#45DFA4` for compiler readiness, verified path canonicalization, and AI synthesis completion.
  - *Typography & Hierarchy*:
    - Clean geometric display and UI structure with tight negative tracking (`-0.02em` on headlines, pure `#FFFFFF` headers, `#E9D5FF` body copy for low ocular strain, and `#A78BFA` / `#94A3B8` metadata).
    - Tabular numerals (`tabular-nums`) and monospace code formatting for live Markdown inspection, token counts, byte sizes, and hotkey hints (`Ctrl+Enter`, `Alt+1/2/3`).
  - *Component Styling & Layout*:
    - Native-styled Ubuntu window titlebar with breadcrumbs, active workspace indicator, and complexity tier switcher.
    - Disciplined 3-column workstation shell on desktop (1440px baseline): Collapsible Left Navigation & Templates Sidebar (`260px`) + Central Stacked Decks Canvas (fluid scroll) + Right Live Contract Compiler & Platform Inspector (`460px`).

- **Interactive Feedback & Motion**:
  - **100ms Universal Hover Explainers**: Hovering over any section title, ground-rule switch, complexity button, or platform tab displays a floating lilac-bordered explainer card with a plain-English 2-sentence explanation and `role="tooltip"` accessibility semantics.
  - **Resilient AI Streaming & Timeouts**: AI actions show smooth progress indicators, complete within seconds, enforce a strict 30-second timeout budget, and surface a non-destructive warning banner if interrupted—never erasing user text.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Non-Destructive Complexity Projections (`Simple | Balanced | Pro`)**
  - *Chosen Approach*: Store the entire project specification in a single unified in-memory state hook (`ProjectState`) and treat the mode switcher strictly as a view projection lens.
  - *Why*: Users can start in Simple Mode, switch to Pro Mode to inspect how their plain-language answers map to the 10-section `AGENTS.md` contract, or return to Simple Mode without losing a single character of input or clarification answers.
  - *Alternatives Considered*: Separate forms per mode, which causes data loss or synchronization drift when toggling tiers.

- **Decision 2: Server-Side Gemini Synthesis Proxy with Structured JSON Schemas**
  - *Chosen Approach*: Route all `@google/genai` calls (`gemini-3.8-flash`) through Express backend endpoints (`/api/gemini/expand`, `/api/gemini/random-idea`, `/api/gemini/grill`) using strict `Type.OBJECT` / `Type.ARRAY` response schemas.
  - *Why*: Protects API credentials on the server, guarantees deterministic JSON structures for the 3-question Socratic interview and random idea generator, and prevents malformed markdown in UI cards.
  - *Alternatives Considered*: Client-side SDK calls or unstructured free-text parsing, which are brittle and expose keys.

- **Decision 3: Dual-Mode Tauri IPC Bridge with Ubuntu Nautilus Export Simulator**
  - *Chosen Approach*: Implement the exact Tauri IPC command signatures (`save_spec_bundle`, `get_secure_key`, `set_secure_key`) behind a bridge service that detects whether `__TAURI_INTERNALS__` is present; in the web preview, it canonicalizes the path (blocking `../` traversal), previews exact byte counts in an Ubuntu-styled directory picker dialog, and triggers native browser file downloads.
  - *Why*: Lets you test the full end-to-end UX in the browser today while keeping the codebase ready for `npm run tauri dev` and handoff to Gemini Canvas / Antigravity.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                   Native Ubuntu Titlebar & Workspace Toolbar                         │
│   [Breadcrumbs]   [Mode Switcher: Simple | Balanced | Pro]   [✨ Random AI Idea]     │
└───────────────┬──────────────────────────────────────────┬───────────────────────────┘
                │                                          │
                ▼                                          ▼
┌───────────────────────────────┐  ┌───────────────────────────────────────────────────┐
│   Left Navigation & Presets   │  │         Central Stacked Workstation Decks         │
│ ───────────────────────────── │  │ ───────────────────────────────────────────────── │
│ • Active Deck Quick-Jump      │  │ 1. ManifestDeck (Idea, Device, Steps, Flesh Out)  │
│ • Starter Project Templates   │  │ 2. ArchitectureDeck (Ground Rules & Guardrails)   │
│ • Complexity Tier Guide       │  │ 3. GrillDeck (3-Question Socratic Interview)      │
│ • Token & Spec Completeness   │  │ 4. TasksDeck (HITL/AFK Task Slicing & Rules)      │
│ • Reset / Load Sample Project │  │ 5. ExporterDeck (Platform Contracts & Disk Save)  │
└───────────────┬───────────────┘  └───────────────────────┬───────────────────────────┘
                │                                          │
                └────────────────────┬─────────────────────┘
                                     ▼
                ┌──────────────────────────────────────────┐
                │     Unified ProjectState Store (Hook)    │
                │   + Universal Hover Tooltip Dictionary   │
                └──────────┬────────────────────┬──────────┘
                           │                    │
         ┌─────────────────┘                    └──────────────────┐
         ▼                                                         ▼
┌─────────────────────────────────────────┐      ┌─────────────────────────────────────┐
│   Right Live Compiler & Inspector Pane  │      │     Express Backend + Tauri Bridge  │
│ ─────────────────────────────────────── │      │ ─────────────────────────────────── │
│ • Artifact Tabs:                        │      │ • POST /api/gemini/expand           │
│   spec.md | plan.md | tasks.md |        │      │ • POST /api/gemini/random-idea      │
│   AGENTS.md | lib.rs (Tauri Rust Code)  │      │ • POST /api/gemini/grill            │
│ • Platform Contract Tabs:               │      │ • Tauri IPC Bridge:                 │
│   Stitch | AI Studio | Antigravity |    │      │   save_spec_bundle() + Path Check   │
│   GitHub Copilot | Gemini Canvas        │      │   Ubuntu Directory Export Modal     │
└─────────────────────────────────────────┘      └─────────────────────────────────────┘
```

- **Data Model & State (`ProjectState`)**:
  - `complexityMode`: `'simple' | 'balanced' | 'pro'`
  - `appName`: string
  - `tagline`: string
  - `coreIdea`: string
  - `targetPlatform`: `'web' | 'mobile' | 'desktop' | 'cli'`
  - `features`: string[] (plain-language main steps)
  - `groundRules`: `{ offlineFirst: boolean; highPerformance: boolean; localPrivacy: boolean; darkModeDefault: boolean }`
  - `clarifications`: `Array<{ id: string; category: string; question: string; options: string[]; selectedAnswer: string; rationale?: string }>`
  - `proConfig`:
    - `stackSummary`: string
    - `architectureStyle`: string
    - `testingStrategy`: string
    - `securityBoundary`: string
    - `taskSlicingMode`: `'hitl-first' | 'balanced-slices' | 'afk-autonomous'`
    - `customRules`: string[]
    - `templateVariables`: `Record<string, string>` (powers interactive `{{variable}}` pills)

- **Interactive Component & State Mapping**:
  - **Mode Switcher (`Simple | Balanced | Pro`)**: Updates `complexityMode` in `ProjectState`. In `Simple`, renders `ManifestDeck` and `ExporterDeck` summary. In `Balanced`, adds `ArchitectureDeck` (4 everyday ground-rule switches) and `GrillDeck`. In `Pro`, reveals the 10-section `AGENTS.md` deep configuration fields, custom rules editor, `TasksDeck` slicing configuration, and `{{variable}}` token editor.
  - **Flesh Out My Idea Button (`ManifestDeck`)**: Calls `POST /api/gemini/expand` with `appName`, `coreIdea`, `targetPlatform`, and current `features`. Streams/populates an enriched, jargon-free multi-paragraph concept description and 5–6 structured main steps while keeping an "Undo Expansion" snapshot.
  - **Random App Idea with AI Button (`Header / ManifestDeck`)**: Calls `POST /api/gemini/random-idea` to generate a fresh, creative app name, tagline, plain-English core idea, target platform, 5 main user steps, and recommended ground rules, immediately updating `ProjectState`.
  - **Grill Me Interrogator (`GrillDeck`)**: Calls `POST /api/gemini/grill` with the current `ProjectState`. Returns 3 contextual Socratic multiple-choice questions targeting ambiguities in user flow, data persistence, or edge cases. Clicking any option updates `clarifications[i].selectedAnswer` and immediately re-compiles `spec.md`, `plan.md`, and platform prompts.
  - **Live Contract Compiler (`Right Inspector & ExporterDeck`)**: Pure deterministic compiler functions transform `ProjectState` on every keystroke into:
    - `spec.md` (Objective, Target Users, Core Capabilities, and `WHEN ... THE SYSTEM SHALL ...` EARS behavioral requirements)
    - `plan.md` (System Architecture ASCII flow, TypeScript Data Models, Tauri IPC / Backend Commands, UI Design Tokens)
    - `tasks.md` (Numbered `T001–T008` implementation tasks tagged with `(HITL)` / `(AFK)` and `[P]` parallel execution flags + verification steps)
    - `AGENTS.md` (Complete 10-section agent instruction contract: Product, Stack, Repository Structure, Commands, Architecture, Coding Conventions, Testing, Security, Workflow, Generated Files)
    - Platform Contracts tailored specifically to **Google Stitch**, **Google AI Studio**, **Google Antigravity (AGY)**, **GitHub Copilot**, and **Gemini Canvas**
  - **Ubuntu Directory Export Modal (`SaveModal`)**: Triggered by **Save to Computer**. Allows browsing simulated Ubuntu folders (`/home/ubuntu/workspace/promptforge-out`, `/home/ubuntu/Documents/specs`, or custom path), runs canonical path validation (flagging any `../` traversal attempts), previews exact file sizes, and downloads individual markdown files or the full bundle.
````

### `Agents.md`

```markdown
# AGENTS.md — PromptForge Project Instructions

## Product
PromptForge is a native Ubuntu desktop workstation that translates plain-language app ideas into structured, production-grade specification files (`spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`) and platform-ready prompt contracts for Google Stitch, Google AI Studio, Google Antigravity (AGY), GitHub Copilot, and Gemini Canvas. It strips engineering jargon across three interface tiers (Simple, Balanced, Pro) while offering interactive hover tooltips, AI-assisted auto-expansion, and Socratic clarification interviews.

## Stack
- Desktop Shell: Tauri v2 (Rust 1.90+, edition 2024)
- Frontend: React 19, TypeScript, Vite 8
- Styling: Tailwind CSS v4 (Glassmorphic dark-purple design tokens)
- Icons & UI Components: Lucide React, Radix UI Primitives (Tooltip, Dialog, Tabs)
- AI Engine: Google Gemini API (`gemini-3.8-flash`) via `@google/genai` (Express `server.ts`) and `reqwest` (`gemini_proxy_request` in Rust)
- System Integration: `@tauri-apps/api/core` (IPC), `@tauri-apps/api/path`, `tauri-plugin-fs`, `tauri-plugin-dialog`, `keyring`

## Repository Structure
- `src/` — React frontend application
  - `components/` — Modular UI blocks (`Card`, `Tooltip`, `ModeSwitcher`, `CodeViewer`, `SaveModal`, `KeyringModal`)
  - `decks/` — Workstation decks (`ManifestDeck`, `ArchitectureDeck`, `TasksDeck`, `GrillDeck`, `ExporterDeck`)
  - `services/` — Gemini API integration, Tauri bridge, presets, tooltips, and prompt synthesis logic
  - `types/` — Strict TypeScript domain definitions and schema models
- `src-tauri/` — Native Rust backend
  - `src/lib.rs` — Tauri command handlers (`save_spec_bundle`, `get_secure_key`, `set_secure_key`, `has_secure_key`, `gemini_proxy_request`)
  - `src/main.rs` — Desktop entry point and library invocation
  - `capabilities/default.json` — Least-privilege desktop security permissions

## Commands
- Install dependencies: `npm install`
- Launch web workstation: `npm run dev`
- Launch desktop development: `npm run tauri dev`
- Run frontend typecheck: `npx tsc --noEmit`
- Run test suite: `npm test` (`tsx --test tests/*.test.ts server.test.ts`)
- Check Rust backend: `cargo check --manifest-path src-tauri/Cargo.toml`
- Run Rust tests: `cargo test --manifest-path src-tauri/Cargo.toml`
- Build production native package: `npm run tauri build`

## Architecture
- Sandboxed UI Layer: The React frontend never touches disk directly. All filesystem writes and OS keyring queries route through typed Tauri IPC commands.
- Offline-Safe In-Memory State: Form state persists locally in memory during active sessions so users never lose entered details while toggling modes or running clarification questions.
- Dynamic Complexity Projections: Switching between Simple, Balanced, and Pro modes modifies view visibility filters only; underlying specification state remains intact across mode shifts.

## Coding Conventions
- Use functional React components with named exports.
- All section headers and configuration controls must have a corresponding hover tooltip definition explaining the field in plain, jargon-free English.
- No direct Node.js imports in frontend code; import `invoke` strictly from `@tauri-apps/api/core`.
- Keep API error handling explicit with friendly, human-readable toast notifications.

## Testing
- Enforce behavioral testing using Node's `node:test` runner via `tsx --test` (`npm test`) and Rust `cargo test`.
- Mock all Tauri IPC command invocations (`@tauri-apps/api/core`) in frontend test suites.
- Assert that hover tooltips and compiler/server contracts preserve accessibility, timeouts, and error privacy.

## Security
- Store the Gemini API key securely in the local desktop keyring or encrypted app data store; never hardcode keys or log them to standard out.
- Restrict Tauri filesystem capabilities in `capabilities/default.json` strictly to user-selected export paths.
- Canonicalize all file write paths in Rust before writing to prevent directory traversal (`../`).

## Generated Files
- Do NOT edit generated files in `src-tauri/target/` or `dist/`.
- Regenerate icons via `npm run tauri icon` when visual assets change.

## Workflow
- Always commit and push verified changes to the `main` branch (`origin/main`).
- Do NOT build the `.deb` / `.AppImage` packages (`npm run tauri build`) or publish/push a release unless explicitly requested by the user.
```

### `GEMINI.md`

```markdown
# PromptForge Workspace Rules

Always follow the project instructions and specifications in:
- [Agents.md](./Agents.md)
- [spec.md](./spec.md)
- [plan.md](./plan.md)
- [Tasks.md](./Tasks.md)

## Tauri v2 & Rust 2024 Invariants
- Keep `#[tauri::command]` functions in `src-tauri/src/lib.rs` crate-private (`fn`, not `pub fn`) when defined at crate root in `edition = "2024"` to avoid `E0255` `__cmd__*` macro re-export collisions.
- Restrict `src-tauri/capabilities/default.json` to least-privilege permissions (`core:default`, `dialog:allow-open`, `fs:default`), and canonicalize paths in Rust rejecting `..` traversal.

## Frontend & Build Invariants
- Keep `esbuild` aligned with `vite@^8.3.0` peer requirements (`^0.28.0`).
- Verify changes with:
  - `npx tsc --noEmit`
  - `npm run build`
  - `cargo check --manifest-path src-tauri/Cargo.toml`
- Keep `PROMPTFORGE_BUNDLE.md` updated locally only when explicitly requested.

## Git & Release Workflow
- Always commit and push verified changes to the `main` branch (`origin/main`).
- Do NOT build the `.deb` / `.AppImage` packages (`npm run tauri build`) or publish/push a release unless explicitly requested by the user.
```

### `README.md`

````markdown
# PromptForge

A fast, jargon-free **Ubuntu desktop & web specification workstation** that turns plain-English application ideas into structured, production-ready AI coding contracts (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, plus optional `COLLABORATION.md` and `.continuerules`), **unlimited Google Stitch UI screen & menu prompts**, and step-by-step build handoffs for **Google AI Studio**, **Google Antigravity (AGY)**, **Gemini Canvas**, **Local AI (Ollama / Continue)**, and **GitHub Copilot**.

---

## Key Features

- **Low-Latency AI & Model Switcher (`3.5 Flash-Lite` | `3.6 Flash` | `3.8 Flash` | `3.1 Pro` | `4 Argon`)**
  - Uses explicit `thinkingConfig.thinkingLevel` (`LOW` on Flash/Pro/Argon, `MINIMAL` on Flash-Lite) so requests return rapidly instead of stalling on extended default reasoning.
  - Swap models anytime directly from the workstation control bar.
- **Three-Tier Complexity Switcher (`Simple` | `Balanced` | `Pro`)**
  - **Simple Mode (`Alt+1`)**: Focuses on your core plain-English answers (*App Name & Tagline*, *Q1 Big Idea*, *Q2 Target Device*, *Q3 Feature List*, and *Q4 Coding Language*), plus **Guided Build Workflow** and **Multi-Platform Exporters**.
  - **Balanced Mode (`Alt+2`)**: Adds **Everyday Ground Rules** (*Offline-First*, *High Performance*, *Local Privacy*, *Dark Mode Default*) and the dynamic **"Grill Me"** Socratic clarification interview.
  - **Pro Mode (`Alt+3`)**: Unlocks full 10-section `AGENTS.md` configuration, task slicing strategies (`hitl-first`, `balanced-slices`, `afk-autonomous` with `HITL`/`AFK`/`[P]` tags), custom rules, and interactive `{{variable}}` template tokens.
  - Switching tiers only filters the visible decks—all entered state persists seamlessly in memory and `localStorage`.
- **Most Recent 3 Starter Blueprints**
  - The left sidebar automatically tracks and displays your **3 most recent project blueprints** so you can switch between active app ideas with one click or reset to a clean slate via **New Blank App**.
- **Comprehensive 9-Section `plan.md` Compiler**
  - Compiles a detailed technical blueprint covering executive summary, ASCII architecture flow, feature traceability matrix, multi-screen Stitch hierarchy, typed domain models, IPC/API contracts, failure & latency recovery, security/verification matrix, and multi-agent / local AI orchestration.
- **Universal `?` Plain-English Hover Explainers**
  - Hovering over `?` badges next to headers, navigation links, sections, blanks, and action buttons opens accessible (`role="tooltip"`) plain-English explanations of what each item does and how AI tools use it.
- **Unlimited Text & Unlimited Full-Context "Fill with AI"**
  - Write as much detail as you like without artificial character or feature limits.
  - Click **Fill with AI** repeatedly (unlimited times) next to any blank (`App Name`, `Tagline`, `Big Idea`, `Next Feature`, `Language Notes`, Pro fields, `Dynamic Token`, `Custom Rule`, `Stitch Visual Direction`, per-screen Stitch notes, `Handoff Notes`, `Local Agent Guardrails`, `Multi-Agent Protocol`). Re-clicking automatically sends the current draft + variation seed so Gemini refines or offers fresh alternatives.
- **5-Question Memory "Grill Me" & Section Mini "Grill Me" Buttons**
  - Generates **5 targeted multiple-choice questions per round** while **remembering and retaining all previous questions & answers** across rounds (never wiping prior decisions when appending new follow-ups; individual or all Q&A can still be removed manually).
  - Focused **Mini Grill** buttons next to *Big Idea*, *Feature List*, *Coding Language*, *Ground Rules*, *Pro Architecture*, and *Stitch UI Design* ask quick multiple-choice questions to help add concrete detail on demand.
- **Coding Language Selector & AI Advisor ("What's Best for What?")**
  - Pick `Auto`, `TypeScript + React`, `Rust + Tauri v2`, `Python`, `Dart + Flutter`, `Kotlin`, `Swift`, `Go`, or `C# / .NET`—or click **Ask AI: What's Best for What?** for a plain-English recommendation, trade-offs breakdown, and per-language comparison tailored to your project.
- **Guided Build Workflow & Unlimited Google Stitch Screen/Menu Prompts**
  - **Stage 1 — Google Stitch UI Studio**: Attach reference **idea images** (`Upload Idea Images`), run **Grill Me on UI Design** or **Surprise Me (AI UI)**, generate the master `stitch-ui-prompt.txt`, add **unlimited individual Screen / Menu / Modal / Component Stitch prompts**, and upload what Google Stitch builds (**Upload Stitch Export / Screenshot**).
  - **Stage 2 — Recommended Next App & Spec Bundle**: Automatically recommends the right next builder (`Google Antigravity (AGY)` or `Google AI Studio`), generates the next prompt incorporating your Stitch output, and lets you copy/download/save `AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, plus optional `COLLABORATION.md` and `.continuerules`.
  - **Stage 3 — Final Polish**: Generates a dedicated iteration/polish prompt (`Gemini Canvas` or `Antigravity`).
- **Optional Local AI Agents (Ollama / Continue) & Multi-Agent `COLLABORATION.md`**
  - Enable **Local AI Agents** to generate `.continuerules` and ready-to-run `ollama` model commands (`qwen2.5-coder:14b`, `llama3.3:70b`, `deepseek-r1:14b`, etc.).
  - Enable **Multi-Agent Coordination** to define parallel agent lanes with explicit **Work On** vs. **Stay Away From** paths and handoff notes compiled into `COLLABORATION.md`.
- **Native Ubuntu Export & Desktop Keyring**
  - **Save to Computer** routes through Rust Tauri IPC (`save_spec_bundle`) with canonical path validation and `..` traversal rejection, and stores your Gemini key locally in GNOME Keyring via `libsecret`.

---

## Tech Stack

- **Desktop Shell**: [Tauri v2](https://v2.tauri.app/) (`tauri 2.12.5`, Rust `edition = "2024"`, `rust-version = "1.90"`)
  - Plugins & Crates: `tauri-plugin-dialog`, `tauri-plugin-fs`, `tauri-plugin-log`, `keyring 2.3.3`, `reqwest 0.12`, `serde`, `serde_json`
- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **UI & Motion**: Radix UI Primitives (`Dialog`, `Tabs`, `Tooltip`), Lucide React, Motion
- **Dev API Proxy & AI SDK**: Express 4 (`tsx server.ts`), `@google/genai` (default `gemini-3.8-flash` with `thinkingLevel: LOW`), `dotenv`

---

## Prerequisites (Ubuntu / Linux — Building From Source Only)

Pre-built GitHub Release packages already include bundled runtime dependencies (`.AppImage`) or declare full system dependencies automatically via `apt` (`.deb`). If compiling from source:

- **Node.js**: `v20+` (`v22` recommended; `>=22.0.0` is declared by `@google/genai`) and `npm`
- **Rust**: `1.90+` (`rustup` stable toolchain)
- **Tauri Linux System Dependencies** (Ubuntu 24.04):
  ```bash
  sudo apt-get update
  sudo apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.1-dev \
    libappindicator3-dev \
    librsvg2-dev \
    patchelf
  ```

---

## Installing / Updating the Desktop App (Ubuntu Release)

Download the latest `.deb` or self-contained `.AppImage` from [GitHub Releases](https://github.com/defiqantcoder/PromptForge/releases):

- **Install or upgrade the `.deb` package** (automatically resolves and installs required system dependencies):
  ```bash
  sudo apt install -y ./PromptForge_0.3.0_amd64.deb
  ```
- **Or run the standalone `.AppImage`** (bundles WebKit/GTK/GStreamer runtime libraries inside the image):
  ```bash
  chmod +x PromptForge_0.3.0_amd64.AppImage
  ./PromptForge_0.3.0_amd64.AppImage
  ```

---

## Getting Started from Source

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your Gemini API key (required for AI endpoints in web/Express dev mode; desktop packaged builds store keys in the system keyring via the UI):
```bash
cp .env.example .env
```
Edit `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key"
```
> Without `GEMINI_API_KEY`, the workstation UI, live spec compiler, recent blueprints, and file exporter still work offline; AI endpoints return a friendly configuration notice.

### 3. Run the Web Workstation (Express + Vite Dev Server)
```bash
npm run dev
```
Opens on `http://localhost:3000` with Vite middleware and `/api/gemini/*` routes (`/api/health`, `/api/gemini/expand`, `/api/gemini/random-idea`, `/api/gemini/grill`, `/api/gemini/fill-field`, `/api/gemini/mini-grill`, `/api/gemini/stitch-surprise`, `/api/gemini/recommend-language`).

### 4. Run the Native Ubuntu Desktop App (Tauri v2)
```bash
npm run tauri dev
```
Launches the `1440x900` dark-violet (`#0F0C1B`) Tauri WebKit window connected to `http://localhost:3000`.

### 5. Build for Production
- **Frontend bundle (`dist/`)**:
  ```bash
  npm run build
  ```
- **Native Ubuntu desktop installers (`.deb`, `.AppImage`)**:
  ```bash
  npm run tauri build
  ```

---

## Verification & Checks

Run these commands before committing changes:
```bash
npx tsc --noEmit
npm test
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
cargo clippy --manifest-path src-tauri/Cargo.toml -- -D warnings
```

---

## Project Structure

```text
PromptForge/
├── .github/workflows/ci.yml        # GitHub Actions CI (tsc + npm test + build + cargo test on ubuntu-24.04)
├── server.ts                       # Express + Vite dev server, model switcher & /api/gemini/* proxy routes
├── server/                         # Security origin guard, ZIP archive & spec validation Express modules
├── index.html                      # Application HTML shell
├── package.json                    # Scripts, React 19 / Vite 8 / Tauri JS dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite + Tailwind v4 configuration
├── src/
│   ├── App.tsx                     # Main 3-column workstation, model switcher, 5-question memory Grill Me & AI orchestration
│   ├── main.tsx                    # React entrypoint
│   ├── index.css                   # Purple-glass design tokens and surface styles
│   ├── types/project.ts            # ProjectState, AiModelId, LocalAgentsConfig, MultiAgentConfig, StitchScreenPrompt & domain types
│   ├── components/
│   │   ├── Card.tsx                # Frosted glass card primitive with header ? tooltip
│   │   ├── CodeViewer.tsx          # Live syntax/markdown inspector with copy, download & {{token}} editor
│   │   ├── FillWithAiButton.tsx    # Full-context unlimited Fill with AI trigger button
│   │   ├── KeyringModal.tsx        # Desktop GNOME Keyring API key modal
│   │   ├── MiniGrillSection.tsx    # Reusable section-level Mini Grill button & interactive panel
│   │   ├── ModeSwitcher.tsx        # Simple | Balanced | Pro mode selector
│   │   ├── SaveModal.tsx           # Ubuntu directory picker & bundle export modal
│   │   └── Tooltip.tsx             # Accessible 100ms hover explainer & HelpBadge (?)
│   ├── decks/
│   │   ├── ManifestDeck.tsx        # Idea, Platform, Q3 Feature List, Q4 Coding Language & AI Advisor
│   │   ├── ArchitectureDeck.tsx    # Everyday ground rules & Mini Grill controls
│   │   ├── GrillDeck.tsx           # Dynamic Socratic 5-question multiple-choice interview with memory
│   │   ├── TasksDeck.tsx           # Pro HITL / AFK task slicing, 10-section AGENTS.md overrides & {{variable}} tokens
│   │   ├── WorkflowDeck.tsx        # Guided Build Workflow, Multi-Screen Stitch Prompts, Local AI (Ollama/Continue) & COLLABORATION.md
│   │   └── ExporterDeck.tsx        # Multi-platform prompt contracts & export triggers
│   └── services/
│       ├── compiler.ts             # Pure deterministic compiler for specs, 9-section plan.md, COLLABORATION.md & .continuerules
│       ├── geminiClient.ts         # Dual-mode Tauri IPC / Express client with 30s timeout, model routing & variation nonces
│       ├── presets.ts              # Model catalog, language catalog, Ollama presets & curated starter blueprints
│       ├── tauriBridge.ts          # Native dialog, keyring, and export IPC bridge
│       └── tooltips.ts             # Plain-English tooltip dictionary
├── src-tauri/
│   ├── Cargo.toml                  # Rust dependencies (tauri v2, reqwest, keyring, plugins)
│   ├── tauri.conf.json             # App identifier, 1440x900 window, bundled Linux deb & AppImage settings
│   ├── capabilities/default.json   # Least-privilege permissions (core:default, dialog:allow-open, fs:default)
│   ├── build.rs                    # Tauri build script
│   └── src/
│       ├── main.rs                 # Desktop binary entrypoint
│       ├── lib.rs                  # Tauri app setup and IPC commands delegating to export & gemini modules
│       ├── export.rs               # Canonicalized path guard & spec allowlist (including COLLABORATION.md & .continuerules)
│       └── gemini.rs               # Native Gemini API proxy builder, model allowlist & thinkingConfig injection
├── tests/                          # Unit tests (compiler, presets, tauriBridge, geminiClient, routes & security)
├── server.test.ts                  # Express route, timeout, multimodal & error-privacy regression tests
├── Agents.md                       # Agent architecture, conventions, and security instructions
├── spec.md                         # Product specification & EARS behavioral requirements
├── plan.md                         # Phased native desktop technical roadmap
├── Tasks.md                        # Implementation task list (T001–T008)
└── GEMINI.md                       # Workspace rule invariants
```

---

## Security & Architecture Notes

- **Sandboxed UI Layer**: Frontend code never writes directly to disk; file writes route through the Rust [`save_spec_bundle`](src-tauri/src/export.rs) IPC command when running natively.
- **Path Traversal Guard**: Both `canonicalizeLinuxPath` (`src/services/tauriBridge.ts`) and `validate_and_resolve_dir` (`src-tauri/src/export.rs`) reject `..` segments, expand `~/`, canonicalize target directories, and restrict written filenames strictly to `AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, `COLLABORATION.md`, and `.continuerules`.
- **Least-Privilege Capabilities**: `src-tauri/capabilities/default.json` limits permissions to `core:default`, `dialog:allow-open`, and `fs:default`.
- **OS Keyring Storage**: `get_secure_key`, `set_secure_key`, and `has_secure_key` store and check API credentials under the `promptforge` service in the system keyring via `keyring`, while `gemini_proxy_request` sends credentials strictly via the `x-goog-api-key` header.

---

## Documentation

- [spec.md](./spec.md) — Product specification and EARS behavioral requirements
- [plan.md](./plan.md) — Phased Tauri v2 desktop architecture plan
- [Tasks.md](./Tasks.md) — Implementation task breakdown (`T001–T008`)
- [Agents.md](./Agents.md) — Coding conventions, testing, and security guidelines
````

### `Tasks.md`

```markdown
# Implementation Tasks: PromptForge Desktop

- [x] **T001: Project Scaffolding & Tauri IPC Foundation (HITL)**
  - Initialize Tauri v2 with React 19, TypeScript, and Tailwind CSS.
  - Configure `src-tauri/capabilities/default.json` with least-privilege permissions (`core:default`, `dialog:allow-open`, `fs:default`).
  - Verification: Run `cargo check --manifest-path src-tauri/Cargo.toml` and `npx tauri --version`.

- [x] **T002: Tailwind Design Tokens & Purple Glass Theme (AFK) [P]**
  - Implement the night-violet palette (`#0F0C1B`), frosted card surfaces, and electric violet button styles in `src/index.css`.
  - Build base reusable UI primitives: `Card`, `ModeSwitcher`, `CodeViewer`, `SaveModal`, and `KeyringModal`.
  - Verification: Render workspace cards and verify colors, hover transitions, and rounded 16px geometry.

- [x] **T003: Universal Hover Tooltip Engine (AFK) [P]**
  - Implement the accessible floating tooltip component wrapping Radix UI Tooltip (`role="tooltip"`).
  - Create a central dictionary (`src/services/tooltips.ts`) of plain-language explanations for all sections and settings.
  - Verification: Hover over buttons and verify `TOOLTIP_DICTIONARY` test coverage.

- [x] **T004: Three-Tier Workspace State & Mode Switcher (HITL)**
  - Implement `ProjectState` persistence (`localStorage` + in-memory state) in `src/App.tsx`.
  - Build header mode toggle (`[ Simple ] | [ Balanced ] | [ Pro ]`) with dynamic field visibility filters.
  - Verification: Switch between modes; confirm form data persists without resetting across view switches.

- [x] **T005: Gemini API Client & Auto-Expansion Flow (HITL)**
  - Integrate Gemini (`gemini-3.8-flash`) via dual-mode `geminiClient.ts` (`gemini_proxy_request` IPC in Tauri, `/api/gemini/*` in Express).
  - Add 30s timeout handling, GNOME Keyring integration, and friendly retry notifications on network interruption.
  - Build the "Flesh Out My Idea" action button on Card 1.
  - Verification: Run `npm test` (`server.test.ts` and `tests/geminiClient.test.ts`).

- [x] **T006: Socratic Interrogator ("Grill Me") Component (HITL)**
  - Implement the 3-question clarification generator using structured Gemini JSON output.
  - Render multiple-choice radio cards with recommended defaults in `GrillDeck.tsx`.
  - Verification: Trigger clarification; select options and confirm answers fold directly into compiled state.

- [x] **T007: Contract Compiler & Multi-Platform Exporters (AFK) [P]**
  - Build pure compilation functions in `src/services/compiler.ts` converting `ProjectState` into `spec.md`, `plan.md`, `AGENTS.md`, and `tasks.md`.
  - Generate platform-tuned prompts for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
  - Verification: Run `tests/compiler.test.ts` ensuring output conforms to the 10-section `AGENTS.md` and EARS `spec.md` standards.

- [x] **T008: Native File Export Command & Save Modal (HITL)**
  - Implement Tauri Rust command `save_spec_bundle` with `~/` home expansion, `..` traversal rejection, and path canonicalization.
  - Build the "Save to Computer" dialog displaying file sizes, target directory path, and `@tauri-apps/plugin-dialog` native folder picker.
  - Verification: Run `cargo test --manifest-path src-tauri/Cargo.toml` confirming allowlist and path guard enforcement.
```

### `plan.md`

```markdown
# Technical Plan: PromptForge Native Workstation

## 1. Current State & Gap Analysis
- **Completed Components:**
  - React 19 frontend with 3-tier complexity switcher (`Simple | Balanced | Pro`).
  - Five stacked workstation decks (`ManifestDeck`, `ArchitectureDeck`, `GrillDeck`, `TasksDeck`, `ExporterDeck`).
  - Contract compiler generating `spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`, and platform prompt contracts (Stitch, AI Studio, Antigravity, Copilot, Canvas).
  - Universal 100ms hover explainer dictionary with accessible ARIA semantics.
  - Hardened Express server (`server.ts`) acting as the web-preview proxy for Gemini API endpoints (`gemini-3.8-flash`) with 30s AbortController timeouts.
  - Native Tauri v2 crate harness (`src-tauri/Cargo.toml`, `src-tauri/src/main.rs`, `src-tauri/tauri.conf.json`, `src-tauri/capabilities/default.json`) with `1440x900` dark `#0F0C1B` window configuration and least-privilege permissions (`core:default`, `dialog:allow-open`, `fs:default`).
  - Native Rust IPC handlers in `src-tauri/src/lib.rs`: `save_spec_bundle` (with `~/` home expansion and `..` traversal rejection), `get_secure_key`, `set_secure_key`, `has_secure_key`, and `gemini_proxy_request` (30s `reqwest` timeout + `x-goog-api-key` header).
  - Dual-mode `geminiClient.ts` routing (`gemini_proxy_request` in Tauri, `/api/gemini/*` in browser) + desktop `KeyringModal.tsx` and native `@tauri-apps/plugin-dialog` directory picker in `SaveModal.tsx`.
- **Remaining Phase 4 Verification:**
  - Sync markdown specs/tasks and verify native Ubuntu `.deb` / `.AppImage` bundle compilation (`npm run tauri build`).

---

## 2. Target System Architecture
┌────────────────────────────────────────────────────────┐
│                   React 19 Frontend                    │
│  ┌───────────────────┐  ┌───────────────────────────┐  │
│  │ Form Decks & Mode │  │ Real-Time Preview Console │  │
│  └─────────┬─────────┘  └─────────────▲─────────────┘  │
│            │                          │                │
│            ▼                          │                │
│  ┌───────────────────┐                │                │
│  │ Tauri IPC Bridge  │────────────────┘                │
│  └─────────┬─────────┘                                 │
└────────────┼───────────────────────────────────────────┘
│ @tauri-apps/api/core (invoke)
┌────────────▼───────────────────────────────────────────┐
│              Native Rust Backend (src-tauri)           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ lib.rs Command Handlers                          │  │
│  │  • save_spec_bundle (Canonical path file writer) │  │
│  │  • get/set/has_secure_key (libsecret/keyring)    │  │
│  │  • gemini_proxy_request (reqwest HTTPS proxy)    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
---

## 3. Phased Execution Roadmap

### Phase 1: Native Tauri v2 Core Harness
1. **Initialize Missing Tauri Crates:**
   - Create `src-tauri/Cargo.toml` with `tauri = "2"`, `serde`, `serde_json`, `reqwest`, and `keyring` (for GNOME Keyring / libsecret support).
   - Create `src-tauri/src/main.rs` wiring `tauri::Builder` with handlers defined in `src-tauri/src/lib.rs`.
   - Create `src-tauri/tauri.conf.json` declaring bundle identifier, WebKit window options (1440x900, dark background `#0F0C1B`), and security permissions.
2. **Permission Whitelist:**
   - Update `src-tauri/capabilities/default.json` to allow `dialog:open` and scoped directory access.

### Phase 2: Native Gemini & Keyring IPC Engine
1. **Desktop Keyring Command:**
   - Implement `set_secure_key(service: String, key: String)` and `get_secure_key(service: String)` using the `keyring` crate so keys persist across Ubuntu sessions in GNOME Keyring.
2. **Native AI Proxy Command:**
   - Implement `gemini_proxy_request(endpoint: String, payload: Value) -> Result<Value, String>` in Rust using `reqwest`.
   - Update `src/services/geminiClient.ts` to detect `isTauriEnvironment()`: if native, call `invoke('gemini_proxy_request')`; if running in web preview, fall back to `/api/gemini/*`.

### Phase 3: Native OS Dialogs & Filesystem Wiring
1. **Folder Selection:**
   - Wire `@tauri-apps/plugin-dialog` into `src/components/SaveModal.tsx` so clicking "Browse Folder" opens the native Ubuntu Nautilus directory selector.
2. **Atomic Disk Export:**
   - Verify `save_spec_bundle` canonicalizes paths, rejects `../` traversal, and writes `AGENTS.md`, `spec.md`, `plan.md`, and `tasks.md` directly into the chosen repository root.

### Phase 4: Verification & Package Compilation
1. **Typecheck & Lints:**
   - Run `npx tsc --noEmit` and `cargo check --manifest-path src-tauri/Cargo.toml`.
2. **Local Desktop Execution:**
   - Run `npm run tauri dev` to verify the WebKit window boots, renders the purple glass UI, and performs IPC calls without console errors.
3. **Packaging:**
   - Build native Ubuntu artifacts (`.deb` and `.AppImage`) using `npm run tauri build`.
```

### `public/assets/aistudio/Agents_413324f4.md`

```markdown
# AGENTS.md — PromptForge Project Instructions

## Product
PromptForge is a native Ubuntu desktop workstation that translates plain-language app ideas into structured, production-grade specification files (`spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`) and platform-ready prompt contracts for Google Stitch, Google AI Studio, Google Antigravity (AGY), GitHub Copilot, and Gemini Canvas. It strips engineering jargon across three interface tiers (Simple, Balanced, Pro) while offering interactive hover tooltips, AI-assisted auto-expansion, and Socratic clarification interviews.

## Stack
- Desktop Shell: Tauri v2 (Rust 1.80+)
- Frontend: React 19, TypeScript 5.x, Vite
- Styling: Tailwind CSS v4 (Glassmorphic dark-purple design tokens)
- Icons & UI Components: Lucide React, Radix UI Primitives (Tooltip, Dialog, Tabs)
- AI Engine: Google Gemini API via official `@google/genai` SDK (`gemini-2.5-flash`)
- System Integration: `@tauri-apps/api/core` (IPC), `tauri-plugin-fs`, `tauri-plugin-dialog`

## Repository Structure
- `src/` — React frontend application
  - `components/` — Modular UI blocks (Card, Tooltip, ModeSwitcher, CodeViewer)
  - `decks/` — Workstation decks (ManifestDeck, ArchitectureDeck, TasksDeck, GrillDeck, ExporterDeck)
  - `services/` — Gemini API integration and prompt synthesis logic
  - `types/` — Strict TypeScript domain definitions and schema models
- `src-tauri/` — Native Rust backend
  - `src/lib.rs` — Tauri command handlers (`write_spec_files`, `validate_gemini_key`)
  - `src/main.rs` — Desktop entry point and plugin registration
  - `capabilities/default.json` — Least-privilege desktop security permissions

## Commands
- Install dependencies: `npm install`
- Launch desktop development: `npm run tauri dev`
- Run frontend typecheck: `npx tsc --noEmit`
- Run frontend test suite: `npm run test`
- Build production native package: `npm run tauri build`

## Architecture
- Sandboxed UI Layer: The React frontend never touches disk directly. All filesystem writes and OS keyring queries route through typed Tauri IPC commands.
- Offline-Safe In-Memory State: Form state persists locally in memory during active sessions so users never lose entered details while toggling modes or running clarification questions.
- Dynamic Complexity Projections: Switching between Simple, Balanced, and Pro modes modifies view visibility filters only; underlying specification state remains intact across mode shifts.

## Coding Conventions
- Use functional React components with named exports.
- All section headers and configuration controls must have a corresponding hover tooltip definition explaining the field in plain, jargon-free English.
- No direct Node.js imports in frontend code; import `invoke` strictly from `@tauri-apps/api/core`.
- Keep API error handling explicit with friendly, human-readable toast notifications.

## Testing
- Enforce behavioral testing using Vitest and React Testing Library for frontend forms.
- Mock all Tauri IPC command invocations (`@tauri-apps/api/core`) in test suites.
- Assert that hover tooltips mount with accessible ARIA semantics (`role="tooltip"`).

## Security
- Store the Gemini API key securely in the local desktop keyring or encrypted app data store; never hardcode keys or log them to standard out.
- Restrict Tauri filesystem capabilities in `capabilities/default.json` strictly to user-selected export paths.
- Canonicalize all file write paths in Rust before writing to prevent directory traversal (`../`).

## Generated Files
- Do NOT edit generated files in `src-tauri/target/` or `dist/`.
- Regenerate icons via `npm run tauri icon` when visual assets change.
```

### `public/assets/aistudio/Image_23_b7bd6431.markdown`

```markdown
---
name: PromptForge Workspace
colors:
  surface: '#141120'
  surface-dim: '#141120'
  surface-bright: '#3b3748'
  surface-container-lowest: '#0f0c1b'
  surface-container-low: '#1d1929'
  surface-container: '#211d2d'
  surface-container-high: '#2b2838'
  surface-container-highest: '#363243'
  on-surface: '#e6dff5'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e6dff5'
  inverse-on-surface: '#322e3f'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00a574'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#141120'
  on-background: '#e6dff5'
  surface-variant: '#363243'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-snippet:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a high-performance, keyboard-first developer canvas styled for native desktop environments. Blending the surgical precision of modern command bars (such as Raycast and Linear) with electric glassmorphic surfaces, the visual language balances dense productivity with ethereal warmth.

The target audience consists of prompt engineers, AI researchers, and technical creators seeking an elevated workspace devoid of terminal clutter. Surfaces rely on deep twilight darks layered with frosted purple undertones, delicate lilac hairline borders, and targeted pulses of electric violet to create focus, speed, and spatial elegance.

## Colors

The palette is engineered around an immersive deep-space spectrum:

- **Primary (`#8B5CF6`)**: Electric violet for primary actions, active state keylines, focus rings, and high-priority selections.
- **Secondary (`#EC4899`)**: Luminous pink reserved for dynamic parameters, badges, variable highlights, and token counter warnings.
- **Tertiary (`#34D399`)**: Mint green signaling successful prompt executions, model connection states, and live API health.
- **Neutral (`#0F0C1B`)**: Velvety night-violet foundation anchoring all backdrop surfaces.

### Functional Surface Tokens
- **Canvas Base**: `#0F0C1B`
- **Frosted Card Fill**: `rgba(27, 21, 46, 0.75)` with 12px hardware-accelerated blur.
- **Subtle Surface Overlay**: `rgba(255, 255, 255, 0.04)` for hover states and selection bars.
- **Border Trim**: `rgba(192, 132, 252, 0.2)` delivering crisp edge definition.
- **Typography Base**: `#FFFFFF` for display headings; `#E9D5FF` for primary body copy; `#A78BFA` and `#94A3B8` for secondary labels and code metadata.

## Typography

The typographic hierarchy relies entirely on Inter to maintain visual continuity between native desktop framing and dense prompt editors. Variable weights deliver structural rhythm rather than decorative flair:

- **Headlines**: Rendered in pure `#FFFFFF` with negative tracking to keep UI headers tight, authoritative, and readable at a glance.
- **Body**: Uses `#E9D5FF` for reduced ocular strain during lengthy prompting sessions.
- **Labels & Monospace Insets**: Inter's tabular features and clean geometry accommodate token metrics, hotkey indicators (`Ctrl+Enter`), and parameter toggles with fixed vertical cadence.

## Layout & Spacing

The layout operates on a disciplined 4px/8px modular rhythm tailored for multi-pane desktop windows:

- **App Shell**: A 3-column layout consisting of a collapsible left sidebar (navigation/history), a central fluid workspace (prompt editor and test harness), and an inspector panel (model parameters, token consumption, system instructions).
- **Margins & Gutters**: Outer canvas uses `1.25rem` (`20px`) margins, while internal split views utilize `1rem` (`16px`) gutters to preserve breathing room around frosted cards.
- **Density Controls**: Toolbars and nested parameter rows conform strictly to `space-xs` (4px) and `space-sm` (8px) for compact toolbars, opening up to `space-md` (16px) inside prompt interaction containers.

## Elevation & Depth

Spatial depth is communicated via layered translucent panes and directional illumination rather than traditional drop shadows:

- **Level 0 (Backdrop Canvas)**: Solid `#0F0C1B` acting as the dark foundational canvas.
- **Level 1 (Card & Workspace Panels)**: `rgba(27, 21, 46, 0.75)` paired with `backdrop-filter: blur(12px)`. Enclosed by a crisp 1px perimeter border of `rgba(192, 132, 252, 0.2)`.
- **Level 2 (Popovers, Tooltips & Floating Palette)**: Elevated glass surface `rgba(38, 30, 65, 0.9)` bordered with `rgba(192, 132, 252, 0.35)` and bathed in an ambient purple rim glow: `0 8px 32px -4px rgba(139, 92, 246, 0.25)`.
- **Level 3 (Modal Dialogs & Command Bar)**: Centered command surface equipped with dual shadow: an internal top hairline highlight `inset 0 1px 0 rgba(255, 255, 255, 0.15)` and an outward cast of `0 24px 48px -12px rgba(0, 0, 0, 0.7)`.

## Shapes

The design system standardizes on balanced structural geometry with `roundedness: 2`:

- **Panels & Cards**: Base `0.5rem` (`8px`) on inner functional sections, stepping up to `1rem` (`16px` / `rounded-lg`) on major application cards and modal dialogs to support the modern desktop aesthetic.
- **Form Controls & Inputs**: Form inputs, select menus, and inline search fields adhere to `0.5rem` (`8px`) corners.
- **Buttons & Pills**: Buttons, status indicators, and prompt category pills use complete circular rounding (pill caps) to provide a soft, tactile contrast against rectangular code panes.

## Components

### Buttons
- **Primary**: Background `#8B5CF6`, text `#FFFFFF`, rounded pill radius. Subtle inset highlight `inset 0 1px 0 rgba(255, 255, 255, 0.2)`. On hover, scale slightly (1.02) with an active glow `0 0 16px rgba(139, 92, 246, 0.5)`.
- **Secondary / Ghost**: Transparent fill with `rgba(192, 132, 252, 0.2)` border and `#E9D5FF` text. Hover fills to `rgba(139, 92, 246, 0.12)`.
- **Destructive**: Frosted red tint `rgba(239, 68, 68, 0.15)` with `rgba(239, 68, 68, 0.4)` border.

### Input Fields & Prompt Canvas
- **Prompt Canvas**: Monolithic frosted container (`rgba(27, 21, 46, 0.75)`), 16px radius, no inner borders. Focus reveals an electric violet border ring (`0 0 0 2px #8B5CF6`).
- **Variable Tokens (`{{variable}}`)**: Inline interactive pills rendered in `rgba(236, 72, 153, 0.15)` with `#EC4899` text, editable on click.

### Chips & Status Badges
- **Model Status Badge**: Pill shape, background `rgba(52, 211, 153, 0.1)`, text `#34D399`, border `1px solid rgba(52, 211, 153, 0.3)`. Contains a 6px pulsing green indicator dot.
- **Token Counter Pill**: Background `rgba(15, 12, 27, 0.8)`, text `#A78BFA`, border `rgba(192, 132, 252, 0.2)`.

### Desktop Window Titlebar
- **Native Header Integration**: Integrated glass header featuring custom window actions (minimize, maximize, close) blended alongside breadcrumbs, active workspace indicator, and hotkey launch badges.
```

### `public/assets/aistudio/Tasks_2350c830.md`

```markdown
# Implementation Tasks: PromptForge Desktop

- [ ] **T001: Project Scaffolding & Tauri IPC Foundation (HITL)**
  - Initialize Tauri v2 with React 19, TypeScript, and Tailwind CSS.
  - Configure `src-tauri/capabilities/default.json` with permissions for file dialogs and writing to chosen directories.
  - Verification: Run `npm run tauri dev` and confirm the native desktop window opens cleanly on Ubuntu.

- [ ] **T002: Tailwind Design Tokens & Purple Glass Theme (AFK) [P]**
  - Implement the night-violet palette (`#0F0C1B`), frosted card surfaces, and electric violet button styles in `tailwind.config.js`.
  - Build base reusable UI primitives: `Card`, `Button`, `Badge`, and `PillSwitch`.
  - Verification: Render sample card and verify colors, hover transitions, and rounded 16px geometry.

- [ ] **T003: Universal Hover Tooltip Engine (AFK) [P]**
  - Implement the accessible floating tooltip component wrapping Radix UI Tooltip.
  - Create a central dictionary of plain-language explanations for all sections and settings.
  - Verification: Hover over buttons and confirm instant display of lilac-bordered callout boxes.

- [ ] **T004: Three-Tier Workspace State & Mode Switcher (HITL)**
  - Implement `useProjectState` hook storing app details, features, ground rules, and question answers.
  - Build header mode toggle (`[ Simple ] | [ Balanced ] | [ Pro ]`) with dynamic field visibility filters.
  - Verification: Switch between modes; confirm form data persists without resetting across view switches.

- [ ] **T005: Gemini API Client & Auto-Expansion Flow (HITL)**
  - Integrate official Gemini SDK (`gemini-2.5-flash`) for auto-fill and idea expansion.
  - Add timeout handling (30s) and friendly retry notifications on network interruption.
  - Build the "Flesh Out My Idea" action button on Card 1.
  - Verification: Enter a 1-sentence prompt, click flesh out, and confirm detailed output renders in the textarea.

- [ ] **T006: Socratic Interrogator ("Grill Me") Component (HITL)**
  - Implement the 3-question clarification generator using structured Gemini JSON output.
  - Render multiple-choice radio cards with recommended defaults.
  - Verification: Trigger clarification; select options and confirm answers fold directly into compiled state.

- [ ] **T007: Contract Compiler & Multi-Platform Exporters (AFK) [P]**
  - Build pure compilation functions that convert `ProjectState` into `spec.md`, `AGENTS.md`, and `tasks.md`.
  - Generate platform-tuned prompts for Google Stitch, Google AI Studio, Google Antigravity, and GitHub Copilot.
  - Verification: Unit test compiler functions ensuring output conforms to the 10-section AGENTS.md standard.

- [ ] **T008: Native File Export Command & Save Modal (HITL)**
  - Implement Tauri Rust command `save_spec_bundle` with path canonicalization.
  - Build the "Save to Computer" confirmation dialog displaying file sizes and target directory path.
  - Verification: Click save; check disk folder and confirm `agents.md`, `spec.md`, and `tasks.md` are created.
```

### `public/assets/aistudio/plan_1d322616.md`

```markdown
# Technical Plan: PromptForge Native Workstation

## 1. System Architecture
PromptForge runs as a compiled native Linux binary using Tauri v2. The frontend is an isolated React 19 single-page application rendered inside the system WebKit engine, communicating with a lightweight Rust backend via asynchronous IPC commands.

Flow:
[React 19 Frontend: Decks & Mode Switcher] 
    │
    ├──► [Gemini API Client (@google/genai)] ──► Real-Time Preview Console
    │
    └──► [Tauri IPC Bridge (@tauri-apps/api/core)]
             │
             ▼
[Rust Backend (src-tauri)]
    ├──► Filesystem Writer (Atomic spec/agents/tasks save)
    └──► GNOME Keyring Client (Secure credential storage)

## 2. Key Data Models (TypeScript)

Type Definitions:
- ComplexityMode: 'simple' | 'balanced' | 'pro'
- TargetPlatform: 'web' | 'mobile' | 'desktop' | 'cli'

Project State Contract:
- appName: string
- coreIdea: string
- targetPlatform: TargetPlatform
- features: string[]
- groundRules:
  - offlineFirst: boolean
  - highPerformance: boolean
  - localPrivacy: boolean
  - darkModeDefault: boolean
- clarifications: Array<{ id: string; question: string; options: string[]; selectedAnswer?: string }>
- customRules: string[]

## 3. Rust Backend Commands (src-tauri/src/lib.rs)

- `save_spec_bundle(target_dir: String, files: HashMap<String, String>) -> Result<bool, String>`
  - Canonicalizes destination directory path.
  - Validates write permissions and rejects directory traversal sequences.
  - Atomically writes `AGENTS.md`, `spec.md`, and `tasks.md` to disk.

- `get_secure_key(service: String) -> Result<String, String>`
  - Queries local desktop keyring for the saved Gemini API key.

- `set_secure_key(service: String, key: String) -> Result<(), String>`
  - Saves the Gemini API key securely using system credential storage.

## 4. UI Design Implementation
- Color Scheme: Glassmorphic dark purple (`#0F0C1B` background, frosted `#1A142E` cards, `#8B5CF6` electric violet accents, `#34D399` mint green status).
- Tooltip System: Built using Radix UI Tooltip primitives styled with a 1px solid lilac border, 12px chamfered corners, and subtle back-glows.
- Monospace Syntax View: Highlighted Markdown viewer for live inspection of compiled contracts before saving.
```

### `public/assets/aistudio/spec_b9cfc2d9.md`

```markdown
# Product Specification: PromptForge

## 1. Objective
Provide a fast, friendly, and jargon-free Ubuntu desktop application that allows non-technical builders and developers alike to describe an application idea in plain English and automatically compile it into structured, production-ready AI coding specifications and prompt contracts.

## 2. Target Users
- Beginners and non-coders who want to build apps using AI assistants without learning confusing software engineering jargon.
- Power users and developers who need to scaffold complete, structured prompt contracts and AGENTS.md rules without writing repetitive templates by hand.

## 3. Core Capabilities
- **Three-Tier Mode Switcher:**
  - Simple Mode: Strips technical fields down to three questions (Idea, Device, Main Steps) with AI auto-expansion.
  - Balanced Mode: Adds everyday ground rules (offline-first, screen speed) and a 3-question clarification interview ("Grill Me").
  - Pro Mode: Exposes all 10 persistent instruction sections, task slicing strategies, and file outputs using strictly plain-language labels.
- **Universal Hover Explainer System:**
  - Moving the mouse over any section label, toggle switch, or action button reveals an instant, friendly callout card explaining what the item does and how the AI will use it.
- **Gemini-Powered Inline Expansion:**
  - Dedicated "Flesh Out" buttons on each input card turn rough thoughts into organized, complete feature descriptions using `gemini-2.5-flash`.
- **Targeted Multi-Platform Exporter:**
  - Compiles project requirements into ready-to-paste prompt templates formatted specifically for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
- **One-Click Native File Export:**
  - Writes `spec.md`, `agents.md`, and `tasks.md` directly into a selected project directory on the local computer.

## 4. Behavioral Requirements (EARS Notation)
- When the user selects Simple Mode, the system shall hide all technical rule blocks and present only the three primary plain-language cards.
- When the user hovers over any section badge for more than 100 milliseconds, the system shall display a floating explainer card containing a 2-sentence plain-English description.
- When the user clicks the "Flesh Out My Idea" button with a valid API key, the system shall stream an expanded summary into the input field within 3 seconds.
- When the user clicks "Grill Me", the system shall analyze the entered project requirements and return 3 targeted multiple-choice questions covering missing details.
- When the user confirms saving files, the system shall write `spec.md`, `agents.md`, and `tasks.md` directly to the selected directory without opening browser download prompts.
- When an API key call fails or times out after 30 seconds, the system shall surface a clear warning banner and retain all active form text.
```

### `spec.md`

```markdown
# Product Specification: PromptForge

## 1. Objective
Provide a fast, friendly, and jargon-free Ubuntu desktop application that allows non-technical builders and developers alike to describe an application idea in plain English and automatically compile it into structured, production-ready AI coding specifications and prompt contracts.

## 2. Target Users
- Beginners and non-coders who want to build apps using AI assistants without learning confusing software engineering jargon.
- Power users and developers who need to scaffold complete, structured prompt contracts and AGENTS.md rules without writing repetitive templates by hand.

## 3. Core Capabilities
- **Three-Tier Mode Switcher:**
  - Simple Mode: Strips technical fields down to three questions (Idea, Device, Main Steps) with AI auto-expansion.
  - Balanced Mode: Adds everyday ground rules (offline-first, screen speed) and a 3-question clarification interview ("Grill Me").
  - Pro Mode: Exposes all 10 persistent instruction sections, task slicing strategies, and file outputs using strictly plain-language labels.
- **Universal Hover Explainer System:**
  - Moving the mouse over any section label, toggle switch, or action button reveals an instant, friendly callout card explaining what the item does and how the AI will use it.
- **Gemini-Powered Inline Expansion:**
  - Dedicated "Flesh Out" buttons on each input card turn rough thoughts into organized, complete feature descriptions using `gemini-3.8-flash`.
- **Targeted Multi-Platform Exporter:**
  - Compiles project requirements into ready-to-paste prompt templates formatted specifically for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
- **One-Click Native File Export:**
  - Writes `AGENTS.md`, `spec.md`, `plan.md`, and `tasks.md` directly into a selected project directory on the local computer.

## 4. Behavioral Requirements (EARS Notation)
- When the user selects Simple Mode, the system shall hide all technical rule blocks and present only the three primary plain-language cards.
- When the user hovers over any section badge for more than 100 milliseconds, the system shall display a floating explainer card containing a 2-sentence plain-English description.
- When the user clicks the "Flesh Out My Idea" button with a valid API key, the system shall stream an expanded summary into the input field within 3 seconds.
- When the user clicks "Grill Me", the system shall analyze the entered project requirements and return 3 targeted multiple-choice questions covering missing details.
- When the user confirms saving files, the system shall write `AGENTS.md`, `spec.md`, `plan.md`, and `tasks.md` directly to the selected directory without opening browser download prompts.
- When an API key call fails or times out after 30 seconds, the system shall surface a clear warning banner and retain all active form text.
```

## Configuration & CI

### `.env.example`

```text
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
```

### `.gitattributes`

```text
# Auto detect text files and perform LF normalization
* text=auto
```

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    name: Check Frontend & Tauri Backend
    runs-on: ubuntu-24.04
    timeout-minutes: 30

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install system dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y --no-install-recommends \
            libwebkit2gtk-4.1-dev \
            libappindicator3-dev \
            librsvg2-dev \
            patchelf

      - name: Set up Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - name: Set up Rust stable
        uses: dtolnay/rust-toolchain@stable

      - name: Cache Cargo dependencies
        uses: Swatinem/rust-cache@v2
        with:
          workspaces: "src-tauri"

      - name: Install frontend dependencies
        run: npm install

      - name: Typecheck TypeScript
        run: npx tsc --noEmit

      - name: Run frontend and server tests
        run: npm test

      - name: Build frontend bundle
        run: npm run build

      - name: Check and test Rust backend
        run: |
          cargo check --manifest-path src-tauri/Cargo.toml
          cargo test --manifest-path src-tauri/Cargo.toml
```

### `.github/workflows/pr_agent.yml`

```yaml
name: PR Agent Review

on:
  pull_request:
    types: [opened, reopened, ready_for_review, synchronize]
  issue_comment:
    types: [created]

jobs:
  pr_agent_job:
    if: ${{ github.event.sender.type != 'Bot' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
      pull-requests: write
    steps:
      - name: PR Agent Step
        uses: the-pr-agent/pr-agent@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CONFIG.MODEL: "gemini/gemini-2.5-flash"
          GOOGLE_AI_STUDIO.GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_ACTION_CONFIG.AUTO_REVIEW: "true"
          GITHUB_ACTION_CONFIG.AUTO_DESCRIBE: "true"
```

### `.github/workflows/swe_agent.yml`

```yaml
name: SWE-agent Issue Solver

on:
  issues:
    types: [labeled]

jobs:
  solve_issue:
    if: github.event.label.name == 'swe-agent'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run SWE-agent
        uses: SWE-agent/SWE-agent@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        with:
          model: "gemini/gemini-3.8-flash"
          issue_number: ${{ github.event.issue.number }}
```

### `.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Node / Frontend build & dependencies
node_modules/
build/
dist/
dist-ssr/
coverage/
.vite/
*.local
*.tsbuildinfo

# Rust / Tauri
target/
src-tauri/target/
src-tauri/WixTools/
**/*.rs.bk

# Environment & local secrets
.env
.env.*
!.env.example

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS generated files
.DS_Store
Thumbs.db
```

### `index.html`

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PromptForge Workstation</title>
    <meta name="description" content="Native Ubuntu specification workstation that translates plain-language app ideas into spec.md, plan.md, tasks.md, AGENTS.md, and multi-platform AI prompt contracts." />
    <meta property="og:title" content="PromptForge Workstation" />
    <meta property="og:description" content="Native Ubuntu specification workstation that translates plain-language app ideas into spec.md, plan.md, tasks.md, AGENTS.md, and multi-platform AI prompt contracts." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-[#0F0C1B] text-[#E6DFF5] antialiased selection:bg-[#8B5CF6]/30 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `metadata.json`

```json
{
  "name": "PromptForge Workstation",
  "description": "Native Ubuntu specification workstation that translates plain-language app ideas into spec.md, plan.md, tasks.md, AGENTS.md, and multi-platform AI prompt contracts.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
```

### `package.json`

```json
{
  "name": "promptforge",
  "private": true,
  "version": "0.3.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build",
    "start": "tsx server.ts",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit",
    "tauri": "tauri",
    "test": "tsx --test tests/*.test.ts server.test.ts"
  },
  "dependencies": {
    "@google/genai": "^3.1.0",
    "@radix-ui/react-dialog": "^1.3.1",
    "@radix-ui/react-tabs": "^1.2.1",
    "@radix-ui/react-tooltip": "^1.4.1",
    "@tailwindcss/vite": "^4.3.3",
    "@tauri-apps/api": "^2.12.4",
    "@tauri-apps/plugin-dialog": "^2.8.4",
    "@vitejs/plugin-react": "^6.1.1",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^8.3.0"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.12.4",
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.28.0",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2",
    "supertest": "^7.3.2",
    "@types/supertest": "^7.2.1"
  }
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "types": ["vite/client"],
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  "exclude": ["dist", "build", "node_modules", "src-tauri"]
}
```

### `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

## Backend, Tests & Tauri Native Layer

### `server.test.ts`

```ts
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { setTimeout as nodeSetTimeout } from 'node:timers';
import { createApp } from './server.ts';

test('Gemini routes share key checks, cancel deadlines, and keep provider errors private', async () => {
  const originalEnv = { key: process.env.GEMINI_API_KEY, mode: process.env.NODE_ENV };
  process.env.NODE_ENV = 'production';
  const app = await createApp();
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;
  const clientFetch = globalThis.fetch;
  const realSetTimeout = globalThis.setTimeout;
  const realClearTimeout = globalThis.clearTimeout;
  const realConsoleError = console.error;
  const timers = new Set<number | ReturnType<typeof setTimeout>>();
  const logs: unknown[][] = [];
  let mode = 'success';
  let providerCalls = 0;
  let signal: AbortSignal | undefined;
  const secret = 'provider-secret-do-not-expose';
  globalThis.setTimeout = ((callback: () => void, delay?: number, ...args: unknown[]) => {
    const timer = nodeSetTimeout(callback, delay === 30000 && mode === 'timeout' ? 0 : delay, ...args);
    if (delay === 30000) timers.add(timer);
    return timer;
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((timer) => {
    timers.delete(timer as ReturnType<typeof setTimeout>);
    realClearTimeout(timer);
  }) as typeof clearTimeout;
  console.error = (...args) => { logs.push(args); };
  globalThis.fetch = (async (_input, init) => {
    providerCalls++;
    signal = init?.signal ?? undefined;
    assert.ok(signal instanceof AbortSignal);
    if (mode === 'timeout') {
      return new Promise<Response>((_, reject) => {
        signal!.addEventListener('abort', () => reject(new Error(secret)), { once: true });
      });
    }
    if (mode === 'error' || mode === 'upstream-timeout') {
      return new Response(JSON.stringify({ error: { code: 400, message: mode === 'error' ? secret : 'TIMEOUT', status: 'INVALID_ARGUMENT' } }), { status: 400 });
    }
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: mode === 'invalid-json' ? 'invalid' : '{"ok":true}' }] } }] }), { status: 200 });
  }) as typeof fetch;
  const routes = [
    ['expand', 'Could not reach Gemini AI to flesh out your idea. Your existing text has been safely preserved.'],
    ['random-idea', 'Could not generate a random AI idea right now. Try again or pick a starter template.'],
    ['grill', 'Gemini took too long or encountered an error while generating interview questions. Your current progress is safe.'],
  ];
  const post = (route: string) => clientFetch(`${base}/api/gemini/${route}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ coreIdea: 'A study app' }),
  });
  try {
    for (const key of [undefined, '', '   ', 'MY_GEMINI_API_KEY', ' MY_GEMINI_API_KEY ', ...Array.from({ length: 5 }, (_, i) => ` ${'x'.repeat(i + 1)} `), ' abcdef ']) {
      if (key === undefined) delete process.env.GEMINI_API_KEY;
      else process.env.GEMINI_API_KEY = key;
      const configured = key === ' abcdef ';
      const health = await clientFetch(`${base}/api/health`).then(r => r.json());
      assert.equal(health.geminiConfigured, configured);
      for (const [route] of routes) {
        const before = providerCalls;
        const response = await post(route);
        assert.equal(response.status, configured ? 200 : 503);
        await response.json();
        assert.equal(providerCalls - before, configured ? 1 : 0);
        assert.equal(timers.size, 0);
      }
    }
    process.env.GEMINI_API_KEY = 'synthetic-test-key';
    for (const [route, errorMessage] of routes) {
      for (mode of ['success', 'invalid-json', 'error', 'upstream-timeout', 'timeout']) {
        const response = await post(route);
        const body = await response.json();
        assert.equal(response.status, ({ success: 200, 'invalid-json': 502, error: 500, 'upstream-timeout': 500, timeout: 504 })[mode]);
        if (mode === 'success') assert.deepEqual(body, { ok: true });
        if (mode === 'error' || mode === 'upstream-timeout') assert.equal(body.error, errorMessage);
        if (mode === 'timeout') {
          assert.equal(body.error, 'Gemini took too long. Your existing text has been safely preserved.');
          assert.equal(signal?.aborted, true);
        }
        assert.equal(JSON.stringify(body).includes(secret), false);
        assert.equal(timers.size, 0);
      }
    }
    assert.equal(logs.length, 6);
    for (const log of logs) assert.deepEqual(log, ['Gemini request failed', { category: 'generation_failure' }]);
  } finally {
    globalThis.fetch = clientFetch;
    globalThis.setTimeout = realSetTimeout;
    globalThis.clearTimeout = realClearTimeout;
    console.error = realConsoleError;
    for (const timer of timers) realClearTimeout(timer);
    if (originalEnv.key === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalEnv.key;
    if (originalEnv.mode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv.mode;
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});

test('Extended Gemini endpoints accept unlimited text and multimodal images', async () => {
  const originalEnv = { key: process.env.GEMINI_API_KEY, mode: process.env.NODE_ENV };
  process.env.NODE_ENV = 'production';
  process.env.GEMINI_API_KEY = 'synthetic-extended-key';
  const app = await createApp();
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;
  const clientFetch = globalThis.fetch;
  const capturedBodies: unknown[] = [];

  globalThis.fetch = (async (_input, init) => {
    if (typeof init?.body === 'string') {
      capturedBodies.push(JSON.parse(init.body));
    }
    return new Response(
      JSON.stringify({
        candidates: [{ content: { parts: [{ text: JSON.stringify({ value: 'ok', questions: [] }) }] } }],
      }),
      { status: 200 }
    );
  }) as typeof fetch;

  try {
    const longIdea = 'a'.repeat(25_000);
    const expandResp = await clientFetch(`${base}/api/gemini/expand`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coreIdea: longIdea, features: ['Step 1', 'Step 2'] }),
    });
    assert.equal(expandResp.status, 200);

    const fillResp = await clientFetch(`${base}/api/gemini/fill-field`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        field: 'multiAgentProtocol',
        aiModel: 'gemini-3.5-flash-lite',
        currentValue: 'Initial rules',
        variationNonce: 123,
        context: { appName: 'PulseVault', codingLanguage: 'rust-tauri', coreIdea: longIdea },
      }),
    });
    assert.equal(fillResp.status, 200);
    const fillCaptured = capturedBodies[capturedBodies.length - 1] as any;
    assert.equal(fillCaptured.generationConfig.thinkingConfig.thinkingLevel, 'MINIMAL');
    assert.ok(String(fillCaptured.contents[0].parts[0].text).includes('Initial rules'));

    const miniResp = await clientFetch(`${base}/api/gemini/mini-grill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'stitchUi',
        aiModel: 'gemini-4-argon',
        context: { appName: 'PulseVault' },
        images: [{ id: 'img1', name: 'ref.png', mimeType: 'image/png', dataUrl: 'data:image/png;base64,iVBORw0KGgo=' }],
      }),
    });
    assert.equal(miniResp.status, 200);
    const lastCaptured = capturedBodies[capturedBodies.length - 1] as any;
    assert.equal(lastCaptured.generationConfig.thinkingConfig.thinkingLevel, 'LOW');
    assert.equal(lastCaptured.contents[0].parts[1].inlineData.mimeType, 'image/png');

    const surpriseResp = await clientFetch(`${base}/api/gemini/stitch-surprise`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: { appName: 'PulseVault' } }),
    });
    assert.equal(surpriseResp.status, 200);

    const advisorResp = await clientFetch(`${base}/api/gemini/recommend-language`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: { appName: 'PulseVault', targetPlatform: 'desktop' } }),
    });
    assert.equal(advisorResp.status, 200);
  } finally {
    globalThis.fetch = clientFetch;
    if (originalEnv.key === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalEnv.key;
    if (originalEnv.mode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv.mode;
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
```

### `server.ts`

```ts
import { securityHeadersMiddleware, createRateLimiter, localOriginGuard } from './server/security.js';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'node:fs';
import path from 'path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type, type GenerateContentParameters } from '@google/genai';
import { fileURLToPath } from 'url';
import { registerSpecValidateRoute } from './server/specValidateRoute.js';
import { registerArchiveRoutes } from './server/archiveRoute.ts';

dotenv.config();

const PORT = 3000;

const ALLOWED_AI_MODELS = new Set([
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.1-pro-preview',
  'gemini-4-argon',
]);

/**
 * Resolves a validated Gemini model ID and low-latency thinkingConfig from the request body.
 */
function resolveAiModelConfig(reqBody: Record<string, unknown> | undefined) {
  const nestedContext =
    reqBody?.context && typeof reqBody.context === 'object'
      ? (reqBody.context as Record<string, unknown>)
      : undefined;
  const candidate =
    typeof reqBody?.aiModel === 'string'
      ? reqBody.aiModel
      : typeof nestedContext?.aiModel === 'string'
      ? (nestedContext.aiModel as string)
      : 'gemini-3.8-flash';
  const model = ALLOWED_AI_MODELS.has(candidate) ? candidate : 'gemini-3.8-flash';
  const thinkingLevel =
    model === 'gemini-3.5-flash-lite' ? ThinkingLevel.MINIMAL : ThinkingLevel.LOW;
  return { model, thinkingConfig: { thinkingLevel } };
}

/**
 * Initializes and returns a GoogleGenAI client instance with the configured API key.
 */
function getAiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Checks if the Gemini API key is configured and valid.
 */
function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY?.trim();
  return Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.length > 5);
}

class GeminiTimeoutError extends Error {}

/**
 * Generates content using the Gemini AI with a 30-second timeout.
 * @param ai The GoogleGenAI instance.
 * @param params The parameters for content generation.
 */
async function generateContentWithTimeout(ai: GoogleGenAI, params: GenerateContentParameters) {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      ai.models.generateContent({
        ...params,
        config: { ...params.config, abortSignal: controller.signal },
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(new GeminiTimeoutError());
          controller.abort();
        }, 30000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Validates if the given value is an optional string (undefined or string).
 * @param value The value to check.
 */
function isValidOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

/**
 * Validates if the given value is an optional array of strings.
 * @param value The value to check.
 */
function isValidOptionalFeatures(value: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) && value.every((f) => typeof f === 'string'))
  );
}

interface ImageInput {
  mimeType?: string;
  dataUrl?: string;
}

/**
 * Builds the contents payload for multimodal requests, including the text prompt and optional inline images.
 * @param prompt The text prompt.
 * @param images An optional array of ImageInput objects.
 */
function buildMultimodalContents(prompt: string, images?: unknown) {
  const parts: Array<Record<string, unknown>> = [{ text: prompt }];
  if (Array.isArray(images)) {
    for (const img of images as ImageInput[]) {
      if (typeof img?.dataUrl === 'string') {
        const match = img.dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          });
        }
      }
    }
  }
  return parts.length === 1 ? prompt : [{ role: 'user', parts }];
}

/**
 * Executes a Gemini AI request and sends a JSON response to the client.
 * @param params The parameters for content generation.
 * @param res The Express response object.
 * @param failureMessage The message to log and send on failure.
 */
async function executeGeminiJsonRoute(
  params: GenerateContentParameters,
  res: express.Response,
  failureMessage: string
) {
  try {
    const ai = getAiClient();
    const response = await generateContentWithTimeout(ai, params);

    const rawText = (response.text ?? '{}').trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      res.status(502).json({
        error: 'Received an invalid response from the AI. Your existing text has been safely preserved.',
      });
      return;
    }
    res.json(parsed);
  } catch (error: unknown) {
    if (error instanceof GeminiTimeoutError) {
      res.status(504).json({
        error: 'Gemini took too long. Your existing text has been safely preserved.',
      });
      return;
    }
    console.error('Gemini request failed', { category: 'generation_failure' });
    res.status(500).json({ error: failureMessage });
  }
}

/**
 * Creates and configures the Express application.
 */
export async function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '25mb' }));

  const rateLimiter = createRateLimiter({
    windowMs: 60000,
    maxRequests: 1000,
    skip: () => process.env.NODE_ENV === 'test'
  });

  app.use('/api', securityHeadersMiddleware);
  app.use('/api', rateLimiter);
  app.use('/api', localOriginGuard);
  registerArchiveRoutes(app);
  registerSpecValidateRoute(app);

  const requireGeminiKey = (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isGeminiConfigured()) {
      res.status(503).json({
        error: 'PromptForge needs a valid Gemini API Key to work. Please set it in your environment variables.',
      });
      return;
    }
    next();
  };

  // Health & API Key readiness endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      geminiConfigured: isGeminiConfigured(),
      model: 'gemini-3.8-flash',
    });
  });

  // 1. Expand / Flesh Out Idea endpoint
  app.post('/api/gemini/expand', requireGeminiKey, async (req, res) => {
    const { appName, coreIdea, targetPlatform, features } = req.body || {};
    if (!coreIdea || typeof coreIdea !== 'string' || !coreIdea.trim()) {
      res.status(400).json({ error: 'Please enter at least a rough phrase or sentence for your app idea first.' });
      return;
    }
    if (!isValidOptionalString(appName) || !isValidOptionalString(targetPlatform)) {
      res.status(400).json({ error: 'Invalid app metadata payload.' });
      return;
    }
    if (!isValidOptionalFeatures(features)) {
      res.status(400).json({ error: 'Invalid features payload.' });
      return;
    }

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: `You are PromptForge, a friendly product architect that translates rough, plain-English app thoughts into clear, jargon-free specifications.

Current App Name: ${appName || 'Untitled App'}
Target Device: ${targetPlatform || 'desktop'}
Rough Idea: ${coreIdea}
Current Feature List: ${Array.isArray(features) ? features.join('; ') : 'None yet'}

Expand this rough idea into:
1. A crisp, memorable app name (if the current one is generic or empty, improve it; otherwise keep it).
2. A 1-sentence plain-English tagline.
3. A rich, well-structured 2-paragraph plain-English description of what the app does, who it helps, and how it feels to use (avoid obscure compiler/database jargon).
4. 5 to 6 concrete, practical features written in everyday language.`,
        config: {
          thinkingConfig,
          systemInstruction:
            'Always respond with valid JSON matching the requested schema. Use clear, warm, non-intimidating language suitable for both non-coders and developers.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: {
                type: Type.STRING,
                description: 'Polished name for the application.',
              },
              tagline: {
                type: Type.STRING,
                description: 'Short 1-sentence summary of the app value.',
              },
              expandedIdea: {
                type: Type.STRING,
                description: '2-paragraph expanded plain-English product description.',
              },
              suggestedFeatures: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '5 to 6 plain-language user steps or core capabilities.',
              },
            },
            required: ['appName', 'tagline', 'expandedIdea', 'suggestedFeatures'],
          },
        },
      },
      res,
      'Could not reach Gemini AI to flesh out your idea. Your existing text has been safely preserved.'
    );
  });

  // 2. Generate a Random App Idea with AI
  app.post('/api/gemini/random-idea', requireGeminiKey, async (req, res) => {
    const { categoryHint } = req.body || {};
    if (!isValidOptionalString(categoryHint)) {
      res.status(400).json({ error: 'Invalid category hint.' });
      return;
    }
    const seedCategories = [
      'a local-first Ubuntu creative audio or visual utility',
      'a smart personal productivity or focus ritual workstation',
      'an interactive neighborhood community or hobbyist catalog app',
      'a calm personal finance, recipe, or hardware tinkering organizer',
      'a visual study companion or interactive science sandbox',
    ];
    const chosenTheme =
      (typeof categoryHint === 'string' && categoryHint.trim()) ||
      seedCategories[crypto.randomInt(seedCategories.length)];

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: `Invent an original, practical, and inspiring application idea around the theme: "${chosenTheme}".
Make it concrete, distinctive, and immediately understandable by a non-technical builder.
Include:
- A catchy appName and 1-sentence tagline
- A 2-paragraph plain-English coreIdea explaining what problem it solves and how people interact with it
- targetPlatform ('desktop', 'web', 'mobile', or 'cli')
- 5 specific plain-English features
- 5 tailored multiple-choice clarification questions (with 3 concise options each and a default selectedAnswer)
- Recommended stackSummary and architectureStyle for Pro mode.`,
        config: {
          thinkingConfig,
          systemInstruction:
            'Generate an imaginative, realistic software application concept with zero filler jargon. Return strictly valid JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              tagline: { type: Type.STRING },
              coreIdea: { type: Type.STRING },
              targetPlatform: {
                type: Type.STRING,
                description: 'One of: desktop, web, mobile, cli',
              },
              features: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              groundRules: {
                type: Type.OBJECT,
                properties: {
                  offlineFirst: { type: Type.BOOLEAN },
                  highPerformance: { type: Type.BOOLEAN },
                  localPrivacy: { type: Type.BOOLEAN },
                  darkModeDefault: { type: Type.BOOLEAN },
                },
                required: ['offlineFirst', 'highPerformance', 'localPrivacy', 'darkModeDefault'],
              },
              clarifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
              stackSummary: { type: Type.STRING },
              architectureStyle: { type: Type.STRING },
            },
            required: [
              'appName',
              'tagline',
              'coreIdea',
              'targetPlatform',
              'features',
              'groundRules',
              'clarifications',
              'stackSummary',
              'architectureStyle',
            ],
          },
        },
      },
      res,
      'Could not generate a random AI idea right now. Try again or pick a starter template.'
    );
  });

  // 3. Socratic Interrogator ("Grill Me" Dynamic 3-Question Interview)
  app.post('/api/gemini/grill', requireGeminiKey, async (req, res) => {
    const {
      appName,
      tagline,
      coreIdea,
      targetPlatform,
      codingLanguage,
      codingLanguageNote,
      features,
      groundRules,
      clarifications,
      proConfig,
      stitchUi,
    } = req.body || {};
    if (!coreIdea || typeof coreIdea !== 'string' || !coreIdea.trim()) {
      res.status(400).json({ error: 'Please describe your app idea first so PromptForge knows what to ask.' });
      return;
    }
    if (!isValidOptionalString(appName) || !isValidOptionalString(tagline) || !isValidOptionalString(targetPlatform)) {
      res.status(400).json({ error: 'Invalid app metadata payload.' });
      return;
    }
    if (!isValidOptionalFeatures(features)) {
      res.status(400).json({ error: 'Invalid features payload.' });
      return;
    }
    if (
      groundRules !== undefined &&
      (typeof groundRules !== 'object' || groundRules === null || Array.isArray(groundRules))
    ) {
      res.status(400).json({ error: 'Invalid ground rules payload.' });
      return;
    }

    const aiModelConfig = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model: aiModelConfig.model,
        contents: `Analyze ALL current entries in this application specification and generate 5 sharp, friendly multiple-choice clarification questions ("Grill Me") that dynamically adapt to what the user has already entered and uncover remaining missing details, edge cases, data storage, onboarding, error states, or UX choices.

App Name: ${appName || 'Untitled App'}
Tagline: ${tagline || 'None yet'}
Target Device: ${targetPlatform || 'desktop'}
Coding Language: ${codingLanguage || 'auto'} ${codingLanguageNote ? `(${codingLanguageNote})` : ''}
Core Idea: ${coreIdea}
Feature List: ${Array.isArray(features) ? features.join(' | ') : ''}
Ground Rules: ${JSON.stringify(groundRules || {})}
Previous Clarifications (KEEP & DO NOT REPEAT THESE TOPICS OR QUESTIONS): ${JSON.stringify(clarifications || [])}
Pro Config: ${JSON.stringify(proConfig || {})}
Stitch UI Direction: ${JSON.stringify(stitchUi ? { visualDirection: stitchUi.visualDirection, uploadedResultName: stitchUi.uploadedResultName } : {})}

Rules for the 5 questions:
- Write questions in plain, everyday English (no intimidating jargon).
- Strictly avoid repeating any topic or question already covered in Previous Clarifications—dig into NEW unaddressed areas.
- Adapt directly to the user's current features, platform, coding language, and prior answers.
- Each question must have 3 distinct, practical multiple-choice options.
- Prefix the best option with "(Recommended) ".
- Set selectedAnswer to that recommended first option.`,
        config: {
          systemInstruction:
            'You are a Socratic product coach. Return exactly 5 fresh, non-duplicate high-value multiple-choice questions in valid JSON.',
          thinkingConfig: aiModelConfig.thinkingConfig,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: {
                      type: Type.STRING,
                      description: 'Short plain-English topic like User Flow, Data & Privacy, or Visual Polish',
                    },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
            },
            required: ['questions'],
          },
        },
      },
      res,
      'Gemini took too long or encountered an error while generating interview questions. Your current progress is safe.'
    );
  });

  // 4. Context-Aware Single-Field Fill with AI (uses all other filled fields & supports unlimited refinements)
  const FILL_FIELD_GUIDANCE: Record<string, { label: string; instruction: string }> = {
    appName: {
      label: 'App Name',
      instruction:
        'Generate a crisp, memorable 1-3 word application name in "value" based on ALL other filled fields (tagline, coreIdea, targetPlatform, codingLanguage, features, stitchUi).',
    },
    tagline: {
      label: 'One-Sentence Summary',
      instruction:
        'Write a warm, plain-English 1-sentence summary in "value" describing what the app does and who it helps using all other filled fields.',
    },
    coreIdea: {
      label: 'Big Idea (Plain English)',
      instruction:
        'Write clear, jargon-free paragraphs in "value" explaining the app purpose, target users, and day-to-day experience using ALL other filled fields (appName, tagline, platform, codingLanguage, features, groundRules, clarifications).',
    },
    nextStep: {
      label: 'Next Feature',
      instruction:
        'Suggest 1 concrete, high-value plain-English feature in "value" that complements the existing feature list without duplicating any item.',
    },
    codingLanguageNote: {
      label: 'Coding Language Notes',
      instruction:
        'Suggest helpful plain-English library, framework, or version notes in "value" tailored to the chosen codingLanguage, targetPlatform, groundRules, and features.',
    },
    stackSummary: {
      label: 'Preferred Tech Stack Summary',
      instruction:
        'Suggest a concise tech stack summary in "value" tailored to the codingLanguage, targetPlatform, app idea, ground rules, and clarifications.',
    },
    architectureStyle: {
      label: 'System Architecture Pattern',
      instruction:
        'Suggest a clear 1-sentence architecture pattern in "value" matching the codingLanguage, stack, ground rules, and clarification decisions.',
    },
    testingStrategy: {
      label: 'Verification & Testing Rules',
      instruction:
        'Suggest a practical testing and verification strategy in "value" aligned with the codingLanguage, targetPlatform, stack, and features.',
    },
    securityBoundary: {
      label: 'Security & Filesystem Boundary',
      instruction:
        'Suggest a concrete security & data privacy boundary in "value" reflecting the ground rules, platform, codingLanguage, and app features.',
    },
    templateVariable: {
      label: 'Dynamic Template Token',
      instruction:
        'Suggest 1 useful new template variable NOT already in existing templateVariables: put a short snake_case key in "value" and a sensible default string in "secondaryValue".',
    },
    customRule: {
      label: 'Persistent AI Coding Rule',
      instruction:
        'Suggest 1 concise, actionable coding or UX convention in "value" that is NOT already in existing customRules and fits the project.',
    },
    stitchVisualDirection: {
      label: 'Stitch UI Visual Direction',
      instruction:
        'Describe a vivid, cohesive UI layout, color mood, and component hierarchy in "value" for Google Stitch based on all other filled fields.',
    },
    stitchScreenNotes: {
      label: 'Stitch Screen / Menu Prompt Notes',
      instruction:
        'Describe the exact layout zones, navigation affordances, states (loading, empty, active), and interactive controls in "value" for this specific Google Stitch screen/menu/modal based on all filled fields.',
    },
    uploadedResultNotes: {
      label: 'Stitch Result Handoff Notes',
      instruction:
        'Summarize in "value" how the next coding tool should wire interactive logic, state, and edge cases onto the Stitch UI based on all filled fields.',
    },
    localAgentNotes: {
      label: 'Local AI Agent Rules (Ollama / Continue)',
      instruction:
        'Write concise local-first instructions in "value" for Ollama & Continue (.continuerules) specifying small focused edits, coding style, and verification commands tailored to this project.',
    },
    multiAgentProtocol: {
      label: 'Multi-Agent Coordination Protocol',
      instruction:
        'Write clear coordination rules in "value" for COLLABORATION.md explaining how parallel agents claim lanes, avoid file collisions, and signal handoffs.',
    },
  };

  app.post('/api/gemini/fill-field', requireGeminiKey, async (req, res) => {
    const { field, context, currentValue, variationNonce } = req.body || {};
    if (!field || typeof field !== 'string' || !(field in FILL_FIELD_GUIDANCE)) {
      res.status(400).json({ error: 'Unsupported field requested for AI fill.' });
      return;
    }
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const aiModelConfig = resolveAiModelConfig(req.body);
    const serializedContext = JSON.stringify(context);
    const guidance = FILL_FIELD_GUIDANCE[field];
    const currentValueText =
      typeof currentValue === 'string' && currentValue.trim()
        ? `\nCurrent Field Draft (user clicked Fill with AI again — refine, elevate, or offer a fresh complementary alternative instead of repeating identically):\n${currentValue.trim()}\nVariation Seed: ${variationNonce ?? 'next'}`
        : '';

    await executeGeminiJsonRoute(
      {
        model: aiModelConfig.model,
        contents: `You are PromptForge, helping a builder fill out one specific field using EVERY OTHER filled field across the entire project.

Target Field: ${field} (${guidance.label})
Task: ${guidance.instruction}${currentValueText}

Full Project Context (JSON):
${serializedContext}

Return valid JSON with "value" (and "secondaryValue" only when Target Field is "templateVariable"). Avoid jargon in Simple/Balanced fields and stay consistent with all other filled sections.`,
        config: {
          systemInstruction:
            'You are a thoughtful product architect. Read every filled field in the context carefully and return strictly valid JSON with a smart, tailored answer for the requested field.',
          thinkingConfig: aiModelConfig.thinkingConfig,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              value: {
                type: Type.STRING,
                description: 'Smart context-aware value for the target field.',
              },
              secondaryValue: {
                type: Type.STRING,
                description: 'Optional secondary value (used as token value when field is templateVariable).',
              },
            },
            required: ['value'],
          },
        },
      },
      res,
      `Could not fill ${guidance.label} with AI right now. Your existing text has been safely preserved.`
    );
  });

  // 5. Mini "Grill Me" Quick Follow-Up Questions for Specific Sections (supports multimodal images for Stitch UI)
  const MINI_GRILL_TOPICS: Record<string, string> = {
    idea: 'Clarify the core user problem, audience, or daily workflow so the Big Idea description becomes much sharper.',
    features: 'Clarify missing user interactions or edge cases so a concrete new feature can be added to the Feature List.',
    groundRules: 'Clarify offline behavior, speed expectations, or data privacy expectations.',
    codingLanguage: 'Clarify developer ergonomics, target ecosystem, or deployment priorities to refine coding language notes.',
    proArch: 'Clarify technical architecture, testing coverage, or security constraints for AGENTS.md.',
    stitchUi: 'Grill the user specifically about visual UI design (layout density, navigation pattern, color mood, typography, and component style) using any attached reference images.',
  };

  app.post('/api/gemini/mini-grill', requireGeminiKey, async (req, res) => {
    const { topic, context, images } = req.body || {};
    if (!topic || typeof topic !== 'string' || !(topic in MINI_GRILL_TOPICS)) {
      res.status(400).json({ error: 'Unsupported mini-grill topic.' });
      return;
    }
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const prompt = `Generate 2 quick, friendly multiple-choice helper questions focused on "${topic}" (${MINI_GRILL_TOPICS[topic]}) so the user can add concrete detail to their app.

Full Project Context (JSON):
${JSON.stringify(context)}

Rules:
- Keep questions short and plain-English.
- Each question must have 3 practical options, prefixing the best option with "(Recommended) ".
- Set selectedAnswer to that recommended option.`;

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: buildMultimodalContents(prompt, images),
        config: {
          thinkingConfig,
          systemInstruction:
            'You are a friendly product & UI design coach. Return strictly valid JSON with 2 targeted multiple-choice questions.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
            },
            required: ['questions'],
          },
        },
      },
      res,
      'Could not generate mini-grill questions right now. Your active form text is safe.'
    );
  });

  // 6. Google Stitch "Surprise Me" UI Concept Generator (with optional uploaded idea images)
  app.post('/api/gemini/stitch-surprise', requireGeminiKey, async (req, res) => {
    const { context, images } = req.body || {};
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const prompt = `Invent an inspiring, cohesive visual UI design direction for Google Stitch tailored to this application (and analyzing any attached inspiration images if provided).

Full Project Context (JSON):
${JSON.stringify(context)}

Return:
- designConceptName: short evocative theme name
- visualDirection: a rich plain-English UI brief describing color palette, surface materials, spatial layout, typography mood, and key interactions
- uiClarifications: 3 multiple-choice UI design questions (layout, navigation, visual density) with 3 practical options each (best prefixed with "(Recommended) ") and selectedAnswer set to that recommended option.`;

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: buildMultimodalContents(prompt, images),
        config: {
          thinkingConfig,
          systemInstruction:
            'You are a world-class UI/UX designer preparing a visual brief for Google Stitch. Return strictly valid JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              designConceptName: { type: Type.STRING },
              visualDirection: { type: Type.STRING },
              uiClarifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
            },
            required: ['designConceptName', 'visualDirection', 'uiClarifications'],
          },
        },
      },
      res,
      'Could not generate a Surprise Me UI idea right now. Your existing visual notes are safe.'
    );
  });

  // 7. Coding Language Advisor ("What is best for what?")
  app.post('/api/gemini/recommend-language', requireGeminiKey, async (req, res) => {
    const { context } = req.body || {};
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const allowedIds = [
      'typescript-react',
      'rust-tauri',
      'python',
      'dart-flutter',
      'kotlin-android',
      'swift-ios',
      'go',
      'csharp-dotnet',
    ];

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: `Analyze this app specification and advise the builder in plain English on which coding language is best for what—and which single language fits their app best.

Full Project Context (JSON):
${JSON.stringify(context)}

Choose recommendedId from: ${allowedIds.join(', ')}.
Return summary, tradeoffs, and 4 practical comparisons explaining what each language is best for and why to consider or skip it.`,
        config: {
          thinkingConfig,
          systemInstruction:
            'You are a friendly principal engineer explaining coding language trade-offs in plain, jargon-free English. Return strictly valid JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedId: { type: Type.STRING },
              recommendedLabel: { type: Type.STRING },
              summary: { type: Type.STRING },
              tradeoffs: { type: Type.STRING },
              comparisons: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    language: { type: Type.STRING },
                    bestFor: { type: Type.STRING },
                    whyConsiderOrSkip: { type: Type.STRING },
                  },
                  required: ['language', 'bestFor', 'whyConsiderOrSkip'],
                },
              },
            },
            required: [
              'recommendedId',
              'recommendedLabel',
              'summary',
              'tradeoffs',
              'comparisons',
            ],
          },
        },
      },
      res,
      'Could not fetch AI coding language advice right now. You can still select any language manually.'
    );
  });

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    const cachedIndexHtml = fs.existsSync(indexHtmlPath)
      ? fs.readFileSync(indexHtmlPath, 'utf-8')
      : null;
    app.use(express.static(distPath));
    app.get('*', rateLimiter, (_req, res) => {
      if (!cachedIndexHtml) {
        res.status(404).send('Not found');
        return;
      }
      res.type('html').send(cachedIndexHtml);
    });
  }

  return app;
}

/**
 * Starts the Express server.
 */
async function startServer() {
  const host = process.env.HOST || '127.0.0.1';
  const app = await createApp();
  app.listen(PORT, host, () => {
    console.log(`PromptForge Workstation server running on http://${host}:${PORT}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
}
```

### `server/archiveRoute.ts`

```ts
import express, { Application, Request, Response } from 'express';
import crypto from 'node:crypto';


const ALLOWED_FILES = [
  'AGENTS.md',
  'spec.md',
  'plan.md',
  'tasks.md',
  'COLLABORATION.md',
  '.continuerules',
];

/**
 * Registers the POST /api/export/bundle endpoint for downloading allowed spec files as a ZIP with SHA-256 checksums.
 */
export function registerArchiveRoutes(app: Application) {
  app.post('/api/export/bundle', (req: Request, res: Response) => {
    const { appName, files } = req.body ?? {};

    if (!files || typeof files !== 'object' || Array.isArray(files)) {
      return res.status(400).json({ error: 'Missing or invalid "files" object.' });
    }

    const fileKeys = Object.keys(files);

    // Check for disallowed files or path traversal
    for (const key of fileKeys) {
      if (!ALLOWED_FILES.includes(key) || key.includes('..') || key.includes('/') || key.includes('\\')) {
        return res.status(400).json({ error: `Invalid file name: ${key}` });
      }
    }

    const archiveFiles: { name: string; content: Buffer }[] = [];
    let sha256sums = '';

    for (const [name, content] of Object.entries(files)) {
      if (typeof content !== 'string') {
          return res.status(400).json({ error: `Invalid content for file: ${name}` });
      }
      const buffer = Buffer.from(content, 'utf-8');
      archiveFiles.push({ name, content: buffer });

      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      sha256sums += `${hash}  ${name}\n`;
    }

    const sumsBuffer = Buffer.from(sha256sums, 'utf-8');
    archiveFiles.push({ name: 'SHA256SUMS.txt', content: sumsBuffer });

    // ZIP generation using raw buffers (no external deps)
    // Structure:
    // [Local File Headers + Data] ...
    // [Central Directory Headers] ...
    // [End of Central Directory Record]

    const localFileHeaders: Buffer[] = [];
    const centralDirectoryHeaders: Buffer[] = [];
    let offset = 0;

    for (const file of archiveFiles) {
      const nameBuf = Buffer.from(file.name);

      // Calculate CRC32 (Poly: 0xEDB88320)
      // Since node:zlib doesn't expose a raw crc32 function easily for direct usage, we can implement it or use a trick.
      // A trick is to use zlib.deflateSync but just use uncompressed data.
      // Wait, node:zlib actually has crc32 if we dig, but let's implement standard crc32.
      let crc = 0 ^ (-1);
      for (let i = 0; i < file.content.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ file.content[i]) & 0xFF];
      }
      crc = (crc ^ (-1)) >>> 0;

      const time = 0;
      const date = 0;

      // Local File Header
      const lfh = Buffer.alloc(30);
      lfh.writeUInt32LE(0x04034b50, 0); // Signature
      lfh.writeUInt16LE(10, 4); // Version needed to extract
      lfh.writeUInt16LE(0, 6); // General purpose bit flag
      lfh.writeUInt16LE(0, 8); // Compression method (0 = store)
      lfh.writeUInt16LE(time, 10); // Last mod file time
      lfh.writeUInt16LE(date, 12); // Last mod file date
      lfh.writeUInt32LE(crc, 14); // CRC-32
      lfh.writeUInt32LE(file.content.length, 18); // Compressed size
      lfh.writeUInt32LE(file.content.length, 22); // Uncompressed size
      lfh.writeUInt16LE(nameBuf.length, 26); // File name length
      lfh.writeUInt16LE(0, 28); // Extra field length

      const localFileData = Buffer.concat([lfh, nameBuf, file.content]);
      localFileHeaders.push(localFileData);

      // Central Directory Header
      const cdh = Buffer.alloc(46);
      cdh.writeUInt32LE(0x02014b50, 0); // Signature
      cdh.writeUInt16LE(0, 4); // Version made by
      cdh.writeUInt16LE(10, 6); // Version needed to extract
      cdh.writeUInt16LE(0, 8); // General purpose bit flag
      cdh.writeUInt16LE(0, 10); // Compression method
      cdh.writeUInt16LE(time, 12); // Last mod file time
      cdh.writeUInt16LE(date, 14); // Last mod file date
      cdh.writeUInt32LE(crc, 16); // CRC-32
      cdh.writeUInt32LE(file.content.length, 20); // Compressed size
      cdh.writeUInt32LE(file.content.length, 24); // Uncompressed size
      cdh.writeUInt16LE(nameBuf.length, 28); // File name length
      cdh.writeUInt16LE(0, 30); // Extra field length
      cdh.writeUInt16LE(0, 32); // File comment length
      cdh.writeUInt16LE(0, 34); // Disk number start
      cdh.writeUInt16LE(0, 36); // Internal file attributes
      cdh.writeUInt32LE(0, 38); // External file attributes
      cdh.writeUInt32LE(offset, 42); // Relative offset of local header

      centralDirectoryHeaders.push(Buffer.concat([cdh, nameBuf]));

      offset += localFileData.length;
    }

    const centralDirectoryData = Buffer.concat(centralDirectoryHeaders);

    // End of Central Directory Record
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0); // Signature
    eocd.writeUInt16LE(0, 4); // Number of this disk
    eocd.writeUInt16LE(0, 6); // Disk where central directory starts
    eocd.writeUInt16LE(archiveFiles.length, 8); // Number of central directory records on this disk
    eocd.writeUInt16LE(archiveFiles.length, 10); // Total number of central directory records
    eocd.writeUInt32LE(centralDirectoryData.length, 12); // Size of central directory
    eocd.writeUInt32LE(offset, 16); // Offset of start of central directory, relative to start of archive
    eocd.writeUInt16LE(0, 20); // ZIP file comment length

    const zipBuffer = Buffer.concat([...localFileHeaders, centralDirectoryData, eocd]);

    const slug = (typeof appName === 'string' && appName ? appName : 'project')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${slug}-spec-bundle.zip"`);
    return res.send(zipBuffer);
  });
}

// CRC32 table initialization
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    if (c & 1) {
      c = 0xEDB88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[i] = c >>> 0;
}
```

### `server/security.ts`

```ts
import { NextFunction, Request, Response } from 'express';

/**
 * Sets defensive security headers on API responses.
 */
export function securityHeadersMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
}

/**
 * Configuration options for the in-memory per-IP rate limiter.
 */
interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
  skip?: (req: Request) => boolean;
}

/**
 * Creates a fixed-window per-IP rate limiting middleware returning 429 JSON on excess bursts.
 */
export function createRateLimiter(options: RateLimiterOptions = {}) {
  const windowMs = options.windowMs ?? 60000;
  const maxRequests = options.maxRequests ?? 1000;
  const skip = options.skip ?? (() => false);

  const ipRequests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    if (skip(req)) {
      return next();
    }

    let ip = req.ip || req.socket?.remoteAddress || 'unknown';
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1';
    }

    const now = Date.now();
    if (ipRequests.size > 10000) {
      for (const [key, entry] of ipRequests.entries()) {
        if (now > entry.resetTime) {
          ipRequests.delete(key);
        }
      }
    }

    const record = ipRequests.get(ip);
    if (!record || now > record.resetTime) {
      ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        error: 'Too many AI requests. Please wait a moment and try again.',
      });
      return;
    }

    record.count++;
    next();
  };
}

/**
 * Validates that state-mutating production POST requests originate from localhost, 127.0.0.1, Tauri, or no-Origin clients.
 */
export function localOriginGuard(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'POST') {
    return next();
  }

  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const origin = req.headers.origin;
  if (!origin) {
    return next();
  }

  let isLocal = origin === 'null';
  if (!isLocal) {
    try {
      const url = new URL(origin);
      const isLoopbackHost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
      isLocal =
        (url.protocol === 'http:' && isLoopbackHost && !url.username && !url.password) ||
        url.protocol === 'tauri:';
    } catch {
      isLocal = false;
    }
  }

  if (!isLocal) {
    res.status(403).json({ error: 'Cross-origin requests are not allowed.' });
    return;
  }

  next();
}
```

### `server/specValidateRoute.ts`

```ts
import { Application, Request, Response } from 'express';
import { ProjectState } from '../src/types/project.js';
import {
  compileAgentsMd,
  compilePlanMd,
  compileSpecMd,
  compileTasksMd,
} from '../src/services/compiler.js';

interface ValidationWarning {
  code: string;
  field: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  score: number;
  warnings: ValidationWarning[];
}

/**
 * Scans text linearly (O(n), free of ReDoS backtracking) for unresolved `{{token}}` placeholders.
 */
function findUnresolvedTokens(
  text: string,
  templateVariables: Record<string, string> = {}
): string[] {
  const unresolved: string[] = [];
  let searchFrom = 0;

  while (searchFrom < text.length) {
    const start = text.indexOf('{{', searchFrom);
    if (start === -1) break;
    const end = text.indexOf('}}', start + 2);
    if (end === -1) break;

    const rawInside = text.slice(start + 2, end);
    if (!rawInside.includes('{{') && !rawInside.includes('\n')) {
      const tokenName = rawInside.trim();
      if (
        tokenName.length > 0 &&
        (!(tokenName in templateVariables) ||
          templateVariables[tokenName] === tokenName ||
          templateVariables[tokenName].trim() === '')
      ) {
        unresolved.push(tokenName);
      }
      searchFrom = end + 2;
    } else {
      searchFrom = start + 2;
    }
  }

  return unresolved;
}

/**
 * Registers the offline-capable POST /api/specs/validate endpoint to audit ProjectState readiness.
 */
export function registerSpecValidateRoute(app: Application) {
  app.post('/api/specs/validate', (req: Request, res: Response) => {
    if (
      !req.body ||
      typeof req.body !== 'object' ||
      Array.isArray(req.body) ||
      Object.keys(req.body).length === 0
    ) {
      return res.status(400).json({ error: 'Invalid or missing JSON payload' });
    }

    const state = req.body as Partial<ProjectState>;
    const warnings: ValidationWarning[] = [];

    if (!state.appName || state.appName.trim() === '' || state.appName === 'My Awesome App') {
      warnings.push({
        code: 'MISSING_APP_NAME',
        field: 'appName',
        message: 'App name is missing or placeholder.',
      });
    }

    if (!state.coreIdea || state.coreIdea.trim() === '') {
      warnings.push({
        code: 'MISSING_CORE_IDEA',
        field: 'coreIdea',
        message: 'Core idea is missing.',
      });
    }

    if (
      !state.features ||
      !Array.isArray(state.features) ||
      state.features.length === 0 ||
      state.features.every((f) => typeof f !== 'string' || f.trim() === '')
    ) {
      warnings.push({
        code: 'EMPTY_FEATURES',
        field: 'features',
        message: 'Features list is empty.',
      });
    }

    const workflow = state.workflowProgress || {
      stitchDone: false,
      builderDone: false,
      polishDone: false,
    };
    if (!workflow.stitchDone) {
      const hasStitchUi =
        state.stitchUi &&
        (state.stitchUi.visualDirection || state.stitchUi.uploadedResultName);
      if (!hasStitchUi) {
        warnings.push({
          code: 'MISSING_STITCH_UI',
          field: 'stitchUi',
          message:
            'Missing visual direction or uploaded Stitch result for incomplete stitch workflow.',
        });
      }
    }

    const templateVars = state.proConfig?.templateVariables || {};
    const unresolvedTokens = new Set<string>();

    const checkTokens = (text: string) => {
      findUnresolvedTokens(text, templateVars).forEach((t) => unresolvedTokens.add(t));
    };

    if (typeof state.coreIdea === 'string') checkTokens(state.coreIdea);
    if (Array.isArray(state.proConfig?.customRules)) {
      state.proConfig.customRules.forEach((rule) => {
        if (typeof rule === 'string') checkTokens(rule);
      });
    }

    if (
      state.appName &&
      state.coreIdea &&
      state.targetPlatform &&
      state.proConfig &&
      state.groundRules
    ) {
      try {
        const fullState = state as ProjectState;
        checkTokens(compileSpecMd(fullState));
        checkTokens(compilePlanMd(fullState));
        checkTokens(compileTasksMd(fullState));
        checkTokens(compileAgentsMd(fullState));
      } catch {
        warnings.push({
          code: 'COMPILATION_ERROR',
          field: 'markdown',
          message: 'Failed to compile markdown for token check.',
        });
      }
    }

    if (unresolvedTokens.size > 0) {
      warnings.push({
        code: 'UNRESOLVED_TOKENS',
        field: 'templateVariables',
        message: `Found unresolved tokens: ${Array.from(unresolvedTokens).join(', ')}`,
      });
    }

    const score = Math.max(0, 100 - warnings.length * 15);
    const valid =
      score > 50 &&
      warnings.filter(
        (w) => w.code === 'MISSING_APP_NAME' || w.code === 'MISSING_CORE_IDEA'
      ).length === 0;

    const result: ValidationResult = {
      valid,
      score,
      warnings,
    };

    res.status(200).json(result);
  });
}
```

### `src-tauri/.gitignore`

```text
# Generated by Cargo
# will have compiled files and executables
/target/
/gen/schemas
```

### `src-tauri/Cargo.toml`

```toml
[package]
name = "app"
version = "0.3.0"
description = "A Tauri App"
authors = ["you"]
license = ""
repository = ""
edition = "2024"
rust-version = "1.90"

[lib]
name = "app_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2.7.4", features = [] }

[dependencies]
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"] }
log = "0.4"
tauri = { version = "2.12.5", features = [] }
tauri-plugin-log = "2"
tauri-plugin-dialog = "2"
tauri-plugin-fs = "2"
reqwest = { version = "0.12", features = ["json"] }
keyring = "2.3.3"
```

### `src-tauri/build.rs`

```rust
fn main() {
  tauri_build::build()
}
```

### `src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Least-privilege desktop permissions for PromptForge Workstation",
  "windows": [
    "main"
  ],
  "permissions": [
    "core:default",
    "dialog:allow-open",
    "fs:default"
  ]
}
```

### `src-tauri/src/export.rs`

```rust
use std::collections::HashMap;
use std::fs;
use std::path::{Component, Path, PathBuf};

pub(crate) fn expand_home_prefix(trimmed: &str, home_dir: Option<&Path>) -> Result<PathBuf, String> {
    if trimmed == "~" {
        return home_dir
            .map(Path::to_path_buf)
            .ok_or_else(|| "Unable to determine user home directory for '~'.".to_string());
    }
    if let Some(rest) = trimmed.strip_prefix("~/") {
        let base = home_dir
            .ok_or_else(|| "Unable to determine user home directory for '~/'.".to_string())?;
        return Ok(base.join(rest));
    }
    Ok(PathBuf::from(trimmed))
}

/// Validates and canonicalizes a target directory path, rejecting empty inputs, relative paths, and '..' traversal segments.
pub(crate) fn validate_and_resolve_dir(target_dir: &str) -> Result<PathBuf, String> {
    let trimmed = target_dir.trim();
    if trimmed.is_empty() {
        return Err("Target directory path cannot be empty.".to_string());
    }
    if trimmed.replace('\\', "/").split('/').any(|seg| seg == "..") {
        return Err("Security Error: Directory traversal ('..') is prohibited.".to_string());
    }

    let home = std::env::var_os("HOME").map(PathBuf::from);
    let expanded = expand_home_prefix(trimmed, home.as_deref())?;
    if !expanded.is_absolute() {
        return Err("Target directory path must be an absolute path or start with '~/'.".to_string());
    }
    for component in expanded.components() {
        if matches!(component, Component::ParentDir) {
            return Err("Security Error: Directory traversal ('..') is prohibited.".to_string());
        }
    }
    if !expanded.exists() {
        fs::create_dir_all(&expanded)
            .map_err(|e| format!("Failed to create target directory: {}", e))?;
    }
    fs::canonicalize(&expanded)
        .map_err(|e| format!("Failed to canonicalize path '{}': {}", target_dir, e))
}

pub(crate) fn save_spec_bundle_to_dir(
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

        // Prevent symlink escapes: If a file exists at the destination, and it's a symlink, canonicalize it and verify it's within the canonicalized `target_dir`. If not, return an error.
        if dest.is_symlink() {
            let canonical_dest = fs::canonicalize(&dest)
                .map_err(|e| format!("Failed to canonicalize destination symlink: {}", e))?;

            if !canonical_dest.starts_with(&resolved_dir) {
                return Err(format!("Security Error: Symlink {} escapes destination directory", filename));
            }
        }

        // Write content to a temporary file in the canonical target directory.
        let temp_dest = resolved_dir.join(format!("{}.tmp", filename));
        fs::write(&temp_dest, content.as_bytes())
            .map_err(|e| format!("Failed to write {}: {}", temp_dest.display(), e))?;

        // Atomically rename the temporary file to the final destination file using `fs::rename`.
        fs::rename(&temp_dest, &dest)
            .map_err(|e| {
                let _ = fs::remove_file(&temp_dest); // Cleanup on failure
                format!("Failed to rename {} to {}: {}", temp_dest.display(), dest.display(), e)
            })?;
    }

    Ok(true)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_empty_and_traversal_paths() {
        assert!(validate_and_resolve_dir("").is_err());
        assert!(validate_and_resolve_dir("   ").is_err());
        assert!(validate_and_resolve_dir("/tmp/../etc").is_err());
        assert!(validate_and_resolve_dir("../escape").is_err());
    }

    #[test]
    fn expands_home_prefix_and_rejects_relative_paths() {
        let home = Path::new("/home/sinnoh");
        assert_eq!(expand_home_prefix("~", Some(home)), Ok(PathBuf::from("/home/sinnoh")));
        assert_eq!(
            expand_home_prefix("~/Projects/specs", Some(home)),
            Ok(PathBuf::from("/home/sinnoh/Projects/specs"))
        );
        assert!(expand_home_prefix("~", None).is_err());
        assert!(validate_and_resolve_dir("relative/path").is_err());
    }

    #[test]
    fn save_spec_bundle_enforces_filename_allowlist_and_writes_files() {
        let test_dir = std::env::temp_dir().join(format!(
            "promptforge_test_{}",
            std::process::id()
        ));
        let dir_str = test_dir.to_string_lossy().to_string();

        let mut bad_files = HashMap::new();
        bad_files.insert("evil.sh".to_string(), "rm -rf /".to_string());
        assert!(save_spec_bundle_to_dir(dir_str.clone(), bad_files).is_err());

        let mut good_files = HashMap::new();
        good_files.insert("AGENTS.md".to_string(), "# Agents".to_string());
        good_files.insert("spec.md".to_string(), "# Spec".to_string());
        assert_eq!(save_spec_bundle_to_dir(dir_str.clone(), good_files), Ok(true));
        assert_eq!(fs::read_to_string(test_dir.join("AGENTS.md")).unwrap(), "# Agents");
        assert_eq!(fs::read_to_string(test_dir.join("spec.md")).unwrap(), "# Spec");

        let _ = fs::remove_dir_all(&test_dir);
    }

    #[test]
    fn save_spec_bundle_atomic_overwrite() {
        let test_dir = std::env::temp_dir().join(format!(
            "promptforge_test_atomic_{}",
            std::process::id()
        ));
        let dir_str = test_dir.to_string_lossy().to_string();
        let _ = fs::create_dir_all(&test_dir);

        let dest_file = test_dir.join("plan.md");
        fs::write(&dest_file, "Initial content").unwrap();

        let mut files = HashMap::new();
        files.insert("plan.md".to_string(), "Overwritten content".to_string());

        assert_eq!(save_spec_bundle_to_dir(dir_str, files), Ok(true));
        assert_eq!(fs::read_to_string(&dest_file).unwrap(), "Overwritten content");

        let _ = fs::remove_dir_all(&test_dir);
    }

    #[test]
    #[cfg(unix)]
    fn save_spec_bundle_rejects_escaping_symlinks() {
        use std::os::unix::fs::symlink;

        let base_dir = std::env::temp_dir().join(format!(
            "promptforge_test_symlink_{}",
            std::process::id()
        ));
        let test_dir = base_dir.join("target");
        let escape_dir = base_dir.join("escape");

        let _ = fs::create_dir_all(&test_dir);
        let _ = fs::create_dir_all(&escape_dir);

        // Escape file we don't want overwritten
        let escape_file = escape_dir.join("target.txt");
        fs::write(&escape_file, "Sensitive Data").unwrap();

        // Symlink pointing to the escape file (and named as an allowed file)
        let symlink_path = test_dir.join("tasks.md");
        symlink(&escape_file, &symlink_path).unwrap();

        let dir_str = test_dir.to_string_lossy().to_string();
        let mut files = HashMap::new();
        files.insert("tasks.md".to_string(), "Malicious content".to_string());

        let res = save_spec_bundle_to_dir(dir_str, files);
        assert!(res.is_err());
        assert!(res.unwrap_err().contains("Security Error: Symlink tasks.md escapes destination directory"));

        // Ensure original data was untouched
        assert_eq!(fs::read_to_string(&escape_file).unwrap(), "Sensitive Data");

        let _ = fs::remove_dir_all(&base_dir);
    }
}
```

### `src-tauri/src/gemini.rs`

````rust
use serde_json::{json, Value};
use std::sync::OnceLock;
use std::time::Duration;

pub(crate) const GEMINI_MODELS_BASE_URL: &str =
    "https://generativelanguage.googleapis.com/v1beta/models/";
pub(crate) const GEMINI_TIMEOUT_SECS: u64 = 30;

pub(crate) fn resolve_model_and_thinking(payload: &Value) -> (&'static str, &'static str) {
    let raw = payload
        .get("aiModel")
        .and_then(Value::as_str)
        .or_else(|| {
            payload
                .get("context")
                .and_then(|ctx| ctx.get("aiModel"))
                .and_then(Value::as_str)
        })
        .unwrap_or("gemini-3.8-flash")
        .trim();

    match raw {
        "gemini-3.5-flash-lite" => ("gemini-3.5-flash-lite", "MINIMAL"),
        "gemini-3.6-flash" => ("gemini-3.6-flash", "LOW"),
        "gemini-3.1-pro-preview" => ("gemini-3.1-pro-preview", "LOW"),
        "gemini-4-argon" => ("gemini-4-argon", "LOW"),
        _ => ("gemini-3.8-flash", "LOW"),
    }
}

pub(crate) static HTTP_CLIENT: OnceLock<reqwest::Client> = OnceLock::new();

pub(crate) fn get_http_client() -> &'static reqwest::Client {
    HTTP_CLIENT.get_or_init(|| {
        reqwest::Client::builder()
            .timeout(Duration::from_secs(GEMINI_TIMEOUT_SECS))
            .build()
            .expect("failed to build reqwest client")
    })
}

pub(crate) fn sanitize_error_message(err_str: &str) -> String {
    let lower = err_str.to_lowercase();
    if lower.contains("x-goog-api-key") || lower.contains("credentials") {
        return "An internal authentication error occurred. Please check your API key.".to_string();
    }
    err_str.to_string()
}
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum GeminiEndpoint {
    Expand,
    RandomIdea,
    Grill,
    FillField,
    MiniGrill,
    StitchSurprise,
    RecommendLanguage,
}

pub(crate) fn normalize_gemini_endpoint(endpoint: &str) -> Result<GeminiEndpoint, String> {
    match endpoint.trim() {
        "/api/gemini/expand" | "expand" => Ok(GeminiEndpoint::Expand),
        "/api/gemini/random-idea" | "random-idea" => Ok(GeminiEndpoint::RandomIdea),
        "/api/gemini/grill" | "grill" => Ok(GeminiEndpoint::Grill),
        "/api/gemini/fill-field" | "fill-field" => Ok(GeminiEndpoint::FillField),
        "/api/gemini/mini-grill" | "mini-grill" => Ok(GeminiEndpoint::MiniGrill),
        "/api/gemini/stitch-surprise" | "stitch-surprise" => Ok(GeminiEndpoint::StitchSurprise),
        "/api/gemini/recommend-language" | "recommend-language" => Ok(GeminiEndpoint::RecommendLanguage),
        _ => Err("Unsupported Gemini endpoint.".to_string()),
    }
}

pub(crate) fn fill_field_guidance(field: &str) -> Result<(&'static str, &'static str), String> {
    match field {
        "appName" => Ok((
            "App Name",
            "Generate a crisp, memorable 1-3 word application name in \"value\" based on ALL other filled fields (tagline, coreIdea, targetPlatform, codingLanguage, features, stitchUi).",
        )),
        "tagline" => Ok((
            "One-Sentence Summary",
            "Write a warm, plain-English 1-sentence summary in \"value\" describing what the app does and who it helps using all other filled fields.",
        )),
        "coreIdea" => Ok((
            "Big Idea (Plain English)",
            "Write clear, jargon-free paragraphs in \"value\" explaining the app purpose, target users, and day-to-day experience using ALL other filled fields (appName, tagline, platform, codingLanguage, features, groundRules, clarifications).",
        )),
        "nextStep" => Ok((
            "Next Feature",
            "Suggest 1 concrete, high-value plain-English feature in \"value\" that complements the existing feature list without duplicating any item.",
        )),
        "codingLanguageNote" => Ok((
            "Coding Language Notes",
            "Suggest helpful plain-English library, framework, or version notes in \"value\" tailored to the chosen codingLanguage, targetPlatform, groundRules, and features.",
        )),
        "stackSummary" => Ok((
            "Preferred Tech Stack Summary",
            "Suggest a concise tech stack summary in \"value\" tailored to the codingLanguage, targetPlatform, app idea, ground rules, and clarifications.",
        )),
        "architectureStyle" => Ok((
            "System Architecture Pattern",
            "Suggest a clear 1-sentence architecture pattern in \"value\" matching the codingLanguage, stack, ground rules, and clarification decisions.",
        )),
        "testingStrategy" => Ok((
            "Verification & Testing Rules",
            "Suggest a practical testing and verification strategy in \"value\" aligned with the codingLanguage, targetPlatform, stack, and features.",
        )),
        "securityBoundary" => Ok((
            "Security & Filesystem Boundary",
            "Suggest a concrete security & data privacy boundary in \"value\" reflecting the ground rules, platform, codingLanguage, and app features.",
        )),
        "templateVariable" => Ok((
            "Dynamic Template Token",
            "Suggest 1 useful new template variable NOT already in existing templateVariables: put a short snake_case key in \"value\" and a sensible default string in \"secondaryValue\".",
        )),
        "customRule" => Ok((
            "Persistent AI Coding Rule",
            "Suggest 1 concise, actionable coding or UX convention in \"value\" that is NOT already in existing customRules and fits the project.",
        )),
        "stitchVisualDirection" => Ok((
            "Stitch UI Visual Direction",
            "Describe a vivid, cohesive UI layout, color mood, and component hierarchy in \"value\" for Google Stitch based on all other filled fields.",
        )),
        "stitchScreenNotes" => Ok((
            "Stitch Screen / Menu Prompt Notes",
            "Describe the exact layout zones, navigation affordances, states (loading, empty, active), and interactive controls in \"value\" for this specific Google Stitch screen/menu/modal based on all filled fields.",
        )),
        "uploadedResultNotes" => Ok((
            "Stitch Result Handoff Notes",
            "Summarize in \"value\" how the next coding tool should wire interactive logic, state, and edge cases onto the Stitch UI based on all filled fields.",
        )),
        "localAgentNotes" => Ok((
            "Local AI Agent Rules (Ollama / Continue)",
            "Write concise local-first instructions in \"value\" for Ollama & Continue (.continuerules) specifying small focused edits, coding style, and verification commands tailored to this project.",
        )),
        "multiAgentProtocol" => Ok((
            "Multi-Agent Coordination Protocol",
            "Write clear coordination rules in \"value\" for COLLABORATION.md explaining how parallel agents claim lanes, avoid file collisions, and signal handoffs.",
        )),
        _ => Err("Unsupported field requested for AI fill.".to_string()),
    }
}

pub(crate) fn mini_grill_topic_guidance(topic: &str) -> Result<&'static str, String> {
    match topic {
        "idea" => Ok("Clarify the core user problem, audience, or daily workflow so the Big Idea description becomes much sharper."),
        "features" => Ok("Clarify missing user interactions or edge cases so a concrete new feature can be added to the Feature List."),
        "groundRules" => Ok("Clarify offline behavior, speed expectations, or data privacy expectations."),
        "codingLanguage" => Ok("Clarify developer ergonomics, target ecosystem, or deployment priorities to refine coding language notes."),
        "proArch" => Ok("Clarify technical architecture, testing coverage, or security constraints for AGENTS.md."),
        "stitchUi" => Ok("Grill the user specifically about visual UI design (layout density, navigation pattern, color mood, typography, and component style) using any attached reference images."),
        _ => Err("Unsupported mini-grill topic.".to_string()),
    }
}

fn optional_str(payload: &Value, key: &str) -> Result<Option<String>, String> {
    match payload.get(key) {
        None | Some(Value::Null) => Ok(None),
        Some(Value::String(s)) => Ok(Some(s.clone())),
        Some(_) => Err(format!("Invalid '{}' payload.", key)),
    }
}

fn optional_features(payload: &Value) -> Result<Vec<String>, String> {
    match payload.get("features") {
        None | Some(Value::Null) => Ok(Vec::new()),
        Some(Value::Array(arr)) => {
            let mut out = Vec::with_capacity(arr.len());
            for item in arr {
                match item {
                    Value::String(s) => out.push(s.clone()),
                    _ => return Err("Invalid features payload.".to_string()),
                }
            }
            Ok(out)
        }
        Some(_) => Err("Invalid features payload.".to_string()),
    }
}

pub(crate) fn build_multimodal_parts(prompt: String, payload: &Value) -> Value {
    let mut parts = vec![json!({ "text": prompt })];
    if let Some(images) = payload.get("images").and_then(Value::as_array) {
        for img in images {
            if let Some(data_url) = img.get("dataUrl").and_then(Value::as_str)
                && let Some(rest) = data_url.strip_prefix("data:")
                && let Some((mime, b64)) = rest.split_once(";base64,")
                && mime.starts_with("image/")
                && !b64.is_empty()
            {
                parts.push(json!({
                    "inlineData": {
                        "mimeType": mime,
                        "data": b64
                    }
                }));
            }
        }
    }
    Value::Array(parts)
}

pub(crate) fn build_gemini_request_body(kind: GeminiEndpoint, payload: &Value) -> Result<Value, String> {
    let (_, thinking_level) = resolve_model_and_thinking(payload);
    let mut body: Value = (|| -> Result<Value, String> {
        match kind {
        GeminiEndpoint::Expand => {
            let core_idea = optional_str(payload, "coreIdea")?
                .filter(|s| !s.trim().is_empty())
                .ok_or_else(|| {
                    "Please enter at least a rough phrase or sentence for your app idea first."
                        .to_string()
                })?;
            let app_name = optional_str(payload, "appName")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "Untitled App".to_string());
            let target_platform = optional_str(payload, "targetPlatform")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "desktop".to_string());
            let features = optional_features(payload)?;
            let steps = if features.is_empty() {
                "None yet".to_string()
            } else {
                features.join("; ")
            };

            let prompt = format!(
                "You are PromptForge, a friendly product architect that translates rough, plain-English app thoughts into clear, jargon-free specifications.\n\n\
Current App Name: {app_name}\n\
Target Device: {target_platform}\n\
Rough Idea: {core_idea}\n\
Current Feature List: {steps}\n\n\
Expand this rough idea into:\n\
1. A crisp, memorable app name (if the current one is generic or empty, improve it; otherwise keep it).\n\
2. A 1-sentence plain-English tagline.\n\
3. A rich, well-structured 2-paragraph plain-English description of what the app does, who it helps, and how it feels to use (avoid obscure compiler/database jargon).\n\
4. 5 to 6 concrete, practical features written in everyday language."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "Always respond with valid JSON matching the requested schema. Use clear, warm, non-intimidating language suitable for both non-coders and developers."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "appName": { "type": "STRING", "description": "Polished name for the application." },
                            "tagline": { "type": "STRING", "description": "Short 1-sentence summary of the app value." },
                            "expandedIdea": { "type": "STRING", "description": "2-paragraph expanded plain-English product description." },
                            "suggestedFeatures": {
                                "type": "ARRAY",
                                "items": { "type": "STRING" },
                                "description": "5 to 6 plain-language user steps or core capabilities."
                            }
                        },
                        "required": ["appName", "tagline", "expandedIdea", "suggestedFeatures"]
                    }
                }
            }))
        }
        GeminiEndpoint::RandomIdea => {
            let category_hint = optional_str(payload, "categoryHint")?
                .map(|s| s.trim().to_string())
                .filter(|s| !s.is_empty())
                .unwrap_or_else(|| {
                    "a local-first Ubuntu creative, productivity, or developer utility".to_string()
                });

            let prompt = format!(
                "Invent an original, practical, and inspiring application idea around the theme: \"{category_hint}\".\n\
Make it concrete, distinctive, and immediately understandable by a non-technical builder.\n\
Include:\n\
- A catchy appName and 1-sentence tagline\n\
- A 2-paragraph plain-English coreIdea explaining what problem it solves and how people interact with it\n\
- targetPlatform ('desktop', 'web', 'mobile', or 'cli')\n\
- 5 specific plain-English features\n\
- 3 tailored multiple-choice clarification questions (with 3 concise options each and a default selectedAnswer)\n\
- Recommended stackSummary and architectureStyle for Pro mode."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "Generate an imaginative, realistic software application concept with zero filler jargon. Return strictly valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "appName": { "type": "STRING" },
                            "tagline": { "type": "STRING" },
                            "coreIdea": { "type": "STRING" },
                            "targetPlatform": { "type": "STRING", "description": "One of: desktop, web, mobile, cli" },
                            "features": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "groundRules": {
                                "type": "OBJECT",
                                "properties": {
                                    "offlineFirst": { "type": "BOOLEAN" },
                                    "highPerformance": { "type": "BOOLEAN" },
                                    "localPrivacy": { "type": "BOOLEAN" },
                                    "darkModeDefault": { "type": "BOOLEAN" }
                                },
                                "required": ["offlineFirst", "highPerformance", "localPrivacy", "darkModeDefault"]
                            },
                            "clarifications": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": { "type": "STRING" },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            },
                            "stackSummary": { "type": "STRING" },
                            "architectureStyle": { "type": "STRING" }
                        },
                        "required": [
                            "appName",
                            "tagline",
                            "coreIdea",
                            "targetPlatform",
                            "features",
                            "groundRules",
                            "clarifications",
                            "stackSummary",
                            "architectureStyle"
                        ]
                    }
                }
            }))
        }
        GeminiEndpoint::Grill => {
            let core_idea = optional_str(payload, "coreIdea")?
                .filter(|s| !s.trim().is_empty())
                .ok_or_else(|| {
                    "Please describe your app idea first so PromptForge knows what to ask."
                        .to_string()
                })?;
            let app_name = optional_str(payload, "appName")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "Untitled App".to_string());
            let tagline = optional_str(payload, "tagline")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_default();
            let target_platform = optional_str(payload, "targetPlatform")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "desktop".to_string());
            let coding_language = optional_str(payload, "codingLanguage")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "auto".to_string());
            let features = optional_features(payload)?.join(" | ");
            let ground_rules = match payload.get("groundRules") {
                None | Some(Value::Null) => "{}".to_string(),
                Some(v) if v.is_object() => v.to_string(),
                Some(_) => return Err("Invalid ground rules payload.".to_string()),
            };
            let clarifications = payload
                .get("clarifications")
                .map(|v| v.to_string())
                .unwrap_or_else(|| "[]".to_string());
            let pro_config = payload
                .get("proConfig")
                .map(|v| v.to_string())
                .unwrap_or_else(|| "{}".to_string());
            let stitch_ui = payload
                .get("stitchUi")
                .map(|v| v.to_string())
                .unwrap_or_else(|| "{}".to_string());

            let prompt = format!(
                "Analyze this live application specification and dynamically generate 5 fresh, sharp multiple-choice clarification questions (\"Grill Me\") tailored directly to everything the user already filled in.\n\
Strictly avoid repeating topics or questions already answered in Previous Decisions / Answers below — keep those remembered and dig into 5 NEW unaddressed product, data, error-handling, or UX decisions.\n\n\
App Name: {app_name}\n\
Tagline: {tagline}\n\
Target Device: {target_platform}\n\
Coding Language: {coding_language}\n\
Core Idea: {core_idea}\n\
Feature List: {features}\n\
Ground Rules: {ground_rules}\n\
Previous Decisions / Answers (DO NOT REPEAT THESE): {clarifications}\n\
Technical Stack & Pro Details: {pro_config}\n\
Stitch UI Details: {stitch_ui}\n\n\
Rules for the 5 questions:\n\
- Write questions in plain, everyday English (no intimidating jargon).\n\
- Reference specific features, device, or coding language choices the user already made.\n\
- Each question must have 3 distinct, practical multiple-choice options (under 14 words each).\n\
- Prefix the best option with \"(Recommended) \".\n\
- Set selectedAnswer to that recommended first option."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a Socratic product coach. Return exactly 5 fresh, non-duplicate high-value multiple-choice questions in valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "questions": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": {
                                            "type": "STRING",
                                            "description": "Short plain-English topic like User Flow, Data & Privacy, or Visual Polish"
                                        },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            }
                        },
                        "required": ["questions"]
                    }
                }
            }))
        }
        GeminiEndpoint::FillField => {
            let field = payload
                .get("field")
                .and_then(Value::as_str)
                .ok_or_else(|| "Unsupported field requested for AI fill.".to_string())?;
            let (label, instruction) = fill_field_guidance(field)?;
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();
            let current_value = payload
                .get("currentValue")
                .and_then(Value::as_str)
                .map(str::trim)
                .filter(|s| !s.is_empty());
            let variation_nonce = payload
                .get("variationNonce")
                .and_then(|v| v.as_u64().or_else(|| v.as_str().and_then(|s| s.parse().ok())))
                .unwrap_or(1);
            let current_value_hint = match current_value {
                Some(existing) => format!(
                    "\nCurrent Field Draft (user clicked Fill with AI again — refine, elevate, or offer a fresh complementary alternative instead of repeating identically):\n{existing}\nVariation Seed: {variation_nonce}\n"
                ),
                None => String::new(),
            };

            let prompt = format!(
                "You are PromptForge, helping a builder fill out one specific field using ALL other filled fields in their project.\n\n\
Target Field: {field} ({label})\n\
Task: {instruction}{current_value_hint}\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Return valid JSON with \"value\" (and \"secondaryValue\" only when Target Field is \"templateVariable\"). Avoid jargon in Simple/Balanced fields and stay completely consistent with every filled section (including coding language, feature list, ground rules, clarifications, Pro config, Stitch UI direction, local agents, and multi-agent protocol)."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a thoughtful product architect. Read all prior sections carefully and return strictly valid JSON with a smart, tailored answer for the requested field."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "value": {
                                "type": "STRING",
                                "description": "Smart context-aware value for the target field."
                            },
                            "secondaryValue": {
                                "type": "STRING",
                                "description": "Optional secondary value (used as token value when field is templateVariable)."
                            }
                        },
                        "required": ["value"]
                    }
                }
            }))
        }
        GeminiEndpoint::MiniGrill => {
            let topic = payload
                .get("topic")
                .and_then(Value::as_str)
                .ok_or_else(|| "Unsupported mini-grill topic.".to_string())?;
            let guidance = mini_grill_topic_guidance(topic)?;
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge running a focused \"Mini Grill\" specifically for the section \"{topic}\".\n\
Goal: {guidance}\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Generate 2 targeted, plain-English multiple-choice questions so the user can quickly add rich detail to this section.\n\
If visual reference images are attached, inspect them carefully and ask about their concrete layout, style, palette, or interaction details.\n\
Prefix the recommended choice with \"(Recommended) \" and set selectedAnswer to it."
            );

            let parts = build_multimodal_parts(prompt, payload);

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a concise product & UI coach. Return 2 crisp, focused multiple-choice questions in valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": parts }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "questions": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": { "type": "STRING" },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            }
                        },
                        "required": ["questions"]
                    }
                }
            }))
        }
        GeminiEndpoint::StitchSurprise => {
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge's Lead UI Designer preparing a \"Surprise Me\" visual direction for Google Stitch.\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Invent a cohesive, memorable UI direction tailored to the app idea, target platform, features, ground rules, and any uploaded inspiration images.\n\
Return:\n\
- designConceptName: A short evocative name for the visual theme.\n\
- visualDirection: A rich, plain-English UI blueprint describing layout geometry, navigation structure, color palette mood, typography personality, key component surfaces, and interactive polish.\n\
- uiClarifications: 3 sharp multiple-choice UI design questions (layout, navigation, visual density/aesthetic) with 3 options each (best prefixed with \"(Recommended) \") and selectedAnswer set to the recommended option."
            );

            let parts = build_multimodal_parts(prompt, payload);

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are an imaginative UI/UX director for Google Stitch. Return valid JSON matching the requested schema."
                    }]
                },
                "contents": [{ "role": "user", "parts": parts }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "designConceptName": { "type": "STRING" },
                            "visualDirection": { "type": "STRING" },
                            "uiClarifications": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": { "type": "STRING" },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            }
                        },
                        "required": ["designConceptName", "visualDirection", "uiClarifications"]
                    }
                }
            }))
        }
        GeminiEndpoint::RecommendLanguage => {
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge's plain-English engineering advisor helping the user choose a coding language.\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Supported codingLanguage IDs:\n\
- typescript-react (TypeScript + React: best for web apps, interactive dashboards, cross-platform UI)\n\
- rust-tauri (Rust + TypeScript / Tauri v2: best for fast, private, tiny-footprint Linux/desktop native apps)\n\
- python (Python: best for AI/ML tools, data pipelines, automation scripts, quick backends)\n\
- dart-flutter (Dart + Flutter: best for iOS + Android mobile apps from one codebase)\n\
- kotlin-android (Kotlin: best for Android-native apps)\n\
- swift-ios (Swift: best for iOS/macOS Apple-native apps)\n\
- go (Go: best for high-concurrency backend APIs, CLIs, and network services)\n\
- csharp-dotnet (C# / .NET: best for enterprise backends, Windows desktop, Unity games)\n\n\
Pick the single best recommendedId for this project, give a clear plain-English summary of why it fits, provide a jargon-free tradeoffs explanation, and return 3-4 comparisons covering what language is best for what scenario relative to this app."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "Give friendly, objective, jargon-free guidance on which coding language fits best for what type of software. Return valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "recommendedId": { "type": "STRING" },
                            "recommendedLabel": { "type": "STRING" },
                            "summary": { "type": "STRING" },
                            "tradeoffs": { "type": "STRING" },
                            "comparisons": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "language": { "type": "STRING" },
                                        "bestFor": { "type": "STRING" },
                                        "whyConsiderOrSkip": { "type": "STRING" }
                                    },
                                    "required": ["language", "bestFor", "whyConsiderOrSkip"]
                                }
                            }
                        },
                        "required": [
                            "recommendedId",
                            "recommendedLabel",
                            "summary",
                            "tradeoffs",
                            "comparisons"
                        ]
                    }
                }
            }))
        }
        }
    })()?;
    if let Some(gen_cfg) = body.get_mut("generationConfig").and_then(Value::as_object_mut) {
        gen_cfg.insert(
            "thinkingConfig".to_string(),
            json!({ "thinkingLevel": thinking_level }),
        );
    }
    Ok(body)
}



pub(crate) fn extract_gemini_json_text(response_json: &Value) -> Result<Value, String> {
    let mut text = response_json
        .pointer("/candidates/0/content/parts/0/text")
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .ok_or_else(|| {
            "Received an unexpected response from Gemini AI. Your existing text has been safely preserved."
                .to_string()
        })?;

    if text.starts_with("```json") {
        text = text.strip_prefix("```json").unwrap_or(text);
    } else if text.starts_with("```") {
        text = text.strip_prefix("```").unwrap_or(text);
    }
    if text.ends_with("```") {
        text = text.strip_suffix("```").unwrap_or(text);
    }

    text = text.trim();

    serde_json::from_str::<Value>(text).map_err(|_| {
        "Received an invalid JSON response from Gemini AI. Your existing text has been safely preserved."
            .to_string()
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_markdown_fenced_json_extraction() {
        let ok_resp = json!({
            "candidates": [{
                "content": { "parts": [{ "text": "```json\n{\"appName\":\"FocusDeck\"}\n```" }] }
            }]
        });
        assert_eq!(
            extract_gemini_json_text(&ok_resp).unwrap(),
            json!({ "appName": "FocusDeck" })
        );

        let ok_resp_bare = json!({
            "candidates": [{
                "content": { "parts": [{ "text": "{\"appName\":\"FocusDeck\"}" }] }
            }]
        });
        assert_eq!(
            extract_gemini_json_text(&ok_resp_bare).unwrap(),
            json!({ "appName": "FocusDeck" })
        );
    }

    #[test]
    fn test_client_initialization_once_lock() {
        let client = get_http_client();
        let client2 = get_http_client();
        assert!(std::ptr::eq(client, client2));
    }

    #[test]
    fn test_sanitize_error_message() {
        assert_eq!(
            sanitize_error_message("Error: x-goog-api-key is invalid"),
            "An internal authentication error occurred. Please check your API key."
        );
        assert_eq!(
            sanitize_error_message("Normal timeout error"),
            "Normal timeout error"
        );
    }
        #[test]
        fn normalizes_and_rejects_gemini_endpoints() {
            assert_eq!(normalize_gemini_endpoint("/api/gemini/expand"), Ok(GeminiEndpoint::Expand));
            assert_eq!(normalize_gemini_endpoint("random-idea"), Ok(GeminiEndpoint::RandomIdea));
            assert_eq!(normalize_gemini_endpoint("/api/gemini/grill"), Ok(GeminiEndpoint::Grill));
            assert!(normalize_gemini_endpoint("https://evil.example.com").is_err());
            assert!(normalize_gemini_endpoint("/api/health").is_err());
        }

        #[test]
        fn builds_and_validates_gemini_request_bodies() {
            assert!(build_gemini_request_body(GeminiEndpoint::Expand, &json!({})).is_err());
            let expand_body = build_gemini_request_body(
                GeminiEndpoint::Expand,
                &json!({ "coreIdea": "A calm study planner", "features": ["Track sessions"] }),
            )
            .unwrap();
            assert_eq!(
                expand_body["generationConfig"]["responseMimeType"],
                "application/json"
            );

            let random_body = build_gemini_request_body(GeminiEndpoint::RandomIdea, &json!({})).unwrap();
            assert!(random_body["generationConfig"]["responseSchema"]["required"].is_array());

            assert!(
                build_gemini_request_body(
                    GeminiEndpoint::Grill,
                    &json!({ "coreIdea": "A calm study planner", "groundRules": "not-an-object" })
                )
                .is_err()
            );
        }

        #[test]
        fn extracts_json_from_gemini_candidates_response() {
            let ok_resp = json!({
                "candidates": [{
                    "content": { "parts": [{ "text": "{\"appName\":\"FocusDeck\"}" }] }
                }]
            });
            assert_eq!(
                extract_gemini_json_text(&ok_resp).unwrap(),
                json!({ "appName": "FocusDeck" })
            );

            let bad_resp = json!({ "candidates": [] });
            assert!(extract_gemini_json_text(&bad_resp).is_err());
        }

        #[test]
        fn builds_and_validates_fill_field_requests() {
            assert_eq!(normalize_gemini_endpoint("/api/gemini/fill-field"), Ok(GeminiEndpoint::FillField));
            assert!(
                build_gemini_request_body(
                    GeminiEndpoint::FillField,
                    &json!({ "field": "unknownField", "context": {} })
                )
                .is_err()
            );
            let body = build_gemini_request_body(
                GeminiEndpoint::FillField,
                &json!({
                    "field": "tagline",
                    "context": { "appName": "PulseVault", "coreIdea": "Local vault" }
                }),
            )
            .unwrap();
            assert_eq!(body["generationConfig"]["responseMimeType"], "application/json");

            let long_idea = "a".repeat(25_000);
            assert!(
                build_gemini_request_body(
                    GeminiEndpoint::Expand,
                    &json!({ "coreIdea": long_idea, "features": ["step 1", "step 2"] })
                )
                .is_ok()
            );
            assert!(
                build_gemini_request_body(
                    GeminiEndpoint::FillField,
                    &json!({ "field": "stitchVisualDirection", "context": { "appName": "PulseVault" } })
                )
                .is_ok()
            );
        }

        #[test]
        fn builds_mini_grill_stitch_surprise_and_language_advisor_requests() {
            assert_eq!(
                normalize_gemini_endpoint("/api/gemini/mini-grill"),
                Ok(GeminiEndpoint::MiniGrill)
            );
            assert_eq!(
                normalize_gemini_endpoint("stitch-surprise"),
                Ok(GeminiEndpoint::StitchSurprise)
            );
            assert_eq!(
                normalize_gemini_endpoint("/api/gemini/recommend-language"),
                Ok(GeminiEndpoint::RecommendLanguage)
            );

            let mini = build_gemini_request_body(
                GeminiEndpoint::MiniGrill,
                &json!({
                    "topic": "stitchUi",
                    "context": { "appName": "FocusDeck" },
                    "images": [{ "dataUrl": "data:image/png;base64,iVBORw0KGgo=" }]
                }),
            )
            .unwrap();
            assert_eq!(mini["contents"][0]["parts"][1]["inlineData"]["mimeType"], "image/png");

            let surprise = build_gemini_request_body(
                GeminiEndpoint::StitchSurprise,
                &json!({
                    "context": { "appName": "FocusDeck" },
                    "images": [{ "dataUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg==" }]
                }),
            )
            .unwrap();
            assert_eq!(surprise["contents"][0]["parts"][1]["inlineData"]["mimeType"], "image/jpeg");

            let lang = build_gemini_request_body(
                GeminiEndpoint::RecommendLanguage,
                &json!({ "context": { "appName": "FocusDeck", "targetPlatform": "desktop" } }),
            )
            .unwrap();
            assert_eq!(lang["generationConfig"]["responseMimeType"], "application/json");
            assert_eq!(
                lang["generationConfig"]["thinkingConfig"]["thinkingLevel"],
                "LOW"
            );
        }

        #[test]
        fn resolves_models_thinking_levels_and_unlimited_fill_variations() {
            assert_eq!(
                resolve_model_and_thinking(&json!({ "aiModel": "gemini-3.5-flash-lite" })),
                ("gemini-3.5-flash-lite", "MINIMAL")
            );
            assert_eq!(
                resolve_model_and_thinking(&json!({ "context": { "aiModel": "gemini-3.1-pro-preview" } })),
                ("gemini-3.1-pro-preview", "LOW")
            );
            assert_eq!(
                resolve_model_and_thinking(&json!({ "aiModel": "gemini-4-argon" })),
                ("gemini-4-argon", "LOW")
            );
            assert_eq!(
                resolve_model_and_thinking(&json!({ "aiModel": "untrusted-model" })),
                ("gemini-3.8-flash", "LOW")
            );

            for field in ["stitchScreenNotes", "localAgentNotes", "multiAgentProtocol"] {
                let body = build_gemini_request_body(
                    GeminiEndpoint::FillField,
                    &json!({
                        "field": field,
                        "aiModel": "gemini-3.5-flash-lite",
                        "currentValue": "Previous draft",
                        "variationNonce": 42,
                        "context": { "appName": "PromptForge" }
                    }),
                )
                .unwrap();
                assert_eq!(
                    body["generationConfig"]["thinkingConfig"]["thinkingLevel"],
                    "MINIMAL"
                );
                let prompt_text = body["contents"][0]["parts"][0]["text"].as_str().unwrap();
                assert!(prompt_text.contains("Previous draft"));
                assert!(prompt_text.contains("Variation Seed: 42"));
            }
        }

}
````

### `src-tauri/src/lib.rs`

```rust
mod export;
mod gemini;

use std::collections::HashMap;
use keyring::Entry;
use serde_json::Value;


fn validate_service_name(service: &str) -> Result<&str, String> {
    let trimmed = service.trim();
    if trimmed.is_empty() || trimmed.contains('/') || trimmed.contains('\\') {
        return Err("Invalid keyring service name.".to_string());
    }
    Ok(trimmed)
}

fn is_valid_api_key(key: &str) -> bool {
    let trimmed = key.trim();
    !trimmed.is_empty() && trimmed != "MY_GEMINI_API_KEY" && trimmed.len() > 5
}

fn resolve_gemini_api_key() -> Result<String, String> {
    if let Ok(entry) = Entry::new("promptforge", "gemini")
        && let Ok(key) = entry.get_password()
        && is_valid_api_key(&key)
    {
        return Ok(key.trim().to_string());
    }

    if let Ok(env_key) = std::env::var("GEMINI_API_KEY")
        && is_valid_api_key(&env_key)
    {
        return Ok(env_key.trim().to_string());
    }

    Err(
        "No Gemini API key configured in your desktop keyring. Click \"Gemini Key\" in the toolbar to add your key."
            .to_string(),
    )
}

#[tauri::command]
fn save_spec_bundle(
    target_dir: String,
    files: HashMap<String, String>,
) -> Result<bool, String> {
    export::save_spec_bundle_to_dir(target_dir, files)
}

#[tauri::command]
fn get_secure_key(service: String) -> Result<String, String> {
    let service = validate_service_name(&service)?;
    let entry = Entry::new("promptforge", service)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;

    entry
        .get_password()
        .map_err(|_| format!("No key configured in keyring for service: {}", service))
}

#[tauri::command]
fn set_secure_key(service: String, key: String) -> Result<(), String> {
    let service = validate_service_name(&service)?;
    if !is_valid_api_key(&key) {
        return Err("Please enter a valid API key.".to_string());
    }

    let entry = Entry::new("promptforge", service)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;

    entry
        .set_password(key.trim())
        .map_err(|e| format!("Failed to save key: {}", e))?;

    Ok(())
}

#[tauri::command]
fn has_secure_key(service: String) -> Result<bool, String> {
    let service = validate_service_name(&service)?;
    if let Ok(entry) = Entry::new("promptforge", service)
        && let Ok(key) = entry.get_password()
        && is_valid_api_key(&key)
    {
        return Ok(true);
    }
    if service == "gemini"
        && let Ok(env_key) = std::env::var("GEMINI_API_KEY")
        && is_valid_api_key(&env_key)
    {
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
async fn gemini_proxy_request(endpoint: String, payload: Value) -> Result<Value, String> {
    let kind = gemini::normalize_gemini_endpoint(&endpoint)?;
    let api_key = resolve_gemini_api_key()?;
    let (model_id, _) = gemini::resolve_model_and_thinking(&payload);
    let model_url = format!("{}{}:generateContent", gemini::GEMINI_MODELS_BASE_URL, model_id);
    let request_body = gemini::build_gemini_request_body(kind, &payload)?;

    let client = gemini::get_http_client();

    let response = client
        .post(&model_url)
        .header("x-goog-api-key", api_key)
        .header("User-Agent", "promptforge-desktop")
        .json(&request_body)
        .send()
        .await
        .map_err(|err| {
            if err.is_timeout() {
                "Gemini request timed out after 30 seconds. Your existing project text is untouched—please try again."
                    .to_string()
            } else {
                gemini::sanitize_error_message("Could not reach Gemini AI from the desktop client. Your active form text has been preserved.")
            }
        })?;

    if !response.status().is_success() {
        let status = response.status().as_u16();
        if status == 401 || status == 403 {
            return Err(
                "Gemini rejected the stored API key. Check your key in \"Gemini Key\" settings."
                    .to_string(),
            );
        }
        return Err(
            gemini::sanitize_error_message("Gemini AI returned an error while processing your request. Your active form text has been preserved.")
        );
    }

    let response_json: Value = response.json().await.map_err(|_| {
        "Received an unreadable response from Gemini AI. Your existing text has been safely preserved."
            .to_string()
    })?;

    gemini::extract_gemini_json_text(&response_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_spec_bundle,
            get_secure_key,
            set_secure_key,
            has_secure_key,
            gemini_proxy_request
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_invalid_keyring_service_names() {
        assert!(validate_service_name("").is_err());
        assert!(validate_service_name("   ").is_err());
        assert!(validate_service_name("bad/service").is_err());
        assert_eq!(validate_service_name("gemini"), Ok("gemini"));
    }
}
```

### `src-tauri/src/main.rs`

```rust
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  app_lib::run();
}
```

### `src-tauri/tauri.conf.json`

```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "PromptForge",
  "version": "0.3.0",
  "identifier": "dev.promptforge.workstation",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:3000",
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  },
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "PromptForge Workstation",
        "width": 1440,
        "height": 900,
        "minWidth": 1024,
        "minHeight": 700,
        "backgroundColor": "#0F0C1B",
        "resizable": true,
        "fullscreen": false
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": ["deb", "appimage"],
    "linux": {
      "deb": {
        "depends": [
          "libwebkit2gtk-4.1-0",
          "libgtk-3-0",
          "libayatana-appindicator3-1",
          "libsecret-1-0",
          "librsvg2-2"
        ]
      },
      "appimage": {
        "bundleMediaFramework": true
      }
    },
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "android": {
      "debugApplicationIdSuffix": ".debug"
    }
  }
}
```

### `tests/archiveRoute.test.ts`

```ts
import { after, before, describe, it } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import { createApp } from '../server.ts';

describe('Archive Route (POST /api/export/bundle)', () => {
  let app: express.Application;
  let server: any;
  let port: number;
  const originalEnv = process.env.NODE_ENV;

  before(async () => {
    process.env.NODE_ENV = 'test';
    app = await createApp();
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        port = server.address().port;
        resolve();
      });
    });
  });

  after(async () => {
    if (originalEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv;
    if (server) {
      await new Promise<void>((resolve, reject) =>
        server.close((err: unknown) => (err ? reject(err) : resolve()))
      );
    }
  });

  const fetchBundle = async (body: unknown) => {
    return fetch(`http://127.0.0.1:${port}/api/export/bundle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  it('rejects invalid, missing, or array files payloads', async () => {
    for (const payload of [{}, { files: [] }]) {
      const res = await fetchBundle(payload);
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'Missing or invalid "files" object.');
    }
  });

  it('rejects files outside allowlist', async () => {
    const res = await fetchBundle({ files: { 'evil.sh': 'echo pwned' } });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Invalid file name/);
  });

  it('rejects path traversal attempts', async () => {
    const res = await fetchBundle({ files: { '../plan.md': 'content' } });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Invalid file name/);
  });

  it('handles non-string appName safely without throwing', async () => {
    const res = await fetchBundle({
      appName: 12345,
      files: { 'spec.md': '# Spec' },
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(
      res.headers.get('content-disposition'),
      'attachment; filename="project-spec-bundle.zip"'
    );
  });

  it('creates valid ZIP bundle with allowed files and SHA256SUMS.txt', async () => {
    const res = await fetchBundle({
      appName: 'Test App!',
      files: {
        'plan.md': 'My plan',
        'spec.md': 'My spec',
        'COLLABORATION.md': 'My multi-agent board',
        '.continuerules': 'My local agent rules',
      },
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/zip');
    assert.strictEqual(
      res.headers.get('content-disposition'),
      'attachment; filename="test-app--spec-bundle.zip"'
    );

    const buffer = Buffer.from(await res.arrayBuffer());
    assert.strictEqual(buffer.readUInt32LE(0), 0x04034b50);

    const zipStr = buffer.toString('utf-8');
    assert.ok(zipStr.includes('plan.md'));
    assert.ok(zipStr.includes('spec.md'));
    assert.ok(zipStr.includes('SHA256SUMS.txt'));
    assert.ok(zipStr.includes('My plan'));
    assert.ok(zipStr.includes('My spec'));
  });
});
```

### `tests/compiler.test.ts`

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  compileSpecMd,
  compilePlanMd,
  compileTasksMd,
  compileAgentsMd,
  compilePlatformContract,
} from '../src/services/compiler.ts';
import { ProjectState } from '../src/types/project.ts';

const mockState: ProjectState = {
  id: 'test-1',
  appName: 'TestApp',
  tagline: 'A cool test app',
  coreIdea: 'Testing compiler functions',
  targetPlatform: 'desktop',
  features: ['Feature 1', 'Feature 2'],
  groundRules: {
    offlineFirst: true,
    highPerformance: true,
    localPrivacy: true,
    darkModeDefault: true,
  },
  clarifications: [
    {
      id: 'cl-1',
      category: 'Test Category',
      question: 'Test Question?',
      options: ['Option 1', 'Option 2'],
      selectedAnswer: 'Option 1',
    }
  ],
  proConfig: {
    stackSummary: 'Test Stack',
    architectureStyle: 'Test Architecture',
    testingStrategy: 'Test Testing',
    securityBoundary: 'Test Security',
    taskSlicingMode: 'hitl-first',
    customRules: ['Custom Rule 1', 'Custom Rule 2'],
    templateVariables: {
      accent_color: '#FF0000',
      primary_model: 'test-model',
      target_os: 'test-os',
      export_dir: 'test-dir'
    },
  },
  lastUpdated: new Date().toISOString(),
};

test('compiler test suite', async (t) => {
  await t.test('compileAgentsMd outputs all 10 required sections and interpolates variables', () => {
    const agentsMd = compileAgentsMd(mockState);
    assert.match(agentsMd, /## 1. Product/);
    assert.match(agentsMd, /## 2. Stack/);
    assert.match(agentsMd, /## 3. Repository Structure/);
    assert.match(agentsMd, /## 4. Commands/);
    assert.match(agentsMd, /## 5. Architecture/);
    assert.match(agentsMd, /## 6. Coding Conventions/);
    assert.match(agentsMd, /## 7. Testing/);
    assert.match(agentsMd, /## 8. Security/);
    assert.match(agentsMd, /## 9. Workflow & Clarification Decisions/);
    assert.match(agentsMd, /## 10. Generated Files/);
    assert.match(agentsMd, /Custom Rule 1/);
    assert.match(agentsMd, /#FF0000/);
  });

  await t.test('compileSpecMd generates EARS-formatted requirements and ground rules', () => {
    const specMd = compileSpecMd(mockState);
    assert.match(specMd, /When the user interacts with the workspace to feature 1, the system shall/);
    assert.match(specMd, /When the user interacts with the workspace to feature 2, the system shall/);
    assert.match(specMd, /offline resilience/i);
    assert.match(specMd, /latency budget/i);
    assert.match(specMd, /local security boundary/i);
    assert.match(specMd, /graceful recovery/i);
    assert.match(specMd, /Option 1/);
  });

  await t.test('compileTasksMd respects taskSlicingMode', () => {
    const tasksMdHitl = compileTasksMd(mockState);
    assert.match(tasksMdHitl, /\(HITL\)/);

    const stateAfk = { ...mockState, proConfig: { ...mockState.proConfig, taskSlicingMode: 'afk-autonomous' as const } };
    const tasksMdAfk = compileTasksMd(stateAfk);
    assert.match(tasksMdAfk, /\(AFK\)/);
  });

  await t.test('compilePlatformContract returns non-empty contracts for all platforms', () => {
    const platforms = ['stitch', 'aistudio', 'antigravity', 'copilot', 'canvas', 'local-ollama'] as const;
    platforms.forEach(platform => {
      const contract = compilePlatformContract(mockState, platform);
      assert.ok(contract.title.length > 0);
      assert.ok(contract.subtitle.length > 0);
      assert.ok(contract.badge.length > 0);
      assert.ok(contract.promptText.length > 0);
    });
  });

  await t.test('Edge cases: empty features, clarifications, and undefined template variables do not throw', () => {
    const emptyState = { ...mockState, features: [], clarifications: [], proConfig: { ...mockState.proConfig, templateVariables: {} } };
    assert.doesNotThrow(() => compileSpecMd(emptyState));
    assert.doesNotThrow(() => compilePlanMd(emptyState));
    assert.doesNotThrow(() => compileAgentsMd(emptyState));
    assert.doesNotThrow(() => compilePlatformContract(emptyState, 'stitch'));
  });

  await t.test('compileSpecMd normalizes feature line breaks to prevent list splitting', () => {
    const multilineState = { ...mockState, features: ['Export report\n- Delete records'] };
    const specMd = compileSpecMd(multilineState);
    assert.match(specMd, /1\. Export report - Delete records/);
    assert.doesNotMatch(specMd, /\n- Delete records/);
  });

  await t.test('compiler injects codingLanguage, Stitch UI screens, extended plan.md, local agents, and COLLABORATION.md', async () => {
    const {
      recommendBuildWorkflow,
      compileCollaborationMd,
      compileContinueRules,
      compileStitchScreenPrompt,
    } = await import('../src/services/compiler.ts');
    const richState: ProjectState = {
      ...mockState,
      targetPlatform: 'web',
      codingLanguage: 'typescript-react',
      codingLanguageNote: 'Prefer Radix primitives and Tailwind utilities',
      stitchUi: {
        visualDirection: 'Editorial dark dashboard with floating glass rails',
        uiClarifications: [
          {
            id: 'ui-1',
            category: 'Density',
            question: 'How dense?',
            options: ['Balanced whitespace'],
            selectedAnswer: 'Balanced whitespace',
          },
        ],
        ideaImages: [],
        screens: [
          {
            id: 'scr-1',
            name: 'Command Menu Drawer',
            kind: 'menu',
            notes: 'Slide-out command launcher with recent actions',
          },
        ],
        uploadedResultName: 'stitch-export.html',
        uploadedResultContent: '<main><h1>Dashboard</h1></main>',
        uploadedResultNotes: 'Wire state filters to sidebar',
      },
      localAgents: {
        enabled: true,
        provider: 'both',
        ollamaModel: 'qwen2.5-coder:14b',
        ollamaEndpoint: 'http://localhost:11434',
        notes: 'Keep changes tightly scoped.',
      },
      multiAgent: {
        enabled: true,
        sharedProtocolNotes: 'Never edit files owned by another lane.',
        lanes: [
          {
            id: 'lane-ui',
            agentName: 'UI Agent',
            focusArea: 'Decks & CSS',
            status: 'in-progress',
            workOnPaths: 'src/decks/',
            stayAwayPaths: 'src-tauri/',
            handoffNote: 'Ping backend lane on new fields',
          },
        ],
      },
    };

    const agentsMd = compileAgentsMd(richState);
    assert.match(agentsMd, /TypeScript \+ React/);
    assert.match(agentsMd, /Prefer Radix primitives/);

    const planMd = compilePlanMd(richState);
    assert.match(planMd, /## 1\. System Architecture & Data Flow/);
    assert.match(planMd, /## 3\. UI Surfaces & Multi-Screen Hierarchy/);
    assert.match(planMd, /## 7\. Security Boundaries, Phased Milestones & Verification Matrix/);
    assert.match(planMd, /### 8\. Optional Local AI Workflow/);
    assert.match(planMd, /### 9\. Multi-Agent Coordination Boundaries/);
    assert.match(planMd, /Command Menu Drawer/);

    const stitchContract = compilePlatformContract(richState, 'stitch');
    assert.match(stitchContract.promptText, /Editorial dark dashboard/);
    assert.match(stitchContract.promptText, /Balanced whitespace/);
    assert.match(stitchContract.promptText, /Command Menu Drawer/);

    const singleScreenPrompt = compileStitchScreenPrompt(
      richState,
      richState.stitchUi!.screens![0]
    );
    assert.match(singleScreenPrompt, /Command Menu Drawer/);
    assert.match(singleScreenPrompt, /Slide-out command launcher/);

    const collabMd = compileCollaborationMd(richState);
    assert.match(collabMd, /UI Agent/);
    assert.match(collabMd, /src\/decks\//);
    assert.match(collabMd, /src-tauri\//);

    const continueRules = compileContinueRules(richState);
    assert.match(continueRules, /qwen2\.5-coder:14b/);
    assert.match(continueRules, /Keep changes tightly scoped\./);

    const webWorkflow = recommendBuildWorkflow(richState);
    assert.equal(webWorkflow.nextAppId, 'aistudio');
    assert.match(webWorkflow.nextPrompt, /stitch-export\.html/);
    assert.match(webWorkflow.nextPrompt, /Dashboard/);

    const rustWorkflow = recommendBuildWorkflow({
      ...richState,
      targetPlatform: 'desktop',
      codingLanguage: 'rust-tauri',
    });
    assert.equal(rustWorkflow.nextAppId, 'antigravity');
  });
});
```

### `tests/geminiClient.test.ts`

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  expandProjectIdea,
  generateGrillQuestions,
  generateRandomAppIdea,
} from '../src/services/geminiClient.ts';
import {
  canonicalizeLinuxPath,
  isTauriEnvironment,
  pickUbuntuDirectory,
} from '../src/services/tauriBridge.ts';
import { DEFAULT_PROJECT_STATE } from '../src/services/presets.ts';

test('tauriBridge canonicalizeLinuxPath rejects traversal and normalizes slashes', async () => {
  assert.equal(canonicalizeLinuxPath('').valid, false);
  assert.equal(canonicalizeLinuxPath('~/Projects/../secret').valid, false);
  assert.equal(canonicalizeLinuxPath('..\\escape').valid, false);

  const ok = canonicalizeLinuxPath('~/Projects//demo-app/');
  assert.equal(ok.valid, true);
  assert.equal(ok.canonicalPath, '/home/ubuntu/Projects/demo-app');

  const customHome = canonicalizeLinuxPath('~/Projects/specs', '/home/sinnoh/');
  assert.equal(customHome.valid, true);
  assert.equal(customHome.canonicalPath, '/home/sinnoh/Projects/specs');

  assert.equal(await pickUbuntuDirectory(), null);
});

test('geminiClient routes through Express fetch in browser mode and Tauri IPC in native mode', async () => {
  const originalWindow = (globalThis as any).window;
  const originalFetch = globalThis.fetch;

  try {
    // 1. Web preview mode (no __TAURI_INTERNALS__)
    delete (globalThis as any).window;
    assert.equal(isTauriEnvironment(), false);

    const fetchedUrls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetchedUrls.push(String(input));
      return new Response(
        JSON.stringify({
          appName: 'WebApp',
          tagline: 'Tag',
          expandedIdea: 'Expanded',
          suggestedFeatures: ['Step 1'],
        }),
        { status: 200 }
      );
    }) as typeof fetch;

    const webResp = await expandProjectIdea({
      appName: 'Demo',
      coreIdea: 'A quick idea',
      targetPlatform: 'desktop',
      features: [],
    });
    assert.equal(webResp.appName, 'WebApp');
    assert.deepEqual(fetchedUrls, ['/api/gemini/expand']);

    // 2. Native Tauri desktop mode (__TAURI_INTERNALS__ present)
    const invokedCalls: Array<{ cmd: string; args: unknown }> = [];
    (globalThis as any).window = {
      __TAURI_INTERNALS__: {
        invoke: async (cmd: string, args: unknown) => {
          invokedCalls.push({ cmd, args });
          if ((args as any)?.endpoint === '/api/gemini/grill') {
            return { questions: [] };
          }
          return {
            appName: 'NativeApp',
            tagline: 'Desktop Tag',
            coreIdea: 'Native Idea',
            targetPlatform: 'desktop',
            features: ['Step A'],
            groundRules: DEFAULT_PROJECT_STATE.groundRules,
            clarifications: [],
            stackSummary: 'Tauri v2',
            architectureStyle: 'IPC',
          };
        },
      },
    };
    assert.equal(isTauriEnvironment(), true);

    const nativeRandom = await generateRandomAppIdea('productivity');
    assert.equal(nativeRandom.appName, 'NativeApp');

    const nativeGrill = await generateGrillQuestions(DEFAULT_PROJECT_STATE);
    assert.deepEqual(nativeGrill, { questions: [] });

    const {
      fillFieldWithAi,
      generateMiniGrillQuestions,
      generateStitchSurprise,
      recommendCodingLanguage,
    } = await import('../src/services/geminiClient.ts');
    await fillFieldWithAi('tagline', { ...DEFAULT_PROJECT_STATE, aiModel: 'gemini-4-argon' }, {
      currentValue: 'Draft tagline',
      variationNonce: 777,
    });
    await generateMiniGrillQuestions('stitchUi', DEFAULT_PROJECT_STATE);
    await generateStitchSurprise(DEFAULT_PROJECT_STATE);
    await recommendCodingLanguage(DEFAULT_PROJECT_STATE);

    assert.equal(invokedCalls.length, 6);
    assert.equal(invokedCalls[0].cmd, 'gemini_proxy_request');
    assert.equal((invokedCalls[0].args as any).endpoint, '/api/gemini/random-idea');
    assert.equal(invokedCalls[1].cmd, 'gemini_proxy_request');
    assert.equal((invokedCalls[1].args as any).endpoint, '/api/gemini/grill');
    assert.equal(invokedCalls[2].cmd, 'gemini_proxy_request');
    assert.equal((invokedCalls[2].args as any).endpoint, '/api/gemini/fill-field');
    assert.equal((invokedCalls[2].args as any).payload.field, 'tagline');
    assert.equal((invokedCalls[2].args as any).payload.aiModel, 'gemini-4-argon');
    assert.equal((invokedCalls[2].args as any).payload.currentValue, 'Draft tagline');
    assert.equal((invokedCalls[2].args as any).payload.variationNonce, 777);
    assert.equal((invokedCalls[2].args as any).payload.context.appName, DEFAULT_PROJECT_STATE.appName);
    assert.equal(
      (invokedCalls[2].args as any).payload.context.codingLanguage,
      DEFAULT_PROJECT_STATE.codingLanguage ?? 'auto'
    );
    assert.equal((invokedCalls[3].args as any).endpoint, '/api/gemini/mini-grill');
    assert.equal((invokedCalls[3].args as any).payload.topic, 'stitchUi');
    assert.equal((invokedCalls[4].args as any).endpoint, '/api/gemini/stitch-surprise');
    assert.equal((invokedCalls[5].args as any).endpoint, '/api/gemini/recommend-language');
  } finally {
    if (originalWindow === undefined) {
      delete (globalThis as any).window;
    } else {
      (globalThis as any).window = originalWindow;
    }
    globalThis.fetch = originalFetch;
  }
});
```

### `tests/presets.test.ts`

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PROJECT_STATE,
  STARTER_TEMPLATES,
  FALLBACK_RANDOM_IDEAS,
} from '../src/services/presets.ts';
import { TOOLTIP_DICTIONARY } from '../src/services/tooltips.ts';

test('presets test suite', async (t) => {
  await t.test('TOOLTIP_DICTIONARY coverage', () => {
    Object.keys(TOOLTIP_DICTIONARY).forEach((key) => {
      const entry = TOOLTIP_DICTIONARY[key];
      assert.ok(entry.title.trim().length > 0, `Tooltip ${key} must have a non-empty title`);
      assert.ok(entry.description.trim().length > 0, `Tooltip ${key} must have a non-empty description`);
      assert.ok(entry.aiUsage.trim().length > 0, `Tooltip ${key} must have a non-empty aiUsage`);
    });
  });

  await t.test('DEFAULT_PROJECT_STATE coverage', () => {
    assert.ok(DEFAULT_PROJECT_STATE.appName.length > 0);
    assert.ok(DEFAULT_PROJECT_STATE.features.length > 0);
  });

  await t.test('STARTER_TEMPLATES coverage', () => {
    assert.ok(STARTER_TEMPLATES.length > 0);
    STARTER_TEMPLATES.forEach(template => {
      assert.ok(template.name.length > 0);
      assert.ok(template.state.appName.length > 0);
    });
  });

  await t.test('FALLBACK_RANDOM_IDEAS coverage', () => {
    assert.ok(FALLBACK_RANDOM_IDEAS.length > 0);
    FALLBACK_RANDOM_IDEAS.forEach(idea => {
      assert.ok(idea.appName.length > 0);
      assert.ok(idea.coreIdea.length > 0);
    });
  });

  await t.test('CODING_LANGUAGES and recent 3 blueprints helpers', async () => {
    const {
      CODING_LANGUAGES,
      MAX_RECENT_BLUEPRINTS,
      createInitialRecentBlueprints,
      upsertRecentBlueprint,
    } = await import('../src/services/presets.ts');

    assert.equal(MAX_RECENT_BLUEPRINTS, 3);
    assert.ok(CODING_LANGUAGES.length >= 8);
    CODING_LANGUAGES.forEach((lang) => {
      assert.ok(lang.bestFor.length > 0);
      assert.ok(lang.tradeoffs.length > 0);
    });

    const initial = createInitialRecentBlueprints();
    assert.equal(initial.length, 3);

    const customProject = {
      ...DEFAULT_PROJECT_STATE,
      id: 'custom-recent-99',
      appName: 'BrandNewStudio',
      lastUpdated: new Date().toISOString(),
    };
    const updated = upsertRecentBlueprint(initial, customProject);
    assert.equal(updated.length, 3);
    assert.equal(updated[0].id, 'custom-recent-99');
    assert.equal(updated[0].name, 'BrandNewStudio');
  });

  await t.test('AI_MODELS, OLLAMA_MODEL_PRESETS, and local/multi-agent defaults', async () => {
    const {
      AI_MODELS,
      OLLAMA_MODEL_PRESETS,
      DEFAULT_LOCAL_AGENTS,
      DEFAULT_MULTI_AGENT,
    } = await import('../src/services/presets.ts');

    const ids = AI_MODELS.map((m) => m.id);
    assert.ok(ids.includes('gemini-3.5-flash-lite'));
    assert.ok(ids.includes('gemini-3.8-flash'));
    assert.ok(ids.includes('gemini-3.1-pro-preview'));
    assert.ok(ids.includes('gemini-4-argon'));
    assert.ok(OLLAMA_MODEL_PRESETS.length >= 4);
    assert.equal(DEFAULT_LOCAL_AGENTS.enabled, false);
    assert.equal(DEFAULT_MULTI_AGENT.enabled, false);
    assert.ok(DEFAULT_MULTI_AGENT.lanes.length >= 2);
  });
});
```

### `tests/serverSecurity.test.ts`

```ts
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import request from 'supertest';
import { createApp } from '../server.js';

describe('Server Security Middleware', () => {
  let app: express.Express;
  const originalEnv = {
    nodeEnv: process.env.NODE_ENV,
    geminiKey: process.env.GEMINI_API_KEY,
  };

  before(async () => {
    process.env.NODE_ENV = 'production';
    process.env.GEMINI_API_KEY = 'test-key-12345';
    app = await createApp();
  });

  after(() => {
    if (originalEnv.geminiKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalEnv.geminiKey;
    if (originalEnv.nodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv.nodeEnv;
  });

  test('security headers are present on /api/ routes', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['x-frame-options'], 'DENY');
    assert.strictEqual(res.headers['referrer-policy'], 'no-referrer');
    assert.strictEqual(res.headers['cross-origin-resource-policy'], 'same-origin');
  });

  test('localOriginGuard rejects cross-origin and spoofed localhost POSTs on /api/ in production', async () => {
    for (const badOrigin of [
      'https://malicious.example.com',
      'http://localhost.evil.com',
      'http://127.0.0.1.evil.com',
      'http://localhost@evil.com',
      'not-a-valid-origin',
    ]) {
      const res = await request(app)
        .post('/api/gemini/expand')
        .set('Origin', badOrigin)
        .send({});

      assert.strictEqual(res.status, 403, `Expected 403 for origin: ${badOrigin}`);
      assert.strictEqual(res.body.error, 'Cross-origin requests are not allowed.');
    }
  });

  test('localOriginGuard allows requests with no Origin to reach real handler', async () => {
    const res = await request(app).post('/api/gemini/expand').send({});
    assert.strictEqual(res.status, 400);
  });

  test('localOriginGuard allows exact local Origins and Tauri origin to reach real handler', async () => {
    for (const allowedOrigin of [
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'tauri://localhost',
    ]) {
      const res = await request(app)
        .post('/api/gemini/expand')
        .set('Origin', allowedOrigin)
        .send({});

      assert.strictEqual(res.status, 400, `Expected handler 400 for origin: ${allowedOrigin}`);
    }
  });

  test('rate limiter blocks after exceeding max requests', async () => {
    const testApp = express();
    testApp.use(express.json());

    const { createRateLimiter } = await import('../server/security.js');

    const limiter = createRateLimiter({
      windowMs: 1000,
      maxRequests: 2,
      skip: () => false,
    });

    testApp.use('/api', limiter);
    testApp.get('/api/test', (_req, res) => {
      res.json({ ok: true });
    });

    let res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 200);

    res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 200);

    res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 429);
    assert.strictEqual(
      res.body.error,
      'Too many AI requests. Please wait a moment and try again.'
    );
  });
});
```

### `tests/specValidateRoute.test.ts`

```ts
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { createApp } from '../server.ts';
import { ProjectState } from '../src/types/project.js';

test('specValidateRoute: validates project state and identifies missing elements', async () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'test';
  const app = await createApp();
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;

  const validProject: ProjectState = {
    id: 'test-123',
    appName: 'Valid App',
    tagline: 'A cool app',
    coreIdea: 'This is a core idea.',
    targetPlatform: 'desktop',
    features: ['Feature 1', 'Feature 2'],
    groundRules: { offlineFirst: true, highPerformance: true, localPrivacy: true, darkModeDefault: true },
    clarifications: [],
    proConfig: {
      stackSummary: 'React',
      architectureStyle: 'MVC',
      testingStrategy: 'TDD',
      securityBoundary: 'Local',
      taskSlicingMode: 'hitl-first',
      customRules: [],
      templateVariables: {
        accent_color: '#8B5CF6',
        primary_model: 'gemini-3.8-flash',
        target_os: 'Ubuntu 24.04 LTS',
        export_dir: '~/Projects/valid-app',
      },
    },
    workflowProgress: {
      stitchDone: true,
      builderDone: false,
      polishDone: false
    },
    lastUpdated: new Date().toISOString()
  };

  try {
    // Test 1: Complete valid payload
    const res1 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validProject)
    });
    assert.equal(res1.status, 200);
    const data1 = await res1.json();
    assert.equal(data1.valid, true);
    assert.equal(data1.warnings.length, 0);
    assert.equal(data1.score, 100);

    // Test 2: Missing appName/coreIdea
    const missingCoreProject = { ...validProject, appName: '', coreIdea: '' };
    const res2 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingCoreProject)
    });
    assert.equal(res2.status, 200);
    const data2 = await res2.json();
    assert.equal(data2.valid, false); // should be false if coreIdea or appName missing
    assert.ok(data2.warnings.some((w: any) => w.code === 'MISSING_APP_NAME'));
    assert.ok(data2.warnings.some((w: any) => w.code === 'MISSING_CORE_IDEA'));

    // Test 3: Empty features
    const emptyFeaturesProject = { ...validProject, features: [] };
    const res3 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emptyFeaturesProject)
    });
    const data3 = await res3.json();
    assert.equal(data3.valid, true); // Still valid if score > 50 and core elements exist
    assert.ok(data3.warnings.some((w: any) => w.code === 'EMPTY_FEATURES'));

    // Test 4: Unresolved tokens
    const tokensProject = {
      ...validProject,
      coreIdea: 'My app is {{app_type}} with {{missing}}',
      proConfig: {
        ...validProject.proConfig,
        templateVariables: {
          ...validProject.proConfig.templateVariables,
          app_type: 'app_type',
          missing: 'missing',
        }
      }
    };
    const res4 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokensProject)
    });
    const data4 = await res4.json();
    assert.ok(data4.warnings.some((w: any) => w.code === 'UNRESOLVED_TOKENS'));

    // Test 5: Missing visual direction when stitchDone is false
    const missingStitchProject = { ...validProject, workflowProgress: { stitchDone: false, builderDone: false, polishDone: false } };
    const res5 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingStitchProject)
    });
    const data5 = await res5.json();
    assert.ok(data5.warnings.some((w: any) => w.code === 'MISSING_STITCH_UI'));

    // Test 6: Malformed payload
    const res6 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.equal(res6.status, 400);
  } finally {
    if (originalEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv;
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve()))
    );
  }
});
```

## Frontend Types, Entry & Core App

### `src/App.tsx`

```tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  FileCode2,
  FileText,
  FolderKanban,
  HardDrive,
  KeyRound,
  Loader2,
  RotateCcw,
  Terminal,
  Wand2,
  X,
} from 'lucide-react';
import {
  AiModelId,
  ClarificationItem,
  ComplexityMode,
  ExportPlatformId,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  RecentBlueprintItem,
  SpecFileId,
} from './types/project';
import {
  AI_MODELS,
  createInitialRecentBlueprints,
  DEFAULT_LOCAL_AGENTS,
  DEFAULT_MULTI_AGENT,
  DEFAULT_PROJECT_STATE,
  DEFAULT_STITCH_UI,
  FALLBACK_RANDOM_IDEAS,
  MAX_RECENT_BLUEPRINTS,
  upsertRecentBlueprint,
} from './services/presets';
import {
  compilePlatformContract,
  compileSpecFile,
} from './services/compiler';
import {
  expandProjectIdea,
  FillFieldResponse,
  fillFieldWithAi,
  generateGrillQuestions,
  generateMiniGrillQuestions,
  generateRandomAppIdea,
  generateStitchSurprise,
  LanguageAdvisorResponse,
  recommendCodingLanguage,
} from './services/geminiClient';
import { hasSecureKey, isTauriEnvironment } from './services/tauriBridge';
import { ModeSwitcher } from './components/ModeSwitcher';
import { ExplainerTooltip, HelpBadge } from './components/Tooltip';
import { CodeViewer } from './components/CodeViewer';
import { SaveModal } from './components/SaveModal';
import { KeyringModal } from './components/KeyringModal';
import { ManifestDeck } from './decks/ManifestDeck';
import { ArchitectureDeck } from './decks/ArchitectureDeck';
import { GrillDeck } from './decks/GrillDeck';
import { TasksDeck } from './decks/TasksDeck';
import { WorkflowDeck } from './decks/WorkflowDeck';
import { ExporterDeck } from './decks/ExporterDeck';

const STORAGE_KEY = 'promptforge_workstation_state_v1';
const MODE_STORAGE_KEY = 'promptforge_complexity_mode_v1';
const RECENT_BLUEPRINTS_KEY = 'promptforge_recent_blueprints_v1';

function mergeClarifications(
  existing: ClarificationItem[],
  incoming: ClarificationItem[]
): ClarificationItem[] {
  const result = [...existing];
  const seenQuestions = new Set(
    existing.map((q) => q.question.trim().toLowerCase())
  );
  const seenIds = new Set(existing.map((q) => q.id));

  for (const item of incoming) {
    const normalizedQ = item.question.trim().toLowerCase();
    if (!normalizedQ || seenQuestions.has(normalizedQ)) {
      continue;
    }
    const uniqueId = seenIds.has(item.id)
      ? `${item.id}-${result.length + 1}`
      : item.id;
    seenQuestions.add(normalizedQ);
    seenIds.add(uniqueId);
    result.push({
      ...item,
      id: uniqueId,
      selectedAnswer: item.selectedAnswer || item.options[0] || '',
    });
  }
  return result;
}

function getSecureRandomIndex(length: number): number {
  if (length <= 1) return 0;
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Date.now() % length;
}

function normalizeProjectState(raw: Partial<ProjectState> | null | undefined): ProjectState {
  if (!raw || typeof raw.appName !== 'string') {
    return DEFAULT_PROJECT_STATE;
  }
  return {
    ...DEFAULT_PROJECT_STATE,
    ...raw,
    aiModel: raw.aiModel ?? DEFAULT_PROJECT_STATE.aiModel ?? 'gemini-3.8-flash',
    codingLanguage: raw.codingLanguage ?? DEFAULT_PROJECT_STATE.codingLanguage,
    codingLanguageNote: raw.codingLanguageNote ?? '',
    groundRules: {
      ...DEFAULT_PROJECT_STATE.groundRules,
      ...(raw.groundRules ?? {}),
    },
    proConfig: {
      ...DEFAULT_PROJECT_STATE.proConfig,
      ...(raw.proConfig ?? {}),
    },
    stitchUi: {
      ...DEFAULT_STITCH_UI,
      ...(raw.stitchUi ?? {}),
      ideaImages: Array.isArray(raw.stitchUi?.ideaImages) ? raw.stitchUi.ideaImages : [],
      uiClarifications: Array.isArray(raw.stitchUi?.uiClarifications)
        ? raw.stitchUi.uiClarifications
        : [],
      screens: Array.isArray(raw.stitchUi?.screens) ? raw.stitchUi.screens : [],
    },
    localAgents: {
      ...DEFAULT_LOCAL_AGENTS,
      ...(raw.localAgents ?? {}),
    },
    multiAgent: {
      ...DEFAULT_MULTI_AGENT,
      ...(raw.multiAgent ?? {}),
      lanes: Array.isArray(raw.multiAgent?.lanes)
        ? raw.multiAgent.lanes
        : DEFAULT_MULTI_AGENT.lanes,
    },
    workflowProgress: {
      stitchDone:
        raw.workflowProgress?.stitchDone ??
        DEFAULT_PROJECT_STATE.workflowProgress?.stitchDone ??
        false,
      builderDone:
        raw.workflowProgress?.builderDone ??
        DEFAULT_PROJECT_STATE.workflowProgress?.builderDone ??
        false,
      polishDone:
        raw.workflowProgress?.polishDone ??
        DEFAULT_PROJECT_STATE.workflowProgress?.polishDone ??
        false,
    },
  };
}

const SPEC_FILES: Array<{ id: SpecFileId; label: string; desc: string }> = [
  {
    id: 'AGENTS.md',
    label: 'AGENTS.md',
    desc: '10-section persistent AI coding instructions & repository rules',
  },
  {
    id: 'spec.md',
    label: 'spec.md',
    desc: 'Product objective, target users & EARS behavioral requirements',
  },
  {
    id: 'plan.md',
    label: 'plan.md',
    desc: 'Comprehensive architecture, domain models, IPC contracts & test matrix',
  },
  {
    id: 'tasks.md',
    label: 'tasks.md',
    desc: 'Ordered HITL/AFK implementation tasks & verification steps',
  },
  {
    id: 'COLLABORATION.md',
    label: 'COLLABORATION.md',
    desc: 'Multi-agent coordination board with Work-On vs. Stay-Away path lanes',
  },
  {
    id: '.continuerules',
    label: '.continuerules',
    desc: 'Optional offline local AI instructions for Ollama & Continue IDE',
  },
  {
    id: 'src-tauri/src/lib.rs',
    label: 'lib.rs',
    desc: 'Compiled Rust Tauri v2 command handlers with canonical path guard',
  },
];

const PLATFORM_TABS: Array<{ id: ExportPlatformId; label: string }> = [
  { id: 'stitch', label: 'Stitch' },
  { id: 'aistudio', label: 'AI Studio' },
  { id: 'antigravity', label: 'Antigravity' },
  { id: 'canvas', label: 'Canvas' },
  { id: 'local-ollama', label: 'Local AI' },
  { id: 'copilot', label: 'Copilot' },
];

export function App() {
  const [mode, setMode] = useState<ComplexityMode>(() => {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY);
      if (saved === 'simple' || saved === 'balanced' || saved === 'pro') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'balanced';
  });

  const [projectState, setProjectState] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return normalizeProjectState(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROJECT_STATE;
  });

  const [recentBlueprints, setRecentBlueprints] = useState<RecentBlueprintItem[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_BLUEPRINTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .slice(0, MAX_RECENT_BLUEPRINTS)
            .map((item: RecentBlueprintItem) => ({
              ...item,
              state: normalizeProjectState(item.state),
            }));
        }
      }
    } catch {
      // ignore storage errors
    }
    return createInitialRecentBlueprints();
  });

  const [previousSnapshot, setPreviousSnapshot] = useState<ProjectState | null>(null);
  const [inspectorMode, setInspectorMode] = useState<'files' | 'platforms'>('files');
  const [activeSpecFile, setActiveSpecFile] = useState<SpecFileId>('AGENTS.md');
  const [activePlatform, setActivePlatform] = useState<ExportPlatformId>('stitch');
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [keyringModalOpen, setKeyringModalOpen] = useState(false);
  const [hasDesktopKey, setHasDesktopKey] = useState(false);
  const isNativeDesktop = isTauriEnvironment();

  useEffect(() => {
    if (!isNativeDesktop) return;
    hasSecureKey('gemini')
      .then(setHasDesktopKey)
      .catch(() => setHasDesktopKey(false));
  }, [isNativeDesktop]);

  // AI Loading & Toast States
  const [isExpanding, setIsExpanding] = useState(false);
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [isGrilling, setIsGrilling] = useState(false);
  const [isAutoRefreshingGrill, setIsAutoRefreshingGrill] = useState(false);
  const [lastGrillSyncedAt, setLastGrillSyncedAt] = useState<string | null>(null);
  const [fillingField, setFillingField] = useState<FillableFieldId | null>(null);
  const [miniGrillLoadingTopic, setMiniGrillLoadingTopic] =
    useState<MiniGrillTopic | null>(null);
  const [miniGrillQuestions, setMiniGrillQuestions] = useState<
    Partial<Record<MiniGrillTopic, ClarificationItem[]>>
  >({});
  const [isGeneratingSurprise, setIsGeneratingSurprise] = useState(false);
  const [isRecommendingLanguage, setIsRecommendingLanguage] = useState(false);
  const [languageAdvice, setLanguageAdvice] = useState<LanguageAdvisorResponse | null>(null);
  const [bannerMessage, setBannerMessage] = useState<{
    type: 'success' | 'warning';
    text: string;
  } | null>(null);

  // Persist project state & maintain most recent 3 blueprints
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectState));
    } catch {
      // ignore quota errors
    }
    setRecentBlueprints((prev) => upsertRecentBlueprint(prev, projectState));
  }, [projectState]);

  useEffect(() => {
    try {
      localStorage.setItem(
        RECENT_BLUEPRINTS_KEY,
        JSON.stringify(recentBlueprints.slice(0, MAX_RECENT_BLUEPRINTS))
      );
    } catch {
      // ignore quota errors
    }
  }, [recentBlueprints]);

  useEffect(() => {
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  // Global keyboard shortcuts (Alt+1/2/3 for modes, Ctrl+Enter for Flesh Out)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        setMode('simple');
      } else if (e.altKey && e.key === '2') {
        e.preventDefault();
        setMode('balanced');
      } else if (e.altKey && e.key === '3') {
        e.preventDefault();
        setMode('pro');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFleshOutIdea();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const showToast = (type: 'success' | 'warning', text: string) => {
    setBannerMessage({ type, text });
  };

  const handleUpdateVariable = (key: string, value: string) => {
    setProjectState((prev) => ({
      ...prev,
      proConfig: {
        ...prev.proConfig,
        templateVariables: {
          ...prev.proConfig.templateVariables,
          [key]: value,
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  // 1. Flesh Out My Idea with Gemini
  const handleFleshOutIdea = async () => {
    if (isExpanding) return;
    if (!projectState.coreIdea.trim()) {
      showToast(
        'warning',
        'Type at least a few words in "What is the big idea?" before clicking Flesh Out.'
      );
      return;
    }

    setIsExpanding(true);
    setBannerMessage(null);
    setPreviousSnapshot(projectState);

    try {
      const result = await expandProjectIdea({
        appName: projectState.appName,
        coreIdea: projectState.coreIdea,
        targetPlatform: projectState.targetPlatform,
        features: projectState.features,
        aiModel: projectState.aiModel,
      });

      setProjectState((prev) => ({
        ...prev,
        appName: result.appName || prev.appName,
        tagline: result.tagline || prev.tagline,
        coreIdea: result.expandedIdea || prev.coreIdea,
        features:
          Array.isArray(result.suggestedFeatures) && result.suggestedFeatures.length > 0
            ? result.suggestedFeatures
            : prev.features,
        lastUpdated: new Date().toISOString(),
      }));

      showToast(
        'success',
        `Expanded "${result.appName || projectState.appName}" into a complete product vision and ${
          result.suggestedFeatures?.length || projectState.features.length
        } user steps.`
      );
    } catch (err: any) {
      // Non-destructive fallback warning while retaining active form text
      showToast(
        'warning',
        err?.message ||
          'Gemini expansion encountered an interruption. Your original text is safely preserved.'
      );
    } finally {
      setIsExpanding(false);
    }
  };

  // 2. Generate Random App Idea with AI (with instant curated fallback if offline/key missing)
  const handleRandomAiIdea = async () => {
    if (isGeneratingRandom) return;
    setIsGeneratingRandom(true);
    setBannerMessage(null);
    setPreviousSnapshot(projectState);

    try {
      const result = await generateRandomAppIdea(undefined, projectState.aiModel);
      const validPlatform =
        result.targetPlatform === 'desktop' ||
        result.targetPlatform === 'web' ||
        result.targetPlatform === 'mobile' ||
        result.targetPlatform === 'cli'
          ? result.targetPlatform
          : 'desktop';

      setProjectState((prev) => ({
        ...prev,
        id: `ai-idea-${Date.now()}`,
        appName: result.appName,
        tagline: result.tagline,
        coreIdea: result.coreIdea,
        targetPlatform: validPlatform,
        features: result.features,
        groundRules: result.groundRules || prev.groundRules,
        clarifications:
          Array.isArray(result.clarifications) && result.clarifications.length > 0
            ? result.clarifications
            : prev.clarifications,
        proConfig: {
          ...prev.proConfig,
          stackSummary: result.stackSummary || prev.proConfig.stackSummary,
          architectureStyle: result.architectureStyle || prev.proConfig.architectureStyle,
          templateVariables: {
            ...prev.proConfig.templateVariables,
            export_dir: `~/Projects/${result.appName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-specs`,
          },
        },
        lastUpdated: new Date().toISOString(),
      }));

      showToast(
        'success',
        `Generated fresh AI app concept: "${result.appName}" — ${result.tagline}`
      );
    } catch {
      // Fallback to rich curated idea if offline so button always delights the user
      const fallback =
        FALLBACK_RANDOM_IDEAS[getSecureRandomIndex(FALLBACK_RANDOM_IDEAS.length)];
      setProjectState({
        ...fallback,
        aiModel: projectState.aiModel ?? 'gemini-3.8-flash',
        id: `curated-idea-${Date.now()}`,
        lastUpdated: new Date().toISOString(),
      });
      showToast(
        'success',
        `Loaded fresh app concept: "${fallback.appName}" — ${fallback.tagline}`
      );
    } finally {
      setIsGeneratingRandom(false);
    }
  };

  // 3. Socratic Interrogator ("Grill Me") — remembers old answers & appends 5 fresh questions
  const handleGrillMe = async () => {
    if (isGrilling) return;
    setIsGrilling(true);
    setBannerMessage(null);

    try {
      const result = await generateGrillQuestions(projectState);
      if (Array.isArray(result.questions) && result.questions.length > 0) {
        let addedCount = 0;
        setProjectState((prev) => {
          const merged = mergeClarifications(prev.clarifications, result.questions);
          addedCount = merged.length - prev.clarifications.length;
          return {
            ...prev,
            clarifications: merged,
            lastUpdated: new Date().toISOString(),
          };
        });
        setLastGrillSyncedAt(new Date().toISOString());
        showToast(
          'success',
          addedCount > 0
            ? `Added ${addedCount} new clarification questions while keeping all prior Q&A remembered.`
            : 'Refreshed clarifications; all generated topics are already answered above.'
        );
      }
    } catch (err: any) {
      showToast(
        'warning',
        err?.message ||
          'Could not generate new interview questions right now. Your existing clarification answers remain intact.'
      );
    } finally {
      setIsGrilling(false);
    }
  };

  const grillContextFingerprint = JSON.stringify({
    appName: projectState.appName,
    tagline: projectState.tagline,
    coreIdea: projectState.coreIdea,
    targetPlatform: projectState.targetPlatform,
    codingLanguage: projectState.codingLanguage,
    features: projectState.features,
    groundRules: projectState.groundRules,
  });
  const initialGrillFingerprintRef = useRef<string | null>(null);
  const latestStateRef = useRef<ProjectState>(projectState);
  latestStateRef.current = projectState;

  useEffect(() => {
    if (initialGrillFingerprintRef.current === null) {
      initialGrillFingerprintRef.current = grillContextFingerprint;
      return;
    }
    if (initialGrillFingerprintRef.current === grillContextFingerprint) {
      return;
    }

    const snapState = latestStateRef.current;
    if (
      snapState.coreIdea.trim().length < 15 ||
      isGrilling ||
      isExpanding ||
      isGeneratingRandom
    ) {
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      if (cancelled) return;
      setIsAutoRefreshingGrill(true);
      try {
        const result = await generateGrillQuestions(latestStateRef.current);
        if (!cancelled && Array.isArray(result.questions) && result.questions.length > 0) {
          setProjectState((prev) => ({
            ...prev,
            clarifications: mergeClarifications(prev.clarifications, result.questions),
          }));
          setLastGrillSyncedAt(new Date().toISOString());
        }
      } catch {
        // Silent in background dynamic sync so offline usage shows no noisy errors
      } finally {
        if (!cancelled) setIsAutoRefreshingGrill(false);
      }
    }, 2200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [grillContextFingerprint, isExpanding, isGeneratingRandom, isGrilling]);

  // 4. Context-Aware Single-Field Fill with AI (unlimited runs per field)
  const handleFillField = async (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ): Promise<FillFieldResponse | null> => {
    if (fillingField === field) return null;
    setFillingField(field);
    setBannerMessage(null);

    try {
      const result = await fillFieldWithAi(field, projectState, {
        currentValue: options?.currentValue,
      });
      const val = result.value?.trim();
      if (!val) {
        showToast(
          'warning',
          'Gemini returned an empty suggestion. Your existing text is unchanged.'
        );
        return null;
      }

      const now = new Date().toISOString();
      if (
        field === 'appName' ||
        field === 'tagline' ||
        field === 'coreIdea' ||
        field === 'codingLanguageNote'
      ) {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({ ...prev, [field]: val, lastUpdated: now }));
      } else if (field === 'stitchVisualDirection') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), visualDirection: val },
          lastUpdated: now,
        }));
      } else if (field === 'uploadedResultNotes') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), uploadedResultNotes: val },
          lastUpdated: now,
        }));
      } else if (field === 'localAgentNotes') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          localAgents: { ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS), notes: val },
          lastUpdated: now,
        }));
      } else if (field === 'multiAgentProtocol') {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          multiAgent: {
            ...(prev.multiAgent ?? DEFAULT_MULTI_AGENT),
            sharedProtocolNotes: val,
          },
          lastUpdated: now,
        }));
      } else if (
        field === 'stackSummary' ||
        field === 'architectureStyle' ||
        field === 'testingStrategy' ||
        field === 'securityBoundary'
      ) {
        setPreviousSnapshot(projectState);
        setProjectState((prev) => ({
          ...prev,
          proConfig: { ...prev.proConfig, [field]: val },
          lastUpdated: now,
        }));
      }

      showToast(
        'success',
        options?.currentValue?.trim()
          ? 'Refined field with a fresh AI variation—click again anytime for another pass.'
          : 'Filled field using context from all other filled sections.'
      );
      return result;
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not fill this field with AI right now. Your existing text is safely preserved.'
      );
      return null;
    } finally {
      setFillingField(null);
    }
  };

  // 5. Mini Grill Me for individual sections
  const handleMiniGrill = async (topic: MiniGrillTopic) => {
    if (miniGrillLoadingTopic) return;
    setMiniGrillLoadingTopic(topic);
    setBannerMessage(null);

    try {
      const images =
        topic === 'stitchUi' ? projectState.stitchUi?.ideaImages ?? [] : undefined;
      const res = await generateMiniGrillQuestions(topic, projectState, images);
      const qs = Array.isArray(res.questions) ? res.questions : [];
      if (topic === 'stitchUi') {
        setProjectState((prev) => ({
          ...prev,
          stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), uiClarifications: qs },
          lastUpdated: new Date().toISOString(),
        }));
      } else {
        setMiniGrillQuestions((prev) => ({ ...prev, [topic]: qs }));
      }
      showToast('success', 'Mini Grill questions ready—pick any option to add detail.');
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not generate Mini Grill questions right now.'
      );
    } finally {
      setMiniGrillLoadingTopic(null);
    }
  };

  const handleSelectMiniGrillAnswer = (
    topic: MiniGrillTopic,
    questionId: string,
    option: string
  ) => {
    setMiniGrillQuestions((prev) => ({
      ...prev,
      [topic]: (prev[topic] ?? []).map((q) =>
        q.id === questionId ? { ...q, selectedAnswer: option } : q
      ),
    }));
  };

  const handleDismissMiniGrill = (topic: MiniGrillTopic) => {
    setMiniGrillQuestions((prev) => {
      const next = { ...prev };
      delete next[topic];
      return next;
    });
  };

  // 6. Stitch UI "Surprise Me" (multimodal with ideaImages)
  const handleStitchSurprise = async () => {
    if (isGeneratingSurprise) return;
    setIsGeneratingSurprise(true);
    setBannerMessage(null);
    setPreviousSnapshot(projectState);

    try {
      const res = await generateStitchSurprise(
        projectState,
        projectState.stitchUi?.ideaImages ?? []
      );
      setProjectState((prev) => {
        const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
        return {
          ...prev,
          stitchUi: {
            ...currentStitch,
            visualDirection: res.visualDirection || currentStitch.visualDirection,
            uiClarifications:
              Array.isArray(res.uiClarifications) && res.uiClarifications.length > 0
                ? res.uiClarifications
                : currentStitch.uiClarifications,
          },
          lastUpdated: new Date().toISOString(),
        };
      });
      showToast(
        'success',
        `Generated Stitch UI concept: "${res.designConceptName || 'Visual Direction'}"`
      );
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not generate a Surprise Me UI direction right now.'
      );
    } finally {
      setIsGeneratingSurprise(false);
    }
  };

  // 7. Coding Language Advisor ("What's best for what?")
  const handleRecommendLanguage = async () => {
    if (isRecommendingLanguage) return;
    setIsRecommendingLanguage(true);
    setBannerMessage(null);

    try {
      const advice = await recommendCodingLanguage(projectState);
      setLanguageAdvice(advice);
      showToast(
        'success',
        `AI recommends ${advice.recommendedLabel} based on your app idea and target device.`
      );
    } catch (err: unknown) {
      showToast(
        'warning',
        err instanceof Error
          ? err.message
          : 'Could not run the AI Language Advisor right now.'
      );
    } finally {
      setIsRecommendingLanguage(false);
    }
  };

  const handleLoadBlueprint = (blueprintId: string) => {
    const found = recentBlueprints.find((b) => b.id === blueprintId);
    if (!found) return;
    setPreviousSnapshot(projectState);
    setLanguageAdvice(null);
    setProjectState(
      normalizeProjectState({
        ...found.state,
        lastUpdated: new Date().toISOString(),
      })
    );
    showToast('success', `Loaded blueprint: "${found.name}"`);
  };

  const handleClearCanvas = () => {
    setPreviousSnapshot(projectState);
    setLanguageAdvice(null);
    setProjectState({
      id: `blank-${Date.now()}`,
      appName: 'Untitled App',
      tagline: 'A clean-slate application specification.',
      coreIdea: '',
      targetPlatform: 'desktop',
      aiModel: projectState.aiModel ?? 'gemini-3.8-flash',
      codingLanguage: 'auto',
      codingLanguageNote: '',
      features: [
        'Open the main workspace and view a clear welcome state',
        'Create and save a new item with instant visual confirmation',
      ],
      groundRules: {
        offlineFirst: true,
        highPerformance: true,
        localPrivacy: true,
        darkModeDefault: true,
      },
      clarifications: [],
      proConfig: {
        ...DEFAULT_PROJECT_STATE.proConfig,
      },
      stitchUi: {
        ...DEFAULT_STITCH_UI,
      },
      localAgents: {
        ...DEFAULT_LOCAL_AGENTS,
      },
      multiAgent: {
        ...DEFAULT_MULTI_AGENT,
      },
      workflowProgress: {
        stitchDone: false,
        builderDone: false,
        polishDone: false,
      },
      lastUpdated: new Date().toISOString(),
    });
    showToast('success', 'Started a blank project canvas. Click "Undo" anytime to restore.');
  };

  const handleUndoSnapshot = () => {
    if (!previousSnapshot) return;
    setProjectState(previousSnapshot);
    setPreviousSnapshot(null);
    showToast('success', 'Restored previous project state.');
  };

  const activeFileContent = compileSpecFile(projectState, activeSpecFile);
  const activePlatformContract = compilePlatformContract(projectState, activePlatform);

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-[#E6DFF5] flex flex-col">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-5 py-3.5 bg-[#141120]/90 backdrop-blur-md border-b border-[#C084FC]/20">
        {/* Zone 1: Brand Wordmark + HelpBadge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap"
          >
            PromptForge
          </a>
          <HelpBadge tooltipKey="header-brand" side="bottom" />
        </div>

        {/* Zone 2: Concise navigation links + HelpBadge */}
        <nav
          aria-label="Workstation Sections"
          className="hidden md:flex items-center gap-5 text-xs font-medium text-[#CBC3D7]"
        >
          <a
            href="#deck-manifest"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Manifest
          </a>
          <a
            href="#deck-architecture"
            onClick={() => {
              if (mode === 'simple') setMode('balanced');
            }}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Ground Rules
          </a>
          <a
            href="#deck-grill"
            onClick={() => {
              if (mode === 'simple') setMode('balanced');
            }}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Grill Me
          </a>
          <a
            href="#deck-tasks"
            onClick={() => setMode('pro')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Pro Rules
          </a>
          <a
            href="#deck-workflow"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Workflow & Stitch
          </a>
          <a
            href="#deck-exporter"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Exporters
          </a>
          <HelpBadge tooltipKey="header-nav" side="bottom" />
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <ExplainerTooltip tooltipKey="action-save-computer" side="bottom" align="end">
            <button
              type="button"
              onClick={() => setSaveModalOpen(true)}
              className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Save to Computer</span>
            </button>
          </ExplainerTooltip>
          <HelpBadge tooltipKey="action-save-computer" side="bottom" />
        </div>
      </header>

      {/* Workstation Control Sub-Bar (Breadcrumbs + Three-Tier Mode Switcher + Random AI Idea) */}
      <div className="px-5 py-3 bg-[#1D1929]/70 border-b border-[#C084FC]/15">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb & Active Spec Summary */}
          <div className="flex items-center gap-2 text-xs text-[#CBC3D7] min-w-0">
            <Terminal className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
            <span className="text-[#958EA0]">Ubuntu Workstation</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white truncate">
              {projectState.appName || 'Untitled Project'}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[#958EA0]">
              ·
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#34D399] tabular-nums">
              {projectState.features.length} features · {projectState.clarifications.length} clarifications
            </span>
          </div>

          {/* Center: Three-Tier Complexity Mode Switcher & AI Model Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <ModeSwitcher mode={mode} onChange={setMode} />

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0C1B]/90 border border-[#C084FC]/25">
              <Cpu className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
              <label htmlFor="select-ai-model" className="sr-only">
                AI Model
              </label>
              <select
                id="select-ai-model"
                value={projectState.aiModel ?? 'gemini-3.8-flash'}
                onChange={(e) => {
                  const nextModel = e.target.value as AiModelId;
                  setProjectState((prev) => ({
                    ...prev,
                    aiModel: nextModel,
                    lastUpdated: new Date().toISOString(),
                  }));
                }}
                className="bg-transparent text-xs font-medium text-[#E9D5FF] focus:outline-none cursor-pointer pr-1"
              >
                {AI_MODELS.map((m) => (
                  <option
                    key={m.id}
                    value={m.id}
                    className="bg-[#141122] text-white"
                  >
                    {m.label} ({m.speedTag})
                  </option>
                ))}
              </select>
              <HelpBadge tooltipKey="action-model-selector" side="bottom" />
            </div>

            <span className="inline-flex items-center gap-1">
              <ExplainerTooltip tooltipKey="action-random-ai" side="bottom">
                <button
                  type="button"
                  onClick={handleRandomAiIdea}
                  disabled={isGeneratingRandom}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingRandom ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EC4899]" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5 text-[#EC4899]" />
                  )}
                  <span>{isGeneratingRandom ? 'Generating...' : 'Random AI App Idea'}</span>
                </button>
              </ExplainerTooltip>
              <HelpBadge tooltipKey="action-random-ai" side="bottom" />
            </span>

            {isNativeDesktop && (
              <span className="inline-flex items-center gap-1">
                <ExplainerTooltip tooltipKey="action-keyring" side="bottom" align="end">
                  <button
                    type="button"
                    onClick={() => setKeyringModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      hasDesktopKey
                        ? 'bg-[#34D399]/10 border-[#34D399]/35 text-[#34D399] hover:bg-[#34D399]/20'
                        : 'bg-[#F59E0B]/15 border-[#F59E0B]/40 text-[#FDE68A] hover:bg-[#F59E0B]/25'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{hasDesktopKey ? 'Gemini Key Ready' : 'Set Gemini Key'}</span>
                  </button>
                </ExplainerTooltip>
                <HelpBadge tooltipKey="action-keyring" side="bottom" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Non-Destructive Feedback / Error Banner */}
      {bannerMessage && (
        <div className="px-5 pt-3">
          <div
            role="status"
            className={`max-w-[1440px] mx-auto px-4 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
              bannerMessage.type === 'success'
                ? 'bg-[#34D399]/10 border-[#34D399]/35 text-[#E6DFF5]'
                : 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#FFDAD6]'
            }`}
          >
            <div className="flex items-center gap-2">
              {bannerMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#FFB4AB] shrink-0" />
              )}
              <span>{bannerMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBannerMessage(null)}
              aria-label="Dismiss notification"
              className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main 3-Column Workstation Shell (1440px Desktop Baseline) */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 py-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Column 1: Left Recent Blueprints & Mode Guide Sidebar (3 cols on lg) */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-20">
          {/* Starter Blueprints (Most Recent 3) */}
          <div className="pf-card rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <FolderKanban className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="text-xs font-semibold text-white">
                  Starter Blueprints
                </h3>
                <HelpBadge tooltipKey="sidebar-blueprints" />
              </div>
              <span className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  className="text-[11px] font-medium text-[#A78BFA] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  New Blank App
                </button>
                <HelpBadge tooltipKey="sidebar-new-blank" />
              </span>
            </div>

            <div className="text-[10.5px] font-mono text-[#A78BFA]">
              Most recent 3 blueprints
            </div>

            <div className="space-y-2">
              {recentBlueprints.slice(0, MAX_RECENT_BLUEPRINTS).map((bp) => {
                const active = projectState.id === bp.id;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    onClick={() => handleLoadBlueprint(bp.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                        : 'bg-[#0F0C1B]/75 border-[#C084FC]/15 text-[#CBC3D7] hover:border-[#C084FC]/35'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-white truncate">
                        {bp.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#A78BFA] shrink-0">
                        {new Date(bp.savedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A78BFA] mb-1">{bp.badge}</p>
                    <p className="text-[11px] text-[#CBC3D7] line-clamp-2 leading-snug">
                      {bp.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* AI Random Idea Spark Button */}
            <button
              type="button"
              onClick={handleRandomAiIdea}
              disabled={isGeneratingRandom}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#EC4899]/15 hover:bg-[#EC4899]/25 border border-[#EC4899]/35 text-xs font-semibold text-[#FFB0CD] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingRandom ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Wand2 className="w-3.5 h-3.5 text-[#EC4899]" />
              )}
              <span>
                {isGeneratingRandom ? 'Inventing Idea...' : 'Surprise Me (AI App Idea)'}
              </span>
            </button>

            {previousSnapshot && (
              <button
                type="button"
                onClick={handleUndoSnapshot}
                className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-medium text-[#CBC3D7] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restore Previous Project Snapshot</span>
              </button>
            )}
          </div>

          {/* Active Complexity Lens Summary */}
          <div className="pf-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <span>Active Complexity Lens</span>
                <HelpBadge tooltipKey="sidebar-complexity-lens" />
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#D0BCFF] capitalize">
                {mode} Mode
              </span>
            </div>

            <p className="text-xs text-[#CBC3D7] leading-relaxed">
              {mode === 'simple' &&
                'Showing the plain-English essentials (Idea, Device, Features, Language), Guided Build Workflow, and Multi-Platform Exporter.'}
              {mode === 'balanced' &&
                'Showing Manifest, Ground Rules, Dynamic "Grill Me" interview, Guided Build Workflow, and Multi-Platform Exporter.'}
              {mode === 'pro' &&
                'Showing all 6 decks including Pro AGENTS.md overrides, {{variable}} tokens, Guided Build Workflow, and Multi-Platform Exporter.'}
            </p>

            <div className="pt-2 border-t border-[#C084FC]/15 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>01. Project Manifest & Language</span>
                <span className="font-mono text-[#34D399]">Visible</span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>02. Everyday Ground Rules</span>
                <span
                  className={`font-mono ${
                    mode === 'simple' ? 'text-[#958EA0]' : 'text-[#34D399]'
                  }`}
                >
                  {mode === 'simple' ? 'Auto-Managed' : 'Visible'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>03. Dynamic Grill Me Interview</span>
                <span
                  className={`font-mono ${
                    mode === 'simple' ? 'text-[#958EA0]' : 'text-[#34D399]'
                  }`}
                >
                  {mode === 'simple' ? 'Auto-Managed' : 'Visible'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>04. Pro Tasks & AGENTS.md</span>
                <span
                  className={`font-mono ${
                    mode === 'pro' ? 'text-[#34D399]' : 'text-[#958EA0]'
                  }`}
                >
                  {mode === 'pro' ? 'Visible' : 'Auto-Managed'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>05. Guided Workflow & Stitch</span>
                <span className="font-mono text-[#34D399]">Visible</span>
              </div>
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>06. Platform Exporter</span>
                <span className="font-mono text-[#34D399]">Visible</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Column 2: Central Stacked Workstation Decks (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Deck 1: Always visible in Simple, Balanced, and Pro */}
          <ManifestDeck
            state={projectState}
            onUpdate={setProjectState}
            onFleshOutIdea={handleFleshOutIdea}
            onRandomAiIdea={handleRandomAiIdea}
            onFillField={handleFillField}
            fillingField={fillingField}
            isExpanding={isExpanding}
            isGeneratingRandom={isGeneratingRandom}
            canUndoExpansion={Boolean(previousSnapshot)}
            onUndoExpansion={handleUndoSnapshot}
            onMiniGrill={handleMiniGrill}
            miniGrillLoadingTopic={miniGrillLoadingTopic}
            miniGrillQuestions={miniGrillQuestions}
            onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
            onDismissMiniGrill={handleDismissMiniGrill}
            onRecommendLanguage={handleRecommendLanguage}
            isRecommendingLanguage={isRecommendingLanguage}
            languageAdvice={languageAdvice}
          />

          {/* Simple Mode Upgrade Prompt Banner */}
          {mode === 'simple' && (
            <div className="pf-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">
                  Want to configure Offline Rules or run the Dynamic "Grill Me" Interview?
                </div>
                <div className="text-[11px] text-[#CBC3D7]">
                  Your Simple Mode inputs are already saved—switch to Balanced or Pro mode anytime.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMode('balanced')}
                className="pf-btn-secondary px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                Switch to Balanced Mode
              </button>
            </div>
          )}

          {/* Deck 2 & Deck 3: Visible in Balanced and Pro Modes */}
          {(mode === 'balanced' || mode === 'pro') && (
            <>
              <ArchitectureDeck
                state={projectState}
                onUpdate={setProjectState}
                onMiniGrill={handleMiniGrill}
                miniGrillLoadingTopic={miniGrillLoadingTopic}
                miniGrillQuestions={miniGrillQuestions}
                onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
                onDismissMiniGrill={handleDismissMiniGrill}
              />
              <GrillDeck
                state={projectState}
                onUpdate={setProjectState}
                onGrillMe={handleGrillMe}
                isGrilling={isGrilling}
                isAutoRefreshing={isAutoRefreshingGrill}
                lastSyncedAt={lastGrillSyncedAt}
              />
            </>
          )}

          {/* Deck 4: Visible in Pro Mode */}
          {mode === 'pro' && (
            <TasksDeck
              state={projectState}
              onUpdate={setProjectState}
              onFillField={handleFillField}
              fillingField={fillingField}
              onMiniGrill={handleMiniGrill}
              miniGrillLoadingTopic={miniGrillLoadingTopic}
              miniGrillQuestions={miniGrillQuestions}
              onSelectMiniGrillAnswer={handleSelectMiniGrillAnswer}
              onDismissMiniGrill={handleDismissMiniGrill}
            />
          )}

          {/* Deck 5: Guided Build Workflow & Stitch UI Studio */}
          <WorkflowDeck
            state={projectState}
            onUpdate={setProjectState}
            onFillField={handleFillField}
            fillingField={fillingField}
            onMiniGrill={handleMiniGrill}
            miniGrillLoadingTopic={miniGrillLoadingTopic}
            onStitchSurprise={handleStitchSurprise}
            isGeneratingSurprise={isGeneratingSurprise}
            onOpenSaveModal={() => setSaveModalOpen(true)}
            onUpdateVariable={handleUpdateVariable}
          />

          {/* Deck 6: Multi-Platform Exporter */}
          <ExporterDeck
            state={projectState}
            onOpenSaveModal={() => setSaveModalOpen(true)}
            onUpdateVariable={handleUpdateVariable}
          />
        </div>

        {/* Column 3: Right Inspector Panel — Live Specification & Platform Compiler (4 cols on lg) */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <div className="pf-card rounded-2xl p-4 space-y-4">
            {/* Inspector Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#C084FC]/15">
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold text-white tracking-tight">
                    Live Contract Compiler
                  </h2>
                  <HelpBadge tooltipKey="inspector-compiler" />
                </div>
                <p className="text-[11px] text-[#CBC3D7]">
                  Real-time synthesis of specification files & platform prompts
                </p>
              </div>

              {/* Switch between Spec Files and Platform Contracts */}
              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/20">
                <button
                  type="button"
                  onClick={() => setInspectorMode('files')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    inspectorMode === 'files'
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-[#CBC3D7] hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Spec Files</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorMode('platforms')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    inspectorMode === 'platforms'
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-[#CBC3D7] hover:text-white'
                  }`}
                >
                  <FileCode2 className="w-3 h-3" />
                  <span>Platforms</span>
                </button>
              </div>
            </div>

            {inspectorMode === 'files' ? (
              <div className="space-y-3">
                {/* Spec File Selector Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {SPEC_FILES.map((file) => {
                    const active = activeSpecFile === file.id;
                    return (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => setActiveSpecFile(file.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6] text-white font-semibold'
                            : 'bg-[#0F0C1B]/80 border border-[#C084FC]/15 text-[#CBC3D7] hover:text-white'
                        }`}
                      >
                        {file.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-[#A78BFA]">
                  {SPEC_FILES.find((f) => f.id === activeSpecFile)?.desc}
                </p>

                <CodeViewer
                  filename={activeSpecFile}
                  content={activeFileContent}
                  badgeLabel="Auto-Compiled"
                  templateVariables={projectState.proConfig.templateVariables}
                  onUpdateVariable={handleUpdateVariable}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Platform Contract Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {PLATFORM_TABS.map((plat) => {
                    const active = activePlatform === plat.id;
                    return (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => setActivePlatform(plat.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6] text-white font-semibold'
                            : 'bg-[#0F0C1B]/80 border border-[#C084FC]/15 text-[#CBC3D7] hover:text-white'
                        }`}
                      >
                        {plat.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-[#A78BFA]">
                  {activePlatformContract.subtitle}
                </p>

                <CodeViewer
                  filename={`${projectState.appName
                    .toLowerCase()
                    .replace(/\s+/g, '-')}-${activePlatform}.md`}
                  content={activePlatformContract.promptText}
                  badgeLabel={activePlatformContract.badge}
                  templateVariables={projectState.proConfig.templateVariables}
                  onUpdateVariable={handleUpdateVariable}
                />
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Simulated Ubuntu Directory Picker & Save Bundle Modal */}
      <SaveModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        state={projectState}
      />

      {isNativeDesktop && (
        <KeyringModal
          open={keyringModalOpen}
          onOpenChange={setKeyringModalOpen}
          hasKey={hasDesktopKey}
          onSaved={() => {
            setHasDesktopKey(true);
            showToast('success', 'Gemini API key saved securely to your desktop keyring.');
          }}
        />
      )}
    </div>
  );
}

export default App;
```

### `src/index.css`

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --surface: #141120;
  --surface-lowest: #0f0c1b;
  --surface-low: #1d1929;
  --surface-container: #211d2d;
  --surface-high: #2b2838;
  --surface-highest: #363243;
  --on-surface: #e6dff5;
  --on-surface-variant: #cbc3d7;
  --outline: #958ea0;
  --outline-variant: #494454;
  --primary: #8b5cf6;
  --primary-soft: #d0bcff;
  --secondary: #ec4899;
  --secondary-soft: #ffb0cd;
  --tertiary: #34d399;
  --tertiary-soft: #45dfa4;
}

body {
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #0F0C1B;
  color: #E6DFF5;
  overflow-x: hidden;
}

code, pre, .font-mono {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Level 1: Frosted Workspace Card */
.pf-card {
  background: rgba(27, 21, 46, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(192, 132, 252, 0.2);
}

.pf-card-interactive {
  background: rgba(27, 21, 46, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(192, 132, 252, 0.2);
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), border-color 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

.pf-card-interactive:hover {
  border-color: rgba(192, 132, 252, 0.38);
}

/* Level 2: Popovers, Tooltips & Floating Palette */
.pf-popover {
  background: rgba(38, 30, 65, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(192, 132, 252, 0.35);
  box-shadow: 0 8px 32px -4px rgba(139, 92, 246, 0.28);
}

/* Level 3: Modal Dialogs & Command Bar */
.pf-modal {
  background: rgba(24, 19, 42, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(192, 132, 252, 0.32);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 24px 48px -12px rgba(0, 0, 0, 0.75);
}

/* Primary Electric Violet Button */
.pf-btn-primary {
  background-color: #8B5CF6;
  color: #FFFFFF;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease;
}

.pf-btn-primary:hover:not(:disabled) {
  background-color: #9366F9;
  transform: scale(1.015);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 0 16px rgba(139, 92, 246, 0.5);
}

/* Secondary Ghost Button */
.pf-btn-secondary {
  background-color: transparent;
  color: #E9D5FF;
  border: 1px solid rgba(192, 132, 252, 0.22);
  transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
}

.pf-btn-secondary:hover:not(:disabled) {
  background-color: rgba(139, 92, 246, 0.14);
  border-color: rgba(192, 132, 252, 0.4);
}

/* Subtle custom scrollbars for code panes */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 12, 27, 0.6);
}

::-webkit-scrollbar-thumb {
  background: rgba(192, 132, 252, 0.24);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(192, 132, 252, 0.45);
}
```

### `src/main.tsx`

```tsx
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
```

### `src/types/project.ts`

```ts
export type ComplexityMode = 'simple' | 'balanced' | 'pro';

export type TargetPlatform = 'desktop' | 'web' | 'mobile' | 'cli';

export type AiModelId =
  | 'gemini-3.5-flash-lite'
  | 'gemini-3.6-flash'
  | 'gemini-3.8-flash'
  | 'gemini-3.1-pro-preview'
  | 'gemini-4-argon';

export type CodingLanguageId =
  | 'auto'
  | 'typescript-react'
  | 'rust-tauri'
  | 'python'
  | 'dart-flutter'
  | 'kotlin-android'
  | 'swift-ios'
  | 'go'
  | 'csharp-dotnet';

export type TaskSlicingMode = 'hitl-first' | 'balanced-slices' | 'afk-autonomous';

export type ExportPlatformId =
  | 'stitch'
  | 'aistudio'
  | 'antigravity'
  | 'canvas'
  | 'local-ollama'
  | 'copilot';

export type SpecFileId =
  | 'spec.md'
  | 'plan.md'
  | 'tasks.md'
  | 'AGENTS.md'
  | 'COLLABORATION.md'
  | '.continuerules'
  | 'src-tauri/src/lib.rs';

export type FillableFieldId =
  | 'appName'
  | 'tagline'
  | 'coreIdea'
  | 'nextStep'
  | 'codingLanguageNote'
  | 'stackSummary'
  | 'architectureStyle'
  | 'testingStrategy'
  | 'securityBoundary'
  | 'templateVariable'
  | 'customRule'
  | 'stitchVisualDirection'
  | 'stitchScreenNotes'
  | 'uploadedResultNotes'
  | 'localAgentNotes'
  | 'multiAgentProtocol';

export type MiniGrillTopic =
  | 'idea'
  | 'features'
  | 'groundRules'
  | 'codingLanguage'
  | 'proArch'
  | 'stitchUi';

export interface GroundRules {
  offlineFirst: boolean;
  highPerformance: boolean;
  localPrivacy: boolean;
  darkModeDefault: boolean;
}

export interface ClarificationItem {
  id: string;
  category: string;
  question: string;
  options: string[];
  selectedAnswer?: string;
}

export interface UploadedIdeaImage {
  id: string;
  name: string;
  mimeType: string;
  dataUrl: string;
}

export type StitchScreenKind = 'screen' | 'menu' | 'modal' | 'component';

export interface StitchScreenPrompt {
  id: string;
  name: string;
  kind: StitchScreenKind;
  notes: string;
}

export interface StitchUiConfig {
  visualDirection: string;
  uiClarifications: ClarificationItem[];
  ideaImages: UploadedIdeaImage[];
  screens?: StitchScreenPrompt[];
  uploadedResultName?: string;
  uploadedResultContent?: string;
  uploadedResultNotes?: string;
}

export interface WorkflowProgress {
  stitchDone: boolean;
  builderDone: boolean;
  polishDone: boolean;
}

export interface LocalAgentsConfig {
  enabled: boolean;
  provider: 'ollama' | 'continue' | 'both';
  ollamaModel: string;
  ollamaEndpoint: string;
  notes: string;
}

export interface AgentLane {
  id: string;
  agentName: string;
  focusArea: string;
  workOnPaths: string;
  stayAwayPaths: string;
  status: 'ready' | 'in-progress' | 'done';
  handoffNote: string;
}

export interface MultiAgentConfig {
  enabled: boolean;
  lanes: AgentLane[];
  sharedProtocolNotes: string;
}

export interface ProConfiguration {
  stackSummary: string;
  architectureStyle: string;
  testingStrategy: string;
  securityBoundary: string;
  taskSlicingMode: TaskSlicingMode;
  customRules: string[];
  templateVariables: Record<string, string>;
}

export interface ProjectState {
  id: string;
  appName: string;
  tagline: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  aiModel?: AiModelId;
  codingLanguage?: CodingLanguageId;
  codingLanguageNote?: string;
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
  stitchUi?: StitchUiConfig;
  workflowProgress?: WorkflowProgress;
  localAgents?: LocalAgentsConfig;
  multiAgent?: MultiAgentConfig;
  proConfig: ProConfiguration;
  lastUpdated: string;
}

export interface StarterTemplate {
  id: string;
  name: string;
  badge: string;
  summary: string;
  state: Omit<ProjectState, 'lastUpdated'>;
}

export interface RecentBlueprintItem {
  id: string;
  name: string;
  badge: string;
  summary: string;
  savedAt: string;
  state: ProjectState;
}

export interface SaveBundleResult {
  saved: boolean;
  canonicalDir: string;
  filesWritten: Array<{
    name: string;
    bytes: number;
    sha256Preview: string;
  }>;
  mode: 'tauri-native' | 'browser-simulated';
  timestamp: string;
}
```

## Frontend Services

### `src/services/compiler.ts`

```ts
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
```

### `src/services/geminiClient.ts`

```ts
import { invoke } from '@tauri-apps/api/core';
import {
  AiModelId,
  ClarificationItem,
  CodingLanguageId,
  FillableFieldId,
  GroundRules,
  MiniGrillTopic,
  ProjectState,
  TargetPlatform,
  UploadedIdeaImage,
} from '../types/project';
import { isTauriEnvironment } from './tauriBridge';

const TIMEOUT_MS = 30000;

function createVariationNonce(): number {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0];
  }
  return Date.now();
}

async function invokeTauriWithTimeout<T>(endpoint: string, payload: unknown): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      invoke<T>('gemini_proxy_request', { endpoint, payload }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new Error(
              'Gemini request timed out after 30 seconds. Your existing project text is untouched—please try again.'
            )
          );
        }, TIMEOUT_MS);
      }),
    ]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error(
      typeof err === 'string'
        ? err
        : 'Gemini request failed in desktop mode. Your active form text has been preserved.'
    );
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithTimeout<T>(url: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        data?.error || `Request failed with status ${response.status}. Your active form text has been preserved.`
      );
    }
    return data as T;
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error(
        'Gemini request timed out after 30 seconds. Your existing project text is untouched—please try again.'
      );
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function postGemini<T>(endpoint: string, body: unknown): Promise<T> {
  if (isTauriEnvironment()) {
    return invokeTauriWithTimeout<T>(endpoint, body);
  }
  return fetchWithTimeout<T>(endpoint, body);
}

export interface ExpandIdeaResponse {
  appName: string;
  tagline: string;
  expandedIdea: string;
  suggestedFeatures: string[];
}

export async function expandProjectIdea(params: {
  appName: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  features: string[];
  aiModel?: AiModelId;
}): Promise<ExpandIdeaResponse> {
  return postGemini<ExpandIdeaResponse>('/api/gemini/expand', params);
}

export interface RandomIdeaResponse {
  appName: string;
  tagline: string;
  coreIdea: string;
  targetPlatform: TargetPlatform;
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
  stackSummary: string;
  architectureStyle: string;
}

export async function generateRandomAppIdea(
  categoryHint?: string,
  aiModel?: AiModelId
): Promise<RandomIdeaResponse> {
  return postGemini<RandomIdeaResponse>('/api/gemini/random-idea', { categoryHint, aiModel });
}

export function buildFullProjectContext(state: ProjectState) {
  const stitch = state.stitchUi;
  return {
    appName: state.appName,
    tagline: state.tagline,
    coreIdea: state.coreIdea,
    targetPlatform: state.targetPlatform,
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    codingLanguage: state.codingLanguage ?? 'auto',
    codingLanguageNote: state.codingLanguageNote ?? '',
    features: state.features,
    groundRules: state.groundRules,
    clarifications: state.clarifications,
    proConfig: state.proConfig,
    stitchUi: {
      visualDirection: stitch?.visualDirection ?? '',
      uiClarifications: stitch?.uiClarifications ?? [],
      ideaImageNames: (stitch?.ideaImages ?? []).map((img) => img.name),
      screens: stitch?.screens ?? [],
      uploadedResultName: stitch?.uploadedResultName,
      uploadedResultContent: stitch?.uploadedResultContent,
      uploadedResultNotes: stitch?.uploadedResultNotes ?? '',
    },
    localAgents: state.localAgents,
    multiAgent: state.multiAgent,
    workflowProgress: state.workflowProgress ?? {
      stitchDone: false,
      builderDone: false,
      polishDone: false,
    },
  };
}

export interface GrillMeResponse {
  questions: ClarificationItem[];
}

export async function generateGrillQuestions(state: ProjectState): Promise<GrillMeResponse> {
  return postGemini<GrillMeResponse>('/api/gemini/grill', buildFullProjectContext(state));
}

export interface FillFieldResponse {
  value: string;
  secondaryValue?: string;
}

export async function fillFieldWithAi(
  field: FillableFieldId,
  state: ProjectState,
  options?: { currentValue?: string; variationNonce?: number }
): Promise<FillFieldResponse> {
  return postGemini<FillFieldResponse>('/api/gemini/fill-field', {
    field,
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    currentValue: options?.currentValue,
    variationNonce: options?.variationNonce ?? createVariationNonce(),
    context: buildFullProjectContext(state),
  });
}

export async function generateMiniGrillQuestions(
  topic: MiniGrillTopic,
  state: ProjectState,
  images?: UploadedIdeaImage[]
): Promise<GrillMeResponse> {
  return postGemini<GrillMeResponse>('/api/gemini/mini-grill', {
    topic,
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    context: buildFullProjectContext(state),
    images: images && images.length > 0 ? images : undefined,
  });
}

export interface StitchSurpriseResponse {
  designConceptName: string;
  visualDirection: string;
  uiClarifications: ClarificationItem[];
}

export async function generateStitchSurprise(
  state: ProjectState,
  images?: UploadedIdeaImage[]
): Promise<StitchSurpriseResponse> {
  return postGemini<StitchSurpriseResponse>('/api/gemini/stitch-surprise', {
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    context: buildFullProjectContext(state),
    images: images && images.length > 0 ? images : state.stitchUi?.ideaImages,
  });
}

export interface LanguageComparison {
  language: string;
  bestFor: string;
  whyConsiderOrSkip: string;
}

export interface LanguageAdvisorResponse {
  recommendedId: CodingLanguageId;
  recommendedLabel: string;
  summary: string;
  tradeoffs: string;
  comparisons: LanguageComparison[];
}

export async function recommendCodingLanguage(
  state: ProjectState
): Promise<LanguageAdvisorResponse> {
  return postGemini<LanguageAdvisorResponse>('/api/gemini/recommend-language', {
    aiModel: state.aiModel ?? 'gemini-3.8-flash',
    context: buildFullProjectContext(state),
  });
}
```

### `src/services/presets.ts`

```ts
import {
  AiModelId,
  CodingLanguageId,
  LocalAgentsConfig,
  MultiAgentConfig,
  ProjectState,
  RecentBlueprintItem,
  StarterTemplate,
  StitchUiConfig,
} from '../types/project';

export const DEFAULT_LOCAL_AGENTS: LocalAgentsConfig = {
  enabled: false,
  provider: 'both',
  ollamaModel: 'qwen2.5-coder:14b',
  ollamaEndpoint: 'http://127.0.0.1:11434',
  notes: 'Keep inference 100% local via Ollama with Continue IDE rules synced to .continuerules.',
};

export const DEFAULT_MULTI_AGENT: MultiAgentConfig = {
  enabled: false,
  lanes: [
    {
      id: 'agent-ui',
      agentName: 'Agent A · UI & Design',
      focusArea: 'Screens, Stitch integration, accessibility & CSS',
      workOnPaths: 'src/components/, src/decks/, src/index.css',
      stayAwayPaths: 'server/, src-tauri/src/',
      status: 'ready',
      handoffNote: 'Wait for typed API payloads from Agent B before wiring live calls.',
    },
    {
      id: 'agent-backend',
      agentName: 'Agent B · Backend & Native IPC',
      focusArea: 'Express API routes, Rust Tauri IPC & security guards',
      workOnPaths: 'server.ts, server/, src-tauri/src/',
      stayAwayPaths: 'src/decks/, src/components/',
      status: 'ready',
      handoffNote: 'Publish request/response shapes in COLLABORATION.md when changed.',
    },
    {
      id: 'agent-qa',
      agentName: 'Agent C · QA, Specs & Release',
      focusArea: 'Unit tests, verification commands, docs & packaging',
      workOnPaths: 'tests/, server.test.ts, README.md',
      stayAwayPaths: 'src/decks/, server/archiveRoute.ts',
      status: 'ready',
      handoffNote: 'Run npx tsc --noEmit, npm test, and cargo test after lane handoffs.',
    },
  ],
  sharedProtocolNotes:
    'Update COLLABORATION.md Status & Claims before editing shared contracts (src/types/project.ts) and never touch files listed in another agent lane Stay Away From boundary.',
};

export interface AiModelOption {
  id: AiModelId;
  label: string;
  speedTag: string;
  thinkingLevel: 'MINIMAL' | 'LOW' | 'MEDIUM';
  summary: string;
}

export const AI_MODELS: AiModelOption[] = [
  {
    id: 'gemini-3.5-flash-lite',
    label: 'Gemini 3.5 Flash-Lite',
    speedTag: 'Fastest',
    thinkingLevel: 'MINIMAL',
    summary: 'Near-instant responses with minimal thinking overhead for snappy Fill with AI & Grill Me.',
  },
  {
    id: 'gemini-3.6-flash',
    label: 'Gemini 3.6 Flash',
    speedTag: 'Very Fast',
    thinkingLevel: 'LOW',
    summary: 'High-speed Flash model with crisp JSON structure and low latency.',
  },
  {
    id: 'gemini-3.8-flash',
    label: 'Gemini 3.8 Flash',
    speedTag: 'Balanced Fast',
    thinkingLevel: 'LOW',
    summary: 'Default everyday model tuned to Low thinking for rapid coding specs without sluggishness.',
  },
  {
    id: 'gemini-3.1-pro-preview',
    label: 'Gemini 3.1 Pro',
    speedTag: 'Deep Reasoning',
    thinkingLevel: 'LOW',
    summary: 'Higher architectural reasoning depth for nuanced specs, Pro rules, and complex systems.',
  },
  {
    id: 'gemini-4-argon',
    label: 'Gemini 4 Argon',
    speedTag: 'Flagship',
    thinkingLevel: 'LOW',
    summary: 'Latest flagship model (1M shared context) for highest-quality product & engineering synthesis.',
  },
];

export const OLLAMA_MODEL_PRESETS = [
  'qwen2.5-coder:14b',
  'qwen2.5-coder:7b',
  'llama3.3:70b',
  'deepseek-r1:14b',
  'codestral:22b',
  'gemma3:12b',
];

export const DEFAULT_PROJECT_STATE: ProjectState = {
  id: 'promptforge-workstation',
  appName: 'PromptForge',
  tagline: 'Plain-language specification workstation and multi-platform prompt compiler for Ubuntu desktop.',
  coreIdea:
    'PromptForge is a fast, friendly Ubuntu desktop application that lets non-technical builders and developers describe an app idea in plain English and automatically compiles it into structured specification files (spec.md, plan.md, tasks.md, AGENTS.md) and platform-tuned prompts for Google Stitch, AI Studio, Antigravity, GitHub Copilot, and Gemini Canvas.\n\nIt strips away intimidating software jargon across three progressive complexity tiers (Simple, Balanced, Pro) while providing instant plain-English hover explainers, one-click Gemini idea expansion, and a 3-question Socratic clarification interview.',
  targetPlatform: 'desktop',
  aiModel: 'gemini-3.8-flash',
  codingLanguage: 'typescript-react',
  localAgents: DEFAULT_LOCAL_AGENTS,
  multiAgent: DEFAULT_MULTI_AGENT,
  features: [
    'Switch effortlessly between Simple, Balanced, and Pro modes without losing any entered project details',
    'Hover over any section badge, toggle, or button to read a friendly 2-sentence plain-English explanation',
    'Click "Flesh Out My Idea" or "Random App Idea with AI" to expand rough thoughts using Gemini 3.8 Flash',
    'Run the 3-question "Grill Me" interview to resolve missing edge cases through simple multiple-choice cards',
    'Inspect and export live spec.md, plan.md, tasks.md, AGENTS.md, and platform prompts to a local Ubuntu directory',
  ],
  groundRules: {
    offlineFirst: true,
    highPerformance: true,
    localPrivacy: true,
    darkModeDefault: true,
  },
  clarifications: [
    {
      id: 'q-layout',
      category: 'Workspace Layout',
      question: 'How should the five workstation decks appear in the central workspace?',
      options: [
        '(Recommended) Stacked cards filtered by Simple, Balanced, or Pro mode',
        'Single active deck at a time via sidebar navigation',
        'Support both stacked and single-deck views with a toggle',
      ],
      selectedAnswer: '(Recommended) Stacked cards filtered by Simple, Balanced, or Pro mode',
    },
    {
      id: 'q-export',
      category: 'File Export & Tauri IPC',
      question: 'How should the native Save to Computer export behave before Tauri compilation?',
      options: [
        '(Recommended) Simulated Ubuntu directory dialog with direct file downloads',
        'Tauri IPC bridge with silent single-file export',
        'Mock preview drawer showing compiled disk payloads',
      ],
      selectedAnswer: '(Recommended) Simulated Ubuntu directory dialog with direct file downloads',
    },
    {
      id: 'q-onboarding',
      category: 'Initial Workspace State',
      question: 'How should new sessions start when opening the workstation?',
      options: [
        '(Recommended) Pre-load a sample app with starter templates and AI random idea generator',
        'Start with a blank canvas and manual input fields',
        'Open a mandatory project setup wizard modal on startup',
      ],
      selectedAnswer:
        '(Recommended) Pre-load a sample app with starter templates and AI random idea generator',
    },
  ],
  proConfig: {
    stackSummary:
      'Tauri v2 (Rust 1.80+), React 19, TypeScript 5.x, Vite, Tailwind CSS v4, Radix UI Primitives, @google/genai SDK',
    architectureStyle:
      'Sandboxed React UI layer communicating via typed Tauri IPC commands (`save_spec_bundle`, `get_secure_key`) and Express Gemini server routes',
    testingStrategy:
      'Behavioral verification with Vitest & React Testing Library; mock Tauri IPC invocations; assert role="tooltip" accessibility',
    securityBoundary:
      'Server-side Gemini API key management; canonicalized Rust file write paths rejecting ../ traversal; least-privilege capabilities/default.json',
    taskSlicingMode: 'balanced-slices',
    customRules: [
      'Use functional React components with named exports and strict TypeScript domain models',
      'Every section header and configuration control must include a plain-English hover tooltip',
      'Never expose raw API keys in client-side code or log credentials to standard output',
    ],
    templateVariables: {
      primary_model: 'gemini-3.8-flash',
      target_os: 'Ubuntu 24.04 LTS',
      accent_color: '#8B5CF6',
      export_dir: '~/Projects/promptforge-specs',
    },
  },
  lastUpdated: new Date().toISOString(),
};

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: 'promptforge-self',
    name: 'PromptForge Workstation',
    badge: 'Desktop · Tauri v2',
    summary: 'The official PromptForge native Ubuntu specification & prompt compiler blueprint.',
    state: {
      id: DEFAULT_PROJECT_STATE.id,
      appName: DEFAULT_PROJECT_STATE.appName,
      tagline: DEFAULT_PROJECT_STATE.tagline,
      coreIdea: DEFAULT_PROJECT_STATE.coreIdea,
      targetPlatform: DEFAULT_PROJECT_STATE.targetPlatform,
      features: [...DEFAULT_PROJECT_STATE.features],
      groundRules: { ...DEFAULT_PROJECT_STATE.groundRules },
      clarifications: [...DEFAULT_PROJECT_STATE.clarifications],
      proConfig: {
        ...DEFAULT_PROJECT_STATE.proConfig,
        customRules: [...DEFAULT_PROJECT_STATE.proConfig.customRules],
        templateVariables: { ...DEFAULT_PROJECT_STATE.proConfig.templateVariables },
      },
    },
  },
  {
    id: 'pulsevault-audio',
    name: 'PulseVault Stem & Sample Lab',
    badge: 'Desktop · Audio Utility',
    summary: 'Local-first audio sample organizer that tags BPM, key signature, and synth patch notes.',
    state: {
      id: 'pulsevault-audio',
      appName: 'PulseVault',
      tagline: 'Lightning-fast local audio sample librarian and synth patch notebook for bedroom producers.',
      coreIdea:
        'Bedroom music producers accumulate thousands of unnamed WAV files across dozens of folders. PulseVault scans local sample directories, automatically groups loops by tempo and musical key, and provides an instant keyboard-driven waveform preview bar.\n\nUsers can attach plain-text hardware synth knob notes to any audio clip and drag-and-drop stems directly into their digital audio workstation without cloud uploads.',
      targetPlatform: 'desktop',
      features: [
        'Drop any local folder of WAV or FLAC files to index BPM, duration, and musical key in seconds',
        'Audition samples instantly with spacebar waveform scrubbing and loop region handles',
        'Filter crates by mood tags, instrument family, or tempo range with zero latency',
        'Attach hardware synthesizer patch sheets and pedal settings to individual recordings',
        'Export curated sample kits as clean, renamed ZIP folders for live performance hardware',
      ],
      groundRules: {
        offlineFirst: true,
        highPerformance: true,
        localPrivacy: true,
        darkModeDefault: true,
      },
      clarifications: [
        {
          id: 'pv-1',
          category: 'File Handling',
          question: 'Should PulseVault move original audio files or leave them in their existing folders?',
          options: [
            '(Recommended) Leave original files untouched and store metadata in a local index',
            'Copy all imported samples into a central library folder',
            'Ask the user every time a folder is dragged in',
          ],
          selectedAnswer:
            '(Recommended) Leave original files untouched and store metadata in a local index',
        },
        {
          id: 'pv-2',
          category: 'Playback Controls',
          question: 'How should sample preview playback work when browsing rapidly with arrow keys?',
          options: [
            '(Recommended) Auto-play on selection with instant voice stealing',
            'Require pressing Spacebar on each file manually',
            'Layer multiple samples simultaneously by default',
          ],
          selectedAnswer: '(Recommended) Auto-play on selection with instant voice stealing',
        },
        {
          id: 'pv-3',
          category: 'Kit Export',
          question: 'How should exported sample packs format filenames for hardware samplers?',
          options: [
            '(Recommended) Prefix with BPM and musical key (e.g., 124_Cm_BassLoop.wav)',
            'Keep original filenames unchanged',
            'Number sequentially from 01 to 99 only',
          ],
          selectedAnswer:
            '(Recommended) Prefix with BPM and musical key (e.g., 124_Cm_BassLoop.wav)',
        },
      ],
      proConfig: {
        stackSummary: 'Tauri v2, Rust Symphonia Audio Decoder, React 19, Canvas 2D Waveform Renderer, Tailwind CSS v4',
        architectureStyle: 'Non-destructive local metadata index backed by Rust async file streaming',
        testingStrategy: 'Vitest unit tests for filename sanitizer, BPM filter math, and keyboard shortcut handlers',
        securityBoundary: 'Read-only access on source sample directories; canonicalized export path checks',
        taskSlicingMode: 'balanced-slices',
        customRules: [
          'Never mutate or overwrite source audio files during library indexing',
          'Render waveforms at 60fps using offscreen canvas caching',
        ],
        templateVariables: {
          primary_model: 'gemini-3.8-flash',
          target_os: 'Ubuntu 24.04 LTS',
          accent_color: '#8B5CF6',
          export_dir: '~/Music/PulseVault-Kits',
        },
      },
    },
  },
  {
    id: 'fieldnote-botany',
    name: 'VerdiTrail Field Journal',
    badge: 'Mobile · Offline PWA',
    summary: 'Offline trail botany and mushroom foraging logbook with seasonal bloom reminders.',
    state: {
      id: 'fieldnote-botany',
      appName: 'VerdiTrail',
      tagline: 'Offline-first pocket field guide and sighting logbook for hikers and amateur botanists.',
      coreIdea:
        'Hikers and amateur naturalists often spot interesting wildflowers, ferns, and fungi deep on forest trails where cell reception does not exist. VerdiTrail lets users snap a quick observation card, record habitat notes (soil moisture, canopy shade, elevation), and compare against a built-in safety checklist.\n\nOnce back home, users can use AI to enrich their rough trail notes into structured species study cards and seasonal return reminders.',
      targetPlatform: 'mobile',
      features: [
        'Log a trail sighting in under 15 seconds with habitat toggles for shade, moisture, and tree companions',
        'Browse a side-by-side lookalike safety checklist that works 100% offline in the backcountry',
        'Organize sightings by trailhead collection and seasonal bloom calendar',
        'Use Gemini AI when back online to turn rough trail notes into structured study flashcards',
        'Export seasonal trail journals as printable PDF or Markdown field reports',
      ],
      groundRules: {
        offlineFirst: true,
        highPerformance: true,
        localPrivacy: true,
        darkModeDefault: true,
      },
      clarifications: [
        {
          id: 'vt-1',
          category: 'Safety Guidance',
          question: 'How should lookalike species warnings be presented on foraging entries?',
          options: [
            '(Recommended) Always display a high-visibility caution banner with lookalike traits',
            'Only show warnings if the user enables Expert Mode',
            'Hide safety notes inside a secondary settings menu',
          ],
          selectedAnswer:
            '(Recommended) Always display a high-visibility caution banner with lookalike traits',
        },
        {
          id: 'vt-2',
          category: 'Location Privacy',
          question: 'How should exact trail coordinates be handled when sharing a journal entry?',
          options: [
            '(Recommended) Strip exact GPS coordinates by default and show only general region',
            'Always publish exact latitude and longitude publicly',
            'Disable sharing entirely',
          ],
          selectedAnswer:
            '(Recommended) Strip exact GPS coordinates by default and show only general region',
        },
        {
          id: 'vt-3',
          category: 'Mobile Ergonomics',
          question: 'How should field logging controls be arranged for one-handed outdoor use?',
          options: [
            '(Recommended) Large bottom-sheet thumb controls with 48px minimum tap targets',
            'Compact desktop-style multi-column spreadsheet table',
            'Voice-only input with no buttons',
          ],
          selectedAnswer:
            '(Recommended) Large bottom-sheet thumb controls with 48px minimum tap targets',
        },
      ],
      proConfig: {
        stackSummary: 'React 19, TypeScript, IndexedDB Offline Store, Tailwind CSS v4, Express + @google/genai',
        architectureStyle: 'Offline-first local store with on-demand AI study card enrichment',
        testingStrategy: 'Vitest tests for offline storage queue, coordinate scrubber, and filter tabs',
        securityBoundary: 'Strip EXIF GPS metadata before any external export unless explicitly toggled',
        taskSlicingMode: 'hitl-first',
        customRules: [
          'All interactive tap targets must be at least 48px tall for gloved or outdoor thumb use',
          'Always display non-consumption educational disclaimers on fungi identification cards',
        ],
        templateVariables: {
          primary_model: 'gemini-3.8-flash',
          target_os: 'Mobile Web / iOS & Android',
          accent_color: '#34D399',
          export_dir: '~/Documents/VerdiTrail-Logs',
        },
      },
    },
  },
];

export const FALLBACK_RANDOM_IDEAS: Array<Omit<ProjectState, 'id' | 'lastUpdated'>> = [
  {
    appName: 'ChronoLoom',
    tagline: 'Visual fiction timeline and subplot weaver for novelists and tabletop GMs.',
    coreIdea:
      'Writers and tabletop game masters struggle to track overlapping character arcs, clues, and world events across multiple chapters or sessions. ChronoLoom provides a calm, drag-and-drop ribbon timeline where each thread represents a character or faction.\n\nWhen two threads cross in the same scene, ChronoLoom highlights continuity gaps and lets the writer ask Gemini to brainstorm believable scene transitions or unresolved clue callbacks.',
    targetPlatform: 'desktop',
    features: [
      'Create color-coded story ribbons for characters, factions, and mystery clues across a visual timeline',
      'Spot continuity errors automatically when a character is scheduled in two places at once',
      'Click any intersection node to draft scene beats with distraction-free markdown notes',
      'Ask Gemini to suggest 3 plot twists or clue callbacks using only already-established lore',
      'Export the entire story bible and chapter outline to clean Markdown or Scrivener-ready files',
    ],
    groundRules: {
      offlineFirst: true,
      highPerformance: true,
      localPrivacy: true,
      darkModeDefault: true,
    },
    clarifications: [
      {
        id: 'cl-1',
        category: 'Calendar System',
        question: 'How should dates on the story timeline be measured?',
        options: [
          '(Recommended) Support both real-world dates and custom fantasy/episode numbering',
          'Restrict strictly to standard Gregorian calendar years',
          'Only allow unnumbered freeform sticky notes',
        ],
        selectedAnswer:
          '(Recommended) Support both real-world dates and custom fantasy/episode numbering',
      },
      {
        id: 'cl-2',
        category: 'Spoiler Control',
        question: 'How should hidden GM secrets be handled when showing the timeline to players?',
        options: [
          '(Recommended) One-click Player Safe View that hides secret nodes and GM notes',
          'Show all spoilers on screen at all times',
          'Require exporting a separate file manually',
        ],
        selectedAnswer:
          '(Recommended) One-click Player Safe View that hides secret nodes and GM notes',
      },
      {
        id: 'cl-3',
        category: 'AI Lore Boundary',
        question: 'What context should Gemini use when suggesting scene transitions?',
        options: [
          '(Recommended) Strictly ground suggestions in the current project lore cards',
          'Invent random new main characters automatically',
          'Rewrite finished chapters without asking',
        ],
        selectedAnswer:
          '(Recommended) Strictly ground suggestions in the current project lore cards',
      },
    ],
    proConfig: {
      stackSummary: 'Tauri v2, React 19, TypeScript, SVG Ribbon Canvas, Tailwind CSS v4, @google/genai',
      architectureStyle: 'Local markdown bundle store with deterministic graph conflict detection',
      testingStrategy: 'Vitest unit tests for timeline overlap detection and Player Safe View filter',
      securityBoundary: 'All manuscript files stored locally; zero background cloud syncing',
      taskSlicingMode: 'balanced-slices',
      customRules: [
        'Never overwrite user prose during AI scene brainstorming; always present suggestions in a side card',
        'Support full keyboard navigation across timeline nodes',
      ],
      templateVariables: {
        primary_model: 'gemini-3.8-flash',
        target_os: 'Ubuntu 24.04 LTS',
        accent_color: '#8B5CF6',
        export_dir: '~/Documents/ChronoLoom-Worlds',
      },
    },
  },
  {
    appName: 'CrateBench',
    tagline: 'Visual electronics workbench and resistor/pinout inventory for hardware makers.',
    coreIdea:
      'Arduino, Raspberry Pi, and custom PCB hobbyists waste hours digging through plastic parts bins trying to remember whether they own a 4.7k ohm resistor or which GPIO pin supports PWM on a specific microcontroller. CrateBench maps physical storage drawers visually on screen and pairs every part with interactive pinout diagrams.\n\nBuilders can describe a weekend gadget project in plain English, and CrateBench checks what parts they already own in their drawers versus what they need to order.',
    targetPlatform: 'desktop',
    features: [
      'Map physical component organizer drawers on a visual grid with instant part number search',
      'Inspect interactive color-coded microcontroller pinout diagrams (ESP32, RP2040, STM32) offline',
      'Describe a circuit idea in plain English to match against components already in your drawers',
      'Track low-stock thresholds for common resistors, capacitors, and sensors',
      'Export a clean Bill of Materials (BOM) in CSV and Markdown formats',
    ],
    groundRules: {
      offlineFirst: true,
      highPerformance: true,
      localPrivacy: true,
      darkModeDefault: true,
    },
    clarifications: [
      {
        id: 'cb-1',
        category: 'Inventory Entry',
        question: 'What is the fastest way for a maker to add new parts to a drawer?',
        options: [
          '(Recommended) Quick-add command bar with common part presets and quantity steppers',
          'Require filling out a 20-field electrical datasheet form',
          'Only allow importing enterprise ERP files',
        ],
        selectedAnswer:
          '(Recommended) Quick-add command bar with common part presets and quantity steppers',
      },
      {
        id: 'cb-2',
        category: 'Pinout View',
        question: 'How should conflicting pin assignments be highlighted when planning a build?',
        options: [
          '(Recommended) Highlight shared I2C/SPI buses in mint and flag voltage conflicts in coral',
          'Show raw hexadecimal register addresses only',
          'Do not validate pin assignments',
        ],
        selectedAnswer:
          '(Recommended) Highlight shared I2C/SPI buses in mint and flag voltage conflicts in coral',
      },
      {
        id: 'cb-3',
        category: 'BOM Export',
        question: 'What columns should be included in the exported shopping list?',
        options: [
          '(Recommended) Part name, package size (SMD/Through-Hole), quantity needed, and drawer location',
          'Part name only',
          'Internal database UUIDs only',
        ],
        selectedAnswer:
          '(Recommended) Part name, package size (SMD/Through-Hole), quantity needed, and drawer location',
      },
    ],
    proConfig: {
      stackSummary: 'Tauri v2, React 19, TypeScript, Tailwind CSS v4, @google/genai',
      architectureStyle: 'Local JSON/SQLite inventory store with instant fuzzy search index',
      testingStrategy: 'Vitest tests for resistor value parser, stock deduction, and BOM CSV generator',
      securityBoundary: 'Local filesystem export only via canonicalized Tauri path validation',
      taskSlicingMode: 'afk-autonomous',
      customRules: [
        'Use tabular numerals (tabular-nums) for all voltage, resistance, and quantity columns',
        'Ensure search filtering responds in under 50ms for up to 5,000 components',
      ],
      templateVariables: {
        primary_model: 'gemini-3.8-flash',
        target_os: 'Ubuntu 24.04 LTS',
        accent_color: '#EC4899',
        export_dir: '~/Projects/CrateBench-BOMs',
      },
    },
  },
];

export const DEFAULT_STITCH_UI: StitchUiConfig = {
  visualDirection:
    'Deep twilight glassmorphic workstation (#0F0C1B canvas, frosted #1B152E cards, crisp 1px lilac borders, electric violet #8B5CF6 actions, mint #34D399 status badges).',
  uiClarifications: [],
  ideaImages: [],
  screens: [
    {
      id: 'screen-main-workspace',
      name: 'Main Workspace',
      kind: 'screen',
      notes: 'Primary 3-panel canvas with left navigation, central action deck, and live status inspector.',
    },
    {
      id: 'menu-navigation-settings',
      name: 'Navigation & Settings Menu',
      kind: 'menu',
      notes: 'Top bar mode switcher, model selector, local agent drawer, and quick export actions.',
    },
  ],
  uploadedResultName: undefined,
  uploadedResultContent: undefined,
  uploadedResultNotes: '',
};

export interface CodingLanguageOption {
  id: CodingLanguageId;
  label: string;
  shortTag: string;
  bestFor: string;
  tradeoffs: string;
}

export const CODING_LANGUAGES: CodingLanguageOption[] = [
  {
    id: 'auto',
    label: 'Let AI Recommend',
    shortTag: 'Smart Match',
    bestFor: 'Beginners or builders who want PromptForge & AI to choose the ideal stack for their idea.',
    tradeoffs: 'AI selects the cleanest fit based on your platform, offline rules, and feature list.',
  },
  {
    id: 'typescript-react',
    label: 'TypeScript + React',
    shortTag: 'Web & UI',
    bestFor: 'Interactive web apps, dashboards, Chrome extensions, and rapid AI Studio / Stitch UI builds.',
    tradeoffs: 'Fastest iteration with huge AI ecosystem; pairs with Electron/Tauri for desktop.',
  },
  {
    id: 'rust-tauri',
    label: 'Rust + Tauri v2',
    shortTag: 'Native Desktop',
    bestFor: 'Lightweight, fast, secure Ubuntu/Windows/macOS desktop apps with OS keyring & local disk access.',
    tradeoffs: 'Smallest installers and strong safety; slightly slower Rust compile times.',
  },
  {
    id: 'python',
    label: 'Python',
    shortTag: 'AI & Automation',
    bestFor: 'AI/LLM pipelines, data processing, research scripts, FastAPI backends, and quick automations.',
    tradeoffs: 'Easiest to read and rich in AI libraries; less suited for polished mobile/desktop UIs alone.',
  },
  {
    id: 'dart-flutter',
    label: 'Dart + Flutter',
    shortTag: 'Cross-Platform Mobile',
    bestFor: 'Building a single codebase for iOS, Android, and desktop with smooth custom 60fps UI.',
    tradeoffs: 'Great cross-platform visuals; larger app bundle size than native.',
  },
  {
    id: 'kotlin-android',
    label: 'Kotlin (Jetpack Compose)',
    shortTag: 'Native Android',
    bestFor: 'Deep Android hardware/OS integrations, widgets, background services, and Google Play apps.',
    tradeoffs: 'Best native Android UX; Android-only unless using Kotlin Multiplatform.',
  },
  {
    id: 'swift-ios',
    label: 'Swift + SwiftUI',
    shortTag: 'Native Apple',
    bestFor: 'iPhone, iPad, and macOS native apps needing Apple ecosystem APIs and smooth animations.',
    tradeoffs: 'Requires macOS/Xcode for final builds; Apple platforms only.',
  },
  {
    id: 'go',
    label: 'Go (Golang)',
    shortTag: 'CLI & Services',
    bestFor: 'Single-binary CLI tools, high-concurrency APIs, devops utilities, and local background servers.',
    tradeoffs: 'Blazingly fast builds and tiny binaries; not designed for rich GUI frontends.',
  },
  {
    id: 'csharp-dotnet',
    label: 'C# / .NET',
    shortTag: 'Windows & Enterprise',
    bestFor: 'Windows desktop apps, Unity games, and enterprise backend APIs.',
    tradeoffs: 'Mature tooling and strong typing; heavier runtime on Linux desktop compared to Go/Rust.',
  },
];

export const MAX_RECENT_BLUEPRINTS = 3;

export function createInitialRecentBlueprints(): RecentBlueprintItem[] {
  const now = new Date().toISOString();
  return STARTER_TEMPLATES.slice(0, MAX_RECENT_BLUEPRINTS).map((tpl) => ({
    id: tpl.id,
    name: tpl.name,
    badge: tpl.badge,
    summary: tpl.summary,
    savedAt: now,
    state: {
      ...tpl.state,
      codingLanguage: tpl.state.codingLanguage ?? 'typescript-react',
      stitchUi: tpl.state.stitchUi ?? DEFAULT_STITCH_UI,
      lastUpdated: now,
    },
  }));
}

export function upsertRecentBlueprint(
  existing: RecentBlueprintItem[],
  project: ProjectState
): RecentBlueprintItem[] {
  const cleanName = project.appName.trim() || 'Untitled App';
  const cleanSummary =
    project.tagline.trim() ||
    project.coreIdea.trim().split('\n')[0] ||
    'Custom application blueprint';
  const badgeMap: Record<ProjectState['targetPlatform'], string> = {
    desktop: 'Ubuntu Desktop',
    web: 'Web App',
    mobile: 'Mobile App',
    cli: 'CLI Tool',
  };

  const entry: RecentBlueprintItem = {
    id: project.id,
    name: cleanName,
    badge: badgeMap[project.targetPlatform] || 'Blueprint',
    summary: cleanSummary,
    savedAt: project.lastUpdated || new Date().toISOString(),
    state: project,
  };

  const filtered = existing.filter((item) => item.id !== project.id);
  return [entry, ...filtered].slice(0, MAX_RECENT_BLUEPRINTS);
}
```

### `src/services/tauriBridge.ts`

```ts
import { invoke } from '@tauri-apps/api/core';
import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';
import { SaveBundleResult } from '../types/project';

/**
 * Checks if the application is currently executing inside a native Tauri v2 desktop shell.
 */
export function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

/**
 * Canonicalizes a Linux/Ubuntu directory path and rejects directory traversal ('..') sequences.
 */
export function canonicalizeLinuxPath(
  rawPath: string,
  homeDirPath = '/home/ubuntu'
): {
  valid: boolean;
  canonicalPath: string;
  error?: string;
} {
  const trimmed = rawPath.trim();
  if (!trimmed) {
    return {
      valid: false,
      canonicalPath: '',
      error: 'Target directory path cannot be empty.',
    };
  }

  // Reject directory traversal sequences across '/' or '\' segments as required by AGENTS.md
  const normalizedSlashes = trimmed.replace(/\\/g, '/');
  if (normalizedSlashes.split('/').some((segment) => segment === '..')) {
    return {
      valid: false,
      canonicalPath: trimmed,
      error: 'Security Policy Violation: Directory traversal ("../") is blocked by canonical path guard.',
    };
  }

  const cleanHome = homeDirPath.replace(/\/+$/, '') || '/home/ubuntu';
  const expanded = trimmed.startsWith('~/')
    ? `${cleanHome}/${trimmed.slice(2)}`
    : trimmed === '~'
    ? cleanHome
    : trimmed.startsWith('/')
    ? trimmed
    : `${cleanHome}/${trimmed}`;

  const normalized = expanded.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  return {
    valid: true,
    canonicalPath: normalized,
  };
}

/**
 * Resolves the active user's home directory when running inside Tauri.
 */
export async function getNativeHomeDir(): Promise<string | undefined> {
  if (!isTauriEnvironment()) {
    return undefined;
  }
  try {
    const dir = await homeDir();
    return dir ? dir.replace(/\/+$/, '') : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Opens the native Ubuntu directory selector via @tauri-apps/plugin-dialog.
 */
export async function pickUbuntuDirectory(defaultPath?: string): Promise<string | null> {
  if (!isTauriEnvironment()) {
    return null;
  }
  const selected = await open({
    directory: true,
    multiple: false,
    title: 'Choose Export Folder for PromptForge Specs',
    defaultPath,
  });
  return typeof selected === 'string' ? selected : null;
}

function computePreviewHash(content: string): string {
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) {
    hash ^= content.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function triggerBrowserFileDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Invokes Tauri `save_spec_bundle` when running natively, or performs canonical validation
 * and direct file downloads in the web preview environment.
 */
export async function saveSpecBundle(
  targetDir: string,
  files: Record<string, string>,
  downloadFilesInBrowser = true
): Promise<SaveBundleResult> {
  const nativeHome = await getNativeHomeDir();
  const pathCheck = canonicalizeLinuxPath(targetDir, nativeHome);
  if (!pathCheck.valid) {
    throw new Error(pathCheck.error);
  }

  const filesMetadata = Object.entries(files).map(([name, content]) => ({
    name,
    bytes: new TextEncoder().encode(content).length,
    sha256Preview: computePreviewHash(content),
  }));

  if (isTauriEnvironment()) {
    await invoke<boolean>('save_spec_bundle', {
      targetDir: pathCheck.canonicalPath,
      files,
    });

    return {
      saved: true,
      canonicalDir: pathCheck.canonicalPath,
      filesWritten: filesMetadata,
      mode: 'tauri-native',
      timestamp: new Date().toISOString(),
    };
  }

  // In web preview mode: download the compiled specification bundle or individual files
  if (downloadFilesInBrowser) {
    Object.entries(files).forEach(([filename, content], index) => {
      setTimeout(() => {
        triggerBrowserFileDownload(filename, content);
      }, index * 140);
    });
  }

  return {
    saved: true,
    canonicalDir: pathCheck.canonicalPath,
    filesWritten: filesMetadata,
    mode: 'browser-simulated',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Checks whether an API credential is configured in the desktop OS keyring (or env fallback).
 */
export async function hasSecureKey(service = 'gemini'): Promise<boolean> {
  if (!isTauriEnvironment()) {
    return false;
  }
  return invoke<boolean>('has_secure_key', { service });
}

/**
 * Stores an API credential securely in the desktop OS keyring (libsecret / GNOME Keyring).
 */
export async function setSecureKey(service: string, key: string): Promise<void> {
  if (!isTauriEnvironment()) {
    throw new Error('Desktop keyring storage is only available inside the native Tauri app.');
  }
  await invoke<void>('set_secure_key', { service, key });
}
```

### `src/services/tooltips.ts`

```ts
export interface TooltipEntry {
  title: string;
  description: string;
  aiUsage: string;
}

export const TOOLTIP_DICTIONARY: Record<string, TooltipEntry> = {
  // Modes
  'mode-simple': {
    title: 'Simple Mode (Everyday English)',
    description: 'Strips away all technical settings and leaves just three friendly questions: your idea, the device, and the main user steps.',
    aiUsage: 'PromptForge automatically fills in safe, modern engineering defaults behind the scenes.',
  },
  'mode-balanced': {
    title: 'Balanced Mode (Guided Builder)',
    description: 'Adds everyday ground rules like offline support and speed alongside the 3-question "Grill Me" clarification interview.',
    aiUsage: 'Helps AI coding assistants avoid common assumptions about internet access, privacy, and screen speed.',
  },
  'mode-pro': {
    title: 'Pro Mode (Full 10-Section Architect)',
    description: 'Unlocks all 10 persistent AGENTS.md sections, task slicing strategies (HITL vs AFK), and reusable {{variable}} prompt tokens.',
    aiUsage: 'Produces strict, deterministic architectural guardrails for autonomous coding agents like Antigravity and Copilot.',
  },

  // Header & Global Actions
  'action-random-ai': {
    title: 'Random App Idea with AI',
    description: 'Asks Gemini to invent a complete, creative application concept from scratch and pre-fill your workspace.',
    aiUsage: 'Generates a fresh app name, plain-English concept, target device, and 5 starter user steps in seconds.',
  },
  'action-save-computer': {
    title: 'Save Specification Bundle to Disk',
    description: 'Opens the Ubuntu directory selector to write spec.md, plan.md, tasks.md, and AGENTS.md directly to your project folder.',
    aiUsage: 'Drops ready-to-run specification files right where AI coding tools look for project instructions.',
  },

  // Deck 1: Manifest Deck
  'deck-manifest': {
    title: '01. Project Manifest & Big Idea',
    description: 'Captures the heart of what you want to build in plain language without worrying about databases or frameworks.',
    aiUsage: 'Forms the Product Objective and Target User sections of spec.md and AGENTS.md.',
  },
  'field-app-name': {
    title: 'Application Name & Tagline',
    description: 'The working title of your project and a short one-line summary of who it helps.',
    aiUsage: 'Used by AI generators to title windows, package manifests, header wordmarks, and documentation.',
  },
  'field-core-idea': {
    title: 'What is the Big Idea?',
    description: 'Describe your app like you are explaining it to a friend over coffee—rough notes or single sentences are totally fine.',
    aiUsage: 'Serves as the primary context anchor across all platform prompts and EARS behavioral requirements.',
  },
  'action-flesh-out': {
    title: 'Flesh Out My Idea with Gemini',
    description: 'Turns a short, rough sentence into a clear two-paragraph product vision and suggests 5–6 practical user steps.',
    aiUsage: 'Calls gemini-3.8-flash with a 30-second safety timeout while keeping an Undo snapshot of your original text.',
  },
  'field-target-platform': {
    title: 'Where Will People Use It?',
    description: 'Pick the primary screen or environment where your app lives: Desktop App, Web Browser, Mobile Phone, or Command Line.',
    aiUsage: 'Automatically configures layout dimensions, touch targets, and system stack defaults in plan.md.',
  },
  'field-features': {
    title: 'Main Steps & User Actions',
    description: 'List the 3 to 6 main things a person actually clicks, sees, or accomplishes inside your app.',
    aiUsage: 'Compiled directly into EARS-notation ("When the user..., the system shall...") requirements in spec.md.',
  },

  // Deck 2: Architecture & Ground Rules
  'deck-architecture': {
    title: '02. Everyday Ground Rules & Guardrails',
    description: 'Plain-English quality switches that control how your app behaves when offline, loading data, or storing user files.',
    aiUsage: 'Translates your preferences into non-negotiable architectural invariants inside plan.md and AGENTS.md.',
  },
  'rule-offline-first': {
    title: 'Works Without Internet (Offline-First)',
    description: 'Keeps the app usable and preserves entered work even if Wi-Fi drops or the user is on an airplane.',
    aiUsage: 'Instructs the AI to use local state persistence and graceful retry queues instead of fragile cloud-only forms.',
  },
  'rule-high-performance': {
    title: 'Instant Screen Speed (<200ms Feedback)',
    description: 'Requires every button press, tab switch, and search filter to respond immediately without laggy spinners.',
    aiUsage: 'Enforces optimistic UI updates, compositor-only animations, and lightweight rendering budgets.',
  },
  'rule-local-privacy': {
    title: 'Keep Personal Data on This Device',
    description: 'Stores sensitive user notes, files, and credentials inside the local computer keyring or local storage.',
    aiUsage: 'Adds strict security rules prohibiting unencrypted keys or third-party telemetry leaks.',
  },
  'rule-dark-mode': {
    title: 'High-Contrast Twilight Dark Theme',
    description: 'Starts the application in a comfortable, eye-friendly dark palette tuned for long working sessions.',
    aiUsage: 'Configures semantic dark surface tokens and WCAG AA contrast ratios in the UI specification.',
  },

  // Deck 3: Grill Me Socratic Interview
  'deck-grill': {
    title: '03. "Grill Me" Clarification Interview',
    description: 'Acts like a thoughtful product coach that spots missing details in your idea and asks 3 quick multiple-choice questions.',
    aiUsage: 'Your selected answers eliminate guesswork and fold directly into the compiled specification and prompt contracts.',
  },
  'action-grill-me': {
    title: 'Generate 3 Clarification Questions',
    description: 'Scans your current app idea and steps to generate 3 tailored multiple-choice questions with recommended defaults.',
    aiUsage: 'Closes edge-case gaps before you hand the project off to Google Stitch, AI Studio, or Antigravity.',
  },

  // Deck 4: Tasks & Pro Rules
  'deck-tasks': {
    title: '04. Implementation Tasks & Pro Controls',
    description: 'Breaks your project into an ordered checklist of build steps and lets Pro users fine-tune the 10-section AGENTS.md contract.',
    aiUsage: 'Marks each task as Human-in-the-Loop (HITL) or Autonomous (AFK) so AI agents know when to pause for review.',
  },
  'field-task-slicing': {
    title: 'Task Slicing Strategy (HITL vs AFK)',
    description: 'Choose whether AI agents should check in with you after every milestone (HITL) or run autonomously in the background (AFK).',
    aiUsage: 'Updates task tags and parallelization markers [P] inside tasks.md.',
  },
  'field-variable-tokens': {
    title: 'Interactive {{variable}} Prompt Tokens',
    description: 'Reusable dynamic placeholders highlighted in luminous pink that automatically inject across all compiled prompt contracts.',
    aiUsage: 'Click any {{variable}} pill to edit its live value across AGENTS.md and platform exports.',
  },

  // Deck 5: Multi-Platform Exporter
  'deck-exporter': {
    title: '06. Multi-Platform Contract Exporter',
    description: 'Formats your project into ready-to-paste prompt contracts tailored for each major AI design and coding tool.',
    aiUsage: 'Structures context, visual tokens, and acceptance criteria in the exact format each platform performs best with.',
  },
  'platform-stitch': {
    title: 'Google Stitch UI & Design Prompt',
    description: 'Optimized for screen layout generation, glassmorphic color tokens, typography hierarchy, and component states.',
    aiUsage: 'Paste into Google Stitch to generate high-fidelity visual screens matching your specification.',
  },
  'platform-aistudio': {
    title: 'Google AI Studio Full-Stack Contract',
    description: 'Targets React + Express + @google/genai server-side architecture with complete interactive handlers.',
    aiUsage: 'Paste into Google AI Studio Build to scaffold the working web application and backend routes.',
  },
  'platform-antigravity': {
    title: 'Google Antigravity (AGY) Autonomous Spec',
    description: 'Structured around phased HITL/AFK task execution, verification commands, and strict file boundary rules.',
    aiUsage: 'Ideal for autonomous multi-file engineering and native Tauri desktop compilation in Antigravity.',
  },
  'platform-copilot': {
    title: 'GitHub Copilot Workspace Instructions',
    description: 'Formatted as concise repository-level coding conventions, test assertions, and step-by-step file tasks.',
    aiUsage: 'Drop into .github/copilot-instructions.md or Copilot Edits for guided implementation.',
  },
  'platform-canvas': {
    title: 'Gemini Canvas Interactive Iteration Prompt',
    description: 'Designed for rapid interactive prototyping, live preview refinement, and self-contained component polishing.',
    aiUsage: 'Paste into Gemini Canvas to iterate visually on flows, micro-interactions, and copy.',
  },
  'action-keyring': {
    title: 'Desktop Gemini Keyring Storage',
    description: 'Saves your Gemini API key securely inside your Ubuntu system keyring so AI features work offline from any Express server.',
    aiUsage: 'Rust reads this key directly from GNOME Keyring during native Gemini requests and never saves it to plain text files.',
  },
  'action-fill-with-ai': {
    title: 'Context-Aware Fill with AI',
    description: 'Uses everything you have already filled across all sections to draft a smart, tailored answer for this blank.',
    aiUsage: 'Reads your app idea, target device, coding language, feature list, ground rules, and clarifications together.',
  },
  'action-mini-grill': {
    title: 'Mini Grill Me (Quick Helper Questions)',
    description: 'Asks 1 or 2 quick multiple-choice questions right here so you can add helpful detail without guessing.',
    aiUsage: 'Folds your chosen answer directly into this section and updates all compiled prompts automatically.',
  },
  'header-brand': {
    title: 'PromptForge Workstation',
    description: 'Your plain-English studio for turning rough app ideas into specs, UI designs, and step-by-step AI build workflows.',
    aiUsage: 'Keeps your project organized in memory and local storage while compiling live Markdown and platform prompts.',
  },
  'header-nav': {
    title: 'Quick Section Jump Bar',
    description: 'Jump straight to any deck in the workstation—Manifest, Ground Rules, Grill Me, Pro Rules, Workflow, or Exporters.',
    aiUsage: 'Clicking Balanced or Pro sections automatically switches your view lens without losing any entered text.',
  },
  'sidebar-blueprints': {
    title: 'Most Recent 3 Blueprints',
    description: 'Lists your 3 most recently opened or edited project blueprints so you can switch back to active ideas in one click.',
    aiUsage: 'Restores the full ProjectState (idea, features, language, Stitch UI, and Pro rules) immediately.',
  },
  'sidebar-new-blank': {
    title: 'Start a New Blank Project',
    description: 'Clears the active fields so you can describe a brand-new app from scratch (your previous blueprint stays in Recent 3).',
    aiUsage: 'Gives you an undo snapshot and starts a clean project canvas.',
  },
  'sidebar-complexity-lens': {
    title: 'Active Complexity Lens Summary',
    description: 'Shows which decks are currently visible or auto-managed based on whether Simple, Balanced, or Pro mode is active.',
    aiUsage: 'Simple hides jargon; Balanced reveals rules and Grill Me; Pro exposes full AGENTS.md and token controls.',
  },
  'field-tagline': {
    title: 'One-Sentence Summary (Tagline)',
    description: 'A quick one-line elevator pitch explaining what your app does and who it is for.',
    aiUsage: 'Placed right at the top of spec.md, AGENTS.md, and every exported platform prompt so AI tools grasp your goal fast.',
  },
  'field-coding-language': {
    title: 'Coding Language & Stack Choice',
    description: 'Pick which programming language or framework you want AI builders to use, or ask AI what is best for your app.',
    aiUsage: 'Locks stack recommendations inside plan.md, AGENTS.md, and your guided build workflow handoffs.',
  },
  'field-coding-language-note': {
    title: 'Language & Library Preferences',
    description: 'Optional extra details about libraries, UI frameworks, or constraints you want paired with your chosen language.',
    aiUsage: 'Appended to Section 2 (Stack) in AGENTS.md and carried into AI Studio, Antigravity, and Copilot prompts.',
  },
  'action-language-advisor': {
    title: 'AI Language Advisor (What Is Best for What?)',
    description: 'Analyzes your idea, target device, and feature list, then explains what each coding language is best for and which fits best.',
    aiUsage: 'Compares trade-offs in plain English so beginners and pros can choose the right stack with confidence.',
  },
  'field-add-step': {
    title: 'Add a Feature to the List',
    description: 'Type a plain-English capability or user action you want your app to have, or click Fill with AI to suggest the next one.',
    aiUsage: 'Every item here becomes an EARS requirement in spec.md and an implementation slice in tasks.md.',
  },
  'field-pro-stack': {
    title: 'Preferred Tech Stack (Section 2)',
    description: 'Exact frameworks, runtimes, and SDKs that AI coding agents should use when writing code.',
    aiUsage: 'Directly populates Section 2 (Stack) of AGENTS.md and constrains code generation choices.',
  },
  'field-pro-architecture': {
    title: 'System Architecture Pattern (Section 5)',
    description: 'Describes how the UI, backend, and local storage communicate (for example, sandboxed UI over Tauri IPC).',
    aiUsage: 'Guides AI agents in AGENTS.md Section 5 and plan.md so files stay cleanly separated.',
  },
  'field-pro-testing': {
    title: 'Verification & Testing Rules (Section 7)',
    description: 'Specifies what automated tests and checks must pass before an AI agent considers work complete.',
    aiUsage: 'Written into AGENTS.md Section 7 and added as verification steps on generated tasks.',
  },
  'field-pro-security': {
    title: 'Security & Filesystem Boundary (Section 8)',
    description: 'Defines where API keys live, what paths can be written, and what inputs must be validated.',
    aiUsage: 'Enforced in AGENTS.md Section 8 and included in every builder prompt.',
  },
  'field-pro-new-token': {
    title: 'Create New {{variable}} Token',
    description: 'Add a reusable key-value placeholder (like target_os or accent_color) that automatically fills across all exported files.',
    aiUsage: 'Anywhere {{token_name}} appears in your specs or prompts, PromptForge substitutes this value live.',
  },
  'field-pro-custom-rules': {
    title: 'Persistent AI Coding Rules (Section 6)',
    description: 'Add custom "always do" or "never do" instructions that every AI coding assistant must follow in your repo.',
    aiUsage: 'Rendered verbatim in Section 6 (Coding Conventions) of AGENTS.md and Copilot/Antigravity contracts.',
  },
  'deck-workflow': {
    title: '05. Guided Build Workflow & Stitch UI Studio',
    description: 'Walks you step-by-step from UI design in Google Stitch (with image ideas and UI grilling) to building the app in the next AI tool.',
    aiUsage: 'Tracks your progress, incorporates your uploaded Stitch UI result, and hands you the exact next prompt and .md files.',
  },
  'stitch-ui-grill': {
    title: 'Grill Me on UI Design',
    description: 'Asks focused visual design questions (layout, density, mood, navigation) tailored to your app and any uploaded reference images.',
    aiUsage: 'Folds your visual answers straight into your Google Stitch UI prompt and visual direction notes.',
  },
  'stitch-surprise-me': {
    title: 'Surprise Me with a UI Idea (AI)',
    description: 'Uses Gemini (and any reference images you uploaded) to invent a fresh visual direction, color mood, and layout concept.',
    aiUsage: 'Fills your visual direction notes and upgrades your Google Stitch prompt automatically.',
  },
  'stitch-image-upload': {
    title: 'Upload Reference Images for UI Ideas',
    description: 'Drop screenshots, sketches, or moodboard images here so Gemini can see what look and layout style you like.',
    aiUsage: 'Sent directly to Gemini during UI Grill Me and Surprise Me, and summarized into your Stitch design prompt.',
  },
  'stitch-visual-direction': {
    title: 'Visual Direction & Layout Notes',
    description: 'Describe the colors, layout, vibe, or screen structure you want Google Stitch to design.',
    aiUsage: 'Injected into your Google Stitch UI prompt and downstream builder handoff contracts.',
  },
  'stitch-result-upload': {
    title: 'Upload Your Google Stitch Result',
    description: 'After running the prompt in Google Stitch, upload the exported HTML, ZIP, image screenshot, or code notes here.',
    aiUsage: 'Unlocks the next recommended app step and weaves your finished Stitch design into the builder prompt.',
  },
  'workflow-next-app': {
    title: 'Recommended Next App & Files',
    description: 'Recommends the best next AI tool (AI Studio, Antigravity, Copilot, or Canvas) for your chosen platform and language.',
    aiUsage: 'Packages your Stitch output, next prompt, and AGENTS.md / spec.md / plan.md / tasks.md for seamless handoff.',
  },
  'inspector-compiler': {
    title: 'Live Contract Compiler',
    description: 'Shows your real-time compiled Markdown specifications and platform prompts updating instantly on every edit.',
    aiUsage: 'Lets you inspect and copy AGENTS.md, spec.md, plan.md, tasks.md, or platform prompts at any moment.',
  },
  'field-export-dir': {
    title: 'Ubuntu Export Folder Path',
    description: 'Choose or type the local Linux folder where AGENTS.md, spec.md, plan.md, and tasks.md will be written.',
    aiUsage: 'Validated by Rust path canonicalization to block ../ traversal before writing any file.',
  },
  'action-browse-folder': {
    title: 'Browse Ubuntu Folder',
    description: 'Opens your native Ubuntu folder picker so you can select a destination directory visually.',
    aiUsage: 'Passes the selected directory path directly to the safe Rust file writer.',
  },
  'action-model-selector': {
    title: 'AI Model & Speed Selector',
    description: 'Switch between Gemini 3.5 Flash-Lite (fastest), 3.6 Flash, 3.8 Flash (balanced fast), 3.1 Pro, and Gemini 4 Argon.',
    aiUsage: 'PromptForge configures low/minimal thinking overhead on fast models so Fill with AI and Grill Me finish quickly.',
  },
  'stitch-multi-screen': {
    title: 'Multi-Screen & Menu Stitch Prompts',
    description: 'Add as many individual screens, menus, modals, or components as your app needs and generate a separate Stitch prompt for each one.',
    aiUsage: 'Lets you feed Stitch one focused screen or menu at a time while staying consistent with your overall visual direction.',
  },
  'section-local-agents': {
    title: 'Optional Local AI Agents (Ollama / Continue)',
    description: 'Enable private, offline-capable local coding instructions for Ollama models and the Continue IDE extension.',
    aiUsage: 'Generates .continuerules and Ollama/Continue configuration inside exports and plan.md alongside cloud agent specs.',
  },
  'section-multi-agent': {
    title: 'Multi-Agent Project Collaboration (COLLABORATION.md)',
    description: 'Coordinate multiple AI coding agents cleanly by defining which folders each agent works on and which boundaries they must stay away from.',
    aiUsage: 'Compiles COLLABORATION.md with ownership lanes, file locks, and shared handoff rules to prevent merge conflicts.',
  },
  'platform-local-ollama': {
    title: 'Local AI Agents (Ollama + Continue)',
    description: 'Generates offline-ready setup commands, Modelfile hints, and Continue prompt rules for running coding tasks locally.',
    aiUsage: 'Lets you pair your PromptForge specs with local open-weight coder models via http://127.0.0.1:11434.',
  },
};
```

## Frontend Components

### `src/components/Card.tsx`

```tsx
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
```

### `src/components/CodeViewer.tsx`

```tsx
import React, { useState } from 'react';
import { Check, Copy, Download, Edit3 } from 'lucide-react';
import { triggerBrowserFileDownload } from '../services/tauriBridge';

interface CodeViewerProps {
  filename: string;
  content: string;
  badgeLabel?: string;
  templateVariables?: Record<string, string>;
  onUpdateVariable?: (key: string, value: string) => void;
}

export function CodeViewer({
  filename,
  content,
  badgeLabel,
  templateVariables,
  onUpdateVariable,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [editingVarKey, setEditingVarKey] = useState<string | null>(null);
  const [tempVarValue, setTempVarValue] = useState('');

  const approxTokens = Math.max(1, Math.round(content.length / 4));
  const lineCount = content.split('\n').length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback copy
    }
  };

  const handleDownloadSingle = () => {
    const cleanName = filename.includes('/') ? filename.split('/').pop()! : filename;
    triggerBrowserFileDownload(cleanName, content);
  };

  const startEditingVar = (key: string, currentVal: string) => {
    setEditingVarKey(key);
    setTempVarValue(currentVal);
  };

  const commitVarEdit = () => {
    if (editingVarKey && onUpdateVariable) {
      onUpdateVariable(editingVarKey, tempVarValue.trim() || editingVarKey);
    }
    setEditingVarKey(null);
  };

  return (
    <div className="rounded-xl bg-[#0F0C1B]/95 border border-[#C084FC]/25 overflow-hidden flex flex-col">
      {/* Code Viewer Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#1D1929]/90 border-b border-[#C084FC]/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono font-semibold text-white truncate">
            {filename}
          </span>
          {badgeLabel && (
            <span className="text-[11px] text-[#A78BFA] whitespace-nowrap shrink-0">
              · {badgeLabel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Token Counter Pill */}
          <span
            title="Estimated prompt token count and line count"
            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tabular-nums bg-[#0F0C1B] text-[#A78BFA] border border-[#C084FC]/20 whitespace-nowrap shrink-0"
          >
            {approxTokens.toLocaleString()} tokens · {lineCount} lines
          </span>

          <button
            type="button"
            onClick={handleDownloadSingle}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[#E9D5FF] hover:bg-[#8B5CF6]/15 border border-[#C084FC]/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title={`Download ${filename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#8B5CF6] text-white hover:bg-[#9366F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Variable Token Bar (Design System {{variable}} pills in #EC4899) */}
      {templateVariables && Object.keys(templateVariables).length > 0 && (
        <div className="px-3.5 py-2 bg-[#141120] border-b border-[#C084FC]/15 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#958EA0] mr-1">
            Interactive Tokens:
          </span>
          {Object.entries(templateVariables).map(([key, val]) => {
            const isEditing = editingVarKey === key;
            if (isEditing) {
              return (
                <div
                  key={key}
                  className="inline-flex items-center gap-1 bg-[#EC4899]/20 border border-[#EC4899]/50 rounded-full px-2 py-0.5"
                >
                  <span className="text-[11px] font-mono text-[#FFB0CD]">{`{{${key}}}=`}</span>
                  <input
                    type="text"
                    value={tempVarValue}
                    onChange={(e) => setTempVarValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitVarEdit();
                      if (e.key === 'Escape') setEditingVarKey(null);
                    }}
                    onBlur={commitVarEdit}
                    autoFocus
                    className="w-28 bg-transparent text-[11px] font-mono text-white focus:outline-none"
                  />
                </div>
              );
            }

            return (
              <button
                key={key}
                type="button"
                onClick={() => startEditingVar(key, val)}
                title="Click to edit live variable token across all compiled contracts"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#EC4899]/15 text-[#EC4899] hover:bg-[#EC4899]/25 border border-[#EC4899]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{`{{${key}}}`}</span>
                <span className="text-white/75">={val}</span>
                <Edit3 className="w-2.5 h-2.5 opacity-75" />
              </button>
            );
          })}
        </div>
      )}

      {/* Highlighted Markdown / Code Content */}
      <div className="p-4 overflow-x-auto max-h-[540px] overflow-y-auto">
        <pre className="text-[12.5px] leading-[1.55] font-mono text-[#E9D5FF] whitespace-pre-wrap break-words">
          {content.split('\n').map((line, i) => {
            const isHeading = line.startsWith('#');
            const isBlockquote = line.startsWith('>');
            const isBullet = line.trim().startsWith('- ') || /^\d+\.\s/.test(line.trim());

            return (
              <div
                key={i}
                className="grid grid-cols-[2.25rem_1fr] gap-2 hover:bg-white/[0.03] px-1 rounded"
              >
                <span className="text-[11px] text-[#958EA0]/50 select-none text-right pr-2 tabular-nums">
                  {i + 1}
                </span>
                <span
                  className={
                    isHeading
                      ? 'text-white font-semibold'
                      : isBlockquote
                      ? 'text-[#A78BFA]'
                      : isBullet
                      ? 'text-[#E6DFF5]'
                      : 'text-[#CBC3D7]'
                  }
                >
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
```

### `src/components/FillWithAiButton.tsx`

```tsx
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { ExplainerTooltip } from './Tooltip';

interface FillWithAiButtonProps {
  fieldLabel: string;
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function FillWithAiButton({
  fieldLabel,
  loading,
  disabled,
  onClick,
}: FillWithAiButtonProps) {
  return (
    <ExplainerTooltip tooltipKey="action-fill-with-ai" side="top">
      <button
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
        aria-label={`Fill ${fieldLabel} with AI`}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/30 border border-[#C084FC]/30 text-[11px] font-medium text-[#D0BCFF] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin text-[#EC4899]" />
        ) : (
          <Sparkles className="w-3 h-3 text-[#EC4899]" />
        )}
        <span>{loading ? 'Filling...' : 'Fill with AI'}</span>
      </button>
    </ExplainerTooltip>
  );
}
```

### `src/components/KeyringModal.tsx`

```tsx
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck, X } from 'lucide-react';
import { setSecureKey } from '../services/tauriBridge';
import { HelpBadge, LabelWithTooltip } from './Tooltip';

interface KeyringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasKey: boolean;
  onSaved: () => void;
}

export function KeyringModal({ open, onOpenChange, hasKey, onSaved }: KeyringModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = (next: boolean) => {
    if (!next) {
      setApiKey('');
      setShowKey(false);
      setError(null);
    }
    onOpenChange(next);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please paste a valid Gemini API key before saving.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await setSecureKey('gemini', apiKey.trim());
      setApiKey('');
      setShowKey(false);
      onSaved();
      onOpenChange(false);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Could not save the API key to your desktop keyring.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-150" />
        <Dialog.Content className="pf-modal fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-[#E6DFF5] focus:outline-none">
          <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-[#C084FC]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#D0BCFF]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Dialog.Title className="text-base font-semibold text-white tracking-tight">
                    Desktop Gemini Keyring
                  </Dialog.Title>
                  <HelpBadge tooltipKey="action-keyring" />
                </div>
                <Dialog.Description className="text-xs text-[#CBC3D7]">
                  Stored locally in your Ubuntu system keyring (`libsecret`)
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close keyring dialog"
                className="p-1.5 rounded-lg text-[#958EA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 text-xs">
              {hasKey ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                  <span className="text-[#E6DFF5]">
                    A Gemini key is saved in your keyring. Enter a new key below to replace it.
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <span className="text-[#CBC3D7]">
                    Paste your Gemini API key once so AI features work natively without Node/Express.
                  </span>
                </>
              )}
            </div>

            <div className="space-y-1.5">
              <LabelWithTooltip
                label="Gemini API Key"
                tooltipKey="action-keyring"
                htmlFor="desktop-gemini-key"
              />
              <div className="relative">
                <input
                  id="desktop-gemini-key"
                  type={showKey ? 'text' : 'password'}
                  autoComplete="off"
                  spellCheck={false}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-[#0F0C1B] border border-[#C084FC]/25 text-xs text-white placeholder-[#958EA0] focus:outline-none focus:border-[#8B5CF6]"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((prev) => !prev)}
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#958EA0] hover:text-white cursor-pointer"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#FFB4AB] bg-[#EF4444]/15 border border-[#EF4444]/35 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#CBC3D7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={saving}
                className="pf-btn-primary px-4 py-2 rounded-full text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Saving to Keyring...' : 'Save to Keyring'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### `src/components/MiniGrillSection.tsx`

```tsx
import React from 'react';
import { Check, Loader2, MessageSquarePlus, X } from 'lucide-react';
import { ClarificationItem } from '../types/project';
import { ExplainerTooltip, HelpBadge } from './Tooltip';

interface MiniGrillButtonProps {
  label?: string;
  loading: boolean;
  disabled?: boolean;
  tooltipKey?: string;
  onClick: () => void;
}

export function MiniGrillButton({
  label = 'Mini Grill',
  loading,
  disabled,
  tooltipKey = 'action-mini-grill',
  onClick,
}: MiniGrillButtonProps) {
  return (
    <span className="inline-flex items-center gap-1 shrink-0">
      <ExplainerTooltip tooltipKey={tooltipKey} side="top">
        <button
          type="button"
          onClick={onClick}
          disabled={loading || disabled}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131620] hover:bg-[#1E2333] border border-[#5E6AD2]/35 text-[11px] font-medium text-[#A5B4FC] hover:text-white transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin text-[#A5B4FC]" />
          ) : (
            <MessageSquarePlus className="w-3 h-3 text-[#A5B4FC]" />
          )}
          <span>{loading ? 'Asking...' : label}</span>
        </button>
      </ExplainerTooltip>
      <HelpBadge tooltipKey={tooltipKey} side="top" />
    </span>
  );
}

interface MiniGrillPanelProps {
  title: string;
  questions: ClarificationItem[];
  onSelectAnswer: (questionId: string, option: string) => void;
  onApplyToSection?: (question: ClarificationItem, option: string) => void;
  onClose: () => void;
}

export function MiniGrillPanel({
  title,
  questions,
  onSelectAnswer,
  onApplyToSection,
  onClose,
}: MiniGrillPanelProps) {
  if (questions.length === 0) return null;

  return (
    <div className="mt-3 p-3.5 rounded-xl bg-[#0D1017] border border-[#5E6AD2]/35 space-y-3 shadow-inner">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <MessageSquarePlus className="w-3.5 h-3.5 text-[#A5B4FC]" />
          <span className="text-[11px] font-semibold text-[#C7D2FE]">
            Mini Grill · {title}
          </span>
          <HelpBadge tooltipKey="action-mini-grill" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mini grill"
          className="p-1 rounded-md text-[#64748B] hover:text-white hover:bg-[#1E2333] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-3 rounded-lg bg-[#131620] border border-[#1D2230] space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5B4FC]">
                {q.category}
              </span>
              {q.selectedAnswer && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                  <Check className="w-3 h-3" /> Selected
                </span>
              )}
            </div>
            <p className="text-[12.5px] font-medium text-[#E2E8F0] leading-snug">
              {q.question}
            </p>
            <div className="grid grid-cols-1 gap-1.5 pt-0.5">
              {q.options.map((opt) => {
                const isSelected = q.selectedAnswer === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onSelectAnswer(q.id, opt);
                      onApplyToSection?.(q, opt);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md border text-[12px] transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#5E6AD2]/15 border-[#5E6AD2]/50 text-white font-medium'
                        : 'bg-[#0B0D12] border-[#1D2230] text-[#94A3B8] hover:text-white hover:border-[#2C3347]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#A5B4FC] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### `src/components/ModeSwitcher.tsx`

```tsx
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
```

### `src/components/SaveModal.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Folder,
  FolderOpen,
  FolderSearch,
  HardDrive,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';
import { ProjectState, SaveBundleResult } from '../types/project';
import {
  compileAgentsMd,
  compileCollaborationMd,
  compileContinueRules,
  compilePlanMd,
  compileSpecMd,
  compileTasksMd,
} from '../services/compiler';
import { HelpBadge, LabelWithTooltip } from './Tooltip';
import {
  canonicalizeLinuxPath,
  getNativeHomeDir,
  isTauriEnvironment,
  pickUbuntuDirectory,
  saveSpecBundle,
  triggerBrowserFileDownload,
} from '../services/tauriBridge';

interface SaveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: ProjectState;
}

const UBUNTU_QUICK_DIRS = [
  {
    label: 'Projects Workspace',
    path: '~/Projects/promptforge-specs',
    description: 'Recommended Ubuntu developer folder',
  },
  {
    label: 'Current Repository Root',
    path: '~/workspace/app-spec',
    description: 'Direct handoff for Antigravity / Local AI',
  },
  {
    label: 'Documents Blueprints',
    path: '~/Documents/PromptForge-Exports',
    description: 'Personal offline markdown archive',
  },
];

export function SaveModal({ open, onOpenChange, state }: SaveModalProps) {
  const [targetDir, setTargetDir] = useState(
    state.proConfig.templateVariables.export_dir || '~/Projects/promptforge-specs'
  );
  const [nativeHome, setNativeHome] = useState<string | undefined>(undefined);
  const [downloadOnSave, setDownloadOnSave] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveBundleResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const isNativeDesktop = isTauriEnvironment();

  useEffect(() => {
    if (!open || !isNativeDesktop) return;
    getNativeHomeDir().then(setNativeHome);
  }, [open, isNativeDesktop]);

  const compiledFiles: Record<string, string> = {
    'AGENTS.md': compileAgentsMd(state),
    'spec.md': compileSpecMd(state),
    'plan.md': compilePlanMd(state),
    'tasks.md': compileTasksMd(state),
    ...(state.multiAgent?.enabled
      ? { 'COLLABORATION.md': compileCollaborationMd(state) }
      : {}),
    ...(state.localAgents?.enabled
      ? { '.continuerules': compileContinueRules(state) }
      : {}),
  };

  const pathCheck = canonicalizeLinuxPath(targetDir, nativeHome);

  const fileRows = Object.entries(compiledFiles).map(([name, content]) => ({
    name,
    bytes: new TextEncoder().encode(content).length,
    lines: content.split('\n').length,
    content,
  }));

  const totalBytes = fileRows.reduce((acc, f) => acc + f.bytes, 0);

  const handleBrowseFolder = async () => {
    setSaveError(null);
    try {
      const selected = await pickUbuntuDirectory(
        pathCheck.valid ? pathCheck.canonicalPath : nativeHome
      );
      if (selected) {
        setTargetDir(selected);
        setSaveResult(null);
      }
    } catch (err: unknown) {
      setSaveError(
        err instanceof Error ? err.message : 'Unable to open the native folder picker.'
      );
    }
  };

  const handleConfirmSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const result = await saveSpecBundle(targetDir, compiledFiles, downloadOnSave);
      setSaveResult(result);
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to write specification bundle.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setSaveResult(null);
          setSaveError(null);
        }
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-150" />
        <Dialog.Content className="pf-modal fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-[#E6DFF5] focus:outline-none">
          {/* Ubuntu Window Header */}
          <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-[#C084FC]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#D0BCFF]">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Dialog.Title className="text-lg font-semibold text-white tracking-tight">
                    Save Specification Bundle to Computer
                  </Dialog.Title>
                  <HelpBadge tooltipKey="action-save-computer" />
                </div>
                <Dialog.Description className="text-xs text-[#CBC3D7]">
                  Ubuntu Directory Selector & Tauri IPC Atomic Writer (`save_spec_bundle`)
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-[#958EA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Ubuntu Nautilus Quick Folder Presets */}
          <div className="space-y-4">
            <div>
              <div className="mb-2">
                <LabelWithTooltip
                  label="1. Choose Ubuntu Destination Directory"
                  tooltipKey="field-export-dir"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
                {UBUNTU_QUICK_DIRS.map((dir) => {
                  const selected = targetDir === dir.path;
                  return (
                    <button
                      key={dir.path}
                      type="button"
                      onClick={() => {
                        setTargetDir(dir.path);
                        setSaveResult(null);
                        setSaveError(null);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                          : 'bg-[#141120]/90 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {selected ? (
                          <FolderOpen className="w-4 h-4 text-[#D0BCFF] shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 text-[#A78BFA] shrink-0" />
                        )}
                        <span className="text-xs font-semibold truncate">{dir.label}</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#A78BFA] truncate">{dir.path}</p>
                    </button>
                  );
                })}
              </div>

              {/* Manual Path Input + Native Browse + Canonical Guard Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <input
                    type="text"
                    value={targetDir}
                    onChange={(e) => {
                      setTargetDir(e.target.value);
                      setSaveResult(null);
                      setSaveError(null);
                    }}
                    placeholder={nativeHome ? `${nativeHome}/Projects/my-app-spec` : '/home/ubuntu/Projects/my-app-spec'}
                    className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/25 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                  {isNativeDesktop && (
                    <span className="inline-flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={handleBrowseFolder}
                        className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer"
                      >
                        <FolderSearch className="w-3.5 h-3.5 text-[#D0BCFF]" />
                        <span>Browse Folder…</span>
                      </button>
                      <HelpBadge tooltipKey="action-browse-folder" />
                    </span>
                  )}
                </div>

                {pathCheck.valid ? (
                  <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#34D399]/10 border border-[#34D399]/30 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-[#34D399] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      Canonical Rust Path Verified:
                    </span>
                    <span className="font-mono text-white truncate">{pathCheck.canonicalPath}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/40 text-xs text-[#FFB4AB]">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-[#EF4444]" />
                    <span>{pathCheck.error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Files to Write Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">
                  2. Specification Bundle Manifest (4 Files)
                </span>
                <span className="text-xs font-mono text-[#A78BFA] tabular-nums">
                  Total Payload: {(totalBytes / 1024).toFixed(2)} KB ({totalBytes.toLocaleString()} bytes)
                </span>
              </div>

              <div className="rounded-xl bg-[#0F0C1B]/90 border border-[#C084FC]/20 divide-y divide-[#C084FC]/15">
                {fileRows.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-mono font-semibold text-white">{file.name}</span>
                      <span className="text-[#958EA0] ml-2 font-mono tabular-nums">
                        · {file.lines} lines · {file.bytes.toLocaleString()} B
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerBrowserFileDownload(file.name, file.content)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#E9D5FF] hover:bg-[#8B5CF6]/20 border border-[#C084FC]/20 transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download {file.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Direct Download Toggle (Web Preview Only) */}
            {!isNativeDesktop && (
              <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#141120] border border-[#C084FC]/20 cursor-pointer">
                <div>
                  <div className="text-xs font-medium text-white">
                    Trigger direct browser downloads for all 4 files on save
                  </div>
                  <div className="text-[11px] text-[#958EA0]">
                    Automatically downloads AGENTS.md, spec.md, plan.md, and tasks.md while previewing in browser
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={downloadOnSave}
                  onChange={(e) => setDownloadOnSave(e.target.checked)}
                  className="w-4 h-4 accent-[#8B5CF6] rounded cursor-pointer"
                />
              </label>
            )}

            {saveError && (
              <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 text-xs text-[#FFB4AB] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            {saveResult && (
              <div className="p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/35 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#34D399] font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Specification Bundle Saved Successfully
                  </span>
                  <span className="font-mono text-[11px] tabular-nums">
                    {saveResult.mode === 'tauri-native' ? 'Tauri IPC Native' : 'Ubuntu Preview + Direct Download'}
                  </span>
                </div>
                <p className="text-[#E9D5FF] font-mono text-[11px]">
                  Target: {saveResult.canonicalDir}/&#123;AGENTS.md, spec.md, plan.md, tasks.md&#125;
                </p>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="pf-btn-secondary px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </Dialog.Close>
              <button
                type="button"
                disabled={!pathCheck.valid || saving}
                onClick={handleConfirmSave}
                className="pf-btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>{saving ? 'Writing Bundle...' : 'Write Bundle to Disk'}</span>
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### `src/components/Tooltip.tsx`

```tsx
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
    <TooltipPrimitive.Provider delayDuration={100}>
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
```

## Frontend Decks

### `src/decks/ArchitectureDeck.tsx`

```tsx
import React from 'react';
import { Gauge, HelpCircle, Lock, Moon, WifiOff } from 'lucide-react';
import {
  ClarificationItem,
  GroundRules,
  MiniGrillTopic,
  ProjectState,
} from '../types/project';
import { DeckCard } from '../components/Card';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge } from '../components/Tooltip';

interface ArchitectureDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
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

export function ArchitectureDeck({
  state,
  onUpdate,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
}: ArchitectureDeckProps) {
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

  const applyGroundRuleMiniGrill = (q: ClarificationItem, opt: string) => {
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

  const activeCount = Object.values(state.groundRules).filter(Boolean).length;

  return (
    <DeckCard
      id="deck-architecture"
      stepNumber="02."
      title="Everyday Ground Rules & Quality Guardrails"
      subtitle="Toggle how your app should behave in the real world. Each switch automatically writes non-negotiable engineering rules into your specification."
      tooltipKey="deck-architecture"
      headerRight={
        <div className="flex flex-wrap items-center gap-2.5">
          <MiniGrillButton
            label="Mini Grill Rules"
            loading={miniGrillLoadingTopic === 'groundRules'}
            disabled={
              Boolean(miniGrillLoadingTopic) && miniGrillLoadingTopic !== 'groundRules'
            }
            onClick={() => void onMiniGrill('groundRules')}
          />
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#34D399] tabular-nums">
            <span>{activeCount} of 4 guardrails active</span>
            <HelpBadge tooltipKey="deck-architecture" />
          </span>
        </div>
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

      <MiniGrillPanel
        title="Sharpen Ground Rules"
        questions={miniGrillQuestions.groundRules ?? []}
        onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('groundRules', qId, opt)}
        onApplyToSection={applyGroundRuleMiniGrill}
        onClose={() => onDismissMiniGrill('groundRules')}
      />
    </DeckCard>
  );
}
```

### `src/decks/ExporterDeck.tsx`

```tsx
import React, { useState } from 'react';
import { HardDrive, Sparkles } from 'lucide-react';
import { ExportPlatformId, ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, HelpBadge } from '../components/Tooltip';
import { compilePlatformContract } from '../services/compiler';
import { CodeViewer } from '../components/CodeViewer';

interface ExporterDeckProps {
  state: ProjectState;
  onOpenSaveModal: () => void;
  onUpdateVariable: (key: string, value: string) => void;
}

const PLATFORMS: Array<{
  id: ExportPlatformId;
  label: string;
  tooltipKey: string;
  secondary?: boolean;
}> = [
  { id: 'stitch', label: 'Google Stitch', tooltipKey: 'platform-stitch' },
  { id: 'aistudio', label: 'Google AI Studio', tooltipKey: 'platform-aistudio' },
  { id: 'antigravity', label: 'Google Antigravity (AGY)', tooltipKey: 'platform-antigravity' },
  { id: 'canvas', label: 'Gemini Canvas', tooltipKey: 'platform-canvas' },
  { id: 'local-ollama', label: 'Local AI (Ollama)', tooltipKey: 'platform-local-ollama' },
  { id: 'copilot', label: 'Copilot (Optional)', tooltipKey: 'platform-copilot', secondary: true },
];

export function ExporterDeck({
  state,
  onOpenSaveModal,
  onUpdateVariable,
}: ExporterDeckProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<ExportPlatformId>('stitch');

  const compiled = compilePlatformContract(state, selectedPlatform);

  return (
    <DeckCard
      id="deck-exporter"
      stepNumber="06."
      title="Targeted Multi-Platform Contract Exporter"
      subtitle="Select your target AI platform to generate a ready-to-paste prompt contract, or write your markdown & agent specs directly to your computer."
      tooltipKey="deck-exporter"
      headerRight={
        <span className="inline-flex items-center gap-1.5">
          <ExplainerTooltip tooltipKey="action-save-computer" side="top">
            <button
              type="button"
              onClick={onOpenSaveModal}
              className="pf-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Save Bundle to Computer</span>
            </button>
          </ExplainerTooltip>
          <HelpBadge tooltipKey="action-save-computer" side="top" />
        </span>
      }
    >
      <div className="space-y-4">
        {/* Platform Selector Tabs */}
        <div
          role="tablist"
          aria-label="Target AI Platform Contracts"
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0F0C1B]/90 border border-[#C084FC]/20"
        >
          {PLATFORMS.map((plat) => {
            const active = selectedPlatform === plat.id;
            return (
              <ExplainerTooltip key={plat.id} tooltipKey={plat.tooltipKey} side="top">
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedPlatform(plat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#8B5CF6] text-white font-medium shadow-sm'
                      : plat.secondary
                      ? 'ml-auto text-[11px] font-normal text-[#958EA0] hover:text-[#CBC3D7] hover:bg-white/5'
                      : 'font-medium text-[#CBC3D7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {plat.label}
                </button>
              </ExplainerTooltip>
            );
          })}
        </div>

        {/* Platform Context Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#141120] border border-[#C084FC]/20 text-xs">
          <div className="flex items-center gap-2 text-[#E9D5FF]">
            <Sparkles className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
            <span className="font-semibold text-white">{compiled.title}</span>
            <span aria-hidden="true" className="text-[#958EA0]">·</span>
            <span className="text-[#CBC3D7]">{compiled.subtitle}</span>
          </div>
          <span className="font-mono text-[11px] text-[#A78BFA]">{compiled.badge}</span>
        </div>

        {/* Live Compiled Prompt Contract */}
        <CodeViewer
          filename={`${state.appName.toLowerCase().replace(/\s+/g, '-')}-${selectedPlatform}-prompt.md`}
          content={compiled.promptText}
          badgeLabel={compiled.badge}
          templateVariables={state.proConfig.templateVariables}
          onUpdateVariable={onUpdateVariable}
        />
      </div>
    </DeckCard>
  );
}
```

### `src/decks/GrillDeck.tsx`

```tsx
import React from 'react';
import { CheckCircle2, Loader2, MessageSquare, RefreshCw, Sparkles, Trash2 } from 'lucide-react';
import { ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, HelpBadge } from '../components/Tooltip';

interface GrillDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onGrillMe: () => Promise<void>;
  isGrilling: boolean;
  isAutoRefreshing?: boolean;
  lastSyncedAt?: string | null;
}

export function GrillDeck({
  state,
  onUpdate,
  onGrillMe,
  isGrilling,
  isAutoRefreshing = false,
  lastSyncedAt = null,
}: GrillDeckProps) {
  const handleSelectAnswer = (questionId: string, option: string) => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.map((item) =>
        item.id === questionId ? { ...item, selectedAnswer: option } : item
      ),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleRemoveQuestion = (questionId: string) => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.filter((item) => item.id !== questionId),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleClearAllQuestions = () => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: [],
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <DeckCard
      id="deck-grill"
      stepNumber="03."
      title={'"Grill Me" — Dynamic Clarification Interview'}
      subtitle="Asks 5 targeted follow-up questions per round while keeping all previous questions & answers remembered."
      tooltipKey="deck-grill"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0C1B]/85 border border-[#C084FC]/20 text-[11px] text-[#CBC3D7]">
            {isAutoRefreshing || isGrilling ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-[#EC4899]" />
                <span>Appending fresh questions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-[#34D399]" />
                <span>
                  {lastSyncedAt
                    ? `${state.clarifications.length} saved · synced ${new Date(
                        lastSyncedAt
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : `${state.clarifications.length} remembered Q&A`}
                </span>
              </>
            )}
          </span>

          {state.clarifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllQuestions}
              className="pf-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-[#CBC3D7] hover:text-[#FFB4AB] whitespace-nowrap shrink-0 cursor-pointer"
              title="Clear saved clarification questions"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1">
            <ExplainerTooltip tooltipKey="action-grill-me" side="bottom">
              <button
                type="button"
                onClick={onGrillMe}
                disabled={isGrilling}
                className="pf-btn-primary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isGrilling ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MessageSquare className="w-3.5 h-3.5" />
                )}
                <span>
                  {isGrilling
                    ? 'Asking 5 Questions...'
                    : state.clarifications.length > 0
                    ? 'Grill Me (+5 More Questions)'
                    : 'Grill Me (Ask 5 Questions)'}
                </span>
              </button>
            </ExplainerTooltip>
            <HelpBadge tooltipKey="action-grill-me" side="bottom" />
          </span>
        </div>
      }
    >
      {state.clarifications.length === 0 ? (
        <div className="p-6 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 text-center space-y-3">
          <Sparkles className="w-6 h-6 text-[#A78BFA] mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">
              No Clarification Questions Generated Yet
            </h3>
            <p className="text-xs text-[#CBC3D7] max-w-md mx-auto">
              Click "Grill Me" above—or edit your idea above—so AI can spot edge cases and suggest 5 tailored multiple-choice decisions while remembering your prior answers.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {state.clarifications.map((item, qIndex) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#0F0C1B]/85 border border-[#C084FC]/20 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-[#A78BFA]">
                  <span className="font-mono font-semibold tabular-nums">
                    Q{qIndex + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#EC4899]">{item.category}</span>
                  <HelpBadge tooltipKey="deck-grill" />
                </div>
                <div className="flex items-center gap-2">
                  {item.selectedAnswer && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#34D399]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Folded into spec.md & AGENTS.md</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(item.id)}
                    aria-label={`Remove question ${qIndex + 1}`}
                    className="p-1 rounded-md text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-sm font-semibold text-white">{item.question}</p>

              <div className="grid grid-cols-1 gap-2">
                {item.options.map((opt) => {
                  const selected =
                    (item.selectedAnswer || item.options[0]) === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectAnswer(item.id, opt)}
                      className={`px-3.5 py-2.5 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        selected
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white font-medium'
                          : 'bg-[#141120]/90 border-[#C084FC]/15 text-[#CBC3D7] hover:border-[#C084FC]/40'
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                            : 'border-[#958EA0]/50'
                        }`}
                      >
                        {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </DeckCard>
  );
}
```

### `src/decks/ManifestDeck.tsx`

```tsx
import React, { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Globe,
  Loader2,
  Monitor,
  Plus,
  RotateCcw,
  Smartphone,
  Sparkles,
  Terminal,
  Trash2,
  Wand2,
} from 'lucide-react';
import {
  ClarificationItem,
  CodingLanguageId,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  TargetPlatform,
} from '../types/project';
import { CODING_LANGUAGES } from '../services/presets';
import { FillFieldResponse, LanguageAdvisorResponse } from '../services/geminiClient';
import { DeckCard } from '../components/Card';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface ManifestDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFleshOutIdea: () => Promise<void>;
  onRandomAiIdea: () => Promise<void>;
  onFillField: (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ) => Promise<FillFieldResponse | null>;
  fillingField: FillableFieldId | null;
  isExpanding: boolean;
  isGeneratingRandom: boolean;
  canUndoExpansion: boolean;
  onUndoExpansion: () => void;
  onMiniGrill: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic: MiniGrillTopic | null;
  miniGrillQuestions: Partial<Record<MiniGrillTopic, ClarificationItem[]>>;
  onSelectMiniGrillAnswer: (
    topic: MiniGrillTopic,
    questionId: string,
    option: string
  ) => void;
  onDismissMiniGrill: (topic: MiniGrillTopic) => void;
  onRecommendLanguage: () => Promise<void>;
  isRecommendingLanguage: boolean;
  languageAdvice: LanguageAdvisorResponse | null;
}

const PLATFORMS: Array<{
  id: TargetPlatform;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'desktop',
    label: 'Desktop App',
    desc: 'Native Ubuntu / Windows / Mac window',
    icon: Monitor,
  },
  {
    id: 'web',
    label: 'Web Browser',
    desc: 'Runs in any modern desktop or mobile browser',
    icon: Globe,
  },
  {
    id: 'mobile',
    label: 'Mobile Phone',
    desc: 'Thumb-friendly layout for iOS & Android',
    icon: Smartphone,
  },
  {
    id: 'cli',
    label: 'Command Line',
    desc: 'Fast keyboard-driven terminal tool',
    icon: Terminal,
  },
];

export function ManifestDeck({
  state,
  onUpdate,
  onFleshOutIdea,
  onRandomAiIdea,
  onFillField,
  fillingField,
  isExpanding,
  isGeneratingRandom,
  canUndoExpansion,
  onUndoExpansion,
  onMiniGrill,
  miniGrillLoadingTopic,
  miniGrillQuestions,
  onSelectMiniGrillAnswer,
  onDismissMiniGrill,
  onRecommendLanguage,
  isRecommendingLanguage,
  languageAdvice,
}: ManifestDeckProps) {
  const [newStepText, setNewStepText] = useState('');

  const handleAddStep = () => {
    const trimmed = newStepText.trim();
    if (!trimmed) return;
    onUpdate((prev) => ({
      ...prev,
      features: [...prev.features, trimmed],
      lastUpdated: new Date().toISOString(),
    }));
    setNewStepText('');
  };

  const handleFillNextStep = async () => {
    const res = await onFillField('nextStep', { currentValue: newStepText });
    if (res?.value) {
      setNewStepText(res.value);
    }
  };

  const handleRemoveStep = (index: number) => {
    onUpdate((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleUpdateStep = (index: number, value: string) => {
    onUpdate((prev) => {
      const updated = [...prev.features];
      updated[index] = value;
      return {
        ...prev,
        features: updated,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const cleanChoice = (opt: string) => opt.replace(/^\(Recommended\)\s*/i, '').trim();

  const applyIdeaMiniGrill = (q: ClarificationItem, opt: string) => {
    const detail = `${q.category}: ${cleanChoice(opt)}`;
    onUpdate((prev) => {
      if (prev.coreIdea.includes(detail)) return prev;
      const sep = prev.coreIdea.trim() ? '\n\n' : '';
      return {
        ...prev,
        coreIdea: `${prev.coreIdea.trim()}${sep}${detail}.`,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyFeatureMiniGrill = (q: ClarificationItem, opt: string) => {
    const featureEntry = `${q.category}: ${cleanChoice(opt)}`;
    onUpdate((prev) => {
      if (prev.features.some((f) => f === featureEntry)) return prev;
      return {
        ...prev,
        features: [...prev.features, featureEntry],
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyLanguageMiniGrill = (q: ClarificationItem, opt: string) => {
    const noteEntry = `${q.category}: ${cleanChoice(opt)}`;
    onUpdate((prev) => {
      const existingNote = prev.codingLanguageNote ?? '';
      if (existingNote.includes(noteEntry)) return prev;
      const sep = existingNote.trim() ? ' • ' : '';
      return {
        ...prev,
        codingLanguageNote: `${existingNote.trim()}${sep}${noteEntry}`,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const anyAiBusy =
    Boolean(fillingField) ||
    isExpanding ||
    isGeneratingRandom ||
    Boolean(miniGrillLoadingTopic) ||
    isRecommendingLanguage;

  const selectedLanguageMeta =
    CODING_LANGUAGES.find((lang) => lang.id === state.codingLanguage) ?? CODING_LANGUAGES[0];

  return (
    <DeckCard
      id="deck-manifest"
      stepNumber="01."
      title="Project Manifest & Plain-Language Idea"
      subtitle="Answer four everyday questions—your big idea, target device, feature list, and coding language. PromptForge translates everything automatically."
      tooltipKey="deck-manifest"
      headerRight={
        <div className="flex flex-wrap items-center gap-2">
          {canUndoExpansion && (
            <button
              type="button"
              onClick={onUndoExpansion}
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo AI Expansion</span>
            </button>
          )}

          <span className="inline-flex items-center gap-1">
            <ExplainerTooltip tooltipKey="action-random-ai" side="bottom">
              <button
                type="button"
                onClick={onRandomAiIdea}
                disabled={isGeneratingRandom || isExpanding}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingRandom ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EC4899]" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5 text-[#EC4899]" />
                )}
                <span>{isGeneratingRandom ? 'Inventing Idea...' : 'Random AI Idea'}</span>
              </button>
            </ExplainerTooltip>
            <HelpBadge tooltipKey="action-random-ai" side="bottom" />
          </span>

          <span className="inline-flex items-center gap-1">
            <ExplainerTooltip tooltipKey="action-flesh-out" side="bottom">
              <button
                type="button"
                onClick={onFleshOutIdea}
                disabled={isExpanding || isGeneratingRandom}
                className="pf-btn-primary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isExpanding ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isExpanding ? 'Fleshing Out...' : 'Flesh Out My Idea'}</span>
              </button>
            </ExplainerTooltip>
            <HelpBadge tooltipKey="action-flesh-out" side="bottom" />
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* App Name & Tagline Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 space-y-1.5">
            <LabelWithTooltip
              label="App Name"
              tooltipKey="field-app-name"
              htmlFor="input-app-name"
            />
            <div className="flex items-center gap-2">
              <input
                id="input-app-name"
                type="text"
                value={state.appName}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    appName: e.target.value,
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                placeholder="e.g., PulseVault"
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm font-medium text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <FillWithAiButton
                fieldLabel="App Name"
                loading={fillingField === 'appName'}
                disabled={fillingField === 'appName'}
                onClick={() => void onFillField('appName', { currentValue: state.appName })}
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-1.5">
            <LabelWithTooltip
              label="One-Sentence Summary"
              tooltipKey="field-tagline"
              htmlFor="input-tagline"
            />
            <div className="flex items-center gap-2">
              <input
                id="input-tagline"
                type="text"
                value={state.tagline}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    tagline: e.target.value,
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                placeholder="What does this app do in one friendly sentence?"
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <FillWithAiButton
                fieldLabel="One-Sentence Summary"
                loading={fillingField === 'tagline'}
                disabled={fillingField === 'tagline'}
                onClick={() => void onFillField('tagline', { currentValue: state.tagline })}
              />
            </div>
          </div>
        </div>

        {/* Question 1: What's the Big Idea? */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q1"
              label="What is the big idea? (Plain English)"
              tooltipKey="field-core-idea"
              htmlFor="textarea-core-idea"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                {state.coreIdea.length} chars (unlimited)
              </span>
              <MiniGrillButton
                label="Mini Grill Idea"
                loading={miniGrillLoadingTopic === 'idea'}
                disabled={anyAiBusy && miniGrillLoadingTopic !== 'idea'}
                onClick={() => void onMiniGrill('idea')}
              />
              <FillWithAiButton
                fieldLabel="Big Idea"
                loading={fillingField === 'coreIdea'}
                disabled={fillingField === 'coreIdea'}
                onClick={() => void onFillField('coreIdea', { currentValue: state.coreIdea })}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-[#0F0C1B]/85 border border-[#C084FC]/25 focus-within:ring-2 focus-within:ring-[#8B5CF6] transition-shadow">
            <textarea
              id="textarea-core-idea"
              rows={5}
              value={state.coreIdea}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  coreIdea: e.target.value,
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="Write as much detail as you want in plain, everyday words. Who is it for, what problem does it solve, and how should it feel?"
              className="w-full p-4 bg-transparent text-sm leading-relaxed text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none resize-y rounded-2xl"
            />
          </div>

          <MiniGrillPanel
            title="Sharpen Big Idea"
            questions={miniGrillQuestions.idea ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('idea', qId, opt)}
            onApplyToSection={applyIdeaMiniGrill}
            onClose={() => onDismissMiniGrill('idea')}
          />
        </div>

        {/* Question 2: Where Will People Use It? */}
        <div className="space-y-2.5">
          <LabelWithTooltip
            stepBadge="Q2"
            label="Where will people use it?"
            tooltipKey="field-target-platform"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PLATFORMS.map((plat) => {
              const Icon = plat.icon;
              const selected = state.targetPlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      targetPlatform: plat.id,
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.25)]'
                      : 'bg-[#0F0C1B]/75 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-white">{plat.label}</span>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        selected ? 'text-[#D0BCFF]' : 'text-[#A78BFA]/70'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] leading-snug text-[#CBC3D7]">{plat.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Feature List */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q3"
              label="Feature List (What should this app let people do?)"
              tooltipKey="field-features"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                {state.features.length} features listed
              </span>
              <MiniGrillButton
                label="Mini Grill Features"
                loading={miniGrillLoadingTopic === 'features'}
                disabled={anyAiBusy && miniGrillLoadingTopic !== 'features'}
                onClick={() => void onMiniGrill('features')}
              />
            </div>
          </div>

          <div className="space-y-2">
            {state.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 focus-within:border-[#8B5CF6]"
              >
                <span className="w-6 text-center text-xs font-mono font-semibold text-[#A78BFA] tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleUpdateStep(index, e.target.value)}
                  aria-label={`Feature ${index + 1}`}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-[#E9D5FF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  aria-label={`Remove feature ${index + 1}`}
                  className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Step / Feature Input */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1">
              <input
                type="text"
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddStep();
                  }
                }}
                placeholder="Add another feature or user action (e.g., Export monthly summary as a clean PDF)..."
                className="flex-1 min-w-[200px] px-3.5 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <HelpBadge tooltipKey="field-add-step" />
              <FillWithAiButton
                fieldLabel="Next Feature"
                loading={fillingField === 'nextStep'}
                disabled={fillingField === 'nextStep'}
                onClick={() => void handleFillNextStep()}
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="pf-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          <MiniGrillPanel
            title="Add Missing Features"
            questions={miniGrillQuestions.features ?? []}
            onSelectAnswer={(qId, opt) => onSelectMiniGrillAnswer('features', qId, opt)}
            onApplyToSection={applyFeatureMiniGrill}
            onClose={() => onDismissMiniGrill('features')}
          />
        </div>

        {/* Question 4: Coding Language & AI Advisor */}
        <div className="pt-2 border-t border-[#C084FC]/15 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q4"
              label="Coding Language & Stack Choice"
              tooltipKey="field-coding-language"
            />
            <div className="flex flex-wrap items-center gap-2">
              <MiniGrillButton
                label="Mini Grill Stack"
                loading={miniGrillLoadingTopic === 'codingLanguage'}
                disabled={anyAiBusy && miniGrillLoadingTopic !== 'codingLanguage'}
                onClick={() => void onMiniGrill('codingLanguage')}
              />
              <span className="inline-flex items-center gap-1">
                <ExplainerTooltip tooltipKey="action-language-advisor" side="top">
                  <button
                    type="button"
                    onClick={() => void onRecommendLanguage()}
                    disabled={isRecommendingLanguage}
                    className="pf-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    {isRecommendingLanguage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Code2 className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isRecommendingLanguage
                        ? 'Analyzing Languages...'
                        : "Ask AI: What's Best for What?"}
                    </span>
                  </button>
                </ExplainerTooltip>
                <HelpBadge tooltipKey="action-language-advisor" side="top" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {CODING_LANGUAGES.map((lang) => {
              const isSelected = state.codingLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      codingLanguage: lang.id as CodingLanguageId,
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5E6AD2]/20 border-[#5E6AD2] text-white shadow-[0_0_16px_rgba(94,106,210,0.25)]'
                      : 'bg-[#0F0C1B]/75 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-white">{lang.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A5B4FC] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] leading-snug text-[#D0BCFF]/90">
                    <span className="font-semibold text-[#34D399]">Best for: </span>
                    {lang.bestFor}
                  </p>
                  <p className="text-[10.5px] leading-snug text-[#958EA0] mt-1">
                    {lang.tradeoffs}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Language Advisor AI Result */}
          {languageAdvice && (
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#5E6AD2]/40 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#34D399]">
                    AI Language Recommendation
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Best Match: {languageAdvice.recommendedLabel}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate((prev) => ({
                      ...prev,
                      codingLanguage: languageAdvice.recommendedId,
                      lastUpdated: new Date().toISOString(),
                    }))
                  }
                  className="pf-btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Use {languageAdvice.recommendedLabel}</span>
                </button>
              </div>
              <p className="text-xs leading-relaxed text-[#E2E8F0]">{languageAdvice.summary}</p>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                <span className="font-semibold text-[#C7D2FE]">Trade-offs: </span>
                {languageAdvice.tradeoffs}
              </p>

              {languageAdvice.comparisons.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {languageAdvice.comparisons.map((comp) => (
                    <div
                      key={comp.language}
                      className="p-2.5 rounded-lg bg-[#131620] border border-[#1D2230] space-y-1"
                    >
                      <div className="text-xs font-semibold text-white">{comp.language}</div>
                      <div className="text-[11px] text-[#34D399]">
                        <span className="font-semibold">Best for: </span>
                        {comp.bestFor}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] leading-snug">
                        {comp.whyConsiderOrSkip}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Optional Language Notes Blank */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label={`Language & Library Notes (${selectedLanguageMeta.shortTag})`}
                tooltipKey="field-coding-language-note"
                htmlFor="input-coding-language-note"
              />
              <FillWithAiButton
                fieldLabel="Language Preferences"
                loading={fillingField === 'codingLanguageNote'}
                disabled={fillingField === 'codingLanguageNote'}
                onClick={() =>
                  void onFillField('codingLanguageNote', {
                    currentValue: state.codingLanguageNote,
                  })
                }
              />
            </div>
            <input
              id="input-coding-language-note"
              type="text"
              value={state.codingLanguageNote}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  codingLanguageNote: e.target.value,
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="Optional: specific libraries, UI kits, or coding preferences..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <MiniGrillPanel
            title="Refine Language & Stack"
            questions={miniGrillQuestions.codingLanguage ?? []}
            onSelectAnswer={(qId, opt) =>
              onSelectMiniGrillAnswer('codingLanguage', qId, opt)
            }
            onApplyToSection={applyLanguageMiniGrill}
            onClose={() => onDismissMiniGrill('codingLanguage')}
          />
        </div>
      </div>
    </DeckCard>
  );
}
```

### `src/decks/TasksDeck.tsx`

```tsx
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
    const res = await onFillField('templateVariable', { currentValue: newVarKey });
    if (res?.value) {
      setNewVarKey(res.value.trim().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase());
      setNewVarVal(res.secondaryValue || '');
    }
  };

  const handleFillCustomRule = async () => {
    const res = await onFillField('customRule', { currentValue: newRule });
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
                  disabled={fillingField === field}
                  onClick={() =>
                    void onFillField(field, { currentValue: state.proConfig[field] })
                  }
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
              disabled={fillingField === 'templateVariable'}
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
              disabled={fillingField === 'customRule'}
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
```

### `src/decks/WorkflowDeck.tsx`

```tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileCode2,
  FolderOutput,
  ImagePlus,
  LayoutGrid,
  Loader2,
  Palette,
  Plus,
  Rocket,
  Sparkles,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import {
  AgentLane,
  ClarificationItem,
  FillableFieldId,
  MiniGrillTopic,
  ProjectState,
  StitchScreenPrompt,
  UploadedIdeaImage,
  WorkflowProgress,
} from '../types/project';
import {
  compileAgentsMd,
  compileCollaborationMd,
  compileContinueRules,
  compilePlanMd,
  compilePlatformContract,
  compileSpecMd,
  compileStitchScreenPrompt,
  compileTasksMd,
  recommendBuildWorkflow,
} from '../services/compiler';
import {
  DEFAULT_LOCAL_AGENTS,
  DEFAULT_MULTI_AGENT,
  DEFAULT_STITCH_UI,
  OLLAMA_MODEL_PRESETS,
} from '../services/presets';
import { FillFieldResponse } from '../services/geminiClient';
import { triggerBrowserFileDownload } from '../services/tauriBridge';
import { DeckCard } from '../components/Card';
import { CodeViewer } from '../components/CodeViewer';
import { FillWithAiButton } from '../components/FillWithAiButton';
import { MiniGrillButton, MiniGrillPanel } from '../components/MiniGrillSection';
import { ExplainerTooltip, HelpBadge, LabelWithTooltip } from '../components/Tooltip';

interface WorkflowDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFillField: (
    field: FillableFieldId,
    options?: { currentValue?: string }
  ) => Promise<FillFieldResponse | null>;
  fillingField: FillableFieldId | null;
  onMiniGrill: (topic: MiniGrillTopic) => Promise<void>;
  miniGrillLoadingTopic: MiniGrillTopic | null;
  onStitchSurprise: () => Promise<void>;
  isGeneratingSurprise: boolean;
  onOpenSaveModal: () => void;
  onUpdateVariable: (key: string, value: string) => void;
}

const DEFAULT_PROGRESS: WorkflowProgress = {
  stitchDone: false,
  builderDone: false,
  polishDone: false,
};

const TEXT_EXTENSIONS = new Set([
  'html',
  'htm',
  'txt',
  'md',
  'json',
  'svg',
  'css',
  'js',
  'ts',
  'tsx',
  'jsx',
]);

function IdeaImageThumb({ dataUrl, name }: { dataUrl: string; name: string }) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const match = dataUrl
      .trim()
      .match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)$/i);
    if (!match) {
      setObjectUrl(null);
      return;
    }
    const subtype = match[1].toLowerCase() === 'jpg' ? 'jpeg' : match[1].toLowerCase();
    try {
      const binary = atob(match[2]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: `image/${subtype}` });
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } catch {
      setObjectUrl(null);
      return undefined;
    }
  }, [dataUrl]);

  if (!objectUrl) {
    return (
      <div className="w-full h-24 flex items-center justify-center text-[10px] text-[#958EA0] bg-[#141122]">
        Preview unavailable
      </div>
    );
  }

  return <img src={objectUrl} alt={name} className="w-full h-24 object-cover" />;
}

function generateSafeId(prefix: string): string {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

export function WorkflowDeck({
  state,
  onUpdate,
  onFillField,
  fillingField,
  onMiniGrill,
  miniGrillLoadingTopic,
  onStitchSurprise,
  isGeneratingSurprise,
  onOpenSaveModal,
  onUpdateVariable,
}: WorkflowDeckProps) {
  const ideaImageInputRef = useRef<HTMLInputElement>(null);
  const stitchResultInputRef = useRef<HTMLInputElement>(null);
  const [copiedMdKey, setCopiedMdKey] = useState<string | null>(null);
  const [fillingScreenId, setFillingScreenId] = useState<string | null>(null);

  const stitchUi = state.stitchUi ?? DEFAULT_STITCH_UI;
  const stitchScreens = stitchUi.screens ?? [];
  const localAgents = state.localAgents ?? DEFAULT_LOCAL_AGENTS;
  const multiAgent = state.multiAgent ?? DEFAULT_MULTI_AGENT;
  const workflowProgress = state.workflowProgress ?? DEFAULT_PROGRESS;

  const workflow = recommendBuildWorkflow(state);
  const stitchContract = compilePlatformContract(state, 'stitch');

  const completedCount = [
    workflowProgress.stitchDone,
    workflowProgress.builderDone,
    workflowProgress.polishDone,
  ].filter(Boolean).length;

  const handleUploadIdeaImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const loaded = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<UploadedIdeaImage | null>((resolve) => {
            if (!file.type.startsWith('image/')) {
              resolve(null);
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                resolve({
                  id: generateSafeId(`img-${file.name.replace(/[^a-z0-9]/gi, '')}`),
                  name: file.name,
                  mimeType: file.type,
                  dataUrl: reader.result,
                });
              } else {
                resolve(null);
              }
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          })
      )
    );

    const validImages = loaded.filter((img): img is UploadedIdeaImage => img !== null);
    if (validImages.length === 0) return;

    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          ideaImages: [...currentStitch.ideaImages, ...validImages],
        },
        lastUpdated: new Date().toISOString(),
      };
    });

    if (ideaImageInputRef.current) {
      ideaImageInputRef.current.value = '';
    }
  };

  const handleRemoveIdeaImage = (imageId: string) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          ideaImages: currentStitch.ideaImages.filter((img) => img.id !== imageId),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleAddStitchScreen = () => {
    const newScreen: StitchScreenPrompt = {
      id: generateSafeId('screen'),
      name: `Screen ${stitchScreens.length + 1}`,
      kind: 'screen',
      notes: '',
    };
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          screens: [...(currentStitch.screens ?? []), newScreen],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleUpdateStitchScreen = (
    screenId: string,
    patch: Partial<StitchScreenPrompt>
  ) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          screens: (currentStitch.screens ?? []).map((item) =>
            item.id === screenId ? { ...item, ...patch } : item
          ),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleRemoveStitchScreen = (screenId: string) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          screens: (currentStitch.screens ?? []).filter((item) => item.id !== screenId),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleFillStitchScreen = async (screen: StitchScreenPrompt) => {
    setFillingScreenId(screen.id);
    try {
      const res = await onFillField('stitchScreenNotes', {
        currentValue: `${screen.name} (${screen.kind}): ${screen.notes}`,
      });
      if (res?.value) {
        handleUpdateStitchScreen(screen.id, { notes: res.value });
      }
    } finally {
      setFillingScreenId(null);
    }
  };

  const handleAddAgentLane = () => {
    const newLane: AgentLane = {
      id: generateSafeId('lane'),
      agentName: `Agent ${multiAgent.lanes.length + 1} (Specialist)`,
      focusArea: 'Feature Implementation',
      status: 'ready',
      workOnPaths: 'src/features/',
      stayAwayPaths: 'src-tauri/, package.json',
      handoffNote: 'Post status update in COLLABORATION.md before finishing.',
    };
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      return {
        ...prev,
        multiAgent: {
          ...current,
          enabled: true,
          lanes: [...current.lanes, newLane],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleUpdateAgentLane = (laneId: string, patch: Partial<AgentLane>) => {
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      return {
        ...prev,
        multiAgent: {
          ...current,
          lanes: current.lanes.map((lane) =>
            lane.id === laneId ? { ...lane, ...patch } : lane
          ),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleRemoveAgentLane = (laneId: string) => {
    onUpdate((prev) => {
      const current = prev.multiAgent ?? DEFAULT_MULTI_AGENT;
      return {
        ...prev,
        multiAgent: {
          ...current,
          lanes: current.lanes.filter((lane) => lane.id !== laneId),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleUploadStitchResult = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    const isTextLike = file.type.startsWith('text/') || TEXT_EXTENSIONS.has(ext);

    let contentText = '';
    if (isTextLike) {
      contentText = await file.text();
    } else if (file.type.startsWith('image/')) {
      contentText = `Uploaded visual UI screenshot from Google Stitch: ${file.name} (${Math.round(
        file.size / 1024
      )} KB). Match this visual layout, color hierarchy, and component placement when implementing.`;
    } else {
      contentText = `Uploaded Google Stitch export archive/file: ${file.name} (${Math.round(
        file.size / 1024
      )} KB).`;
    }

    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      const currentProgress = prev.workflowProgress ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          uploadedResultName: file.name,
          uploadedResultContent: contentText,
        },
        workflowProgress: {
          ...currentProgress,
          stitchDone: true,
        },
        lastUpdated: new Date().toISOString(),
      };
    });

    if (stitchResultInputRef.current) {
      stitchResultInputRef.current.value = '';
    }
  };

  const handleSelectUiClarification = (questionId: string, option: string) => {
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          uiClarifications: currentStitch.uiClarifications.map((item) =>
            item.id === questionId ? { ...item, selectedAnswer: option } : item
          ),
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const applyUiGrillDetail = (q: ClarificationItem, opt: string) => {
    const clean = opt.replace(/^\(Recommended\)\s*/i, '').trim();
    const detail = `${q.category}: ${clean}`;
    onUpdate((prev) => {
      const currentStitch = prev.stitchUi ?? DEFAULT_STITCH_UI;
      if (currentStitch.visualDirection.includes(detail)) return prev;
      const sep = currentStitch.visualDirection.trim() ? '\n' : '';
      return {
        ...prev,
        stitchUi: {
          ...currentStitch,
          visualDirection: `${currentStitch.visualDirection.trim()}${sep}${detail}`,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleCopyMarkdown = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMdKey(key);
      setTimeout(() => setCopiedMdKey(null), 1600);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const toggleStep = (step: 'stitchDone' | 'builderDone' | 'polishDone') => {
    onUpdate((prev) => {
      const currentProgress = prev.workflowProgress ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        workflowProgress: {
          ...currentProgress,
          [step]: !currentProgress[step],
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const mdFiles: Array<{ filename: string; content: string }> = [
    { filename: 'AGENTS.md', content: compileAgentsMd(state) },
    { filename: 'spec.md', content: compileSpecMd(state) },
    { filename: 'plan.md', content: compilePlanMd(state) },
    { filename: 'tasks.md', content: compileTasksMd(state) },
    ...(multiAgent.enabled
      ? [{ filename: 'COLLABORATION.md', content: compileCollaborationMd(state) }]
      : []),
    ...(localAgents.enabled
      ? [{ filename: '.continuerules', content: compileContinueRules(state) }]
      : []),
  ];

  const anyBusy =
    miniGrillLoadingTopic === 'stitchUi' || isGeneratingSurprise;

  return (
    <DeckCard
      id="deck-workflow"
      stepNumber="05."
      title="Guided Build Workflow & Google Stitch UI Studio"
      subtitle="Start by designing your interface in Google Stitch (with UI grilling, AI Surprise Me, and idea image uploads), upload what Stitch builds, and PromptForge picks your next tool and exact handoff prompt."
      tooltipKey="deck-workflow"
      headerRight={
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#34D399] tabular-nums">
          <span>{completedCount} of 3 build stages done</span>
          <HelpBadge tooltipKey="deck-workflow" />
        </span>
      }
    >
      <div className="space-y-6">
        {/* Stage 1: Google Stitch UI Studio */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#8B5CF6]/35 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleStep('stitchDone')}
                aria-label="Mark Step 1 Google Stitch done"
                className="text-[#A78BFA] hover:text-[#34D399] transition-colors cursor-pointer"
              >
                {workflowProgress.stitchDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA]">
                    Stage 1 · Design UI First
                  </span>
                  <HelpBadge tooltipKey="platform-stitch" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Google Stitch UI Designer Studio
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <MiniGrillButton
                label="Grill Me on UI Design"
                tooltipKey="stitch-ui-grill"
                loading={miniGrillLoadingTopic === 'stitchUi'}
                disabled={anyBusy && miniGrillLoadingTopic !== 'stitchUi'}
                onClick={() => void onMiniGrill('stitchUi')}
              />

              <span className="inline-flex items-center gap-1">
                <ExplainerTooltip tooltipKey="stitch-surprise-me" side="top">
                  <button
                    type="button"
                    onClick={() => void onStitchSurprise()}
                    disabled={isGeneratingSurprise}
                    className="pf-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingSurprise ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Palette className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isGeneratingSurprise ? 'Designing Mood...' : 'Surprise Me (AI UI)'}
                    </span>
                  </button>
                </ExplainerTooltip>
                <HelpBadge tooltipKey="stitch-surprise-me" />
              </span>
            </div>
          </div>

          {/* Upload Inspiration Images */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label="Upload Idea Images / Sketches / Screenshots"
                tooltipKey="stitch-image-upload"
              />
              <div>
                <input
                  ref={ideaImageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => void handleUploadIdeaImages(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => ideaImageInputRef.current?.click()}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5 text-[#D0BCFF]" />
                  <span>Upload Idea Images</span>
                </button>
              </div>
            </div>

            {stitchUi.ideaImages.length === 0 ? (
              <button
                type="button"
                onClick={() => ideaImageInputRef.current?.click()}
                className="w-full p-4 rounded-xl border border-dashed border-[#C084FC]/30 bg-[#141122]/60 hover:bg-[#19152B] text-center text-xs text-[#CBC3D7] transition-colors cursor-pointer"
              >
                Click to attach screenshots, doodles, or inspiration images (Gemini inspects them when you click Grill Me or Surprise Me)
              </button>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stitchUi.ideaImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative rounded-xl overflow-hidden border border-[#C084FC]/30 bg-[#0B0D12]"
                  >
                    <IdeaImageThumb dataUrl={img.dataUrl} name={img.name} />
                    <div className="px-2 py-1 text-[10px] font-mono text-[#E9D5FF] truncate bg-[#131620]">
                      {img.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIdeaImage(img.id)}
                      aria-label={`Remove ${img.name}`}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/75 text-white hover:text-[#FFB4AB] cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* UI Design Grill Me Panel */}
          <MiniGrillPanel
            title="UI Design Decisions for Google Stitch"
            questions={stitchUi.uiClarifications}
            onSelectAnswer={handleSelectUiClarification}
            onApplyToSection={applyUiGrillDetail}
            onClose={() =>
              onUpdate((prev) => ({
                ...prev,
                stitchUi: { ...(prev.stitchUi ?? DEFAULT_STITCH_UI), uiClarifications: [] },
              }))
            }
          />

          {/* Visual Direction Input */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label="Visual Direction & UI Notes for Stitch"
                tooltipKey="stitch-visual-direction"
                htmlFor="textarea-stitch-visual"
              />
              <FillWithAiButton
                fieldLabel="Visual Direction"
                loading={fillingField === 'stitchVisualDirection'}
                disabled={fillingField === 'stitchVisualDirection'}
                onClick={() =>
                  void onFillField('stitchVisualDirection', {
                    currentValue: stitchUi.visualDirection,
                  })
                }
              />
            </div>
            <textarea
              id="textarea-stitch-visual"
              rows={3}
              value={stitchUi.visualDirection}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  stitchUi: {
                    ...(prev.stitchUi ?? DEFAULT_STITCH_UI),
                    visualDirection: e.target.value,
                  },
                  lastUpdated: new Date().toISOString(),
                }))
              }
              placeholder="Describe the screens, mood, colors, navigation style, or click Surprise Me / Fill with AI..."
              className="w-full p-3.5 rounded-xl bg-[#141122]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] resize-y"
            />
          </div>

          {/* Step 1A: Copy & Run in Google Stitch */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Step 1A · Paste Master UI Design Prompt into Google Stitch</span>
                <HelpBadge tooltipKey="platform-stitch" />
              </span>
              <a
                href="https://stitch.withgoogle.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#D0BCFF] hover:text-white underline underline-offset-4"
              >
                <span>Open Google Stitch</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <CodeViewer
              filename="stitch-ui-prompt.txt"
              badgeLabel={stitchContract.badge}
              content={stitchContract.promptText}
              templateVariables={state.proConfig.templateVariables}
              onUpdateVariable={onUpdateVariable}
            />

            {/* Individual Unlimited Stitch Screen / Menu / Modal Prompts */}
            <div className="p-3.5 rounded-xl bg-[#141122]/80 border border-[#C084FC]/25 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#A78BFA]" />
                  <span className="text-xs font-semibold text-white">
                    Per-Screen & Menu Stitch Prompts ({stitchScreens.length})
                  </span>
                  <HelpBadge tooltipKey="stitch-multi-screen" />
                </div>
                <button
                  type="button"
                  onClick={handleAddStitchScreen}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#EC4899]" />
                  <span>Add Screen / Menu / Modal</span>
                </button>
              </div>

              {stitchScreens.length === 0 ? (
                <p className="text-xs text-[#CBC3D7]">
                  Add separate Stitch prompts for each screen, sidebar menu, dialog, or dashboard widget you want Stitch to generate individually.
                </p>
              ) : (
                <div className="space-y-3">
                  {stitchScreens.map((screen, idx) => (
                    <div
                      key={screen.id}
                      className="p-3 rounded-xl bg-[#0B0D12]/90 border border-[#1D2230] space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={screen.name}
                          onChange={(e) =>
                            handleUpdateStitchScreen(screen.id, { name: e.target.value })
                          }
                          placeholder="e.g., Settings Drawer, Command Menu, Dashboard"
                          className="flex-1 min-w-[160px] px-2.5 py-1.5 rounded-lg bg-[#141122] border border-[#C084FC]/25 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                        />
                        <select
                          value={screen.kind}
                          onChange={(e) =>
                            handleUpdateStitchScreen(screen.id, {
                              kind: e.target.value as StitchScreenPrompt['kind'],
                            })
                          }
                          aria-label={`Surface type for ${screen.name}`}
                          className="px-2.5 py-1.5 rounded-lg bg-[#141122] border border-[#C084FC]/25 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                        >
                          <option value="screen">Screen</option>
                          <option value="menu">Menu / Nav</option>
                          <option value="modal">Modal / Dialog</option>
                          <option value="component">Component</option>
                        </select>
                        <FillWithAiButton
                          fieldLabel={`${screen.name} Notes`}
                          loading={fillingScreenId === screen.id}
                          disabled={fillingScreenId === screen.id}
                          onClick={() => void handleFillStitchScreen(screen)}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveStitchScreen(screen.id)}
                          aria-label={`Remove ${screen.name}`}
                          className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={screen.notes}
                        onChange={(e) =>
                          handleUpdateStitchScreen(screen.id, { notes: e.target.value })
                        }
                        placeholder="Layout details, controls, states, or click Fill with AI..."
                        className="w-full p-2.5 rounded-lg bg-[#141122] border border-[#C084FC]/20 text-xs text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />

                      <CodeViewer
                        filename={`stitch-${screen.kind}-${
                          screen.name
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, '') || idx + 1
                        }.txt`}
                        badgeLabel={`${screen.kind.toUpperCase()} Prompt`}
                        content={compileStitchScreenPrompt(state, screen)}
                        templateVariables={state.proConfig.templateVariables}
                        onUpdateVariable={onUpdateVariable}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step 1B: Upload Stitch Result */}
          <div className="p-4 rounded-xl bg-[#141122]/80 border border-[#34D399]/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <LabelWithTooltip
                label="Step 1B · Upload Your Google Stitch Result"
                tooltipKey="stitch-result-upload"
              />
              <div className="flex items-center gap-2">
                <input
                  ref={stitchResultInputRef}
                  type="file"
                  accept=".html,.htm,.txt,.md,.json,.svg,.tsx,.jsx,.css,.zip,image/*"
                  className="hidden"
                  onChange={(e) => void handleUploadStitchResult(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => stitchResultInputRef.current?.click()}
                  className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>
                    {stitchUi.uploadedResultName
                      ? `Replace (${stitchUi.uploadedResultName})`
                      : 'Upload Stitch Export / Screenshot'}
                  </span>
                </button>
              </div>
            </div>

            {stitchUi.uploadedResultName ? (
              <div className="p-3 rounded-lg bg-[#0B0D12] border border-[#34D399]/35 space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[#34D399]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Uploaded: {stitchUi.uploadedResultName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate((prev) => ({
                        ...prev,
                        stitchUi: {
                          ...(prev.stitchUi ?? DEFAULT_STITCH_UI),
                          uploadedResultName: undefined,
                          uploadedResultContent: undefined,
                        },
                      }))
                    }
                    className="text-[11px] text-[#958EA0] hover:text-[#FFB4AB] cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <p className="text-[11px] font-mono text-[#CBC3D7] line-clamp-3">
                  {stitchUi.uploadedResultContent}
                </p>
              </div>
            ) : (
              <p className="text-xs text-[#CBC3D7]">
                Or paste Stitch HTML/React output or notes below once Google Stitch generates your screens.
              </p>
            )}

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <LabelWithTooltip
                  label="Handoff Notes / Stitch Code Snippet (Optional)"
                  tooltipKey="stitch-result-upload"
                  htmlFor="textarea-stitch-handoff"
                />
                <FillWithAiButton
                  fieldLabel="Handoff Notes"
                  loading={fillingField === 'uploadedResultNotes'}
                  disabled={fillingField === 'uploadedResultNotes'}
                  onClick={() =>
                    void onFillField('uploadedResultNotes', {
                      currentValue: stitchUi.uploadedResultNotes ?? '',
                    })
                  }
                />
              </div>
              <textarea
                id="textarea-stitch-handoff"
                rows={2}
                value={stitchUi.uploadedResultNotes ?? ''}
                onChange={(e) =>
                  onUpdate((prev) => ({
                    ...prev,
                    stitchUi: {
                      ...(prev.stitchUi ?? DEFAULT_STITCH_UI),
                      uploadedResultNotes: e.target.value,
                    },
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                placeholder="Paste any HTML/React code, layout feedback, or interactive behavior notes to pass to the next app..."
                className="w-full p-3 rounded-lg bg-[#0B0D12]/90 border border-[#C084FC]/20 text-xs text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Stage 2: Recommended Next App & Compiled .md Files */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#5E6AD2]/35 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleStep('builderDone')}
                aria-label="Mark Step 2 Build Next App done"
                className="text-[#A78BFA] hover:text-[#34D399] transition-colors cursor-pointer"
              >
                {workflowProgress.builderDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#34D399]">
                    Stage 2 · Recommended Next App
                  </span>
                  <HelpBadge tooltipKey="workflow-next-app" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Open Next: {workflow.nextAppName}</span>
                  <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
                </h3>
              </div>
            </div>

            <a
              href={workflow.nextAppUrl}
              target="_blank"
              rel="noreferrer"
              className="pf-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium"
            >
              <Rocket className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Open {workflow.nextAppName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs leading-relaxed text-[#E2E8F0] bg-[#131620] p-3 rounded-lg border border-[#1D2230]">
            {workflow.whyRecommended}
          </p>

          <CodeViewer
            filename={`${workflow.nextAppId}-next-step-prompt.txt`}
            badgeLabel="Includes Stitch Result + Full Spec"
            content={workflow.nextPrompt}
            templateVariables={state.proConfig.templateVariables}
            onUpdateVariable={onUpdateVariable}
          />

          {/* Quick-Access Bundle Markdown Files */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <FileCode2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Specification Markdown Files to Drop into Your Repo</span>
                <HelpBadge tooltipKey="action-save-computer" />
              </span>
              <button
                type="button"
                onClick={onOpenSaveModal}
                className="pf-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
              >
                <FolderOutput className="w-3.5 h-3.5" />
                <span>Save All {mdFiles.length} Spec Files to Computer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {mdFiles.map((file) => (
                <div
                  key={file.filename}
                  className="p-2.5 rounded-xl bg-[#131620] border border-[#1D2230] flex flex-col justify-between gap-2"
                >
                  <span className="text-xs font-mono font-semibold text-white">
                    {file.filename}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void handleCopyMarkdown(file.filename, file.content)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#0B0D12] hover:bg-[#1E2333] text-[11px] text-[#CBC3D7] hover:text-white cursor-pointer"
                    >
                      {copiedMdKey === file.filename ? (
                        <Check className="w-3 h-3 text-[#34D399]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedMdKey === file.filename ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        triggerBrowserFileDownload(file.filename, file.content)
                      }
                      aria-label={`Download ${file.filename}`}
                      className="p-1 rounded-md bg-[#0B0D12] hover:bg-[#1E2333] text-[#CBC3D7] hover:text-white cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage 3: Final Polish App */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#C084FC]/25 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleStep('polishDone')}
                aria-label="Mark Step 3 Polish done"
                className="text-[#A78BFA] hover:text-[#34D399] transition-colors cursor-pointer"
              >
                {workflowProgress.polishDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA]">
                    Stage 3 · Polish & Verify
                  </span>
                  <HelpBadge tooltipKey="platform-canvas" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Final Iteration & Polish in {workflow.polishAppName}
                </h3>
              </div>
            </div>
          </div>

          <CodeViewer
            filename={`${workflow.polishAppId}-polish-prompt.txt`}
            badgeLabel="Final Polish Contract"
            content={workflow.polishPrompt}
            templateVariables={state.proConfig.templateVariables}
            onUpdateVariable={onUpdateVariable}
          />
        </div>

        {/* Optional Add-Ons: Local AI Agents (Ollama / Continue) & Multi-Agent Collaboration */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Local AI Agents Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#C084FC]/25 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#34D399]" />
                  <h3 className="text-sm font-bold text-white">
                    Optional · Local AI Agents (Ollama / Continue)
                  </h3>
                  <HelpBadge tooltipKey="section-local-agents" />
                </div>
                <p className="text-xs text-[#CBC3D7]">
                  Include offline-first `.continuerules` and Ollama launch commands in your exported repo.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={localAgents.enabled}
                onClick={() =>
                  onUpdate((prev) => ({
                    ...prev,
                    localAgents: {
                      ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                      enabled: !(prev.localAgents ?? DEFAULT_LOCAL_AGENTS).enabled,
                    },
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                  localAgents.enabled
                    ? 'bg-[#34D399]/20 border-[#34D399]/50 text-[#34D399]'
                    : 'bg-[#141122] border-[#C084FC]/25 text-[#958EA0]'
                }`}
              >
                {localAgents.enabled ? 'Enabled' : 'Enable'}
              </button>
            </div>

            {localAgents.enabled && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label
                      htmlFor="select-local-agent-provider"
                      className="text-[11px] font-medium text-[#CBC3D7]"
                    >
                      Local Tooling
                    </label>
                    <select
                      id="select-local-agent-provider"
                      value={localAgents.provider}
                      onChange={(e) =>
                        onUpdate((prev) => ({
                          ...prev,
                          localAgents: {
                            ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                            provider: e.target.value as 'ollama' | 'continue' | 'both',
                          },
                          lastUpdated: new Date().toISOString(),
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#141122] border border-[#C084FC]/25 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="both">Ollama + Continue (.continuerules)</option>
                      <option value="ollama">Ollama CLI Only</option>
                      <option value="continue">Continue IDE Extension Only</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="select-ollama-model"
                      className="text-[11px] font-medium text-[#CBC3D7]"
                    >
                      Recommended Local Model
                    </label>
                    <select
                      id="select-ollama-model"
                      value={
                        OLLAMA_MODEL_PRESETS.includes(localAgents.ollamaModel)
                          ? localAgents.ollamaModel
                          : 'custom'
                      }
                      onChange={(e) => {
                        if (e.target.value !== 'custom') {
                          onUpdate((prev) => ({
                            ...prev,
                            localAgents: {
                              ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                              ollamaModel: e.target.value,
                            },
                            lastUpdated: new Date().toISOString(),
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#141122] border border-[#C084FC]/25 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      {OLLAMA_MODEL_PRESETS.map((preset) => (
                        <option key={preset} value={preset}>
                          {preset}
                        </option>
                      ))}
                      <option value="custom">Custom Ollama Tag</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={localAgents.ollamaModel}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        localAgents: {
                          ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                          ollamaModel: e.target.value,
                        },
                        lastUpdated: new Date().toISOString(),
                      }))
                    }
                    placeholder="qwen2.5-coder:14b"
                    aria-label="Ollama model name"
                    className="px-3 py-2 rounded-lg bg-[#141122] border border-[#C084FC]/25 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                  <input
                    type="text"
                    value={localAgents.ollamaEndpoint}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        localAgents: {
                          ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                          ollamaEndpoint: e.target.value,
                        },
                        lastUpdated: new Date().toISOString(),
                      }))
                    }
                    placeholder="http://localhost:11434"
                    aria-label="Ollama API endpoint"
                    className="px-3 py-2 rounded-lg bg-[#141122] border border-[#C084FC]/25 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-[#CBC3D7]">
                      Local Agent Guardrails (.continuerules)
                    </span>
                    <FillWithAiButton
                      fieldLabel="Local Agent Guardrails"
                      loading={fillingField === 'localAgentNotes'}
                      disabled={fillingField === 'localAgentNotes'}
                      onClick={() =>
                        void onFillField('localAgentNotes', {
                          currentValue: localAgents.notes,
                        })
                      }
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={localAgents.notes}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        localAgents: {
                          ...(prev.localAgents ?? DEFAULT_LOCAL_AGENTS),
                          notes: e.target.value,
                        },
                        lastUpdated: new Date().toISOString(),
                      }))
                    }
                    className="w-full p-2.5 rounded-lg bg-[#141122] border border-[#C084FC]/20 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>

                <CodeViewer
                  filename=".continuerules"
                  badgeLabel={`Ollama: ${localAgents.ollamaModel}`}
                  content={compileContinueRules(state)}
                  templateVariables={state.proConfig.templateVariables}
                  onUpdateVariable={onUpdateVariable}
                />
              </div>
            )}
          </div>

          {/* Multi-Agent Collaboration Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0C1B]/90 border border-[#C084FC]/25 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#EC4899]" />
                  <h3 className="text-sm font-bold text-white">
                    Optional · Multi-Agent Coordination (COLLABORATION.md)
                  </h3>
                  <HelpBadge tooltipKey="section-multi-agent" />
                </div>
                <p className="text-xs text-[#CBC3D7]">
                  Give parallel AI agents explicit Work-On vs. Stay-Away-From path boundaries and handoff notes.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={multiAgent.enabled}
                onClick={() =>
                  onUpdate((prev) => ({
                    ...prev,
                    multiAgent: {
                      ...(prev.multiAgent ?? DEFAULT_MULTI_AGENT),
                      enabled: !(prev.multiAgent ?? DEFAULT_MULTI_AGENT).enabled,
                    },
                    lastUpdated: new Date().toISOString(),
                  }))
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                  multiAgent.enabled
                    ? 'bg-[#EC4899]/20 border-[#EC4899]/50 text-[#F9A8D4]'
                    : 'bg-[#141122] border-[#C084FC]/25 text-[#958EA0]'
                }`}
              >
                {multiAgent.enabled ? 'Enabled' : 'Enable'}
              </button>
            </div>

            {multiAgent.enabled && (
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-[#CBC3D7]">
                      Shared Coordination Protocol
                    </span>
                    <FillWithAiButton
                      fieldLabel="Multi-Agent Protocol"
                      loading={fillingField === 'multiAgentProtocol'}
                      disabled={fillingField === 'multiAgentProtocol'}
                      onClick={() =>
                        void onFillField('multiAgentProtocol', {
                          currentValue: multiAgent.sharedProtocolNotes,
                        })
                      }
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={multiAgent.sharedProtocolNotes}
                    onChange={(e) =>
                      onUpdate((prev) => ({
                        ...prev,
                        multiAgent: {
                          ...(prev.multiAgent ?? DEFAULT_MULTI_AGENT),
                          sharedProtocolNotes: e.target.value,
                        },
                        lastUpdated: new Date().toISOString(),
                      }))
                    }
                    className="w-full p-2.5 rounded-lg bg-[#141122] border border-[#C084FC]/20 text-xs text-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white">
                      Agent Ownership Lanes ({multiAgent.lanes.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddAgentLane}
                      className="pf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#EC4899]" />
                      <span>Add Agent Lane</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {multiAgent.lanes.map((lane) => (
                      <div
                        key={lane.id}
                        className="p-2.5 rounded-xl bg-[#131620] border border-[#1D2230] space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={lane.agentName}
                            onChange={(e) =>
                              handleUpdateAgentLane(lane.id, { agentName: e.target.value })
                            }
                            placeholder="Agent Name"
                            className="flex-1 min-w-0 px-2.5 py-1 rounded-md bg-[#0B0D12] border border-[#C084FC]/20 text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                          />
                          <select
                            value={lane.status}
                            onChange={(e) =>
                              handleUpdateAgentLane(lane.id, {
                                status: e.target.value as AgentLane['status'],
                              })
                            }
                            aria-label={`Status for ${lane.agentName}`}
                            className="px-2 py-1 rounded-md bg-[#0B0D12] border border-[#C084FC]/20 text-[11px] text-[#E9D5FF]"
                          >
                            <option value="ready">Ready</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleRemoveAgentLane(lane.id)}
                            aria-label={`Remove ${lane.agentName}`}
                            className="p-1 text-[#958EA0] hover:text-[#FFB4AB] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          <input
                            type="text"
                            value={lane.workOnPaths}
                            onChange={(e) =>
                              handleUpdateAgentLane(lane.id, { workOnPaths: e.target.value })
                            }
                            placeholder="Work on: src/decks/..."
                            aria-label={`Work on paths for ${lane.agentName}`}
                            className="px-2 py-1 rounded-md bg-[#0B0D12] border border-[#34D399]/30 text-[11px] font-mono text-[#34D399]"
                          />
                          <input
                            type="text"
                            value={lane.stayAwayPaths}
                            onChange={(e) =>
                              handleUpdateAgentLane(lane.id, { stayAwayPaths: e.target.value })
                            }
                            placeholder="Stay away: src-tauri/, ..."
                            aria-label={`Stay away paths for ${lane.agentName}`}
                            className="px-2 py-1 rounded-md bg-[#0B0D12] border border-[#EF4444]/30 text-[11px] font-mono text-[#FDA4AF]"
                          />
                        </div>

                        <input
                          type="text"
                          value={lane.handoffNote}
                          onChange={(e) =>
                            handleUpdateAgentLane(lane.id, { handoffNote: e.target.value })
                          }
                          placeholder="Handoff / blocker note for peer agents..."
                          aria-label={`Handoff note for ${lane.agentName}`}
                          className="w-full px-2 py-1 rounded-md bg-[#0B0D12] border border-[#1D2230] text-[11px] text-[#CBC3D7]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <CodeViewer
                  filename="COLLABORATION.md"
                  badgeLabel="Shared Multi-Agent Board"
                  content={compileCollaborationMd(state)}
                  templateVariables={state.proConfig.templateVariables}
                  onUpdateVariable={onUpdateVariable}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DeckCard>
  );
}
```
