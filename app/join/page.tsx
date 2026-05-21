import { redirect } from "next/navigation";

export const metadata = { title: "Contact" };

export default function JoinPage() {
  redirect("/contact#collaborate");
}
