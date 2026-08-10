"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { CosmicFallback } from "./cosmic-fallback";
import { isCorporateSafe } from "@/lib/corporate-safe";

const StarField = lazy(() =>
  import("./star-field").then((module) => ({ default: module.StarField })),
);

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

/**
 * Runs `cb` once the browser is genuinely idle, falling back to a timeout on
 * engines without requestIdleCallback (Safari < 16.4). Returns a cancel fn.
 */
function onIdle(cb: () => void): () => void {
  const win = window as Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  if (typeof win.requestIdleCallback === "function") {
    const handle = win.requestIdleCallback(() => cb(), { timeout: 3000 });
    return () => win.cancelIdleCallback?.(handle);
  }

  const timer = window.setTimeout(cb, 1200);
  return () => window.clearTimeout(timer);
}

export function CosmicBackground() {
  const [capable, setCapable] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  // The WebGL star field drags in three/@react-three (~350 kB gzipped) and costs a
  // context creation plus shader compiles. It is pure decoration, so it must never
  // compete with first paint or with hydration: we hold it back until the page has
  // loaded *and* the main thread is idle. The static fallback covers the gap.
  const [deferredReady, setDeferredReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = window.matchMedia("(max-width: 767px)");

    const evaluate = () => {
      const nav = navigator as NavigatorWithMemory;
      const cores = nav.hardwareConcurrency ?? 2;
      const memory = nav.deviceMemory ?? 2;
      const isMobile = /Mobi|Android/i.test(nav.userAgent);
      const isCompact = compactQuery.matches;
      const isCapable =
        !isCompact && (!isMobile || (cores >= 4 && memory >= 4)) && !isCorporateSafe();

      setReducedMotion(motionQuery.matches);
      setCapable(isCapable);
    };

    evaluate();
    motionQuery.addEventListener("change", evaluate);
    compactQuery.addEventListener("change", evaluate);

    return () => {
      motionQuery.removeEventListener("change", evaluate);
      compactQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    let cancelIdle: (() => void) | undefined;

    const schedule = () => {
      cancelIdle = onIdle(() => setDeferredReady(true));
    };

    if (document.readyState === "complete") {
      schedule();
      return () => cancelIdle?.();
    }

    window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      cancelIdle?.();
    };
  }, []);

  if (capable === null) return <CosmicFallback />;
  if (reducedMotion || !capable) return <CosmicFallback />;
  if (!deferredReady) return <CosmicFallback />;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Suspense fallback={<CosmicFallback />}>
        <StarField />
      </Suspense>
    </div>
  );
}
