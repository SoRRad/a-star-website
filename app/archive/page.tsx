import type { Metadata } from "next";
import { archiveItems } from "@/lib/archive";
import { ArchiveClientPage } from "@/components/archive/archive-client";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Presentations, recorded webinars, journal club sessions, and documents from the AIST Lab.",
};

export default function ArchivePage() {
  return <ArchiveClientPage items={archiveItems} />;
}
