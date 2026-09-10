import newsData from "../../data/news.json";

import type { Locale } from "@/lib/i18n/config";
import { localeHtmlLang } from "@/lib/i18n/config";

export type NewsType = "公司新闻" | "展会活动";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  /** Optional booth / event video (H.264 MP4). */
  video?: string;
  date: string;
  type: NewsType;
}

const newsItems = newsData as NewsItem[];

function sortByDateDesc(a: NewsItem, b: NewsItem): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllNews(): NewsItem[] {
  return [...newsItems].sort(sortByDateDesc);
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return getAllNews().map((item) => item.slug);
}

export function formatNewsDate(date: string, locale: Locale = "zh"): string {
  return new Intl.DateTimeFormat(localeHtmlLang[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
