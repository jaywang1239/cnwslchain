import downloadsData from "../../data/downloads.json";
import type { Locale } from "@/lib/i18n/config";

export interface DownloadItem {
  id: string;
  section: string;
  title: string;
  description: string;
  format: string;
  fileUrl: string;
  fileSize: string;
  imageSrc?: string;
  imageAlt?: string;
  titles?: Partial<Record<Exclude<Locale, "zh">, string>>;
  descriptions?: Partial<Record<Exclude<Locale, "zh">, string>>;
  imageAlts?: Partial<Record<Exclude<Locale, "zh">, string>>;
  /**
   * 卡片按钮文案覆盖。默认取 messages.downloads.download（"下载目录"），
   * 但检测报告、证书这类不是"目录"，需要单独给文案，否则会出现
   * "下载目录"按钮指向一份 7 页检测报告的错位。
   */
  cta?: string;
  ctas?: Partial<Record<Exclude<Locale, "zh">, string>>;
  /** @deprecated Prefer titles.en */
  titleEn?: string;
  /** @deprecated Prefer descriptions.en */
  descriptionEn?: string;
}

const downloads = downloadsData as DownloadItem[];

export function getAllDownloads(): DownloadItem[] {
  return downloads;
}

export function localizeDownload(
  item: DownloadItem,
  locale: Locale,
): { title: string; description: string; imageAlt: string } {
  if (locale === "zh") {
    return {
      title: item.title,
      description: item.description,
      imageAlt: item.imageAlt ?? item.title,
    };
  }

  const title =
    item.titles?.[locale] ??
    (locale === "en" ? item.titleEn : undefined) ??
    item.id;
  const description =
    item.descriptions?.[locale] ??
    (locale === "en" ? item.descriptionEn : undefined) ??
    "";
  const imageAlt = item.imageAlts?.[locale] ?? title;

  return { title, description, imageAlt };
}

/** 卡片按钮文案：条目有覆盖用条目的，否则回落到页面级文案。 */
export function localizeDownloadCta(
  item: DownloadItem,
  locale: Locale,
  fallback: string,
): string {
  if (locale === "zh") {
    return item.cta ?? fallback;
  }
  return item.ctas?.[locale] ?? fallback;
}
