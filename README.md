# PromptForge

A fast, jargon-free **Ubuntu desktop & web specification workstation** that turns plain-English application ideas into structured, production-ready AI coding contracts (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`) and platform-tuned prompts for **Google Stitch**, **Google AI Studio**, **Google Antigravity (AGY)**, **GitHub Copilot**, and **Gemini Canvas**.

---

## Key Features

- **Three-Tier Complexity Switcher (`Simple` | `Balanced` | `Pro`)**
  - **Simple Mode (`Alt+1`)**: Strips away engineering jargon down to three everyday prompts (*What's the big idea?*, *Where will people use it?*, and *What are the main steps?*) plus one-click AI expansion.
  - **Balanced Mode (`Alt+2`)**: Adds everyday ground rules (*Offline-First*, *High Performance*, *Local Privacy*, *Dark Mode Default*) and the 3-question **"Grill Me"** Socratic clarification interview.
  - **Pro Mode (`Alt+3`)**: Unlocks full 10-section `AGENTS.md` configuration, task slicing strategies (`hitl-first`, `balanced-slices`, `afk-autonomous` with `HITL`/`AFK`/`[P]` tags), custom rules, and interactive `{{variable}}` template tokens.
  - Switching tiers only filters the view projection—all project state persists seamlessly in memory and `localStorage`.
- **Five Stacked Workstation Decks**
  - `ManifestDeck`, `ArchitectureDeck`, `GrillDeck`, `TasksDeck`, and `ExporterDeck`, paired with a live side-by-side Markdown & Rust contract inspector.
- **Universal Plain-English Hover Explainers**
  - Hovering over section labels, switches, or controls reveals accessible (`role="tooltip"`) 2-sentence plain-English callouts explaining what each option does and how AI agents use it.
- **Gemini AI Synthesis (`gemini-3.8-flash`)**
  - **Flesh Out My Idea (`Ctrl+Enter` / `Cmd+Enter`)**: Expands rough notes into a polished product summary and concrete user flows (with undo snapshot support).
  - **Random App Idea with AI**: Synthesizes a complete starter concept across target platforms (`desktop`, `web`, `mobile`, `cli`).
  - **Grill Me**: Generates 3 targeted multiple-choice clarification questions with `(Recommended)` defaults whose answers fold live into compiled specs.
  - Enforces a 30-second timeout budget and retains active form text on errors.
- **Targeted Multi-Platform Exporters & Native Save**
  - Compiles live contracts for **Google Stitch**, **Google AI Studio**, **Google Antigravity**, **GitHub Copilot**, and **Gemini Canvas**.
  - **Save to Computer**: Routes through Tauri IPC (`save_spec_bundle`) with canonical path validation and `..` traversal rejection when running natively, or previews sizes and downloads markdown files in browser mode.

---

## Tech Stack

- **Desktop Shell**: [Tauri v2](https://v2.tauri.app/) (`tauri 2.12.5`, Rust `edition = "2024"`, `rust-version = "1.90"`)
  - Plugins & Crates: `tauri-plugin-dialog`, `tauri-plugin-fs`, `tauri-plugin-log`, `keyring 2.3.3`, `reqwest 0.12`, `serde`, `serde_json`
- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **UI & Motion**: Radix UI Primitives (`Dialog`, `Tabs`, `Tooltip`), Lucide React, Motion
- **Dev API Proxy & AI SDK**: Express 4 (`tsx server.ts`), `@google/genai` (`gemini-3.8-flash`), `dotenv`

---

## Prerequisites (Ubuntu / Linux)

- **Node.js**: `v20+` (`v22` recommended; `>=22.0.0` is declared by `@google/genai`) and `npm`
- **Rust**: `1.90+` (`rustup` stable toolchain)
- **Tauri Linux System Dependencies** (Ubuntu 24.04):
  ```bash
  sudo apt-get update
  sudo apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.1-dev \
    libappindicator3-dev \
    librsvg2-dev \
    patchelf
  ```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your Gemini API key (required for AI expansion, random idea generation, and "Grill Me" in web/Express dev mode):
```bash
cp .env.example .env
```
Edit `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key"
```
> Without `GEMINI_API_KEY`, the workstation UI, live spec compiler, starter templates, and file exporter still work offline; AI endpoints will return a friendly configuration notice.

### 3. Run the Web Workstation (Express + Vite Dev Server)
```bash
npm run dev
```
Opens on `http://localhost:3000` with Vite middleware and `/api/gemini/*` endpoints (`/api/health`, `/api/gemini/expand`, `/api/gemini/random-idea`, `/api/gemini/grill`).

### 4. Run the Native Ubuntu Desktop App (Tauri v2)
```bash
npm run tauri dev
```
Launches the `1440x900` dark-violet (`#0F0C1B`) Tauri WebKit window connected to `http://localhost:3000`.

### 5. Build for Production
- **Frontend bundle (`dist/`)**:
  ```bash
  npm run build
  ```
- **Native Ubuntu desktop installers (`.deb`, `.AppImage`)**:
  ```bash
  npm run tauri build
  ```

---

## Verification & Checks

Run these commands before committing changes:
```bash
npx tsc --noEmit
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
```

---

## Project Structure

```text
PromptForge/
├── .github/workflows/ci.yml        # GitHub Actions CI (tsc + cargo check on ubuntu-24.04)
├── server.ts                       # Express + Vite dev server and /api/gemini/* proxy routes
├── index.html                      # Application HTML shell
├── package.json                    # Scripts, React 19 / Vite 8 / Tauri JS dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite + Tailwind v4 configuration
├── src/
│   ├── App.tsx                     # Main 3-column workstation, shortcuts, and AI orchestration
│   ├── main.tsx                    # React entrypoint
│   ├── index.css                   # Purple-glass design tokens and surface styles
│   ├── types/project.ts            # ProjectState, ComplexityMode, and export domain types
│   ├── components/
│   │   ├── Card.tsx                # Frosted glass card primitive
│   │   ├── CodeViewer.tsx          # Live syntax/markdown inspector with copy actions
│   │   ├── KeyringModal.tsx        # Desktop GNOME Keyring API key modal
│   │   ├── ModeSwitcher.tsx        # Simple | Balanced | Pro mode selector
│   │   ├── SaveModal.tsx           # Ubuntu directory picker & bundle export modal
│   │   └── Tooltip.tsx             # Accessible 100ms hover explainer (role="tooltip")
│   ├── decks/
│   │   ├── ManifestDeck.tsx        # Core idea, target platform, and main steps
│   │   ├── ArchitectureDeck.tsx    # Ground rules & Pro architecture/security controls
│   │   ├── GrillDeck.tsx           # 3-question Socratic multiple-choice interview
│   │   ├── TasksDeck.tsx           # HITL / AFK task slicing and {{variable}} tokens
│   │   └── ExporterDeck.tsx        # Multi-platform prompt contracts & export triggers
│   └── services/
│       ├── compiler.ts             # Pure deterministic compiler for specs & platform prompts
│       ├── geminiClient.ts         # Dual-mode Tauri IPC / Express client with 30s timeout
│       ├── presets.ts              # Default sample project & curated starter templates
│       ├── tauriBridge.ts          # Native dialog, keyring, and export IPC bridge
│       └── tooltips.ts             # Plain-English tooltip dictionary
├── src-tauri/
│   ├── Cargo.toml                  # Rust dependencies (tauri v2, reqwest, keyring, plugins)
│   ├── tauri.conf.json             # App identifier, 1440x900 window, Ubuntu bundle targets
│   ├── capabilities/default.json   # Least-privilege permissions (core:default, dialog:allow-open, fs:default)
│   ├── build.rs                    # Tauri build script
│   └── src/
│       ├── main.rs                 # Desktop binary entrypoint
│       └── lib.rs                  # IPC commands: save_spec_bundle, get/set/has_secure_key, gemini_proxy_request
├── tests/                          # Unit tests (compiler, presets, tauriBridge, geminiClient)
├── server.test.ts                  # Express route, timeout, and error-privacy regression tests
├── Agents.md                       # Agent architecture, conventions, and security instructions
├── spec.md                         # Product specification & EARS behavioral requirements
├── plan.md                         # Phased native desktop technical roadmap
├── Tasks.md                        # Implementation task list (T001–T008)
└── GEMINI.md                       # Workspace rule invariants
```

---

## Security & Architecture Notes

- **Sandboxed UI Layer**: Frontend code never writes directly to disk; file writes route through the Rust [`save_spec_bundle`](src-tauri/src/lib.rs) IPC command when running natively.
- **Path Traversal Guard**: Both `canonicalizeLinuxPath` (`src/services/tauriBridge.ts`) and `validate_and_resolve_dir` (`src-tauri/src/lib.rs`) reject `..` segments, expand `~/`, canonicalize target directories, and restrict written filenames strictly to `AGENTS.md`, `spec.md`, `plan.md`, and `tasks.md`.
- **Least-Privilege Capabilities**: `src-tauri/capabilities/default.json` limits permissions to `core:default`, `dialog:allow-open`, and `fs:default`.
- **OS Keyring Storage**: `get_secure_key`, `set_secure_key`, and `has_secure_key` store and check API credentials under the `promptforge` service in the system keyring via `keyring`, while `gemini_proxy_request` sends credentials strictly via the `x-goog-api-key` header.

### Roadmap Status (see `plan.md`)
- **Phase 1 (Complete)**: Tauri v2 crate harness, `1440x900` dark window config, least-privilege capabilities, and `cargo check` / `vite build` verification.
- **Phase 2 (Complete)**: Native Rust `gemini_proxy_request` IPC command, dual-mode `geminiClient.ts`, and `KeyringModal` for standalone packaged builds.
- **Phase 3 (Complete)**: Wired `@tauri-apps/plugin-dialog` native folder picker into `SaveModal.tsx` and dynamic `$HOME` / `~/` path resolution.
- **Phase 4 (Complete)**: Automated Node + Rust test suites, CI integration, documentation sync, and Ubuntu `.deb` / `.AppImage` bundle verification.

---

## Documentation

- [spec.md](./spec.md) — Product specification and EARS behavioral requirements
- [plan.md](./plan.md) — Phased Tauri v2 desktop architecture plan
- [Tasks.md](./Tasks.md) — Implementation task breakdown (`T001–T008`)
- [Agents.md](./Agents.md) — Coding conventions, testing, and security guidelines
