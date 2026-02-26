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
  borderRadius: '6px', background: '#0D1017',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#EDE8E0', fontSize: '15px', outline: 'none',
  fontFamily: "'DM Sans', system-ui, sans-serif",
}
const sel = { ...inp, cursor: 'pointer' }

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [focused, setFocused] = useState('')

  const fieldStyle = (name) => ({
    ...inp, borderColor: focused === name ? 'rgba(212,137,26,0.5)' : 'rgba(255,255,255,0.09)'
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0D1017', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '24px',
      fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      <div style={{ position: 'fixed', top: '-100px', right: '-200px', width: '600px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(212,137,26,0.05) 0%, transparent 65%)',
        pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1 }}>

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

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {[1,2].map(n => (
            <div key={n} style={{ height: '3px', flex: 1, borderRadius: '2px',
              background: step >= n ? '#D4891A' : 'rgba(255,255,255,0.08)',
              transition: 'background 0.3s' }} />
          ))}
        </div>

        <div style={{ background: '#131922', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px', padding: '36px', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>

          <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '28px', fontWeight: '400', color: '#EDE8E0',
            marginBottom: '6px', letterSpacing: '-0.02em' }}>
            {step === 1 ? 'Create account' : 'Your profile'}
          </h1>
          <p style={{ fontSize: '14px', color: '#58657A', marginBottom: '28px' }}>
            {step === 1 ? 'Join CyberRaksha — free, no credit card needed.' : 'Help us personalise your simulation experience.'}
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            onSubmit={e => { e.preventDefault(); if (step === 1) setStep(2) }}>

            {step === 1 ? (<>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>Full name</label>
                <input placeholder="Your name" style={fieldStyle('name')}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused('')}/>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>Email address</label>
                <input type="email" placeholder="you@example.com" style={fieldStyle('email')}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}/>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>Password</label>
                <input type="password" placeholder="Min. 8 characters" style={fieldStyle('pass')}
                  onFocus={() => setFocused('pass')} onBlur={() => setFocused('')}/>
              </div>
            </>) : (<>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>Age group</label>
                <select style={sel}>
                  <option value="">Select your age group</option>
                  <option value="student">Student</option>
                  <option value="adult">Working Adult</option>
                  <option value="elderly">Senior Citizen (60+)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9AA3B2', marginBottom: '6px' }}>Starting expertise level</label>
                <select style={sel}>
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner — I'm new to cyber safety</option>
                  <option value="intermediate">Intermediate — I know some basics</option>
                  <option value="advanced">Advanced — I'm fairly experienced</option>
                </select>
              </div>
              <div style={{ padding: '12px 14px', borderRadius: '6px',
                background: 'rgba(212,137,26,0.08)', border: '1px solid rgba(212,137,26,0.2)',
                fontSize: '13px', color: '#9AA3B2', lineHeight: '1.6' }}>
                <strong style={{ color: '#D4891A' }}>Why we ask:</strong> Your profile determines which scenarios are shown first and adjusts the difficulty of each simulation to your level.
              </div>
              <button type="button" onClick={() => setStep(1)}
                style={{ background: 'none', color: '#58657A', fontSize: '13px', textAlign: 'left', padding: '0' }}>
                ← Back
              </button>
            </>)}

            <button type="submit"
              style={{ marginTop: '4px', padding: '13px', borderRadius: '6px',
                background: '#D4891A', color: '#0D1017',
                fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                border: 'none', fontFamily: 'inherit', transition: 'background 0.2s' }}>
              {step === 1 ? 'Continue' : 'Create account'}
            </button>
          </form>

          <p style={{ marginTop: '22px', fontSize: '13.5px', color: '#58657A', textAlign: 'center' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: '#D4891A', fontWeight: '500' }}>Log in</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ fontSize: '13px', color: '#58657A' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
