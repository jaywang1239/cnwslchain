import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { localeHtmlLang, localeOg } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { absoluteUrl, siteConfig } from "@/lib/site";

/** Keep SERP titles roughly within Google's display budget. */
export function seoTitle(primary: string, brand = "CNWSL", max = 60): string {
  const clean = primary.replace(/\s+/g, " ").trim();
  if (!clean) return brand;
  if (clean.includes(brand)) {
    return clean.length <= max ? clean : `${clean.slice(0, max - 1).trim()}…`;
  }
  const withBrand = `${clean} | ${brand}`;
  if (withBrand.length <= max) return withBrand;
  const room = max - brand.length - 3; // " | " + …
  if (room < 12) return brand;
  return `${clean.slice(0, room).trim()}… | ${brand}`;
}

export function seoDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function buildPageSocialMeta(input: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  type?: "website" | "article";
  image?: { url: string; width?: number; height?: number; alt?: string };
  publishedTime?: string;
  modifiedTime?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(input.path);
  const imageUrl = input.image?.url ?? absoluteUrl("/images/home/hero-og.webp");
  const imageAlt = input.image?.alt ?? input.title;

  return {
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: getMessages(input.locale).brandFull,
      locale: localeOg[input.locale],
      type: input.type ?? "website",
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      images: [
        {
          url: imageUrl,
          width: input.image?.width ?? 1200,
          height: input.image?.height ?? 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
  };
}

export function buildOrganizationJsonLd(locale: Locale) {
  const copy = getMessages(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: copy.legalName,
    alternateName: [copy.brandFull, "CNWSL", siteConfig.registeredName],
    url: siteConfig.url,
    logo: absoluteUrl("/images/brand/logo.webp"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: copy.addressLines.factory,
      addressLocality: "Yueqing",
      addressRegion: "Zhejiang",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales",
        email: siteConfig.email,
        availableLanguage: ["zh", "en", "vi", "es", "it", "ru"],
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
      siteConfig.social.instagram,
    ],
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  const copy = getMessages(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: copy.brandFull,
    alternateName: "CNWSL",
    url: siteConfig.url,
    inLanguage: localeHtmlLang[locale],
    publisher: {
      "@type": "Organization",
      name: copy.legalName,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url.replace(/\/$/, "")}${locale === "zh" ? "" : `/${locale}`}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Simple BreadcrumbList for content / marketing pages. */
export function buildSimpleBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
