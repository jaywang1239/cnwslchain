import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatNewsDate,
  getAllNewsSlugs,
  getNewsBySlug,
} from "@/lib/news";
import { localizeNewsContent } from "@/lib/content-i18n";
import { newsExcerpt, parseNewsBlocks } from "@/lib/news-text";
import { localizeHref, localeHtmlLang } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import {
  buildPageSocialMeta,
  buildSimpleBreadcrumbJsonLd,
  seoDescription,
  seoTitle,
} from "@/lib/seo";
import { absoluteUrl, localeAlternates, siteConfig } from "@/lib/site";

interface NewsDetailPageProps {
  /** Next.js 15 起动态路由参数为 Promise，需 await 后使用。 */
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: paramsPromise,
}: NewsDetailPageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getNewsBySlug(params.slug);

  if (!raw) {
    return {
      title: messages.news.notFound,
      description: messages.news.empty,
    };
  }

  const item = localizeNewsContent(raw, locale);
  const path = localizeHref(`/news/${item.slug}`, locale);
  const title = seoTitle(item.title);
  const description = seoDescription(newsExcerpt(item.content, 200));

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates(`/news/${item.slug}`).languages,
    },
    ...buildPageSocialMeta({
      title,
      description,
      path,
      locale,
      type: "article",
      image: {
        url: absoluteUrl(item.image),
        alt: item.title,
      },
      publishedTime: item.date,
      modifiedTime: item.date,
    }),
  };
}

export default async function NewsDetailPage({
  params: paramsPromise,
}: NewsDetailPageProps) {
  const params = await paramsPromise;
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getNewsBySlug(params.slug);

  if (!raw) {
    notFound();
  }

  const item = localizeNewsContent(raw, locale);
  const blocks = parseNewsBlocks(item.content);

  const isExpo = item.type === messages.news.expo;
  const pagePath = localizeHref(`/news/${item.slug}`, locale);
  const homePath = localizeHref("/", locale);
  const newsPath = localizeHref("/news", locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: seoDescription(newsExcerpt(item.content, 200)),
    image: [absoluteUrl(item.image)],
    ...(raw.video
      ? {
          video: {
            "@type": "VideoObject",
            name: item.title,
            description: seoDescription(newsExcerpt(item.content, 200)),
            thumbnailUrl: absoluteUrl(item.image),
            contentUrl: absoluteUrl(raw.video),
            uploadDate: item.date,
            encodingFormat: "video/mp4",
          },
        }
      : {}),
    datePublished: item.date,
    dateModified: item.date,
    author: {
      "@type": "Organization",
      name: messages.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: messages.legalName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/brand/logo.webp"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(pagePath),
    },
    articleSection: item.type,
    inLanguage: localeHtmlLang[locale],
  };

  const breadcrumbLd = buildSimpleBreadcrumbJsonLd([
    { name: messages.home, path: homePath },
    { name: messages.news.title, path: newsPath },
    { name: item.title, path: pagePath },
  ]);

  return (
    <article className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <nav className="mb-8 text-sm text-foreground/60">
          <Link href={homePath} className="hover:text-brand-secondary">
            {messages.home}
          </Link>
          <span className="mx-2">/</span>
          <Link href={newsPath} className="hover:text-brand-secondary">
            {messages.news.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-primary">{item.title}</span>
        </nav>

        <header>
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

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
            {item.title}
          </h1>
        </header>

        {raw.video ? (
          <div className="relative mt-8 overflow-hidden rounded-xl border border-gray-200 bg-black">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              poster={item.image}
              title={item.title}
            >
              <source src={raw.video} type="video/mp4" />
            </video>
            <p className="sr-only">{messages.news.videoLabel}</p>
          </div>
        ) : (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-10 space-y-5 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          {blocks.map((block, index) => {
            switch (block.type) {
              case "heading":
                return block.level === 2 ? (
                  <h2
                    key={index}
                    className="!mt-9 border-l-4 border-brand-secondary pl-3 text-xl font-semibold text-brand-primary first:!mt-0"
                  >
                    <InlineText text={block.text} />
                  </h2>
                ) : (
                  <h3
                    key={index}
                    className="!mt-6 text-base font-semibold text-brand-primary"
                  >
                    <InlineText text={block.text} />
                  </h3>
                );
              case "list":
                return (
                  <ul key={index} className="list-disc space-y-2 pl-5 marker:text-brand-secondary">
                    {block.items.map((item, i) => (
                      <li
                        key={i}
                        className="pl-1 text-base leading-relaxed text-foreground/80"
                      >
                        <InlineText text={item} />
                      </li>
                    ))}
                  </ul>
                );
              case "table":
                return (
                  <div key={index} className="overflow-x-auto">
                    <table className="w-full min-w-[320px] border-collapse text-sm">
                      <thead>
                        <tr>
                          {block.head.map((cell, i) => (
                            <th
                              key={i}
                              scope="col"
                              className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-brand-primary"
                            >
                              <InlineText text={cell} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, r) => (
                          <tr key={r}>
                            {row.map((cell, c) => (
                              <td
                                key={c}
                                className="border border-gray-200 px-3 py-2 text-foreground/80"
                              >
                                <InlineText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              default:
                return (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-foreground/80"
                  >
                    <InlineText text={block.text} />
                  </p>
                );
            }
          })}
        </div>

        <div className="mt-10">
          <Link
            href={newsPath}
            className="inline-flex items-center text-sm font-medium text-brand-secondary hover:text-brand-primary"
          >
            {messages.news.back}
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * 行内 **加粗** 的最小实现。
 *
 * 新闻正文散落在 JSON 与 content-i18n 里，为几个强调词引入完整的 markdown
 * 渲染器不划算；这里只认 **…** 一种标记。
 */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={index} className="font-semibold text-brand-primary">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
