import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import { THEMES } from "@/lib/themes";
import { URGENT_BOOKING_MESSAGE } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  alternates: canonical("/blog"),
  description:
    "Honest writing about companionship: what a first session is actually like, why hiring a companion isn't weird, and how to survive Indian wedding season with a plus-one.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <SectionHeading
          as="h1"
          eager
          eyebrow="The PlusOne blog"
          title={
            <>
              Stigma-breaking, <span className="mark">practical</span>, and
              occasionally blunt.
            </>
          }
          blurb="We write about the parts of companionship nobody explains — first sessions, family questions, and how to brief a plus-one properly."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ul className="border-t-2 border-ink">
          {posts.map((post, index) => {
            const palette = THEMES[post.palette];
            return (
              <Reveal as="li" key={post.slug} delay={index * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group grid gap-5 border-b-2 border-ink py-8 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-10 ${
                    index % 2 === 1 ? "sm:pl-10 lg:pl-20" : ""
                  }`}
                >
                  <span
                    className="hidden h-16 w-16 shrink-0 rounded-2xl border-2 sm:block"
                    style={{
                      backgroundColor: palette.bg,
                      borderColor: palette.ink,
                      boxShadow: `4px 4px 0 ${palette.ink}`,
                    }}
                    aria-hidden
                  />

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {post.category} · {formatPostDate(post.date)} ·{" "}
                      {post.readingTime}
                    </p>
                    <h2 className="mt-3 max-w-2xl font-display text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-muted">
                      {post.excerpt}
                    </p>
                  </div>

                  <span
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]"
                    aria-hidden
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <CtaBand
        eyebrow="Done reading?"
        title={<>Reading about it is the easy part.</>}
        blurb="Book an hour with someone and find out what it's actually like. Strictly platonic, fully refundable up to two hours before."
        message={URGENT_BOOKING_MESSAGE}
        secondaryHref="/book"
        secondaryLabel="Open the wizard"
      />
    </>
  );
}
