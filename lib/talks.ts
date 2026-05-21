export type TalkType =
  | "webinar"
  | "invited-lecture"
  | "course"
  | "conference-talk"
  | "session-chair"
  | "moderator"
  | "session-director";

export type TalkStatus = "completed" | "upcoming" | "metadata-to-confirm";

export type Talk = {
  slug: string;
  title: string;
  speaker: string;
  speakerSlug?: string;
  date: string;
  displayDate: string;
  year: number;
  venue: string;
  location?: string;
  type: TalkType;
  status: TalkStatus;
  description: string;
  url?: string;
  videoUrl?: string;
  projects: string[];
  tags: string[];
  group?: "oxford-2025" | "asmbs-2026";
};

export const talks: Talk[] = [
  {
    slug: "computer-vision-assisted-surgery-asmbs-mn-2025",
    title: "Computer Vision Assisted Surgery: Current Landscape and Future Directions",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-09-26",
    displayDate: "September 26, 2025",
    year: 2025,
    venue: "ASMBS Minnesota State Chapter Meeting",
    location: "Minneapolis, Minnesota",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Simon J. Laplante presented on the current landscape and future directions of computer vision-assisted surgery.",
    projects: ["gonogonet"],
    tags: ["Computer Vision", "Surgical AI", "Bariatric Surgery", "Education"],
  },
  {
    slug: "pathway-safer-cholecystectomy-gonogonet-ai-summit-2024",
    title:
      "Pathway to Safer Cholecystectomy: Using the Validated GoNoGoNet to Demonstrate the Potential Clinical and Educational Applications of Surgical Computer Vision",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2024-07-01",
    displayDate: "July 2024",
    year: 2024,
    venue: "AI Summit Generative & Multimodal AI - Potentials and Challenges",
    location: "Rochester, Minnesota",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Laplante discussed the use of validated GoNoGoNet to demonstrate potential clinical and educational applications of surgical computer vision in safer cholecystectomy.",
    projects: ["gonogonet"],
    tags: ["GoNoGoNet", "Cholecystectomy", "Computer Vision", "Surgical Education", "Generative AI"],
  },
  {
    slug: "asmbs-bariatric-happy-hour-ai-2025",
    title: "The Future of Surgery: Harnessing AI for Smarter, Safer, and Faster Procedures",
    speaker: "Simon J. Laplante, M.D., M.Sc.",
    speakerSlug: "simon-laplante",
    date: "2025-01-24",
    displayDate: "January 24, 2025",
    year: 2025,
    venue: "ASMBS Bariatric Happy Hour",
    location: "Online",
    type: "webinar",
    status: "completed",
    description:
      "Dr. Simon J. Laplante appeared as a guest panelist in an ASMBS Bariatric Happy Hour webinar on the future of surgery and the use of AI for smarter, safer, and faster procedures.",
    url: "https://asmbs.org/videos/bariatric-happy-hour-the-future-of-surgery-harnessing-ai-for-smarter-safer-and-faster-procedures/",
    videoUrl: "https://www.youtube.com/watch?v=4quVILuHnnw",
    projects: [],
    tags: ["Artificial Intelligence", "Surgery", "Bariatric Surgery", "Webinar"],
  },
  {
    slug: "future-surgery-ai-sages-nashville-2025",
    title: "The Future of Surgery: Harnessing AI for Smarter, Safer, and Faster Procedures",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-01-01",
    displayDate: "January 2025",
    year: 2025,
    venue: "SAGES",
    location: "Nashville, Tennessee",
    type: "conference-talk",
    status: "metadata-to-confirm",
    description:
      "Dr. Laplante delivered a separate SAGES talk in Nashville on the future of surgery and the use of AI for smarter, safer, and faster procedures. Exact session metadata should be confirmed.",
    projects: [],
    tags: ["SAGES", "Surgical AI", "Artificial Intelligence", "Education"],
  },
  {
    slug: "overview-ai-technologies-surgical-care-asmbs-2025",
    title: "Overview of AI Technologies in Surgical Care: Fundamentals and Current Landscape",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-06-01",
    displayDate: "June 2025",
    year: 2025,
    venue: "ASMBS Annual Meeting",
    location: "Washington, DC",
    type: "course",
    status: "completed",
    description:
      "Dr. Laplante presented an overview of AI technologies in surgical care, covering fundamentals and the current landscape.",
    projects: [],
    tags: ["ASMBS", "AI Fundamentals", "Surgical Care", "Education"],
  },
  {
    slug: "ai-for-beginners-oxford-2025",
    title: "AI For Beginners: From Basic Concepts to Impact on Clinical Care",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-09-01",
    displayDate: "September 2025",
    year: 2025,
    venue: "Sixth IBC Oxford University World Congress 2025",
    location: "University of Oxford, United Kingdom",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Laplante presented an introductory session on AI concepts and their impact on clinical care.",
    projects: [],
    tags: ["Oxford", "AI Fundamentals", "Clinical Care", "Education"],
    group: "oxford-2025",
  },
  {
    slug: "computer-vision-assisted-surgery-oxford-2025",
    title: "Computer Vision Assisted Surgery: Current Landscape and Future Directions",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-09-01",
    displayDate: "September 2025",
    year: 2025,
    venue: "Sixth IBC Oxford University World Congress 2025",
    location: "University of Oxford, United Kingdom",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Laplante presented on the current landscape and future directions of computer vision-assisted surgery.",
    projects: ["gonogonet"],
    tags: ["Oxford", "Computer Vision", "Surgical AI", "GoNoGoNet"],
    group: "oxford-2025",
  },
  {
    slug: "ai-intraoperative-decision-making-oxford-chair-2025",
    title: "Experts Discussion Session: How Will AI Improve Intraoperative Surgical Decision-Making Over the Next 30 Years?",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-09-01",
    displayDate: "September 2025",
    year: 2025,
    venue: "Sixth IBC Oxford University World Congress 2025",
    location: "University of Oxford, United Kingdom",
    type: "session-chair",
    status: "completed",
    description:
      "Dr. Laplante served as session chair for an expert discussion on how AI may improve intraoperative surgical decision-making over the next 30 years.",
    projects: [],
    tags: ["Oxford", "Panel", "Intraoperative AI", "Surgical Decision-Making"],
    group: "oxford-2025",
  },
  {
    slug: "computer-vision-abdominal-wall-hernia-surgery-oxford-2025",
    title: "The Application of Computer Vision in Abdominal Wall Hernia Surgery",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-09-01",
    displayDate: "September 2025",
    year: 2025,
    venue: "Sixth IBC Oxford University World Congress 2025",
    location: "University of Oxford, United Kingdom",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Laplante presented on applications of computer vision in abdominal wall hernia surgery.",
    projects: [],
    tags: ["Oxford", "Computer Vision", "Hernia Surgery", "Surgical AI"],
    group: "oxford-2025",
  },
  {
    slug: "future-ai-surgical-precision-decision-making-oxford-2025",
    title: "The Future of AI: Improving Surgical Precision and Decision-Making",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2025-09-01",
    displayDate: "September 2025",
    year: 2025,
    venue: "Sixth IBC Oxford University World Congress 2025",
    location: "University of Oxford, United Kingdom",
    type: "moderator",
    status: "completed",
    description:
      "Dr. Laplante served as panel discussion moderator for a session on the future of AI in improving surgical precision and decision-making.",
    projects: [],
    tags: ["Oxford", "Panel", "Surgical Precision", "Decision-Making", "AI"],
    group: "oxford-2025",
  },
  {
    slug: "quantum-computing-surgical-data-asmbs-2026",
    title: "Quantum Computing: Solving Complex Surgical Data Challenges",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2026-05-04",
    displayDate: "May 4, 2026",
    year: 2026,
    venue: "ASMBS Annual Meeting",
    location: "San Antonio, Texas",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Laplante delivered a talk on quantum computing and its potential role in solving complex surgical data challenges.",
    projects: [],
    tags: ["ASMBS", "Quantum Computing", "Surgical Data", "Digital Surgery"],
    group: "asmbs-2026",
  },
  {
    slug: "big-ai-next-generation-robotics-asmbs-2026",
    title: "When Big AI Meets Next-Generation Robotics: Toward the True Definition of Intelligent Surgical Robots",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2026-05-06",
    displayDate: "May 6, 2026",
    year: 2026,
    venue: "ASMBS Annual Meeting",
    location: "San Antonio, Texas",
    type: "conference-talk",
    status: "completed",
    description:
      "Dr. Laplante delivered a talk on the intersection of large-scale AI and next-generation robotics toward intelligent surgical robots.",
    projects: [],
    tags: ["ASMBS", "Robotics", "Artificial Intelligence", "Digital Surgery"],
    group: "asmbs-2026",
  },
  {
    slug: "tomorrows-tools-ai-robotics-quantum-digital-or-asmbs-2026",
    title: "Tomorrow's Tools in Use Today: AI, Robotics, Quantum and the Digital OR",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2026-05-04",
    displayDate: "May 2026",
    year: 2026,
    venue: "ASMBS Annual Meeting",
    location: "San Antonio, Texas",
    type: "session-director",
    status: "completed",
    description:
      "Dr. Laplante served as director/moderator for a session focused on AI, robotics, quantum computing, and the digital operating room.",
    projects: [],
    tags: ["ASMBS", "Session Director", "Robotics", "Digital OR", "Quantum Computing"],
    group: "asmbs-2026",
  },
  {
    slug: "ai-medicine-surgery-george-washington-2026",
    title: "AI in Medicine and Surgery: From Basic Concepts to Impact on Clinical Care",
    speaker: "Simon J. Laplante, M.D.",
    speakerSlug: "simon-laplante",
    date: "2026-04-14",
    displayDate: "April 14, 2026",
    year: 2026,
    venue: "George Washington University",
    location: "Washington, DC",
    type: "invited-lecture",
    status: "upcoming",
    description:
      "Dr. Laplante is scheduled to deliver an invited lecture on AI in medicine and surgery, from basic concepts to impact on clinical care.",
    projects: [],
    tags: ["Invited Lecture", "AI Fundamentals", "Medicine", "Surgery", "Clinical Care"],
  },
];

export const selectedTalks = [...talks].sort((a, b) => b.date.localeCompare(a.date));

export function getTalksBySpeaker(slug: string): Talk[] {
  return selectedTalks.filter((talk) => talk.speakerSlug === slug);
}

export function getTalksByProject(slug: string): Talk[] {
  return selectedTalks.filter((talk) => talk.projects.includes(slug));
}
