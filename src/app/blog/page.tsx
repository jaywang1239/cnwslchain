import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  POSTS_PER_PAGE,
  formatPublishedAt,
  getPaginatedPosts,
  hasFeaturedImage,
} from "@/lib/posts";
import { localizePostContent, getZhEnOnlyPostSlugs } from "@/lib/content-i18n";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

interface BlogPageProps {
  /** Next.js 15 起 searchParams 为 Promise，需 await 后使用。 */
  searchParams: Promise<{ page?: string }>;
}

/**
 * 解析 `?page=`：缺省返回 1；非法值（空串、非数字、<1）返回 null，
 * 由调用方判 404。不能用 parseInt 直接吃 "2abc" 这类脏值。
 */
function parsePageParam(raw: string | undefined): number | null {
  if (raw === undefined) return 1;
  if (!/^\d+$/.test(raw)) return null;
  const n = Number.parseInt(raw, 10);
  return n >= 1 ? n : null;
}

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: BlogPageProps): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  const locale = getRequestLocale();
  const copy = getMessages(locale).blog;
  const basePath = localizeHref("/blog", locale);

  /*
   * 2026-10-29 修：此前 canonical 恒为 `/blog`，而第 2 页确实渲染的是
   * 另外 2 篇文章 —— 等于对 Google 声明「第 2 页是第 1 页的副本」，
   * 结果第 2 页整页不被索引，并被计入 GSC「重复网页，用户未选定规范网页」。
   * 现在第 2 页起 canonical 自指，hreflang 同口径带 page 参数。
   * 第 1 页仍收敛到无参数的 `/blog`，避免 `?page=1` 与 `/blog` 重复。
   */
  const requested = parsePageParam(searchParams.page);
  const page = requested !== null && requested > 1 ? requested : 1;
  const query = page > 1 ? `?page=${page}` : "";
  const path = `${basePath}${query}`;
  const description = seoDescription(copy.metaDescription);

  return {
    title: copy.metaTitle,
    ...(copy.keywords
      ? { keywords: copy.keywords.split(",").map((k) => k.trim()).filter(Boolean) }
      : {}),
    description,
    alternates: {
      canonical: absoluteUrl(path),
      /*
       * 第 2 页起**不声明 hreflang**。
       * 原因：各语种的可见文章数不同（vi/es/it/ru 会过滤掉只有中英正文的文章），
       * 分页数并不一致 —— 实测 /vi/blog?page=2 直接 404。若照抄 7 条 hreflang，
       * 等于对外声明了 4 个打不开的地址，比不声明更糟。
       * 分页页 self-canonical 即可，Google 接受这种做法。
       */
      ...(query ? {} : { languages: localeAlternates("/blog").languages }),
    },
    ...buildPageSocialMeta({
      title: copy.metaTitle,
      description,
      path,
      locale,
    }),
  };
}

export default async function BlogPage({
  searchParams: searchParamsPromise,
}: BlogPageProps) {
  const searchParams = await searchParamsPromise;
  const locale = getRequestLocale();
  const copy = getMessages(locale).blog;

  // 脏参数（?page=、?page=abc、?page=0）直接 404，不给 Google 留重复入口。
  const requested = parsePageParam(searchParams.page);
  if (requested === null) notFound();
  const page = requested;

  // 只有中英正文的文章在其余语种下不出现（详情页同规则 404）。
  const hiddenSlugs =
    locale === "zh" || locale === "en"
      ? undefined
      : new Set(getZhEnOnlyPostSlugs());
  const { posts, total, totalPages, currentPage } = getPaginatedPosts(
    page,
    POSTS_PER_PAGE,
    new Date(),
    hiddenSlugs,
  );

  /*
   * 2026-10-29 修：getPaginatedPosts 会把页码 clamp 进 [1, totalPages]，
   * 于是 /blog?page=3、?page=99、?page=999 全都返回 200 且渲染同一页内容 ——
   * 无限多个重复 URL，正是 GSC「重复网页，用户未选定规范网页」那 10 条。
   * 超出总页数一律 404，只在真实页码区间内存在页面。
   */
  if (page > totalPages) notFound();

  const localizedPosts = posts.map((post) => localizePostContent(post, locale));

  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            {`${copy.subtitle} ${copy.articleCount.replace("{total}", String(total))}`}
          </p>
        </div>

        {localizedPosts.length === 0 ? (
          <p className="mt-16 text-center text-foreground/60">{copy.empty}</p>
        ) : (
          <div className="mt-12 space-y-6">
            {localizedPosts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link
                  href={localizeHref(`/blog/${post.slug}`, locale)}
                  className="grid gap-0 sm:grid-cols-[240px_1fr]"
                >
                  <div className="relative min-h-[160px] bg-gray-100 sm:min-h-full">
                    {hasFeaturedImage(post) ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary">
                        {post.author}
                      </span>
                      <time dateTime={post.publishedAt} className="text-foreground/50">
                        {formatPublishedAt(post.publishedAt, locale)}
                      </time>
                      {!post.isPublished && (
                        <span className="rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-medium text-brand-accent">
                          {copy.draft}
                        </span>
                      )}
                      {post.isPublished &&
                        new Date(post.publishedAt).getTime() > Date.now() && (
                          <span className="rounded-full bg-brand-secondary/15 px-3 py-1 text-xs font-medium text-brand-secondary">
                            {copy.scheduled}
                          </span>
                        )}
                    </div>

                    <h2 className="mt-3 text-xl font-semibold text-brand-primary transition-colors hover:text-brand-secondary">
                      {post.title}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                      {post.excerpt}
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
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-12 flex items-center justify-center gap-2"
            aria-label={copy.paginationLabel}
          >
            {currentPage > 1 ? (
              <Link
                href={localizeHref(
                  currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`,
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
                href={localizeHref(`/blog?page=${currentPage + 1}`, locale)}
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
        )}
      </div>
    </div>
  );
}
