@echo off
setlocal
cd /d %~dp0

rem ------------------------------------------------
echo.
echo.---  Compiling code  --------------------------
echo.
call mvn clean package

echo.
echo.---  Compiling docker image  ------------------
echo.
set DOCKER_TAG=memory-test-jdk16alpine-micronaut:0.0.1
docker rmi %DOCKER_TAG%
docker build -t %DOCKER_TAG% .


endlocal
