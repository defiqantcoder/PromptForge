# PromptForge

PromptForge is a fast, friendly, and jargon-free Ubuntu desktop application that allows non-technical builders and developers alike to describe an application idea in plain English and automatically compile it into structured, production-ready AI coding specifications and prompt contracts.

## Core Capabilities

- **Three-Tier Mode Switcher:** Simple Mode, Balanced Mode, and Pro Mode to cater to different user needs, scaling from basic plain-language to full specification visibility.
- **Universal Hover Explainer System:** Instant, friendly callout cards explaining features without intimidating jargon.
- **Gemini-Powered Inline Expansion:** Dedicated "Flesh Out" buttons turn rough thoughts into organized, complete feature descriptions using `gemini-2.5-flash`.
- **Targeted Multi-Platform Exporter:** Ready-to-paste prompt templates for Google Stitch, Google AI Studio, Google Antigravity, GitHub Copilot, and Gemini Canvas.
- **One-Click Native File Export:** Directly writes `spec.md`, `agents.md`, and `tasks.md` to your local project directory.

## Tech Stack

- **Desktop Shell:** Tauri v2 (Rust 1.80+)
- **Frontend:** React 19, TypeScript 5.x, Vite
- **Styling:** Tailwind CSS v4 (Glassmorphic dark-purple design tokens)
- **UI Components:** Lucide React, Radix UI Primitives (Tooltip, Dialog, Tabs)
- **AI Engine:** Google Gemini API via `@google/genai` SDK

## Prerequisites

- Node.js
- npm
- Rust & Cargo (for Tauri)

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
