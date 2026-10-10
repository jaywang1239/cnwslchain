import type { Metadata } from "next";
import Link from "next/link";
import { localizeHref } from "@/lib/i18n";
import { getSearchMessages } from "@/lib/i18n/search-messages";
import { getRequestLocale } from "@/lib/request-locale";
import { seoDescription } from "@/lib/seo";
import {
  buildSearchIndex,
  normalizeQuery,
  searchEntries,
  type SearchGroup,
} from "@/lib/search-index";

/**
 * 全站检索页（2026-10-10 新增）。
 *
 * 纯服务端渲染：读 `?q=` → 过滤索引 → 按类型分组输出。
 * 用 GET 表单，禁用 JS 也能检索。
 */

type SearchParams = { q?: string | string[] };

function readQuery(searchParams: SearchParams | undefined): string {
  const raw = searchParams?.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? "").trim();
}

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getSearchMessages(locale);
  return {
    title: copy.metaTitle,
    description: seoDescription(copy.metaDescription),
    // 检索结果页不应被收录（薄内容 + 无限 URL 组合）
    robots: { index: false, follow: true },
  };
}

export default function SearchPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const locale = getRequestLocale();
  const copy = getSearchMessages(locale);
  const query = readQuery(searchParams);
  const action = localizeHref("/search", locale);

  const index = buildSearchIndex(locale);
  const groups = query ? searchEntries(index, query) : [];
  const totalHits = groups.reduce((sum, group) => sum + group.total, 0);

  const groupLabel: Record<SearchGroup, string> = {
    products: copy.groupProducts,
    blog: copy.groupBlog,
    news: copy.groupNews,
    downloads: copy.groupDownloads,
    pages: copy.groupPages,
  };

  // 空查询时的示例词：真实型号代号 + 真实内高 + 无尘系列名
  const specCodes = index
    .filter((entry) => entry.group === "products" && /^[A-Z]/i.test(entry.title))
    .slice(0, 2)
    .map((entry) => entry.title);
  const cleanroomName = index.find((entry) => entry.id === "cat:cleanroom")?.title;
  const popularQueries = [...specCodes, "65", cleanroomName].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            {copy.subtitle}
          </p>
        </div>

        <form action={action} method="get" role="search" className="mx-auto mt-8 max-w-2xl">
          <label htmlFor="site-search" className="sr-only">
            {copy.queryLabel}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="site-search"
              type="search"
              name="q"
              defaultValue={query}
              placeholder={copy.queryPlaceholder}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition-colors focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-secondary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-primary"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
              {copy.search}
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-foreground/50">
            {copy.hint}
          </p>
        </form>

        {query ? (
          <div className="mt-12">
            <p className="text-center text-sm text-foreground/60">
              {totalHits > 0
                ? copy.resultsFor
                    .replace("{count}", String(totalHits))
                    .replace("{query}", query)
                : null}
            </p>

            {totalHits === 0 ? (
              <p className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-foreground/70">
                {copy.noResults}
              </p>
            ) : (
              <div className="mt-8 space-y-10">
                {groups.map((group) => (
                  <section key={group.group}>
                    <h2 className="flex items-baseline gap-2 border-b border-gray-200 pb-3 text-lg font-semibold text-brand-primary">
                      {groupLabel[group.group]}
                      <span className="text-sm font-normal text-foreground/50">
                        {group.items.length < group.total
                          ? `${group.items.length} / ${group.total}`
                          : String(group.total)}
                      </span>
                    </h2>

                    <ul className="mt-4 space-y-3">
                      {group.items.map((entry) => (
                        <li key={entry.id}>
                          <Link
                            href={localizeHref(entry.href, locale)}
                            className="group block rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                          >
                            <span className="block text-base font-semibold text-brand-primary transition-colors group-hover:text-brand-secondary">
                              {entry.title}
                            </span>
                            {entry.description ? (
                              <span className="mt-1 block text-sm leading-relaxed text-foreground/60">
                                {entry.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 text-center">
            <p className="text-sm text-foreground/60">{copy.emptyQuery}</p>
            {popularQueries.length ? (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-foreground/40">
                  {copy.popular}
                </p>
                <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {popularQueries.map((value) => (
                    <li key={value}>
                      <Link
                        href={`${action}?q=${encodeURIComponent(normalizeQuery(value))}`}
                        className="inline-block rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-foreground/70 transition-colors hover:border-brand-secondary hover:text-brand-secondary"
                      >
                        {value}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
