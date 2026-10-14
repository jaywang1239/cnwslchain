import { notFound } from "next/navigation";
import { getRequestLocale } from "@/lib/request-locale";
import type { Locale } from "@/lib/i18n/config";

/**
 * 仅中文页面的语言收口（2026-10-14 站点体检新增）。
 *
 * 背景：`/price`、`/cases`、`/factory`、`/guides/selection` 四个页面目前只有中文文案
 * （内容硬编码在各页面的 `page.tsx` 里，未接入 messages.ts 的多语种字典）。
 * 此前它们的非中文 URL（如 /en/price、 /es/cases）同样能打开，
 * 但标题与正文全是中文、且带 `index, follow`，会被搜索引擎当成
 * 「语言不匹配的低质/重复页」收录，海外访客点进来也读不懂。
 *
 * 处理：非中文语种直接走站内 404 —— 与 sitemap 中「仅中文」的声明保持一致。
 * 404 页自带 6 语种文案（见 `src/app/not-found.tsx`），不会出现英文裸奔。
 *
 * 恢复方式：等某个页面补齐了译文（改为从 messages.ts 取多语种文案），
 * 把该页面里的 `requireZhLocale()` 换回 `getRequestLocale()` 即可放开。
 */
export function requireZhLocale(): Locale {
  const locale = getRequestLocale();
  if (locale !== "zh") notFound();
  return locale;
}
