import { redirect } from "next/navigation";

export const metadata = { title: "News & Events" };

export default function NewsPage() {
  redirect("/events");
}
