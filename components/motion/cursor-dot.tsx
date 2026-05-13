"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Elastic cursor accent dot — follows the cursor with a spring lag.
 * On hover over links/buttons (signaled by data-cursor="hover" on the body),
 * expands to a soft outline ring.
 *
 * Hidden on: touch devices, prefers-reduced-motion, server render.
 */
export function CursorDot() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const x = useSpring(mx, { stiffness: 350, damping: 28 });
  const y = useSpring(my, { stiffness: 350, damping: 28 });

  useEffect(() => {
    /* Only show on fine-pointer devices with no reduced motion preference */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    /* Delegate hover detection via the DOM — avoids attaching listeners to every element */
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [tabindex]")) {
        setHovered(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [tabindex]")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
      style={{ x, y }}
      animate={
        hovered
          ? {
              width: 32,
              height: 32,
              backgroundColor: "transparent",
              borderWidth: 1.5,
              borderColor: "var(--color-accent)",
              opacity: 0.7,
            }
          : {
              width: 8,
              height: 8,
              backgroundColor: "var(--color-accent)",
              borderWidth: 0,
              borderColor: "transparent",
              opacity: 0.85,
            }
      }
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
