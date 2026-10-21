import { Star } from "lucide-react";
import type { Review } from "@/content/reviews";

function Rating({ rating }: { rating: number }) {
  return (
    <p
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={15}
          strokeWidth={2}
          aria-hidden
          style={{
            fill: value <= rating ? "currentColor" : "transparent",
            opacity: value <= rating ? 1 : 0.35,
          }}
        />
      ))}
    </p>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const isPolaroid = review.shape === "polaroid";

  return (
    // Re-declaring the palette on the card lets every colour come from the
    // audited tokens in globals.css (ink, muted, line, accent) instead of
    // hand-copied hexes, so review text can never drift out of contrast.
    <article
      data-theme={review.palette}
      className={`relative mb-6 break-inside-avoid rounded-2xl border-2 border-[var(--ink)] bg-[var(--bg)] p-5 text-[var(--ink)] sm:p-6 ${
        isPolaroid ? "polaroid" : "ticket"
      }`}
      style={{
        transform: `rotate(${review.rotate})`,
        boxShadow: "4px 4px 0 var(--ink)",
      }}
    >
      <Rating rating={review.rating} />

      <blockquote className="mt-3.5 text-sm leading-relaxed sm:text-base">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <div className="ticket-perforation my-4" aria-hidden />

      <footer className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-lg font-bold tracking-tight">
          {review.alias}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          {review.dateLabel}
        </p>
      </footer>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="sticker rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-accent-ink">
          Submitted via WhatsApp
        </span>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          {review.occasion} · {review.city}
        </p>
      </div>
    </article>
  );
}

export function ReviewWall({ reviews }: { reviews: Review[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
