@echo off
chcp 65001 >nul
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"

echo ========================================
echo  PDF 转 Word 批量工具（更新公司信息）
echo ========================================
echo.
echo 默认处理桌面 wsl型号 文件夹全部 PDF
echo 输出到: wsl型号-Word已更新
echo.
echo 测试 1 个文件: node cli.mjs --limit=1
echo 全部转换:      node cli.mjs
echo.

node cli.mjs %*
pause
