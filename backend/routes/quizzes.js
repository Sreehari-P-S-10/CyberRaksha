const express = require('express');
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const quizRouter    = express.Router();
const progressRouter = express.Router();

/* ════════════════════════════════════════════════════════
   QUIZ ROUTES
════════════════════════════════════════════════════════ */

// GET /api/quizzes/:simulation_id — fetch questions for a sim
// (quiz content lives in frontend quizData.js — this route is here
//  for future migration of quiz data to the DB)
quizRouter.get('/:simulation_id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM quiz_questions WHERE simulation_id=$1 ORDER BY RANDOM() LIMIT 5',
      [req.params.simulation_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /quizzes error:', err);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

// POST /api/quizzes/:simulation_id/submit — record quiz score
// answers = [{ question_id, selected_option }]
quizRouter.post('/:simulation_id/submit', authenticateToken, async (req, res) => {
  const { answers, xp_earned } = req.body;

  // If frontend sends xp_earned directly (quiz XP is calculated client-side
  // from quizData.js), just award that. Otherwise fall through to DB calc.
  if (typeof xp_earned === 'number' && xp_earned >= 0) {
    try {
      await pool.query(
        'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
        [xp_earned, req.user.id]
      );
      return res.json({ xp_awarded: xp_earned, message: `+${xp_earned} XP awarded` });
    } catch (err) {
      console.error('Quiz XP update error:', err);
      return res.status(500).json({ error: 'Failed to award quiz XP' });
    }
  }

  // Fallback: calculate from DB quiz_questions if answers array is provided
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Provide either xp_earned or answers array' });
  }

  try {
    let score = 0;
    for (const a of answers) {
      const q = await pool.query(
        'SELECT correct_option, points FROM quiz_questions WHERE id=$1',
        [a.question_id]
      );
      if (q.rows[0]?.correct_option === a.selected_option) {
        score += q.rows[0].points;
      }
    }
    await pool.query(
      'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
      [score, req.user.id]
    );
    res.json({ xp_awarded: score, message: `+${score} XP awarded` });
  } catch (err) {
    console.error('Quiz submit error:', err);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

/* ════════════════════════════════════════════════════════
   PROGRESS ROUTES
════════════════════════════════════════════════════════ */

// GET /api/progress — all progress records for the logged-in user
progressRouter.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, simulation_id, simulation_title, simulation_category,
              status, points_earned, completed_at, updated_at
       FROM user_progress
       WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /progress error:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/progress/complete — mark a simulation as completed
// Body: { simulation_id, simulation_title, simulation_category, points_earned }
progressRouter.post('/complete', authenticateToken, async (req, res) => {
  const { simulation_id, simulation_title, simulation_category, points_earned = 0 } = req.body;

  if (!simulation_id) {
    return res.status(400).json({ error: 'simulation_id is required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Check if this sim was already completed by this user
    const existing = await client.query(
      `SELECT id, status FROM user_progress
       WHERE user_id = $1 AND simulation_id = $2`,
      [req.user.id, simulation_id]
    );

    const alreadyCompleted = existing.rows[0]?.status === 'completed';

    if (existing.rows.length === 0) {
      // First time — insert and award XP
      await client.query(
        `INSERT INTO user_progress
           (user_id, simulation_id, simulation_title, simulation_category,
            status, points_earned, completed_at, updated_at)
         VALUES ($1, $2, $3, $4, 'completed', $5, NOW(), NOW())`,
        [req.user.id, simulation_id, simulation_title, simulation_category, points_earned]
      );
      // Award XP only on first completion
      await client.query(
        'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
        [points_earned, req.user.id]
      );
    } else if (!alreadyCompleted) {
      // Was in_progress — update to completed and award XP
      await client.query(
        `UPDATE user_progress
         SET status = 'completed', points_earned = $1,
             simulation_title = $2, simulation_category = $3,
             completed_at = NOW(), updated_at = NOW()
         WHERE user_id = $4 AND simulation_id = $5`,
        [points_earned, simulation_title, simulation_category, req.user.id, simulation_id]
      );
      await client.query(
        'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
        [points_earned, req.user.id]
      );
    } else {
      // Already completed — just update the record, no XP added again
      await client.query(
        `UPDATE user_progress
         SET points_earned = $1, simulation_title = $2,
             simulation_category = $3, updated_at = NOW()
         WHERE user_id = $4 AND simulation_id = $5`,
        [points_earned, simulation_title, simulation_category, req.user.id, simulation_id]
      );
    }

    await client.query('COMMIT');

    // Return updated user points
    const userResult = await pool.query(
      'SELECT total_points FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({
      success: true,
      xp_awarded: alreadyCompleted ? 0 : points_earned,
      first_completion: !alreadyCompleted,
      total_points: userResult.rows[0]?.total_points,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('POST /progress/complete error:', err);
    res.status(500).json({ error: 'Failed to save progress' });
  } finally {
    client.release();
  }
});

module.exports = { quizRouter, progressRouter };
