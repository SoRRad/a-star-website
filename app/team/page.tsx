import type { Metadata } from "next";
import { activeMainTeam, mainTeam, collaboratorTeam } from "@/lib/team";
import { TeamRosterRow } from "@/components/lab/team-roster-row";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The surgeons, scientists, and engineers building surgical AI at A-STAR — core team and institutional collaborators.",
};

export default function TeamPage() {
  const openRoleCount = mainTeam.filter((member) => member.isOpenPosition).length;
  const coreTeamCount = activeMainTeam.length;
  const coreTeamLabel = `${coreTeamCount} member${coreTeamCount === 1 ? "" : "s"}${
    openRoleCount > 0
      ? ` · ${openRoleCount} open role${openRoleCount === 1 ? "" : "s"}`
      : ""
  }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Page header */}
      <header className="mb-16 max-w-3xl">
        <p className="eyebrow mb-5">Team</p>
        <h1
          className="heading-xl text-balance"
          style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
        >
          <span style={{ fontWeight: 800, letterSpacing: "-0.045em" }}>Surgeons, scientists, and engineers</span>
          {" "}
          <span style={{ fontWeight: 300, letterSpacing: "-0.01em", color: "rgb(255 255 255 / 0.6)" }}>
            building surgical AI together.
          </span>
        </h1>
        <p className="text-lead mt-6">
          A-STAR is a collaboration across surgical practice, artificial intelligence research, and
          engineering. Below: the core lab, our research fellows and engineers, and our
          institutional collaborators.
        </p>
      </header>

      {/* Core team */}
      <section id="core" className="mb-24 scroll-mt-24">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <h2 className="heading-lg text-3xl text-white sm:text-4xl">
            Core team
          </h2>
          <span className="text-sm text-[var(--color-muted-foreground)]">
            {coreTeamLabel}
          </span>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {mainTeam.map((member, idx) => (
            <TeamRosterRow key={member.slug} member={member} index={idx + 1} variant="main" />
          ))}
        </div>
      </section>

      {/* Collaborators subsection */}
      {collaboratorTeam.length > 0 && (
        <section id="collaborators" className="scroll-mt-24">
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <h2
              className="font-display text-3xl font-semibold tracking-normal"
              style={{ letterSpacing: "0" }}
            >
              Collaborators
            </h2>
            <span className="text-sm text-[var(--color-muted-foreground)]">
              {collaboratorTeam.length} individuals
            </span>
          </div>
          <p className="mb-10 max-w-2xl text-sm text-[var(--color-muted-foreground)]">
            Clinical and research collaborators whose contributions and partnerships
            extend the A-STAR Lab&apos;s reach.
          </p>
          <div className="divide-y divide-[var(--color-border)]">
            {collaboratorTeam.map((member, idx) => (
              <TeamRosterRow key={member.slug} member={member} index={idx + 1} variant="collaborator" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
