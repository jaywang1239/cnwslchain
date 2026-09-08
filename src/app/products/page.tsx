import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import {
  CATEGORY_IMAGE,
  buildProductBreadcrumbs,
  localizeCategories,
} from "@/lib/product-catalog";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "@/lib/product-seo";
import { localizeHref, localeOg } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { absoluteUrl, localeAlternates } from "@/lib/site";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).products;
  const categories = localizeCategories(locale);
  const ogImage = categories.find((category) => category.imageSrc);
  const path = localizeHref("/products", locale);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/products").languages,
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: absoluteUrl(path),
      type: "website",
      locale: localeOg[locale],
      ...(ogImage?.imageSrc
        ? {
            images: [
              {
                url: absoluteUrl(ogImage.imageSrc),
                width: CATEGORY_IMAGE.width,
                height: CATEGORY_IMAGE.height,
                alt: ogImage.imageAlt ?? ogImage.name,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      ...(ogImage?.imageSrc
        ? { images: [absoluteUrl(ogImage.imageSrc)] }
        : {}),
    },
  };
}

export default function ProductsPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.products;
  const categories = localizeCategories(locale);
  const breadcrumbs = buildProductBreadcrumbs(undefined, undefined, undefined, locale);
  const path = localizeHref("/products", locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs, path)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCollectionPageJsonLd({
              name: copy.title,
              description: copy.metaDescription,
              pageUrl: path,
              locale,
              items: categories.map((category) => ({
                name: category.name,
                url: localizeHref(`/products/${category.id}`, locale),
                image: category.imageSrc,
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
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-white/80">{copy.subtitle}</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link
                    href={localizeHref(`/products/${category.id}`, locale)}
                    aria-label={category.name}
                    className="relative block aspect-[16/10] bg-white"
                  >
                    {category.imageSrc ? (
                      <Image
                        src={category.imageSrc}
                        alt={category.imageAlt ?? category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-sm text-foreground/35">
                        {copy.productImage}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold text-brand-primary">
                      <Link
                        href={localizeHref(`/products/${category.id}`, locale)}
                        className="hover:text-brand-secondary"
                      >
                        {category.name}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                      {category.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                      {category.series.map((series) => (
                        <li key={series.id}>
                          <Link
                            href={localizeHref(`/products/${category.id}/${series.id}`, locale)}
                            className="text-brand-secondary hover:text-brand-primary"
                          >
                            {series.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={localizeHref(`/products/${category.id}`, locale)}
                      className="mt-auto inline-flex items-center pt-5 text-sm font-medium text-brand-secondary hover:text-brand-primary"
                    >
                      {`${copy.viewCategory}: ${category.name}`}
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
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
