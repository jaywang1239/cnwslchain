import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const ROOT = "C:/Users/Administrator/Desktop/cnwslchain-website";
const IMG_DIR = path.join(ROOT, "public/images/certs");
const PDF_DIR = path.join(ROOT, "public/datasheets");
const MAX_SIDE = 1200;

fs.mkdirSync(IMG_DIR, { recursive: true });
fs.mkdirSync(PDF_DIR, { recursive: true });

const items = [
  {
    src: "C:/Users/Administrator/Desktop/资料/威仕龙/温州威仕龙16949证书.pdf",
    slug: "iatf-16949-certificate",
  },
  {
    src: "C:/Users/Administrator/Desktop/资料/威仕龙/物性表PA 321X11 NAT.pdf",
    slug: "pa-321x11-nat-datasheet",
  },
  {
    src: "C:/Users/Administrator/Desktop/资料/威仕龙/TCF202504092511R-无尘拖链-高低温测试.pdf",
    slug: "cleanroom-high-low-temp-test",
  },
  {
    src: "C:/Users/Administrator/Desktop/资料/威仕龙/TCF202504092510R-无尘拖链-疲劳试验.pdf",
    slug: "cleanroom-fatigue-test",
  },
  {
    src: "C:/Users/Administrator/Desktop/资料/威仕龙/SGS-ROHS.pdf",
    slug: "sgs-rohs-report",
  },
];

function cropContent(imageData, width, height) {
  const d = imageData.data;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * 4;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const a = d[i + 3];
      const isInk = a > 20 && (r < 245 || g < 245 || b < 245);
      if (isInk) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX <= minX || maxY <= minY) {
    return { x: 0, y: 0, w: width, h: height };
  }
  const pad = Math.round(Math.min(width, height) * 0.03);
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

const manifest = [];

for (const item of items) {
  if (!fs.existsSync(item.src)) {
    throw new Error(`Missing source PDF: ${item.src}`);
  }

  const pdfDest = path.join(PDF_DIR, `${item.slug}.pdf`);
  fs.copyFileSync(item.src, pdfDest);

  const data = new Uint8Array(fs.readFileSync(item.src));
  const doc = await getDocument({ data, useSystemFonts: true }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 2.2 });
  const src = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: src.getContext("2d"), viewport }).promise;

  const ctx = src.getContext("2d");
  const imgData = ctx.getImageData(0, 0, src.width, src.height);
  const crop = cropContent(imgData, src.width, src.height);

  let dw = crop.w;
  let dh = crop.h;
  const scale = MAX_SIDE / Math.max(dw, dh);
  if (scale < 1) {
    dw = Math.round(dw * scale);
    dh = Math.round(dh * scale);
  }

  const out = createCanvas(dw, dh);
  out.getContext("2d").drawImage(src, crop.x, crop.y, crop.w, crop.h, 0, 0, dw, dh);

  const outPath = path.join(IMG_DIR, `${item.slug}.webp`);
  fs.writeFileSync(outPath, out.toBuffer("image/webp", 82));
  const size = fs.statSync(outPath).size;
  manifest.push({
    slug: item.slug,
    width: dw,
    height: dh,
    kb: Math.round(size / 1024),
    pdfKb: Math.round(fs.statSync(pdfDest).size / 1024),
  });
  console.log(`${item.slug} ${dw}x${dh} img=${Math.round(size / 1024)}KB pdf=${manifest.at(-1).pdfKb}KB`);
}

fs.writeFileSync(path.join(IMG_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("done", manifest.length);
