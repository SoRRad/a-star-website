import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  FileText,
  Newspaper,
  Calendar,
  Library,
  UserPlus,
  Mail,
  Compass,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** Section id on the home page for smart anchor scrolling */
  sectionId?: string;
};

/**
 * Primary navigation shown in the header.
 * Home is rendered through the header logo mark.
 * Publications is accessible under the Projects dropdown and via /publications.
 * Archive is renamed to Resources (/resources).
 */
export const primaryNav: NavItem[] = [
  { title: "Projects", href: "/research", icon: Compass, sectionId: "research" },
  { title: "Team", href: "/team", icon: Users, sectionId: "team" },
  { title: "Events", href: "/events", icon: Calendar, sectionId: "events" },
  { title: "News", href: "/news", icon: Newspaper, sectionId: "news" },
  { title: "Resources", href: "/resources", icon: Library, sectionId: "resources" },
  { title: "Join", href: "/join", icon: UserPlus, sectionId: "join" },
];

/**
 * Full navigation — used in command palette, mobile nav, sitemap.
 * Contact links to /contact (not mailto) so it appears correctly in the sitemap.
 */
export const allNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Projects", href: "/research", icon: Compass },
  { title: "Team", href: "/team", icon: Users },
  { title: "Events", href: "/events", icon: Calendar },
  { title: "News", href: "/news", icon: Newspaper },
  { title: "Resources", href: "/resources", icon: Library },
  { title: "Publications", href: "/publications", icon: FileText },
  { title: "Join Us", href: "/join", icon: UserPlus },
  { title: "Contact", href: "/contact", icon: Mail },
];

export const sidebarNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Projects", href: "/research", icon: Compass },
  { title: "Team", href: "/team", icon: Users },
  { title: "Events", href: "/events", icon: Calendar },
  { title: "Contact", href: "/contact", icon: Mail },
];

export const footerNav = {
  research: [
    { title: "Projects", href: "/research" },
    { title: "Publications", href: "/publications" },
    { title: "Resources", href: "/resources" },
  ],
  lab: [
    { title: "Team", href: "/team" },
    { title: "News", href: "/news" },
    { title: "Events", href: "/events" },
  ],
  connect: [
    { title: "Join Us", href: "/join" },
    { title: "Contact", href: "/contact" },
  ],
};
