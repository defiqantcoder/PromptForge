# PromptForge Remediation & Sync Plan
**Target Agent:** Google Antigravity (AGY)
**Objective:** Resolve high-priority security vulnerabilities, cross-file conflicts, and React/Rust health bugs identified during code review prior to production release.

Execute the following tasks sequentially. Ensure you run `npx tsc --noEmit` and `cargo check --manifest-path src-tauri/Cargo.toml` after each phase to verify you haven't broken the build.

## Phase 1: Security Hardening (High Priority)

- [x] **Task 1.1: Fix Disabled CSP in `src-tauri/tauri.conf.json`**
  - **File:** `src-tauri/tauri.conf.json`
  - **Action:** Locate `"security": { "csp": null }`. Replace it with a strict policy: `"csp": "default-src 'self'; connect-src 'self' http://localhost:3000 http://127.0.0.1:3000; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"`

- [x] **Task 1.2: Remove Plaintext API Key Exposure in `src-tauri/src/lib.rs`**
  - **File:** `src-tauri/src/lib.rs`
  - **Action:** The frontend only needs to *set* and *check* the key, never read it back. Remove `get_secure_key` from the `tauri::generate_handler![...]` macro array. You can optionally delete the `get_secure_key` function entirely as it is no longer used by the frontend.

- [x] **Task 1.3: Fix CSRF Bypass in `server/security.ts`**
  - **File:** `server/security.ts`
  - **Action:** In `localOriginGuard`, remove the `let isLocal = origin === 'null';` fallback. Only allow explicit loopback hosts (`http://localhost:*`, `http://127.0.0.1:*`) or `tauri://localhost`. Reject `Origin: null` to prevent sandboxed iframe abuse.

- [x] **Task 1.4: Prevent `.tmp` Symlink Overwrite in `src-tauri/src/export.rs`**
  - **File:** `src-tauri/src/export.rs`
  - **Action:** In `save_spec_bundle_to_dir`, before writing to `temp_dest`, ensure it isn't following a malicious symlink. Add a check to remove `temp_dest` if it exists (`let _ = fs::remove_file(&temp_dest);`) *before* calling `fs::write(&temp_dest, ...)`, or use `fs::OpenOptions::new().write(true).create_new(true)` to safely create the file.

- [x] **Task 1.5: Cap Image Payload Size in `src-tauri/src/gemini.rs`**
  - **File:** `src-tauri/src/gemini.rs`
  - **Action:** In `build_multimodal_parts`, cap the number of processed images to a maximum of 4, and skip any image where the base64 string exceeds 10MB (approx 13.3 million characters).

## Phase 2: Resolve Cross-File Conflicts & Divergences

- [x] **Task 2.1: Standardize Express Imports in `server.ts`**
  - **File:** `server.ts`
  - **Action:** Update the import for `registerArchiveRoutes` from `'./server/archiveRoute.ts'` to `'./server/archiveRoute.js'` (matching the `security.js` import pattern) to prevent bundler/Node execution errors.

- [x] **Task 2.2: Fix Crate Naming in `src-tauri/Cargo.toml`**
  - **File:** `src-tauri/Cargo.toml`
  - **Action:** Change `name = "app"` to `name = "promptforge"`. Change `name = "app_lib"` to `name = "promptforge_lib"`. Update `src-tauri/src/main.rs` to call `promptforge_lib::run()` instead of `app_lib::run()`.

- [x] **Task 2.3: Sync Question Counts in `src-tauri/src/gemini.rs`**
  - **File:** `src-tauri/src/gemini.rs`
  - **Action:** In `build_gemini_request_body` for `GeminiEndpoint::RandomIdea`, update the prompt text from "3 tailored multiple-choice clarification questions" to "5 tailored multiple-choice clarification questions" to match the Express server logic.

- [x] **Task 2.4: Fix Simulated `lib.rs` Output in `src/services/compiler.ts`**
  - **File:** `src/services/compiler.ts`
  - **Action:** In `compileRustLibRs`, update the generated string:
    - Change `pub fn save_spec_bundle` to crate-private `fn save_spec_bundle` (remove `pub`). Do the same for `get_secure_key` and `set_secure_key`.
    - Update `allowed_files` in the generated string to include `"COLLABORATION.md"` and `".continuerules"` (total of 6 files).

- [x] **Task 2.5: Update Core Markdown Documentation**
  - **Files:** `spec.md`, `Tasks.md`, `src/services/tooltips.ts`
  - **Action:** Find and replace references of "3-question Grill Me" or "3-question Socratic" with "5-question dynamic Grill Me". Ensure `WorkflowDeck` is mentioned in the feature lists where the other decks are listed.

## Phase 3: Code Health & Stability Improvements

- [x] **Task 3.1: Fix React `useEffect` Re-binding in `src/App.tsx`**
  - **File:** `src/App.tsx`
  - **Action:** Locate the `useEffect` that binds `keydown` for global keyboard shortcuts (`Alt+1`, `Ctrl+Enter`). It currently lacks a dependency array. Add `[mode]` as the dependency array, and ensure `handleFleshOutIdea` uses the latest state (e.g., wrap `handleFleshOutIdea` in `useCallback` or use refs for state access) so it doesn't execute with stale state or re-bind on every render.

- [x] **Task 3.2: Fix Error Logging in `src-tauri/src/lib.rs`**
  - **File:** `src-tauri/src/lib.rs`
  - **Action:** In `gemini_proxy_request`, the fallback `map_err` currently calls `gemini::sanitize_error_message("Could not reach Gemini AI...")` on a hardcoded string. Instead, use `log::warn!("Gemini proxy error: {}", gemini::sanitize_error_message(&err.to_string()));` to log the *actual* reqwest error to the console, while returning the sanitized generic fallback string to the frontend.

- [x] **Task 3.3: Fix Invalid DOS Date in ZIP Writer in `server/archiveRoute.ts`**
  - **File:** `server/archiveRoute.ts`
  - **Action:** In the ZIP generation loop, change `const date = 0;` to `const date = 0x0021;` (Jan 1, 1980) so standard ZIP extraction tools don't throw corrupted timestamp warnings. Change the General Purpose Bit Flag for both Local File Header (`lfh.writeUInt16LE(0, 6)`) and Central Directory Header (`cdh.writeUInt16LE(0, 8)`) from `0` to `0x0800` to properly indicate UTF-8 filename encoding.

## Phase 4: Final Verification
- Run `npm test` to ensure security and Gemini logic regressions have not been introduced.
- Run `npx tsc --noEmit`.
- Run `cargo clippy --manifest-path src-tauri/Cargo.toml -- -D warnings`.