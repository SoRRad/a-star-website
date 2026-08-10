import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { logos } from "@/lib/logos";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Show the A-STAR mark watermark in the top-right corner (section eyebrow treatment) */
  showMark?: boolean;
}

/**
 * Fade + lift reveal when scrolled into view.
 *
 * Deliberately not a client component. The hidden state lives in CSS behind
 * `html.js` and in-view detection is handled for the whole page by a single
 * RevealController, so this renders as plain markup that is visible on its own.
 * The previous Framer Motion implementation shipped `opacity: 0` in the SSR HTML,
 * which left every page blank until React had hydrated.
 */
export function Reveal({ children, className, delay = 0, showMark = false }: RevealProps) {
  const mark = showMark ? (
    <Image
      src={logos.markNeutral}
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className="pointer-events-none absolute top-0 right-0 hidden h-6 w-6 opacity-20 select-none sm:block"
    />
  ) : null;

  return (
    <div
      data-reveal=""
      className={showMark ? `relative ${className ?? ""}` : className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {mark}
      {children}
    </div>
  );
}
