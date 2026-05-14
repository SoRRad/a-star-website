import Image from "next/image";
import { logos } from "@/lib/logos";
import type { LabEvent } from "@/lib/events";
import { JournalClubButtons } from "./journal-club-buttons";

interface JournalClubCalloutProps {
  nextEvent: LabEvent | undefined;
}

export function JournalClubCallout({ nextEvent }: JournalClubCalloutProps) {
  if (!nextEvent) return null;

  const date = new Date(nextEvent.date + "T00:00:00");
  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-muted)] dark:border-transparent dark:bg-[var(--color-navy-800)]"
    >
      {/* Decorative watermark */}
      <Image
        src={logos.markNeutral}
        alt=""
        aria-hidden="true"
        width={160}
        height={160}
        className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 select-none opacity-[0.04]"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: event info */}
          <div className="space-y-3">
            <p className="eyebrow text-[var(--color-accent)]">Next meeting</p>
            <h2
              className="font-display max-w-lg text-balance text-2xl font-semibold text-[var(--color-foreground)] dark:text-[var(--color-ink-100)] sm:text-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {nextEvent.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-lg font-semibold text-[var(--color-foreground)] dark:text-[var(--color-ink-100)]">
                {formatted}
              </span>
              <span className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                {nextEvent.format}
              </span>
              {nextEvent.recurrencePattern && (
                <span className="font-mono text-xs text-[var(--color-ink-400)]">
                  {nextEvent.recurrencePattern}
                </span>
              )}
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted-foreground)] dark:text-[var(--color-ink-400)]">
              {nextEvent.description}
            </p>
          </div>

          {/* Right: CTAs */}
          <JournalClubButtons event={nextEvent} />
        </div>
      </div>
    </div>
  );
}
