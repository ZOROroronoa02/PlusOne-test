"use client";

import { useState } from "react";
import { Globe2, IndianRupee } from "lucide-react";
import type { PriceGroup, PriceItem } from "@/content/pricing";
import { formatINRRange } from "@/lib/format";

type Currency = "INR" | "USD";

function PriceValue({
  item,
  currency,
}: {
  item: PriceItem;
  currency: Currency;
}) {
  if (currency === "USD" && item.priceUSD) {
    return (
      <p className="font-mono">
        <span className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {item.priceUSD}
        </span>
        <span className="ml-2 text-[11px] uppercase tracking-wider text-muted">
          {item.unit}
        </span>
      </p>
    );
  }

  return (
    <p className="font-mono">
      <span className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {formatINRRange(item.priceINR, item.priceMaxINR)}
      </span>
      <span className="ml-2 text-[11px] uppercase tracking-wider text-muted">
        {item.unit}
      </span>
      {item.priceUSD ? (
        <span className="mt-2 block text-[11px] uppercase tracking-wider text-muted">
          International · {item.priceUSD} {item.unit}
        </span>
      ) : null}
    </p>
  );
}

function PriceRows({
  items,
  currency,
}: {
  items: PriceItem[];
  currency: Currency;
}) {
  return (
    <ul className="mt-8 divide-y-2 divide-ink border-y-2 border-ink">
      {items.map((item) => (
        <li
          key={item.id}
          className="grid gap-4 py-7 sm:grid-cols-[1.5fr_1fr] sm:items-start sm:gap-10"
        >
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {item.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{item.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.perks.map((perk) => (
                <li
                  key={perk}
                  className="rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:text-right">
            <PriceValue item={item} currency={currency} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PricingTable({ groups }: { groups: PriceGroup[] }) {
  const [currency, setCurrency] = useState<Currency>("INR");

  const virtual = groups.find((group) => group.id === "virtual");
  const domestic = groups.filter((group) => group.id !== "virtual");

  return (
    <div>
      {/* Currency toggle ------------------------------------------------ */}
      <div className="flex flex-wrap items-center gap-4">
        <div
          role="radiogroup"
          aria-label="Currency"
          className="inline-flex rounded-full border-2 border-ink p-1"
        >
          {(
            [
              { value: "INR", label: "India (₹)", icon: IndianRupee },
              { value: "USD", label: "International ($)", icon: Globe2 },
            ] as const
          ).map((option) => {
            const active = currency === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setCurrency(option.value)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active ? "bg-ink text-bg" : "bg-transparent"
                }`}
              >
                <option.icon size={15} aria-hidden />
                {option.label}
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {currency === "INR"
            ? "All rates include the companion's time, nothing hidden"
            : "Card or PayPal · payouts handled per country"}
        </p>
      </div>

      {/* Virtual ------------------------------------------------------- */}
      {virtual ? (
        <section className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {virtual.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
            {virtual.title}
          </h2>
          {virtual.note ? (
            <p className="mt-4 max-w-2xl text-sm text-muted">{virtual.note}</p>
          ) : null}
          <PriceRows items={virtual.items} currency={currency} />
        </section>
      ) : null}

      {/* In-person / activities / bundles ------------------------------ */}
      {currency === "INR" ? (
        domestic.map((group) => (
          <section key={group.id} className="mt-16">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
              {group.title}
            </h2>
            {group.note ? (
              <p className="mt-4 max-w-2xl text-sm text-muted">{group.note}</p>
            ) : null}
            <PriceRows items={group.items} currency={currency} />
          </section>
        ))
      ) : (
        <section className="mt-16 rounded-3xl border-2 border-ink bg-panel p-7 text-panel-ink sm:p-10">
          <p className="font-mono text-xs uppercase tracking-widest opacity-70">
            Outside India?
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
            Virtual works worldwide. In-person is India-only — for now.
          </h2>
          <p className="mt-4 max-w-2xl text-sm opacity-85">
            Text, voice and video companionship is available in every time zone
            at the rates above. In-person bookings currently run across
            Ghaziabad, Noida and Delhi NCR, and new cities open as verified
            companions join.
          </p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest opacity-70">
            Switch back to India (₹) to see in-person, activity and bundle
            pricing.
          </p>
        </section>
      )}
    </div>
  );
}
