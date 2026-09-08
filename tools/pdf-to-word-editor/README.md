# PDF 转 Word 批量工具

将 `wsl型号` 文件夹中的 PDF 图纸转为 Word（.docx），并在页眉区域覆盖更新后的公司信息。

## 更新内容

| 字段 | 新值 |
|------|------|
| 公司名 | 温州市威仕龙塑胶有限公司 |
| 地址 | 浙江省温州市乐清市天成街道宁康东路2891号 |
| 电话 | 18112888059 |
| 邮箱 | info@cnwslchain.com |
| 网站 | www.cnwslchain.com |

## 使用方法

1. 双击 `启动.bat`
2. 或在命令行：

```bat
cd tools\pdf-to-word-editor
node cli.mjs --limit=1   REM 先测试 1 个
node cli.mjs             REM 全部 5374 个
```

## 说明

- 图纸 PDF 为扫描/图片格式，无法直接编辑文字，因此工具将 PDF 渲染为图片后在页眉区域用白底+新文字覆盖，再打包为 Word。
- 可在 Word 中打开 `.docx` 进一步微调；如需 PDF，在 Word 中「另存为 PDF」即可。
- 坐标与字号可在 `config.json` 的 `overlays` 中调整。
