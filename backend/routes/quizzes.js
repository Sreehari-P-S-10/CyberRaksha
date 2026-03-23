/**
 * routes/quizzes.js
 * GET  /api/quizzes/:simulationId          — fetch quiz + questions
 * POST /api/quizzes/:simulationId/submit   — submit attempt, award XP
 */

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getQuiz, submitQuiz } = require('../controllers/quizzesController');

const router = express.Router();

router.get('/:simulationId',          authenticateToken, getQuiz);
router.post('/:simulationId/submit',  authenticateToken, submitQuiz);

module.exports = router;
