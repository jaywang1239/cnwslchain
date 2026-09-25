import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon: CNWSL wordmark on white in brand blue. */
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
          color: "#0060AE",
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
