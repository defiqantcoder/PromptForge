# PromptForge

A fast, jargon-free **Ubuntu desktop & web specification workstation** that turns plain-English application ideas into structured, production-ready AI coding contracts (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, plus optional `COLLABORATION.md` and `.continuerules`), **unlimited Google Stitch UI screen & menu prompts**, and step-by-step build handoffs for **Google AI Studio**, **Google Antigravity (AGY)**, **Gemini Canvas**, **Local AI (Ollama / Continue)**, and **GitHub Copilot**.

---

## Key Features

- **Low-Latency AI & Model Switcher (`3.5 Flash-Lite` | `3.6 Flash` | `3.8 Flash` | `3.1 Pro` | `4 Argon`)**
  - Uses explicit `thinkingConfig.thinkingLevel` (`LOW` on Flash/Pro/Argon, `MINIMAL` on Flash-Lite) so requests return rapidly instead of stalling on extended default reasoning.
  - Swap models anytime directly from the workstation control bar.
- **Three-Tier Complexity Switcher (`Simple` | `Balanced` | `Pro`)**
  - **Simple Mode (`Alt+1`)**: Focuses on your core plain-English answers (*App Name & Tagline*, *Q1 Big Idea*, *Q2 Target Device*, *Q3 Feature List*, and *Q4 Coding Language*), plus **Guided Build Workflow** and **Multi-Platform Exporters**.
  - **Balanced Mode (`Alt+2`)**: Adds **Everyday Ground Rules** (*Offline-First*, *High Performance*, *Local Privacy*, *Dark Mode Default*) and the dynamic **"Grill Me"** Socratic clarification interview.
  - **Pro Mode (`Alt+3`)**: Unlocks full 10-section `AGENTS.md` configuration, task slicing strategies (`hitl-first`, `balanced-slices`, `afk-autonomous` with `HITL`/`AFK`/`[P]` tags), custom rules, and interactive `{{variable}}` template tokens.
  - Switching tiers only filters the visible decks—all entered state persists seamlessly in memory and `localStorage`.
- **Most Recent 3 Starter Blueprints**
  - The left sidebar automatically tracks and displays your **3 most recent project blueprints** so you can switch between active app ideas with one click or reset to a clean slate via **New Blank App**.
- **Comprehensive 9-Section `plan.md` Compiler**
  - Compiles a detailed technical blueprint covering executive summary, ASCII architecture flow, feature traceability matrix, multi-screen Stitch hierarchy, typed domain models, IPC/API contracts, failure & latency recovery, security/verification matrix, and multi-agent / local AI orchestration.
- **Universal `?` Plain-English Hover Explainers**
  - Hovering over `?` badges next to headers, navigation links, sections, blanks, and action buttons opens accessible (`role="tooltip"`) plain-English explanations of what each item does and how AI tools use it.
- **Unlimited Text & Unlimited Full-Context "Fill with AI"**
  - Write as much detail as you like without artificial character or feature limits.
  - Click **Fill with AI** repeatedly (unlimited times) next to any blank (`App Name`, `Tagline`, `Big Idea`, `Next Feature`, `Language Notes`, Pro fields, `Dynamic Token`, `Custom Rule`, `Stitch Visual Direction`, per-screen Stitch notes, `Handoff Notes`, `Local Agent Guardrails`, `Multi-Agent Protocol`). Re-clicking automatically sends the current draft + variation seed so Gemini refines or offers fresh alternatives.
- **5-Question Memory "Grill Me" & Section Mini "Grill Me" Buttons**
  - Generates **5 targeted multiple-choice questions per round** while **remembering and retaining all previous questions & answers** across rounds (never wiping prior decisions when appending new follow-ups; individual or all Q&A can still be removed manually).
  - Focused **Mini Grill** buttons next to *Big Idea*, *Feature List*, *Coding Language*, *Ground Rules*, *Pro Architecture*, and *Stitch UI Design* ask quick multiple-choice questions to help add concrete detail on demand.
- **Coding Language Selector & AI Advisor ("What's Best for What?")**
  - Pick `Auto`, `TypeScript + React`, `Rust + Tauri v2`, `Python`, `Dart + Flutter`, `Kotlin`, `Swift`, `Go`, or `C# / .NET`—or click **Ask AI: What's Best for What?** for a plain-English recommendation, trade-offs breakdown, and per-language comparison tailored to your project.
- **Guided Build Workflow & Unlimited Google Stitch Screen/Menu Prompts**
  - **Stage 1 — Google Stitch UI Studio**: Attach reference **idea images** (`Upload Idea Images`), run **Grill Me on UI Design** or **Surprise Me (AI UI)**, generate the master `stitch-ui-prompt.txt`, add **unlimited individual Screen / Menu / Modal / Component Stitch prompts**, and upload what Google Stitch builds (**Upload Stitch Export / Screenshot**).
  - **Stage 2 — Recommended Next App & Spec Bundle**: Automatically recommends the right next builder (`Google Antigravity (AGY)` or `Google AI Studio`), generates the next prompt incorporating your Stitch output, and lets you copy/download/save `AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, plus optional `COLLABORATION.md` and `.continuerules`.
  - **Stage 3 — Final Polish**: Generates a dedicated iteration/polish prompt (`Gemini Canvas` or `Antigravity`).
- **Optional Local AI Agents (Ollama / Continue) & Multi-Agent `COLLABORATION.md`**
  - Enable **Local AI Agents** to generate `.continuerules` and ready-to-run `ollama` model commands (`qwen2.5-coder:14b`, `llama3.3:70b`, `deepseek-r1:14b`, etc.).
  - Enable **Multi-Agent Coordination** to define parallel agent lanes with explicit **Work On** vs. **Stay Away From** paths and handoff notes compiled into `COLLABORATION.md`.
- **Native Ubuntu Export & Desktop Keyring**
  - **Save to Computer** routes through Rust Tauri IPC (`save_spec_bundle`) with canonical path validation and `..` traversal rejection, and stores your Gemini key locally in GNOME Keyring via `libsecret`.

---

## Tech Stack

- **Desktop Shell**: [Tauri v2](https://v2.tauri.app/) (`tauri 2.12.5`, Rust `edition = "2024"`, `rust-version = "1.90"`)
  - Plugins & Crates: `tauri-plugin-dialog`, `tauri-plugin-fs`, `tauri-plugin-log`, `keyring 2.3.3`, `reqwest 0.12`, `serde`, `serde_json`
- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **UI & Motion**: Radix UI Primitives (`Dialog`, `Tabs`, `Tooltip`), Lucide React, Motion
- **Dev API Proxy & AI SDK**: Express 4 (`tsx server.ts`), `@google/genai` (default `gemini-3.8-flash` with `thinkingLevel: LOW`), `dotenv`

---

## Prerequisites (Ubuntu / Linux — Building From Source Only)

Pre-built GitHub Release packages already include bundled runtime dependencies (`.AppImage`) or declare full system dependencies automatically via `apt` (`.deb`). If compiling from source:

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

## Installing / Updating the Desktop App (Ubuntu Release)

Download the latest `.deb` or self-contained `.AppImage` from [GitHub Releases](https://github.com/defiqantcoder/PromptForge/releases):

- **Install or upgrade the `.deb` package** (automatically resolves and installs required system dependencies):
  ```bash
  sudo apt install -y ./PromptForge_0.3.0_amd64.deb
  ```
- **Or run the standalone `.AppImage`** (bundles WebKit/GTK/GStreamer runtime libraries inside the image):
  ```bash
  chmod +x PromptForge_0.3.0_amd64.AppImage
  ./PromptForge_0.3.0_amd64.AppImage
  ```

---

## Getting Started from Source

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your Gemini API key (required for AI endpoints in web/Express dev mode; desktop packaged builds store keys in the system keyring via the UI):
```bash
cp .env.example .env
```
Edit `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key"
```
> Without `GEMINI_API_KEY`, the workstation UI, live spec compiler, recent blueprints, and file exporter still work offline; AI endpoints return a friendly configuration notice.

### 3. Run the Web Workstation (Express + Vite Dev Server)
```bash
npm run dev
```
Opens on `http://localhost:3000` with Vite middleware and `/api/gemini/*` routes (`/api/health`, `/api/gemini/expand`, `/api/gemini/random-idea`, `/api/gemini/grill`, `/api/gemini/fill-field`, `/api/gemini/mini-grill`, `/api/gemini/stitch-surprise`, `/api/gemini/recommend-language`).

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
npm test
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
cargo clippy --manifest-path src-tauri/Cargo.toml -- -D warnings
```

---

## Project Structure

```text
PromptForge/
├── .github/workflows/ci.yml        # GitHub Actions CI (tsc + npm test + build + cargo test on ubuntu-24.04)
├── server.ts                       # Express + Vite dev server, model switcher & /api/gemini/* proxy routes
├── server/                         # Security origin guard, ZIP archive & spec validation Express modules
├── index.html                      # Application HTML shell
├── package.json                    # Scripts, React 19 / Vite 8 / Tauri JS dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite + Tailwind v4 configuration
├── src/
│   ├── App.tsx                     # Main 3-column workstation, model switcher, 5-question memory Grill Me & AI orchestration
│   ├── main.tsx                    # React entrypoint
│   ├── index.css                   # Purple-glass design tokens and surface styles
│   ├── types/project.ts            # ProjectState, AiModelId, LocalAgentsConfig, MultiAgentConfig, StitchScreenPrompt & domain types
│   ├── components/
│   │   ├── Card.tsx                # Frosted glass card primitive with header ? tooltip
│   │   ├── CodeViewer.tsx          # Live syntax/markdown inspector with copy, download & {{token}} editor
│   │   ├── FillWithAiButton.tsx    # Full-context unlimited Fill with AI trigger button
│   │   ├── KeyringModal.tsx        # Desktop GNOME Keyring API key modal
│   │   ├── MiniGrillSection.tsx    # Reusable section-level Mini Grill button & interactive panel
│   │   ├── ModeSwitcher.tsx        # Simple | Balanced | Pro mode selector
│   │   ├── SaveModal.tsx           # Ubuntu directory picker & bundle export modal
│   │   └── Tooltip.tsx             # Accessible 100ms hover explainer & HelpBadge (?)
│   ├── decks/
│   │   ├── ManifestDeck.tsx        # Idea, Platform, Q3 Feature List, Q4 Coding Language & AI Advisor
│   │   ├── ArchitectureDeck.tsx    # Everyday ground rules & Mini Grill controls
│   │   ├── GrillDeck.tsx           # Dynamic Socratic 5-question multiple-choice interview with memory
│   │   ├── TasksDeck.tsx           # Pro HITL / AFK task slicing, 10-section AGENTS.md overrides & {{variable}} tokens
│   │   ├── WorkflowDeck.tsx        # Guided Build Workflow, Multi-Screen Stitch Prompts, Local AI (Ollama/Continue) & COLLABORATION.md
│   │   └── ExporterDeck.tsx        # Multi-platform prompt contracts & export triggers
│   └── services/
│       ├── compiler.ts             # Pure deterministic compiler for specs, 9-section plan.md, COLLABORATION.md & .continuerules
│       ├── geminiClient.ts         # Dual-mode Tauri IPC / Express client with 30s timeout, model routing & variation nonces
│       ├── presets.ts              # Model catalog, language catalog, Ollama presets & curated starter blueprints
│       ├── tauriBridge.ts          # Native dialog, keyring, and export IPC bridge
│       └── tooltips.ts             # Plain-English tooltip dictionary
├── src-tauri/
│   ├── Cargo.toml                  # Rust dependencies (tauri v2, reqwest, keyring, plugins)
│   ├── tauri.conf.json             # App identifier, 1440x900 window, bundled Linux deb & AppImage settings
│   ├── capabilities/default.json   # Least-privilege permissions (core:default, dialog:allow-open, fs:default)
│   ├── build.rs                    # Tauri build script
│   └── src/
│       ├── main.rs                 # Desktop binary entrypoint
│       ├── lib.rs                  # Tauri app setup and IPC commands delegating to export & gemini modules
│       ├── export.rs               # Canonicalized path guard & spec allowlist (including COLLABORATION.md & .continuerules)
│       └── gemini.rs               # Native Gemini API proxy builder, model allowlist & thinkingConfig injection
├── tests/                          # Unit tests (compiler, presets, tauriBridge, geminiClient, routes & security)
├── server.test.ts                  # Express route, timeout, multimodal & error-privacy regression tests
├── Agents.md                       # Agent architecture, conventions, and security instructions
├── spec.md                         # Product specification & EARS behavioral requirements
├── plan.md                         # Phased native desktop technical roadmap
├── Tasks.md                        # Implementation task list (T001–T008)
└── GEMINI.md                       # Workspace rule invariants
```

---

## Security & Architecture Notes

- **Sandboxed UI Layer**: Frontend code never writes directly to disk; file writes route through the Rust [`save_spec_bundle`](src-tauri/src/export.rs) IPC command when running natively.
- **Path Traversal Guard**: Both `canonicalizeLinuxPath` (`src/services/tauriBridge.ts`) and `validate_and_resolve_dir` (`src-tauri/src/export.rs`) reject `..` segments, expand `~/`, canonicalize target directories, and restrict written filenames strictly to `AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`, `COLLABORATION.md`, and `.continuerules`.
- **Least-Privilege Capabilities**: `src-tauri/capabilities/default.json` limits permissions to `core:default`, `dialog:allow-open`, and `fs:default`.
- **OS Keyring Storage**: `get_secure_key`, `set_secure_key`, and `has_secure_key` store and check API credentials under the `promptforge` service in the system keyring via `keyring`, while `gemini_proxy_request` sends credentials strictly via the `x-goog-api-key` header.

---

## Documentation

- [spec.md](./spec.md) — Product specification and EARS behavioral requirements
- [plan.md](./plan.md) — Phased Tauri v2 desktop architecture plan
- [Tasks.md](./Tasks.md) — Implementation task breakdown (`T001–T008`)
- [Agents.md](./Agents.md) — Coding conventions, testing, and security guidelines
