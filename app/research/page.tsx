import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { ProjectCard } from "@/components/lab/project-card";
import { ProjectMediaGrid } from "@/components/lab/project-media";
import { SurgicalJourneyMap } from "@/components/research/surgical-journey-map";
import { ModelCard } from "@/components/research/model-card";
import { AiMeshBackground } from "@/components/motion/ai-mesh-background";

export const metadata = {
  title: "Projects",
  description: "A-STAR active surgical AI projects, model cards, demos, and translational focus areas.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
        <AiMeshBackground />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-4">Projects</p>
          <h1 className="font-display max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
            Surgical AI systems, model cards, and validation paths.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
            A-STAR organizes research around clinical questions across planning, intraoperative guidance, education, and validation. Individual project pages hold linked publications, demos, and project-specific status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SurgicalJourneyMap phases={phases} projects={projects} publications={publications} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Active projects</p>
          <h2 className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Project pages built around clinical use, evidence, and demos.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
            Cards link directly to individual project detail pages. Demo media slots are preserved so GIFs, videos, and thumbnails can be added without changing the page structure.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Systems and model cards</p>
          <h2 className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Intended use, inputs, outputs, and validation state in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
            Each system card combines readiness, intended use, output type, linked publications, and a media preview so projects are not repeated across separate sections.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug} className="flex flex-col gap-4">
              <ModelCard project={project} publications={publications} compact />
              <ProjectMediaGrid project={project} compact />
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Open {project.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
