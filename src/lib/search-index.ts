import type { Locale } from "@/lib/i18n/config";
import { getMessages, localizeSeriesName } from "@/lib/i18n";
import { getSearchMessages } from "@/lib/i18n/search-messages";
import { getAllCategories, localizeCategory } from "@/lib/product-catalog";
import { localizeMaterial, localizeOpenType } from "@/lib/product-i18n";
import { getAllPosts } from "@/lib/posts";
import { getAllNews } from "@/lib/news";
import { getAllDownloads, localizeDownload } from "@/lib/downloads";
import { localizePostContent, localizeNewsContent } from "@/lib/content-i18n";
import specsData from "../../data/product-specs.json";

/**
 * 全站检索索引（2026-10-10 新增）。
 *
 * 聚合站内全部可检索内容：产品型号、产品分类、产品系列、技术文章、新闻展会、
 * 资料下载、固定页面。索引在**服务端**构建（本模块只被 `src/app/search/page.tsx`
 * 引入），不向浏览器下发索引体积。
 *
 * 匹配同时支持：
 *  - 文字：型号代号、分类/系列名、材质、开口类型、文章标题与正文、页面名（任意语种关键词）
 *  - 数字：内高 / 内宽 / 弯曲半径的**精确数值**（如 65、100），避免 "5" 误配 "50"
 */

export type SearchGroup = "products" | "blog" | "news" | "downloads" | "pages";

export interface SearchEntry {
  id: string;
  group: SearchGroup;
  title: string;
  description: string;
  /** 未加语言前缀的站内路径，渲染时用 localizeHref 加前缀 */
  href: string;
  /** 小写检索文本（含正文，仅用于匹配，不展示） */
  haystack: string;
  /** 可精确匹配的数值：内高 / 内宽 / 弯曲半径 */
  numbers: number[];
}

export interface SearchGroupResult {
  group: SearchGroup;
  /** 命中总数（可能大于 items.length） */
  total: number;
  items: SearchEntry[];
}

interface RawSpec {
  id: string;
  categoryId: string;
  seriesId: string;
  innerHeight: number;
  innerWidth: number;
  code: string;
  connector: string;
  bendRadii: number[];
  material: string;
  openType: string;
}

const specs = specsData as RawSpec[];

/** 各语种的「拖链」说法，让任意语种关键词都能命中产品条目 */
const TYPE_ALIASES: Record<Locale, string> = {
  zh: "拖链 坦克链 线缆保护链 尼龙拖链 塑料拖链 工程拖链",
  en: "cable carrier cable chain drag chain energy chain nylon chain",
  vi: "xích dẫn cáp",
  es: "portacables cadena portacables",
  it: "catena portacavi",
  ru: "кабельная цепь кабеленесущая цепь",
};

/** 跨语种通用别名：任何语种站点都能用英文/中文核心词命中 */
const UNIVERSAL_ALIASES = "cable carrier drag chain energy chain 拖链";

const GROUP_ORDER: SearchGroup[] = [
  "products",
  "blog",
  "news",
  "downloads",
  "pages",
];

export function searchGroupOrder(): SearchGroup[] {
  return [...GROUP_ORDER];
}

function lower(value: string): string {
  return value.toLowerCase();
}

/** 全角转半角 + 小写 + 压缩空白，让「６５」和「65」等价 */
export function normalizeQuery(raw: string): string {
  return raw
    .replace(/[\uFF01-\uFF5E]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    .replace(/[\u3000\s]+/g, " ")
    .replace(/[，、；]/g, " ")
    .trim()
    .toLowerCase();
}

function sizeLabel(locale: Locale, h: number, w: number): string {
  const s = getSearchMessages(locale);
  return `${s.innerHeight} ${h} mm / ${s.innerWidth} ${w} mm`;
}

export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const m = getMessages(locale);
  const s = getSearchMessages(locale);
  const alias = `${TYPE_ALIASES[locale]} ${UNIVERSAL_ALIASES}`;

  const categories = getAllCategories();

  // ── 1. 产品分类 ──
  for (const category of categories) {
    const localized = localizeCategory(category, locale);
    entries.push({
      id: `cat:${category.id}`,
      group: "products",
      title: localized.name,
      description: localized.description,
      href: `/products/${category.id}`,
      haystack: lower(
        [
          category.id,
          localized.name,
          localized.description,
          localized.intro,
          localized.applications.join(" "),
          alias,
        ].join(" "),
      ),
      numbers: [],
    });
  }

  // ── 2. 产品系列 ──
  for (const category of categories) {
    const localizedCategory = localizeCategory(category, locale);
    for (const series of category.series) {
      const seriesName = localizeSeriesName(series.name, locale);
      entries.push({
        id: `series:${category.id}:${series.id}`,
        group: "products",
        title: `${localizedCategory.name} · ${seriesName}`,
        description: series.code,
        href: `/products/${category.id}/${series.id}`,
        haystack: lower(
          [
            category.id,
            series.id,
            series.code,
            seriesName,
            localizedCategory.name,
            alias,
          ].join(" "),
        ),
        numbers: /^\d+$/.test(series.id) ? [Number(series.id)] : [],
      });
    }
  }

  // ── 3. 产品型号（304 条）──
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  for (const spec of specs) {
    const category = categoryById.get(spec.categoryId);
    const localizedCategory = category
      ? localizeCategory(category, locale)
      : undefined;
    const series = category?.series.find((item) => item.id === spec.seriesId);
    const seriesName = series
      ? localizeSeriesName(series.name, locale)
      : spec.seriesId;
    const material = localizeMaterial(spec.material, locale);
    const openType = localizeOpenType(spec.openType, locale);
    const radii = spec.bendRadii.map((r) => `R${r}`);

    entries.push({
      id: `spec:${spec.id}`,
      group: "products",
      title: spec.code,
      description: [
        localizedCategory?.name ?? spec.categoryId,
        seriesName,
        sizeLabel(locale, spec.innerHeight, spec.innerWidth),
        material,
        radii.join(" / "),
      ]
        .filter(Boolean)
        .join(" · "),
      href: `/products/model/${spec.id}`,
      haystack: lower(
        [
          spec.code,
          spec.id,
          spec.connector,
          spec.categoryId,
          spec.seriesId,
          localizedCategory?.name ?? "",
          seriesName,
          spec.material,
          material,
          spec.openType,
          openType,
          radii.join(" "),
          alias,
        ].join(" "),
      ),
      numbers: [spec.innerHeight, spec.innerWidth, ...spec.bendRadii],
    });
  }

  // ── 4. 技术文章（仅线上可见篇）──
  for (const post of getAllPosts()) {
    const localized = localizePostContent(post, locale);
    entries.push({
      id: `post:${post.slug}`,
      group: "blog",
      title: localized.title,
      description: localized.excerpt,
      href: `/blog/${post.slug}`,
      haystack: lower(
        [
          post.slug,
          localized.title,
          localized.excerpt,
          localized.content,
          localized.category,
        ].join(" "),
      ),
      numbers: [],
    });
  }

  // ── 5. 新闻展会 ──
  for (const item of getAllNews()) {
    const localized = localizeNewsContent(item, locale);
    const hasTranslation = localized.title && localized.title !== item.slug;
    entries.push({
      id: `news:${item.slug}`,
      group: "news",
      title: hasTranslation ? localized.title : item.title,
      description: `${hasTranslation ? localized.type : item.type} · ${item.date}`,
      href: `/news/${item.slug}`,
      haystack: lower(
        [
          item.slug,
          item.title,
          item.content,
          localized.title,
          localized.content,
          item.type,
          localized.type,
        ].join(" "),
      ),
      numbers: [],
    });
  }

  // ── 6. 资料下载 ──
  for (const item of getAllDownloads()) {
    const localized = localizeDownload(item, locale);
    entries.push({
      id: `download:${item.id}`,
      group: "downloads",
      title: localized.title,
      description: `${item.format} · ${item.fileSize}`,
      href: "/downloads",
      haystack: lower(
        [
          item.id,
          item.title,
          item.description,
          localized.title,
          localized.description,
          item.section,
          item.format,
        ].join(" "),
      ),
      numbers: [],
    });
  }

  // ── 7. 固定页面 ──
  const pages: { href: string; label: string; description: string }[] = [
    { href: "/", label: m.home, description: m.brandFull },
    { href: "/products", label: m.nav.products, description: m.products.subtitle },
    { href: "/solutions", label: m.nav.solutions, description: m.solutions.description },
    { href: "/cases", label: s.pageCases, description: "" },
    { href: "/factory", label: s.pageFactory, description: "" },
    { href: "/price", label: s.pagePrice, description: "" },
    { href: "/downloads", label: m.nav.downloads, description: m.downloads.subtitle },
    { href: "/guides/selection", label: s.pageGuides, description: m.products.subtitle },
    { href: "/blog", label: m.nav.blog, description: m.blog.subtitle },
    { href: "/news", label: m.nav.news, description: m.news.subtitle },
    { href: "/about", label: m.nav.about, description: m.about.metaDescription },
    { href: "/contact", label: m.nav.contact, description: m.contact.subtitle },
  ];
  for (const page of pages) {
    entries.push({
      id: `page:${page.href}`,
      group: "pages",
      title: page.label,
      description: page.description,
      href: page.href,
      haystack: lower([page.href, page.label, page.description].join(" ")),
      numbers: [],
    });
  }

  return entries;
}

/**
 * 检索并按分组返回。
 *
 * 规则：
 *  - 纯数字 token → 必须在 entry.numbers 中**精确存在**（内高 / 内宽 / R 值）
 *  - 文字 token → 必须全部出现在 haystack（AND）
 *  - 多个 token 用空格分隔，全部满足才算命中
 */
export function searchEntries(
  index: SearchEntry[],
  rawQuery: string,
  perGroupLimit = 60,
): SearchGroupResult[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  const tokens = query.split(" ").filter(Boolean);
  const numeric = tokens
    .filter((t) => /^\d+$/.test(t))
    .map((t) => Number(t));
  const textual = tokens.filter((t) => !/^\d+$/.test(t));

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of index) {
    let score = 0;

    if (numeric.length) {
      if (!numeric.every((n) => entry.numbers.includes(n))) continue;
      score += 40 * numeric.length;
    }

    if (textual.length) {
      const hay = entry.haystack;
      const title = lower(entry.title);
      let hits = 0;
      let titleHits = 0;
      for (const token of textual) {
        if (!hay.includes(token)) {
          hits = -1;
          break;
        }
        hits += 1;
        if (title.includes(token)) titleHits += 1;
      }
      if (hits < 0) continue;
      score += 10 * hits + 20 * titleHits;
    }

    const title = lower(entry.title);
    if (title === query) score += 200;
    else if (title.startsWith(query)) score += 90;
    else if (title.includes(query)) score += 40;
    if (entry.haystack.includes(query)) score += 20;
    // 产品型号优先于页面/资料的同等命中
    if (entry.group === "products") score += 6;

    scored.push({ entry, score });
  }

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      a.entry.title.localeCompare(b.entry.title, "zh-Hans-CN"),
  );

  const byGroup = new Map<SearchGroup, SearchEntry[]>();
  for (const { entry } of scored) {
    const list = byGroup.get(entry.group) ?? [];
    list.push(entry);
    byGroup.set(entry.group, list);
  }

  return GROUP_ORDER.filter((group) => byGroup.has(group)).map((group) => {
    const all = byGroup.get(group) ?? [];
    return { group, total: all.length, items: all.slice(0, perGroupLimit) };
  });
}
