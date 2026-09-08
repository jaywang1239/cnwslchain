import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    // Multilingual URLs (zh unprefixed; en/vi/es/it/ru prefixed) and hreflang
    // alternates are declared in sitemap.xml — crawl that file for language variants.
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
