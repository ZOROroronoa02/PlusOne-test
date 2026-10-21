import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PAPER = "#F4F1EA";
const INK = "#0A0A0A";
const PINK = "#FF2E88";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -5,
              color: INK,
            }}
          >
            P
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              color: PINK,
            }}
          >
            .
          </span>
        </div>
      </div>
    ),
    size,
  );
}
