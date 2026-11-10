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
