import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(
  pathToFileURL(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "pdf-batch-editor",
      "node_modules",
      "pdf-lib",
      "package.json",
    ),
  ).href,
);
const { PDFDocument, rgb } = require("pdf-lib");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_PDF = "C:\\Users\\Administrator\\Desktop\\wsl型号";
const SRC_IMG = "C:\\Users\\Administrator\\Desktop\\产品图";
const OUT_PDF = path.join(ROOT, "public", "datasheets", "orders");
const CATALOG_PATH = path.join(ROOT, "data", "product-catalog.json");
const SPECS_PATH = path.join(ROOT, "data", "product-specs.json");
const REPORT_PATH = path.join(ROOT, "data", "wsl-import-report.json");
const PDFJS_PATH = path.join(
  ROOT,
  "tools",
  "pdf-batch-editor",
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.mjs",
);

const WSL_RE =
  /(WSL\d+[A-Z]*(?:-[A-Z]+)?)-(\d+)-(\d+)[A-Z]?-R([\d.]+[A-Z]*)/i;
const WWC_RE = /WWC[.\s]*(\d+)[.\s]+(\d+)[.\s]*R([\d.]+)/i;

const FORBIDDEN = [
  "威仕龙塑胶",
  "温州市威仕龙",
  "浙江威仕龙",
  "虹桥镇",
  "虹河西路",
  "宁康东路",
  "沙井街道",
  "13968763633",
  "29828961",
  "1677331928",
  "18112888059",
  "13275225528",
  "0577-62328108",
  "0577-62328106",
  "wslmj.com",
  "@qq.com",
  "地址：",
  "电话：",
  "传真：",
  "邮箱：",
  "QQ",
];

function walkPdfs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkPdfs(full, acc);
    else if (entry.name.toLowerCase().endsWith(".pdf")) acc.push(full);
  }
  return acc;
}

function normalizeCode(raw) {
  let code = String(raw || "")
    .toUpperCase()
    .replace(/Ⅱ/g, "II");
  if (code === "WSL06JII") code = "WSL06J2";
  return code;
}

function parseName(filename) {
  const name = filename.replace(/^\(已瘦身\)/, "").replace(/Ⅱ/g, "II");
  const wsl = name.match(WSL_RE);
  if (wsl) {
    return {
      code: normalizeCode(wsl[1]),
      height: Number(wsl[2]),
      width: Number(wsl[3]),
      radius: Number(String(wsl[4]).replace(/[A-Z]+$/i, "")),
      family: "wsl",
    };
  }
  const wwc = name.match(WWC_RE);
  if (wwc) {
    return {
      code: `WWC${wwc[1]}`,
      height: Number(wwc[1]),
      width: Number(wwc[2]),
      radius: Number(wwc[3]),
      family: "wwc",
    };
  }
  return null;
}

function categoryFor(code, height) {
  if (/J/.test(code)) return "silent";
  if (code.startsWith("WWC")) return "cleanroom";
  if (height <= 15) return "micro";
  if (height >= 45) return "heavy";
  return "medium";
}

function openTypeFor(categoryId) {
  if (categoryId === "silent") return "静音";
  if (categoryId === "cleanroom") return "无尘";
  return "桥式";
}

function seriesIdOf(code) {
  return code.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function specIdOf(height, width) {
  return `${height}-${width}`;
}

function pathScore(file, code) {
  const lower = file.toLowerCase();
  let score = 0;
  if (lower.includes(`\\${code.toLowerCase()}\\`)) score += 50;
  if (lower.includes("下载威仕龙")) score -= 40;
  if (lower.includes("7系列") && !code.startsWith("WSL02")) score -= 20;
  if (lower.includes("35系列") && !/^WSL2[3-6]$/.test(code)) score -= 15;
  score -= file.length / 200;
  return score;
}

function buildImageIndex() {
  const byCode = new Map();
  if (!fs.existsSync(SRC_IMG)) return byCode;

  for (const sizeDir of fs.readdirSync(SRC_IMG, { withFileTypes: true })) {
    if (!sizeDir.isDirectory()) continue;
    const sizeName = sizeDir.name;
    let kind = "standard";
    let sizeNumber = Number((sizeName.match(/(\d+)/) || [])[1] || 0);
    if (sizeName.includes("静音")) kind = "silent";
    if (sizeName.includes("无尘")) kind = "cleanroom";

    const sizePath = path.join(SRC_IMG, sizeName);
    for (const seriesDir of fs.readdirSync(sizePath, { withFileTypes: true })) {
      if (!seriesDir.isDirectory()) continue;
      const code = normalizeCode(seriesDir.name);
      const files = fs
        .readdirSync(path.join(sizePath, seriesDir.name))
        .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
        .sort();
      if (!files.length) continue;
      byCode.set(code, {
        code,
        kind,
        sizeNumber,
        sizeName,
        dir: path.join(sizePath, seriesDir.name),
        files,
      });
    }
  }
  return byCode;
}

function looksForbidden(text) {
  return FORBIDDEN.some((item) => text.includes(item));
}

async function loadPdfjs() {
  return import(pathToFileURL(PDFJS_PATH).href);
}

async function redactPdf(inputPath, outputPath, getDocument) {
  const bytes = fs.readFileSync(inputPath);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

  let hitRects = [];
  if (getDocument) {
    try {
      const doc = await getDocument({ data: new Uint8Array(bytes), verbosity: 0 })
        .promise;
      for (let i = 1; i <= doc.numPages; i += 1) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        for (const item of content.items) {
          const text = item.str || "";
          if (!text.trim() || !looksForbidden(text)) continue;
          const x = item.transform[4];
          const y = item.transform[5];
          const w = Math.max(item.width || 0, 80);
          const h = Math.max((item.height || 0) * 1.4, 14);
          hitRects.push({ page: i - 1, x: x - 4, y: y - 4, w: w + 220, h: h + 8 });
        }
      }
    } catch {
      hitRects = [];
    }
  }

  pdf.getPages().forEach((page, index) => {
    const width = page.getWidth();
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 88,
      color: rgb(1, 1, 1),
      borderWidth: 0,
    });
    for (const hit of hitRects.filter((item) => item.page === index)) {
      page.drawRectangle({
        x: Math.max(0, hit.x),
        y: Math.max(0, hit.y),
        width: Math.min(width, hit.w),
        height: hit.h,
        color: rgb(1, 1, 1),
        borderWidth: 0,
      });
    }
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, await pdf.save());
}

async function leftoverContact(file, getDocument) {
  try {
    const data = new Uint8Array(fs.readFileSync(file));
    const doc = await getDocument({ data, verbosity: 0 }).promise;
    const leftover = [];
    for (let i = 1; i <= doc.numPages; i += 1) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str || "").join("");
      for (const word of FORBIDDEN) {
        if (text.includes(word)) leftover.push(`${path.basename(file)} p${i}: ${word}`);
      }
    }
    return leftover;
  } catch {
    return [`${path.basename(file)}: unreadable`];
  }
}

function loadJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function seriesDetail(code, categoryId, heights, widths, radii) {
  const h = heights.length ? `${Math.min(...heights)}–${Math.max(...heights)}mm` : "—";
  const w = widths.length ? `${Math.min(...widths)}–${Math.max(...widths)}mm` : "—";
  const r = radii.length
    ? radii
        .slice()
        .sort((a, b) => a - b)
        .map((item) => `R${item}`)
        .join(" / ")
    : "—";
  const kind =
    categoryId === "silent"
      ? "静音拖链"
      : categoryId === "cleanroom"
        ? "无尘拖链"
        : "桥式拖链";
  return {
    intro: `${code} 为威仕龙${kind}，内高 ${h}，内宽 ${w}，可选弯曲半径 ${r}。PA6+GF30 增强尼龙，工作温度 -20℃～120℃。`,
    material: "PA6+GF30 增强尼龙",
    openType: openTypeFor(categoryId),
    tempRange: "-20℃ ~ 120℃",
  };
}

async function main() {
  const { getDocument } = await loadPdfjs();
  const imageIndex = buildImageIndex();
  const files = walkPdfs(SRC_PDF);
  const byName = new Map();
  for (const file of files) {
    const name = path.basename(file);
    const current = byName.get(name);
    const parsed = parseName(name);
    if (!current) {
      byName.set(name, file);
      continue;
    }
    if (parsed && pathScore(file, parsed.code) > pathScore(current, parsed.code)) {
      byName.set(name, file);
    }
  }

  const groups = new Map();
  let parsed = 0;
  const skipped = [];

  for (const [name, file] of byName) {
    const parsedName = parseName(name);
    if (!parsedName) {
      skipped.push(name);
      continue;
    }
    parsed += 1;
    const key = `${parsedName.code}|${parsedName.height}|${parsedName.width}`;
    if (!groups.has(key)) {
      groups.set(key, {
        ...parsedName,
        radii: new Set(),
        files: [],
      });
    }
    const group = groups.get(key);
    if (parsedName.radius) group.radii.add(parsedName.radius);
    group.files.push(file);
  }

  const catalog = loadJson(CATALOG_PATH, { categories: [], seriesDetails: {} });
  catalog.categories = catalog.categories.map((category) => {
    if (category.id === "medium") {
      return {
        ...category,
        description: "内高大于 15mm、小于 45mm，适用于通用机床与自动化产线。",
        intro:
          "中型拖链覆盖内高大于 15mm、小于 45mm 的主力规格，兼顾填充空间与运行平稳性。适用于 CNC 加工中心、注塑机、激光设备等常规工业场景，可保护多束动力线与信号线同槽敷设。",
      };
    }
    if (category.id === "heavy") {
      return {
        ...category,
        description: "内高 45mm 及以上，适用于重载、长行程与多束线缆集中保护。",
        intro:
          "承重拖链面向内高 45mm 及以上的重载工况，侧板与铰链结构加强，适合龙门加工中心、大型注塑机与长行程设备。可容纳更多线缆与气管，并支持更长架空距离。",
      };
    }
    return category;
  });

  const seriesMap = new Map();
  const specs = [];
  const imageJobs = [];
  const seenImage = new Set();

  for (const group of groups.values()) {
    const imageMeta = imageIndex.get(group.code) || null;
    const categoryId = categoryFor(group.code, group.height);
    const seriesId = seriesIdOf(group.code);
    const specId = specIdOf(group.height, group.width);
    const radii = [...group.radii].sort((a, b) => a - b);
    const connector = `${group.code}-${group.height}-${group.width}C`;
    const relPdf = `/datasheets/orders/${seriesId}/${specId}.pdf`;
    const absPdf = path.join(OUT_PDF, seriesId, `${specId}.pdf`);

    if (!seriesMap.has(seriesId)) {
      seriesMap.set(seriesId, {
        id: seriesId,
        name: group.code,
        code: group.code,
        categoryId,
        specCount: 0,
        heights: new Set(),
        widths: new Set(),
        radii: new Set(),
      });
    }

    const images = [];
    if (imageMeta) {
      const labels = ["主图", "侧面", "细节", "结构", "安装", "应用"];
      imageMeta.files.slice(0, 6).forEach((file, index) => {
        const letter = String.fromCharCode(97 + index);
        const src = `/images/products/series/${seriesId}/${letter}.webp`;
        images.push({
          src,
          alt: `${group.code} ${labels[index] || "产品图"}`,
          source: path.join(imageMeta.dir, file),
        });
        if (!seenImage.has(src)) {
          seenImage.add(src);
          imageJobs.push({
            src: path.join(imageMeta.dir, file),
            dest: path.join(ROOT, "public", src.replace(/^\//, "")),
          });
        }
      });
    }

    specs.push({
      id: specId,
      categoryId,
      seriesId,
      innerHeight: group.height,
      innerWidth: group.width,
      code: `${group.code}-${group.height}-${group.width}`,
      connector,
      bendRadii: radii.length ? radii : [50],
      material: "PA6+GF30 增强尼龙",
      openType: openTypeFor(categoryId),
      images: images.map(({ src, alt }) => ({ src, alt })),
      drawingUrl: relPdf,
    });

    const series = seriesMap.get(seriesId);
    series.specCount += 1;
    series.heights.add(group.height);
    series.widths.add(group.width);
    radii.forEach((radius) => series.radii.add(radius));
    group.absPdf = absPdf;
    group.sourcePdf = group.files
      .slice()
      .sort((a, b) => pathScore(b, group.code) - pathScore(a, group.code))[0];
  }

  const categorySeries = {
    micro: [],
    medium: [],
    heavy: [],
    silent: [],
    portable: catalog.categories.find((item) => item.id === "portable")?.series || [],
    cleanroom: [],
  };

  catalog.seriesDetails = catalog.seriesDetails || {};
  for (const series of [...seriesMap.values()].sort((a, b) =>
    a.code.localeCompare(b.code, "en", { numeric: true }),
  )) {
    categorySeries[series.categoryId]?.push({
      id: series.id,
      name: series.name,
      code: series.code,
      specCount: series.specCount,
    });
    catalog.seriesDetails[series.id] = seriesDetail(
      series.code,
      series.categoryId,
      [...series.heights],
      [...series.widths],
      [...series.radii],
    );
  }

  catalog.categories = catalog.categories.map((category) => ({
    ...category,
    series: categorySeries[category.id] || category.series,
  }));

  specs.sort((a, b) => {
    const series = a.seriesId.localeCompare(b.seriesId, "en", { numeric: true });
    if (series !== 0) return series;
    if (a.innerHeight !== b.innerHeight) return a.innerHeight - b.innerHeight;
    return a.innerWidth - b.innerWidth;
  });

  fs.mkdirSync(path.dirname(SPECS_PATH), { recursive: true });
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf-8");
  fs.writeFileSync(SPECS_PATH, JSON.stringify(specs, null, 2), "utf-8");
  fs.writeFileSync(
    path.join(ROOT, "data", "wsl-image-jobs.json"),
    JSON.stringify(imageJobs, null, 2),
    "utf-8",
  );

  console.log(
    `index unique=${byName.size} parsed=${parsed} skipped=${skipped.length} specs=${groups.size} series=${seriesMap.size} images=${imageJobs.length}`,
  );
  if (skipped.length) {
    console.log("skipped sample:", skipped.slice(0, 20).join(" | "));
  }

  let done = 0;
  let pdfFail = 0;
  for (const group of groups.values()) {
    try {
      await redactPdf(group.sourcePdf, group.absPdf, getDocument);
    } catch (error) {
      pdfFail += 1;
      console.error("pdf fail", path.basename(group.sourcePdf), error.message);
    }
    done += 1;
    if (done % 50 === 0 || done === groups.size) {
      console.log(`pdf ${done}/${groups.size} fail=${pdfFail}`);
    }
  }

  const leftovers = [];
  let checked = 0;
  for (const group of groups.values()) {
    if (!fs.existsSync(group.absPdf)) continue;
    const hits = await leftoverContact(group.absPdf, getDocument);
    leftovers.push(...hits);
    checked += 1;
    if (checked % 100 === 0) console.log(`verify ${checked}/${groups.size}`);
  }

  const report = {
    uniquePdfs: byName.size,
    parsed,
    skipped: skipped.length,
    skippedNames: skipped,
    specGroups: groups.size,
    series: seriesMap.size,
    imageJobs: imageJobs.length,
    pdfFail,
    leftoverCount: leftovers.length,
    leftovers: leftovers.slice(0, 80),
    byCategory: Object.fromEntries(
      Object.entries(categorySeries).map(([key, value]) => [key, value.length]),
    ),
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf-8");
  console.log(
    `done leftovers=${leftovers.length} pdfFail=${pdfFail} report=${REPORT_PATH}`,
  );
  if (leftovers.length) {
    console.error("CONTACT LEFTOVER SAMPLE\n" + leftovers.slice(0, 20).join("\n"));
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
