import type { Metadata } from "next";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { mailtoHref } from "./mailto-helper";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach A-STAR for research collaboration, clinical partnerships, Journal Club, or general inquiries.",
};

const contactOptions = [
  {
    id: "general",
    eyebrow: "General",
    title: "General Inquiry",
    description:
      "Questions about the lab, our research, or anything else. Reaches the lab directly.",
    href: mailtoHref({
      to: "laplante.simon@mayo.edu",
      subject: "A-STAR inquiry",
    }),
    to: "laplante.simon@mayo.edu",
    cc: null,
    label: "Open email draft",
  },
  {
    id: "journal-club",
    eyebrow: "Journal Club",
    title: "Journal Club",
    description:
      "Attend a session, propose a paper, or ask about upcoming A-STAR Journal Club topics.",
    href: mailtoHref({
      to: "laplante.simon@mayo.edu",
      cc: "Alomar.Abdulrahman@mayo.edu",
      subject: "A-STAR Journal Club inquiry",
    }),
    to: "laplante.simon@mayo.edu",
    cc: "Alomar.Abdulrahman@mayo.edu",
    label: "Open email draft",
  },
  {
    id: "collaborate",
    eyebrow: "Collaboration",
    title: "Project / Collaboration",
    description:
      "Bring a clinical question, dataset, or validation idea. We scope it together.",
    href: mailtoHref({
      to: "laplante.simon@mayo.edu",
      cc: "shahriarirad.reza@mayo.edu",
      subject: "A-STAR project collaboration inquiry",
    }),
    to: "laplante.simon@mayo.edu",
    cc: "shahriarirad.reza@mayo.edu",
    label: "Open email draft",
  },
] as const;

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)] bg-transparent">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30,136,229,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4">Get in touch</p>
            <h1
              className="heading-xl max-w-3xl text-balance"
              style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
            >
              <span style={{ fontWeight: 800, letterSpacing: "-0.045em" }}>Contact</span>
              {" "}
              <span style={{ fontWeight: 300, letterSpacing: "-0.01em", color: "rgb(255 255 255 / 0.6)" }}>
                A-STAR.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lead mt-5 max-w-2xl">
              Start a collaboration, join the Journal Club, or send a general question.
              Each option opens an email draft in your mail app.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {contactOptions.map((option) => (
            <Reveal key={option.id} delay={0.05}>
              <section
                id={option.id}
                className="card-glass card-glow flex h-full flex-col rounded-xl p-6 sm:p-8"
              >
                <p className="eyebrow mb-4">{option.eyebrow}</p>
                <h2 className="heading-md text-xl text-[var(--color-text-primary)]">
                  {option.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {option.description}
                </p>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href={option.href}
                    className="btn-primary group inline-flex w-full items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {option.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Fallback addresses */}
                <div className="mt-5 rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
                    If your email app does not open
                  </p>
                  <address className="not-italic">
                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                      <span className="font-mono text-[10px] text-white/35">To</span>
                      <span>{option.to}</span>
                    </div>
                    {option.cc && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                        <span className="font-mono text-[10px] text-white/35">CC</span>
                        <span>{option.cc}</span>
                      </div>
                    )}
                  </address>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Location */}
        <div className="mt-8">
          <Reveal>
            <aside className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8 lg:flex lg:items-start lg:gap-12">
              <div className="mb-4 lg:mb-0 lg:shrink-0">
                <p className="eyebrow mb-3">Location</p>
                <address className="not-italic text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  <span className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                    <span>
                      Mayo Clinic, Rochester, Minnesota
                      <br />
                      Department of Metabolic and Abdominal Wall Reconstructive Surgery
                      <br />
                      Division of Surgery, 200 First Street SW
                      <br />
                      Rochester, MN 55905
                    </span>
                  </span>
                </address>
              </div>
              <p className="text-sm leading-relaxed text-white/40 lg:pt-7">
                A-STAR is a Mayo Clinic research group. All correspondence is routed to
                the lab team above. For urgent clinical matters, contact Mayo Clinic directly.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
