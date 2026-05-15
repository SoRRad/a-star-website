import Link from "next/link";
import {
  FileText,
  PlayCircle,
  Headphones,
  Users,
  Download,
  ExternalLink,
  Lock,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import {
  ARCHIVE_CATEGORY_LABELS,
  ARCHIVE_ACCESS_LABELS,
  type ArchiveItem,
  type ArchiveCategory,
} from "@/lib/archive";

const CATEGORY_ICONS: Record<ArchiveCategory, React.ElementType> = {
  presentation: FileText,
  video: PlayCircle,
  webinar: Headphones,
  "journal-club": Users,
  document: FileText,
};

const CATEGORY_COLORS: Record<ArchiveCategory, string> = {
  presentation: "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  video: "border-purple-400/40 bg-purple-400/10 text-purple-700 dark:text-purple-400",
  webinar: "border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-400",
  "journal-club": "border-blue-400/40 bg-blue-400/10 text-blue-700 dark:text-blue-300",
  document: "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
};

interface ArchiveCardProps {
  item: ArchiveItem;
}

export function ArchiveCard({ item }: ArchiveCardProps) {
  const Icon = CATEGORY_ICONS[item.category];

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md">
      {/* Category color strip + icon */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
            CATEGORY_COLORS[item.category],
          )}
        >
          <Icon className="h-3 w-3" />
          {ARCHIVE_CATEGORY_LABELS[item.category]}
        </span>
        {item.duration && (
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-[var(--color-muted-foreground)]">
            <Clock className="h-3 w-3" />
            {item.duration}
          </span>
        )}
        {item.access !== "public" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px]",
              item.access === "mayo-only"
                ? "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-400"
                : "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
            )}
          >
            <Lock className="h-2.5 w-2.5" />
            {ARCHIVE_ACCESS_LABELS[item.access]}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <time className="mb-1 font-mono text-[10px] text-[var(--color-muted-foreground)]">
          {formatDate(item.date)}
        </time>
        <h3 className="mb-2 font-display text-sm font-semibold leading-snug tracking-tight text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)] line-clamp-2">
          {item.title}
        </h3>
        <p className="mb-4 flex-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
          {item.description}
        </p>

        {/* Action */}
        <ArchiveAction item={item} />
      </div>
    </div>
  );
}

function ArchiveAction({ item }: { item: ArchiveItem }) {
  if (item.access === "mayo-only") {
    return (
      <Link
        href={`/contact?inquiry=archive-access&item=${item.slug}`}
        className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
      >
        <Lock className="h-3 w-3" />
        Mayo employees — contact for access
      </Link>
    );
  }

  if (item.fileUrl) {
    return (
      <a
        href={item.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:underline"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </a>
    );
  }

  if (item.videoUrl) {
    return (
      <a
        href={item.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:underline"
      >
        <PlayCircle className="h-3.5 w-3.5" />
        Watch
      </a>
    );
  }

  if (item.externalReference) {
    return (
      <a
        href={item.externalReference}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:underline"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        View source
      </a>
    );
  }

  return (
    <span className="text-xs text-[var(--color-muted-foreground)]">
      File coming soon
    </span>
  );
}
