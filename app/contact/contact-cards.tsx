"use client";

import { useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export type ContactOption = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  to: string;
  cc: string | null;
  label: string;
};

export function ContactCards({ options }: { options: ReadonlyArray<ContactOption> }) {
  // Track which cards have been clicked — reveals the fallback address as a recovery path
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const markRevealed = (id: string) => {
    setRevealed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {options.map((option) => {
        const isRevealed = revealed.has(option.id);
        return (
          <Reveal key={option.id} delay={0.05}>
            <section
              id={option.id}
              className="card-glass card-glow flex h-full flex-col rounded-xl p-6 sm:p-8"
            >
              <p className="eyebrow mb-4">{option.eyebrow}</p>
              <h2 className="heading-md text-xl text-[var(--color-text-primary)]">
                {option.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {option.description}
              </p>

              <div className="mt-8">
                <a
                  href={option.href}
                  onClick={() => markRevealed(option.id)}
                  className="btn-primary group inline-flex w-full items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {option.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Fallback addresses — revealed only after the user has clicked */}
              <div
                className="grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out"
                style={{
                  gridTemplateRows: isRevealed ? "1fr" : "0fr",
                  opacity: isRevealed ? 1 : 0,
                  marginTop: isRevealed ? "1.25rem" : "0",
                }}
                aria-hidden={!isRevealed}
              >
                <div className="min-h-0">
                  <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
                      If your email app did not open
                    </p>
                    <address className="not-italic">
                      <div className="flex items-center gap-1.5 text-xs text-white/55">
                        <span className="font-mono text-[10px] text-white/35">To</span>
                        <span>{option.to}</span>
                      </div>
                      {option.cc && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                          <span className="font-mono text-[10px] text-white/35">CC</span>
                          <span>{option.cc}</span>
                        </div>
                      )}
                    </address>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}
