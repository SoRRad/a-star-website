/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * Current production A-STAR logo assets are cleaned PNG files with alpha
 * transparency in public/logos/astar/clean. The source PNG files are kept
 * alongside for reference.
 * The SVG files in the legacy folder are outdated and must not be used in
 * active UI code until regenerated from the new logo artwork.
 *
 * Naming convention:
 *   "Dark"  suffix = dark-ink logo intended for light/white backgrounds (onLight).
 *   "Light" suffix = light-ink logo intended for dark backgrounds (onDark).
 */
export const logos = {
  // Mark-only (square)
  markDark: "/logos/astar/clean/astar-mark-on-light.png", // dark mark for light backgrounds
  markLight: "/logos/astar/clean/astar-mark-on-dark.png", // light mark for dark backgrounds
  markNeutral: "/logos/astar/clean/astar-mark-neutral.png", // neutral mark, transparent bg

  // Full horizontal wordmark
  fullHorizontalDark: "/logos/astar/clean/astar-horizontal-on-light.png", // for light backgrounds
  fullHorizontalLight: "/logos/astar/clean/astar-horizontal-on-dark.png", // for dark backgrounds

  // Full stacked layout
  fullStackedDark: "/logos/astar/clean/astar-stacked-on-light.png", // for light backgrounds
  fullStackedLight: "/logos/astar/clean/astar-stacked-on-dark.png", // for dark backgrounds
} as const;
