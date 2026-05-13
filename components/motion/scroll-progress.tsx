"use client";

import { useScroll, useTransform, motion } from "motion/react";

/**
 * EKG-style scroll progress bar pinned above the header.
 * A 2px accent-blue bar grows as the user scrolls, with a pulsing dot at the tip.
 * Z-index 50 ensures it renders above the sticky header.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[2px] w-full"
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full bg-[var(--color-accent)]"
        style={{ width }}
      >
        {/* Pulsing dot rides the tip of the progress bar */}
        <span className="animate-ekg absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--color-accent)]" />
      </motion.div>
    </div>
  );
}
