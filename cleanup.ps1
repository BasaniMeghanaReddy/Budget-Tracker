# Clean up the index.css file
$indexCssContent = "@tailwind base;
@tailwind components;
@tailwind utilities;"

Set-Content -Path "frontend\src\index.css" -Value $indexCssContent

Write-Host "Cleaned up index.css" -ForegroundColor Green 