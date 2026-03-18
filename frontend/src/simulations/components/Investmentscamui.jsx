/**
 * components/InvestmentScamUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * High-fidelity investment scam visual environments.
 *
 * InvestmentAdEnv    — 'investmentAd'    Fake social-media ad
 * TradingPlatformEnv — 'tradingPlatform' Fake broker dashboard
 * TelegramInvestEnv  — 'telegramInvest'  Telegram signal group
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ─────────────────────────────────────────────────────────────────
   InvestmentAdEnv
   Realistic Instagram/Facebook sponsored post layout.
   Animated floating icon · gradient headline · pulsing CTA ·
   fake verified badge · live member counter · comment stream.
───────────────────────────────────────────────────────────────── */
export function InvestmentAdEnv({ envProps, onInteract }) {
  const {
    adTitle       = 'GUARANTEED 50% Monthly Returns! 📈',
    adDescription = 'Join 50,000+ members earning passive income. Real traders managing your money. Limited slots available.',
    adCta         = 'Join Exclusive Trading Group',
    adImage       = '📊',
    adColor       = '#1FCC79',
  } = envProps

  const [memberCount, setMemberCount] = useState(49847)
  const [comments, setComments]       = useState([
    { name: 'Rahul_Sharma88',  text: 'Made ₹80K this month alone 🔥', time: '2m' },
    { name: 'Priya.Invests',   text: 'Withdrawal within 10 minutes ✅', time: '5m' },
  ])
  const LIVE_COMMENTS = [
    { name: 'Anil_Trading',  text: '₹1.2L profit this week 🚀' },
    { name: 'Sunita_K',      text: 'Joined yesterday, already up ₹12,000!' },
    { name: 'Vikram_Mehta',  text: 'Best decision of my life 💯' },
  ]
  const commentRef = useRef(0)

  // Live member count ticks up every 3s
  useEffect(() => {
    const t = setInterval(() => setMemberCount(n => n + Math.floor(Math.random() * 3 + 1)), 3000)
    return () => clearInterval(t)
  }, [])

  // Stream fake comments
  useEffect(() => {
    const t = setInterval(() => {
      const c = LIVE_COMMENTS[commentRef.current % LIVE_COMMENTS.length]
      commentRef.current++
      setComments(prev => [{ ...c, time: 'now' }, ...prev].slice(0, 4))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="vsim-root fade-in">
      <div className="vsim-scene-label">📱 Social Media — Sponsored Investment Ad</div>

      <div className="tp-card-hover" style={{
        background: '#111', borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        maxWidth: 440, margin: '0 auto',
      }}>

        {/* ── Post header (Instagram-style) ── */}
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="float" style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg,${adColor},#00ffa3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
            boxShadow: `0 0 0 2px #111, 0 0 0 4px ${adColor}`,
          }}>📊</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>EliteTrading.Pro</span>
              {/* Fake verified badge */}
              <span style={{ background: adColor, borderRadius: '50%', width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>✓</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Sponsored · 🌍 India</div>
          </div>
          <span style={{ fontSize: 20, color: 'var(--text-3)' }}>⋯</span>
        </div>

        {/* ── Banner image area ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #0d2b1a 50%, #0a1628 100%)',
          padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(31,204,121,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(31,204,121,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          <div className="float" style={{ fontSize: 52, marginBottom: 10, position: 'relative' }}>{adImage}</div>
          <div style={{
            fontSize: 20, fontWeight: 900, lineHeight: 1.3, position: 'relative',
            background: `linear-gradient(90deg, ${adColor}, #00ffa3, ${adColor})`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'tpGraphMove 3s linear infinite',
          }}>{adTitle}</div>
          {/* Live member count */}
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 16, position: 'relative' }}>
            {[
              { v: memberCount.toLocaleString('en-IN') + '+', l: 'Members' },
              { v: '₹12.4 Cr+', l: 'Profits Paid' },
              { v: '99%', l: 'Success Rate' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: adColor }}>{s.v}</div>
                <div style={{ fontSize: 10, color: '#888' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Post caption ── */}
        <div style={{ padding: '12px 14px 8px' }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 10 }}>
            <strong style={{ color: 'var(--text-1)' }}>EliteTrading.Pro</strong> {adDescription}
          </p>
          {/* Urgency pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.25)',
            borderRadius: 99, padding: '4px 10px', marginBottom: 10,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3b30', animation: 'vsim-pulse 1s infinite' }} />
            <span style={{ fontSize: 11, color: '#ff9f9a', fontFamily: 'var(--mono)' }}>Only 3 VIP slots remaining today</span>
          </div>
        </div>

        {/* ── Live comments ── */}
        <div style={{ padding: '0 14px 10px' }}>
          {comments.map((c, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, marginBottom: 6,
              animation: i === 0 ? 'vsim-slide-up 0.35s ease' : 'none',
            }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: `hsl(${c.name.length * 37},60%,45%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {c.name[0].toUpperCase()}
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{c.name} </span>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{c.text}</span>
                <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>{c.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA button ── */}
        <div style={{ padding: '0 14px 16px' }}>
          <button
            onClick={() => onInteract('cta_clicked')}
            className="glow cta-pulse tp-btn"
            style={{
              width: '100%', padding: '13px', borderRadius: 10,
              background: `linear-gradient(135deg, ${adColor} 0%, #00ffa3 100%)`,
              border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#000',
            }}
          >{adCta} →</button>
        </div>
      </div>

      {/* ── Red flags ── */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Scam Indicators</div>
        <ul className="vsim-warning-list">
          <li>"Guaranteed" returns — illegal under SEBI regulations</li>
          <li>Live member count &amp; comments are scripted bots</li>
          <li>Fake "verified" badge — not issued by the platform</li>
          <li>Artificial urgency: "Only 3 slots left"</li>
          <li>No SEBI/RBI registration details anywhere in the ad</li>
        </ul>
      </div>
    </div>
  )
}


/* ─────────────────────────────────────────────────────────────────
   TradingPlatformEnv
   Realistic fake broker dashboard: animated candlestick chart,
   live ticking profit counter, fake trade feed, withdrawal block.
───────────────────────────────────────────────────────────────── */
export function TradingPlatformEnv({ envProps, onInteract }) {
  const {
    platformName = 'Elite Trading Platform',
    domain       = 'elitetrading-pro.com',
    balance      = 75000,
    profit       = 25000,
  } = envProps

  const [displayProfit, setDisplayProfit] = useState(0)
  const [displayBalance, setDisplayBalance] = useState(balance - profit)
  const [showNotif, setShowNotif] = useState(false)
  const [notifText, setNotifText] = useState('')
  const [trades, setTrades] = useState([
    { sym: 'NIFTY 50', change: '+2.34%', val: '+₹3,400', dir: 'up' },
    { sym: 'RELIANCE', change: '+1.87%', val: '+₹2,100', dir: 'up' },
    { sym: 'TCS',      change: '+0.92%', val: '+₹1,200', dir: 'up' },
  ])
  const [withdrawBlocked, setWithdrawBlocked] = useState(false)
  const [withdrawMsg, setWithdrawMsg] = useState('')

  const NOTIFS = [
    'Trade closed: +₹4,200 profit 🎯',
    'Auto-trade: NIFTY call ✅',
    'New signal: +₹6,800 expected 📈',
    'Compounding active: +₹1,100 🔄',
  ]
  const notifRef = useRef(0)

  // Count up profit
  useEffect(() => {
    let cur = 0
    const target = profit
    const step = Math.ceil(target / 60)
    const t = setInterval(() => {
      cur = Math.min(cur + step, target)
      setDisplayProfit(cur)
      setDisplayBalance(balance - profit + cur)
      if (cur >= target) clearInterval(t)
    }, 25)
    return () => clearInterval(t)
  }, [profit, balance])

  // Cycle fake notifications
  useEffect(() => {
    const show = () => {
      setNotifText(NOTIFS[notifRef.current % NOTIFS.length])
      notifRef.current++
      setShowNotif(true)
      setTimeout(() => setShowNotif(false), 3000)
    }
    show()
    const t = setInterval(show, 5000)
    return () => clearInterval(t)
  }, [])

  // Rotate trade feed
  useEffect(() => {
    const MORE_TRADES = [
      { sym: 'HDFC BANK', change: '+1.44%', val: '+₹1,980', dir: 'up' },
      { sym: 'INFY',      change: '+2.11%', val: '+₹2,890', dir: 'up' },
      { sym: 'ITC',       change: '+0.73%', val: '+₹940',   dir: 'up' },
    ]
    let idx = 0
    const t = setInterval(() => {
      const newTrade = MORE_TRADES[idx % MORE_TRADES.length]; idx++
      setTrades(prev => [newTrade, ...prev.slice(0, 3)])
    }, 3500)
    return () => clearInterval(t)
  }, [])

  function handleWithdraw() {
    setWithdrawBlocked(true)
    setWithdrawMsg('Verifying account… Please deposit minimum ₹50,000 to unlock withdrawals.')
  }

  // Candlestick chart bars (fake but visually convincing)
  const bars = [
    { h: 40, open: 30, close: 70, up: true  },
    { h: 55, open: 20, close: 75, up: true  },
    { h: 35, open: 50, close: 25, up: false },
    { h: 60, open: 15, close: 75, up: true  },
    { h: 45, open: 30, close: 70, up: true  },
    { h: 70, open: 10, close: 80, up: true  },
    { h: 50, open: 30, close: 75, up: true  },
    { h: 80, open: 5,  close: 85, up: true  },
    { h: 65, open: 20, close: 80, up: true  },
    { h: 90, open: 0,  close: 90, up: true  },
  ]

  return (
    <div className="vsim-root fade-in">
      <div className="vsim-scene-label">📈 Fake Trading Platform Dashboard</div>

      <div className="tp-card-hover" style={{
        background: '#0e1117', borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        maxWidth: 500, margin: '0 auto', position: 'relative',
      }}>

        {/* Fake trade notification */}
        {showNotif && (
          <div className="tp-notification">{notifText}</div>
        )}

        {/* ── Top bar ── */}
        <div style={{
          padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(90deg,#0e1117,#0d1c0f)',
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#00D084' }}>{platformName}</div>
            <div style={{ fontSize: 11, color: '#555', fontFamily: 'var(--mono)' }}>🔒 {domain}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00D084', animation: 'vsim-pulse 1.2s infinite' }} />
            <span style={{ fontSize: 11, color: '#00D084', fontFamily: 'var(--mono)' }}>LIVE</span>
          </div>
        </div>

        {/* ── Portfolio summary ── */}
        <div style={{ padding: '16px', display: 'flex', gap: 12 }}>
          {[
            { label: 'Total Balance',    value: `₹${displayBalance.toLocaleString('en-IN')}`, color: 'var(--text-1)', large: true },
            { label: "Today's Profit",   value: `+₹${displayProfit.toLocaleString('en-IN')}`, color: '#00D084', large: true },
            { label: 'Capital Safety',   value: '99%', color: '#00D084', large: false },
            { label: 'Active Trades',    value: '14',  color: 'var(--amber)', large: false },
          ].map((s, i) => (
            <div key={i} style={{
              flex: i < 2 ? 2 : 1,
              background: 'rgba(255,255,255,0.03)', borderRadius: 10,
              padding: '10px 12px', border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--mono)', marginBottom: 4 }}>{s.label}</div>
              <div className={i === 1 ? 'tp-profit' : ''} style={{ fontSize: i < 2 ? 18 : 14, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Candlestick chart ── */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{
            background: '#0a0f0a', borderRadius: 10, padding: '10px 12px',
            border: '1px solid rgba(0,208,132,0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#00D084', fontFamily: 'var(--mono)', fontWeight: 600 }}>NIFTY 50 — 1D</span>
              <span style={{ fontSize: 11, color: '#00D084', fontFamily: 'var(--mono)' }}>▲ 2.34% today</span>
            </div>
            {/* Candlestick bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80, padding: '0 4px' }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  {/* Wick top */}
                  <div style={{ width: 1, height: (100 - b.h) * 0.4, background: b.up ? '#00D084' : '#ff3b30', opacity: 0.5 }} />
                  {/* Body */}
                  <div style={{
                    width: '70%', height: b.h * 0.7,
                    background: b.up ? '#00D084' : '#ff3b30',
                    borderRadius: 2, opacity: 0.85,
                    animation: `vsim-slide-up 0.${3 + i}s ease`,
                  }} />
                  {/* Wick bottom */}
                  <div style={{ width: 1, height: 6, background: b.up ? '#00D084' : '#ff3b30', opacity: 0.5 }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {['9:15','10:00','11:00','12:00','13:00','14:00','15:00','15:15','15:25','15:30'].map((t, i) => (
                <span key={i} style={{ fontSize: 8, color: '#555', fontFamily: 'var(--mono)' }}>{i % 3 === 0 ? t : ''}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Live trade feed ── */}
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)', marginBottom: 8, letterSpacing: '0.08em' }}>RECENT TRADES</div>
          {trades.map((t, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              animation: i === 0 ? 'vsim-slide-up 0.3s ease' : 'none',
            }}>
              <div style={{ display: 'flex', align: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00D084', marginTop: 5, animation: 'vsim-pulse 1.5s infinite' }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{t.sym}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>Auto-trade • just now</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#00D084' }}>{t.val}</div>
                <div style={{ fontSize: 11, color: '#00D08488' }}>{t.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Withdraw blocked message ── */}
        {withdrawBlocked && (
          <div style={{
            margin: '0 16px 12px',
            background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.25)',
            borderRadius: 10, padding: '12px 14px',
            animation: 'vsim-slide-up 0.4s ease',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff9f9a', marginBottom: 4 }}>⛔ Withdrawal Blocked</div>
            <div style={{ fontSize: 12, color: '#ff9f9a', lineHeight: 1.5 }}>{withdrawMsg}</div>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="tp-btn" onClick={() => onInteract('deposit_clicked')} style={{
            width: '100%', padding: '13px', borderRadius: 10,
            background: 'linear-gradient(135deg,#00D084,#00ffa3)',
            border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#000',
          }}>💰 Invest More — Multiply Returns</button>
          <button className="tp-btn" onClick={handleWithdraw} style={{
            width: '100%', padding: '13px', borderRadius: 10,
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', color: 'var(--text-2)',
          }}>💳 Withdraw Funds</button>
        </div>
      </div>

      {/* ── Red flags ── */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Scam Indicators</div>
        <ul className="vsim-warning-list">
          <li>Profits tick up automatically — no real trading engine</li>
          <li>"99% Capital Safety" is impossible — all investments carry risk</li>
          <li>Withdrawal requires a larger deposit — classic advance-fee trap</li>
          <li>Domain "elitetrading-pro.com" not registered with SEBI</li>
          <li>Auto-trade notifications are scripted, not live market data</li>
        </ul>
      </div>
    </div>
  )
}


/* ─────────────────────────────────────────────────────────────────
   TelegramInvestEnv
   Realistic Telegram signal group: streamed profit screenshots,
   admin-verified DM invitation, group info sidebar.
───────────────────────────────────────────────────────────────── */
export function TelegramInvestEnv({ envProps, onInteract }) {
  const {
    groupName      = 'SEBI Certified Traders India 📈',
    adminName      = 'RaviSharma_SEBI_Advisor',
    memberCount    = '22,418',
    accentColor    = '#2ca5e0',
    dmDelayMs      = 5000,
    depositAmount  = '₹25,000',
    promisedReturn = '₹62,500 in 14 days (150% return)',
    fakeDomain     = 'sebitrades-pro.in',
    profits        = [],
  } = envProps

  const [messages, setMessages]   = useState([])
  const [showDm, setShowDm]       = useState(false)
  const [dmStep, setDmStep]       = useState(0)
  const [fired, setFired]         = useState(false)
  const msgIdx                    = useRef(0)

  // Stream messages one by one
  useEffect(() => {
    if (profits.length === 0) return
    const t = setInterval(() => {
      if (msgIdx.current >= profits.length) { clearInterval(t); return }
      setMessages(prev => [...prev, profits[msgIdx.current]])
      msgIdx.current++
    }, 1200)
    return () => clearInterval(t)
  }, [profits])

  // Show admin DM after delay
  useEffect(() => {
    const t = setTimeout(() => setShowDm(true), dmDelayMs)
    return () => clearTimeout(t)
  }, [dmDelayMs])

  // Admin DM typing effect
  const DM_LINES = [
    `Hello! I noticed you're active in the group. 👋`,
    `I'm the group admin — I manage SEBI-certified trades for VIP members.`,
    `We have a special slot opening today. Deposit ${depositAmount} → get ${promisedReturn}. Guaranteed.`,
    `Visit our portal: ${fakeDomain}`,
  ]
  useEffect(() => {
    if (!showDm) return
    if (dmStep >= DM_LINES.length) return
    const t = setTimeout(() => setDmStep(s => s + 1), 1600)
    return () => clearTimeout(t)
  }, [showDm, dmStep])

  function go(id) { if (!fired) { setFired(true); onInteract(id) } }

  return (
    <div className="vsim-root fade-in">
      <div className="vsim-scene-label">📱 Telegram — Investment Signal Group</div>

      <div style={{ maxWidth: 480, margin: '0 auto', width: '100%', display: 'flex', gap: 0, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>

        {/* ── Group info sidebar ── */}
        <div style={{ width: 68, background: '#1c1c1e', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 6, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${accentColor},#1a56a0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📈</div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34c759', animation: 'vsim-pulse 1.5s infinite' }} />
          <div style={{ fontSize: 8, color: '#555', textAlign: 'center', fontFamily: 'var(--mono)', lineHeight: 1.3 }}>{memberCount}<br/>members</div>
        </div>

        {/* ── Chat area ── */}
        <div style={{ flex: 1, background: '#131922', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{groupName}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{memberCount} members · {Math.floor(parseInt(memberCount.replace(',','')) * 0.3).toLocaleString('en-IN')} online</div>
            </div>
            {/* Fake SEBI verified badge */}
            <div style={{ background: 'rgba(46,184,122,0.12)', border: '1px solid rgba(46,184,122,0.3)', borderRadius: 6, padding: '2px 7px' }}>
              <span style={{ fontSize: 9, color: '#2EB87A', fontFamily: 'var(--mono)' }}>SEBI ✓</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 260 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, animation: 'vsim-slide-up 0.35s ease' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: m.avatarBg || '#555', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', border: m.isAdmin ? `2px solid ${accentColor}` : 'none' }}>
                  {(m.name || '?')[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', align: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: m.isAdmin ? accentColor : 'var(--text-1)' }}>{m.name}</span>
                    {m.isAdmin && <span style={{ fontSize: 9, background: accentColor, color: '#fff', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--mono)' }}>ADMIN</span>}
                  </div>
                  {m.profit ? (
                    <div style={{ background: 'rgba(0,208,132,0.07)', border: '1px solid rgba(0,208,132,0.2)', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: '#00D084', fontFamily: 'var(--mono)' }}>{m.profit}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{m.strategy}</div>
                      <div style={{ fontSize: 10, color: '#555', marginTop: 4 }}>📸 Screenshot — {new Date().toLocaleDateString('en-IN')}</div>
                    </div>
                  ) : (
                    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '4px 10px 10px 10px', padding: '8px 10px' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{m.text}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length < profits.length && (
              <div style={{ display: 'flex', gap: 4, padding: '4px 8px', alignItems: 'center' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-3)', animation: `vsim-pulse 0.8s ${i*0.2}s infinite` }} />)}
              </div>
            )}
          </div>

          {/* Admin DM panel */}
          {showDm && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px', background: '#0d1b2a', animation: 'vsim-slide-up 0.4s ease' }}>
              <div style={{ fontSize: 11, color: accentColor, fontFamily: 'var(--mono)', fontWeight: 700, marginBottom: 8 }}>
                🔒 Private message from {adminName}
              </div>
              {DM_LINES.slice(0, dmStep).map((line, i) => (
                <div key={i} style={{ marginBottom: 6, animation: 'vsim-slide-up 0.3s ease' }}>
                  <div style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}33`, borderRadius: '4px 10px 10px 10px', padding: '7px 10px' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.55 }}>
                      {line.includes(fakeDomain)
                        ? <><span>{line.split(fakeDomain)[0]}</span><span style={{ color: '#60a5fa', textDecoration: 'underline' }}>{fakeDomain}</span></>
                        : line}
                    </span>
                  </div>
                </div>
              ))}
              {dmStep < DM_LINES.length && (
                <div style={{ display: 'flex', gap: 4, padding: '4px 8px' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, animation: `vsim-pulse 0.8s ${i*0.2}s infinite` }} />)}
                </div>
              )}
              {dmStep >= DM_LINES.length && !fired && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 10 }}>
                  <button onClick={() => go('deposited')} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)', color: '#ff9f9a', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--sans)', textAlign: 'left' }}>
                    💸 Deposit {depositAmount} for VIP slot
                  </button>
                  <button onClick={() => go('investigated_group')} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(46,184,122,0.08)', border: '1px solid rgba(46,184,122,0.25)', color: '#2EB87A', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--sans)', textAlign: 'left' }}>
                    🔍 Verify on SEBI's official register first
                  </button>
                  <button onClick={() => go('ignored_and_left')} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(74,133,196,0.08)', border: '1px solid rgba(74,133,196,0.25)', color: '#7aaddf', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--sans)', textAlign: 'left' }}>
                    🚪 Leave the group without engaging
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Red flags ── */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Scam Indicators</div>
        <ul className="vsim-warning-list">
          <li>SEBI badge is fake — SEBI never certifies Telegram groups</li>
          <li>Profit screenshots are unverifiable fabrications</li>
          <li>Admin DMs with unsolicited "VIP" investment offers</li>
          <li>Domain "{fakeDomain}" — not listed on sebi.gov.in</li>
          <li>Guaranteed returns are illegal under Indian securities law</li>
        </ul>
      </div>
    </div>
  )
}