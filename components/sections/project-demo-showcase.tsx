import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectMediaGrid } from "@/components/lab/project-media";

export function ProjectDemoShowcase() {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-3">Project demos</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Media slots ready for GIFs, videos, and model output previews.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Each project can carry optimized GIFs, MP4/WebM demos, posters, or thumbnail cards as soon as assets are ready.
          </p>
        </div>
        <Link href="/research" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline">
          Open Projects
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-8">
        {projects.map((project) => (
          <section key={project.slug} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{project.name}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{project.longName}</p>
              </div>
              <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-[var(--color-accent)] hover:underline">
                Project page
              </Link>
            </div>
            <ProjectMediaGrid project={project} compact />
          </section>
        ))}
      </div>
    </div>
  );
}
