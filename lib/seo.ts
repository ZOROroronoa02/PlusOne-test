import type { Metadata } from "next";
import type { Faq } from "@/content/faq";
import type { PostMeta } from "@/content/blog/posts";
import { SITE, WHATSAPP_NUMBER } from "@/lib/site";

/**
 * Canonical for a route. Resolved against `metadataBase` (set in the root
 * layout), so a relative path keeps the tag correct in every environment
 * instead of hard-coding the production origin.
 */
export function canonical(path: string): Metadata["alternates"] {
  return { canonical: path };
}

const AREA_SERVED = ["Ghaziabad", "Noida", "Gurugram", "Delhi NCR"];

export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: `+${WHATSAPP_NUMBER}`,
    priceRange: "₹149–₹8,999",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, bank transfer",
    areasServed: AREA_SERVED.map((city) => ({
      "@type": "City",
      name: city,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: [SITE.instagram],
    knowsAbout: [
      "platonic companionship",
      "wedding plus-one",
      "virtual companionship",
      "event companion",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Virtual companionship (text)",
        price: "149",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        name: "Virtual companionship (voice)",
        price: "199",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        name: "Virtual companionship (video)",
        price: "299",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        name: "In-person companionship",
        price: "399",
        priceCurrency: "INR",
      },
    ],
  };
}

export function faqPageSchema(faqs: Faq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function articleSchema(meta: PostMeta): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    articleSection: meta.category,
    keywords: meta.tags.join(", "),
    inLanguage: "en-IN",
    mainEntityOfPage: `${SITE.url}/blog/${meta.slug}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}
