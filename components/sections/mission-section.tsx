import { Reveal } from "@/components/motion/reveal";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function MissionSection() {
  return (
    <Reveal showMark>
      <p className="eyebrow mb-8">Our mission</p>
      <p
        className="heading-xl max-w-5xl text-balance"
        style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
      >
        A-STAR develops clinically grounded surgical AI that connects data, operative expertise,
        and validation.
      </p>
      <p className="mt-7 max-w-3xl text-base leading-relaxed text-pretty text-white/60 md:text-lg">
        Our focus is not only building models, but understanding where intelligent systems can
        safely improve surgical planning, performance, education, and outcomes.
      </p>
      <div className="mt-6">
        <a
          href={siteConfig.officialMayoLabUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-[var(--color-accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          Official Mayo Clinic research page
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </Reveal>
  );
}
