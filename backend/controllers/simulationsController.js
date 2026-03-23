/**
 * controllers/simulationsController.js
 *
 * Column name aliasing — the DB uses snake_case names that differ from
 * the JS object fields in simulationsData.js:
 *
 *   DB column         →  JS field (used in all frontend consumers)
 *   difficulty_level  →  difficulty
 *   xp_reward         →  xp
 *   sim_type          →  type
 *
 * Aliasing here means SimulationPlayerPage, LearnPage, and QuizPage
 * receive { title, category, difficulty, xp, type } — the exact same
 * shape they already read from the JS object — so those files need
 * zero changes beyond the useEffect fetch.
 */

const pool = require('../config/db');

const SELECT_FIELDS = `
  id,
  title,
  category,
  difficulty_level  AS difficulty,
  xp_reward         AS xp,
  sim_type          AS type,
  description
`;

// GET /api/simulations
// Optional query params: ?category=X&difficulty=Y
async function getSimulations(req, res) {
  const { category, difficulty } = req.query;

  try {
    let query  = `SELECT ${SELECT_FIELDS} FROM simulations WHERE 1=1`;
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (difficulty) {
      params.push(difficulty);
      query += ` AND difficulty_level = $${params.length}`;
    }

    query += ' ORDER BY category, difficulty_level, title';

    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (err) {
    console.error('GET /simulations error:', err);
    return res.status(500).json({ error: 'Failed to fetch simulations' });
  }
}

// GET /api/simulations/:id
async function getSimulationById(req, res) {
  try {
    const result = await pool.query(
      `SELECT ${SELECT_FIELDS} FROM simulations WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Simulation not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /simulations/:id error:', err);
    return res.status(500).json({ error: 'Failed to fetch simulation' });
  }
}

module.exports = { getSimulations, getSimulationById };
