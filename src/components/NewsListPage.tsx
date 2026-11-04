import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  NEWS_CATEGORY_PATH,
  NEWS_PER_PAGE,
  formatNewsDate,
  getNewsForLocale,
  getPaginatedNews,
  newsCategoryOf,
  newsSourceOf,
  type NewsCategory,
  type NewsItem,
  type NewsSource,
} from "@/lib/news";
import { localizeNewsContent } from "@/lib/content-i18n";
import { newsExcerpt } from "@/lib/news-text";
import type { Locale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription, seoTitle } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

/**
 * 新闻列表页（2026-11-04 二次改版：企业新闻 / 行业新闻分开展示）。
 *
 * 三条路径共用本组件：
 *   /news            两个分区——**企业新闻在前、行业新闻在后**，各取前 10 篇
 *   /news/company    企业新闻（带分页）
 *   /news/industry   行业新闻（带分页，卡片挂原文链接）
 *
 * 为什么 /news 不再做"全部混合列表 + 分页"：两类内容的阅读意图完全不同，
 * 混在一起按日期排，企业自己的新动态会被转载稿挤到第二页。改成分区后，
 * /news 是目录页，翻页交给两个分类页，一个 URL 一套分页，不留重复内容。
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

type NewsCopy = ReturnType<typeof getMessages>["news"];

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

function tabLabel(key: TabKey, copy: NewsCopy): string {
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

  /*
   * /news 现在是两个分区的目录页，本身不分页：?page= 一律不参与 canonical，
   * 否则会把目录页拆成 ?page=2 这种同内容 URL。
   */
  const requested = parseNewsPageParam(rawPage);
  const page = !category || requested === null ? 1 : requested;
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

  if (!category) {
    /*
     * 目录页不分页。旧链接 /news?page=2（今天早些时候上线过的形态）永久
     * 收敛到 /news，别让它留在索引里变成第二个入口。
     */
    if (requested > 1) permanentRedirect(localizeHref("/news", locale));
    return <NewsHub locale={locale} copy={copy} />;
  }

  const { items, total, totalPages, currentPage } = getPaginatedNews(
    locale,
    category,
    requested,
  );

  /*
   * 超出真实页码区间一律 404，避免 /news?page=99 返回 200 造重复页。
   * 但 total === 0 时 totalPages 也是 0，此时**第 1 页必须照常渲染空态** ——
   * 空分类是正常状态，不能 404，否则 sitemap 里提交的分类页会变成
   * 「已提交但打不开」；而 0 篇时的 ?page=2 仍要 404。
   */
  if (total === 0 ? requested > 1 : requested > totalPages) notFound();

  const heading = tabLabel(category, copy);
  const subtitle =
    category === "industry" ? copy.industrySubtitle : copy.companySubtitle;

  return (
    <NewsShell
      locale={locale}
      copy={copy}
      heading={heading}
      subtitle={subtitle}
      total={total}
      activeKey={category}
    >
      {items.length === 0 ? (
        <p className="mt-16 text-center text-foreground/60">{copy.empty}</p>
      ) : (
        <div className="mt-10 space-y-6">
          {items.map((raw) => (
            <NewsCard
              key={raw.id}
              raw={raw}
              locale={locale}
              copy={copy}
            />
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <Pagination
          category={category}
          currentPage={currentPage}
          totalPages={totalPages}
          locale={locale}
          copy={copy}
        />
      ) : null}
    </NewsShell>
  );
}

/**
 * /news 目录页：企业新闻在前，行业新闻在后。
 *
 * 每个分区最多 10 篇（与 NEWS_PER_PAGE 一致），超出部分走「查看全部」进分类页，
 * 目录页自己不分页。
 */
function NewsHub({ locale, copy }: { locale: Locale; copy: NewsCopy }) {
  const company = getNewsForLocale(locale, "company");
  const industry = getNewsForLocale(locale, "industry");
  const total = company.length + industry.length;

  return (
    <NewsShell
      locale={locale}
      copy={copy}
      heading={copy.title}
      subtitle={copy.subtitle}
      total={total}
      activeKey="all"
    >
      <div className="mt-12 space-y-16">
        <NewsSection
          id="company"
          title={copy.companyNews}
          subtitle={copy.companySubtitle}
          items={company}
          category="company"
          locale={locale}
          copy={copy}
        />
        <NewsSection
          id="industry"
          title={copy.industryNews}
          subtitle={copy.industrySubtitle}
          items={industry}
          category="industry"
          locale={locale}
          copy={copy}
        />
      </div>
    </NewsShell>
  );
}

function NewsSection({
  id,
  title,
  subtitle,
  items,
  category,
  locale,
  copy,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: NewsItem[];
  category: NewsCategory;
  locale: Locale;
  copy: NewsCopy;
}) {
  const shown = items.slice(0, NEWS_PER_PAGE);
  const moreHref = localizeHref(NEWS_CATEGORY_PATH[category], locale);

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2
            id={`${id}-heading`}
            className="flex items-center gap-3 text-2xl font-bold text-brand-primary"
          >
            <span
              className={
                category === "industry"
                  ? "inline-block h-6 w-1.5 rounded-full bg-brand-accent"
                  : "inline-block h-6 w-1.5 rounded-full bg-brand-secondary"
              }
              aria-hidden="true"
            />
            {title}
            <span className="text-sm font-normal text-foreground/50">
              {copy.articleCount.replace("{total}", String(items.length))}
            </span>
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/60">
            {subtitle}
          </p>
        </div>
        <Link
          href={moreHref}
          className="inline-flex items-center text-sm font-medium text-brand-secondary hover:text-brand-primary"
        >
          {copy.viewAll}
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
        </Link>
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-gray-200 bg-white py-12 text-center text-foreground/60">
          {copy.empty}
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {shown.map((raw) => (
            <NewsCard key={raw.id} raw={raw} locale={locale} copy={copy} />
          ))}
        </div>
      )}

      {items.length > shown.length ? (
        <div className="mt-8 text-center">
          <Link
            href={moreHref}
            className="inline-flex items-center rounded-md border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-brand-primary transition-colors hover:border-brand-secondary hover:text-brand-secondary"
          >
            {copy.viewAll}（{items.length}）
          </Link>
        </div>
      ) : null}
    </section>
  );
}

function NewsCard({
  raw,
  locale,
  copy,
}: {
  raw: NewsItem;
  locale: Locale;
  copy: NewsCopy;
}) {
  // category 必须从**原始数据**算（localizeNewsContent 会覆盖 type 字段）。
  const category = newsCategoryOf(raw);
  const isIndustry = category === "industry";
  const item = localizeNewsContent(raw, locale);
  const href = localizeHref(`/news/${item.slug}`, locale);
  const source: NewsSource | null = newsSourceOf(raw);

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="grid gap-0 sm:grid-cols-[240px_1fr]">
        <Link
          href={href}
          aria-hidden="true"
          tabIndex={-1}
          className="relative aspect-[16/9] block bg-white sm:aspect-auto sm:min-h-full"
        >
          <Image
            src={item.cardImage ?? item.image}
            alt=""
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
        </Link>

        <div className="flex flex-col p-6">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span
              className={
                isIndustry
                  ? "rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-medium text-brand-accent"
                  : "rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary"
              }
            >
              {tabLabel(category, copy)}
            </span>
            <time dateTime={item.date} className="text-foreground/50">
              {formatNewsDate(item.date, locale)}
            </time>
            {/*
              转载稿必须挂可点击的原文链接：既是版权要求，也是给读者的可信度凭据。
              外链单独成行，不套在卡片主链接里（<a> 不能嵌套）。
            */}
            {source ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center text-xs text-foreground/50 underline decoration-gray-300 underline-offset-2 hover:text-brand-secondary"
              >
                {copy.sourceLabel}：{source.name}
                <svg
                  className="ml-1 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H18v4.5M17 7l-6.5 6.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"
                  />
                </svg>
              </a>
            ) : null}
          </div>

          <h3 className="mt-3 text-xl font-semibold text-brand-primary">
            <Link href={href} className="transition-colors hover:text-brand-secondary">
              {item.title}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/70">
            {newsExcerpt(item.content)}
          </p>

          <Link
            href={href}
            className="mt-4 inline-flex items-center text-sm font-medium text-brand-secondary hover:text-brand-primary"
          >
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
          </Link>
        </div>
      </div>
    </article>
  );
}

/** 页头（标题 + 副标题 + 篇数）与分类 tab，三个路径共用。 */
function NewsShell({
  locale,
  copy,
  heading,
  subtitle,
  total,
  activeKey,
  children,
}: {
  locale: Locale;
  copy: NewsCopy;
  heading: string;
  subtitle: string;
  total: number;
  activeKey: TabKey;
  children: ReactNode;
}) {
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
            const active = tab.key === activeKey;
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

        {children}
      </div>
    </div>
  );
}

function Pagination({
  category,
  currentPage,
  totalPages,
  locale,
  copy,
}: {
  category: NewsCategory;
  currentPage: number;
  totalPages: number;
  locale: Locale;
  copy: NewsCopy;
}) {
  const basePath = NEWS_CATEGORY_PATH[category];

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label={copy.paginationLabel}
    >
      {currentPage > 1 ? (
        <Link
          href={localizeHref(
            currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`,
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
          href={localizeHref(`${basePath}?page=${currentPage + 1}`, locale)}
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
  );
}
