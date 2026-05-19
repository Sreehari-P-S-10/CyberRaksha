<div align="center">

# 🛡️ CyberRaksha

### Cyber Fraud & Malware Awareness Simulation Platform

[![CI](https://github.com/Sreehari-P-S-10/CyberRaksha/actions/workflows/ci.yml/badge.svg)](https://github.com/Sreehari-P-S-10/CyberRaksha/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**An interactive, simulation-driven cybersecurity awareness platform that trains users to recognize and resist cyber threats through realistic, decision-based scenarios.**

[🚀 Live Demo](https://cyber-raksha-eta.vercel.app) • [Documentation](DEPLOYMENT.md) • [Report Bug](https://github.com/Sreehari-P-S-10/CyberRaksha/issues) • [Request Feature](https://github.com/Sreehari-P-S-10/CyberRaksha/issues)

> 🎓 **Mini Project** — B.Tech Computer Science & Engineering, Government Engineering College Thrissur (APJ Abdul Kalam Technological University)

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About the Project

**CyberRaksha** (Cyber + Raksha, meaning "Cyber Protection" in Sanskrit) is an educational platform designed to combat the growing threat of cyber fraud and malware attacks. Instead of passive learning, users engage with **interactive simulations** that mimic real-world cyber attack scenarios.

The platform adapts to different user profiles:
- 🎓 **Students** — Learn about USB viruses, phishing, and social engineering
- 💼 **Professionals** — Train against ransomware, business email compromise, and spear phishing
- 👴 **Elderly** — Recognize phone scams, fake tech support, and fraudulent messages

Each simulation presents decision points where users must choose how to respond. Wrong choices show realistic consequences; correct choices earn XP and reinforce safe behavior.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎮 **Interactive Simulations** | Decision-based scenarios with branching consequences |
| 🖥️ **Visual Environments** | Realistic UI mockups (fake websites, SMS threads, file managers) |
| 📊 **Progress Tracking** | XP system with user dashboard and completion history |
| 📝 **Post-Simulation Quizzes** | Reinforce learning with MCQ assessments |
| 🎯 **Adaptive Difficulty** | Beginner, intermediate, and advanced scenarios |
| 👥 **User Profiles** | Age-category based content (student/professional/elderly) |
| 🔐 **Secure Authentication** | JWT-based auth with bcrypt password hashing |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile devices |

---

## 📸 Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Simulation Categories
![Simulations](docs/screenshots/simulations.png)

### Simulation in Action
![Simulation Player](docs/screenshots/simulation-player.png)
---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    React.js + Vite SPA                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │   │
│  │  │  Pages   │  │Components│  │ Context  │  │  Hooks   │    │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │   │
│  │                    ▼                                         │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │           Simulation Engine (Visual + Text)           │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ HTTP/REST
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          SERVER LAYER                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Node.js + Express.js                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │   │
│  │  │  Routes  │  │Controllers│ │Middleware│  │  Config  │    │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │   │
│  │       │              │             │                         │   │
│  │       └──────────────┴─────────────┴──────────┐              │   │
│  │                                               ▼              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │         JWT Auth │ CORS │ Error Handling              │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ PostgreSQL Protocol
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      PostgreSQL                              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │   │
│  │  │  users   │  │simulations│ │quiz_ques │  │user_prog │    │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                    Local: PostgreSQL | Cloud: Neon                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User interacts** with React frontend (simulations, quizzes, dashboard)
2. **Frontend sends** API requests to Express.js backend
3. **Backend validates** JWT token via middleware
4. **Controllers process** business logic and query PostgreSQL
5. **Response flows back** through the same path to update UI

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | Component-based UI library |
| [Vite 5](https://vitejs.dev/) | Fast build tool and dev server |
| [React Router 6](https://reactrouter.com/) | Client-side routing |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styling |

### Backend
| Technology | Purpose |
|------------|---------|
| [Node.js 18+](https://nodejs.org/) | JavaScript runtime |
| [Express.js 4](https://expressjs.com/) | Web application framework |
| [JWT](https://jwt.io/) | Stateless authentication |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Password hashing |
| [pg](https://node-postgres.com/) | PostgreSQL client |

### Database
| Technology | Purpose |
|------------|---------|
| [PostgreSQL 15+](https://www.postgresql.org/) | Relational database |
| [Neon](https://neon.tech/) | Serverless PostgreSQL (production) |

### DevOps & Tooling
| Technology | Purpose |
|------------|---------|
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipelines |
| [Vercel](https://vercel.com/) | Frontend hosting |
| [Render](https://render.com/) | Backend hosting |
| [Nodemon](https://nodemon.io/) | Development auto-reload |

---

## 📁 Project Structure

```
CyberRaksha/
├── 📂 frontend/                    # React.js Single Page Application
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable UI components
│   │   │   └── ProtectedRoute.jsx  # Auth route guard
│   │   ├── 📂 context/             # React Context providers
│   │   ├── 📂 hooks/               # Custom React hooks
│   │   ├── 📂 pages/               # Page-level components
│   │   │   ├── DashboardPage.jsx   # User dashboard
│   │   │   ├── LandingPage.jsx     # Home page
│   │   │   ├── LearnPage.jsx       # Learning resources
│   │   │   ├── LoginPage.jsx       # Authentication
│   │   │   ├── RegisterPage.jsx    # User registration
│   │   │   ├── QuizPage.jsx        # Post-simulation quizzes
│   │   │   └── SimulationPlayerPage.jsx
│   │   ├── 📂 simulations/         # Simulation engine & data
│   │   │   ├── simulationsData.js  # All simulation content
│   │   │   ├── SimulationEngine.jsx
│   │   │   ├── SimulationRenderer.jsx
│   │   │   └── 📂 components/      # Visual environment UIs
│   │   ├── 📂 utils/               # Helper functions
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── 📂 backend/                     # Node.js + Express.js API
│   ├── 📂 config/                  # Database & app configuration
│   ├── 📂 controllers/             # Request handlers
│   ├── 📂 database/                # Migration & seed scripts
│   ├── 📂 middleware/              # Auth, error handlers, CORS
│   ├── 📂 routes/                  # API route definitions
│   │   ├── auth.js                 # /api/auth/*
│   │   ├── users.js                # /api/users/*
│   │   ├── simulations.js          # /api/simulations/*
│   │   ├── quizzes.js              # /api/quizzes/*
│   │   ├── progress.js             # /api/progress/*
│   │   └── catalogue.js            # /api/catalogue/*
│   ├── server.js                   # Express app entry
│   ├── .env.example
│   └── package.json
│
├── 📂 database/
│   ├── 📂 migrations/              # SQL schema files
│   │   └── 001_initial_schema.sql
│   └── 📂 seeds/                   # Initial data population
│
├── 📂 .github/
│   └── 📂 workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
│
├── render.yaml                     # Render deployment config
├── vercel.json                     # Vercel deployment config
├── DEPLOYMENT.md                   # Detailed deployment guide
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Installation |
|-------------|---------|--------------|
| Node.js | 18.x or higher | [Download](https://nodejs.org/) |
| npm | 9.x or higher | Included with Node.js |
| PostgreSQL | 15.x or higher | [Download](https://www.postgresql.org/download/) |
| Git | Latest | [Download](https://git-scm.com/) |

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Sreehari-P-S-10/CyberRaksha.git
cd CyberRaksha
```

#### 2. Set Up the Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE cyberraksha;
\q
```

#### 3. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/cyberraksha
JWT_SECRET=your_secure_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

#### 4. Install Dependencies & Run Migrations

```bash
# Backend
cd backend
npm install
npm run migrate

# Frontend (new terminal)
cd frontend
npm install
```

#### 5. Start Development Servers

```bash
# Terminal 1 - Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 - Frontend (http://localhost:5173)
cd frontend
npm run dev
```

#### 6. Verify Installation

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new user account |
| `POST` | `/api/auth/login` | Authenticate and get JWT |
| `GET` | `/api/auth/me` | Get current user profile |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/profile` | Get user profile details |
| `PUT` | `/api/users/profile` | Update user profile |

### Simulations
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/simulations` | List all simulations |
| `GET` | `/api/simulations/:id` | Get simulation by ID |
| `GET` | `/api/catalogue` | Get simulation catalogue |

### Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/progress` | Get user's progress |
| `POST` | `/api/progress` | Save simulation progress |
| `PUT` | `/api/progress/:id` | Update progress entry |

### Quizzes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/quizzes/:simId` | Get quiz for simulation |
| `POST` | `/api/quizzes/submit` | Submit quiz answers |

---

## 💾 Database Schema

```sql
┌─────────────────────────────────────────────────────────────────┐
│                           users                                  │
├─────────────────────────────────────────────────────────────────┤
│ id               SERIAL PRIMARY KEY                             │
│ name             VARCHAR(100) NOT NULL                          │
│ email            VARCHAR(150) UNIQUE NOT NULL                   │
│ password_hash    TEXT NOT NULL                                  │
│ age_category     VARCHAR(20) [student|professional|elderly]     │
│ expertise_level  VARCHAR(20) [beginner|intermediate|advanced]   │
│ total_points     INTEGER DEFAULT 0                              │
│ created_at       TIMESTAMPTZ                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       user_progress                              │
├─────────────────────────────────────────────────────────────────┤
│ id                  SERIAL PRIMARY KEY                          │
│ user_id             INTEGER FK → users(id)                      │
│ simulation_id       VARCHAR(100)                                │
│ simulation_title    VARCHAR(200)                                │
│ simulation_category VARCHAR(80)                                 │
│ status              VARCHAR(20) [in_progress|completed]         │
│ points_earned       INTEGER                                     │
│ completed_at        TIMESTAMPTZ                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       simulations                                │
├─────────────────────────────────────────────────────────────────┤
│ id               VARCHAR(100) PRIMARY KEY                       │
│ title            VARCHAR(200) NOT NULL                          │
│ category         VARCHAR(80) NOT NULL                           │
│ difficulty_level VARCHAR(20)                                    │
│ age_group        VARCHAR(20)                                    │
│ xp_reward        INTEGER DEFAULT 50                             │
│ description      TEXT                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      quiz_questions                              │
├─────────────────────────────────────────────────────────────────┤
│ id               SERIAL PRIMARY KEY                             │
│ simulation_id    VARCHAR(100) FK → simulations(id)              │
│ question_text    TEXT NOT NULL                                  │
│ option_a/b/c/d   TEXT NOT NULL                                  │
│ correct_option   CHAR(1) [a|b|c|d]                              │
│ points           INTEGER DEFAULT 5                              │
│ explanation      TEXT                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## ☁️ Deployment

### Production Architecture

```
                    ┌─────────────────┐
                    │    Vercel       │
                    │  (Frontend)     │
                    │ cyberraksha.    │
                    │ vercel.app      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Render       │
                    │   (Backend)     │
                    │ cyberraksha-api │
                    │ .onrender.com   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Neon        │
                    │  (PostgreSQL)   │
                    │ Serverless DB   │
                    └─────────────────┘
```

### Deployment Steps

1. **Database (Neon)**
   - Create project at [neon.tech](https://neon.tech)
   - Run migration: `psql "connection_string" -f database/migrations/001_initial_schema.sql`

2. **Backend (Render)**
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set environment variables

3. **Frontend (Vercel)**
   - Import GitHub repo
   - Framework: Vite
   - Root Directory: `frontend`
   - Set `VITE_API_URL` environment variable

> 📚 See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🔐 Security

| Feature | Implementation |
|---------|----------------|
| Password Hashing | bcrypt with salt rounds |
| Authentication | JWT tokens with expiration |
| Protected Routes | Middleware-based auth guards |
| XSS Prevention | Security headers via Vercel |
| CORS | Configurable origin whitelist |
| SQL Injection | Parameterized queries |
| XP Anti-Duplication | Server-side validation |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes locally before submitting
- Update documentation if needed

---

## 👥 Team

> 🎓 B.Tech Computer Science & Engineering — Government Engineering College Thrissur (APJ Abdul Kalam Technological University)

<table>
  <tr>
    <td align="center"><strong>Adith K A</strong><br/>Developer</td>
    <td align="center"><strong>Sreehari P S</strong><br/>Developer</td>
    <td align="center"><strong>Neeraj Krishnan</strong><br/>Developer</td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 CyberRaksha Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) — UI library
- [Vite](https://vitejs.dev/) — Build tooling
- [Express.js](https://expressjs.com/) — Backend framework
- [PostgreSQL](https://www.postgresql.org/) — Database
- [Neon](https://neon.tech/) — Serverless PostgreSQL
- [Vercel](https://vercel.com/) — Frontend hosting
- [Render](https://render.com/) — Backend hosting
- [Shields.io](https://shields.io/) — README badges

---

<div align="center">

**Made with ❤️ for a safer digital world**

[⬆ Back to Top](#-cyberraksha)

</div>
