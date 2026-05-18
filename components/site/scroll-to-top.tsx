"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Resets the scroll position to the top whenever the route (pathname or
 * search params) changes. Hash-based anchor links are left alone — if the
 * URL has a #hash the browser's native scroll-to-anchor takes precedence.
 *
 * Lenis (from providers.tsx) manages the smooth-scroll experience; we use
 * window.scrollTo with behavior:"instant" so we don't fight it.
 *
 * window.history.scrollRestoration = "manual" prevents the browser from
 * restoring the previous scroll position on soft navigations.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    // Skip on the very first mount (the page rendered at the correct position)
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }

    // Only reset when pathname actually changed (ignore search-only changes on
    // the same page, e.g. filter toggles on /publications).
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // If the URL contains a hash, let the browser handle scrolling to the anchor.
    if (window.location.hash) return;

    // requestAnimationFrame defers until after Next.js has painted the new page,
    // preventing a flash where we scroll to top before the content swaps in.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, [pathname, searchParams]);

  return null;
}
