import Link from "next/link";
import { MapPin } from "lucide-react";
import { footerNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-white/10 bg-black/25 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.65fr_0.65fr_0.7fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo variant="mark" sizes="42px" width={42} height={42} className="h-10 w-10" />
              <span>
                <span className="font-display block text-2xl leading-none font-semibold tracking-normal">
                  A-STAR
                </span>
                <span className="mt-1 block text-xs font-medium tracking-widest text-white/50 uppercase">
                  Surgical AI Lab
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              AI in Surgical Technology &amp; Augmentation Research. Developing surgical AI for
              planning, guidance, education, and outcomes validation.
            </p>
            <p className="mt-4 flex max-w-sm items-start gap-2 text-sm leading-relaxed text-white/50">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64B5F6]" />
              <span>Mayo Clinic, Rochester, Minnesota</span>
            </p>
          </div>

          <FooterColumn title="Lab" items={footerNav.lab} />
          <FooterColumn title="Research" items={footerNav.research} />
          <FooterColumn title="Connect" items={footerNav.connect} />
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col items-start justify-between gap-4 text-xs text-white/40 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} A-STAR Lab. Mayo Clinic.</p>
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
            <Link
              href={item.href}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
