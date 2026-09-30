import type { ReactNode } from "react";

/**
 * 轻量 Markdown 渲染器（零依赖）
 *
 * 只支持博客正文真正需要的子集：
 *   ## 二级标题 / ### 三级标题
 *   普通段落
 *   - 无序列表 / 1. 有序列表
 *   | 表头 | 表头 |  表格（含 |---| 分隔行）
 *   **加粗**、`行内代码`、[文字](链接)
 *
 * 设计原则：**向后兼容**。不含任何 Markdown 标记的历史纯文本文章，
 * 走 splitBlocks 后仍是一串 <p>，与旧版渲染结果完全一致。
 */

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

const H2 = /^##\s+(.*)$/;
const H3 = /^###\s+(.*)$/;
const UL = /^[-*]\s+(.*)$/;
const OL = /^\d+[.)]\s+(.*)$/;
const TABLE_SEP = /^\|?[\s:|-]+\|[\s:|-]*$/;

function cells(line: string): string[] {
  return line
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((c) => c.trim());
}

function isTableStart(lines: string[], i: number): boolean {
  return (
    lines[i].includes("|") &&
    i + 1 < lines.length &&
    lines[i + 1].includes("-") &&
    TABLE_SEP.test(lines[i + 1].trim())
  );
}

export function splitBlocks(content: string): Block[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];

  const flush = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ").trim() });
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const t = line.trim();

    if (!t) {
      flush();
      continue;
    }

    if (isTableStart(lines, i)) {
      flush();
      const head = cells(lines[i]);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().includes("|")) {
        rows.push(cells(lines[i]));
        i += 1;
      }
      i -= 1;
      blocks.push({ type: "table", head, rows });
      continue;
    }

    let m = H3.exec(t);
    if (m) {
      flush();
      blocks.push({ type: "h3", text: m[1] });
      continue;
    }

    m = H2.exec(t);
    if (m) {
      flush();
      blocks.push({ type: "h2", text: m[1] });
      continue;
    }

    m = UL.exec(t);
    if (m) {
      flush();
      const items = [m[1]];
      while (i + 1 < lines.length && UL.test(lines[i + 1].trim())) {
        i += 1;
        items.push(UL.exec(lines[i].trim())![1]);
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    m = OL.exec(t);
    if (m) {
      flush();
      const items = [m[1]];
      while (i + 1 < lines.length && OL.test(lines[i + 1].trim())) {
        i += 1;
        items.push(OL.exec(lines[i].trim())![1]);
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    para.push(t);
  }

  flush();
  return blocks;
}

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function renderInline(text: string, keyPrefix = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  const parts = text.split(INLINE).filter((p) => p !== "" && p !== undefined);

  parts.forEach((part, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      out.push(
        <strong key={key} className="font-semibold text-brand-primary">
          {part.slice(2, -2)}
        </strong>,
      );
      return;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      out.push(
        <code
          key={key}
          className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-brand-primary"
        >
          {part.slice(1, -1)}
        </code>,
      );
      return;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const href = link[2];
      const internal = href.startsWith("/");
      out.push(
        <a
          key={key}
          href={href}
          target={internal ? undefined : "_blank"}
          rel={internal ? undefined : "noopener noreferrer"}
          className="font-medium text-brand-secondary underline decoration-brand-secondary/40 underline-offset-2 hover:text-brand-primary"
        >
          {link[1]}
        </a>,
      );
      return;
    }
    out.push(<span key={key}>{part}</span>);
  });

  return out;
}

export function BlogBody({ content }: { content: string }) {
  const blocks = splitBlocks(content);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const key = `b-${i}`;

        if (block.type === "h2") {
          return (
            <h2
              key={key}
              className="mt-8 border-l-4 border-brand-secondary pl-3 text-xl font-bold tracking-tight text-brand-primary sm:text-2xl"
            >
              {renderInline(block.text, key)}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={key}
              className="mt-6 text-lg font-semibold text-brand-primary"
            >
              {renderInline(block.text, key)}
            </h3>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={key} className="ml-5 list-disc space-y-2 text-foreground/80">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`} className="leading-relaxed">
                  {renderInline(item, `${key}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ol") {
          return (
            <ol
              key={key}
              className="ml-5 list-decimal space-y-2 text-foreground/80"
            >
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`} className="leading-relaxed">
                  {renderInline(item, `${key}-${j}`)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "table") {
          return (
            <div key={key} className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {block.head.map((h, j) => (
                      <th
                        key={`${key}-h-${j}`}
                        className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-brand-primary"
                      >
                        {renderInline(h, `${key}-h-${j}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={`${key}-r-${j}`}>
                      {row.map((c, k) => (
                        <td
                          key={`${key}-r-${j}-${k}`}
                          className="border border-gray-200 px-3 py-2 align-top text-foreground/80"
                        >
                          {renderInline(c, `${key}-r-${j}-${k}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <p key={key} className="text-base leading-relaxed text-foreground/80">
            {renderInline(block.text, key)}
          </p>
        );
      })}
    </div>
  );
}
