"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Database, GraduationCap, Stethoscope } from "lucide-react";
import { AiHeroBackground } from "@/components/ui/ai-hero-background";

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

const nodes = [
  { x: 9, y: 22, size: 3 },
  { x: 22, y: 64, size: 2 },
  { x: 35, y: 34, size: 4 },
  { x: 52, y: 70, size: 3 },
  { x: 68, y: 26, size: 2 },
  { x: 82, y: 56, size: 4 },
  { x: 93, y: 18, size: 2 },
];

export function CollaborationCta() {
  const sectionRef = React.useRef<HTMLElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--cta-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`,
    );
    event.currentTarget.style.setProperty(
      "--cta-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * 18}px`,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#000814]/60"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        sectionRef.current?.style.setProperty("--cta-x", "0px");
        sectionRef.current?.style.setProperty("--cta-y", "0px");
      }}
      style={
        {
          "--cta-x": "0px",
          "--cta-y": "0px",
        } as React.CSSProperties
      }
    >
      {/* Three.js neural dot field — deep background */}
      <AiHeroBackground />

      {/* Pulsing radial rings — ambient motion, CSS only */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="animate-ring absolute h-[480px] w-[480px] rounded-full border border-[#64B5F6]/[0.08]"
            style={{ animationDelay: `${i * 3}s` }}
          />
        ))}
      </div>

      {/* Pointer-tracking neural constellation overlay */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(100_181_246/0.1),transparent_34rem)]" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full opacity-70 transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: "translate3d(var(--cta-x), var(--cta-y), 0)" }}
        >
          <path
            d="M9 22 L35 34 L68 26 L93 18 M22 64 L35 34 L52 70 L82 56 L68 26"
            fill="none"
            stroke="rgb(100 181 246 / 0.28)"
            strokeWidth="0.18"
            vectorEffect="non-scaling-stroke"
          />
          {nodes.map((node) => (
            <circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={node.size / 5}
              fill="rgb(100 181 246 / 0.75)"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-6">Get involved</p>
            <h2
              className="heading-xl max-w-xl text-balance"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <span style={{ fontWeight: 800, letterSpacing: "-0.045em" }}>Ready to build</span>
              {" "}
              <span style={{ fontWeight: 300, letterSpacing: "-0.01em", color: "rgb(255 255 255 / 0.65)" }}>
                surgical AI with{" "}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-caveat), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#64B5F6",
                  fontSize: "1.18em",
                  letterSpacing: "0",
                  textShadow:
                    "0 0 22px rgba(100,181,246,0.55), 0 0 44px rgba(100,181,246,0.3), 0 0 80px rgba(100,181,246,0.18)",
                  display: "inline-block",
                  transform: "translateY(0.04em) rotate(-2deg)",
                }}
              >
                A-STAR?
              </span>
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
