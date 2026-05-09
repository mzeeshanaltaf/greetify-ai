import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://greetify.zeeshanai.cloud";
  return [
    { url: base,                       lastModified: new Date(),             changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,            lastModified: new Date(),             changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,          lastModified: new Date(),             changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/privacy-policy`,   lastModified: new Date("2026-04-15"), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/cookie-policy`,    lastModified: new Date("2026-04-15"), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms-of-service`, lastModified: new Date("2026-04-15"), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
