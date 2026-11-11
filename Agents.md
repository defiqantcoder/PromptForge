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
