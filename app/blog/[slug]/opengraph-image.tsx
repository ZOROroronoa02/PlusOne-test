import { ImageResponse } from "next/og";
import { getPostMeta } from "@/lib/blog";

export const alt = "A PlusOne blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F4F1EA";
const INK = "#0A0A0A";
const PINK = "#FF2E88";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          color: PAPER,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          <span style={{ display: "flex" }}>PlusOne. — THE BLOG</span>
          <span style={{ display: "flex", color: PINK }}>
            {meta?.category?.toUpperCase() ?? "READING"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {meta?.title ?? "PlusOne blog"}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 22,
              backgroundColor: PINK,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {meta ? `${meta.readingTime.toUpperCase()} · STRICTLY PLATONIC` : ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
