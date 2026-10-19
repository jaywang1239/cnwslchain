import type { MetadataRoute } from "next";
import { isZhEnOnlyPost } from "@/lib/content-i18n";
import { getAllNews, getAllNewsSlugs } from "@/lib/news";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import {
  getAllCategoryParams,
  getAllModelParams,
  getAllSeriesParams,
} from "@/lib/product-catalog";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

/** Stable stamp for static marketing URLs (avoid "now" on every request). */
const SITE_BUILT_AT = new Date("2026-09-07T00:00:00.000Z");

function localizedUrl(base: string, path: string, locale: string): string {
  const bare = path === "/" ? "" : path;
  if (locale === defaultLocale) {
    return `${base}${bare || "/"}`;
  }
  return `${base}/${locale}${bare}`;
}

/** hreflang map aligned with <html lang> (zh-CN). */
function languageAlternates(
  base: string,
  path: string,
): Record<string, string> {
  return {
    "zh-CN": localizedUrl(base, path, "zh"),
    en: localizedUrl(base, path, "en"),
    vi: localizedUrl(base, path, "vi"),
    es: localizedUrl(base, path, "es"),
    it: localizedUrl(base, path, "it"),
    ru: localizedUrl(base, path, "ru"),
    "x-default": localizedUrl(base, path, defaultLocale),
  };
}

/** 中英双语页的 hreflang：只声明 zh-CN + en + x-default。 */
function languageAlternatesZhEn(
  base: string,
  path: string,
): Record<string, string> {
  return {
    "zh-CN": localizedUrl(base, path, "zh"),
    en: localizedUrl(base, path, "en"),
    "x-default": localizedUrl(base, path, defaultLocale),
  };
}

function entry(
  base: string,
  path: string,
  locale: Locale,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(base, path, locale),
    lastModified: options.lastModified ?? SITE_BUILT_AT,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: languageAlternates(base, path),
    },
  };
}

/** 中英双语页的 sitemap 条目（hreflang 只含 zh-CN + en + x-default）。 */
function entryZhEn(
  base: string,
  path: string,
  locale: Locale,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(base, path, locale),
    lastModified: options.lastModified ?? SITE_BUILT_AT,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: languageAlternatesZhEn(base, path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
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

  /**
   * 国内 SEO 长尾落地页：价格 / 应用案例 / 地域工厂 / 选型指南 / 官方声明。
   * 2026-10-16 起提供**中文 + 英文**两个版本（vi/es/it/ru 由页面内的
   * requireZhEnLocale() 直接 404，见 src/lib/zh-only.ts），
   * 因此这里只生成 zh 与 en 条目，hreflang 也只声明这两个语种。
   *
   * 2026-10-19 加入 /official（官方身份声明页）：品牌词「威仕龙 CNWSL 官网」
   * 需要一个明确指向本站的落点，这是与同名字号竞争中唯一能自己掌控的一环。
   */
  const zhEnPaths = [
    "/price",
    "/cases",
    "/factory",
    "/guides/selection",
    "/official",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) =>
      entry(base, path, locale, {
        changeFrequency:
          path === "/blog" || path === "/news" || path === "/"
            ? "daily"
            : "weekly",
        priority:
          path === "/"
            ? locale === defaultLocale
              ? 1
              : 0.95
            : locale === defaultLocale
              ? 0.8
              : 0.7,
      }),
    ),
  );

  /** hreflang map 只含 zh-CN + en + x-default（中英双语页用）。 */
  const zhEnLandingRoutes: MetadataRoute.Sitemap = zhEnPaths.flatMap((path) =>
    (["zh", "en"] as const).map((locale) =>
      entryZhEn(base, path, locale, {
        changeFrequency: "weekly",
        priority: locale === defaultLocale ? 0.85 : 0.75,
      }),
    ),
  );

  const withLocales = (
    path: string,
    priority: number,
    lastModified?: Date,
  ): MetadataRoute.Sitemap =>
    locales.map((locale) =>
      entry(base, path, locale, {
        changeFrequency: "weekly",
        priority:
          locale === defaultLocale
            ? priority
            : Math.max(0.4, priority - 0.1),
        lastModified,
      }),
    );

  const productRoutes: MetadataRoute.Sitemap = [
    ...getAllCategoryParams().flatMap(({ category }) =>
      withLocales(`/products/${category}`, 0.85),
    ),
    ...getAllSeriesParams().flatMap(({ category, series }) =>
      withLocales(`/products/${category}/${series}`, 0.8),
    ),
    ...getAllModelParams().flatMap(({ spec }) =>
      withLocales(`/products/model/${spec}`, 0.75),
    ),
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPostSlugs().flatMap((slug) => {
    const post = getPostBySlug(slug);
    const lastModified = post?.publishedAt
      ? new Date(post.publishedAt)
      : SITE_BUILT_AT;
    // 只有中英完整正文的文章：详情页在 vi/es/it/ru 下 404，
    // 所以这里也只输出 zh + en，hreflang 不带其余语种。
    if (isZhEnOnlyPost(slug)) {
      return (["zh", "en"] as const).map((locale) =>
        entryZhEn(base, `/blog/${slug}`, locale, {
          changeFrequency: "weekly",
          priority: locale === defaultLocale ? 0.6 : 0.5,
          lastModified,
        }),
      );
    }
    return withLocales(`/blog/${slug}`, 0.6, lastModified);
  });

  const newsRoutes: MetadataRoute.Sitemap = getAllNewsSlugs().flatMap((slug) => {
    const item = newsBySlug[slug];
    const lastModified = item?.date ? new Date(item.date) : SITE_BUILT_AT;
    return withLocales(`/news/${slug}`, 0.6, lastModified);
  });

  return [
    ...staticRoutes,
    ...zhEnLandingRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...newsRoutes,
  ];
}

