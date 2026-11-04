import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  NEWS_CATEGORY_PATH,
  formatNewsDate,
  getPaginatedNews,
  newsCategoryOf,
  type NewsCategory,
} from "@/lib/news";
import { localizeNewsContent } from "@/lib/content-i18n";
import { newsExcerpt } from "@/lib/news-text";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription, seoTitle } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

/**
 * 新闻列表页（2026-11-04 重构为「行业新闻 / 企业新闻」两分类）。
 *
 * 三条路径共用本组件：
 *   /news            全部
 *   /news/industry   行业新闻
 *   /news/company    企业新闻
 *
 * 分页规则沿用 /blog 已验证过的那套（Google 侧踩过坑，别改）：
 *   - 每页 10 篇，日期倒序（getAllNews 已排好）
 *   - `?page=1` 收敛到无参 URL，canonical 也指无参
 *   - 第 2 页起 self-canonical，且**不声明 hreflang**（各语种可见篇数不一致）
 *   - 超出总页数一律 404，不留无限重复 URL
 */

type TabKey = "all" | NewsCategory;

const TABS: { key: TabKey; path: string }[] = [
  { key: "all", path: "/news" },
  { key: "company", path: NEWS_CATEGORY_PATH.company },
  { key: "industry", path: NEWS_CATEGORY_PATH.industry },
];

/**
 * 解析 `?page=`：缺省为 1；非法值返回 null 由调用方 404。
 * 不用 parseInt 直接吃 "2abc" 这类脏值。
 */
export function parseNewsPageParam(raw: string | undefined): number | null {
  if (raw === undefined) return 1;
  if (!/^\d+$/.test(raw)) return null;
  const n = Number.parseInt(raw, 10);
  return n >= 1 ? n : null;
}

function tabLabel(key: TabKey, copy: ReturnType<typeof getMessages>["news"]): string {
  if (key === "all") return copy.tabAll;
  return key === "industry" ? copy.industryNews : copy.companyNews;
}

/** 分类页的标题与描述；全部页沿用 messages 里原有的列表页文案。 */
export function newsListMetadata(
  category: NewsCategory | undefined,
  rawPage: string | undefined,
): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).news;

  const requested = parseNewsPageParam(rawPage);
  const page = requested !== null && requested > 1 ? requested : 1;
  const query = page > 1 ? `?page=${page}` : "";

  const basePath = category ? NEWS_CATEGORY_PATH[category] : "/news";
  const path = `${localizeHref(basePath, locale)}${query}`;

  const title = category
    ? seoTitle(category === "industry" ? copy.industryNews : copy.companyNews)
    : copy.metaTitle;
  const description = seoDescription(
    category
      ? category === "industry"
        ? copy.industrySubtitle
        : copy.companySubtitle
      : copy.metaDescription,
  );

  return {
    title,
    ...(category
      ? {}
      : copy.keywords
        ? { keywords: copy.keywords.split(",").map((k) => k.trim()).filter(Boolean) }
        : {}),
    description,
    alternates: {
      canonical: absoluteUrl(path),
      // 分页页不声明 hreflang：各语种可见篇数不同，分页数并不一致。
      ...(query ? {} : { languages: localeAlternates(basePath).languages }),
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

interface NewsListPageProps {
  category?: NewsCategory;
  rawPage?: string;
}

export default function NewsListPage({ category, rawPage }: NewsListPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.news;

  const requested = parseNewsPageParam(rawPage);
  if (requested === null) notFound();

  const { items, total, totalPages, currentPage } = getPaginatedNews(
    category,
    requested,
  );

  /*
   * 超出真实页码区间一律 404，避免 /news?page=99 返回 200 造重复页。
   * 但 total === 0 时 totalPages 也是 0，此时**第 1 页必须照常渲染空态** ——
   * 空分类（如当前的行业新闻）是正常状态，不能 404，否则 sitemap 里提交的
   * /news/industry 会变成「已提交但打不开」；而 0 篇时的 ?page=2 仍要 404。
   */
  if (total === 0 ? requested > 1 : requested > totalPages) notFound();

  const activeTab: TabKey = category ?? "all";
  const heading = category ? tabLabel(category, copy) : copy.title;
  const subtitle = category
    ? category === "industry"
      ? copy.industrySubtitle
      : copy.companySubtitle
    : copy.subtitle;

  // category 必须从**原始数据**算（localizeNewsContent 会覆盖 type 字段）。
  const rows = items.map((raw) => ({
    cat: newsCategoryOf(raw),
    item: localizeNewsContent(raw, locale),
  }));

  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary sm:text-4xl">
            {heading}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-foreground/70">{subtitle}</p>
          {total > 0 ? (
            <p className="mt-2 text-sm text-foreground/50">
              {copy.articleCount.replace("{total}", String(total))}
            </p>
          ) : null}
        </div>

        <nav
          className="mt-10 flex flex-wrap justify-center gap-2"
          aria-label={copy.paginationLabel}
        >
          {TABS.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <Link
                key={tab.key}
                href={localizeHref(tab.path, locale)}
                aria-current={active ? "page" : undefined}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand-secondary bg-brand-secondary text-white"
                    : "border-gray-200 bg-white text-brand-primary hover:border-brand-secondary hover:text-brand-secondary"
                }`}
              >
                {tabLabel(tab.key, copy)}
              </Link>
            );
          })}
        </nav>

        {rows.length === 0 ? (
          <p className="mt-16 text-center text-foreground/60">{copy.empty}</p>
        ) : (
          <div className="mt-10 space-y-6">
            {rows.map(({ cat, item }) => {
              const isIndustry = cat === "industry";
              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link
                    href={localizeHref(`/news/${item.slug}`, locale)}
                    className="grid gap-0 sm:grid-cols-[240px_1fr]"
                  >
                    <div className="relative min-h-[160px] bg-white sm:min-h-full">
                      <Image
                        src={item.cardImage ?? item.image}
                        alt={item.title}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                      {item.video ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-md">
                            <svg
                              className="ml-0.5 h-6 w-6"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M8 5.75v12.5L19 12 8 5.75Z" />
                            </svg>
                          </span>
                          <span className="sr-only">{copy.videoLabel}</span>
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-col p-6">
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span
                          className={
                            isIndustry
                              ? "rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-medium text-brand-accent"
                              : "rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary"
                          }
                        >
                          {tabLabel(cat, copy)}
                        </span>
                        <time dateTime={item.date} className="text-foreground/50">
                          {formatNewsDate(item.date, locale)}
                        </time>
                      </div>

                      <h2 className="mt-3 text-xl font-semibold text-brand-primary transition-colors hover:text-brand-secondary">
                        {item.title}
                      </h2>

                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                        {newsExcerpt(item.content)}
                      </p>

                      <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-secondary">
                        {copy.readMore}
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            className="mt-12 flex items-center justify-center gap-2"
            aria-label={copy.paginationLabel}
          >
            {currentPage > 1 ? (
              <Link
                href={localizeHref(
                  currentPage === 2
                    ? category
                      ? NEWS_CATEGORY_PATH[category]
                      : "/news"
                    : `${category ? NEWS_CATEGORY_PATH[category] : "/news"}?page=${
                        currentPage - 1
                      }`,
                  locale,
                )}
                className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-primary transition-colors hover:border-brand-secondary hover:text-brand-secondary"
              >
                {copy.prevPage}
              </Link>
            ) : (
              <span className="rounded-md border border-gray-100 bg-gray-100 px-4 py-2 text-sm text-foreground/40">
                {copy.prevPage}
              </span>
            )}

            <span className="px-3 text-sm text-foreground/60">
              {copy.pageStatus
                .replace("{current}", String(currentPage))
                .replace("{total}", String(totalPages))}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={localizeHref(
                  `${category ? NEWS_CATEGORY_PATH[category] : "/news"}?page=${
                    currentPage + 1
                  }`,
                  locale,
                )}
                className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-primary transition-colors hover:border-brand-secondary hover:text-brand-secondary"
              >
                {copy.nextPage}
              </Link>
            ) : (
              <span className="rounded-md border border-gray-100 bg-gray-100 px-4 py-2 text-sm text-foreground/40">
                {copy.nextPage}
              </span>
            )}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
