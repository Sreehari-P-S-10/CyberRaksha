/**
 * components/ProtectedRoute.jsx
 * ─────────────────────────────────────────────────────────────────
 * Wraps any route that requires authentication.
 * Unauthenticated users are redirected to /login with the original
 * location stored, so they land back where they tried to go after login.
 *
 * Usage in App.jsx:
 *   <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
 * ─────────────────────────────────────────────────────────────────
 */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()
  const location  = useLocation()

  if (!token) {
    // Pass the attempted URL so LoginPage can redirect back after success
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
