export function mailtoHref({
  to,
  subject,
  cc,
  body,
}: {
  to: string;
  subject: string;
  cc?: string;
  body?: string;
}): string {
  const parts: string[] = [`subject=${encodeURIComponent(subject)}`];
  if (cc) parts.push(`cc=${encodeURIComponent(cc)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}?${parts.join("&")}`;
}
