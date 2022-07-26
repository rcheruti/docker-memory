@echo off

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

rem ------------------------------------------------
echo.
echo.---  Creating Java container  -----------------
echo.
call ../spring-2.5.4/make-docker-image.bat
docker-compose -f ../spring-2.5.4/docker-compose.yml up -d

rem ------------------------------------------------
echo.
echo.---  Running Tests  ---------------------------
echo.
timeout 30
k6 run ./src/test-post-pessoa.js
k6 run ./src/test-post-carro.js
k6 run ./src/test-get-pessoa.js

rem ------------------------------------------------
echo.
echo.---  Stoping Services  ------------------------
echo.
docker-compose -f ../spring-2.5.4/docker-compose.yml down
docker-compose -f docker-compose/docker-compose-mysql.yml down

rem ------------------------------------------------
echo.
echo.---  Completed  -------------------------------
echo.
