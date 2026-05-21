import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactEmail } from "@/lib/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  institution: z.string().optional(),
  roleTitle: z.string().optional(),
  affiliation: z.string().optional(),
  role: z.string().optional(),
  sessionInterest: z.string().optional(),
  inquiryType: z.enum([
    "general",
    "research-collaboration",
    "clinical-collaboration",
    "press",
    "position",
    "journal-club",
    "newsletter",
  ]),
  collaborationType: z.string().optional(),
  clinicalArea: z.string().optional(),
  projectIdea: z.string().optional(),
  datasetType: z.string().optional(),
  irbStatus: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || contactEmail;
  const subject = `[A-STAR Contact] ${data.inquiryType} — ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Institution: ${data.institution || "Not provided"}`,
    `Role/title: ${data.roleTitle || "Not provided"}`,
    `Affiliation: ${data.affiliation || "Not provided"}`,
    `Role: ${data.role || "Not provided"}`,
    `Session interest: ${data.sessionInterest || "Not provided"}`,
    `Inquiry type: ${data.inquiryType}`,
    `Collaboration type: ${data.collaborationType || "Not provided"}`,
    `Clinical area: ${data.clinicalArea || "Not provided"}`,
    `Project idea: ${data.projectIdea || "Not provided"}`,
    `Dataset type: ${data.datasetType || "Not provided"}`,
    `IRB status: ${data.irbStatus || "Not provided"}`,
    `Timeline: ${data.timeline || "Not provided"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  // TODO: Configure RESEND_API_KEY and CONTACT_FROM_EMAIL in production to enable email delivery.
  if (!resendApiKey || !fromEmail) {
    console.log("[contact form submission]", JSON.stringify(data, null, 2));
    const fallbackEmail =
      data.inquiryType === "journal-club" ? "alomar.abdulrahman@mayo.edu" : toEmail;
    return NextResponse.json(
      {
        success: true,
        message: "Submission received in development mode. Email delivery is not configured.",
        mode: "development",
        fallbackEmail,
      },
      { status: 200 },
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      text,
    });
  } catch (error) {
    console.error("[contact form email failed]", error);
    return NextResponse.json(
      { error: "Message could not be sent. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
