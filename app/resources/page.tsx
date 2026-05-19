import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  FileText,
  FolderOpen,
  Globe,
  Lock,
  Presentation,
  Shapes,
  Users,
  Video,
} from "lucide-react";
import {
  archiveItems,
  ARCHIVE_CATEGORY_LABELS,
  ARCHIVE_ACCESS_LABELS,
  type ArchiveItem,
} from "@/lib/archive";
import { selectedTalks } from "@/lib/talks";
import { Reveal } from "@/components/motion/reveal";
import { TalkCard } from "@/components/resources/talk-card";

export const metadata: Metadata = {
  title: "Resources",
  description: "A-STAR glossary, posters, code, datasets, journal club materials, and recordings.",
};

const HUB_SECTIONS = [
  {
    title: "Glossary",
    description: "A surgical AI reference for terms used across A-STAR projects and publications.",
    href: "/resources/glossary",
    icon: Shapes,
    status: "Available",
  },
  {
    title: "Posters and presentations",
    description: "Conference posters, accepted abstracts, and slide-based teaching materials.",
    href: "#posters",
    icon: Presentation,
    status: "Growing",
  },
  {
    title: "Code/tools",
    description: "Open-source tools, public calculators, and reproducible project utilities.",
    href: "#code-tools",
    icon: Code2,
    status: "Coming soon",
  },
  {
    title: "Datasets",
    description: "Dataset documentation and collaboration pathways where sharing is permitted.",
    href: "#datasets",
    icon: Database,
    status: "Coming soon",
  },
  {
    title: "Journal Club",
    description: "Discussion materials and selected reading lists for surgical AI journal club.",
    href: "#journal-club",
    icon: Users,
    status: "Mayo only",
  },
  {
    title: "Recordings/webinars",
    description: "Recorded lectures and webinars when release permissions allow access.",
    href: "#recordings",
    icon: Video,
    status: "Limited",
  },
  {
    title: "AI talks & education",
    description: "Selected AI lectures, webinars, courses, and planned educational contributions.",
    href: "#talks",
    icon: Presentation,
    status: "Updated",
  },
  {
    title: "Shared archive",
    description: "Selected presentations, videos, and shared resources from A-STAR are available through the lab's Google Drive archive.",
    href: "https://drive.google.com/drive/folders/14j7C__2NIsRNPPbnrschwiKW7UKv7uOu",
    icon: FolderOpen,
    status: "Available",
  },
];

const ACCESS_ICONS = {
  public: Globe,
  "mayo-only": Lock,
  restricted: Lock,
} as const;

const ACCESS_STYLES = {
  public: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "mayo-only": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  restricted: "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
} as const;

function ResourceCard({ item }: { item: ArchiveItem }) {
  const AccessIcon = ACCESS_ICONS[item.access];
  const date = new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const href = item.externalReference ?? item.fileUrl ?? item.videoUrl;
  const canOpen = Boolean(href) && item.access === "public";

  return (
    <article className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40">
      <div className="pointer-events-none absolute right-4 top-4 h-16 w-24 opacity-20" aria-hidden="true">
        <svg viewBox="0 0 120 80" className="h-full w-full">
          <path d="M10 60 C35 18 72 18 110 12" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.45" />
          <circle cx="10" cy="60" r="2" fill="var(--color-accent)" />
          <circle cx="52" cy="28" r="2" fill="var(--color-accent)" />
          <circle cx="110" cy="12" r="2" fill="var(--color-accent)" />
        </svg>
      </div>
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
          {ARCHIVE_CATEGORY_LABELS[item.category]}
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${ACCESS_STYLES[item.access]}`}>
          <AccessIcon className="h-2.5 w-2.5" />
          {ARCHIVE_ACCESS_LABELS[item.access]}
        </span>
      </div>

      <h3 className="font-display text-base font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        {item.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-[var(--color-muted-foreground)]">
          {date}
          {item.duration ? ` / ${item.duration}` : ""}
        </p>
        {canOpen ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            Open
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-xs text-[var(--color-muted-foreground)]">
            {item.access === "mayo-only" ? "Mayo employees only" : "Coming soon"}
          </span>
        )}
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  const posters = archiveItems.filter((item) => item.category === "presentation");
  const journalClub = archiveItems.filter((item) => item.category === "journal-club");
  const recordings = archiveItems.filter((item) => item.category === "video" || item.category === "webinar");
  const remaining = archiveItems.filter(
    (item) => !posters.includes(item) && !journalClub.includes(item) && !recordings.includes(item),
  );

  return (
    <main>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4">Resources</p>
            <h1 className="font-display max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              A practical hub for surgical AI materials.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
              Glossary entries, posters, journal club materials, recordings, and future code or dataset releases from the A-STAR research portfolio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB_SECTIONS.map(({ title, description, href, icon: Icon, status }) => {
            const isExternal = href.startsWith("http");
            const cardClass =
              "group relative flex h-full min-h-40 flex-col justify-between overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40";
            const cardInner = (
              <>
                <div className="pointer-events-none absolute inset-x-8 top-7 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/25 to-transparent" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]">
                    <Icon className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    {status}
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {description}
                  </p>
                </div>
              </>
            );
            return (
              <Reveal key={title} delay={0.03}>
                {isExternal ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {cardInner}
                  </a>
                ) : (
                  <Link href={href} className={cardClass}>
                    {cardInner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Shared archive CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-card)] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10">
                <FolderOpen className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Shared archive</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  Selected presentations, videos, and shared resources are available through the A-STAR shared archive on Google Drive.
                </p>
              </div>
            </div>
            <a
              href="https://drive.google.com/drive/folders/14j7C__2NIsRNPPbnrschwiKW7UKv7uOu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open archive
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <ResourceSection id="posters" title="Posters and presentations" items={posters} />

      <section id="talks" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="eyebrow mb-2">Education</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Selected AI talks &amp; education
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Verified recordings appear first, followed by planned courses and clearly marked placeholders awaiting exact dates, titles, and media.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {selectedTalks.map((talk) => (
            <Reveal key={talk.slug} delay={0.03}>
              <TalkCard talk={talk} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="code-tools" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ComingSoonBand
          icon={Code2}
          title="Code/tools"
          description="Public repositories and validated tool documentation will be linked here when each project is ready for release."
          href="/projects"
          cta="View active tools"
        />
      </section>

      <section id="datasets" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ComingSoonBand
          icon={Database}
          title="Datasets"
          description="Dataset documentation will appear only when access, governance, and IRB constraints allow responsible sharing."
          href="/join#project-intake"
          cta="Start a collaboration"
        />
      </section>

      <ResourceSection id="journal-club" title="Journal Club" items={journalClub} />
      <ResourceSection id="recordings" title="Recordings and webinars" items={recordings} />
      <ResourceSection id="materials" title="Additional materials" items={remaining} />
    </main>
  );
}

function ResourceSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: ArchiveItem[];
}) {
  if (!items.length) return null;

  return (
    <section id={id} className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Resource library</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        <FileText className="hidden h-5 w-5 text-[var(--color-accent)] sm:block" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Reveal key={item.slug} delay={0.03}>
            <ResourceCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ComingSoonBand({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]">
            <Icon className="h-5 w-5 text-[var(--color-accent)]" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {description}
            </p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
