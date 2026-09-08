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
const BLUE = "#1a4f9c";
const BLUE_LIGHT = "#2f6fbf";
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
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 0, W, HEADER_H);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px YaHeiBold";
  ctx.fillText(title, 48, 48);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(W - 220, 12, 180, 48);
  ctx.fillStyle = BLUE;
  ctx.font = "bold 28px YaHeiBold";
  ctx.fillText("CNWSL", W - 185, 45);

  const sy = HEADER_H + 18;
  if (sectionNo) {
    roundRect(ctx, 48, sy, 52, 36, 8);
    ctx.fillStyle = BLUE_LIGHT;
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px YaHeiBold";
    ctx.fillText(sectionNo, 58, sy + 26);

    ctx.fillStyle = BLUE_LIGHT;
    ctx.font = "bold 28px YaHeiBold";
    ctx.fillText(sectionTitle, 116, sy + 28);
  }

  if (model) {
    ctx.font = "bold 22px YaHeiBold";
    const mw = ctx.measureText(model).width + 40;
    roundRect(ctx, W - 48 - mw, sy, mw, 36, 8);
    ctx.fillStyle = BLUE;
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(model, W - 48 - mw + 20, sy + 26);
  }

  ctx.strokeStyle = "#d0d5dd";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, H - FOOTER_H);
  ctx.lineTo(W - 48, H - FOOTER_H);
  ctx.stroke();

  ctx.fillStyle = "#6b7280";
  ctx.font = "18px YaHei";
  const foot = "CNWSL · 威仕龙·塑动未来 | We Set Links · www.cnwslchain.com";
  ctx.fillText(foot, (W - ctx.measureText(foot).width) / 2, H - 18);

  ctx.fillStyle = "#374151";
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

  ctx.fillStyle = "#f7f9fc";
  ctx.fillRect(areaX - 4, areaY - 4, areaW + 8, areaH + 8);
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

  const out = path.join(OUT_DIR, `model-${pageNo}.png`);
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  return out;
}

async function makeTocPage(pageNo, entries) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawChrome(ctx, { title: "目录", sectionNo: "", sectionTitle: "", pageNo });

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, HEADER_H, W, H - HEADER_H - FOOTER_H);

  ctx.strokeStyle = "#d0d5dd";
  ctx.beginPath();
  ctx.moveTo(48, H - FOOTER_H);
  ctx.lineTo(W - 48, H - FOOTER_H);
  ctx.stroke();
  ctx.fillStyle = "#6b7280";
  ctx.font = "18px YaHei";
  const foot = "CNWSL · 威仕龙·塑动未来 | We Set Links · www.cnwslchain.com";
  ctx.fillText(foot, (W - ctx.measureText(foot).width) / 2, H - 18);
  ctx.fillStyle = "#374151";
  ctx.font = "20px YaHei";
  ctx.fillText(String(pageNo), W - 60, H - 18);

  let y = 180;
  for (const e of entries) {
    roundRect(ctx, 160, y - 8, 64, 44, 10);
    ctx.fillStyle = BLUE_LIGHT;
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px YaHeiBold";
    ctx.fillText(e.no, 172, y + 22);

    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 30px YaHeiBold";
    ctx.fillText(e.title, 250, y + 24);

    const left = 250 + ctx.measureText(e.title).width + 24;
    const right = W - 220;
    ctx.fillStyle = "#9ca3af";
    for (let x = left; x < right; x += 10) ctx.fillRect(x, y + 16, 4, 2);

    ctx.fillStyle = "#1f2937";
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

  ctx.fillStyle = "#4b5563";
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
    ctx.fillStyle = "#eef4fb";
    ctx.fill();
    ctx.strokeStyle = "#c5d7ef";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = BLUE;
    ctx.font = "bold 28px YaHeiBold";
    ctx.fillText(m.code, x + 24, y + 48);

    ctx.fillStyle = "#374151";
    ctx.font = "20px YaHei";
    ctx.fillText(`内高×内宽：${m.innerH} × ${m.innerW} mm`, x + 24, y + 88);
    ctx.fillText(`弯曲半径：${m.radii}`, x + 24, y + 118);
    ctx.fillText(`寿命：${m.life}`, x + 24, y + 148);
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
  const intro6 = path.join(PREVIEW, "intro-p6.png");
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  const img = await loadLocalImage(intro6);
  ctx.drawImage(img, 0, 0, W, H);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(W - 80, H - 40, 70, 32);
  ctx.fillStyle = "#374151";
  ctx.font = "20px YaHei";
  ctx.fillText("9", W - 60, H - 18);
  const out = path.join(OUT_DIR, "model-9.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  modelPages.push(out);
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
const introBytes = fs.readFileSync(INTRO_PDF);
const introDoc = await PDFDocument.load(introBytes, { ignoreEncryption: true });
const outDoc = await PDFDocument.create();

async function addPngPage(pngPath) {
  const png = await outDoc.embedPng(fs.readFileSync(pngPath));
  const page = outDoc.addPage([W * 0.75, H * 0.75]);
  page.drawImage(png, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
}

async function copyIntroPage(index0) {
  const [copied] = await outDoc.copyPages(introDoc, [index0]);
  outDoc.addPage(copied);
}

await copyIntroPage(0);
await addPngPage(tocPng);
await copyIntroPage(2);
await copyIntroPage(3);
await copyIntroPage(4);
await addPngPage(indexPng);
for (const p of modelPages) await addPngPage(p);
for (let i = 6; i <= 13; i++) await copyIntroPage(i);

const bytes = await outDoc.save();
const targets = [
  path.join(OUT_DIR, "威仕龙无尘拖链样册-统一版.pdf"),
  "C:/Users/Administrator/Desktop/资料/无尘拖链/威仕龙无尘拖链样册-统一版.pdf",
  path.join(ROOT, "public/datasheets/cleanroom-catalog.pdf"),
];
for (const t of targets) {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, bytes);
  console.log("wrote", t);
}
console.log("pages:", outDoc.getPageCount());
