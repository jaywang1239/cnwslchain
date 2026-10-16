import { notFound } from "next/navigation";
import { getRequestLocale } from "@/lib/request-locale";
import type { Locale } from "@/lib/i18n/config";

/**
 * 仅中英双语页面的语言收口。
 *
 * 背景：`/price`、`/cases`、`/factory`、`/guides/selection` 四个页面是面向
 * 国内 SEO 的长尾落地页，文案以内联方式写在各自的 `page.tsx` 里（未接入
 * messages.ts 的多语种字典）。2026-10-14 体检时它们只有中文，非中文 URL 会
 * 返回中文内容；当时统一收口为「非中文一律 404」，避免语言不匹配的低质页被收录。
 *
 * 2026-10-16 更新：这 4 个页面补齐了英文文案（内联 `zh` / `en` 双版本，按 locale 切换），
 * 因此放开英文；越南文 / 西文 / 意文 / 俄文仍走 404，与 sitemap 的声明保持一致。
 *
 * 404 页自带 6 语种文案（见 `src/app/not-found.tsx`），不会出现英文裸奔。
 *
 * 恢复方式：等某页补齐其余语种译文后，把该页面里的 `requireZhEnLocale()`
 * 换回 `getRequestLocale()` 即可放开。
 */
const SUPPORTED: readonly Locale[] = ["zh", "en"];

export function requireZhEnLocale(): Locale {
  const locale = getRequestLocale();
  if (!SUPPORTED.includes(locale)) notFound();
  return locale;
}
