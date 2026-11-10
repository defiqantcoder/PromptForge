export interface TooltipEntry {
  title: string;
  description: string;
  aiUsage: string;
}

export const TOOLTIP_DICTIONARY: Record<string, TooltipEntry> = {
  // Modes
  'mode-simple': {
    title: 'Simple Mode (Everyday English)',
    description: 'Strips away all technical settings and leaves just three friendly questions: your idea, the device, and the main user steps.',
    aiUsage: 'PromptForge automatically fills in safe, modern engineering defaults behind the scenes.',
  },
  'mode-balanced': {
    title: 'Balanced Mode (Guided Builder)',
    description: 'Adds everyday ground rules like offline support and speed alongside the 3-question "Grill Me" clarification interview.',
    aiUsage: 'Helps AI coding assistants avoid common assumptions about internet access, privacy, and screen speed.',
  },
  'mode-pro': {
    title: 'Pro Mode (Full 10-Section Architect)',
    description: 'Unlocks all 10 persistent AGENTS.md sections, task slicing strategies (HITL vs AFK), and reusable {{variable}} prompt tokens.',
    aiUsage: 'Produces strict, deterministic architectural guardrails for autonomous coding agents like Antigravity and Copilot.',
  },

  // Header & Global Actions
  'action-random-ai': {
    title: 'Random App Idea with AI',
    description: 'Asks Gemini to invent a complete, creative application concept from scratch and pre-fill your workspace.',
    aiUsage: 'Generates a fresh app name, plain-English concept, target device, and 5 starter user steps in seconds.',
  },
  'action-save-computer': {
    title: 'Save Specification Bundle to Disk',
    description: 'Opens the Ubuntu directory selector to write spec.md, plan.md, tasks.md, and AGENTS.md directly to your project folder.',
    aiUsage: 'Drops ready-to-run specification files right where AI coding tools look for project instructions.',
  },

  // Deck 1: Manifest Deck
  'deck-manifest': {
    title: '01. Project Manifest & Big Idea',
    description: 'Captures the heart of what you want to build in plain language without worrying about databases or frameworks.',
    aiUsage: 'Forms the Product Objective and Target User sections of spec.md and AGENTS.md.',
  },
  'field-app-name': {
    title: 'Application Name & Tagline',
    description: 'The working title of your project and a short one-line summary of who it helps.',
    aiUsage: 'Used by AI generators to title windows, package manifests, header wordmarks, and documentation.',
  },
  'field-core-idea': {
    title: 'What is the Big Idea?',
    description: 'Describe your app like you are explaining it to a friend over coffee—rough notes or single sentences are totally fine.',
    aiUsage: 'Serves as the primary context anchor across all platform prompts and EARS behavioral requirements.',
  },
  'action-flesh-out': {
    title: 'Flesh Out My Idea with Gemini',
    description: 'Turns a short, rough sentence into a clear two-paragraph product vision and suggests 5–6 practical user steps.',
    aiUsage: 'Calls gemini-3.8-flash with a 30-second safety timeout while keeping an Undo snapshot of your original text.',
  },
  'field-target-platform': {
    title: 'Where Will People Use It?',
    description: 'Pick the primary screen or environment where your app lives: Desktop App, Web Browser, Mobile Phone, or Command Line.',
    aiUsage: 'Automatically configures layout dimensions, touch targets, and system stack defaults in plan.md.',
  },
  'field-features': {
    title: 'Main Steps & User Actions',
    description: 'List the 3 to 6 main things a person actually clicks, sees, or accomplishes inside your app.',
    aiUsage: 'Compiled directly into EARS-notation ("When the user..., the system shall...") requirements in spec.md.',
  },

  // Deck 2: Architecture & Ground Rules
  'deck-architecture': {
    title: '02. Everyday Ground Rules & Guardrails',
    description: 'Plain-English quality switches that control how your app behaves when offline, loading data, or storing user files.',
    aiUsage: 'Translates your preferences into non-negotiable architectural invariants inside plan.md and AGENTS.md.',
  },
  'rule-offline-first': {
    title: 'Works Without Internet (Offline-First)',
    description: 'Keeps the app usable and preserves entered work even if Wi-Fi drops or the user is on an airplane.',
    aiUsage: 'Instructs the AI to use local state persistence and graceful retry queues instead of fragile cloud-only forms.',
  },
  'rule-high-performance': {
    title: 'Instant Screen Speed (<200ms Feedback)',
    description: 'Requires every button press, tab switch, and search filter to respond immediately without laggy spinners.',
    aiUsage: 'Enforces optimistic UI updates, compositor-only animations, and lightweight rendering budgets.',
  },
  'rule-local-privacy': {
    title: 'Keep Personal Data on This Device',
    description: 'Stores sensitive user notes, files, and credentials inside the local computer keyring or local storage.',
    aiUsage: 'Adds strict security rules prohibiting unencrypted keys or third-party telemetry leaks.',
  },
  'rule-dark-mode': {
    title: 'High-Contrast Twilight Dark Theme',
    description: 'Starts the application in a comfortable, eye-friendly dark palette tuned for long working sessions.',
    aiUsage: 'Configures semantic dark surface tokens and WCAG AA contrast ratios in the UI specification.',
  },

  // Deck 3: Grill Me Socratic Interview
  'deck-grill': {
    title: '03. "Grill Me" Clarification Interview',
    description: 'Acts like a thoughtful product coach that spots missing details in your idea and asks 3 quick multiple-choice questions.',
    aiUsage: 'Your selected answers eliminate guesswork and fold directly into the compiled specification and prompt contracts.',
  },
  'action-grill-me': {
    title: 'Generate 3 Clarification Questions',
    description: 'Scans your current app idea and steps to generate 3 tailored multiple-choice questions with recommended defaults.',
    aiUsage: 'Closes edge-case gaps before you hand the project off to Google Stitch, AI Studio, or Antigravity.',
  },

  // Deck 4: Tasks & Pro Rules
  'deck-tasks': {
    title: '04. Implementation Tasks & Pro Controls',
    description: 'Breaks your project into an ordered checklist of build steps and lets Pro users fine-tune the 10-section AGENTS.md contract.',
    aiUsage: 'Marks each task as Human-in-the-Loop (HITL) or Autonomous (AFK) so AI agents know when to pause for review.',
  },
  'field-task-slicing': {
    title: 'Task Slicing Strategy (HITL vs AFK)',
    description: 'Choose whether AI agents should check in with you after every milestone (HITL) or run autonomously in the background (AFK).',
    aiUsage: 'Updates task tags and parallelization markers [P] inside tasks.md.',
  },
  'field-variable-tokens': {
    title: 'Interactive {{variable}} Prompt Tokens',
    description: 'Reusable dynamic placeholders highlighted in luminous pink that automatically inject across all compiled prompt contracts.',
    aiUsage: 'Click any {{variable}} pill to edit its live value across AGENTS.md and platform exports.',
  },

  // Deck 5: Multi-Platform Exporter
  'deck-exporter': {
    title: '05. Multi-Platform Contract Exporter',
    description: 'Formats your project into ready-to-paste prompt contracts tailored for each major AI design and coding tool.',
    aiUsage: 'Structures context, visual tokens, and acceptance criteria in the exact format each platform performs best with.',
  },
  'platform-stitch': {
    title: 'Google Stitch UI & Design Prompt',
    description: 'Optimized for screen layout generation, glassmorphic color tokens, typography hierarchy, and component states.',
    aiUsage: 'Paste into Google Stitch to generate high-fidelity visual screens matching your specification.',
  },
  'platform-aistudio': {
    title: 'Google AI Studio Full-Stack Contract',
    description: 'Targets React + Express + @google/genai server-side architecture with complete interactive handlers.',
    aiUsage: 'Paste into Google AI Studio Build to scaffold the working web application and backend routes.',
  },
  'platform-antigravity': {
    title: 'Google Antigravity (AGY) Autonomous Spec',
    description: 'Structured around phased HITL/AFK task execution, verification commands, and strict file boundary rules.',
    aiUsage: 'Ideal for autonomous multi-file engineering and native Tauri desktop compilation in Antigravity.',
  },
  'platform-copilot': {
    title: 'GitHub Copilot Workspace Instructions',
    description: 'Formatted as concise repository-level coding conventions, test assertions, and step-by-step file tasks.',
    aiUsage: 'Drop into .github/copilot-instructions.md or Copilot Edits for guided implementation.',
  },
  'platform-canvas': {
    title: 'Gemini Canvas Interactive Iteration Prompt',
    description: 'Designed for rapid interactive prototyping, live preview refinement, and self-contained component polishing.',
    aiUsage: 'Paste into Gemini Canvas to iterate visually on flows, micro-interactions, and copy.',
  },
};
