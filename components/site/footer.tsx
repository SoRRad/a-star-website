import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footerNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/10 bg-black/25 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr_0.7fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo variant="mark" sizes="42px" width={42} height={42} className="h-10 w-10" />
              <span>
                <span className="font-display block text-2xl leading-none font-semibold tracking-tight">
                  A-STAR
                </span>
                <span className="mt-1 block text-xs font-medium tracking-widest text-white/50 uppercase">
                  Surgical AI Lab
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              AI in Surgical Technology &amp; Augmentation Research develops surgical AI systems for
              planning, guidance, education, and validation.
            </p>
            <p className="mt-4 flex max-w-md items-start gap-2 text-sm leading-relaxed text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#64B5F6]" />
              <span>Mayo Clinic, Rochester, Minnesota</span>
            </p>
            <a
              href="mailto:shahriarirad.reza@mayo.edu"
              className="mt-3 inline-flex items-center gap-2 text-sm text-[#64B5F6] hover:underline"
            >
              <Mail className="h-4 w-4" />
              shahriarirad.reza@mayo.edu
            </a>
          </div>

          <FooterColumn title="Navigate" items={footerNav.navigate} />
          <FooterColumn title="Connect" items={footerNav.connect} />
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} A-STAR Lab.</p>
            <p className="font-mono">Built for surgical AI research and collaboration.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            {item.href.startsWith("http") ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.title}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
