/**
 * routes/simulations.js
 * GET /api/simulations        — list all simulations (filterable)
 * GET /api/simulations/:id    — single simulation metadata
 */

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getSimulations, getSimulationById } = require('../controllers/simulationsController');

const router = express.Router();

router.get('/',    authenticateToken, getSimulations);
router.get('/:id', authenticateToken, getSimulationById);

module.exports = router;
