import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  POSTS_PER_PAGE,
  formatPublishedAt,
  getPaginatedPosts,
  hasFeaturedImage,
} from "@/lib/posts";
import { localizePostContent } from "@/lib/content-i18n";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).blog;
  const path = localizeHref("/blog", locale);
  const description = seoDescription(copy.metaDescription);

  return {
    title: copy.metaTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/blog").languages,
    },
    ...buildPageSocialMeta({
      title: copy.metaTitle,
      description,
      path,
      locale,
    }),
  };
}

interface BlogPageProps {
  searchParams: { page?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const locale = getRequestLocale();
  const copy = getMessages(locale).blog;
  const requestedPage = Number.parseInt(searchParams.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const { posts, total, totalPages, currentPage } = getPaginatedPosts(
    page,
    POSTS_PER_PAGE,
  );
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
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {localizedPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {hasFeaturedImage(post) ? (
                  <Link
                    href={localizeHref(`/blog/${post.slug}`, locale)}
                    className="relative block aspect-[16/10] bg-gray-100"
                  >
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <time dateTime={post.publishedAt}>
                      {formatPublishedAt(post.publishedAt, locale)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.author}</span>
                    {!post.isPublished && (
                      <span className="rounded bg-brand-accent/15 px-1.5 py-0.5 text-brand-accent">
                        {copy.draft}
                      </span>
                    )}
                    {post.isPublished &&
                      new Date(post.publishedAt).getTime() > Date.now() && (
                        <span className="rounded bg-brand-secondary/15 px-1.5 py-0.5 text-brand-secondary">
                          {copy.scheduled}
                        </span>
                      )}
                  </div>

                  <h2 className="mt-3 text-xl font-semibold text-brand-primary group-hover:text-brand-secondary">
                    <Link href={localizeHref(`/blog/${post.slug}`, locale)}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
                    {post.excerpt}
                  </p>

                  <Link
                    href={localizeHref(`/blog/${post.slug}`, locale)}
                    className="mt-6 inline-flex items-center text-sm font-medium text-brand-secondary transition-colors hover:text-brand-primary"
                  >
                    {copy.readMore}
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
