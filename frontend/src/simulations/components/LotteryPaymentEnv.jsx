// components/LotteryPaymentEnv.jsx
import { useState } from 'react'
import '../VisualSim.css'

export function LotteryPaymentEnv({ envProps, onInteract }) {
  const {
    siteName,
    domain,
    amount,
    referenceId
  } = envProps

  const [loading, setLoading] = useState(false)

  function handlePay() {
    if (loading) return
    setLoading(true)

    setTimeout(() => {
      onInteract('payment_attempt')
    }, 1200)
  }

  return (
    <div className="vsim-root fade-in">

      <div className="vsim-scene-label">
        💳 Payment Gateway — Prize Claim
      </div>

      <div className="lp-container">

        {/* Fake browser bar */}
        <div className="lp-bar">
          🔒 <span className="lp-domain">{domain}</span>
        </div>

        {/* Card */}
        <div className="lp-card tp-card-hover">

          <div className="lp-title">
            🎉 Congratulations!
          </div>

          <div className="lp-sub">
            You have won ₹25,00,000 Lucky Prize Draw
          </div>

          <div className="lp-box">
            <div>Reference ID:</div>
            <strong>{referenceId}</strong>
          </div>

          <div className="lp-warning">
            ⚠ Processing fee required to release your prize
          </div>

          <div className="lp-amount pulse">
            ₹{amount}
          </div>

          {/* Fake urgency */}
          <div className="lp-timer">
            ⏳ Offer expires in 04:59
          </div>

          {/* Button */}
          <button
            className="lp-btn glow"
            onClick={handlePay}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>

          {/* Fake trust badges */}
          <div className="lp-trust">
            🔒 Secure Payment · Govt Approved · 256-bit Encryption
          </div>

        </div>
      </div>

      {/* Warning */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags</div>
        <ul className="vsim-warning-list">
          <li>Unexpected lottery win</li>
          <li>Upfront fee required</li>
          <li>Fake urgency timer</li>
          <li>Suspicious payment domain</li>
        </ul>
      </div>

    </div>
  )
}