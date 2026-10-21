import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "left",
  as: Tag = "h2",
  eager = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  blurb?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  eager?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      eager={eager}
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="mt-3 font-display text-section font-extrabold uppercase leading-[0.95] tracking-tight">
        {title}
      </Tag>
      {blurb ? <p className="mt-5 text-lg text-muted">{blurb}</p> : null}
    </Reveal>
  );
}
