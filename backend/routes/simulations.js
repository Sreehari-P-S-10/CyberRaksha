const express = require('express');
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// GET /api/simulations — list all (filtered by category)
router.get('/', authenticateToken, async (req, res) => {
  const { category, level } = req.query;
  let query = 'SELECT id, title, category, difficulty_level, description, thumbnail_url FROM simulations WHERE 1=1';
  const params = [];
  if (category) { params.push(category); query += ` AND category=$${params.length}`; }
  if (level)    { params.push(level);    query += ` AND difficulty_level=$${params.length}`; }
  query += ' ORDER BY created_at DESC';
  const result = await pool.query(query, params);
  res.json(result.rows);
});

// GET /api/simulations/:id — full scenario with steps
router.get('/:id', authenticateToken, async (req, res) => {
  const sim = await pool.query('SELECT * FROM simulations WHERE id=$1', [req.params.id]);
  if (sim.rows.length === 0) return res.status(404).json({ error: 'Simulation not found' });
  const steps = await pool.query('SELECT * FROM simulation_steps WHERE simulation_id=$1 ORDER BY step_order', [req.params.id]);
  res.json({ ...sim.rows[0], steps: steps.rows });
});

// POST /api/simulations/:id/evaluate — evaluate a user decision
router.post('/:id/evaluate', authenticateToken, async (req, res) => {
  const { step_id, choice_id } = req.body;
  const choice = await pool.query('SELECT * FROM step_choices WHERE id=$1 AND step_id=$2', [choice_id, step_id]);
  if (choice.rows.length === 0) return res.status(400).json({ error: 'Invalid choice' });
  const c = choice.rows[0];
  res.json({
    is_correct: c.is_correct,
    consequence: c.consequence_text,
    explanation: c.explanation,
    prevention: c.prevention_tip,
    points_awarded: c.is_correct ? c.points : 0,
    next_step_id: c.next_step_id,
  });
});

module.exports = router;
