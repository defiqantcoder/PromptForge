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
    description: 'Adds everyday ground rules like offline support and speed alongside the 5-question dynamic Grill Me clarification interview.',
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
    description: 'Acts like a thoughtful product coach that spots missing details in your idea and runs a 5-question dynamic Grill Me multiple-choice interview.',
    aiUsage: 'Your selected answers eliminate guesswork and fold directly into the compiled specification and prompt contracts across ManifestDeck, ArchitectureDeck, GrillDeck, TasksDeck, WorkflowDeck, and ExporterDeck.',
  },
  'action-grill-me': {
    title: 'Generate 5 Clarification Questions',
    description: 'Scans your current app idea and steps to generate a 5-question dynamic Grill Me interview with recommended defaults.',
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
    title: '06. Multi-Platform Contract Exporter',
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
  'action-keyring': {
    title: 'Desktop Gemini Keyring Storage',
    description: 'Saves your Gemini API key securely inside your Ubuntu system keyring so AI features work offline from any Express server.',
    aiUsage: 'Rust reads this key directly from GNOME Keyring during native Gemini requests and never saves it to plain text files.',
  },
  'action-fill-with-ai': {
    title: 'Context-Aware Fill with AI',
    description: 'Uses everything you have already filled across all sections to draft a smart, tailored answer for this blank.',
    aiUsage: 'Reads your app idea, target device, coding language, feature list, ground rules, and clarifications together.',
  },
  'action-mini-grill': {
    title: 'Mini Grill Me (Quick Helper Questions)',
    description: 'Asks 1 or 2 quick multiple-choice questions right here so you can add helpful detail without guessing.',
    aiUsage: 'Folds your chosen answer directly into this section and updates all compiled prompts automatically.',
  },
  'header-brand': {
    title: 'PromptForge Workstation',
    description: 'Your plain-English studio for turning rough app ideas into specs, UI designs, and step-by-step AI build workflows.',
    aiUsage: 'Keeps your project organized in memory and local storage while compiling live Markdown and platform prompts.',
  },
  'header-nav': {
    title: 'Quick Section Jump Bar',
    description: 'Jump straight to any deck in the workstation—Manifest, Ground Rules, Grill Me, Pro Rules, Workflow, or Exporters.',
    aiUsage: 'Clicking Balanced or Pro sections automatically switches your view lens without losing any entered text.',
  },
  'sidebar-blueprints': {
    title: 'Most Recent 3 Blueprints',
    description: 'Lists your 3 most recently opened or edited project blueprints so you can switch back to active ideas in one click.',
    aiUsage: 'Restores the full ProjectState (idea, features, language, Stitch UI, and Pro rules) immediately.',
  },
  'sidebar-new-blank': {
    title: 'Start a New Blank Project',
    description: 'Clears the active fields so you can describe a brand-new app from scratch (your previous blueprint stays in Recent 3).',
    aiUsage: 'Gives you an undo snapshot and starts a clean project canvas.',
  },
  'sidebar-complexity-lens': {
    title: 'Active Complexity Lens Summary',
    description: 'Shows which decks are currently visible or auto-managed based on whether Simple, Balanced, or Pro mode is active.',
    aiUsage: 'Simple hides jargon; Balanced reveals rules and Grill Me; Pro exposes full AGENTS.md and token controls.',
  },
  'field-tagline': {
    title: 'One-Sentence Summary (Tagline)',
    description: 'A quick one-line elevator pitch explaining what your app does and who it is for.',
    aiUsage: 'Placed right at the top of spec.md, AGENTS.md, and every exported platform prompt so AI tools grasp your goal fast.',
  },
  'field-coding-language': {
    title: 'Coding Language & Stack Choice',
    description: 'Pick which programming language or framework you want AI builders to use, or ask AI what is best for your app.',
    aiUsage: 'Locks stack recommendations inside plan.md, AGENTS.md, and your guided build workflow handoffs.',
  },
  'field-coding-language-note': {
    title: 'Language & Library Preferences',
    description: 'Optional extra details about libraries, UI frameworks, or constraints you want paired with your chosen language.',
    aiUsage: 'Appended to Section 2 (Stack) in AGENTS.md and carried into AI Studio, Antigravity, and Copilot prompts.',
  },
  'action-language-advisor': {
    title: 'AI Language Advisor (What Is Best for What?)',
    description: 'Analyzes your idea, target device, and feature list, then explains what each coding language is best for and which fits best.',
    aiUsage: 'Compares trade-offs in plain English so beginners and pros can choose the right stack with confidence.',
  },
  'field-add-step': {
    title: 'Add a Feature to the List',
    description: 'Type a plain-English capability or user action you want your app to have, or click Fill with AI to suggest the next one.',
    aiUsage: 'Every item here becomes an EARS requirement in spec.md and an implementation slice in tasks.md.',
  },
  'field-pro-stack': {
    title: 'Preferred Tech Stack (Section 2)',
    description: 'Exact frameworks, runtimes, and SDKs that AI coding agents should use when writing code.',
    aiUsage: 'Directly populates Section 2 (Stack) of AGENTS.md and constrains code generation choices.',
  },
  'field-pro-architecture': {
    title: 'System Architecture Pattern (Section 5)',
    description: 'Describes how the UI, backend, and local storage communicate (for example, sandboxed UI over Tauri IPC).',
    aiUsage: 'Guides AI agents in AGENTS.md Section 5 and plan.md so files stay cleanly separated.',
  },
  'field-pro-testing': {
    title: 'Verification & Testing Rules (Section 7)',
    description: 'Specifies what automated tests and checks must pass before an AI agent considers work complete.',
    aiUsage: 'Written into AGENTS.md Section 7 and added as verification steps on generated tasks.',
  },
  'field-pro-security': {
    title: 'Security & Filesystem Boundary (Section 8)',
    description: 'Defines where API keys live, what paths can be written, and what inputs must be validated.',
    aiUsage: 'Enforced in AGENTS.md Section 8 and included in every builder prompt.',
  },
  'field-pro-new-token': {
    title: 'Create New {{variable}} Token',
    description: 'Add a reusable key-value placeholder (like target_os or accent_color) that automatically fills across all exported files.',
    aiUsage: 'Anywhere {{token_name}} appears in your specs or prompts, PromptForge substitutes this value live.',
  },
  'field-pro-custom-rules': {
    title: 'Persistent AI Coding Rules (Section 6)',
    description: 'Add custom "always do" or "never do" instructions that every AI coding assistant must follow in your repo.',
    aiUsage: 'Rendered verbatim in Section 6 (Coding Conventions) of AGENTS.md and Copilot/Antigravity contracts.',
  },
  'deck-workflow': {
    title: '05. Guided Build Workflow & Stitch UI Studio',
    description: 'Walks you step-by-step from UI design in Google Stitch (with image ideas and UI grilling) to building the app in the next AI tool.',
    aiUsage: 'Tracks your progress, incorporates your uploaded Stitch UI result, and hands you the exact next prompt and .md files.',
  },
  'stitch-ui-grill': {
    title: 'Grill Me on UI Design',
    description: 'Asks focused visual design questions (layout, density, mood, navigation) tailored to your app and any uploaded reference images.',
    aiUsage: 'Folds your visual answers straight into your Google Stitch UI prompt and visual direction notes.',
  },
  'stitch-surprise-me': {
    title: 'Surprise Me with a UI Idea (AI)',
    description: 'Uses Gemini (and any reference images you uploaded) to invent a fresh visual direction, color mood, and layout concept.',
    aiUsage: 'Fills your visual direction notes and upgrades your Google Stitch prompt automatically.',
  },
  'stitch-image-upload': {
    title: 'Upload Reference Images for UI Ideas',
    description: 'Drop screenshots, sketches, or moodboard images here so Gemini can see what look and layout style you like.',
    aiUsage: 'Sent directly to Gemini during UI Grill Me and Surprise Me, and summarized into your Stitch design prompt.',
  },
  'stitch-visual-direction': {
    title: 'Visual Direction & Layout Notes',
    description: 'Describe the colors, layout, vibe, or screen structure you want Google Stitch to design.',
    aiUsage: 'Injected into your Google Stitch UI prompt and downstream builder handoff contracts.',
  },
  'stitch-result-upload': {
    title: 'Upload Your Google Stitch Result',
    description: 'After running the prompt in Google Stitch, upload the exported HTML, ZIP, image screenshot, or code notes here.',
    aiUsage: 'Unlocks the next recommended app step and weaves your finished Stitch design into the builder prompt.',
  },
  'workflow-next-app': {
    title: 'Recommended Next App & Files',
    description: 'Recommends the best next AI tool (AI Studio, Antigravity, Copilot, or Canvas) for your chosen platform and language.',
    aiUsage: 'Packages your Stitch output, next prompt, and AGENTS.md / spec.md / plan.md / tasks.md for seamless handoff.',
  },
  'inspector-compiler': {
    title: 'Live Contract Compiler',
    description: 'Shows your real-time compiled Markdown specifications and platform prompts updating instantly on every edit.',
    aiUsage: 'Lets you inspect and copy AGENTS.md, spec.md, plan.md, tasks.md, or platform prompts at any moment.',
  },
  'field-export-dir': {
    title: 'Ubuntu Export Folder Path',
    description: 'Choose or type the local Linux folder where AGENTS.md, spec.md, plan.md, and tasks.md will be written.',
    aiUsage: 'Validated by Rust path canonicalization to block ../ traversal before writing any file.',
  },
  'action-browse-folder': {
    title: 'Browse Ubuntu Folder',
    description: 'Opens your native Ubuntu folder picker so you can select a destination directory visually.',
    aiUsage: 'Passes the selected directory path directly to the safe Rust file writer.',
  },
  'action-model-selector': {
    title: 'AI Model & Speed Selector',
    description: 'Switch between Gemini 3.5 Flash-Lite (fastest), 3.6 Flash, 3.8 Flash (balanced fast), 3.1 Pro, and Gemini 4 Argon.',
    aiUsage: 'PromptForge configures low/minimal thinking overhead on fast models so Fill with AI and Grill Me finish quickly.',
  },
  'stitch-multi-screen': {
    title: 'Multi-Screen & Menu Stitch Prompts',
    description: 'Add as many individual screens, menus, modals, or components as your app needs and generate a separate Stitch prompt for each one.',
    aiUsage: 'Lets you feed Stitch one focused screen or menu at a time while staying consistent with your overall visual direction.',
  },
  'section-local-agents': {
    title: 'Optional Local AI Agents (Ollama / Continue)',
    description: 'Enable private, offline-capable local coding instructions for Ollama models and the Continue IDE extension.',
    aiUsage: 'Generates .continuerules and Ollama/Continue configuration inside exports and plan.md alongside cloud agent specs.',
  },
  'section-multi-agent': {
    title: 'Multi-Agent Project Collaboration (COLLABORATION.md)',
    description: 'Coordinate multiple AI coding agents cleanly by defining which folders each agent works on and which boundaries they must stay away from.',
    aiUsage: 'Compiles COLLABORATION.md with ownership lanes, file locks, and shared handoff rules to prevent merge conflicts.',
  },
  'platform-local-ollama': {
    title: 'Local AI Agents (Ollama + Continue)',
    description: 'Generates offline-ready setup commands, Modelfile hints, and Continue prompt rules for running coding tasks locally.',
    aiUsage: 'Lets you pair your PromptForge specs with local open-weight coder models via http://127.0.0.1:11434.',
  },
  'page-nav': {
    title: 'Screen-by-Screen Navigation',
    description: 'Jump directly to any of the 9 dedicated workstation screens, from Plain-Language Ideas to Ground Rules, Stitch Studio, and Multi-Platform Exporters.',
    aiUsage: 'Keeps all your inputs organized per screen and persists state non-destructively as you move between screens.',
  },
  'page-manifest': {
    title: 'Screen 01 · Manifest & Ideas (Q1–Q4)',
    description: 'Core project identity: App Name, One-Sentence Summary, Big Idea (Q1), Target Platform (Q2), Coding Language Advisor (Q3), and Main Features (Q4).',
    aiUsage: 'Populates Product Objective, Target Users, and core requirements across all compiled files.',
  },
  'page-architecture': {
    title: 'Screen 02 · Everyday Ground Rules',
    description: 'Everyday quality guardrails: Offline-First, Screen Speed (<200ms), Local Device Privacy, and Dark Theme default.',
    aiUsage: 'Injected into Section 6, 7, and 8 of AGENTS.md and compiled EARS behavioral rules.',
  },
  'page-grill': {
    title: 'Screen 03 · Dynamic "Grill Me" (Q1–Q8)',
    description: 'Socratic product interrogation: 8 deep clarification questions covering data, UX edge cases, and architecture decisions.',
    aiUsage: 'Eliminates ambiguities before code generation; folded into spec.md and AGENTS.md.',
  },
  'page-tasks': {
    title: 'Screen 04 · Pro Architect Controls',
    description: 'Pro AGENTS.md overrides, tech stack, architecture style, testing strategy, security boundary, HITL/AFK slicing, and dynamic tokens.',
    aiUsage: 'Configures deterministic constraints for autonomous AI coding agents.',
  },
  'page-stitch': {
    title: 'Screen 05 · Google Stitch UI Studio',
    description: 'Spacious dedicated visual studio: Stages 1a (Design UI First with AI Surprise Me & Reference Images) & 1b (Upload Stitch Result & Multi-Screen Prompts).',
    aiUsage: 'Locks visual layout, component states, and WCAG AA contrast tokens into specifications.',
  },
  'page-build-workflow': {
    title: 'Screen 06 · Stage 2: Next Build App & Workflow Plan',
    description: 'Dynamic next build tool recommendation with user override options, and a comprehensive, editable end-to-end workflow execution plan.',
    aiUsage: 'Generates handoff prompts tailored to your chosen tool and compiles the workflow plan into plan.md and AGENTS.md.',
  },
  'page-local-agents': {
    title: 'Screen 07 · Optional Local AI (Ollama / Continue)',
    description: 'Private offline coding assistance using local open-weight models via Ollama and Continue IDE rules (.continuerules).',
    aiUsage: 'Lets you run code generation and refactoring 100% locally with zero cloud API keys.',
  },
  'page-multi-agent': {
    title: 'Screen 08 · Multi-Agent Coordination',
    description: 'Declare file ownership lanes (Work-On vs. Stay-Away paths) and shared merge handoff protocols in COLLABORATION.md.',
    aiUsage: 'Prevents merge collisions and race conditions when multiple autonomous agents collaborate.',
  },
  'page-exporter': {
    title: 'Screen 09 · Multi-Platform Exporters',
    description: 'Ready-to-copy prompt contracts formatted for Google Stitch, AI Studio, Antigravity, Copilot, Canvas, and Local Ollama.',
    aiUsage: 'Tailored for each tool’s strengths and context window capabilities.',
  },
  'workflow-override-app': {
    title: 'Choose Next Builder App',
    description: 'Override the AI recommendation and select which tool you want to build with next (AI Studio, Antigravity, Copilot, Canvas, or Local Ollama).',
    aiUsage: 'PromptForge instantly recalculates the handoff prompt and workflow roadmap to fit your selected tool.',
  },
  'workflow-full-plan': {
    title: 'Full End-to-End Implementation Plan',
    description: 'A comprehensive step-by-step roadmap taking your app from Stitch UI through scaffolding, state management, testing, and release.',
    aiUsage: 'Compiled into Section 10 of plan.md and Section 9 of AGENTS.md so downstream builders execute in orderly phases.',
  },
  'workflow-freemium-stage3': {
    title: 'Stage 3 Polish & Freemium Offline Alternative',
    description: 'Stage 3 polish workflow or substitution with local open-weight Ollama models for completely free, offline-capable execution.',
    aiUsage: 'Ensures the project can be built and maintained without ongoing cloud subscription costs.',
  },
  'rule-recommend-ai': {
    title: 'Recommend Rules with AI',
    description: 'Analyzes your app idea, device, features, and language to recommend the most sensible everyday ground rules.',
    aiUsage: 'Automatically flips the 4 guardrail toggles to optimal defaults for your specific project.',
  },
};
