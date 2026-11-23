@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0apply-portfolio-cleanup.ps1"
set "RESULT=%ERRORLEVEL%"
echo.
if not "%RESULT%"=="0" (
  echo Cleanup did not complete. Read the message above.
) else (
  echo Cleanup script finished. Restart your Next.js development server.
)
echo.
pause
exit /b %RESULT%
