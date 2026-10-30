import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localizeHref } from "@/lib/i18n";
import { buildPageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getSolutionPage } from "@/lib/solution-pages";
import { requireEnOnlyLocale } from "@/lib/zh-only";

/**
 * 英文应用场景落地页（2026-10-30）。
 *
 * 语言口径：仅 en，其余语种 404（见 lib/zh-only.ts 的 requireEnOnlyLocale）。
 * 因此 canonical 自指但 **不声明 hreflang** —— 声明了就是给出 404 的死链。
 * sitemap 也只登记 /en/... 单条，见 app/sitemap.ts 的 solutionRoutes。
 *
 * ⚠️ 刻意不写 generateStaticParams：本站在 middleware 里把 /en/... rewrite 成
 * 无前缀路径 + x-locale 头，构建期拿不到请求头 → 预渲染只会按默认语种(zh)跑，
 * 而 zh 会被 requireEnOnlyLocale() 判成 404，于是把 404 也静态化了。
 * 去掉之后与本项目其它 locale 相关页面一致，走运行时渲染。
 */

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  requireEnOnlyLocale();
  const page = getSolutionPage(id);
  if (!page) return {};

  const path = localizeHref(`/solutions/${page.id}`, "en");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl(path) },
    ...buildPageSocialMeta({
      title: page.metaTitle,
      description: page.metaDescription,
      path,
      locale: "en",
      image: { url: absoluteUrl(page.image), alt: page.imageAlt },
    }),
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { id } = await params;
  requireEnOnlyLocale();
  const page = getSolutionPage(id);
  if (!page) notFound();

  const path = localizeHref(`/solutions/${page.id}`, "en");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/en") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Applications",
        item: absoluteUrl("/en/solutions"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.name,
        item: absoluteUrl(path),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
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
              <li>
                <Link
                  href={localizeHref("/solutions", "en")}
                  className="hover:text-white"
                >
                  Applications
                </Link>
                <span className="mx-1.5">/</span>
              </li>
              <li className="text-white/80">{page.name}</li>
            </ol>
          </nav>
          <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-4xl">
            {page.h1}
          </h1>
          <div className="mt-5 max-w-3xl space-y-3 text-white/80">
            {page.lede.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <article className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="border-b border-gray-200 pb-3 text-xl font-bold text-brand-primary sm:text-2xl">
                {section.heading}
              </h2>
              {section.body?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-5 space-y-4">
                  {section.bullets.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-4 w-4 shrink-0 text-brand-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-foreground/80">
                        <strong className="font-semibold text-foreground">
                          {item.label}
                        </strong>
                        {" — "}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="border-b border-gray-200 pb-3 text-xl font-bold text-brand-primary sm:text-2xl">
              Specification at a glance
            </h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <tbody>
                  {page.specs.map((row, index) => (
                    <tr
                      key={row.label}
                      className={index % 2 === 1 ? "bg-gray-50/70" : undefined}
                    >
                      <th
                        scope="row"
                        className="w-1/3 border-b border-gray-100 px-4 py-3 text-left font-medium text-foreground/60"
                      >
                        {row.label}
                      </th>
                      <td className="border-b border-gray-100 px-4 py-3 text-foreground/85">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-foreground/45">
              Figures are the range across the series, not a guaranteed value for
              every size. Confirm the model against your duty before ordering.
            </p>
          </section>

          <section>
            <h2 className="border-b border-gray-200 pb-3 text-xl font-bold text-brand-primary sm:text-2xl">
              Questions buyers ask at this stage
            </h2>
            <div className="mt-5 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
              {page.faq.map((item) => (
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
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-brand-primary">
              {page.ctaTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/75">
              {page.ctaBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localizeHref("/contact", "en")}
                className="inline-flex items-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-secondary"
              >
                Request a quote
              </Link>
              <Link
                href={localizeHref("/downloads", "en")}
                className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-brand-primary hover:border-brand-secondary"
              >
                Download catalogs
              </Link>
            </div>
          </section>

          <section className="grid gap-8 border-t border-gray-200 pt-8 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/45">
                Series that fit this application
              </h2>
              <ul className="mt-3 space-y-2">
                {page.relatedCategories.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizeHref(item.href, "en")}
                      className="text-brand-secondary hover:text-brand-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/45">
                Read before you specify
              </h2>
              <ul className="mt-3 space-y-2">
                {page.relatedPosts.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizeHref(item.href, "en")}
                      className="text-brand-secondary hover:text-brand-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </article>

      <div className="h-16" />
    </div>
  );
}
