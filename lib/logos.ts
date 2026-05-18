/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * Current production A-STAR logo assets are root-level PNG files in
 * public/logos/astar. The SVG files in the legacy folder are outdated and must
 * not be used in active UI code until regenerated from the new logo artwork.
 *
 * Naming convention:
 *   "Dark"  suffix = dark-ink logo intended for light/white backgrounds (onLight).
 *   "Light" suffix = light-ink logo intended for dark backgrounds (onDark).
 */
export const logos = {
  // Mark-only (square)
  markDark: "/logos/astar/astar-mark-on-light.png", // dark/navy logo for light backgrounds
  markLight: "/logos/astar/astar-mark-on-dark.png", // white/light logo for dark backgrounds
  markNeutral: "/logos/astar/astar-mark-neutral.png", // neutral mark, transparent bg

  // Full horizontal wordmark
  fullHorizontalDark: "/logos/astar/astar-horizontal-on-light.png", // dark/navy logo for light backgrounds
  fullHorizontalLight: "/logos/astar/astar-horizontal-on-dark.png", // white/light logo for dark backgrounds

  // Full stacked layout
  fullStackedDark: "/logos/astar/astar-stacked-on-light.png", // dark/navy logo for light backgrounds
  fullStackedLight: "/logos/astar/astar-stacked-on-dark.png", // white/light logo for dark backgrounds
} as const;
