import type { BreadcrumbItem, ProductSpec } from "@/lib/product-catalog";
import {
  getHeroVideoCopy,
  localizeMaterial,
  localizeSpecSeoDescription,
} from "@/lib/product-i18n";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { absoluteUrl, siteConfig } from "@/lib/site";

function brandForLocale(locale: Locale) {
  const copy = getMessages(locale);
  return {
    brand: copy.brandFull,
    legalName: copy.legalName,
  };
}

export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  currentPageUrl?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const itemUrl = item.href
        ? absoluteUrl(item.href)
        : isLast && currentPageUrl
          ? absoluteUrl(currentPageUrl)
          : undefined;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
  };
}

export function buildProductJsonLd(
  spec: ProductSpec,
  categoryName: string,
  seriesName: string,
  pageUrl: string,
  displayTitle: string,
  locale: Locale = "zh",
) {
  const description = localizeSpecSeoDescription(
    spec,
    categoryName,
    seriesName,
    locale,
  );
  const { brand, legalName } = brandForLocale(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: locale === "zh" ? (spec.seoTitle ?? displayTitle) : displayTitle,
    sku: spec.code,
    description,
    ...(spec.images && spec.images.length > 0
      ? { image: spec.images.map((image) => absoluteUrl(image.src)) }
      : {}),
    brand: {
      "@type": "Brand",
      name: brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: legalName,
    },
    category: `${categoryName} / ${seriesName}`,
    url: absoluteUrl(pageUrl),
    material: localizeMaterial(spec.material, locale),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(pageUrl),
      availability: "https://schema.org/InStock",
      priceCurrency: "CNY",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: legalName,
      },
    },
  };
}

export function buildHeroVideoJsonLd(locale: Locale = "zh") {
  const copy = getHeroVideoCopy(locale);
  const { legalName } = brandForLocale(locale);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: copy.name,
    description: copy.description,
    thumbnailUrl: absoluteUrl("/images/home/hero-og.webp"),
    contentUrl: absoluteUrl("/videos/cnwsl-cleanroom-cable-chain.mp4"),
    embedUrl: absoluteUrl("/"),
    uploadDate: "2026-09-03",
    duration: "PT36S",
    width: 720,
    height: 1280,
    encodingFormat: "video/mp4",
    isFamilyFriendly: true,
    inLanguage: copy.inLanguage,
    publisher: {
      "@type": "Organization",
      name: legalName,
      url: siteConfig.url,
    },
  };
}

export function buildCollectionPageJsonLd(input: {
  name: string;
  description: string;
  pageUrl: string;
  items: { name: string; url: string; image?: string }[];
  locale?: Locale;
}) {
  const locale = input.locale ?? "zh";
  const { brand } = brandForLocale(locale);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.pageUrl),
    isPartOf: {
      "@type": "WebSite",
      name: brand,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.url),
        ...(item.image ? { image: absoluteUrl(item.image) } : {}),
      })),
    },
  };
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
