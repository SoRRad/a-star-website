"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { CosmicFallback } from "./cosmic-fallback";

const StarField = lazy(() =>
  import("./star-field").then((module) => ({ default: module.StarField })),
);

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

export function CosmicBackground() {
  const [capable, setCapable] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = window.matchMedia("(max-width: 767px)");

    const evaluate = () => {
      const nav = navigator as NavigatorWithMemory;
      const cores = nav.hardwareConcurrency ?? 2;
      const memory = nav.deviceMemory ?? 2;
      const isMobile = /Mobi|Android/i.test(nav.userAgent);
      const isCompact = compactQuery.matches;
      const isCapable = !isCompact && (!isMobile || (cores >= 4 && memory >= 4));

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

  if (capable === null) return <CosmicFallback />;
  if (reducedMotion || !capable) return <CosmicFallback />;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Suspense fallback={<CosmicFallback />}>
        <StarField />
      </Suspense>
    </div>
  );
}
