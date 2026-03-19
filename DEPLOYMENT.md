# 🚀 CyberRaksha — Complete Setup & Deployment Guide

---

## 🧠 Project Overview

CyberRaksha is a **full-stack cyber-security awareness platform** built using:

- ⚛️ Frontend → React + Vite  
- 🧩 Backend → Node.js + Express  
- 🗄️ Database → PostgreSQL  

Local environment architecture:


Frontend → http://localhost:5173

Backend → http://localhost:5000

Database → PostgreSQL (local)


---

# ✅ Prerequisites

Before running the project, install the following.

---

## ⭐ 1. Install Node.js (Required)

### 📌 Why?

- Runs backend server  
- Installs project dependencies  
- Runs frontend development server  

### 📥 Installation Steps

1. Visit: https://nodejs.org  
2. Download **LTS version**
3. Run installer → keep all default settings  
4. Ensure **Add to PATH** option is selected  

### ✅ Verify Installation

```bash
node -v
npm -v

Expected:

v18.x or higher
9.x or higher
⭐ 2. Install PostgreSQL (Required)
📌 Why?

Database stores:

users

quiz questions

simulation progress

XP & analytics

📥 Installation Steps (Windows)

Visit: https://www.postgresql.org/download/windows/

Download installer

Select components:

✅ PostgreSQL Server

✅ pgAdmin

✅ Command Line Tools

❌ Stack Builder (not required)

🔐 Set Password

Example:

Username: postgres
Password: 1234
🔌 Keep Default Port
5432
✅ Verify PostgreSQL
psql --version

If not recognized:

Add to PATH:

C:\Program Files\PostgreSQL\16\bin

Environment Variables → System Variables → Path → Add.

Restart terminal.

⭐ 3. Install Git (Recommended)

Download:

https://git-scm.com/downloads

Verify:

git --version
⭐ 4. Create Required Accounts (For Deployment)

GitHub → https://github.com

Neon → https://neon.tech

Render → https://render.com

Vercel → https://vercel.com

💻 Local Development Setup
⭐ Step 1 — Create Local Database
psql -U postgres

Then:

CREATE DATABASE cyberraksha;
\q
⭐ Step 2 — Configure Backend Environment
cd backend
copy .env.example .env

Edit .env:

DATABASE_URL=postgresql://postgres:1234@localhost:5432/cyberraksha
JWT_SECRET=cyberraksha_dev_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
⭐ Step 3 — Install Backend Dependencies
npm install
⭐ Step 4 — Run Database Migration
npm run migrate

Tables created automatically:

users

simulations

quiz_questions

user_progress

⭐ Step 5 — Start Backend Server
npm run dev

Backend runs at:

http://localhost:5000

Health Check:

http://localhost:5000/api/health
⭐ Step 6 — Start Frontend

Open new terminal:

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
⭐ Step 7 — Test Full Flow

Open frontend URL

Register new user

Login → Dashboard

Start simulation

Complete quiz

Verify progress saved

☁️ Production Deployment
⭐ Step 1 — Create Neon Database

Login → https://neon.tech

Create project → cyberraksha

Copy connection string

Run migration:

psql "connection_string" -f database/migrations/001_initial_schema.sql
⭐ Step 2 — Deploy Backend on Render

Settings:

Root Directory → backend
Build Command → npm install
Start Command → npm start

Environment Variables:

NODE_ENV=production
DATABASE_URL=your_neon_url
JWT_SECRET=random_secret
CLIENT_URL=vercel_url
⭐ Step 3 — Deploy Frontend on Vercel

Settings:

Framework → Vite
Root → frontend
Build → npm run build
Output → dist

Environment Variable:

VITE_API_URL=render_backend_url
⭐ Step 4 — Update Backend CORS

Update:

CLIENT_URL=vercel_url

Redeploy backend.

⭐ Step 5 — Verify Production

Register user

Complete simulation

Check Neon dashboard

Verify user_progress row

🔐 Security Features

bcrypt password hashing

JWT authentication

Protected API routes

XP anti-duplication logic

SSL DB connections in production

Security headers enabled

✅ Beginner Troubleshooting

Ensure:

PostgreSQL service running

Correct DB password in .env

Node version ≥ 18

Backend port free

Tables created after migration