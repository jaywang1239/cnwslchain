import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon: blue CNWSL wordmark on white (matches brand logo color). */
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
          background: "#ffffff",
          color: "#FF6600",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        CNWSL
      </div>
    ),
    { ...size },
  );
}
