import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { Talk } from "@/lib/talks";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<Talk["type"], string> = {
  webinar: "Webinar",
  "invited-lecture": "Invited lecture",
  course: "Course",
  "conference-talk": "Conference talk",
  "session-chair": "Session chair",
  moderator: "Moderator",
  "session-director": "Session director",
};

const STATUS_LABELS: Record<Talk["status"], string> = {
  completed: "Completed",
  upcoming: "Upcoming",
  "metadata-to-confirm": "Metadata to confirm",
};

const STATUS_STYLES: Record<Talk["status"], string> = {
  completed: "border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-400",
  upcoming: "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  "metadata-to-confirm": "border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
};

export function TalkCard({ talk, compact = false }: { talk: Talk; compact?: boolean }) {
  const dateLabel = talk.displayDate;
  const href = talk.videoUrl ?? talk.url;

  return (
    <article className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40">
      <div className="pointer-events-none absolute right-4 top-4 h-14 w-24 opacity-20" aria-hidden="true">
        <svg viewBox="0 0 120 64" className="h-full w-full">
          <path d="M8 48 C32 10 68 18 112 8" fill="none" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 7" />
          <circle cx="8" cy="48" r="2" fill="var(--color-accent)" />
          <circle cx="54" cy="22" r="2" fill="var(--color-accent)" />
          <circle cx="112" cy="8" r="2" fill="var(--color-accent)" />
        </svg>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
          {TYPE_LABELS[talk.type]}
        </span>
        <span className={cn("rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest", STATUS_STYLES[talk.status])}>
          {STATUS_LABELS[talk.status]}
        </span>
      </div>

      <h3 className={cn("font-display font-semibold tracking-tight text-[var(--color-foreground)]", compact ? "text-base" : "text-lg")}>
        {talk.title}
      </h3>
      <p className="mt-2 text-sm font-medium text-[var(--color-accent)]">{talk.speaker}</p>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
        {talk.venue}
        {talk.location ? ` / ${talk.location}` : ""}
      </p>

      <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">
        <CalendarDays className="h-3.5 w-3.5" />
        {dateLabel}
      </div>

      <p className={cn("mt-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]", compact ? "line-clamp-3" : "")}>
        {talk.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {talk.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/50 px-2 py-0.5 text-[11px] text-[var(--color-muted-foreground)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {href && (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          {talk.status === "completed" ? "Watch / View resource" : "View resource"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </article>
  );
}
