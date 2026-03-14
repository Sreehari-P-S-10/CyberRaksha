/**
 * components/FakeWebsiteUI.jsx
 * Reusable fake website environments:
 *   SocialAdEnv     — Instagram-style sponsored post
 *   FakeStoreEnv    — Fake e-commerce product page
 *   CheckoutEnv     — Fake checkout form
 *   CourierSiteEnv  — Fake courier redelivery site
 *   GamingLoginEnv  — Fake gaming login page
 */
import { useState, useEffect } from 'react'
import '../VisualSim.css'

/* ── countdown hook ── */
function useCountdown(start) {
  const [secs, setSecs] = useState(start)
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s > 0 ? s - 1 : start), 1000)
    return () => clearInterval(id)
  }, [start])
  return `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
}

/* ── browser address bar ── */
function AddressBar({ domain, path = '' }) {
  return (
    <div className="ec-store-bar">
      <div className="ec-store-dots">
        <div className="ec-store-dot" style={{ background: '#ff5f57' }} />
        <div className="ec-store-dot" style={{ background: '#febc2e' }} />
        <div className="ec-store-dot" style={{ background: '#28c840' }} />
      </div>
      <div className="ec-store-url">
        <span className="ec-store-url-lock">🔒</span>
        <span className="ec-store-url-text">
          <span style={{ color: '#f4a261', fontWeight: 700 }}>{domain}</span>
          {path}
        </span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SOCIAL AD ENVIRONMENT
══════════════════════════════════════════════ */
export function SocialAdEnv({ envProps, onInteract }) {
  const {
    accountName, emoji, brand, discountLabel, priceNew, priceOld,
    stockCount, fakeComments = [], ctaLabel, fakeDomain,
  } = envProps
  const timer = useCountdown(47 * 60 + 13)
  const [tapped, setTapped] = useState(false)

  function handleCta() {
    if (tapped) return
    setTapped(true)
    setTimeout(() => onInteract('cta_clicked'), 500)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" /> Instagram · Sponsored Post
      </div>

      <div className="ec-feed">
        <div className="ec-feed-header">
          <div className="ec-feed-avatar">{accountName[0]}</div>
          <div>
            <div className="ec-feed-name">{accountName}</div>
            <div className="ec-feed-sponsored">
              Sponsored · <span style={{ color: '#007aff', marginLeft: 2 }}>Follow</span>
            </div>
          </div>
          <div className="ec-feed-badge">···</div>
        </div>

        <div className="ec-ad-image">
          <div className="ec-ad-bg-shimmer" />
          <div className="ec-ad-discount-badge">{discountLabel}</div>
          <div className="ec-ad-shoe-emoji">{emoji}</div>
          <div className="ec-ad-brand">{brand}</div>
          <div className="ec-ad-price-row">
            <span className="ec-ad-price-new">{priceNew}</span>
            <span className="ec-ad-price-old">{priceOld}</span>
          </div>
        </div>

        <div className="ec-feed-caption">
          <strong>🔥 FLASH SALE — Original {brand}!</strong><br />
          Only <strong style={{ color: '#e63946' }}>{stockCount} pairs left</strong> at this price. Hurry! 🏃‍♂️
        </div>

        <div className="ec-feed-timer">⏱ Sale ends in: <strong>{timer}</strong></div>

        <div style={{ padding: '6px 14px', fontSize: 12, color: '#aaa', borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <span style={{ color: '#ccc', fontWeight: 600 }}>1,247 likes</span>{'  '}
          {fakeComments.map((c, i) => (
            <span key={i}>{c.user}: "{c.text}"{'  '}</span>
          ))}
          <span style={{ color: '#888' }}>View all 84 comments</span>
        </div>

        <button
          className={`ec-feed-cta${tapped ? ' clicked' : ''}`}
          onClick={handleCta}
        >
          {tapped ? '⏳ Opening...' : ctaLabel}
        </button>
      </div>

      <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
        Domain this ad will take you to: <span style={{ color: '#f4a261' }}>{fakeDomain}</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   FAKE STORE ENVIRONMENT
══════════════════════════════════════════════ */
export function FakeStoreEnv({ envProps, onInteract }) {
  const {
    domain, productEmoji, productName, priceNew, priceOld,
    stockCount, reviews = [],
  } = envProps
  const timer = useCountdown(23 * 60 + 44)
  const [adding, setAdding] = useState(false)

  function handleAdd() {
    if (adding) return
    setAdding(true)
    setTimeout(() => onInteract('add_to_cart'), 800)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" /> Fake Website — {domain}
      </div>

      <div className="ec-store">
        <AddressBar domain={domain} path="/products/item" />

        <div className="ec-countdown-bar">
          🔥 FLASH SALE ENDS IN: {timer} — {stockCount} LEFT
        </div>

        <div className="ec-store-nav">
          <span style={{ fontSize: 18, fontWeight: 700 }}>Store</span>
          <div className="ec-store-nav-links">
            <span>Men</span><span>Women</span><span>Sale</span>
          </div>
        </div>

        <div className="ec-store-body">
          <div className="ec-product-row">
            <div className="ec-product-img">{productEmoji}</div>
            <div className="ec-product-info">
              <div className="ec-product-name">{productName}</div>
              <div className="ec-product-reviews">★★★★★ (2,841 reviews)</div>
              <div className="ec-product-price-row">
                <span className="ec-product-price-new">{priceNew}</span>
                <span className="ec-product-price-old">{priceOld}</span>
              </div>
              <div className="ec-product-save">You save 90%! Limited time only.</div>
              <div className="ec-stock-bar">
                <span className="ec-stock-indicator" />Only {stockCount} left in stock!
              </div>
              {reviews.length > 0 && (
                <div className="ec-fake-reviews">
                  {reviews.map((r, i) => (
                    <div key={i} className="ec-review-item">
                      <span className="ec-review-stars">★★★★★</span>
                      <span><strong>{r.name}</strong>: {r.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className={`ec-add-cart-btn${adding ? ' adding' : ''}`}
            onClick={handleAdd}
            disabled={adding}
          >
            {adding ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags on This Page</div>
        <ul className="vsim-warning-list">
          <li>Domain <strong>{domain}</strong> is not the official brand website</li>
          <li>90%+ discount is unrealistic for branded goods</li>
          <li>Countdown timer resets for each new visitor</li>
          <li>Reviews have no verified purchase badges</li>
        </ul>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   COURIER SITE ENVIRONMENT
══════════════════════════════════════════════ */
export function CourierSiteEnv({ envProps, onInteract }) {
  const { domain, trackingId, amount, brandName, brandColor = '#5856d6' } = envProps
  const [paying, setPaying] = useState(false)

  function handlePay() {
    if (paying) return
    setPaying(true)
    setTimeout(() => onInteract('pay_clicked'), 600)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" /> Fake Courier Website — {domain}
      </div>

      <div className="courier-site">
        <div className="courier-site-bar">
          <div className="ec-store-dots">
            <div className="ec-store-dot" style={{ background: '#ff5f57' }} />
            <div className="ec-store-dot" style={{ background: '#febc2e' }} />
            <div className="ec-store-dot" style={{ background: '#28c840' }} />
          </div>
          <div className="courier-site-url">
            🔒 <span style={{ color: '#f4a261' }}>{domain}</span>/pay
          </div>
        </div>

        <div className="courier-header" style={{ background: brandColor }}>
          <div>
            <div className="courier-header-logo">{brandName}</div>
            <div className="courier-header-sub">Express Courier & Cargo Ltd.</div>
          </div>
        </div>

        <div className="courier-body">
          <div className="courier-failed-banner">
            ⚠ Delivery Failed — Action Required
          </div>

          <div className="courier-tracking-box">
            <div className="courier-tracking-title">📦 Package Details</div>
            {[
              ['Tracking No.', trackingId],
              ['Status', 'Delivery Failed'],
              ['Reason', 'Recipient not available'],
              ['Date', new Date().toLocaleDateString('en-IN')],
            ].map(([k, v]) => (
              <div key={k} className="courier-tracking-row">
                <span>{k}</span>
                <strong style={{ color: k === 'Status' ? '#d32f2f' : '#333' }}>{v}</strong>
              </div>
            ))}
          </div>

          <div className="courier-pay-section">
            <div className="courier-pay-title">Redelivery Payment Required</div>
            <div className="courier-pay-sub">
              Pay within 24 hours to avoid return to sender.
            </div>
            <div className="courier-pay-amount">{amount}</div>
            <button className="courier-pay-btn" onClick={handlePay} disabled={paying}>
              {paying ? '⏳ Processing...' : `Pay Redelivery Fee — ${amount}`}
            </button>
          </div>
        </div>
      </div>

      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags on This Page</div>
        <ul className="vsim-warning-list">
          <li>Domain <strong>{domain}</strong> is not the official courier website</li>
          <li>Arrived via unsolicited SMS — official couriers don't send payment links by SMS</li>
          <li>"24-hour deadline" is manufactured urgency</li>
        </ul>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   GAMING LOGIN PAGE ENVIRONMENT
══════════════════════════════════════════════ */
export function GamingLoginEnv({ envProps, onInteract }) {
  const { fakeDomain, gameName, gameEmoji, skinName, skinValue, accentColor = '#ff4458' } = envProps
  const timer = useCountdown(28 * 60 + 47)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit() {
    if (!username || !password || submitting) return
    setSubmitting(true)
    setTimeout(() => onInteract('login_submitted'), 800)
  }

  return (
    <div className="vsim-root">
      <div className="vsim-scene-label">
        <span className="vsim-scene-dot" style={{ background: '#C94E4E' }} />
        Fake Login Page — {fakeDomain}
      </div>

      <div className="game-login-site">
        <div className="game-login-bar">
          <div className="ec-store-dots">
            <div className="ec-store-dot" style={{ background: '#ff5f57' }} />
            <div className="ec-store-dot" style={{ background: '#febc2e' }} />
            <div className="ec-store-dot" style={{ background: '#28c840' }} />
          </div>
          <div className="game-login-url">
            🔒 <span style={{ color: '#f4a261' }}>{fakeDomain}</span>/claim
          </div>
        </div>

        <div className="game-login-header">
          <div className="game-login-logo">{gameEmoji}</div>
          <div className="game-login-title">{gameName}</div>
          <div className="game-login-sub" style={{ color: accentColor }}>
            🎁 FREE {skinName?.toUpperCase()} — CLAIM NOW
          </div>
        </div>

        <div className="game-login-form">
          <div style={{
            background: `${accentColor}18`, border: `1px solid ${accentColor}44`,
            borderRadius: 6, padding: '10px 12px', marginBottom: 16,
            fontSize: 12.5, color: '#ccc', lineHeight: 1.5,
          }}>
            🎁 Sign in to claim your <strong style={{ color: '#fff' }}>{skinName}</strong>
            {' '}(worth {skinValue}). Offer expires in{' '}
            <strong style={{ color: accentColor }}>{timer}</strong>
          </div>

          <label className="game-login-label">Username / Email</label>
          <input
            className="game-login-input"
            placeholder="Enter your username or email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ '--accent': accentColor }}
          />

          <label className="game-login-label">Password</label>
          <input
            className="game-login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="game-login-submit"
            style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)` }}
            onClick={handleSubmit}
            disabled={submitting || !username || !password}
          >
            {submitting ? '⏳ Verifying...' : 'Sign In & Claim'}
          </button>

          <div className="game-login-trust">
            🔒 Secured · Official Event · Limited Time
          </div>
        </div>
      </div>

      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags on This Page</div>
        <ul className="vsim-warning-list">
          <li>Domain <strong>{fakeDomain}</strong> is not the official game domain</li>
          <li>Arrived via unsolicited Discord DM — not official channels</li>
          <li>Countdown timer to create urgency</li>
          <li>Asking for real login credentials on a third-party site</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
        👆 Try entering credentials — or read the URL bar carefully first
      </div>
    </div>
  )
}
