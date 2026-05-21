"use client";

import Image from "next/image";
import { useState } from "react";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "mark" | "horizontal" | "stacked";
  animated?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * A-STAR logo.
 *
 * The site is dark-only, so each placement renders one transparent PNG that is
 * intended for the cosmic background.
 */
export function Logo({
  className,
  variant = "mark",
  animated = false,
  priority = false,
  sizes,
  width,
  height,
}: LogoProps) {
  const [failed, setFailed] = useState(false);

  const sources = {
    mark: logos.markLight,
    horizontal: logos.fullHorizontalLight,
    stacked: logos.fullStackedLight,
  };

  const dims = {
    mark: { w: width ?? 80, h: height ?? 80 },
    horizontal: { w: width ?? 282, h: height ?? 100 },
    stacked: { w: width ?? 195, h: height ?? 210 },
  }[variant];

  const defaultSizes = {
    mark: "80px",
    horizontal: "280px",
    stacked: "(max-width: 640px) 200px, 280px",
  }[variant];

  const alt =
    variant === "mark"
      ? "A-STAR logo mark"
      : "A-STAR - AI in Surgical Technology & Augmentation Research";

  return (
    <div className={cn("relative", animated && "animate-logo-entrance", className)}>
      {failed ? (
        <LogoFallback variant={variant} className="flex" />
      ) : (
        <Image
          src={sources[variant]}
          alt={alt}
          width={dims.w}
          height={dims.h}
          priority={priority}
          sizes={sizes ?? defaultSizes}
          onError={() => setFailed(true)}
          className="block h-auto w-full object-contain"
        />
      )}
    </div>
  );
}

function LogoFallback({
  variant,
  className,
}: {
  variant: NonNullable<LogoProps["variant"]>;
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <span
        aria-label="A-STAR"
        role="img"
        className={cn(
          "h-full min-h-7 w-full min-w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-1 font-display text-[0.72em] font-semibold leading-none text-white shadow-sm",
          className,
        )}
      >
        A*
      </span>
    );
  }

  return (
    <span
      aria-label="A-STAR"
      role="img"
      className={cn(
        "w-full flex-col justify-center rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-white shadow-sm",
        className,
      )}
    >
      <span className="font-display text-lg font-semibold leading-none tracking-tight">A-STAR</span>
      {variant === "stacked" && (
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
          Surgical AI Lab
        </span>
      )}
    </span>
  );
}
