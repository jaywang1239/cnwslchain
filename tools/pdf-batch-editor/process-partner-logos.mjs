import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const ROOT = "C:/Users/Administrator/Desktop/cnwslchain-website";
const RAW = path.join(ROOT, "tools/pdf-batch-editor/_logos/raw");
const OUT = path.join(ROOT, "public/images/home/partners");
const LOGS = "C:/Users/Administrator/.cursor/browser-logs";

const WIDTH = 640;
const HEIGHT = 280;
const PAD = 48;

function extractCdpPng(jsonName, outName) {
  const json = JSON.parse(fs.readFileSync(path.join(LOGS, jsonName), "utf8"));
  const b64 = json.data || json.result?.data;
  if (!b64) throw new Error(`No image data in ${jsonName}`);
  const dest = path.join(RAW, outName);
  fs.writeFileSync(dest, Buffer.from(b64, "base64"));
  return dest;
}

extractCdpPng("cdp-response-Page.captureScreenshot-2026-09-05T08-31-23-360Z.json", "genesis-clip.png");
extractCdpPng("cdp-response-Page.captureScreenshot-2026-09-05T08-33-06-822Z.json", "foxconn-clip.png");
extractCdpPng("cdp-response-Page.captureScreenshot-2026-09-05T08-31-16-748Z.json", "avic-clip.png");

const jobs = [
  { id: "bambu-lab", src: "bambu-official.svg" },
  { id: "huawei", src: "huawei-official.png" },
  { id: "hapm-magna", src: "hapm-magna-header.png" },
  { id: "trumpchi", src: "trumpchi-logo.png" },
  { id: "foxconn", src: "foxconn-clip.png" },
  { id: "genesis", src: "genesis-clip.png" },
  { id: "gac", src: "gac-header.png" },
  { id: "avic-jingji", src: "avic-clip.png" },
  { id: "midea", src: "midea-official.png" },
];

fs.mkdirSync(OUT, { recursive: true });

function fitRect(srcW, srcH, boxW, boxH) {
  const scale = Math.min(boxW / srcW, boxH / srcH);
  const w = Math.round(srcW * scale);
  const h = Math.round(srcH * scale);
  return {
    w,
    h,
    x: Math.round((WIDTH - w) / 2),
    y: Math.round((HEIGHT - h) / 2),
  };
}

for (const job of jobs) {
  const srcPath = path.join(RAW, job.src);
  const image = await loadImage(srcPath);
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const box = fitRect(image.width, image.height, WIDTH - PAD * 2, HEIGHT - PAD * 2);
  ctx.drawImage(image, box.x, box.y, box.w, box.h);
  const outPath = path.join(OUT, `${job.id}.webp`);
  fs.writeFileSync(outPath, await canvas.encode("webp", 90));
  console.log(`${job.id}\t${image.width}x${image.height}\t-> ${box.w}x${box.h}\t${fs.statSync(outPath).size}`);
}
