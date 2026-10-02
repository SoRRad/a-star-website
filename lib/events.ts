export type EventType =
  | "journal-club"
  | "seminar"
  | "conference"
  | "workshop"
  | "course"
  | "talk";
export type EventFormat = "in-person" | "virtual" | "hybrid";
/**
 * Only "tbd" is acted on: undated entries stay off the timeline. Whether a dated event
 * is upcoming or past is worked out from its date (see `isUpcoming`), so an event moves
 * into "Recent activity" on its own once it has happened, rather than lingering under
 * "What's next" until someone remembers to flip this field.
 */
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
  /** Slug of the lab's news write-up for this event, linked from its timeline row. */
  newsSlug?: string;
  featured?: boolean;
};

export const journalClubIntakeHref = "/contact#journal-club";

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
      "The session discussed video-language models and synthetic data in surgery.",
    description:
      "The first A-STAR Journal Club was held on May 20, 2026. Discussed topics included video-language models and synthetic data in surgery.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
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
    summary: "The second A-STAR Journal Club was held on June 8, 2026.",
    details:
      "The session reviewed a computer vision model trained to predict anastomotic leak directly from intraoperative images of the completed anastomosis. The model caught most leaks but raised a high number of false alarms, and discussion centered on the small effective sample, the retrospective design, and whether the model was reading biology or a confounder such as the operating surgeon or the scope.",
    description:
      "The second A-STAR Journal Club was held on June 8, 2026. The group reviewed a computer vision model that predicts anastomotic leak from intraoperative images of the completed anastomosis, weighing its sensitivity against a high false alarm rate, the retrospective design, and the risk of confounding.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
    tags: ["Journal Club", "Computer Vision", "Anastomotic Leak", "Surgical AI"],
    featured: true,
  },
  {
    slug: "astar-journal-club-june-30-2026",
    title: "Third A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-06-30",
    location: "Mayo Clinic, Rochester, MN and virtual",
    summary: "The third A-STAR Journal Club was held on June 30, 2026.",
    details:
      "The session covered a recent preprint introducing a foundation model that compresses a patient's entire longitudinal record — structured data, clinical notes, and pathology images — into a single virtual patient representation, then uses it to forecast disease onset, progression, treatment response, and adverse events across hundreds of tasks.",
    description:
      "The third A-STAR Journal Club was held on June 30, 2026. The session covered a preprint on a foundation model that compresses a patient's full longitudinal record into a single virtual patient representation and forecasts disease onset, progression, treatment response, and adverse events across hundreds of tasks.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
    tags: ["Journal Club", "Foundation Models", "Clinical Prediction", "Surgical AI"],
    featured: true,
  },
  {
    slug: "astar-journal-club-july-2026",
    title: "Fourth A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-07-15",
    location: "Mayo Clinic, Rochester, MN and virtual",
    summary: "The fourth A-STAR Journal Club was held on July 15, 2026.",
    details:
      "The session continued the lab's recurring Journal Club series reviewing recent surgical AI and computer vision literature. Use the Journal Club contact link to join the distribution list or propose a paper for a future session.",
    description:
      "The fourth A-STAR Journal Club was held on July 15, 2026, continuing the lab's recurring review of surgical AI and computer vision literature.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
    tags: ["Journal Club", "Surgical AI"],
    featured: true,
  },
  {
    slug: "astar-journal-club-august-4-2026",
    title: "Fifth A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-08-04",
    location: "Mayo Clinic, Rochester, MN and virtual",
    summary: "The fifth A-STAR Journal Club was held on August 4, 2026.",
    details:
      "The session covered surgical gestures and the use of computer vision to classify them, working from a recent preprint on recognizing basic surgical actions across procedures. The group discussed what objective, large-scale gesture recognition could mean for future research, surgical education, and quality improvement.",
    description:
      "The fifth A-STAR Journal Club was held on August 4, 2026. The session covered a preprint on recognizing basic surgical actions across procedures, and the group discussed what objective gesture recognition at scale could mean for research, surgical education, and quality improvement.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
    tags: ["Journal Club", "Computer Vision", "Surgical Gestures", "Surgical Education"],
    featured: true,
  },
  {
    slug: "astar-journal-club-september-2026",
    title: "Sixth A-STAR Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-09-16",
    location: "Mayo Clinic, Rochester, MN and virtual",
    summary: "The sixth A-STAR Journal Club was held on September 16, 2026.",
    details:
      "The session continued the lab's recurring Journal Club series reviewing recent surgical AI and computer vision literature. Use the Journal Club contact link to join the distribution list or propose a paper for a future session.",
    description:
      "The sixth A-STAR Journal Club was held on September 16, 2026, continuing the lab's recurring review of surgical AI and computer vision literature.",
    status: "past",
    rsvpRequired: true,
    recurring: true,
    recurrencePattern: "Recurring Journal Club session",
    people: [],
    tags: ["Journal Club", "Surgical AI"],
    featured: true,
  },
  {
    slug: "acs-ai-surgery-course-2026",
    title: "ACS Clinical Congress: Hands-On AI Course",
    series: "ACS Clinical Congress 2026",
    type: "course",
    format: "in-person",
    date: "2026-09-27",
    location: "Washington, DC",
    summary:
      "Dr. Simon J. Laplante, Dr. Abdulrahman Alomar, and Dr. Reza Shahriarirad taught the computer vision session of the ACS hands-on AI course for clinicians and surgeons.",
    details:
      "\"AI Skills: What Can I Do Now and What's Coming in the Future?\" ran as an afternoon course at Clinical Congress 2026 in Washington, DC. Dr. Laplante gave an introductory talk on what AI reads from surgical video, then led the computer vision session with faculty from Moonshot AI and Stanford University. Participants annotated laparoscopic cholecystectomy frames in teams, and a model was trained on each team's labels and compared side by side.",
    description:
      "At the 2026 ACS Clinical Congress in Washington, DC, A-STAR Lab members taught the computer vision session of an afternoon course in which participants built and trained their own AI tools. Dr. Simon J. Laplante opened with a talk on what AI reads from surgical video and led the session alongside faculty from Moonshot AI and Stanford University, with Dr. Abdulrahman Alomar and Dr. Reza Shahriarirad.",
    status: "past",
    rsvpRequired: false,
    recurring: false,
    people: ["simon-laplante", "reza-shahriarirad", "abdulrahman-alomar"],
    tags: ["Course", "Computer Vision", "Surgical AI", "Education", "Hands-on Lab"],
    externalUrl: "https://www.facs.org/for-medical-professionals/conferences-and-meetings/",
    newsSlug: "acs-clinical-congress-2026",
    featured: true,
  },
];

/** Today's date as YYYY-MM-DD in the lab's own time zone (Rochester, MN). */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** An event stays upcoming through the whole of its last day. */
export function isUpcoming(event: LabEvent, today: string = todayISO()): boolean {
  return (event.endDate ?? event.date) >= today;
}

/** Dated events that haven't finished yet, soonest first. */
export function getUpcomingEvents(today: string = todayISO()): LabEvent[] {
  return events
    .filter((e) => e.status !== "tbd" && isUpcoming(e, today))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Dated events that have finished. */
export function getPastEvents(today: string = todayISO()): LabEvent[] {
  return events.filter((e) => e.status !== "tbd" && !isUpcoming(e, today));
}

