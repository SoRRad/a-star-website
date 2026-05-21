export const gonogonetContent = {
  problem:
    "In laparoscopic cholecystectomy and related biliary surgery, adverse events can arise when visual perception and surgical judgment are challenged by anatomy, inflammation, case complexity, or limited operative exposure. A research-grade computer vision system must support safer interpretation without overstepping the surgeon's authority.",
  clinicalNeed:
    "GoNoGoNet addresses the need for interpretable surgical AI that can highlight potential Go and No-Go dissection regions for education, review, and future intraoperative decision support. The translational goal is to study whether safety-zone recognition can support consistent teaching, coaching, and validation of surgical behavior.",
  dataSources:
    "The linked publication records describe laparoscopic cholecystectomy video-frame workflows and expert annotation or comparison processes. Additional A-STAR implementation details, datasets, governance, and validation cohorts should be confirmed before describing any local deployment or prospective clinical use.",
  methods:
    "The project is framed as surgical computer vision using semantic segmentation and safety-zone recognition. Outputs may be displayed as pixel-level masks or heatmap-style guidance to help review regions that are likely safe or unsafe for dissection.",
  validationPlan:
    "Validation should remain staged: retrospective comparison with expert annotations, external dataset testing, human-factors review, prospective feasibility work, and careful assessment of generalizability across surgeons, institutions, imaging conditions, and case complexity.",
  currentStatus:
    "GoNoGoNet is listed as an active validation-stage research project. It is not positioned as autonomous clinical decision-making software, and any clinical use would require appropriate validation, governance, and institutional approval.",
};
