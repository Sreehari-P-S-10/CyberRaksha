-- CyberRaksha Database Schema
-- Run locally:   psql $DATABASE_URL -f database/migrations/001_initial_schema.sql
-- Or via runner: cd backend && npm run migrate

-- Users
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

-- Simulations reference table (for catalogue / future admin use)
-- NOTE: Simulation content (steps, choices) lives in frontend/src/simulations/simulationsData.js
--       This table stores metadata for discovery and cataloguing.
CREATE TABLE IF NOT EXISTS simulations (
  id               VARCHAR(100) PRIMARY KEY,   -- matches frontend simId e.g. 'md-ransomware-p'
  title            VARCHAR(200) NOT NULL,
  category         VARCHAR(80) NOT NULL,
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner','intermediate','advanced')),
  age_group        VARCHAR(20) CHECK (age_group IN ('student','professional','elderly','all')),
  xp_reward        INTEGER DEFAULT 50,
  description      TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz questions per simulation
CREATE TABLE IF NOT EXISTS quiz_questions (
  id               SERIAL PRIMARY KEY,
  simulation_id    VARCHAR(100) REFERENCES simulations(id) ON DELETE CASCADE,
  question_text    TEXT NOT NULL,
  option_a         TEXT NOT NULL,
  option_b         TEXT NOT NULL,
  option_c         TEXT NOT NULL,
  option_d         TEXT NOT NULL,
  correct_option   CHAR(1) CHECK (correct_option IN ('a','b','c','d')),
  points           INTEGER DEFAULT 5,
  explanation      TEXT
);

-- User progress per simulation
-- simulation_id = frontend string ID (e.g. 'md-ransomware-p') — no FK needed
-- simulation_title stored inline to avoid joins at query time
CREATE TABLE IF NOT EXISTS user_progress (
  id                  SERIAL PRIMARY KEY,
  user_id             INTEGER REFERENCES users(id) ON DELETE CASCADE,
  simulation_id       VARCHAR(100) NOT NULL,
  simulation_title    VARCHAR(200),
  simulation_category VARCHAR(80),
  status              VARCHAR(20) DEFAULT 'in_progress'
                        CHECK (status IN ('in_progress','completed')),
  points_earned       INTEGER DEFAULT 0,
  completed_at        TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, simulation_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email          ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user   ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_sim    ON user_progress(simulation_id);
CREATE INDEX IF NOT EXISTS idx_simulations_category ON simulations(category);
