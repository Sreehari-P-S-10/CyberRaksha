// // components/InvestmentAdEnv.jsx

// export function InvestmentAdEnv({ envProps, onInteract }) {
//   const {
//     adTitle,
//     adDescription,
//     adCta,
//     adImage,
//     adColor = '#1FCC79',
//   } = envProps

//   return (
//     <div className="vsim-root">
//       <div className="vsim-scene-label">
//         📱 Social Media — Investment Ad
//       </div>

//       <div style={{
//         background: '#111',
//         borderRadius: 12,
//         padding: 18,
//         border: '1px solid rgba(255,255,255,0.08)',
//         maxWidth: 420,
//         margin: '0 auto'
//       }}>

//         {/* Header */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//           <div style={{
//             width: 40,
//             height: 40,
//             borderRadius: '50%',
//             background: adColor,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontWeight: 700
//           }}>
//             📊
//           </div>
//           <div>
//             <div style={{ fontWeight: 600 }}>Elite Trading Group</div>
//             <div style={{ fontSize: 12, color: '#aaa' }}>Sponsored</div>
//           </div>
//         </div>

//         {/* Content */}
//         <div style={{ marginTop: 14 }}>
//           <div style={{
//             fontSize: 18,
//             fontWeight: 700,
//             color: adColor
//           }}>
//             {adTitle}
//           </div>

//           <div style={{ marginTop: 8, color: '#ccc', lineHeight: 1.5 }}>
//             {adDescription}
//           </div>

//           <div style={{
//             fontSize: 48,
//             textAlign: 'center',
//             margin: '16px 0'
//           }}>
//             {adImage}
//           </div>
//         </div>

//         {/* Fake social proof */}
//         <div style={{
//           fontSize: 13,
//           color: '#aaa',
//           marginBottom: 10
//         }}>
//           💬 “Made ₹1L in 2 weeks!” · “This is legit 🔥”
//         </div>

//         {/* CTA */}
//         <button
//           onClick={() => onInteract('cta_clicked')}
//           style={{
//             width: '100%',
//             padding: '10px',
//             background: adColor,
//             border: 'none',
//             borderRadius: 8,
//             fontWeight: 600,
//             cursor: 'pointer'
//           }}
//         >
//           {adCta}
//         </button>
//       </div>

//       {/* Warning overlay */}
//       <div className="vsim-warning-overlay">
//         <div className="vsim-warning-title">⚠ Red Flags</div>
//         <ul className="vsim-warning-list">
//           <li>Guaranteed 50% monthly returns</li>
//           <li>Unrealistic profits shown</li>
//           <li>Pressure to join quickly</li>
//           <li>No verifiable company details</li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// components/InvestmentAdEnv.jsx
import '../VisualSim.css'

export function InvestmentAdEnv({ envProps, onInteract }) {
  const {
    adTitle,
    adDescription,
    adCta,
    adImage,
    adColor = '#1FCC79',
  } = envProps

  return (
    <div className="vsim-root fade-in">

      <div className="vsim-scene-label">
        📱 Social Media — Investment Ad
      </div>

      <div
        className="tp-card-hover"
        style={{
          background: '#111',
          borderRadius: 14,
          padding: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          maxWidth: 420,
          margin: '0 auto'
        }}
      >

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            className="float"
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: adColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}
          >
            📊
          </div>

          <div>
            <div style={{ fontWeight: 600 }}>Elite Trading Group</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>
              Sponsored · Follow
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ marginTop: 16 }}>

          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${adColor}, #00ffa3)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {adTitle}
          </div>

          <div style={{ marginTop: 8, color: '#ccc', lineHeight: 1.5 }}>
            {adDescription}
          </div>

          <div
            className="float"
            style={{
              fontSize: 48,
              textAlign: 'center',
              margin: '18px 0'
            }}
          >
            {adImage}
          </div>
        </div>

        {/* Fake social proof */}
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 12 }}>
          💬 “Made ₹1L in 2 weeks!” · “This is legit 🔥”
        </div>

        {/* CTA */}
        <button
          onClick={() => onInteract('cta_clicked')}
          className="glow cta-pulse"
          style={{
            width: '100%',
            padding: '12px',
            background: `linear-gradient(135deg, ${adColor}, #00ffa3)`,
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {adCta}
        </button>
      </div>

      {/* Warning */}
      <div className="vsim-warning-overlay">
        <div className="vsim-warning-title">⚠ Red Flags</div>
        <ul className="vsim-warning-list">
          <li>Guaranteed 50% monthly returns</li>
          <li>Unrealistic profit claims</li>
          <li>Fake testimonials</li>
          <li>Urgency tactics</li>
        </ul>
      </div>
    </div>
  )
}