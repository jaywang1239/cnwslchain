import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyOverlays,
  batchProcess,
  listPdfs,
  loadConfig,
  saveConfig,
} from "./process.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 8501;

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/config", (_req, res) => {
  res.json(loadConfig());
});

app.post("/api/config", (req, res) => {
  saveConfig(req.body);
  res.json({ ok: true });
});

app.get("/api/stats", (_req, res) => {
  const config = loadConfig();
  const pdfs = fs.existsSync(config.inputDir) ? listPdfs(config.inputDir) : [];
  res.json({ count: pdfs.length, sample: pdfs[0] ?? null });
});

app.get("/api/pdf", (req, res) => {
  const filePath = req.query.path;
  if (!filePath || !fs.existsSync(filePath)) {
    res.status(404).send("not found");
    return;
  }
  res.setHeader("Content-Type", "application/pdf");
  fs.createReadStream(filePath).pipe(res);
});

app.post("/api/preview", async (req, res) => {
  try {
    const config = req.body.config ?? loadConfig();
    const samplePath = req.body.samplePath;
    if (!samplePath) {
      res.status(400).json({ error: "缺少 samplePath" });
      return;
    }
    const outPath = path.join(__dirname, "preview-output.pdf");
    await applyOverlays(samplePath, outPath, config);
    res.json({ ok: true, output: outPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/preview-file", (_req, res) => {
  const outPath = path.join(__dirname, "preview-output.pdf");
  if (!fs.existsSync(outPath)) {
    res.status(404).send("not found");
    return;
  }
  res.setHeader("Content-Type", "application/pdf");
  fs.createReadStream(outPath).pipe(res);
});

app.post("/api/batch", async (req, res) => {
  try {
    const config = req.body.config ?? loadConfig();
    const limit = req.body.limit ?? null;
    saveConfig(config);
    const result = await batchProcess(config, { limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`PDF 批量工具: http://127.0.0.1:${PORT}`);
});
