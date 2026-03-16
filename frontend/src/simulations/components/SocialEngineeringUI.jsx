/**
 * components/SocialEngineeringUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Social Engineering simulations.
 *
 * Environments exported:
 *   RelativeEmergencyCallEnv   — WhatsApp-style call + message from
 *                                impersonated family member
 *   FakeMedicalPortalEnv       — Spoofed hospital/insurance portal
 *                                demanding urgent payment
 *   UrgencyPressureEnv         — Multi-channel pressure attack
 *                                (email + phone + countdown) testing
 *                                decision-making under stress
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════════════════
   RelativeEmergencyCallEnv
   Simulates a WhatsApp message + voice call from someone
   claiming to be a relative in an emergency, asking for
   an urgent money transfer.
══════════════════════════════════════════════════════════ */
export function RelativeEmergencyCallEnv({ envProps, onInteract }) {
  const {
    contactName      = 'Rahul (Son)',
    contactInitial   = 'R',
    contactBg        = '#34c759',
    messageDelayMs   = 1800,
    callDelayMs      = 5000,
    scamMessages     = [],
    urgencyAmount    = '₹25,000',
    accentColor      = '#25d366',
  } = envProps

  const [phase, setPhase]               = useState('messages')   // messages | calling | incall | done
  const [visibleMsgs, setVisibleMsgs]   = useState([])
  const [msgIdx, setMsgIdx]             = useState(0)
  const [interacted, setInteracted]     = useState(false)
  const [callDuration, setDuration]     = useState(0)
  const timerRef                        = useRef(null)

  // Drip messages in
  useEffect(() => {
    if (msgIdx >= scamMessages.length) {
      // All messages shown — trigger incoming call after delay
      const t = setTimeout(() => setPhase('calling'), callDelayMs - (scamMessages.length * messageDelayMs))
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setVisibleMsgs(v => [...v, scamMessages[msgIdx]])
      setMsgIdx(i => i + 1)
    }, msgIdx === 0 ? messageDelayMs : messageDelayMs)
    return () => clearTimeout(t)
  }, [msgIdx, scamMessages, messageDelayMs, callDelayMs])

  // Call timer
  useEffect(() => {
    if (phase === 'incall') {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  function fmt(s) {
    return `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  }

  function handleAnswer() { setPhase('incall') }

  function handleDeclineCall() {
    if (interacted) return
    setInteracted(true)
    onInteract('declined_call')
  }

  function handleVerify() {
    if (interacted) return
    setInteracted(true)
    onInteract('called_back_to_verify')
  }

  function handleTransfer() {
    if (interacted) return
    setInteracted(true)
    onInteract('transferred_money')
  }

  function handleHangUp() {
    if (interacted) return
    setInteracted(true)
    setPhase('done')
    onInteract('hung_up_to_verify')
  }

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        WhatsApp — {contactName}
      </div>

      {/* WhatsApp conversation */}
      <div style={{
        background: '#0b141a',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        maxWidth: 380,
        margin: '0 auto',
        fontFamily: '-apple-system, "Segoe UI", sans-serif',
      }}>
        {/* WhatsApp header */}
        <div style={{
          background: '#1f2c34',
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: contactBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>{contactInitial}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#e9edef' }}>{contactName}</div>
            <div style={{ fontSize: 11, color: accentColor }}>online</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 18, color: accentColor }}>📞</div>
        </div>

        {/* Chat wallpaper bg */}
        <div style={{
          background: '#0b141a',
          padding: '14px 12px',
          minHeight: 200,
          maxHeight: 280,
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {visibleMsgs.map((msg, i) => (
            <div key={i} style={{
              alignSelf: 'flex-start',
              maxWidth: '82%',
              animation: 'vsim-slide-up 0.3s ease both',
            }}>
              <div style={{
                background: '#202c33',
                borderRadius: '0 8px 8px 8px',
                padding: '8px 10px 6px',
                color: '#e9edef',
                fontSize: 13.5,
                lineHeight: 1.5,
              }}>{msg.text}</div>
              <div style={{ fontSize: 10, color: '#8696a0', marginTop: 2, marginLeft: 4 }}>{time}</div>
            </div>
          ))}

          {msgIdx < scamMessages.length && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 0',
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#8696a0',
                  animation: `dc-dot 1s ${i * 0.15}s ease-in-out infinite`,
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Incoming call overlay */}
        {phase === 'calling' && (
          <div style={{
            background: 'rgba(0,0,0,0.92)',
            padding: '22px 16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            animation: 'vsim-slide-up 0.4s ease both',
          }}>
            <style>{`
              @keyframes wa-ring-out {
                0%   { transform: scale(0.9); opacity: 0.6; }
                100% { transform: scale(1.7); opacity: 0; }
              }
            `}</style>
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              {[0,1].map(i => (
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: `2px solid ${accentColor}`,
                  animation: `wa-ring-out 1.8s ease-out ${i * 0.7}s infinite`,
                }} />
              ))}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: contactBg, position: 'relative', zIndex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, color: '#fff',
              }}>{contactInitial}</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e9edef' }}>{contactName}</div>
            <div style={{ fontSize: 12, color: '#8696a0' }}>WhatsApp Voice Call</div>
            <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <button onClick={handleDeclineCall} style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: '#ff3b30', border: 'none', cursor: 'pointer',
                  fontSize: 22, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', boxShadow: '0 4px 16px rgba(255,59,48,0.4)',
                }}>📵</button>
                <div style={{ fontSize: 11, color: '#8696a0', marginTop: 5 }}>Decline</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button onClick={handleAnswer} style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: accentColor, border: 'none', cursor: 'pointer',
                  fontSize: 22, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', boxShadow: `0 4px 16px ${accentColor}66`,
                }}>📲</button>
                <div style={{ fontSize: 11, color: '#8696a0', marginTop: 5 }}>Answer</div>
              </div>
            </div>
          </div>
        )}

        {/* In-call screen */}
        {phase === 'incall' && (
          <div style={{
            background: '#0d1f29',
            padding: '24px 16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: contactBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 700, color: '#fff',
            }}>{contactInitial}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e9edef' }}>{contactName}</div>
            <div style={{ fontSize: 13, color: accentColor, fontFamily: 'var(--mono)' }}>{fmt(callDuration)}</div>

            {/* Voice saying */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 12.5, color: '#ccc', lineHeight: 1.6,
              fontStyle: 'italic', textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.07)',
              width: '100%',
            }}>
              "Please, I need {urgencyAmount} transferred right now. I'll explain everything later, just please help me, I'm in serious trouble..."
            </div>

            {!interacted && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <button onClick={handleHangUp} style={{
                  background: '#ff3b30', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '11px', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer', width: '100%',
                }}>Hang up — call their actual number first</button>
                <button onClick={handleVerify} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e9edef', borderRadius: 10,
                  padding: '11px', fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', width: '100%',
                }}>Ask them a personal question only they'd know</button>
                <button onClick={handleTransfer} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.4)', borderRadius: 10,
                  padding: '11px', fontSize: 13, cursor: 'pointer', width: '100%',
                }}>Transfer the {urgencyAmount} immediately</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   FakeMedicalPortalEnv
   Spoofed hospital billing / health insurance portal.
   Demands an urgent payment for a "critical procedure" or
   "policy lapse". Targets all user groups.
══════════════════════════════════════════════════════════ */
export function FakeMedicalPortalEnv({ envProps, onInteract }) {
  const {
    fakeDomain       = 'apollo-billing-portal.in',
    realDomain       = 'apollohospitals.com',
    hospitalName     = 'Apollo Hospitals',
    hospitalEmoji    = '🏥',
    headerBg         = '#0057a8',
    patientName      = 'Valued Patient',
    alertTitle       = 'Urgent: Outstanding Bill — Treatment at Risk',
    alertBody        = 'Your insurance claim has been rejected. An outstanding payment of ₹12,800 is required within 2 hours to continue your scheduled treatment.',
    amountDue        = '₹12,800',
    timerSeconds     = 7200,
    upiId            = 'apollobilling@ybl',
    realUpiNote      = 'Real hospitals never collect payments via UPI IDs sent over SMS or email',
  } = envProps

  const [timeLeft, setTimeLeft]           = useState(timerSeconds)
  const [interacted, setInteracted]       = useState(false)
  const [showUrlHint, setShowUrlHint]     = useState(false)
  const [showUpiHint, setShowUpiHint]     = useState(false)

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
    onInteract('paid')
  }

  function handleCheckUrl() {
    setShowUrlHint(true)
    if (!interacted) {
      setInteracted(true)
      setTimeout(() => onInteract('checked_url'), 500)
    }
  }

  function handleCheckUpi() {
    setShowUpiHint(true)
  }

  function handleCallHospital() {
    if (interacted) return
    setInteracted(true)
    onInteract('called_hospital_directly')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Browser — Suspicious Medical Billing Site
      </div>

      {/* Browser frame */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: 520, margin: '0 auto',
      }}>
        {/* Browser toolbar */}
        <div style={{
          background: '#2c2c2e', padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {/* Clickable URL bar */}
          <div
            onClick={handleCheckUrl}
            title="Click to inspect the URL"
            style={{
              flex: 1, background: '#3a3a3c', borderRadius: 6,
              padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer',
              border: showUrlHint ? '1px solid #C94E4E' : '1px solid transparent',
              transition: 'border-color .2s',
            }}
          >
            <span style={{ fontSize: 12, color: showUrlHint ? '#C94E4E' : '#8e8e93' }}>🔒</span>
            <span style={{
              fontSize: 12, fontFamily: 'var(--mono)',
              color: showUrlHint ? '#C94E4E' : '#d1d1d6',
            }}>{fakeDomain}</span>
            {showUrlHint && (
              <span style={{ fontSize: 10, color: '#C94E4E', marginLeft: 'auto', fontWeight: 600 }}>
                NOT {realDomain}
              </span>
            )}
          </div>
        </div>

        {/* Page */}
        <div style={{ background: '#fff' }}>
          {/* Hospital header */}
          <div style={{
            background: headerBg, padding: '12px 18px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>{hospitalEmoji}</span>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{hospitalName}</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>Patient Billing Portal</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
              Secure Payment Gateway ✓
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '18px 18px' }}>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>
              Dear <strong>{patientName}</strong>,
            </div>

            {/* Alert */}
            <div style={{
              background: '#fff3cd', border: '2px solid #ffc107',
              borderRadius: 8, padding: '12px 14px', marginBottom: 14,
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#856404', marginBottom: 6 }}>
                ⚠️ {alertTitle}
              </div>
              <p style={{ fontSize: 12.5, color: '#533f03', lineHeight: 1.6, margin: 0 }}>{alertBody}</p>
            </div>

            {/* Timer */}
            <div style={{
              background: '#fff0f0', border: '1px solid #f5c6cb',
              borderRadius: 8, padding: '10px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 14,
            }}>
              <span style={{ fontSize: 12.5, color: '#721c24', fontWeight: 600 }}>
                Treatment window closes in:
              </span>
              <span style={{
                fontSize: 18, fontWeight: 700, fontFamily: 'var(--mono)',
                color: timeLeft < 1800 ? '#C94E4E' : '#721c24',
              }}>{fmtTimer(timeLeft)}</span>
            </div>

            {/* Amount */}
            <div style={{
              textAlign: 'center', padding: '12px',
              background: '#f8f9fa', borderRadius: 8, marginBottom: 14,
              border: '1px solid #dee2e6',
            }}>
              <div style={{ fontSize: 11, color: '#6c757d', marginBottom: 3 }}>Amount Due</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#212529' }}>{amountDue}</div>
            </div>

            {/* UPI section */}
            <div
              onClick={handleCheckUpi}
              style={{
                background: '#f0fff4', border: '1px solid #b7ebc9',
                borderRadius: 8, padding: '10px 14px', marginBottom: 14,
                cursor: 'pointer',
                borderColor: showUpiHint ? '#C94E4E' : '#b7ebc9',
                background: showUpiHint ? '#fff0f0' : '#f0fff4',
              }}
            >
              <div style={{ fontSize: 11.5, color: '#555', marginBottom: 4 }}>Pay via UPI</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700,
                color: showUpiHint ? '#C94E4E' : '#155724',
              }}>{upiId}</div>
              {showUpiHint && (
                <div style={{ fontSize: 11, color: '#C94E4E', marginTop: 4 }}>
                  ⚠ {realUpiNote}
                </div>
              )}
            </div>

            {/* Buttons */}
            <button
              onClick={handlePay}
              disabled={interacted}
              style={{
                background: '#0057a8', color: '#fff', border: 'none',
                width: '100%', padding: '13px', borderRadius: 8,
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                marginBottom: 8, opacity: interacted ? 0.5 : 1,
              }}
            >Pay {amountDue} Now</button>

            <button
              onClick={handleCallHospital}
              disabled={interacted}
              style={{
                background: 'transparent', border: '1px solid #dee2e6',
                color: '#6c757d', width: '100%', padding: '10px',
                borderRadius: 8, fontSize: 13, cursor: 'pointer',
                opacity: interacted ? 0.5 : 1,
              }}
            >Call {hospitalName} directly to verify</button>
          </div>
        </div>
      </div>

      {/* URL hint box */}
      {showUrlHint && (
        <div style={{
          background: 'rgba(201,78,78,0.07)',
          border: '1px solid rgba(201,78,78,0.3)',
          borderRadius: 10, padding: '14px 16px',
          animation: 'vsim-slide-up .3s ease both',
        }}>
          <div style={{
            fontSize: 11, fontFamily: 'var(--mono)', color: '#C94E4E',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
          }}>⚠ Domain is Not the Real Hospital</div>
          <p style={{ fontSize: 13, color: '#e8a8a8', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>{fakeDomain}</strong> is
            not {hospitalName}'s official website (<strong style={{ fontFamily: 'var(--mono)', color: '#2EB87A' }}>{realDomain}</strong>).
            Real hospital billing portals always use the hospital's own domain.
            Any payment request from an unknown domain is fraudulent.
          </p>
        </div>
      )}
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   UrgencyPressureEnv
   Advanced simulation — a multi-channel coordinated attack
   where the scammer uses email + phone + a countdown timer
   to overwhelm the victim's ability to think clearly.
   The environment itself makes the urgency viscerally felt.
══════════════════════════════════════════════════════════ */
export function UrgencyPressureEnv({ envProps, onInteract }) {
  const {
    scenarioTitle    = 'You Have 10 Minutes',
    emailSender      = 'compliance@hdfc-security-alert.in',
    emailSubject     = 'FINAL NOTICE: Fraudulent Transaction — Immediate Action Required',
    emailBody        = 'We have detected a transaction of ₹87,400 from your account to an unknown recipient. Your account will be frozen in 10 minutes unless you verify your identity. Click below immediately.',
    callerId         = '+91 22-XXXX-6612',
    callerClaim      = 'HDFC Fraud Prevention Team',
    smsText          = 'HDFC ALERT: Unauthd txn ₹87400. Acct freeze in 10 min. Verify: hdfc-fraud-verify.in/urgent',
    timerSeconds     = 600,
    accentColor      = '#1a56db',
    pressureMessages = [],
  } = envProps

  const [timeLeft, setTimeLeft]         = useState(timerSeconds)
  const [activeTab, setActiveTab]       = useState('email')  // email | sms | call
  const [interacted, setInteracted]     = useState(false)
  const [pressureIdx, setPressureIdx]   = useState(0)
  const [visiblePressure, setVisible]   = useState([])
  const [callerVisible, setCallerVisible] = useState(false)
  const isUrgent                         = timeLeft < 120

  // Countdown
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  // Drip pressure messages
  useEffect(() => {
    if (pressureIdx >= pressureMessages.length) return
    const t = setTimeout(() => {
      setVisible(v => [...v, pressureMessages[pressureIdx]])
      setPressureIdx(i => i + 1)
    }, 3000 + pressureIdx * 2500)
    return () => clearTimeout(t)
  }, [pressureIdx, pressureMessages])

  // Show incoming call after 8s
  useEffect(() => {
    const t = setTimeout(() => setCallerVisible(true), 8000)
    return () => clearTimeout(t)
  }, [])

  function fmtTimer(s) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }

  function handlePanic() {
    if (interacted) return
    setInteracted(true)
    onInteract('acted_under_pressure')
  }

  function handlePause() {
    if (interacted) return
    setInteracted(true)
    onInteract('paused_and_assessed')
  }

  function handleCallBank() {
    if (interacted) return
    setInteracted(true)
    onInteract('called_bank_official_number')
  }

  function handleDismissCall() {
    setCallerVisible(false)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Multi-Channel Pressure Attack
      </div>

      {/* Countdown bar — prominent and stress-inducing */}
      <div style={{
        background: isUrgent
          ? 'linear-gradient(135deg, #7f0000, #C94E4E)'
          : 'linear-gradient(135deg, #1a3a6b, #1a56db)',
        borderRadius: 10,
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: isUrgent ? '1px solid rgba(201,78,78,0.5)' : '1px solid rgba(26,86,219,0.3)',
        transition: 'background 0.5s',
        animation: isUrgent ? 'vsim-pulse 1s ease-in-out infinite' : 'none',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
            Account Freeze In
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            {scenarioTitle}
          </div>
        </div>
        <div style={{
          fontSize: 38, fontWeight: 800, fontFamily: 'var(--mono)',
          color: '#fff',
          textShadow: isUrgent ? '0 0 20px rgba(255,100,100,0.8)' : 'none',
        }}>
          {fmtTimer(timeLeft)}
        </div>
      </div>

      {/* Incoming call notification */}
      {callerVisible && !interacted && (
        <div style={{
          background: '#1c1c1e',
          borderRadius: 14, padding: '14px 16px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'vsim-slide-up 0.4s ease both',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: accentColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
            boxShadow: `0 0 0 4px ${accentColor}30`,
          }}>📞</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{callerClaim}</div>
            <div style={{ fontSize: 11, color: '#8e8e93', fontFamily: 'var(--mono)' }}>{callerId}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleDismissCall} style={{
              width: 36, height: 36, borderRadius: '50%', background: '#C94E4E',
              border: 'none', cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
            <button onClick={handlePanic} style={{
              width: 36, height: 36, borderRadius: '50%', background: '#2EB87A',
              border: 'none', cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>📲</button>
          </div>
        </div>
      )}

      {/* Tabbed channels */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        fontFamily: '-apple-system, "Segoe UI", sans-serif',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {[
            { id: 'email', label: '📧 Email', badge: '1' },
            { id: 'sms',   label: '💬 SMS',   badge: '1' },
            { id: 'call',  label: '📞 Missed', badge: '2' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '10px 8px',
              background: activeTab === tab.id ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: 'none', cursor: 'pointer',
              borderBottom: activeTab === tab.id ? `2px solid ${accentColor}` : '2px solid transparent',
              fontSize: 12.5, color: activeTab === tab.id ? '#fff' : '#8e8e93',
              fontWeight: activeTab === tab.id ? 600 : 400,
              position: 'relative',
              transition: 'color .2s',
            }}>
              {tab.label}
              <span style={{
                marginLeft: 5,
                background: '#C94E4E', color: '#fff',
                fontSize: 9, fontWeight: 700,
                padding: '1px 5px', borderRadius: 8,
              }}>{tab.badge}</span>
            </button>
          ))}
        </div>

        {/* Email tab */}
        {activeTab === 'email' && (
          <div style={{ padding: '16px' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>🏦</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>HDFC Bank</div>
                <div style={{ fontSize: 11, color: '#8e8e93', fontFamily: 'var(--mono)' }}>{emailSender}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              {emailSubject}
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: '0 6px 6px 0',
              padding: '10px 12px',
              fontSize: 13, color: '#d1d1d6', lineHeight: 1.65,
            }}>{emailBody}</div>
            <button onClick={handlePanic} disabled={interacted} style={{
              marginTop: 12, background: accentColor, color: '#fff', border: 'none',
              width: '100%', padding: '11px', borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              opacity: interacted ? 0.5 : 1,
            }}>Verify Identity Now →</button>
          </div>
        )}

        {/* SMS tab */}
        {activeTab === 'sms' && (
          <div style={{ padding: '16px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 10, padding: '12px',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: 12, color: '#8e8e93', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: accentColor === '#1a56db' ? '#6fa3ef' : accentColor }}>HD-HDFCBK</span>
                <span>Just now</span>
              </div>
              <div style={{ fontSize: 13, color: '#d1d1d6', lineHeight: 1.6 }}>{smsText}</div>
              <div style={{
                marginTop: 10, padding: '8px 10px',
                background: 'rgba(201,78,78,0.08)',
                border: '1px solid rgba(201,78,78,0.2)',
                borderRadius: 6,
                fontSize: 11.5, color: '#e8a8a8',
              }}>
                ⚠ Link: <span style={{ fontFamily: 'var(--mono)', color: '#f4a261' }}>hdfc-fraud-verify.in</span> — not hdfcbank.com
              </div>
            </div>
          </div>
        )}

        {/* Call tab */}
        {activeTab === 'call' && (
          <div style={{ padding: '16px' }}>
            {[1, 2].map(i => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', marginBottom: 8,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: accentColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>🏦</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{callerClaim}</div>
                  <div style={{ fontSize: 11, color: '#C94E4E', fontFamily: 'var(--mono)' }}>
                    📵 Missed call — {callerId}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#8e8e93' }}>{i === 1 ? '2 min ago' : 'Just now'}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live pressure messages */}
      {visiblePressure.length > 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {visiblePressure.map((msg, i) => (
            <div key={i} style={{
              background: 'rgba(201,78,78,0.07)',
              border: '1px solid rgba(201,78,78,0.2)',
              borderRadius: 8, padding: '8px 12px',
              fontSize: 12.5, color: '#e8a8a8',
              animation: 'vsim-slide-up 0.3s ease both',
              display: 'flex', alignItems: 'flex-start', gap: 8,
            }}>
              <span style={{ flexShrink: 0 }}>⚠</span>
              <span>{msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Decision buttons */}
      {!interacted && (
        <div style={{
          background: 'var(--ink2)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '16px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{
            fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text-3)',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4,
          }}>What do you do?</div>

          <button onClick={handlePanic} style={{
            background: 'rgba(201,78,78,0.08)',
            border: '1px solid rgba(201,78,78,0.25)',
            color: '#e8a8a8', borderRadius: 8,
            padding: '12px 14px', fontSize: 13.5,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 5,
              background: 'rgba(201,78,78,0.15)', color: '#C94E4E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--mono)',
            }}>A</span>
            Follow the email link immediately — you can't afford to lose your account.
          </button>

          <button onClick={handlePause} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-1)', borderRadius: 8,
            padding: '12px 14px', fontSize: 13.5,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 5,
              background: 'rgba(255,255,255,0.07)', color: 'var(--text-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--mono)',
            }}>B</span>
            Stop. Breathe. Recognise the pressure tactics before doing anything.
          </button>

          <button onClick={handleCallBank} style={{
            background: 'rgba(46,184,122,0.05)',
            border: '1px solid rgba(46,184,122,0.2)',
            color: 'var(--text-1)', borderRadius: 8,
            padding: '12px 14px', fontSize: 13.5,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 5,
              background: 'rgba(46,184,122,0.12)', color: '#2EB87A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--mono)',
            }}>C</span>
            Call HDFC's official number (1800-202-6161) from the back of your card.
          </button>
        </div>
      )}
    </div>
  )
}
