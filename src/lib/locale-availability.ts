/**
 * 单语页面清单 — 语言切换器与服务端共用的唯一真值。
 *
 * 为什么需要它（2026-11-11 体检发现）：
 * `LanguageSwitcher` 原来只做路径前缀替换（`switchLocalePath`），对**所有页面**
 * 都列出 6 个语种。但站内有三类页面的可用语种是收口过的：
 *
 * - `requireEnOnlyLocale()`  → 仅 en：`/solutions/<id>` 六个场景页、6 个英文落地页（`en-landing-pages`）
 *                               注意 `/solutions` 目录页本身**没有**收口，6 语种都能开
 * - `requireZhEnLocale()`    → 仅 zh + en：`/price` `/cases` `/factory` `/guides/selection` `/official` `/privacy`
 * - `requireZhLocale()`      → 仅 zh：6 个中文长尾页、10 篇 MIR 转载稿
 *
 * 结果是从英文专属页切到「中文/越南语/西语/意语/俄语」会直接落到 404。
 * 这类死链比不做切换更糟：用户点了、爬虫跟了，都是 404。
 *
 * 处理原则：**只列真实存在的语种**；用户当前语种不在清单里，则该页本身不该被
 * 这些用户看到（本来就 404），无需额外处理。
 */

import type { Locale } from "@/lib/i18n/config";

/** 仅英文的六个应用场景页（`/solutions/<id>`，见 lib/solution-pages.ts）。 */
const EN_ONLY_SOLUTION_IDS = [
  "cleanroom",
  "machine-tool",
  "robotics",
  "automotive",
  "laser",
  "new-energy",
] as const;

/** 仅英文的落地页 slug（与 lib/en-landing-pages.ts 的 EN_LANDING_PAGES 对应）。 */
const EN_ONLY_LANDING_SLUGS = [
  "cable-carrier",
  "drag-chain",
  "energy-chain",
  "cable-carrier-manufacturer",
  "cable-carrier-price",
  "cable-carrier-guides",
] as const;

/** 仅中英双语页（`requireZhEnLocale()`）。 */
const ZH_EN_PATHS = [
  "/price",
  "/cases",
  "/factory",
  "/guides/selection",
  "/official",
  "/privacy",
] as const;

const ZH_EN_SET = new Set<string>(ZH_EN_PATHS);
const EN_ONLY_TOP_SET = new Set<string>(
  EN_ONLY_LANDING_SLUGS.map((slug) => `/${slug}`),
);

function barePath(pathname: string): string {
  const stripped = pathname
    .replace(/^\/(en|vi|es|it|ru)(?=\/|$)/, "")
    .replace(/(.)\/$/, "$1");
  return stripped || "/";
}

/**
 * 这条路径实际有哪几个语种。
 *
 * `availableLocales` 可由调用方额外传入（例如新闻详情页的逐篇可用语种），
 * 传入时以它为准——它来自数据层，比路径匹配更可信。
 */
export function pageAvailableLocales(
  pathname: string,
  availableLocales?: readonly Locale[],
): readonly Locale[] {
  if (availableLocales && availableLocales.length > 0) return availableLocales;

  const path = barePath(pathname);

  // 仅英文：/solutions/<id> 六个场景页、6 个英文落地页（含其子路径）
  if (/^\/solutions\/[^/]+$/.test(path)) {
    const id = path.slice("/solutions/".length);
    if ((EN_ONLY_SOLUTION_IDS as readonly string[]).includes(id)) return ["en"];
  }
  if (EN_ONLY_TOP_SET.has(path)) return ["en"];

  if (ZH_EN_SET.has(path)) return ["zh", "en"];

  return ["zh", "en", "vi", "es", "it", "ru"];
}
