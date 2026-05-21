export const gonogonetContent = {
  problem:
    "During laparoscopic cholecystectomy, safe progress depends on correctly interpreting operative anatomy, dissection planes, and regions where instrument entry may increase risk. Computer vision can help study those visual cues, but any system must remain bounded as research and validation support rather than autonomous guidance.",
  clinicalNeed:
    "GoNoGoNet focuses on Go/No-Go surgical safety zone recognition for education, review, and future decision-support research. The clinical need is a cautious, interpretable way to study safety-zone visualization in laparoscopic surgery while preserving surgeon judgment as the final authority.",
  dataSources:
    "The project is linked to published PubMed records involving laparoscopic cholecystectomy video-frame workflows and expert-informed validation. Local dataset details, governance, and prospective validation cohorts should be confirmed before describing deployment or clinical use.",
  methods:
    "The system is framed as surgical computer vision using segmentation and safety-zone recognition methods. Outputs may be shown as mask, overlay, or heatmap-style previews that help reviewers understand possible Go and No-Go regions in operative video.",
  validationPlan:
    "Validation should remain staged: retrospective comparison with expert annotations, external dataset testing, human-factors review, prospective feasibility work, and assessment of generalizability across surgeons, institutions, anatomy, imaging conditions, and case complexity.",
  currentStatus:
    "GoNoGoNet is listed as a validation-stage research project. It is not a replacement for surgeon judgment and is not described as autonomous clinical decision-making software.",
};
