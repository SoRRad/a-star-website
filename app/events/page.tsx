import type { Metadata } from "next";
import { events, journalClubIntakeHref } from "@/lib/events";
import { allNews, CATEGORY_LABELS, getNewsImages } from "@/lib/news";
import { selectedTalks } from "@/lib/talks";
import { projects } from "@/lib/projects";
import { CompactEventList, type CompactEventItem } from "./compact-event-list";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "A-STAR News & Events - journal clubs, seminars, surgical AI talks, education, and lab updates.",
  alternates: { canonical: "/events" },
  openGraph: { url: "/events" },
};

const projectNames = new Map(projects.map((project) => [project.slug, project.name]));

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateRange(date: string, endDate?: string) {
  if (!endDate || endDate === date) return formatDate(date);

  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString("en-US", { month: "long" })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${formatDate(date)} - ${formatDate(endDate)}`;
}

function projectLabels(slugs?: string[]) {
  return slugs?.map((slug) => projectNames.get(slug) ?? slug.toUpperCase()).filter(Boolean);
}

function eventTypeLabel(type: (typeof events)[number]["type"]) {
  const labels: Record<(typeof events)[number]["type"], string> = {
    "journal-club": "Journal Club",
    seminar: "Seminar",
    conference: "Conference / Summit",
    workshop: "Workshop",
    course: "Course",
    talk: "Talk",
  };

  return labels[type];
}

function talkTypeLabel(type: (typeof selectedTalks)[number]["type"]) {
  const labels: Record<(typeof selectedTalks)[number]["type"], string> = {
    webinar: "Webinar",
    "invited-lecture": "Invited lecture",
    course: "Course",
    "conference-talk": "Conference talk",
    "session-chair": "Session chair",
    moderator: "Moderator",
    "session-director": "Session director",
  };

  return labels[type];
}

function toEventItem(event: (typeof events)[number]): CompactEventItem {
  return {
    id: `event-${event.slug}`,
    title: event.title,
    dateLabel: formatDateRange(event.date, event.endDate),
    sortDate: event.endDate ?? event.date,
    type: eventTypeLabel(event.type),
    accent:
      event.type === "journal-club"
        ? "journal"
        : event.type === "conference"
          ? "conference"
          : event.type === "talk" || event.type === "course" || event.type === "workshop"
            ? "talk"
          : "default",
    shortDescription: event.summary,
    description: event.details,
    tags: event.tags,
    projects: projectLabels(event.projects),
    links: event.externalUrl ? [{ label: "Learn more", href: event.externalUrl }] : undefined,
    cta:
      event.type === "journal-club"
        ? { label: "Join Journal Club", href: journalClubIntakeHref }
        : undefined,
  };
}

function toNewsItem(item: (typeof allNews)[number]): CompactEventItem {
  return {
    id: `news-${item.slug}`,
    title: item.title,
    dateLabel: formatDate(item.date),
    sortDate: item.date,
    type: CATEGORY_LABELS[item.category],
    accent: item.category === "conference" ? "conference" : "news",
    shortDescription: item.summary,
    description: item.details,
    tags: item.tags,
    projects: projectLabels(item.projects),
    images: item.slug === "astar-ai-summit-2026" ? getNewsImages(item) : undefined,
    links: [
      { label: "Read update", href: `/news/${item.slug}` },
      ...(item.externalLink ? [{ label: "External resource", href: item.externalLink }] : []),
      ...(item.relatedLinks ?? []).map((link) => ({ label: link.label, href: link.url })),
    ],
  };
}

function toTalkItem(talk: (typeof selectedTalks)[number]): CompactEventItem {
  const links = [
    ...(talk.url ? [{ label: "Resource", href: talk.url }] : []),
    ...(talk.videoUrl ? [{ label: "Video", href: talk.videoUrl }] : []),
  ];

  return {
    id: `talk-${talk.slug}`,
    title: talk.title,
    dateLabel: talk.displayDate,
    sortDate: talk.date,
    type: talkTypeLabel(talk.type),
    accent: "talk",
    shortDescription: talk.summary ?? `${talk.speaker} at ${talk.venue}.`,
    description: talk.details ?? talk.description,
    tags: talk.tags,
    projects: projectLabels(talk.projects),
    links: links.length ? links : undefined,
  };
}

export default function EventsPage() {
  const upcomingDated = events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(toEventItem);
  const pastEventRows = events
    .filter((event) => event.status === "past")
    .map(toEventItem);
  const talkRows = selectedTalks.map(toTalkItem);
  const newsRows = allNews
    .filter((item) => item.displayInTimeline !== false)
    .map(toNewsItem);

  const past = [...pastEventRows, ...talkRows, ...newsRows].sort(
    (a, b) => (b.sortDate ?? "").localeCompare(a.sortDate ?? ""),
  );

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30,136,229,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="eyebrow mb-5">Lab calendar and updates</p>
          <h1
            className="heading-xl max-w-3xl"
            style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)" }}
          >
            <span style={{ fontWeight: 800, letterSpacing: "-0.045em" }}>News</span>
            {" "}
            <span style={{ fontWeight: 300, letterSpacing: "-0.01em", color: "rgb(255 255 255 / 0.6)" }}>
              &amp; Events.
            </span>
          </h1>
          <p className="text-lead mt-6 max-w-2xl">
            Journal Club, surgical AI talks, education, conference activity, and lab updates:
            all in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CompactEventList upcoming={upcomingDated} past={past} />
      </div>
    </div>
  );
}
