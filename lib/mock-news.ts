/**
 * Placeholder news items — Step 5 will replace these with MDX content
 * sourced from the content/news/ directory via Velite.
 */

export interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

export const mockNews: NewsItem[] = [
  {
    date: "2026-04-18",
    title: "MOSI validation cohort reaches 3,000 patients",
    excerpt:
      "Prospective enrollment at Mayo Clinic Rochester has crossed the 3,000-patient threshold, enabling the planned external validation analysis.",
    href: "/news/mosi-3000-patients",
  },
  {
    date: "2026-03-05",
    title: "SIRIS phase-recognition model achieves 94% accuracy on held-out set",
    excerpt:
      "Our transformer-based video model now correctly identifies surgical phases across laparoscopic cholecystectomy with 94.2% frame-level accuracy.",
    href: "/news/siris-phase-accuracy",
  },
  {
    date: "2026-02-12",
    title: "Lab presents at SAGES 2026",
    excerpt:
      "Two podium presentations and one video abstract at SAGES Annual Meeting in Nashville cover MOSI's risk stratification and SIRIS phase labeling.",
    href: "/news/sages-2026",
  },
];
