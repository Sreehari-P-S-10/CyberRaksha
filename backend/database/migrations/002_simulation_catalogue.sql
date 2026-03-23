-- ══════════════════════════════════════════════════════════════════
-- Migration 002: simulation_catalogue
-- Run after 001_initial_schema.sql
--
-- This table replaces the hardcoded SIMULATIONS object inside
-- SimulationCategoryPage.jsx.
--
-- Why a separate table and not columns on `simulations`?
--   The same simulation_id can appear in MULTIPLE categories/age groups
--   with a DIFFERENT level_order each time.
--   e.g. 'fs-v-otp-1' is level 5 for students but level 7 for professionals.
--   That's a many-to-many relationship — it belongs in its own table.
--
-- PRIMARY KEY: (simulation_id, category_route, age_group)
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS simulation_catalogue (
  id              SERIAL PRIMARY KEY,
  simulation_id   VARCHAR(100) NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
  category_route  VARCHAR(80)  NOT NULL,   -- matches URL param: 'financial-security' etc.
  age_group       VARCHAR(20)  NOT NULL CHECK (age_group IN ('student','professional','elderly')),
  level_order     INTEGER      NOT NULL DEFAULT 1,   -- display order within the list
  duration        VARCHAR(20),                        -- '10 min', '14 min' etc.
  badge           VARCHAR(40),                        -- 'New', 'Interactive' etc.
  UNIQUE (simulation_id, category_route, age_group)
);

-- desc and objectives are stored on the simulations table already (description column).
-- We add a card_desc column specifically for the longer card-level description
-- (different from the short `description` already in simulations).
ALTER TABLE simulations
  ADD COLUMN IF NOT EXISTS card_desc  TEXT,
  ADD COLUMN IF NOT EXISTS objectives TEXT[];   -- array of objective strings

CREATE INDEX IF NOT EXISTS idx_sim_catalogue_category
  ON simulation_catalogue(category_route, age_group);
