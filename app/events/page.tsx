import type { Metadata } from "next";
import { events, journalClubIntakeHref, journalClubSessions, nextJournalClub } from "@/lib/events";
import { allNews, CATEGORY_LABELS } from "@/lib/news";
import { selectedTalks } from "@/lib/talks";
import { projects } from "@/lib/projects";
import { CompactEventList, type CompactEventItem } from "./compact-event-list";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "A-STAR News & Events - journal clubs, seminars, surgical AI talks, education, and lab updates.",
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

function toEventItem(event: (typeof events)[number]): CompactEventItem {
  return {
    id: `event-${event.slug}`,
    title: event.title,
    dateLabel: formatDateRange(event.date, event.endDate),
    sortDate: event.endDate ?? event.date,
    type: event.type === "journal-club" ? "Journal Club" : event.type.replace(/-/g, " "),
    accent:
      event.type === "journal-club"
        ? "journal"
        : event.type === "conference" || event.type === "workshop"
          ? "conference"
          : "default",
    shortDescription: event.description,
    description:
      event.time && event.time !== "TBD"
        ? `${event.description} Time: ${event.time}.`
        : event.description,
    projects: projectLabels(event.projects),
    links: event.externalUrl ? [{ label: "Learn more", href: event.externalUrl }] : undefined,
    cta:
      event.type === "journal-club"
        ? { label: "Join Journal Club", href: journalClubIntakeHref }
        : undefined,
  };
}

function toJournalClubItem(): CompactEventItem | null {
  const session = journalClubSessions[0];
  if (!session) return null;

  return {
    id: `journal-${session.slug}`,
    title: session.title,
    dateLabel: formatDate(session.date),
    sortDate: session.date,
    type: "Journal Club",
    accent: "journal",
    shortDescription:
      "Video-language models and synthetic data in surgery were discussed in the first A-STAR Journal Club.",
    description: `${session.description} Discussed topics included:`,
    topics: [...session.topics, `Next Journal Club: ${nextJournalClub.label}`],
    cta: { label: "Join Journal Club", href: nextJournalClub.href },
  };
}

function toNewsItem(item: (typeof allNews)[number]): CompactEventItem {
  return {
    id: `news-${item.slug}`,
    title: item.title,
    dateLabel: formatDate(item.date),
    sortDate: item.date,
    type: CATEGORY_LABELS[item.category],
    accent: "news",
    shortDescription: item.excerpt,
    description: item.excerpt,
    projects: projectLabels(item.projects),
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
    type: talk.type.replace(/-/g, " "),
    accent: "talk",
    shortDescription: `${talk.speaker} at ${talk.venue}.`,
    description: talk.description,
    projects: projectLabels(talk.projects),
    links: links.length ? links : undefined,
  };
}

export default function EventsPage() {
  const now = new Date();
  const upcomingDated = events
    .filter((event) => event.status === "upcoming" || new Date(`${event.date}T23:59:59`) >= now)
    .filter((event) => event.status !== "past")
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(toEventItem);

  const nextJournalClubItem: CompactEventItem = {
    id: "journal-next",
    title: "Next Journal Club",
    dateLabel: "TBD",
    type: "Journal Club",
    accent: "journal",
    shortDescription: "The next A-STAR Journal Club date is to be announced.",
    description:
      "The next A-STAR Journal Club date is TBD. Use the intake form to join the distribution list or propose a topic.",
    cta: { label: "Join Journal Club", href: journalClubIntakeHref },
  };

  const journalClubPast = toJournalClubItem();
  const pastEventRows = events
    .filter((event) => event.status === "past" && event.type !== "journal-club")
    .map(toEventItem);
  const talkRows = selectedTalks.map(toTalkItem);
  const newsRows = allNews
    .filter((item) => !item.title.toLowerCase().includes("journal club"))
    .map(toNewsItem);

  const past = [...(journalClubPast ? [journalClubPast] : []), ...pastEventRows, ...talkRows, ...newsRows].sort(
    (a, b) => (b.sortDate ?? "").localeCompare(a.sortDate ?? ""),
  );

  return (
    <main>
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
            className="heading-xl max-w-3xl text-white"
            style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)" }}
          >
            News &amp; Events.
          </h1>
          <p className="text-lead mt-6 max-w-2xl">
            Journal Club, surgical AI talks, education, conference activity, and lab updates —
            all in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CompactEventList upcoming={[...upcomingDated, nextJournalClubItem]} past={past} />
      </div>
    </main>
  );
}
