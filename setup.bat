@echo off
echo Installing European Weather Forecast App...
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo Choose the LTS version and run this script again.
    pause
    exit /b 1
)

echo Node.js found! Installing dependencies...
npm install

if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    echo Try running: npm install --force
    pause
    exit /b 1
)

echo.
echo ✓ Installation complete!
echo.
echo To start the app, run: npm run dev
echo Then open your browser to: http://localhost:5000
echo.
pause