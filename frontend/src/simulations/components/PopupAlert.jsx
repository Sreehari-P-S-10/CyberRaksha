/**
 * components/PopupAlert.jsx
 *
 * BrowserWithPopupEnv — full tech support scam experience:
 *   Phase browsing : Realistic browser window with news article
 *   Phase popup    : Large, alarming fake virus alert with scan animation
 *   Phase calling  : Phone call UI (unchanged)
 *   Phase closed   : Confirmation message
 *
 * onInteract events:
 *   'closed_tab'       — user closed browser without calling (good)
 *   'call_ended_good'  — user hung up / refused during call (good)
 *   'scam_complete'    — user gave remote access (bad)
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ─── Web Audio helpers ─── */
function playTone(freq, duration, type = 'sine', vol = 0.06) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.frequency.value = freq; osc.type = type
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + duration)
  } catch (_) {}
}

function playAlarmSound() {
  // Three rapid beeps — classic Windows alert pattern
  [0, 0.22, 0.44].forEach(offset => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.frequency.value = 960; osc.type = 'square'
      gain.gain.setValueAtTime(0, ctx.currentTime + offset)
      gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + offset + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.2)
      osc.start(ctx.currentTime + offset); osc.stop(ctx.currentTime + offset + 0.22)
    } catch (_) {}
  })
}

function playRingtone() {
  [0, 0.35].forEach(offset => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.frequency.value = 480; osc.type = 'sine'
      gain.gain.setValueAtTime(0, ctx.currentTime + offset)
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + offset + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.28)
      osc.start(ctx.currentTime + offset); osc.stop(ctx.currentTime + offset + 0.3)
    } catch (_) {}
  })
}

/* ─── Scan file paths that cycle during the fake scan ─── */
const SCAN_PATHS = [
  'Scanning C:\\Windows\\System32\\drivers...',
  'Scanning C:\\Users\\AppData\\Roaming...',
  'Scanning browser saved passwords...',
  'Scanning C:\\Program Files\\...',
  'Scanning banking credential files...',
  'Scanning C:\\Windows\\Temp\\...',
  'Scanning email & contact data...',
  'Scanning C:\\Users\\Documents\\...',
  'Scanning network configuration...',
  'Scanning stored payment data...',
]

/* ─── Conversation script (unchanged) ─── */
const SCRIPT = {
  0: {
    scammer: 'Hello, thank you for calling Microsoft Technical Support. My name is David Wilson. Can I get your name please?',
    choices: [
      { id: 'a', text: "Hi, I'm Priya. My screen showed a virus warning.", next: 1 },
      { id: 'b', text: 'How did you know my computer has a problem?', next: 'sus1' },
      { id: 'c', text: 'Wait — I called YOU. How does Microsoft know my number?', next: 'hangup_early', isGood: true },
    ],
  },
  1: {
    scammer: 'Yes Priya, we have been detecting critical errors from your IP address for the last 24 hours. Your system is sending us error reports — Trojans, spyware. This is very serious. Are you in front of your computer right now?',
    choices: [
      { id: 'a', text: "Yes, I'm here.", next: 2 },
      { id: 'b', text: "How exactly can you detect errors from my IP? That doesn't sound right.", next: 'sus2' },
      { id: 'c', text: 'This sounds like a scam. Goodbye.', next: 'hangup_mid', isGood: true },
    ],
  },
  2: {
    scammer: 'Good. Press Windows key + R together, type "eventvwr" and press Enter. This will show the errors Microsoft has been detecting on your system.',
    choices: [
      { id: 'a', text: "Okay, I've opened something called Event Viewer.", next: 3 },
      { id: 'b', text: 'Why do you need me to run programs?', next: 'sus2' },
      { id: 'c', text: "I'm not running anything. Goodbye.", next: 'hangup_mid', isGood: true },
    ],
  },
  3: {
    scammer: "Yes, can you see the red and yellow warning symbols? Every single one is a virus. Your banking passwords, photos, everything is at risk. But don't worry — I can fix this remotely in about 10 minutes.",
    choices: [
      { id: 'a', text: 'Yes I see warnings. Please fix it.', next: 4 },
      { id: 'b', text: 'Wait — Event Viewer always shows warnings. That is completely normal.', next: 'sus2' },
      { id: 'c', text: "This doesn't feel right. Hanging up now.", next: 'hangup_mid', isGood: true },
    ],
  },
  4: {
    scammer: 'To fix this remotely, I need you to download a small tool called AnyDesk. It lets us connect to your computer to remove the viruses. Go to anydesk.com and download it now. It is completely safe — all Microsoft technicians use it.',
    choices: [
      { id: 'a', text: "Okay, I'm downloading AnyDesk now.", next: 'scam_done', isBad: true },
      { id: 'b', text: "I'm not giving remote access to a stranger I called from a popup. Goodbye.", next: 'hangup_late', isGood: true },
      { id: 'c', text: "Let me call Microsoft's official number to verify this first.", next: 'verify', isGood: true },
    ],
  },
  sus1: {
    scammer: 'Ma\'am, we receive automatic error reports from Windows — it is part of the Microsoft Error Reporting service. Your system has been flagged for 48 hours. This is very urgent, your data could be deleted at any time.',
    choices: [
      { id: 'a', text: 'Oh, that makes sense. What do I do?', next: 1 },
      { id: 'b', text: "Microsoft doesn't work that way. I'm hanging up.", next: 'hangup_early', isGood: true },
    ],
  },
  sus2: {
    scammer: 'Ma\'am I understand your concern. I have my Microsoft employee ID — MS-TEC-7734. Your computer is in serious danger. Every minute we wait, more data is at risk. Please trust me, I am here to help you.',
    choices: [
      { id: 'a', text: "Alright, I trust you. What's next?", next: 3 },
      { id: 'b', text: "Real Microsoft employees don't cold call people. Hanging up.", next: 'hangup_mid', isGood: true },
    ],
  },
  hangup_early:  { isTerminal: true, outcome: 'good', message: "You caught it immediately. The scammer called back twice — you didn't answer." },
  hangup_mid:    { isTerminal: true, outcome: 'good', message: 'You ended the call. Good instinct. The scammer tried to call back — you ignored it.' },
  hangup_late:   { isTerminal: true, outcome: 'good', message: "You refused to install AnyDesk and hung up. This was the critical moment — the scammer's entire goal was remote access." },
  verify:        { isTerminal: true, outcome: 'good', message: "You called Microsoft's official helpline (1800-102-1100). They confirmed: Microsoft never initiated any call to you. The popup number was blacklisted." },
  scam_done:     { isTerminal: true, outcome: 'bad',  message: 'You gave remote access. The scammer spent 12 minutes on your computer, navigated to your net banking site, and transferred ₹42,000 before you realised.' },
}

/* ════════════════════════════════════════════════
   PHONE CALL UI  (unchanged)
════════════════════════════════════════════════ */
function PhoneCallUI({ phone, onCallEnd }) {
  const [callState, setCallState] = useState('ringing')
  const [nodeKey, setNodeKey]     = useState(0)
  const [secs, setSecs]           = useState(0)
  const [muted, setMuted]         = useState(false)
  const [speaker, setSpeaker]     = useState(false)
  const [typing, setTyping]       = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [outcome, setOutcome]     = useState(null)
  const timerRef = useRef(null)
  const node = SCRIPT[nodeKey]

  useEffect(() => {
    if (callState !== 'ringing') return
    playRingtone()
    const t1 = setTimeout(() => playRingtone(), 1300)
    const t2 = setTimeout(() => { playTone(880, 0.12); setCallState('connected') }, 2700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [callState])

  useEffect(() => {
    if (callState !== 'connected') return
    timerRef.current = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [callState])

  useEffect(() => {
    if (callState !== 'connected' || !node || node.isTerminal) return
    setShowChoices(false); setTyping(true)
    const t = setTimeout(() => { setTyping(false); setShowChoices(true) }, 1600 + Math.random() * 700)
    return () => clearTimeout(t)
  }, [nodeKey, callState])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  function choose(c) {
    if (!showChoices) return
    setShowChoices(false)
    const terminal = SCRIPT[c.next]
    if (terminal?.isTerminal) {
      clearInterval(timerRef.current)
      playTone(440, 0.3)
      setTimeout(() => { setCallState('ended'); setOutcome(terminal); onCallEnd(terminal.outcome === 'good' ? 'call_ended_good' : 'scam_complete') }, 500)
    } else { setNodeKey(c.next) }
  }

  function hangUp() {
    clearInterval(timerRef.current); playTone(440, 0.3)
    setCallState('ended'); setOutcome({ outcome: 'good', message: 'You ended the call.' })
    onCallEnd('call_ended_good')
  }

  if (callState === 'ended' && outcome) {
    return (
      <div style={{ background: '#0d0d0d', borderRadius: 28, maxWidth: 310, margin: '0 auto', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>{outcome.outcome === 'good' ? '📵' : '😨'}</div>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>Call ended · {fmt(secs)}</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.65, padding: '14px 16px', borderRadius: 10, background: outcome.outcome === 'good' ? 'rgba(46,184,122,0.1)' : 'rgba(201,78,78,0.1)', border: `1px solid ${outcome.outcome === 'good' ? 'rgba(46,184,122,0.3)' : 'rgba(201,78,78,0.3)'}`, color: outcome.outcome === 'good' ? '#2EB87A' : '#C94E4E' }}>
            {outcome.message}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0d0d0d', borderRadius: 28, maxWidth: 310, margin: '0 auto', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 4px', fontSize: 11, color: '#666' }}>
        <span>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        <span>●●● 🔋</span>
      </div>
      <div style={{ textAlign: 'center', padding: '16px 20px 12px' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', margin: '0 auto 10px', background: callState === 'ringing' ? 'linear-gradient(135deg,#1a7f3c,#0d5c2b)' : 'linear-gradient(135deg,#1a3f7f,#0d2b5c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, animation: callState === 'ringing' ? 'phone-pulse 1s ease-in-out infinite' : 'none' }}>🧑‍💼</div>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 3 }}>Microsoft Support</div>
        <div style={{ fontSize: 11.5, color: '#666', marginBottom: 4 }}>{phone}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: callState === 'ringing' ? '#f4a261' : '#2EB87A' }}>{callState === 'ringing' ? '📳 Calling...' : `● Connected · ${fmt(secs)}`}</div>
      </div>
      {callState === 'connected' && (
        <div style={{ padding: '0 14px 8px', minHeight: 90 }}>
          {typing && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 13px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', animation: 'vsim-slide-up 0.3s ease' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
              </div>
              <span style={{ fontSize: 11, color: '#777' }}>David Wilson is speaking...</span>
            </div>
          )}
          {showChoices && node && !node.isTerminal && (
            <div style={{ animation: 'vsim-slide-up 0.3s ease' }}>
              <div style={{ padding: '10px 13px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div style={{ fontSize: 10.5, color: '#777', marginBottom: 4 }}>🎙 David Wilson (scammer):</div>
                <div style={{ fontSize: 13, color: '#ddd', lineHeight: 1.55 }}>"{node.scammer}"</div>
              </div>
              <div style={{ fontSize: 10.5, color: '#777', marginBottom: 5, paddingLeft: 2 }}>Your response:</div>
              {node.choices.map(c => (
                <button key={c.id} onClick={() => choose(c)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 13px', marginBottom: 5, borderRadius: 9, background: c.isGood ? 'rgba(46,184,122,0.1)' : c.isBad ? 'rgba(201,78,78,0.08)' : 'rgba(255,255,255,0.06)', border: `1px solid ${c.isGood ? 'rgba(46,184,122,0.3)' : c.isBad ? 'rgba(201,78,78,0.25)' : 'rgba(255,255,255,0.1)'}`, color: c.isGood ? '#2EB87A' : c.isBad ? '#ef9a9a' : '#ccc', fontSize: 12.5, cursor: 'pointer' }}>
                  {c.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '4px 22px 12px' }}>
        {[
          { icon: muted ? '🔇' : '🎤', label: muted ? 'Unmute' : 'Mute', action: () => setMuted(m => !m), on: muted },
          { icon: speaker ? '🔊' : '🔈', label: 'Speaker', action: () => setSpeaker(s => !s), on: speaker },
          { icon: '⌨️', label: 'Keypad', action: () => {}, on: false },
        ].map(b => (
          <div key={b.label} style={{ textAlign: 'center' }}>
            <button onClick={b.action} style={{ width: 48, height: 48, borderRadius: '50%', border: 'none', background: b.on ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px' }}>{b.icon}</button>
            <div style={{ fontSize: 10, color: '#777' }}>{b.label}</div>
          </div>
        ))}
      </div>
      {callState === 'connected' && (
        <div style={{ textAlign: 'center', paddingBottom: 24 }}>
          <button onClick={hangUp} style={{ width: 60, height: 60, borderRadius: '50%', border: 'none', background: '#d32f2f', fontSize: 24, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(211,47,47,0.45)' }}>📵</button>
          <div style={{ fontSize: 10, color: '#777', marginTop: 5 }}>End call</div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════
   REALISTIC BROWSER WINDOW
════════════════════════════════════════════════ */
function BrowserWindow({ url, articleTitle, blurred = false }) {
  const tabs = [
    { title: articleTitle, active: true },
    { title: 'Gmail - Inbox', active: false },
    { title: 'YouTube', active: false },
  ]
  return (
    <div style={{
      background: '#1e1e1e',
      borderRadius: '10px 10px 0 0',
      border: '1px solid rgba(255,255,255,0.12)',
      overflow: 'hidden',
      filter: blurred ? 'blur(3px)' : 'none',
      opacity: blurred ? 0.3 : 1,
      transition: 'filter 0.3s, opacity 0.3s',
      userSelect: blurred ? 'none' : 'auto',
    }}>
      {/* Chrome bar */}
      <div style={{ background: '#2d2d2d', padding: '8px 12px 0' }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {tabs.map((tab, i) => (
            <div key={i} style={{
              padding: '6px 14px 5px',
              borderRadius: '6px 6px 0 0',
              background: tab.active ? '#3c3c3c' : 'transparent',
              fontSize: 11,
              color: tab.active ? '#e0e0e0' : '#888',
              maxWidth: 140,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'default',
              borderTop: tab.active ? '1px solid rgba(255,255,255,0.1)' : 'none',
              borderLeft: tab.active ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderRight: tab.active ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              {i === 0 && <span style={{ marginRight: 5 }}>📰</span>}
              {i === 1 && <span style={{ marginRight: 5 }}>✉️</span>}
              {i === 2 && <span style={{ marginRight: 5 }}>▶️</span>}
              {tab.title}
            </div>
          ))}
          <div style={{ padding: '4px 8px', color: '#666', fontSize: 14, cursor: 'default' }}>+</div>
        </div>
      </div>
      {/* Address bar row */}
      <div style={{ background: '#3c3c3c', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Nav buttons */}
        {['←','→','↻'].map((btn,i) => (
          <button key={i} style={{ background: 'none', border: 'none', color: i < 2 ? '#666' : '#aaa', fontSize: 13, cursor: 'default', padding: '2px 4px', borderRadius: 3 }}>{btn}</button>
        ))}
        {/* URL bar */}
        <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 16, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 7, border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: 11, color: '#4caf50' }}>🔒</span>
          <span style={{ fontSize: 11.5, color: '#aaa', letterSpacing: 0.01 }}>{url}</span>
        </div>
        {/* Toolbar icons */}
        <div style={{ display: 'flex', gap: 8, color: '#666', fontSize: 14 }}>
          <span style={{ cursor: 'default' }}>⭐</span>
          <span style={{ cursor: 'default' }}>⋮</span>
        </div>
      </div>
      {/* Page content */}
      <div style={{ background: '#fff', padding: '16px 20px', minHeight: 160 }}>
        {/* Site header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '2px solid #1a237e', marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1a237e', letterSpacing: -0.3 }}>IndiaTimesNews</div>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#555' }}>
            {['Home','India','World','Business','Tech'].map(n => (
              <span key={n} style={{ cursor: 'default', fontWeight: n === 'Tech' ? 700 : 400, color: n === 'Tech' ? '#1a237e' : '#555' }}>{n}</span>
            ))}
          </div>
        </div>
        {/* Article */}
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#e53935', fontWeight: 700, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Technology</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: 8 }}>{articleTitle}</div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>March 14, 2026 · 3 min read</div>
            {['India\'s digital economy expanded by 15% in the financial year 2024–25, driven largely by a surge in smartphone adoption across semi-urban regions.',
              'UPI transaction volumes crossed 15 billion monthly, with tier-2 and tier-3 cities contributing nearly 40% of all new digital payment users.',
              'Analysts say the next phase of growth will be led by rural credit access and ONDC-based commerce platforms.',
            ].map((line, i) => (
              <div key={i} style={{ fontSize: 12, color: '#333', lineHeight: 1.65, marginBottom: 8 }}>{line}</div>
            ))}
          </div>
          {/* Fake sidebar ad */}
          <div style={{ width: 80, flexShrink: 0 }}>
            <div style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 4, padding: '8px 6px', fontSize: 9, color: '#999', textAlign: 'center' }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>📱</div>
              Advertisement
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   VIRUS ALERT POPUP
════════════════════════════════════════════════ */
function VirusPopup({ threats, phone, scanProgress, scanPath, onCall, onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(0,0,0,0.72)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10,
      animation: 'popup-appear 0.35s cubic-bezier(.22,1,.36,1)',
    }}>
      <div style={{
        width: '88%',
        background: '#fff',
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 2px rgba(229,57,53,0.7)',
        animation: 'alert-pulse-border 1.6s ease-in-out infinite',
      }}>
        {/* Red banner */}
        <div style={{
          background: 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 20 }}>🛡️</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              ⚠ Microsoft Security Warning
            </div>
            <div style={{ fontSize: 10.5, color: '#ffcdd2', marginTop: 2 }}>
              Windows Defender Real-Time Protection · System Alert
            </div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.5)', cursor: 'default' }}>✕</div>
        </div>

        {/* Body */}
        <div style={{ padding: '14px 18px', background: '#fff' }}>
          {/* Main warning */}
          <div style={{
            background: '#fff3cd', border: '1px solid #f59e0b',
            borderLeft: '4px solid #d32f2f',
            borderRadius: 4, padding: '10px 14px', marginBottom: 12,
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#b71c1c', marginBottom: 4 }}>
              Your computer is infected with multiple threats!
            </div>
            <div style={{ fontSize: 12, color: '#7f1d1d', lineHeight: 1.5 }}>
              <strong>{threats.length} critical infections detected.</strong> Your personal data, banking credentials, and passwords are at risk of being stolen.
            </div>
          </div>

          {/* Threat list */}
          <div style={{ background: '#fafafa', border: '1px solid #e0e0e0', borderRadius: 4, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ background: '#f5f5f5', padding: '6px 12px', borderBottom: '1px solid #e0e0e0', fontSize: 10.5, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 0.4 }}>
              Threats Detected
            </div>
            {threats.map((t, i) => (
              <div key={i} style={{ padding: '6px 12px', borderBottom: i < threats.length - 1 ? '1px solid #eee' : 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, color: '#d32f2f', fontWeight: 700 }}>●</span>
                <span style={{ fontSize: 11.5, color: '#333', fontFamily: 'monospace' }}>{t}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, background: '#ffebee', color: '#c62828', padding: '1px 6px', borderRadius: 3, fontWeight: 700 }}>CRITICAL</span>
              </div>
            ))}
          </div>

          {/* Scan animation */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#555', marginBottom: 4 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#d32f2f' }}>{scanPath}</span>
              <span style={{ fontWeight: 700, color: '#d32f2f' }}>{scanProgress}%</span>
            </div>
            <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden', border: '1px solid #ddd' }}>
              <div style={{
                height: '100%',
                width: `${scanProgress}%`,
                background: 'linear-gradient(90deg, #d32f2f, #ff5722)',
                borderRadius: 4,
                transition: 'width 0.3s linear',
              }} />
            </div>
          </div>

          {/* Pressure text */}
          <div style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: 4, padding: '8px 12px', marginBottom: 14 }}>
            {[
              '⚠ Do NOT close this page.',
              '⚠ Your computer access may be disabled to prevent further damage.',
              '⚠ Immediate assistance required.',
            ].map((msg, i) => (
              <div key={i} style={{ fontSize: 11.5, color: '#c62828', fontWeight: 600, marginBottom: i < 2 ? 4 : 0 }}>
                {msg}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onCall}
            style={{
              width: '100%', padding: '14px 16px',
              background: 'linear-gradient(135deg, #c62828, #e53935)',
              border: 'none', borderRadius: 5, cursor: 'pointer',
              animation: 'btn-pulse 1.8s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.6 }}>
              📞 Call Microsoft Security Support Now
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 3, letterSpacing: 1 }}>
              {phone}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
              Toll Free · Available 24/7 · Certified Microsoft Technicians
            </div>
          </button>

          {/* Small close option */}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 11, color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}>
              Close this window (not recommended)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   BROWSER WITH POPUP — main export
════════════════════════════════════════════════ */
export function BrowserWithPopupEnv({ envProps, onInteract }) {
  const {
    normalUrl    = 'indiatimes.com/technology/news',
    articleTitle = "India's Digital Economy Grows 15% in 2024",
    popupDelayMs = 3500,
    popupPhone   = '1800-XXX-4821',
    popupThreats = ['Trojan.GenericKD.45812', 'Spyware.BankCapture.v3', 'Rootkit.HiddenAccess.sys'],
  } = envProps

  const [phase, setPhase]             = useState('browsing')
  const [scanProgress, setScanProgress] = useState(0)
  const [scanPathIdx, setScanPathIdx]   = useState(0)
  const [shaking, setShaking]           = useState(false)

  // Trigger popup after delay
  useEffect(() => {
    if (phase !== 'browsing') return
    const t = setTimeout(() => {
      setPhase('popup')
      playAlarmSound()
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
    }, popupDelayMs)
    return () => clearTimeout(t)
  }, [phase, popupDelayMs])

  // Scan progress — gradual increase, realistic speed
  useEffect(() => {
    if (phase !== 'popup') return
    const progress = setInterval(() => {
      setScanProgress(p => {
        if (p >= 97) return 97  // stops at 97 — never finishes (keeping victim on page)
        // Slow down as it approaches higher values to feel more "real"
        const increment = p < 30 ? 1.2 : p < 60 ? 0.7 : p < 85 ? 0.4 : 0.15
        return Math.min(97, p + increment)
      })
    }, 120)
    // Cycle file paths every 2.2s
    const paths = setInterval(() => {
      setScanPathIdx(i => (i + 1) % SCAN_PATHS.length)
    }, 2200)
    return () => { clearInterval(progress); clearInterval(paths) }
  }, [phase])

  const shakeStyle = shaking ? { animation: 'screen-shake 0.5s ease' } : {}

  return (
    <div className="vsim-root">
      <style>{`
        @keyframes phone-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(26,127,60,0.4)}
          50%{box-shadow:0 0 0 14px rgba(26,127,60,0)}
        }
        @keyframes bounce {
          0%,60%,100%{transform:translateY(0)}
          30%{transform:translateY(-4px)}
        }
        @keyframes popup-appear {
          0%  { opacity:0; transform:scale(0.92) }
          100%{ opacity:1; transform:scale(1) }
        }
        @keyframes alert-pulse-border {
          0%,100%{ box-shadow:0 24px 80px rgba(0,0,0,0.7), 0 0 0 2px rgba(229,57,53,0.5) }
          50%    { box-shadow:0 24px 80px rgba(0,0,0,0.7), 0 0 0 3px rgba(229,57,53,1) }
        }
        @keyframes btn-pulse {
          0%,100%{ opacity:1; transform:scale(1) }
          50%    { opacity:0.9; transform:scale(1.015) }
        }
        @keyframes screen-shake {
          0%  { transform:translateX(0) }
          15% { transform:translateX(-6px) }
          30% { transform:translateX(6px) }
          45% { transform:translateX(-4px) }
          60% { transform:translateX(4px) }
          75% { transform:translateX(-2px) }
          100%{ transform:translateX(0) }
        }
      `}</style>

      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={phase === 'popup' || phase === 'calling' ? { background: '#e53935' } : {}} />
        {phase === 'browsing' && 'Your browser — reading the news'}
        {phase === 'popup'    && '🚨 Fake security alert has taken over your screen'}
        {phase === 'calling'  && '📞 You called the number from the popup'}
        {phase === 'closed'   && '✅ You closed the tab'}
      </div>

      {/* BROWSING */}
      {phase === 'browsing' && (
        <>
          <BrowserWindow url={normalUrl} articleTitle={articleTitle} />
          <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-3)', fontFamily: 'var(--mono)', marginTop: 6 }}>
            ⏳ You're reading the news... something will happen shortly
          </div>
        </>
      )}

      {/* POPUP */}
      {phase === 'popup' && (
        <div style={{ position: 'relative', ...shakeStyle }}>
          <BrowserWindow url={normalUrl} articleTitle={articleTitle} blurred />
          <VirusPopup
            threats={popupThreats}
            phone={popupPhone}
            scanProgress={Math.round(scanProgress)}
            scanPath={SCAN_PATHS[scanPathIdx]}
            onCall={() => setPhase('calling')}
            onClose={() => { setPhase('closed'); onInteract('closed_tab') }}
          />
        </div>
      )}

      {/* CALLING */}
      {phase === 'calling' && (
        <div style={{ animation: 'vsim-slide-up 0.4s ease' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center', marginBottom: 14, fontFamily: 'var(--mono)' }}>
            You dialled the number from the popup
          </div>
          <PhoneCallUI phone={popupPhone} onCallEnd={result => onInteract(result)} />
        </div>
      )}

      {/* CLOSED */}
      {phase === 'closed' && (
        <div style={{ padding: '16px 18px', borderRadius: 10, background: 'rgba(46,184,122,0.08)', border: '1px solid rgba(46,184,122,0.3)', fontSize: 14, color: '#2EB87A', lineHeight: 1.65, animation: 'vsim-slide-up 0.3s ease' }}>
          ✅ Browser tab closed. The popup vanished instantly — your computer was never infected. The alarm, the scan bar, the threat list — all JavaScript running inside a webpage. Real security software never shows phone numbers inside a browser window.
        </div>
      )}
    </div>
  )
}