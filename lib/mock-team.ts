/**
 * Placeholder team data — Step 4 will move these to MDX profiles
 * in content/team/ with real photos.
 * Drop headshots into public/team/ and update avatarSrc accordingly.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

export const mockTeam: TeamMember[] = [
  {
    id: "simon-laplante",
    name: "Simon Laplante",
    role: "Principal Investigator",
    avatarSrc: undefined,
  },
  {
    id: "hojjat-salehinejad",
    name: "Hojjat Salehinejad",
    role: "Research Scientist — MOSI Lead",
    avatarSrc: undefined,
  },
  {
    id: "reza-shahriarirad",
    name: "Reza Shahriarirad",
    role: "Research Engineer — SIRIS Lead",
    avatarSrc: undefined,
  },
  {
    id: "abdulrahman-alomar",
    name: "Abdulrahman Alomar",
    role: "Research Associate",
    avatarSrc: undefined,
  },
  {
    id: "intekhab-hossain",
    name: "Intekhab Hossain",
    role: "Research Associate",
    avatarSrc: undefined,
  },
  {
    id: "amin-madani",
    name: "Amin Madani",
    role: "Collaborator — Mayo Clinic Surgery",
    avatarSrc: undefined,
  },
  {
    id: "omar-ghanem",
    name: "Omar Ghanem",
    role: "Collaborator — Bariatric Surgery",
    avatarSrc: undefined,
  },
];
