/**
 * utils/api.js
 * ─────────────────────────────────────────────────────────────────
 * Thin fetch wrapper that:
 *   • Reads the JWT from localStorage and attaches it as Bearer token
 *   • Handles 401/403 by clearing the stale session and redirecting to /login
 *   • Provides get / post / patch helpers
 *
 * VITE_API_URL is set to empty string in dev (Vite proxies /api → :5000).
 * In production set it to the deployed backend URL, e.g.
 *   VITE_API_URL=https://cyberraksha-api.onrender.com
 * ─────────────────────────────────────────────────────────────────
 */

const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

function getToken() {
  return localStorage.getItem('cr_token')
}

function clearSessionAndRedirect() {
  localStorage.removeItem('cr_token')
  localStorage.removeItem('cr_user')
  // Use hard navigation so the React state is fully reset
  window.location.replace('/login')
}

async function request(path, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  } catch (networkErr) {
    // Network error — backend unreachable
    throw new Error('Unable to reach the server. Please check your connection.')
  }

  // Token expired or invalid → force logout
  if (res.status === 401 || res.status === 403) {
    clearSessionAndRedirect()
    return null
  }

  return res
}

export const api = {
  get:   (path)        => request(path),
  post:  (path, body)  => request(path, { method: 'POST',  body: JSON.stringify(body) }),
  patch: (path, body)  => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  del:   (path)        => request(path, { method: 'DELETE' }),
}
