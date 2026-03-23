/**
 * controllers/quizzesController.js
 * Handles all quiz-related endpoints.
 *
 * GET  /api/quizzes/:simulationId          — fetch quiz + questions for a sim
 * POST /api/quizzes/:simulationId/submit   — save attempt, award XP
 */

const pool = require('../config/db');

// GET /api/quizzes/:simulationId
async function getQuiz(req, res) {
  const { simulationId } = req.params;

  try {
    // Fetch quiz metadata
    const quizResult = await pool.query(
      'SELECT id, simulation_id, pass_mark, xp_reward FROM quizzes WHERE simulation_id = $1',
      [simulationId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found for this simulation' });
    }

    const quiz = quizResult.rows[0];

    // Fetch questions in order
    const questionsResult = await pool.query(
      `SELECT id, question_order, question_text,
              option_a, option_b, option_c, option_d,
              correct_option, explanation
       FROM quiz_questions
       WHERE quiz_id = $1
       ORDER BY question_order`,
      [quiz.id]
    );

    // Shape the response to match the quizData.js structure the frontend expects:
    // { simId, passMark, xp, questions: [{ id, question, options, correctId, explanation }] }
    const questions = questionsResult.rows.map((q) => ({
      id: `q${q.id}`,
      question:    q.question_text,
      options: [
        { id: 'a', text: q.option_a },
        { id: 'b', text: q.option_b },
        { id: 'c', text: q.option_c },
        { id: 'd', text: q.option_d },
      ],
      correctId:   q.correct_option,
      explanation: q.explanation,
      // Keep DB id for submit endpoint validation
      // _dbId:       q.id,
    }));

    return res.json({
      simId:     simulationId,
      passMark:  quiz.pass_mark,
      xp:        quiz.xp_reward,
      questions,
    });
  } catch (err) {
    console.error('GET /quizzes/:simulationId error:', err);
    return res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}

// POST /api/quizzes/:simulationId/submit
// Body: { xp_earned: number }   ← quiz XP calculated on client (matches existing behaviour)
// OR   { score_pct, correct_count, total_questions, passed }  ← full stats for logging
async function submitQuiz(req, res) {
  const { simulationId } = req.params;
  const userId = req.user.id;
  const {
    xp_earned = 0,
    score_pct = 0,
    correct_count = 0,
    total_questions = 0,
    passed = false,
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Log the attempt
    await client.query(
      `INSERT INTO user_quiz_attempts
         (user_id, simulation_id, score_pct, correct_count, total_questions, xp_earned, passed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, simulationId, score_pct, correct_count, total_questions, xp_earned, passed]
    );

    // 2. Award XP if earned
    if (xp_earned > 0) {
      await client.query(
        'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
        [xp_earned, userId]
      );
    }

    await client.query('COMMIT');

    // 3. Return updated total
    const userResult = await pool.query(
      'SELECT total_points FROM users WHERE id = $1',
      [userId]
    );

    return res.json({
      success:      true,
      xp_awarded:   xp_earned,
      total_points: userResult.rows[0]?.total_points ?? 0,
      message:      xp_earned > 0 ? `+${xp_earned} XP awarded` : 'Quiz attempt recorded',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('POST /quizzes/:simulationId/submit error:', err);
    return res.status(500).json({ error: 'Failed to submit quiz' });
  } finally {
    client.release();
  }
}

module.exports = { getQuiz, submitQuiz };
