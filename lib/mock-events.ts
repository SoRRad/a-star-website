/**
 * Placeholder events — Step 5 will replace these with MDX content
 * sourced from the content/events/ directory via Velite.
 */

export interface EventItem {
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

export const mockEvents: EventItem[] = [
  {
    date: "2026-06-10",
    title: "Grand Rounds: AI in Bariatric Surgery",
    excerpt:
      "Dr. Amin Madani presents the MOSI validation results to the Mayo Clinic Department of Surgery.",
    href: "/events/grand-rounds-2026-06",
  },
  {
    date: "2026-07-15",
    title: "MICCAI 2026 — Workshop on Surgical Data Science",
    excerpt:
      "AIST team presenting SIRIS at the Surgical Data Science workshop. Paper and poster sessions.",
    href: "/events/miccai-2026",
  },
  {
    date: "2026-09-01",
    title: "Lab open-house for prospective graduate students",
    excerpt:
      "Interested in joining AIST? Attend our open-house session to meet the team and see ongoing projects.",
    href: "/events/open-house-2026",
  },
];
