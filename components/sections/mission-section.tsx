import { Reveal } from "@/components/motion/reveal";

export function MissionSection() {
  return (
    <Reveal showMark>
      <p className="eyebrow mb-8">Our mission</p>
      <p
        className="heading-xl max-w-5xl text-balance"
        style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
      >
        <span style={{ fontWeight: 800, letterSpacing: "-0.045em" }}>
          A-STAR advances artificial intelligence
        </span>
        {" "}
        <span style={{ fontWeight: 300, letterSpacing: "-0.01em", color: "rgb(255 255 255 / 0.55)" }}>
          across the full surgical journey: from{" "}
          <span className="text-[#64B5F6]" style={{ fontWeight: 600 }}>risk stratification</span>
          {" "}through patient education and rigorous validation.
        </span>
      </p>
    </Reveal>
  );
}
