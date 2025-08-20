#!/bin/bash

echo "🚀 Setting up Budget Tracker project..."

# Install backend dependencies
echo "�� Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "�� Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your database credentials"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start PostgreSQL and create the database"
echo "3. Run: cd backend && npm run db:migrate"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm start"
echo ""
echo "🌐 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:3000" 