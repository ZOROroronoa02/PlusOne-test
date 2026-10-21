import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { whatsappLink } from "@/lib/site";

/**
 * Every page ends on a visible CTA. Primary always opens WhatsApp with a
 * pre-filled message so there is never a dead end.
 */
export function CtaBand({
  title,
  blurb,
  message,
  primaryLabel = "Book on WhatsApp",
  secondaryHref,
  secondaryLabel,
  eyebrow,
}: {
  title: ReactNode;
  blurb: ReactNode;
  message: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-t-2 border-ink bg-accent text-accent-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-widest opacity-80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 max-w-3xl font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg opacity-90">{blurb}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-ink bg-ink text-bg"
            >
              <MessageCircle size={18} aria-hidden />
              {primaryLabel}
            </a>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="btn btn-ghost border-ink text-accent-ink"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
