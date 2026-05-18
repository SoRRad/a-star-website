/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * Current production A-STAR logo assets are the PNG files in
 * public/logos/astar. The SVG files in the legacy folder are outdated and
 * should not be used until regenerated from the new logo.
 */
export const logos = {
  fullStackedDark: "/logos/astar/astar-stacked-dark.png",
  fullStackedLight: "/logos/astar/astar-stacked-light.png",

  fullHorizontalDark: "/logos/astar/astar-horizontal-dark.png",
  fullHorizontalLight: "/logos/astar/astar-horizontal-light.png",

  markDark: "/logos/astar/astar-mark-dark.png",
  markLight: "/logos/astar/astar-mark-light.png",
  markNeutral: "/logos/astar/astar-mark-neutral.png",
} as const;
