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
```

Expected: v18.x or higher, npm 9.x or higher

---

## ⭐ 2. Install PostgreSQL (Required)

### 📌 Why?

- Stores users  
- Stores quiz questions  
- Tracks simulation progress  
- Analytics & XP data

### 📥 Installation Steps (Windows)

1. Visit: https://www.postgresql.org/download/windows/
2. Download installer
3. Select components:
   - ✅ PostgreSQL Server
   - ✅ pgAdmin
   - ✅ Command Line Tools
   - ❌ Stack Builder (optional)
4. Set password (e.g., Username: `postgres`, Password: `1234`)
5. Keep default port: `5432`

### ✅ Verify PostgreSQL

```bash
psql --version
```

If not recognized, add to PATH: `C:\Program Files\PostgreSQL\16\bin` → Environment Variables → restart terminal.

---

## ⭐ 3. Install Git (Recommended)

1. Download: https://git-scm.com/downloads
2. Verify: `git --version`

---

## ⭐ 4. Create Required Accounts (For Production Deployment)

- GitHub: https://github.com
- Neon: https://neon.tech (PostgreSQL hosting)
- Render: https://render.com (Backend hosting)
- Vercel: https://vercel.com (Frontend hosting)

---

## 💻 Local Development Setup

### ⭐ Step 1 — Create Local Database

```bash
psql -U postgres
```

Then in the PostgreSQL prompt:

```sql
CREATE DATABASE cyberraksha;
\q
```

### ⭐ Step 2 — Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your local values:

```env
DATABASE_URL=postgresql://postgres:1234@localhost:5432/cyberraksha
JWT_SECRET=cyberraksha_dev_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

### ⭐ Step 3 — Install Backend Dependencies

```bash
npm install
```

### ⭐ Step 4 — Run Database Migration

```bash
npm run migrate
```

Tables created automatically:
- `users`
- `simulations`
- `quiz_questions`
- `user_progress`
- `user_quiz_attempts`

### ⭐ Step 5 — Start Backend Server

```bash
npm run dev
```

Backend runs at: http://localhost:5000

Health check: http://localhost:5000/api/health

### ⭐ Step 6 — Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### ⭐ Step 7 — Test Full Flow

1. Open http://localhost:5173 in browser
2. Register a new user
3. Login → Dashboard
4. Start a simulation
5. Complete quiz
6. Verify progress is saved in database

---

## ☁️ Production Deployment

### ⭐ Step 1 — Create Neon Database

1. Login to https://neon.tech
2. Create a new project named `cyberraksha`
3. Copy the connection string (format: `postgresql://user:password@...`)
4. Run the migration from your local machine:

```bash
psql "postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/cyberraksha?sslmode=require" -f backend/database/migrations/001_initial_schema.sql
```

Or, from the `backend` directory:

```bash
psql "your_neon_connection_string" -f database/migrations/001_initial_schema.sql
```

> This creates all necessary tables in production.

### ⭐ Step 2 — Deploy Backend on Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure:

**Settings:**
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Environment Variables:**
```env
NODE_ENV=production
DATABASE_URL=<your_neon_connection_string>
JWT_SECRET=<generate_strong_random_secret>
CLIENT_URL=<your_vercel_frontend_url>
PORT=5000
```

> Generate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

**Important:** After Vercel frontend is deployed, update `CLIENT_URL` and redeploy backend.

### ⭐ Step 3 — Deploy Frontend on Vercel

1. Connect your GitHub repository to Vercel
2. Configure:

**Settings:**
- **Framework:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**Environment Variables:**
```env
VITE_API_URL=https://<your-render-backend-url>
```

> Example: `VITE_API_URL=https://cyberraksha-api.onrender.com`

### ⭐ Step 4 — Update Backend CORS (if needed)

After Vercel URL is ready:

1. Update Render environment variable: `CLIENT_URL=<vercel_url>`
2. Trigger redeploy on Render
3. Test CORS by accessing frontend

### ⭐ Step 5 — Verify Production Deployment

1. Navigate to frontend URL (Vercel)
2. Register a new user
3. Complete a simulation
4. Check Neon dashboard to verify data is saved in `user_progress` table

---

## 🔐 Security Features

- **Password Hashing:** bcryptjs (10 salt rounds)
- **Authentication:** JWT tokens with expiration
- **Protected Routes:** API endpoints require valid JWT
- **XP Anti-Duplication:** Prevents double-crediting for repeated quiz attempts
- **Database Security:** SSL required for Neon connections
- **CORS:** Configured to only accept requests from frontend URL
- **Environment Secrets:** JWT_SECRET not committed to repository

---

## ✅ Troubleshooting

### Backend won't start
- Ensure PostgreSQL service is running: `psql --version`
- Check correct password in `.env` DATABASE_URL
- Verify port 5000 is free: `netstat -an | grep 5000` (or `lsof -i :5000` on Mac)
- Run `npm run migrate` to create tables

### Migration fails
- Verify connection string is correct
- Check PostgreSQL is running locally
- For Neon: verify SSL mode (`?sslmode=require`)
- Run migration from `backend` directory or use full path to SQL file

### Frontend can't reach backend
- Ensure backend is running: http://localhost:5000/api/health
- Check `CLIENT_URL` in backend `.env` matches frontend origin
- Verify `VITE_API_URL` is set correctly in production (Vercel env vars)
- Check browser console for CORS errors

### User registration/login fails
- Verify `users` table exists: `psql cyberraksha -c "\dt"`
- Check Node.js version ≥ 18: `node -v`
- Review backend logs for database errors

### Verify project is ready for deployment

Before pushing to production:

```bash
# 1. Backend health check
curl http://localhost:5000/api/health

# 2. Database connection
npm run migrate

# 3. Frontend builds
npm run build

# 4. No console errors in browser
```