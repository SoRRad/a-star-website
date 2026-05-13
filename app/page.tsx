"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FlaskConical, Users, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { NowStatus } from "@/components/site/now-status";
import { Section } from "@/components/site/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Magnetic } from "@/components/motion/magnetic";
import { ScrambleCounter } from "@/components/motion/scramble-counter";
import { PhaseWheel } from "@/components/lab/phase-wheel";
import { FeaturedProjects } from "@/components/lab/featured-projects";
import { GlossaryTerm } from "@/components/site/glossary-term";
import { siteConfig } from "@/lib/site-config";
import { stats } from "@/lib/stats";
import { mockNews } from "@/lib/mock-news";
import { mockEvents } from "@/lib/mock-events";
import { mockTeam } from "@/lib/mock-team";
import { formatDateShort } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      {/* Fixed scroll progress bar — above everything */}
      <ScrollProgress />

      <Hero />

      <Section code="01" label="Mission" id="mission">
        <MissionStatement />
      </Section>

      <div className="hairline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <Section code="02" label="Surgical journey" id="surgical-journey">
        <Reveal>
          <p className="eyebrow mb-4">The surgical journey</p>
          <h2 className="font-display mb-12 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl">
            Four phases. One continuous arc of intelligent care.
          </h2>
        </Reveal>
        <PhaseWheel />
      </Section>

      <div className="hairline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <Section code="03" label="Projects" id="projects">
        <Reveal>
          <p className="eyebrow mb-4">Active projects</p>
          <h2 className="font-display mb-12 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl">
            Built for the clinical frontier.
          </h2>
        </Reveal>
        <FeaturedProjects />
      </Section>

      <div className="hairline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <Section code="04" label="By the numbers" id="numbers">
        <NumbersStrip />
      </Section>

      <div className="hairline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <Section code="05" label="From the lab" id="from-the-lab">
        <FromTheLab />
      </Section>

      <div className="hairline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <Section code="06" label="Team" id="team">
        <TeamPreview />
      </Section>

      <div className="hairline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <Section code="07" label="Collaborators" id="collaborators">
        <CollaboratorsStrip />
      </Section>

      {/* Get involved — navy-1000 background, full bleed */}
      <div
        id="get-involved"
        style={{ background: "var(--color-navy-1000)" }}
        className="mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <GetInvolvedStrip />
        </div>
      </div>
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[90vh] overflow-hidden"
    >
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 -z-10 bg-grid opacity-50"
        aria-hidden="true"
      />
      {/* Radial wash */}
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-32 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        {/* Live status pill */}
        <Reveal delay={0.1}>
          <NowStatus />
        </Reveal>

        {/* Logo lockup — scroll-driven scale */}
        <motion.div
          style={{ scale: logoScale }}
          className="mt-12 flex justify-center"
        >
          <Logo
            variant="full"
            animated
            priority
            sizes="(max-width: 640px) 320px, 480px"
            className="max-w-[480px]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          className="font-display mt-10 text-balance font-semibold leading-[0.95]"
          style={{
            opacity: taglineOpacity,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {siteConfig.tagline}
        </motion.h1>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
            AIST is a research lab at {siteConfig.institution.name} advancing
            artificial intelligence across the full surgical journey — from{" "}
            <GlossaryTerm term="Pre-operative" /> planning through{" "}
            <GlossaryTerm term="Intra-operative" /> guidance,{" "}
            post-operative recovery, and rigorous external{" "}
            <GlossaryTerm term="Validation cohort" />.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild variant="accent" size="lg">
                <Link href="/projects">
                  Explore our projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href="/research">Read the research focus</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Mission ─────────────────────────────────────────────────────────────── */

function MissionStatement() {
  return (
    <Reveal>
      <p className="eyebrow mb-6">Our mission</p>
      <p
        className="font-display max-w-4xl text-balance font-semibold leading-[1.05]"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
      >
        To make every phase of surgical care smarter — by building AI that
        surgeons can trust, validate, and deploy at the patient&apos;s bedside.
      </p>
    </Reveal>
  );
}

/* ── Numbers ─────────────────────────────────────────────────────────────── */

function NumbersStrip() {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">By the numbers</p>
      </Reveal>
      <Reveal stagger className="grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="bg-[var(--color-card)] p-8">
            <div
              className="font-display font-semibold"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              <ScrambleCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm font-semibold text-[var(--color-foreground)]">
              {stat.label}
            </p>
            {stat.sublabel && (
              <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                {stat.sublabel}
              </p>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}

/* ── From the lab ────────────────────────────────────────────────────────── */

function FromTheLab() {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">From the lab</p>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* News */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Latest news
          </h3>
          <ul className="space-y-6">
            {mockNews.map((item) => (
              <li key={item.href} className="group">
                <time className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {formatDateShort(item.date)}
                </time>
                <h4 className="mt-1.5 text-base font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                >
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Events */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Upcoming events
          </h3>
          <ul className="space-y-6">
            {mockEvents.map((item) => (
              <li key={item.href} className="group">
                <time className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  {formatDateShort(item.date)}
                </time>
                <h4 className="mt-1.5 text-base font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                >
                  Details <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ── Team preview ────────────────────────────────────────────────────────── */

function TeamPreview() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Reveal>
          <p className="eyebrow">The team</p>
        </Reveal>
        <Link
          href="/team"
          className="hidden text-sm font-medium text-[var(--color-accent)] hover:underline sm:inline-flex sm:items-center sm:gap-1"
        >
          View full team <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Horizontal scroller */}
      <div className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mockTeam.map((member) => (
          <div
            key={member.id}
            className="flex w-40 flex-shrink-0 flex-col items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center"
          >
            {/* Avatar placeholder */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-muted)]">
              <span className="font-display text-xl font-semibold text-[var(--color-muted-foreground)]">
                {member.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-[var(--color-foreground)]">
                {member.name}
              </p>
              <p className="mt-0.5 text-[11px] leading-tight text-[var(--color-muted-foreground)]">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Collaborators ───────────────────────────────────────────────────────── */

const collaborators = [
  { name: "Mayo Clinic", logoSrc: "/logos/mayo-clinic.svg" },
  { name: "Partner logo", logoSrc: null },
  { name: "Partner logo", logoSrc: null },
  { name: "Partner logo", logoSrc: null },
  { name: "Partner logo", logoSrc: null },
  { name: "Partner logo", logoSrc: null },
];

function CollaboratorsStrip() {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">Collaborating institutions</p>
      </Reveal>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {collaborators.map((c, i) => (
          <div
            key={i}
            className="flex h-16 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2"
          >
            {c.logoSrc ? (
              <Image
                src={c.logoSrc}
                alt={c.name}
                width={100}
                height={32}
                loading="lazy"
                className="h-8 w-auto opacity-70 dark:invert dark:opacity-50"
              />
            ) : (
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {c.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Get involved ────────────────────────────────────────────────────────── */

const ctaCards = [
  {
    icon: Users,
    title: "Join the lab",
    pitch: "We recruit exceptional graduate students, postdocs, and visiting scholars.",
    href: "/join",
    cta: "Apply now",
  },
  {
    icon: FlaskConical,
    title: "Collaborate",
    pitch: "Clinical partnerships, industry collaboration, and multi-site research.",
    href: "/contact",
    cta: "Get in touch",
  },
  {
    icon: BookOpen,
    title: "Read our research",
    pitch: "Browse publications, preprints, and technical reports from AIST.",
    href: "/research",
    cta: "Explore research",
  },
];

function GetInvolvedStrip() {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-4 text-[var(--color-accent)]">Get involved</p>
        <h2
          className="font-display mb-12 max-w-lg text-balance font-semibold text-[var(--color-ink-100)]"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em" }}
        >
          The surgical AI frontier needs more builders.
        </h2>
      </Reveal>
      <Reveal stagger className="grid gap-6 sm:grid-cols-3">
        {ctaCards.map((card) => (
          <RevealItem key={card.title}>
            <div className="group flex h-full flex-col rounded-xl border border-[var(--color-navy-700)] bg-[var(--color-navy-900)] p-6 transition-colors hover:border-[var(--color-accent)]/40">
              <card.icon
                className="mb-4 h-6 w-6 text-[var(--color-accent)]"
                aria-hidden="true"
              />
              <h3 className="mb-2 text-base font-semibold text-[var(--color-ink-100)]">
                {card.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-ink-400)]">
                {card.pitch}
              </p>
              <Magnetic>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink-100)]"
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
