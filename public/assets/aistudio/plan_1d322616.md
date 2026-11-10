# Technical Plan: PromptForge Native Workstation

## 1. System Architecture
PromptForge runs as a compiled native Linux binary using Tauri v2. The frontend is an isolated React 19 single-page application rendered inside the system WebKit engine, communicating with a lightweight Rust backend via asynchronous IPC commands.

Flow:
[React 19 Frontend: Decks & Mode Switcher] 
    │
    ├──► [Gemini API Client (@google/genai)] ──► Real-Time Preview Console
    │
    └──► [Tauri IPC Bridge (@tauri-apps/api/core)]
             │
             ▼
[Rust Backend (src-tauri)]
    ├──► Filesystem Writer (Atomic spec/agents/tasks save)
    └──► GNOME Keyring Client (Secure credential storage)

## 2. Key Data Models (TypeScript)

Type Definitions:
- ComplexityMode: 'simple' | 'balanced' | 'pro'
- TargetPlatform: 'web' | 'mobile' | 'desktop' | 'cli'

Project State Contract:
- appName: string
- coreIdea: string
- targetPlatform: TargetPlatform
- features: string[]
- groundRules:
  - offlineFirst: boolean
  - highPerformance: boolean
  - localPrivacy: boolean
  - darkModeDefault: boolean
- clarifications: Array<{ id: string; question: string; options: string[]; selectedAnswer?: string }>
- customRules: string[]

## 3. Rust Backend Commands (src-tauri/src/lib.rs)

- `save_spec_bundle(target_dir: String, files: HashMap<String, String>) -> Result<bool, String>`
  - Canonicalizes destination directory path.
  - Validates write permissions and rejects directory traversal sequences.
  - Atomically writes `AGENTS.md`, `spec.md`, and `tasks.md` to disk.

- `get_secure_key(service: String) -> Result<String, String>`
  - Queries local desktop keyring for the saved Gemini API key.

- `set_secure_key(service: String, key: String) -> Result<(), String>`
  - Saves the Gemini API key securely using system credential storage.

## 4. UI Design Implementation
- Color Scheme: Glassmorphic dark purple (`#0F0C1B` background, frosted `#1A142E` cards, `#8B5CF6` electric violet accents, `#34D399` mint green status).
- Tooltip System: Built using Radix UI Tooltip primitives styled with a 1px solid lilac border, 12px chamfered corners, and subtle back-glows.
- Monospace Syntax View: Highlighted Markdown viewer for live inspection of compiled contracts before saving.
