"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * On-brand interactive preview of the MOSI staging system.
 *
 * It mirrors the inputs and vocabulary of the live calculator
 * (https://sorrad.github.io/MOSI-System/) — BMI -> M class, metabolic
 * comorbidity count -> O score, and the four-stage severity scale with its
 * weight-loss target tiers. The definitive stage, procedure outcome
 * probabilities, and clinical report live in the validated tool; this preview
 * computes the M class and O score only and links out for real use.
 */

const M_CLASSES = [
  { code: "M1", min: 30, max: 34.9, label: "BMI 30.0 – 34.9" },
  { code: "M2", min: 35, max: 39.9, label: "BMI 35.0 – 39.9" },
  { code: "M3", min: 40, max: 44.9, label: "BMI 40.0 – 44.9" },
  { code: "M4", min: 45, max: 49.9, label: "BMI 45.0 – 49.9" },
  { code: "M5", min: 50, max: Infinity, label: "BMI ≥ 50.0" },
] as const;

const STAGES = [
  { stage: "Stage I", color: "#34d399", note: "Lower severity" },
  { stage: "Stage II", color: "#38bdf8", note: "Moderate" },
  { stage: "Stage III", color: "#fbbf24", note: "High" },
  { stage: "Stage IV", color: "#fb7185", note: "Advanced systemic" },
] as const;

const TARGET_TIERS = [
  { tier: "Tier A", target: "≥ 7.5% TWL" },
  { tier: "Tier B", target: "≥ 15% TWL" },
  { tier: "Tier C", target: "≥ 25% TWL" },
  { tier: "Tier D", target: "≥ 30% TWL" },
] as const;

const COMORBIDITIES = [
  "Hypertension",
  "Type 2 diabetes",
  "Obstructive sleep apnea",
  "Hyperlipidemia",
  "GERD / reflux",
  "Impaired fasting glucose",
] as const;

const PROCEDURES = [
  { code: "SG", name: "Sleeve gastrectomy" },
  { code: "RYGB", name: "Roux-en-Y gastric bypass" },
  { code: "BPD-DS / SADI-S", name: "Exploratory" },
] as const;

function mClassFor(bmi: number) {
  if (Number.isNaN(bmi) || bmi < 30) return null;
  return M_CLASSES.find((m) => bmi >= m.min && bmi <= m.max) ?? null;
}

export function MosiDemo({ liveUrl }: { liveUrl: string }) {
  const [bmi, setBmi] = React.useState(42);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const mClass = mClassFor(bmi);
  const oScore = selected.size;

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <div className="card-glass overflow-hidden rounded-xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="eyebrow text-[var(--color-accent)]">Interactive preview</p>
          <p className="mt-1 text-sm text-white/55">
            Enter a BMI and metabolic profile to see the MOSI inputs at work.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/45">
          Research only
        </span>
      </div>

      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6 bg-[#000814] p-5">
          {/* BMI */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="mosi-bmi" className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Body mass index
              </label>
              <span className="font-mono text-lg tabular-nums text-white">{bmi.toFixed(1)}</span>
            </div>
            <input
              id="mosi-bmi"
              type="range"
              min={25}
              max={65}
              step={0.5}
              value={bmi}
              onChange={(e) => setBmi(Number(e.target.value))}
              className="mt-3 w-full accent-[#64B5F6]"
              aria-describedby="mosi-mclass"
            />
            <div id="mosi-mclass" className="mt-3 flex items-center gap-3">
              <span
                className="flex h-10 w-12 shrink-0 items-center justify-center rounded-md border border-[#64B5F6]/30 bg-[#64B5F6]/10 font-mono text-sm font-semibold text-[#64B5F6]"
                aria-live="polite"
              >
                {mClass?.code ?? "—"}
              </span>
              <span className="text-sm text-white/55">
                {mClass ? mClass.label : "Below the M1 staging range (BMI < 30)"}
              </span>
            </div>
          </div>

          {/* Comorbidities */}
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Metabolic comorbidities
              </span>
              <span className="font-mono text-sm tabular-nums text-white/80">
                O = {oScore}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {COMORBIDITIES.map((name) => {
                const active = selected.has(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggle(name)}
                    aria-pressed={active}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64B5F6]/70 " +
                      (active
                        ? "border-[#64B5F6]/50 bg-[#64B5F6]/15 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:text-white/80")
                    }
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Staging reference */}
        <div className="space-y-6 bg-[#000814] p-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Severity stage
            </span>
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {STAGES.map((s) => (
                <div key={s.stage} className="text-center">
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <p className="mt-2 font-mono text-[11px] text-white/80">{s.stage.replace("Stage ", "")}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-white/40">{s.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/45">
              The stage combines M class, the O score, and systemic-impairment factors. Compute the
              definitive stage in the full tool.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Weight-loss target tiers
            </span>
            <ul className="mt-3 space-y-1.5">
              {TARGET_TIERS.map((t) => (
                <li key={t.tier} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-white/70">{t.tier}</span>
                  <span className="text-white/55">{t.target}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Procedures modeled
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {PROCEDURES.map((p) => (
                <span
                  key={p.code}
                  className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-white/65"
                  title={p.name}
                >
                  {p.code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
        <p className="max-w-md text-xs leading-relaxed text-white/40">
          Decision-support preview. Procedure outcome probabilities and the clinical report are
          generated by the validated MOSI tool, not by this preview.
        </p>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#64B5F6] px-4 py-2 text-sm font-semibold text-[#001018] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64B5F6]/70"
        >
          Open the full MOSI tool
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
