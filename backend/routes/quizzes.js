const express = require('express');
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const quizRouter = express.Router();
const progressRouter = express.Router();

// ── QUIZ ──
quizRouter.get('/:simulation_id', authenticateToken, async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM quiz_questions WHERE simulation_id=$1 ORDER BY RANDOM() LIMIT 5',
    [req.params.simulation_id]
  );
  res.json(result.rows);
});

quizRouter.post('/:simulation_id/submit', authenticateToken, async (req, res) => {
  const { answers } = req.body; // [{ question_id, selected_option }]
  let score = 0;
  for (const a of answers) {
    const q = await pool.query('SELECT correct_option, points FROM quiz_questions WHERE id=$1', [a.question_id]);
    if (q.rows[0]?.correct_option === a.selected_option) score += q.rows[0].points;
  }
  await pool.query('UPDATE users SET total_points=total_points+$1 WHERE id=$2', [score, req.user.id]);
  res.json({ score, message: `You earned ${score} points!` });
});

// ── PROGRESS ──
progressRouter.get('/', authenticateToken, async (req, res) => {
  const result = await pool.query(
    `SELECT up.*, s.title, s.category FROM user_progress up
     JOIN simulations s ON up.simulation_id=s.id
     WHERE up.user_id=$1 ORDER BY up.updated_at DESC`,
    [req.user.id]
  );
  res.json(result.rows);
});

progressRouter.post('/complete', authenticateToken, async (req, res) => {
  const { simulation_id, points_earned } = req.body;
  await pool.query(
    `INSERT INTO user_progress (user_id, simulation_id, status, points_earned)
     VALUES ($1,$2,'completed',$3)
     ON CONFLICT (user_id, simulation_id) DO UPDATE SET status='completed', points_earned=$3, updated_at=NOW()`,
    [req.user.id, simulation_id, points_earned]
  );
  await pool.query('UPDATE users SET total_points=total_points+$1 WHERE id=$2', [points_earned, req.user.id]);
  res.json({ success: true });
});

module.exports = { quizRouter, progressRouter };
