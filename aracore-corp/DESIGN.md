---
version: "alpha"
name: "Aracore Web Design System"
description: >
  Canonical design constitution for the Aracore corporate website.
  Aracore provides settlement infrastructure for digital dollars.
  This file is the single source of truth for all UI generated for
  aracore.com — coding agents MUST follow it exactly.

colors:
  # ── Brand core (from Aracore Branding Kit, 2026-04-09) ──
  ara-blue: "#0030B6"        # Brand primary. Logo default, primary CTA. Pantone 2738 C
  core-blue: "#041460"       # Deep brand blue. Hover state of primary, dark gradients. Pantone 2758 C
  obsidian-blue: "#081030"   # Brand dark ground. Hero/footer/dark sections. Pantone 282 C
  flow-cyan: "#1AA8FF"       # Accent. Highlights, data accents, links on dark. Pantone 279 C
  soft-white: "#F8FAFC"      # Alternate light background. Pantone White
  core-white: "#FFFFFF"      # Base surface
  core-black: "#040810"      # Reserved. Never use as a text color; use gray-900 instead

  # ── Gray scale (brand-defined, aligned with Tailwind gray) ──
  gray-50: "#FAFAFA"
  gray-100: "#F3F4F6"
  gray-200: "#E5E7EB"
  gray-300: "#D1D5DB"
  gray-400: "#9CA3AF"
  gray-500: "#6B7280"
  gray-600: "#4B5563"
  gray-700: "#374151"
  gray-800: "#1F2937"
  gray-900: "#111827"

  # ── Semantic aliases (use these in components, not raw values) ──
  background: "{colors.core-white}"
  background-alt: "{colors.soft-white}"
  background-dark: "{colors.obsidian-blue}"
  text-primary: "{colors.gray-900}"
  text-secondary: "{colors.gray-600}"
  text-muted: "{colors.gray-500}"
  text-on-dark: "{colors.soft-white}"
  text-secondary-on-dark: "{colors.gray-400}"
  link: "{colors.ara-blue}"
  link-on-dark: "{colors.flow-cyan}"
  border: "{colors.gray-200}"
  border-strong: "{colors.gray-300}"
  border-on-dark: "rgba(248, 250, 252, 0.14)"

  # ── Secondary palette — illustration & data-viz ONLY, never UI chrome ──
  aqua-signal: "#95D1CA"
  frost-veil: "#8ED2ED"
  steel-blue: "#2BA3BF"
  atlantic-slate: "#0C6891"
  linen-sand: "#E0DDDA"
  desert-beige: "#B7ACA3"
  terracotta-dust: "#8E847D"

typography:
  display:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  h3:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  h4:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body-lg:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  overline:
    fontFamily: "Geist, Pretendard, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
  section: "clamp(80px, 10vw, 140px)"

rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"

components:
  button-primary:
    backgroundColor: "{colors.ara-blue}"
    textColor: "{colors.core-white}"
    hoverBackgroundColor: "{colors.core-blue}"
    rounded: "{rounded.full}"
    paddingX: "28px"
    height: "52px"
    fontWeight: 500
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    border: "1px solid {colors.border-strong}"
    hoverBorder: "1px solid {colors.gray-500}"
    rounded: "{rounded.full}"
    paddingX: "28px"
    height: "52px"
    fontWeight: 500
  button-on-dark:
    backgroundColor: "{colors.core-white}"
    textColor: "{colors.obsidian-blue}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.core-white}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-on-dark:
    backgroundColor: "rgba(248, 250, 252, 0.04)"
    border: "1px solid {colors.border-on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  input:
    backgroundColor: "{colors.core-white}"
    border: "1px solid {colors.border-strong}"
    focusBorder: "1px solid {colors.ara-blue}"
    rounded: "{rounded.md}"
    height: "48px"
    paddingX: "16px"
  badge:
    backgroundColor: "{colors.soft-white}"
    textColor: "{colors.ara-blue}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"
    fontSize: "0.8125rem"
  nav:
    backgroundColor: "rgba(255, 255, 255, 0.85)"
    backdropFilter: "blur(12px)"
    borderBottom: "1px solid {colors.border}"
    height: "72px"
  footer:
    backgroundColor: "{colors.obsidian-blue}"
    textColor: "{colors.text-secondary-on-dark}"
---

## Overview

Aracore is a fintech company building **settlement infrastructure for digital
dollars** — the core layer that routes and settles value between financial
systems. The corporate website is the front line of sales: it introduces the
company and pitches the solution to banks, PSPs, and enterprise partners.
Every screen must project **stability, precision, and trust** — the same
qualities encoded in the logo's symmetrical, circular geometry.

Brand personality: an engineer's calm confidence, not a startup's loudness.
Institutional enough for a bank's compliance team, modern enough for a CTO.

Design principles — apply these when tokens alone don't decide:

1. **Trust through restraint.** Generous whitespace, few colors, no visual
   noise. If an element doesn't build credibility or move the pitch forward,
   remove it.
2. **Structured flow.** The brand symbol is value moving through a core.
   Layouts should read the same way: clear directional hierarchy, one idea
   per section, horizontal flow motifs welcome.
3. **Precision in detail.** Aligned baselines, consistent radii, exact
   spacing steps. Sloppy detail contradicts the product promise.
4. **Blue is the brand.** Depth of blue (obsidian → core → ara → cyan)
   is the primary expressive axis. Reach for a blue before any other hue.
5. **Light explains, dark closes.** The site opens light — the hero sits on
   white/soft-white. Dark navy sections are reserved for emotional brand
   moments at the end of the journey: the closing CTA band and footer.

## Colors

The palette is monochromatic blue plus neutral grays. Emotional range comes
from **depth of blue**, not from adding hues.

- **Ara Blue `#0030B6`** — the brand color. Primary buttons, links on light,
  active states, logo default. One primary CTA per viewport; never stack two
  Ara Blue buttons.
- **Core Blue `#041460`** — hover/pressed state of Ara Blue elements and the
  midpoint of dark gradients (obsidian → core blue). Not a standalone accent.
- **Obsidian Blue `#081030`** — the dark ground. Use as full-bleed section
  background for the closing CTA band and footer only; the hero stays light.
  Never use it for small accents or text on light backgrounds (use gray-900
  for text).
- **Flow Cyan `#1AA8FF`** — the energy accent. Links and highlights on dark
  backgrounds, data-visualization emphasis, small graphic accents (like the
  numbered overlines in the brand kit). **Contrast warning:** Flow Cyan on
  white fails WCAG AA for text — on light backgrounds use it only for
  non-text graphics; text links on light use Ara Blue.
- **Soft White `#F8FAFC` / Core White `#FFFFFF`** — alternate light section
  backgrounds. Alternate white and soft-white sections to create rhythm
  without borders.
- **Gray scale** — all text and borders. Body text: gray-900 headings,
  gray-600 body, gray-500 captions. On dark: soft-white headings, gray-400
  body.
- **Secondary palette** (aqua-signal, frost-veil, steel-blue, atlantic-slate,
  linen-sand, desert-beige, terracotta-dust) — reserved for illustrations,
  diagrams, and data visualization where more than two series are needed.
  Never use for buttons, links, backgrounds, or any UI chrome.

Dark sections may use a subtle vertical gradient `#081030 → #041460`.
No other gradients. No transparency tricks except the specified
glass nav and on-dark card fills.

## Typography

Two web fonts only.

- **Geist** (variable; self-host `assets/fonts/Geist-Variable.woff2`) — the
  primary typeface for ALL Latin text: headings, body, UI, numerals.
  Weights 400/500/600 only.
- **Pretendard** (variable; self-host
  `assets/fonts/PretendardVariable.woff2`) — Korean text. Because the stack
  is `Geist, Pretendard, sans-serif`, Latin glyphs render in Geist and
  Hangul falls through to Pretendard automatically. Korean-dominant pages
  may use `Pretendard, Geist, sans-serif` for headline-level consistency.

Rules:

- Headings: weight 600, tight leading, negative tracking as tokenized.
  Never bolder than 600 — the brand is precise, not heavy.
- Body: 16–18px, line-height 1.65, max line length ~68ch.
- The **overline pattern** from the brand kit (small uppercase label above a
  heading, e.g. `SOLUTION` — optionally with a Flow Cyan number like `010`)
  is the standard section opener. Overline: uppercase, +0.08em tracking,
  gray-500 on light / flow-cyan on dark.
- Sentence case everywhere: headings, buttons, nav. ALL CAPS is reserved for
  the overline pattern only.
- Korean text: never letter-space Hangul; keep `word-break: keep-all` on
  headings; end sentences with `.` `?` `!` (no trailing colons).

## Layout

- **Grid:** 12 columns, 24px gutters. Content max-width **1200px**
  (wide marketing visuals may extend to 1280px), horizontal padding 24px
  mobile / 32px tablet / 48px+ desktop.
- **Vertical rhythm:** every value comes from the 4px-base spacing scale.
  Section padding uses `{spacing.section}` (80–140px fluid). Heading→body
  gap `{spacing.lg}`, overline→heading gap `{spacing.sm}`.
- **Section structure:** one message per section. Standard opener: overline →
  heading → one short paragraph → content. Center-aligned openers for brand
  moments, left-aligned for informational sections.
- **Breakpoints:** 640 / 768 / 1024 / 1280 (Tailwind defaults). Design
  mobile-first; the pitch must survive on a phone in a meeting room.
- Alternate background colors (white / soft-white / obsidian) to delimit
  sections instead of divider lines.

## Elevation & Depth

Depth is expressed by **borders and background shifts, not shadows**.

- Default card/surface treatment: 1px `{colors.border}` border on light,
  `{colors.border-on-dark}` on dark. No drop shadows on cards.
- Permitted shadows (only these two):
  - Sticky nav after scroll: `0 1px 0 {colors.border}` (hairline).
  - Floating elements (dropdown, modal): `0 8px 30px rgba(8, 16, 48, 0.08)`.
- On dark sections, elevation = slightly lighter fill
  (`rgba(248,250,252,0.04)` → `0.08` on hover) plus the on-dark border.
- No glassmorphism except the specified nav blur. No neumorphism, no glows.

## Shapes

The logo is built from circles and horizontal flow lines; the UI shape
language follows it: **geometric, rounded, symmetrical**.

- Buttons and badges: pill (`{rounded.full}`) — echoes the circular symbol.
- Cards: `{rounded.lg}` (16px). Inputs: `{rounded.md}` (12px).
  Large media/feature blocks: `{rounded.xl}` (24px).
- Never mix radii within one component. Never use sharp 0px corners except
  full-bleed section backgrounds.
- Decorative motifs: concentric circles, a horizontal "flow line" crossing a
  node (from the symbol), thin 1px rules. Use sparingly — one motif per
  dark section at most. Do not redraw or approximate the logo itself.

## Components

- **Navigation:** fixed glass nav (`components.nav`), left logo
  (sideway/horizontal lockup, default colorway), center or right links, one
  Ara Blue pill CTA ("Contact" / "Get in touch"). The nav sits on the light
  hero from the start; the darkmode logo appears only inside dark sections
  (e.g. footer).
- **Buttons:** primary (Ara Blue pill), secondary (outlined pill), on-dark
  (white pill, obsidian text). Height 52px (44px compact). Max two buttons
  side-by-side: one primary + one secondary.
- **Cards:** bordered, 16px radius, 32px padding, title (h4) + body
  (caption/body). Hover: border darkens to `{colors.border-strong}`,
  optional 2px translate-y. No shadow on hover.
- **Stat blocks:** big Geist number (weight 600, tabular-nums, may use
  Ara Blue on light / Flow Cyan on dark) + gray caption below.
- **Forms (contact):** 48px inputs, visible labels above (no
  placeholder-as-label), Ara Blue focus ring, inline validation text in
  `#B42318`-class red allowed only for errors.
- **Footer:** obsidian background, darkmode logo + tagline lockup
  ("Settlement Infrastructure for Digital Dollars"), gray-400 link columns,
  legal line in gray-500.
- **Page patterns** for the corporate site: light hero on white/soft-white
  (headline + subcopy + dual CTA, brand-geometry graphic in blues allowed),
  logo/trust bar, solution pitch sections (alternating
  image/text), how-it-works (flow diagram using the routing motif),
  security/compliance section, closing CTA band (dark), contact.

## Motion

- Purposeful and quiet: fade + 12–16px rise on scroll-in, 200–400ms,
  `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out). Stagger children by 60–80ms.
- Hover transitions 150–200ms. No bounces, no parallax, no auto-playing
  carousels, no scroll-jacking.
- One signature motion allowed: a slow horizontal "flow" animation (moving
  line/dots through a node) in the hero or how-it-works diagram, echoing the
  symbol. Subtle — it must not compete with the headline.
- Respect `prefers-reduced-motion`: disable all non-essential animation.

## Logo & Brand Assets

Files live in [`assets/brand/`](assets/brand/) — copy into the site's
`/public/brand/` unchanged:

| File | Use |
|---|---|
| `aracore-sideway-default.svg` | Horizontal lockup, Ara Blue — on white/soft-white |
| `aracore-sideway-darkmode.svg` | Horizontal lockup, white — on obsidian/dark |
| `aracore-symbol-default.svg` | Symbol only, Ara Blue — small spaces, diagrams |
| `aracore-symbol-darkmode.svg` | Symbol only, white — dark contexts |
| `aracore-avatar.svg` | Squircle app icon/avatar — favicon source, social profiles |
| `aracore-tagline-lockup-default.svg` | Logo + tagline lock-up, blue — light backgrounds |
| `aracore-tagline-lockup-darkmode.svg` | Logo + tagline lock-up, white — footer, dark contexts |
| `og-image.png` | 1200×630 social share image — `og:image` / `twitter:image`, use as-is |

Ready-made favicon set in [`assets/favicon/`](assets/favicon/) — serve from
the site root or `/favicon/`: `favicon.svg`, `favicon.ico` (16/32/48),
`apple-touch-icon.png` (180, full-bleed), `icon-192.png` / `icon-512.png`
(web manifest).

Self-hosted fonts in [`assets/fonts/`](assets/fonts/) — copy to
`/public/fonts/` and declare via `@font-face`: `Geist-Variable.woff2`
(wght 100–900; use 400/500/600 only) and `PretendardVariable.woff2`
(wght 45–920; same usage weights).

Rules (from the branding kit):

- **Clear space:** on all sides, keep at least one FCU (the diameter of the
  symbol's core circle) free of other elements.
- **Minimum size:** horizontal lockup ≥ 120px wide on web; below that, use
  the symbol alone (≥ 24px).
- Only the two provided colorways exist. Never recolor, add gradients or
  shadows, stretch, rotate, outline, or place the default logo on dark /
  the darkmode logo on light.
- Never typeset "aracore" in Geist or any font as a logo substitute — the
  logotype is custom and fixed. In running text, write "Aracore".
- **Tagline lock-up:** use the provided `aracore-tagline-lockup-*.svg`
  files as-is (footer and formal contexts only). Never rebuild the lock-up
  from parts or retype the tagline next to the logo.

## Iconography & Imagery

- Icons: one consistent outline set (e.g. Lucide), 1.5px stroke, 20/24px,
  `currentColor`. No filled, duotone, or emoji icons in UI.
- Diagrams: build from the brand geometry — circles, nodes, horizontal
  connectors — using blues + grays (secondary palette allowed for multi-series
  charts). Abstract network/flow visuals over stocky 3D illustrations.
- Photography (if any): cool-toned, architectural, calm. Apply an obsidian
  overlay when text sits on top. No generic handshake/skyscraper stock.
- Designer-produced typographic graphics (display type baked into imagery)
  arrive as finished images (SVG/PNG/WebP) — never recreate their type as
  live web text or a web font.

## Accessibility & Localization

- WCAG 2.1 AA minimum. Body text contrast ≥ 4.5:1; verify every
  text/background pair — known trap: Flow Cyan text on light fails.
- Visible focus states: 2px Ara Blue outline, 2px offset (Flow Cyan on dark).
- Semantic HTML landmarks, one `h1` per page, logical heading order,
  keyboard-navigable menus and forms, alt text on all meaningful images.
- Bilingual site (EN primary / KR secondary): default locale and root URL
  serve English; Korean lives under a locale path (e.g. `/ko`). `lang`
  attributes set correctly, language switch in nav, no mixed-language
  sentences in UI copy.
- Tone of voice: confident, concrete, engineer-plain. Say what the system
  does; avoid hype words ("revolutionary", "next-gen"). Numbers and
  guarantees over adjectives.

## Do's and Don'ts

**Do**

- Use depth-of-blue as the only expressive color axis.
- Open sections with the overline → heading → paragraph pattern.
- Alternate white / soft-white / obsidian section backgrounds for rhythm.
- Keep one Ara Blue CTA per viewport; make it a pill.
- Use borders for elevation; keep shadows for floating layers only.
- Use tabular numerals for all metrics and financial figures.

**Don't**

- Don't use Flow Cyan for text on light backgrounds.
- Don't use the secondary (aqua/beige) palette for UI chrome.
- Don't introduce new hues (green/purple/orange) anywhere, including
  success states — success uses Ara Blue check + gray text.
- Don't stack two primary buttons, use ALL-CAPS headings, or exceed
  weight 600.
- Don't add drop shadows to cards, use glassmorphism beyond the nav,
  or animate on scroll-jack/parallax.
- Don't recolor, redraw, or typeset the logo; don't ignore FCU clear space.
- Don't end Korean sentences with a colon; don't letter-space Hangul.
