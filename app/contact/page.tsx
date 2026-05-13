import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="eyebrow mb-4">Get in touch</p>
      <h1 className="font-display text-balance text-5xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
        Contact AIST.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)]">
        Research collaborations, media inquiries, and general questions welcome. A full contact form is coming in Step 6.
      </p>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/join" className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]">
          Open positions →
        </Link>
      </div>

      {/* Institutional home */}
      <div className="mt-16 border-t border-[var(--color-border)] pt-8">
        <p className="eyebrow mb-3">Institutional home</p>
        <address className="not-italic text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {siteConfig.institution.department}
          <br />
          {siteConfig.institution.name}
          <br />
          {siteConfig.institution.address}
        </address>
      </div>

      {/* Press kit */}
      <div className="mt-12 border-t border-[var(--color-border)] pt-8">
        <p className="eyebrow mb-3">Press kit</p>
        <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          Logos, headshots, and boilerplate for press inquiries.
        </p>
        <div className="flex flex-wrap gap-3">
          {/* TODO: add real assets to /public/press/ */}
          <a href="#" className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]">
            Logo pack (.zip)
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]">
            Team headshots (.zip)
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]">
            Boilerplate (.txt)
          </a>
        </div>
      </div>
    </section>
  );
}
