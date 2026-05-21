import Link from "next/link";
import { ArrowRight, Brain, Crosshair, DatabaseZap, Layers3, Network } from "lucide-react";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { ProjectCard } from "@/components/lab/project-card";
import { ProjectMediaGrid } from "@/components/lab/project-media";
import { SurgicalJourneyMap } from "@/components/research/surgical-journey-map";
import { ModelCard } from "@/components/research/model-card";

export const metadata = {
  title: "Projects",
  description: "A-STAR active surgical AI projects, model cards, demos, and translational focus areas.",
};

const platformVision = [
  {
    title: "Preoperative",
    text: "We advance surgical computer vision through projects such as semantic segmentation of abdominal CT scans, multimodal integration for personalized surgical plans, bedside 3D reconstruction, and augmented reality.",
  },
  {
    title: "Intraoperative",
    text: "We study anatomy segmentation, Go/No-Go zone creation, tool-tissue interaction mapping, and gesture mapping to support coaching and safety, with eventual robotic platform integration after appropriate validation.",
  },
  {
    title: "Postoperative",
    text: "We develop approaches that predict postoperative trajectories to identify early complications or disease recurrence using multimodal data, AI agents, and digital twins.",
  },
  {
    title: "External validation",
    text: "We collaborate with other groups to perform external validation at Mayo Clinic, focusing on solutions that may enhance the surgical journey for surgeons, trainees, and patients.",
  },
];

const researchDirections = [
  {
    icon: Layers3,
    title: "Surgical Segmentation",
    text: "Our research lab advances surgical computer vision through projects such as semantic segmentation of laparoscopic and robotic procedures. We aim to develop techniques that improve surgical precision, workflow understanding, and procedural analysis.",
  },
  {
    icon: Crosshair,
    title: "Identification of Dissection Zones",
    text: "We study Go and No-Go dissection zones across surgical procedures to support intraoperative decision-making, surgical coaching, and postoperative performance assessment.",
  },
  {
    icon: Brain,
    title: "Innovative Generative AI Applications",
    text: "A-STAR explores generative AI applications in surgery, including surgical simulation, education, workflow synthesis, and multimodal surgical intelligence.",
  },
  {
    icon: DatabaseZap,
    title: "External Validation of Computer Vision Projects",
    text: "We collaborate with other groups to perform external validation of surgical computer vision models at Mayo Clinic. Our goal is to rigorously evaluate AI tools before broader clinical translation.",
  },
  {
    icon: Network,
    title: "Collaborative Ecosystem Integration",
    text: "A-STAR is designed to integrate with surgical ecosystems, aligning AI innovation with clinical needs, workflow realities, and the advancement of surgical practice.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-4">Projects</p>
          <h1 className="font-display max-w-3xl text-balance text-5xl font-semibold tracking-normal sm:text-6xl">
            Surgical AI systems across the full surgical journey.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
            A-STAR organizes projects around practical clinical questions, model-card discipline, and staged validation. Project detail pages hold linked publications, demos, and project-specific status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="eyebrow mb-3">Vision across the surgical journey</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            From planning to validation, each phase asks what surgical AI can safely clarify.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platformVision.map((item) => (
            <article key={item.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <h3 className="font-display text-xl font-semibold tracking-normal">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SurgicalJourneyMap phases={phases} projects={projects} publications={publications} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Research directions</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Broad directions for a growing surgical AI lab.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {researchDirections.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-normal">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Systems and model cards</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Intended use, inputs, outputs, and validation state in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
            Each card keeps readiness, limitations, linked publications, and demo previews close together so the project claims stay readable and appropriately bounded.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug} className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <ModelCard project={project} publications={publications} compact />
              <ProjectMediaGrid project={{ ...project, media: project.media?.slice(0, 1) }} compact />
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

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Project media</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Demo slots for model outputs and surgical AI previews.
          </h2>
        </div>
        <div className="space-y-8">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-normal">{project.name}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{project.longName}</p>
                </div>
                <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-[var(--color-accent)] hover:underline">
                  Project detail
                </Link>
              </div>
              <ProjectMediaGrid project={project} compact />
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Specific projects</p>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Active systems and validation efforts.
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
