import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectMediaGrid } from "@/components/lab/project-media";

export function ProjectDemoShowcase() {
  const showcasedProjects = projects
    .filter((project) => project.featured || (project.media?.length ?? 0) > 0)
    .slice(0, 3);

  if (showcasedProjects.length === 0) return null;

  return (
    <div>
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-4">Project demos</p>
          <h2
            className="heading-xl text-balance text-white"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
          >
            Systems in motion.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
            Demo slots, thumbnails, and model-output previews for A-STAR systems as they mature.
          </p>
        </div>
        <Link
          href="/research"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
        >
          Open Projects
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {showcasedProjects.map((project) => (
          <article
            key={project.slug}
            className="card-glass card-glow group rounded-xl p-5 transition-all hover:-translate-y-1"
          >
            <div className="mb-4">
              <h3 className="heading-lg text-xl text-white">{project.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-white/50">{project.longName}</p>
            </div>
            <ProjectMediaGrid project={{ ...project, media: project.media?.slice(0, 1) }} compact />
            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
            >
              View project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
