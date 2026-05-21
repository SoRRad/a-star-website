"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FALLBACK_EMAIL = "shahriarirad.reza@mayo.edu";

type FormState = {
  name: string;
  email: string;
  institution: string;
  roleTitle: string;
  collaborationType: string;
  clinicalArea: string;
  projectIdea: string;
  datasetType: string;
  irbStatus: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  institution: "",
  roleTitle: "",
  collaborationType: "",
  clinicalArea: "",
  projectIdea: "",
  datasetType: "",
  irbStatus: "",
  timeline: "",
  message: "",
};

export function ProjectIntakeForm() {
  const [values, setValues] = React.useState<FormState>(initialState);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState<"sent" | "development" | null>(null);

  const update = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const message = [
      values.projectIdea ? `Project idea: ${values.projectIdea}` : "",
      values.timeline ? `Timeline: ${values.timeline}` : "",
      values.message ? `Additional message: ${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          inquiryType: "research-collaboration",
          message: message || "Project intake collaboration request.",
        }),
      });

      if (!response.ok) {
        const json = (await response.json().catch(() => ({}))) as { error?: string };
        setError(json.error ?? "Project intake could not be submitted. Please email the lab directly.");
        return;
      }

      const json = (await response.json().catch(() => ({}))) as { mode?: "development" };
      setSubmitted(json.mode === "development" ? "development" : "sent");
      setValues(initialState);
    } catch {
      setError("Network error. Please email the lab directly if the form does not submit.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-[var(--color-status-deployed)]" />
          <h3 className="font-display text-xl font-semibold tracking-normal">
            {submitted === "development" ? "Intake accepted locally." : "Intake submitted."}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {submitted === "development"
            ? "Email delivery is not configured, so the entry was logged server-side. For a guaranteed follow-up, email "
            : "Thank you. For urgent follow-up, email "}
          <a href={`mailto:${FALLBACK_EMAIL}`} className="text-[var(--color-accent)] hover:underline">
            {FALLBACK_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input value={values.name} onChange={update("name")} required className={inputClass()} />
        </Field>
        <Field label="Email" required>
          <input value={values.email} onChange={update("email")} type="email" required className={inputClass()} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Institution">
          <input value={values.institution} onChange={update("institution")} className={inputClass()} />
        </Field>
        <Field label="Role/title">
          <input value={values.roleTitle} onChange={update("roleTitle")} className={inputClass()} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Collaboration type" required>
          <select value={values.collaborationType} onChange={update("collaborationType")} required className={inputClass()}>
            <option value="">Select type...</option>
            <option>Clinical study</option>
            <option>Dataset collaboration</option>
            <option>Technical co-development</option>
            <option>Validation site</option>
            <option>Education / journal club</option>
          </select>
        </Field>
        <Field label="Clinical area">
          <input
            value={values.clinicalArea}
            onChange={update("clinicalArea")}
            placeholder="e.g. bariatric, robotic, abdominal wall"
            className={inputClass()}
          />
        </Field>
      </div>

      <Field label="Project idea" required>
        <textarea
          value={values.projectIdea}
          onChange={update("projectIdea")}
          required
          rows={4}
          placeholder="Briefly describe the question, tool, or validation need."
          className={cn(inputClass(), "resize-y")}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Dataset type">
          <select value={values.datasetType} onChange={update("datasetType")} className={inputClass()}>
            <option value="">Select...</option>
            <option>Clinical records</option>
            <option>Surgical video</option>
            <option>Medical imaging</option>
            <option>Wearables/sensors</option>
            <option>Multimodal</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="IRB status">
          <select value={values.irbStatus} onChange={update("irbStatus")} className={inputClass()}>
            <option value="">Select...</option>
            <option>Not started</option>
            <option>In preparation</option>
            <option>Submitted</option>
            <option>Approved</option>
            <option>Not applicable</option>
          </select>
        </Field>
        <Field label="Timeline">
          <select value={values.timeline} onChange={update("timeline")} className={inputClass()}>
            <option value="">Select...</option>
            <option>Exploratory</option>
            <option>0-3 months</option>
            <option>3-6 months</option>
            <option>6-12 months</option>
            <option>12+ months</option>
          </select>
        </Field>
      </div>

      <Field label="Message">
        <textarea
          value={values.message}
          onChange={update("message")}
          rows={4}
          placeholder="Anything else the team should know?"
          className={cn(inputClass(), "resize-y")}
        />
      </Field>

      {error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-500">
          {error}{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`} className="font-medium underline">
            {FALLBACK_EMAIL}
          </a>
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit project intake"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--color-accent)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function inputClass() {
  return "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30";
}
