"use client";

import { ArrowRight, Calendar, MapPin, Users, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import type { LabEvent } from "@/lib/events";

const EVENT_TYPE_LABELS: Record<string, string> = {
  "journal-club": "Journal Club",
  seminar: "Seminar",
  conference: "Conference",
  workshop: "Workshop",
  talk: "Talk",
};

const FORMAT_ICONS = {
  "in-person": MapPin,
  virtual: Video,
  hybrid: Users,
} as const;

function formatEventDate(date: string, endDate?: string) {
  const start = new Date(`${date}T00:00:00`);
  const full: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };

  if (!endDate) return start.toLocaleDateString("en-US", full);

  const end = new Date(`${endDate}T00:00:00`);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString("en-US", { month: "long" })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${start.toLocaleDateString("en-US", full)} - ${end.toLocaleDateString("en-US", full)}`;
}

function EventCard({ event }: { event: LabEvent }) {
  const FormatIcon = FORMAT_ICONS[event.format];

  return (
    <div className="card-glass group rounded-xl p-5 transition-all hover:-translate-y-0.5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-white/50 uppercase">
          {EVENT_TYPE_LABELS[event.type] ?? event.type}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-white/60">
          <FormatIcon className="h-3 w-3" />
          {event.format}
        </span>
      </div>

      <h3 className="font-display mb-1.5 line-clamp-2 text-sm leading-snug font-semibold tracking-normal text-white transition-colors group-hover:text-[#64B5F6]">
        {event.title}
      </h3>

      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-white/70">
        {event.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
        {event.location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 shrink-0" />
            {event.location}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3 shrink-0" />
          {formatEventDate(event.date, event.endDate)}
          {event.time && event.time !== "TBD" ? ` · ${event.time}` : ""}
        </span>
      </div>

      {event.externalUrl && (
        <a
          href={event.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#64B5F6] hover:text-[#64B5F6]"
          onClick={(e) => e.stopPropagation()}
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

export function EventsSection({ events }: { events: LabEvent[] }) {
  if (events.length === 0) return null;

  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">Upcoming events</p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <Reveal key={event.slug} delay={0.05}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>

      <ExploreMore href="/events">See all events →</ExploreMore>
    </>
  );
}
