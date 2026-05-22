/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * Current production A-STAR logo assets are root-level transparent PNG files
 * in public/logos/astar. The active UI is dark-only and uses the on-dark
 * assets, while on-light assets remain available for future theme work.
 */
export const logos = {
  // Mark-only square assets.
  markDark: "/logos/astar/astar-mark-on-light.png",
  markLight: "/logos/astar/astar-mark-on-dark.png",
  markNeutral: "/logos/astar/astar-mark-neutral.png",

  // Full horizontal wordmark assets.
  fullHorizontalDark: "/logos/astar/astar-horizontal-on-light.png",
  fullHorizontalLight: "/logos/astar/astar-horizontal-on-dark.png",

  // Full stacked layout assets.
  fullStackedDark: "/logos/astar/astar-stacked-on-light.png",
  fullStackedLight: "/logos/astar/astar-stacked-on-dark.png",
} as const;
