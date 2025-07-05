@echo off
echo Starting European Weather Forecast App...
echo.

REM Set environment variable for Windows
set NODE_ENV=development

REM Start the application
npx tsx server/index.ts