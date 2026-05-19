import { redirect } from "next/navigation";

export const metadata = { title: "Projects" };

/** The main projects experience lives at /research. This page redirects so old links still resolve. */
export default function ProjectsPage() {
  redirect("/research");
}
