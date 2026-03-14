/**
 * SimulationPlayerPage.jsx
 * Thin page shell. Mounts SimulationEngine.
 * All sim data lives in simulationsData.js.
 * All step/choice/consequence logic lives in SimulationEngine.jsx.
 * To add a new simulation: only simulationsData.js needs editing.
 */

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import s from './SimulationPlayerPage.module.css'
import SimulationEngine from '../simulations/SimulationEngine.jsx'
import { SIMULATIONS, CATEGORY_ROUTE_MAP, DIFF_COLORS } from '../simulations/simulationsData.js'

/* ─── SVG Icons ─── */
const paths = {
  shield:      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  arrowLeft:   <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  xCircle:     <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
  alertTri:    <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  award:       <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  zap:         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  rotCcw:      <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.65"/></>,
  bookOpen:    <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  lock:        <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  info:        <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  user:        <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  logOut:      <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  target:      <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  clock:       <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  shield2:     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  chevRight:   <polyline points="9 18 15 12 9 6"/>,
}

function Icon({ name, size = 18, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   SUMMARY SCREEN
══════════════════════════════════════════════════════════ */
function SummaryScreen({ sim, decisions, onBackToCategory }) {
  const navigate    = useNavigate()
  const totalSteps  = decisions.length || sim.steps.length
  const correctCount = decisions.filter(d => d.isCorrect).length
  const score       = totalSteps > 0 ? Math.round((correctCount / totalSteps) * 100) : 0
  const xpEarned    = Math.round((sim.xp * correctCount) / (totalSteps || 1))

  const grade =
    score === 100 ? { label: 'Perfect', color: '#2EB87A', icon: 'award' } :
    score >= 70   ? { label: 'Good',    color: '#D4891A', icon: 'checkCircle' } :
                    { label: 'Review',  color: '#C94E4E', icon: 'alertTri' }

  return (
    <div className={s.summary}>
      <div className={s.summaryCard}>
        <div className={s.gradeWrap}>
          <div className={s.gradeRing} style={{ borderColor: grade.color + '44' }}>
            <div className={s.gradeInner} style={{ color: grade.color }}>
              <Icon name={grade.icon} size={28} color={grade.color} w={1.5} />
              <span className={s.gradeLabel} style={{ color: grade.color }}>{grade.label}</span>
            </div>
          </div>
        </div>

        <h2 className={s.summaryTitle}>Simulation complete</h2>
        <p className={s.summarySimName}>{sim.title}</p>

        <div className={s.scoreRow}>
          <div className={s.scoreItem}>
            <span className={s.scoreNum} style={{ color: grade.color }}>{score}%</span>
            <span className={s.scoreDesc}>Score</span>
          </div>
          <div className={s.scoreDivider} />
          <div className={s.scoreItem}>
            <span className={s.scoreNum}>
              {correctCount}
              <span style={{ fontSize: 16, color: 'var(--text-3)' }}>/{totalSteps}</span>
            </span>
            <span className={s.scoreDesc}>Correct decisions</span>
          </div>
          <div className={s.scoreDivider} />
          <div className={s.scoreItem}>
            <span className={s.scoreNum} style={{ color: '#D4891A' }}>+{xpEarned}</span>
            <span className={s.scoreDesc}>XP earned</span>
          </div>
        </div>

        <div className={s.decisionReview}>
          <h3 className={s.decisionReviewTitle}>Your decisions</h3>
          {decisions.map((d, i) => (
            <div key={i} className={`${s.decisionItem} ${d.isCorrect ? s.decisionOk : s.decisionBad}`}>
              <div className={s.decisionIcon}>
                <Icon
                  name={d.isCorrect ? 'checkCircle' : 'xCircle'}
                  size={15}
                  color={d.isCorrect ? '#2EB87A' : '#C94E4E'}
                  w={2}
                />
              </div>
              <div className={s.decisionText}>
                <span className={s.decisionStep}>Step {i + 1}</span>
                <span className={s.decisionChoice}>{d.choiceText}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={s.summaryActions}>
          <button className={s.btnBack} onClick={onBackToCategory}>
            <Icon name="arrowLeft" size={14} />
            Back to {sim.category}
          </button>
          <button className={s.btnRetake} onClick={() => navigate(0)}>
            <Icon name="rotCcw" size={14} />
            Retake simulation
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Top bar ─── */
function TopBar({ onBack }) {
  return (
    <header className={s.topbar}>
      <div className={s.topbarWrap}>
        <Link to="/" className={s.topbarLogo}>
          <div className={s.logoMark}>
            <Icon name="shield" size={14} color="#D4891A" w={2.2} />
          </div>
          <span>Cyber<strong>Raksha</strong></span>
        </Link>
        <button onClick={onBack} className={s.topbarBack}>
          <Icon name="arrowLeft" size={14} color="var(--text-3)" />
          Exit simulation
        </button>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function SimulationPlayerPage() {
  const { simId }  = useParams()
  const navigate   = useNavigate()
  const [complete, setComplete]   = useState(false)
  const [decisions, setDecisions] = useState([])

  const sim       = SIMULATIONS[simId]
  const categoryId = sim ? CATEGORY_ROUTE_MAP[sim.category] : null
  const diffColor  = sim ? (DIFF_COLORS[sim.difficulty] || 'var(--amber)') : 'var(--amber)'

  function handleComplete(decs) {
    setDecisions(decs)
    setComplete(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    navigate(`/category/${categoryId}`)
  }

  if (!sim) {
    return (
      <div className={s.notFound}>
        <Icon name="alertTri" size={32} color="var(--text-3)" />
        <p>Simulation not found.</p>
        <button onClick={() => navigate(-1)} className={s.btnBack}>
          <Icon name="arrowLeft" size={14} /> Go back
        </button>
      </div>
    )
  }

  if (complete) {
    return (
      <div className={s.root}>
        <div className={s.noiseBg} aria-hidden />
        <TopBar onBack={handleBack} />
        <SummaryScreen
          sim={sim}
          decisions={decisions}
          onBackToCategory={handleBack}
        />
      </div>
    )
  }

  return (
    <div className={s.root}>
      <div className={s.noiseBg} aria-hidden />
      <div className={s.ambientRight} aria-hidden />
      <TopBar onBack={handleBack} />

      <main className={s.main}>
        <div className={s.mainWrap}>

          {/* Sim header */}
          <div className={s.simHeader}>
            <div className={s.simHeaderLeft}>
              <nav className={s.breadcrumb}>
                <button onClick={handleBack} className={s.breadcrumbBack}>
                  <Icon name="arrowLeft" size={13} color="var(--text-3)" />
                  {sim.category}
                </button>
                <span className={s.breadcrumbSep}>/</span>
                <span className={s.breadcrumbCurrent}>{sim.title}</span>
              </nav>
              <h1 className={s.simTitle}>{sim.title}</h1>
              <div className={s.simMeta}>
                <span className={s.simDiff} style={{ color: diffColor, background: diffColor + '18', borderColor: diffColor + '33' }}>
                  {sim.difficulty}
                </span>
                <span className={s.simCat}>{sim.category}</span>
                <span className={s.simXp}>
                  <Icon name="zap" size={12} color="var(--amber)" w={2} />
                  {sim.xp} XP
                </span>
              </div>
            </div>
            <div className={s.stepCounter}>
              <span className={s.stepCounterNum} style={sim.type === 'visual' ? { fontSize: 14, color: 'var(--amber)' } : {}}>
                {sim.type === 'visual' ? 'Interactive' : `1/${sim.steps.length}`}
              </span>
              <span className={s.stepCounterLabel}>
                {sim.type === 'visual' ? 'simulation' : 'scenario steps'}
              </span>
            </div>
          </div>

          {/* Engine handles all step/choice/consequence logic */}
          <SimulationEngine
            simId={simId}
            onComplete={handleComplete}
            onBack={handleBack}
          />

        </div>
      </main>
    </div>
  )
}
