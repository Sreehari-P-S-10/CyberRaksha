/**
 * components/GiveawayScamEnv.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environment for the Giveaway / Influencer Scam simulation.
 *
 * Exported:
 *   GiveawayScamEnv   — Step 1: fake Instagram influencer post
 *   GiveawayPortalEnv — Step 2: fake "Prize Claim Portal" with fee
 *
 * Engine contract:
 *   onInteract(eventType) is called when the user does something.
 *   If eventType matches a choice id in simulationsData, the engine
 *   auto-selects that choice. Otherwise it reveals the choice panel.
 *   We fire 'interacted' (no matching choice id) to reveal the panel.
 *
 * CSS classes used — all from VisualSim.css, nothing new needed:
 *   vsim-root, vsim-scene-label, vsim-scene-dot,
 *   vsim-warning-overlay, vsim-warning-title, vsim-warning-list,
 *   fade-in, float, glow, cta-pulse,
 *   lp-container, lp-bar, lp-domain, lp-card, lp-title, lp-sub,
 *   lp-box, lp-warning, lp-amount, lp-timer, lp-btn, lp-trust,
 *   tp-card-hover
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════════════════
   GiveawayScamEnv  —  Step 1
   A fake Instagram post from an influencer impersonator
   running a giveaway. The user can:
     • Tap the profile picture  → see the profile page (reveals red flags)
     • Click "Claim Your Prize" → fires onInteract → engine shows choices
     • Use the "Search real account" button → fires onInteract
   All three surface the choice panel; the chosen choice outcome
   is handled entirely by the engine.
══════════════════════════════════════════════════════════ */
export function GiveawayScamEnv({ envProps, onInteract }) {
  const {
    fakeHandle      = '@CarryMinati_Giveaway_Official',
    realHandle      = '@carryminati',
    influencerName  = 'CarryMinati',
    followerCount   = '2,847',      // fake account's followers
    realFollowers   = '18.4M',      // real account's followers (shown on profile)
    accountAgeDays  = 6,
    prizeItem       = 'iPhone 15 Pro',
    prizeValue      = '₹1,30,000',
    postLikes       = '14.2K',
    handlingFee     = '₹199',
    claimDomain     = 'carryminati-giveaway.in',
    expiryHours     = 24,
    postCaption     = `🎁 MEGA GIVEAWAY 🎁\n\nI'm giving away 10 iPhone 15 Pros to celebrate 10 crore subscribers!\n\n✅ Follow this account\n✅ Like this post\n✅ Tag 2 friends\n✅ Click the link in bio to register\n\nWinners announced in 24 hours! Don't miss out 🔥`,
  } = envProps

  /* 'feed' → user sees the post
     'profile' → user tapped the avatar and sees profile details     */
  const [view, setView]       = useState('feed')
  const [interacted, setInteracted] = useState(false)
  const [liked, setLiked]     = useState(false)
  const [likeCount, setLikeCount] = useState(postLikes)

  /* Countdown timer string  */
  const [secsLeft, setSecsLeft] = useState(expiryHours * 3600)
  useEffect(() => {
    const id = setInterval(() => setSecsLeft(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const hh  = String(Math.floor(secsLeft / 3600)).padStart(2, '0')
  const mm  = String(Math.floor((secsLeft % 3600) / 60)).padStart(2, '0')
  const ss  = String(secsLeft % 60).padStart(2, '0')

  function handleAvatarClick() {
    setView('profile')
  }

  function handleClaimClick() {
    if (interacted) return
    setInteracted(true)
    // Fire non-matching id so engine shows the choice panel
    onInteract('interacted')
  }

  function handleSearchReal() {
    if (interacted) return
    setInteracted(true)
    onInteract('interacted')
  }

  function handleLike() {
    if (liked) return
    setLiked(true)
    // Increment the displayed like count by 1
    const num   = parseFloat(postLikes.replace('K', '')) * 1000
    const newN  = (num + 1) / 1000
    setLikeCount(newN.toFixed(1) + 'K')
  }

  /* ── Story ring gradient (Instagram style) ── */
  const storyRing = 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'

  /* ── Fake comment rows ── */
  const fakeComments = [
    { handle: 'priya_Singh92', text: 'OMG I won last time!! 🎉 Legit!!', delay: 0 },
    { handle: 'gamer_rohan_',  text: 'Bro this is real I got mine last month', delay: 0 },
    { handle: 'sneha.official', text: 'Entering rn 🙏🙏', delay: 0 },
  ]

  return (
    <div className="vsim-root fade-in">

      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Instagram — {view === 'profile' ? `${fakeHandle} · Profile` : 'Your Feed'}
      </div>

      {/* ─── Instagram app shell ─── */}
      <div style={{
        background: '#000',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        maxWidth: 390,
        margin: '0 auto',
        fontFamily: '-apple-system, "Segoe UI", sans-serif',
      }}>

        {/* Top bar */}
        <div style={{
          background: '#000',
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{
            fontSize: 20, fontWeight: 800, color: '#fff',
            fontFamily: '"Billabong", "Grand Hotel", serif', letterSpacing: '0.5px',
          }}>
            {view === 'profile' ? fakeHandle : 'Instagram'}
          </span>
          <div style={{ display: 'flex', gap: 16, fontSize: 20 }}>
            {view === 'feed' && <span style={{ cursor: 'pointer' }}>🔔</span>}
            {view === 'profile' && (
              <span
                style={{ fontSize: 13, color: '#aaa', cursor: 'pointer', paddingTop: 4 }}
                onClick={() => setView('feed')}
              >← Back</span>
            )}
            <span style={{ cursor: 'pointer' }}>✉️</span>
          </div>
        </div>

        {/* ════════════════════════════
            PROFILE VIEW
        ════════════════════════════ */}
        {view === 'profile' && (
          <div style={{ background: '#000', paddingBottom: 16, animation: 'vsim-slide-up 0.3s ease both' }}>

            {/* Profile header */}
            <div style={{ padding: '16px 14px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>

                {/* Avatar — story ring but NO blue tick */}
                <div style={{
                  width: 76, height: 76, borderRadius: '50%',
                  background: storyRing,
                  padding: 2.5, flexShrink: 0,
                }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: '#222',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32,
                  }}>🎭</div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 22 }}>
                  {[
                    { val: '6',           label: 'posts' },
                    { val: followerCount, label: 'followers' },
                    { val: '4',           label: 'following' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{s.val}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Name row — deliberately NO blue verified tick */}
              <div style={{ marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    {influencerName} Giveaways
                  </span>
                  {/* No ✓ badge here — that is the red flag */}
                </div>
                <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5, marginTop: 2 }}>
                  Official Giveaway Account 🎁<br />
                  Win prizes! Link in bio to claim →
                </div>
                <div style={{
                  fontSize: 12, color: '#4fc3f7', marginTop: 4,
                  fontFamily: 'var(--mono)',
                }}>{claimDomain}</div>
              </div>

              {/* ⚠ Account age warning — most important red flag */}
              <div style={{
                background: 'rgba(201,78,78,0.1)',
                border: '1px solid rgba(201,78,78,0.35)',
                borderRadius: 8, padding: '8px 10px', marginTop: 10,
                fontSize: 12, color: '#e8a8a8',
                display: 'flex', alignItems: 'flex-start', gap: 6,
              }}>
                <span style={{ flexShrink: 0 }}>⚠️</span>
                <span>Account created only <strong style={{ color: '#ff6b6b' }}>{accountAgeDays} days ago</strong> — not the real {influencerName}</span>
              </div>

              {/* Real vs fake comparison */}
              <div style={{
                marginTop: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '10px 12px',
                fontSize: 12,
              }}>
                <div style={{ color: '#aaa', marginBottom: 6, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Compare accounts
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: 'rgba(201,78,78,0.08)', borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ fontSize: 11, color: '#C94E4E', fontWeight: 700, marginBottom: 4 }}>THIS ACCOUNT</div>
                    <div style={{ color: '#ccc' }}>{fakeHandle}</div>
                    <div style={{ color: '#888', fontSize: 11 }}>{followerCount} followers</div>
                    <div style={{ color: '#888', fontSize: 11 }}>{accountAgeDays} days old</div>
                    <div style={{ color: '#888', fontSize: 11 }}>No blue tick ✗</div>
                  </div>
                  <div style={{ background: 'rgba(46,184,122,0.08)', borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ fontSize: 11, color: '#2EB87A', fontWeight: 700, marginBottom: 4 }}>REAL ACCOUNT</div>
                    <div style={{ color: '#ccc' }}>{realHandle}</div>
                    <div style={{ color: '#888', fontSize: 11 }}>{realFollowers} followers</div>
                    <div style={{ color: '#888', fontSize: 11 }}>Years old</div>
                    <div style={{ color: '#2EB87A', fontSize: 11 }}>✓ Verified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post grid — only 6 posts, all giveaway related */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2, padding: '0 2px',
            }}>
              {['🎁','📱','💰','🎁','📦','🎉'].map((emoji, i) => (
                <div key={i} style={{
                  aspectRatio: '1', background: '#1a1a1a',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 28,
                }}>{emoji}</div>
              ))}
            </div>

            {/* Action buttons */}
            {!interacted && (
              <div style={{
                padding: '12px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
                borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 8,
              }}>
                <button
                  onClick={handleClaimClick}
                  className="cta-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #ff9500, #ff6b00)',
                    color: '#fff', border: 'none',
                    borderRadius: 8, padding: '11px', fontSize: 13,
                    fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(255,149,0,0.35)',
                  }}
                >
                  🎁 Claim Your Prize — {prizeItem}
                </button>
                <button
                  onClick={handleSearchReal}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', borderRadius: 8,
                    padding: '11px', fontSize: 13, cursor: 'pointer',
                  }}
                >
                  🔍 Search for real {realHandle} account
                </button>
                <button
                  onClick={handleSearchReal}
                  style={{
                    background: 'transparent', border: 'none',
                    color: '#aaa', fontSize: 12,
                    cursor: 'pointer', padding: '6px',
                  }}
                >
                  Report account for impersonation
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════
            FEED VIEW
        ════════════════════════════ */}
        {view === 'feed' && (
          <div style={{ background: '#000' }}>

            {/* Post header — avatar + handle (no blue tick) */}
            <div style={{
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              {/* Clickable story-ring avatar */}
              <div
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: storyRing,
                  padding: 2, flexShrink: 0, cursor: 'pointer',
                }}
                onClick={handleAvatarClick}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: '#111',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17,
                }}>🎭</div>
              </div>

              <div style={{ flex: 1, cursor: 'pointer' }} onClick={handleAvatarClick}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                    {fakeHandle}
                  </span>
                  {/* Deliberately NO blue verified badge */}
                </div>
                <div style={{ fontSize: 11, color: '#aaa' }}>Sponsored</div>
              </div>
              <span style={{ color: '#aaa', fontSize: 20, cursor: 'pointer', paddingBottom: 2 }}>···</span>
            </div>

            {/* Post image — giveaway graphic */}
            <div style={{
              background: 'linear-gradient(160deg, #1a0a00 0%, #2d1600 40%, #1a0505 100%)',
              padding: '28px 20px 24px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10,
              textAlign: 'center',
              position: 'relative', overflow: 'hidden',
              minHeight: 200,
            }}>
              {/* Shimmer overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(120deg, transparent 30%, rgba(255,149,0,0.04) 50%, transparent 70%)',
                animation: 'ec-shimmer 2.5s linear infinite',
              }} />

              {/* Prize emoji — floating */}
              <div className="float" style={{ fontSize: 54, lineHeight: 1, zIndex: 2 }}>📱</div>

              {/* Headline */}
              <div style={{
                fontSize: 22, fontWeight: 900, color: '#fff',
                letterSpacing: '-0.5px', lineHeight: 1.2, zIndex: 2,
              }}>
                🎁 {prizeItem} GIVEAWAY 🎁
              </div>

              {/* Prize value badge */}
              <div style={{
                background: 'linear-gradient(135deg, #ff9500, #ff6b00)',
                color: '#fff', padding: '5px 16px',
                borderRadius: 20, fontSize: 13, fontWeight: 700,
                zIndex: 2,
                boxShadow: '0 4px 16px rgba(255,149,0,0.4)',
              }}>
                Worth {prizeValue}
              </div>

              {/* Fake winner count */}
              <div style={{
                fontSize: 12, color: 'rgba(255,255,255,0.55)',
                zIndex: 2,
              }}>
                🏆 10 winners · Announced in {hh}:{mm}:{ss}
              </div>

              {/* Countdown strip */}
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                borderRadius: 8, padding: '6px 14px',
                fontSize: 12, color: '#ff9500',
                fontFamily: 'var(--mono)', zIndex: 2,
                border: '1px solid rgba(255,149,0,0.25)',
                animation: secsLeft < 3600 ? 'vsim-pulse 1s infinite' : 'none',
              }}>
                ⏳ Claim closes in: {hh}:{mm}:{ss}
              </div>
            </div>

            {/* Like / Comment / Share bar */}
            <div style={{
              padding: '8px 14px',
              display: 'flex', gap: 14, alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span
                onClick={handleLike}
                style={{
                  fontSize: 22, cursor: 'pointer',
                  filter: liked ? 'none' : 'none',
                  transition: 'transform 0.15s',
                }}
              >
                {liked ? '❤️' : '🤍'}
              </span>
              <span style={{ cursor: 'pointer', fontSize: 22 }}>💬</span>
              <span style={{ cursor: 'pointer', fontSize: 22 }}>↗️</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: '#aaa' }}>
                {likeCount} likes
              </span>
            </div>

            {/* Caption */}
            <div style={{ padding: '10px 14px 6px' }}>
              <div style={{
                fontSize: 13, color: '#fff', lineHeight: 1.65,
                whiteSpace: 'pre-line', marginBottom: 6,
              }}>
                <strong>{fakeHandle}</strong>{' '}
                {postCaption}
              </div>

              {/* Link in bio */}
              <div style={{
                fontSize: 12.5, color: '#4fc3f7',
                marginBottom: 4, cursor: 'pointer',
                fontFamily: 'var(--mono)',
              }}>
                🔗 Link in bio: {claimDomain}
              </div>
            </div>

            {/* Fake comments */}
            <div style={{ padding: '0 14px 8px' }}>
              {fakeComments.map((c, i) => (
                <div key={i} style={{
                  fontSize: 12.5, color: '#ccc', marginBottom: 3,
                  lineHeight: 1.4,
                }}>
                  <strong style={{ color: '#fff' }}>{c.handle}</strong>{' '}{c.text}
                </div>
              ))}
              <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>2 hours ago</div>
            </div>

            {/* CTA button — visible below the post */}
            {!interacted ? (
              <div style={{ padding: '8px 14px 14px' }}>
                <button
                  onClick={handleClaimClick}
                  className="cta-pulse glow"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #ff9500, #ff6b00)',
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14, fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(255,149,0,0.4)',
                  }}
                >
                  🎁 Claim Your Prize Now →
                </button>
                <div style={{
                  textAlign: 'center', marginTop: 8,
                  fontSize: 11.5, color: '#636366',
                }}>
                  or tap the profile picture above to check the account
                </div>
              </div>
            ) : (
              <div style={{
                padding: '10px 14px 14px',
                textAlign: 'center', fontSize: 12, color: '#555',
              }}>
                Interacted ✓
              </div>
            )}
          </div>
        )}
      </div>

      {/* Red flags — shown once user opens the profile */}
      {view === 'profile' && (
        <div style={{
          background: 'rgba(201,78,78,0.07)',
          border: '1px solid rgba(201,78,78,0.25)',
          borderRadius: 10, padding: '14px 16px',
          animation: 'vsim-slide-up 0.35s ease both',
        }}>
          <div style={{
            fontSize: 11, fontFamily: 'var(--mono)',
            color: '#C94E4E', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>⚠ Red Flags on This Account</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              `Account created only ${accountAgeDays} days ago — the real ${influencerName} has been on Instagram for years`,
              `Only ${followerCount} followers — real ${influencerName} has ${realFollowers}`,
              'No blue verified badge next to the username',
              `Handle is "${fakeHandle}" — real handle is "${realHandle}"`,
              'Claim link leads to an unofficial .in domain, not a verified channel',
              'Real giveaways are always announced on the verified account only',
            ].map((flag, i) => (
              <div key={i} style={{
                fontSize: 12.5, color: '#e8a8a8',
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <span style={{ color: '#C94E4E', flexShrink: 0, marginTop: 1 }}>→</span>
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
   GiveawayPortalEnv  —  Step 2
   The fake "Prize Claim Portal" shown if the user clicked
   the giveaway link. Uses lp- classes from VisualSim.css
   exactly as LotteryPaymentEnv does, extended with a
   shipping address form and escalating fee reveals.
══════════════════════════════════════════════════════════ */
export function GiveawayPortalEnv({ envProps, onInteract }) {
  const {
    prizeItem     = 'iPhone 15 Pro',
    prizeValue    = '₹1,30,000',
    handlingFee   = '₹199',
    claimDomain   = 'carryminati-giveaway.in',
    referenceId   = 'CG-2024-' + Math.floor(10000 + Math.random() * 90000),
    influencerName = 'CarryMinati',
  } = envProps

  /* 'form' → 'loading' → 'fee' */
  const [phase, setPhase]   = useState('form')
  const [name, setName]     = useState('')
  const [addr, setAddr]     = useState('')
  const [phone, setPhone]   = useState('')
  const [paying, setPaying] = useState(false)

  /* Countdown for urgency */
  const [secsLeft, setSecsLeft] = useState(14 * 60 + 59)
  useEffect(() => {
    const id = setInterval(() => setSecsLeft(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(secsLeft / 60)).padStart(2, '0')
  const ss = String(secsLeft % 60).padStart(2, '0')

  function handleSubmitDetails() {
    if (!name || !addr) return
    setPhase('loading')
    setTimeout(() => setPhase('fee'), 1800)
  }

  function handlePay() {
    if (paying) return
    setPaying(true)
    setTimeout(() => onInteract('interacted'), 1200)
  }

  function handleClose() {
    if (paying) return
    onInteract('interacted')
  }

  return (
    <div className="vsim-root fade-in">

      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={{ background: '#ff5252', animation: 'vsim-pulse 1s infinite' }} />
        Fake Prize Claim Website
      </div>

      <div className="lp-container">

        {/* Browser address bar — domain in orange = suspicious */}
        <div className="lp-bar">
          🔒 <span className="lp-domain">{claimDomain}</span>
          <span style={{
            marginLeft: 8, fontSize: 10,
            background: 'rgba(244,162,97,0.15)', color: '#f4a261',
            padding: '1px 5px', borderRadius: 3,
          }}>⚠ Not {influencerName}'s official site</span>
        </div>

        {/* Main card */}
        <div className="lp-card tp-card-hover">

          {/* Congratulations header */}
          <div className="lp-title">🎉 Congratulations!</div>
          <div className="lp-sub">
            You have been selected as a winner of the<br />
            <strong style={{ color: '#fff' }}>{influencerName} {prizeItem} Giveaway</strong>
          </div>

          {/* Reference ID */}
          <div className="lp-box">
            <div style={{ fontSize: 11, color: '#888', marginBottom: 3 }}>Your Winner Reference ID</div>
            <strong style={{ fontFamily: 'var(--mono)', color: '#fff', letterSpacing: '0.08em' }}>
              {referenceId}
            </strong>
          </div>

          {/* Prize display */}
          <div style={{ marginBottom: 14 }}>
            <div className="float" style={{ fontSize: 44, lineHeight: 1, marginBottom: 8 }}>📱</div>
            <div style={{ fontSize: 13, color: '#aaa', marginBottom: 2 }}>Prize</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{prizeItem}</div>
            <div style={{ fontSize: 12, color: '#2EB87A' }}>Worth {prizeValue}</div>
          </div>

          {/* ── FORM PHASE ── */}
          {phase === 'form' && (
            <div style={{ textAlign: 'left', animation: 'vsim-slide-up 0.3s ease' }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: '#fff',
                marginBottom: 10, textAlign: 'center',
              }}>
                Enter your delivery details to claim your prize
              </div>

              {[
                { label: 'Full Name *', value: name,  setter: setName,  placeholder: 'Enter your full name' },
                { label: 'Delivery Address *', value: addr, setter: setAddr, placeholder: 'House/Flat, Street, City, PIN' },
                { label: 'Mobile Number', value: phone, setter: setPhone, placeholder: '+91 XXXXX XXXXX' },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <label style={{
                    display: 'block', fontSize: 11.5,
                    color: '#aaa', marginBottom: 4,
                  }}>{label}</label>
                  <input
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder}
                    style={{
                      width: '100%', padding: '9px 11px',
                      borderRadius: 7, fontSize: 13,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}

              <button
                onClick={handleSubmitDetails}
                disabled={!name || !addr}
                className={name && addr ? 'cta-pulse' : ''}
                style={{
                  width: '100%', padding: '12px',
                  background: name && addr
                    ? 'linear-gradient(135deg, #ff9500, #ff6b00)'
                    : 'rgba(255,255,255,0.1)',
                  border: 'none', borderRadius: 8,
                  color: '#fff', fontWeight: 700, fontSize: 14,
                  cursor: name && addr ? 'pointer' : 'default',
                  transition: 'background 0.2s',
                  marginTop: 2,
                }}
              >
                Submit Details & Proceed
              </button>
            </div>
          )}

          {/* ── LOADING PHASE ── */}
          {phase === 'loading' && (
            <div style={{
              textAlign: 'center', padding: '20px 0',
              animation: 'vsim-slide-up 0.3s ease',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.1)',
                borderTop: '3px solid #ff9500',
                animation: 'spin 0.7s linear infinite',
                margin: '0 auto 12px',
              }} />
              <div style={{ fontSize: 13, color: '#aaa' }}>Verifying your winner status...</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* ── FEE PHASE ── */}
          {phase === 'fee' && (
            <div style={{ animation: 'vsim-slide-up 0.35s ease' }}>

              {/* "Verification passed" banner */}
              <div style={{
                background: 'rgba(46,184,122,0.1)',
                border: '1px solid rgba(46,184,122,0.25)',
                borderRadius: 7, padding: '8px 12px',
                fontSize: 12.5, color: '#4ade80',
                marginBottom: 12, textAlign: 'center',
              }}>
                ✓ Identity verified! One last step to complete your claim.
              </div>

              <div className="lp-warning">
                ⚠ A small handling & shipping fee is required to dispatch your prize
              </div>

              {/* The fee amount */}
              <div className="lp-amount">{handlingFee}</div>

              {/* Urgency countdown */}
              <div className="lp-timer">
                ⏳ Offer expires in: {mm}:{ss}
              </div>

              {/* Pay button */}
              <button
                className="lp-btn glow"
                onClick={handlePay}
                disabled={paying}
                style={{ opacity: paying ? 0.7 : 1 }}
              >
                {paying ? 'Processing payment...' : `Pay ${handlingFee} to Claim Prize`}
              </button>

              {/* Trust badges */}
              <div className="lp-trust">
                🔒 Secure Payment &nbsp;·&nbsp; 256-bit SSL &nbsp;·&nbsp; Govt Approved
              </div>

              {/* Close link */}
              {!paying && (
                <div
                  onClick={handleClose}
                  style={{
                    fontSize: 11.5, color: '#555',
                    cursor: 'pointer', marginTop: 10,
                    textDecoration: 'underline',
                  }}
                >
                  No thanks, I don't want my prize
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Red flags warning overlay */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags on This Page</div>
        <ul className="vsim-warning-list">
          <li>Domain <strong>{claimDomain}</strong> is not {influencerName}'s official channel</li>
          <li>Real giveaway prizes are ALWAYS delivered free — no handling fees</li>
          <li>Countdown timer creates artificial urgency to stop you thinking clearly</li>
          <li>Collecting your address + phone number enables further targeting</li>
          <li>Fake "Govt Approved" badge — no such certification exists for giveaways</li>
        </ul>
      </div>

    </div>
  )
}
