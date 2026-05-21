import Image from "next/image";
import { Film, ImageIcon, PlayCircle } from "lucide-react";
import type { Project, ProjectMedia } from "@/lib/projects";
import { cn } from "@/lib/utils";

function mediaIcon(type: ProjectMedia["type"]) {
  if (type === "video") return PlayCircle;
  if (type === "image" || type === "thumbnail") return ImageIcon;
  return Film;
}

export function ProjectMediaCard({
  media,
  compact = false,
}: {
  media: ProjectMedia;
  compact?: boolean;
}) {
  const Icon = mediaIcon(media.type);
  const hasImage = Boolean(media.src) && (media.type === "image" || media.type === "gif" || media.type === "thumbnail");
  const hasVideo = Boolean(media.src) && media.type === "video";

  return (
    <figure className="group overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className={cn("relative flex items-center justify-center overflow-hidden bg-[var(--color-muted)]", compact ? "aspect-[16/9]" : "aspect-video")}>
        {hasImage && media.src ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 640px"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : hasVideo && media.src ? (
          <video
            src={media.src}
            poster={media.poster}
            muted
            playsInline
            preload="metadata"
            controls
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-25" />
            <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-[var(--color-accent)]/30" />
            <div className="absolute bottom-7 right-6 h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent" />
          </div>
        )}

        {!media.src && (
          <div className="relative z-10 flex flex-col items-center gap-3 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
              <Icon className="h-5 w-5 text-[var(--color-accent)]" />
            </span>
            <span className="max-w-44 text-sm font-medium text-[var(--color-muted-foreground)]">
              {media.caption ?? "Media forthcoming"}
            </span>
          </div>
        )}
      </div>
      {media.caption && media.src && (
        <figcaption className="border-t border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-muted-foreground)]">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ProjectMediaGrid({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const media = project.media ?? [];
  if (!media.length) return null;

  return (
    <div className={cn("grid gap-4", compact ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3")}>
      {media.map((item, index) => (
        <ProjectMediaCard key={`${project.slug}-${item.type}-${index}`} media={item} compact={compact} />
      ))}
    </div>
  );
}
