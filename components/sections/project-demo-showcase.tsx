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
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-3">Project demos</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Project demos and previews.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Add GIFs, thumbnails, and model-output previews as A-STAR systems mature.
          </p>
        </div>
        <Link href="/research" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline">
          Open Projects
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {showcasedProjects.map((project) => (
          <article key={project.slug} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4">
              <h3 className="font-display text-xl font-semibold tracking-tight">{project.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--color-muted-foreground)]">
                {project.longName}
              </p>
            </div>
            <ProjectMediaGrid project={{ ...project, media: project.media?.slice(0, 1) }} compact />
            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              View project
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
