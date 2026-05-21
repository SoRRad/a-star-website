import Link from "next/link";
import { ArrowRight, Database, GraduationCap, Stethoscope } from "lucide-react";

const collaborationCards = [
  {
    icon: Stethoscope,
    title: "Clinical question",
    text: "Translate a surgical safety, planning, or outcomes question into a scoped AI study.",
  },
  {
    icon: Database,
    title: "Dataset / video / imaging",
    text: "Shape governed data into a model, validation plan, or multi-site collaboration.",
  },
  {
    icon: GraduationCap,
    title: "Education or Journal Club",
    text: "Bring trainees, readings, demos, and surgical AI discussion into one forum.",
  },
];

export function CollaborationCta() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">Get involved</p>
            <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Ready to build surgical AI with A-STAR?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/70">
              Bring a clinical question, dataset, or educational idea. We help shape it into a
              surgical AI project, validation pathway, or collaboration.
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-[#64B5F6] hover:bg-[#64B5F6]/10"
              >
                Join Journal Club
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {collaborationCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-glass min-h-48 rounded-lg p-5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-normal">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
