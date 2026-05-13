export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: "Segmentation",
    definition:
      "The process of delineating anatomical structures or regions of interest in medical images — a precondition for 3D planning and intra-operative guidance.",
  },
  {
    term: "Go/No-Go zones",
    definition:
      "Intra-operative safety boundaries computed by AI to flag regions where instrument entry carries elevated risk of injury to critical structures.",
  },
  {
    term: "Phase recognition",
    definition:
      "Automated identification of the current stage in a surgical procedure (e.g., dissection, clipping, extraction) from video, enabling context-aware assistance.",
  },
  {
    term: "Validation cohort",
    definition:
      "An independent patient dataset — geographically and temporally separate from training data — used to measure how well a model generalises to real-world use.",
  },
  {
    term: "TWL",
    definition:
      "Total Weight Loss (%) — a primary outcome metric in bariatric surgery research, representing weight lost as a fraction of total pre-operative body weight.",
  },
  {
    term: "BMI staging",
    definition:
      "Classification of patients by body mass index into bands that correlate with comorbidity burden and inform procedure selection in metabolic surgery.",
  },
  {
    term: "IRIS platform",
    definition:
      "Internal name for the Mayo Clinic surgical intelligence infrastructure that hosts AIST model endpoints and provides data governance for OR recordings.",
  },
  {
    term: "Decision support",
    definition:
      "AI-generated recommendations presented to a clinician at decision points — always advisory, never autonomous. The clinician retains full authority.",
  },
  {
    term: "Derivation cohort",
    definition:
      "The patient dataset used to build and tune a predictive model; distinguished from the validation cohort to assess true generalisability.",
  },
  {
    term: "Intra-operative",
    definition:
      "Occurring during the surgical procedure itself — the period between incision and wound closure when real-time AI assistance is most time-critical.",
  },
];
