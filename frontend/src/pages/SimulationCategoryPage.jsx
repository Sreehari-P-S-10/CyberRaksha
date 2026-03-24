import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import s from './SimulationCategoryPage.module.css'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../utils/api.js'

/* ─── SVG Icon system (consistent with rest of app) ─── */
const paths = {
  shield:      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  arrowLeft:   <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  lock:        <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  clock:       <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  zap:         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  target:      <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  bookOpen:    <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  award:       <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
 // bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  user:        <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  mail:        <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></>,
  phone:       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.12 1.05.37 2.05.7 3.01a2 2 0 01-.45 2.11L6.09 9a16 16 0 006.91 6.91l1.16-1.16a2 2 0 012.11-.45c.96.33 1.96.58 3.01.7A2 2 0 0122 16.92z"/>,
  cpu:         <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></>,
  shoppingBag: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>,
  trendingUp:  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  wifi:        <><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
  activity:    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  chevrRight:  <polyline points="9 18 15 12 9 6"/>,
}

function Icon({ name, size = 18, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ─── Category metadata ─── */
const CATEGORY_META = {
  'financial-security': {
    id: 'financial-security',
    title: 'Financial Security',
    subtitle: 'Recognise and resist fraud targeting your money, banking, and payment systems.',
    icon: 'zap',
  },
  'identity-impersonation': {
    id: 'identity-impersonation',
    title: 'Identity & Impersonation',
    subtitle: 'Understand how attackers steal identities and impersonate trusted sources.',
    icon: 'eye',
  },
  'malware-device-safety': {
    id: 'malware-device-safety',
    title: 'Malware & Device Safety',
    subtitle: 'Learn how malicious software infects devices and how to stay protected.',
    icon: 'cpu',
  },
  'online-commerce-safety': {
    id: 'online-commerce-safety',
    title: 'Online Commerce Safety',
    subtitle: 'Navigate e-commerce fraud, fake listings, and unsafe payment gateways safely.',
    icon: 'shoppingBag',
  },
  'career-education-opportunity': {
    id: 'career-education-opportunity',
    title: 'Career, Education & Opportunity',
    subtitle: 'Spot fraudulent job offers, fake scholarships, and educational scams before they strike.',
    icon: 'trendingUp',
  },
}

/* ─── Simulation content
    Structure: SIMULATIONS[categoryId][ageGroup] = array of simulation objects
    Each simulation: { id, level, difficulty, title, desc, duration, objectives }
─── */

/* ─── Difficulty
/* ─── Difficulty label & colour ─── */
const DIFF_META = {
  beginner:     { label: 'Beginner',     color: '#2EB87A', bg: 'rgba(46,184,122,0.10)' },
  intermediate: { label: 'Intermediate', color: '#D4891A', bg: 'rgba(212,137,26,0.10)' },
  advanced:     { label: 'Advanced',     color: '#C94E4E', bg: 'rgba(201,78,78,0.10)' },
}

/* ─── Expertise → which difficulties are unlocked ─── */
const UNLOCKED = {
  beginner:     ['beginner',],
  intermediate: ['beginner', 'intermediate'],
  advanced:     ['beginner', 'intermediate', 'advanced'],
}

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════ */
export default function SimulationCategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const { user } = useAuth()
  const ageGroup  = user?.age_category   || 'student'
  const expertise = user?.expertise_level || 'beginner'

  const [completed, setCompleted] = useState(new Set())
  const [sims,      setSims]      = useState([])
  const [simsLoading, setSimsLoading] = useState(true)

  // Fetch simulation cards from DB
  useEffect(() => {
    if (!categoryId || !ageGroup) return
    setSimsLoading(true)
    api.get(`/catalogue/${categoryId}/${ageGroup}`)
      .then(async res => {
        if (res?.ok) setSims(await res.json())
      })
      .catch(() => { /* non-fatal — page still renders empty grid */ })
      .finally(() => setSimsLoading(false))
  }, [categoryId, ageGroup])

  // Fetch completed simulation IDs for this user
  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await api.get('/progress')
        if (res?.ok) {
          const data = await res.json()
          setCompleted(new Set(data.filter(p => p.status === 'completed').map(p => p.simulation_id)))
        }
      } catch (err) { /* non-fatal */ }
    }
    loadProgress()
  }, [])

  const meta = CATEGORY_META[categoryId]
  const unlockedDiffs = UNLOCKED[expertise]

  // Scroll to top on category change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [categoryId])

  if (!meta) {
    return (
      <div className={s.notFound}>
        <p>Category not found.</p>
        <Link to="/dashboard">← Back to Dashboard</Link>
      </div>
    )
  }

  const handleComplete = (simId) => {
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(simId)
      return next
    })
    const simMeta = sims.find(s => s.id === simId)
    api.post('/progress/complete', {
      simulation_id:       simId,
      simulation_title:    simMeta?.title    ?? simId,
      simulation_category: meta?.title       ?? '',
      points_earned:       0,
    }).catch(err => console.warn('Progress mark failed (non-fatal):', err))
  }

  const completedCount = sims.filter(sim => completed.has(sim.id)).length

  return (
    <div className={s.root}>
      {/* Ambient background (consistent with other pages) */}
      <div className={s.noiseBg} aria-hidden />
      <div className={s.ambientTop} aria-hidden />

      {/* ── TOPBAR ── */}
      <header className={s.topbar}>
        <div className={s.topbarWrap}>
          <Link to="/" className={s.topbarLogo}>
            <div className={s.logoMark}>
              <Icon name="shield" size={14} color="#D4891A" w={2.2} />
            </div>
            <span>Cyber<strong>Raksha</strong></span>
          </Link>

          <div className={s.topbarRight}>
            {/* <button className={s.topbarIcon} aria-label="Notifications">
              <Icon name="bell" size={18} color="var(--text-3)" />
            </button> */}
            <div className={s.topbarUser}>
              <div className={s.topbarUserInfo}>
                <span className={s.topbarUserName}>{user?.name || 'Trainee'}</span>
                <span className={s.topbarUserId}>{ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}</span>
              </div>
              <div className={s.topbarAvatar}>
                <Icon name="user" size={16} color="var(--text-2)" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className={s.main}>
        <div className={s.mainWrap}>

          {/* Breadcrumb */}
          <nav className={s.breadcrumb}>
            <Link to="/dashboard" className={s.breadcrumbBack}>
              <Icon name="arrowLeft" size={14} color="var(--text-3)" />
              Dashboard
            </Link>
            <span className={s.breadcrumbSep}>/</span>
            <span className={s.breadcrumbCurrent}>{meta.title}</span>
          </nav>

          {/* Page header */}
          <div className={s.pageHeader}>
            <div className={s.pageHeaderLeft}>
              <div className={s.categoryIconWrap}>
                <Icon name={meta.icon} size={22} color="var(--amber)" w={1.5} />
              </div>
              <div>
                <p className={s.eyebrow}>Simulation Category</p>
                <h1 className={s.pageTitle}>{meta.title}</h1>
                <p className={s.pageSubtitle}>{meta.subtitle}</p>
              </div>
            </div>

            {/* Progress summary */}
            <div className={s.progressSummary}>
              <div className={s.progressRing}>
                <svg viewBox="0 0 48 48" width="56" height="56">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border-lt)" strokeWidth="3.5"/>
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--amber)" strokeWidth="3.5"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - completedCount / Math.max(sims.length, 1))}`}
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                </svg>
                <div className={s.progressRingText}>
                  <span className={s.progressRingNum}>{completedCount}</span>
                  <span className={s.progressRingDen}>/{sims.length}</span>
                </div>
              </div>
              <div className={s.progressMeta}>
                <span className={s.progressLabel}>Completed</span>
                <span className={s.progressSub}>{sims.length - completedCount} remaining</span>
              </div>
            </div>
          </div>

          {/* User context pill */}
          <div className={s.contextPill}>
            <div className={s.contextItem}>
              <Icon name="user" size={12} color="var(--text-3)" />
              <span>{ageGroup === 'student' ? 'Student' : ageGroup === 'professional' ? 'Professional' : 'Senior Citizen'}</span>
            </div>
            <div className={s.contextDot} />
            <div className={s.contextItem}>
              <Icon name="target" size={12} color={DIFF_META[expertise].color} />
              <span style={{ color: DIFF_META[expertise].color }}>
                {DIFF_META[expertise].label} access
              </span>
            </div>
            <div className={s.contextDot} />
            <div className={s.contextItem}>
              <Icon name="award" size={12} color="var(--text-3)" />
              <span>Higher levels unlock as you progress</span>
            </div>
          </div>

          {/* ── SIMULATION GRID ── */}
          <section className={s.simSection}>
            <h2 className={s.simSectionTitle}>
              Choose your simulation
            </h2>

            {simsLoading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
                Loading simulations…
              </div>
            ) : sims.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
                No simulations available for this category.
              </div>
            ) : null}
          <div className={s.simGrid}>
              {sims.map((sim) => {
                const isUnlocked = unlockedDiffs.includes(sim.difficulty)
                const isDone = completed.has(sim.id)
                const diff = DIFF_META[sim.difficulty]

                return (
                  <div
                    key={sim.id}
                    className={`${s.simCard} ${!isUnlocked ? s.simCardLocked : ''} ${isDone ? s.simCardDone : ''}`}
                  >
                    {/* Lock overlay */}
                    {!isUnlocked && (
                      <div className={s.lockOverlay}>
                        <div className={s.lockIconWrap}>
                          <Icon name="lock" size={20} color="var(--text-3)" w={1.8} />
                        </div>
                        <span className={s.lockMsg}>
                          Reach <strong>{sim.difficulty}</strong> level to unlock
                        </span>
                      </div>
                    )}

                    {/* Done tick */}
                    {isDone && (
                      <div className={s.doneBadge}>
                        <Icon name="checkCircle" size={14} color="#2EB87A" w={2} />
                        Completed
                      </div>
                    )}

                    {/* Card top row */}
                    <div className={s.simCardTop}>
                      <span className={s.simLevel}>Level {sim.level}</span>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        {}
                        {isUnlocked && (
                          <span className={s.simDiff} style={{ color: diff.color, background: diff.bg }}>
                            {diff.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & desc */}
                    <h3 className={s.simTitle}>{sim.title}</h3>
                    <p className={s.simDesc}>{sim.desc}</p>

                    {/* Objectives */}
                    {isUnlocked && (
                      <ul className={s.simObjectives}>
                        {sim.objectives.map((obj, i) => (
                          <li key={i}>
                            <Icon name="chevrRight" size={12} color="var(--amber)" w={2} />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Footer */}
                    <div className={s.simCardFooter}>
                      {isUnlocked && (
                        <div className={s.simMeta}>
                          <Icon name="clock" size={13} color="var(--text-3)" />
                          <span>{sim.duration}</span>
                        </div>
                      )}

                      {isUnlocked ? (
                        isDone ? (
                          <button className={s.btnReview} onClick={() => navigate(`/simulation/${sim.id}`)}>
                            Review <Icon name="arrowRight" size={13} />
                          </button>
                        ) : (
                          <button className={s.btnStart} onClick={() => {
                            navigate(`/simulation/${sim.id}`)
                          }}>
                            Start <Icon name="arrowRight" size={13} />
                          </button>
                        )
                      ) : (
                        <button className={s.btnLocked} disabled>
                          <Icon name="lock" size={13} color="var(--text-3)" />
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── OTHER CATEGORIES ── */}
          <section className={s.otherSection}>
            <h2 className={s.otherTitle}>Other categories</h2>
            <div className={s.otherGrid}>
              {Object.values(CATEGORY_META)
                .filter(c => c.id !== categoryId)
                .map(cat => (
                  <Link key={cat.id} to={`/category/${cat.id}`} className={s.otherCard}>
                    <div className={s.otherIconWrap}>
                      <Icon name={cat.icon} size={16} color="var(--amber)" w={1.5} />
                    </div>
                    <span className={s.otherLabel}>{cat.title}</span>
                    <Icon name="chevrRight" size={14} color="var(--text-3)" />
                  </Link>
                ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
