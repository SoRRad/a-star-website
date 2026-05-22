import type { LucideIcon } from "lucide-react";
import { FlaskConical, Home, Mail, Newspaper, Users } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  sectionId?: string;
};

export const primaryNav: NavItem[] = [
  {
    title: "Projects",
    href: "/research",
    icon: FlaskConical,
    sectionId: "research",
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
    sectionId: "team",
  },
  {
    title: "News & Events",
    href: "/events",
    icon: Newspaper,
    sectionId: "events",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    sectionId: "contact",
  },
];

export const allNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Projects", href: "/research", icon: FlaskConical },
  { title: "Team", href: "/team", icon: Users },
  { title: "News & Events", href: "/events", icon: Newspaper },
  { title: "Contact", href: "/contact", icon: Mail },
];

export const drawerNav: NavItem[] = allNav;

export const footerNav = {
  lab: [
    { title: "Home", href: "/" },
    { title: "Team", href: "/team" },
    { title: "News & Events", href: "/events" },
    { title: "Contact", href: "/contact" },
  ],
  research: [
    { title: "All Projects", href: "/research" },
    { title: "Surgical Planning", href: "/research#surgical-planning" },
    { title: "Intraoperative AI", href: "/research#intraoperative" },
    { title: "Outcomes Validation", href: "/research#outcomes" },
  ],
  connect: [
    { title: "General Inquiry", href: "/contact#general" },
    { title: "Journal Club", href: "/contact#journal-club" },
    { title: "Collaborate", href: "/contact#collaborate" },
    { title: "laplante.simon@mayo.edu", href: "mailto:laplante.simon@mayo.edu" },
  ],
};
