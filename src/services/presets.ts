import {
  AiModelId,
  CodingLanguageId,
  LocalAgentsConfig,
  MultiAgentConfig,
  ProjectState,
  RecentBlueprintItem,
  StarterTemplate,
  StitchUiConfig,
} from '../types/project';

export const DEFAULT_LOCAL_AGENTS: LocalAgentsConfig = {
  enabled: false,
  provider: 'both',
  ollamaModel: 'qwen2.5-coder:14b',
  ollamaEndpoint: 'http://127.0.0.1:11434',
  notes: 'Keep inference 100% local via Ollama with Continue IDE rules synced to .continuerules.',
};

export const DEFAULT_MULTI_AGENT: MultiAgentConfig = {
  enabled: false,
  lanes: [
    {
      id: 'agent-ui',
      agentName: 'Agent A · UI & Design',
      focusArea: 'Screens, Stitch integration, accessibility & CSS',
      workOnPaths: 'src/components/, src/decks/, src/index.css',
      stayAwayPaths: 'server/, src-tauri/src/',
      status: 'ready',
      handoffNote: 'Wait for typed API payloads from Agent B before wiring live calls.',
    },
    {
      id: 'agent-backend',
      agentName: 'Agent B · Backend & Native IPC',
      focusArea: 'Express API routes, Rust Tauri IPC & security guards',
      workOnPaths: 'server.ts, server/, src-tauri/src/',
      stayAwayPaths: 'src/decks/, src/components/',
      status: 'ready',
      handoffNote: 'Publish request/response shapes in COLLABORATION.md when changed.',
    },
    {
      id: 'agent-qa',
      agentName: 'Agent C · QA, Specs & Release',
      focusArea: 'Unit tests, verification commands, docs & packaging',
      workOnPaths: 'tests/, server.test.ts, README.md',
      stayAwayPaths: 'src/decks/, server/archiveRoute.ts',
      status: 'ready',
      handoffNote: 'Run npx tsc --noEmit, npm test, and cargo test after lane handoffs.',
    },
  ],
  sharedProtocolNotes:
    'Update COLLABORATION.md Status & Claims before editing shared contracts (src/types/project.ts) and never touch files listed in another agent lane Stay Away From boundary.',
};

export interface AiModelOption {
  id: AiModelId;
  label: string;
  speedTag: string;
  thinkingLevel: 'MINIMAL' | 'LOW' | 'MEDIUM';
  summary: string;
}

export const AI_MODELS: AiModelOption[] = [
  {
    id: 'gemini-3.5-flash-lite',
    label: 'Gemini 3.5 Flash-Lite',
    speedTag: 'Fastest',
    thinkingLevel: 'MINIMAL',
    summary: 'Near-instant responses with minimal thinking overhead for snappy Fill with AI & Grill Me.',
  },
  {
    id: 'gemini-3.6-flash',
    label: 'Gemini 3.6 Flash',
    speedTag: 'Very Fast',
    thinkingLevel: 'LOW',
    summary: 'High-speed Flash model with crisp JSON structure and low latency.',
  },
  {
    id: 'gemini-3.8-flash',
    label: 'Gemini 3.8 Flash',
    speedTag: 'Balanced Fast',
    thinkingLevel: 'LOW',
    summary: 'Default everyday model tuned to Low thinking for rapid coding specs without sluggishness.',
  },
  {
    id: 'gemini-3.1-pro-preview',
    label: 'Gemini 3.1 Pro',
    speedTag: 'Deep Reasoning',
    thinkingLevel: 'LOW',
    summary: 'Higher architectural reasoning depth for nuanced specs, Pro rules, and complex systems.',
  },
  {
    id: 'gemini-4-argon',
    label: 'Gemini 4 Argon',
    speedTag: 'Flagship',
    thinkingLevel: 'LOW',
    summary: 'Latest flagship model (1M shared context) for highest-quality product & engineering synthesis.',
  },
];

export const OLLAMA_MODEL_PRESETS = [
  'qwen2.5-coder:14b',
  'qwen2.5-coder:7b',
  'llama3.3:70b',
  'deepseek-r1:14b',
  'codestral:22b',
  'gemma3:12b',
];

export const DEFAULT_PROJECT_STATE: ProjectState = {
  id: 'promptforge-workstation',
  appName: 'PromptForge',
  tagline: 'Plain-language specification workstation and multi-platform prompt compiler for Ubuntu desktop.',
  coreIdea:
    'PromptForge is a fast, friendly Ubuntu desktop application that lets non-technical builders and developers describe an app idea in plain English and automatically compiles it into structured specification files (spec.md, plan.md, tasks.md, AGENTS.md) and platform-tuned prompts for Google Stitch, AI Studio, Antigravity, GitHub Copilot, and Gemini Canvas.\n\nIt strips away intimidating software jargon across three progressive complexity tiers (Simple, Balanced, Pro) while providing instant plain-English hover explainers, one-click Gemini idea expansion, and a 3-question Socratic clarification interview.',
  targetPlatform: 'desktop',
  aiModel: 'gemini-3.8-flash',
  codingLanguage: 'typescript-react',
  localAgents: DEFAULT_LOCAL_AGENTS,
  multiAgent: DEFAULT_MULTI_AGENT,
  features: [
    'Switch effortlessly between Simple, Balanced, and Pro modes without losing any entered project details',
    'Hover over any section badge, toggle, or button to read a friendly 2-sentence plain-English explanation',
    'Click "Flesh Out My Idea" or "Random App Idea with AI" to expand rough thoughts using Gemini 3.8 Flash',
    'Run the 3-question "Grill Me" interview to resolve missing edge cases through simple multiple-choice cards',
    'Inspect and export live spec.md, plan.md, tasks.md, AGENTS.md, and platform prompts to a local Ubuntu directory',
  ],
  groundRules: {
    offlineFirst: true,
    highPerformance: true,
    localPrivacy: true,
    darkModeDefault: true,
  },
  clarifications: [
    {
      id: 'q-layout',
      category: 'Workspace Layout',
      question: 'How should the five workstation decks appear in the central workspace?',
      options: [
        '(Recommended) Stacked cards filtered by Simple, Balanced, or Pro mode',
        'Single active deck at a time via sidebar navigation',
        'Support both stacked and single-deck views with a toggle',
      ],
      selectedAnswer: '(Recommended) Stacked cards filtered by Simple, Balanced, or Pro mode',
    },
    {
      id: 'q-export',
      category: 'File Export & Tauri IPC',
      question: 'How should the native Save to Computer export behave before Tauri compilation?',
      options: [
        '(Recommended) Simulated Ubuntu directory dialog with direct file downloads',
        'Tauri IPC bridge with silent single-file export',
        'Mock preview drawer showing compiled disk payloads',
      ],
      selectedAnswer: '(Recommended) Simulated Ubuntu directory dialog with direct file downloads',
    },
    {
      id: 'q-onboarding',
      category: 'Initial Workspace State',
      question: 'How should new sessions start when opening the workstation?',
      options: [
        '(Recommended) Pre-load a sample app with starter templates and AI random idea generator',
        'Start with a blank canvas and manual input fields',
        'Open a mandatory project setup wizard modal on startup',
      ],
      selectedAnswer:
        '(Recommended) Pre-load a sample app with starter templates and AI random idea generator',
    },
  ],
  proConfig: {
    stackSummary:
      'Tauri v2 (Rust 1.80+), React 19, TypeScript 5.x, Vite, Tailwind CSS v4, Radix UI Primitives, @google/genai SDK',
    architectureStyle:
      'Sandboxed React UI layer communicating via typed Tauri IPC commands (`save_spec_bundle`, `get_secure_key`) and Express Gemini server routes',
    testingStrategy:
      'Behavioral verification with Vitest & React Testing Library; mock Tauri IPC invocations; assert role="tooltip" accessibility',
    securityBoundary:
      'Server-side Gemini API key management; canonicalized Rust file write paths rejecting ../ traversal; least-privilege capabilities/default.json',
    taskSlicingMode: 'balanced-slices',
    customRules: [
      'Use functional React components with named exports and strict TypeScript domain models',
      'Every section header and configuration control must include a plain-English hover tooltip',
      'Never expose raw API keys in client-side code or log credentials to standard output',
    ],
    templateVariables: {
      primary_model: 'gemini-3.8-flash',
      target_os: 'Ubuntu 24.04 LTS',
      accent_color: '#8B5CF6',
      export_dir: '~/Projects/promptforge-specs',
    },
  },
  lastUpdated: new Date().toISOString(),
};

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: 'promptforge-self',
    name: 'PromptForge Workstation',
    badge: 'Desktop · Tauri v2',
    summary: 'The official PromptForge native Ubuntu specification & prompt compiler blueprint.',
    state: {
      id: DEFAULT_PROJECT_STATE.id,
      appName: DEFAULT_PROJECT_STATE.appName,
      tagline: DEFAULT_PROJECT_STATE.tagline,
      coreIdea: DEFAULT_PROJECT_STATE.coreIdea,
      targetPlatform: DEFAULT_PROJECT_STATE.targetPlatform,
      features: [...DEFAULT_PROJECT_STATE.features],
      groundRules: { ...DEFAULT_PROJECT_STATE.groundRules },
      clarifications: [...DEFAULT_PROJECT_STATE.clarifications],
      proConfig: {
        ...DEFAULT_PROJECT_STATE.proConfig,
        customRules: [...DEFAULT_PROJECT_STATE.proConfig.customRules],
        templateVariables: { ...DEFAULT_PROJECT_STATE.proConfig.templateVariables },
      },
    },
  },
  {
    id: 'pulsevault-audio',
    name: 'PulseVault Stem & Sample Lab',
    badge: 'Desktop · Audio Utility',
    summary: 'Local-first audio sample organizer that tags BPM, key signature, and synth patch notes.',
    state: {
      id: 'pulsevault-audio',
      appName: 'PulseVault',
      tagline: 'Lightning-fast local audio sample librarian and synth patch notebook for bedroom producers.',
      coreIdea:
        'Bedroom music producers accumulate thousands of unnamed WAV files across dozens of folders. PulseVault scans local sample directories, automatically groups loops by tempo and musical key, and provides an instant keyboard-driven waveform preview bar.\n\nUsers can attach plain-text hardware synth knob notes to any audio clip and drag-and-drop stems directly into their digital audio workstation without cloud uploads.',
      targetPlatform: 'desktop',
      features: [
        'Drop any local folder of WAV or FLAC files to index BPM, duration, and musical key in seconds',
        'Audition samples instantly with spacebar waveform scrubbing and loop region handles',
        'Filter crates by mood tags, instrument family, or tempo range with zero latency',
        'Attach hardware synthesizer patch sheets and pedal settings to individual recordings',
        'Export curated sample kits as clean, renamed ZIP folders for live performance hardware',
      ],
      groundRules: {
        offlineFirst: true,
        highPerformance: true,
        localPrivacy: true,
        darkModeDefault: true,
      },
      clarifications: [
        {
          id: 'pv-1',
          category: 'File Handling',
          question: 'Should PulseVault move original audio files or leave them in their existing folders?',
          options: [
            '(Recommended) Leave original files untouched and store metadata in a local index',
            'Copy all imported samples into a central library folder',
            'Ask the user every time a folder is dragged in',
          ],
          selectedAnswer:
            '(Recommended) Leave original files untouched and store metadata in a local index',
        },
        {
          id: 'pv-2',
          category: 'Playback Controls',
          question: 'How should sample preview playback work when browsing rapidly with arrow keys?',
          options: [
            '(Recommended) Auto-play on selection with instant voice stealing',
            'Require pressing Spacebar on each file manually',
            'Layer multiple samples simultaneously by default',
          ],
          selectedAnswer: '(Recommended) Auto-play on selection with instant voice stealing',
        },
        {
          id: 'pv-3',
          category: 'Kit Export',
          question: 'How should exported sample packs format filenames for hardware samplers?',
          options: [
            '(Recommended) Prefix with BPM and musical key (e.g., 124_Cm_BassLoop.wav)',
            'Keep original filenames unchanged',
            'Number sequentially from 01 to 99 only',
          ],
          selectedAnswer:
            '(Recommended) Prefix with BPM and musical key (e.g., 124_Cm_BassLoop.wav)',
        },
      ],
      proConfig: {
        stackSummary: 'Tauri v2, Rust Symphonia Audio Decoder, React 19, Canvas 2D Waveform Renderer, Tailwind CSS v4',
        architectureStyle: 'Non-destructive local metadata index backed by Rust async file streaming',
        testingStrategy: 'Vitest unit tests for filename sanitizer, BPM filter math, and keyboard shortcut handlers',
        securityBoundary: 'Read-only access on source sample directories; canonicalized export path checks',
        taskSlicingMode: 'balanced-slices',
        customRules: [
          'Never mutate or overwrite source audio files during library indexing',
          'Render waveforms at 60fps using offscreen canvas caching',
        ],
        templateVariables: {
          primary_model: 'gemini-3.8-flash',
          target_os: 'Ubuntu 24.04 LTS',
          accent_color: '#8B5CF6',
          export_dir: '~/Music/PulseVault-Kits',
        },
      },
    },
  },
  {
    id: 'fieldnote-botany',
    name: 'VerdiTrail Field Journal',
    badge: 'Mobile · Offline PWA',
    summary: 'Offline trail botany and mushroom foraging logbook with seasonal bloom reminders.',
    state: {
      id: 'fieldnote-botany',
      appName: 'VerdiTrail',
      tagline: 'Offline-first pocket field guide and sighting logbook for hikers and amateur botanists.',
      coreIdea:
        'Hikers and amateur naturalists often spot interesting wildflowers, ferns, and fungi deep on forest trails where cell reception does not exist. VerdiTrail lets users snap a quick observation card, record habitat notes (soil moisture, canopy shade, elevation), and compare against a built-in safety checklist.\n\nOnce back home, users can use AI to enrich their rough trail notes into structured species study cards and seasonal return reminders.',
      targetPlatform: 'mobile',
      features: [
        'Log a trail sighting in under 15 seconds with habitat toggles for shade, moisture, and tree companions',
        'Browse a side-by-side lookalike safety checklist that works 100% offline in the backcountry',
        'Organize sightings by trailhead collection and seasonal bloom calendar',
        'Use Gemini AI when back online to turn rough trail notes into structured study flashcards',
        'Export seasonal trail journals as printable PDF or Markdown field reports',
      ],
      groundRules: {
        offlineFirst: true,
        highPerformance: true,
        localPrivacy: true,
        darkModeDefault: true,
      },
      clarifications: [
        {
          id: 'vt-1',
          category: 'Safety Guidance',
          question: 'How should lookalike species warnings be presented on foraging entries?',
          options: [
            '(Recommended) Always display a high-visibility caution banner with lookalike traits',
            'Only show warnings if the user enables Expert Mode',
            'Hide safety notes inside a secondary settings menu',
          ],
          selectedAnswer:
            '(Recommended) Always display a high-visibility caution banner with lookalike traits',
        },
        {
          id: 'vt-2',
          category: 'Location Privacy',
          question: 'How should exact trail coordinates be handled when sharing a journal entry?',
          options: [
            '(Recommended) Strip exact GPS coordinates by default and show only general region',
            'Always publish exact latitude and longitude publicly',
            'Disable sharing entirely',
          ],
          selectedAnswer:
            '(Recommended) Strip exact GPS coordinates by default and show only general region',
        },
        {
          id: 'vt-3',
          category: 'Mobile Ergonomics',
          question: 'How should field logging controls be arranged for one-handed outdoor use?',
          options: [
            '(Recommended) Large bottom-sheet thumb controls with 48px minimum tap targets',
            'Compact desktop-style multi-column spreadsheet table',
            'Voice-only input with no buttons',
          ],
          selectedAnswer:
            '(Recommended) Large bottom-sheet thumb controls with 48px minimum tap targets',
        },
      ],
      proConfig: {
        stackSummary: 'React 19, TypeScript, IndexedDB Offline Store, Tailwind CSS v4, Express + @google/genai',
        architectureStyle: 'Offline-first local store with on-demand AI study card enrichment',
        testingStrategy: 'Vitest tests for offline storage queue, coordinate scrubber, and filter tabs',
        securityBoundary: 'Strip EXIF GPS metadata before any external export unless explicitly toggled',
        taskSlicingMode: 'hitl-first',
        customRules: [
          'All interactive tap targets must be at least 48px tall for gloved or outdoor thumb use',
          'Always display non-consumption educational disclaimers on fungi identification cards',
        ],
        templateVariables: {
          primary_model: 'gemini-3.8-flash',
          target_os: 'Mobile Web / iOS & Android',
          accent_color: '#34D399',
          export_dir: '~/Documents/VerdiTrail-Logs',
        },
      },
    },
  },
];

export const FALLBACK_RANDOM_IDEAS: Array<Omit<ProjectState, 'id' | 'lastUpdated'>> = [
  {
    appName: 'ChronoLoom',
    tagline: 'Visual fiction timeline and subplot weaver for novelists and tabletop GMs.',
    coreIdea:
      'Writers and tabletop game masters struggle to track overlapping character arcs, clues, and world events across multiple chapters or sessions. ChronoLoom provides a calm, drag-and-drop ribbon timeline where each thread represents a character or faction.\n\nWhen two threads cross in the same scene, ChronoLoom highlights continuity gaps and lets the writer ask Gemini to brainstorm believable scene transitions or unresolved clue callbacks.',
    targetPlatform: 'desktop',
    features: [
      'Create color-coded story ribbons for characters, factions, and mystery clues across a visual timeline',
      'Spot continuity errors automatically when a character is scheduled in two places at once',
      'Click any intersection node to draft scene beats with distraction-free markdown notes',
      'Ask Gemini to suggest 3 plot twists or clue callbacks using only already-established lore',
      'Export the entire story bible and chapter outline to clean Markdown or Scrivener-ready files',
    ],
    groundRules: {
      offlineFirst: true,
      highPerformance: true,
      localPrivacy: true,
      darkModeDefault: true,
    },
    clarifications: [
      {
        id: 'cl-1',
        category: 'Calendar System',
        question: 'How should dates on the story timeline be measured?',
        options: [
          '(Recommended) Support both real-world dates and custom fantasy/episode numbering',
          'Restrict strictly to standard Gregorian calendar years',
          'Only allow unnumbered freeform sticky notes',
        ],
        selectedAnswer:
          '(Recommended) Support both real-world dates and custom fantasy/episode numbering',
      },
      {
        id: 'cl-2',
        category: 'Spoiler Control',
        question: 'How should hidden GM secrets be handled when showing the timeline to players?',
        options: [
          '(Recommended) One-click Player Safe View that hides secret nodes and GM notes',
          'Show all spoilers on screen at all times',
          'Require exporting a separate file manually',
        ],
        selectedAnswer:
          '(Recommended) One-click Player Safe View that hides secret nodes and GM notes',
      },
      {
        id: 'cl-3',
        category: 'AI Lore Boundary',
        question: 'What context should Gemini use when suggesting scene transitions?',
        options: [
          '(Recommended) Strictly ground suggestions in the current project lore cards',
          'Invent random new main characters automatically',
          'Rewrite finished chapters without asking',
        ],
        selectedAnswer:
          '(Recommended) Strictly ground suggestions in the current project lore cards',
      },
    ],
    proConfig: {
      stackSummary: 'Tauri v2, React 19, TypeScript, SVG Ribbon Canvas, Tailwind CSS v4, @google/genai',
      architectureStyle: 'Local markdown bundle store with deterministic graph conflict detection',
      testingStrategy: 'Vitest unit tests for timeline overlap detection and Player Safe View filter',
      securityBoundary: 'All manuscript files stored locally; zero background cloud syncing',
      taskSlicingMode: 'balanced-slices',
      customRules: [
        'Never overwrite user prose during AI scene brainstorming; always present suggestions in a side card',
        'Support full keyboard navigation across timeline nodes',
      ],
      templateVariables: {
        primary_model: 'gemini-3.8-flash',
        target_os: 'Ubuntu 24.04 LTS',
        accent_color: '#8B5CF6',
        export_dir: '~/Documents/ChronoLoom-Worlds',
      },
    },
  },
  {
    appName: 'CrateBench',
    tagline: 'Visual electronics workbench and resistor/pinout inventory for hardware makers.',
    coreIdea:
      'Arduino, Raspberry Pi, and custom PCB hobbyists waste hours digging through plastic parts bins trying to remember whether they own a 4.7k ohm resistor or which GPIO pin supports PWM on a specific microcontroller. CrateBench maps physical storage drawers visually on screen and pairs every part with interactive pinout diagrams.\n\nBuilders can describe a weekend gadget project in plain English, and CrateBench checks what parts they already own in their drawers versus what they need to order.',
    targetPlatform: 'desktop',
    features: [
      'Map physical component organizer drawers on a visual grid with instant part number search',
      'Inspect interactive color-coded microcontroller pinout diagrams (ESP32, RP2040, STM32) offline',
      'Describe a circuit idea in plain English to match against components already in your drawers',
      'Track low-stock thresholds for common resistors, capacitors, and sensors',
      'Export a clean Bill of Materials (BOM) in CSV and Markdown formats',
    ],
    groundRules: {
      offlineFirst: true,
      highPerformance: true,
      localPrivacy: true,
      darkModeDefault: true,
    },
    clarifications: [
      {
        id: 'cb-1',
        category: 'Inventory Entry',
        question: 'What is the fastest way for a maker to add new parts to a drawer?',
        options: [
          '(Recommended) Quick-add command bar with common part presets and quantity steppers',
          'Require filling out a 20-field electrical datasheet form',
          'Only allow importing enterprise ERP files',
        ],
        selectedAnswer:
          '(Recommended) Quick-add command bar with common part presets and quantity steppers',
      },
      {
        id: 'cb-2',
        category: 'Pinout View',
        question: 'How should conflicting pin assignments be highlighted when planning a build?',
        options: [
          '(Recommended) Highlight shared I2C/SPI buses in mint and flag voltage conflicts in coral',
          'Show raw hexadecimal register addresses only',
          'Do not validate pin assignments',
        ],
        selectedAnswer:
          '(Recommended) Highlight shared I2C/SPI buses in mint and flag voltage conflicts in coral',
      },
      {
        id: 'cb-3',
        category: 'BOM Export',
        question: 'What columns should be included in the exported shopping list?',
        options: [
          '(Recommended) Part name, package size (SMD/Through-Hole), quantity needed, and drawer location',
          'Part name only',
          'Internal database UUIDs only',
        ],
        selectedAnswer:
          '(Recommended) Part name, package size (SMD/Through-Hole), quantity needed, and drawer location',
      },
    ],
    proConfig: {
      stackSummary: 'Tauri v2, React 19, TypeScript, Tailwind CSS v4, @google/genai',
      architectureStyle: 'Local JSON/SQLite inventory store with instant fuzzy search index',
      testingStrategy: 'Vitest tests for resistor value parser, stock deduction, and BOM CSV generator',
      securityBoundary: 'Local filesystem export only via canonicalized Tauri path validation',
      taskSlicingMode: 'afk-autonomous',
      customRules: [
        'Use tabular numerals (tabular-nums) for all voltage, resistance, and quantity columns',
        'Ensure search filtering responds in under 50ms for up to 5,000 components',
      ],
      templateVariables: {
        primary_model: 'gemini-3.8-flash',
        target_os: 'Ubuntu 24.04 LTS',
        accent_color: '#EC4899',
        export_dir: '~/Projects/CrateBench-BOMs',
      },
    },
  },
];

export const DEFAULT_STITCH_UI: StitchUiConfig = {
  visualDirection:
    'Deep twilight glassmorphic workstation (#0F0C1B canvas, frosted #1B152E cards, crisp 1px lilac borders, electric violet #8B5CF6 actions, mint #34D399 status badges).',
  uiClarifications: [],
  ideaImages: [],
  screens: [
    {
      id: 'screen-main-workspace',
      name: 'Main Workspace',
      kind: 'screen',
      notes: 'Primary 3-panel canvas with left navigation, central action deck, and live status inspector.',
    },
    {
      id: 'menu-navigation-settings',
      name: 'Navigation & Settings Menu',
      kind: 'menu',
      notes: 'Top bar mode switcher, model selector, local agent drawer, and quick export actions.',
    },
  ],
  uploadedResultName: undefined,
  uploadedResultContent: undefined,
  uploadedResultNotes: '',
};

export interface CodingLanguageOption {
  id: CodingLanguageId;
  label: string;
  shortTag: string;
  bestFor: string;
  tradeoffs: string;
}

export const CODING_LANGUAGES: CodingLanguageOption[] = [
  {
    id: 'auto',
    label: 'Let AI Recommend',
    shortTag: 'Smart Match',
    bestFor: 'Beginners or builders who want PromptForge & AI to choose the ideal stack for their idea.',
    tradeoffs: 'AI selects the cleanest fit based on your platform, offline rules, and feature list.',
  },
  {
    id: 'typescript-react',
    label: 'TypeScript + React',
    shortTag: 'Web & UI',
    bestFor: 'Interactive web apps, dashboards, Chrome extensions, and rapid AI Studio / Stitch UI builds.',
    tradeoffs: 'Fastest iteration with huge AI ecosystem; pairs with Electron/Tauri for desktop.',
  },
  {
    id: 'rust-tauri',
    label: 'Rust + Tauri v2',
    shortTag: 'Native Desktop',
    bestFor: 'Lightweight, fast, secure Ubuntu/Windows/macOS desktop apps with OS keyring & local disk access.',
    tradeoffs: 'Smallest installers and strong safety; slightly slower Rust compile times.',
  },
  {
    id: 'python',
    label: 'Python',
    shortTag: 'AI & Automation',
    bestFor: 'AI/LLM pipelines, data processing, research scripts, FastAPI backends, and quick automations.',
    tradeoffs: 'Easiest to read and rich in AI libraries; less suited for polished mobile/desktop UIs alone.',
  },
  {
    id: 'dart-flutter',
    label: 'Dart + Flutter',
    shortTag: 'Cross-Platform Mobile',
    bestFor: 'Building a single codebase for iOS, Android, and desktop with smooth custom 60fps UI.',
    tradeoffs: 'Great cross-platform visuals; larger app bundle size than native.',
  },
  {
    id: 'kotlin-android',
    label: 'Kotlin (Jetpack Compose)',
    shortTag: 'Native Android',
    bestFor: 'Deep Android hardware/OS integrations, widgets, background services, and Google Play apps.',
    tradeoffs: 'Best native Android UX; Android-only unless using Kotlin Multiplatform.',
  },
  {
    id: 'swift-ios',
    label: 'Swift + SwiftUI',
    shortTag: 'Native Apple',
    bestFor: 'iPhone, iPad, and macOS native apps needing Apple ecosystem APIs and smooth animations.',
    tradeoffs: 'Requires macOS/Xcode for final builds; Apple platforms only.',
  },
  {
    id: 'go',
    label: 'Go (Golang)',
    shortTag: 'CLI & Services',
    bestFor: 'Single-binary CLI tools, high-concurrency APIs, devops utilities, and local background servers.',
    tradeoffs: 'Blazingly fast builds and tiny binaries; not designed for rich GUI frontends.',
  },
  {
    id: 'csharp-dotnet',
    label: 'C# / .NET',
    shortTag: 'Windows & Enterprise',
    bestFor: 'Windows desktop apps, Unity games, and enterprise backend APIs.',
    tradeoffs: 'Mature tooling and strong typing; heavier runtime on Linux desktop compared to Go/Rust.',
  },
];

export const MAX_RECENT_BLUEPRINTS = 3;

export function createInitialRecentBlueprints(): RecentBlueprintItem[] {
  const now = new Date().toISOString();
  return STARTER_TEMPLATES.slice(0, MAX_RECENT_BLUEPRINTS).map((tpl) => ({
    id: tpl.id,
    name: tpl.name,
    badge: tpl.badge,
    summary: tpl.summary,
    savedAt: now,
    state: {
      ...tpl.state,
      codingLanguage: tpl.state.codingLanguage ?? 'typescript-react',
      stitchUi: tpl.state.stitchUi ?? DEFAULT_STITCH_UI,
      lastUpdated: now,
    },
  }));
}

export function upsertRecentBlueprint(
  existing: RecentBlueprintItem[],
  project: ProjectState
): RecentBlueprintItem[] {
  const cleanName = project.appName.trim() || 'Untitled App';
  const cleanSummary =
    project.tagline.trim() ||
    project.coreIdea.trim().split('\n')[0] ||
    'Custom application blueprint';
  const badgeMap: Record<ProjectState['targetPlatform'], string> = {
    desktop: 'Ubuntu Desktop',
    web: 'Web App',
    mobile: 'Mobile App',
    cli: 'CLI Tool',
  };

  const entry: RecentBlueprintItem = {
    id: project.id,
    name: cleanName,
    badge: badgeMap[project.targetPlatform] || 'Blueprint',
    summary: cleanSummary,
    savedAt: project.lastUpdated || new Date().toISOString(),
    state: project,
  };

  const filtered = existing.filter((item) => item.id !== project.id);
  return [entry, ...filtered].slice(0, MAX_RECENT_BLUEPRINTS);
}
