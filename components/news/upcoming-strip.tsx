import Link from "next/link";
import type { LabEvent } from "@/lib/events";
import { CalendarTearoff } from "./calendar-tearoff";
import { JournalClubButtons } from "@/components/sections/journal-club-buttons";

interface UpcomingStripProps {
  events: LabEvent[];
}

const FORMAT_LABELS: Record<string, string> = {
  "in-person": "In-person",
  virtual: "Virtual",
  hybrid: "Hybrid",
};

export function UpcomingStrip({ events }: UpcomingStripProps) {
  if (events.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[var(--color-border)] pt-12">
      <p className="eyebrow mb-8">Upcoming</p>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.slug}
            className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:flex-row sm:items-start"
          >
            {/* Calendar tearoff */}
            <CalendarTearoff date={event.date} endDate={event.endDate} />

            {/* Middle: info */}
            <div className="flex-1 min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  {event.type.replace(/-/g, " ")}
                </span>
                <span className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {FORMAT_LABELS[event.format] ?? event.format}
                </span>
                {event.recurring && event.recurrencePattern && (
                  <span className="font-mono text-[10px] text-[var(--color-muted-foreground)]">
                    {event.recurrencePattern}
                  </span>
                )}
              </div>
              <h3 className="font-display text-base font-semibold tracking-normal">{event.title}</h3>
              {event.location && (
                <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{event.location}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)] line-clamp-2">
                {event.description}
              </p>
            </div>

            {/* Right: actions */}
            <div className="shrink-0">
              <JournalClubButtons event={event} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-[var(--color-muted-foreground)]">
        <Link href="/events" className="text-[var(--color-accent)] hover:underline">
          View full events calendar →
        </Link>
      </p>
    </section>
  );
}
