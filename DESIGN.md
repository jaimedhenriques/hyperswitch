---
name: Avenra
description: Payments, with a clear way forward.
colors:
  ink: '#153c32'
  green: '#1d5c45'
  lime: '#d7ef8a'
  paper: '#f7f8f2'
  muted: '#66736c'
  line: '#e2e7df'
  white: '#ffffff'
  workspace-canvas: '#f6f8f3'
  sidebar: '#123b31'
  workspace-button-text: '#f4f8e8'
  workspace-button-hover: '#174a37'
  card-border: '#e1e7dc'
  input-border: '#dce5d2'
  input-text: '#36582a'
  success: '#476c37'
  success-surface: '#edf5e7'
  pending: '#80691f'
  pending-surface: '#fbf4df'
  failed: '#974d3b'
  failed-surface: '#fbefeb'
  refunded: '#70528c'
  refunded-surface: '#f1eef9'
typography:
  display:
    fontFamily: Manrope, sans-serif
    fontSize: clamp(48px, 5.5vw, 76px)
    fontWeight: 600
    lineHeight: 1.11
    letterSpacing: -.04em
  headline:
    fontFamily: Manrope, sans-serif
    fontSize: clamp(35px, 3.6vw, 49px)
    fontWeight: 550
    lineHeight: 1.16
    letterSpacing: -.035em
  workspace-heading:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -1.05px
  title:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  intro:
    fontFamily: Manrope, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: Manrope, sans-serif
    fontSize: 14px
    fontWeight: 650
  workspace-label:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.5
  navigation:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 13px
    lineHeight: 1.5
  status:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 10px
    fontWeight: 550
    lineHeight: 1.5
rounded:
  status: 4px
  control: 6px
  navigation: 7px
  button: 8px
  card: 10px
  panel: 12px
  dialog: 15px
  diagram: 16px
spacing:
  tight: 4px
  inline: 8px
  control: 12px
  grid: 16px
  panel: 24px
  roomy: 32px
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.white}'
    typography: '{typography.label}'
    rounded: '{rounded.button}'
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: '{colors.green}'
  button-secondary:
    backgroundColor: '{colors.white}'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.button}'
    padding: 12px 20px
  button-lime:
    backgroundColor: '{colors.lime}'
    textColor: '{colors.ink}'
    rounded: '{rounded.button}'
    padding: 14px 20px
  workspace-button-primary:
    backgroundColor: '{colors.green}'
    textColor: '{colors.workspace-button-text}'
    typography: '{typography.workspace-label}'
    rounded: '{rounded.control}'
    padding: 9px 12px
  workspace-button-primary-hover:
    backgroundColor: '{colors.workspace-button-hover}'
  workspace-input:
    backgroundColor: '{colors.white}'
    textColor: '{colors.input-text}'
    rounded: '{rounded.control}'
    padding: 11px 12px
  workspace-navigation:
    backgroundColor: transparent
    textColor: '#b4c8b9'
    typography: '{typography.navigation}'
    rounded: '{rounded.navigation}'
    padding: 12px 15px
  workspace-navigation-active:
    backgroundColor: '{colors.lime}'
    textColor: '#244b34'
  status-succeeded:
    backgroundColor: '{colors.success-surface}'
    textColor: '{colors.success}'
    typography: '{typography.status}'
    rounded: '{rounded.status}'
    padding: 4px 6px
  status-pending:
    backgroundColor: '{colors.pending-surface}'
    textColor: '{colors.pending}'
    typography: '{typography.status}'
    rounded: '{rounded.status}'
    padding: 4px 6px
  status-failed:
    backgroundColor: '{colors.failed-surface}'
    textColor: '{colors.failed}'
    typography: '{typography.status}'
    rounded: '{rounded.status}'
    padding: 4px 6px
  status-refunded:
    backgroundColor: '{colors.refunded-surface}'
    textColor: '{colors.refunded}'
    typography: '{typography.status}'
    rounded: '{rounded.status}'
    padding: 4px 6px
  workspace-card:
    backgroundColor: '{colors.white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
---

# Design System: Avenra

## Overview

**Creative North Star: "A Clear Payment Path"**

Avenra makes payment activity feel composed and legible. Deep evergreen anchors the identity, warm ivory creates reading space, and lime marks a deliberate choice. The visual language pairs confident, closely spaced headings with precise tables, labelled statuses, and compact operational controls.

Use the original A mark, locally hosted Manrope, restrained borders, and short state transitions as the common vocabulary. The company site can breathe while the merchant workspace remains denser; both use the same palette and attention to clear outcomes. These are implementation-derived conventions for the working Avenra identity.

**Key Characteristics:**

- Evergreen structure, ivory reading surfaces, and lime selected states.
- Manrope headings and tabular payment amounts.
- Quiet bordered cards and compact, labelled controls.
- Visible keyboard focus and reduced-motion support.

This document captures the implemented [global](web/src/styles/global.css), [company-site](web/src/styles/landing.css), and [workspace](web/src/styles/workspace.css) styles, including the final readability overrides. The YAML frontmatter is the normative token record. Motion, breakpoints, shadows, and renderable component examples live in [.impeccable/design.json](.impeccable/design.json). Product truth belongs in [PRODUCT.md](PRODUCT.md); page strategy stays in the [surface brief](.impeccable/surfaces/web.md).

## Colors

Evergreen gives the interface structure; lime makes selected states and deliberate actions easy to find. Ivory and white keep information readable.

### Primary

- **Ink:** the darkest evergreen; primary text, company navigation, dark content regions, and company-site primary actions.
- **Green:** a lighter operational evergreen; workspace primary actions and the company-site primary-button hover.

### Secondary

- **Lime:** the brand mark on evergreen, active workspace navigation, and actions placed on dark surfaces.

### Neutral

- **Paper:** warm ivory for the company page and text on dark surfaces.
- **White:** cards, form fields, and workspace headers.
- **Muted:** secondary operational text and supporting labels.
- **Line:** light green-gray dividers and shared control borders.
- **Workspace canvas / Sidebar:** the related operational canvas and deep sidebar tones.
- **Card border / Input border / Input text:** the implemented workspace surface and form variants.

The success, pending, failed, and refunded tokens pair a foreground with its own pale surface. They are semantic payment-state colors, not alternative brand accents. The workspace button text and hover tokens retain the exact implemented operational button treatment.

**The Foreground Rule.** Use evergreen text on lime, and white or ivory text on evergreen. Lime on a light surface is an accent rather than small body text.

**The Status Rule.** Every payment status carries a text label. Its colored dot and tinted background reinforce that label.

## Typography

**Display and body family:** Manrope, with the implemented sans-serif fallbacks. The variable font is served from [web/public/fonts/manrope-variable.ttf](web/public/fonts/manrope-variable.ttf); it supports weights 200–800 and uses `font-display: swap`. Its [OFL license](web/public/fonts/OFL.txt) accompanies the file.

Manrope keeps large statements confident and small operational text clean. Use the role tokens in the frontmatter for desktop defaults; the responsive rules below retain their implemented adaptations. Payment totals and amounts use tabular numerals so adjacent figures compare cleanly. Code examples use `ui-monospace, SFMono-Regular, Consolas, monospace`.

### Hierarchy

- **Display:** large, balanced headlines with tight tracking and a short line height. At 1150px and below the company display resolves to 55px, at 850px and below to 70px in the stacked composition, and at 600px and below to `clamp(40px, 10.6vw, 60px)`.
- **Headline:** recurring company section headings, with responsive sizing; the small-screen section default is 36px.
- **Workspace heading:** compact operational page titles, with a 28px small-screen variant.
- **Title:** card headings in the final workspace override.
- **Body / Intro:** operational body copy and more spacious introductory company copy.
- **Label / Workspace label:** shared company actions and compact operational actions.
- **Navigation / Status:** readable workspace destinations and labelled transaction states.

**The Reading Rule.** Keep operational text at the final readability overrides: default desktop controls and table content use 12px, navigation uses 13px, and status badges use 10px. Do not copy superseded smaller base declarations when extending the workspace.

## Layout

The shared rhythm uses small inline gaps, medium control padding, and larger panel spacing. The frontmatter records recurring observed steps; individual components retain their specific padding and alignment rather than being forced onto a fabricated universal grid.

Company content has a centered width of `min(1220px, calc(100% - 96px))`, with a wider 1320px navigation container. Gutters narrow to 32px per side at 1150px and 20px per side at 600px. Related content sits side by side on wider screens, then stacks at the established 850px and 600px transitions. The company navigation becomes a button-controlled vertical menu at 600px.

Workspace content has a 1550px maximum width, a fixed 244px sidebar, and a 77px top bar at its desktop default. At 1600px and above the sidebar becomes 260px; at 1200px and below it becomes 218px. At 1000px and below, metrics become two columns and the overview chart, routing, and settings layouts stack. At 760px and below the sidebar becomes an off-canvas menu and content uses the full viewport. At 480px and below connector cards and form grids become single columns; at 360px and below metrics also become a single column. Tables retain their readable column structure inside horizontally scrollable containers.

Breakpoints are documented by surface in the sidecar because the company page and operational workspace have different density needs. The global minimum supported body width is 320px.

## Elevation & Depth

Use pale surface changes and light borders for normal hierarchy. Workspace cards have a nearly flat shadow; overlays and the company workspace preview have stronger ambient separation. Avoid making every card look lifted.

### Shadow Vocabulary

- **Workspace card:** `0 2px 2px #1a3e2402`; normal operational panels.
- **Payment node:** `0 4px 12px #183c3210`; a lightly lifted payment node in the routing diagram.
- **Workspace preview:** `0 18px 40px #061b2429`; a framed product preview on a dark surface.
- **Dialog:** `0 24px 75px #10271e33`; modal and detail overlays.
- **Toast:** `0 8px 25px #153a2420`; short-lived feedback above the workspace.

**The Quiet Surface Rule.** Separate normal workspace cards with a light border and an almost imperceptible shadow. Stronger shadows identify overlays or lifted previews.

## Shapes

The interface uses moderately rounded corners: compact status badges, slightly softer controls and navigation, and larger cards or dialog containers. The frontmatter records these exact roles. Borders are thin and low contrast; circles are reserved for status dots, avatars, and compact result symbols.

The canonical A mark uses a 48 × 48 viewBox. Its two 8 × 37 rounded rectangles start at (13, 6) and (27, 6), each with a 4-unit corner radius, rotated +20° and −20° around (17, 24.5) and (31, 24.5). The crossbar is `M16 29.5H32`, with a 5-unit rounded stroke. Use the [original brand assets](docs/BRANDING.md), preserve their proportions, and give linked wordmarks a name such as “Avenra home.”

## Components

### Buttons

Shared company buttons are confident, compact rectangles with the button radius and a 10px icon gap. The default primary uses ink with white text and turns green on hover. Secondary actions use white with a light border. Lime actions use ink text and lighten to `#e5f6b3` on hover.

Operational primary buttons use green, the workspace button text token, the control radius, 9px × 12px padding, a minimum 36px height, and a 7px icon gap. They darken on hover. Operational secondary actions use white, a pale green border, and muted green text. Their transition is 180ms. Disabled buttons visibly reduce opacity and use a non-interactive cursor.

### Chips

Payment status chips use the paired state colors from the frontmatter, a small dot using `currentColor`, and a readable text label. Their default operational padding is 4px × 6px. Demo pills and connector tags use quieter neutral tints and explicitly name their meaning.

### Cards / Containers

Normal workspace cards use white, the card radius, the card-border token, and the nearly flat workspace-card shadow. Header, metric, and form body padding differ by content; retain the matching pattern instead of assigning one padding value to every card. The routing diagram uses a softly tinted panel and the diagram radius, which reduces to the panel radius on small screens.

### Inputs / Fields

Fields use visible labels, white fill, the input border and text tokens, the control radius, 11px × 12px padding, and a 39px minimum height. Desktop input text is 12px after the final override. Search fields place an icon beside an editable input in a pale bordered container. Keep placeholders as hints rather than the sole label. Validation messages describe the condition near the affected form.

Keyboard focus is explicit: company controls use a 3px `#438467` outline with a 4px offset; workspace controls use a 2px `#6d9850` outline with the same offset.

### Navigation

Company navigation uses light text on ink and a lime action. Hovered text turns lime. The small-screen menu opens from a labelled button with an expanded state.

Workspace navigation uses a deep sidebar, muted light default text, a green hover surface, and a lime active background with dark text. Items use the navigation radius, 12px × 15px padding, 13px text, and a 13px icon gap. The active destination also has a small dot. The off-canvas mobile sidebar becomes visible when opened; closed content is removed from focus visibility.

### Motion and feedback

Normal shared state changes last 200ms; operational button and overlay changes use 180ms or 200ms. The routing travel indicator animates for 2.5 seconds twice, then stops. Workspace overlays fade in and drawers slide in without looping. Respect `prefers-reduced-motion`: the global rule reduces transitions and animations to effectively instantaneous changes, and the workspace removes its animations and transitions. Notifications and changed sample routes also provide text feedback.

## Do's and Don'ts

### Do:

- **Do** reuse the evergreen, lime, and ivory color assignments from the normative frontmatter.
- **Do** use the original A mark and self-hosted Manrope across new product surfaces.
- **Do** pair status colors with readable text and align amounts with tabular numerals.
- **Do** preserve visible keyboard focus, accessible control names, and reduced-motion behavior.
- **Do** keep sample data and demo actions visibly identified.

### Don't:

- **Don't** substitute a different mark, remotely loaded display font, or unrelated accent palette.
- **Don't** communicate a payment outcome through color alone.
- **Don't** shrink new operational labels to the superseded tiny base styles.
- **Don't** add looping decorative motion to the implemented finite routing animation.
- **Don't** treat the demonstration UI as evidence of a live payment service.
