@echo off
setlocal
cd /d %~dp0

rem ------------------------------------------------
echo.
echo.---  Running Tests  ---------------------------
echo.
timeout 30
k6 run ./src/test-post-pessoa.js
k6 run ./src/test-post-carro.js
k6 run ./src/test-get-pessoa.js

