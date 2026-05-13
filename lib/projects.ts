export type ProjectStatus = "concept" | "development" | "validation" | "clinical" | "deployed";

export interface Project {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  phases: string[];
  lead?: string;
}

export const projects: Project[] = [
  {
    id: "mosi",
    name: "MOSI",
    fullName: "Metabolic & Obesity Surgery Intelligence",
    tagline: "Stratifying risk before the patient ever enters the OR.",
    description:
      "A clinical decision-support system that integrates pre-operative patient data — BMI trajectory, comorbidity burden, lab values, and imaging — to predict surgical risk, expected outcomes, and optimal timing for metabolic and bariatric procedures.",
    status: "validation",
    phases: ["pre", "post", "validation"],
    lead: "Hojjat Salehinejad",
  },
  {
    id: "siris",
    name: "SIRIS",
    fullName: "Surgical Intelligence & Recognition in Interventional Scenes",
    tagline: "Understanding what is happening at every moment in the OR.",
    description:
      "A computer vision platform for real-time surgical phase recognition, instrument detection, and anatomical landmark identification. Built on transformer-based video models trained across procedure types.",
    status: "development",
    phases: ["intra", "post"],
    lead: "Reza Shahriarirad",
  },
];
