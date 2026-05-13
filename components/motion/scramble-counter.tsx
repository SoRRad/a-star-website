"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrambleCounterProps {
  value: number;
  /** Total animation duration in milliseconds */
  duration?: number;
  suffix?: string;
  className?: string;
}

const DIGITS = "0123456789";

/**
 * Digit-scramble counter — each digit cycles through random values before
 * settling left-to-right. Runs once on first scroll-into-view.
 *
 * Uses a fixed-width mono font so the layout doesn't shift during animation.
 */
export function ScrambleCounter({
  value,
  duration = 1500,
  suffix,
  className,
}: ScrambleCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [display, setDisplay] = useState<string[]>(
    String(value).split("").map(() => "0"),
  );
  const animating = useRef(false);

  useEffect(() => {
    if (!inView || animating.current) return;
    animating.current = true;

    const target = String(value).split("");
    const count = target.length;
    const start = performance.now();

    /* Each digit settles at a staggered time: leftmost first */
    const settleAt = target.map((_, i) => {
      const fraction = (i + 1) / count;
      return start + duration * (0.3 + 0.7 * fraction);
    });

    function tick(now: number) {
      const next = target.map((digit, i) => {
        if (now >= settleAt[i]) return digit;
        return DIGITS[Math.floor(Math.random() * 10)];
      });
      setDisplay(next);

      if (now < Math.max(...settleAt)) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {display.join("")}
      {suffix}
    </span>
  );
}
