/**
 * components/ProfessionalImpersonationUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for professional-targeted identity &
 * impersonation simulations.
 *
 * Environments exported:
 *   LinkedInCloneEnv   — Cloned LinkedIn profile contacting your
 *                        connections posing as you, asking for
 *                        referrals and sensitive information
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════════════════
   LinkedInCloneEnv
   Two phases:
   Phase 1 — You receive a connection request from what looks
             like your own profile. You investigate.
   Phase 2 — A colleague DMs you saying they received a
             message from "you" asking for their email and
             current project details.
══════════════════════════════════════════════════════════ */
export function LinkedInCloneEnv({ envProps, onInteract }) {
  const {
    yourName         = 'Priya Sharma',
    yourTitle        = 'Senior Software Engineer at Infosys',
    yourLocation     = 'Bengaluru, Karnataka',
    yourConnections  = '487',
    yourInitial      = 'P',
    yourAvatarBg     = '#0077b5',
    cloneHandle      = 'priya-sharma-infosys-engineer',
    realHandle       = 'priya-sharma-infosys',
    cloneConnections = '3',
    cloneJoined      = 'Joined 6 days ago',
    colleagueName    = 'Rahul Verma',
    colleagueInitial = 'R',
    scamMessage      = 'Hi Rahul, I\'m updating my contact list. Can you share your personal email and what project you\'re currently on? Also, our team lead asked me to collect everyone\'s employee IDs for the new access system.',
  } = envProps

  const [phase, setPhase]           = useState('notification')  // notification | profile | dm | colleague
  const [interacted, setInteracted] = useState(false)
  const [showRedFlags, setShowRedFlags] = useState(false)

  function handleViewProfile() {
    setPhase('profile')
    setShowRedFlags(true)
  }

  function handleIgnoreRequest() {
    if (interacted) return
    setInteracted(true)
    onInteract('ignored_request')
  }

  function handleReportClone() {
    if (interacted) return
    setInteracted(true)
    onInteract('reported_clone')
  }

  function handleAlertContacts() {
    if (interacted) return
    setInteracted(true)
    onInteract('alerted_contacts')
  }

  function handleViewColleagueDm() {
    setPhase('colleague')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        LinkedIn — {phase === 'colleague' ? 'Message from ' + colleagueName : phase === 'profile' ? 'Cloned Profile' : 'Notifications'}
      </div>

      {/* LinkedIn shell */}
      <div style={{
        background: '#1b1f23',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        maxWidth: 480,
        margin: '0 auto',
        fontFamily: '-apple-system, "Segoe UI", Arial, sans-serif',
      }}>

        {/* LinkedIn top nav */}
        <div style={{
          background: '#1d2226',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            fontSize: 18, fontWeight: 800, color: '#0a66c2',
            letterSpacing: '-0.5px',
          }}>in</div>
          <div style={{
            flex: 1, background: '#2d3840',
            borderRadius: 4, padding: '6px 10px',
            fontSize: 12, color: '#8c9aab',
          }}>Search</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 10, color: '#8c9aab' }}>
            {['🏠', '👥', '💼', '🔔'].map((icon, i) => (
              <span key={i} style={{ cursor: 'pointer', fontSize: 18 }}>{icon}</span>
            ))}
          </div>
        </div>

        {/* ── NOTIFICATION PHASE ── */}
        {phase === 'notification' && (
          <div style={{ background: '#1b1f23' }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: 13, fontWeight: 700, color: '#e7e9ea',
            }}>Notifications</div>

            {/* Clone connection request */}
            <div style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: 12, alignItems: 'flex-start',
              background: 'rgba(10,102,194,0.06)',
              animation: 'vsim-slide-up 0.4s ease both',
            }}>
              {/* Cloned avatar */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: yourAvatarBg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, color: '#fff',
                border: '2px solid #C94E4E',
              }}>{yourInitial}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: '#e7e9ea', lineHeight: 1.5, marginBottom: 6 }}>
                  <strong style={{ color: '#fff' }}>{yourName}</strong> sent you a connection request.
                  <span style={{
                    marginLeft: 6,
                    background: 'rgba(201,78,78,0.15)',
                    color: '#C94E4E',
                    fontSize: 10, fontWeight: 700,
                    padding: '1px 6px', borderRadius: 3,
                    fontFamily: 'var(--mono)',
                  }}>That's your name</span>
                </div>
                <div style={{ fontSize: 12, color: '#8c9aab', marginBottom: 10 }}>
                  {yourTitle}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={handleViewProfile}
                    style={{
                      background: 'transparent',
                      border: '1px solid #0a66c2',
                      color: '#70b5f9', borderRadius: 16,
                      padding: '6px 14px', fontSize: 12,
                      fontWeight: 600, cursor: 'pointer',
                    }}
                  >View Profile</button>
                  <button
                    onClick={handleIgnoreRequest}
                    disabled={interacted}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#8c9aab', borderRadius: 16,
                      padding: '6px 14px', fontSize: 12,
                      cursor: 'pointer', opacity: interacted ? 0.5 : 1,
                    }}
                  >Ignore</button>
                </div>
              </div>
            </div>

            {/* Colleague DM notification */}
            <div
              onClick={handleViewColleagueDm}
              style={{
                padding: '14px 16px',
                display: 'flex', gap: 12, alignItems: 'flex-start',
                cursor: 'pointer',
                transition: 'background .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#e91e63', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: '#fff',
              }}>{colleagueInitial}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: '#e7e9ea', marginBottom: 4 }}>
                  <strong>{colleagueName}</strong> sent you a message
                </div>
                <div style={{ fontSize: 12, color: '#8c9aab' }}>
                  "Hey, I just got a weird message from your account..."
                </div>
              </div>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#0a66c2', flexShrink: 0, marginTop: 4,
              }} />
            </div>
          </div>
        )}

        {/* ── CLONED PROFILE VIEW ── */}
        {phase === 'profile' && (
          <div style={{ background: '#1b1f23' }}>
            {/* Cover */}
            <div style={{
              height: 80,
              background: 'linear-gradient(135deg, #1d4e8f, #0a66c2)',
            }} />

            {/* Profile info */}
            <div style={{ padding: '0 16px 16px', position: 'relative' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: yourAvatarBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, color: '#fff',
                border: '3px solid #1b1f23',
                marginTop: -36, marginBottom: 8,
              }}>{yourInitial}</div>

              <div style={{ fontSize: 18, fontWeight: 700, color: '#e7e9ea', marginBottom: 2 }}>
                {yourName}
              </div>
              <div style={{ fontSize: 13, color: '#8c9aab', marginBottom: 2 }}>{yourTitle}</div>
              <div style={{ fontSize: 12, color: '#8c9aab', marginBottom: 10 }}>{yourLocation}</div>

              {/* Connections + join date */}
              <div style={{
                display: 'flex', gap: 16,
                fontSize: 12, color: '#8c9aab', marginBottom: 12,
              }}>
                <span>{cloneConnections} connections</span>
                <span style={{ color: '#C94E4E' }}>⚠ {cloneJoined}</span>
              </div>

              {/* URL comparison */}
              <div style={{
                background: 'rgba(201,78,78,0.08)',
                border: '1px solid rgba(201,78,78,0.3)',
                borderRadius: 8, padding: '10px 12px', marginBottom: 14,
              }}>
                <div style={{
                  fontSize: 10, fontFamily: 'var(--mono)', color: '#C94E4E',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6,
                }}>⚠ URL Mismatch</div>
                <div style={{ fontSize: 12, color: '#e8a8a8', marginBottom: 3 }}>
                  This profile: <span style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>
                    linkedin.com/in/{cloneHandle}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#a8e8a8' }}>
                  Your real profile: <span style={{ fontFamily: 'var(--mono)', color: '#2EB87A' }}>
                    linkedin.com/in/{realHandle}
                  </span>
                </div>
              </div>

              {/* Experience section — deliberately sparse */}
              <div style={{
                background: '#2d3840', borderRadius: 8, padding: '12px',
                marginBottom: 14,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e7e9ea', marginBottom: 8 }}>Experience</div>
                <div style={{ fontSize: 12, color: '#8c9aab', fontStyle: 'italic' }}>
                  No experience listed
                </div>
              </div>

              {/* Action buttons */}
              {!interacted && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button onClick={handleReportClone} style={{
                    background: '#0a66c2', color: '#fff', border: 'none',
                    borderRadius: 20, padding: '11px', fontSize: 13,
                    fontWeight: 600, cursor: 'pointer',
                  }}>Report this profile for impersonation</button>
                  <button onClick={handleAlertContacts} style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#e7e9ea', borderRadius: 20,
                    padding: '11px', fontSize: 13, cursor: 'pointer',
                  }}>Alert my connections about this clone</button>
                  <button onClick={handleIgnoreRequest} style={{
                    background: 'transparent', border: 'none',
                    color: '#8c9aab', fontSize: 12,
                    cursor: 'pointer', padding: '6px',
                    opacity: interacted ? 0.5 : 1,
                  }}>Ignore and do nothing</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── COLLEAGUE DM PHASE ── */}
        {phase === 'colleague' && (
          <div style={{ background: '#1b1f23' }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#e91e63', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: '#fff',
              }}>{colleagueInitial}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e7e9ea' }}>{colleagueName}</div>
                <div style={{ fontSize: 11, color: '#8c9aab' }}>Just now</div>
              </div>
            </div>

            <div style={{ padding: '16px' }}>
              {/* Colleague's message */}
              <div style={{
                background: '#2d3840', borderRadius: '0 12px 12px 12px',
                padding: '10px 14px', marginBottom: 12, maxWidth: '88%',
                fontSize: 13.5, color: '#e7e9ea', lineHeight: 1.6,
              }}>
                Hey Priya, I just got a message from your LinkedIn account asking for my personal email and current project details. Also wanted my employee ID "for a new access system." That was you, right?
              </div>

              {/* The scam message shown */}
              <div style={{
                background: 'rgba(201,78,78,0.08)',
                border: '1px solid rgba(201,78,78,0.2)',
                borderRadius: 8, padding: '12px', marginBottom: 16,
              }}>
                <div style={{
                  fontSize: 10, fontFamily: 'var(--mono)', color: '#C94E4E',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6,
                }}>Message sent from the clone account</div>
                <div style={{ fontSize: 13, color: '#e8a8a8', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{scamMessage}"
                </div>
              </div>

              {/* Actions */}
              {!interacted && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button onClick={handleReportClone} style={{
                    background: '#0a66c2', color: '#fff', border: 'none',
                    borderRadius: 20, padding: '11px', fontSize: 13,
                    fontWeight: 600, cursor: 'pointer',
                  }}>Report the clone + warn all connections now</button>
                  <button onClick={handleAlertContacts} style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#e7e9ea', borderRadius: 20,
                    padding: '11px', fontSize: 13, cursor: 'pointer',
                  }}>Post a public warning on your real profile</button>
                  <button onClick={handleIgnoreRequest} style={{
                    background: 'transparent', border: 'none',
                    color: '#8c9aab', fontSize: 12,
                    cursor: 'pointer', padding: '6px',
                  }}>Wait and see if more colleagues report it</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Red flags panel — shown after viewing clone profile */}
      {showRedFlags && phase === 'profile' && (
        <div style={{
          background: 'rgba(201,78,78,0.07)',
          border: '1px solid rgba(201,78,78,0.25)',
          borderRadius: 10, padding: '14px 16px',
          animation: 'vsim-slide-up 0.3s ease both',
        }}>
          <div style={{
            fontSize: 11, fontFamily: 'var(--mono)',
            color: '#C94E4E', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>⚠ Red Flags on This Profile</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Profile URL is slightly different from yours — "infosys-engineer" vs "infosys"',
              'Only 3 connections — a real professional has hundreds',
              'Account joined 6 days ago',
              'No experience, education, or posts listed',
              'Sending connection requests to YOUR connections',
            ].map((flag, i) => (
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
