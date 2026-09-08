import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPublishedAt,
  getAllPostSlugs,
  getPostBySlug,
  hasFeaturedImage,
  isDevEnvironment,
} from "@/lib/posts";
import { localizePostContent } from "@/lib/content-i18n";
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

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getPostBySlug(params.slug);

  if (!raw) {
    return {
      title: messages.blog.notFound,
      description: messages.blog.empty,
    };
  }

  const post = localizePostContent(raw, locale);
  const path = localizeHref(`/blog/${post.slug}`, locale);
  const title = seoTitle(post.title);
  const description = seoDescription(post.excerpt);
  const image = hasFeaturedImage(post)
    ? {
        url: absoluteUrl(post.featuredImage),
        alt: post.title,
      }
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates(`/blog/${post.slug}`).languages,
    },
    ...buildPageSocialMeta({
      title,
      description,
      path,
      locale,
      type: "article",
      image,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
    }),
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getPostBySlug(params.slug);

  if (!raw) {
    notFound();
  }

  const post = localizePostContent(raw, locale);
  const paragraphs = post.content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const isScheduled =
    post.isPublished && new Date(post.publishedAt).getTime() > Date.now();

  const pagePath = localizeHref(`/blog/${post.slug}`, locale);
  const homePath = localizeHref("/", locale);
  const blogPath = localizeHref("/blog", locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    ...(hasFeaturedImage(post)
      ? { image: [absoluteUrl(post.featuredImage)] }
      : {}),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
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
    articleSection: post.category,
    inLanguage: localeHtmlLang[locale],
  };

  const breadcrumbLd = buildSimpleBreadcrumbJsonLd([
    { name: messages.home, path: homePath },
    { name: messages.blog.title, path: blogPath },
    { name: post.title, path: pagePath },
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
          <Link href={blogPath} className="hover:text-brand-secondary">
            {messages.blog.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-primary">{post.title}</span>
        </nav>

        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/60">
            <span className="rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary">
              {post.category}
            </span>
            {isDevEnvironment() && !post.isPublished ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                {messages.blog.draft}
              </span>
            ) : null}
            {isDevEnvironment() && isScheduled ? (
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
                {messages.blog.scheduled}
              </span>
            ) : null}
            <time dateTime={post.publishedAt}>
              {formatPublishedAt(post.publishedAt, locale)}
            </time>
            <span aria-hidden="true">·</span>
            <span>
              {messages.blog.author}
              {locale === "zh" ? "：" : ": "}
              {post.author}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
            {post.title}
          </h1>
          {hasFeaturedImage(post) ? (
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="768px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <p className="mt-4 text-lg text-foreground/70">{post.excerpt}</p>
        </header>

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
            href={blogPath}
            className="inline-flex items-center text-sm font-medium text-brand-secondary hover:text-brand-primary"
          >
            {messages.blog.back}
          </Link>
        </div>
      </div>
    </article>
  );
}
