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
  - Implement the 5-question dynamic Grill Me clarification generator using structured Gemini JSON output.
  - Render multiple-choice radio cards with recommended defaults across `ManifestDeck`, `ArchitectureDeck`, `GrillDeck`, `TasksDeck`, `WorkflowDeck`, and `ExporterDeck`.
  - Verification: Trigger clarification; select options and confirm answers fold directly into compiled state.

- [x] **T007: Contract Compiler & Multi-Platform Exporters (AFK) [P]**
  - Build pure compilation functions in `src/services/compiler.ts` converting `ProjectState` into `spec.md`, `plan.md`, `AGENTS.md`, and `tasks.md`.
  - Generate platform-tuned prompts for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
  - Verification: Run `tests/compiler.test.ts` ensuring output conforms to the 10-section `AGENTS.md` and EARS `spec.md` standards.

- [x] **T008: Native File Export Command & Save Modal (HITL)**
  - Implement Tauri Rust command `save_spec_bundle` with `~/` home expansion, `..` traversal rejection, and path canonicalization.
  - Build the "Save to Computer" dialog displaying file sizes, target directory path, and `@tauri-apps/plugin-dialog` native folder picker.
  - Verification: Run `cargo test --manifest-path src-tauri/Cargo.toml` confirming allowlist and path guard enforcement.
