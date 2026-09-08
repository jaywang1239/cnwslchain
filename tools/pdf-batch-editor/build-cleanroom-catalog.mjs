import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import { PDFDocument } from "pdf-lib";

async function loadLocalImage(filePath) {
  return loadImage(fs.readFileSync(filePath));
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const PREVIEW = path.join(ROOT, ".tools/pdf-preview");
const OUT_DIR = path.join(ROOT, ".tools/cleanroom-catalog");
const FONT = "C:/Windows/Fonts/msyh.ttc";
const FONT_BOLD = fs.existsSync("C:/Windows/Fonts/msyhbd.ttc")
  ? "C:/Windows/Fonts/msyhbd.ttc"
  : FONT;
const INTRO_PDF = "C:/Users/Administrator/Desktop/资料/无尘拖链/威仕龙无尘拖链简介.pdf";

fs.mkdirSync(OUT_DIR, { recursive: true });
GlobalFonts.registerFromPath(FONT, "YaHei");
GlobalFonts.registerFromPath(FONT_BOLD, "YaHeiBold");

const W = 1920;
const H = 1080;
// 中国红主色 + 鎏金点缀 + 墨色文字 + 暖白底
const RED = "#E60012";
const RED_DEEP = "#B8000E";
const GOLD = "#D4AF37";
const GOLD_SOFT = "#F0E0A8";
const INK = "#1A1A1A";
const MUTED = "#5C5346";
const PAPER = "#FFF9F5";
const CARD_BG = "#FFF1F0";
const CARD_BORDER = "#F0C4C4";
const HEADER_H = 72;
const FOOTER_H = 48;
const CONTENT_TOP = 130;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawChrome(ctx, { title = "产品概述", sectionNo = "03", sectionTitle = "技术参数 · 安装尺寸", model = "", pageNo }) {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // 中国红顶栏 + 金色底边
  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, W, HEADER_H);
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, HEADER_H - 5, W, 5);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px YaHeiBold";
  ctx.fillText(title, 48, 48);

  // 白底金字标
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(W - 220, 12, 180, 48);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.strokeRect(W - 220, 12, 180, 48);
  ctx.fillStyle = RED_DEEP;
  ctx.font = "bold 28px YaHeiBold";
  ctx.fillText("CNWSL", W - 185, 45);

  const sy = HEADER_H + 18;
  if (sectionNo) {
    roundRect(ctx, 48, sy, 52, 36, 8);
    ctx.fillStyle = RED;
    ctx.fill();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px YaHeiBold";
    ctx.fillText(sectionNo, 58, sy + 26);

    ctx.fillStyle = RED_DEEP;
    ctx.font = "bold 28px YaHeiBold";
    ctx.fillText(sectionTitle, 116, sy + 28);
  }

  if (model) {
    ctx.font = "bold 22px YaHeiBold";
    const mw = ctx.measureText(model).width + 40;
    roundRect(ctx, W - 48 - mw, sy, mw, 36, 8);
    ctx.fillStyle = RED_DEEP;
    ctx.fill();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = GOLD_SOFT;
    ctx.fillText(model, W - 48 - mw + 20, sy + 26);
  }

  ctx.strokeStyle = CARD_BORDER;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, H - FOOTER_H);
  ctx.lineTo(W - 48, H - FOOTER_H);
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = "18px YaHei";
  const foot = "CNWSL · 威仕龙·塑动未来 | We Set Links · www.cnwslchain.com";
  ctx.fillText(foot, (W - ctx.measureText(foot).width) / 2, H - 18);

  ctx.fillStyle = INK;
  ctx.font = "20px YaHei";
  ctx.fillText(String(pageNo), W - 60, H - 18);
}

async function makeModelPage({ srcPng, pageNo, model, crop }) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawChrome(ctx, {
    model,
    pageNo,
    sectionTitle: `技术参数 · ${model}`,
  });

  const img = await loadLocalImage(srcPng);
  const areaX = 36;
  const areaY = CONTENT_TOP;
  const areaW = W - 72;
  const areaH = H - CONTENT_TOP - FOOTER_H - 16;

  const sx = crop?.x ?? 0;
  const sy = crop?.y ?? 0;
  const sw = crop?.w ?? img.width;
  const sh = crop?.h ?? img.height;

  const scale = Math.min(areaW / sw, areaH / sh);
  const dw = sw * scale;
  const dh = sh * scale;
  const dx = areaX + (areaW - dw) / 2;
  const dy = areaY + (areaH - dh) / 2;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(areaX - 4, areaY - 4, areaW + 8, areaH + 8);
  ctx.strokeStyle = CARD_BORDER;
  ctx.strokeRect(areaX - 4, areaY - 4, areaW + 8, areaH + 8);
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

  const out = path.join(OUT_DIR, `model-${pageNo}.png`);
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return out;
}

async function makeTocPage(pageNo, entries) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawChrome(ctx, { title: "目录", sectionNo: "", sectionTitle: "", pageNo });

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, HEADER_H, W, H - HEADER_H - FOOTER_H);

  ctx.strokeStyle = CARD_BORDER;
  ctx.beginPath();
  ctx.moveTo(48, H - FOOTER_H);
  ctx.lineTo(W - 48, H - FOOTER_H);
  ctx.stroke();
  ctx.fillStyle = MUTED;
  ctx.font = "18px YaHei";
  const foot = "CNWSL · 威仕龙·塑动未来 | We Set Links · www.cnwslchain.com";
  ctx.fillText(foot, (W - ctx.measureText(foot).width) / 2, H - 18);
  ctx.fillStyle = INK;
  ctx.font = "20px YaHei";
  ctx.fillText(String(pageNo), W - 60, H - 18);

  let y = 180;
  for (const e of entries) {
    roundRect(ctx, 160, y - 8, 64, 44, 10);
    ctx.fillStyle = RED;
    ctx.fill();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px YaHeiBold";
    ctx.fillText(e.no, 172, y + 22);

    ctx.fillStyle = INK;
    ctx.font = "bold 30px YaHeiBold";
    ctx.fillText(e.title, 250, y + 24);

    const left = 250 + ctx.measureText(e.title).width + 24;
    const right = W - 220;
    ctx.fillStyle = GOLD_SOFT;
    for (let x = left; x < right; x += 10) ctx.fillRect(x, y + 16, 4, 2);

    ctx.fillStyle = RED_DEEP;
    ctx.font = "bold 28px YaHeiBold";
    ctx.fillText(String(e.page), W - 200, y + 24);
    y += 72;
  }

  const out = path.join(OUT_DIR, "toc.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return out;
}

async function makeSeriesIndexPage(pageNo, models) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawChrome(ctx, { pageNo, sectionNo: "03", sectionTitle: "型号一览 · 技术参数" });

  ctx.fillStyle = MUTED;
  ctx.font = "22px YaHei";
  ctx.fillText(
    "以下型号参数统一按简介母版版式整理，具体尺寸/安装数据来自威仕龙无尘拖链6.27规格资料。",
    48,
    CONTENT_TOP - 10
  );

  const cols = 4;
  const cardW = 420;
  const cardH = 160;
  const gapX = 28;
  const gapY = 24;
  const startX = 48;
  const startY = CONTENT_TOP + 30;

  models.forEach((m, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    roundRect(ctx, x, y, cardW, cardH, 12);
    ctx.fillStyle = CARD_BG;
    ctx.fill();
    ctx.strokeStyle = CARD_BORDER;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // 左侧金红竖条
    ctx.fillStyle = RED;
    ctx.fillRect(x, y + 12, 4, cardH - 24);
    ctx.fillStyle = GOLD;
    ctx.fillRect(x + 4, y + 12, 2, cardH - 24);

    ctx.fillStyle = RED_DEEP;
    ctx.font = "bold 28px YaHeiBold";
    ctx.fillText(m.code, x + 28, y + 48);

    ctx.fillStyle = INK;
    ctx.font = "20px YaHei";
    ctx.fillText(`内高×内宽：${m.innerH} × ${m.innerW} mm`, x + 28, y + 88);
    ctx.fillText(`弯曲半径：${m.radii}`, x + 28, y + 118);
    ctx.fillText(`寿命：${m.life}`, x + 28, y + 148);
  });

  const out = path.join(OUT_DIR, "series-index.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return out;
}

const hi = (n) => path.join(PREVIEW, `hi-spec-p${n}.png`);
const img2 = await loadLocalImage(hi(2));
const halfW = Math.floor(img2.width / 2);

const modelsMeta = [
  { code: "WWC.15.25", innerH: 15, innerW: 25, radii: "R50 / R70", life: "≥1500万次" },
  { code: "WWC.18.32", innerH: 18, innerW: 32, radii: "R50 / R70", life: "≥1500万次" },
  { code: "WWC.22.40", innerH: 22, innerW: 40, radii: "R60 / R70", life: "≥1500万次" },
  { code: "WWC.28.65", innerH: 28, innerW: 65, radii: "R60 / R70", life: "≥1500万次" },
  { code: "WWC.35.65", innerH: 35, innerW: 65, radii: "R70 / R90", life: "≥2000万次" },
  { code: "WWC.40.85", innerH: 40, innerW: 85, radii: "R100 / R130", life: "≥2000万次" },
  { code: "WWC.40.110", innerH: 40, innerW: 110, radii: "R100 / R130", life: "≥2000万次" },
];

const tocEntries = [
  { no: "01", title: "企业简介", page: 3 },
  { no: "02", title: "行业痛点", page: 4 },
  { no: "03", title: "产品概述", page: 5 },
  { no: "04", title: "型号参数", page: 6 },
  { no: "05", title: "专利结构", page: 14 },
  { no: "06", title: "耐久验证", page: 15 },
  { no: "07", title: "材质定制", page: 16 },
];

console.log("building pages...");
const tocPng = await makeTocPage(2, tocEntries);
const indexPng = await makeSeriesIndexPage(6, modelsMeta);

const modelPages = [];
modelPages.push(
  await makeModelPage({
    srcPng: hi(2),
    pageNo: 7,
    model: "WWC.15.25",
    crop: { x: 20, y: 40, w: halfW - 40, h: img2.height - 80 },
  })
);
modelPages.push(
  await makeModelPage({
    srcPng: hi(2),
    pageNo: 8,
    model: "WWC.18.32",
    crop: { x: halfW + 10, y: 40, w: halfW - 40, h: img2.height - 80 },
  })
);

{
  // WWC.22.40 也用统一红金框，不再沿用蓝色简介页
  modelPages.push(
    await makeModelPage({
      srcPng: hi(3),
      pageNo: 9,
      model: "WWC.22.40",
      crop: { x: 30, y: 50, w: img2.width - 60, h: img2.height - 100 },
    })
  );
}

for (const [src, pageNo, model] of [
  [4, 10, "WWC.28.65"],
  [5, 11, "WWC.35.65"],
  [6, 12, "WWC.40.85"],
  [7, 13, "WWC.40.110"],
]) {
  modelPages.push(
    await makeModelPage({
      srcPng: hi(src),
      pageNo,
      model,
      crop: { x: 30, y: 50, w: img2.width - 60, h: img2.height - 100 },
    })
  );
}

console.log("assembling PDF...");
const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const introBytes = fs.readFileSync(INTRO_PDF);
const introDoc = await PDFDocument.load(introBytes, { ignoreEncryption: true });
const outDoc = await PDFDocument.create();

/** 将简介页中的品牌蓝映射为中国红，保留产品图层次 */
function remapBlueToChinaRed(imageData) {
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const a = d[i + 3];
    if (a < 20) continue;
    // 品牌蓝 / 浅蓝标题区
    const isBlue = b > r + 25 && b > g + 15 && b > 90 && r < 140 && g < 160;
    const isLightBlue = b > 180 && g > 150 && r < 180 && b > r + 10;
    if (isBlue || isLightBlue) {
      const lum = (r * 0.2 + g * 0.2 + b * 0.6) / 255;
      d[i] = Math.min(255, Math.round(200 + lum * 30)); // R
      d[i + 1] = Math.min(255, Math.round(16 + lum * 20)); // G
      d[i + 2] = Math.min(255, Math.round(46 + lum * 20)); // B
    }
  }
}

async function renderIntroPageAsRedPng(pageIndex1) {
  const data = new Uint8Array(introBytes);
  const doc = await getDocument({ data, useSystemFonts: true }).promise;
  const page = await doc.getPage(pageIndex1);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  remapBlueToChinaRed(imgData);
  ctx.putImageData(imgData, 0, 0);

  // 统一为 1920x1080 画布
  const out = createCanvas(W, H);
  const octx = out.getContext("2d");
  octx.fillStyle = PAPER;
  octx.fillRect(0, 0, W, H);
  octx.drawImage(canvas, 0, 0, W, H);
  const pngPath = path.join(OUT_DIR, `intro-red-p${pageIndex1}.png`);
  fs.writeFileSync(pngPath, out.toBuffer("image/png"));
  return pngPath;
}

async function addPngPage(pngPath) {
  const png = await outDoc.embedPng(fs.readFileSync(pngPath));
  const page = outDoc.addPage([W * 0.75, H * 0.75]);
  page.drawImage(png, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
}

await addPngPage(await renderIntroPageAsRedPng(1));
await addPngPage(tocPng);
await addPngPage(await renderIntroPageAsRedPng(3));
await addPngPage(await renderIntroPageAsRedPng(4));
await addPngPage(await renderIntroPageAsRedPng(5));
await addPngPage(indexPng);
for (const p of modelPages) await addPngPage(p);
for (let i = 7; i <= 14; i++) await addPngPage(await renderIntroPageAsRedPng(i));

const bytes = await outDoc.save();
const targets = [
  path.join(OUT_DIR, "威仕龙无尘拖链样册-中国红.pdf"),
  "C:/Users/Administrator/Desktop/威仕龙无尘拖链样册-中国红.pdf",
  "C:/Users/Administrator/Desktop/资料/无尘拖链/威仕龙无尘拖链样册-中国红.pdf",
];
for (const t of targets) {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, bytes);
  console.log("wrote", t);
}
console.log("pages:", outDoc.getPageCount());
