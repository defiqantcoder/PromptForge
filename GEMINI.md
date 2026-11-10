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
