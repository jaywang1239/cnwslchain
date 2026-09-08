import { batchConvert, convertPdfToWord, loadConfig } from "./process.mjs";

const args = process.argv.slice(2);
const limitArg = args.find((item) => item.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : null;
const singleFile = args.find((item) => !item.startsWith("--"));

async function main() {
  const config = loadConfig();
  console.log("PDF → Word 批量转换（更新公司信息）");
  console.log("输入:", config.inputDir);
  console.log("输出:", config.outputDir);
  console.log("电话:", config.company.phone);
  console.log("邮箱:", config.company.email);
  console.log("");

  if (singleFile) {
    const output = singleFile.replace(/\.pdf$/i, ".docx");
    await convertPdfToWord(singleFile, output, config);
    console.log("完成:", output);
    return;
  }

  const started = Date.now();
  const result = await batchConvert(config, {
    limit,
    onProgress: ({ index, total, file, status, message }) => {
      const prefix = status === "ok" ? "✓" : "✗";
      console.log(`${prefix} [${index}/${total}] ${file}${message ? ` — ${message}` : ""}`);
    },
  });

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log("");
  console.log(`完成: 成功 ${result.success}，失败 ${result.failed}，耗时 ${seconds}s`);
  if (result.errors.length) {
    console.log("失败列表:");
    result.errors.slice(0, 20).forEach((item) => {
      console.log(`  - ${item.file}: ${item.message}`);
    });
    if (result.errors.length > 20) {
      console.log(`  ... 另有 ${result.errors.length - 20} 个`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
