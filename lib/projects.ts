export type ProjectStatus = "concept" | "development" | "validation" | "clinical" | "deployed";
export type SurgicalPhase =
  | "risk-stratification"
  | "intra-op-intelligence"
  | "patient-journey"
  | "outcomes-validation";
export type ProjectMediaType = "image" | "gif" | "video" | "thumbnail" | "placeholder";

export type ProjectMedia = {
  type: ProjectMediaType;
  src?: string;
  poster?: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  longName: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  phases: SurgicalPhase[];
  liveUrl: string;
  githubUrl?: string;
  team: string[];
  collaborators: string[];
  featured?: boolean;
  order: number;
  lastUpdated?: string;
  media?: ProjectMedia[];
  modelCard: ProjectModelCard;
};

export type ProjectModelCard = {
  intendedUse: string;
  clinicalPhase: string;
  inputData: string[];
  output: string[];
  modelPipeline: string;
  validationStatus: string;
  deploymentReadiness: string;
  limitations: string;
  relatedPublications: string[];
};

export const projects: Project[] = [
  {
    slug: "mosi",
    name: "MOSI",
    longName: "Metabolic & Obesity Staging Index",
    tagline: "Decision support and prospective validation for bariatric surgery.",
    description:
      "A staging algorithm and clinical audit platform for bariatric surgery, validated on 3,097 patients. MOSI scores patients across BMI, comorbidities, and severity to recommend procedures and target weight-loss tiers.",
    status: "validation",
    phases: ["risk-stratification", "outcomes-validation"],
    liveUrl: "https://sorrad.github.io/MOSI-System/",
    githubUrl: "https://github.com/SoRRad/MOSI-System",
    team: ["simon-laplante", "reza-shahriarirad", "abdulrahman-alomar"],
    collaborators: ["mayo-clinic-mars"],
    featured: true,
    order: 1,
    lastUpdated: "2026-04-01",
    media: [
      {
        type: "placeholder",
        alt: "MOSI demo placeholder",
        caption: "Demo GIF forthcoming",
      },
      {
        type: "placeholder",
        alt: "MOSI model output thumbnail placeholder",
        caption: "Model output thumbnail forthcoming",
      },
    ],
    modelCard: {
      intendedUse:
        "Pre-operative decision support for bariatric surgery candidate evaluation. Advisory only; clinical judgment remains with the treating surgeon.",
      clinicalPhase: "Risk stratification, planning, and outcomes validation",
      inputData: [
        "BMI and metabolic risk profile",
        "Comorbidity burden",
        "Prior bariatric procedure history",
        "Procedure and outcomes variables used in validation workflows",
      ],
      output: [
        "MOSI stage",
        "Procedure category recommendation for review",
        "Predicted total weight-loss tier",
        "Audit-ready report",
      ],
      modelPipeline:
        "Rule-guided staging and decision-support workflow with prospective external validation in progress.",
      validationStatus:
        "Derivation and publication complete; prospective external multi-site validation is in progress.",
      deploymentReadiness:
        "Validation phase. Available as a clinical decision-support aid, not for autonomous use.",
      limitations:
        "Derived from Mayo Clinic data and not yet characterized across all populations or revisional surgery contexts.",
      relatedPublications: ["mosi-novel-classification-2026"],
    },
  },
  {
    slug: "siris",
    name: "SIRIS",
    longName: "Surgical-IRIS Education",
    tagline: "AI-powered surgical patient education built on Mayo Clinic's IRIS platform.",
    description:
      "SIRIS helps patients ask specialty-focused education questions, review Mayo Clinic resources, and prepare questions for their care team — bridging the information gap between booking and operation.",
    status: "deployed",
    phases: ["patient-journey"],
    liveUrl: "https://siris-1029209978489.us-central1.run.app",
    team: ["reza-shahriarirad"],
    collaborators: ["mayo-clinic-mars"],
    featured: true,
    order: 2,
    lastUpdated: "2026-04-01",
    media: [
      {
        type: "placeholder",
        alt: "SIRIS annotated preview placeholder",
        caption: "Annotated video preview forthcoming",
      },
      {
        type: "placeholder",
        alt: "SIRIS demo thumbnail placeholder",
        caption: "Model output thumbnail forthcoming",
      },
    ],
    modelCard: {
      intendedUse:
        "Patient-facing education support for bariatric surgery preparation, question generation, and resource navigation.",
      clinicalPhase: "Patient journey and education",
      inputData: [
        "Natural language patient questions",
        "Procedure context",
        "Curated Mayo Clinic education resources",
      ],
      output: [
        "Educational response",
        "Relevant resource links",
        "Suggested follow-up questions for the care team",
      ],
      modelPipeline:
        "Retrieval-augmented education workflow built around Mayo Clinic IRIS resources and surgical scope guardrails.",
      validationStatus:
        "Deployed with formal clinical evaluation and user-satisfaction study design in progress.",
      deploymentReadiness:
        "Public education deployment. Not a diagnostic tool and not a replacement for clinician consultation.",
      limitations:
        "Current scope is bariatric surgery education, English-language interactions, and non-urgent preparation questions.",
      relatedPublications: ["bariatric-patient-education-2026"],
    },
  },
  {
    slug: "gonogonet",
    name: "GoNoGoNet",
    longName: "AI-guided Go/No-Go surgical safety zone detection",
    tagline:
      "Computer vision for surgical dissection safety-zone recognition and intraoperative decision support research.",
    description:
      "Computer vision model for identifying surgical dissection safety zones and supporting intraoperative decision-making.",
    status: "validation",
    phases: ["intra-op-intelligence"],
    liveUrl: "",
    team: ["simon-laplante", "hojjat-salehinejad", "reza-shahriarirad", "abdulrahman-alomar"],
    collaborators: ["mayo-clinic-mars", "surgical-ai2-lab", "sara-lab"],
    featured: true,
    order: 3,
    lastUpdated: "2026-05-20",
    media: [
      {
        type: "image",
        src: "/projects/media/gonogonet-demo.avif",
        alt: "GoNoGoNet demo preview",
        caption: "GoNoGoNet surgical computer vision demo preview",
      },
      {
        type: "placeholder",
        alt: "GoNoGoNet demo GIF placeholder",
        caption: "Demo GIF forthcoming",
      },
      {
        type: "placeholder",
        alt: "GoNoGoNet annotated video preview placeholder",
        caption: "Annotated video preview forthcoming",
      },
      {
        type: "placeholder",
        alt: "GoNoGoNet model output thumbnail placeholder",
        caption: "Model output thumbnail forthcoming",
      },
    ],
    modelCard: {
      intendedUse:
        "Research decision-support for identifying laparoscopic dissection regions that may represent Go and No-Go safety zones. Advisory only; it is not a replacement for surgeon judgment.",
      clinicalPhase: "Intraoperative surgical guidance and education",
      inputData: ["Laparoscopic or operative video frames", "Procedure context for cholecystectomy-oriented validation workflows"],
      output: ["Safety-zone / Go-No-Go visual guidance", "Pixel-level or heatmap-style model output for review"],
      modelPipeline:
        "Surgical computer vision and semantic segmentation workflow for safety-zone recognition in laparoscopic cholecystectomy contexts.",
      validationStatus:
        "Published retrospective and experimental validation records are linked; broader translational validation and generalizability testing remain required.",
      deploymentReadiness:
        "Research and validation phase. Not designed for autonomous clinical decision-making.",
      limitations:
        "Requires careful validation across datasets, institutions, surgeons, anatomy, case complexity, and real-time operating room constraints.",
      relatedPublications: [
        "gonogonet-validation-laparoscopic-cholecystectomy-2023",
        "gonogonet-high-risk-behaviors-cholecystectomy-2023",
      ],
    },
  },
];
