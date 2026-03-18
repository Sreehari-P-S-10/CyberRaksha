// export function TradingPlatformEnv({ envProps, onInteract }) {
//   const {
//     platformName,
//     domain,
//     balance = '₹75,000',
//     profit = '+₹25,000',
//   } = envProps

//   return (
//     <div className="vsim-root">
//       <div className="vsim-scene-label">
//         📈 Trading Platform Dashboard
//       </div>

//       <div style={{
//         background: '#111',
//         borderRadius: 12,
//         padding: 18,
//         border: '1px solid rgba(255,255,255,0.08)',
//         maxWidth: 500,
//         margin: '0 auto'
//       }}>

//         {/* Header */}
//         <div style={{ marginBottom: 16 }}>
//           <div style={{ fontSize: 18, fontWeight: 700 }}>
//             {platformName}
//           </div>
//           <div style={{ fontSize: 12, color: '#aaa' }}>
//             🔒 {domain}
//           </div>
//         </div>

//         {/* Fake stats */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           marginBottom: 16
//         }}>
//           <div>
//             <div style={{ color: '#aaa', fontSize: 12 }}>Balance</div>
//             <div style={{ fontSize: 20 }}>{balance}</div>
//           </div>

//           <div>
//             <div style={{ color: '#aaa', fontSize: 12 }}>Today’s Profit</div>
//             <div style={{ fontSize: 20, color: '#00D084' }}>{profit}</div>
//           </div>
//         </div>

//         {/* Fake graph */}
//         <div style={{
//           height: 120,
//           background: 'linear-gradient(135deg,#00D08433,#00D08411)',
//           borderRadius: 8,
//           marginBottom: 16,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: '#00D084'
//         }}>
//           📊 Live Trading Profits
//         </div>

//         {/* Buttons */}
//         <button
//           onClick={() => onInteract('deposit_clicked')}
//           style={{
//             width: '100%',
//             padding: 10,
//             marginBottom: 8,
//             background: '#00D084',
//             border: 'none',
//             borderRadius: 8
//           }}
//         >
//           Invest More
//         </button>

//         <button
//           onClick={() => onInteract('withdraw_clicked')}
//           style={{
//             width: '100%',
//             padding: 10,
//             background: '#222',
//             border: '1px solid #444',
//             borderRadius: 8
//           }}
//         >
//           Withdraw Funds
//         </button>
//       </div>

//       {/* Warning */}
//       <div className="vsim-warning-overlay">
//         <div className="vsim-warning-title">⚠ Red Flags</div>
//         <ul className="vsim-warning-list">
//           <li>Unrealistic consistent profits</li>
//           <li>No real trading data</li>
//           <li>Withdrawal issues</li>
//           <li>Unregistered platform</li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// components/TradingPlatformEnv.jsx
import { useEffect, useState } from 'react'
import '../VisualSim.css'

export function TradingPlatformEnv({ envProps, onInteract }) {
  const {
    platformName,
    domain,
    balance = '₹75,000',
    profit = 25000
  } = envProps

  const [displayProfit, setDisplayProfit] = useState(0)
  const [showNotif, setShowNotif] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 500
      if (i >= profit) {
        i = profit
        clearInterval(interval)
      }
      setDisplayProfit(i)
    }, 20)

    return () => clearInterval(interval)
  }, [profit])

  // Hide notification after few seconds
  useEffect(() => {
    const t = setTimeout(() => setShowNotif(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="vsim-root fade-in">

      <div className="vsim-scene-label">
        📈 Trading Platform Dashboard
      </div>

      <div
        className="tp-card-hover"
        style={{
          background: '#111',
          borderRadius: 14,
          padding: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          maxWidth: 500,
          margin: '0 auto',
          position: 'relative'
        }}
      >

        {/* Fake Notification */}
        {showNotif && (
          <div className="tp-notification">
            +₹10,000 profit credited 🎉
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {platformName}
          </div>
          <div style={{ fontSize: 12, color: '#aaa' }}>
            🔒 {domain}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
          }}
        >
          <div>
            <div style={{ color: '#aaa', fontSize: 12 }}>Balance</div>
            <div style={{ fontSize: 20 }}>{balance}</div>
          </div>

          <div>
            <div style={{ color: '#aaa', fontSize: 12 }}>Today’s Profit</div>
            <div
              className="tp-profit"
              style={{
                fontSize: 20,
                color: '#00D084',
                fontWeight: 700
              }}
            >
              +₹{displayProfit.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Animated Graph */}
        <div
          className="tp-graph"
          style={{
            height: 120,
            borderRadius: 10,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00D084',
            fontWeight: 600
          }}
        >
          📊 Live Trading Profits
        </div>

        {/* Buttons */}
        <button
          className="tp-btn"
          onClick={() => onInteract('deposit_clicked')}
          style={{
            width: '100%',
            padding: 12,
            marginBottom: 10,
            background: '#00D084',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Invest More
        </button>

        <button
          className="tp-btn"
          onClick={() => onInteract('withdraw_clicked')}
          style={{
            width: '100%',
            padding: 12,
            background: '#222',
            border: '1px solid #444',
            borderRadius: 10,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Withdraw Funds
        </button>
      </div>

      {/* Warning */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags</div>
        <ul className="vsim-warning-list">
          <li>Unrealistic constant profits</li>
          <li>No real trading data</li>
          <li>Withdrawal issues likely</li>
          <li>Unregistered platform</li>
        </ul>
      </div>
    </div>
  )
}