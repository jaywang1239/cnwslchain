import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { localeHtmlLang, localeOg } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * 标题的「展示宽度」：中日韩全角字符算 2，其余算 1。
 *
 * 之前 `seoTitle` 是按 `string.length` 卡的 60，但一个汉字在 SERP 里占两个字符位，
 * 于是 34 个汉字的标题（长度 34 < 60，判定合格）实际宽度是 68，照样被 Google
 * 在中间截断。2026-11-07 体检：全站 423 页里有 3 条宽度 62–64 的超宽标题，
 * 按字符数一个都没拦住。
 */
function displayWidth(text: string): number {
  let width = 0;
  for (const ch of text) {
    const c = ch.codePointAt(0) ?? 0;
    const wide =
      (c >= 0x1100 && c <= 0x115f) ||
      (c >= 0x2e80 && c <= 0xa4cf) ||
      (c >= 0xac00 && c <= 0xd7a3) ||
      (c >= 0xf900 && c <= 0xfaff) ||
      (c >= 0xfe30 && c <= 0xfe6f) ||
      (c >= 0xff00 && c <= 0xff60) ||
      (c >= 0xffe0 && c <= 0xffe6);
    width += wide ? 2 : 1;
  }
  return width;
}

/** 按展示宽度截断（不切半个全角字符）。 */
function sliceByWidth(text: string, budget: number): string {
  let width = 0;
  let out = "";
  for (const ch of text) {
    const w = displayWidth(ch);
    if (width + w > budget) break;
    width += w;
    out += ch;
  }
  return out;
}

/**
 * Keep SERP titles roughly within Google's display budget.
 *
 * `max` 按展示宽度算（汉字=2），中文标题实际能放的汉字数约为它的一半。
 * 超预算时优先去掉品牌后缀（`… | CNWSL` 会两头都不完整），实在放不下才截断。
 */
export function seoTitle(primary: string, brand = "CNWSL", max = 60): string {
  const clean = primary.replace(/\s+/g, " ").trim();
  if (!clean) return brand;
  const fits = (s: string) => displayWidth(s) <= max;

  if (clean.includes(brand)) {
    if (fits(clean)) return clean;
    return `${sliceByWidth(clean, max - 1).trim()}…`;
  }

  const withBrand = `${clean} | ${brand}`;
  if (fits(withBrand)) return withBrand;

  // 正文自己放得下：丢掉品牌后缀，保住完整标题。
  if (fits(clean)) return clean;

  const brandTail = ` | ${brand}`;
  const room = max - displayWidth(brandTail) - 1;
  if (room < 12) return brand;
  return `${sliceByWidth(clean, room).trim()}…${brandTail}`;
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
  // 2026-10-19：品牌词绑定。`alternateName` 里补上客户常用的中文/英文写法，
  // 让「威仕龙拖链」「CNWSL 拖链」这类查询能落到本站，而不是被同名字号截走。
  const alternativeNames = Array.from(
    new Set([copy.brandFull, "CNWSL", siteConfig.registeredName, ...siteConfig.alternateNames]),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: copy.legalName,
    alternateName: alternativeNames,
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
