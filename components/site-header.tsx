"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { NAV_LINKS } from "@/content/nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { URGENT_BOOKING_MESSAGE, whatsappLink } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight sm:text-2xl"
          aria-label="PlusOne home"
        >
          PlusOne<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher className="hidden sm:flex" />
          <a
            href={whatsappLink(URGENT_BOOKING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn hidden !px-4 !py-2 text-sm md:inline-flex"
          >
            <MessageCircle size={16} aria-hidden />
            Book on WhatsApp
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-ink/40 lg:hidden"
          />
          <div
            id="mobile-menu"
            className="relative z-50 border-t-2 border-ink bg-bg px-4 py-5 lg:hidden"
          >
          <ThemeSwitcher className="mb-5 sm:hidden" />
          <ul className="flex flex-col gap-4 font-display text-2xl font-semibold tracking-tight">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(URGENT_BOOKING_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-6 w-full"
          >
            <MessageCircle size={16} aria-hidden />
            Book on WhatsApp
            </a>
          </div>
        </>
      ) : null}
    </header>
  );
}
