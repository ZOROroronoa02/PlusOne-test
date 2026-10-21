import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const PAPER = "#F4F1EA";
const INK = "#0A0A0A";
const PINK = "#FF2E88";

export default function Icon() {
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
          border: `5px solid ${INK}`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: -2,
              color: INK,
            }}
          >
            P
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 42,
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
