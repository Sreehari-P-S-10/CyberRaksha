const express = require('express');
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// GET /api/users/me — current user profile
router.get('/me', authenticateToken, async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, age_category, expertise_level, total_points, created_at FROM users WHERE id=$1',
    [req.user.id]
  );
  res.json(result.rows[0]);
});

// PATCH /api/users/me — update profile
router.patch('/me', authenticateToken, async (req, res) => {
  const { name, age_category, expertise_level } = req.body;
  const result = await pool.query(
    'UPDATE users SET name=$1, age_category=$2, expertise_level=$3 WHERE id=$4 RETURNING id, name, email, age_category, expertise_level',
    [name, age_category, expertise_level, req.user.id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
