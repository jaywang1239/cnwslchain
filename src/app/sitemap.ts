import type { MetadataRoute } from "next";
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
    return withLocales(`/blog/${slug}`, 0.6, lastModified);
  });

  const newsRoutes: MetadataRoute.Sitemap = getAllNewsSlugs().flatMap((slug) => {
    const item = newsBySlug[slug];
    const lastModified = item?.date ? new Date(item.date) : SITE_BUILT_AT;
    return withLocales(`/news/${slug}`, 0.6, lastModified);
  });

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...newsRoutes];
}
