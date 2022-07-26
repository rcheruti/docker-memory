@echo off
setlocal
cd /d %~dp0

rem ------------------------------------------------
echo.
echo.---  Compiling code  --------------------------
echo.
set SPRING_VERSION=2.7.2
call mvn -Dspring-version=%SPRING_VERSION% clean package

echo.
echo.---  Compiling docker image  ------------------
echo.
set DOCKER_TAG=memory-test-jdk16alpine-spring:0.0.1
docker rmi %DOCKER_TAG%
docker build --build-arg image=openjdk:16-alpine -t %DOCKER_TAG% .


endlocal
