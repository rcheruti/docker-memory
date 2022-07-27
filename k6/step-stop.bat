@echo off
setlocal
cd /d %~dp0

rem ------------------------------------------------
echo.
echo.---  Stoping Services  ------------------------
echo.
docker-compose -f ../%LANGUAGE_FOLDER%/docker-compose.yml down
docker-compose -f docker-compose/docker-compose-mysql.yml down
