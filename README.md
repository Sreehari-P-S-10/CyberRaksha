# 🛡️ CyberRaksha — Cyber Fraud & Malware Awareness Simulation Platform

An interactive, simulation-driven cybersecurity awareness platform that trains users to recognize and resist cyber threats through realistic, decision-based scenarios.

## 📁 Project Structure

```
cyberraksha/
├── frontend/          # React.js frontend (SPA)
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page-level components
│       ├── hooks/         # Custom React hooks
│       ├── context/       # React Context (auth, theme)
│       └── utils/         # Helper functions
├── backend/           # Node.js + Express.js API
│   ├── controllers/   # Route handler logic
│   ├── routes/        # API route definitions
│   ├── middleware/    # Auth, error handlers
│   ├── models/        # DB model definitions
│   └── config/        # DB, env config
├── database/
│   ├── migrations/    # PostgreSQL schema migrations
│   └── seeds/         # Seed data for scenarios
└── .github/workflows/ # CI/CD pipelines
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (or Neon cloud account)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cyberraksha.git
cd cyberraksha
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in your DB credentials
npm run migrate        # Run DB migrations
npm run seed           # Seed initial scenario data
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React.js, Vite, CSS Modules |
| Backend   | Node.js, Express.js         |
| Database  | PostgreSQL (Neon Cloud)     |
| Auth      | JWT (JSON Web Tokens)       |
| Dev Tools | ESLint, Prettier, Nodemon   |

## 👥 Team
- Adith
- Sreehari  
- Neeraj

## 📄 License
MIT
