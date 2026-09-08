import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: blue CNWSL on white. */
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
          background: "#ffffff",
          color: "#FF6600",
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          fontFamily: "Georgia, 'Times New Roman', serif",
          borderRadius: 32,
        }}
      >
        CNWSL
      </div>
    ),
    { ...size },
  );
}
