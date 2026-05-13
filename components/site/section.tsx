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
        className="pointer-events-none absolute -right-2 top-0 hidden h-full xl:block"
      >
        <div className="sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
          <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-[var(--color-muted-foreground)] opacity-40 [writing-mode:vertical-rl]">
            {code}
          </span>
          <span className="h-px w-8 bg-[var(--color-border)] opacity-40 [writing-mode:vertical-rl]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] opacity-30 [writing-mode:vertical-rl]">
            {label}
          </span>
        </div>
      </div>

      {children}
    </section>
  );
}
