/**
 * CNWSL industrial image optimizer
 * Converts leftover .jpg/.jpeg/.png under public/ to .webp (skips if webp exists).
 * Usage: node tools/optimize_images.js
 * Optional: npm i sharp --save-dev  (required for conversion)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const RASTER_RE = /\.(jpe?g|png)$/i;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (RASTER_RE.test(name)) out.push(full);
  }
  return out;
}

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error(
      "[optimize_images] Missing dependency. Run:\n  npm i sharp --save-dev\nthen re-run: node tools/optimize_images.js",
    );
    process.exit(1);
  }

  const files = walk(path.join(PUBLIC, "images"));
  if (files.length === 0) {
    console.log("[optimize_images] No .jpg/.png found under public/images — OK.");
    return;
  }

  const report = { converted: [], skipped: [], failed: [] };

  for (const file of files) {
    const webpPath = file.replace(RASTER_RE, ".webp");
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    const relWebp = path.relative(ROOT, webpPath).replace(/\\/g, "/");

    if (fs.existsSync(webpPath)) {
      report.skipped.push({ src: rel, reason: "webp already exists", webp: relWebp });
      continue;
    }

    try {
      await sharp(file).webp({ quality: 82 }).toFile(webpPath);
      report.converted.push({ src: rel, webp: relWebp });
      console.log(`✓ ${rel} → ${relWebp}`);
    } catch (err) {
      report.failed.push({ src: rel, error: String(err.message || err) });
      console.error(`✗ ${rel}: ${err.message || err}`);
    }
  }

  const outJson = path.join(__dirname, "optimize_images.report.json");
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2));
  console.log(
    `\n[optimize_images] converted=${report.converted.length} skipped=${report.skipped.length} failed=${report.failed.length}`,
  );
  console.log(`[optimize_images] report → ${path.relative(ROOT, outJson)}`);
  console.log(
    "\nNote: Next.js <Image> already optimizes delivery. Update any hard-coded .jpg/.png src to .webp after conversion.",
  );
}

main();
