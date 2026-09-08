import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, "config.json");

export function loadConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

function findFontPath() {
  const candidates = [
    "C:\\Windows\\Fonts\\simhei.ttf",
    "C:\\Windows\\Fonts\\simsun.ttc",
    "C:\\Windows\\Fonts\\msyh.ttc",
  ];
  return candidates.find((item) => fs.existsSync(item));
}

function resolveFieldText(field, company) {
  if (field === "phoneFax") {
    return `电话：${company.phone || ""}  传真：${company.fax || ""}`;
  }
  if (field === "emailWeb") {
    return `邮箱：${company.email || ""}  网站：${company.website || ""}`;
  }
  return company[field] || "";
}

/** pdf-lib 坐标原点在左下角，配置里用左上角坐标系 */
function toPdfRect(pageHeight, rect) {
  const [x0, y0, x1, y1] = rect;
  return {
    x: x0,
    y: pageHeight - y1,
    width: x1 - x0,
    height: y1 - y0,
  };
}

export async function applyOverlays(inputPath, outputPath, config) {
  const fontPath = findFontPath();
  if (!fontPath) {
    throw new Error("未找到中文字体 msyh.ttc / simsun.ttc");
  }

  const bytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = fs.readFileSync(fontPath);
  const font = await pdfDoc.embedFont(fontBytes);

  const pageIndex = config.pageIndex ?? 0;
  const pages = pdfDoc.getPages();
  if (pageIndex >= pages.length) {
    throw new Error(`页码超出范围: ${pageIndex}`);
  }

  const page = pages[pageIndex];
  const pageHeight = page.getHeight();

  for (const block of config.overlays) {
    const rect = toPdfRect(pageHeight, block.rect);
    page.drawRectangle({
      ...rect,
      color: rgb(1, 1, 1),
      borderWidth: 0,
    });

    const text = resolveFieldText(block.field, config.company);
    page.drawText(text, {
      x: rect.x + 2,
      y: rect.y + rect.height - block.fontSize - 2,
      size: block.fontSize ?? 9,
      font,
      color: rgb(0, 0, 0),
      maxWidth: rect.width - 4,
      lineHeight: (block.fontSize ?? 9) + 2,
    });
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const out = await pdfDoc.save();
  fs.writeFileSync(outputPath, out);
}

export function listPdfs(rootDir) {
  const results = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.toLowerCase().endsWith(".pdf")) results.push(full);
    }
  }
  walk(rootDir);
  return results.sort();
}

export async function batchProcess(config, { limit = null, onProgress } = {}) {
  const inputDir = config.inputDir;
  const outputDir = config.outputDir;
  let pdfs = listPdfs(inputDir);
  if (limit) pdfs = pdfs.slice(0, limit);

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < pdfs.length; i += 1) {
    const inputPath = pdfs[i];
    const relative = path.relative(inputDir, inputPath);
    const outputPath = path.join(outputDir, relative);
    try {
      await applyOverlays(inputPath, outputPath, config);
      success += 1;
    } catch (error) {
      failed += 1;
      errors.push(`${relative}: ${error.message}`);
    }
    if (onProgress) onProgress(i + 1, pdfs.length, relative);
  }

  return { success, failed, errors, total: pdfs.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const config = loadConfig();
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : null;

  console.log(`输入: ${config.inputDir}`);
  console.log(`输出: ${config.outputDir}`);
  console.log(`开始处理...`);

  batchProcess(config, {
    limit,
    onProgress(current, total, name) {
      if (current % 50 === 0 || current === total) {
        console.log(`${current}/${total} ${name}`);
      }
    },
  }).then((result) => {
    console.log(`完成: 成功 ${result.success}, 失败 ${result.failed}`);
    if (result.errors.length) {
      console.log(result.errors.slice(0, 10).join("\n"));
    }
  });
}
