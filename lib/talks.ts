export type TalkFormat =
  | "webinar"
  | "invited-lecture"
  | "course"
  | "conference"
  | "chapter-meeting";

export type TalkStatus = "completed" | "upcoming" | "details-forthcoming";

export type Talk = {
  slug: string;
  title: string;
  speaker: string;
  speakerSlug?: string;
  date?: string;
  year?: number;
  venue: string;
  location?: string;
  format: TalkFormat;
  status: TalkStatus;
  description: string;
  url?: string;
  videoUrl?: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  featured?: boolean;
  order: number;
};

export const talks: Talk[] = [
  {
    slug: "asmbs-bariatric-happy-hour-ai-2025",
    title:
      "Bariatric Happy Hour! The Future of Surgery: Harnessing AI for Smarter, Safer, and Faster Procedures",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    date: "2025-01-24",
    year: 2025,
    venue: "American Society for Metabolic and Bariatric Surgery",
    format: "webinar",
    status: "completed",
    description:
      "Dr. Laplante appeared as a guest panelist in an ASMBS Bariatric Happy Hour session on AI for smarter, safer, and faster surgical procedures. The recorded session runs 01:02:06.",
    url: "https://asmbs.org/videos/bariatric-happy-hour-the-future-of-surgery-harnessing-ai-for-smarter-safer-and-faster-procedures/",
    videoUrl: "https://www.youtube.com/watch?v=4quVILuHnnw",
    tags: ["Artificial Intelligence", "Surgical Education", "Bariatric Surgery", "Webinar"],
    featured: true,
    order: 1,
  },
  {
    slug: "acs-ai-surgery-course-2026",
    title: "Artificial Intelligence in Surgery Course",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    year: 2026,
    venue: "American College of Surgeons",
    location: "Washington, DC",
    format: "course",
    status: "upcoming",
    description:
      "A planned/upcoming A-STAR educational contribution connected to AI in surgery. ACS lists Clinical Congress 2026 for September 26-29 in Washington, DC; additional session details are forthcoming.",
    url: "https://www.facs.org/for-medical-professionals/conferences-and-meetings/",
    tags: ["Artificial Intelligence", "Surgical Education", "ACS", "Course"],
    featured: true,
    order: 2,
  },
  {
    slug: "gwu-ai-surgery-invited-lecture",
    title: "George Washington University Invited Lecture",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    venue: "George Washington University",
    format: "invited-lecture",
    status: "details-forthcoming",
    description: "Details forthcoming.",
    tags: ["Artificial Intelligence", "Surgical Education", "Invited Lecture"],
    order: 3,
  },
  {
    slug: "oxford-ai-surgery-lectures",
    title: "Oxford, England AI Lectures",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    venue: "Oxford, England",
    location: "Oxford, England",
    format: "invited-lecture",
    status: "details-forthcoming",
    description: "Details forthcoming.",
    tags: ["Artificial Intelligence", "Surgical Education", "Invited Lecture"],
    order: 4,
  },
  {
    slug: "asmbs-minnesota-chapter-ai-talk",
    title: "ASMBS Minnesota Chapter AI Talk",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    venue: "ASMBS Minnesota Chapter",
    format: "chapter-meeting",
    status: "details-forthcoming",
    description: "Details forthcoming.",
    tags: ["Artificial Intelligence", "Bariatric Surgery", "Chapter Meeting"],
    order: 5,
  },
  {
    slug: "asmbs-ai-course",
    title: "ASMBS AI Course",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    venue: "American Society for Metabolic and Bariatric Surgery",
    format: "course",
    status: "details-forthcoming",
    description: "Details forthcoming.",
    tags: ["Artificial Intelligence", "Surgical Education", "Bariatric Surgery", "Course"],
    order: 6,
  },
];

export const selectedTalks = [...talks].sort((a, b) => a.order - b.order);

export function getTalksBySpeaker(slug: string): Talk[] {
  return selectedTalks.filter((talk) => talk.speakerSlug === slug);
}
