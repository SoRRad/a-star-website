import { permanentRedirect } from "next/navigation";

export const metadata = { title: "News & Events" };

export default function ResourcesPage() {
  permanentRedirect("/events");
}
