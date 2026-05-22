import { Reveal } from "@/components/motion/reveal";

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
    </Reveal>
  );
}
