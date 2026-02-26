import { Link } from 'react-router-dom'

// TODO: Full dashboard implementation with simulation listing, progress charts, quiz results
export default function DashboardPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', color:'var(--silver)' }}>
      <h1 style={{ color:'var(--white)', fontSize:'32px', marginBottom:'12px' }}>🛡️ Dashboard</h1>
      <p style={{ color:'var(--muted)', marginBottom:'24px' }}>Coming soon — simulation progress, points, and quiz results will appear here.</p>
      <Link to="/" style={{ color:'var(--cyan)' }}>← Back to Home</Link>
    </div>
  )
}
