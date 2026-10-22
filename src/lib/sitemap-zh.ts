import { getAllNews, getAllNewsSlugs } from "@/lib/news";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import {
  getAllCategoryParams,
  getAllModelParams,
  getAllSeriesParams,
} from "@/lib/product-catalog";
import { siteConfig } from "@/lib/site";

/**
 * 中文专用 sitemap（给百度搜索资源平台提交）。
 *
 * 为什么单独做一份（2026-10-20 百度可见性检测后加）：
 * /sitemap.xml 是全语种 2000+ 条，外语页占 83%。百度只需要中文页，提交全量
 * 会把抓取配额浪费在 vi/es/it/ru 上。这里只出中文（不带语言前缀）的 URL。
 *
 * 2026-10-22 修正：路由必须挂成 `/sitemap-zh.xml`。
 * 之前放在 `app/sitemap-zh/route.ts`，实际路径是 `/sitemap-zh`，而 robots.txt
 * 声明的是 `/sitemap-zh.xml` —— 等于把一个 404 交给百度。现在把逻辑抽到这里，
 * 由 `app/sitemap-zh.xml/route.ts`（正确路径）+ `app/sitemap-zh/route.ts`（兼容旧路径）
 * 两个薄路由共用。
 *
 * 为什么不复用 app/sitemap.ts 的导出：
 * app/sitemap.ts 一旦多出 export 成员，Next 就不再把它当 sitemap 路由处理，
 * /sitemap.xml 直接 404（2026-10-20 实测踩过）。两条 sitemap 各自独立最安全。
 */

const SITE_BUILT_AT = new Date("2026-09-07T00:00:00.000Z");

type Row = {
  path: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
};

function rows(): Row[] {
  const newsBySlug = Object.fromEntries(
    getAllNews().map((item) => [item.slug, item]),
  );

  const staticPaths = [
    "/",
    "/products",
    "/downloads",
    "/solutions",
    "/about",
    "/blog",
    "/news",
    "/contact",
  ];

  // 中英双语落地页（vi/es/it/ru 由 requireZhEnLocale() 404）
  const zhEnPaths = [
    "/price",
    "/cases",
    "/factory",
    "/guides/selection",
    "/official",
  ];

  return [
    ...staticPaths.map((path) => ({
      path,
      lastModified: SITE_BUILT_AT,
      changeFrequency:
        path === "/" || path === "/blog" || path === "/news"
          ? "daily"
          : "weekly",
      priority: path === "/" ? 1 : 0.8,
    })),
    ...zhEnPaths.map((path) => ({
      path,
      lastModified: SITE_BUILT_AT,
      changeFrequency: "weekly",
      priority: 0.85,
    })),
    // 隐私政策：需要被抓（Google Ads 检查落地页），但不参与关键词竞争
    {
      path: "/privacy",
      lastModified: SITE_BUILT_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...getAllCategoryParams().map(({ category }) => ({
      path: `/products/${category}`,
      lastModified: SITE_BUILT_AT,
      changeFrequency: "weekly",
      priority: 0.85,
    })),
    ...getAllSeriesParams().map(({ category, series }) => ({
      path: `/products/${category}/${series}`,
      lastModified: SITE_BUILT_AT,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...getAllModelParams().map(({ spec }) => ({
      path: `/products/model/${spec}`,
      lastModified: SITE_BUILT_AT,
      changeFrequency: "weekly",
      priority: 0.75,
    })),
    ...getAllPostSlugs().map((slug) => {
      const post = getPostBySlug(slug);
      return {
        path: `/blog/${slug}`,
        lastModified: post?.publishedAt
          ? new Date(post.publishedAt)
          : SITE_BUILT_AT,
        changeFrequency: "weekly",
        priority: 0.6,
      };
    }),
    ...getAllNewsSlugs().map((slug) => {
      const item = newsBySlug[slug];
      return {
        path: `/news/${slug}`,
        lastModified: item?.date ? new Date(item.date) : SITE_BUILT_AT,
        changeFrequency: "weekly",
        priority: 0.6,
      };
    }),
  ];
}

export function buildZhSitemapXml(): string {
  const base = siteConfig.url.replace(/\/$/, "");

  const body = rows()
    .map(
      (r) => `  <url>
    <loc>${base}${r.path}</loc>
    <lastmod>${r.lastModified.toISOString()}</lastmod>
    <changefreq>${r.changeFrequency}</changefreq>
    <priority>${r.priority.toFixed(2)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** 两个路由共用的响应：内容只在构建时变，缓存策略与 /sitemap.xml 一致。 */
export function zhSitemapResponse(): Response {
  return new Response(buildZhSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
