import Link from "next/link";
import { ArrowRight, Database, GraduationCap, Stethoscope } from "lucide-react";
import { AiMeshBackground } from "@/components/motion/ai-mesh-background";

const cards = [
  {
    icon: Stethoscope,
    title: "Clinical question",
    text: "Translate a surgical safety, planning, or outcomes question into a scoped AI study.",
  },
  {
    icon: Database,
    title: "Dataset / video / imaging",
    text: "Shape governed data into a validation plan, model card, or collaboration pathway.",
  },
  {
    icon: GraduationCap,
    title: "Education or journal club",
    text: "Bring trainees, readings, demonstrations, and surgical AI discussion into one forum.",
  },
];

export function CollaborationCta() {
  return (
    <section className="relative isolate overflow-hidden rounded-none border-y border-[var(--color-border)] bg-[var(--color-card)]">
      <AiMeshBackground />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">Get involved</p>
            <h2 className="font-display max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Ready to build surgical AI with A-STAR?
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
              Bring a clinical question, dataset, or educational idea. We help shape it into a surgical AI project, validation pathway, or collaboration.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#collaborate"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Start a collaboration
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact#journal-club"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background)]/60 px-5 py-3 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]/40"
              >
                Join Journal Club
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {cards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="min-h-52 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]/70 p-5 backdrop-blur-sm">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
