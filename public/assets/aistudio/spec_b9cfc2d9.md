# Product Specification: PromptForge

## 1. Objective
Provide a fast, friendly, and jargon-free Ubuntu desktop application that allows non-technical builders and developers alike to describe an application idea in plain English and automatically compile it into structured, production-ready AI coding specifications and prompt contracts.

## 2. Target Users
- Beginners and non-coders who want to build apps using AI assistants without learning confusing software engineering jargon.
- Power users and developers who need to scaffold complete, structured prompt contracts and AGENTS.md rules without writing repetitive templates by hand.

## 3. Core Capabilities
- **Three-Tier Mode Switcher:**
  - Simple Mode: Strips technical fields down to three questions (Idea, Device, Main Steps) with AI auto-expansion.
  - Balanced Mode: Adds everyday ground rules (offline-first, screen speed) and a 3-question clarification interview ("Grill Me").
  - Pro Mode: Exposes all 10 persistent instruction sections, task slicing strategies, and file outputs using strictly plain-language labels.
- **Universal Hover Explainer System:**
  - Moving the mouse over any section label, toggle switch, or action button reveals an instant, friendly callout card explaining what the item does and how the AI will use it.
- **Gemini-Powered Inline Expansion:**
  - Dedicated "Flesh Out" buttons on each input card turn rough thoughts into organized, complete feature descriptions using `gemini-2.5-flash`.
- **Targeted Multi-Platform Exporter:**
  - Compiles project requirements into ready-to-paste prompt templates formatted specifically for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
- **One-Click Native File Export:**
  - Writes `spec.md`, `agents.md`, and `tasks.md` directly into a selected project directory on the local computer.

## 4. Behavioral Requirements (EARS Notation)
- When the user selects Simple Mode, the system shall hide all technical rule blocks and present only the three primary plain-language cards.
- When the user hovers over any section badge for more than 100 milliseconds, the system shall display a floating explainer card containing a 2-sentence plain-English description.
- When the user clicks the "Flesh Out My Idea" button with a valid API key, the system shall stream an expanded summary into the input field within 3 seconds.
- When the user clicks "Grill Me", the system shall analyze the entered project requirements and return 3 targeted multiple-choice questions covering missing details.
- When the user confirms saving files, the system shall write `spec.md`, `agents.md`, and `tasks.md` directly to the selected directory without opening browser download prompts.
- When an API key call fails or times out after 30 seconds, the system shall surface a clear warning banner and retain all active form text.
