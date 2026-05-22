"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type JournalClubFormState = {
  name: string;
  email: string;
  affiliation: string;
  role: string;
  sessionInterest: string;
  message: string;
};

const initialState: JournalClubFormState = {
  name: "",
  email: "",
  affiliation: "",
  role: "",
  sessionInterest: "",
  message: "",
};

export function JournalClubForm() {
  const [values, setValues] = React.useState<JournalClubFormState>(initialState);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const update = (field: keyof JournalClubFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (values.name.trim().length < 2) {
      setError("Name is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (values.message.trim().length < 10) {
      setError("Message must be at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "journal-club",
          name: values.name,
          email: values.email,
          affiliation: values.affiliation,
          role: values.role,
          sessionInterest: values.sessionInterest,
          message: values.message,
        }),
      });

      const json = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setError(
          json.error ??
            "Journal Club attendance could not be submitted. Please try again later.",
        );
        return;
      }

      if (json.success) {
        setValues(initialState);
        setSent(true);
        return;
      }

      setError("Submission failed. Please try again later.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h3 className="font-display text-xl font-semibold tracking-normal">Message sent.</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          Thank you. The A-STAR team will review your Journal Club request.
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
        <Field label="Affiliation">
          <input value={values.affiliation} onChange={update("affiliation")} className={inputClass()} />
        </Field>
        <Field label="Role">
          <input value={values.role} onChange={update("role")} className={inputClass()} />
        </Field>
      </div>
      <Field label="Session interest">
        <input
          value={values.sessionInterest}
          onChange={update("sessionInterest")}
          placeholder="Topic, month, or general attendance"
          className={inputClass()}
        />
      </Field>
      <Field label="Message" required>
        <textarea
          value={values.message}
          onChange={update("message")}
          rows={4}
          required
          placeholder="Briefly share your interest in attending Journal Club."
          className={cn(inputClass(), "resize-y")}
        />
      </Field>
      {error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-500">
          {error}
        </p>
      )}
      <Button type="submit" variant="accent" size="lg" disabled={submitting}>
        {submitting ? "Sending..." : "Submit Journal Club request"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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
