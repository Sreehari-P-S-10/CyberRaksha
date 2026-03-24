/**
 * components/AuthorityImpersonationUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Authority Impersonation simulations.
 *
 * Environments exported:
 *   OfficialEmailEnv      — A fake official government/agency email
 *   AuthorityCallEnv      — An incoming phone call from a "government official"
 *   FakeGovPortalEnv      — A spoofed government portal demanding payment
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════════════════
   OfficialEmailEnv
   Renders a convincing-looking official email from a
   spoofed authority (tax dept, TRAI, RBI, etc.)
══════════════════════════════════════════════════════════ */
export function OfficialEmailEnv({ envProps, onInteract }) {
  const {
    senderName     = 'Income Tax Department',
    senderEmail    = 'notice@incometax-efiling.gov.in.notices.cc',
    realDomain     = 'incometax.gov.in',
    subject        = 'URGENT: Tax Evasion Notice — Action Required Within 24 Hours',
    logoEmoji      = '🏛️',
    accentColor    = '#1a56db',
    bodyLines      = [],
    callToAction   = 'Pay Outstanding Tax Now',
    ctaUrl         = 'incometax-notice-payment.in',
    attachmentName = 'TaxNotice_Final.pdf',
    redFlags       = [],
  } = envProps

  const [expanded, setExpanded]     = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [hovered, setHovered]       = useState(null)

  function handleOpen() {
    if (interacted) return
    setExpanded(true)
  }

  function handleCTAClick() {
    if (interacted) return
    setInteracted(true)
    onInteract('clicked_link')
  }

  function handleAttachment() {
    if (interacted) return
    setInteracted(true)
    onInteract('opened_attachment')
  }

  function handleClose() {
    if (interacted) return
    setInteracted(true)
    onInteract('closed_without_action')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Your Email Inbox
      </div>

      {/* Email client chrome */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        {/* Top bar */}
        <div style={{
          background: '#2c2c2e',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, textAlign: 'center',
            fontSize: 13, color: '#aeaeb2', fontWeight: 500,
          }}>Inbox — Gmail</div>
        </div>

        {/* Email list row */}
        {!expanded && (
          <div
            onClick={handleOpen}
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'rgba(255,255,255,0.02)',
              transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
          >
            {/* Unread dot */}
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{senderName}</span>
                <span style={{ fontSize: 11, color: '#8e8e93' }}>09:14 AM</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#eee', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {subject}
              </div>
              <div style={{ fontSize: 12, color: '#8e8e93', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {bodyLines.length >= 2 ? `${bodyLines[0]} ${bodyLines[1]}...` : bodyLines[0] ? `${bodyLines[0]}...` : 'No preview available.'}
              </div>
            </div>
          </div>
        )}

        {/* Expanded email view */}
        {expanded && (
          <div style={{ padding: '20px 22px' }}>
            {/* Email header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>{logoEmoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{senderName}</div>
                    <div style={{ fontSize: 12, color: '#8e8e93' }}>
                      &lt;{senderEmail}&gt;
                    </div>
                    <div style={{ fontSize: 11, color: '#5a5a5e', marginTop: 2 }}>To: you@gmail.com</div>
                  </div>
                  <button
                    onClick={handleClose}
                    style={{ color: '#8e8e93', fontSize: 20, lineHeight: 1, padding: '0 4px', cursor: 'pointer', background: 'none', border: 'none' }}
                  >×</button>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div style={{
              fontSize: 17, fontWeight: 700, color: '#fff',
              marginBottom: 18, lineHeight: 1.3,
            }}>
              {subject}
            </div>

            {/* Body */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 8, padding: '16px 18px',
              borderLeft: `3px solid ${accentColor}`,
              marginBottom: 18,
            }}>
              {bodyLines.map((line, i) => (
                <p key={i} style={{
                  fontSize: 13.5, color: '#d1d1d6',
                  lineHeight: 1.65, marginBottom: i < bodyLines.length - 1 ? 12 : 0,
                }}>{line}</p>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ marginBottom: 16 }}>
              <button
                onClick={handleCTAClick}
                disabled={interacted}
                style={{
                  background: accentColor,
                  color: '#fff', border: 'none',
                  padding: '12px 24px', borderRadius: 8,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  marginBottom: 8,
                  opacity: interacted ? 0.5 : 1,
                  width: '100%',
                }}
              >{callToAction}</button>
              <div style={{ fontSize: 11, color: '#5a5a5e', textAlign: 'center' }}>
                Link goes to: {ctaUrl}
              </div>
            </div>

            {/* Attachment */}
            {attachmentName && (
              <div
                onClick={handleAttachment}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, cursor: interacted ? 'default' : 'pointer',
                  opacity: interacted ? 0.5 : 1,
                }}
              >
                <span style={{ fontSize: 22 }}>📎</span>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{attachmentName}</div>
                  <div style={{ fontSize: 11, color: '#8e8e93' }}>Tap to open</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prompt to open if not yet expanded */}
        {!expanded && (
          <div style={{
            padding: '12px 18px',
            textAlign: 'center',
            fontSize: 12, color: '#5a5a5e',
          }}>
            Tap the email above to open it
          </div>
        )}
      </div>

      {/* Red flag annotations (shown after email opens) */}
      {expanded && redFlags.length > 0 && (
        <div style={{
          background: 'rgba(201, 78, 78, 0.07)',
          border: '1px solid rgba(201, 78, 78, 0.25)',
          borderRadius: 10,
          padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 11, fontFamily: 'var(--mono)',
            color: '#C94E4E', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>⚠ Red Flags in This Email</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {redFlags.map((flag, i) => (
              <div key={i} style={{
                fontSize: 12.5, color: '#e8a8a8',
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <span style={{ color: '#C94E4E', flexShrink: 0 }}>→</span>
                {flag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   AuthorityCallEnv
   Simulates an incoming call from a spoofed "official" number.
   Shows caller ID, plays through a scripted call, and lets
   the user decide how to respond.
══════════════════════════════════════════════════════════ */
export function AuthorityCallEnv({ envProps, onInteract }) {
  const {
    callerName     = 'TRAI — Telecom Dept',
    callerNumber   = '+91 11-XXXX-4523',
    callerSubtitle = 'New Delhi, India',
    callerEmoji    = '📞',
    accentColor    = '#30b0c7',
    scriptLines    = [],
    delayPerLine   = 2400,
  } = envProps

  const [phase, setPhase]           = useState('ringing')   // ringing | answered | script | done
  const [scriptIdx, setScriptIdx]   = useState(0)
  const [visibleLines, setVisible]  = useState([])
  const [interacted, setInteracted] = useState(false)
  const [callDuration, setDuration] = useState(0)
  const timerRef = useRef(null)

  // advance script lines
  useEffect(() => {
    if (phase !== 'script') return
    if (scriptIdx >= scriptLines.length) { setPhase('done'); return }
    const t = setTimeout(() => {
      setVisible(v => [...v, scriptLines[scriptIdx]])
      setScriptIdx(i => i + 1)
    }, scriptIdx === 0 ? 800 : delayPerLine)
    return () => clearTimeout(t)
  }, [phase, scriptIdx, scriptLines, delayPerLine])

  // call timer
  useEffect(() => {
    if (phase === 'answered' || phase === 'script' || phase === 'done') {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  function fmt(s) {
    return `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  }

  function handleAnswer() {
    setPhase('script')
  }

  function handleDecline() {
    if (interacted) return
    setInteracted(true)
    onInteract('declined_call')
  }

  function handleHangUp() {
    if (interacted) return
    setInteracted(true)
    setPhase('done')
    onInteract('hung_up')
  }

  function handleCallBack() {
    if (interacted) return
    setInteracted(true)
    onInteract('called_back_official')
  }

  function handleComply() {
    if (interacted) return
    setInteracted(true)
    onInteract('complied')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Incoming Call — Your Smartphone
      </div>

      {/* Phone call UI */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
        borderRadius: 28,
        padding: '32px 24px 28px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.08)',
        maxWidth: 340,
        margin: '0 auto',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* Pulsing rings (ringing state) — rendered behind everything */}
        {phase === 'ringing' && (
          <>
            <style>{`
              @keyframes auth-ring-pulse {
                0%   { transform: scale(0.85); opacity: 0.5; }
                100% { transform: scale(1.6);  opacity: 0; }
              }
            `}</style>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: 100, height: 100,
                marginTop: -50, marginLeft: -50,
                borderRadius: '50%',
                border: `2px solid ${accentColor}`,
                animation: `auth-ring-pulse 2s ease-out infinite`,
                animationDelay: `${i * 0.6}s`,
                pointerEvents: 'none',
                zIndex: 0,
              }} />
            ))}
          </>
        )}

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: accentColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, margin: '0 auto 16px',
            position: 'relative', zIndex: 1,
            boxShadow: phase === 'ringing'
              ? `0 0 0 6px ${accentColor}40, 0 0 0 12px ${accentColor}20`
              : `0 0 0 4px ${accentColor}20`,
            transition: 'box-shadow .4s',
          }}>{callerEmoji}</div>

          {/* Caller info */}
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            {callerName}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>
            {callerNumber}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            {callerSubtitle}
          </div>

          {/* State label */}
          {phase === 'ringing' && (
            <div style={{ fontSize: 13, color: accentColor, marginBottom: 24, fontWeight: 500 }}>
              Incoming call...
            </div>
          )}
          {(phase === 'script' || phase === 'done') && (
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
              {fmt(callDuration)}
            </div>
          )}

          {/* Script transcript */}
          {visibleLines.length > 0 && (
            <div style={{
              background: 'rgba(0,0,0,0.35)',
              borderRadius: 12,
              padding: '12px 14px',
              marginBottom: 20,
              textAlign: 'left',
              maxHeight: 180,
              overflowY: 'auto',
            }}>
              {visibleLines.map((line, i) => (
                <div key={i} style={{
                  marginBottom: i < visibleLines.length - 1 ? 10 : 0,
                  display: 'flex', gap: 8, alignItems: 'flex-start',
                }}>
                  <span style={{
                    fontSize: 10, color: accentColor, fontFamily: 'var(--mono)',
                    fontWeight: 600, marginTop: 2, flexShrink: 0,
                  }}>{line.role === 'caller' ? 'THEM' : 'YOU'}</span>
                  <span style={{
                    fontSize: 12.5, color: line.role === 'caller' ? '#fff' : '#aaa',
                    lineHeight: 1.5,
                  }}>{line.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Ringing buttons */}
          {phase === 'ringing' && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button onClick={handleDecline} style={{
                width: 60, height: 60, borderRadius: '50%',
                background: '#C94E4E', border: 'none', cursor: 'pointer',
                fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(201,78,78,0.4)',
              }}>📵</button>
              <button onClick={handleAnswer} style={{
                width: 60, height: 60, borderRadius: '50%',
                background: '#2EB87A', border: 'none', cursor: 'pointer',
                fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(46,184,122,0.4)',
              }}>📲</button>
            </div>
          )}

          {/* In-call buttons (after script) */}
          {(phase === 'script' || phase === 'done') && !interacted && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={handleHangUp} style={{
                background: '#C94E4E', color: '#fff',
                border: 'none', borderRadius: 10,
                padding: '11px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', width: '100%',
              }}>Hang Up</button>
              <button onClick={handleCallBack} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', borderRadius: 10,
                padding: '11px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', width: '100%',
              }}>Tell them you'll call back on official number</button>
              <button onClick={handleComply} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)', borderRadius: 10,
                padding: '11px 18px', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', width: '100%',
              }}>Comply with their request</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   FakeGovPortalEnv
   Simulates a spoofed government portal (TRAI, Income Tax,
   UIDAI etc.) demanding an "urgent payment" or "fine".
══════════════════════════════════════════════════════════ */
export function FakeGovPortalEnv({ envProps, onInteract }) {
  const {
    fakeDomain     = 'trai-compliance-portal.in',
    realDomain     = 'trai.gov.in',
    portalName     = 'TRAI Compliance Portal',
    logoEmoji      = '📡',
    accentColor    = '#1a4ea0',
    headerBg       = '#003087',
    alertTitle     = 'Your Mobile Connection Will Be Disconnected',
    alertBody      = 'Our records show that your mobile number is linked to illegal activities. To avoid permanent disconnection, pay the compliance verification fee immediately.',
    fineAmount     = '₹1,499',
    deadlineLabel  = 'Action Required Within: ',
    timerSeconds   = 3600,
    officialLinks  = ['trai.gov.in', 'india.gov.in', 'dot.gov.in'],
    sealEmoji      = '🇮🇳',
    badgeLines     = ['Government of India', 'Ministry of Communications'],
  } = envProps

  const [timeLeft, setTimeLeft] = useState(timerSeconds)
  const [interacted, setInteracted] = useState(false)
  const [showDomainHint, setShowDomainHint] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  function fmtTimer(s) {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }

  function handlePay() {
    if (interacted) return
    setInteracted(true)
    onInteract('paid_fine')
  }

  function handleCheckDomain() {
    setShowDomainHint(true)
    if (!interacted) {
      setInteracted(true)
      setTimeout(() => onInteract('checked_domain'), 600)
    }
  }

  function handleReportFraud() {
    if (interacted) return
    setInteracted(true)
    onInteract('reported_fraud')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Browser — Suspicious Website
      </div>

      {/* Browser chrome */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        {/* Browser toolbar */}
        <div style={{
          background: '#2c2c2e',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {/* URL bar */}
          <div
            onClick={handleCheckDomain}
            style={{
              flex: 1,
              background: '#3a3a3c',
              borderRadius: 6,
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              border: showDomainHint ? '1px solid #C94E4E' : '1px solid transparent',
              transition: 'border-color .2s',
            }}
            title="Click to inspect the URL"
          >
            <span style={{ fontSize: 12, color: showDomainHint ? '#C94E4E' : '#8e8e93' }}>🔒</span>
            <span style={{
              fontSize: 12.5,
              color: showDomainHint ? '#C94E4E' : '#d1d1d6',
              fontFamily: 'var(--mono)',
            }}>{fakeDomain}</span>
            {showDomainHint && (
              <span style={{
                fontSize: 10, color: '#C94E4E',
                marginLeft: 'auto', fontWeight: 600,
              }}>NOT {realDomain}</span>
            )}
          </div>
        </div>

        {/* Page content */}
        <div style={{ background: '#fff', minHeight: 340 }}>
          {/* Gov header */}
          <div style={{
            background: headerBg,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{ fontSize: 32 }}>{logoEmoji}</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{portalName}</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>
                {badgeLines.join(' | ')}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 24 }}>{sealEmoji}</div>
          </div>

          {/* Alert content */}
          <div style={{ padding: '20px 20px' }}>
            {/* Alert banner */}
            <div style={{
              background: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: 8,
              padding: '14px 16px',
              marginBottom: 16,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#856404' }}>
                  {alertTitle}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#533f03', lineHeight: 1.6 }}>{alertBody}</p>
            </div>

            {/* Timer */}
            <div style={{
              background: '#fff0f0',
              border: '1px solid #f5c6cb',
              borderRadius: 8,
              padding: '12px 16px',
              marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: '#721c24', fontWeight: 600 }}>
                {deadlineLabel}
              </span>
              <span style={{
                fontSize: 18, fontWeight: 700,
                color: timeLeft < 600 ? '#C94E4E' : '#721c24',
                fontFamily: 'var(--mono)',
              }}>
                {fmtTimer(timeLeft)}
              </span>
            </div>

            {/* Fine / payment amount */}
            <div style={{
              textAlign: 'center',
              padding: '14px',
              background: '#f8f9fa',
              borderRadius: 8,
              marginBottom: 16,
              border: '1px solid #dee2e6',
            }}>
              <div style={{ fontSize: 12, color: '#6c757d', marginBottom: 4 }}>Outstanding Amount</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#212529' }}>{fineAmount}</div>
            </div>

            {/* CTA */}
            <button
              onClick={handlePay}
              disabled={interacted}
              style={{
                background: '#d63031',
                color: '#fff', border: 'none',
                width: '100%', padding: '14px',
                borderRadius: 8, fontSize: 15,
                fontWeight: 700, cursor: 'pointer',
                marginBottom: 10,
                opacity: interacted ? 0.5 : 1,
              }}
            >Pay {fineAmount} Now — Avoid Disconnection</button>

            <button
              onClick={handleReportFraud}
              disabled={interacted}
              style={{
                background: 'transparent',
                color: '#6c757d',
                border: '1px solid #dee2e6',
                width: '100%', padding: '10px',
                borderRadius: 8, fontSize: 13,
                cursor: 'pointer',
                opacity: interacted ? 0.5 : 1,
              }}
            >Report This as Fraud</button>

            {/* Fake official links footer */}
            <div style={{
              marginTop: 16,
              padding: '10px',
              borderTop: '1px solid #dee2e6',
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}>
              {officialLinks.map((link, i) => (
                <span key={i} style={{ fontSize: 11, color: '#6c757d' }}>{link}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Domain hint box */}
      {showDomainHint && (
        <div style={{
          background: 'rgba(201, 78, 78, 0.07)',
          border: '1px solid rgba(201, 78, 78, 0.3)',
          borderRadius: 10,
          padding: '14px 16px',
          animation: 'vsim-slide-up .3s ease both',
        }}>
          <div style={{
            fontSize: 11, fontFamily: 'var(--mono)',
            color: '#C94E4E', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>⚠ Suspicious Domain Detected</div>
          <p style={{ fontSize: 13, color: '#e8a8a8', lineHeight: 1.6 }}>
            The URL is <strong style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>{fakeDomain}</strong> — not <strong style={{ fontFamily: 'var(--mono)', color: '#2EB87A' }}>{realDomain}</strong>.
            Real government portals always use <strong>.gov.in</strong> domains.
            Impersonators register similar-sounding domains to deceive users.
          </p>
        </div>
      )}
    </div>
  )
}
