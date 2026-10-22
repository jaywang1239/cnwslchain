import { zhSitemapResponse } from "@/lib/sitemap-zh";

/**
 * `/sitemap-zh.xml` —— robots.txt 与百度搜索资源平台实际提交的地址。
 *
 * 2026-10-22 修正：之前只有 `/sitemap-zh`（少 `.xml`），robots 声明的
 * `/sitemap-zh.xml` 一直是 404。目录名带点号即可产出带后缀的静态路由。
 */
export function GET(): Response {
  return zhSitemapResponse();
}
