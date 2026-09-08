/**
 * One-shot industrial audit fix runner for CNWSL.
 * - Ensures public/_redirects mirrors next.config permanent redirects
 * - Runs image WebP conversion (tools/optimize_images.js)
 * - Patches OverseasContactRail WeChat QR to .webp when available
 * - Prints checklist of remaining manual items
 *
 * Usage (from repo root):
 *   npm run audit:fix
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function writeRedirects() {
  const content = `# CNWSL industrial redirects (Netlify / static hosts)
# Source of truth also in next.config.mjs (Next.js 301)

# Flatten legacy 4-segment model URLs → /products/model/:spec
/products/:category/:series/:spec  /products/model/:spec  301
/en/products/:category/:series/:spec  /en/products/model/:spec  301
/vi/products/:category/:series/:spec  /vi/products/model/:spec  301
/es/products/:category/:series/:spec  /es/products/model/:spec  301
/it/products/:category/:series/:spec  /it/products/model/:spec  301
/ru/products/:category/:series/:spec  /ru/products/model/:spec  301

# Legacy item pages → catalog
/products/item/*  /products  301
/en/products/item/*  /en/products  301
/vi/products/item/*  /vi/products  301
/es/products/item/*  /es/products  301
/it/products/item/*  /it/products  301
/ru/products/item/*  /ru/products  301
`;
  const dest = path.join(ROOT, "public", "_redirects");
  fs.writeFileSync(dest, content, "utf8");
  console.log(`[audit:fix] wrote ${path.relative(ROOT, dest)}`);
}

function ensureSharp() {
  try {
    require.resolve("sharp", { paths: [ROOT] });
    return true;
  } catch {
    console.log("[audit:fix] installing sharp (devDependency)…");
    const r = spawnSync("npm", ["i", "sharp", "--save-dev"], {
      cwd: ROOT,
      stdio: "inherit",
      shell: true,
    });
    return r.status === 0;
  }
}

function runOptimizeImages() {
  if (!ensureSharp()) {
    console.error("[audit:fix] sharp install failed — skip image conversion");
    return;
  }
  const script = path.join(ROOT, "tools", "optimize_images.js");
  const r = spawnSync(process.execPath, [script], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    console.error("[audit:fix] optimize_images exited non-zero");
  }
}

function patchWechatQrSrc() {
  const webp = path.join(ROOT, "public", "images", "home", "wechat-qr.webp");
  const jpg = path.join(ROOT, "public", "images", "home", "wechat-qr.jpg");
  const rail = path.join(ROOT, "src", "components", "OverseasContactRail.tsx");
  if (!fs.existsSync(rail)) return;

  let code = fs.readFileSync(rail, "utf8");
  if (fs.existsSync(webp) && code.includes("/images/home/wechat-qr.jpg")) {
    code = code.replace(
      "/images/home/wechat-qr.jpg",
      "/images/home/wechat-qr.webp",
    );
    fs.writeFileSync(rail, code, "utf8");
    console.log(
      "[audit:fix] OverseasContactRail → wechat-qr.webp (jpg leftover kept as fallback file)",
    );
  } else if (!fs.existsSync(webp) && fs.existsSync(jpg)) {
    console.log(
      "[audit:fix] wechat-qr.webp not present yet — run optimize_images first or keep jpg",
    );
  }
}

function main() {
  console.log("=== CNWSL industrial audit:fix ===\n");
  writeRedirects();
  runOptimizeImages();
  patchWechatQrSrc();
  console.log(`
=== Done ===
Already applied in codebase (this audit pass):
  • VI inquiry placeholder CJK brackets fixed
  • Downloads Russian titles/descriptions/alts added
  • Series pages CollectionPage JSON-LD injected
  • Product + BreadcrumbList already present on model pages
  • public/_redirects generated

Review: INDUSTRIAL_SITE_AUDIT_REPORT.md
`);
}

main();
