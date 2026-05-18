export type ProjectStatus = "concept" | "development" | "validation" | "clinical" | "deployed";
export type SurgicalPhase =
  | "risk-stratification"
  | "intra-op-intelligence"
  | "patient-journey"
  | "outcomes-validation";

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
  modelCard: ProjectModelCard;
  // TODO Step 5: approach, results, roadmap, demo content
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
];
