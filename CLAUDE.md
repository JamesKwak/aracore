# Aracore Website — Engineering Definition

Authoritative build contract for the Aracore corporate/product website. This
file captures the **architecture, invariants, and conventions** that cannot be
inferred by reading a single file. For visual/design decisions the source of
truth is [`aracore-corp/DESIGN.md`](aracore-corp/DESIGN.md); for exact copy,
markup, SVG geometry, and CSS values the source of truth is **the code itself**
(this is a no-build static site, so the files _are_ the spec). Do not restate
those here — link to them and keep this document about structure and rules.

## What this site is

- **Company:** Aracore — a US entity founded by BPMG.
- **Positioning:** _Stablecoin settlement infrastructure for regulated markets._
  Pitches institutional cross-border payout + settlement orchestration to banks,
  PSPs, and technical partners. Not an IR site — a product/sales site.
- **Language:** English (primary). Copy tone: confident, concrete, engineer-plain
  (see DESIGN.md § Accessibility & Localization).
- **Production host:** `https://www.aracore.io` (single canonical hostname).

## Architecture

- **Static multi-page site.** Plain HTML + one CSS file + one JS file.
- **No framework, no bundler, no build step, no npm.** Never introduce React/Vue/
  Svelte, Tailwind/Bootstrap, vite/webpack, or any SPA router. If a change seems
  to need a build step, it is the wrong change.
- **Shared chrome is rendered once, from JavaScript.** The top nav, right side
  rail, and footer live **only** in [`site-chrome.js`](site-chrome.js). They are
  never hand-written into individual HTML pages. Editing nav/footer/side-rail
  content means editing `site-chrome.js` — nowhere else.
- **Each page owns only its `<main>`.** Everything outside `<main>` is either the
  fixed `<head>` boilerplate or the shared-chrome mount points.

### File map

| File | Role |
|---|---|
| `index.html` | Home — hero, Settlement Flow SVG demo, partner-category strip, contact CTA |
| `product.html` | Product comparison (legacy vs Aracore ISN) + Tech & IP cards |
| `usecases.html` | Three scenario cards, each with a mini SVG flow |
| `developers.html` | Dark navy API panel + code sample (`POST /quotes`) |
| `onboarding.html` | 5-step onboarding flow |
| `company.html` | About / Mission / Vision / Partners·News·Events |
| `404.html` | Custom not-found page (`<meta name="robots" content="noindex">`) |
| `site-chrome.js` | Shared chrome: nav, side rail, footer, active state, soft-nav, GA, flow animation |
| `styles.css` | All styles — design tokens, components, responsive |
| `site.webmanifest`, `robots.txt`, `sitemap.xml` | Metadata / SEO |
| `brand/` | Logo SVGs, tagline lock-ups, `og-image.png` (use unchanged) |
| `favicon/` | `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` |
| `fonts/` | Self-hosted variable fonts: `Geist-Variable.woff2`, `PretendardVariable.woff2` |
| `aracore-corp/` | Reference only — design constitution (`DESIGN.md`) + asset originals. **Not deployed.** |
| `DEPLOYMENT_FILES.md` | Canonical list of what ships to the web root |

## Page contract (every HTML page must follow)

Body skeleton — nothing between the mounts except the page's own `<main>`:

```html
<body>
<div id="site-chrome-top"></div>
<main>
  <!-- page-specific sections only -->
</main>
<div id="site-chrome-footer"></div>
<script src="site-chrome.js"></script>
</body>
```

`<head>` is boilerplate that is **identical across pages except** `<title>`,
`<meta property="og:url">`, `<meta name="twitter:url">`, and
`<link rel="canonical">`. Every page includes, in this order:

1. `charset`, `viewport`.
2. `<title>` and matching `description` / OG / Twitter meta. Title pattern:
   `<Page> - Aracore | Stablecoin Settlement Infrastructure for Regulated Markets`
   (home omits the `<Page> - ` prefix).
3. `canonical`, `og:url`, `twitter:url` pointing at the page's production URL.
4. Favicon set (`favicon/favicon.ico`, `favicon/favicon.svg`,
   `favicon/apple-touch-icon.png`) + `site.webmanifest`.
5. Google Analytics gtag snippet — measurement ID **`G-5Y067726SX`** (see GA note).
6. `<link rel="stylesheet" href="styles.css">`.

Exactly one `<h1>` per page. Sentence case for headings, nav, and buttons —
`ALL CAPS` only for the overline/kicker pattern.

## `site-chrome.js` contract

Single IIFE, no dependencies. Responsibilities:

- **Renders** side rail + nav into `#site-chrome-top` and footer into
  `#site-chrome-footer`.
- **Nav items** come from the `navItems` array (Product, Use Cases, Developers,
  Onboarding, Company). Active state is set by comparing the normalized current
  filename to each link's target.
- **Soft navigation:** intercepts same-origin clicks to `*.html`, `fetch`es the
  target, and swaps only its `<main>` in place (updates `<title>`, active nav,
  re-runs the flow animation, fires a GA page_view). Falls back to a full
  navigation if the fetch fails. External links, `mailto:`/`tel:`, and links with
  a `target` are left alone.
- **Clean URLs:** on load it `history.replaceState`s `foo.html` → `./` so the
  address bar hides the filename (except `404.html`).
- **GA event tracking:** `contact_click` (mailto / CTA) and `api_docs_click`.
  All GA calls go through `ensureGtag()` so they no-op safely if gtag is absent.
- **Flow animation:** drives the Settlement Flow SVG (see below).

Brand marks used by the chrome: nav uses `brand/aracore-sideway-default.svg`
(blue, on light); footer uses `brand/aracore-tagline-lockup-darkmode.svg`
(white, on the obsidian footer). Never swap a light-on-dark logo for the wrong
colorway.

## Settlement Flow SVG contract (home only)

The animated diagram in `index.html` (`#flow`) is **self-describing**; the
engine (`site-chrome.js` timer + `styles.css` tone rules) is generic. Changing
the diagram — nodes, arrows, step count, colors — means editing **only the SVG
in `index.html`**:

- Every animated element (`.node`, `.flowline`, `.label`, `.event-chip`)
  carries a `data-step` starting at 1. Steps must be contiguous **1..N**; the
  animation auto-detects N as the highest `data-step` present.
- `startFlowAnimation()` activates steps 1→N, one every **900ms**
  (`FLOW_STEP_MS`), holds **3000ms** (`FLOW_HOLD_MS`) after the last step, then
  loops. Each tick toggles `.active`; CSS `@keyframes activate/dash/labelOn` in
  `styles.css` does the visual work.
- Colors come from `data-tone="blue|cyan|deep"` on flowlines, labels, nodes,
  chips, and the arrow `<marker>`s. `styles.css` maps each tone to the
  `--flow-<tone>` / `--flow-<tone>-bg` / `--flow-<tone>-line` custom properties
  on `.demo-screen`. Untoned nodes/chips render white with a gray border. There
  is **no JS recoloring** — change the palette via those CSS vars only.
- `prefers-reduced-motion` disables the animation globally (last rule in
  `styles.css`).

The mini SVGs on `usecases.html` are static (no `data-step`); leave them inline.

## Design system

Follow [`aracore-corp/DESIGN.md`](aracore-corp/DESIGN.md) — it is the canonical
design constitution (tokens in YAML frontmatter, rules in the body). Key points
already implemented in `styles.css`:

- **Color is monochromatic blue + gray.** Expressive axis is _depth of blue_:
  `--ara-blue #0030B6` (brand/primary), `--core-blue #041460` (hover/dark
  gradient), `--obsidian-blue #081030` (dark ground: CTA band + footer only),
  `--flow-cyan #1AA8FF` (accent/links on dark — never text on light: fails AA).
  No green/purple/orange, including success states.
- **Type:** Geist (Latin) + Pretendard (Korean fallback), weights **400/500/600
  only** — never heavier than 600. Sentence case. `word-break: keep-all` on
  headings.
- **Elevation via borders + background shifts, not shadows** (`--shadow` is
  `none`). Pills for buttons/badges (`border-radius: 9999px`), 16px cards.
- **Light explains, dark closes:** hero is light; obsidian is reserved for the
  closing CTA band and footer.

Brand assets in `brand/` and `aracore-corp/assets/brand/` are used **unchanged** —
never recolor, redraw, stretch, or retype the logo.

## Running locally

A launch config exists at `.claude/launch.json` (name: `aracore-static`). It
serves the folder with Python's static server on port 5500:

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500/`. All pages must return **200** and the console
must be clean.

### Verification checklist (per change)

- `navCount === 1`, `footerCount === 1`, `sideRail === 1` on desktop.
- `document.documentElement.scrollWidth > clientWidth` is **false** (no horizontal
  overflow) at both desktop and 390px widths.
- Active nav highlights the current subpage (`null` on home).
- Flow animation runs on home; console has no errors.
- Responsive breakpoints hold: `@media(max-width:980px)` hides `.nav-links`;
  `@media(max-width:640px)` hides the side rail and the first nav CTA.

## Deployment

Ship exactly the files listed in [`DEPLOYMENT_FILES.md`](DEPLOYMENT_FILES.md) to
the web root. **Never deploy** `.git/`, `.agents/`, `.claude/`, `aracore-corp/`,
`*.md` docs, or scratch files. Server rules: `index.html` as directory default,
HTTPS only, canonical host `https://www.aracore.io`, `404.html` as the custom
not-found page.

## Editing rules

1. Never duplicate nav/footer/side-rail into an HTML page — edit `site-chrome.js`.
2. Keep the `<head>` boilerplate identical across pages; only title + canonical/
   OG/Twitter URLs vary per page.
3. Preserve the `data-step` 1–10 contract between the flow SVG and its animation.
4. Change colors through CSS custom properties / DESIGN.md tokens, not ad-hoc hex.
5. No build step, no framework, no external CSS/JS libraries.
6. Keep GA measurement ID `G-5Y067726SX` consistent across every page's head.
7. After any change, re-run the verification checklist above before considering
   it done.
```
