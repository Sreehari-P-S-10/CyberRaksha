/**
 * components/VirusUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Computer Virus simulations.
 *
 * Environments exported:
 *   VirusFileManagerEnv — Fake Windows file explorer + USB autorun
 *                         virus spread (Student scenario)
 *   VirusEmailEnv       — Fake email client with macro-enabled
 *                         attachment + infection spread
 *                         (Professional & Elderly scenarios)
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react'
import '../VisualSim.css'

/* ── SVG icons ── */
const icons = {
  usb: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7eb8da" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M12 7v10M9 17H7a2 2 0 01-2-2v-1a2 2 0 012-2h10a2 2 0 012 2v1a2 2 0 01-2 2h-2"/>
    </svg>
  ),
  folder: (color = '#f0c36d') => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </svg>
  ),
  file: (color = '#aaa') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
    </svg>
  ),
  paperclip: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C94E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C94E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  wifi: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
}

/* ══════════════════════════════════════════════════════════
   VirusFileManagerEnv
   USB drive inserted — autorun virus spreads through
   folders when the user opens it. (Student scenario)
══════════════════════════════════════════════════════════ */
export function VirusFileManagerEnv({ envProps, onInteract }) {
  const {
    usbLabel      = 'USB Drive (E:) — "ClassNotes_2025"',
    usbMessage    = 'USB Drive inserted. What would you like to do?',
  } = envProps

  const [phase, setPhase]           = useState('notification')  // notification | explorer | spreading | infected
  const [infectedFolders, setInfectedFolders] = useState([])
  const [infectedFiles, setInfectedFiles]     = useState([])
  const [interacted, setInteracted] = useState(false)
  const [selectedDrive, setSelectedDrive]     = useState(null)

  const LOCAL_DRIVES = [
    { name: 'Local Disk (C:)', icon: 'folder', files: 12043 },
    { name: 'Data (D:)', icon: 'folder', files: 4211 },
  ]

  const USB_CONTENTS = [
    { name: 'Class_Notes_Physics.pdf', type: 'pdf' },
    { name: 'Autorun.inf',             type: 'autorun', suspicious: true },
    { name: 'Notes_Viewer.exe',        type: 'exe', suspicious: true },
    { name: 'Chemistry_Notes.docx',    type: 'doc' },
    { name: 'Math_Formulas.xlsx',      type: 'xls' },
  ]

  const LOCAL_FILES = [
    { name: 'Documents', type: 'folder' },
    { name: 'Downloads', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Desktop', type: 'folder' },
    { name: 'Assignments', type: 'folder' },
    { name: 'Videos', type: 'folder' },
  ]

  // Spread virus across local folders
  useEffect(() => {
    if (phase !== 'spreading') return
    const names = LOCAL_FILES.map(f => f.name)
    names.forEach((name, idx) => {
      setTimeout(() => {
        setInfectedFolders(v => [...v, name])
      }, (idx + 1) * 600)
    })
    const files = ['Resume.docx', 'Bank Statement.pdf', 'passwords.txt', 'Photos (3,241)', 'College_Project.zip']
    files.forEach((name, idx) => {
      setTimeout(() => setInfectedFiles(v => [...v, name]), (idx + 1) * 500 + 400)
    })
    setTimeout(() => setPhase('infected'), names.length * 600 + 800)
  }, [phase])

  function handleOpenUsb() {
    setPhase('explorer')
    setSelectedDrive('usb')
  }

  function handleOpenAutorun() {
    if (interacted) return
    setPhase('spreading')
  }

  function handleAction(action) {
    if (interacted) return
    setInteracted(true)
    onInteract(action)
  }

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={
          phase === 'spreading' ? { background: '#f0c36d', animation: 'vsim-pulse 0.5s ease-in-out infinite' }
          : phase === 'infected' ? { background: '#C94E4E' }
          : {}
        } />
        {phase === 'notification' && 'Your Windows PC — a USB drive has just been inserted'}
        {phase === 'explorer' && 'Windows File Explorer — USB Drive contents'}
        {phase === 'spreading' && 'Virus is spreading through your files...'}
        {phase === 'infected' && 'Your computer has been infected'}
      </div>

      {/* Windows desktop chrome */}
      <div style={{
        background: '#1e1e2e',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        fontFamily: '"Segoe UI", -apple-system, sans-serif',
        position: 'relative',
      }}>
        {/* Taskbar */}
        <div style={{
          background: 'rgba(0,0,0,0.7)',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0078d4" stroke="none">
                <rect x="1" y="1" width="10" height="10" rx="1"/>
                <rect x="13" y="1" width="10" height="10" rx="1"/>
                <rect x="1" y="13" width="10" height="10" rx="1"/>
                <rect x="13" y="13" width="10" height="10" rx="1"/>
              </svg>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.05)', padding: '3px 10px',
              borderRadius: 4, fontSize: 12, color: '#ccc',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
              </svg>
              File Explorer
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 11 }}>
            {icons.wifi}
            <span>{time}</span>
            <span style={{ fontSize: 10, color: '#666' }}>{date}</span>
          </div>
        </div>

        {/* File Explorer window */}
        <div style={{ display: 'flex', minHeight: 300 }}>
          {/* Left sidebar */}
          <div style={{
            width: 150, background: 'rgba(0,0,0,0.25)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 0',
            fontSize: 12, color: '#bbb',
          }}>
            {[
              { label: 'Quick Access', icon: '⭐' },
              { label: 'This PC', icon: null, isIcon: true },
              { label: 'Network', icon: null, isNetwork: true },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '5px 12px',
                fontSize: 11, color: '#888',
                fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.05em', marginTop: i > 0 ? 8 : 0,
              }}>
                {item.label}
              </div>
            ))}
            {LOCAL_DRIVES.map((d, i) => (
              <div key={i}
                onClick={() => setSelectedDrive('local')}
                style={{
                  padding: '4px 16px', fontSize: 11.5,
                  color: selectedDrive === 'local' ? '#fff' : '#aaa',
                  background: selectedDrive === 'local' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7eb8da" strokeWidth="1.8">
                  <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                {d.name}
              </div>
            ))}
            {/* USB in sidebar */}
            <div style={{
              padding: '4px 16px', fontSize: 11.5,
              color: selectedDrive === 'usb' ? '#fff' : '#7eb8da',
              background: selectedDrive === 'usb' ? 'rgba(126,184,218,0.12)' : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              borderLeft: '2px solid #7eb8da',
              marginTop: 4,
            }}
              onClick={handleOpenUsb}
            >
              {icons.usb}
              E: Removable
            </div>
          </div>

          {/* Main content area */}
          <div style={{ flex: 1, padding: 14 }}>
            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 12, paddingBottom: 10,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {['←','→','↑'].map((b, i) => (
                <button key={i} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4, color: '#888', fontSize: 12, padding: '3px 8px', cursor: 'default',
                }}>{b}</button>
              ))}
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 4,
                padding: '4px 10px', fontSize: 11, color: '#888',
                border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'var(--mono)',
              }}>
                {selectedDrive === 'usb' ? 'E:\\' : selectedDrive === 'local' ? 'C:\\' : 'This PC'}
              </div>
            </div>

            {/* No drive selected */}
            {!selectedDrive && (
              <div style={{ textAlign: 'center', paddingTop: 40, color: '#666' }}>
                <div style={{ fontSize: 12 }}>Select a drive from the sidebar</div>
              </div>
            )}

            {/* Local drive */}
            {selectedDrive === 'local' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {LOCAL_FILES.map((file, idx) => (
                  <div key={idx} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 4, padding: '8px 4px', borderRadius: 4,
                    background: infectedFolders.includes(file.name)
                      ? 'rgba(201,78,78,0.1)' : 'transparent',
                    border: `1px solid ${infectedFolders.includes(file.name) ? 'rgba(201,78,78,0.25)' : 'transparent'}`,
                    transition: 'all 0.3s',
                    animation: infectedFolders.includes(file.name) ? 'infect-flash 0.4s ease' : 'none',
                  }}>
                    {icons.folder(infectedFolders.includes(file.name) ? '#C94E4E' : '#f0c36d')}
                    <span style={{
                      fontSize: 10.5, color: infectedFolders.includes(file.name) ? '#C94E4E' : '#ccc',
                      textAlign: 'center', transition: 'color 0.3s',
                    }}>
                      {file.name}
                      {infectedFolders.includes(file.name) && ' ●'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* USB drive contents */}
            {selectedDrive === 'usb' && phase !== 'spreading' && phase !== 'infected' && (
              <div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>
                  5 items — {usbLabel}
                </div>
                {USB_CONTENTS.map((file, idx) => (
                  <div
                    key={idx}
                    onClick={file.type === 'autorun' || file.type === 'exe' ? handleOpenAutorun : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '6px 8px', borderRadius: 4, marginBottom: 3,
                      background: file.suspicious ? 'rgba(201,78,78,0.06)' : 'transparent',
                      border: `1px solid ${file.suspicious ? 'rgba(201,78,78,0.2)' : 'transparent'}`,
                      cursor: file.suspicious ? 'pointer' : 'default',
                    }}
                  >
                    {icons.file(
                      file.type === 'exe' ? '#C94E4E'
                      : file.type === 'autorun' ? '#C94E4E'
                      : file.type === 'pdf' ? '#ff6b6b'
                      : '#7eb8da'
                    )}
                    <span style={{
                      flex: 1, fontSize: 12,
                      color: file.suspicious ? '#C94E4E' : '#ccc',
                      fontFamily: 'var(--mono)',
                    }}>
                      {file.name}
                    </span>
                    {file.suspicious && (
                      <span style={{
                        fontSize: 10, color: '#C94E4E',
                        background: 'rgba(201,78,78,0.12)',
                        padding: '2px 6px', borderRadius: 3,
                        border: '1px solid rgba(201,78,78,0.3)',
                      }}>
                        Suspicious
                      </span>
                    )}
                  </div>
                ))}
                <div style={{
                  marginTop: 12, padding: '10px 12px',
                  background: 'rgba(201,78,78,0.06)',
                  border: '1px solid rgba(201,78,78,0.2)',
                  borderRadius: 6, fontSize: 11.5, color: '#e08080', lineHeight: 1.55,
                }}>
                  {icons.warning} <strong>Caution:</strong> This USB contains <code style={{ fontFamily: 'var(--mono)', fontSize: 10.5 }}>Autorun.inf</code> and an <code style={{ fontFamily: 'var(--mono)', fontSize: 10.5 }}>unknown .exe</code>. Clicking them may execute malware.
                </div>

                {/* Action buttons */}
                {!interacted && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                    <button
                      onClick={() => handleAction('scanned_usb')}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(46,184,122,0.1)',
                        border: '1px solid rgba(46,184,122,0.35)',
                        borderRadius: 6, color: '#2EB87A',
                        fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Scan USB with antivirus before opening anything
                    </button>
                    <button
                      onClick={() => handleAction('ejected_safely')}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(46,184,122,0.06)',
                        border: '1px solid rgba(46,184,122,0.2)',
                        borderRadius: 6, color: '#2EB87A',
                        fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      Eject USB drive without opening anything
                    </button>
                    <button
                      onClick={handleOpenAutorun}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(201,78,78,0.06)',
                        border: '1px solid rgba(201,78,78,0.2)',
                        borderRadius: 6, color: '#C94E4E',
                        fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      Double-click Notes_Viewer.exe to view notes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Spreading phase */}
            {(phase === 'spreading' || phase === 'infected') && selectedDrive === 'usb' && (
              <div>
                <div style={{ fontSize: 11.5, color: '#C94E4E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {icons.warning} Notes_Viewer.exe is executing...
                </div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>Local Disk (C:) — spreading:</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
                  {LOCAL_FILES.map((file, idx) => (
                    <div key={idx} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: 4, padding: '8px 4px', borderRadius: 4,
                      background: infectedFolders.includes(file.name) ? 'rgba(201,78,78,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${infectedFolders.includes(file.name) ? 'rgba(201,78,78,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      transition: 'all 0.3s',
                    }}>
                      {icons.folder(infectedFolders.includes(file.name) ? '#C94E4E' : '#888')}
                      <span style={{ fontSize: 10.5, color: infectedFolders.includes(file.name) ? '#C94E4E' : '#666', textAlign: 'center' }}>
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar for spreading */}
                {phase === 'spreading' && (
                  <div style={{
                    padding: '10px 12px', background: 'rgba(201,78,78,0.08)',
                    border: '1px solid rgba(201,78,78,0.2)', borderRadius: 6, marginBottom: 12,
                  }}>
                    <div style={{ fontSize: 11, color: '#C94E4E', marginBottom: 6 }}>
                      Virus spreading — DO NOT disconnect power
                    </div>
                    <div style={{ height: 4, background: '#333', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${(infectedFolders.length / LOCAL_FILES.length) * 100}%`,
                        background: '#C94E4E',
                        transition: 'width 0.5s ease',
                        borderRadius: 2,
                      }} />
                    </div>
                    <div style={{ fontSize: 10, color: '#888', marginTop: 4 }}>
                      {infectedFolders.length}/{LOCAL_FILES.length} directories compromised
                    </div>
                  </div>
                )}

                {/* Infected state actions */}
                {phase === 'infected' && !interacted && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{
                      padding: '10px 12px', background: 'rgba(201,78,78,0.08)',
                      border: '1px solid rgba(201,78,78,0.25)', borderRadius: 6,
                      fontSize: 12, color: '#e08080', lineHeight: 1.5, marginBottom: 6,
                    }}>
                      All {LOCAL_FILES.length} directories infected. Files are being copied to an external server.
                    </div>
                    <button
                      onClick={() => handleAction('opened_autorun')}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                        borderRadius: 6, color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Disconnect internet and run antivirus scan
                    </button>
                    <button
                      onClick={() => handleAction('disabled_autorun')}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6, color: 'rgba(255,255,255,0.4)', fontSize: 12.5, cursor: 'pointer',
                      }}
                    >
                      Eject USB and restart — the problem will go away
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Notification banner (initial) */}
            {phase === 'notification' && (
              <div style={{ textAlign: 'center', paddingTop: 50 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>Select a drive from the sidebar to explore it</div>
                {/* Toast notification */}
                <div style={{
                  background: '#2d2d2d', border: '1px solid rgba(126,184,218,0.3)',
                  borderLeft: '3px solid #7eb8da',
                  borderRadius: 6, padding: '12px 16px', maxWidth: 280, margin: '0 auto',
                  animation: 'vsim-slide-up 0.4s ease', cursor: 'pointer',
                  textAlign: 'left',
                }}
                  onClick={handleOpenUsb}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {icons.usb}
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#7eb8da' }}>USB Drive detected</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: '#aaa' }}>{usbMessage}</div>
                  <div style={{ fontSize: 11, color: '#7eb8da', marginTop: 6 }}>Click to open folder</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes infect-flash {
          0%   { background: rgba(201,78,78,0); }
          40%  { background: rgba(201,78,78,0.3); }
          100% { background: rgba(201,78,78,0.1); }
        }
      `}</style>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   VirusEmailEnv
   Fake email client — macro-enabled attachment starts
   infection if user enables macros.
   (Professional & Elderly scenarios — different envProps)
══════════════════════════════════════════════════════════ */
export function VirusEmailEnv({ envProps, onInteract }) {
  const {
    senderName      = 'Rajesh Kumar',
    senderEmail     = 'rajesh.kumar.hr@workdocs-shared.net',
    emailSubject    = 'Q4 Bonus Structure — Revised Document',
    emailBody       = [
      'Hi,',
      'Please find attached the revised Q4 bonus structure document approved by management.',
      'Open the document and enable editing to view the salary breakdown table.',
      'Please review and confirm receipt by EOD.',
    ],
    attachmentName  = 'Bonus_Q4_Revised.docm',
    attachmentSize  = '847 KB',
    userDisplayName = 'Priya',
    inboxEmails     = [
      { from: 'IT Helpdesk', subject: 'Scheduled maintenance tonight', time: '9:42 AM', unread: false },
      { from: 'Rajesh Kumar (HR)', subject: 'Q4 Bonus Structure — Revised Document', time: '10:15 AM', unread: true, isScam: true },
      { from: 'Amazon', subject: 'Your order has shipped', time: '11:03 AM', unread: false },
    ],
    networkFiles    = ['payroll_db_backup.xlsx', 'employee_records.csv', 'HR_passwords.txt', 'client_data.xlsx', 'finance_reports.pdf'],
  } = envProps

  const [phase, setPhase]             = useState('inbox')      // inbox | email | doc | macro | infected
  const [interacted, setInteracted]   = useState(false)
  const [infectedFiles, setInfectedFiles] = useState([])
  const [networkActivity, setNetworkActivity] = useState(0)

  // Spread after macro enabled
  useEffect(() => {
    if (phase !== 'macro') return
    const files = networkFiles
    files.forEach((name, idx) => {
      setTimeout(() => setInfectedFiles(v => [...v, name]), (idx + 1) * 800)
    })
    const netInterval = setInterval(() => {
      setNetworkActivity(n => Math.min(100, n + Math.random() * 8 + 4))
    }, 300)
    setTimeout(() => {
      setPhase('infected')
      clearInterval(netInterval)
    }, files.length * 800 + 400)
    return () => clearInterval(netInterval)
  }, [phase])

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
          phase === 'macro' ? { background: '#f0c36d', animation: 'vsim-pulse 0.5s ease-in-out infinite' }
          : phase === 'infected' ? { background: '#C94E4E' }
          : {}
        } />
        {phase === 'inbox'    && 'Your email client — new message arrived'}
        {phase === 'email'    && 'Reading the suspicious email'}
        {phase === 'doc'      && 'Document opened — macro prompt appeared'}
        {phase === 'macro'    && 'Macro is executing — virus spreading...'}
        {phase === 'infected' && 'Your system and network have been compromised'}
      </div>

      <div style={{
        background: '#1e1e2e',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        fontFamily: '"Segoe UI", -apple-system, sans-serif',
      }}>
        {/* Email app top bar */}
        <div style={{
          background: '#16213e',
          padding: '7px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 12, color: '#7eb8da', fontWeight: 600,
          }}>
            {icons.mail} Outlook
          </div>
          <div style={{ fontSize: 11, color: '#888' }}>
            {userDisplayName} — {time}
          </div>
        </div>

        <div style={{ display: 'flex', minHeight: 320 }}>
          {/* Folder pane */}
          <div style={{
            width: 130, background: 'rgba(0,0,0,0.2)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 0',
          }}>
            {['Inbox (1)', 'Sent', 'Drafts', 'Spam', 'Trash'].map((folder, i) => (
              <div key={i} style={{
                padding: '5px 14px', fontSize: 11.5,
                color: i === 0 ? '#7eb8da' : '#888',
                background: i === 0 ? 'rgba(126,184,218,0.08)' : 'transparent',
                fontWeight: i === 0 ? 600 : 400,
              }}>
                {folder}
              </div>
            ))}
          </div>

          {/* Inbox list */}
          {(phase === 'inbox') && (
            <div style={{ width: 180, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              {inboxEmails.map((email, idx) => (
                <div
                  key={idx}
                  onClick={email.isScam ? () => setPhase('email') : undefined}
                  style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: email.isScam ? 'rgba(255,255,255,0.04)' : 'transparent',
                    cursor: email.isScam ? 'pointer' : 'default',
                  }}
                >
                  <div style={{
                    fontSize: 11.5, fontWeight: email.unread ? 700 : 400,
                    color: email.unread ? '#fff' : '#888', marginBottom: 2,
                  }}>
                    {email.from}
                  </div>
                  <div style={{
                    fontSize: 11, color: '#777',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {email.subject}
                  </div>
                  <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>{email.time}</div>
                </div>
              ))}
            </div>
          )}

          {/* Email reading pane */}
          {(phase === 'email') && (
            <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginBottom: 14,
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                    {emailSubject}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#888' }}>
                    From: <span style={{ color: '#e08080' }}>{senderName}</span>
                    <span style={{ fontSize: 10, color: '#C94E4E', marginLeft: 4 }}>
                      &lt;{senderEmail}&gt;
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: 10, color: '#666' }}>10:15 AM</span>
              </div>

              {/* Domain warning */}
              <div style={{
                padding: '7px 10px', marginBottom: 14,
                background: 'rgba(212,137,26,0.08)',
                border: '1px solid rgba(212,137,26,0.25)',
                borderRadius: 5, fontSize: 11, color: '#D4891A',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                External sender — workdocs-shared.net is not your company domain
              </div>

              <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.8, marginBottom: 16 }}>
                {emailBody.map((line, i) => (
                  <p key={i} style={{ marginBottom: 8 }}>{line}</p>
                ))}
              </div>

              {/* Attachment */}
              <div
                onClick={() => setPhase('doc')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', marginBottom: 16,
                  maxWidth: 240,
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 4,
                  background: '#1a4e8a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" stroke="none">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#fff' }}>{attachmentName}</div>
                  <div style={{ fontSize: 10.5, color: '#888' }}>{attachmentSize} — click to open</div>
                </div>
                {icons.paperclip}
              </div>

              {/* Action buttons */}
              {!interacted && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    onClick={() => handleAction('reported_email')}
                    style={{
                      padding: '9px', background: 'rgba(46,184,122,0.1)',
                      border: '1px solid rgba(46,184,122,0.35)', borderRadius: 6,
                      color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Report as phishing and delete
                  </button>
                  <button
                    onClick={() => handleAction('deleted_attachment')}
                    style={{
                      padding: '9px', background: 'rgba(46,184,122,0.06)',
                      border: '1px solid rgba(46,184,122,0.2)', borderRadius: 6,
                      color: '#2EB87A', fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    Delete email without opening attachment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Document open — macro prompt */}
          {phase === 'doc' && (
            <div style={{ flex: 1, padding: 14 }}>
              {/* Fake Word document */}
              <div style={{
                background: '#f5f5f5', borderRadius: 6,
                border: '1px solid #ddd', overflow: 'hidden',
              }}>
                {/* Word title bar */}
                <div style={{
                  background: '#1a4e8a', padding: '6px 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 11.5, color: '#fff', fontWeight: 600 }}>
                    {attachmentName} — Microsoft Word
                  </span>
                  <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                    <span>_</span><span>□</span><span>✕</span>
                  </div>
                </div>

                {/* Macro security bar */}
                <div style={{
                  background: '#fff3cd',
                  borderBottom: '1px solid #ffc107',
                  padding: '8px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#856404" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span style={{ flex: 1, fontSize: 12, color: '#856404' }}>
                    SECURITY WARNING: Macros have been disabled.
                  </span>
                  <button
                    onClick={() => {
                      setPhase('macro')
                    }}
                    style={{
                      padding: '4px 12px',
                      background: '#1a4e8a', color: '#fff',
                      border: 'none', borderRadius: 3,
                      fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Enable Content
                  </button>
                </div>

                {/* Blurred document content */}
                <div style={{ padding: '16px 20px', filter: 'blur(4px)', userSelect: 'none', minHeight: 120 }}>
                  <div style={{ height: 14, background: '#ddd', borderRadius: 2, marginBottom: 8, width: '60%' }} />
                  <div style={{ height: 10, background: '#eee', borderRadius: 2, marginBottom: 6 }} />
                  <div style={{ height: 10, background: '#eee', borderRadius: 2, marginBottom: 6, width: '80%' }} />
                  <div style={{ height: 10, background: '#eee', borderRadius: 2, marginBottom: 6, width: '70%' }} />
                </div>
              </div>

              {!interacted && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => handleAction('reported_email')}
                    style={{
                      padding: '9px', background: 'rgba(46,184,122,0.1)',
                      border: '1px solid rgba(46,184,122,0.35)', borderRadius: 6,
                      color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Close document and report to IT security
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Macro executing / infected */}
          {(phase === 'macro' || phase === 'infected') && (
            <div style={{ flex: 1, padding: 14 }}>
              {/* Network activity monitor */}
              <div style={{
                background: '#0d0d14', border: '1px solid rgba(201,78,78,0.3)',
                borderRadius: 6, padding: '12px 14px', marginBottom: 12,
                animation: 'vsim-slide-up 0.3s ease',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#C94E4E' }}>
                    Outbound Network Activity
                  </div>
                  <div style={{
                    fontSize: 10, fontFamily: 'var(--mono)', color: '#C94E4E',
                    background: 'rgba(201,78,78,0.1)', padding: '2px 8px', borderRadius: 3,
                  }}>
                    DATA EXFILTRATION
                  </div>
                </div>

                {/* Network graph bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40, marginBottom: 8 }}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} style={{
                      flex: 1,
                      background: i < 10 ? 'rgba(201,78,78,0.3)' : '#C94E4E',
                      height: i < 10 ? `${10 + Math.random() * 20}px` : `${20 + Math.random() * 20}px`,
                      borderRadius: '1px 1px 0 0',
                      animation: i >= 10 ? 'none' : 'none',
                    }} />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <div style={{ flex: 1, height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${networkActivity}%`,
                      background: 'linear-gradient(90deg, #C94E4E, #ff6b6b)',
                      borderRadius: 2,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                  <span style={{ fontSize: 10, color: '#C94E4E', fontFamily: 'var(--mono)', minWidth: 40 }}>
                    {Math.round(networkActivity)}%
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 4, fontFamily: 'var(--mono)' }}>
                  Destination: 185.220.xxx.xxx (unknown)
                </div>
              </div>

              {/* Files being exfil'd */}
              <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>
                Files copied to attacker server:
              </div>
              {networkFiles.map((name, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '5px 8px', borderRadius: 4, marginBottom: 3,
                  background: infectedFiles.includes(name) ? 'rgba(201,78,78,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${infectedFiles.includes(name) ? 'rgba(201,78,78,0.2)' : 'rgba(255,255,255,0.04)'}`,
                  animation: infectedFiles.includes(name) ? 'vsim-slide-up 0.3s ease' : 'none',
                }}>
                  {icons.file(infectedFiles.includes(name) ? '#C94E4E' : '#555')}
                  <span style={{
                    fontSize: 11, fontFamily: 'var(--mono)',
                    color: infectedFiles.includes(name) ? '#C94E4E' : '#555',
                  }}>
                    {name}
                  </span>
                  {infectedFiles.includes(name) && (
                    <span style={{
                      marginLeft: 'auto', fontSize: 10, color: '#C94E4E',
                      fontFamily: 'var(--mono)',
                    }}>
                      SENT
                    </span>
                  )}
                </div>
              ))}

              {phase === 'infected' && !interacted && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    onClick={() => handleAction('enabled_macros')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'rgba(46,184,122,0.1)', border: '1px solid rgba(46,184,122,0.35)',
                      borderRadius: 6, color: '#2EB87A', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Disconnect network and contact IT department now
                  </button>
                  <button
                    onClick={() => handleAction('forwarded_email')}
                    style={{
                      width: '100%', padding: '10px',
                      background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6, color: 'rgba(255,255,255,0.4)', fontSize: 12.5, cursor: 'pointer',
                    }}
                  >
                    Run antivirus scan and assume it will fix it
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
