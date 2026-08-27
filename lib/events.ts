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
    summary: "The sixth A-STAR Journal Club is scheduled for September 16, 2026.",
    details:
      "Use the Journal Club contact link to join the distribution list, attend the session, or propose a paper for discussion.",
    description:
      "The sixth A-STAR Journal Club is scheduled for September 16, 2026. Use the Journal Club contact link to join the distribution list, attend the session, or propose a paper for discussion.",
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
      "Dr. Simon J. Laplante, along with A-STAR Lab members Reza Shahriarirad, M.D. and Abdulrahman Alomar, M.D., is expected to contribute to an ACS Clinical Congress educational session on artificial intelligence in surgery.",
    details:
      "ACS lists Clinical Congress 2026 for September 26-29 in Washington, DC. Final session metadata is still forthcoming.",
    description:
      "Dr. Simon J. Laplante, along with A-STAR Lab members Reza Shahriarirad, M.D. and Abdulrahman Alomar, M.D., is expected to contribute to an ACS Clinical Congress 2026 educational session related to artificial intelligence in surgery. ACS lists Clinical Congress 2026 for September 26-29 in Washington, DC, with education, networking, and the latest surgical innovation. Final session details are forthcoming.",
    status: "upcoming",
    rsvpRequired: false,
    recurring: false,
    people: ["simon-laplante", "reza-shahriarirad", "abdulrahman-alomar"],
    tags: ["Talk", "Course", "Lecture", "Surgical AI", "Education"],
    externalUrl: "https://www.facs.org/for-medical-professionals/conferences-and-meetings/",
    featured: true,
  },
];

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

