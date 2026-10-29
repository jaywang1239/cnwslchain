/**
 * sitemap 的日期口径（全站唯一来源）。
 *
 * 为什么单独抽一个文件：全语种 sitemap（app/sitemap.ts）和中文 sitemap
 * （lib/sitemap-zh.ts）各自维护一份构建日期，很容易一边改了另一边忘改，
 * 导致同一页面在两条 sitemap 里 lastmod 不一致 —— 搜索引擎会认为
 * 站点在自相矛盾，降低对 lastmod 的信任。
 *
 * ⚠️ 不要把这张表写回 app/sitemap.ts：那个文件一旦多出 export 成员，
 * Next 就不再把它当 sitemap 路由处理，/sitemap.xml 直接 404（10-20 踩过）。
 */

/** 静态营销页的构建基线（内容未单独登记的页面吃这个日期）。 */
export const SITE_BUILT_AT = new Date("2026-09-07T00:00:00.000Z");

/**
 * 静态页的真实内容变更日期。
 *
 * 背景（2026-10-29 Google 收录体检）：此前所有静态页都吃 SITE_BUILT_AT，
 * 但 10 月这批页面确实改过 —— /about 加了 Fraunhofer IPA 与 CTI 证书、
 * /downloads 撤掉证书类条目、中英长尾页 10-16 才升级成双语。
 * lastmod 停在 9 月会让 Google 判定"这页没动过"，压低重抓优先级。
 *
 * 纪律：只登记**确有其事**的日期。型号页/系列页的数据自 9-07 起没改过，
 * 继续吃 SITE_BUILT_AT —— 虚报 lastmod 会被 Google 反向忽略，宁可标旧。
 */
const PAGE_LAST_MODIFIED: Record<string, string> = {
  "/about": "2026-10-22",
  "/downloads": "2026-10-22",
  "/price": "2026-10-16",
  "/cases": "2026-10-16",
  "/factory": "2026-10-16",
  "/guides/selection": "2026-10-16",
  "/official": "2026-10-19",
  "/privacy": "2026-10-19",
};

/** 取某路径的真实 lastmod；未登记的回落构建基线。 */
export function pageLastModified(path: string): Date {
  const raw = PAGE_LAST_MODIFIED[path];
  return raw ? new Date(`${raw}T00:00:00.000Z`) : SITE_BUILT_AT;
}
