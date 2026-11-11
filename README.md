# PromptForge

A fast, jargon-free **Ubuntu desktop & web specification workstation** that turns plain-English application ideas into structured, production-ready AI coding contracts (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`), **Google Stitch UI design prompts**, and step-by-step build handoffs for **Google AI Studio**, **Google Antigravity (AGY)**, **GitHub Copilot**, and **Gemini Canvas**.

---

## Key Features

- **Three-Tier Complexity Switcher (`Simple` | `Balanced` | `Pro`)**
  - **Simple Mode (`Alt+1`)**: Focuses on your core plain-English answers (*App Name & Tagline*, *Q1 Big Idea*, *Q2 Target Device*, *Q3 Feature List*, and *Q4 Coding Language*), plus **Guided Build Workflow** and **Multi-Platform Exporters**.
  - **Balanced Mode (`Alt+2`)**: Adds **Everyday Ground Rules** (*Offline-First*, *High Performance*, *Local Privacy*, *Dark Mode Default*) and the dynamic **"Grill Me"** Socratic clarification interview.
  - **Pro Mode (`Alt+3`)**: Unlocks full 10-section `AGENTS.md` configuration, task slicing strategies (`hitl-first`, `balanced-slices`, `afk-autonomous` with `HITL`/`AFK`/`[P]` tags), custom rules, and interactive `{{variable}}` template tokens.
  - Switching tiers only filters the visible decks—all entered state persists seamlessly in memory and `localStorage`.
- **Most Recent 3 Starter Blueprints**
  - The left sidebar automatically tracks and displays your **3 most recent project blueprints** so you can switch between active app ideas with one click or reset to a clean slate via **New Blank App**.
- **Six Stacked Workstation Decks**
  - `ManifestDeck` (Idea, Platform, Feature List + Add Step, Coding Language Selector + AI Language Advisor), `ArchitectureDeck`, `GrillDeck`, `TasksDeck`, `WorkflowDeck` (Google Stitch UI Studio + Next App Handoff), and `ExporterDeck`, paired with the live **Contract Compiler** inspector.
- **Universal `?` Plain-English Hover Explainers**
  - Hovering over `?` badges next to headers, navigation links, sections, blanks, and action buttons opens accessible (`role="tooltip"`) plain-English explanations of what each item does and how AI tools use it.
- **Unlimited Text & Full-Context "Fill with AI"**
  - Write as much detail as you like without artificial character or feature limits.
  - Every field blank (`App Name`, `Tagline`, `Big Idea`, `Next Feature`, `Language Notes`, Pro fields, `Dynamic Token`, `Custom Rule`, `Stitch Visual Direction`, and `Handoff Notes`) includes a **Fill with AI** button that reads **all other filled sections** across your workspace.
- **Dynamic "Grill Me" & Section Mini "Grill Me" Buttons**
  - The main **Grill Me** deck dynamically adapts its 3 multiple-choice questions in the background as you update earlier sections, preserving matching answers.
  - Focused **Mini Grill** buttons next to *Big Idea*, *Feature List*, *Coding Language*, *Ground Rules*, *Pro Architecture*, and *Stitch UI Design* ask 1–2 quick multiple-choice questions to help you add concrete detail on demand.
- **Coding Language Selector & AI Advisor ("What's Best for What?")**
  - Pick `Auto`, `TypeScript + React`, `Rust + Tauri v2`, `Python`, `Dart + Flutter`, `Kotlin`, `Swift`, `Go`, or `C# / .NET`—or click **Ask AI: What's Best for What?** for a plain-English recommendation, trade-offs breakdown, and per-language comparison tailored to your project.
- **Guided Build Workflow & Google Stitch UI Studio**
  - **Stage 1 — Google Stitch UI Studio**: Attach reference **idea images** (`Upload Idea Images`), run **Grill Me on UI Design** or **Surprise Me (AI UI)** (sending images multimodally to Gemini), refine your **Visual Direction**, copy your tailored Stitch prompt, and upload what Google Stitch builds (**Upload Stitch Export / Screenshot**).
  - **Stage 2 — Recommended Next App & `.md` Bundle**: Automatically recommends the right next builder (`Google Antigravity (AGY)` or `Google AI Studio`), generates the next prompt incorporating your Stitch output, and lets you copy/download/save `AGENTS.md`, `spec.md`, `plan.md`, and `tasks.md`.
  - **Stage 3 — Final Polish**: Generates a dedicated iteration/polish prompt (`Gemini Canvas` or `GitHub Copilot`).
- **Native Ubuntu Export & Desktop Keyring**
  - **Save to Computer** routes through Rust Tauri IPC (`save_spec_bundle`) with canonical path validation and `..` traversal rejection, and stores your Gemini key locally in GNOME Keyring via `libsecret`.

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

## Installing / Updating the Desktop App (Ubuntu Release)

Download the latest `.deb` or `.AppImage` from [GitHub Releases](https://github.com/defiqantcoder/PromptForge/releases):

- **Install or upgrade the `.deb` package**:
  ```bash
  sudo apt install -y ./PromptForge_0.2.0_amd64.deb
  ```
- **Or run the standalone `.AppImage`**:
  ```bash
  chmod +x PromptForge_0.2.0_amd64.AppImage
  ./PromptForge_0.2.0_amd64.AppImage
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
├── server.ts                       # Express + Vite dev server and /api/gemini/* proxy routes
├── index.html                      # Application HTML shell
├── package.json                    # Scripts, React 19 / Vite 8 / Tauri JS dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite + Tailwind v4 configuration
├── src/
│   ├── App.tsx                     # Main 3-column workstation, dynamic Grill Me, Recent 3 Blueprints & AI orchestration
│   ├── main.tsx                    # React entrypoint
│   ├── index.css                   # Purple-glass design tokens and surface styles
│   ├── types/project.ts            # ProjectState, CodingLanguageId, StitchUiConfig, WorkflowProgress & domain types
│   ├── components/
│   │   ├── Card.tsx                # Frosted glass card primitive with header ? tooltip
│   │   ├── CodeViewer.tsx          # Live syntax/markdown inspector with copy, download & {{token}} editor
│   │   ├── FillWithAiButton.tsx    # Full-context Fill with AI trigger button
│   │   ├── KeyringModal.tsx        # Desktop GNOME Keyring API key modal
│   │   ├── MiniGrillSection.tsx    # Reusable section-level Mini Grill button & interactive panel
│   │   ├── ModeSwitcher.tsx        # Simple | Balanced | Pro mode selector
│   │   ├── SaveModal.tsx           # Ubuntu directory picker & bundle export modal
│   │   └── Tooltip.tsx             # Accessible 100ms hover explainer & HelpBadge (?)
│   ├── decks/
│   │   ├── ManifestDeck.tsx        # Idea, Platform, Q3 Feature List, Q4 Coding Language & AI Advisor
│   │   ├── ArchitectureDeck.tsx    # Everyday ground rules & Mini Grill controls
│   │   ├── GrillDeck.tsx           # Dynamic Socratic 3-question multiple-choice interview
│   │   ├── TasksDeck.tsx           # Pro HITL / AFK task slicing, 10-section AGENTS.md overrides & {{variable}} tokens
│   │   ├── WorkflowDeck.tsx        # Guided Build Workflow & Google Stitch UI Studio (images, Surprise Me, result upload)
│   │   └── ExporterDeck.tsx        # Multi-platform prompt contracts & export triggers
│   └── services/
│       ├── compiler.ts             # Pure deterministic compiler for specs, Stitch context & workflow recommendations
│       ├── geminiClient.ts         # Dual-mode Tauri IPC / Express client with 30s timeout & full context helper
│       ├── presets.ts              # Language catalog, recent 3 blueprints helpers & curated starter templates
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
├── server.test.ts                  # Express route, timeout, multimodal & error-privacy regression tests
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

---

## Documentation

- [spec.md](./spec.md) — Product specification and EARS behavioral requirements
- [plan.md](./plan.md) — Phased Tauri v2 desktop architecture plan
- [Tasks.md](./Tasks.md) — Implementation task breakdown (`T001–T008`)
- [Agents.md](./Agents.md) — Coding conventions, testing, and security guidelines
