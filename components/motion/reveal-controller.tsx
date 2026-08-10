"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { REVEAL_BOOTED_FLAG } from "@/lib/corporate-safe";

type RevealWindow = Window & { [REVEAL_BOOTED_FLAG]?: boolean };

/**
 * Single page-wide IntersectionObserver driving every `[data-reveal]` block,
 * replacing one Framer Motion `useInView` hook per section.
 *
 * Setting the boot flag tells the inline head script's watchdog to stand down;
 * if this never runs, that watchdog drops the `js` class and the content shows
 * anyway. Elements are revealed once and then unobserved.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    (window as RevealWindow)[REVEAL_BOOTED_FLAG] = true;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const reveal = (el: HTMLElement) => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      // Matches the -60px in-view margin the previous Framer implementation used.
      { rootMargin: "0px 0px -60px 0px" },
    );

    targets.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
