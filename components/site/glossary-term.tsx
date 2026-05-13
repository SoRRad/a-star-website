"use client";

import * as Popover from "@radix-ui/react-popover";
import { glossary } from "@/lib/glossary";
import { cn } from "@/lib/utils";

interface GlossaryTermProps {
  term: string;
  className?: string;
}

/**
 * Inline glossary hover popover. Wraps a surgical-AI term; on hover or focus
 * shows a small definition card. Uses Radix Popover for accessible positioning.
 *
 * If the term is not found in lib/glossary.ts the span renders without a popover.
 */
export function GlossaryTerm({ term, className }: GlossaryTermProps) {
  const entry = glossary.find(
    (e) => e.term.toLowerCase() === term.toLowerCase(),
  );

  if (!entry) {
    return <span className={className}>{term}</span>;
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <span
          className={cn(
            "cursor-help underline decoration-dotted decoration-[var(--color-accent)] underline-offset-3 transition-colors hover:text-[var(--color-accent)]",
            className,
          )}
          role="definition"
        >
          {term}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          className="z-50 max-w-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 shadow-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {entry.term}
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-card-foreground)]">
            {entry.definition}
          </p>
          <Popover.Arrow className="fill-[var(--color-card)]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
