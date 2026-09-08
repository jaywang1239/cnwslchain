import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import {
  CATEGORY_IMAGE,
  buildProductBreadcrumbs,
  getAllCategoryParams,
  getCategoryById,
  getSeriesImageSrc,
  getSpecsBySeries,
  localizeCategory,
} from "@/lib/product-catalog";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "@/lib/product-seo";
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
  const title =
    locale === "zh"
      ? `${category.name} | 威仕龙塑料拖链`
      : `${category.name} | CNWSL`;
  const description = category.intro;
  const imageAlt = category.imageAlt ?? category.name;
  const path = localizeHref(`/products/${params.category}`, locale);

  return {
    title,
    description,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs, pagePath)),
        }}
      />
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
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt ?? category.name}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
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
          </div>
        </section>
      </div>
    </>
  );
}
