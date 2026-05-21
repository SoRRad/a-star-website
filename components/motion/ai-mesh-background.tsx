const nodes = [
  { x: 8, y: 72 },
  { x: 18, y: 34 },
  { x: 32, y: 58 },
  { x: 46, y: 22 },
  { x: 58, y: 68 },
  { x: 72, y: 36 },
  { x: 86, y: 54 },
  { x: 94, y: 18 },
];

const paths = [
  "M8 72 C18 34 24 44 32 58 S45 28 46 22",
  "M32 58 C45 80 54 80 58 68 S68 42 72 36",
  "M46 22 C58 12 70 22 72 36 S82 52 86 54",
  "M58 68 C72 82 82 70 86 54 S92 28 94 18",
];

export function AiMeshBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-35 dark:opacity-20" />
      <svg className="absolute inset-0 h-full w-full opacity-55 dark:opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ai-mesh-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#ai-mesh-line)"
            strokeWidth="0.22"
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {nodes.map((node) => (
          <g key={`${node.x}-${node.y}`}>
            <circle cx={node.x} cy={node.y} r="0.75" fill="var(--color-accent)" opacity="0.72" />
            <circle cx={node.x} cy={node.y} r="2.2" fill="none" stroke="var(--color-accent)" strokeWidth="0.12" opacity="0.25" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-background)] via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
    </div>
  );
}
