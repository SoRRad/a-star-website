"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Users, BookOpen } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import type { Opening } from "@/lib/openings";
import { contactMailto } from "@/lib/contact";

const ctaCards = [
  {
    icon: Users,
    title: "Join the lab",
    pitch: "We recruit exceptional fellows, engineers, and visiting scholars.",
    href: "/join",
    cta: "Apply now",
  },
  {
    icon: FlaskConical,
    title: "Collaborate",
    pitch: "Clinical partnerships, industry collaboration, and multi-site research.",
    href: contactMailto,
    cta: "Get in touch",
  },
  {
    icon: BookOpen,
    title: "Read our research",
    pitch: "Browse publications, preprints, and technical reports from A-STAR.",
    href: "/publications",
    cta: "Explore research",
  },
];

interface JoinUsStripProps {
  openings: Opening[];
}

export function JoinUsStrip({ openings }: JoinUsStripProps) {
  const active = openings[0];

  return (
    <>
      <Reveal>
        <p className="eyebrow mb-4 text-[var(--color-accent)]">Get involved</p>
        <h2
          className="font-display mb-4 max-w-lg text-balance font-semibold text-[var(--color-foreground)]"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em" }}
        >
          The surgical AI frontier needs more builders.
        </h2>
        {active && (
          <a
            href={active.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/15"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ekg rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            We&apos;re hiring · {active.title} →
          </a>
        )}
      </Reveal>

      <Reveal stagger className="grid gap-6 sm:grid-cols-3">
        {ctaCards.map((card) => (
          <RevealItem key={card.title}>
            <div className="group flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm transition-colors hover:border-[var(--color-accent)]/40">
              <card.icon className="mb-4 h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
              <h3 className="mb-2 text-base font-semibold text-[var(--color-foreground)]">{card.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">{card.pitch}</p>
              <Magnetic>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}
