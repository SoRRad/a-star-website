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

export const events: LabEvent[] = [
  {
    slug: "asmbs-ai-course-2026",
    title: "ASMBS AI Course",
    type: "workshop",
    format: "hybrid",
    date: "2026-01-01",
    time: "TBD",
    location: "TBD",
    description:
      "Dr. Simon J. Laplante will contribute to an ASMBS AI course focused on the role of artificial intelligence in surgery, surgical innovation, and augmented surgical decision-making. Final course details are forthcoming.",
    status: "upcoming",
    rsvpRequired: false,
    recurring: false,
    people: ["simon-laplante"],
    featured: true,
  },
  {
    slug: "astar-journal-club-may-2026",
    title: "A-STAR Lab Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-05-20",
    time: "TBD",
    location: "Mayo Clinic, Rochester, MN — and virtual",
    description:
      "During this session, participants will discuss recent advances in artificial intelligence in surgery and brainstorm new ideas for future research and innovation. This event is limited to Mayo Clinic employees.",
    status: "upcoming",
    rsvpRequired: true,
    rsvpEmail: "alomar.abdulrahman@mayo.edu",
    recurring: true,
    recurrencePattern: "Recurring · Next session: May 20, 2026",
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
