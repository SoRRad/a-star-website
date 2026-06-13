function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

// Static, deterministic backdrop for reduced-motion, low-power, and corporate-safe
// rendering paths. No Math.random / Date access — identical on server and client.
export function CosmicFallback() {
  const random = seededRandom(31415);
  const stars = Array.from({ length: 220 }, () => ({
    x: random() * 100,
    y: random() * 100,
    opacity: random() * 0.6 + 0.2,
  }));

  const boxShadows = stars
    .map((star) => `${star.x.toFixed(2)}vw ${star.y.toFixed(2)}vh 0 rgba(255,255,255,${star.opacity.toFixed(2)})`)
    .join(", ");

  // Constellation: connect a deterministic subset of stars with thin lines.
  const constellationPoints = stars.slice(0, 18);
  const constellationLines = constellationPoints
    .map((p, i) => {
      const next = constellationPoints[(i + 1) % constellationPoints.length];
      return `M ${p.x} ${p.y} L ${next.x} ${next.y}`;
    })
    .join(" ");

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, rgba(30,136,229,0.12), transparent 28%), linear-gradient(to bottom, #000814 0%, #01030a 100%)",
      }}
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0 opacity-[0.07]" />
      <div className="absolute left-0 top-0 h-px w-px" style={{ boxShadow: boxShadows }} />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={constellationLines}
          fill="none"
          stroke="rgba(100,181,246,0.14)"
          strokeWidth="0.06"
          vectorEffect="non-scaling-stroke"
        />
        {constellationPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="0.18" fill="rgba(100,181,246,0.35)" />
        ))}
      </svg>
      <div
        className="absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(100,181,246,0.08) 0%, transparent 62%)",
        }}
      />
    </div>
  );
}
