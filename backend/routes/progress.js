/**
 * routes/progress.js
 * GET  /api/progress          — all progress records for logged-in user
 * POST /api/progress/complete — mark simulation completed, award XP
 * GET  /api/progress/stats    — aggregated stats for dashboard
 */

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getProgress, completeSimulation, getStats } = require('../controllers/progressController');

const router = express.Router();

router.get('/',          authenticateToken, getProgress);
router.get('/stats',     authenticateToken, getStats);
router.post('/complete', authenticateToken, completeSimulation);

module.exports = router;
