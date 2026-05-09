import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0b18",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 0%, #d4a853 0%, transparent 70%)",
            opacity: 0.25,
            filter: "blur(60px)",
          }}
        />
        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 18,
            background: "linear-gradient(135deg, #d4a853 0%, #c49240 100%)",
            marginBottom: 32,
            fontSize: 48,
            fontWeight: 800,
            color: "#0d0b18",
            fontFamily: "serif",
            letterSpacing: -2,
          }}
        >
          G
        </div>
        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f7f3ee",
            fontFamily: "serif",
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          Greetify
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(247,243,238,0.6)",
            fontFamily: "sans-serif",
            fontWeight: 400,
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          AI-Crafted Cards for Every Celebration
        </div>
        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #d4a853 0%, #c49240 50%, #e86f4e 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
