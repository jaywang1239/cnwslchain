import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import ProductGallery from "@/components/ProductGallery";
import {
  buildProductBreadcrumbs,
  getAllModelParams,
  getCategoryById,
  getDefaultSpecFeatures,
  getDefaultSpecSummary,
  getSeriesById,
  getSpecByModelId,
  getSpecDisplayTitle,
  getSpecPath,
  getSpecsBySeries,
  localizeCategory,
} from "@/lib/product-catalog";
import {
  localizeImageAlt,
  localizeMaterial,
  localizeOpenType,
} from "@/lib/product-i18n";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildProductJsonLd,
} from "@/lib/product-seo";
import { localizeHref, localizeSeriesName, localeOg } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { absoluteUrl, localeAlternates } from "@/lib/site";

interface SpecPageProps {
  params: { spec: string };
}

export function generateStaticParams() {
  return getAllModelParams();
}

export function generateMetadata({ params }: SpecPageProps): Metadata {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const spec = getSpecByModelId(params.spec);
  if (!spec) {
    return { title: messages.products.notFound };
  }

  const seriesRaw = getSeriesById(spec.categoryId, spec.seriesId);
  const rawCategory = getCategoryById(spec.categoryId);

  if (!seriesRaw || !rawCategory) {
    return { title: messages.products.notFound };
  }

  const category = localizeCategory(rawCategory, locale);
  const seriesName = localizeSeriesName(seriesRaw.name, locale);
  const pagePath = localizeHref(getSpecPath(spec.id), locale);
  const openType = localizeOpenType(spec.openType, locale);
  const material = localizeMaterial(spec.material, locale);

  const title =
    locale === "zh"
      ? (spec.seoTitle ??
        `${spec.code} ${openType}拖链 | ${seriesName} | 威仕龙 CNWSL`)
      : `${category.name} ${spec.code} | ${seriesName} | CNWSL`;

  const descriptionByLocale = {
    zh:
      spec.seoDescription ??
      `${spec.code}，内高 ${spec.innerHeight}mm / 内宽 ${spec.innerWidth}mm，${material}。`,
    en: `${spec.code}, inner height ${spec.innerHeight} mm / inner width ${spec.innerWidth} mm, ${material}.`,
    vi: `${spec.code}, chiều cao trong ${spec.innerHeight} mm / chiều rộng trong ${spec.innerWidth} mm, ${material}.`,
    es: `${spec.code}, altura interior ${spec.innerHeight} mm / ancho interior ${spec.innerWidth} mm, ${material}.`,
    it: `${spec.code}, altezza interna ${spec.innerHeight} mm / larghezza interna ${spec.innerWidth} mm, ${material}.`,
    ru: `${spec.code}, внутренняя высота ${spec.innerHeight} мм / внутренняя ширина ${spec.innerWidth} мм, ${material}.`,
  } as const;
  const description = descriptionByLocale[locale];
  const primaryImage = spec.images?.[0]?.src;
  const primaryAlt = localizeImageAlt(
    spec.images?.[0]?.alt,
    locale,
    spec.code,
  );

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(pagePath),
      languages: localeAlternates(getSpecPath(spec.id)).languages,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(pagePath),
      siteName: messages.brandFull,
      locale: localeOg[locale],
      type: "website",
      ...(primaryImage
        ? { images: [{ url: absoluteUrl(primaryImage), alt: primaryAlt }] }
        : {}),
    },
  };
}

export default function SpecPage({ params }: SpecPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.products;
  const spec = getSpecByModelId(params.spec);

  if (!spec) {
    notFound();
  }

  const rawCategory = getCategoryById(spec.categoryId);
  const seriesRaw = getSeriesById(spec.categoryId, spec.seriesId);
  const siblingSpecs = getSpecsBySeries(spec.categoryId, spec.seriesId);

  if (!rawCategory || !seriesRaw) {
    notFound();
  }

  const category = localizeCategory(rawCategory, locale);
  const series = {
    ...seriesRaw,
    name: localizeSeriesName(seriesRaw.name, locale),
  };
  const pagePath = localizeHref(getSpecPath(spec.id), locale);
  const displayTitle = getSpecDisplayTitle(spec, series.name, locale);
  const summary =
    locale === "zh" && spec.summary
      ? spec.summary
      : getDefaultSpecSummary(spec, series.name, category.name, locale);
  const features =
    locale === "zh" && spec.features
      ? spec.features
      : getDefaultSpecFeatures(spec, locale);
  const faqs = locale === "zh" ? (spec.faqs ?? []) : [];
  const breadcrumbs = buildProductBreadcrumbs(
    category.id,
    series.id,
    spec,
    locale,
  );
  const openType = localizeOpenType(spec.openType, locale);
  const material = localizeMaterial(spec.material, locale);
  const galleryImages =
    spec.images?.map((image) => ({
      ...image,
      alt: localizeImageAlt(image.alt, locale, spec.code),
    })) ?? [];

  const jsonLdScripts = [
    buildBreadcrumbJsonLd(breadcrumbs, pagePath),
    buildProductJsonLd(
      spec,
      category.name,
      series.name,
      pagePath,
      displayTitle,
      locale,
    ),
    ...(faqs.length > 0 ? [buildFaqJsonLd(faqs)] : []),
  ];

  return (
    <>
      {jsonLdScripts.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <article className="bg-gray-50">
        <section className="border-b border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ProductBreadcrumb items={breadcrumbs} />
            <p className="text-sm font-medium text-brand-secondary">
              {category.name} · {series.name}
            </p>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-brand-primary sm:text-3xl">
              {displayTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">
              {summary}
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              {galleryImages.length > 0 ? (
                <ProductGallery images={galleryImages} productName={spec.code} />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-gray-200 bg-white">
                  <p className="text-sm text-foreground/40">{copy.imagePending}</p>
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold text-brand-primary">
                  {copy.paramsTitle}
                </h2>
                <dl className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                  <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                    <dt className="text-sm text-foreground/60">{copy.specCode}</dt>
                    <dd className="col-span-2 text-sm font-medium text-brand-primary">
                      {spec.code}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                    <dt className="text-sm text-foreground/60">{copy.innerHeight}</dt>
                    <dd className="col-span-2 text-sm font-medium">
                      {spec.innerHeight} mm
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                    <dt className="text-sm text-foreground/60">{copy.innerWidth}</dt>
                    <dd className="col-span-2 text-sm font-medium">
                      {spec.innerWidth} mm
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                    <dt className="text-sm text-foreground/60">{copy.openType}</dt>
                    <dd className="col-span-2 text-sm font-medium">
                      {openType}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                    <dt className="text-sm text-foreground/60">{copy.material}</dt>
                    <dd className="col-span-2 text-sm font-medium">
                      {material}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                    <dt className="text-sm text-foreground/60">{copy.connector}</dt>
                    <dd className="col-span-2 text-sm font-medium">
                      {spec.connector}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  {spec.drawingUrl ? (
                    <a
                      href={spec.drawingUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-brand-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
                    >
                      {copy.downloadDrawing}
                    </a>
                  ) : null}
                  <Link
                    href={localizeHref(
                      `/products/${category.id}/${series.id}`,
                      locale,
                    )}
                    className="inline-flex items-center gap-2 rounded-md border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:border-brand-secondary hover:text-brand-secondary"
                  >
                    {copy.backToCategory}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-lg font-semibold text-brand-primary">
              {copy.bendRadiiTitle}
            </h2>
            <p className="mt-2 text-sm text-foreground/60">{copy.bendRadiiHint}</p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-[480px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                      {copy.bendRadius}
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                      {copy.codeExample}
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-foreground/60 sm:px-6">
                      {copy.note}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {spec.bendRadii.map((radius) => (
                    <tr key={radius}>
                      <td className="px-3 py-4 font-medium text-brand-primary sm:px-6">
                        R{radius}
                      </td>
                      <td className="px-3 py-4 text-foreground/70 sm:px-6">
                        {spec.code}-R{radius}
                      </td>
                      <td className="px-3 py-4 text-foreground/70 sm:px-6">
                        {radius <= 55
                          ? copy.radiusCompact
                          : radius <= 100
                            ? copy.radiusCommon
                            : copy.radiusLong}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-lg font-semibold text-brand-primary">
              {copy.features}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary"
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
                  <span className="text-sm text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {locale === "zh" &&
          spec.applications &&
          spec.applications.length > 0 && (
            <section className="border-t border-gray-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <h2 className="text-lg font-semibold text-brand-primary">
                  {copy.applications}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {spec.applications.map((app) => (
                    <span
                      key={app}
                      className="rounded-full bg-brand-primary/5 px-4 py-1.5 text-sm text-brand-primary"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

        {faqs.length > 0 && (
          <section className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-lg font-semibold text-brand-primary">
                {copy.faq}
              </h2>
              <dl className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                  >
                    <dt className="font-medium text-brand-primary">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {siblingSpecs.length > 1 && (
          <section className="border-t border-gray-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-lg font-semibold text-brand-primary">
                {`${series.name} — ${copy.related}`}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {siblingSpecs
                  .filter((s) => s.id !== spec.id)
                  .map((s) => (
                    <li key={s.id}>
                      <Link
                        href={localizeHref(getSpecPath(s.id), locale)}
                        className="inline-block rounded-md border border-gray-200 px-3 py-1.5 text-sm text-brand-primary transition-colors hover:border-brand-secondary hover:bg-brand-secondary/5"
                      >
                        {s.code}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-brand-primary">
              {copy.inquiryTitle}
            </h2>
            <p className="mt-2 text-sm text-foreground/70">{copy.inquiryHint}</p>
            <div className="mt-6">
              <InquiryForm productName={spec.code} />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
