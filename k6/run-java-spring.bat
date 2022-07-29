@echo off
setlocal
cd /d %~dp0

set LANGUAGE_FOLDER=spring-2.5.4

rem ------------------------------------------------

call step-database.bat

call step-language.bat

call step-k6.bat

call step-stop.bat

rem ------------------------------------------------
echo.
echo.---  Completed  -------------------------------
echo.
