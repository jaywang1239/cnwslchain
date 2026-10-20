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

/**
 * 中文 URL 集合。
 *
 * 为什么单独抽出来（2026-10-20 百度可见性检测后加）：
 * 全站 2174 条 URL 里外语页占 83%，而百度只需中文页。把中文页单独挂成
 * /sitemap-zh.xml 提交给百度搜索资源平台，等于把有限的抓取配额全给到
 * 374 条有价值的页面，不再被 1800 条外语页稀释。
 *
 * 中文 URL 的特征：不带 /en /vi /es /it /ru 前缀（zh 是 defaultLocale，
 * localizedUrl 对中文不加前缀）。这里按"路径首段是否是外语前缀"判断，
 * 不硬编码具体路由，后续加页面自动纳入。
 */
export function zhSitemap(): MetadataRoute.Sitemap {
  return buildSitemap().filter((item) => {
    const path = item.url.replace(/^https?:\/\/[^/]+/, "");
    const first = path.split("/")[1] ?? "";
    return !(locales as readonly string[]).includes(first) || first === defaultLocale;
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}

function buildSitemap(): MetadataRoute.Sitemap {
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

  /**
   * 隐私政策页（2026-10-19）：同属中英双语，但性质是法律文件而非营销页，
   * 所以 priority 压到 0.3、更新频率标 yearly —— 它需要被搜索引擎抓取
   * （Google Ads 会检查落地页是否有可访问的隐私政策），但不参与关键词竞争。
   */
  const legalRoutes: MetadataRoute.Sitemap = (["zh", "en"] as const).map(
    (locale) =>
      entryZhEn(base, "/privacy", locale, {
        changeFrequency: "yearly",
        priority: 0.3,
      }),
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
    ...legalRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...newsRoutes,
  ];
}

