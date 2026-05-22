import { Brain, Crosshair, DatabaseZap, Layers3, Network } from "lucide-react";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { ProjectCard } from "@/components/lab/project-card";
import { SurgicalJourneyMap } from "@/components/research/surgical-journey-map";

export const metadata = {
  title: "Projects",
  description: "A-STAR active surgical AI projects, systems, and translational focus areas.",
};

const researchDirections = [
  {
    icon: Layers3,
    title: "Surgical Segmentation",
    text: "Computer vision for anatomy, workflow, and procedure understanding across laparoscopic and robotic surgery.",
  },
  {
    icon: Crosshair,
    title: "Dissection Zone Recognition",
    text: "Go and No-Go safety-zone modeling for surgical coaching, intraoperative review, and decision-support research.",
  },
  {
    icon: Brain,
    title: "Generative Surgical AI",
    text: "Multimodal and generative systems for simulation, education, workflow synthesis, and surgical intelligence.",
  },
  {
    icon: DatabaseZap,
    title: "External Validation",
    text: "Prospective and multi-site validation so model claims stay measurable, bounded, and clinically honest.",
  },
  {
    icon: Network,
    title: "Clinical Ecosystem Integration",
    text: "Collaboration with surgeons, trainees, engineers, and clinical platforms to fit tools into real workflows.",
  },
];

export default function ResearchPage() {
  const activeProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-4">Projects</p>
          <h1 className="font-display max-w-3xl text-balance text-5xl font-semibold tracking-normal sm:text-6xl">
            Surgical AI systems across the full surgical journey.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
            A-STAR organizes active systems around practical clinical questions, model-card
            discipline, and staged validation across planning, guidance, education, and outcomes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SurgicalJourneyMap phases={phases} projects={activeProjects} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Research directions</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Focus areas for a growing surgical AI lab.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {researchDirections.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-normal">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Active projects / systems</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Specific systems with intended use, validation state, and readiness.
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {activeProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
