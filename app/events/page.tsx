import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ExternalLink, FolderOpen } from "lucide-react";
import { journalClubSessions, nextJournalClub, upcomingEvents, pastEvents } from "@/lib/events";
import { allNews } from "@/lib/news";
import { selectedTalks, type Talk } from "@/lib/talks";
import { JournalClubButtons } from "@/components/sections/journal-club-buttons";
import { NewsCard } from "@/components/news/news-card";
import { TalkCard } from "@/components/resources/talk-card";

export const metadata: Metadata = {
  title: "News & Events",
  description: "A-STAR News & Events - journal clubs, seminars, surgical AI talks, education, and lab updates.",
};

const DRIVE_URL = "https://drive.google.com/drive/folders/14j7C__2NIsRNPPbnrschwiKW7UKv7uOu";

function publicFileExists(src: string) {
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}

function EventCard({ event }: { event: (typeof upcomingEvents)[number] }) {
  const date = new Date(event.date + "T00:00:00");
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <div className="mb-4 flex flex-wrap items-start gap-3">
        <span className="rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
          {event.type.replace(/-/g, " ")}
        </span>
        <span className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
          {event.format}
        </span>
        {event.recurring && (
          <span className="font-mono text-[10px] text-[var(--color-muted-foreground)]">
            {event.recurrencePattern}
          </span>
        )}
      </div>
      <h2 className="font-display text-xl font-semibold tracking-normal">{event.title}</h2>
      <p className="mt-1 font-mono text-sm font-medium text-[var(--color-foreground)]">{formatted}</p>
      {event.time && event.time !== "TBD" && (
        <p className="mt-0.5 font-mono text-xs text-[var(--color-muted-foreground)]">{event.time}</p>
      )}
      {event.location && <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{event.location}</p>}
      <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        {event.description}
      </p>
      <div className="mt-6">
        <JournalClubButtons event={event} />
      </div>
    </article>
  );
}

function JournalClubSection() {
  const session = journalClubSessions[0];
  if (!session) return null;

  const date = new Date(session.date + "T00:00:00");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const hasImage = publicFileExists(session.imageSrc);

  return (
    <section id="journal-club" className="mb-16 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-72 border-b border-[var(--color-border)] bg-[var(--color-muted)] lg:border-b-0 lg:border-r">
          {hasImage ? (
            <Image
              src={session.imageSrc}
              alt="A-STAR Journal Club session"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          ) : (
            <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden p-8 text-center">
              <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
              <div className="absolute left-8 top-8 h-20 w-20 rounded-full border border-[var(--color-accent)]/25" aria-hidden="true" />
              <div className="absolute bottom-10 right-8 h-px w-40 bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent" aria-hidden="true" />
              <div className="relative z-10 max-w-sm">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  Image forthcoming
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  A-STAR Journal Club
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  Add the session image at public/events/journal-club-may20-2026.jpg.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <p className="eyebrow mb-3">Journal Club</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight">A-STAR Journal Club</h2>
          <article className="mt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
              {formattedDate}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{session.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {session.description} Discussed topics included:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted-foreground)]">
              {session.topics.map((topic) => (
                <li key={topic} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="mt-6 rounded-md border border-[var(--color-border)] bg-[var(--color-background)]/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
              Next Journal Club
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight">{nextJournalClub.label}</p>
          </div>

          <Link
            href={nextJournalClub.href}
            className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Join Journal Club
          </Link>
        </div>
      </div>
    </section>
  );
}

function GroupedTalks({ title, talks }: { title: string; talks: Talk[] }) {
  if (!talks.length) return null;
  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
      <div className="mb-5">
        <p className="eyebrow mb-2">Grouped program</p>
        <h3 className="font-display text-2xl font-semibold tracking-normal">{title}</h3>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {talks.map((talk) => (
          <TalkCard key={talk.slug} talk={talk} compact />
        ))}
      </div>
    </section>
  );
}

export default function EventsPage() {
  const oxfordTalks = selectedTalks.filter((talk) => talk.group === "oxford-2025");
  const asmbs2026Talks = selectedTalks.filter((talk) => talk.group === "asmbs-2026");
  const standaloneTalks = selectedTalks.filter((talk) => !talk.group);
  const visibleNews = allNews.filter(
    (item) =>
      item.slug !== "laplante-asmbs-ai-webinar-2025" &&
      !item.title.toLowerCase().includes("journal club"),
  );
  const visiblePastEvents = pastEvents.filter((event) => event.type !== "journal-club");

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-4">Lab calendar and updates</p>
          <h1 className="font-display max-w-3xl text-balance text-5xl font-semibold tracking-normal sm:text-6xl">
            News & Events.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
            Journal Club, invited talks, surgical AI education, conference activity, and lab updates in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {upcomingEvents.length > 0 && (
          <section id="upcoming" className="mb-16 scroll-mt-24">
            <p className="eyebrow mb-6">Upcoming events</p>
            <div className="grid gap-5 lg:grid-cols-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}

        <JournalClubSection />

        <section id="talks" className="mb-16">
          <div className="mb-8">
            <p className="eyebrow mb-3">Talks and education</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal">Selected AI talks, courses, and webinars.</h2>
          </div>
          <div className="space-y-6">
            <GroupedTalks title="Sixth IBC Oxford University World Congress 2025" talks={oxfordTalks} />
            <GroupedTalks title="ASMBS Annual Meeting 2026" talks={asmbs2026Talks} />
            <div className="grid gap-5 lg:grid-cols-2">
              {standaloneTalks.map((talk) => (
                <TalkCard key={talk.slug} talk={talk} />
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-card)] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10">
                <FolderOpen className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-normal">Shared archive</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  Selected presentations, videos, and shared materials are available through the A-STAR shared archive.
                </p>
              </div>
            </div>
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open archive
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        <section id="news" className="scroll-mt-24">
          <div className="mb-8">
            <p className="eyebrow mb-3">Lab updates</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal">News from A-STAR.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNews.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        {visiblePastEvents.length > 0 && (
          <section className="mt-16 border-t border-[var(--color-border)] pt-8">
            <p className="eyebrow mb-4">Past lab events</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePastEvents.map((event) => (
                <article key={event.slug} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5 opacity-80">
                  <h3 className="font-display text-lg font-semibold">{event.title}</h3>
                  <p className="mt-1 font-mono text-xs text-[var(--color-muted-foreground)]">{event.date}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
