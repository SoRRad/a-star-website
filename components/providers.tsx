"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { isCorporateSafe } from "@/lib/corporate-safe";

function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (isCorporateSafe()) return;

    let lenis: Lenis | undefined;
    let raf: number;

    try {
      lenis = new Lenis({
        duration: 0.75,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.0,
        wheelMultiplier: 1.0,
      });

      function tick(time: number) {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    } catch {
      // Degrade to native scroll on unsupported browsers
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
