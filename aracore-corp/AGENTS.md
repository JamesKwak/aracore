# AGENTS.md

## UI & Design System

All UI must follow [./DESIGN.md](./DESIGN.md) — the canonical design
constitution for the Aracore corporate website. Read it before generating
any page, component, or style. Its YAML frontmatter defines the design
tokens; its markdown body defines usage rules, page patterns, and
do's/don'ts. When a choice isn't covered there, follow its design
principles rather than generic defaults.

## Brand assets

- `assets/brand/` — logo SVGs, tagline lock-ups, OG image. Use unchanged;
  never regenerate, recolor, or retype them.
- `assets/favicon/` — complete favicon set (`favicon.svg`, `favicon.ico`,
  `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`).
- `assets/fonts/` — self-hosted variable fonts (`Geist-Variable.woff2`,
  `PretendardVariable.woff2`).

Copy these directories into the site's public directory as
`/brand/`, `/favicon/` (or root), and `/fonts/`.
