/**
 * components/RansomwareUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Ransomware simulations.
 *
 * Environments exported:
 *   RansomwareDesktopEnv  — Fake Windows desktop with file encryption
 *                           and ransom note (Professional scenario)
 *   RansomwareMobileEnv   — Fake Android screen-locker ransomware
 *                           with police notice (Elderly scenario)
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ── SVG icons (inline, no emoji) ── */
const icons = {
  folder: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f0c36d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </svg>
  ),
  file: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7eb8da" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  image: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7eda9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C94E4E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  wifi: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  monitor: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  alertTriangle: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C94E4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
}

/* ── Desktop file data ── */
const DESKTOP_FILES = [
  { name: 'Documents', icon: 'folder', type: 'folder' },
  { name: 'Photos', icon: 'folder', type: 'folder' },
  { name: 'Budget_Q4.xlsx', icon: 'file', type: 'file' },
  { name: 'Presentation.pptx', icon: 'file', type: 'file' },
  { name: 'Family_Photo.jpg', icon: 'image', type: 'image' },
  { name: 'Project_Report.docx', icon: 'file', type: 'file' },
  { name: 'Backup_Data', icon: 'folder', type: 'folder' },
  { name: 'Tax_Returns_2025.pdf', icon: 'file', type: 'file' },
  { name: 'Holiday_Pics', icon: 'folder', type: 'folder' },
]

/* ══════════════════════════════════════════════════════════
   RansomwareDesktopEnv
   Simulates a Windows desktop where files get encrypted
   one by one, wallpaper changes to ransom note.
══════════════════════════════════════════════════════════ */
export function RansomwareDesktopEnv({ envProps, onInteract }) {
  const {
    encryptDelayMs  = 2500,
    ransomBtc       = '0.5 BTC',
    ransomWallet    = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    countdownHours  = 47,
    attackerEmail   = 'decrypt0r@protonmail.ch',
  } = envProps

  const [phase, setPhase]             = useState('desktop')  // desktop | encrypting | ransom
  const [encryptedIdx, setEncryptedIdx] = useState(-1)
  const [interacted, setInteracted]   = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [countdown, setCountdown]     = useState(countdownHours * 3600)
  const timerRef = useRef(null)

  // After user clicks a file, start encryption sequence
  function handleFileClick(idx) {
    if (phase !== 'desktop') return
    setSelectedFile(idx)
    setTimeout(() => {
      setPhase('encrypting')
      setEncryptedIdx(0)
    }, 800)
  }

  // Encrypt files one by one
  useEffect(() => {
    if (phase !== 'encrypting') return
    if (encryptedIdx >= DESKTOP_FILES.length) {
      setTimeout(() => setPhase('ransom'), 600)
      return
    }
    const t = setTimeout(() => {
      setEncryptedIdx(i => i + 1)
    }, encryptDelayMs / DESKTOP_FILES.length)
    return () => clearTimeout(t)
  }, [phase, encryptedIdx, encryptDelayMs])

  // Countdown timer in ransom phase
  useEffect(() => {
    if (phase !== 'ransom') return
    timerRef.current = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  function fmtCountdown(s) {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }

  function handleAction(action) {
    if (interacted) return
    setInteracted(true)
    clearInterval(timerRef.current)
    onInteract(action)
  }

  const isEncrypted = (idx) => phase !== 'desktop' && idx <= encryptedIdx
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={phase !== 'desktop' ? { background: '#C94E4E' } : {}} />
        {phase === 'desktop' && 'Your work computer — Windows Desktop'}
        {phase === 'encrypting' && 'Files are being encrypted...'}
        {phase === 'ransom' && 'Ransom note has appeared'}
      </div>

      {/* Windows Desktop */}
      <div style={{
        background: phase === 'ransom' ? '#1a0000' : phase === 'encrypting' ? '#1a1520' : '#0a2647',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        fontFamily: '"Segoe UI", -apple-system, sans-serif',
        transition: 'background 1.2s ease',
        position: 'relative',
      }}>

        {/* Desktop area */}
        <div style={{
          minHeight: 340,
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 80px)',
          gridAutoRows: 95,
          gap: 8,
          alignContent: 'start',
          position: 'relative',
        }}>
          {DESKTOP_FILES.map((file, idx) => {
            const encrypted = isEncrypted(idx)
            const isBeingEncrypted = phase === 'encrypting' && idx === encryptedIdx
            return (
              <div
                key={idx}
                onClick={() => handleFileClick(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 4px',
                  borderRadius: 4,
                  cursor: phase === 'desktop' ? 'pointer' : 'default',
                  background: selectedFile === idx && phase === 'desktop'
                    ? 'rgba(255,255,255,0.1)'
                    : encrypted
                      ? 'rgba(201,78,78,0.08)'
                      : 'transparent',
                  border: selectedFile === idx && phase === 'desktop'
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid transparent',
                  transition: 'all 0.3s',
                  opacity: isBeingEncrypted ? 0.6 : 1,
                  animation: isBeingEncrypted ? 'encrypt-flash 0.5s ease' : 'none',
                  position: 'relative',
                }}
              >
                {/* Icon */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    opacity: encrypted ? 0.35 : 1,
                    filter: encrypted ? 'grayscale(1)' : 'none',
                    transition: 'all 0.4s',
                  }}>
                    {icons[file.icon]}
                  </div>
                  {/* Lock overlay */}
                  {encrypted && (
                    <div style={{
                      position: 'absolute', top: -2, right: -6,
                      animation: 'vsim-slide-up 0.3s ease',
                    }}>
                      {icons.lock}
                    </div>
                  )}
                </div>
                {/* Filename */}
                <div style={{
                  fontSize: 10.5,
                  color: encrypted ? '#C94E4E' : '#fff',
                  textAlign: 'center',
                  wordBreak: 'break-all',
                  lineHeight: 1.25,
                  maxWidth: 75,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}>
                  {encrypted ? file.name.replace(/\.[^.]+$/, '.locked') : file.name}
                </div>
              </div>
            )
          })}

          {/* Encryption progress overlay */}
          {phase === 'encrypting' && (
            <div style={{
              position: 'absolute',
              bottom: 16, left: 20, right: 20,
              background: 'rgba(0,0,0,0.85)',
              borderRadius: 8,
              padding: '12px 16px',
              border: '1px solid rgba(201,78,78,0.4)',
              animation: 'vsim-slide-up 0.35s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {icons.shield}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#C94E4E' }}>
                    Encrypting your files...
                  </div>
                  <div style={{ fontSize: 10, color: '#888' }}>
                    {Math.min(encryptedIdx + 1, DESKTOP_FILES.length)}/{DESKTOP_FILES.length} files encrypted
                  </div>
                </div>
              </div>
              <div style={{ height: 4, background: '#333', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, ((encryptedIdx + 1) / DESKTOP_FILES.length) * 100)}%`,
                  background: 'linear-gradient(90deg, #C94E4E, #ff6b6b)',
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
          )}

          {/* Ransom note popup */}
          {phase === 'ransom' && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              animation: 'popup-appear 0.4s cubic-bezier(.22,1,.36,1)',
              zIndex: 10,
            }}>
              <div style={{
                background: '#1a1a1a',
                border: '2px solid #C94E4E',
                borderRadius: 8,
                width: '100%',
                maxWidth: 440,
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(201,78,78,0.3)',
              }}>
                {/* Ransom header */}
                <div style={{
                  background: 'linear-gradient(135deg, #7f0000, #b71c1c)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  {icons.alertTriangle}
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
                      YOUR FILES HAVE BEEN ENCRYPTED
                    </div>
                    <div style={{ fontSize: 11, color: '#ffcdd2', marginTop: 2 }}>
                      CryptoLocker v3.1 — All your data is locked
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px 18px' }}>
                  {/* Timer */}
                  <div style={{
                    background: '#0d0d0d',
                    border: '1px solid rgba(201,78,78,0.3)',
                    borderRadius: 6,
                    padding: '10px 14px',
                    textAlign: 'center',
                    marginBottom: 14,
                  }}>
                    <div style={{ fontSize: 10, color: '#C94E4E', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                      Time remaining before permanent deletion
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#ff4444', fontFamily: 'var(--mono)' }}>
                      {fmtCountdown(countdown)}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ fontSize: 12.5, color: '#ccc', lineHeight: 1.65, marginBottom: 14 }}>
                    All your documents, photos, databases, and other important files have been encrypted with strongest encryption. The only way to recover your files is to purchase a unique private key. Any attempt to remove this software will result in permanent data loss.
                  </div>

                  {/* Payment details */}
                  <div style={{
                    background: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6,
                    padding: '12px 14px',
                    marginBottom: 14,
                  }}>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>Payment required:</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#ff6b6b', marginBottom: 8 }}>
                      {ransomBtc}
                    </div>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Send to Bitcoin wallet:</div>
                    <div style={{
                      fontSize: 10, color: '#aaa', fontFamily: 'var(--mono)',
                      wordBreak: 'break-all', background: '#111',
                      padding: '6px 8px', borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      {ransomWallet}
                    </div>
                    <div style={{ fontSize: 10, color: '#666', marginTop: 6 }}>
                      Contact: {attackerEmail}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button
                      onClick={() => handleAction('paid_ransom')}
                      disabled={interacted}
                      style={{
                        width: '100%', padding: '11px',
                        background: interacted ? '#333' : 'linear-gradient(135deg, #b71c1c, #d32f2f)',
                        border: 'none', borderRadius: 6,
                        color: '#fff', fontSize: 13, fontWeight: 700,
                        cursor: interacted ? 'default' : 'pointer',
                        opacity: interacted ? 0.5 : 1,
                      }}
                    >
                      Pay {ransomBtc} to recover files
                    </button>
                    <button
                      onClick={() => handleAction('disconnected_network')}
                      disabled={interacted}
                      style={{
                        width: '100%', padding: '11px',
                        background: interacted ? '#222' : 'rgba(46,184,122,0.1)',
                        border: `1px solid ${interacted ? '#333' : 'rgba(46,184,122,0.35)'}`,
                        borderRadius: 6,
                        color: interacted ? '#555' : '#2EB87A',
                        fontSize: 13, fontWeight: 600,
                        cursor: interacted ? 'default' : 'pointer',
                      }}
                    >
                      Disconnect from network immediately
                    </button>
                    <button
                      onClick={() => handleAction('restarted_computer')}
                      disabled={interacted}
                      style={{
                        width: '100%', padding: '11px',
                        background: 'transparent',
                        border: `1px solid ${interacted ? '#222' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: 6,
                        color: interacted ? '#444' : 'rgba(255,255,255,0.5)',
                        fontSize: 13, fontWeight: 500,
                        cursor: interacted ? 'default' : 'pointer',
                      }}
                    >
                      Restart the computer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Taskbar */}
        <div style={{
          background: phase === 'ransom' ? '#1a0505' : '#111',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Start button */}
            <div style={{
              width: 28, height: 28, borderRadius: 4,
              background: 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0078d4" stroke="none">
                <rect x="1" y="1" width="10" height="10" rx="1"/>
                <rect x="13" y="1" width="10" height="10" rx="1"/>
                <rect x="1" y="13" width="10" height="10" rx="1"/>
                <rect x="13" y="13" width="10" height="10" rx="1"/>
              </svg>
            </div>
            {/* Search bar */}
            <div style={{
              width: 140, height: 26, borderRadius: 4,
              background: 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center',
              padding: '0 8px', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span style={{ fontSize: 10.5, color: '#666' }}>Search</span>
            </div>
          </div>
          {/* System tray */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#999', fontSize: 11 }}>
            {icons.wifi}
            <span style={{ fontSize: 10.5 }}>{time}</span>
            <span style={{ fontSize: 10, color: '#666' }}>{date}</span>
          </div>
        </div>
      </div>

      {/* Prompt */}
      {phase === 'desktop' && (
        <div style={{
          textAlign: 'center', fontSize: 12.5, color: 'var(--text-3)',
          fontFamily: 'var(--mono)', marginTop: 6,
        }}>
          Click on any file to open it
        </div>
      )}

      <style>{`
        @keyframes encrypt-flash {
          0%   { background: transparent; }
          50%  { background: rgba(201,78,78,0.25); }
          100% { background: rgba(201,78,78,0.08); }
        }
        @keyframes popup-appear {
          0%   { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   RansomwareMobileEnv
   Simulates an Android phone screen-locker ransomware.
   Elderly scenario — fake police notice demanding payment.
══════════════════════════════════════════════════════════ */
export function RansomwareMobileEnv({ envProps, onInteract }) {
  const {
    fineAmount     = '5,000',
    agencyName     = 'Cyber Crime Investigation Bureau',
    warningTitle   = 'ILLEGAL ACTIVITY DETECTED',
    lockDelayMs    = 3000,
  } = envProps

  const [phase, setPhase]         = useState('normal')   // normal | locked
  const [interacted, setInteracted] = useState(false)
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  // Android app icons (SVG-based)
  const apps = [
    { name: 'Phone', color: '#4caf50', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.12 1.05.37 2.05.7 3.01a2 2 0 01-.45 2.11L6.09 9a16 16 0 006.91 6.91l1.16-1.16a2 2 0 012.11-.45c.96.33 1.96.58 3.01.7A2 2 0 0122 16.92z"/></svg> },
    { name: 'Messages', color: '#2196f3', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
    { name: 'Camera', color: '#607d8b', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg> },
    { name: 'Photos', color: '#ff7043', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
    { name: 'Settings', color: '#78909c', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> },
    { name: 'WhatsApp', color: '#25d366', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.86L0 24l6.336-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.72 9.72 0 01-5.24-1.527l-.375-.224-3.89 1.015 1.038-3.784-.247-.39A9.724 9.724 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z"/></svg> },
    { name: 'Calendar', color: '#29b6f6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { name: 'Chrome', color: '#ffc107', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg> },
  ]

  function handleAppClick() {
    if (phase !== 'normal') return
    setTimeout(() => setPhase('locked'), lockDelayMs)
  }

  function handleAction(action) {
    if (interacted) return
    setInteracted(true)
    onInteract(action)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={phase === 'locked' ? { background: '#C94E4E' } : {}} />
        {phase === 'normal' && 'Your Android phone — Home screen'}
        {phase === 'locked' && 'Your phone has been locked by ransomware'}
      </div>

      {/* Android phone frame */}
      <div style={{
        background: '#000',
        borderRadius: 28,
        maxWidth: 320,
        margin: '0 auto',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: phase === 'locked' ? '0 0 30px rgba(201,78,78,0.3)' : '0 20px 60px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.6s',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px 4px',
          fontSize: 11,
          color: phase === 'locked' ? '#C94E4E' : '#aaa',
        }}>
          <span>{time}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {icons.wifi}
            <span style={{ fontSize: 10 }}>85%</span>
          </div>
        </div>

        {/* Normal phone screen */}
        {phase === 'normal' && (
          <div style={{ padding: '24px 16px 20px' }}>
            {/* Date/time widget */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 38, fontWeight: 200, color: '#fff', letterSpacing: 2 }}>
                {time}
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* App grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              padding: '0 4px',
            }}>
              {apps.map((app, i) => (
                <div
                  key={i}
                  onClick={handleAppClick}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    background: app.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {app.icon}
                  </div>
                  <span style={{ fontSize: 10, color: '#ccc' }}>{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked screen — ransomware */}
        {phase === 'locked' && (
          <div style={{
            padding: '16px',
            background: 'linear-gradient(180deg, #1a0000 0%, #0d0d0d 100%)',
            minHeight: 380,
            animation: 'vsim-slide-up 0.4s ease',
          }}>
            {/* Fake police badge */}
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{
                width: 56, height: 56,
                background: 'rgba(201,78,78,0.15)',
                border: '2px solid #C94E4E',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
              }}>
                {icons.shield}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 800,
                color: '#C94E4E', letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}>
                {warningTitle}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
                {agencyName}
              </div>
            </div>

            {/* Warning message */}
            <div style={{
              background: 'rgba(201,78,78,0.08)',
              border: '1px solid rgba(201,78,78,0.25)',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 14,
            }}>
              <p style={{ fontSize: 12, color: '#ddd', lineHeight: 1.65, marginBottom: 8 }}>
                This device has been locked due to a violation of the laws of India (Article 161, 148, 215 of Criminal Code).
              </p>
              <p style={{ fontSize: 12, color: '#ddd', lineHeight: 1.65 }}>
                Your device has been used to visit websites containing prohibited content. To unlock your device, you must pay a fine within 24 hours.
              </p>
            </div>

            {/* Fine amount */}
            <div style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              padding: '10px',
              textAlign: 'center',
              marginBottom: 14,
            }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>Fine amount:</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#ff4444' }}>
                Rs. {fineAmount}
              </div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>
                Pay via UPI or gift card within 24 hours
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => handleAction('paid_fine')}
                disabled={interacted}
                style={{
                  width: '100%', padding: '11px',
                  background: interacted ? '#333' : '#C94E4E',
                  border: 'none', borderRadius: 8,
                  color: '#fff', fontSize: 13, fontWeight: 700,
                  cursor: interacted ? 'default' : 'pointer',
                  opacity: interacted ? 0.5 : 1,
                }}
              >
                Pay Fine Now
              </button>
              <button
                onClick={() => handleAction('force_restart')}
                disabled={interacted}
                style={{
                  width: '100%', padding: '11px',
                  background: interacted ? '#222' : 'rgba(46,184,122,0.1)',
                  border: `1px solid ${interacted ? '#333' : 'rgba(46,184,122,0.35)'}`,
                  borderRadius: 8,
                  color: interacted ? '#555' : '#2EB87A',
                  fontSize: 13, fontWeight: 600,
                  cursor: interacted ? 'default' : 'pointer',
                }}
              >
                Force restart the phone
              </button>
              <button
                onClick={() => handleAction('contacted_support')}
                disabled={interacted}
                style={{
                  width: '100%', padding: '11px',
                  background: 'transparent',
                  border: `1px solid ${interacted ? '#222' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 8,
                  color: interacted ? '#444' : 'rgba(255,255,255,0.5)',
                  fontSize: 13, fontWeight: 500,
                  cursor: interacted ? 'default' : 'pointer',
                }}
              >
                Contact a trusted person or service centre
              </button>
            </div>
          </div>
        )}

        {/* Android nav bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          padding: '10px 0 12px',
          background: phase === 'locked' ? '#0d0d0d' : '#000',
        }}>
          {['triangle', 'circle', 'square'].map((shape, i) => (
            <div key={i} style={{ opacity: 0.3 }}>
              {shape === 'triangle' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              )}
              {shape === 'circle' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
              )}
              {shape === 'square' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prompt */}
      {phase === 'normal' && (
        <div style={{
          textAlign: 'center', fontSize: 12.5, color: 'var(--text-3)',
          fontFamily: 'var(--mono)', marginTop: 8,
        }}>
          Tap on any app to use your phone
        </div>
      )}
    </div>
  )
}
