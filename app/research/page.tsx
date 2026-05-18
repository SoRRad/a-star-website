import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { PublicationDashboard } from "@/components/publications/publication-dashboard";
import { ProjectCard } from "@/components/lab/project-card";
import { SurgicalJourneyMap } from "@/components/research/surgical-journey-map";
import { ModelCard } from "@/components/research/model-card";

export const metadata = {
  title: "Projects",
  description: "A-STAR publications, active projects, and surgical AI focus areas.",
};

export default function ResearchPage() {
  return (
    <>
      <Suspense fallback={<div className="py-32 text-center text-[var(--color-muted-foreground)]">Loading...</div>}>
        <PublicationDashboard
          publications={publications}
          eyebrow="Research portfolio"
          title="Projects dashboard"
          description="Explore A-STAR publications first, then follow the active systems and surgical AI directions that organize the lab's work."
          exportBaseName="astar-research-publications"
        />
      </Suspense>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SurgicalJourneyMap phases={phases} projects={projects} publications={publications} />
        </div>

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">Active projects</p>
            <h2
              className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Systems moving toward clinical use.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
              Project pages connect the evidence base above to the decision support, education, and validation tools currently under development.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
          >
            View project index
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Model cards</p>
          <h2
            className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tool-level intended use and readiness.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
            These cards summarize what each A-STAR system is for, what it accepts and returns, and where validation stands without overstating unfinished claims.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ModelCard key={project.slug} project={project} publications={publications} compact />
          ))}
        </div>
      </section>
    </>
  );
}
