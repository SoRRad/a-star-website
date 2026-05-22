import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  /** Numeric code shown in the sticky label, e.g. "01" */
  code: string;
  /** Human label, e.g. "Mission" */
  label: string;
  id?: string;
  className?: string;
}

/**
 * Home-page section wrapper with a sticky label pinned to the right edge.
 *
 * The label (code + text) sticks vertically while the section is in view,
 * then scrolls away with the section. Hidden on mobile to avoid crowding.
 *
 * Position strategy: the section is relative; the label is sticky with
 * top-1/2 so it vertically centers as the section passes.
 */
export function Section({ children, code, label, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8", className)}
    >
      {/* Sticky section label — desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -right-2 hidden h-full xl:block"
      >
        <div className="sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
          <span className="font-display text-[10px] font-semibold tabular-nums tracking-[0.2em] text-white/40 [writing-mode:vertical-rl]">
            {code}
          </span>
          <span className="h-px w-8 bg-white/20 [writing-mode:vertical-rl]" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase [writing-mode:vertical-rl]">
            {label}
          </span>
        </div>
      </div>

      {children}
    </section>
  );
}
