"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircle, RotateCcw } from "lucide-react";
import { URGENT_BOOKING_MESSAGE, whatsappLink } from "@/lib/site";

/**
 * Route-level error boundary. Keeps the site's escape hatch open: even if a
 * screen crashes, "book on WhatsApp" still works, because that hand-off is a
 * plain link and never depends on our own data loading.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Error — something broke
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
        That page <span className="mark">tripped over itself</span>.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        This is on us, not you. Try again — or skip the site entirely and book
        directly on WhatsApp.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-accent">
          <RotateCcw size={18} aria-hidden />
          Try again
        </button>
        <a
          href={whatsappLink(URGENT_BOOKING_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <MessageCircle size={18} aria-hidden />
          Book on WhatsApp
        </a>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>

      {error.digest ? (
        <p className="mt-8 font-mono text-xs text-muted">
          Reference: {error.digest}
        </p>
      ) : null}
    </section>
  );
}
