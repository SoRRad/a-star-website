import { permanentRedirect } from "next/navigation";

export const metadata = { title: "Projects" };

/**
 * Canonical projects/research page: /research.
 * /projects is retained as a permanent redirect for old bookmarks and links.
 */
export default function ProjectsPage() {
  permanentRedirect("/research");
}
