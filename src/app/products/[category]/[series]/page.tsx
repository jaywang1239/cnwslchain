import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import {
  buildProductBreadcrumbs,
  getAllSeriesParams,
  getCategoryById,
  getSeriesById,
  getSeriesDetail,
  getSpecPath,
  getSpecsBySeries,
  localizeCategory,
} from "@/lib/product-catalog";
import { localizeSeriesCode, localizeSeriesDetail } from "@/lib/product-i18n";
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd } from "@/lib/product-seo";
import { localizeHref, localizeSeriesName } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription, seoTitle } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

interface SeriesPageProps {
  params: { category: string; series: string };
}

export function generateStaticParams() {
  return getAllSeriesParams();
}

export function generateMetadata({ params }: SeriesPageProps): Metadata {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const rawCategory = getCategoryById(params.category);
  const series = getSeriesById(params.category, params.series);
  const detail = getSeriesDetail(params.series);

  if (!rawCategory || !series) {
    return { title: messages.products.notFound };
  }

  const category = localizeCategory(rawCategory, locale);
  const seriesName = localizeSeriesName(series.name, locale);
  const localizedDetail = localizeSeriesDetail(detail, locale, params.series);
  const description = seoDescription(
    localizedDetail?.intro ??
      `${category.name} - ${seriesName} (${localizeSeriesCode(series.code, locale)})`,
  );
  const path = localizeHref(`/products/${params.category}/${params.series}`, locale);
  const title = seoTitle(`${seriesName} | ${category.name}`);
  const imageSrc = category.imageSrc;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates(`/products/${params.category}/${params.series}`).languages,
    },
    ...buildPageSocialMeta({
      title,
      description,
      path,
      locale,
      ...(imageSrc
        ? {
            image: {
              url: absoluteUrl(imageSrc),
              alt: seriesName,
            },
          }
        : {}),
    }),
  };
}

export default function SeriesPage({ params }: SeriesPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.products;
  const rawCategory = getCategoryById(params.category);
  const seriesRaw = getSeriesById(params.category, params.series);
  const specs = getSpecsBySeries(params.category, params.series);

  if (!rawCategory || !seriesRaw) {
    notFound();
  }

  const category = localizeCategory(rawCategory, locale);
  const series = {
    ...seriesRaw,
    name: localizeSeriesName(seriesRaw.name, locale),
    code: localizeSeriesCode(seriesRaw.code, locale),
  };
  const detail = localizeSeriesDetail(
    getSeriesDetail(params.series),
    locale,
    params.series,
  );
  const breadcrumbs = buildProductBreadcrumbs(category.id, series.id, undefined, locale);
  const pagePath = localizeHref(`/products/${category.id}/${series.id}`, locale);
  const seriesImage =
    series.id === "portable-std"
      ? "/images/products/categories/portable.webp"
      : `/images/products/series/${series.id}/a.webp`;

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
              name: series.name,
              description:
                detail?.intro ??
                `${category.name} - ${series.name}`,
              pageUrl: pagePath,
              locale,
              items: specs.map((spec) => ({
                name: spec.code,
                url: localizeHref(getSpecPath(spec.id), locale),
                image: spec.images?.[0]?.src,
              })),
            }),
          ),
        }}
      />

      <div className="bg-gray-50">
        <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ProductBreadcrumb items={breadcrumbs} tone="onInk" />
            <p className="text-sm font-medium text-brand-accent">
              {category.name}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {series.name}
            </h1>
            {detail && (
              <p className="mt-4 max-w-3xl text-white/80">{detail.intro}</p>
            )}
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src={seriesImage}
                alt={series.name}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            {detail && (
              <dl className="mb-10 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-foreground/50">{copy.material}</dt>
                  <dd className="mt-1 text-sm font-medium text-brand-primary">
                    {detail.material}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground/50">{copy.openType}</dt>
                  <dd className="mt-1 text-sm font-medium text-brand-primary">
                    {detail.openType}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground/50">{copy.tempRange}</dt>
                  <dd className="mt-1 text-sm font-medium text-brand-primary">
                    {detail.tempRange}
                  </dd>
                </div>
              </dl>
            )}

            <h2 className="text-lg font-semibold text-brand-primary">
              {copy.specsTitle}
            </h2>
            <p className="mt-2 text-sm text-foreground/60">{copy.seriesIntro}</p>

            {specs.length > 0 ? (
              <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-[640px] w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                        {copy.specCode}
                      </th>
                      <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                        {copy.innerHeight}
                      </th>
                      <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                        {copy.innerWidth}
                      </th>
                      <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                        {copy.bendRadius}
                      </th>
                      <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                        {copy.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {specs.map((spec) => (
                      <tr key={spec.id} className="hover:bg-gray-50/80">
                        <td className="px-3 py-4 font-medium text-brand-primary sm:px-6">
                          {spec.code}
                        </td>
                        <td className="px-3 py-4 text-foreground/70 sm:px-6">
                          {spec.innerHeight} mm
                        </td>
                        <td className="px-3 py-4 text-foreground/70 sm:px-6">
                          {spec.innerWidth} mm
                        </td>
                        <td className="px-3 py-4 text-foreground/70 sm:px-6">
                          {spec.bendRadii.map((r) => `R${r}`).join(" / ")}
                        </td>
                        <td className="px-3 py-4 sm:px-6">
                          <Link
                            href={localizeHref(getSpecPath(spec.id), locale)}
                            className="font-medium text-brand-secondary hover:text-brand-primary"
                          >
                            {messages.viewSpecs}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <p className="text-foreground/60">
                  {`${series.name} — ${copy.noSpecs}`}
                </p>
                <Link
                  href={localizeHref("/contact", locale)}
                  className="mt-4 inline-block text-sm font-medium text-brand-secondary hover:text-brand-primary"
                >
                  {copy.contactSales}
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
