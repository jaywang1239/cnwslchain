import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatNewsDate, getAllNews } from "@/lib/news";
import { localizeNewsContent } from "@/lib/content-i18n";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).news;
  const path = localizeHref("/news", locale);
  const description = seoDescription(copy.metaDescription);

  return {
    title: copy.metaTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/news").languages,
    },
    ...buildPageSocialMeta({
      title: copy.metaTitle,
      description,
      path,
      locale,
    }),
  };
}

export default function NewsPage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale).news;
  const news = getAllNews().map((item) => localizeNewsContent(item, locale));

  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-primary sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {news.map((item) => {
            const isExpo = item.type === copy.expo;

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
                      src={item.image}
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
                          isExpo
                            ? "rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-medium text-brand-accent"
                            : "rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary"
                        }
                      >
                        {item.type}
                      </span>
                      <time dateTime={item.date} className="text-foreground/50">
                        {formatNewsDate(item.date, locale)}
                      </time>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold text-brand-primary transition-colors hover:text-brand-secondary">
                      {item.title}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/70">
                      {item.content.split(/\n\n+/)[0]}
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
      </div>
    </div>
  );
}
