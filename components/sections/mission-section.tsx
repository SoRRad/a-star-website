import { Reveal } from "@/components/motion/reveal";

export function MissionSection() {
  return (
    <Reveal showMark>
      <p className="eyebrow mb-8">Our mission</p>
      <p
        className="heading-xl max-w-5xl text-balance text-white"
        style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
      >
        A-STAR advances artificial intelligence across the full surgical journey —
        from{" "}
        <span className="text-[#64B5F6]">risk stratification</span> through patient
        education and rigorous validation.
      </p>
    </Reveal>
  );
}
