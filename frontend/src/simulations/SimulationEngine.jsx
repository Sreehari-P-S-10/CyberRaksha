/**
 * SimulationEngine.jsx
 * ─────────────────────────────────────────────────────────────────
 * Orchestrates ALL simulations — both 'text' and 'visual' types.
 *
 * Responsibilities:
 *  - Load sim config from simulationsData by simId
 *  - Track current step index
 *  - Track chosen choice per step, consequences, decisions history
 *  - For visual sims: show environment first, then choices on interaction
 *  - For text sims: show situation + choices directly (no environment)
 *  - Handle terminalState (early end)
 *  - Call onComplete(decisions[]) when sim finishes
 *
 * Props:
 *   simId        {string}   — key in SIMULATIONS map
 *   onComplete   {function} — called with decisions[] when done
 *   onBack       {function} — called when user exits mid-sim
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'
import { useSimulation } from '../hooks/useSimulation.js'
import SimulationRenderer from './SimulationRenderer.jsx'
import './VisualSim.css'

/* ── choice panel shared by both engines ── */
function ChoicePanel({ choices, chosenId, onChoose }) {
  return (
    <div className="vsim-choice-panel">
      <div className="vsim-choice-heading">What do you do?</div>
      {choices.map(c => {
        const state = chosenId
          ? (c.id === chosenId ? (c.isCorrect ? 'correct' : 'wrong') : 'faded')
          : ''
        return (
          <button
            key={c.id}
            className={`vsim-choice-btn ${state}`}
            onClick={() => !chosenId && onChoose(c.id)}
            disabled={!!chosenId}
          >
            <span className="vsim-choice-letter">{c.id.toUpperCase()}</span>
            <span className="vsim-choice-text">{c.text}</span>
            {chosenId && c.id === chosenId && (
              <span className="vsim-choice-mark">{c.isCorrect ? '✓' : '✗'}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ── consequence + tip block ── */
function OutcomeBlock({ choice, onContinue, isTerminal, isLastStep }) {
  const ref = useRef(null)
  useEffect(() => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
  }, [])

  return (
    <div ref={ref} style={{ animation: 'vsim-slide-up 0.35s ease', marginTop: 12 }}>
      <div className={`vsim-outcome ${choice.isCorrect ? 'ok' : 'bad'}`}>
        <div className="vsim-outcome-icon">{choice.isCorrect ? '✓' : '✗'}</div>
        <div className="vsim-outcome-text">{choice.consequence}</div>
      </div>
      {choice.tip && (
        <div className="vsim-tip">
          <span className="vsim-tip-icon">💡</span>
          <span>{choice.tip}</span>
        </div>
      )}
      {!isTerminal && (
        <button className="vsim-continue-btn" onClick={onContinue}>
          {isLastStep ? 'See results →' : 'Continue →'}
        </button>
      )}
      {isTerminal && (
        <button className="vsim-continue-btn" onClick={onContinue}>
          See what you learned →
        </button>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN ENGINE
══════════════════════════════════════════════════════════ */
export default function SimulationEngine({ simId, onComplete, onBack }) {
  // sim.steps/choices come from simulationsData.js (JS stays as engine content).
  // sim.title/category/difficulty/xp/type are overwritten with live DB values via API.
  const { sim } = useSimulation(simId)

  const [stepIndex, setStepIndex]           = useState(0)
  const [chosenId, setChosenId]             = useState(null)
  const [showChoices, setShowChoices]       = useState(false) // visual: choices appear after interaction
  const [decisions, setDecisions]           = useState([])

  // For visual sims the environment renders first; choices appear after user interacts
  const isVisual = sim?.type === 'visual'
  const currentStep = sim?.steps[stepIndex]

  // Text sims show choices immediately; visual sims wait for onInteract
  useEffect(() => {
    setChosenId(null)
    // Show choices immediately if: text sim, OR visual step with no environment (mixed step)
    const stepHasEnv = !!currentStep?.environment
    setShowChoices(!isVisual || !stepHasEnv)
  }, [stepIndex, isVisual])

  if (!sim) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
        Simulation "{simId}" not found in simulationsData.js
      </div>
    )
  }

  /* Called by SimulationRenderer when the environment fires an event.
     If eventType matches a choice id exactly (e.g. closed_tab, scam_complete),
     auto-select that choice — the environment made the decision for the user.
     Otherwise reveal the choice panel for the user to pick. */
  function handleEnvironmentInteract(eventType) {
    const matchingChoice = currentStep?.choices?.find(c => c.id === eventType)
    if (matchingChoice) {
      handleChoose(eventType)
    } else {
      setShowChoices(true)
    }
  }

  /* Called when user picks a choice */
  function handleChoose(id) {
    const choice = currentStep.choices.find(c => c.id === id)
    setChosenId(id)
    // Record decision for summary screen
    setDecisions(prev => [...prev, {
      stepId: currentStep.id,
      situation: currentStep.situation || `Step ${currentStep.id}`,
      choiceText: choice.text,
      isCorrect: choice.isCorrect,
      consequence: choice.consequence,
      tip: choice.tip,
    }])
  }

  /* Called after outcome is shown — advance or finish */
  function handleContinue() {
    const choice = currentStep.choices.find(c => c.id === chosenId)
    const isTerminal = choice?.terminalState
    const isLastStep = stepIndex >= sim.steps.length - 1

    if (isTerminal || isLastStep) {
      // decisions already has this step recorded from handleChoose — pass as-is
      onComplete(decisions)
    } else {
      setStepIndex(i => i + 1)
    }
  }

  const chosenChoice = chosenId ? currentStep.choices.find(c => c.id === chosenId) : null
  const isLastStep   = stepIndex >= sim.steps.length - 1

  return (
    <div className="vsim-engine-root">

      {/* Step progress dots */}
      <div className="vsim-progress-row">
        {sim.steps.map((_, i) => (
          <div
            key={i}
            className={`vsim-progress-dot ${
              i < stepIndex ? 'done' : i === stepIndex ? 'active' : ''
            }`}
          />
        ))}
        <span className="vsim-progress-label">
          Step {stepIndex + 1} of {sim.steps.length}
        </span>
      </div>

      {/* Situation text — shown when step has no environment (text sims + mixed visual steps) */}
      {currentStep.situation && !currentStep.environment && (
        <div className="vsim-situation">
          {currentStep.situation.split('\n').map((line, i) =>
            line ? <p key={i}>{line}</p> : <br key={i} />
          )}
        </div>
      )}

      {/* Environment renderer — only when step defines an environment */}
      {currentStep.environment && (
        <SimulationRenderer
          step={currentStep}
          onInteract={handleEnvironmentInteract}
        />
      )}

      {/* Choice panel — always shown for text, shown after interaction for visual */}
      {showChoices && !chosenId && (
        <ChoicePanel
          choices={currentStep.choices}
          chosenId={chosenId}
          onChoose={handleChoose}
        />
      )}

      {/* Outcome + tip after choosing */}
      {chosenChoice && (
        <OutcomeBlock
          choice={chosenChoice}
          onContinue={handleContinue}
          isTerminal={!!chosenChoice.terminalState}
          isLastStep={isLastStep}
        />
      )}
    </div>
  )
}