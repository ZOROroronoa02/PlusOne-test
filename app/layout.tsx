import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RouteFocus } from "@/components/route-focus";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { localBusinessSchema } from "@/lib/seo";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
import { SITE } from "@/lib/site";

const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-unbounded",
  display: "optional",
  axes: ["opsz", "SOFT"],
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  // Same reasoning as the display face, and measured: with `swap` the body
  // font re-wrapped long articles after paint (0.21 CLS on /blog/[slug],
  // shifting thousands of pixels of prose). `optional` never reflows — the
  // brand face is used whenever it is cached or wins the block window.
  display: "optional",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "plus one companion service",
    "hire a companion Delhi NCR",
    "platonic companionship booking",
    "wedding plus one",
    "virtual companion India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F1EA",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const noFlashScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var ok=${JSON.stringify([
  "paper",
  "pink",
  "periwinkle",
  "lime",
  "black",
])}.indexOf(t)>-1;if(ok){document.documentElement.setAttribute('data-theme',t);return;}var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',dark?'black':${JSON.stringify(
  DEFAULT_THEME,
)});}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <JsonLd data={localBusinessSchema()} id="plusone-localbusiness" />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border-2 focus:border-ink focus:bg-accent focus:px-5 focus:py-3 focus:font-bold"
          >
            Skip to content
          </a>
          <NoiseOverlay />
          <RouteFocus />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
