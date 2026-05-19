/**
 * controllers/catalogueController.js
 *
 * GET /api/catalogue/:categoryRoute/:ageGroup
 *
 * Returns the ordered list of simulation cards for a given
 * category + age group — exactly what SimulationCategoryPage
 * previously read from the hardcoded SIMULATIONS JS object.
 *
 * Response shape matches what the frontend already expects:
 * [
 *   {
 *     id, level, difficulty, title, desc,
 *     duration, objectives, badge
 *   },
 *   ...
 * ]
 */

const pool = require('../config/db');

async function getCatalogue(req, res) {
  const { categoryRoute, ageGroup } = req.params;

  const validAgeGroups = ['student', 'professional', 'elderly'];
  if (!validAgeGroups.includes(ageGroup)) {
    return res.status(400).json({ error: 'Invalid age_group. Must be student, professional, or elderly.' });
  }

  try {
    const result = await pool.query(
      `SELECT
         s.id,
         sc.level_order   AS level,
         -- difficulty comes from simulations table, lowercased to match JS object
         LOWER(s.difficulty_level) AS difficulty,
         s.title,
         COALESCE(s.card_desc, '')  AS desc,
         sc.duration,
         COALESCE(s.objectives, ARRAY[]::TEXT[])    AS objectives,
         sc.badge
       FROM simulation_catalogue sc
       JOIN simulations s ON s.id = sc.simulation_id
       WHERE sc.category_route = $1
         AND sc.age_group      = $2
       ORDER BY sc.level_order ASC`,
      [categoryRoute, ageGroup]
    );

    return res.json(result.rows);
  } catch (err) {
    console.error('GET /catalogue error:', err);
    return res.status(500).json({ error: 'Failed to fetch simulation catalogue' });
  }
}

module.exports = { getCatalogue };
