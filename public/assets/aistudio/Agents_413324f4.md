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
