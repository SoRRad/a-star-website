"use client";

import Link from "next/link";
import { Calendar, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadIcs } from "@/lib/calendar";
import type { LabEvent } from "@/lib/events";

export function JournalClubButtons({ event }: { event: LabEvent }) {
  const hasRealDate = /^\d{4}-\d{2}-\d{2}$/.test(event.date);
  const rsvpHref =
    event.type === "journal-club"
      ? "/contact#journal-club"
      : event.rsvpEmail
        ? `mailto:${event.rsvpEmail}?subject=${encodeURIComponent("A-STAR Lab RSVP")}`
        : `/contact?inquiry=journal-club&event=${event.slug}`;

  return (
    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
      {hasRealDate && (
        <Button
          variant="outline"
          onClick={() => downloadIcs(event)}
          className="gap-2 border-[var(--color-ink-600)] text-[var(--color-ink-100)] hover:border-[var(--color-ink-400)] hover:bg-[var(--color-navy-700)]"
        >
          <Calendar className="h-4 w-4" />
          Add to calendar
        </Button>
      )}
      {event.rsvpRequired && (
        <Button asChild variant="accent">
          {rsvpHref.startsWith("mailto:") ? (
            <a href={rsvpHref}>
              <UserPlus className="h-4 w-4" />
              Join / RSVP
            </a>
          ) : (
            <Link href={rsvpHref}>
              <UserPlus className="h-4 w-4" />
              Open intake form
            </Link>
          )}
        </Button>
      )}
    </div>
  );
}
