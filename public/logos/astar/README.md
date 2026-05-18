# A-STAR Logo Assets

Production raster exports from the local `New logos` handoff are preserved here. The current site UI uses the generated transparent SVG fallback variants because the PNG exports have opaque baked backgrounds at the corners.

## Current Usage

| Usage | File | Notes |
| --- | --- | --- |
| Header mark | `astar-mark-neutral.svg` | Transparent SVG fallback, used by the left home link and sidebar UI |
| Hero mark | `astar-mark-dark.svg` / `astar-mark-light.svg` through `lib/logos.ts` | Transparent mark-only logo; headline text is rendered in HTML |
| Footer wordmark | `astar-horizontal-dark.svg` / `astar-horizontal-light.svg` | Transparent horizontal SVG fallback variants |
| Stacked logo | `astar-stacked-dark.svg` / `astar-stacked-light.svg` | Available but not used in the homepage hero |
| Favicon | `favicon-512.png` | PNG retained for icon metadata |
| Apple touch icon | `apple-touch-icon.png` | PNG retained for icon metadata |
| OpenGraph static asset | `astar-og-image.png` | Full social image asset retained; dynamic `/opengraph-image` also remains available |

## Raster Handoff Files

The PNG files copied from `New logos` include:

- `astar-mark-*.png`
- `astar-horizontal-*.png`
- `astar-stacked-*.png`
- `astar-og-image.png`
- `favicon-512.png`
- `apple-touch-icon.png`

These PNG logo lockups are not used for transparent UI placement because their backgrounds are opaque. If new production exports are supplied, prefer transparent SVG, PNG, or WebP files with no checkerboard/white box baked into the image.
