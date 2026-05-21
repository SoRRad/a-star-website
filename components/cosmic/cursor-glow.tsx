"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, { stiffness: 350, damping: 28 });
  const y = useSpring(0, { stiffness: 350, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        marginLeft: -12,
        marginTop: -12,
        pointerEvents: "none",
        zIndex: 9999,
        background:
          "radial-gradient(circle, rgba(100,181,246,0.6) 0%, rgba(30,136,229,0.2) 50%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(2px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
