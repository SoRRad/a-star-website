import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Compass,
  Home,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** Section id on the home page for smart anchor scrolling. */
  sectionId?: string;
};

export const primaryNav: NavItem[] = [
  { title: "Projects", href: "/research", icon: Compass, sectionId: "research" },
  { title: "Team", href: "/team", icon: Users, sectionId: "team" },
  { title: "News & Events", href: "/events", icon: Calendar, sectionId: "events" },
  { title: "Contact", href: "/contact", icon: Mail, sectionId: "contact" },
];

export const allNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Projects", href: "/research", icon: Compass },
  { title: "Team", href: "/team", icon: Users },
  { title: "News & Events", href: "/events", icon: Newspaper },
  { title: "Contact", href: "/contact", icon: Mail },
];

export const sidebarNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Projects", href: "/research", icon: Compass },
  { title: "Team", href: "/team", icon: Users },
  { title: "News & Events", href: "/events", icon: Calendar },
  { title: "Contact", href: "/contact", icon: Mail },
];

export const footerNav = {
  navigate: [
    { title: "Projects", href: "/research" },
    { title: "Team", href: "/team" },
    { title: "News & Events", href: "/events" },
    { title: "Contact", href: "/contact" },
  ],
  connect: [
    { title: "Shared archive", href: "https://drive.google.com/drive/folders/14j7C__2NIsRNPPbnrschwiKW7UKv7uOu" },
    { title: "Contact", href: "/contact" },
    { title: "Journal Club", href: "/contact#journal-club" },
  ],
};
