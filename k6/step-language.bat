@echo off
setlocal
cd /d %~dp0

rem ------------------------------------------------
echo.
echo.---  Creating Java container  -----------------
echo.
call ../%LANGUAGE_FOLDER%/make-docker-image.bat
docker-compose -f ../%LANGUAGE_FOLDER%/docker-compose.yml up -d
