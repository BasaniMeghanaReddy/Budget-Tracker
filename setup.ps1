Write-Host "Setting up Budget Tracker project..." -ForegroundColor Green

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "Please update the .env file with your database credentials" -ForegroundColor Red
}

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
npm install

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update backend/.env with your database credentials"
Write-Host "2. Start PostgreSQL and create the database"
Write-Host "3. Run: cd backend; npm run db:migrate"
Write-Host "4. Start backend: cd backend; npm run dev"
Write-Host "5. Start frontend: cd frontend; npm start"
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000"
Write-Host "Frontend will run on: http://localhost:3000" 