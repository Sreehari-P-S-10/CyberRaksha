/**
 * components/FakeJobPortalUI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Visual environments for Career, Education & Opportunity scams.
 *
 * Environments exported:
 *   FakeJobPortalEnv        — Fake company onboarding portal demanding fees
 *   FakeScholarshipPortalEnv — Fake scholarship verification portal
 *   FakeUniversityPortalEnv  — Fake university exam results login page
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ══════════════════════════════════════════════════════════
   FakeJobPortalEnv
   A spoofed corporate onboarding / recruitment portal that
   demands escalating fees for "document processing" and
   "background verification". Used by ceo-v-job-1 Step 2.
══════════════════════════════════════════════════════════ */
export function FakeJobPortalEnv({ envProps, onInteract }) {
  const {
    companyName    = 'Google India',
    companyEmoji   = '🔵',
    accentColor    = '#4285F4',
    fakeDomain     = 'google-onboarding-in.com',
    realDomain     = 'careers.google.com',
    candidateName  = 'Candidate',
    positionTitle  = 'Senior Software Engineer',
    feeItems       = [],
    totalFee       = '₹5,000',
  } = envProps

  const [interacted, setInteracted]       = useState(false)
  const [showDomainHint, setShowDomain]   = useState(false)
  const [paidIndex, setPaidIndex]         = useState(null)

  function handleDomainClick() {
    setShowDomain(true)
    if (!interacted) {
      setInteracted(true)
      setTimeout(() => onInteract('checked_domain'), 500)
    }
  }

  function handlePayFee(idx) {
    if (interacted) return
    setPaidIndex(idx)
    setInteracted(true)
    setTimeout(() => onInteract('paid_fee'), 600)
  }

  function handleReject() {
    if (interacted) return
    setInteracted(true)
    onInteract('rejected_fees')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Browser — Fake Onboarding Portal
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
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {/* Clickable URL bar */}
          <div
            onClick={handleDomainClick}
            title="Click to inspect the URL"
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
        <div style={{ background: '#f8f9fa', minHeight: 360 }}>
          {/* Header bar */}
          <div style={{
            background: accentColor,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{ fontSize: 30 }}>{companyEmoji}</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>
                {companyName} — Candidate Onboarding
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                Secure Talent Acquisition Portal
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 22 }}>🔐</div>
          </div>

          {/* Welcome banner */}
          <div style={{
            background: '#e8f5e9',
            border: '1px solid #a5d6a7',
            borderRadius: 8,
            margin: '18px 20px 14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 22 }}>🎉</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#2e7d32' }}>
                Welcome, {candidateName}!
              </div>
              <div style={{ fontSize: 12.5, color: '#388e3c', marginTop: 2 }}>
                You have been selected for: <strong>{positionTitle}</strong>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div style={{ padding: '0 20px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
              To complete your onboarding, please clear the following mandatory payments.
              These are standard pre-joining requirements processed through our secure portal.
            </div>
          </div>

          {/* Fee items */}
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {feeItems.map((item, idx) => (
              <div key={idx} style={{
                background: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: 8,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{item.emoji || '📄'}</span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: '#212529' }}>{item.name}</div>
                    <div style={{ fontSize: 11.5, color: '#6c757d', marginTop: 2 }}>{item.description}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#212529' }}>{item.price}</div>
                  <button
                    onClick={() => handlePayFee(idx)}
                    disabled={interacted}
                    style={{
                      marginTop: 4,
                      background: paidIndex === idx ? '#2EB87A' : accentColor,
                      color: '#fff', border: 'none',
                      padding: '5px 12px', borderRadius: 5,
                      fontSize: 12, fontWeight: 600,
                      cursor: interacted ? 'default' : 'pointer',
                      opacity: interacted && paidIndex !== idx ? 0.45 : 1,
                      transition: 'background 0.2s',
                    }}
                  >
                    {paidIndex === idx ? '✓ Paid' : 'Pay Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & reject */}
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{
              background: '#fff',
              border: '2px solid #dee2e6',
              borderRadius: 8,
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>Total Due</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#212529' }}>{totalFee}</span>
            </div>

            <button
              onClick={handleReject}
              disabled={interacted}
              style={{
                background: 'transparent',
                color: '#6c757d',
                border: '1px solid #dee2e6',
                width: '100%', padding: '10px',
                borderRadius: 8, fontSize: 13,
                cursor: interacted ? 'default' : 'pointer',
                opacity: interacted ? 0.4 : 1,
              }}
            >
              I recognise this as fraud — I won't pay
            </button>
          </div>
        </div>
      </div>

      {/* Domain hint */}
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
          }}>⚠ Domain Mismatch Detected</div>
          <p style={{ fontSize: 13, color: '#e8a8a8', lineHeight: 1.6 }}>
            This portal is at <strong style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>{fakeDomain}</strong>,
            not <strong style={{ fontFamily: 'var(--mono)', color: '#2EB87A' }}>{realDomain}</strong>.
            Legitimate company onboarding portals always use the company's official domain. Fee-collecting portals on unknown domains are a universal sign of recruitment fraud.
          </p>
        </div>
      )}

      {/* Red flags overlay */}
      <div style={{
        background: 'rgba(201, 78, 78, 0.07)',
        border: '1px solid rgba(201, 78, 78, 0.2)',
        borderRadius: 10,
        padding: '14px 16px',
      }}>
        <div style={{
          fontSize: 11, fontFamily: 'var(--mono)',
          color: '#C94E4E', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>⚠ Red Flags on This Portal</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            `Domain is "${fakeDomain}" — not the official company domain`,
            'Legitimate companies NEVER charge employees onboarding or processing fees',
            'Background verification is always handled internally by HR — free of charge',
            'Escalating fee requests after each payment is the signature of recruitment fraud',
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
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   FakeScholarshipPortalEnv
   A spoofed scholarship / government benefits portal that
   collects Aadhaar, bank details, and a processing fee.
   Used by ceo-v-scholarship-1 Step 2.
══════════════════════════════════════════════════════════ */
export function FakeScholarshipPortalEnv({ envProps, onInteract }) {
  const {
    portalName     = 'National Scholarship Board Portal',
    fakeDomain     = 'scholarship-verify.org.in',
    realDomain     = 'scholarships.gov.in',
    logoEmoji      = '🎓',
    accentColor    = '#1F5296',
    scholarshipName = 'National Merit Scholarship 2024',
    amountDisplay  = '₹2,00,000/year',
    processingFee  = '₹3,000',
    fields         = ['Bank Account Number', 'IFSC Code', 'Aadhaar Number'],
  } = envProps

  const [interacted, setInteracted]     = useState(false)
  const [showDomainHint, setShowDomain] = useState(false)
  const [fieldValues, setFieldValues]   = useState({})
  const [feeClicked, setFeeClicked]     = useState(false)

  function handleDomainClick() {
    setShowDomain(true)
    if (!interacted) {
      setInteracted(true)
      setTimeout(() => onInteract('checked_domain'), 500)
    }
  }

  function handleSubmit() {
    if (interacted) return
    setFeeClicked(true)
    setInteracted(true)
    setTimeout(() => onInteract('submitted_details'), 700)
  }

  function handleReject() {
    if (interacted) return
    setInteracted(true)
    onInteract('rejected_portal')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" />
        Browser — Fake Scholarship Portal
      </div>

      {/* Browser chrome */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        {/* Toolbar */}
        <div style={{
          background: '#2c2c2e',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div
            onClick={handleDomainClick}
            title="Click to inspect the URL"
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
        <div style={{ background: '#f5f7fa', minHeight: 400 }}>
          {/* Header */}
          <div style={{
            background: accentColor,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{ fontSize: 30 }}>{logoEmoji}</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{portalName}</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>
                Government of India · Ministry of Education
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 22 }}>🇮🇳</div>
          </div>

          <div style={{ padding: '18px 20px' }}>
            {/* Scholarship info banner */}
            <div style={{
              background: '#e3f2fd',
              border: '1px solid #90caf9',
              borderRadius: 8,
              padding: '12px 16px',
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0d47a1', marginBottom: 4 }}>
                🎓 {scholarshipName}
              </div>
              <div style={{ fontSize: 12.5, color: '#1565c0' }}>
                You have been shortlisted! Scholarship amount: <strong>{amountDisplay}</strong>.
                Complete the verification below to activate disbursement.
              </div>
            </div>

            {/* Form fields */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 10 }}>
                Verification Details Required
              </div>
              {fields.map((field, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 12, color: '#555', display: 'block', marginBottom: 4 }}>
                    {field} *
                  </label>
                  <input
                    type={field.toLowerCase().includes('aadhaar') ? 'number' : 'text'}
                    placeholder={`Enter your ${field}`}
                    disabled={interacted}
                    onChange={e => setFieldValues(v => ({ ...v, [field]: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 6,
                      border: '1px solid #ced4da',
                      fontSize: 13,
                      background: interacted ? '#f5f5f5' : '#fff',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Processing fee notice */}
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>💳</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#856404' }}>
                  Mandatory Processing Fee: {processingFee}
                </div>
                <div style={{ fontSize: 11.5, color: '#856404' }}>
                  Required for government document verification (refundable after disbursement)
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={interacted}
              style={{
                background: feeClicked ? '#2EB87A' : accentColor,
                color: '#fff', border: 'none',
                width: '100%', padding: '13px',
                borderRadius: 8, fontSize: 14,
                fontWeight: 700, cursor: interacted ? 'default' : 'pointer',
                marginBottom: 8,
                opacity: interacted && !feeClicked ? 0.4 : 1,
                transition: 'background 0.3s',
              }}
            >
              {feeClicked ? '✓ Submitted...' : `Submit & Pay ${processingFee}`}
            </button>

            <button
              onClick={handleReject}
              disabled={interacted}
              style={{
                background: 'transparent',
                color: '#6c757d',
                border: '1px solid #dee2e6',
                width: '100%', padding: '10px',
                borderRadius: 8, fontSize: 13,
                cursor: interacted ? 'default' : 'pointer',
                opacity: interacted ? 0.4 : 1,
              }}
            >
              This looks suspicious — I won't submit
            </button>
          </div>
        </div>
      </div>

      {/* Domain hint */}
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
          }}>⚠ Domain Mismatch Detected</div>
          <p style={{ fontSize: 13, color: '#e8a8a8', lineHeight: 1.6 }}>
            This portal uses <strong style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>{fakeDomain}</strong> —
            not <strong style={{ fontFamily: 'var(--mono)', color: '#2EB87A' }}>{realDomain}</strong>.
            All genuine government scholarship portals use <strong>.gov.in</strong> domains exclusively.
            A <strong>.org.in</strong> domain cannot be an official government site.
          </p>
        </div>
      )}

      {/* Red flags */}
      <div style={{
        background: 'rgba(201, 78, 78, 0.07)',
        border: '1px solid rgba(201, 78, 78, 0.2)',
        borderRadius: 10,
        padding: '14px 16px',
      }}>
        <div style={{
          fontSize: 11, fontFamily: 'var(--mono)',
          color: '#C94E4E', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>⚠ Red Flags on This Portal</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            `Domain "${fakeDomain}" uses .org.in — real government sites always use .gov.in`,
            'Asking for bank account + IFSC + Aadhaar together enables immediate fraud',
            'Government scholarships NEVER charge a "processing fee" to disburse funds',
            '"Refundable fee" is a common lie — the money is never returned',
            'You cannot be shortlisted for a scholarship you never applied to',
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
    </div>
  )
}


/* ══════════════════════════════════════════════════════════
   FakeUniversityPortalEnv
   A spoofed university exam results / login portal.
   Used by ceo-v-exam-phone-1 and ceo-v-exam-desktop-1 Step 2.
══════════════════════════════════════════════════════════ */
export function FakeUniversityPortalEnv({ envProps, onInteract }) {
  const {
    portalTitle    = 'University Exam Results Portal',
    fakeDomain     = 'university-results.in',
    realDomain     = 'university.ac.in',
    logoEmoji      = '🎓',
    accentColor    = '#1F5296',
    examSession    = 'November 2024',
    loginFields    = ['University Email / Roll Number', 'Password'],
  } = envProps

  const [username, setUsername]         = useState('')
  const [password, setPassword]         = useState('')
  const [interacted, setInteracted]     = useState(false)
  const [showDomainHint, setShowDomain] = useState(false)
  const [submitting, setSubmitting]     = useState(false)

  function handleDomainClick() {
    setShowDomain(true)
    if (!interacted) {
      setInteracted(true)
      setTimeout(() => onInteract('checked_domain'), 500)
    }
  }

  function handleLogin() {
    if (!username || !password || interacted) return
    setSubmitting(true)
    setInteracted(true)
    setTimeout(() => onInteract('credentials_entered'), 800)
  }

  function handleClose() {
    if (interacted) return
    setInteracted(true)
    onInteract('closed_page')
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={{ background: '#C94E4E' }} />
        Browser — Fake University Results Portal
      </div>

      {/* Browser chrome */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.09)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        {/* Toolbar */}
        <div style={{
          background: '#2c2c2e',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div
            onClick={handleDomainClick}
            title="Click to inspect the URL"
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
          <button
            onClick={handleClose}
            disabled={interacted}
            style={{
              background: 'none', border: 'none',
              color: '#8e8e93', fontSize: 16,
              cursor: interacted ? 'default' : 'pointer',
            }}
          >✕</button>
        </div>

        {/* Page content */}
        <div style={{ background: '#f5f7fa', minHeight: 380 }}>
          {/* Header */}
          <div style={{
            background: accentColor,
            padding: '16px 20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 34, marginBottom: 6 }}>{logoEmoji}</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{portalTitle}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 4 }}>
              {examSession} — Results Now Available
            </div>
          </div>

          {/* Login form */}
          <div style={{ padding: '24px 24px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 16, textAlign: 'center' }}>
              Sign in to view your results
            </div>

            {/* Email / Roll No */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: '#555', display: 'block', marginBottom: 4 }}>
                {loginFields[0]}
              </label>
              <input
                type="text"
                placeholder="e.g. student@university.ac.in"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={interacted}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 7,
                  border: `1.5px solid ${username ? accentColor : '#ced4da'}`,
                  fontSize: 13,
                  background: interacted ? '#f5f5f5' : '#fff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: '#555', display: 'block', marginBottom: 4 }}>
                {loginFields[1] || 'Password'}
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={interacted}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 7,
                  border: `1.5px solid ${password ? accentColor : '#ced4da'}`,
                  fontSize: 13,
                  background: interacted ? '#f5f5f5' : '#fff',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={!username || !password || interacted}
              style={{
                background: submitting ? '#2EB87A' : accentColor,
                color: '#fff', border: 'none',
                width: '100%', padding: '13px',
                borderRadius: 8, fontSize: 14,
                fontWeight: 700,
                cursor: (!username || !password || interacted) ? 'not-allowed' : 'pointer',
                opacity: (!username || !password) && !interacted ? 0.55 : 1,
                transition: 'background 0.3s',
                marginBottom: 10,
              }}
            >
              {submitting ? '⏳ Logging in...' : 'Login & View Results'}
            </button>

            {/* Footer note */}
            <div style={{
              textAlign: 'center',
              fontSize: 12, color: '#888',
              padding: '8px 0',
              borderTop: '1px solid #dee2e6',
              marginTop: 4,
            }}>
              🔒 Secured · {portalTitle}
            </div>
          </div>
        </div>
      </div>

      {/* Domain hint */}
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
          }}>⚠ Wrong Domain</div>
          <p style={{ fontSize: 13, color: '#e8a8a8', lineHeight: 1.6 }}>
            This page is at <strong style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>{fakeDomain}</strong>.
            Your university's real portal would be at a domain ending in
            <strong style={{ color: '#2EB87A' }}> .ac.in</strong> or
            <strong style={{ color: '#2EB87A' }}> .edu.in</strong>,
            not a generic <strong style={{ fontFamily: 'var(--mono)', color: '#C94E4E' }}>.in</strong> domain.
            Any credentials entered here go directly to the attacker.
          </p>
        </div>
      )}

      {/* Red flags */}
      <div style={{
        background: 'rgba(201, 78, 78, 0.07)',
        border: '1px solid rgba(201, 78, 78, 0.2)',
        borderRadius: 10,
        padding: '14px 16px',
      }}>
        <div style={{
          fontSize: 11, fontFamily: 'var(--mono)',
          color: '#C94E4E', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>⚠ Red Flags on This Page</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            `Domain "${fakeDomain}" is not your university's official domain`,
            'Arrived via a link in an SMS or email — always navigate directly instead',
            'University results portals use institutional domains (.ac.in / .edu.in)',
            'Entering credentials here hands your university email to the attacker',
            'With your login, attackers can access your academic records and personal data',
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

      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
        👆 Try entering credentials — or check the URL bar first
      </div>
    </div>
  )
}
