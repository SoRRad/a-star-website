import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactCards, type ContactOption } from "./contact-cards";
import { mailtoHref } from "./mailto-helper";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach A-STAR for research collaboration, clinical partnerships, Journal Club, or general inquiries.",
};

const contactOptions: ReadonlyArray<ContactOption> = [
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
    label: "Start the conversation",
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
    label: "Join the discussion",
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
    label: "Pitch your idea",
  },
];

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
        <ContactCards options={contactOptions} />

        {/* Location */}
        <div className="mt-10">
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
