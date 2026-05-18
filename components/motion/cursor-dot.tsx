"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/**
 * Cursor accent dot. It follows the real pointer immediately, with only a
 * requestAnimationFrame boundary to keep updates aligned to paint.
 *
 * Hidden on touch devices and when prefers-reduced-motion is enabled.
 */
export function CursorDot() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const latest = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    setVisible(true);

    const onMove = (event: MouseEvent) => {
      latest.current = { x: event.clientX, y: event.clientY };
      if (frame.current !== null) return;

      frame.current = requestAnimationFrame(() => {
        mx.set(latest.current.x);
        my.set(latest.current.y);
        frame.current = null;
      });
    };

    const onEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [tabindex]")) {
        setHovered(true);
      }
    };
    const onLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [tabindex]")) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
      style={{ x: mx, y: my }}
      animate={
        hovered
          ? {
              width: 30,
              height: 30,
              backgroundColor: "transparent",
              borderWidth: 1.25,
              borderColor: "var(--color-accent)",
              opacity: 0.65,
            }
          : {
              width: 8,
              height: 8,
              backgroundColor: "var(--color-accent)",
              borderWidth: 0,
              borderColor: "transparent",
              opacity: 0.82,
            }
      }
      transition={{ duration: 0.08, ease: "linear" }}
    />
  );
}
