import type { LabEvent } from "./events";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function formatIcsDate(iso: string): string {
  const d = new Date(iso + "T18:00:00Z");
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function canGenerateIcs(event: LabEvent): boolean {
  return event.status !== "tbd" && ISO_DATE_PATTERN.test(event.date);
}

export function generateIcsContent(event: LabEvent): string {
  if (!canGenerateIcs(event)) {
    throw new Error(`Cannot generate calendar content for undated event: ${event.slug}`);
  }

  const dtstart = formatIcsDate(event.date);
  const dtend = formatIcsDate(event.endDate ?? event.date);
  const uid = `${event.slug}@astar-lab`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//A-STAR Lab//A-STAR Events//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location ?? "TBD"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(event: LabEvent): void {
  const content = generateIcsContent(event);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.slug}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
