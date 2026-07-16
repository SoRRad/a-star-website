import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { primaryNav } from "@/lib/navigation";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6 lg:px-8">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-4 text-balance text-6xl tracking-normal sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg text-[var(--color-muted-foreground)]">
        The page you were looking for has moved, doesn&apos;t exist yet, or never did.
      </p>
      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
      <nav aria-label="Popular pages" className="mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-white/55 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[var(--color-accent)]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
