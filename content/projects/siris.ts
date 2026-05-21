export const sirisContent = {
  problem: `Patients scheduled for bariatric surgery receive a preparation packet and a brief consultation - but the information gap between booking and operation is substantial. Studies show patients retain less than 40% of clinician-provided preoperative education. Poor preparation correlates with higher perioperative anxiety, lower compliance with pre-surgical dietary protocols, and reduced long-term success rates.`,

  clinicalNeed: `AI-powered patient education can personalise content to a patient's specific procedure, comorbidities, and literacy level — something a static pamphlet cannot do. By integrating with the IRIS platform (Mayo Clinic's clinical AI infrastructure), SIRIS can surface institutional resources and answer procedure-specific questions with guardrails that prevent medical misadvice.`,

  dataSources: `SIRIS operates on Mayo Clinic's patient-facing education corpus (IRIS platform) plus a curated surgical procedure knowledge base. No identifiable patient data is retained by the system. Conversation logs (de-identified) inform prompt safety and accuracy audits.`,

  methods: `SIRIS is a retrieval-augmented generation (RAG) system built on Mayo Clinic's IRIS platform. Patients interact via a chat interface. The system routes queries through a surgical-procedure-specific context layer, retrieves relevant Mayo Clinic patient education articles, and generates responses calibrated to reading level and clinical safety boundaries. Hard stops prevent the system from providing diagnostic, dosing, or post-surgical complication guidance.`,

  validationPlan: "",

  currentStatus: `SIRIS is deployed and accessible via a public URL. The platform processes live patient queries. A user-satisfaction and information-retention study is in design phase. The patient education paper describing SIRIS was published in Surgical Endoscopy (2026).`,

  modelCard: {
    intendedUse: "Pre-operative patient education for bariatric surgery candidates. Answers procedure-specific questions, helps patients prepare for their visit, and surfaces relevant Mayo Clinic resources.",
    inputs: ["Natural language patient question", "Procedure context (sleeve / bypass / revisional)", "Opted-in patient profile (optional)"],
    outputs: ["Natural language educational response", "Cited Mayo Clinic resource links", "Follow-up question suggestions"],
    performanceMetrics: "User acceptance testing ongoing. Accuracy audit against Mayo Clinic clinical team: in progress.",
    datasetSize: "Mayo Clinic IRIS education corpus (1,000+ articles). No patient-identifiable training data.",
    validationStatus: "Deployed; formal clinical evaluation study in design",
    limitations: "Not a diagnostic tool. Does not replace clinician consultation. English only at current deployment. Limited to bariatric surgery scope.",
    deploymentReadiness: "Deployed (public-access web app)",
  },
};
