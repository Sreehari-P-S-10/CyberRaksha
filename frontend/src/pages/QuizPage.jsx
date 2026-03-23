/**
 * QuizPage.jsx
 * ─────────────────────────────────────────────────────────────────
 * Quiz page for a simulation module.
 * CHANGED: Questions now fetched from GET /api/quizzes/:simId
 *          instead of the hardcoded quizData.js file.
 * UI structure is completely unchanged.
 *
 * Route: /quiz/:simId
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import s from './QuizPage.module.css'
import { CATEGORY_ROUTE_MAP, DIFF_COLORS } from '../simulations/simulationsData.js'
import { useSimulation } from '../hooks/useSimulation.js'
import { api } from '../utils/api.js'

/* ─── SVG Icons ─── */
const paths = {
  shield:      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  arrowLeft:   <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  xCircle:     <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
  award:       <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  zap:         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  rotCcw:      <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.65"/></>,
  alertTri:    <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  bookOpen:    <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
}

function Icon({ name, size = 18, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ── Option letter labels ── */
const LETTERS = ['A', 'B', 'C', 'D', 'E']

export default function QuizPage() {
  const { simId }  = useParams()
  const navigate   = useNavigate()

  // metadata from DB, steps not needed (quiz doesn't use sim.steps)
  const { sim } = useSimulation(simId)
  const categoryId = sim ? CATEGORY_ROUTE_MAP[sim.category] : null

  /* ── API state (replaces quizData.js import) ── */
  const [quiz,       setQuiz]       = useState(null)   // { simId, passMark, xp, questions }
  const [quizLoading, setQuizLoading] = useState(true)
  const [quizError,  setQuizError]  = useState(null)

  useEffect(() => {
    if (!simId) return
    setQuizLoading(true)
    setQuizError(null)

    api.get(`/quizzes/${simId}`)
      .then(async (res) => {
        if (!res) return   // api.js handles 401/403 redirect
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err.error || `HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setQuiz(data)
      })
      .catch((err) => {
        console.error('Quiz fetch error:', err)
        setQuizError(err.message || 'Failed to load quiz')
      })
      .finally(() => setQuizLoading(false))
  }, [simId])

  /* Quiz state */
  const [questionIdx, setQuestionIdx] = useState(0)
  const [selectedId,  setSelectedId]  = useState(null)
  const [answered,    setAnswered]     = useState(false)
  const [results,     setResults]      = useState([])
  const [complete,    setComplete]     = useState(false)

  /* ── Loading screen ── */
  if (quizLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)', fontFamily: 'var(--sans)', color: 'var(--text-2)' }}>
        Loading quiz…
      </div>
    )
  }

  /* ── Error / not found screen ── */
  if (quizError || !sim || !quiz) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: 'var(--sans)', color: 'var(--text-2)', background: 'var(--ink)' }}>
        <Icon name="alertTri" size={32} color="var(--text-3)" />
        <p>{quizError || 'Quiz not found for this module.'}</p>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 6, border: '1px solid var(--border-lt)', color: 'var(--text-2)', fontSize: 13, fontFamily: 'var(--sans)', background: 'none', cursor: 'pointer' }}>
          <Icon name="arrowLeft" size={14} /> Go back
        </button>
      </div>
    )
  }

  const questions   = quiz.questions
  const currentQ    = questions[questionIdx]
  const totalQ      = questions.length
  const progressPct = Math.round(((answered ? questionIdx + 1 : questionIdx) / totalQ) * 100)

  /* ── Derived results stats ── */
  const correctCount  = results.filter(r => r.isCorrect).length
  const totalAnswered = results.length
  const scorePct      = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0
  const passed        = scorePct >= quiz.passMark
  const xpEarned      = passed ? quiz.xp : Math.round(quiz.xp * (scorePct / 100))

  const grade =
    scorePct === 100 ? { label: 'Perfect',   color: '#2EB87A', icon: 'award'      } :
    scorePct >= 60   ? { label: 'Passed',    color: '#D4891A', icon: 'checkCircle' } :
                       { label: 'Try again', color: '#C94E4E', icon: 'alertTri'   }

  /* ── Handlers ── */
  function handleSelect(optId) {
    if (answered) return
    const isCorrect = optId === currentQ.correctId
    setSelectedId(optId)
    setAnswered(true)
    setResults(prev => [...prev, { questionId: currentQ.id, selectedId: optId, isCorrect }])
  }

  function handleNext() {
    if (questionIdx < totalQ - 1) {
      setQuestionIdx(i => i + 1)
      setSelectedId(null)
      setAnswered(false)
    } else {
      const finalCorrect = results.filter(r => r.isCorrect).length
      const finalPct     = totalQ > 0 ? Math.round((finalCorrect / totalQ) * 100) : 0
      const finalXp      = finalPct >= quiz.passMark ? quiz.xp : Math.round(quiz.xp * (finalPct / 100))
      const finalPassed  = finalPct >= quiz.passMark
      api.post(`/quizzes/${simId}/submit`, {
        xp_earned:       finalXp,
        score_pct:       finalPct,
        correct_count:   finalCorrect,
        total_questions: totalQ,
        passed:          finalPassed,
      }).catch(err => console.warn('Quiz XP save failed (non-fatal):', err))
      setComplete(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleRetake() {
    setQuestionIdx(0)
    setSelectedId(null)
    setAnswered(false)
    setResults([])
    setComplete(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── Topbar (shared) ── */
  function Topbar({ showBack = false }) {
    return (
      <header className={s.topbar}>
        <div className={s.topbarWrap}>
          <Link to="/" className={s.topbarLogo}>
            <div className={s.logoMark}>
              <Icon name="shield" size={14} color="#D4891A" w={2.2} />
            </div>
            <span>Cyber<strong>Raksha</strong></span>
          </Link>
          {showBack && (
            <button onClick={() => navigate(`/learn/${simId}`)} className={s.topbarBack}>
              <Icon name="arrowLeft" size={14} color="var(--text-3)" />
              Back to Learn
            </button>
          )}
        </div>
      </header>
    )
  }

  /* ══════════════════════════════════════════════════════
     RESULTS SCREEN
  ══════════════════════════════════════════════════════ */
  if (complete) {
    return (
      <div className={s.root}>
        <div className={s.noiseBg} aria-hidden />
        <Topbar />
        <div className={s.results}>
          <div className={s.resultsCard}>

            {/* Grade ring */}
            <div className={s.gradeWrap}>
              <div className={s.gradeRing} style={{ borderColor: grade.color + '44' }}>
                <div className={s.gradeInner} style={{ color: grade.color }}>
                  <Icon name={grade.icon} size={28} color={grade.color} w={1.5} />
                  <span className={s.gradeLabel} style={{ color: grade.color }}>{grade.label}</span>
                </div>
              </div>
            </div>

            <h2 className={s.resultsTitle}>Quiz complete</h2>
            <p className={s.resultsSimName}>{sim.title}</p>

            {/* Score row */}
            <div className={s.scoreRow}>
              <div className={s.scoreItem}>
                <span className={s.scoreNum} style={{ color: grade.color }}>{scorePct}%</span>
                <span className={s.scoreDesc}>Score</span>
              </div>
              <div className={s.scoreDivider} />
              <div className={s.scoreItem}>
                <span className={s.scoreNum}>
                  {correctCount}
                  <span style={{ fontSize: 16, color: 'var(--text-3)' }}>/{totalQ}</span>
                </span>
                <span className={s.scoreDesc}>Correct</span>
              </div>
              <div className={s.scoreDivider} />
              <div className={s.scoreItem}>
                <span className={s.scoreNum} style={{ color: '#D4891A' }}>+{xpEarned}</span>
                <span className={s.scoreDesc}>XP earned</span>
              </div>
            </div>

            {/* Pass / fail message */}
            <div className={`${s.passBanner} ${passed ? s.passBannerOk : s.passBannerBad}`}>
              <Icon
                name={passed ? 'checkCircle' : 'alertTri'}
                size={16}
                color={passed ? 'var(--ok)' : 'var(--bad)'}
                w={2}
              />
              {passed
                ? `You passed with ${scorePct}%. Quiz XP has been added to your profile.`
                : `You scored ${scorePct}%. The pass mark is ${quiz.passMark}%. Review the learn page and try again.`
              }
            </div>

            {/* Per-question review */}
            <div className={s.answerReview}>
              <h3 className={s.answerReviewTitle}>Your answers</h3>
              {results.map((r, i) => {
                const q      = questions.find(q => q.id === r.questionId)
                const chosen = q.options.find(o => o.id === r.selectedId)
                return (
                  <div key={i} className={`${s.answerItem} ${r.isCorrect ? s.answerOk : s.answerBad}`}>
                    <div className={s.answerIcon}>
                      <Icon
                        name={r.isCorrect ? 'checkCircle' : 'xCircle'}
                        size={15}
                        color={r.isCorrect ? 'var(--ok)' : 'var(--bad)'}
                        w={2}
                      />
                    </div>
                    <div className={s.answerText}>
                      <span className={s.answerQLabel}>Question {i + 1}</span>
                      <span className={s.answerChoice}>{chosen?.text}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className={s.resultsActions}>
              <button className={s.btnSecondary} onClick={handleRetake}>
                <Icon name="rotCcw" size={14} />
                Retake quiz
              </button>
              <button className={s.btnSecondary} onClick={() => navigate(`/learn/${simId}`)}>
                <Icon name="bookOpen" size={14} />
                Back to Learn
              </button>
              <button className={s.btnPrimary} onClick={() => navigate(`/simulation/${simId}`)}>
                Play Simulation
                <Icon name="arrowRight" size={14} color="var(--ink)" w={2} />
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════════════════════
     QUESTION SCREEN
  ══════════════════════════════════════════════════════ */
  return (
    <div className={s.root}>
      <div className={s.noiseBg} aria-hidden />
      <Topbar showBack />

      <main className={s.main}>
        <div className={s.mainWrap}>

          {/* Progress */}
          <div className={s.progressHeader}>
            <div className={s.progressTop}>
              <span className={s.progressLabel}>{sim.title} — Quiz</span>
              <span className={s.progressCount}>
                {questionIdx + 1} / {totalQ}
              </span>
            </div>
            <div className={s.progressTrack}>
              <div className={s.progressFill} style={{ width: progressPct + '%' }} />
            </div>
          </div>

          {/* Question card */}
          <div className={s.questionCard}>
            <div className={s.questionNum}>Question {questionIdx + 1}</div>
            <div className={s.questionText}>{currentQ.question}</div>

            {/* Options */}
            <div className={s.optionsList}>
              {currentQ.options.map((opt, i) => {
                let cls = s.optionBtn
                if (answered) {
                  if (opt.id === currentQ.correctId)  cls += ' ' + s.optionCorrect
                  else if (opt.id === selectedId)     cls += ' ' + s.optionWrong
                  else                                cls += ' ' + s.optionFaded
                }
                return (
                  <button
                    key={opt.id}
                    className={cls}
                    onClick={() => handleSelect(opt.id)}
                    disabled={answered}
                  >
                    <span className={s.optionLetter}>{LETTERS[i]}</span>
                    <span className={s.optionText}>{opt.text}</span>
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {answered && (
              <div className={`${s.feedback} ${selectedId === currentQ.correctId ? s.feedbackOk : s.feedbackBad}`}>
                <div className={s.feedbackIcon}>
                  <Icon
                    name={selectedId === currentQ.correctId ? 'checkCircle' : 'xCircle'}
                    size={16}
                    color={selectedId === currentQ.correctId ? 'var(--ok)' : 'var(--bad)'}
                    w={2}
                  />
                </div>
                <span>{currentQ.explanation}</span>
              </div>
            )}

            {/* Next button */}
            <div className={s.cardFooter}>
              <button
                className={s.btnNext}
                onClick={handleNext}
                disabled={!answered}
              >
                {questionIdx < totalQ - 1 ? 'Next question' : 'See results'}
                <Icon name="arrowRight" size={14} color="var(--ink)" w={2} />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
