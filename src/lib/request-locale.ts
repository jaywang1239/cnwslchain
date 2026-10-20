import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Locale for the current request.
 * Middleware sets `x-locale` from the URL prefix (`/en/...` → en, unprefixed → zh).
 * Never infer from cookie here — URL language must win for SEO and content.
 *
 * Next.js 15 起 `headers()` 的返回值类型改为 Promise，但同步读取路径在 15.x 仍然可用
 * （会输出 deprecation 提示）。这里刻意保留同步签名：
 * 改成 async 会级联到 18 个文件、34 个调用点（含 layout / not-found / zh-only 守卫），
 * 属于独立重构，不塞进本次安全升级。**升级 Next.js 16 时必须一并改为 await headers()**，
 * 因为 16 已移除同步访问路径。
 */
export function getRequestLocale(): Locale {
  // 仅为绕过 15.x 的类型声明，运行时行为与升级前一致。
  const store = headers() as unknown as { get(name: string): string | null };
  const value = store.get("x-locale");
  return isLocale(value) ? value : defaultLocale;
}
