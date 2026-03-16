/**
 * components/AdwareUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Adware & PUP simulations.
 *
 * Environments exported:
 *   AdwareBrowserEnv  — Fake browser: free software download
 *                       bundles PUPs, popups, toolbar hijack
 *                       (Student — desktop scenario)
 *   AdwareMobileEnv   — Fake Android: malicious flashlight app
 *                       with aggressive ad storm
 *                       (Elderly — mobile scenario)
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ── Popup ad content pools ── */
const POPUP_ADS = [
  { title: 'You have been selected!', body: 'Claim your FREE iPhone 16 Pro. Limited time — expires in 00:47', cta: 'CLAIM NOW', color: '#e53935' },
  { title: 'Your PC is at RISK', body: 'SpeedBoosterPro detected 1,342 errors. Fix them immediately.', cta: 'FIX NOW — FREE', color: '#f57c00' },
  { title: 'Congratulations!', body: 'You are our 1,000,000th visitor. Click to collect your prize.', cta: 'COLLECT REWARD', color: '#388e3c' },
  { title: 'Flash Player Update Required', body: 'Your Flash Player is out of date. Video playback may fail.', cta: 'Update Now', color: '#1565c0' },
]

/* ═════════════════════════════════════════════════════════
   AdwareBrowserEnv
   Fake browser session showing a free software download
   site that bundles adware/PUPs. After install, browser
   gets hijacked with toolbar + popups.
═════════════════════════════════════════════════════════ */
export function AdwareBrowserEnv({ envProps, onInteract }) {
  const {
    siteName     = 'FreeDownloadHub',
    siteUrl      = 'freedownloadhub.net/video-converter',
    softwareName = 'UltraVideoConverter Pro',
    softwareDesc = 'Convert any video format for free. No watermark. No limits.',
    fakeHomepage = 'search.mysearchengine.net',
    toolbarName  = 'VideoHelper Toolbar',
  } = envProps

  const [phase, setPhase]           = useState('site')   // site | downloading | restart | hijacked | popup_storm
  const [checked, setChecked]       = useState([true, true, true])
  const [downloadPct, setDownloadPct] = useState(0)
  const [popups, setPopups]         = useState([])
  const [notifications, setNotifications] = useState([])
  const [interacted, setInteracted] = useState(false)
  const [closedPopups, setClosedPopups] = useState(0)
  const popupTimer = useRef(null)

  const bundled = [
    { label: `Install ${toolbarName} for faster searching`, isMalware: false },
    { label: `Set ${fakeHomepage} as default homepage & search engine`, isMalware: false },
    { label: 'Allow UltraVideoConverter to show personalised offers', isMalware: true },
  ]

  // Download progress
  useEffect(() => {
    if (phase !== 'downloading') return
    const t = setInterval(() => {
      setDownloadPct(p => {
        if (p >= 100) { clearInterval(t); setTimeout(() => setPhase('restart'), 600); return 100 }
        return Math.min(100, p + Math.random() * 5 + 2)
      })
    }, 80)
    return () => clearInterval(t)
  }, [phase])

  // Popup storm - cascade popups every 2s
  useEffect(() => {
    if (phase !== 'popup_storm') return
    let idx = 0
    popupTimer.current = setInterval(() => {
      if (idx < POPUP_ADS.length) {
        setPopups(v => [...v, { ...POPUP_ADS[idx], id: Date.now() + idx }])
        idx++
      }
    }, 1800)
    // Desktop notification spam
    const notifTimer = setTimeout(() => {
      setNotifications(['UltraVideoConverter: Convert your next video now!', 'Special offer: Upgrade to Pro — 80% OFF today only'])
    }, 3000)
    return () => { clearInterval(popupTimer.current); clearTimeout(notifTimer) }
  }, [phase])

  function closePopup(id) {
    setPopups(v => v.filter(p => p.id !== id))
    setClosedPopups(c => c + 1)
  }

  function handleInstall() {
    setPhase('downloading')
  }

  function handleAction(action) {
    if (interacted) return
    setInteracted(true)
    onInteract(action)
  }

  const hijackedUrl = `${fakeHomepage}/?q=&source=ultraconvert&partner=adware`

  const BrowserChrome = ({ url, toolbarVisible = false, hijacked = false }) => (
    <div style={{
      background: '#1e1e1e', borderRadius: '10px 10px 0 0',
      border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', overflow: 'hidden',
    }}>
      <div style={{ background: '#2d2d2d', padding: '8px 12px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 1, marginBottom: 0 }}>
          {['UltraVideoConverter Site', 'New Tab', 'New Tab'].map((t, i) => (
            <div key={i} style={{
              padding: '5px 12px', borderRadius: '6px 6px 0 0',
              background: i === 0 ? '#3a3a3a' : 'transparent',
              fontSize: 10.5, color: i === 0 ? '#ddd' : '#777',
              maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{
        background: '#3a3a3a', padding: '6px 10px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {['←','→','↻'].map((b,i) => (
          <button key={i} style={{
            background: 'none', border: 'none', color: '#888', fontSize: 13, cursor: 'default', padding: '1px 4px',
          }}>{b}</button>
        ))}
        <div style={{
          flex: 1, background: '#272727', borderRadius: 14,
          padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {hijacked ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C94E4E" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          )}
          <span style={{
            fontSize: 11, fontFamily: 'var(--mono)',
            color: hijacked ? '#e08080' : '#aaa',
          }}>
            {url}
          </span>
        </div>
      </div>
      {/* Hijacked toolbar */}
      {toolbarVisible && (
        <div style={{
          background: '#4a3200', padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          animation: 'vsim-slide-up 0.3s ease',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f0c36d" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
          <span style={{ fontSize: 10.5, color: '#f0c36d', fontWeight: 600 }}>{toolbarName}</span>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 3,
            padding: '2px 8px', fontSize: 10, color: '#888', fontFamily: 'var(--mono)',
          }}>
            Search the web...
          </div>
          {['Deals','Weather','Coupons'].map(item => (
            <span key={item} style={{ fontSize: 10, color: '#f0c36d', cursor: 'default' }}>{item}</span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={
          phase === 'popup_storm' ? { background: '#C94E4E', animation: 'vsim-pulse 0.4s ease-in-out infinite' }
          : phase === 'hijacked' ? { background: '#f0c36d' }
          : {}
        } />
        {phase === 'site'         && 'Your browser — free software download site'}
        {phase === 'downloading'  && 'Downloading software...'}
        {phase === 'restart'      && 'Software installed — browser restarting'}
        {phase === 'hijacked'     && 'Browser has been modified'}
        {phase === 'popup_storm'  && 'Adware popups taking over your screen'}
      </div>

      {/* ─── DOWNLOAD SITE ─── */}
      {phase === 'site' && (
        <>
          <BrowserChrome url={siteUrl} />
          <div style={{
            background: '#fff', borderRadius: '0 0 10px 10px',
            border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none',
          }}>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 6 }}>{softwareName}</div>
              <div style={{ fontSize: 13, color: '#555', marginBottom: 14 }}>{softwareDesc}</div>

              <div style={{
                background: '#f9f9f9', border: '1px solid #eee',
                borderRadius: 6, padding: '12px 14px', marginBottom: 14,
              }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#333', marginBottom: 8 }}>
                  Installation options:
                </div>
                {bundled.map((item, idx) => (
                  <div key={idx}
                    onClick={() => setChecked(v => { const n=[...v]; n[idx]=!n[idx]; return n })}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 14, height: 14, borderRadius: 3, flexShrink: 0, marginTop: 1,
                      border: `2px solid ${checked[idx] ? '#1565c0' : '#bbb'}`,
                      background: checked[idx] ? '#1565c0' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {checked[idx] && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: 12, color: '#444',
                      textDecoration: item.isMalware ? 'none' : 'none',
                    }}>
                      {item.label}
                      {item.isMalware && (
                        <span style={{ fontSize: 10, color: '#1565c0', marginLeft: 4 }}>
                          (Recommended by installer)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleInstall}
                style={{
                  width: '100%', padding: '13px',
                  background: '#1565c0', border: 'none', borderRadius: 6,
                  color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Download &amp; Install — Free
              </button>
            </div>
          </div>
        </>
      )}

      {/* ─── DOWNLOADING ─── */}
      {phase === 'downloading' && (
        <>
          <BrowserChrome url={siteUrl} />
          <div style={{
            background: '#fff', borderRadius: '0 0 10px 10px',
            border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none',
            padding: '40px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>
              Downloading {softwareName}...
            </div>
            <div style={{
              height: 8, background: '#e0e0e0', borderRadius: 4,
              overflow: 'hidden', maxWidth: 280, margin: '0 auto 10px',
            }}>
              <div style={{
                height: '100%', borderRadius: 4, background: '#1565c0',
                width: `${downloadPct}%`, transition: 'width 0.1s',
              }} />
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>{Math.round(downloadPct)}% complete</div>
          </div>
        </>
      )}

      {/* ─── BROWSER RESTART / HIJACKED ─── */}
      {(phase === 'restart' || phase === 'hijacked') && (
        <>
          {phase === 'restart' && (
            <div style={{
              background: '#1e1e2e', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '30px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Browser is restarting...</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%', background: '#555',
                    animation: `bounce-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
                  }} />
                ))}
              </div>
              <button
                onClick={() => setPhase('hijacked')}
                style={{
                  marginTop: 20, padding: '8px 20px',
                  background: '#2c2c2e', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6, color: '#888', fontSize: 12, cursor: 'pointer',
                }}
              >
                Continue to see what changed
              </button>
            </div>
          )}

          {phase === 'hijacked' && (
            <>
              <BrowserChrome url={hijackedUrl} toolbarVisible hijacked />
              <div style={{
                background: '#fafafa', borderRadius: '0 0 10px 10px',
                border: '1px solid rgba(0,0,0,0.1)', borderTop: 'none',
                padding: '16px 20px',
              }}>
                {/* Fake search engine */}
                <div style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#1565c0', marginBottom: 12 }}>
                    MySearch<span style={{ color: '#e53935' }}>Engine</span>
                  </div>
                  <div style={{
                    display: 'flex', maxWidth: 300, margin: '0 auto',
                    border: '1px solid #ccc', borderRadius: 24, overflow: 'hidden',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  }}>
                    <input
                      type="text" readOnly
                      placeholder="Search the web..."
                      style={{
                        flex: 1, padding: '10px 16px',
                        border: 'none', outline: 'none',
                        fontSize: 13, fontFamily: 'inherit', color: '#333',
                        background: '#fff',
                      }}
                    />
                    <button style={{
                      padding: '0 16px', background: '#1565c0',
                      border: 'none', cursor: 'pointer', color: '#fff', fontSize: 16,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                    </button>
                  </div>
                  <div style={{ fontSize: 10, color: '#999', marginTop: 8 }}>
                    Your browser settings were modified by UltraVideoConverter installer
                  </div>
                </div>

                {/* Changes summary */}
                <div style={{
                  background: '#fff3cd', border: '1px solid #ffc107',
                  borderRadius: 6, padding: '12px 14px', marginBottom: 14,
                }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#856404', marginBottom: 8 }}>
                    The following changes were made to your browser:
                  </div>
                  {[
                    `"${toolbarName}" added to your browser`,
                    `Homepage changed to ${fakeHomepage}`,
                    'Default search engine changed',
                    'Notification permissions granted to 3 ad networks',
                  ].map((item, i) => (
                    <div key={i} style={{ fontSize: 12, color: '#856404', marginBottom: 4, display: 'flex', gap: 6 }}>
                      <span>•</span> {item}
                    </div>
                  ))}
                </div>

                {!interacted && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button
                      onClick={() => handleAction('opened_settings')}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                        borderRadius: 6, color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Go to browser settings and remove these changes
                    </button>
                    <button
                      onClick={() => setPhase('popup_storm')}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6, color: 'rgba(255,255,255,0.4)', fontSize: 12.5, cursor: 'pointer',
                      }}
                    >
                      It's fine — start browsing and ignore the changes
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* ─── POPUP STORM ─── */}
      {phase === 'popup_storm' && (
        <div style={{ position: 'relative' }}>
          <BrowserChrome url={hijackedUrl} toolbarVisible hijacked />
          <div style={{
            background: '#fff', borderRadius: '0 0 10px 10px',
            border: '1px solid rgba(0,0,0,0.1)', borderTop: 'none',
            minHeight: 200, position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Dimmed page content */}
            <div style={{ padding: '16px 20px', opacity: 0.15, filter: 'blur(2px)' }}>
              <div style={{ height: 14, background: '#ddd', borderRadius: 2, marginBottom: 8, width: '60%' }} />
              <div style={{ height: 10, background: '#eee', borderRadius: 2, marginBottom: 6 }} />
              <div style={{ height: 10, background: '#eee', borderRadius: 2, marginBottom: 6, width: '80%' }} />
            </div>

            {/* Popup ads */}
            {popups.map((popup, idx) => (
              <div key={popup.id} style={{
                position: 'absolute',
                top: `${8 + idx * 10}px`,
                left: `${5 + idx * 4}%`,
                right: `${5 + (3 - idx) * 4}%`,
                background: '#fff',
                border: `2px solid ${popup.color}`,
                borderRadius: 6,
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                overflow: 'hidden',
                zIndex: 10 + idx,
                animation: 'popup-appear 0.35s cubic-bezier(.22,1,.36,1)',
                minWidth: 200,
              }}>
                <div style={{
                  background: popup.color, padding: '6px 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#fff' }}>{popup.title}</span>
                  <button
                    onClick={() => closePopup(popup.id)}
                    style={{
                      background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 3,
                      color: '#fff', fontSize: 12, padding: '1px 5px', cursor: 'pointer',
                    }}
                  >✕</button>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, color: '#333', marginBottom: 8 }}>{popup.body}</div>
                  <button style={{
                    width: '100%', padding: '7px',
                    background: popup.color, border: 'none', borderRadius: 4,
                    color: '#fff', fontSize: 11.5, fontWeight: 700, cursor: 'pointer',
                  }}>{popup.cta}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop notifications */}
          {notifications.map((notif, i) => (
            <div key={i} style={{
              background: '#2d2d2d', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '10px 14px', marginTop: 8,
              animation: 'vsim-slide-up 0.3s ease',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="none">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#ddd' }}>UltraVideoConverter</div>
                <div style={{ fontSize: 11, color: '#888' }}>{notif}</div>
              </div>
            </div>
          ))}

          {!interacted && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
              <button
                onClick={() => handleAction('closed_popups')}
                style={{
                  width: '100%', padding: '10px',
                  background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                  borderRadius: 6, color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Close all popups, then uninstall the software and clean browser
              </button>
              <button
                onClick={() => handleAction('ran_cleanup')}
                style={{
                  width: '100%', padding: '10px',
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6, color: 'rgba(255,255,255,0.4)', fontSize: 12.5, cursor: 'pointer',
                }}
              >
                Click one of the popups to find an antivirus
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes popup-appear {
          0%   { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bounce-dot {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}


/* ═════════════════════════════════════════════════════════
   AdwareMobileEnv
   Fake Android phone — malicious flashlight/battery app
   installed via WhatsApp link triggers aggressive ads.
   (Elderly mobile scenario)
═════════════════════════════════════════════════════════ */
export function AdwareMobileEnv({ envProps, onInteract }) {
  const {
    senderName   = 'Ravi (Son)',
    appName      = 'Super Flashlight & Battery Saver Pro',
    appSource    = 'flashlight-pro-app.apk via WhatsApp',
  } = envProps

  const [phase, setPhase]           = useState('whatsapp')  // whatsapp | permissions | home | ad_storm
  const [interacted, setInteracted] = useState(false)
  const [visibleAds, setVisibleAds] = useState([])
  const [permIdx, setPermIdx]       = useState(0)

  const PERMISSIONS = [
    { name: 'Access your contacts', icon: '👤', risk: 'medium' },
    { name: 'Read all your SMS messages', icon: '💬', risk: 'high' },
    { name: 'Access your call history', icon: '📞', risk: 'high' },
    { name: 'Access your location at all times', icon: '📍', risk: 'high' },
    { name: 'Read and manage all your files', icon: '📁', risk: 'high' },
    { name: 'Access device camera & microphone', icon: '🎙', risk: 'high' },
    { name: 'Display over other apps', icon: '🪟', risk: 'medium' },
  ]

  const MOBILE_ADS = [
    { title: 'YOUR PHONE IS INFECTED!', body: 'Download FAST CLEANER PRO now — remove all viruses immediately!', cta: 'INSTALL NOW — FREE', color: '#d32f2f' },
    { title: 'Claim Your Reward', body: 'You have won a Samsung Galaxy S24 in our monthly lucky draw!', cta: 'CLAIM PRIZE', color: '#388e3c' },
  ]

  // Ad storm cascade
  useEffect(() => {
    if (phase !== 'ad_storm') return
    MOBILE_ADS.forEach((ad, i) => {
      setTimeout(() => setVisibleAds(v => [...v, { ...ad, id: i }]), i * 2500)
    })
  }, [phase])

  function handleAction(action) {
    if (interacted) return
    setInteracted(true)
    onInteract(action)
  }

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={
          phase === 'ad_storm' ? { background: '#C94E4E', animation: 'vsim-pulse 0.5s ease-in-out infinite' }
          : phase === 'permissions' ? { background: '#f0c36d' }
          : {}
        } />
        {phase === 'whatsapp'   && 'Your Android phone — WhatsApp message'}
        {phase === 'permissions' && 'App requesting permissions before install'}
        {phase === 'home'       && 'App installed — home screen'}
        {phase === 'ad_storm'   && 'Fullscreen ads blocking your phone'}
      </div>

      {/* Phone frame */}
      <div style={{
        background: '#000', borderRadius: 30,
        maxWidth: 300, margin: '0 auto',
        border: phase === 'ad_storm' ? '1px solid rgba(201,78,78,0.4)' : '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: phase === 'ad_storm' ? '0 0 30px rgba(201,78,78,0.25)' : '0 20px 60px rgba(0,0,0,0.5)',
        transition: 'border-color 0.5s, box-shadow 0.5s',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '8px 16px 4px', fontSize: 11,
          color: phase === 'ad_storm' ? '#C94E4E' : '#bbb',
        }}>
          <span>{time}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
            </svg>
            <span style={{ fontSize: 10 }}>78%</span>
          </div>
        </div>

        {/* ── WhatsApp phase ── */}
        {phase === 'whatsapp' && (
          <div style={{ padding: '0 0 20px' }}>
            {/* WhatsApp header */}
            <div style={{
              background: '#075e54', padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 700, color: '#fff',
              }}>
                {senderName.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{senderName}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)' }}>online</div>
              </div>
            </div>

            {/* Chat messages */}
            <div style={{ background: '#0a1929', padding: '12px', minHeight: 160 }}>
              {/* Incoming */}
              <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#1f2c34', borderRadius: '0 10px 10px 10px',
                  padding: '8px 12px', maxWidth: '85%',
                }}>
                  <div style={{ fontSize: 12.5, color: '#eee', lineHeight: 1.5, marginBottom: 3 }}>
                    Amma, I found this amazing app! It makes your phone battery last 3x longer and has a great flashlight. You'll love it!
                  </div>
                  <div style={{ fontSize: 9.5, color: '#777', textAlign: 'right' }}>10:14 AM</div>
                </div>
              </div>
              {/* APK attachment */}
              <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  onClick={() => setPhase('permissions')}
                  style={{
                    background: '#1f2c34', borderRadius: '0 10px 10px 10px',
                    padding: '8px 12px', maxWidth: '85%', cursor: 'pointer',
                    border: '1px solid rgba(37,211,102,0.2)',
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: '#25d366',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" stroke="none">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, color: '#eee', fontWeight: 600 }}>{appName}</div>
                      <div style={{ fontSize: 10, color: '#888' }}>APK file · 8.4 MB</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: '#25d366', textAlign: 'right' }}>
                    Tap to install
                  </div>
                </div>
              </div>
            </div>

            {/* Warning + actions */}
            {!interacted && (
              <div style={{ padding: '12px 14px 0' }}>
                <div style={{
                  background: 'rgba(201,78,78,0.08)', border: '1px solid rgba(201,78,78,0.2)',
                  borderRadius: 6, padding: '8px 10px', marginBottom: 10,
                  fontSize: 11, color: '#e08080', lineHeight: 1.5,
                }}>
                  Android warns: Installing apps from unknown sources can be harmful.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    onClick={() => handleAction('denied_permissions')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                      borderRadius: 8, color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Do not install — verify with your son by calling
                  </button>
                  <button
                    onClick={() => setPhase('permissions')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'rgba(201,78,78,0.06)', border: '1px solid rgba(201,78,78,0.2)',
                      borderRadius: 8, color: '#C94E4E', fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    Tap the APK and install it
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Permissions phase ── */}
        {phase === 'permissions' && (
          <div style={{ background: '#1a1a2e', minHeight: 300, padding: '16px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              {appName}
            </div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 14 }}>
              Wants to access:
            </div>

            {PERMISSIONS.slice(0, permIdx + 1).map((perm, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                animation: i === permIdx ? 'vsim-slide-up 0.3s ease' : 'none',
              }}>
                <span style={{ fontSize: 18 }}>{perm.icon}</span>
                <span style={{
                  flex: 1, fontSize: 12, color: perm.risk === 'high' ? '#e08080' : '#ccc',
                }}>
                  {perm.name}
                </span>
                {perm.risk === 'high' && (
                  <span style={{
                    fontSize: 9, color: '#C94E4E', background: 'rgba(201,78,78,0.1)',
                    padding: '2px 6px', borderRadius: 3, border: '1px solid rgba(201,78,78,0.25)',
                    fontFamily: 'var(--mono)',
                  }}>HIGH RISK</span>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button
                onClick={() => handleAction('denied_permissions')}
                style={{
                  flex: 1, padding: '10px',
                  background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                  borderRadius: 8, color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Deny All
              </button>
              <button
                onClick={() => {
                  if (permIdx < PERMISSIONS.length - 1) {
                    setPermIdx(p => p + 1)
                  } else {
                    setPhase('home')
                  }
                }}
                style={{
                  flex: 1, padding: '10px',
                  background: '#1565c0', border: 'none',
                  borderRadius: 8, color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Allow &gt;
              </button>
            </div>
          </div>
        )}

        {/* ── Home / App installed ── */}
        {phase === 'home' && (
          <div style={{ background: '#0a0a15', minHeight: 300, padding: '16px 14px' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, margin: '0 auto 10px',
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" stroke="none">
                  <path d="M9 21H15M12 3L12 7M4.22 4.22L7.05 7.05M19.78 4.22L16.95 7.05M1 13H5M19 13H23"/>
                </svg>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                Super Flashlight installed!
              </div>
              <div style={{ fontSize: 11, color: '#888' }}>Tap to use the flashlight</div>
            </div>

            <button
              onClick={() => setPhase('ad_storm')}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                border: 'none', borderRadius: 12,
                color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                marginBottom: 12,
              }}
            >
              Open Flashlight
            </button>
          </div>
        )}

        {/* ── Ad storm ── */}
        {phase === 'ad_storm' && (
          <div style={{ background: '#0a0a15', position: 'relative', minHeight: 300 }}>
            {/* App barely visible in background */}
            <div style={{ padding: '16px', opacity: 0.1 }}>
              <div style={{ fontSize: 13, color: '#fff', textAlign: 'center' }}>Flashlight On</div>
            </div>

            {/* Fullscreen ad overlays */}
            {visibleAds.map((ad, idx) => (
              <div key={ad.id} style={{
                position: 'absolute', inset: 0,
                background: '#111',
                display: 'flex', flexDirection: 'column',
                animation: 'popup-appear 0.4s ease',
                zIndex: 10 + idx,
              }}>
                <div style={{
                  background: ad.color, padding: '14px 14px 10px',
                  borderBottom: `2px solid ${ad.color}`,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', textAlign: 'center' }}>
                    {ad.title}
                  </div>
                </div>
                <div style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.6, marginBottom: 20 }}>
                    {ad.body}
                  </div>
                  <button style={{
                    width: '100%', padding: '13px',
                    background: ad.color, border: 'none', borderRadius: 10,
                    color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                    marginBottom: 10,
                  }}>{ad.cta}</button>
                  <button
                    onClick={() => setVisibleAds(v => v.filter(a => a.id !== ad.id))}
                    style={{
                      background: 'none', border: 'none',
                      color: '#555', fontSize: 11, cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Close ad
                  </button>
                </div>
              </div>
            ))}

            {/* Action panel once ads are shown */}
            {visibleAds.length > 0 && !interacted && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '12px', background: 'rgba(0,0,0,0.9)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                zIndex: 99,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    onClick={() => handleAction('uninstalled_app')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                      borderRadius: 8, color: '#2EB87A', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Go to Settings and uninstall this app
                  </button>
                  <button
                    onClick={() => handleAction('clicked_ad')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8, color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer',
                    }}
                  >
                    Click the "INSTALL NOW" ad to fix my phone
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nav bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 36,
          padding: '10px 0 12px',
          background: phase === 'ad_storm' ? '#0a0a15' : '#000',
        }}>
          {['triangle', 'circle', 'square'].map((shape, i) => (
            <div key={i} style={{ opacity: 0.25 }}>
              {shape === 'triangle' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              )}
              {shape === 'circle' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              )}
              {shape === 'square' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes popup-appear {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
