export type EventType =
  | "journal-club"
  | "seminar"
  | "conference"
  | "workshop"
  | "course"
  | "talk";
export type EventFormat = "in-person" | "virtual" | "hybrid";
export type EventStatus = "upcoming" | "past" | "tbd";

export type LabEvent = {
  slug: string;
  title: string;
  series?: string;
  type: EventType;
  format: EventFormat;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  summary: string;
  details: string;
  description: string;
  status: EventStatus;
  rsvpRequired: boolean;
  rsvpEmail?: string;
  recurring?: boolean;
  recurrencePattern?: string;
  people?: string[];
  projects?: string[];
  tags?: string[];
  externalUrl?: string;
  featured?: boolean;
};

export type JournalClubSession = {
  slug: string;
  title: string;
  date: string;
  imageSrc?: string;
  description: string;
  topics: string[];
};

export const journalClubIntakeHref = "/contact#journal-club";

export const nextJournalClub = {
  label: "Second A-STAR Journal Club \u2014 June 8, 2026",
  date: "2026-06-08",
  href: journalClubIntakeHref,
} as const;

export const journalClubSessions: JournalClubSession[] = [
  {
    slug: "first-astar-journal-club",
    title: "First A-STAR Journal Club",
    date: "2026-05-20",
    imageSrc: "/events/journal-club-may20-2026.jpg",
    description: "The first A-STAR Journal Club was held on May 20, 2026.",
    topics: [
      "Video-language models \u2014 Abdulrahman Alomar, M.D.",
      "Synthetic data in surgery \u2014 Reza Shahriarirad, M.D.",
    ],
  },
  {
    slug: "second-astar-journal-club",
    title: "Second A-STAR Journal Club",
    date: "2026-06-08",
    description: "The second A-STAR Journal Club is scheduled for June 8, 2026.",
    topics: [],
  },
];

export const events: LabEvent[] = [
  {
    slug: "astar-journal-club-may-2026",
    title: "First A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-05-20",
    location: "Mayo Clinic, Rochester, MN and virtual",
    summary: "The first A-STAR Journal Club was held on May 20, 2026.",
    details:
      "The session discussed video-language models with Abdulrahman Alomar, M.D. and synthetic data in surgery with Reza Shahriarirad, M.D.",
    description:
      "The first A-STAR Journal Club was held on May 20, 2026. Discussed topics included video-language models and synthetic data in surgery.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring - next session: Second A-STAR Journal Club, June 8, 2026",
    people: ["abdulrahman-alomar", "reza-shahriarirad"],
    tags: ["Journal Club", "Video-language Models", "Synthetic Data", "Surgical AI"],
    featured: true,
  },
  {
    slug: "astar-journal-club-june-2026",
    title: "Second A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-06-08",
    location: "Mayo Clinic, Rochester, MN and virtual",
    summary: "The second A-STAR Journal Club is scheduled for June 8, 2026.",
    details:
      "Use the Journal Club contact link to join the distribution list, attend the session, or propose a paper for discussion.",
    description:
      "The second A-STAR Journal Club is scheduled for June 8, 2026. Use the Journal Club contact link to join the distribution list, attend the session, or propose a paper for discussion.",
    status: "upcoming",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
    tags: ["Journal Club", "Surgical AI"],
    featured: true,
  },
  {
    slug: "acs-ai-surgery-course-2026",
    title: "ACS Artificial Intelligence in Surgery Course",
    series: "ACS Clinical Congress 2026",
    type: "course",
    format: "in-person",
    date: "2026-09-26",
    endDate: "2026-09-29",
    location: "Washington, DC",
    summary:
      "Dr. Simon J. Laplante is expected to contribute to an ACS Clinical Congress educational session on artificial intelligence in surgery.",
    details:
      "ACS lists Clinical Congress 2026 for September 26-29 in Washington, DC. Final session metadata is still forthcoming.",
    description:
      "Dr. Simon J. Laplante is expected to contribute to an ACS Clinical Congress 2026 educational session related to artificial intelligence in surgery. ACS lists Clinical Congress 2026 for September 26-29 in Washington, DC, with education, networking, and the latest surgical innovation. Final session details are forthcoming.",
    status: "upcoming",
    rsvpRequired: false,
    recurring: false,
    people: ["simon-laplante"],
    tags: ["Talk", "Course", "Lecture", "Surgical AI", "Education"],
    externalUrl: "https://www.facs.org/for-medical-professionals/conferences-and-meetings/",
    featured: true,
  },
];

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));
