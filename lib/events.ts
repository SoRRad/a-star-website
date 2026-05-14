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
  time?: string;
  location?: string;
  description: string;
  status: EventStatus;
  rsvpRequired: boolean;
  recurring?: boolean;
  recurrencePattern?: string;
  featured?: boolean;
};

export const events: LabEvent[] = [
  {
    slug: "aist-journal-club-may-2026",
    title: "AIST Journal Club",
    series: "AIST Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-05-20",
    time: "TBD",
    location: "Mayo Clinic, Rochester, MN — and virtual",
    description:
      "Recurring AIST Journal Club. Discussion of recent surgical AI literature, lab projects in progress, and methodological deep dives. Open to invited researchers, fellows, and collaborators.",
    status: "upcoming",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring · Next session TBD",
    featured: true,
  },
];

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));
