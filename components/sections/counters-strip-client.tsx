"use client";

import { Reveal, RevealItem } from "@/components/motion/reveal";
import { ScrambleCounter } from "@/components/motion/scramble-counter";
import type { Stat } from "@/lib/stats";

interface CountersStripClientProps {
  stats: Stat[];
}

export function CountersStripClient({ stats }: CountersStripClientProps) {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">By the numbers</p>
      </Reveal>
      <Reveal stagger className="grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="bg-[var(--color-card)] p-8">
            <div
              className="font-display font-semibold"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              <ScrambleCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm font-semibold text-[var(--color-foreground)]">{stat.label}</p>
            {stat.sublabel && (
              <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{stat.sublabel}</p>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}
