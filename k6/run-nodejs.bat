@echo off
setlocal
cd /d %~dp0

set LANGUAGE_FOLDER=nodejs

rem ------------------------------------------------

call step-database.bat

call step-language.bat

call step-k6.bat

call step-stop.bat

rem ------------------------------------------------
echo.
echo.---  Completed  -------------------------------
echo.
