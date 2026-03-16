/**
 * components/TrojanUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Trojan Horse simulations.
 *
 * Environments exported:
 *   TrojanInstallerEnv  — Fake download page + installer wizard
 *                         with hidden malicious payload
 *                         (Student & Professional scenarios,
 *                          different envProps for each)
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ── Phase state machine ──
   download_page → downloading → installer → installing → complete
*/

/* ── Fake task manager processes ── */
const LEGIT_PROCESSES = [
  { name: 'explorer.exe', cpu: '0.1%', mem: '42 MB', status: 'Running' },
  { name: 'chrome.exe', cpu: '3.2%', mem: '320 MB', status: 'Running' },
  { name: 'svchost.exe', cpu: '0.3%', mem: '18 MB', status: 'Running' },
  { name: 'System', cpu: '0.0%', mem: '4 MB', status: 'Running' },
]

const MALWARE_PROCESSES = [
  { name: 'svchost-helper.exe', cpu: '12.4%', mem: '88 MB', status: 'Running', isMalware: true },
  { name: 'winupdate-service.exe', cpu: '8.7%', mem: '145 MB', status: 'Running', isMalware: true },
  { name: 'keylog-driver.sys', cpu: '2.1%', mem: '32 MB', status: 'Running', isMalware: true },
]


export function TrojanInstallerEnv({ envProps, onInteract }) {
  const {
    siteName        = 'FreeCrackZone',
    siteUrl         = 'freecrackzone.net/download',
    softwareName    = 'ProGamer Deluxe 2025',
    softwareDesc    = 'Full version with all DLCs unlocked. No activation needed.',
    softwareSize    = '2.4 GB',
    downloads       = '1,42,500',
    reviews         = '4.8',
    reviewCount     = '2,341',
    installerTitle  = 'ProGamer Deluxe Setup',
    bundledItems    = [
      { name: 'Install ProGamer Deluxe 2025', checked: true, locked: true },
      { name: 'Install SearchHelper Toolbar (Recommended)', checked: true, isMalware: false },
      { name: 'Set MySearch as default browser homepage', checked: true, isMalware: false },
      { name: 'Install System Performance Optimizer', checked: true, isMalware: true, malwareNote: 'This installs a keylogger' },
    ],
    accentColor     = '#4caf50',
  } = envProps

  const [phase, setPhase] = useState('download_page')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [installProgress, setInstallProgress] = useState(0)
  const [checkboxes, setCheckboxes] = useState(bundledItems.map(b => b.checked))
  const [installerStep, setInstallerStep] = useState(0) // 0: license, 1: components, 2: install
  const [showTaskMgr, setShowTaskMgr] = useState(false)
  const [visibleMalware, setVisibleMalware] = useState([])
  const [interacted, setInteracted] = useState(false)

  // Download progress
  useEffect(() => {
    if (phase !== 'downloading') return
    const t = setInterval(() => {
      setDownloadProgress(p => {
        if (p >= 100) {
          clearInterval(t)
          setTimeout(() => setPhase('installer'), 500)
          return 100
        }
        return Math.min(100, p + (Math.random() * 3 + 1))
      })
    }, 80)
    return () => clearInterval(t)
  }, [phase])

  // Install progress + malware spawn
  useEffect(() => {
    if (phase !== 'installing') return
    const t = setInterval(() => {
      setInstallProgress(p => {
        if (p >= 100) {
          clearInterval(t)
          setTimeout(() => setPhase('complete'), 400)
          return 100
        }
        return Math.min(100, p + (Math.random() * 2 + 0.8))
      })
    }, 100)

    // Spawn malware processes at intervals
    const m1 = setTimeout(() => setVisibleMalware(v => [...v, MALWARE_PROCESSES[0]]), 1500)
    const m2 = setTimeout(() => setVisibleMalware(v => [...v, MALWARE_PROCESSES[1]]), 3500)
    const m3 = setTimeout(() => {
      setVisibleMalware(v => [...v, MALWARE_PROCESSES[2]])
      setShowTaskMgr(true) // Show task manager after all malware spawns
    }, 5500)

    return () => { clearInterval(t); clearTimeout(m1); clearTimeout(m2); clearTimeout(m3) }
  }, [phase])

  function toggleCheckbox(idx) {
    if (bundledItems[idx].locked) return
    setCheckboxes(prev => {
      const next = [...prev]
      next[idx] = !next[idx]
      return next
    })
  }

  function handleAction(action) {
    if (interacted) return
    setInteracted(true)
    onInteract(action)
  }

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={
          phase === 'installing' || phase === 'complete' ? { background: '#C94E4E' }
          : phase === 'downloading' ? { background: '#4caf50' }
          : {}
        } />
        {phase === 'download_page' && 'Your browser — Download site'}
        {phase === 'downloading' && 'Downloading software...'}
        {phase === 'installer' && 'Software installer opened'}
        {phase === 'installing' && 'Installing software...'}
        {phase === 'complete' && 'Installation complete — check what happened'}
      </div>

      {/* ═══ DOWNLOAD PAGE ═══ */}
      {phase === 'download_page' && (
        <div style={{
          background: '#1c1c1e',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.09)',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: '#2c2c2e',
            padding: '8px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: '#3a3a3c', borderRadius: 6,
              padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 12, color: '#C94E4E' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
              </span>
              <span style={{ fontSize: 12, color: '#d1d1d6', fontFamily: 'var(--mono)' }}>{siteUrl}</span>
            </div>
          </div>

          {/* Site content */}
          <div style={{ background: '#111', padding: '20px' }}>
            {/* Site header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 20, paddingBottom: 12,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{siteName}</div>
                <div style={{ fontSize: 11, color: '#666' }}>Free downloads, no registration</div>
              </div>
            </div>

            {/* Software card */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '18px',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                {softwareName}
              </div>
              <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.55, marginBottom: 14 }}>
                {softwareDesc}
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex', gap: 16, marginBottom: 16,
                fontSize: 11, color: '#888',
              }}>
                <span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" style={{verticalAlign:'middle',marginRight:4}}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  {downloads} downloads
                </span>
                <span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f0c36d" stroke="none" style={{verticalAlign:'middle',marginRight:4}}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {reviews} ({reviewCount} reviews)
                </span>
                <span>Size: {softwareSize}</span>
              </div>

              {/* Fake verified badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                marginBottom: 16, fontSize: 11, color: '#4caf50',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Verified safe by FreeCrack Antivirus Scanner
              </div>

              {/* Download button */}
              <button
                onClick={() => setPhase('downloading')}
                style={{
                  width: '100%', padding: '14px',
                  background: accentColor,
                  border: 'none', borderRadius: 8,
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download Free — {softwareSize}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DOWNLOADING ═══ */}
      {phase === 'downloading' && (
        <div style={{
          background: '#1c1c1e',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.09)',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: '#2c2c2e',
            padding: '8px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: '#3a3a3c', borderRadius: 6,
              padding: '5px 10px', fontSize: 12, color: '#d1d1d6', fontFamily: 'var(--mono)',
            }}>
              {siteUrl}
            </div>
          </div>

          {/* Download bar */}
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" style={{ marginBottom: 12 }}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              Downloading {softwareName}...
            </div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
              {Math.round(downloadProgress)}% — {(downloadProgress * 24 / 100).toFixed(1)} MB / {softwareSize}
            </div>
            <div style={{
              height: 6, background: '#333', borderRadius: 3, overflow: 'hidden',
              maxWidth: 300, margin: '0 auto',
            }}>
              <div style={{
                height: '100%',
                width: `${downloadProgress}%`,
                background: accentColor,
                borderRadius: 3,
                transition: 'width 0.1s linear',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* ═══ INSTALLER ═══ */}
      {phase === 'installer' && (
        <div style={{
          background: '#f0f0f0',
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.15)',
          overflow: 'hidden',
          fontFamily: '"Segoe UI", sans-serif',
          maxWidth: 440,
          margin: '0 auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          {/* Installer title bar */}
          <div style={{
            background: '#e0e0e0',
            padding: '8px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid #ccc',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4caf50" stroke="none">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>
                {installerTitle} — Setup Wizard
              </span>
            </div>
            <button
              onClick={() => handleAction('cancelled_install')}
              disabled={interacted}
              style={{
                width: 20, height: 20, borderRadius: 3,
                background: '#ddd', border: '1px solid #bbb',
                fontSize: 13, color: '#666', cursor: interacted ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >x</button>
          </div>

          <div style={{ padding: '18px 20px' }}>
            {/* Step 0: License */}
            {installerStep === 0 && (
              <>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 12 }}>
                  License Agreement
                </div>
                <div style={{
                  background: '#fff', border: '1px solid #ddd', borderRadius: 4,
                  padding: '10px 12px', height: 100, overflowY: 'auto',
                  fontSize: 10.5, color: '#555', lineHeight: 1.7, marginBottom: 16,
                }}>
                  END USER LICENSE AGREEMENT<br/><br/>
                  By installing this software, you agree to the following terms:<br/>
                  1. The software is provided "as is" without warranty.<br/>
                  2. You may install partner software included in this package.<br/>
                  3. <span style={{ background: '#fff3cd' }}>Additional tools may be installed to enhance your experience.</span><br/>
                  4. Data collection for product improvement is enabled by default.<br/>
                  5. The publisher is not responsible for any third-party software bundled with this installer.
                </div>
                <button
                  onClick={() => setInstallerStep(1)}
                  style={{
                    padding: '9px 24px', background: '#4caf50', color: '#fff',
                    border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', float: 'right',
                  }}
                >
                  I Agree — Next &gt;
                </button>
                <div style={{ clear: 'both' }} />
              </>
            )}

            {/* Step 1: Component selection */}
            {installerStep === 1 && (
              <>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 4 }}>
                  Choose Components
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 14 }}>
                  Select the components you want to install:
                </div>

                <div style={{
                  background: '#fff', border: '1px solid #ddd', borderRadius: 4,
                  padding: '8px 0', marginBottom: 16,
                }}>
                  {bundledItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleCheckbox(idx)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '8px 14px',
                        cursor: item.locked ? 'default' : 'pointer',
                        background: item.isMalware && checkboxes[idx] ? 'rgba(255,243,205,0.5)' : 'transparent',
                        borderBottom: idx < bundledItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                      }}
                    >
                      <div style={{
                        width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1,
                        border: `2px solid ${checkboxes[idx] ? '#4caf50' : '#bbb'}`,
                        background: checkboxes[idx] ? '#4caf50' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: item.locked ? 0.6 : 1,
                      }}>
                        {checkboxes[idx] && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <div style={{
                          fontSize: 12.5, color: '#333',
                          fontWeight: item.locked ? 600 : 400,
                        }}>
                          {item.name}
                          {item.locked && <span style={{ fontSize: 10, color: '#888', marginLeft: 6 }}>(required)</span>}
                        </div>
                        {item.isMalware && (
                          <div style={{ fontSize: 10, color: '#c97a00', marginTop: 2, fontStyle: 'italic' }}>
                            Recommended for optimal performance
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setInstallerStep(0)}
                    style={{
                      padding: '9px 20px', background: '#e0e0e0',
                      border: '1px solid #ccc', borderRadius: 4,
                      fontSize: 13, color: '#555', cursor: 'pointer',
                    }}
                  >
                    &lt; Back
                  </button>
                  <button
                    onClick={() => {
                      // Check if malware checkbox was unchecked
                      const malwareUnchecked = bundledItems.some((item, idx) => item.isMalware && !checkboxes[idx])
                      if (malwareUnchecked) {
                        handleAction('unchecked_malware')
                      } else {
                        setInstallerStep(2)
                        setPhase('installing')
                      }
                    }}
                    style={{
                      padding: '9px 24px', background: '#4caf50', color: '#fff',
                      border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Install &gt;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ INSTALLING ═══ */}
      {(phase === 'installing' || phase === 'complete') && (
        <div style={{ position: 'relative' }}>
          {/* Installer progress window */}
          <div style={{
            background: '#f0f0f0',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.15)',
            overflow: 'hidden',
            fontFamily: '"Segoe UI", sans-serif',
            maxWidth: 440,
            margin: '0 auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            <div style={{
              background: '#e0e0e0', padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 8,
              borderBottom: '1px solid #ccc',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#4caf50" stroke="none">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>
                {phase === 'complete' ? 'Installation Complete' : 'Installing...'}
              </span>
            </div>

            <div style={{ padding: '20px' }}>
              {phase === 'installing' && (
                <>
                  <div style={{ fontSize: 13, color: '#333', marginBottom: 12 }}>
                    Installing {softwareName}...
                  </div>
                  <div style={{ height: 8, background: '#ddd', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{
                      height: '100%',
                      width: `${installProgress}%`,
                      background: '#4caf50',
                      borderRadius: 4,
                      transition: 'width 0.2s linear',
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#888' }}>
                    {Math.round(installProgress)}% complete
                  </div>
                </>
              )}

              {phase === 'complete' && (
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="1.5" style={{ marginBottom: 8 }}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#333', marginBottom: 4 }}>
                    Installation Complete!
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    {softwareName} is ready to use.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Task Manager overlay */}
          {showTaskMgr && (
            <div style={{
              marginTop: 14,
              background: '#1e1e1e',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              overflow: 'hidden',
              animation: 'vsim-slide-up 0.35s ease',
              fontFamily: '"Segoe UI", -apple-system, sans-serif',
            }}>
              {/* Task Manager title */}
              <div style={{
                background: '#2d2d2d',
                padding: '6px 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7eb8da" strokeWidth="2" strokeLinecap="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#ddd' }}>Task Manager</span>
                </div>
                <span style={{ fontSize: 11, color: '#C94E4E', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                  Suspicious processes detected
                </span>
              </div>

              {/* Process table header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '6px 12px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: 10, color: '#888', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                <span>Process</span>
                <span>CPU</span>
                <span>Memory</span>
                <span>Status</span>
              </div>

              {/* Processes */}
              {[...LEGIT_PROCESSES, ...visibleMalware].map((proc, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  padding: '5px 12px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  background: proc.isMalware ? 'rgba(201,78,78,0.1)' : 'transparent',
                  animation: proc.isMalware ? 'vsim-slide-up 0.3s ease' : 'none',
                }}>
                  <span style={{
                    fontSize: 11, fontFamily: 'var(--mono)',
                    color: proc.isMalware ? '#ff6b6b' : '#ccc',
                    fontWeight: proc.isMalware ? 600 : 400,
                  }}>
                    {proc.isMalware && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="#C94E4E" stroke="none" style={{marginRight: 4, verticalAlign: 'middle'}}>
                        <circle cx="12" cy="12" r="12"/>
                      </svg>
                    )}
                    {proc.name}
                  </span>
                  <span style={{ fontSize: 11, color: proc.isMalware ? '#ff6b6b' : '#888', fontFamily: 'var(--mono)' }}>{proc.cpu}</span>
                  <span style={{ fontSize: 11, color: proc.isMalware ? '#ff6b6b' : '#888', fontFamily: 'var(--mono)' }}>{proc.mem}</span>
                  <span style={{ fontSize: 11, color: proc.isMalware ? '#ff6b6b' : '#4caf50', fontFamily: 'var(--mono)' }}>{proc.status}</span>
                </div>
              ))}

              {/* Action buttons */}
              {phase === 'complete' && !interacted && (
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    onClick={() => handleAction('checked_task_manager')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'rgba(46,184,122,0.1)',
                      border: '1px solid rgba(46,184,122,0.35)',
                      borderRadius: 6,
                      color: '#2EB87A', fontSize: 12.5, fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Kill suspicious processes and uninstall
                  </button>
                  <button
                    onClick={() => handleAction('ran_installer')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6,
                      color: 'rgba(255,255,255,0.5)', fontSize: 12.5, fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Ignore and close Task Manager
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
