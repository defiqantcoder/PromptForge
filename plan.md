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
