Write-Host "Fixing corrupted CSS files..." -ForegroundColor Yellow

# Create clean App.css
$appCssContent = @"
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
"@

# Create clean index.css
$indexCssContent = @"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@

# Write the clean content to files
Set-Content -Path "frontend\src\App.css" -Value $appCssContent -Encoding UTF8
Set-Content -Path "frontend\src\index.css" -Value $indexCssContent -Encoding UTF8

Write-Host "CSS files fixed successfully!" -ForegroundColor Green
Write-Host "Now try: cd frontend && npm start" -ForegroundColor Cyan 