import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #d4a853 0%, #c49240 100%)",
          borderRadius: 8,
          color: "#0d0b18",
          fontSize: 22,
          fontWeight: 800,
          fontFamily: "serif",
          letterSpacing: -1,
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
