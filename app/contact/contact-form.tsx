"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INQUIRY_TYPES = [
  "general",
  "research-collaboration",
  "clinical-collaboration",
  "press",
  "position",
  "journal-club",
] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  institution: z.string().optional(),
  inquiryType: z.enum(INQUIRY_TYPES, { error: "Please select an inquiry type" }),
  clinicalArea: z.string().optional(),
  datasetType: z.string().optional(),
  irbStatus: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const INQUIRY_OPTIONS: { value: InquiryType; label: string }[] = [
  { value: "general", label: "General inquiry" },
  { value: "research-collaboration", label: "Research collaboration" },
  { value: "clinical-collaboration", label: "Clinical collaboration" },
  { value: "press", label: "Press / media" },
  { value: "position", label: "Position inquiry" },
  { value: "journal-club", label: "Journal Club RSVP" },
];

const DATASET_OPTIONS = [
  "Clinical records",
  "Surgical video",
  "Medical imaging",
  "Multi-modal",
  "Other",
];

const IRB_OPTIONS = [
  "Not yet started",
  "In progress",
  "Approved",
  "Not applicable",
];

const JOURNAL_CLUB_PLACEHOLDER =
  "Please add me to the AIST Journal Club distribution list. My background: [your role, institution]";

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetInquiry = searchParams.get("inquiry") as InquiryType | null;

  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: (INQUIRY_TYPES.includes(presetInquiry as InquiryType) ? presetInquiry : undefined) ?? undefined,
    },
  });

  const inquiryType = watch("inquiryType");
  const isCollaboration =
    inquiryType === "research-collaboration" || inquiryType === "clinical-collaboration";

  const onSubmit = async (data: FormValues) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError((json as { error?: string }).error ?? "Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-8 py-12">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--color-status-deployed)]" />
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Submission received in development mode.
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          Email delivery is being configured before public launch. For urgent inquiries,
          please email{" "}
          <a href="mailto:contact@aist-lab.org" className="text-[var(--color-accent)] hover:underline">
            contact@aist-lab.org
          </a>{" "}
          directly. In the meantime, explore our{" "}
          <Link href="/projects" className="text-[var(--color-accent)] hover:underline">projects</Link>{" "}
          or read our{" "}
          <Link href="/publications" className="text-[var(--color-accent)] hover:underline">publications</Link>.
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
            Where do these messages go right now?
          </summary>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
            Submissions are logged to the development server console only. Email forwarding will be
            configured via Resend before the site goes live. See <code>app/api/contact/route.ts</code> for
            the exact integration point.
          </p>
        </details>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} required>
          <input
            {...register("name")}
            type="text"
            placeholder="Your full name"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            placeholder="you@institution.edu"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      {/* Institution */}
      <Field label="Institution" error={errors.institution?.message}>
        <input
          {...register("institution")}
          type="text"
          placeholder="University / hospital / company"
          className={inputClass(false)}
        />
      </Field>

      {/* Inquiry type */}
      <Field label="Inquiry type" error={errors.inquiryType?.message} required>
        <select {...register("inquiryType")} className={inputClass(!!errors.inquiryType)}>
          <option value="">Select inquiry type…</option>
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </Field>

      {/* Conditional: clinical area (collaboration only) */}
      {isCollaboration && (
        <Field label="Clinical area" error={errors.clinicalArea?.message}>
          <input
            {...register("clinicalArea")}
            type="text"
            placeholder="e.g. bariatric surgery, colorectal, robotic general surgery"
            className={inputClass(!!errors.clinicalArea)}
          />
        </Field>
      )}

      {/* Conditional: dataset type + IRB status (collaboration only) */}
      {isCollaboration && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Dataset type" error={errors.datasetType?.message}>
            <select {...register("datasetType")} className={inputClass(false)}>
              <option value="">Select dataset type…</option>
              {DATASET_OPTIONS.map((opt) => (
                <option key={opt} value={opt.toLowerCase().replace(/ /g, "-")}>{opt}</option>
              ))}
            </select>
          </Field>
          <Field label="IRB status" error={errors.irbStatus?.message}>
            <select {...register("irbStatus")} className={inputClass(false)}>
              <option value="">Select IRB status…</option>
              {IRB_OPTIONS.map((opt) => (
                <option key={opt} value={opt.toLowerCase().replace(/ /g, "-")}>{opt}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {/* Message */}
      <Field label="Message" error={errors.message?.message} required>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={inquiryType === "journal-club" ? JOURNAL_CLUB_PLACEHOLDER : "Tell us about your question, project, or interest…"}
          className={cn(inputClass(!!errors.message), "resize-y")}
        />
      </Field>

      {serverError && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-500">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Sending…" : "Send message"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}

/* ── Helpers ── */

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-[var(--color-card)] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted-foreground)]",
    "focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30",
    hasError
      ? "border-red-500/60"
      : "border-[var(--color-border)] hover:border-[var(--color-accent)]/40",
  );
}
