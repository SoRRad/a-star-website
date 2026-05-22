"use client";

import { useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

const BAR_HEIGHT = 22;
const PATH_UNIT = 44;

function CosmicPathUnit({ x }: { x: number }) {
  const cy = BAR_HEIGHT / 2 + 1;
  return (
    <g transform={`translate(${x}, 0)`}>
      <path
        d={`M0 ${cy} C10 ${cy - 4} 14 ${cy - 4} 22 ${cy} S34 ${cy + 4} 44 ${cy}`}
        stroke="var(--color-accent)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="22" cy={cy} r="1.8" fill="var(--color-accent)" />
    </g>
  );
}

function CosmicPath({ width, opacity }: { width: number; opacity: number }) {
  const count = Math.ceil(width / PATH_UNIT) + 1;
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => (
        <CosmicPathUnit key={i} x={i * PATH_UNIT} />
      ))}
    </g>
  );
}

// Surgical-cosmic arm: sleek segments with stellar blue glow and orbital ring
function CosmicArm({
  armGradientId,
  jointGradientId,
  glowFilterId,
}: {
  armGradientId: string;
  jointGradientId: string;
  glowFilterId: string;
}) {
  const cy = BAR_HEIGHT / 2 + 1;
  return (
    <g transform={`translate(-34, ${cy - 15})`} filter={`url(#${glowFilterId})`}>
      {/* Arm segments */}
      <path d="M8 22 L17 11" stroke={`url(#${armGradientId})`} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 11 L31 15" stroke={`url(#${armGradientId})`} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M31 15 L40 9"  stroke={`url(#${armGradientId})`} strokeWidth="2.5" strokeLinecap="round" />

      {/* Joints */}
      <circle cx="8"  cy="22" r="4.5" fill={`url(#${jointGradientId})`} stroke="rgba(100,181,246,0.3)" strokeWidth="0.8" />
      <circle cx="18" cy="11" r="4.2" fill={`url(#${jointGradientId})`} stroke="rgba(100,181,246,0.3)" strokeWidth="0.8" />
      <circle cx="31" cy="15" r="3.6" fill={`url(#${jointGradientId})`} stroke="rgba(100,181,246,0.38)" strokeWidth="0.8" />

      {/* Orbital ring at base joint — cosmic flair */}
      <ellipse
        cx="8" cy="22" rx="7" ry="2.5"
        fill="none"
        stroke="#64B5F6"
        strokeWidth="0.45"
        opacity="0.5"
        transform="rotate(-20, 8, 22)"
      />

      {/* Probe tip energy discharge */}
      <path d="M39 9 L45 7"  stroke="#64B5F6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M45 7 L49 4"  stroke="#93C5FD" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
      <path d="M45 7 L49 10" stroke="#93C5FD" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />

      {/* Joint core highlights */}
      <circle cx="8"  cy="22" r="1.5" fill="#E0F2FE" opacity="0.9" />
      <circle cx="18" cy="11" r="1.4" fill="#E0F2FE" opacity="0.9" />

      {/* Micro-particles */}
      <circle cx="5"  cy="18" r="0.6" fill="#93C5FD" opacity="0.55" />
      <circle cx="12" cy="26" r="0.5" fill="#93C5FD" opacity="0.4" />
    </g>
  );
}

export function RoboticArmProgress() {
  const { scrollYProgress } = useScroll();
  // Spring smoothing: arm glides rather than jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const svgId = useId().replace(/:/g, "");
  const [width, setWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [simpleProgress, setSimpleProgress] = useState(0);

  // Direct DOM refs — zero React re-renders per animation frame
  const armGroupRef   = useRef<SVGGElement>(null);
  const clipRectRef   = useRef<SVGRectElement>(null);
  const trailRectRef  = useRef<SVGRectElement>(null);

  useEffect(() => {
    const updateViewport = () => {
      setWidth(window.innerWidth);
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    updateViewport();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMotionChange = () => setReducedMotion(mq.matches);

    window.addEventListener("resize", updateViewport, { passive: true });
    mq.addEventListener("change", onMotionChange);
    return () => {
      window.removeEventListener("resize", updateViewport);
      mq.removeEventListener("change", onMotionChange);
    };
  }, []);

  // Reduced-motion: simple state update (re-render only on scroll)
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reducedMotion) setSimpleProgress(value);
  });

  // Full animation: mutate SVG DOM directly — no React re-renders
  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (!isDesktop || reducedMotion || width === 0) return;
    const x = value * width;

    if (armGroupRef.current) {
      const armX = Math.min(width - 8, Math.max(38, x));
      armGroupRef.current.setAttribute("transform", `translate(${armX}, 0)`);
      (armGroupRef.current as SVGGElement).style.opacity = x > 38 ? "1" : "0";
    }
    if (clipRectRef.current) {
      clipRectRef.current.setAttribute("width", `${Math.max(0, x)}`);
    }
    if (trailRectRef.current) {
      const trailW = 72;
      trailRectRef.current.setAttribute("x", `${Math.max(0, x - trailW)}`);
      (trailRectRef.current as SVGRectElement).style.opacity = x > trailW ? "1" : "0";
    }
  });

  const clipId         = `${svgId}-cosmic-clip`;
  const trailGradId    = `${svgId}-cosmic-trail`;
  const armGradId      = `${svgId}-cosmic-arm`;
  const jointGradId    = `${svgId}-cosmic-joint`;
  const glowFilterId   = `${svgId}-cosmic-glow`;

  if (!isDesktop) return null;

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none fixed left-0 top-12 z-[110] hidden h-[2px] bg-[var(--color-accent)] md:block"
        style={{ width: `${simpleProgress * 100}%`, transition: "width 150ms linear" }}
        aria-hidden="true"
      />
    );
  }

  if (width === 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-12 z-[110] hidden md:block"
      aria-hidden="true"
      style={{ height: BAR_HEIGHT + 8, width: "100%" }}
    >
      <svg width={width} height={BAR_HEIGHT + 8} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id={trailGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64B5F6" stopOpacity="0" />
            <stop offset="100%" stopColor="#64B5F6" stopOpacity="0.38" />
          </linearGradient>
          <linearGradient id={armGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#E0F2FE" />
            <stop offset="35%"  stopColor="#64B5F6" />
            <stop offset="100%" stopColor="#1565C0" />
          </linearGradient>
          <radialGradient id={jointGradId} cx="35%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#E0F2FE" />
            <stop offset="42%"  stopColor="#64B5F6" />
            <stop offset="100%" stopColor="#0D3B7A" />
          </radialGradient>
          <filter id={glowFilterId} x="-40%" y="-60%" width="180%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost baseline */}
        <line
          x1={0} y1={BAR_HEIGHT / 2 + 1}
          x2={width} y2={BAR_HEIGHT / 2 + 1}
          stroke="#64B5F6" strokeWidth="0.4" opacity="0.07"
        />

        {/* Dim track */}
        <CosmicPath width={width} opacity={0.15} />

        {/* Filled track (clipped to progress) */}
        <clipPath id={clipId}>
          <rect ref={clipRectRef} x={0} y={0} width={0} height={BAR_HEIGHT + 8} />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <CosmicPath width={width} opacity={1} />
        </g>

        {/* Glow trail behind arm */}
        <rect
          ref={trailRectRef}
          x={0} y={BAR_HEIGHT / 2}
          width={72} height={2}
          fill={`url(#${trailGradId})`}
          opacity={0}
        />

        {/* Cosmic arm — position updated directly via ref */}
        <g ref={armGroupRef} transform="translate(38, 0)" style={{ opacity: 0 }}>
          <CosmicArm
            armGradientId={armGradId}
            jointGradientId={jointGradId}
            glowFilterId={glowFilterId}
          />
        </g>
      </svg>
    </div>
  );
}
