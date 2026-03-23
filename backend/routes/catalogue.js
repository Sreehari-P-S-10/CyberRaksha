/**
 * routes/catalogue.js
 * GET /api/catalogue/:categoryRoute/:ageGroup
 */

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getCatalogue } = require('../controllers/catalogueController');

const router = express.Router();

router.get('/:categoryRoute/:ageGroup', authenticateToken, getCatalogue);

module.exports = router;
