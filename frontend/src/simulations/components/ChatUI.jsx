/**
 * components/ChatUI.jsx
 * Reusable chat environments:
 *   DiscordDMEnv        — Discord DM with scam link
 *   ColleagueScenarioEnv — text scenario card (tech support step 2)
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════
   DISCORD DM ENVIRONMENT
══════════════════════════════════════════════ */
export function DiscordDMEnv({ envProps, onInteract }) {
  const {
    serverName = 'Gaming Server',
    scamAccount,
    skinName,
    skinValue,
    fakeDomain,
    expiryMinutes = 30,
  } = envProps

  const [showTyping, setShowTyping] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [linkTapped, setLinkTapped] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowTyping(true), 1200)
    const t2 = setTimeout(() => { setShowTyping(false); setShowMsg(true) }, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  function handleLink() {
    if (linkTapped) return
    setLinkTapped(true)
    setTimeout(() => onInteract('link_clicked'), 400)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" /> Discord — Direct Message from {scamAccount}
      </div>

      <div className="discord-app">
        <div className="discord-title-bar">
          <div className="discord-title-bar-dot r" /><div className="discord-title-bar-dot y" /><div className="discord-title-bar-dot g" />
          <div className="discord-title-bar-text">Discord</div>
        </div>
        <div className="discord-layout">
          <div className="discord-sidebar">
            <div className="discord-server-icon active">V</div>
            <div className="discord-server-icon" style={{ background: '#5865f2' }}>+</div>
          </div>

          {/* Channel list */}
          <div className="discord-channels">
            <div className="discord-channel-header">{serverName}</div>
            <div className="discord-channel-item"># announcements</div>
            <div className="discord-channel-item"># general-chat</div>
            <div className="discord-channel-item"># highlights</div>
            <div className="discord-channel-item" style={{ color: '#fee75c', background: 'rgba(254,231,92,0.08)', borderRadius: 4, margin: '2px 8px', padding: '5px 8px' }}>
              📩 DMs (1)
            </div>
          </div>

          {/* DM view */}
          <div className="discord-main">
            <div className="discord-dm-header">
              <div className="discord-dm-avatar">{scamAccount[0]}</div>
              <div>
                <div className="discord-dm-name">{scamAccount}</div>
                <div style={{ fontSize: 11, color: '#57f287', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#57f287', display: 'inline-block' }} />
                  Online
                </div>
              </div>
            </div>

            <div className="discord-messages" style={{ flex: 1 }}>
              {showTyping && (
                <div className="discord-typing">
                  <div className="discord-typing-dots">
                    <div className="discord-typing-dot" />
                    <div className="discord-typing-dot" />
                    <div className="discord-typing-dot" />
                  </div>
                  {scamAccount} is typing...
                </div>
              )}

              {showMsg && (
                <div className="discord-msg discord-msg-incoming">
                  <div className="discord-msg-avatar scammer">{scamAccount[0]}</div>
                  <div className="discord-msg-body">
                    <div className="discord-msg-header">
                      <span className="discord-msg-name scammer">{scamAccount}</span>
                      <span className="discord-msg-time">Today at {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="discord-msg-text">
                      🎁 <strong>FREE SKIN GIVEAWAY — OFFICIAL EVENT 🎁</strong><br />
                      Congrats! You've been selected for our giveaway.<br />
                      Claim your free <strong>{skinName}</strong> skins (worth {skinValue}) now!<br /><br />
                      → Claim here:{' '}
                      <span
                        className="discord-msg-link"
                        onClick={handleLink}
                        style={{ opacity: linkTapped ? 0.5 : 1, cursor: linkTapped ? 'default' : 'pointer' }}
                      >
                        {fakeDomain}/claim
                      </span>
                      <div className="discord-msg-embed">
                        <div className="discord-msg-embed-title">🎮 {skinName} — Free Claim</div>
                        <div>Official Giveaway · {skinValue} value</div>
                      </div>
                      <div style={{ fontSize: 12, color: '#72767d', marginTop: 6 }}>
                        ⚠️ Expires in {expiryMinutes} minutes
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="discord-input-bar">
              <input placeholder={`Message ${scamAccount}`} readOnly />
            </div>
          </div>
        </div>
      </div>

      {showMsg && !linkTapped && (
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          👆 Tap the link in the message to see what happens
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   COLLEAGUE SCENARIO (text card — no special UI needed)
══════════════════════════════════════════════ */
export function ColleagueScenarioEnv({ envProps }) {
  const { colleagueName, softwareName, callerClaim } = envProps
  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" /> Workplace — {colleagueName} is about to be scammed
      </div>
      <div style={{
        background: 'var(--ink2)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, padding: '18px 20px',
        fontSize: 14, color: 'var(--text-1)', lineHeight: 1.7,
      }}>
        <p>
          A colleague named <strong>{colleagueName}</strong> just called the tech support number.
          The "{callerClaim}" agent has asked them to install{' '}
          <strong style={{ color: '#f4a261' }}>{softwareName}</strong> so they can
          "fix the virus remotely." Your colleague covers the phone and asks you:
        </p>
        <div style={{
          marginTop: 14, background: 'rgba(212,137,26,0.08)',
          borderLeft: '3px solid var(--amber)', padding: '10px 14px',
          borderRadius: '0 6px 6px 0', fontStyle: 'italic',
        }}>
          "Is this okay? They sound very professional and say they're from {callerClaim}."
        </div>
      </div>
    </div>
  )
}
