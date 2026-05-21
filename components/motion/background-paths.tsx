"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/** Deterministic pseudo-random with a fixed seed — same output on every render, no hydration mismatch. */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface PathDef {
  id: number;
  d: string;
  strokeWidth: number;
  duration: number;
  delay: number;
  dashLen: number;
  totalLen: number;
}

interface DotDef {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
}

/**
 * Generates a set of surgical-trajectory/constellation path lines.
 * Uses a 1440×900 internal coordinate space scaled to fill its container.
 * All values are deterministic — seeded with a fixed value so SSR and
 * client render produce identical output (no hydration mismatch).
 */
function generatePaths(): { paths: PathDef[]; dots: DotDef[] } {
  const rng = seededRandom(137);

  const pathDefs: PathDef[] = [
    // Long sweeping curves — robot-arm trajectories across the viewport
    { x0: 0,     y0: 120, cx1: 360, cy1: 80,  cx2: 720,  cy2: 200, x1: 1100, y1: 160 },
    { x0: 200,   y0: 0,   cx1: 300, cy1: 300, cx2: 500,  cy2: 500, x1: 800,  y1: 900 },
    { x0: 900,   y0: 0,   cx1: 1000,cy1: 280, cx2: 1100, cy2: 600, x1: 1440, y1: 700 },
    { x0: 1440,  y0: 200, cx1: 1100,cy1: 150, cx2: 700,  cy2: 350, x1: 300,  y1: 450 },
    { x0: 0,     y0: 550, cx1: 400, cy1: 450, cx2: 800,  cy2: 600, x1: 1440, y1: 480 },
    { x0: 600,   y0: 900, cx1: 700, cy1: 600, cx2: 900,  cy2: 300, x1: 1200, y1: 100 },
    { x0: 100,   y0: 800, cx1: 350, cy1: 700, cx2: 650,  cy2: 750, x1: 950,  y1: 820 },
    { x0: 0,     y0: 350, cx1: 200, cy1: 200, cx2: 400,  cy2: 100, x1: 700,  y1: 50  },
  ].map((coords, i) => ({
    id: i,
    d: `M ${coords.x0} ${coords.y0} C ${coords.cx1} ${coords.cy1} ${coords.cx2} ${coords.cy2} ${coords.x1} ${coords.y1}`,
    strokeWidth: 0.6 + rng() * 0.5,
    duration: 14 + rng() * 18,
    delay: rng() * 12,
    dashLen: 80 + rng() * 120,
    totalLen: 900 + rng() * 600,
  }));

  // Small node dots at intersection/endpoint regions
  const dotDefs: DotDef[] = [
    { cx: 360,  cy: 80  },
    { cx: 720,  cy: 200 },
    { cx: 1100, cy: 160 },
    { cx: 500,  cy: 500 },
    { cx: 1100, cy: 600 },
    { cx: 700,  cy: 350 },
    { cx: 400,  cy: 450 },
    { cx: 800,  cy: 600 },
    { cx: 650,  cy: 750 },
    { cx: 350,  cy: 700 },
    { cx: 200,  cy: 200 },
    { cx: 700,  cy: 50  },
  ].map((pos, i) => ({
    id: i,
    cx: pos.cx,
    cy: pos.cy,
    r: 1.5 + rng() * 1,
    opacity: 0.3 + rng() * 0.4,
  }));

  return { paths: pathDefs, dots: dotDefs };
}

interface BackgroundPathsProps {
  className?: string;
}

/**
 * Subtle animated surgical/constellation path overlay.
 *
 * Soft blue path lines add a galactic-technical underlay without competing
 * with content.
 *
 * Uses CSS animations defined in globals.css (@keyframes bg-path-flow).
 * Respects prefers-reduced-motion.
 */
export function BackgroundPaths({ className }: BackgroundPathsProps) {
  const { paths, dots } = useMemo(() => generatePaths(), []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Paths */}
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="var(--color-blue-400)"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${path.dashLen} ${path.totalLen}`}
            className="opacity-[0.13] dark:opacity-[0.04] motion-reduce:animate-none"
            style={{
              animationName: "bg-path-flow",
              animationDuration: `${path.duration}s`,
              animationDelay: `${path.delay}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              strokeDashoffset: path.totalLen + path.dashLen,
            }}
          />
        ))}

        {/* Node dots */}
        {dots.map((dot) => (
          <circle
            key={dot.id}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="var(--color-blue-400)"
            className="opacity-[0.18] dark:opacity-[0.06]"
          />
        ))}
      </svg>
    </div>
  );
}
