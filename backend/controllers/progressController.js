/**
 * controllers/progressController.js
 * Handles all user progress endpoints.
 *
 * GET  /api/progress             — all progress records for logged-in user
 * POST /api/progress/complete    — mark a simulation as completed, award XP
 * GET  /api/progress/stats       — aggregated stats (total XP, completed count, etc.)
 */

const pool = require('../config/db');

// GET /api/progress
async function getProgress(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, simulation_id, simulation_title, simulation_category,
              status, points_earned, completed_at, updated_at
       FROM user_progress
       WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [req.user.id]
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /progress error:', err);
    return res.status(500).json({ error: 'Failed to fetch progress' });
  }
}

// POST /api/progress/complete
// Body: { simulation_id, simulation_title, simulation_category, points_earned }
async function completeSimulation(req, res) {
  const {
    simulation_id,
    simulation_title,
    simulation_category,
    points_earned = 0,
  } = req.body;

  if (!simulation_id) {
    return res.status(400).json({ error: 'simulation_id is required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Check existing record
    const existing = await client.query(
      `SELECT id, status FROM user_progress
       WHERE user_id = $1 AND simulation_id = $2`,
      [req.user.id, simulation_id]
    );

    const alreadyCompleted = existing.rows[0]?.status === 'completed';

    if (existing.rows.length === 0) {
      // First attempt — insert and award XP
      await client.query(
        `INSERT INTO user_progress
           (user_id, simulation_id, simulation_title, simulation_category,
            status, points_earned, completed_at, updated_at)
         VALUES ($1, $2, $3, $4, 'completed', $5, NOW(), NOW())`,
        [req.user.id, simulation_id, simulation_title, simulation_category, points_earned]
      );
      if (points_earned > 0) {
        await client.query(
          'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
          [points_earned, req.user.id]
        );
      }
    } else if (!alreadyCompleted) {
      // Was in_progress — complete it and award XP
      await client.query(
        `UPDATE user_progress
         SET status = 'completed', points_earned = $1,
             simulation_title = $2, simulation_category = $3,
             completed_at = NOW(), updated_at = NOW()
         WHERE user_id = $4 AND simulation_id = $5`,
        [points_earned, simulation_title, simulation_category, req.user.id, simulation_id]
      );
      if (points_earned > 0) {
        await client.query(
          'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
          [points_earned, req.user.id]
        );
      }
    } else {
      // Replay — update metadata, no extra XP
      await client.query(
        `UPDATE user_progress
         SET points_earned = $1, simulation_title = $2,
             simulation_category = $3, updated_at = NOW()
         WHERE user_id = $4 AND simulation_id = $5`,
        [points_earned, simulation_title, simulation_category, req.user.id, simulation_id]
      );
    }

    await client.query('COMMIT');

    const userResult = await pool.query(
      'SELECT total_points FROM users WHERE id = $1',
      [req.user.id]
    );

    return res.json({
      success:          true,
      xp_awarded:       alreadyCompleted ? 0 : points_earned,
      first_completion: !alreadyCompleted,
      total_points:     userResult.rows[0]?.total_points ?? 0,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('POST /progress/complete error:', err);
    return res.status(500).json({ error: 'Failed to save progress' });
  } finally {
    client.release();
  }
}

// GET /api/progress/stats
// Returns aggregated stats used by Dashboard & user profile
async function getStats(req, res) {
  try {
    const statsResult = await pool.query(
      `SELECT
         COUNT(*)                                                    AS total_attempted,
         COUNT(*) FILTER (WHERE status = 'completed')               AS total_completed,
         COALESCE(SUM(points_earned) FILTER (WHERE status = 'completed'), 0) AS total_xp_from_sims
       FROM user_progress
       WHERE user_id = $1`,
      [req.user.id]
    );

    const userResult = await pool.query(
      'SELECT total_points, expertise_level FROM users WHERE id = $1',
      [req.user.id]
    );

    const stats = statsResult.rows[0];
    const user  = userResult.rows[0];

    return res.json({
      total_attempted:    parseInt(stats.total_attempted, 10),
      total_completed:    parseInt(stats.total_completed, 10),
      total_xp_from_sims: parseInt(stats.total_xp_from_sims, 10),
      total_points:       user?.total_points ?? 0,
      expertise_level:    user?.expertise_level ?? 'beginner',
    });
  } catch (err) {
    console.error('GET /progress/stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

module.exports = { getProgress, completeSimulation, getStats };
