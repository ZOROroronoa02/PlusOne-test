import type { ThemeName } from "@/lib/themes";

export interface PostMeta {
  slug: string;
  title: string;
  /** used for <meta description>, cards and JSON-LD */
  description: string;
  /** ISO date, e.g. "2026-10-08" */
  date: string;
  readingTime: string;
  category: string;
  /** short teaser shown on the index */
  excerpt: string;
  tags: string[];
  /** palette the post card leans on */
  palette: ThemeName;
}

/**
 * Blog metadata lives here (single source of truth); the article bodies are
 * plain MDX files next to this file. Add a `PostMeta` entry and a matching
 * `<slug>.mdx` to publish — nothing else to wire up.
 */
export const POSTS: PostMeta[] = [
  {
    slug: "what-actually-happens-in-a-first-session",
    title: "What actually happens in a first session",
    description:
      "A minute-by-minute look at a first PlusOne booking — where you meet, what the companion says first, how the conversation goes, and how it ends. No mystery, no surprises.",
    date: "2026-09-12",
    readingTime: "5 min read",
    category: "First-timers",
    excerpt:
      "Most people's only question is 'but what do we actually talk about?'. Here's the honest, unglamorous answer.",
    tags: ["first booking", "how it works", "nerves"],
    palette: "periwinkle",
  },
  {
    slug: "is-hiring-a-companion-weird",
    title: "Is hiring a companion weird? Let's talk about it",
    description:
      "Going alone to a wedding, a work dinner or a gig is normal. Paying for company is normal too — we just refuse to pretend otherwise. A short, honest essay on stigma.",
    date: "2026-09-26",
    readingTime: "6 min read",
    category: "Opinion",
    excerpt:
      "The maths of the empty chair, and why 'I couldn't find anyone' is the only reason that has ever needed explaining.",
    tags: ["stigma", "platonic", "why we exist"],
    palette: "pink",
  },
  {
    slug: "wedding-season-when-you-need-a-plus-one",
    title: "Wedding season: when you NEED a plus-one",
    description:
      "Four weddings, one plus-one invite, and a family that asks the same question every time. A practical briefing guide for getting through Indian wedding season comfortably.",
    date: "2026-10-08",
    readingTime: "7 min read",
    category: "Playbook",
    excerpt:
      "Including the briefing sheet that stops relatives from asking why you're still single — and a realistic booking timeline.",
    tags: ["weddings", "playbook", "family"],
    palette: "lime",
  },
];

export function getPostMeta(slug: string): PostMeta | undefined {
  return POSTS.find((post) => post.slug === slug);
}
