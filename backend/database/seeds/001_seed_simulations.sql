-- ══════════════════════════════════════════════════════════════════
-- CyberRaksha — Seed: All Simulations Metadata
-- Run with: psql $DATABASE_URL -f database/seeds/001_seed_simulations.sql
-- Or via:   cd backend && npm run seed
--
-- FIX APPLIED: Removed all INSERT INTO simulation_steps / step_choices
-- because those tables do NOT exist and should NOT exist.
-- Simulation content (steps, choices, environments) lives entirely in
-- frontend/src/simulations/simulationsData.js — this file seeds ONLY
-- the metadata rows that the DB legitimately owns.
-- ══════════════════════════════════════════════════════════════════

-- ── SIMULATIONS ──────────────────────────────────────────────────

INSERT INTO simulations (id, title, category, difficulty_level, xp_reward, sim_type) VALUES

  -- Malware & Device Safety
  ('mal-virus-student',        'Computer Virus: USB Autorun',                 'Malware & Device Safety', 'Beginner',     60,  'visual'),
  ('mal-virus-student-email',  'Computer Virus: Email Attachment Trap',       'Malware & Device Safety', 'Beginner',     62,  'visual'),
  ('mal-virus-pro',            'Computer Virus: Office Macro Attack',         'Malware & Device Safety', 'Beginner',     65,  'visual'),
  ('mal-virus-elderly',        'Computer Virus: Forwarded Email Trap',        'Malware & Device Safety', 'Beginner',     55,  'visual'),
  ('mal-trojan-student',       'Trojan Horse: Cracked Game Download',         'Malware & Device Safety', 'Intermediate', 80,  'visual'),
  ('mal-trojan-pro',           'Trojan Horse: Fake IT Security Patch',        'Malware & Device Safety', 'Intermediate', 85,  'visual'),
  ('mal-ransomware-pro',       'Ransomware: Office File Encryption',          'Malware & Device Safety', 'Advanced',     100, 'visual'),
  ('mal-ransomware-elderly',   'Ransomware: Phone Locked by Fake Police',     'Malware & Device Safety', 'Advanced',     90,  'visual'),
  ('mal-adware-student',       'Adware & PUP: Browser Hijack',                'Malware & Device Safety', 'Beginner',     55,  'visual'),
  ('mal-adware-elderly',       'Adware: Fake App from Outside Play Store',    'Malware & Device Safety', 'Beginner',     55,  'visual'),

  -- Identity & Impersonation
  ('ii-s-1',                   'Fake College Admin Account',                  'Identity & Impersonation', 'Beginner',     50,  'visual'),
  ('ii-s-2',                   'WhatsApp Classmate Impersonation',            'Identity & Impersonation', 'Intermediate', 70,  'visual'),
  ('ii-s-3',                   'Aadhaar Identity Theft',                      'Identity & Impersonation', 'Advanced',     100, 'visual'),
  ('ii-p-1',                   'LinkedIn Profile Cloning',                    'Identity & Impersonation', 'Beginner',     60,  'visual'),
  ('ii-p-3',                   'Deep Fake Voice Call',                        'Identity & Impersonation', 'Advanced',     100, 'visual'),
  ('ii-authority-1',           'Authority Impersonation Scam',                'Identity & Impersonation', 'Intermediate', 85,  'visual'),
  ('ii-relative-emergency-1',  'Relative Emergency Scam',                     'Identity & Impersonation', 'Beginner',     60,  'visual'),
  ('ii-fake-medical-1',        'Fake Medical Assistance Scam',                'Identity & Impersonation', 'Intermediate', 80,  'visual'),
  ('ii-urgency-pressure-1',    'Urgency Pressure Attack',                     'Identity & Impersonation', 'Advanced',     100, 'visual'),

  -- Online Commerce Safety
  ('oc-e-1',                   'Fake Online Medical Store',                   'Online Commerce Safety',   'Beginner',     50,  'visual'),
  ('oc-ecommerce-1',           'Fake E-commerce Scam',                        'Online Commerce Safety',   'Beginner',     60,  'visual'),
  ('oc-courier-1',             'Courier Delivery Scam',                       'Online Commerce Safety',   'Beginner',     55,  'visual'),
  ('oc-techsupport-1',         'Fake Tech Support Scam',                      'Online Commerce Safety',   'Intermediate', 75,  'visual'),
  ('oc-gaming-1',              'Gaming Account Scam',                         'Online Commerce Safety',   'Beginner',     50,  'visual'),

  -- Financial Security
  ('fs-v-kyc-1',               'Bank KYC Update Scam',                        'Financial Security',       'Beginner',     70,  'visual'),
  ('fs-v-otp-1',               'OTP Sharing Fraud',                           'Financial Security',       'Beginner',     70,  'visual'),
  ('fs-v-lottery-1',           'Lottery / Prize Scam',                        'Financial Security',       'Beginner',     70,  'visual'),
  ('fs-v-pension-1',           'Pension / Government Benefits Scam',          'Financial Security',       'Beginner',     70,  'visual'),
  ('fs-v-invest-1',            'Investment / Trading Scam',                   'Financial Security',       'Advanced',     100, 'visual'),

  -- Career, Education & Opportunity
  ('ceo-v-job-1',              'Fake Job Offer Scam',                         'Career, Education & Opportunity', 'Intermediate', 85, 'visual'),
  ('ceo-v-scholarship-1',      'Scholarship Scam',                            'Career, Education & Opportunity', 'Beginner',     70, 'visual'),
  ('ceo-v-exam-phone-1',       'Exam Result Phishing (Phone)',                'Career, Education & Opportunity', 'Beginner',     70, 'visual'),
  ('ceo-v-exam-desktop-1',     'Exam Result Phishing (Desktop)',              'Career, Education & Opportunity', 'Beginner',     70, 'visual'),
  ('ceo-v-giveaway-1',         'Giveaway / Influencer Scam',                  'Career, Education & Opportunity', 'Beginner',     70, 'visual')

ON CONFLICT (id) DO UPDATE SET
  title            = EXCLUDED.title,
  category         = EXCLUDED.category,
  difficulty_level = EXCLUDED.difficulty_level,
  xp_reward        = EXCLUDED.xp_reward,
  sim_type         = EXCLUDED.sim_type;


-- ── QUIZZES — one row per simulation that has a quiz ─────────────
-- pass_mark and xp_reward come from quizData.js

INSERT INTO quizzes (simulation_id, pass_mark, xp_reward) VALUES
  ('ii-s-1',                  60, 30),
  ('ii-s-2',                  60, 40),
  ('ii-s-3',                  60, 60),
  ('ii-p-1',                  60, 40),
  ('ii-p-3',                  60, 60),
  ('ii-authority-1',          60, 50),
  ('ii-relative-emergency-1', 60, 30),
  ('ii-fake-medical-1',       60, 50),
  ('ii-urgency-pressure-1',   60, 60),
  ('oc-e-1',                  60, 35),
  ('oc-ecommerce-1',          60, 40),
  ('oc-courier-1',            60, 35),
  ('oc-techsupport-1',        60, 50),
  ('oc-gaming-1',             60, 35),
  ('mal-virus-student',       60, 30),
  ('mal-virus-student-email', 60, 30),
  ('mal-virus-pro',           60, 30),
  ('mal-virus-elderly',       60, 30),
  ('mal-trojan-student',      60, 40),
  ('mal-trojan-pro',          60, 40),
  ('mal-ransomware-pro',      60, 60),
  ('mal-ransomware-elderly',  60, 60),
  ('mal-adware-student',      60, 30),
  ('mal-adware-elderly',      60, 30),
  ('fs-v-kyc-1',              60, 30),
  ('fs-v-otp-1',              60, 30),
  ('fs-v-lottery-1',          60, 30),
  ('fs-v-pension-1',          60, 30),
  ('fs-v-invest-1',           60, 50),
  ('ceo-v-job-1',             60, 40),
  ('ceo-v-scholarship-1',     60, 30),
  ('ceo-v-exam-phone-1',      60, 30),
  ('ceo-v-exam-desktop-1',    60, 30),
  ('ceo-v-giveaway-1',        60, 30)
ON CONFLICT (simulation_id) DO UPDATE SET
  pass_mark  = EXCLUDED.pass_mark,
  xp_reward  = EXCLUDED.xp_reward;
