import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FlaskConical,
  Home,
  Newspaper,
  UserPlus,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  sectionId?: string;
  dropdown?: {
    title: string;
    href: string;
    description: string;
  }[];
};

export const primaryNav: NavItem[] = [
  {
    title: "Projects",
    href: "/research",
    icon: FlaskConical,
    sectionId: "research",
    dropdown: [
      { title: "MOSI", href: "/projects/mosi", description: "Metabolic & Obesity Staging Index" },
      { title: "SIRIS", href: "/projects/siris", description: "Surgical-IRIS Education" },
      { title: "GoNoGoNet", href: "/projects/gonogonet", description: "Surgical safety zone detection" },
      { title: "All projects ->", href: "/research", description: "Browse the full research portfolio" },
    ],
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
    sectionId: "team",
    dropdown: [
      { title: "Core team", href: "/team#core", description: "Faculty, fellows, and engineers" },
      { title: "Collaborators", href: "/team#collaborators", description: "Institutional and external partners" },
      { title: "Full team ->", href: "/team", description: "Complete roster" },
    ],
  },
  {
    title: "News & Events",
    href: "/events",
    icon: Newspaper,
    sectionId: "events",
    dropdown: [
      { title: "Latest news", href: "/events#news", description: "Lab updates and press" },
      { title: "Upcoming events", href: "/events#upcoming", description: "Journal club, conferences, talks" },
      { title: "Publications", href: "/publications", description: "Peer-reviewed work" },
      { title: "All news & events ->", href: "/events", description: "Browse everything" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
    icon: UserPlus,
    sectionId: "contact",
  },
];

export const allNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  ...primaryNav,
  { title: "Publications", href: "/publications", icon: FileText },
];

export const sidebarNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  ...primaryNav,
  { title: "Publications", href: "/publications", icon: FileText },
];

export const footerNav = {
  navigate: [
    { title: "Projects", href: "/research" },
    { title: "Team", href: "/team" },
    { title: "News & Events", href: "/events" },
    { title: "Publications", href: "/publications" },
    { title: "Contact", href: "/contact" },
  ],
  connect: [
    {
      title: "Shared archive",
      href: "https://drive.google.com/drive/folders/14j7C__2NIsRNPPbnrschwiKW7UKv7uOu",
    },
    { title: "Contact", href: "/contact" },
    { title: "Journal Club", href: "/contact#journal-club" },
  ],
};
