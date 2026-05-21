/**
 * Author lists use "LastName F" format for inline display.
 * AMA/APA/BibTeX formatters in publication-utils.ts handle punctuation.
 */

export type PublicationType =
  | "original-research"
  | "review"
  | "systematic-review"
  | "meta-analysis"
  | "case-report"
  | "editorial"
  | "letter"
  | "conference-abstract"
  | "technical-report"
  | "preprint";

export type PublicationStatus = "published" | "accepted" | "in-press" | "preprint" | "submitted";

export type PublicationTheme =
  | "surgical-ai"
  | "computer-vision"
  | "bariatric-surgery"
  | "robotic-surgery"
  | "patient-education"
  | "clinical-decision-support"
  | "validation"
  | "simulation"
  | "outcomes";

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  date: string;

  type: PublicationType;
  status: PublicationStatus;

  doi?: string;
  pmid?: string;
  url?: string;
  pdfUrl?: string;
  abstract?: string;

  projects: string[];
  team: string[];
  themes: PublicationTheme[];
  tags: string[];

  featured?: boolean;
  selected?: boolean;
  order: number;
  citationCount?: number;
  journalImpact?: string;
  lastUpdated?: string;
};

export const publications: Publication[] = [
  {
    slug: "mosi-novel-classification-2026",
    title:
      "Mayo Obesity Staging and Indication (MOSI): A Novel Obesity Classification System in the Era of Medical, Endoscopic and Surgical Treatments",
    authors: ["Shahriarirad R", "Alomar A", "Ghanem OM", "Laplante SJ"],
    venue: "Surgery for Obesity and Related Diseases",
    year: 2026,
    date: "2026-01-01",
    type: "original-research",
    status: "published",
    url: "https://www.soard.org/article/S1550-7289(26)00376-X/fulltext",
    projects: ["mosi"],
    team: ["reza-shahriarirad", "simon-laplante", "omar-ghanem", "abdulrahman-alomar"],
    themes: ["bariatric-surgery", "clinical-decision-support", "validation"],
    tags: ["MOSI", "Bariatric Surgery", "Risk Stratification", "Decision Support"],
    featured: true,
    selected: true,
    order: 1,
  },
  {
    slug: "bariatric-patient-education-2026",
    title:
      "Online patient education resources in bariatric surgery: a systematic evaluation of quality, readability, transparency, and representation",
    authors: ["A-STAR Team"],
    venue: "Surgical Endoscopy",
    year: 2026,
    date: "2026-01-01",
    type: "systematic-review",
    status: "published",
    url: "https://link.springer.com/epdf/10.1007/s00464-026-12845-y?sharing_token=X1FFIp8FaTy95IopHMETZ_e4RwlQNchNByi7wbcMAY7UCqoJ8eLSyzymY0S4YSNR4Z8ZRt_alE6w8n6dm3Wa_NVZfYplTx02QsdLOeip0tScGKhhP12nh2GeoeGxDwVsj2y9oRJsVhjBhvFESe9McS7VKQuLW3ohCzTdxliG32U%3D",
    projects: ["siris"],
    team: ["reza-shahriarirad"],
    themes: ["patient-education", "bariatric-surgery"],
    tags: ["SIRIS", "Patient Education", "Bariatric Surgery", "Systematic Review"],
    featured: true,
    selected: true,
    order: 2,
  },
  {
    slug: "surgical-warmup-rounds-2026",
    title:
      "Surgical Warmup Rounds: Concept of Targeted Just-In-Time Robotic Simulation Rehearsal Before and Between Cases",
    authors: ["A-STAR Team"],
    venue: "Surgical Innovation",
    year: 2026,
    date: "2026-01-01",
    type: "original-research",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1931720426000255?via%3Dihub",
    projects: [],
    team: ["abdulrahman-alomar", "simon-laplante"],
    themes: ["robotic-surgery", "simulation"],
    tags: ["Robotic Surgery", "Simulation", "Training"],
    featured: false,
    order: 3,
  },
  {
    slug: "gonogonet-validation-laparoscopic-cholecystectomy-2023",
    title: "Validation of an artificial intelligence platform for the guidance of safe laparoscopic cholecystectomy",
    authors: ["Laplante SJ", "Namazi B", "Kiani P", "Hashimoto DA", "Alseidi A", "Madani A"],
    venue: "Surgical Endoscopy",
    year: 2023,
    date: "2023-03-01",
    type: "original-research",
    status: "published",
    doi: "10.1007/s00464-022-09439-9",
    pmid: "35918549",
    url: "https://pubmed.ncbi.nlm.nih.gov/35918549/",
    projects: ["gonogonet"],
    team: ["simon-laplante", "amin-madani"],
    themes: ["surgical-ai", "computer-vision", "validation"],
    tags: ["GoNoGoNet", "Surgical AI", "Computer Vision", "Cholecystectomy"],
    featured: false,
    selected: false,
    order: 4,
  },
  {
    slug: "gonogonet-high-risk-behaviors-cholecystectomy-2023",
    title: "Use of artificial intelligence for decision-support to avoid high-risk behaviors during laparoscopic cholecystectomy",
    // TODO: Confirm complete PubMed author list and final issue metadata.
    authors: ["Metadata to confirm"],
    venue: "Surgical Endoscopy",
    year: 2023,
    date: "2023-12-01",
    type: "original-research",
    status: "published",
    doi: "10.1007/s00464-023-10403-4",
    pmid: "37697115",
    url: "https://pubmed.ncbi.nlm.nih.gov/37697115/",
    projects: ["gonogonet"],
    team: ["simon-laplante", "amin-madani"],
    themes: ["surgical-ai", "computer-vision", "validation"],
    tags: ["GoNoGoNet", "Surgical AI", "Computer Vision", "Cholecystectomy"],
    featured: false,
    selected: false,
    order: 5,
  },
  {
  slug: "Incentivizing-ai-surgery-2026",
  title: "Incentivizing artificial intelligence in surgery",
  authors: ["Abdulrahman A", "Dhar V", "Madani A", "Laplante SJ"],
  venue: "Surgical Endoscopy",
  year: 2026,
  date: "2026-05-15",

  type: "original-research",
  status: "published",

  doi: "10.1007/s00464-026-12879-2",
  url: "https://link.springer.com/article/10.1007/s00464-026-12879-2",
  pdfUrl: "https://link.springer.com/content/pdf/10.1007/s00464-026-12879-2.pdf",
  abstract: "Artificial intelligence has the potential to transform surgical practice through applications such as robotic assistance, computer vision, perioperative support, and administrative tools, yet widespread adoption remains limited. This article aims to develop a framework for encouraging broader use of AI in surgery by examining the current landscape, key barriers, and implementation challenges. A review of relevant peer-reviewed literature, policy documents, and funding reports on AI in healthcare was conducted. Overall, the successful integration of AI into routine surgical practice will require strategic financial and non-financial incentives, along with ongoing evidence of clinical and economic value.",

  projects: [],
  team: ["abdulrahman-alomar", "amin-madani", "simon-laplante"],
  themes: ["surgical-ai"],
  tags: ["Logic in AI", "Implementation Science"],

  featured: false,
  selected: false,
  order: 6,
},
];
