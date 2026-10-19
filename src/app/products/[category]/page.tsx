import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import {
  CATEGORY_IMAGE,
  buildProductBreadcrumbs,
  categoryImageSrcSet,
  getAllCategoryParams,
  getCategoryById,
  getSeriesImageSrc,
  getSpecsBySeries,
  localizeCategory,
} from "@/lib/product-catalog";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqJsonLd,
} from "@/lib/product-seo";
import { getCategoryDeepCopy } from "@/lib/product-deep-copy";
import { localizeHref, localeOg } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { absoluteUrl, localeAlternates } from "@/lib/site";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return getAllCategoryParams();
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const raw = getCategoryById(params.category);

  if (!raw) {
    return { title: messages.products.categoryNotFound };
  }

  const category = localizeCategory(raw, locale);
  // 分类页文案来自 messages.categories，其中的 metaTitle/keywords 仅中文填写。
  const categoryCopy = messages.categories[raw.id as keyof typeof messages.categories];
  const title =
    locale === "zh"
      ? (categoryCopy?.metaTitle ?? `${category.name} | 威仕龙塑料拖链`)
      : `${category.name} | CNWSL`;
  const keywords =
    locale === "zh" && categoryCopy?.keywords
      ? categoryCopy.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined;
  // 分类页 description 原先是 intro（约 70 字），偏短。
  // 深度内容里带一份 120–155 字的 metaDescription，只有 zh/en 有。
  const deep = getCategoryDeepCopy(raw.id, locale);
  const description = deep?.metaDescription ?? category.intro;
  const imageAlt = category.imageAlt ?? category.name;
  const path = localizeHref(`/products/${params.category}`, locale);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates(`/products/${params.category}`).languages,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
      locale: localeOg[locale],
      ...(category.imageSrc
        ? {
            images: [
              {
                url: absoluteUrl(category.imageSrc),
                width: CATEGORY_IMAGE.width,
                height: CATEGORY_IMAGE.height,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(category.imageSrc ? { images: [absoluteUrl(category.imageSrc)] } : {}),
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const locale = getRequestLocale();
  const copy = getMessages(locale).products;
  const raw = getCategoryById(params.category);

  if (!raw) {
    notFound();
  }

  const category = localizeCategory(raw, locale);
  const breadcrumbs = buildProductBreadcrumbs(category.id, undefined, undefined, locale);
  const pagePath = localizeHref(`/products/${category.id}`, locale);
  // vi / es / it / ru 下返回 undefined，该区块整体不渲染（不留中文正文）。
  const deep = getCategoryDeepCopy(category.id, locale);
  const isZh = locale === "zh";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs, pagePath)),
        }}
      />
      {deep && deep.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildFaqJsonLd(deep.faqs.map((f) => ({ question: f.q, answer: f.a }))),
            ),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCollectionPageJsonLd({
              name: category.name,
              description: category.intro,
              pageUrl: pagePath,
              locale,
              items: category.series.map((series) => ({
                name: series.name,
                url: localizeHref(`/products/${category.id}/${series.id}`, locale),
                image:
                  series.id === "portable-std"
                    ? "/images/products/categories/portable.webp"
                    : `/images/products/series/${series.id}/a.webp`,
              })),
            }),
          ),
        }}
      />

      <div className="bg-gray-50">
        <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ProductBreadcrumb items={breadcrumbs} tone="onInk" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-3xl text-white/80">{category.intro}</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {category.imageSrc && (
              <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element --
                    分类图手工 srcSet：100vw 大图会取回 1600 原图，小屏则取 640/960 档。 */}
                <img
                  src={category.imageSrc}
                  srcSet={categoryImageSrcSet(category.imageSrc)}
                  sizes="100vw"
                  alt={category.imageAlt ?? category.name}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            )}
            {deep && (
              <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-base leading-relaxed text-foreground/75">
                  {deep.lead}
                </p>
              </div>
            )}
            <h2 className="text-lg font-semibold text-brand-primary">
              {copy.applications}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.applications.map((app) => (
                <span
                  key={app}
                  className="rounded-full border border-brand-primary/20 bg-white px-4 py-1.5 text-sm text-brand-primary"
                >
                  {app}
                </span>
              ))}
            </div>

            <h2 className="mt-12 text-lg font-semibold text-brand-primary">
              {copy.seriesHeading}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.series.map((series) => {
                const specCount =
                  getSpecsBySeries(category.id, series.id).length ||
                  series.specCount;

                return (
                  <Link
                    key={series.id}
                    href={localizeHref(`/products/${category.id}/${series.id}`, locale)}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-brand-secondary/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] bg-white">
                      <Image
                        src={getSeriesImageSrc(series.id)}
                        alt={series.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-brand-primary group-hover:text-brand-secondary">
                        {series.name}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/50">
                        {`${copy.codePrefix} ${series.code}`}
                      </p>
                      {specCount > 0 && (
                        <p className="mt-3 text-xs text-brand-secondary">
                          {copy.specsCount.replace("{count}", String(specCount))}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {deep && (
              <>
                <div className="mt-16 border-t border-gray-200 pt-10">
                  <h2 className="text-xl font-semibold text-brand-primary">
                    {deep.heading}
                  </h2>
                  <div className="mt-6 space-y-7">
                    {deep.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-base font-semibold text-brand-primary">
                          {section.title}
                        </h3>
                        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground/70">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-lg font-semibold text-brand-primary">
                    {isZh ? "规格速查" : "At a glance"}
                  </h2>
                  <dl className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {deep.keyPoints.map((point) => (
                      <div
                        key={point.label}
                        className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-3 sm:items-baseline"
                      >
                        <dt className="text-xs font-medium text-foreground/50 sm:text-sm">
                          {point.label}
                        </dt>
                        <dd className="text-sm font-medium text-brand-primary sm:col-span-2">
                          {point.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/45">
                    {isZh
                      ? "以上为常规档位。具体型号的内高、内宽、弯曲半径以规格表为准，非标尺寸单独评估。"
                      : "Standard sizes shown. Confirm inner height, width and radius against the spec table for each part number; non-standard sizes are quoted separately."}
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="text-lg font-semibold text-brand-primary">
                    {isZh ? "常见问题" : "Frequently asked questions"}
                  </h2>
                  <dl className="mt-4 space-y-5">
                    {deep.faqs.map((faq) => (
                      <div
                        key={faq.q}
                        className="rounded-xl border border-gray-200 bg-white p-5"
                      >
                        <dt className="text-sm font-semibold text-brand-primary">
                          {faq.q}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-foreground/70">
                          {faq.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
                  <h2 className="text-sm font-semibold text-brand-primary">
                    {isZh ? "相关阅读" : "Related reading"}
                  </h2>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {deep.related.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={localizeHref(item.href, locale)}
                          className="text-sm text-brand-secondary underline-offset-4 hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
