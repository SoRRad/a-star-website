export type EventType = "journal-club" | "seminar" | "conference" | "workshop" | "talk";
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
  description: string;
  status: EventStatus;
  rsvpRequired: boolean;
  rsvpEmail?: string;
  recurring?: boolean;
  recurrencePattern?: string;
  people?: string[];
  projects?: string[];
  externalUrl?: string;
  featured?: boolean;
};

export type JournalClubSession = {
  slug: string;
  title: string;
  date: string;
  imageSrc: string;
  description: string;
  topics: string[];
};

export const journalClubIntakeHref = "/contact#journal-club";

export const nextJournalClub = {
  label: "TBD",
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
];

export const events: LabEvent[] = [
  {
    slug: "astar-journal-club-may-2026",
    title: "First A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-05-20",
    time: "TBD",
    location: "Mayo Clinic, Rochester, MN and virtual",
    description:
      "The first A-STAR Journal Club was held on May 20, 2026. Discussed topics included video-language models and synthetic data in surgery.",
    status: "past",
    rsvpRequired: true,
    rsvpEmail: "alomar.abdulrahman@mayo.edu",
    recurring: true,
    recurrencePattern: "Recurring - Next session: TBD",
    people: ["abdulrahman-alomar", "reza-shahriarirad"],
    featured: true,
  },
  {
    slug: "ai-research-summit-2026",
    title: "A-STAR Lab Abstract Accepted for the 2026 AI Research Summit",
    series: "AI Research Summit",
    type: "conference",
    format: "in-person",
    date: "2026-06-04",
    endDate: "2026-06-05",
    time: "All day",
    location: "Mayo Civic Center, Rochester, MN",
    description:
      "An abstract presentation by Dr. Reza Shahriarirad, titled 'Biological Age Reversal Following Bariatric Surgery: A Longitudinal Cohort Study Using AI-Derived ECG Age,' has been accepted for poster presentation at the 2026 AI Research Summit. This work highlights the A-STAR Lab's continued efforts to apply AI to clinically meaningful questions in bariatric surgery, including the use of AI-derived biomarkers to better understand physiologic changes following surgical weight loss.",
    status: "upcoming",
    rsvpRequired: false,
    recurring: false,
    people: ["reza-shahriarirad"],
    projects: [],
    featured: true,
  },
  {
    slug: "acs-ai-surgery-course-2026",
    title: "ACS Artificial Intelligence in Surgery Course",
    series: "ACS Clinical Congress 2026",
    type: "workshop",
    format: "in-person",
    date: "2026-09-26",
    endDate: "2026-09-29",
    time: "TBD",
    location: "Washington, DC",
    description:
      "Dr. Simon J. Laplante is expected to contribute to an ACS Clinical Congress 2026 educational session related to artificial intelligence in surgery. ACS lists Clinical Congress 2026 for September 26-29 in Washington, DC, with education, networking, and the latest surgical innovation. Final session details are forthcoming.",
    status: "upcoming",
    rsvpRequired: false,
    recurring: false,
    people: ["simon-laplante"],
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
