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
