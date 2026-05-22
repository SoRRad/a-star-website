import { collaborators } from "@/lib/collaborators";
import { upcomingEvents } from "@/lib/events";
import { allNews } from "@/lib/news";
import { Section } from "@/components/site/section";
import { CircuitDivider } from "@/components/site/circuit-divider";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { ResearchProjectsClient } from "@/components/sections/research-projects-client";
import { ProjectDemoShowcase } from "@/components/sections/project-demo-showcase";
import { EventsSection } from "@/components/sections/events-section";
import { FromTheLabSection } from "@/components/sections/from-the-lab-section";
import { CollaboratorMarquee } from "@/components/lab/collaborator-marquee";
import { Reveal } from "@/components/motion/reveal";
import { CollaborationCta } from "@/components/sections/collaboration-cta";

export default function HomePage() {
  const recentNews = allNews.slice(0, 3);
  const sortedCollaborators = [...collaborators].sort((a, b) => a.order - b.order);

  return (
    <>
      <HeroSection />

      <Section code="01" label="Mission" id="mission">
        <MissionSection />
      </Section>

      <CircuitDivider />

      <Section code="02" label="Projects" id="research">
        <ResearchProjectsClient />
      </Section>

      <CircuitDivider />

      <Section code="03" label="Demos" id="demos">
        <ProjectDemoShowcase />
      </Section>

      <CircuitDivider />

      <Section code="04" label="News & Events" id="events">
        <EventsSection events={upcomingEvents} />
        <div className="mt-14">
          <FromTheLabSection newsItems={recentNews} />
        </div>
      </Section>

      <CircuitDivider />

      <Section code="05" label="Collaborators" id="collaborators">
        <Reveal showMark>
          <p className="eyebrow mb-8">Collaborating institutions</p>
        </Reveal>
        <CollaboratorMarquee items={sortedCollaborators} />
      </Section>

      <div id="contact" className="mt-24">
        <CollaborationCta />
      </div>
    </>
  );
}
