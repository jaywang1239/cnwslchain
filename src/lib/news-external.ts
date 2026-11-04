import rawExternalNews from "./news-external.json";

import type { NewsItem } from "./news";

/**
 * 第三方产业媒体的精编转载（2026-11-04 接入）。
 *
 * 为什么不写进 `data/news.json`：
 * 本地 `data/` 是线上镜像，历史上落后过线上，整文件提交会回滚线上已有文章
 * （2026-10-20 踩过）。转载内容单独放这里，提交只走 `src/` 代码，风险隔离。
 *
 * 版权边界（收录前逐站核对过文末声明）：
 *   - MIR DATABANK（MIR睿工业）文末写明「转载以上内容请注明来源 MIR睿工业」
 *     → 可转载，每篇须署名 + 挂原文链接，正文为我方精编摘要而非全文搬运；
 *   - TrendForce 集邦咨询文末写明「版权所有 不得转载」→ **未收录**；
 *   - 高工 gaogong.com.cn 站点处于「网站维护中」→ **未收录**，恢复后再评估。
 *
 * 新增条目时：`date` 用原文发布日期（YYYY-MM-DD），`type` 一律写「企业新闻」，
 * 摘要末尾保留「来源」小节。`content` 用与详情页一致的 Markdown
 * （##/### 标题、列表、表格、普通段落）。
 */
export const EXTERNAL_NEWS: NewsItem[] = rawExternalNews as unknown as NewsItem[];
