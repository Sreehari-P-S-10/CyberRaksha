import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SimulationCategoryPage from './pages/SimulationCategoryPage.jsx'
import SimulationPlayerPage from './pages/SimulationPlayerPage.jsx'
import LearnPage from './pages/LearnPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected — require login */}
      <Route path="/dashboard"            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/category/:categoryId" element={<ProtectedRoute><SimulationCategoryPage /></ProtectedRoute>} />
      <Route path="/simulation/:simId"    element={<ProtectedRoute><SimulationPlayerPage /></ProtectedRoute>} />
      <Route path="/learn/:simId"         element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
      <Route path="/quiz/:simId"          element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
    </Routes>
  )
}
