import type { MetadataRoute } from "next";
import { getNewsAvailableLocales, isZhEnOnlyPost } from "@/lib/content-i18n";
import { EN_LANDING_SLUGS, EN_HUB_SLUG } from "@/lib/en-landing-pages";
import { getAllNews, getAllNewsSlugs } from "@/lib/news";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/posts";
import {
  getAllCategoryParams,
  getAllModelParams,
  getAllSeriesParams,
} from "@/lib/product-catalog";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import { SITE_BUILT_AT, pageLastModified } from "@/lib/sitemap-dates";

/**
 * 静态页的日期口径统一在 lib/sitemap-dates.ts（与中文 sitemap 共用一份）。
 */
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
 * 中文专用 sitemap 见 src/app/sitemap-zh/route.ts（给百度提交用）。
 * 全站 2174 条里外语占 83%，百度只需中文那 374 条。
 *
 * ⚠️ 不要把中文过滤逻辑写成这里的 export 供 sitemap-zh 复用：
 * app/sitemap.ts 一旦多出导出成员，Next 就不再按 sitemap 路由处理它，
 * /sitemap.xml 会直接 404（2026-10-20 实测踩过）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}

function buildSitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const newsBySlug = Object.fromEntries(
    getAllNews().map((item) => [item.slug, item]),
  );

  /** 最新一篇新闻的日期，给 /news 列表页当 lastmod。 */
  const latestNewsDate = getAllNews().reduce<Date>((acc, item) => {
    const d = item.date ? new Date(item.date) : SITE_BUILT_AT;
    return d.getTime() > acc.getTime() ? d : acc;
  }, SITE_BUILT_AT);

  /**
   * 最新一篇已发布文章的日期，给 /blog 列表页当 lastmod。
   * 2026-10-29 加：此前 /blog 吃 SITE_BUILT_AT(9-07)，但博客 10-19 还有新文，
   * 列表页内容显然变了 —— lastmod 标旧会让 Google 认为整页没更新。
   * getAllPosts() 已按 isPublished + 发布日期过滤，草稿和未来稿不会计入。
   */
  const latestPostDate = getAllPosts().reduce<Date>((acc, post) => {
    const d = new Date(post.publishedAt);
    return d.getTime() > acc.getTime() ? d : acc;
  }, SITE_BUILT_AT);

  const staticPaths = [
    "/",
    "/products",
    "/downloads",
    "/solutions",
    "/about",
    "/blog",
    "/news",
    /* 2026-11-04 新闻拆「行业新闻 / 企业新闻」两分类，各自是稳定可索引的列表页。 */
    "/news/company",
    "/news/industry",
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
          path.startsWith("/news") || path === "/blog" || path === "/"
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
        // /news 及其分类页、/blog 是列表页，日期跟着最新一篇走；其余按 PAGE_LAST_MODIFIED。
        lastModified:
          path.startsWith("/news")
            ? latestNewsDate
            : path === "/blog"
              ? latestPostDate
              : pageLastModified(path),
      }),
    ),
  );

  /** hreflang map 只含 zh-CN + en + x-default（中英双语页用）。 */
  const zhEnLandingRoutes: MetadataRoute.Sitemap = zhEnPaths.flatMap((path) =>
    (["zh", "en"] as const).map((locale) =>
      entryZhEn(base, path, locale, {
        changeFrequency: "weekly",
        priority: locale === defaultLocale ? 0.85 : 0.75,
        lastModified: pageLastModified(path),
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
        lastModified: pageLastModified("/privacy"),
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

    /*
     * 2026-11-04：第三方转载的行业稿只有中文译文，外语站直接 404。
     * 所以 hreflang 不能再无脑声明六语种（否则一半指向 404），
     * 只声明这篇文章真实存在的语种；条目本身也只出这些语种。
     */
    const available = getNewsAvailableLocales(slug);
    const languages: Record<string, string> = {
      "x-default": localizedUrl(base, `/news/${slug}`, defaultLocale),
    };
    for (const loc of available) {
      languages[loc === defaultLocale ? "zh-CN" : loc] = localizedUrl(
        base,
        `/news/${slug}`,
        loc,
      );
    }

    return available.map((loc) => ({
      url: localizedUrl(base, `/news/${slug}`, loc),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: loc === defaultLocale ? 0.6 : 0.5,
      alternates: { languages },
    }));
  });

  /**
   * 英文应用场景落地页（2026-10-30）：/en/solutions/<id> 共 6 条。
   *
   * 这些页面只做英文（文案在 lib/solution-pages.ts），中文与其他语种由
   * requireEnOnlyLocale() 直接 notFound()。所以这里**不能带 alternates**——
   * 一旦按 languageAlternates() 声明六语种，就等于向 Google 提交了 5 条 404。
   * 同理，它们也不能进 /sitemap-zh（百度那份只收中文）。
   */
  const solutionLandingIds = [
    "cleanroom",
    "machine-tool",
    "robotics",
    "automotive",
    "laser",
    "new-energy",
  ];
  const solutionRoutes: MetadataRoute.Sitemap = solutionLandingIds.map((id) => ({
    url: `${base}/en/solutions/${id}`,
    lastModified: pageLastModified(`/solutions/${id}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /**
   * 英文核心商业词落地页（2026-11-03 新增）。
   * 与 solutionRoutes 同理：只有 en 版本，因此只登单条、不带 alternates，
   * 不声明 hreflang —— 其余语种由 requireEnOnlyLocale() 判 404。
   * priority 给 0.9：这几页承接的是 cable carrier / drag chain / e-chain
   * 这类品类主词，是英文侧最重要的入口。
   */
  const enLandingRoutes: MetadataRoute.Sitemap = EN_LANDING_SLUGS.map((slug) => ({
    url: `${base}/en/${slug}`,
    lastModified: pageLastModified(`/en/${slug}`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  /**
   * 英文指南总入口（2026-11-04）。hub 的 priority 比 spoke 高一档：
   * 它是 5 个页面的唯一汇聚点，权重应当从这里往下分。
   */
  const enHubRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/en/${EN_HUB_SLUG}`,
      lastModified: pageLastModified(`/en/${EN_HUB_SLUG}`),
      changeFrequency: "monthly",
      priority: 0.95,
    },
  ];

  return [
    ...staticRoutes,
    ...zhEnLandingRoutes,
    ...legalRoutes,
    ...solutionRoutes,
    ...enHubRoutes,
    ...enLandingRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...newsRoutes,
  ];
}

