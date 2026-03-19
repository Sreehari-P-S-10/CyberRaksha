/**
 * context/AuthContext.jsx
 * ─────────────────────────────────────────────────────────────────
 * Global auth state: token + user object.
 * Persisted in localStorage so sessions survive page refresh.
 *
 * Usage anywhere in the app:
 *   const { user, token, login, logout, refreshUser } = useAuth()
 * ─────────────────────────────────────────────────────────────────
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { api } from '../utils/api.js'

const AuthContext = createContext(null)

/* ── helpers ── */
function readStored(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

/* ══════════════════════════════════════════════════════════
   PROVIDER
══════════════════════════════════════════════════════════ */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cr_token') || null)
  const [user,  setUser]  = useState(() => readStored('cr_user'))

  /* Called after successful login or register */
  function login(tokenVal, userData) {
    localStorage.setItem('cr_token', tokenVal)
    localStorage.setItem('cr_user',  JSON.stringify(userData))
    setToken(tokenVal)
    setUser(userData)
  }

  /* Clear session */
  function logout() {
    localStorage.removeItem('cr_token')
    localStorage.removeItem('cr_user')
    setToken(null)
    setUser(null)
  }

  /* Re-fetch latest user data from the API (call after XP changes etc.) */
  const refreshUser = useCallback(async () => {
    if (!token) return
    try {
      const res = await api.get('/users/me')
      if (res?.ok) {
        const fresh = await res.json()
        setUser(fresh)
        localStorage.setItem('cr_user', JSON.stringify(fresh))
      }
    } catch {
      /* silently ignore — stale cache is acceptable */
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

/* ── Hook ── */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
