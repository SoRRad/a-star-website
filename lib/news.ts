export type NewsCategory =
  | "conference"
  | "publication"
  | "award"
  | "press"
  | "lab-update"
  | "newsletter";

export type NewsImageEntry = {
  src: string;
  alt: string;
  caption?: string;
};

export type NewsRelatedLink = {
  label: string;
  url: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  image?: string;
  imageAlt?: string;
  images?: NewsImageEntry[];
  summary: string;
  details: string;
  excerpt: string;
  body: string;
  people: string[];
  projects: string[];
  publications: string[];
  tags: string[];
  externalLink?: string;
  relatedLinks?: NewsRelatedLink[];
  featured: boolean;
  /** Set to false to omit this item from the combined News & Events timeline
   *  (e.g. a write-up that duplicates a dedicated Journal Club entry). */
  displayInTimeline?: boolean;
};

export const news: NewsItem[] = [
  {
    slug: "balfour-symposium-2026",
    title:
      "A-STAR Lab Earns Two Posters of Distinction at the 32nd Annual Balfour Surgery Research Symposium",
    date: "2026-10-09",
    category: "conference",
    summary:
      "A-STAR Lab presented four projects at the 32nd Annual Balfour Surgery Research Symposium, and two, on MOSI and on AI-ECG changes after bariatric surgery, were named Posters of Distinction.",
    details:
      "The recognized posters covered MOSI, the lab's Metabolic & Obesity Staging Index, and AI-ECG changes following bariatric surgery. The lab also presented work on plastic surgery after bariatric surgery and on a CT-based computer vision system for decision support in abdominal wall reconstruction.",
    excerpt:
      "A-STAR Lab presented four projects at the 32nd Annual Balfour Surgery Research Symposium, with posters on MOSI and on AI-ECG changes after bariatric surgery named Posters of Distinction.",
    body: `On October 9, 2026, the A-STAR Lab presented four projects at the 32nd Annual Balfour Surgery Research Symposium, and two of them were named Posters of Distinction.

The recognized posters covered MOSI, the lab's Metabolic & Obesity Staging Index for decision support in bariatric surgery, and AI-ECG changes following bariatric surgery.

The lab also presented a five-year look at the use of plastic surgery after bariatric surgery, including its predictors and the weight-loss thresholds involved, and an AI-based computer vision system that uses CT imaging to support surgical decision-making in abdominal wall reconstruction.

Together, the four projects reflect the lab's work across the surgical journey, from planning and patient selection to recovery and long-term outcomes.`,
    people: [],
    projects: ["mosi"],
    publications: [],
    tags: [
      "Conference",
      "Poster",
      "Award",
      "Balfour Symposium",
      "MOSI",
      "AI-ECG",
      "Bariatric Surgery",
      "Abdominal Wall Reconstruction",
      "Computer Vision",
    ],
    featured: false,
  },
  {
    slug: "acs-clinical-congress-2026",
    title: "A-STAR Lab Teaches Hands-On Computer Vision at the ACS Clinical Congress 2026",
    date: "2026-09-27",
    category: "conference",
    image: "/news/acs-clinical-congress-2026.jpg",
    imageAlt:
      "Dr. Simon J. Laplante presenting a slide titled What AI sees in surgical video at the ACS Clinical Congress.",
    images: [
      {
        src: "/news/acs-clinical-congress-2026.jpg",
        alt: "Dr. Simon J. Laplante presenting a slide titled What AI sees in surgical video at the ACS Clinical Congress.",
        caption:
          "Dr. Simon J. Laplante presenting \u201cWhat AI sees in surgical video\u201d during the course\u2019s introductory talks.",
      },
      {
        src: "/news/acs-clinical-congress-2026-2.jpg",
        alt: "Course faculty from the hands-on AI course at the ACS Clinical Congress.",
        caption:
          "Course faculty, among them Santosh Iyer (Moonshot AI), Chloe Nobuhara (Stanford University), Dr. Marc L. Melcher, Dr. Filippo Filicori, and A-STAR\u2019s Dr. Simon J. Laplante, Dr. Abdulrahman Alomar, and Dr. Reza Shahriarirad.",
      },
    ],
    summary:
      "A-STAR Lab members joined faculty from Moonshot AI and Stanford University to lead the computer vision session of the ACS hands-on AI course for clinicians and surgeons in Washington, DC.",
    details:
      "The course ran as an afternoon session in which participants built and trained their own AI tools rather than only hearing about them. The computer vision session had teams annotate laparoscopic cholecystectomy frames, then trained a model on each team's labels and compared the results side by side.",
    excerpt:
      "A-STAR Lab members led the computer vision session of the ACS hands-on AI course, where participants annotated laparoscopic cholecystectomy frames and trained models on their own labels.",
    body: `The A-STAR Lab contributed to "AI Skills: What Can I Do Now and What's Coming in the Future?" at the 2026 American College of Surgeons Clinical Congress in Washington, DC, an afternoon course in which participants built and trained their own AI tools rather than only hearing about them.

Dr. Simon J. Laplante opened the course's introductory talks with "What AI sees in surgical video," covering what AI can read from surgical video and how that supports intraoperative understanding.

Later in the afternoon, Dr. Laplante led the computer vision session alongside a faculty team of Santosh Iyer (Moonshot AI), Chloe Nobuhara (Stanford University), Dr. Abdulrahman Alomar, and Dr. Reza Shahriarirad. Participants learned what computer vision is and how surgical AI models are trained, then annotated laparoscopic cholecystectomy frames themselves, labeling anatomy and instruments in teams.

Each team's annotations were used to train a model during the course. At the end of the afternoon the resulting models were shown side by side, giving participants a direct look at how the quality of their own labels shaped what the AI learned to see.`,
    people: ["simon-laplante", "abdulrahman-alomar", "reza-shahriarirad"],
    projects: [],
    publications: [],
    tags: [
      "Conference",
      "ACS Clinical Congress",
      "Course",
      "Computer Vision",
      "Surgical Education",
      "Annotation",
    ],
    featured: false,
  },
  {
    slug: "research-fellows-awards-2026",
    title: "A-STAR Lab Members Honored at the Mayo Research Fellows' Association Awards",
    date: "2026-09-18",
    category: "award",
    image: "/news/research-fellows-awards-2026.jpg",
    imageAlt:
      "Dr. Abdulrahman Alomar and Dr. Reza Shahriarirad holding their Mayo Research Fellows' Association award certificates.",
    images: [
      {
        src: "/news/research-fellows-awards-2026.jpg",
        alt: "Dr. Abdulrahman Alomar and Dr. Reza Shahriarirad holding their Mayo Research Fellows' Association award certificates.",
        caption: "Dr. Abdulrahman Alomar and Dr. Reza Shahriarirad with their award certificates.",
      },
      {
        src: "/news/research-fellows-awards-2026-2.jpg",
        alt: "Five people on stage at the Mayo Research Fellows' Association awards, two holding award trophies.",
        caption:
          "From left: Drs. Farzad Pourghazi, Reza Shahriarirad, Abdulrahman Alomar, Parvin Kalhor, and Asad Maqbool.",
      },
    ],
    summary:
      "Dr. Abdulrahman Alomar received the Excellence in AI, Data Science, and Computational Biology Award, and the Bariatric Surgery and Aging Team received the Team Collaboration Award.",
    details:
      "The Excellence in AI, Data Science, and Computational Biology Award recognized work applying computer vision to computed tomography for hernia evaluation and surgical planning. The Team Collaboration Award recognized the Bariatric Surgery and Aging Team for the AI-ECG bariatric surgery project, a cross-disciplinary collaboration with Cardiology.",
    excerpt:
      "A-STAR Lab members were recognized at the Mayo Research Fellows' Association awards, with honors for computer vision applied to hernia surgical planning and for the AI-ECG bariatric surgery collaboration with Cardiology.",
    body: `A-STAR Lab members were recognized at the Mayo Research Fellows' Association awards.

Dr. Abdulrahman Alomar received the Excellence in AI, Data Science, and Computational Biology Award for work applying computer vision to computed tomography for hernia evaluation and surgical planning.

The Bariatric Surgery and Aging Team received the Team Collaboration Award for the AI-ECG bariatric surgery project, a cross-disciplinary collaboration with Cardiology. Dr. Reza Shahriarirad and Dr. Abdulrahman Alomar were among the recipients.

Both awards reflect the lab's emphasis on pairing clinical questions with rigorous computational methods, and on building the cross-disciplinary partnerships that translational surgical AI depends on.`,
    people: ["abdulrahman-alomar", "reza-shahriarirad"],
    projects: [],
    publications: [],
    tags: [
      "Award",
      "Computer Vision",
      "Hernia Surgery",
      "Surgical Planning",
      "AI-ECG",
      "Bariatric Surgery",
      "Cardiology",
      "Mayo Clinic",
    ],
    featured: false,
  },
  {
    slug: "surgery-family-day-2026",
    title: "A-STAR Lab Volunteers at Mayo Clinic Surgery Family Day",
    date: "2026-08-22",
    category: "lab-update",
    image: "/news/surgery-family-day-2026.jpg",
    imageAlt:
      "Two participants working through laparoscopic tasks on box trainers at Surgery Family Day.",
    images: [
      {
        src: "/news/surgery-family-day-2026.jpg",
        alt: "Two participants working through laparoscopic tasks on box trainers at Surgery Family Day.",
        caption:
          "Visitors trying basic laparoscopic tasks on the box trainers at the hands-on skills station.",
      },
      {
        src: "/news/surgery-family-day-2026-2.jpg",
        alt: "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar demonstrating laparoscopic instruments to a visitor.",
        caption:
          "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar walking a visitor through the instruments and the view from the laparoscope.",
      },
    ],
    summary:
      "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar led a hands-on laparoscopic skills station at Mayo Clinic's Surgery Family Day.",
    details:
      "Surgery Family Day welcomes staff and their families into the simulation center to learn more about the surgical discipline and the people behind it. The A-STAR station let visitors pick up the instruments, work through basic tasks on the trainers, and get a feel for the precision and coordination surgery demands.",
    excerpt:
      "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar volunteered at Mayo Clinic's Surgery Family Day, leading a hands-on laparoscopic skills station that drew a steady stream of visitors into the simulation center.",
    body: `Dr. Simon J. Laplante and Dr. Abdulrahman Alomar of the A-STAR Lab volunteered at Mayo Clinic's Surgery Family Day, an event that welcomes staff and their families into the simulation center to learn more about the surgical discipline and the people behind it.

The two led a hands-on laparoscopic skills station, where families and members of the wider healthcare team could pick up the instruments, work through basic tasks on the trainers, and get a feel for the precision and coordination surgery demands.

For many visitors it was a first look at what happens behind the OR doors, and the station drew a steady stream of curious participants throughout the day.

Events like this are a small but meaningful way of connecting the lab's work back to the community it serves.`,
    people: ["simon-laplante", "abdulrahman-alomar"],
    projects: [],
    publications: [],
    tags: [
      "Lab News",
      "Outreach",
      "Surgical Education",
      "Simulation",
      "Laparoscopy",
      "Mayo Clinic",
    ],
    featured: false,
  },
  {
    slug: "laplante-asmbs-ai-webinar-2025",
    title: "Dr. Simon J. Laplante Featured in ASMBS Webinar on AI in Surgery",
    date: "2025-01-24",
    category: "lab-update",
    summary:
      "Dr. Simon J. Laplante appeared as a guest panelist in an ASMBS Bariatric Happy Hour webinar on AI in surgery.",
    details:
      "The recorded session focused on how artificial intelligence may contribute to smarter, safer, and faster surgical procedures.",
    excerpt:
      "Dr. Simon J. Laplante appeared as a guest panelist in an ASMBS Bariatric Happy Hour session on AI for smarter, safer, and faster surgical procedures.",
    body: `On January 24, 2025, Simon J. Laplante, MD MSc, appeared as a guest panelist in the ASMBS Bariatric Happy Hour session titled "Bariatric Happy Hour! The Future of Surgery: Harnessing AI for Smarter, Safer, and Faster Procedures."

The recorded session runs 01:02:06 and focuses on artificial intelligence in surgery, including how AI may contribute to smarter, safer, and faster surgical procedures.`,
    people: ["simon-laplante"],
    projects: [],
    publications: [],
    tags: ["Talk", "Webinar", "Bariatric Surgery", "Surgical AI", "Education"],
    externalLink:
      "https://asmbs.org/videos/bariatric-happy-hour-the-future-of-surgery-harnessing-ai-for-smarter-safer-and-faster-procedures/",
    relatedLinks: [
      {
        label: "ASMBS recording",
        url: "https://asmbs.org/videos/bariatric-happy-hour-the-future-of-surgery-harnessing-ai-for-smarter-safer-and-faster-procedures/",
      },
      {
        label: "YouTube video",
        url: "https://www.youtube.com/watch?v=4quVILuHnnw",
      },
    ],
    featured: false,
    // Shown via the Talks list on /events; omit from the news side of the timeline to avoid duplication.
    displayInTimeline: false,
  },
  {
    slug: "balfour-symposium-2025",
    title: "A-STAR Lab Presents at the 31st Annual Balfour Surgery Research Symposium",
    date: "2025-10-10",
    category: "conference",
    image: "/news/balfour-symposium-2025.jpg",
    imageAlt: "A-STAR Lab poster presentation at Balfour Symposium",
    summary:
      "A-STAR Lab presented an abstract poster at the 31st Annual Balfour Surgery Research Symposium.",
    details:
      'The poster, titled "Development of a Computer Vision Deep Learning Model to Predict Optimal Surgical Management in Abdominal Wall Reconstruction," highlighted computer vision and deep learning work for surgical decision support.',
    excerpt:
      'A-STAR Lab presented an abstract poster titled "Development of a Computer Vision Deep Learning Model to Predict Optimal Surgical Management in Abdominal Wall Reconstruction" at the 31st Annual Balfour Surgery Research Symposium.',
    body: `On October 10, 2025, the A-STAR Lab presented an abstract poster at the 31st Annual Balfour Surgery Research Symposium.

The poster, titled "Development of a Computer Vision Deep Learning Model to Predict Optimal Surgical Management in Abdominal Wall Reconstruction," highlighted ongoing work focused on applying computer vision and deep learning to support surgical decision-making in complex abdominal wall reconstruction.

The presentation reflects the A-STAR Lab's continued commitment to developing innovative AI-driven tools that can enhance operative planning and improve patient-centered surgical care.`,
    people: [],
    projects: [],
    publications: [],
    tags: ["Conference", "Poster", "Computer Vision", "Surgical AI"],
    featured: false,
  },
  {
    slug: "madani-visit-2025",
    title: "A-STAR Lab Welcomes Dr. Amin Madani to Mayo Clinic",
    date: "2025-11-10",
    category: "lab-update",
    image: "/news/madani-visit-2025.jpg",
    imageAlt: "Dr. Amin Madani delivering a lecture at Mayo Clinic",
    images: [
      {
        src: "/news/madani-visit-2025.jpg",
        alt: "Dr. Amin Madani delivering a lecture at Mayo Clinic",
        caption: "Dr. Amin Madani visiting Mayo Clinic for a Department of Surgery lecture",
      },
      {
        src: "/news/madani-visit-2025-2.jpg",
        alt: "A-STAR Lab team members with Dr. Amin Madani during his Mayo Clinic visit",
        caption: "A-STAR Lab team members with Dr. Madani during his Mayo Clinic visit",
      },
    ],
    summary:
      "Dr. Amin Madani visited Mayo Clinic and delivered a Department of Surgery lecture on AI in surgery.",
    details:
      "His visit reflected growing collaboration between Mayo Clinic and UHN Toronto around surgical AI research, education, and performance improvement.",
    excerpt:
      "Dr. Amin Madani, founder of the Surgical Artificial Intelligence Research Academy (SARA) at UHN Toronto, visited Mayo Clinic and delivered a Department of Surgery lecture on AI in surgery.",
    body: `On November 10, 2025, Amin Madani, MD, PhD, founder of the Surgical Artificial Intelligence Research Academy (SARA) at the University Health Network (UHN) in Toronto and a collaborator of the A-STAR Lab, visited Mayo Clinic.

During his visit, Dr. Madani delivered a Department of Surgery lecture titled "Artificial Intelligence for Augmentation of Surgical Performance: Promises, Perils, and Realistic Expectations." His talk explored the evolving role of artificial intelligence in surgery, highlighting both the opportunities and challenges of integrating AI tools into surgical practice, education, and performance improvement.

Dr. Madani's visit reflected the growing collaboration between Mayo Clinic and UHN in advancing surgical AI research and innovation.`,
    people: ["amin-madani"],
    projects: [],
    publications: [],
    tags: ["Lab News", "Lecture", "Surgical AI", "Collaboration"],
    featured: false,
  },
  {
    slug: "sages-2026",
    title: "A-STAR Lab Attends the 2026 SAGES Annual Meeting",
    date: "2026-03-27",
    category: "conference",
    image: "/news/sages-2026.jpg",
    imageAlt: "A-STAR Lab members at SAGES 2026 in Tampa",
    summary:
      "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar represented A-STAR Lab at the 2026 SAGES Annual Meeting.",
    details:
      "The meeting provided opportunities to engage with minimally invasive surgery leaders, explore surgical technology, and connect with colleagues advancing AI-enabled surgical care.",
    excerpt:
      "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar represented the A-STAR Lab at the 2026 SAGES Annual Meeting in Tampa, Florida (March 24-27, 2026).",
    body: `From March 24-27, 2026, members of the A-STAR Lab attended the annual conference of the Society of American Gastrointestinal and Endoscopic Surgeons (SAGES), held in Tampa, Florida.

Dr. Simon J. Laplante, founder of the A-STAR Lab, and Dr. Abdulrahman Alomar, research fellow in the A-STAR Lab, represented the team at the meeting. Their attendance provided an opportunity to engage with leaders in minimally invasive surgery, explore emerging innovations in surgical technology, and connect with colleagues advancing the future of surgical care.

The A-STAR Lab's participation reflects its continued commitment to collaboration, innovation, and the integration of artificial intelligence into surgical practice.`,
    people: ["simon-laplante", "abdulrahman-alomar"],
    projects: [],
    publications: [],
    tags: ["Conference", "SAGES", "Surgical AI", "Bariatric Surgery"],
    featured: false,
  },
  {
    slug: "astar-ai-summit-2026",
    title: "A-STAR Team Attends the 2026 AI Research Summit",
    date: "2026-06-04",
    category: "conference",
    image: "/news/aisummit2026-1.jpg",
    imageAlt: "A-STAR team members attending the 2026 AI Research Summit.",
    images: [
      {
        src: "/news/aisummit2026-1.jpg",
        alt: "A-STAR team members attending the 2026 AI Research Summit.",
        caption: "A-STAR team at the 2026 AI Research Summit.",
      },
      {
        src: "/news/aisummit2026-2.jpg",
        alt: "Poster presentation at the 2026 AI Research Summit.",
        caption:
          "Research posters presented during the AI Summit, including work on AI-derived biological age following bariatric surgery.",
      },
    ],
    summary:
      "The A-STAR team attended the 2026 AI Research Summit, where Dr. Reza Shahriarirad presented three posters.",
    details:
      "One poster evaluated improvement in biological age following bariatric surgery using AI-derived biomarkers. The presentations reflect A-STAR's broader work applying artificial intelligence to surgical outcomes, physiologic recovery, patient-centered questions, and responsible validation.",
    excerpt:
      "The A-STAR team attended the 2026 AI Research Summit, where Dr. Reza Shahriarirad presented three posters, including work evaluating biological age improvement following bariatric surgery.",
    body: `The A-STAR team attended the 2026 AI Research Summit to share ongoing work at the intersection of artificial intelligence, surgical outcomes, and translational clinical research.

Dr. Reza Shahriarirad presented three posters during the meeting, including a study evaluating improvement in biological age following bariatric surgery using AI-derived biomarkers.

The presentations reflect A-STAR's broader effort to apply artificial intelligence to clinically meaningful questions in surgery, spanning risk modeling, physiologic recovery, patient-centered outcomes, and responsible validation.`,
    people: ["reza-shahriarirad"],
    projects: [],
    publications: [],
    tags: [
      "Conference",
      "AI Summit",
      "Bariatric Surgery",
      "Biological Age",
      "Research Presentation",
      "Poster",
      "A-STAR",
    ],
    featured: true,
  },
  {
    slug: "asmbs-2026",
    title: "A-STAR Lab Represents Mayo Clinic at the 2026 ASMBS Annual Meeting",
    date: "2026-05-07",
    category: "conference",
    image: "/news/asmbs-2026.jpg",
    imageAlt: "Dr. Laplante presenting at ASMBS 2026 in San Antonio",
    images: [
      {
        src: "/news/asmbs-2026.jpg",
        alt: "Dr. Laplante presenting at ASMBS 2026 in San Antonio",
        caption: "A-STAR Lab representation at the 2026 ASMBS Annual Meeting",
      },
      {
        src: "/news/asmbs-poster1-2026.jpg",
        alt: "MOSI abstract poster presented by the A-STAR Lab at the 2026 ASMBS Annual Meeting",
        caption:
          "MOSI abstract poster: Mayo Obesity Staging Index, a novel obesity classification system",
      },
    ],
    summary:
      "A-STAR Lab represented Mayo Clinic at the 2026 ASMBS Annual Meeting in San Antonio.",
    details:
      "Dr. Simon J. Laplante delivered invited education on quantum computing and intelligent surgical robotics, moderated innovation sessions, and the lab presented MOSI abstract work in bariatric surgery.",
    excerpt:
      'Dr. Simon J. Laplante delivered an invited talk on "Quantum Computing: Solving Complex Surgical Data Challenges" and the A-STAR Lab presented the MOSI abstract poster at the 2026 ASMBS Annual Meeting in San Antonio, Texas.',
    body: `From May 4-7, 2026, Dr. Simon J. Laplante and Dr. Abdulrahman Alomar represented the A-STAR Lab at the annual American Society for Metabolic and Bariatric Surgery (ASMBS) conference, held this year in San Antonio, Texas.

During the meeting, Dr. Laplante delivered an invited talk titled "Quantum Computing: Solving Complex Surgical Data Challenges" as part of the session "No Longer The Future: AI, Digital Surgery, Machine Learning and Quantum Computing in Today's OR." He also served as moderator for the Innovation Without Borders session, contributing to discussions on emerging technologies and their role in the future of surgery.

The A-STAR Lab also presented an abstract poster titled "[Mayo Obesity Staging Index: A Novel Obesity Classification System](https://www.soard.org/article/S1550-7289(26)00376-X/fulltext)," highlighting ongoing work to develop a clinically meaningful framework for obesity classification and surgical decision-making.

The lab's participation at ASMBS reflects its growing role in advancing innovation at the intersection of bariatric surgery, artificial intelligence, and emerging computational technologies.`,
    people: ["simon-laplante", "abdulrahman-alomar"],
    projects: ["mosi"],
    publications: ["mosi-novel-classification-2026"],
    tags: ["Conference", "Talk", "Poster", "Bariatric Surgery", "MOSI", "Surgical AI"],
    relatedLinks: [
      {
        label: "Published abstract - SOARD",
        url: "https://www.soard.org/article/S1550-7289(26)00376-X/fulltext",
      },
    ],
    featured: false,
  },
];

export const allNews = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const featuredNews = allNews.find((n) => n.featured) ?? allNews[0];

export function getNewsImages(item: NewsItem): NewsImageEntry[] {
  if (item.images?.length) return item.images;
  if (item.image) {
    return [{ src: item.image, alt: item.imageAlt ?? item.title }];
  }
  return [];
}

export function getNewsPrimaryImage(item: NewsItem): NewsImageEntry | undefined {
  return getNewsImages(item)[0];
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return allNews.find((item) => item.slug === slug);
}

export function getRelatedNews(item: NewsItem, limit = 3): NewsItem[] {
  return allNews
    .filter((candidate) => candidate.slug !== item.slug)
    .map((candidate) => {
      const peopleMatches = candidate.people.filter((slug) => item.people.includes(slug)).length;
      const projectMatches = candidate.projects.filter((slug) =>
        item.projects.includes(slug),
      ).length;
      const publicationMatches = candidate.publications.filter((slug) =>
        item.publications.includes(slug),
      ).length;
      const tagMatches = candidate.tags.filter((tag) => item.tags.includes(tag)).length;
      const categoryMatch = candidate.category === item.category ? 1 : 0;

      return {
        item: candidate,
        score:
          peopleMatches * 3 +
          projectMatches * 3 +
          publicationMatches * 2 +
          tagMatches +
          categoryMatch,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.item.date).getTime() - new Date(a.item.date).getTime(),
    )
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getNewsByPerson(slug: string): NewsItem[] {
  return allNews.filter((n) => n.people.includes(slug));
}

export function getNewsByProject(slug: string): NewsItem[] {
  return allNews.filter((n) => n.projects.includes(slug));
}

export function getNewsByPublication(slug: string): NewsItem[] {
  return allNews.filter((n) => n.publications.includes(slug));
}

export function hasRecentNews(daysWindow = 14): boolean {
  const now = Date.now();
  const windowMs = daysWindow * 24 * 60 * 60 * 1000;
  return allNews.some((item) => {
    const itemDate = new Date(item.date).getTime();
    return now - itemDate <= windowMs;
  });
}

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
  conference: "Conference / Summit",
  publication: "Publication",
  award: "Award",
  press: "Press",
  "lab-update": "Lab News",
  newsletter: "Newsletter",
};

export const CATEGORY_COLORS: Record<NewsCategory, string> = {
  conference: "border-[#64B5F6]/40 bg-[#64B5F6]/10 text-[#64B5F6]",
  publication: "border-blue-300/40 bg-blue-300/10 text-blue-300",
  award: "border-yellow-400/40 bg-yellow-400/10 text-yellow-300",
  press: "border-purple-400/40 bg-purple-400/10 text-purple-300",
  "lab-update": "border-violet-300/40 bg-violet-300/10 text-violet-300",
  newsletter: "border-white/20 bg-white/[0.05] text-white/70",
};
