export function mailtoHref({
  to,
  subject,
  cc,
}: {
  to: string;
  subject: string;
  cc?: string;
}): string {
  const parts: string[] = [`subject=${encodeURIComponent(subject)}`];
  if (cc) parts.push(`cc=${encodeURIComponent(cc)}`);
  return `mailto:${to}?${parts.join("&")}`;
}
