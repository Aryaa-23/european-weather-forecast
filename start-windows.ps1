Write-Host "Starting European Weather Forecast App..." -ForegroundColor Green
Write-Host ""
$env:NODE_ENV = "development"
npx tsx server/index.ts