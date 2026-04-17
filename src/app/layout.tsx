import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Greetify — AI-Crafted Cards for Every Celebration",
  description:
    "Generate stunning, personalized greeting cards with AI. 100+ templates for every occasion — Eid, Christmas, Birthdays, Weddings and more. Download in seconds.",
  keywords: "greeting cards, AI cards, e-cards, Eid cards, birthday cards, personalized cards",
  openGraph: {
    title: "Greetify — AI-Crafted Cards for Every Celebration",
    description: "Generate stunning, personalized greeting cards with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" style={{ background: "#0d0b18" }}>{children}</body>
    </html>
  );
}
