"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/news";
import type { NewsCategory } from "@/lib/news";

interface NewsImageProps {
  src?: string;
  alt?: string;
  category: NewsCategory;
  date: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function NewsImage({ src, alt, category, date, className, priority, sizes }: NewsImageProps) {
  const [imgError, setImgError] = React.useState(false);

  if (!src || imgError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--color-navy-800)] to-[var(--color-navy-900)]",
          className,
        )}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]/60">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="font-mono text-xs text-[var(--color-ink-400)]">
          {new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => {
        console.warn(`[AIST] News image not found: ${src}`);
        setImgError(true);
      }}
    />
  );
}
