<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:29f9ddcd941f96ae5f2a8baaf36d7d2ccf93b3b4088403858206566e754f2272 -->

# PromptForge

PromptForge is a fast, friendly, and jargon-free Ubuntu desktop application that allows non-technical builders and developers alike to describe an application idea in plain English and automatically compile it into structured, production-ready AI coding specifications and prompt contracts.

## Core Capabilities

- **Three-Tier Mode Switcher:** Simple Mode, Balanced Mode, and Pro Mode to cater to different user needs, scaling from basic plain-language to full specification visibility.
- **Universal Hover Explainer System:** Instant, friendly callout cards explaining features without intimidating jargon.
- **Gemini-Powered Inline Expansion:** Dedicated "Flesh Out" buttons turn rough thoughts into organized, complete feature descriptions using `gemini-2.5-flash`.
- **Targeted Multi-Platform Exporter:** Ready-to-paste prompt templates for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
- **One-Click Native File Export:** Directly writes `spec.md`, `AGENTS.md`, `plan.md`, and `tasks.md` to your local project directory.

## Tech Stack

- **Desktop Shell:** Tauri v2 (Rust 1.80+)
- **Frontend:** React 19, TypeScript 5.x, Vite
- **Styling:** Tailwind CSS v4 (Glassmorphic dark-purple design tokens)
- **UI Components:** Lucide React, Radix UI Primitives (Tooltip, Dialog, Tabs)
- **AI Engine:** Google Gemini API via `@google/genai` SDK

## Prerequisites

- Node.js 22.12 or later
- npm
- Rust & Cargo (for Tauri)
- Ubuntu system packages for native builds (see [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/#linux)):
  ```bash
  sudo apt update
  sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file \
    libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev patchelf
  ```
  CI installs `libappindicator3-dev` in place of `libayatana-appindicator3-dev`; the command above follows Tauri’s current Ubuntu prerequisites and includes CI’s `patchelf` packaging tool.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/defiqantcoder/PromptForge.git
   cd PromptForge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch desktop development server:**
   ```bash
   npm run tauri dev
   ```

## Development Commands

- Run frontend typecheck: `npx tsc --noEmit`
- Build production native package: `npm run tauri build`

## Project Structure

- `src/` — React frontend application
- `src-tauri/` — Native Rust backend
- `spec.md` — Product Specification
- `Agents.md` — Project Instructions & Architecture


<!-- /coderabbit-ai-generated:v1 -->