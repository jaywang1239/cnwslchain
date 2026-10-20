import type { MetadataRoute } from "next";
import { zhSitemap } from "../sitemap";

/**
 * 中文专用 sitemap —— 给百度。
 *
 * /sitemap.xml 是全语种 2174 条（外语页占 83%），提交给百度会把中文页的
 * 抓取配额稀释掉。百度搜索资源平台里只提交这个 /sitemap-zh.xml（约 374 条），
 * Google 继续用 /sitemap.xml（它需要全语种 + hreflang）。
 *
 * 2026-10-20 加：百度可见性检测发现 site:cnwslchain.com 只收录 1 条。
 */
export default function sitemapZh(): MetadataRoute.Sitemap {
  return zhSitemap();
}
