/**
 * hooks/useSimulation.js
 * ─────────────────────────────────────────────────────────────────
 * Single hook used by SimulationPlayerPage, SimulationEngine,
 * LearnPage, and QuizPage.
 *
 * STRATEGY — "metadata from DB, content from JS":
 *   1. Read the simulation entry from simulationsData.js (has steps/choices)
 *   2. Fetch fresh metadata from GET /api/simulations/:id (has title,
 *      category, difficulty, xp, type — always up to date from DB)
 *   3. Merge: spread the JS object first, then overwrite with API fields
 *      so steps/choices are untouched but metadata is always from DB
 *
 * Shape returned — identical to the old SIMULATIONS[simId] object:
 *   {
 *     title, category, difficulty, xp, type,   ← from DB (via API)
 *     steps, ...rest                            ← from simulationsData.js
 *   }
 *
 * If the API call fails (network error, 404), the hook falls back to
 * the JS object's metadata — the app still works, just with the
 * hardcoded values. This prevents crashes in dev or if the DB is empty.
 *
 * Usage:
 *   const { sim, loading, error } = useSimulation(simId)
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { SIMULATIONS } from '../simulations/simulationsData.js'
import { api } from '../utils/api.js'

export function useSimulation(simId) {
  // Start with the JS object so the page never flashes empty while
  // the API call is in flight — steps are available immediately.
  const jsEntry = simId ? SIMULATIONS[simId] ?? null : null

  const [sim,     setSim]     = useState(jsEntry)
  const [loading, setLoading] = useState(!!simId)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!simId || !jsEntry) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    api.get(`/simulations/${simId}`)
      .then(async (res) => {
        if (!res) return   // 401/403 — api.js handles redirect
        if (!res.ok) {
          // Non-fatal: fall back to JS metadata, log quietly
          const body = await res.json().catch(() => ({}))
          console.warn(`useSimulation: API ${res.status} for "${simId}" — using JS fallback.`, body.error)
          setSim(jsEntry)
          return
        }
        const apiMeta = await res.json()
        // Merge: JS content (steps, choices, envProps) + DB metadata
        // DB fields overwrite JS fields of the same name
        setSim({ ...jsEntry, ...apiMeta })
      })
      .catch((err) => {
        // Network error — fall back gracefully
        console.warn(`useSimulation: fetch failed for "${simId}" — using JS fallback.`, err.message)
        setSim(jsEntry)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [simId]) // eslint-disable-line react-hooks/exhaustive-deps

  return { sim, loading, error }
}
