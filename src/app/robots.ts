import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/library", "/stats"],
      },
    ],
    sitemap: "https://greetify.zeeshanai.cloud/sitemap.xml",
  };
}
