"use client";

import * as React from "react";
import Image from "next/image";
import type { Collaborator } from "@/lib/collaborators";

interface CollaboratorMarqueeProps {
  items: Collaborator[];
}

export function CollaboratorMarquee({ items }: CollaboratorMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)",
      }}
    >
      <div
        className="flex [animation:marquee_50s_linear_infinite] items-center gap-6 hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        {doubled.map((c, i) => (
          <MarqueeItem key={`${c.slug}-${i}`} collaborator={c} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function MarqueeItem({ collaborator }: { collaborator: Collaborator }) {
  const [imgError, setImgError] = React.useState(false);
  const displayName = collaborator.shortName ?? collaborator.name;

  return (
    <a
      href={collaborator.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={collaborator.name}
      className="flex h-[100px] min-w-[240px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.92] px-6 shadow-sm backdrop-blur-sm transition-all hover:border-white/20"
    >
      {!imgError ? (
        <Image
          src={collaborator.logo}
          alt={collaborator.name}
          width={200}
          height={80}
          className="h-16 w-auto max-w-[200px] object-contain"
          onError={() => {
            console.warn(`[A-STAR] Collaborator logo failed: ${collaborator.logo}`);
            setImgError(true);
          }}
        />
      ) : (
        <span className="font-display text-base font-semibold text-[var(--color-navy-900)]">
          {displayName}
        </span>
      )}
    </a>
  );
}
