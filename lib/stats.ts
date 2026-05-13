/**
 * Lab statistics displayed in the "By the numbers" section.
 * Edit this file to update the figures — they feed directly into the
 * ScrambleCounter component on the home page.
 */

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

export const stats: Stat[] = [
  {
    value: 3097,
    label: "Patients",
    sublabel: "in derivation cohort",
  },
  {
    value: 12,
    label: "Publications",
    sublabel: "peer-reviewed",
  },
  {
    value: 2,
    label: "Active projects",
    sublabel: "MOSI & SIRIS",
  },
  {
    value: 2,
    label: "Institutions",
    sublabel: "collaborating",
  },
];
