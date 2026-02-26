import { useState } from 'react'
import { Link } from 'react-router-dom'

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#D4891A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
    </svg>
  )
}

const inp = {
  display: 'block', width: '100%', padding: '11px 14px',
  borderRadius: '6px', background: '#131922',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#EDE8E0', fontSize: '15px', outline: 'none',
  fontFamily: 'var(--sans)', transition: 'border-color 0.2s',
}

export default function LoginPage() {
  const [focused, setFocused] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#0D1017', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '24px',
      fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Ambient */}
      <div style={{ position: 'fixed', top: 0, left: '-150px', width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(212,137,26,0.07) 0%, transparent 65%)',
        pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '9px',
          color: '#EDE8E0', fontSize: '17px', fontWeight: '400',
          textDecoration: 'none', marginBottom: '36px', justifyContent: 'center' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '7px',
            background: 'rgba(212,137,26,0.10)', border: '1px solid rgba(212,137,26,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldIcon />
          </div>
          <span>Cyber<strong>Raksha</strong></span>
        </Link>

        {/* Card */}
        <div style={{ background: '#131922', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px', padding: '36px', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>

          <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '28px', fontWeight: '400', color: '#EDE8E0',
            marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '14px', color: '#58657A', marginBottom: '28px' }}>
            Log in to your CyberRaksha account to continue training.
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            onSubmit={e => e.preventDefault()}>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>
                Email address
              </label>
              <input type="email" placeholder="you@example.com"
                style={{ ...inp, borderColor: focused === 'email' ? 'rgba(212,137,26,0.5)' : 'rgba(255,255,255,0.09)' }}
                onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>
                Password
              </label>
              <input type="password" placeholder="••••••••"
                style={{ ...inp, borderColor: focused === 'pass' ? 'rgba(212,137,26,0.5)' : 'rgba(255,255,255,0.09)' }}
                onFocus={() => setFocused('pass')} onBlur={() => setFocused('')} />
            </div>

            <button type="submit"
              style={{ marginTop: '6px', padding: '13px', borderRadius: '6px',
                background: '#D4891A', color: '#0D1017',
                fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                border: 'none', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'background 0.2s' }}>
              Log in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>

          <p style={{ marginTop: '22px', fontSize: '13.5px', color: '#58657A', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#D4891A', fontWeight: '500' }}>Create one free</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#2E3B52' }}>
          <Link to="/" style={{ color: '#58657A' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
