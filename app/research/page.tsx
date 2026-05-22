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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,136,229,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="eyebrow mb-5">Projects</p>
          <h1
            className="heading-xl max-w-4xl text-balance text-white"
            style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
          >
            Surgical AI systems across the full surgical journey.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60">
            A-STAR organizes active systems around practical clinical questions, model-card
            discipline, and staged validation across planning, guidance, education, and outcomes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Vision across the surgical journey</p>
          <h2
            className="heading-xl max-w-3xl text-balance text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            From planning to validation, each phase asks what surgical AI can safely clarify.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-white/60">
            The surgical journey map connects current projects to the clinical phase, methods,
            applications, and validation context they are built to support.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platformVision.map((item, i) => (
            <article
              key={item.title}
              className="card-glass card-glow group rounded-xl p-6 transition-all hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-md border border-[#64B5F6]/15 bg-[#64B5F6]/5 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="heading-lg text-xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SurgicalJourneyMap phases={phases} projects={projects} publications={publications} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="eyebrow mb-4">Research directions</p>
          <h2
            className="heading-xl max-w-3xl text-balance text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Broad directions for a growing surgical AI lab.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {researchDirections.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="card-glass card-glow group rounded-xl p-6 transition-all hover:-translate-y-1"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[#64B5F6]/20 bg-[#64B5F6]/[0.06] transition-colors group-hover:border-[#64B5F6]/40 group-hover:bg-[#64B5F6]/10">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="heading-lg text-xl text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Systems and model cards</p>
          <h2
            className="heading-xl max-w-3xl text-balance text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Intended use, inputs, outputs, and validation state in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
            Each card keeps readiness, limitations, linked publications, and demo previews close together so the project claims stay readable and appropriately bounded.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="card-glass flex flex-col gap-4 rounded-xl p-5 transition-all hover:-translate-y-0.5"
            >
              <ModelCard project={project} publications={publications} compact />
              <ProjectMediaGrid project={{ ...project, media: project.media?.slice(0, 1) }} compact />
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
              >
                Open {project.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Project media</p>
          <h2
            className="heading-xl max-w-3xl text-balance text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Demo slots for model outputs and surgical AI previews.
          </h2>
        </div>
        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="card-glass card-glow rounded-xl p-6 transition-all"
            >
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h3 className="heading-lg text-2xl text-white">{project.name}</h3>
                  <p className="mt-1 text-sm text-white/50">{project.longName}</p>
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
          <h2
            className="heading-xl max-w-3xl text-balance text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
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
