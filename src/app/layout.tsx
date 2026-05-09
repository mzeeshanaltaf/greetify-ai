import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://greetify.zeeshanai.cloud"),
  title: {
    default: "Greetify — AI-Crafted Cards for Every Celebration",
    template: "%s — Greetify",
  },
  description:
    "Generate stunning, personalized greeting cards with AI. 100+ templates for every occasion — Eid, Christmas, Birthdays, Weddings, Diwali and more. Download in seconds.",
  keywords: [
    "AI greeting cards",
    "personalized greeting cards",
    "online greeting card maker",
    "AI-generated cards",
    "Eid cards",
    "birthday cards",
    "Christmas cards",
    "Diwali cards",
    "wedding cards",
    "digital e-cards",
    "free greeting cards",
    "custom greeting cards",
  ],
  authors: [{ name: "Greetify" }],
  creator: "Greetify",
  openGraph: {
    type: "website",
    siteName: "Greetify",
    title: "Greetify — AI-Crafted Cards for Every Celebration",
    description:
      "Generate stunning, personalized greeting cards with AI. 100+ templates for every occasion — Eid, Christmas, Birthdays, Weddings and more.",
    url: "https://greetify.zeeshanai.cloud",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Greetify — AI-Crafted Cards for Every Celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greetify — AI-Crafted Cards for Every Celebration",
    description:
      "Generate stunning, personalized greeting cards with AI. 100+ templates for every occasion.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://greetify.zeeshanai.cloud",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Greetify",
    url: "https://greetify.zeeshanai.cloud",
    logo: "https://greetify.zeeshanai.cloud/icon",
    description:
      "Greetify is an AI-powered greeting card platform that generates personalised digital cards for every occasion.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://greetify.zeeshanai.cloud/contact",
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Greetify",
    url: "https://greetify.zeeshanai.cloud",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description:
      "Generate stunning, personalised AI greeting cards for every occasion in seconds. 100+ templates for Eid, Christmas, Birthdays, Weddings and more.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available with limited card generations",
    },
    featureList: [
      "AI-powered card generation",
      "100+ occasion templates",
      "Multiple output formats (E-Card, Poster, Banner)",
      "9 tone styles",
      "Instant download",
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body className="min-h-full antialiased" style={{ background: "#0d0b18" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
