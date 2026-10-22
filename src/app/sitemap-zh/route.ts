import { zhSitemapResponse } from "@/lib/sitemap-zh";

/**
 * `/sitemap-zh` —— 兼容路径，保留给已经拿到这个地址的抓取方。
 *
 * 正式提交给百度的是 `/sitemap-zh.xml`（见 `app/sitemap-zh.xml/route.ts`）。
 * 2026-10-22 修：原来这里放着完整实现，路径缺 `.xml`，导致 robots.txt
 * 声明的 sitemap 地址 404。实现已抽到 `src/lib/sitemap-zh.ts`，这里只做转发。
 */
export function GET(): Response {
  return zhSitemapResponse();
}
