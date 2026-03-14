/**
 * SimulationRenderer.jsx
 * ─────────────────────────────────────────────────────────────────
 * Pure routing layer. Receives a step + an onInteract callback.
 * Maps step.environment → the correct reusable UI component.
 * Contains zero simulation logic — that all lives in SimulationEngine.
 *
 * To add a new environment type:
 *   1. Build its component in components/
 *   2. Import it here
 *   3. Add one case to the switch below
 *   4. Define steps with that environment in simulationsData.js
 *
 * That's it. No other files need touching.
 * ─────────────────────────────────────────────────────────────────
 */

import { SocialAdEnv, FakeStoreEnv, CourierSiteEnv, GamingLoginEnv } from './components/FakeWebsiteUI.jsx'
import { PhoneMessages, SMSConversation } from './components/PhoneUI.jsx'
import { DiscordDMEnv, ColleagueScenarioEnv } from './components/ChatUI.jsx'
import { BrowserWithPopupEnv } from './components/PopupAlert.jsx'

/**
 * @param {object} step        — current step from simulationsData
 * @param {function} onInteract — called when user does something inside the env
 *                               The engine decides whether to show choices next
 */
export default function SimulationRenderer({ step, onInteract }) {
  const { environment, envProps = {} } = step

  switch (environment) {

    /* ── Social media ad ── */
    case 'socialAd':
      return <SocialAdEnv envProps={envProps} onInteract={onInteract} />

    /* ── Fake e-commerce product page ── */
    case 'fakeStore':
      return <FakeStoreEnv envProps={envProps} onInteract={onInteract} />

    /* ── Phone messages list with animated new SMS ── */
    case 'phoneMessages':
      return <PhoneMessages envProps={envProps} onInteract={onInteract} />

    /* ── SMS conversation view ── */
    case 'smsConversation':
      return <SMSConversation envProps={envProps} onInteract={onInteract} />

    /* ── Fake courier redelivery website ── */
    case 'courierSite':
      return <CourierSiteEnv envProps={envProps} onInteract={onInteract} />

    /* ── Browser page hijacked by fake security popup ── */
    case 'browserWithPopup':
      return <BrowserWithPopupEnv envProps={envProps} onInteract={onInteract} />

    /* ── Colleague scenario (text card, tech support step 2) ── */
    case 'colleagueScenario':
      return <ColleagueScenarioEnv envProps={envProps} onInteract={onInteract} />

    /* ── Discord DM with phishing link ── */
    case 'discordDM':
      return <DiscordDMEnv envProps={envProps} onInteract={onInteract} />

    /* ── Fake gaming login page ── */
    case 'gamingLoginPage':
      return <GamingLoginEnv envProps={envProps} onInteract={onInteract} />

    default:
      return (
        <div style={{
          padding: '20px', borderRadius: 8,
          background: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(255,255,255,0.1)',
          color: 'var(--text-3)', fontSize: 13, fontFamily: 'var(--mono)',
          textAlign: 'center',
        }}>
          Unknown environment type: <strong>"{environment}"</strong><br />
          Add it to SimulationRenderer.jsx → components/ → simulationsData.js
        </div>
      )
  }
}
