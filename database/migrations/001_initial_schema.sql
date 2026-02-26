-- CyberRaksha Database Schema
-- Run with: psql $DATABASE_URL -f migrations/001_initial_schema.sql

-- Users
CREATE TABLE IF NOT EXISTS users (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  email            VARCHAR(150) UNIQUE NOT NULL,
  password_hash    TEXT NOT NULL,
  age_category     VARCHAR(20) CHECK (age_category IN ('student','adult','elderly')),
  expertise_level  VARCHAR(20) CHECK (expertise_level IN ('beginner','intermediate','advanced')) DEFAULT 'beginner',
  total_points     INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Simulations
CREATE TABLE IF NOT EXISTS simulations (
  id               SERIAL PRIMARY KEY,
  title            VARCHAR(200) NOT NULL,
  category         VARCHAR(50) CHECK (category IN ('phishing','finance_scam','malware','social_engineering','others')),
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner','intermediate','advanced')),
  description      TEXT,
  thumbnail_url    TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Simulation Steps (branching nodes)
CREATE TABLE IF NOT EXISTS simulation_steps (
  id               SERIAL PRIMARY KEY,
  simulation_id    INTEGER REFERENCES simulations(id) ON DELETE CASCADE,
  step_order       INTEGER NOT NULL,
  scenario_text    TEXT NOT NULL,
  step_type        VARCHAR(30) DEFAULT 'decision', -- decision | info | consequence
  media_url        TEXT
);

-- Choices per step
CREATE TABLE IF NOT EXISTS step_choices (
  id               SERIAL PRIMARY KEY,
  step_id          INTEGER REFERENCES simulation_steps(id) ON DELETE CASCADE,
  choice_text      TEXT NOT NULL,
  is_correct       BOOLEAN DEFAULT FALSE,
  consequence_text TEXT,
  explanation      TEXT,
  prevention_tip   TEXT,
  points           INTEGER DEFAULT 10,
  next_step_id     INTEGER REFERENCES simulation_steps(id)
);

-- Quiz questions per simulation
CREATE TABLE IF NOT EXISTS quiz_questions (
  id               SERIAL PRIMARY KEY,
  simulation_id    INTEGER REFERENCES simulations(id) ON DELETE CASCADE,
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
CREATE TABLE IF NOT EXISTS user_progress (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER REFERENCES users(id) ON DELETE CASCADE,
  simulation_id    INTEGER REFERENCES simulations(id) ON DELETE CASCADE,
  status           VARCHAR(20) DEFAULT 'in_progress', -- in_progress | completed
  points_earned    INTEGER DEFAULT 0,
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, simulation_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_simulations_category ON simulations(category);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
