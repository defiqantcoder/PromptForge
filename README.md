<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:c5cf47bc1ecf1f7fa54f4ab5b7c9f7f8495388c2f8a8615bdd99416c18c4e216 -->

# PromptForge

PromptForge is a fast, friendly, and jargon-free Ubuntu desktop application that allows non-technical builders and developers alike to describe an application idea in plain English and automatically compile it into structured, production-ready AI coding specifications and prompt contracts.

## Core Capabilities

- **Three-Tier Mode Switcher:** Simple Mode, Balanced Mode, and Pro Mode to cater to different user needs, scaling from basic plain-language to full specification visibility.
- **Universal Hover Explainer System:** Instant, friendly callout cards explaining features without intimidating jargon.
- **Gemini-Powered Inline Expansion:** Dedicated "Flesh Out" buttons turn rough thoughts into organized, complete feature descriptions using `gemini-3.8-flash` when the Express API is available. Gemini expansion is unavailable in packaged Tauri builds: they do not start the Express API server required by the relative `/api/gemini/expand` request.
- **Targeted Multi-Platform Exporter:** Ready-to-paste prompt templates for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
- **One-Click Native File Export:** Directly writes `spec.md`, `agents.md`, and `tasks.md` to your local project directory.

## Tech Stack

- **Desktop Shell:** Tauri v2 (Rust 1.90+)
- **Frontend:** React 19, TypeScript 5.x, Vite
- **Styling:** Tailwind CSS v4 (Glassmorphic dark-purple design tokens)
- **UI Components:** Lucide React, Radix UI Primitives (Tooltip, Dialog, Tabs)
- **AI Engine:** Google Gemini API via `@google/genai` SDK

## Prerequisites

- Node.js
- npm
- Rust 1.90 or later & Cargo (for Tauri)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-dir>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Gemini:**
   Copy `.env.example` to the ignored `.env` file:
   ```bash
   cp .env.example .env
   ```
   In `.env`, replace the `GEMINI_API_KEY` placeholder with your Gemini API key. `server.ts` loads this file for local API requests. Keep the key private and do not commit `.env`.

4. **Launch desktop development server:**
   npm downloads and runs the Tauri v2 CLI with the following command. Tauri starts the Express development server automatically.
   ```bash
   npm exec --yes --package=@tauri-apps/cli@2 -- tauri dev
   ```

## Development Commands

- Run frontend typecheck: `npx tsc --noEmit`
- Build production native package: `npm exec --yes --package=@tauri-apps/cli@2 -- tauri build`

## Project Structure

- `src/` — React frontend application
- `src-tauri/` — Native Rust backend
- `spec.md` — Product Specification
- `Agents.md` — Project Instructions & Architecture


<!-- /coderabbit-ai-generated:v1 -->