import newsData from "../../data/news.json";

import type { Locale } from "@/lib/i18n/config";
import { localeHtmlLang } from "@/lib/i18n/config";
import { getNewsAvailableLocales } from "./content-i18n";
import { EXTERNAL_NEWS } from "./news-external";

/**
 * 新闻分类（2026-11-04 重构）。
 *
 * 此前沿用 `公司新闻 | 展会活动` 两分法，展会本是公司动态的一部分，
 * 拆开反而让「行业新闻」这类内容无处安放。现在收成两条线：
 *   - industry：行业新闻 —— 标准、材料、工艺、上下游变化
 *   - company：企业新闻 —— 公司自己的新品、产能、认证、交付、展会
 */
export type NewsCategory = "industry" | "company";

/** 列表每页条数。改这里会同时改变分页页数与 ?page= 的合法上界。 */
export const NEWS_PER_PAGE = 10;

/**
 * 旧标签 → 新分类的归一化表。
 *
 * 🔴 刻意不在 `data/news.json` 上做批量改写：本地 data/ 是线上镜像且历史上
 * 落后过线上，整文件提交有回滚线上文章的风险（2026-10-20 踩过）。
 * 归一只放在读取层，数据文件保持原样；新增文章直接写 `"行业新闻"` 或
 * `"企业新闻"` 即可生效，写英文 key（industry / company）也认。
 */
const CATEGORY_BY_LABEL: Record<string, NewsCategory> = {
  行业新闻: "industry",
  industry: "industry",
  企业新闻: "company",
  公司新闻: "company",
  展会活动: "company",
  company: "company",
};

/** 未知标签一律归企业新闻 —— 现有 10 篇全部属于这一类，兜底不能制造空分类。 */
export function newsCategoryOf(item: { type?: string }): NewsCategory {
  const key = String(item.type ?? "").trim();
  return CATEGORY_BY_LABEL[key] ?? "company";
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  /**
   * 列表卡片专用图（可选）。
   * 竖版证书类新闻的 16:10 头图在 240px 宽的卡片里会被裁掉两侧，
   * 这里可以单独给一张与卡片同比例（6:5）的构图，缺省回落到 image。
   */
  cardImage?: string;
  /** Optional booth / event video (H.264 MP4). */
  video?: string;
  date: string;
  /**
   * 原始标签，保留字符串类型以兼容历史数据（含「公司新闻」「展会活动」）。
   * 展示与筛选一律走 `newsCategoryOf()`，不要直接读这个字段。
   */
  type: string;
}

/**
 * 站内自有文章（data/news.json）+ 第三方转载（news-external.json）。
 *
 * 两份数据分开存：`data/` 是线上镜像，提交代码时绝不带它；
 * 转载内容跟着 `src/` 一起走，新增/下架都只改代码，不碰数据镜像。
 */
const newsItems: NewsItem[] = [
  ...(newsData as NewsItem[]),
  ...EXTERNAL_NEWS,
];

function sortByDateDesc(a: NewsItem, b: NewsItem): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** 全部新闻，**日期倒序**（最新在前）—— 列表与分页都依赖这个顺序。 */
export function getAllNews(): NewsItem[] {
  return [...newsItems].sort(sortByDateDesc);
}

/**
 * 某语种下真实可看的新闻。
 *
 * 转载的行业稿只有中文（见 content-i18n 的 getNewsAvailableLocales），
 * 不能出现在外语站的列表里，否则列表标题会退化成 slug。
 */
export function getNewsForLocale(locale: Locale, category?: NewsCategory): NewsItem[] {
  const all = getNewsByCategory(category);
  return all.filter((item) => getNewsAvailableLocales(item.slug).includes(locale));
}

/**
 * 按分类取新闻，同样日期倒序。
 * 不传 category 即全部，供 /news 首页使用。
 */
export function getNewsByCategory(category?: NewsCategory): NewsItem[] {
  const all = getAllNews();
  if (!category) return all;
  return all.filter((item) => newsCategoryOf(item) === category);
}

/**
 * 第三方转载的出处（2026-11-04 加）。
 *
 * 正文末尾的「来源」小节里本来就写了原文链接，但详情页的行内渲染此前只认
 * `**加粗**`，`[标题](url)` 会被当成纯文本原样吐出来 —— 视觉上是死链，
 * 而且转载不挂可点击原文链接本身就不合规矩。
 *
 * 这里从正文里抽出第一条外链，列表与详情页共用，不再往 JSON 里加一份
 * （`build_news.py` 重跑时会整份覆盖，加字段反而会丢）。
 */
const SOURCE_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/;

/** 已知来源的展示名；新站点只用域名兜底，不必改代码。 */
const SOURCE_NAMES: Record<string, string> = {
  "www.mirdatabank.com": "MIR DATABANK（MIR睿工业）",
  "mirdatabank.com": "MIR DATABANK（MIR睿工业）",
};

export interface NewsSource {
  name: string;
  url: string;
}

export function newsSourceOf(item: { content: string }): NewsSource | null {
  const matched = SOURCE_LINK.exec(item.content ?? "");
  if (!matched) return null;
  const url = matched[2];
  let host = "";
  try {
    host = new URL(url).host;
  } catch {
    return null;
  }
  return { name: SOURCE_NAMES[host] ?? host, url };
}

/**
 * 分页取新闻。
 *
 * `currentPage` 会被夹进 [1, totalPages]，但**调用方仍须自行对超界页码返回 404**：
 * 夹取是为了渲染不炸，不是为了允许 /news?page=99 返回 200 —— 那会造出无限多个
 * 内容重复的 URL，正是 GSC「重复网页」的来源（2026-10-29 博客侧踩过）。
 */
export function getPaginatedNews(
  locale: Locale,
  category?: NewsCategory,
  page = 1,
  perPage = NEWS_PER_PAGE,
) {
  const items = getNewsForLocale(locale, category);
  const total = items.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / perPage);
  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));
  const start = (currentPage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    total,
    totalPages,
    currentPage,
    perPage,
  };
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return getAllNews().map((item) => item.slug);
}

/**
 * 分类页路径。
 * 与 /news/[slug] 共用一层，靠静态段优先于动态段保证匹配；
 * 因此任何新闻 slug 都不能取 "industry" / "company"（当前 10 篇均不冲突）。
 */
export const NEWS_CATEGORY_PATH: Record<NewsCategory, string> = {
  industry: "/news/industry",
  company: "/news/company",
};

export function formatNewsDate(date: string, locale: Locale = "zh"): string {
  return new Intl.DateTimeFormat(localeHtmlLang[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
