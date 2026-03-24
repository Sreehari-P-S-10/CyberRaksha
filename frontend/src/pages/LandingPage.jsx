import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './LandingPage.module.css'

/* ─── Inline SVG icon system — no emojis, no libraries ─── */
const paths = {
  shield:       <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  mail:         <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></>,
  phone:        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.12 1.05.37 2.05.7 3.01a2 2 0 01-.45 2.11L6.09 9a16 16 0 006.91 6.91l1.16-1.16a2 2 0 012.11-.45c.96.33 1.96.58 3.01.7A2 2 0 0122 16.92z"/>,
  cpu:          <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></>,
  alertTri:     <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  barChart:     <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
  users:        <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
  lock:         <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  zap:          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  target:       <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  eye:          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  globe:        <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
  arrowRight:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  checkCircle:  <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  xCircle:      <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
  activity:     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  server:       <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
  bookOpen:     <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  award:        <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  menu:         <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  x:            <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  cursor:       <><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></>,
  fingerprint:  <><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10"/><path d="M5 12a7 7 0 017-7"/><path d="M8.5 12a3.5 3.5 0 117 0c0 2.5-2.5 5.5-3.5 8"/></>,
  wifi:         <><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
}

function Icon({ name, size = 20, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ─── Terminal animation ─── */
const LOGS = [
  { d: 0,    c: '#58657A', t: '  $ cyberraksha --start-session' },
  { d: 600,  c: '#4A85C4', t: '  loading phishing_engine        [ok]' },
  { d: 1100, c: '#4A85C4', t: '  loading malware_simulator       [ok]' },
  { d: 1600, c: '#4A85C4', t: '  loading social_engineering      [ok]' },
  { d: 2200, c: '#D4891A', t: '  scenario: UPI_fraud_beginner    [ready]' },
  { d: 2800, c: '#C94E4E', t: '  scenario: phishing_intermediate [ready]' },
  { d: 3400, c: '#D4891A', t: '  user decision recorded          [eval]' },
  { d: 4000, c: '#2EB87A', t: '  feedback delivered  +15 pts     [done]' },
  { d: 4600, c: '#2EB87A', t: '  session score: 87 / 100         [excellent]' },
]

function Terminal() {
  const [lines, setLines] = useState([])
  const timer = useRef(null)

  const run = () => {
    setLines([])
    LOGS.forEach(({ d, c, t }) => {
      timer.current = setTimeout(() => setLines(l => [...l, { c, t }]), d)
    })
    timer.current = setTimeout(() => run(), 6000)
  }

  useEffect(() => { run(); return () => clearTimeout(timer.current) }, [])

  return (
    <div className={s.terminal}>
      <div className={s.termBar}>
        <div className={s.termDots}>
          <span style={{ background: '#C94E4E' }}/>
          <span style={{ background: '#D4891A' }}/>
          <span style={{ background: '#2EB87A' }}/>
        </div>
        <span className={s.termTitle}>cyberraksha — simulation engine</span>
      </div>
      <div className={s.termBody}>
        {lines.map((l, i) => (
          <div key={i} className={s.termLine} style={{ color: l.c }}>{l.t}</div>
        ))}
        <span className={s.termCursor}/>
      </div>
    </div>
  )
}

/* ─── Counter ─── */
function Counter({ to, suffix = '', prefix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(); const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true
      const t0 = performance.now(), dur = 1800
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1)
        const ease = p < .5 ? 2 * p * p : -1 + (4 - 2 * p) * p
        setN(Math.floor(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{n.toLocaleString('en-IN')}{suffix}</span>
}

/* ─── Scroll reveal ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.setAttribute('data-visible', '') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── Data ─── */
const SCENARIOS = [
  { icon: 'mail',        cat: 'Phishing',          lvl: 'Beginner',     title: 'The Urgent Bank Email',       desc: 'An official-looking email demands immediate account verification. One link, one mistake — your credentials gone.' },
  { icon: 'cursor',      cat: 'Finance Scam',       lvl: 'Beginner',     title: 'QR Code Payment Reversal',    desc: 'A stranger asks you to scan a code to receive money. Scanning sends it out of your account instead.' },
  { icon: 'cpu',         cat: 'Malware',            lvl: 'Intermediate', title: 'The Free Software Trap',      desc: 'A cracked installer — professional branding, clean interface. Watch what runs silently in the background.' },
  { icon: 'phone',       cat: 'Social Engineering', lvl: 'Beginner',     title: 'The Bank Support Call',       desc: '"I am calling from your bank\'s fraud department." Four minutes later, your account is drained.' },
  { icon: 'activity',    cat: 'Malware',            lvl: 'Advanced',     title: 'Ransomware: File Lockdown',   desc: 'An attachment opens. A progress bar fills. Your files are encrypted. Can you isolate the damage in time?' },
  { icon: 'wifi',        cat: 'Others',             lvl: 'Intermediate', title: 'Rogue USB Device',            desc: 'Found in the college parking lot, labelled Results_Final. Plugging it in takes 3 seconds. Recovery does not.' },
]

const FEATURES = [
  { icon: 'target',   title: 'Decision-Based Scenarios',    desc: 'Every module is a branching narrative simulation — not a video, not a quiz. You decide. You see consequences.' },
  { icon: 'lock',     title: 'Controlled Simulation Environment',      desc: 'Every simulation runs entirely within the platform. Your devices, accounts, and data are never touched or at risk.' },
  { icon: 'zap',      title: 'Instant Consequence Feedback', desc: 'After every decision, the platform explains what happened, why it was right or wrong, and how to prevent it.' },
  { icon: 'barChart', title: 'Adaptive Difficulty Levels',  desc: 'Scenarios scale with your profile — from basic red-flag recognition to advanced multi-layer attack patterns.' },
  { icon: 'award',    title: 'Points and Progression',      desc: 'A scoring system tracks accuracy and builds measurable improvement across simulations over time.' },
  { icon: 'bookOpen', title: 'Post-Simulation Knowledge',   desc: 'Each simulation ends with a detailed learning page and quiz to cement what you just experienced.' },
]

const STEPS = [
  { icon: 'fingerprint', num: '01', title: 'Create Your Profile',    desc: 'Set your age group and starting expertise level. Every scenario adapts to your profile.' },
  { icon: 'target',      num: '02', title: 'Choose a Scenario',      desc: 'Browse the threat library — phishing, malware, finance scams, social engineering, and more.' },
  { icon: 'zap',         num: '03', title: 'Make Decisions',         desc: 'Face branching, realistic scenarios and choose your response at each decision point.' },
  { icon: 'eye',         num: '04', title: 'See Consequences',       desc: 'Every decision shows you exactly what it would have led to in the real world.' },
  { icon: 'bookOpen',    num: '05', title: 'Learn and Take the Quiz', desc: 'A focused knowledge page and quiz follow each simulation to reinforce retention.' },
  { icon: 'award',       num: '06', title: 'Track Your Progress',    desc: 'Earn points, advance through difficulty levels, and watch your defence skills grow.' },
]

const AUDIENCES = [
  { icon: 'users',  title: 'Students',       desc: 'Job scams, fake scholarship phishing, social media impersonation — learn to spot them before they find you.' },
  { icon: 'globe',  title: 'Professionals', desc: 'UPI fraud, corporate phishing, malware from work emails — protect your financial and professional life.' },
  { icon: 'shield', title: 'Senior Citizens', desc: 'OTP scams, fake bank calls, and impersonation attacks — the most targeted group, now the most prepared.' },
  { icon: 'server', title: 'Institutions',   desc: 'A deployable awareness tool for colleges, government bodies, and NGO digital safety campaigns.' },
]

/* ═══════════ MAIN PAGE ═══════════ */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useReveal()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className={s.root}>
      <div className={s.noiseBg} aria-hidden />
      <div className={s.ambientLeft} aria-hidden />

      {/* ── NAV ── */}
      <header className={`${s.nav} ${scrolled ? s.navFill : ''}`}>
        <div className={s.navWrap}>
          <Link to="/" className={s.logo}>
            <div className={s.logoMark}>
              <Icon name="shield" size={15} color="#D4891A" w={2.2}/>
            </div>
            <span>Cyber<strong>Raksha</strong></span>
          </Link>

          <nav className={`${s.navLinks} ${menuOpen ? s.open : ''}`}>
            {[['#features','Features'],['#simulations','Simulations'],['#how-it-works','How It Works'],['#for-whom','Who It\'s For']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>

          <div className={s.navRight}>
            <Link to="/login"    className={s.navLogin}>Log in</Link>
            <Link to="/register" className={s.navCta}>Get Started <Icon name="arrowRight" size={13}/></Link>
          </div>

          <button className={s.burger} onClick={() => setMenuOpen(o => !o)} aria-label="toggle menu">
            <Icon name={menuOpen ? 'x' : 'menu'} size={21} color="var(--text-2)"/>
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroWrap}>

          <div className={s.heroLeft}>
            <div className={s.heroPill}>
              <span className={s.heroPillDot}/>
              India's cyber awareness simulation platform
            </div>

            <h1 className={s.heroH1}>
              Experience cyber<br/>
              <em>attacks</em> before<br/>
              they reach you.
            </h1>

            <p className={s.heroSub}>
              CyberRaksha trains you to identify and resist phishing, UPI fraud, malware, and social engineering — through decision-based simulations in a fully controlled environment.
            </p>

            <div className={s.heroActions}>
              <Link to="/register" className={s.btnPrimary}>
                Begin training <Icon name="arrowRight" size={15}/>
              </Link>
              <a href="#simulations" className={s.btnSecondary}>View scenarios</a>
            </div>

            <div className={s.heroMeta}>
              {['No installation required','Device and data always safe','Free to use'].map((t, i) => (
                <div key={i} className={s.heroMetaItem}>
                  <Icon name="checkCircle" size={14} color="var(--ok)" w={2}/>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className={s.heroRight} style={{ position: 'relative' }}>
            <Terminal/>
          </div>
        </div>

        <div className={s.scrollCue}>
          <div className={s.scrollMouse}><div className={s.scrollWheel}/></div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={s.statBar} data-reveal>
        <div className={s.statBarWrap}>
          {[
            { to: 2268000, suf: '+',   pre: '',  label: 'Cyber incidents reported to I4C in 2024' },
            { to: 22845,   suf: ' Cr', pre: '₹', label: 'Lost to cyber fraud in India — 2024' },
            { to: 7000,    suf: '+',   pre: '',  label: 'Cyber frauds reported daily across India' },
            { to: 85,      suf: '%',   pre: '',  label: 'Of 2024 complaints involved financial fraud' },
          ].map((st, i) => (
            <div key={i} className={s.statItem}>
              <div className={s.statVal}><Counter to={st.to} suffix={st.suf} prefix={st.pre}/></div>
              <div className={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className={s.section} data-reveal>
        <div className={s.sectionWrap}>
          <header className={s.sectionHead}>
            <p className={s.eyebrow}>Why it works</p>
            <h2 className={s.h2}>Built differently<br/><em>by design.</em></h2>
            <p className={s.sectionDesc}>
              Most awareness programmes deliver information. CyberRaksha delivers experience — the only approach proven to build lasting defensive instinct against real-world attacks.
            </p>
          </header>

          <div className={s.featureGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} className={s.featureCard}>
                <div className={s.featureIconWrap}>
                  <Icon name={f.icon} size={19} color="var(--amber)" w={1.6}/>
                </div>
                <h3 className={s.featureTitle}>{f.title}</h3>
                <p className={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENARIOS ── */}
      <section id="simulations" className={`${s.section} ${s.sectionAlt}`} data-reveal>
        <div className={s.sectionWrap}>
          <header className={s.sectionHead}>
            <p className={s.eyebrow}>Threat library</p>
            <h2 className={s.h2}>What you will<br/><em>face and learn.</em></h2>
            <p className={s.sectionDesc}>
              Each scenario is a realistic, branching narrative built from actual fraud patterns recorded across India. No stock examples — real attack scripts adapted for training.
            </p>
          </header>

          <div className={s.scenarioGrid}>
            {SCENARIOS.map((sc, i) => (
              <div key={i} className={s.scenarioCard}>
                <div className={s.scenarioHeader}>
                  <div className={s.scenarioIconWrap}>
                    <Icon name={sc.icon} size={17} color="var(--amber)" w={1.6}/>
                  </div>
                  <span className={s.scenarioLabel}>{sc.cat}</span>
                  <span className={s.scenarioLevel} data-lvl={sc.lvl.toLowerCase()}>{sc.lvl}</span>
                </div>
                <h3 className={s.scenarioTitle}>{sc.title}</h3>
                <p className={s.scenarioDesc}>{sc.desc}</p>
                <div className={s.scenarioCta}>
                  <span>View scenario</span>
                  <Icon name="arrowRight" size={13} color="var(--amber)"/>
                </div>
              </div>
            ))}
          </div>

          <div className={s.centreAction}>
            <Link to="/register" className={s.btnPrimary}>
              Access full library <Icon name="arrowRight" size={15}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SIMULATION PREVIEW ── */}
      <section className={s.section} data-reveal>
        <div className={s.sectionWrap}>
          <div className={s.previewGrid}>

            {/* Platform overview panel */}
            <div className={s.mockWrap}>
              <div className={s.overviewPanel}>
                <div className={s.overviewHeader}>
                  <p className={s.eyebrow} style={{ marginBottom: 6 }}>What you train on</p>
                  <h3 className={s.overviewTitle}>A simulation for every<br/>type of cyber threat.</h3>
                </div>

                <div className={s.overviewCategories}>
                  {[
                    { icon: 'mail',     label: 'Phishing',           count: '4 scenarios',  lvl: 'Beginner–Advanced' },
                    { icon: 'cursor',   label: 'Finance Scams',      count: '5 scenarios',  lvl: 'Beginner–Intermediate' },
                    { icon: 'cpu',      label: 'Malware',            count: '4 scenarios',  lvl: 'Intermediate–Advanced' },
                    { icon: 'phone',    label: 'Social Engineering', count: '4 scenarios',  lvl: 'Beginner–Advanced' },
                    { icon: 'wifi',     label: 'Others',             count: '3 scenarios',  lvl: 'All levels' },
                  ].map((cat, i) => (
                    <div key={i} className={s.overviewCatRow}>
                      <div className={s.overviewCatIcon}>
                        <Icon name={cat.icon} size={15} color="var(--amber)" w={1.6}/>
                      </div>
                      <div className={s.overviewCatText}>
                        <span className={s.overviewCatLabel}>{cat.label}</span>
                        <span className={s.overviewCatMeta}>{cat.count} · {cat.lvl}</span>
                      </div>
                      <Icon name="arrowRight" size={13} color="var(--text-3)" w={1.6}/>
                    </div>
                  ))}
                </div>

                <div className={s.overviewFooter}>
                  <div className={s.overviewFooterStat}>
                    <span className={s.overviewFooterNum}>20+</span>
                    <span className={s.overviewFooterLabel}>Total scenarios</span>
                  </div>
                  <div className={s.overviewFooterDivider}/>
                  <div className={s.overviewFooterStat}>
                    <span className={s.overviewFooterNum}>3</span>
                    <span className={s.overviewFooterLabel}>Difficulty levels</span>
                  </div>
                  <div className={s.overviewFooterDivider}/>
                  <div className={s.overviewFooterStat}>
                    <span className={s.overviewFooterNum}>Quiz</span>
                    <span className={s.overviewFooterLabel}>After each sim</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className={s.previewCopy}>
              <p className={s.eyebrow}>Inside a simulation</p>
              <h2 className={s.h2} style={{ marginBottom: 16 }}>Decisions with<br/><em>real consequences.</em></h2>
              <p className={s.previewDesc}>
                Traditional training tells you what not to do. CyberRaksha shows you — by putting you directly inside the scenario, making you decide, then revealing exactly what each choice would have caused in the real world.
              </p>
              <ul className={s.previewList}>
                {[
                  'Phishing emails with authentic formatting and spoofed domains',
                  'UPI and QR code fraud — step-by-step deception, uncovered',
                  'Malware installers with simulated background activity logs',
                  'Social engineering calls with live psychological pressure tactics',
                  'Full consequence breakdown and prevention guidance after every decision',
                ].map((item, i) => (
                  <li key={i}>
                    <Icon name="checkCircle" size={14} color="var(--ok)" w={2}/>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className={s.btnPrimary}>
                Try a simulation <Icon name="arrowRight" size={15}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className={`${s.section} ${s.sectionAlt}`} data-reveal>
        <div className={s.sectionWrap}>
          <header className={s.sectionHead}>
            <p className={s.eyebrow}>The process</p>
            <h2 className={s.h2}>Six steps to<br/><em>cyber resilience.</em></h2>
          </header>

          <div className={s.stepsGrid}>
            {STEPS.map((st, i) => (
              <div key={i} className={s.stepCard}>
                <div className={s.stepTop}>
                  <span className={s.stepNum}>{st.num}</span>
                  <div className={s.stepIconWrap}>
                    <Icon name={st.icon} size={17} color="var(--amber)" w={1.6}/>
                  </div>
                </div>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE ── */}
      <section id="for-whom" className={s.section} data-reveal>
        <div className={s.sectionWrap}>
          <header className={s.sectionHead}>
            <p className={s.eyebrow}>Who it protects</p>
            <h2 className={s.h2}>Built for every<br/><em>kind of user.</em></h2>
          </header>

          <div className={s.audienceGrid}>
            {AUDIENCES.map((a, i) => (
              <div key={i} className={s.audienceCard}>
                <div className={s.audienceIconWrap}>
                  <Icon name={a.icon} size={20} color="var(--amber)" w={1.5}/>
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta} data-reveal>
        <div className={s.ctaWrap}>
          <div className={s.ctaShield}>
            <Icon name="shield" size={60} color="var(--amber)" w={0.9}/>
          </div>
          <h2 className={s.ctaH2}>
            Awareness is not enough.<br/><em>Practice is.</em>
          </h2>
          <p className={s.ctaDesc}>
            Join CyberRaksha and build the instinct to recognise attacks before they succeed — through experience, not lectures.
          </p>
          <div className={s.ctaActions}>
            <Link to="/register" className={s.btnPrimary}>
              Start free training <Icon name="arrowRight" size={15}/>
            </Link>
            <Link to="/login" className={s.btnSecondary}>Already have an account</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={s.footer}>
        <div className={s.footerWrap}>
          <div className={s.footerTop}>
            <div className={s.footerBrand}>
              <Link to="/" className={s.logo}>
                <div className={s.logoMark}>
                  <Icon name="shield" size={15} color="#D4891A" w={2.2}/>
                </div>
                <span>Cyber<strong>Raksha</strong></span>
              </Link>
              <p className={s.footerTagline}>
                An interactive cyber fraud and malware awareness simulation platform. B.Tech Mini Project — Computer Science Engineering.
              </p>
            </div>

            <div className={s.footerCols}>
              <div className={s.footerCol}>
                <h4>Platform</h4>
                <a href="#simulations">Simulations</a>
                <a href="#how-it-works">How It Works</a>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </div>
              <div className={s.footerCol}>
                <h4>Resources</h4>
                <a href="#">Phishing Guide</a>
                <a href="#">Malware Basics</a>
                <a href="#">UPI Safety Tips</a>
                <a href="#">Report Cybercrime</a>
              </div>
              <div className={s.footerCol}>
                <h4>Project</h4>
                <a href="#">About</a>
                <a href="#">GitHub</a>
                <a href="#">Documentation</a>
              </div>
            </div>
          </div>

          <div className={s.footerBottom}>
            <span>© 2026 CyberRaksha · Mini Project · B.Tech CSE</span>
            <span className={s.footerTeam}>Adith · Sreehari · Neeraj</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
