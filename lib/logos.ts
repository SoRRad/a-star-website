/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * UI logo paths use transparent SVG variants so the mark and wordmarks sit
 * cleanly on the dark galaxy background. The raster PNG handoff exports are
 * preserved in public/logos/astar for favicon and social-image contexts, but
 * their opaque backgrounds make them unsuitable for hero/header placement.
 */
export const logos = {
  // Full stacked (vertical) lockups - available for non-hero brand contexts.
  fullStackedDark: "/logos/astar/astar-stacked-dark.svg",
  fullStackedLight: "/logos/astar/astar-stacked-light.svg",

  // Full horizontal lockups - used where a wordmark is appropriate.
  fullHorizontalDark: "/logos/astar/astar-horizontal-dark.svg",
  fullHorizontalLight: "/logos/astar/astar-horizontal-light.svg",

  // Mark only (no wordmark).
  markDark: "/logos/astar/astar-mark-dark.svg",
  markLight: "/logos/astar/astar-mark-light.svg",
  markNeutral: "/logos/astar/astar-mark-neutral.svg",
} as const;
