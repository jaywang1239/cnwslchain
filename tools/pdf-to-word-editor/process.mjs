import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import { Document, ImageRun, Packer, Paragraph, SectionType } from "docx";
import { pdf } from "pdf-to-img";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, "config.json");

let fontRegistered = false;

export function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

function ensureChineseFont() {
  if (fontRegistered) return "SimHei";
  const candidates = [
    "C:\\Windows\\Fonts\\simhei.ttf",
    "C:\\Windows\\Fonts\\msyh.ttc",
    "C:\\Windows\\Fonts\\simsun.ttc",
  ];
  const fontPath = candidates.find((item) => fs.existsSync(item));
  if (!fontPath) {
    throw new Error("未找到中文字体 simhei.ttf / msyh.ttc");
  }
  GlobalFonts.registerFromPath(fontPath, "SimHei");
  fontRegistered = true;
  return "SimHei";
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

function wrapText(ctx, text, maxWidth) {
  const lines = [];
  let current = "";
  for (const char of text) {
    const next = current + char;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function overlayCompanyInfo(pngBuffer, config, pageWidthPt, pageHeightPt) {
  const scale = config.scale ?? 2;
  const fontFamily = ensureChineseFont();
  const image = await loadImage(pngBuffer);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  for (const block of config.overlays ?? []) {
    const [x0, y0, x1, y1] = block.rect;
    const x = (x0 / pageWidthPt) * image.width;
    const y = (y0 / pageHeightPt) * image.height;
    const width = ((x1 - x0) / pageWidthPt) * image.width;
    const height = ((y1 - y0) / pageHeightPt) * image.height;
    const fontSize = (block.fontSize ?? 9) * scale;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, width, height);

    const text = resolveFieldText(block.field, config.company);
    ctx.fillStyle = "#000000";
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = "top";

    const lines = wrapText(ctx, text, width - 4 * scale);
    const lineHeight = fontSize + 2 * scale;
    lines.forEach((line, index) => {
      ctx.fillText(line, x + 2 * scale, y + 2 * scale + index * lineHeight);
    });
  }

  return {
    png: canvas.toBuffer("image/png"),
    widthPt: pageWidthPt,
    heightPt: pageHeightPt,
  };
}

function pointsToTwips(value) {
  return Math.round(value * 20);
}

async function buildDocxFromPages(pages) {
  const sections = pages.map((page, index) => ({
    type: index === 0 ? undefined : SectionType.NEXT_PAGE,
    properties: {
      page: {
        size: {
          width: pointsToTwips(page.widthPt),
          height: pointsToTwips(page.heightPt),
        },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
    children: [
      new Paragraph({
        spacing: { before: 0, after: 0, line: 0 },
        children: [
          new ImageRun({
            type: "png",
            data: page.png,
            transformation: {
              width: Math.round(page.widthPt),
              height: Math.round(page.heightPt),
            },
          }),
        ],
      }),
    ],
  }));

  return Packer.toBuffer(new Document({ sections }));
}

export async function convertPdfToWord(inputPath, outputPath, config) {
  const scale = config.scale ?? 2;
  const pageIndex = config.pageIndex ?? 0;
  const doc = await pdf(inputPath, { scale });
  const pngBuffer = await doc.getPage(pageIndex + 1);
  const image = await loadImage(pngBuffer);
  const pageWidthPt = image.width / scale;
  const pageHeightPt = image.height / scale;

  const withOverlay = await overlayCompanyInfo(
    pngBuffer,
    config,
    pageWidthPt,
    pageHeightPt
  );

  const docxBuffer = await buildDocxFromPages([withOverlay]);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, docxBuffer);
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

export async function batchConvert(config, { limit = null, onProgress } = {}) {
  const { inputDir, outputDir } = config;
  let pdfs = listPdfs(inputDir);
  if (limit) pdfs = pdfs.slice(0, limit);

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < pdfs.length; i += 1) {
    const inputPath = pdfs[i];
    const relative = path.relative(inputDir, inputPath);
    const outputPath = path.join(
      outputDir,
      relative.replace(/\.pdf$/i, ".docx")
    );

    try {
      await convertPdfToWord(inputPath, outputPath, config);
      success += 1;
      onProgress?.({
        index: i + 1,
        total: pdfs.length,
        file: relative,
        status: "ok",
      });
    } catch (error) {
      failed += 1;
      errors.push({ file: relative, message: error.message });
      onProgress?.({
        index: i + 1,
        total: pdfs.length,
        file: relative,
        status: "error",
        message: error.message,
      });
    }
  }

  return { total: pdfs.length, success, failed, errors };
}
