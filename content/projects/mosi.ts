export const mosiContent = {
  problem: `Bariatric surgery decisions are made with substantial inter-surgeon variation. There is no validated, quantitative staging system that integrates BMI, comorbidity severity, and predicted weight-loss outcomes into a single actionable score — leaving patients under-staged or over-treated based on institutional custom rather than evidence.`,

  clinicalNeed: `Over 250,000 bariatric procedures are performed annually in North America. Procedure selection (sleeve gastrectomy vs. Roux-en-Y gastric bypass vs. revisional surgery) significantly impacts total weight loss and comorbidity resolution. A validated decision-support tool that stratifies patients objectively can reduce variation, improve outcomes, and standardise audit-ready documentation.`,

  dataSources: `Derivation cohort: 3,097 patients who underwent primary bariatric surgery at Mayo Clinic, Rochester, MN (2010–2022). Prospective validation cohort: multi-institutional, external, currently enrolling. Data include: pre-operative BMI, HbA1c, blood pressure, comorbidity index, procedure type, and 12-month post-operative total weight loss (TWL%).`,

  methods: `MOSI assigns patients a composite score across four domains: (1) BMI stage (WHO classification adjusted for metabolic risk), (2) comorbidity burden (Charlson score weighted for metabolic-specific conditions), (3) predicted TWL tier (derived from a validated regression model), and (4) surgical complexity adjustment. The algorithm runs on a web-based calculator with exportable clinical reports. The staging system achieved 100% algorithm accuracy on the derivation cohort and is currently undergoing prospective external validation.`,

  validationPlan: `A prospective, multi-site external validation study is ongoing across three Mayo Clinic campuses (Rochester, Phoenix, Jacksonville). Primary endpoint: concordance between MOSI-recommended procedure and surgeon decision. Secondary endpoints: 12-month TWL%, comorbidity resolution rates, and readmission within 30 days. Target n = 800 patients. IRB approval obtained.`,

  currentStatus: `MOSI is in prospective external validation (multi-site). The web tool is live and accessible to clinicians. The derivation paper was published in Surgery for Obesity and Related Diseases (SOARD) in 2026. A validation-cohort manuscript is in preparation.`,

  modelCard: {
    intendedUse: "Pre-operative decision support for bariatric surgery candidate evaluation. Advisory only — the attending surgeon retains clinical authority.",
    inputs: ["BMI (kg/m²)", "Comorbidity list (HTN, T2DM, OSA, GERD, dyslipidaemia)", "Charlson Comorbidity Index", "Prior bariatric procedures"],
    outputs: ["MOSI stage (I–IV)", "Recommended procedure category", "Predicted TWL tier (low / moderate / high)", "Clinical audit report (PDF export)"],
    performanceMetrics: "100% algorithm accuracy on 3,097-patient derivation cohort. External validation ongoing.",
    datasetSize: "3,097 patients (derivation); prospective external validation cohort enrolling (target n=800)",
    validationStatus: "Prospective external multi-site validation in progress",
    limitations: "Single-institution derivation cohort. Performance in non-North-American populations not yet characterised. Not validated for revisional bariatric surgery.",
    deploymentReadiness: "Validation phase — available to clinicians as a decision-support aid, not yet cleared for autonomous use.",
  },
};
