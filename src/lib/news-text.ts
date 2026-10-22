/**
 * 新闻正文的轻量块解析。
 *
 * 为什么需要（2026-10-22 加）：
 * data/news.json 里的 content 一直是纯文本，详情页只按空行切段落。证书类、
 * 展会回顾类新闻经常要放小标题和数据表，纯段落会挤成一坨、可读性差。
 *
 * 这里只支持四种最小语法，够用且不会把编辑端搞复杂：
 *   ## 小标题        → heading(2)
 *   ### 小标题       → heading(3)
 *   - 条目（每行）    → list
 *   | 单元格 | 单元格 | → table（第一行为表头，| --- | 分隔行自动跳过）
 *   其余              → paragraph
 *
 * 兼容性：老文章的内容里没有这些符号，全部落到 paragraph 分支，渲染结果与
 * 改造前一致。
 */

export type NewsBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "paragraph"; text: string };

/** Markdown 表格的分隔行：| --- | :---: | */
const TABLE_SEPARATOR = /^\|?[\s:|-]+\|?$/;

function splitRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function parseNewsBlocks(content: string): NewsBlock[] {
  const chunks = content
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const blocks: NewsBlock[] = [];

  for (const chunk of chunks) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    if (lines[0].startsWith("|")) {
      const rows = lines
        .filter((line) => !TABLE_SEPARATOR.test(line))
        .map(splitRow);
      if (rows.length > 0) {
        blocks.push({ type: "table", head: rows[0], rows: rows.slice(1) });
        continue;
      }
    }

    if (lines.every((line) => line.startsWith("- "))) {
      blocks.push({
        type: "list",
        items: lines.map((line) => line.slice(2).trim()).filter(Boolean),
      });
      continue;
    }

    if (lines[0].startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: lines[0].slice(4).trim() });
      continue;
    }

    if (lines[0].startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: lines[0].slice(3).trim() });
      continue;
    }

    blocks.push({ type: "paragraph", text: lines.join(" ") });
  }

  return blocks;
}

function blockText(block: NewsBlock): string {
  switch (block.type) {
    case "heading":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "table":
      return [block.head.join(" "), ...block.rows.map((row) => row.join(" "))].join(" ");
    default:
      return block.text;
  }
}

/** 去掉语法符号后的纯文本，用于 <meta description>、JSON-LD 与列表摘要。 */
export function plainNewsText(content: string): string {
  return parseNewsBlocks(content)
    .map(blockText)
    .join(" ")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 列表卡片摘要：取第一个块，超长截断。 */
export function newsExcerpt(content: string, max = 140): string {
  const first = parseNewsBlocks(content)[0];
  const text = (first ? blockText(first) : "").replace(/\*\*/g, "");
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}
