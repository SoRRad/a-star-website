# A-STAR Logo Assets

## Current Production Assets

Active UI logo files are cleaned **PNG files with alpha transparency** in
`public/logos/astar/clean/`. They were generated from the current production PNG
exports in `public/logos/astar/`.

The old SVG files under `legacy/` are outdated and must not be imported or
hardcoded in active UI code.

## Naming Convention

| File suffix | Meaning | Use on |
| --- | --- | --- |
| `on-light.png` | Dark/navy logo artwork | Light backgrounds |
| `on-dark.png` | Light/white logo artwork | Dark backgrounds |
| `neutral.png` | Standalone mark variant | Context-specific |

## Active UI Files

| File | Variant | Used by |
| --- | --- | --- |
| `clean/astar-mark-on-light.png` | Mark, dark ink | `<Logo variant="mark">` in light mode |
| `clean/astar-mark-on-dark.png` | Mark, light ink | `<Logo variant="mark">` in dark mode |
| `clean/astar-mark-neutral.png` | Mark, neutral | Reserved for standalone use |
| `clean/astar-horizontal-on-light.png` | Horizontal wordmark, dark ink | Available through `lib/logos.ts` |
| `clean/astar-horizontal-on-dark.png` | Horizontal wordmark, light ink | Available through `lib/logos.ts` |
| `clean/astar-stacked-on-light.png` | Stacked wordmark, dark ink | Available through `lib/logos.ts` |
| `clean/astar-stacked-on-dark.png` | Stacked wordmark, light ink | Available through `lib/logos.ts` |
| `favicon-512.png` | Browser favicon | `app/layout.tsx` |
| `apple-touch-icon.png` | Apple home-screen icon | `app/layout.tsx` |

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
