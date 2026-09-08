@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%
echo Starting CNWSL website...
echo.
echo Open in browser:
echo   http://127.0.0.1:3000
echo   http://127.0.0.1:3000/products/enclosed/wsl15/wsl15-20-100-r100
echo.
echo Keep this window open. Press Ctrl+C to stop.
echo.
npm run dev -- -p 3000 -H 127.0.0.1
pause
