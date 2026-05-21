"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Orbit } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

interface TeamGridClientProps {
  mainTeam: TeamMember[];
  collaboratorTeam: TeamMember[];
}

export function TeamGridClient({ mainTeam, collaboratorTeam }: TeamGridClientProps) {
  const visibleCore = mainTeam.slice(0, 6);
  const visibleCollaborators = collaboratorTeam.slice(0, 3);

  return (
    <>
      <Reveal>
        <p className="eyebrow mb-4">The team</p>
        <h2 className="font-display mb-4 max-w-xl text-balance text-3xl font-semibold tracking-normal lg:text-4xl">
          The people behind A-STAR.
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          A clinical and technical team translating surgical AI from research questions into validated tools.
        </p>
      </Reveal>

      <div className="relative mt-10 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 sm:p-6">
        <ConstellationBackdrop />
        <div className="relative grid gap-3 md:grid-cols-2">
          {visibleCore.map((member, index) => (
            <TeamStrip key={member.slug} member={member} index={index} />
          ))}
        </div>
      </div>

      {visibleCollaborators.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Orbit className="h-4 w-4 text-[var(--color-accent)]" />
            <p className="eyebrow text-[var(--color-muted-foreground)]">Collaborators</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {visibleCollaborators.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)]/40"
              >
                <p className="font-display text-base font-semibold tracking-normal">{member.name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{member.affiliation}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ExploreMore href="/team">Meet the full team</ExploreMore>
    </>
  );
}

function TeamStrip({ member, index }: { member: TeamMember; index: number }) {
  const href = member.isOpenPosition ? member.openPositionUrl ?? "/contact#collaborate" : `/team/${member.slug}`;
  const external = member.isOpenPosition && href.startsWith("http");

  return (
    <Reveal delay={index * 0.03}>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(
          "group relative flex min-h-28 items-center gap-4 rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40",
          member.isOpenPosition
            ? "border-dashed border-[var(--color-coral-400)]/50 bg-[var(--color-coral-400)]/5"
            : "border-[var(--color-border)] bg-[var(--color-background)]/55",
        )}
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]">
          {member.isOpenPosition || !member.photo ? (
            <div className="flex h-full w-full items-center justify-center">
              <Briefcase className="h-6 w-6 text-[var(--color-coral-400)]" />
            </div>
          ) : (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-semibold tracking-normal text-[var(--color-foreground)]">
                {member.name}
              </h3>
              <p className={cn(
                "mt-1 font-mono text-[10px] uppercase tracking-widest",
                member.isOpenPosition ? "text-[var(--color-coral-400)]" : "text-[var(--color-accent)]",
              )}>
                {member.isOpenPosition ? "Open role" : member.role}
              </p>
            </div>
            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)] opacity-30 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
            {member.isOpenPosition
              ? "Join the A-STAR research portfolio across computer vision, decision support, and validation."
              : member.researchFocus?.slice(0, 3).join(" / ") || member.affiliation}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

function ConstellationBackdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25" aria-hidden="true">
      <path
        d="M30 55 C160 15 270 100 420 50 S650 35 820 120"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="3 9"
      />
      {[8, 21, 37, 54, 72, 89].map((x, index) => (
        <circle
          key={x}
          cx={`${x}%`}
          cy={`${index % 2 === 0 ? 24 + index * 5 : 58 - index * 4}%`}
          r="2"
          fill="var(--color-accent)"
        />
      ))}
    </svg>
  );
}
