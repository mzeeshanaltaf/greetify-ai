"use client";

import { lazy, Suspense } from "react";

const LandingContent = lazy(() => import("@/components/landing/LandingContent"));

export default function Page() {
  return (
    <Suspense fallback={<div style={{ background: "#0d0b18", minHeight: "100vh" }} />}>
      <LandingContent />
    </Suspense>
  );
}
