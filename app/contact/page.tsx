import { Suspense } from "react";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";
import { JournalClubForm } from "./journal-club-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach A-STAR for research collaboration, clinical partnerships, Journal Club, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)] bg-transparent">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="font-display max-w-3xl text-balance text-5xl font-semibold tracking-normal sm:text-6xl">
              Contact A-STAR.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
              Start a collaboration, send a project idea, or join the A-STAR Journal Club.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
            <Reveal>
              <p className="eyebrow mb-3">Location</p>
              <address className="not-italic text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                <span className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                  <span>
                    Mayo Clinic, Rochester, Minnesota
                    <br />
                    Department of Metabolic and Abdominal Wall Reconstructive Surgery
                    <br />
                    Division of Surgery
                    <br />
                    200 First Street SW
                    <br />
                    Rochester, MN 55905
                  </span>
                </span>
              </address>
            </Reveal>
          </aside>

          <section
            id="collaborate"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8"
          >
            <Reveal>
              <p className="eyebrow mb-3">Contact / Collaboration</p>
              <h2 className="font-display text-3xl font-semibold tracking-normal">
                Send a message or project idea.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                Use this intake for general questions, clinical collaboration, datasets,
                validation opportunities, press, and position interest.
              </p>
            </Reveal>
            <div className="mt-8">
              <Suspense
                fallback={<div className="h-96 animate-pulse rounded-xl bg-[var(--color-muted)]" />}
              >
                <ContactForm />
              </Suspense>
            </div>
          </section>
        </div>

        <section
          id="journal-club"
          className="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8"
        >
          <Reveal>
            <p className="eyebrow mb-3">Journal Club</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal">
              Attend or propose a Journal Club session.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              Share your affiliation, role, session interest, and topic ideas for upcoming A-STAR
              Journal Club planning.
            </p>
          </Reveal>
          <div className="mt-8">
            <JournalClubForm />
          </div>
        </section>
      </div>
    </div>
  );
}
