# PromptForge — Complete Codebase & Context Bundle

- **Repository**: `https://github.com/defiqantcoder/PromptForge.git` (HEAD: `9b5296b`)
- **Excluded from bundle**: `bun.lock` (lockfile), `src-tauri/icons/*` (binary icon assets), `node_modules/`, `.git/`, `target/`, `implementation_plan.md.metadata.json`, and the 3 exact-duplicate copies under `public/assets/aistudio/` (`Agents_413324f4.md`, `spec_b9cfc2d9.md`, `Tasks_2350c830.md` — identical to root `Agents.md`, `spec.md`, `Tasks.md`).

## Repository File Tree

```text
./.aistudio
./.aistudio/artifacts
./.aistudio/artifacts/brain
./.aistudio/artifacts/brain/0734aaeb-9de7-4a66-b619-9243f0676c2e
./.env.example
./.git
./.gitattributes
./.github
./.github/workflows
./.github/workflows/ci.yml
./.gitignore
./Agents.md
./README.md
./Tasks.md
./bun.lock
./index.html
./metadata.json
./package.json
./plan.md
./public
./public/assets
./public/assets/aistudio
./public/assets/aistudio/Agents_413324f4.md
./public/assets/aistudio/Image_23_b7bd6431.markdown
./public/assets/aistudio/Tasks_2350c830.md
./public/assets/aistudio/plan_1d322616.md
./public/assets/aistudio/spec_b9cfc2d9.md
./server.ts
./spec.md
./src
./src-tauri
./src-tauri/.gitignore
./src-tauri/Cargo.toml
./src-tauri/build.rs
./src-tauri/capabilities
./src-tauri/capabilities/default.json
./src-tauri/icons
./src-tauri/icons/128x128.png
./src-tauri/icons/128x128@2x.png
./src-tauri/icons/32x32.png
./src-tauri/icons/Square107x107Logo.png
./src-tauri/icons/Square142x142Logo.png
./src-tauri/icons/Square150x150Logo.png
./src-tauri/icons/Square284x284Logo.png
./src-tauri/icons/Square30x30Logo.png
./src-tauri/icons/Square310x310Logo.png
./src-tauri/icons/Square44x44Logo.png
./src-tauri/icons/Square71x71Logo.png
./src-tauri/icons/Square89x89Logo.png
./src-tauri/icons/StoreLogo.png
./src-tauri/icons/icon.icns
./src-tauri/icons/icon.ico
./src-tauri/icons/icon.png
./src-tauri/src
./src-tauri/src/lib.rs
./src-tauri/src/main.rs
./src-tauri/tauri.conf.json
./src/App.tsx
./src/components
./src/components/Card.tsx
./src/components/CodeViewer.tsx
./src/components/ModeSwitcher.tsx
./src/components/SaveModal.tsx
./src/components/Tooltip.tsx
./src/decks
./src/decks/ArchitectureDeck.tsx
./src/decks/ExporterDeck.tsx
./src/decks/GrillDeck.tsx
./src/decks/ManifestDeck.tsx
./src/decks/TasksDeck.tsx
./src/index.css
./src/main.tsx
./src/services
./src/services/compiler.ts
./src/services/geminiClient.ts
./src/services/presets.ts
./src/services/tauriBridge.ts
./src/services/tooltips.ts
./src/types
./src/types/project.ts
./tsconfig.json
./vite.config.ts
```

## Project Documentation & Specs

### `README.md`

```markdown
# PromptForge
 Helps make prompts for vibe coding
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

### `plan.md`

```markdown
# Technical Plan: PromptForge Native Workstation

## 1. Current State & Gap Analysis
- **Completed Components:**
  - React 19 frontend with 3-tier complexity switcher (`Simple | Balanced | Pro`).
  - Five stacked workstation decks (`ManifestDeck`, `ArchitectureDeck`, `GrillDeck`, `TasksDeck`, `ExporterDeck`).
  - Contract compiler generating `spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`, and platform prompt contracts (Stitch, AI Studio, Antigravity, Copilot, Canvas).
  - Universal 100ms hover explainer dictionary with accessible ARIA semantics.
  - Express server (`server.ts`) acting as a temporary development proxy for Gemini API endpoints.
- **Architectural Gaps to Bridge:**
  - Tauri configuration files (`src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml`, `src-tauri/src/main.rs`) are missing from the project tree.
  - In native desktop mode, the app cannot rely on `server.ts` (Node/Express). Gemini API calls and keyring storage must route directly through Rust IPC commands or direct client-side requests using keys loaded from the OS keyring.
  - Directory picking in `SaveModal.tsx` uses simulated paths; it needs native file-picker integration via `@tauri-apps/plugin-dialog`.

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
│  │  • get_api_key / set_api_key (libsecret/keyring) │  │
│  │  • gemini_generate (reqwest HTTPS proxy)        │  │
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

### `Tasks.md`

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

### `Agents.md`

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

## Configuration & CI

### `package.json`

```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build",
    "start": "node server.ts",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^3.1.0",
    "@radix-ui/react-dialog": "^1.3.1",
    "@radix-ui/react-tabs": "^1.2.1",
    "@radix-ui/react-tooltip": "^1.4.1",
    "@tailwindcss/vite": "^4.3.3",
    "@tauri-apps/api": "^2.12.4",
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
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2",
    "@types/express": "^4.17.21"
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
  "exclude": ["dist"]
}
```

### `vite.config.ts`

```typescript
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

### `.env.example`

```bash
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
```

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:

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

      - name: Check Rust backend
        working-directory: src-tauri
        run: cargo check
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

### `.gitattributes`

```text
# Auto detect text files and perform LF normalization
* text=auto
```

## Backend & Tauri Native Layer

### `server.ts`

```typescript
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const PORT = 3000;

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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Health & API Key readiness endpoint
  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(
      process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
        process.env.GEMINI_API_KEY.trim().length > 5
    );
    res.json({
      status: 'ok',
      geminiConfigured: hasKey,
      model: 'gemini-3.8-flash',
    });
  });

  // 1. Expand / Flesh Out Idea endpoint
  app.post('/api/gemini/expand', async (req, res) => {
    try {
      const { appName, coreIdea, targetPlatform, features } = req.body || {};
      if (!coreIdea || typeof coreIdea !== 'string') {
        res.status(400).json({ error: 'Please enter at least a rough phrase or sentence for your app idea first.' });
        return;
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are PromptForge, a friendly product architect that translates rough, plain-English app thoughts into clear, jargon-free specifications.

Current App Name: ${appName || 'Untitled App'}
Target Device: ${targetPlatform || 'desktop'}
Rough Idea: ${coreIdea}
Current Main Steps: ${Array.isArray(features) ? features.join('; ') : 'None yet'}

Expand this rough idea into:
1. A crisp, memorable app name (if the current one is generic or empty, improve it; otherwise keep it).
2. A 1-sentence plain-English tagline.
3. A rich, well-structured 2-paragraph plain-English description of what the app does, who it helps, and how it feels to use (avoid obscure compiler/database jargon).
4. 5 to 6 concrete, step-by-step user flows written in everyday language.`,
        config: {
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
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini expand error:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Could not reach Gemini AI to flesh out your idea. Your existing text has been safely preserved.',
      });
    }
  });

  // 2. Generate a Random App Idea with AI
  app.post('/api/gemini/random-idea', async (req, res) => {
    try {
      const { categoryHint } = req.body || {};
      const seedCategories = [
        'a local-first Ubuntu creative audio or visual utility',
        'a smart personal productivity or focus ritual workstation',
        'an interactive neighborhood community or hobbyist catalog app',
        'a calm personal finance, recipe, or hardware tinkering organizer',
        'a visual study companion or interactive science sandbox',
      ];
      const chosenTheme =
        categoryHint || seedCategories[Math.floor(Math.random() * seedCategories.length)];

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Invent an original, practical, and inspiring application idea around the theme: "${chosenTheme}".
Make it concrete, distinctive, and immediately understandable by a non-technical builder.
Include:
- A catchy appName and 1-sentence tagline
- A 2-paragraph plain-English coreIdea explaining what problem it solves and how people interact with it
- targetPlatform ('desktop', 'web', 'mobile', or 'cli')
- 5 specific plain-English user steps (features)
- 3 tailored multiple-choice clarification questions (with 3 concise options each and a default selectedAnswer)
- Recommended stackSummary and architectureStyle for Pro mode.`,
        config: {
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
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini random-idea error:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Could not generate a random AI idea right now. Try again or pick a starter template.',
      });
    }
  });

  // 3. Socratic Interrogator ("Grill Me" 3-Question Interview)
  app.post('/api/gemini/grill', async (req, res) => {
    try {
      const { appName, coreIdea, targetPlatform, features, groundRules } = req.body || {};
      if (!coreIdea || typeof coreIdea !== 'string') {
        res.status(400).json({ error: 'Please describe your app idea first so PromptForge knows what to ask.' });
        return;
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this application specification and generate 3 sharp, friendly multiple-choice clarification questions ("Grill Me") that uncover missing product details, edge cases, or user experience choices.

App Name: ${appName || 'Untitled App'}
Target Device: ${targetPlatform || 'desktop'}
Core Idea: ${coreIdea}
Main Steps: ${Array.isArray(features) ? features.join(' | ') : ''}
Ground Rules: ${JSON.stringify(groundRules || {})}

Rules for the 3 questions:
- Write questions in plain, everyday English (no intimidating jargon).
- Each question must have 3 distinct, practical multiple-choice options (under 12 words each).
- Prefix the best option with "(Recommended) ".
- Set selectedAnswer to that recommended first option.`,
        config: {
          systemInstruction:
            'You are a Socratic product coach. Return exactly 3 high-value multiple-choice questions in valid JSON.',
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
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini grill error:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Gemini took too long or encountered an error while generating interview questions. Your current progress is safe.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PromptForge Workstation server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
```

### `src-tauri/Cargo.toml`

```toml
[package]
name = "app"
version = "0.1.0"
description = "A Tauri App"
authors = ["you"]
license = ""
repository = ""
edition = "2024"
rust-version = "1.90"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
name = "app_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2.7.4" }

[dependencies]
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"] }
log = "0.4"
tauri = { version = "2.12.5" }
tauri-plugin-log = "2"
```

### `src-tauri/build.rs`

```rust
fn main() {
  tauri_build::build()
}
```

### `src-tauri/tauri.conf.json`

```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "promptforge",
  "version": "0.1.0",
  "identifier": "com.tauri.dev",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:3000",
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  },
  "app": {
    "windows": [
      {
        "title": "PromptForge Workstation",
        "width": 800,
        "height": 600,
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
    "targets": "all",
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

### `src-tauri/.gitignore`

```text
# Generated by Cargo
# will have compiled files and executables
/target/
/gen/schemas
```

### `src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "enables the default permissions",
  "windows": [
    "main"
  ],
  "permissions": [
    "core:default"
  ]
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

### `src-tauri/src/lib.rs`

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
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
    .run(tauri::generate_context!())
    .expect("error while building tauri application");
}
```

## Frontend Types, Entry & Core App

### `src/types/project.ts`

```typescript
export type ComplexityMode = 'simple' | 'balanced' | 'pro';

export type TargetPlatform = 'desktop' | 'web' | 'mobile' | 'cli';

export type TaskSlicingMode = 'hitl-first' | 'balanced-slices' | 'afk-autonomous';

export type ExportPlatformId =
  | 'stitch'
  | 'aistudio'
  | 'antigravity'
  | 'copilot'
  | 'canvas';

export type SpecFileId = 'spec.md' | 'plan.md' | 'tasks.md' | 'AGENTS.md' | 'src-tauri/src/lib.rs';

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
  features: string[];
  groundRules: GroundRules;
  clarifications: ClarificationItem[];
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

### `src/main.tsx`

```tsx
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
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

### `src/App.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileCode2,
  FileText,
  FolderKanban,
  HardDrive,
  Layers,
  Loader2,
  RotateCcw,
  Sparkles,
  Terminal,
  Wand2,
  X,
} from 'lucide-react';
import {
  ComplexityMode,
  ExportPlatformId,
  ProjectState,
  SpecFileId,
} from './types/project';
import {
  DEFAULT_PROJECT_STATE,
  FALLBACK_RANDOM_IDEAS,
  STARTER_TEMPLATES,
} from './services/presets';
import {
  compilePlatformContract,
  compileSpecFile,
} from './services/compiler';
import {
  expandProjectIdea,
  generateGrillQuestions,
  generateRandomAppIdea,
} from './services/geminiClient';
import { ModeSwitcher } from './components/ModeSwitcher';
import { ExplainerTooltip } from './components/Tooltip';
import { CodeViewer } from './components/CodeViewer';
import { SaveModal } from './components/SaveModal';
import { ManifestDeck } from './decks/ManifestDeck';
import { ArchitectureDeck } from './decks/ArchitectureDeck';
import { GrillDeck } from './decks/GrillDeck';
import { TasksDeck } from './decks/TasksDeck';
import { ExporterDeck } from './decks/ExporterDeck';

const STORAGE_KEY = 'promptforge_workstation_state_v1';
const MODE_STORAGE_KEY = 'promptforge_complexity_mode_v1';

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
    desc: 'System architecture flow, TypeScript models & Tauri IPC contracts',
  },
  {
    id: 'tasks.md',
    label: 'tasks.md',
    desc: 'Ordered HITL/AFK implementation tasks & verification steps',
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
  { id: 'copilot', label: 'Copilot' },
  { id: 'canvas', label: 'Canvas' },
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
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.appName === 'string') {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROJECT_STATE;
  });

  const [previousSnapshot, setPreviousSnapshot] = useState<ProjectState | null>(null);
  const [inspectorMode, setInspectorMode] = useState<'files' | 'platforms'>('files');
  const [activeSpecFile, setActiveSpecFile] = useState<SpecFileId>('AGENTS.md');
  const [activePlatform, setActivePlatform] = useState<ExportPlatformId>('stitch');
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // AI Loading & Toast States
  const [isExpanding, setIsExpanding] = useState(false);
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [isGrilling, setIsGrilling] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<{
    type: 'success' | 'warning';
    text: string;
  } | null>(null);

  // Persist project state in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectState));
    } catch {
      // ignore quota errors
    }
  }, [projectState]);

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
      const result = await generateRandomAppIdea();
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
        FALLBACK_RANDOM_IDEAS[Math.floor(Math.random() * FALLBACK_RANDOM_IDEAS.length)];
      setProjectState({
        ...fallback,
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

  // 3. Socratic Interrogator ("Grill Me")
  const handleGrillMe = async () => {
    if (isGrilling) return;
    setIsGrilling(true);
    setBannerMessage(null);

    try {
      const result = await generateGrillQuestions(projectState);
      if (Array.isArray(result.questions) && result.questions.length > 0) {
        setProjectState((prev) => ({
          ...prev,
          clarifications: result.questions,
          lastUpdated: new Date().toISOString(),
        }));
        showToast(
          'success',
          'Generated 3 tailored Socratic clarification questions based on your current app idea.'
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

  const handleLoadTemplate = (templateId: string) => {
    const found = STARTER_TEMPLATES.find((t) => t.id === templateId);
    if (!found) return;
    setPreviousSnapshot(projectState);
    setProjectState({
      ...found.state,
      lastUpdated: new Date().toISOString(),
    });
    showToast('success', `Loaded starter template: "${found.name}"`);
  };

  const handleClearCanvas = () => {
    setPreviousSnapshot(projectState);
    setProjectState({
      id: `blank-${Date.now()}`,
      appName: 'Untitled App',
      tagline: 'A clean-slate application specification.',
      coreIdea: '',
      targetPlatform: 'desktop',
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
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          PromptForge
        </a>

        {/* Zone 2: 4-5 concise single-line navigation links */}
        <nav
          aria-label="Workstation Sections"
          className="hidden md:flex items-center gap-6 text-xs font-medium text-[#CBC3D7]"
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
            href="#deck-exporter"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Exporters
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
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
              {projectState.features.length} steps · {projectState.clarifications.length} clarifications
            </span>
          </div>

          {/* Center: Three-Tier Complexity Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <ModeSwitcher mode={mode} onChange={setMode} />

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
        {/* Column 1: Left Presets, Templates & Mode Guide Sidebar (3 cols on xl / 3 cols on lg) */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-20">
          {/* Starter Templates & Quick Actions Panel */}
          <div className="pf-card rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="text-xs font-semibold text-white">
                  Starter Blueprints
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClearCanvas}
                className="text-[11px] font-medium text-[#A78BFA] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                New Blank App
              </button>
            </div>

            <div className="space-y-2">
              {STARTER_TEMPLATES.map((tpl) => {
                const active = projectState.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleLoadTemplate(tpl.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                        : 'bg-[#0F0C1B]/75 border-[#C084FC]/15 text-[#CBC3D7] hover:border-[#C084FC]/35'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-white truncate">
                        {tpl.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A78BFA] mb-1">{tpl.badge}</p>
                    <p className="text-[11px] text-[#CBC3D7] line-clamp-2 leading-snug">
                      {tpl.summary}
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
              <span className="text-xs font-semibold text-white">
                Active Complexity Lens
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#D0BCFF] capitalize">
                {mode} Mode
              </span>
            </div>

            <p className="text-xs text-[#CBC3D7] leading-relaxed">
              {mode === 'simple' &&
                'Showing only the 3 essential plain-English cards (Idea, Device, Steps) plus instant multi-platform export.'}
              {mode === 'balanced' &&
                'Showing Manifest, 4 Everyday Ground Rules, and the 3-Question "Grill Me" clarification interview.'}
              {mode === 'pro' &&
                'Showing all 5 decks including Task Slicing (HITL/AFK), 10-Section AGENTS.md overrides, and {{variable}} tokens.'}
            </p>

            <div className="pt-2 border-t border-[#C084FC]/15 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[#CBC3D7]">
                <span>01. Project Manifest</span>
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
                <span>03. Grill Me Interview</span>
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
                <span>05. Platform Exporter</span>
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
            isExpanding={isExpanding}
            isGeneratingRandom={isGeneratingRandom}
            canUndoExpansion={Boolean(previousSnapshot)}
            onUndoExpansion={handleUndoSnapshot}
          />

          {/* Simple Mode Upgrade Prompt Banner */}
          {mode === 'simple' && (
            <div className="pf-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">
                  Want to configure Offline Rules or run the 3-Question "Grill Me" Interview?
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
              <ArchitectureDeck state={projectState} onUpdate={setProjectState} />
              <GrillDeck
                state={projectState}
                onUpdate={setProjectState}
                onGrillMe={handleGrillMe}
                isGrilling={isGrilling}
              />
            </>
          )}

          {/* Deck 4: Visible in Pro Mode */}
          {mode === 'pro' && (
            <TasksDeck state={projectState} onUpdate={setProjectState} />
          )}

          {/* Deck 5: Multi-Platform Exporter (Always visible at bottom of stack) */}
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
                <h2 className="text-sm font-semibold text-white tracking-tight">
                  Live Contract Compiler
                </h2>
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
    </div>
  );
}

export default App;
```

## Frontend Services

### `src/services/compiler.ts`

```typescript
import { ExportPlatformId, ProjectState, SpecFileId } from '../types/project';

const PLATFORM_LABELS: Record<ProjectState['targetPlatform'], string> = {
  desktop: 'Native Ubuntu Desktop Application (Tauri v2 + React 19)',
  web: 'Responsive Full-Stack Web Application (React 19 + Express + Vite)',
  mobile: 'Mobile-First Progressive Web Application (Touch Ergonomic 48px Targets)',
  cli: 'Interactive Command-Line & Developer Terminal Tool',
};

function interpolateVariables(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
}

export function compileSpecMd(state: ProjectState): string {
  const earsRequirements = state.features.map((feat, idx) => {
    const clean = feat.trim().replace(/\.$/, '');
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

  const clarificationLines =
    state.clarifications.length > 0
      ? state.clarifications
          .map(
            (c) =>
              `- **${c.category}** — *${c.question}*\n  - **Confirmed Decision:** ${c.selectedAnswer || c.options[0]}`
          )
          .join('\n')
      : '- No Socratic clarifications recorded yet. Run "Grill Me" to lock in edge-case decisions.';

  const raw = `# Product Specification: ${state.appName}

> **Tagline:** ${state.tagline}
> **Target Environment:** ${PLATFORM_LABELS[state.targetPlatform]}
> **Primary AI Model:** \`{{primary_model}}\` · **Target OS:** \`{{target_os}}\`

## 1. Objective
${state.coreIdea}

## 2. Target Users
- **Everyday Builders & Creators:** Users who want a fast, jargon-free experience for ${state.appName} without wrestling with complex setup steps.
- **Power Users & Technical Practitioners:** Users who value deterministic exports, keyboard-first speed, and clear system boundaries.

## 3. Core Capabilities
${state.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## 4. Confirmed Clarification Decisions ("Grill Me" Outcomes)
${clarificationLines}

## 5. Behavioral Requirements (EARS Notation)
${earsRequirements.join('\n')}
- **REQ-ERROR (Graceful Recovery):** When an external AI or I/O call fails or times out after 30 seconds, the system shall surface a clear, human-readable warning banner and retain all active user text.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compilePlanMd(state: ProjectState): string {
  const raw = `# Technical Plan: ${state.appName}

## 1. System Architecture
${state.appName} uses a clean separation between its interactive React 19 interface, server-side Gemini synthesis routes (\`{{primary_model}}\`), and typed Tauri v2 IPC filesystem commands on \`{{target_os}}\`.

\`\`\`
[React 19 Frontend: Stacked Decks & Mode Switcher]
    │
    ├──► [Gemini API Service (@google/genai: {{primary_model}})] ──► Live Contract Compiler
    │
    └──► [Tauri IPC Bridge (@tauri-apps/api/core)]
             │
             ▼
[Rust Backend (src-tauri/src/lib.rs)]
    ├──► Canonical Filesystem Writer (spec.md, plan.md, tasks.md, AGENTS.md)
    └──► System Keyring Credential Guard
\`\`\`

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
  const modeTag =
    state.proConfig.taskSlicingMode === 'hitl-first'
      ? 'HITL'
      : state.proConfig.taskSlicingMode === 'afk-autonomous'
      ? 'AFK'
      : null;

  const resolveTag = (defaultTag: 'HITL' | 'AFK') => modeTag || defaultTag;

  const featureTasks = state.features.slice(0, 4).map((feat, idx) => {
    const num = String(idx + 4).padStart(3, '0');
    const tag = resolveTag(idx % 2 === 0 ? 'HITL' : 'AFK');
    const parallel = tag === 'AFK' ? ' [P]' : '';
    return `- [ ] **T${num}: Feature Slice — ${feat.slice(0, 58)}${feat.length > 58 ? '...' : ''} (${tag})${parallel}**
  - Implement UI controls, state handlers, and plain-English hover tooltip explainers for: *${feat}*.
  - Verification: Interact with the control in the live workspace and confirm state updates immediately without console errors.`;
  });

  const raw = `# Implementation Tasks: ${state.appName}

> **Execution Strategy:** \`${state.proConfig.taskSlicingMode}\` · **Target OS:** \`{{target_os}}\`
> **Legend:** \`(HITL)\` = Human-in-the-Loop checkpoint · \`(AFK)\` = Autonomous background execution · \`[P]\` = Safe to parallelize

- [ ] **T001: Project Scaffolding & IPC Foundation (${resolveTag('HITL')})**
  - Initialize ${state.proConfig.stackSummary}.
  - Configure least-privilege permissions and typed command bridges for \`{{export_dir}}\`.
  - Verification: Run \`npx tsc --noEmit\` and confirm the application boots cleanly on port 3000 / desktop shell.

- [ ] **T002: Design Tokens & Glassmorphic Surface Theme (${resolveTag('AFK')}) [P]**
  - Implement the night-violet palette (\`#0F0C1B\`), frosted card surfaces, and \`{{accent_color}}\` primary action styles.
  - Build reusable UI primitives: \`Card\`, \`Tooltip\`, \`ModeSwitcher\`, and \`CodeViewer\`.
  - Verification: Render workspace cards and verify 12px backdrop blur, 1px lilac borders, and tabular numerals.

- [ ] **T003: Universal Hover Explainer System (${resolveTag('AFK')}) [P]**
  - Wrap Radix UI Tooltip primitives with a 100ms hover delay and \`role="tooltip"\` accessibility semantics.
  - Connect central plain-English dictionary covering all section badges, switches, and exporters.
  - Verification: Hover over any section label and confirm the lilac-bordered explainer callout appears cleanly.

${featureTasks.join('\n\n')}

- [ ] **T008: Contract Compiler, Multi-Platform Exporter & Native Save Modal (${resolveTag('HITL')})**
  - Compile \`ProjectState\` into \`spec.md\`, \`plan.md\`, \`tasks.md\`, and 10-section \`AGENTS.md\`.
  - Wire the Ubuntu directory export modal with canonical path validation (\`../\` rejection) and direct file downloads.
  - Verification: Click "Save to Computer", verify file sizes, and confirm all 4 specification files export cleanly.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileAgentsMd(state: ProjectState): string {
  const customRulesList =
    state.proConfig.customRules.length > 0
      ? state.proConfig.customRules.map((r) => `- ${r}`).join('\n')
      : '- Keep all user-facing labels in plain, jargon-free English.';

  const raw = `# AGENTS.md — ${state.appName} Project Instructions

## 1. Product
${state.appName} (${state.tagline})
${state.coreIdea}

## 2. Stack
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
${
  state.clarifications.length > 0
    ? state.clarifications
        .map((c) => `- **${c.category}:** ${c.selectedAnswer || c.options[0]}`)
        .join('\n')
    : '- Follow the tasks in `tasks.md` sequentially, respecting `(HITL)` and `(AFK)` checkpoints.'
}

## 10. Generated Files
- Do NOT edit generated build artifacts in \`src-tauri/target/\` or \`dist/\`.
- Default export destination: \`{{export_dir}}\`.
`;

  return interpolateVariables(raw, state.proConfig.templateVariables);
}

export function compileRustLibRs(state: ProjectState): string {
  return `// src-tauri/src/lib.rs — Generated by PromptForge for ${state.appName}
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
  const clarificationsSummary =
    state.clarifications
      .map((c) => `• ${c.category}: ${c.selectedAnswer || c.options[0]}`)
      .join('\n') || '• Use clean, accessible defaults.';

  const featuresBullets = state.features.map((f, i) => `${i + 1}. ${f}`).join('\n');

  const rulesSummary = [
    state.groundRules.offlineFirst && 'Offline-First in-memory & local state persistence',
    state.groundRules.highPerformance && 'Sub-200ms UI interaction feedback with tabular-nums metrics',
    state.groundRules.localPrivacy && 'Strict local privacy & canonicalized path security',
    state.groundRules.darkModeDefault && 'Glassmorphic twilight dark theme (#0F0C1B base, #8B5CF6 violet accent)',
  ]
    .filter(Boolean)
    .map((r) => `• ${r}`)
    .join('\n');

  switch (platform) {
    case 'stitch': {
      const promptText = interpolateVariables(
        `# Google Stitch UI Generation Contract — ${state.appName}

Design a high-precision, keyboard-first desktop workstation interface for **${state.appName}** (${state.tagline}).

## 1. Visual Language & Surface Tokens
- **Canvas Backdrop**: Velvety night-violet \`#0F0C1B\`
- **Primary Cards (Level 1)**: Frosted purple glass \`rgba(27, 21, 46, 0.75)\` with \`12px\` backdrop blur and \`1px solid rgba(192, 132, 252, 0.2)\` hairline border
- **Popovers & Hover Callouts (Level 2)**: \`rgba(38, 30, 65, 0.94)\` with ambient violet glow
- **Primary Accent**: \`{{accent_color}}\` (Electric Violet pill buttons & active focus rings)
- **Secondary Accent**: \`#EC4899\` (Luminous Pink for interactive \`{{variable}}\` tokens)
- **Semantic Status**: \`#34D399\` (Mint Emerald for compiler readiness & verified paths)
- **Typography**: Plus Jakarta Sans / Inter headings (\`-0.02em\` tracking, pure \`#FFFFFF\`) + JetBrains Mono (\`tabular-nums\`) for live Markdown & code panes.

## 2. Core Screens & User Flows to Render
${featuresBullets}

## 3. Confirmed UX & Layout Decisions
${clarificationsSummary}

## 4. Essential UI Components
- Native Ubuntu window titlebar with breadcrumbs and a 3-tier mode switcher (\`Simple | Balanced | Pro\`)
- 3-column workstation grid: Left Preset & Navigation Sidebar (260px), Central Stacked Decks Canvas, Right Live Markdown & Platform Contract Inspector (460px)
- Floating plain-English hover explainer callout card (\`role="tooltip"\`)`,
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

Build the complete, working full-stack application for **${state.appName}**: ${state.tagline}

## Product Overview
${state.coreIdea}

## Core Interactive Capabilities
${featuresBullets}

## Confirmed Product Decisions
${clarificationsSummary}

## Architecture & Technical Guardrails
- **Stack**: ${state.proConfig.stackSummary}
- **AI Integration**: Server-side Express endpoints in \`server.ts\` using official \`@google/genai\` SDK with model \`{{primary_model}}\` and \`User-Agent: 'aistudio-build'\`. Never call Gemini directly from browser code or render API key input fields.
- **Quality Rules**:
${rulesSummary}
- **Custom Conventions**:
${state.proConfig.customRules.map((r) => `• ${r}`).join('\n')}`,
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

Execute the multi-file implementation and verification plan for **${state.appName}** targeting \`{{target_os}}\`.

## 1. Mission & Architecture
${state.coreIdea}
- **Architecture**: ${state.proConfig.architectureStyle}
- **Security Boundary**: ${state.proConfig.securityBoundary}
- **Default Export Path**: \`{{export_dir}}\`

## 2. Non-Negotiable Ground Rules
${rulesSummary}

## 3. Confirmed Architectural Decisions
${clarificationsSummary}

## 4. Phased Execution Tasks (${state.proConfig.taskSlicingMode})
1. **T001 (HITL)**: Verify TypeScript domain models (\`src/types/project.ts\`) and Tauri IPC bridge (\`src/services/tauriBridge.ts\` + \`src-tauri/src/lib.rs\`).
2. **T002 (AFK [P])**: Enforce glassmorphic tokens (\`#0F0C1B\`, \`{{accent_color}}\`) and 100ms accessible hover tooltips (\`role="tooltip"\`).
3. **T003 (HITL)**: Implement and test all core user flows:
${featuresBullets}
4. **T004 (HITL)**: Run \`npx tsc --noEmit\` and \`npm run build\` to verify zero compilation errors.`,
        state.proConfig.templateVariables
      );
      return {
        title: 'Google Antigravity (AGY)',
        subtitle: 'Autonomous agent task graph, Rust IPC & verification loop',
        badge: 'Agent Execution Spec',
        promptText,
      };
    }

    case 'copilot': {
      const promptText = interpolateVariables(
        `# GitHub Copilot Workspace & Repository Instructions — ${state.appName}

You are working on **${state.appName}** (${state.tagline}).
Follow these repository instructions for all code completions and multi-file edits:

## Stack & Conventions
- ${state.proConfig.stackSummary}
- Use functional React components with named exports.
- Every section header, toggle switch, and action button must be wrapped in a plain-English hover tooltip (\`role="tooltip"\`).
- Route all native disk exports through \`saveSpecBundle\` in \`src/services/tauriBridge.ts\` (canonicalize paths, reject \`../\`).

## Feature Checklist
${featuresBullets}

## Testing & Verification
- ${state.proConfig.testingStrategy}
- Always verify with \`npx tsc --noEmit\` after modifying TypeScript interfaces.`,
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

Help me interactively polish and expand the user experience of **${state.appName}** (${state.tagline}).

## Core Concept
${state.coreIdea}

## Interactive Flows to Prototype & Refine
${featuresBullets}

## Visual & Interaction Style
- Deep twilight canvas (\`#0F0C1B\`) with frosted purple glass cards and \`{{accent_color}}\` electric violet highlights
- Three-tier complexity toggle (\`Simple | Balanced | Pro\`) that filters visible fields without resetting user input
- Friendly 2-sentence hover explainers on every badge and control
- Confirmed user choices:
${clarificationsSummary}`,
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
```

### `src/services/geminiClient.ts`

```typescript
import { ClarificationItem, GroundRules, ProjectState, TargetPlatform } from '../types/project';

const TIMEOUT_MS = 30000;

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
}): Promise<ExpandIdeaResponse> {
  return fetchWithTimeout<ExpandIdeaResponse>('/api/gemini/expand', params);
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

export async function generateRandomAppIdea(categoryHint?: string): Promise<RandomIdeaResponse> {
  return fetchWithTimeout<RandomIdeaResponse>('/api/gemini/random-idea', { categoryHint });
}

export interface GrillMeResponse {
  questions: ClarificationItem[];
}

export async function generateGrillQuestions(state: ProjectState): Promise<GrillMeResponse> {
  return fetchWithTimeout<GrillMeResponse>('/api/gemini/grill', {
    appName: state.appName,
    coreIdea: state.coreIdea,
    targetPlatform: state.targetPlatform,
    features: state.features,
    groundRules: state.groundRules,
  });
}
```

### `src/services/presets.ts`

```typescript
import { ProjectState, StarterTemplate } from '../types/project';

export const DEFAULT_PROJECT_STATE: ProjectState = {
  id: 'promptforge-workstation',
  appName: 'PromptForge',
  tagline: 'Plain-language specification workstation and multi-platform prompt compiler for Ubuntu desktop.',
  coreIdea:
    'PromptForge is a fast, friendly Ubuntu desktop application that lets non-technical builders and developers describe an app idea in plain English and automatically compiles it into structured specification files (spec.md, plan.md, tasks.md, AGENTS.md) and platform-tuned prompts for Google Stitch, AI Studio, Antigravity, GitHub Copilot, and Gemini Canvas.\n\nIt strips away intimidating software jargon across three progressive complexity tiers (Simple, Balanced, Pro) while providing instant plain-English hover explainers, one-click Gemini idea expansion, and a 3-question Socratic clarification interview.',
  targetPlatform: 'desktop',
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
```

### `src/services/tauriBridge.ts`

```typescript
import { invoke } from '@tauri-apps/api/core';
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
export function canonicalizeLinuxPath(rawPath: string): {
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

  // Reject directory traversal sequences as required by AGENTS.md security rules
  if (trimmed.includes('..')) {
    return {
      valid: false,
      canonicalPath: trimmed,
      error: 'Security Policy Violation: Directory traversal ("../") is blocked by canonical path guard.',
    };
  }

  // Expand ~ to /home/ubuntu for clean canonical display
  const expanded = trimmed.startsWith('~/')
    ? `/home/ubuntu/${trimmed.slice(2)}`
    : trimmed === '~'
    ? '/home/ubuntu'
    : trimmed.startsWith('/')
    ? trimmed
    : `/home/ubuntu/${trimmed}`;

  const normalized = expanded.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  return {
    valid: true,
    canonicalPath: normalized,
  };
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
  const pathCheck = canonicalizeLinuxPath(targetDir);
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
```

### `src/services/tooltips.ts`

```typescript
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
    title: '05. Multi-Platform Contract Exporter',
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
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Folder,
  FolderOpen,
  HardDrive,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';
import { ProjectState, SaveBundleResult } from '../types/project';
import {
  compileAgentsMd,
  compilePlanMd,
  compileSpecMd,
  compileTasksMd,
} from '../services/compiler';
import {
  canonicalizeLinuxPath,
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
    path: '/home/ubuntu/workspace/app-spec',
    description: 'Direct handoff for Antigravity / Copilot',
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
  const [downloadOnSave, setDownloadOnSave] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveBundleResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const compiledFiles: Record<string, string> = {
    'AGENTS.md': compileAgentsMd(state),
    'spec.md': compileSpecMd(state),
    'plan.md': compilePlanMd(state),
    'tasks.md': compileTasksMd(state),
  };

  const pathCheck = canonicalizeLinuxPath(targetDir);

  const fileRows = Object.entries(compiledFiles).map(([name, content]) => ({
    name,
    bytes: new TextEncoder().encode(content).length,
    lines: content.split('\n').length,
    content,
  }));

  const totalBytes = fileRows.reduce((acc, f) => acc + f.bytes, 0);

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
                <Dialog.Title className="text-lg font-semibold text-white tracking-tight">
                  Save Specification Bundle to Computer
                </Dialog.Title>
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
              <label className="block text-xs font-semibold text-white mb-2">
                1. Choose Ubuntu Destination Directory
              </label>
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

              {/* Manual Path Input + Canonical Guard Preview */}
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
                    placeholder="/home/ubuntu/Projects/my-app-spec"
                    className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/25 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
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

            {/* Browser Direct Download Toggle */}
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
```

## Frontend Decks

### `src/decks/ManifestDeck.tsx`

```tsx
import React, { useState } from 'react';
import {
  Globe,
  Laptop,
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
import { ProjectState, TargetPlatform } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip, LabelWithTooltip } from '../components/Tooltip';

interface ManifestDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onFleshOutIdea: () => Promise<void>;
  onRandomAiIdea: () => Promise<void>;
  isExpanding: boolean;
  isGeneratingRandom: boolean;
  canUndoExpansion: boolean;
  onUndoExpansion: () => void;
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
  isExpanding,
  isGeneratingRandom,
  canUndoExpansion,
  onUndoExpansion,
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

  return (
    <DeckCard
      id="deck-manifest"
      stepNumber="01."
      title="Project Manifest & Plain-Language Idea"
      subtitle="Answer three everyday questions—your big idea, the target device, and the main user steps. PromptForge handles the engineering translation."
      tooltipKey="deck-manifest"
      headerRight={
        <div className="flex items-center gap-2">
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
        </div>
      }
    >
      <div className="space-y-6">
        {/* App Name & Tagline Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 space-y-1.5">
            <LabelWithTooltip
              label="App Name"
              tooltipKey="field-app-name"
              htmlFor="input-app-name"
            />
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
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm font-medium text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="md:col-span-8 space-y-1.5">
            <LabelWithTooltip
              label="One-Sentence Summary"
              tooltipKey="field-app-name"
              htmlFor="input-tagline"
            />
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
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-sm text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
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
            <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
              {state.coreIdea.length} chars · Click "Flesh Out My Idea" to auto-expand
            </span>
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
              placeholder="Describe your app idea in plain, everyday words. Who is it for, what problem does it solve, and how should it feel?"
              className="w-full p-4 bg-transparent text-sm leading-relaxed text-[#E9D5FF] placeholder-[#958EA0]/60 focus:outline-none resize-y rounded-2xl"
            />
          </div>
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

        {/* Question 3: What Are the Main Steps? */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <LabelWithTooltip
              stepBadge="Q3"
              label="What are the main steps or actions a user takes?"
              tooltipKey="field-features"
            />
            <span className="text-[11px] font-mono text-[#A78BFA] tabular-nums">
              {state.features.length} steps defined
            </span>
          </div>

          <div className="space-y-2">
            {state.features.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 focus-within:border-[#8B5CF6]"
              >
                <span className="w-6 text-center text-xs font-mono font-semibold text-[#A78BFA] tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleUpdateStep(index, e.target.value)}
                  aria-label={`User step ${index + 1}`}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-[#E9D5FF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  aria-label={`Remove step ${index + 1}`}
                  className="p-1.5 rounded-lg text-[#958EA0] hover:text-[#FFB4AB] hover:bg-[#EF4444]/15 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add New Step Input */}
            <div className="flex items-center gap-2 pt-1">
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
                placeholder="Add another plain-English step (e.g., Export monthly summary as a clean PDF)..."
                className="flex-1 px-3.5 py-2 rounded-lg bg-[#0F0C1B]/90 border border-[#C084FC]/25 text-xs sm:text-sm text-white placeholder-[#958EA0]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
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
        </div>
      </div>
    </DeckCard>
  );
}
```

### `src/decks/GrillDeck.tsx`

```tsx
import React from 'react';
import { CheckCircle2, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import { ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip } from '../components/Tooltip';

interface GrillDeckProps {
  state: ProjectState;
  onUpdate: (updater: (prev: ProjectState) => ProjectState) => void;
  onGrillMe: () => Promise<void>;
  isGrilling: boolean;
}

export function GrillDeck({ state, onUpdate, onGrillMe, isGrilling }: GrillDeckProps) {
  const handleSelectAnswer = (questionId: string, option: string) => {
    onUpdate((prev) => ({
      ...prev,
      clarifications: prev.clarifications.map((item) =>
        item.id === questionId ? { ...item, selectedAnswer: option } : item
      ),
      lastUpdated: new Date().toISOString(),
    }));
  };

  return (
    <DeckCard
      id="deck-grill"
      stepNumber="03."
      title={'"Grill Me" — 3-Question Clarification Interview'}
      subtitle="Let Gemini inspect your idea and ask 3 quick multiple-choice questions to lock in missing details before generating code."
      tooltipKey="deck-grill"
      headerRight={
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
              {isGrilling ? 'Analyzing Idea...' : 'Grill Me (Ask 3 Fresh Questions)'}
            </span>
          </button>
        </ExplainerTooltip>
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
              Click "Grill Me" above to have Gemini spot edge cases in your app idea and suggest 3 multiple-choice decisions.
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
                </div>
                {item.selectedAnswer && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#34D399]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Folded into spec.md & AGENTS.md</span>
                  </span>
                )}
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

### `src/decks/ArchitectureDeck.tsx`

```tsx
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
```

### `src/decks/TasksDeck.tsx`

```tsx
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
```

### `src/decks/ExporterDeck.tsx`

```tsx
import React, { useState } from 'react';
import { HardDrive, Sparkles } from 'lucide-react';
import { ExportPlatformId, ProjectState } from '../types/project';
import { DeckCard } from '../components/Card';
import { ExplainerTooltip } from '../components/Tooltip';
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
}> = [
  { id: 'stitch', label: 'Google Stitch', tooltipKey: 'platform-stitch' },
  { id: 'aistudio', label: 'Google AI Studio', tooltipKey: 'platform-aistudio' },
  { id: 'antigravity', label: 'Google Antigravity (AGY)', tooltipKey: 'platform-antigravity' },
  { id: 'copilot', label: 'GitHub Copilot', tooltipKey: 'platform-copilot' },
  { id: 'canvas', label: 'Gemini Canvas', tooltipKey: 'platform-canvas' },
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
      stepNumber="05."
      title="Targeted Multi-Platform Contract Exporter"
      subtitle="Select your target AI platform to generate a ready-to-paste prompt contract, or write spec.md, plan.md, tasks.md, and AGENTS.md directly to your computer."
      tooltipKey="deck-exporter"
      headerRight={
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#8B5CF6] text-white shadow-sm'
                      : 'text-[#CBC3D7] hover:text-white hover:bg-white/5'
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
