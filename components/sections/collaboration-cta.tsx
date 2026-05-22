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
    <section className="relative isolate overflow-hidden border-y border-white/[0.08]">
      {/* Background treatment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(30,136,229,0.07) 0%, transparent 60%), linear-gradient(to bottom, rgba(255,255,255,0.015), rgba(255,255,255,0.02))",
        }}
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-6">Get involved</p>
            <h2
              className="heading-xl max-w-xl text-balance text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Ready to build surgical AI with A-STAR?
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-white/60">
              Bring a clinical question, dataset, or educational idea. We help shape it into a
              surgical AI project, validation pathway, or collaboration.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#collaborate" className="btn-primary group">
                Start a collaboration
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/contact#journal-club" className="btn-ghost">
                Join Journal Club
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {collaborationCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="card-glass card-glow group flex min-h-52 flex-col rounded-xl p-6 transition-all hover:-translate-y-1"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[#64B5F6]/20 bg-[#64B5F6]/[0.06] transition-colors group-hover:border-[#64B5F6]/40 group-hover:bg-[#64B5F6]/10">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="heading-lg text-lg text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
