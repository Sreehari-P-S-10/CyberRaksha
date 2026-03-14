/**
 * components/PhoneUI.jsx
 * Reusable phone message list + SMS conversation environment.
 * Used by environment types: 'phoneMessages', 'smsConversation'
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ── Phone messages list with animated new message ── */
export function PhoneMessages({ envProps, onInteract }) {
  const { existingMessages = [], newMessage } = envProps
  const [newVisible, setNewVisible] = useState(false)
  const [notifVisible, setNotifVisible] = useState(false)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setNotifVisible(true), newMessage.delayMs || 2000)
    const t2 = setTimeout(() => { setNewVisible(true); setNotifVisible(false) }, (newMessage.delayMs || 2000) + 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [newMessage.delayMs])

  function handleTap() {
    if (!newVisible || opened) return
    setOpened(true)
    setTimeout(() => onInteract('tapped'), 400)
  }

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Your Smartphone — Messages
      </div>

      {/* Push notification */}
      {notifVisible && (
        <div style={{
          position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)',
          width: 280, background: 'rgba(30,30,30,0.96)',
          backdropFilter: 'blur(12px)', borderRadius: 14,
          padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 10,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 200,
          animation: 'vsim-slide-up 0.4s cubic-bezier(.22,1,.36,1) both',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: newMessage.avatarBg || '#5856d6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: '#fff',
          }}>📦</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Messages</div>
            <div style={{ fontSize: 11.5, color: '#ccc', lineHeight: 1.4 }}>
              {newMessage.name}: {newMessage.preview}
            </div>
          </div>
        </div>
      )}

      {/* Phone frame */}
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-status-bar">
            <span>{time}</span>
            <div className="phone-status-icons"><span>●●●</span><span>🔋</span></div>
          </div>
          <div className="phone-messages-header">
            <span style={{ fontSize: 13, color: '#007aff' }}>Edit</span>
            <span className="phone-messages-title">Messages</span>
            <span style={{ fontSize: 20, color: '#007aff' }}>🔍</span>
          </div>
          <div className="phone-msg-list">
            {existingMessages.map((m, i) => (
              <div key={i} className="phone-msg-row">
                <div className="phone-msg-avatar" style={{ background: m.avatarBg || '#888' }}>
                  {m.name[0]}
                </div>
                <div className="phone-msg-info">
                  <div className="phone-msg-name">{m.name}</div>
                  <div className="phone-msg-preview">{m.preview}</div>
                </div>
                <div className="phone-msg-time">{m.time}</div>
              </div>
            ))}

            {newVisible && (
              <div
                className="phone-msg-row new-msg"
                onClick={handleTap}
                style={{
                  cursor: 'pointer',
                  background: 'rgba(0,122,255,0.04)',
                  opacity: opened ? 0.5 : 1,
                  transition: 'opacity 0.3s',
                }}
              >
                <div className="phone-msg-avatar courier"
                  style={{ background: newMessage.avatarBg || '#5856d6' }}>
                  {newMessage.avatarLabel || newMessage.name[0]}
                </div>
                <div className="phone-msg-info">
                  <div className="phone-msg-name">{newMessage.name}</div>
                  <div className="phone-msg-preview">{newMessage.preview}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div className="phone-msg-time">Now</div>
                  {!opened && <div className="phone-msg-badge">1</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {newVisible && !opened && (
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          👆 Tap the {newMessage.name} message to open it
        </div>
      )}
      {!newVisible && (
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          ⏳ Waiting for a message...
        </div>
      )}
    </div>
  )
}

/* ── SMS conversation view ── */
export function SMSConversation({ envProps, onInteract }) {
  const { senderName, trackingId, fakeDomain, amount = '₹99' } = envProps
  const [showMsg, setShowMsg] = useState(false)
  const [linkTapped, setLinkTapped] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowMsg(true), 600)
    return () => clearTimeout(t)
  }, [])

  function handleLink() {
    if (linkTapped) return
    setLinkTapped(true)
    setTimeout(() => onInteract('link_tapped'), 500)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        SMS from {senderName || 'Unknown Number'}
      </div>

      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-status-bar">
            <span>9:41</span>
            <div className="phone-status-icons"><span>●●●</span><span>🔋</span></div>
          </div>
          <div className="sms-conversation">
            <div className="sms-conv-header">
              <span className="sms-back">‹</span>
              <div>
                <div className="sms-contact-name">{senderName}</div>
                <div style={{ fontSize: 11, color: '#888' }}>+91-98XXXXXXXX</div>
              </div>
            </div>
            <div className="sms-messages">
              {showMsg && (
                <div className="sms-bubble incoming">
                  <strong>{senderName} Alert:</strong> Your package ({trackingId}) could not be
                  delivered. Redelivery fee of {amount} required within 24 hrs.
                  Pay here:{' '}
                  <span
                    className="sms-link"
                    onClick={handleLink}
                    style={{ opacity: linkTapped ? 0.5 : 1 }}
                  >
                    {fakeDomain}/pay
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMsg && !linkTapped && (
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          👆 Tap the link in the message to continue
        </div>
      )}
    </div>
  )
}
