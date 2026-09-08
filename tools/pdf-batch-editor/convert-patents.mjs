import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const PATENT_DIR = "C:/Users/Administrator/Desktop/资料/威仕龙/专利证书";
const OUT_DIR = "C:/Users/Administrator/Desktop/cnwslchain-website/public/images/patents";
const MAX_SIDE = 1200; // SEO: 1200px+ on the long edge, lightweight WebP

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(PATENT_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));

function slugFromName(name) {
  const map = [
    [/^208/, "208-split-link"],
    [/^209/, "209-chain-link-30zt"],
    [/^226/, "226-crossbar"],
    [/^316/, "316-new-chain"],
    [/^318/, "318-beam-1"],
    [/^319/, "319-beam-2"],
    [/^320/, "320-cover-plate"],
    [/^415/, "415-chain-plate"],
    [/^416/, "416-chain-link"],
    [/^418/, "418-chain-18"],
    [/^441/, "441-new-chain"],
    [/^63/, "63-dustproof-chain"],
    [/^65/, "65-divider-clip"],
    [/^66/, "66-cleanroom-chain"],
  ];
  for (const [re, slug] of map) {
    if (re.test(name)) return slug;
  }
  return name.replace(/[^\w]+/g, "-").replace(/-+/g, "-").slice(0, 40);
}

function titleFromName(name) {
  return name
    .replace(/\.pdf$/i, "")
    .replace(/\s*证书.*$/u, "")
    .replace(/\(\d+\)$/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

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

for (const file of files) {
  const full = path.join(PATENT_DIR, file);
  const data = new Uint8Array(fs.readFileSync(full));
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

  const slug = slugFromName(file);
  const title = titleFromName(file);
  const outPath = path.join(OUT_DIR, `${slug}.webp`);
  fs.writeFileSync(outPath, out.toBuffer("image/webp", 82));
  const size = fs.statSync(outPath).size;
  manifest.push({
    title,
    slug,
    imageSrc: `/images/patents/${slug}.webp`,
    width: dw,
    height: dh,
    kb: Math.round(size / 1024),
  });
  console.log(`${slug}.webp ${title} ${dw}x${dh} ${Math.round(size / 1024)}KB`);
}

const dataPath = path.join(
  "C:/Users/Administrator/Desktop/cnwslchain-website/data/patents.json",
);
fs.writeFileSync(
  dataPath,
  JSON.stringify(
    manifest.map(({ title, slug, imageSrc }) => ({ title, slug, imageSrc })),
    null,
    2,
  ),
);
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("done", manifest.length);
