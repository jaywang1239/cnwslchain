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
      {
        userAgent: "Baiduspider",
        allow: "/",
      },
    ],
    // Multilingual URLs (zh unprefixed; en/vi/es/it/ru prefixed) and hreflang
    // alternates are declared in sitemap.xml — crawl that file for language variants.
    //
    // 中文专用 sitemap（2026-10-20 加）：全语种 sitemap 里 83% 是外语页，
    // 中文 374 条单独挂在 /sitemap-zh.xml，供百度搜索资源平台提交。
    // Google 等其他引擎继续读 sitemap.xml（需要全语种 + hreflang）。
    sitemap: [`${base}/sitemap.xml`, `${base}/sitemap-zh.xml`],
    host: base,
  };
}
