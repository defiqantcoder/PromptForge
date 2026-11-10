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
