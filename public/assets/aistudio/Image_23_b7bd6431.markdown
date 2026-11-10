---
name: PromptForge Workspace
colors:
  surface: '#141120'
  surface-dim: '#141120'
  surface-bright: '#3b3748'
  surface-container-lowest: '#0f0c1b'
  surface-container-low: '#1d1929'
  surface-container: '#211d2d'
  surface-container-high: '#2b2838'
  surface-container-highest: '#363243'
  on-surface: '#e6dff5'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e6dff5'
  inverse-on-surface: '#322e3f'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00a574'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#141120'
  on-background: '#e6dff5'
  surface-variant: '#363243'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-snippet:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a high-performance, keyboard-first developer canvas styled for native desktop environments. Blending the surgical precision of modern command bars (such as Raycast and Linear) with electric glassmorphic surfaces, the visual language balances dense productivity with ethereal warmth.

The target audience consists of prompt engineers, AI researchers, and technical creators seeking an elevated workspace devoid of terminal clutter. Surfaces rely on deep twilight darks layered with frosted purple undertones, delicate lilac hairline borders, and targeted pulses of electric violet to create focus, speed, and spatial elegance.

## Colors

The palette is engineered around an immersive deep-space spectrum:

- **Primary (`#8B5CF6`)**: Electric violet for primary actions, active state keylines, focus rings, and high-priority selections.
- **Secondary (`#EC4899`)**: Luminous pink reserved for dynamic parameters, badges, variable highlights, and token counter warnings.
- **Tertiary (`#34D399`)**: Mint green signaling successful prompt executions, model connection states, and live API health.
- **Neutral (`#0F0C1B`)**: Velvety night-violet foundation anchoring all backdrop surfaces.

### Functional Surface Tokens
- **Canvas Base**: `#0F0C1B`
- **Frosted Card Fill**: `rgba(27, 21, 46, 0.75)` with 12px hardware-accelerated blur.
- **Subtle Surface Overlay**: `rgba(255, 255, 255, 0.04)` for hover states and selection bars.
- **Border Trim**: `rgba(192, 132, 252, 0.2)` delivering crisp edge definition.
- **Typography Base**: `#FFFFFF` for display headings; `#E9D5FF` for primary body copy; `#A78BFA` and `#94A3B8` for secondary labels and code metadata.

## Typography

The typographic hierarchy relies entirely on Inter to maintain visual continuity between native desktop framing and dense prompt editors. Variable weights deliver structural rhythm rather than decorative flair:

- **Headlines**: Rendered in pure `#FFFFFF` with negative tracking to keep UI headers tight, authoritative, and readable at a glance.
- **Body**: Uses `#E9D5FF` for reduced ocular strain during lengthy prompting sessions.
- **Labels & Monospace Insets**: Inter's tabular features and clean geometry accommodate token metrics, hotkey indicators (`Ctrl+Enter`), and parameter toggles with fixed vertical cadence.

## Layout & Spacing

The layout operates on a disciplined 4px/8px modular rhythm tailored for multi-pane desktop windows:

- **App Shell**: A 3-column layout consisting of a collapsible left sidebar (navigation/history), a central fluid workspace (prompt editor and test harness), and an inspector panel (model parameters, token consumption, system instructions).
- **Margins & Gutters**: Outer canvas uses `1.25rem` (`20px`) margins, while internal split views utilize `1rem` (`16px`) gutters to preserve breathing room around frosted cards.
- **Density Controls**: Toolbars and nested parameter rows conform strictly to `space-xs` (4px) and `space-sm` (8px) for compact toolbars, opening up to `space-md` (16px) inside prompt interaction containers.

## Elevation & Depth

Spatial depth is communicated via layered translucent panes and directional illumination rather than traditional drop shadows:

- **Level 0 (Backdrop Canvas)**: Solid `#0F0C1B` acting as the dark foundational canvas.
- **Level 1 (Card & Workspace Panels)**: `rgba(27, 21, 46, 0.75)` paired with `backdrop-filter: blur(12px)`. Enclosed by a crisp 1px perimeter border of `rgba(192, 132, 252, 0.2)`.
- **Level 2 (Popovers, Tooltips & Floating Palette)**: Elevated glass surface `rgba(38, 30, 65, 0.9)` bordered with `rgba(192, 132, 252, 0.35)` and bathed in an ambient purple rim glow: `0 8px 32px -4px rgba(139, 92, 246, 0.25)`.
- **Level 3 (Modal Dialogs & Command Bar)**: Centered command surface equipped with dual shadow: an internal top hairline highlight `inset 0 1px 0 rgba(255, 255, 255, 0.15)` and an outward cast of `0 24px 48px -12px rgba(0, 0, 0, 0.7)`.

## Shapes

The design system standardizes on balanced structural geometry with `roundedness: 2`:

- **Panels & Cards**: Base `0.5rem` (`8px`) on inner functional sections, stepping up to `1rem` (`16px` / `rounded-lg`) on major application cards and modal dialogs to support the modern desktop aesthetic.
- **Form Controls & Inputs**: Form inputs, select menus, and inline search fields adhere to `0.5rem` (`8px`) corners.
- **Buttons & Pills**: Buttons, status indicators, and prompt category pills use complete circular rounding (pill caps) to provide a soft, tactile contrast against rectangular code panes.

## Components

### Buttons
- **Primary**: Background `#8B5CF6`, text `#FFFFFF`, rounded pill radius. Subtle inset highlight `inset 0 1px 0 rgba(255, 255, 255, 0.2)`. On hover, scale slightly (1.02) with an active glow `0 0 16px rgba(139, 92, 246, 0.5)`.
- **Secondary / Ghost**: Transparent fill with `rgba(192, 132, 252, 0.2)` border and `#E9D5FF` text. Hover fills to `rgba(139, 92, 246, 0.12)`.
- **Destructive**: Frosted red tint `rgba(239, 68, 68, 0.15)` with `rgba(239, 68, 68, 0.4)` border.

### Input Fields & Prompt Canvas
- **Prompt Canvas**: Monolithic frosted container (`rgba(27, 21, 46, 0.75)`), 16px radius, no inner borders. Focus reveals an electric violet border ring (`0 0 0 2px #8B5CF6`).
- **Variable Tokens (`{{variable}}`)**: Inline interactive pills rendered in `rgba(236, 72, 153, 0.15)` with `#EC4899` text, editable on click.

### Chips & Status Badges
- **Model Status Badge**: Pill shape, background `rgba(52, 211, 153, 0.1)`, text `#34D399`, border `1px solid rgba(52, 211, 153, 0.3)`. Contains a 6px pulsing green indicator dot.
- **Token Counter Pill**: Background `rgba(15, 12, 27, 0.8)`, text `#A78BFA`, border `rgba(192, 132, 252, 0.2)`.

### Desktop Window Titlebar
- **Native Header Integration**: Integrated glass header featuring custom window actions (minimize, maximize, close) blended alongside breadcrumbs, active workspace indicator, and hotkey launch badges.