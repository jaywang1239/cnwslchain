import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizeHref } from "@/lib/i18n";
import { buildPageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { EN_GUIDES_HUB } from "@/lib/en-landing-pages";
import { requireEnOnlyLocale } from "@/lib/zh-only";

/**
 * 英文指南总入口 /en/cable-carrier-guides（2026-11-04）。
 *
 * 为什么单独一个组件、不复用 EnLandingRoute：
 * EnLandingRoute 的版式是「长文 + 规格表 + FAQ」，适合单个问题的深度回答；
 * hub 的职责是**分流**，形态必须是卡片网格 —— 按采购阶段把人送出去。
 * 硬套长文模板会让 hub 变成第二个 /cable-carrier，两页互相抢词。
 *
 * 语言口径：仅 en，其余语种 404，canonical 自指且不声明 hreflang。
 * 与 5 个 spoke 一致。不写 generateStaticParams（原因见 EnLandingRoute）。
 */

const HUB_PATH = `/${EN_GUIDES_HUB.slug}`;

export function enGuidesHubMetadata(): Metadata {
  requireEnOnlyLocale();
  const path = localizeHref(HUB_PATH, "en");

  return {
    title: EN_GUIDES_HUB.metaTitle,
    description: EN_GUIDES_HUB.metaDescription,
    alternates: { canonical: absoluteUrl(path) },
    ...buildPageSocialMeta({
      title: EN_GUIDES_HUB.metaTitle,
      description: EN_GUIDES_HUB.metaDescription,
      path,
      locale: "en",
      image: {
        url: absoluteUrl(EN_GUIDES_HUB.image),
        alt: EN_GUIDES_HUB.imageAlt,
      },
    }),
  };
}

export function EnGuidesHub() {
  requireEnOnlyLocale();
  const hub = EN_GUIDES_HUB;
  const path = localizeHref(HUB_PATH, "en");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/en") },
      {
        "@type": "ListItem",
        position: 2,
        name: hub.name,
        item: absoluteUrl(path),
      },
    ],
  };

  /** ItemList 比 CollectionPage 更容易被识别成「一组指南的索引」。 */
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.name,
    description: hub.metaDescription,
    numberOfItems: hub.guides.length,
    itemListElement: hub.guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.name,
      description: guide.summary,
      url: absoluteUrl(localizeHref(guide.href, "en")),
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/55">
              <li>
                <Link href={localizeHref("/", "en")} className="hover:text-white">
                  Home
                </Link>
                <span className="mx-1.5">/</span>
              </li>
              <li className="text-white/80">{hub.name}</li>
            </ol>
          </nav>
          <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-4xl">
            {hub.h1}
          </h1>
          <div className="mt-5 max-w-3xl space-y-3 text-white/80">
            {hub.lede.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src={hub.image}
              alt={hub.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 阶段分流：hub 的主体。四张卡片，每张给「你的处境 + 先去哪」。 */}
      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-brand-primary sm:text-2xl">
            Find your starting point
          </h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            Four situations cover most enquiries we receive. Each card names the
            guide that resolves it fastest.
          </p>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {hub.stages.map((stage) => (
              <li
                key={stage.stage}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">
                  {stage.stage}
                </span>
                <h3 className="mt-2 text-lg font-bold text-brand-primary">
                  {stage.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
                  {stage.situation}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Link
                    href={localizeHref(stage.primary.href, "en")}
                    className="inline-flex items-center gap-1 font-semibold text-brand-secondary hover:text-brand-primary"
                  >
                    {stage.primary.label}
                    <svg
                      className="h-4 w-4"
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
                  {stage.secondary?.map((item) => (
                    <Link
                      key={item.href}
                      href={localizeHref(item.href, "en")}
                      className="text-foreground/60 hover:text-brand-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 五个 spoke：title 直接出链，summary 承担摘要（不做 rel=canonical 之外的重复内容） */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-brand-primary sm:text-2xl">
            All five guides
          </h2>
          <ul className="mt-6 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {hub.guides.map((guide) => (
              <li key={guide.href} className="px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold text-brand-primary">
                    <Link
                      href={localizeHref(guide.href, "en")}
                      className="hover:text-brand-secondary"
                    >
                      {guide.name}
                    </Link>
                  </h3>
                  <span className="text-xs text-foreground/45">
                    {guide.minutes} read
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {guide.summary}
                </p>
                <p className="mt-2 text-xs text-foreground/50">
                  Written for: {guide.who}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-primary">
              Jump straight to a series
            </h2>
            <p className="mt-2 text-sm text-foreground/65">
              If the inner height is already fixed by the drawing, skip the
              guides and go to the size table.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {hub.series.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizeHref(item.href, "en")}
                    className="block rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:border-brand-secondary"
                  >
                    <span className="block font-semibold text-brand-primary">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-foreground/55">
                      {item.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-primary">
              Read before you specify
            </h2>
            <p className="mt-2 text-sm text-foreground/65">
              Three technical posts that come up repeatedly in enquiries.
            </p>
            <ul className="mt-5 space-y-3">
              {hub.posts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizeHref(item.href, "en")}
                    className="text-sm font-medium text-brand-secondary hover:text-brand-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-foreground/50">
              Scope note: our range is engineering plastics only — PA66 with
              30% glass fibre, plus a TPU option. Steel cable chains are not in
              our product line, and we do not quote them.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="border-b border-gray-200 pb-3 text-xl font-bold text-brand-primary sm:text-2xl">
            Before you pick a guide
          </h2>
          <div className="mt-5 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
            {hub.faq.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-1 shrink-0 text-brand-secondary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-foreground/75">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-primary">
            {hub.ctaTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/75">
            {hub.ctaBody}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", "en")}
              className="inline-flex items-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-secondary"
            >
              Send a drawing
            </Link>
            <Link
              href={localizeHref("/downloads", "en")}
              className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-brand-primary hover:border-brand-secondary"
            >
              Download catalogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
