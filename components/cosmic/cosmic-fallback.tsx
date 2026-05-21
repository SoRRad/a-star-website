function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

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

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, rgba(30,136,229,0.12), transparent 28%), linear-gradient(to bottom, #000814 0%, #01030a 100%)",
      }}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 h-px w-px" style={{ boxShadow: boxShadows }} />
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
