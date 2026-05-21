# A-STAR Logo Assets

## Active Production Files

All active logo files are PNG files in `public/logos/astar/`. The live site is dark-only, so active UI should prefer the `*-on-dark.png` assets plus the transparent neutral mark.

The `astar-mark-neutral.png` and `.webp` files are transparent-background marks used for watermarks and decorative overlays.

Do **not** use old SVG files or the non-prefixed variants; those have been removed from the repository.
Do **not** use `public/logos/astar/clean/` or `public/logos/astar/current/` in active UI. Production code should import paths from `lib/logos.ts`, and those paths should point to root-level PNG files in this folder.

## Canonical UI Files

| File | Variant | Used by |
| --- | --- | --- |
| `astar-mark-on-dark.png` | Mark, white/light ink | Header, footer, command drawer |
| `astar-mark-neutral.png` | Mark, neutral/transparent bg | Watermarks, overlays (`logos.markNeutral`) |
| `astar-horizontal-on-dark.png` | Horizontal wordmark, white/light ink | Available through `lib/logos.ts` |
| `astar-stacked-on-dark.png` | Stacked wordmark, white/light ink | Home hero |
| `favicon-512.png` | Browser favicon | `app/layout.tsx` |
| `apple-touch-icon.png` | Apple home-screen icon | `app/layout.tsx` |
| `astar-og-image.png` | Social image fallback | Manual OG fallback; dynamic route is `app/opengraph-image.tsx` |

## Site Logo Usage

| Location | Component / file | Variant |
| --- | --- | --- |
| Header home link | `components/site/header.tsx` | `mark` |
| Hero section | `components/sections/hero-section.tsx` | `astar-stacked-on-dark.png` |
| Command drawer | `components/site/command-palette.tsx` | `mark` |
| Footer | `components/site/footer.tsx` | `mark` + HTML text |
| Phase wheel center | `components/lab/phase-wheel.tsx` | HTML `<Logo>` overlay |
| Reveal watermark | `components/motion/reveal.tsx` | `markNeutral` |
| Featured projects | `components/lab/featured-projects.tsx` | `markNeutral` |
| Project cards | `components/lab/project-card.tsx` | `markNeutral` |

All logo paths come from `lib/logos.ts` unless a component intentionally uses a concrete logo lockup, such as the home hero. Do not render paired logo images for different themes in the DOM.
