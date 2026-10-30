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

/**
 * 仅英文页面的语言收口（2026-10-30 新增）。
 *
 * 适用对象：`/solutions/[id]` 六个英文应用场景落地页。它们是为北美市场
 * 的 "cable carrier" 场景词建的，文案只有英文（写在 `lib/solution-pages.ts`）。
 *
 * 与 `requireZhEnLocale()` 的区别：中文也 404。因此这些页面**不能声明 hreflang**
 * （`localeAlternates()` 会把 zh 也写进去 → 声明了一个 404 地址），
 * 也不能进 `/sitemap-zh`。sitemap 里只登记 `/en/...` 单条、不带 alternates。
 *
 * 恢复方式：补齐中文（或其他语种）文案后，改回 `getRequestLocale()`，
 * 同时把 sitemap 换成 `entry()` 并补 hreflang。
 */
export function requireEnOnlyLocale(): Locale {
  const locale = getRequestLocale();
  if (locale !== "en") notFound();
  return locale;
}
