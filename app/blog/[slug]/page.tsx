import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import {
  formatPostDate,
  getAllPosts,
  getPostMeta,
  getPostSlugs,
  postShareLink,
  renderPostBody,
} from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return { title: "Post not found" };

  const url = `${SITE.url}/blog/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      section: meta.category,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) notFound();

  const body = await renderPostBody(slug);
  const related = getAllPosts()
    .filter((post) => post.slug !== meta.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(meta)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: meta.title, path: `/blog/${meta.slug}` },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-accent"
        >
          <ArrowLeft size={14} aria-hidden />
          All posts
        </Link>

        <header className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {meta.category} · {formatPostDate(meta.date)} · {meta.readingTime}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg text-muted">{meta.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-8 border-t-2 border-ink pt-2 text-base">{body}</div>

        <div className="mt-14 rounded-3xl border-2 border-ink bg-panel p-6 text-panel-ink sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Convinced enough to try an hour?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Pick the occasion, the date and the hours — we&apos;ll confirm a
            verified, strictly-platonic companion in one WhatsApp message.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-accent">
              Book a companion
            </Link>
            <a
              href={postShareLink(meta)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-panel-ink bg-panel-ink text-panel"
            >
              <MessageCircle size={16} aria-hidden />
              Ask about this
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Read next
          </h2>
          <ul className="mt-6 border-t-2 border-ink">
            {related.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={index * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block border-b-2 border-ink py-6"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {post.category} · {post.readingTime}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight hover:text-accent sm:text-2xl">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
