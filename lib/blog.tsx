import fs from "node:fs";
import path from "node:path";
import type { ComponentProps, ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { POSTS, type PostMeta } from "@/content/blog/posts";
import { whatsappLink } from "@/lib/site";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Typography for MDX bodies — no prose plugin, just design tokens. */
const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="mt-12 font-display text-2xl font-bold tracking-tight sm:text-3xl"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 {...props} className="mt-8 font-display text-xl font-bold tracking-tight" />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className="mt-5 leading-relaxed text-muted" />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="mt-5 list-disc space-y-2.5 pl-5" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className="mt-5 list-decimal space-y-2.5 pl-5" />
  ),
  li: (props: ComponentProps<"li">) => (
    <li {...props} className="leading-relaxed text-muted marker:text-accent" />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong {...props} className="font-bold text-ink" />
  ),
  em: (props: ComponentProps<"em">) => <em {...props} className="italic" />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="mt-8 border-l-4 border-accent pl-5 font-display text-xl font-bold leading-snug tracking-tight"
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr {...props} className="mt-12 border-t-2 border-ink" />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      {...props}
      className="font-bold text-ink underline decoration-accent decoration-2 underline-offset-4"
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      {...props}
      className="rounded bg-panel px-1.5 py-0.5 font-mono text-sm text-panel-ink"
    />
  ),
};

export function getAllPosts(): PostMeta[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

/** Compiles the MDX body for a slug. Server-only — reads from disk. */
export async function renderPostBody(slug: string): Promise<ReactElement> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content } = await compileMDX({ source, components: mdxComponents });
  return content;
}

export function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function postShareLink(meta: PostMeta): string {
  return whatsappLink(
    `Hi PlusOne 👋 I just read "${meta.title}" and I'd like to book a companion. Here's my plan:`,
  );
}
