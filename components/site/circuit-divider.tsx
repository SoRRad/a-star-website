export function CircuitDivider({ className }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 800 28" fill="none" className="w-full opacity-[0.18]">
        <g stroke="var(--color-accent)" strokeWidth="0.75" strokeLinecap="round">
          {/* Main horizontal rail */}
          <line x1="0" y1="14" x2="800" y2="14" />
          {/* Node 1 */}
          <line x1="140" y1="14" x2="140" y2="5" />
          <circle cx="140" cy="4" r="2" fill="var(--color-accent)" />
          <line x1="130" y1="4" x2="110" y2="4" strokeOpacity="0.4" />
          {/* Node 2 */}
          <line x1="300" y1="14" x2="300" y2="23" />
          <circle cx="300" cy="24" r="2" fill="var(--color-accent)" />
          <line x1="310" y1="24" x2="330" y2="24" strokeOpacity="0.4" />
          {/* Node 3 — center emphasis */}
          <line x1="400" y1="14" x2="400" y2="3" />
          <circle cx="400" cy="2" r="3" fill="var(--color-accent)" fillOpacity="0.6" />
          <circle cx="400" cy="2" r="5.5" stroke="var(--color-accent)" strokeOpacity="0.3" fill="none" />
          {/* Node 4 */}
          <line x1="520" y1="14" x2="520" y2="23" />
          <circle cx="520" cy="24" r="2" fill="var(--color-accent)" />
          <line x1="510" y1="24" x2="490" y2="24" strokeOpacity="0.4" />
          {/* Node 5 */}
          <line x1="670" y1="14" x2="670" y2="5" />
          <circle cx="670" cy="4" r="2" fill="var(--color-accent)" />
          <line x1="680" y1="4" x2="700" y2="4" strokeOpacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
