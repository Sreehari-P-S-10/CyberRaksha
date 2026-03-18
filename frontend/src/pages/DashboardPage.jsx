import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/* ─── SVG Icon System — matches LandingPage exactly ─── */
const paths = {
  shield:       <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  bell:         <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
  logOut:       <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  arrowRight:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  checkCircle:  <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  helpCircle:   <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  activity:     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  creditCard:   <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  user:         <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  shoppingCart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
  trendingUp:   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  anchor:       <><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="21"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
  cpu:          <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></>,
  award:        <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  barChart2:    <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  target:       <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  clock:        <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  chevRight:    <polyline points="9 18 15 12 9 6"/>,
  rotCcw:       <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.65"/></>,
}

function Icon({ name, size = 20, color = 'currentColor', w = 1.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ─── Simulation Data ─── */
/* CHANGE 1: added categoryRoute to each entry */
const simulations = [
  {
    id: 'financial',
    categoryRoute: 'financial-security',
    icon: 'creditCard',
    cat: 'Finance',
    title: 'Financial Security',
    desc: 'Banking, payments, OTP, UPI, and money-related fraud patterns.',
    scenarios: 8,
    completed: true,
  },
  {
    id: 'identity',
    categoryRoute: 'identity-impersonation',
    icon: 'user',
    cat: 'Social Eng.',
    title: 'Identity & Impersonation',
    desc: 'Scams involving fake authorities, relatives, or trusted persons.',
    scenarios: 6,
    completed: false,
  },
  {
    id: 'commerce',
    categoryRoute: 'online-commerce-safety',
    icon: 'shoppingCart',
    cat: 'Commerce',
    title: 'Online Commerce Safety',
    desc: 'Shopping, delivery, refunds, and marketplace fraud.',
    scenarios: 5,
    completed: false,
  },
  {
    id: 'investment',
    categoryRoute: 'career-education-opportunity',
    icon: 'trendingUp',
    cat: 'Education & Career',
    title: 'Career, Education & Opportunity',
    desc: 'Job offers, scholarships, earning schemes and career development scams.',
    scenarios: 7,
    completed: false,
  },
  {
    id: 'phishing',
    categoryRoute: 'phishing-emerging-threats',
    icon: 'anchor',
    cat: 'Phishing',
    title: 'Phishing & Emerging Threats',
    desc: 'Fake websites, malicious downloads, AI scams, and advanced threats.',
    scenarios: 9,
    completed: false,
  },
  {
    id: 'malware',
    categoryRoute: 'malware-device-safety',
    icon: 'cpu',
    cat: 'Malware',
    title: 'Malware & Device Security',
    desc: 'Protection against malicious software that infects devices to steal data.',
    scenarios: 6,
    completed: false,
  },
]

const DIFF_META = {
  Beginner:     { color: '#2EB87A', bg: 'rgba(46,184,122,0.1)',  border: 'rgba(46,184,122,0.22)' },
  Intermediate: { color: '#D4891A', bg: 'rgba(212,137,26,0.1)',  border: 'rgba(212,137,26,0.22)' },
  Advanced:     { color: '#C94E4E', bg: 'rgba(201,78,78,0.1)',   border: 'rgba(201,78,78,0.22)'  },
}

const recentActivity = [
  { icon: 'checkCircle', label: 'Completed Financial Security — Module 1', time: '2h ago', ok: true },
  { icon: 'activity',    label: 'Started Identity & Impersonation training', time: 'Yesterday', ok: true },
  { icon: 'rotCcw',      label: 'OTP Scam Simulation — retry recommended', time: '3 days ago', ok: false },
]

/* ─── Nav ─── */
function NavBar({ onLogout }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(13,16,23,0.92)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      height: '60px',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1140px', width: '100%', margin: '0 auto',
        padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: '9px',
          fontFamily: 'var(--sans)', fontSize: '17px',
          color: 'var(--text-1)', letterSpacing: '-0.01em',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '7px',
            background: 'var(--amber-dim)', border: '1px solid var(--amber-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="shield" size={15} color="#D4891A" w={2.2} />
          </div>
          <span>Cyber<strong>Raksha</strong></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{
            width: '34px', height: '34px', borderRadius: '7px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Icon name="bell" size={16} color="var(--text-2)" />
          </button>

          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4891A 0%, #F0A830 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: '700',
            color: '#0D1017', letterSpacing: '0.02em',
          }}>A</div>

          <button onClick={onLogout} title="Sign out" style={{
            width: '34px', height: '34px', borderRadius: '7px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Icon name="logOut" size={15} color="var(--text-2)" />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ─── Progress Card ─── */
function ProgressCard() {
  const pct = 35
  const done = simulations.filter(s => s.completed).length

  return (
    <div style={{
      background: 'var(--ink2)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '10px', padding: '32px',
      marginBottom: '24px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: '40px',
      flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '320px', height: '320px',
        background: 'radial-gradient(ellipse, rgba(212,137,26,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div>
        <p style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: '10px',
        }}>Welcome back</p>
        <h2 style={{
          fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: '400',
          color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: '6px',
          lineHeight: '1.1',
        }}>Alex</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-3)', fontFamily: 'var(--sans)' }}>
          {done} of {simulations.length} simulation modules completed
        </p>
      </div>

      <div style={{ flex: '1', minWidth: '240px', maxWidth: '400px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: '10px',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-2)', fontFamily: 'var(--sans)' }}>
            Overall Completion
          </span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '12px',
            color: 'var(--amber)', letterSpacing: '0.04em',
          }}>{pct}%</span>
        </div>

        <div style={{
          height: '5px', background: 'rgba(255,255,255,0.06)',
          borderRadius: '99px', overflow: 'hidden',
        }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: 'linear-gradient(90deg, var(--amber) 0%, var(--amber-lt) 100%)',
            borderRadius: '99px',
          }} />
        </div>

        <p style={{
          fontSize: '12px', color: 'var(--text-3)',
          fontFamily: 'var(--mono)', marginTop: '9px',
          letterSpacing: '0.01em',
        }}>
          Next milestone — Security Specialist Badge at 80%
        </p>
      </div>

      <div style={{
        display: 'flex', gap: '0',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px', overflow: 'hidden',
      }}>
        {[
          { icon: 'target',    label: 'Scenarios Done', value: '12' },
          { icon: 'barChart2', label: 'Threat Score',   value: '840' },
        ].map((st, i) => (
          <div key={st.label} style={{
            padding: '16px 24px', textAlign: 'center',
            borderRight: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '6px', marginBottom: '5px',
            }}>
              <Icon name={st.icon} size={13} color="var(--amber)" w={1.8} />
              <span style={{
                fontFamily: 'var(--serif)', fontSize: '22px',
                color: 'var(--text-1)', lineHeight: '1',
              }}>{st.value}</span>
            </div>
            <div style={{
              fontSize: '11px', color: 'var(--text-3)',
              fontFamily: 'var(--mono)', letterSpacing: '0.04em',
            }}>{st.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Quiz Banner ─── */
function QuizBanner() {
  return (
    <div style={{
      background: 'var(--ink2)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '10px', padding: '22px 28px',
      marginBottom: '48px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: '0', top: '0', bottom: '0',
        width: '3px',
        background: 'linear-gradient(180deg, var(--amber) 0%, transparent 100%)',
        borderRadius: '10px 0 0 10px',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingLeft: '8px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '8px',
          background: 'var(--amber-dim)', border: '1px solid rgba(212,137,26,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="helpCircle" size={17} color="var(--amber)" w={1.7} />
        </div>
        <div>
          <h3 style={{
            fontSize: '14px', fontWeight: '600',
            color: 'var(--text-1)', marginBottom: '3px',
            fontFamily: 'var(--sans)', letterSpacing: '-0.01em',
          }}>Weekly Threat Knowledge Quiz</h3>
          <p style={{
            fontSize: '12.5px', color: 'var(--text-3)',
            fontFamily: 'var(--mono)', letterSpacing: '0.02em',
          }}>10 questions · ~5 minutes · Based on your completed modules</p>
        </div>
      </div>

      <Link to="/quiz" style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '9px 20px', borderRadius: '6px',
        background: 'var(--amber)', color: 'var(--ink)',
        fontSize: '13.5px', fontWeight: '600',
        fontFamily: 'var(--sans)', textDecoration: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        Take the Quiz
        <Icon name="arrowRight" size={13} />
      </Link>
    </div>
  )
}

/* ─── Simulation Card ─── */
/* CHANGE 2: accepts onNavigate prop, calls it with categoryRoute on click */
function SimCard({ sim, onNavigate }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onClick={() => onNavigate(sim.categoryRoute)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--ink3)' : 'var(--ink)',
        border: `1px solid ${hov ? 'rgba(212,137,26,0.35)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '10px', padding: '26px',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
        transform: hov ? 'translateY(-3px)' : 'none',
        position: 'relative',
      }}
    >
      {/* Completed badge */}
      {sim.completed && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          display: 'flex', alignItems: 'center', gap: '5px',
          fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.06em',
          color: '#2EB87A', background: 'rgba(46,184,122,0.10)',
          border: '1px solid rgba(46,184,122,0.25)',
          borderRadius: '99px', padding: '3px 9px',
        }}>
          <Icon name="checkCircle" size={11} color="#2EB87A" w={2.2} />
          Completed
        </div>
      )}

      {/* Icon + category row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '16px',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'var(--amber-dim)', border: '1px solid rgba(212,137,26,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name={sim.icon} size={16} color="var(--amber)" w={1.6} />
        </div>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          color: 'var(--text-3)', letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>{sim.cat}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: '400',
        color: 'var(--text-1)', marginBottom: '8px',
        lineHeight: '1.25', letterSpacing: '-0.01em',
      }}>{sim.title}</h3>

      {/* Desc */}
      <p style={{
        fontSize: '13.5px', color: 'var(--text-2)',
        lineHeight: '1.7', fontFamily: 'var(--sans)',
        flex: 1, marginBottom: '20px',
      }}>{sim.desc}</p>

      {/* Footer row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '11.5px',
          color: 'var(--text-3)',
        }}>{sim.scenarios} scenarios</span>

        <span style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          fontSize: '13px', color: 'var(--amber)',
          fontWeight: '500', fontFamily: 'var(--sans)',
        }}>
          {sim.completed ? 'Retake' : 'Start training'}
          <Icon name="arrowRight" size={13} color="var(--amber)" />
        </span>
      </div>
    </div>
  )
}

/* ─── Main Dashboard ─── */
export default function DashboardPage() {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/')
  }

  /* CHANGE 3: handler passed to each SimCard */
  function handleCategoryClick(categoryRoute) {
    navigate(`/category/${categoryRoute}`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--ink)',
      fontFamily: 'var(--sans)',
      color: 'var(--text-2)',
    }}>
      <NavBar onLogout={handleLogout} />

      <main style={{
        maxWidth: '1140px', margin: '0 auto',
        padding: '48px 32px 80px',
      }}>

        <div style={{ marginBottom: '36px' }}>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '11px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--amber)', marginBottom: '10px',
          }}>Training Portal</p>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: '400', color: 'var(--text-1)',
            letterSpacing: '-0.02em', lineHeight: '1.1',
            marginBottom: '8px',
          }}>Dashboard</h1>
          <p style={{
            fontSize: '15px', color: 'var(--text-3)',
            fontWeight: '300', maxWidth: '480px', lineHeight: '1.7',
          }}>
            Track your progress and develop hands-on cyber-threat defence skills.
          </p>
        </div>

        <ProgressCard />
        <QuizBanner />

        <div style={{ marginBottom: '24px' }}>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '11px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--amber)', marginBottom: '10px',
          }}>Simulation Library</p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 2.5vw, 30px)',
            fontWeight: '400', color: 'var(--text-1)',
            letterSpacing: '-0.02em', lineHeight: '1.15',
            marginBottom: '6px',
          }}>Real-world scenarios to<br /><em style={{ fontStyle: 'italic', color: '#F0A830' }}>test your defences.</em></h2>
          <p style={{
            fontSize: '14px', color: 'var(--text-3)',
            fontWeight: '300', maxWidth: '440px', lineHeight: '1.65',
          }}>
            Each module is built from actual fraud patterns recorded across India.
          </p>
        </div>

        {/* Grid — onNavigate wired to each card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {simulations.map(sim => (
            <SimCard key={sim.id} sim={sim} onNavigate={handleCategoryClick} />
          ))}
        </div>

      </main>
    </div>
  )
}
