@echo off
setlocal
cd /d %~dp0

rem ------------------------------------------------
echo.
echo.---  Running Databasse  -----------------------
echo.
docker-compose -f docker-compose/docker-compose-mysql.yml up -d


rem ------------------------------------------------
echo.
echo.---  Importing Schema to Database  ------------
echo.
timeout 15
docker exec -i memory-test-mysql mysql -h 127.0.0.1 -u docker-memory -pdocker-memory < docker-compose/mysql-schema.sql

