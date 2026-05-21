import Image from "next/image";
import { Film, ImageIcon, PlayCircle } from "lucide-react";
import type { Project, ProjectMedia } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type ProjectMediaGridProps = {
  project: Project;
  compact?: boolean;
};

function mediaLabel(type: ProjectMedia["type"]) {
  if (type === "gif") return "GIF";
  if (type === "video") return "Video";
  if (type === "thumbnail") return "Thumbnail";
  if (type === "image") return "Image";
  return "Preview";
}

function MediaIcon({ type }: { type: ProjectMedia["type"] }) {
  const Icon =
    type === "video" ? PlayCircle : type === "image" || type === "thumbnail" ? ImageIcon : Film;
  return <Icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />;
}

export function ProjectMediaCard({ media, compact }: { media: ProjectMedia; compact?: boolean }) {
  const isRaster = media.type === "image" || media.type === "thumbnail" || media.type === "gif";
  const isVideo = media.type === "video";
  const hasSrc = Boolean(media.src);

  return (
    <figure className="card-glass group overflow-hidden rounded-lg">
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-white/[0.03]",
          compact ? "aspect-[16/10]" : "aspect-video",
          !hasSrc && "border border-dashed border-[var(--color-accent)]/35",
        )}
      >
        {hasSrc && isRaster && media.src ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            unoptimized={media.type === "gif"}
            sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 640px"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : hasSrc && isVideo && media.src ? (
          <video
            src={media.src}
            poster={media.poster}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label={media.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="bg-grid absolute inset-0 opacity-25" aria-hidden="true" />
            <div
              className="absolute top-5 left-5 h-12 w-12 rounded-full border border-[var(--color-accent)]/25"
              aria-hidden="true"
            />
            <div
              className="absolute right-5 bottom-6 h-px w-28 bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 flex max-w-56 flex-col items-center gap-3 px-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                <MediaIcon type={media.type} />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[var(--color-accent)] uppercase">
                {mediaLabel(media.type)}
              </span>
              <span className="text-sm leading-snug font-medium text-white/60">
                {media.caption ?? "Project media forthcoming"}
              </span>
            </div>
          </>
        )}
      </div>
      {(media.caption || hasSrc) && (
        <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-white/60">
          {media.caption ?? media.alt}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Project media assets should be placed in public/projects/media/.
 * This grid is intentionally tolerant of placeholder entries and missing src values.
 */
export function ProjectMediaGrid({ project, compact = false }: ProjectMediaGridProps) {
  const media = project.media ?? [];
  if (media.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-4",
        compact ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {media.map((item, index) => (
        <ProjectMediaCard
          key={`${project.slug}-${item.type}-${index}`}
          media={item}
          compact={compact}
        />
      ))}
    </div>
  );
}
