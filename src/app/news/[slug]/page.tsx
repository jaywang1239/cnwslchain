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
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: NewsDetailPageProps): Metadata {
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
  const description = seoDescription(item.content);

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

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getNewsBySlug(params.slug);

  if (!raw) {
    notFound();
  }

  const item = localizeNewsContent(raw, locale);
  const paragraphs = item.content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const isExpo = item.type === messages.news.expo;
  const pagePath = localizeHref(`/news/${item.slug}`, locale);
  const homePath = localizeHref("/", locale);
  const newsPath = localizeHref("/news", locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: seoDescription(item.content),
    image: [absoluteUrl(item.image)],
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

        <div className="mt-10 space-y-5 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-foreground/80"
            >
              {paragraph}
            </p>
          ))}
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
