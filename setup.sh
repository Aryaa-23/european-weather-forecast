#!/bin/bash

echo "Installing European Weather Forecast App..."
echo

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Choose the LTS version and run this script again."
    exit 1
fi

echo "Node.js found! Version: $(node --version)"
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    echo "Try running: npm install --force"
    exit 1
fi

echo
echo "✓ Installation complete!"
echo
echo "To start the app, run: npm run dev"
echo "Then open your browser to: http://localhost:5000"
echo