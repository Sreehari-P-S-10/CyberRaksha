-- ══════════════════════════════════════════════════════════════════
-- CyberRaksha — Full Database Schema
-- Run with: psql $DATABASE_URL -f database/migrations/001_initial_schema.sql
-- Or via:   cd backend && npm run migrate
-- ══════════════════════════════════════════════════════════════════

-- ── 1. USERS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  email            VARCHAR(150) UNIQUE NOT NULL,
  password_hash    TEXT NOT NULL,
  age_category     VARCHAR(20) CHECK (age_category IN ('student','professional','elderly')),
  expertise_level  VARCHAR(20) CHECK (expertise_level IN ('beginner','intermediate','advanced')) DEFAULT 'beginner',
  total_points     INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. SIMULATIONS — metadata only ────────────────────────────────
-- Simulation *content* (steps, choices, React environments) lives in
-- frontend/src/simulations/simulationsData.js  ← single source of truth
-- This table stores only what the DB needs to know: identity, catalogue,
-- XP value, and discovery metadata.
CREATE TABLE IF NOT EXISTS simulations (
  id               VARCHAR(100) PRIMARY KEY,   -- matches frontend simId e.g. 'mal-ransomware-pro'
  title            VARCHAR(200) NOT NULL,
  category         VARCHAR(100) NOT NULL,       -- matches sim.category in simulationsData.js
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('Beginner','Intermediate','Advanced')),
  xp_reward        INTEGER DEFAULT 50,
  description      TEXT,
  sim_type         VARCHAR(20) DEFAULT 'visual' CHECK (sim_type IN ('text','visual')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. QUIZZES — one row per simulation that has a quiz ───────────
CREATE TABLE IF NOT EXISTS quizzes (
  id               SERIAL PRIMARY KEY,
  simulation_id    VARCHAR(100) REFERENCES simulations(id) ON DELETE CASCADE,
  pass_mark        INTEGER DEFAULT 60,         -- percentage required to pass
  xp_reward        INTEGER DEFAULT 30,
  UNIQUE(simulation_id)
);

-- ── 4. QUIZ QUESTIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id               SERIAL PRIMARY KEY,
  quiz_id          INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_order   INTEGER NOT NULL DEFAULT 1,
  question_text    TEXT NOT NULL,
  option_a         TEXT NOT NULL,
  option_b         TEXT NOT NULL,
  option_c         TEXT NOT NULL,
  option_d         TEXT NOT NULL,
  correct_option   CHAR(1) CHECK (correct_option IN ('a','b','c','d')),
  explanation      TEXT
);

-- ── 5. USER PROGRESS — per simulation ────────────────────────────
-- simulation_id is the string key from simulationsData.js (e.g. 'mal-virus-student')
-- simulation_title & simulation_category are denormalised to avoid joins on hot paths
CREATE TABLE IF NOT EXISTS user_progress (
  id                  SERIAL PRIMARY KEY,
  user_id             INTEGER REFERENCES users(id) ON DELETE CASCADE,
  simulation_id       VARCHAR(100) NOT NULL,
  simulation_title    VARCHAR(200),
  simulation_category VARCHAR(100),
  status              VARCHAR(20) DEFAULT 'in_progress'
                        CHECK (status IN ('in_progress','completed')),
  points_earned       INTEGER DEFAULT 0,
  completed_at        TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, simulation_id)
);

-- ── 6. USER QUIZ ATTEMPTS — one row per quiz attempt ─────────────
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER REFERENCES users(id) ON DELETE CASCADE,
  simulation_id    VARCHAR(100) NOT NULL,
  score_pct        INTEGER NOT NULL DEFAULT 0,   -- 0-100
  correct_count    INTEGER NOT NULL DEFAULT 0,
  total_questions  INTEGER NOT NULL DEFAULT 0,
  xp_earned        INTEGER NOT NULL DEFAULT 0,
  passed           BOOLEAN DEFAULT FALSE,
  attempted_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ───────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email              ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user       ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_sim        ON user_progress(simulation_id);
CREATE INDEX IF NOT EXISTS idx_simulations_category     ON simulations(category);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz      ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user  ON user_quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_sim   ON user_quiz_attempts(simulation_id);
