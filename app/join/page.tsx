import { permanentRedirect } from "next/navigation";

export const metadata = { title: "Contact" };

export default function JoinPage() {
  permanentRedirect("/contact#collaborate");
}
