/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * Current production A-STAR logo assets are root-level PNG files in
 * public/logos/astar. The SVG files in the legacy folder are outdated and must
 * not be used in active UI code until regenerated from the new logo artwork.
 *
 * Naming convention:
 *   "Dark"  suffix = dark-ink source asset from the identity package.
 *   "Light" suffix = light-ink source asset used on the dark cosmic site.
 */
export const logos = {
  // Mark-only (square)
  markDark: "/logos/astar/astar-mark-on-light.png",
  markLight: "/logos/astar/astar-mark-on-dark.png",
  markNeutral: "/logos/astar/astar-mark-neutral.png", // neutral mark, transparent bg

  // Full horizontal wordmark
  fullHorizontalDark: "/logos/astar/astar-horizontal-on-light.png",
  fullHorizontalLight: "/logos/astar/astar-horizontal-on-dark.png",

  // Full stacked layout
  fullStackedDark: "/logos/astar/astar-stacked-on-light.png",
  fullStackedLight: "/logos/astar/astar-stacked-on-dark.png",
} as const;
