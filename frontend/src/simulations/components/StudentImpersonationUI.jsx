/**
 * components/StudentImpersonationUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for student-targeted identity &
 * impersonation simulations.
 *
 * Environments exported:
 *   InstagramFakeAdminEnv    — Fake college admin Instagram account
 *                              asking students to submit details for
 *                              a "scholarship portal"
 *   WhatsappImpersonationEnv — WhatsApp contact using a classmate's
 *                              name/photo asking to borrow money
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════════════════
   InstagramFakeAdminEnv
   Renders a convincing Instagram profile + post from a fake
   college admin account. User can tap the post, check the
   profile, or follow the scholarship link.
══════════════════════════════════════════════════════════ */
export function InstagramFakeAdminEnv({ envProps, onInteract }) {
  const {
    fakeHandle      = '@srm_admissions_official',
    realHandle      = '@srm_university',
    collegeName     = 'SRM University',
    followerCount   = '1,204',
    postCount       = '3',
    bio             = 'Official Admissions Office — SRM University 🎓\nScholarship & Admission Updates',
    verifiedReal    = false,
    postCaption     = '🎓 SCHOLARSHIP ALERT 🎓\n\nSRM Merit Scholarship 2024 is NOW OPEN.\nDeadline: This Friday.\n\nSubmit your details via the link in bio to apply.',
    fakeDomain      = 'srm-scholarship-apply.in',
    postAge         = '2 hours ago',
    accountAge      = 'Account created 11 days ago',
    redFlags        = [],
  } = envProps

  const [view, setView]           = useState('feed')      // feed | profile | link
  const [interacted, setInteracted] = useState(false)

  function handleCheckProfile() {
    setView('profile')
  }

  function handleFollowLink() {
    if (interacted) return
    setInteracted(true)
    onInteract('followed_link')
  }

  function handleReportAccount() {
    if (interacted) return
    setInteracted(true)
    onInteract('reported_account')
  }

  function handleVerifyOfficial() {
    if (interacted) return
    setInteracted(true)
    onInteract('checked_official_account')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Instagram — {view === 'profile' ? 'Profile Page' : 'Your Feed'}
      </div>

      {/* Instagram app shell */}
      <div style={{
        background: '#000',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        maxWidth: 380,
        margin: '0 auto',
        fontFamily: '-apple-system, "Segoe UI", sans-serif',
      }}>

        {/* Instagram top bar */}
        <div style={{
          background: '#000',
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'serif' }}>
            {view === 'profile' ? fakeHandle : 'Instagram'}
          </span>
          <div style={{ display: 'flex', gap: 16, fontSize: 20 }}>
            <span style={{ cursor: 'pointer' }}>🔔</span>
            <span style={{ cursor: 'pointer' }}>✉️</span>
          </div>
        </div>

        {/* ── PROFILE VIEW ── */}
        {view === 'profile' && (
          <div style={{ background: '#000', paddingBottom: 12 }}>
            {/* Profile header */}
            <div style={{ padding: '16px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
                {/* Avatar */}
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                  padding: 2, flexShrink: 0,
                }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: '#222',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28,
                  }}>🎓</div>
                </div>
                {/* Stats */}
                <div style={{ display: 'flex', gap: 20 }}>
                  {[
                    { val: postCount, label: 'posts' },
                    { val: followerCount, label: 'followers' },
                    { val: '12', label: 'following' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{s.val}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Name + bio */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    {collegeName} Admissions
                  </span>
                  {/* No verified badge — red flag */}
                </div>
                <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  {bio}
                </div>
                <div style={{
                  fontSize: 12, color: '#4fc3f7', marginTop: 4,
                  fontFamily: 'var(--mono)',
                }}>{fakeDomain}</div>
              </div>

              {/* Account age warning */}
              <div style={{
                background: 'rgba(201,78,78,0.1)',
                border: '1px solid rgba(201,78,78,0.3)',
                borderRadius: 8, padding: '8px 10px',
                fontSize: 12, color: '#e8a8a8',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span>⚠️</span>
                <span>{accountAge}</span>
              </div>
            </div>

            {/* Post grid — only 3 posts */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2, padding: '0 2px',
            }}>
              {['🎓', '📋', '📢'].map((emoji, i) => (
                <div key={i} style={{
                  aspectRatio: '1', background: '#1a1a1a',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 28,
                }}>{emoji}</div>
              ))}
            </div>

            {/* Actions */}
            {!interacted && (
              <div style={{
                padding: '12px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                marginTop: 8,
              }}>
                <button onClick={handleFollowLink} style={{
                  background: '#0095f6', color: '#fff', border: 'none',
                  borderRadius: 8, padding: '11px', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer',
                }}>Open Link in Bio — Apply for Scholarship</button>
                <button onClick={handleVerifyOfficial} style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff', borderRadius: 8,
                  padding: '11px', fontSize: 13, cursor: 'pointer',
                }}>Search for the real {collegeName} account</button>
                <button onClick={handleReportAccount} style={{
                  background: 'transparent', border: 'none',
                  color: '#aaa', fontSize: 12,
                  cursor: 'pointer', padding: '6px',
                }}>Report this account for impersonation</button>
              </div>
            )}
          </div>
        )}

        {/* ── FEED VIEW ── */}
        {view === 'feed' && (
          <div style={{ background: '#000' }}>
            {/* Post header */}
            <div style={{
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                padding: 2, flexShrink: 0, cursor: 'pointer',
              }} onClick={handleCheckProfile}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: '#222',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>🎓</div>
              </div>
              <div style={{ flex: 1, cursor: 'pointer' }} onClick={handleCheckProfile}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                    {fakeHandle}
                  </span>
                  {/* Deliberately no blue tick */}
                </div>
                <div style={{ fontSize: 11, color: '#aaa' }}>Sponsored</div>
              </div>
              <span style={{ color: '#aaa', fontSize: 18, cursor: 'pointer' }}>···</span>
            </div>

            {/* Post image */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              padding: '32px 20px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48 }}>🎓</div>
              <div style={{
                fontSize: 20, fontWeight: 800, color: '#fff',
                letterSpacing: '-0.5px',
              }}>{collegeName}</div>
              <div style={{
                background: '#0095f6', color: '#fff',
                padding: '6px 16px', borderRadius: 20,
                fontSize: 13, fontWeight: 600,
              }}>Merit Scholarship 2024</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>
                Last date: This Friday · Limited seats
              </div>
            </div>

            {/* Like/comment bar */}
            <div style={{
              padding: '8px 14px',
              display: 'flex', gap: 14, fontSize: 22,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ cursor: 'pointer' }}>🤍</span>
              <span style={{ cursor: 'pointer' }}>💬</span>
              <span style={{ cursor: 'pointer' }}>↗️</span>
            </div>

            {/* Caption */}
            <div style={{ padding: '10px 14px' }}>
              <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 6 }}>
                <strong>{fakeHandle}</strong> {postCaption}
              </div>
              <div style={{
                fontSize: 12.5, color: '#0095f6', marginBottom: 4, cursor: 'pointer',
              }}>🔗 Link in bio: {fakeDomain}</div>
              <div style={{ fontSize: 11, color: '#aaa' }}>{postAge}</div>
            </div>

            {/* Tap profile prompt */}
            <div style={{
              padding: '10px 14px',
              textAlign: 'center', fontSize: 12, color: '#5a5a5e',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
            }} onClick={handleCheckProfile}>
              Tap the profile picture to check the account →
            </div>
          </div>
        )}
      </div>

      {/* Red flags box — shown after profile is checked */}
      {view === 'profile' && redFlags.length > 0 && (
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
          }}>⚠ Red Flags on This Account</div>
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
   WhatsappImpersonationEnv
   A WhatsApp conversation from a contact using a classmate's
   name and profile photo but a different number, asking to
   borrow money urgently due to an "emergency."
══════════════════════════════════════════════════════════ */
export function WhatsappImpersonationEnv({ envProps, onInteract }) {
  const {
    contactName     = 'Arjun Mehta',
    contactInitial  = 'A',
    contactBg       = '#ff9800',
    newNumber       = '+91 94XXX XXXXX',
    originalNumber  = '+91 98XXX XXXXX',
    amount          = '₹3,000',
    reason          = 'stuck at the airport, wallet stolen',
    upiId           = 'arjun.help2024@paytm',
    messageDelayMs  = 1500,
    accentColor     = '#25d366',
  } = envProps

  const [visibleMsgs, setVisible]   = useState([])
  const [msgIdx, setMsgIdx]         = useState(0)
  const [interacted, setInteracted] = useState(false)

  const messages = [
    { text: `Hey it's Arjun. New number, lost my phone. Please don't call the old one.` },
    { text: `I'm ${reason}. Really need ${amount} urgently. Can you send it?` },
    { text: `Please send to this UPI: ${upiId}` },
    { text: `I'll pay you back tomorrow I promise 🙏` },
  ]

  useEffect(() => {
    if (msgIdx >= messages.length) return
    const t = setTimeout(() => {
      setVisible(v => [...v, messages[msgIdx]])
      setMsgIdx(i => i + 1)
    }, msgIdx === 0 ? messageDelayMs : messageDelayMs + 200)
    return () => clearTimeout(t)
  }, [msgIdx])

  function handleSendMoney() {
    if (interacted) return
    setInteracted(true)
    onInteract('sent_money')
  }

  function handleCallOriginal() {
    if (interacted) return
    setInteracted(true)
    onInteract('called_original_number')
  }

  function handleAskQuestion() {
    if (interacted) return
    setInteracted(true)
    onInteract('asked_verification_question')
  }

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        WhatsApp — {contactName}
      </div>

      <div style={{
        background: '#0b141a',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        maxWidth: 380,
        margin: '0 auto',
        fontFamily: '-apple-system, "Segoe UI", sans-serif',
      }}>
        {/* Header */}
        <div style={{
          background: '#1f2c34', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: contactBg, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#fff',
          }}>{contactInitial}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#e9edef' }}>{contactName}</div>
            <div style={{ fontSize: 11, color: '#8696a0' }}>{newNumber} · Not in your contacts</div>
          </div>
          <div style={{ fontSize: 18, color: '#8696a0', cursor: 'pointer' }}>📞</div>
        </div>

        {/* Number change notice */}
        <div style={{
          background: 'rgba(255,193,7,0.08)',
          border: '1px solid rgba(255,193,7,0.2)',
          margin: '8px 10px',
          borderRadius: 8, padding: '8px 10px',
          fontSize: 11.5, color: '#ffd54f',
          display: 'flex', gap: 6, alignItems: 'flex-start',
        }}>
          <span style={{ flexShrink: 0 }}>⚠️</span>
          <span>
            This is a new number. {contactName}'s saved number is{' '}
            <strong style={{ fontFamily: 'var(--mono)' }}>{originalNumber}</strong>
          </span>
        </div>

        {/* Chat */}
        <div style={{
          background: '#0b141a',
          padding: '8px 12px',
          minHeight: 180, maxHeight: 260, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {visibleMsgs.map((msg, i) => (
            <div key={i} style={{
              alignSelf: 'flex-start', maxWidth: '85%',
              animation: 'vsim-slide-up 0.3s ease both',
            }}>
              <div style={{
                background: '#202c33',
                borderRadius: '0 8px 8px 8px',
                padding: '8px 10px 6px',
                color: '#e9edef', fontSize: 13.5, lineHeight: 1.5,
              }}>{msg.text}</div>
              <div style={{ fontSize: 10, color: '#8696a0', marginTop: 2, marginLeft: 4 }}>{time}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {msgIdx < messages.length && (
            <div style={{ display: 'flex', gap: 3, padding: '4px 2px', alignItems: 'center' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#8696a0',
                  animation: `dc-dot 1s ${i * 0.15}s ease-in-out infinite`,
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {msgIdx >= messages.length && !interacted && (
          <div style={{
            background: '#1f2c34', padding: '12px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <button onClick={handleSendMoney} style={{
              background: accentColor, color: '#fff', border: 'none',
              borderRadius: 8, padding: '11px', fontSize: 13,
              fontWeight: 600, cursor: 'pointer',
            }}>Send {amount} to the UPI ID</button>
            <button onClick={handleCallOriginal} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e9edef', borderRadius: 8,
              padding: '11px', fontSize: 13, cursor: 'pointer',
            }}>Call Arjun on the saved number first</button>
            <button onClick={handleAskQuestion} style={{
              background: 'transparent', border: 'none',
              color: '#8696a0', fontSize: 12,
              cursor: 'pointer', padding: '6px',
            }}>Ask something only the real Arjun would know</button>
          </div>
        )}
      </div>
    </div>
  )
}
