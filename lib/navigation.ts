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
  navigate: [
    { title: "Projects", href: "/research" },
    { title: "Team", href: "/team" },
    { title: "News & Events", href: "/events" },
    { title: "Contact", href: "/contact" },
  ],
  connect: [
    { title: "Journal Club", href: "/contact#journal-club" },
  ],
};
