/**
 * server.js — CyberRaksha API entry point
 */

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes        = require('./routes/auth');
const userRoutes        = require('./routes/users');
const simulationRoutes  = require('./routes/simulations');
const quizRoutes        = require('./routes/quizzes');
const progressRoutes    = require('./routes/progress');
const catalogueRoutes   = require('./routes/catalogue');

const app = express();

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/simulations', simulationRoutes);
app.use('/api/quizzes',     quizRoutes);
app.use('/api/progress',    progressRoutes);
app.use('/api/catalogue',   catalogueRoutes);

// ── Health check ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'CyberRaksha API running' }));

// ── Global error handler ─────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🛡️  CyberRaksha API running on port ${PORT}`));
