# A-STAR Logo Assets

## Current Production Assets

Active production logo files are PNG files in `public/logos/astar/`.
`clean/` and `current/` are not used by the production website.

The old SVG files under `legacy/` are outdated and must not be imported or
hardcoded in active UI code.

Use `*-on-light.png` for light backgrounds and `*-on-dark.png` for dark
backgrounds. The dark-mode mark must remain light/white enough for navy or
black surfaces; do not substitute the neutral mark in dark-mode UI.

## Canonical UI Files

| File | Variant | Used by |
| --- | --- | --- |
| `astar-mark-on-light.png` | Mark, dark/navy ink | `<Logo variant="mark">` in light mode |
| `astar-mark-on-dark.png` | Mark, white/light ink | `<Logo variant="mark">` in dark mode |
| `astar-mark-neutral.png` | Mark, neutral | Reserved for standalone use |
| `astar-horizontal-on-light.png` | Horizontal wordmark, dark/navy ink | Available through `lib/logos.ts` |
| `astar-horizontal-on-dark.png` | Horizontal wordmark, white/light ink | Available through `lib/logos.ts` |
| `astar-stacked-on-light.png` | Stacked wordmark, dark/navy ink | Available through `lib/logos.ts` |
| `astar-stacked-on-dark.png` | Stacked wordmark, white/light ink | Available through `lib/logos.ts` |
| `favicon-512.png` | Browser favicon | `app/layout.tsx` |
| `apple-touch-icon.png` | Apple home-screen icon | `app/layout.tsx` |
| `astar-og-image.png` | Social image fallback | Metadata/OpenGraph contexts |

## Site Logo Usage

| Location | Component / file | Variant |
| --- | --- | --- |
| Header home link | `components/site/header.tsx` | `mark` |
| Research dropdown icons | `components/site/header.tsx` | `mark` |
| Hero section | `components/sections/hero-section.tsx` | `mark` + HTML headline |
| Sidebar | `components/site/command-palette.tsx` | `mark` |
| Footer | `components/site/footer.tsx` | `mark` + HTML text |
| Phase wheel center | `components/lab/phase-wheel.tsx` | HTML `<Logo>` overlay |

Paths come from `lib/logos.ts`. Do not hardcode logo paths in components.
