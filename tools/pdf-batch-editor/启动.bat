@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "PATH=C:\Program Files\nodejs;%PATH%"

echo ========================================
echo   威仕龙 PDF 批量修改工具
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 Node.js，请先安装 Node.js
  pause
  exit /b 1
)

echo [1/2] 安装依赖...
call npm install

echo [2/2] 启动工具...
echo 浏览器打开: http://127.0.0.1:8501
echo.

node server.mjs

pause
