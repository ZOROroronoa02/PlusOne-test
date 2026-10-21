import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { NAV_LINKS } from "@/content/nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  SITE,
  URGENT_BOOKING_MESSAGE,
  whatsappLink,
} from "@/lib/site";

const LEGAL_LINKS = [
  { href: "/trust", label: "Ground Rules" },
  { href: "/trust#privacy", label: "Privacy" },
  { href: "/trust#refunds", label: "Refunds" },
  { href: "/trust#terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-tight">
            PlusOne<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            {SITE.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink(URGENT_BOOKING_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <MessageCircle size={16} aria-hidden />
              Book on WhatsApp
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink"
              aria-label="PlusOne on Instagram"
            >
              <Instagram size={18} aria-hidden />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink"
              aria-label="Email PlusOne"
            >
              <Mail size={18} aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <Link href="/book" className="font-bold hover:text-accent">
                Book a Companion
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            The fine print
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            Palette
          </h2>
          <ThemeSwitcher className="mt-4" />
        </div>
      </div>

      <div className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[11px] uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.name} — strictly platonic, always.
          </p>
          <p>Delhi NCR · Online worldwide</p>
        </div>
      </div>
    </footer>
  );
}
