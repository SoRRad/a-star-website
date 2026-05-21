import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ExternalLink, Github, GraduationCap, Mail, MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";
import { ProjectIntakeForm } from "./project-intake-form";
import { JournalClubForm } from "./journal-club-form";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { CollaborationCta } from "@/components/sections/collaboration-cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach A-STAR for research collaboration, clinical partnerships, project intake, Journal Club, or general inquiries.",
};

const CONTACTS = [
  {
    name: "Reza Shahriarirad, M.D.",
    role: "Primary contact",
    email: "shahriarirad.reza@mayo.edu",
    note: "General inquiries, collaboration, project intake, and press.",
  },
  {
    name: "Abdulrahman Alomar, M.D.",
    role: "Journal Club / collaboration contact",
    email: "alomar.abdulrahman@mayo.edu",
    note: "Journal Club attendance, collaboration intake, and educational initiatives.",
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", icon: Github, href: siteConfig.social.github || null, placeholder: "github.com/SoRRad" },
  { label: "Publications", icon: BookOpen, href: "/publications", placeholder: null, internal: true },
  { label: "Google Scholar", icon: GraduationCap, href: null, placeholder: "Link forthcoming" },
  { label: "LinkedIn", icon: ExternalLink, href: siteConfig.social.linkedin || null, placeholder: "Link forthcoming" },
];

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
              Start a collaboration, send a project idea, ask about Journal Club, or reach the A-STAR team directly.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <aside className="space-y-10">
            <Reveal>
              <div>
                <p className="eyebrow mb-3">Lab</p>
                <p className="font-display text-xl font-semibold tracking-normal">A-STAR</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  AI in Surgical Technology &amp; Augmentation Research
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <p className="eyebrow mb-3">Location</p>
                <address className="not-italic text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  <span className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                    <span>
                      Mayo Clinic, Rochester, Minnesota
                      <br />
                      Department of Surgery / Surgical Innovation
                      <br />
                      200 First Street SW
                      <br />
                      Rochester, MN 55905
                    </span>
                  </span>
                </address>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="eyebrow mb-3">Direct contacts</p>
                <div className="space-y-5">
                  {CONTACTS.map((c) => (
                    <div key={c.email} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                      <p className="text-sm font-semibold text-[var(--color-foreground)]">{c.name}</p>
                      <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{c.role}</p>
                      <a
                        href={`mailto:${c.email}`}
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:underline"
                      >
                        <Mail className="h-3 w-3" />
                        {c.email}
                      </a>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">{c.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className="eyebrow mb-3">Links</p>
                <ul className="space-y-2">
                  {SOCIAL_LINKS.map(({ label, icon: Icon, href, placeholder, internal }) => (
                    <li key={label} className="flex items-center gap-2 text-sm">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                      {href ? (
                        internal ? (
                          <Link href={href} className="text-[var(--color-accent)] hover:underline">
                            {label}
                          </Link>
                        ) : (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
                            {label}
                          </a>
                        )
                      ) : (
                        <span className="text-[var(--color-muted-foreground)]">
                          {label}
                          {placeholder && (
                            <span className="ml-1.5 font-mono text-[10px] text-[var(--color-muted-foreground)]/60">
                              ({placeholder})
                            </span>
                          )}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                If the web form cannot send email, use the direct email addresses above. The site does not claim a successful send unless the email provider accepts the message.
              </p>
            </Reveal>
          </aside>

          <div>
            <Reveal>
              <div className="mb-8">
                <p className="eyebrow mb-3">General inquiry</p>
                <h2 className="font-display text-2xl font-semibold tracking-normal">Send a message.</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  Use this form for general inquiries, position interest, press, Journal Club, and collaboration questions.
                </p>
              </div>
            </Reveal>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-[var(--color-muted)]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        <div id="collaborate" className="mt-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
          <Reveal>
            <p className="eyebrow mb-3">Project intake</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal">Collaborate with A-STAR.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              Share a clinical question, dataset, validation opportunity, or co-development idea. Submissions route to the configured A-STAR contact email when email delivery is enabled.
            </p>
          </Reveal>
          <div className="mt-8">
            <ProjectIntakeForm />
          </div>
        </div>

        <div id="journal-club" className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
          <Reveal>
            <p className="eyebrow mb-3">Journal Club intake</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal">Attend or propose a Journal Club session.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              This form only collects name, email, affiliation, role, session interest, and message.
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Direct fallback:{" "}
              <a href="mailto:alomar.abdulrahman@mayo.edu" className="text-[var(--color-accent)] hover:underline">
                alomar.abdulrahman@mayo.edu
              </a>
            </p>
          </Reveal>
          <div className="mt-8">
            <JournalClubForm />
          </div>
        </div>
      </div>

      <CollaborationCta />
    </div>
  );
}
