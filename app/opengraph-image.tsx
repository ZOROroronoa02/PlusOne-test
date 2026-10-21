import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F4F1EA";
const INK = "#0A0A0A";
const PINK = "#FF2E88";
const LIME = "#C6F432";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          color: INK,
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
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            PlusOne.
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            <span
              style={{
                display: "flex",
                border: `3px solid ${INK}`,
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              ID VERIFIED
            </span>
            <span
              style={{
                display: "flex",
                backgroundColor: LIME,
                border: `3px solid ${INK}`,
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              100% PLATONIC
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 108,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          <span style={{ display: "flex" }}>RENT A PLUS-ONE.</span>
          <span style={{ display: "flex" }}>KEEP THE MEMORIES.</span>
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
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            WEDDINGS · OFFICE PARTIES · MOVIES · VIRTUAL COMPANY
          </div>
        </div>
      </div>
    ),
    size,
  );
}
