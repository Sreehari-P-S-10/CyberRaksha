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
import { OfficialEmailEnv, AuthorityCallEnv, FakeGovPortalEnv } from './components/AuthorityImpersonationUI.jsx'
import { RelativeEmergencyCallEnv, FakeMedicalPortalEnv, UrgencyPressureEnv } from './components/SocialEngineeringUI.jsx'
import { InstagramFakeAdminEnv, WhatsappImpersonationEnv } from './components/StudentImpersonationUI.jsx'
import { LinkedInCloneEnv } from './components/ProfessionalImpersonationUI.jsx'
import { RansomwareDesktopEnv, RansomwareMobileEnv } from './components/RansomwareUI.jsx'
import { TrojanInstallerEnv } from './components/TrojanUI.jsx'
import { VirusFileManagerEnv, VirusEmailEnv } from './components/VirusUI.jsx'
import { AdwareBrowserEnv, AdwareMobileEnv } from './components/AdwareUI.jsx'

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

    /* ── Official-looking authority email ── */
    case 'officialEmail':
      return <OfficialEmailEnv envProps={envProps} onInteract={onInteract} />

    /* ── Incoming call from spoofed authority ── */
    case 'authorityCall':
      return <AuthorityCallEnv envProps={envProps} onInteract={onInteract} />

    /* ── Fake government/agency portal ── */
    case 'fakeGovPortal':
      return <FakeGovPortalEnv envProps={envProps} onInteract={onInteract} />

    /* ── WhatsApp call from impersonated relative ── */
    case 'relativeEmergencyCall':
      return <RelativeEmergencyCallEnv envProps={envProps} onInteract={onInteract} />

    /* ── Spoofed hospital / insurance billing portal ── */
    case 'fakeMedicalPortal':
      return <FakeMedicalPortalEnv envProps={envProps} onInteract={onInteract} />

    /* ── Multi-channel urgency pressure attack ── */
    case 'urgencyPressure':
      return <UrgencyPressureEnv envProps={envProps} onInteract={onInteract} />

    /* ── Fake college admin Instagram account ── */
    case 'instagramFakeAdmin':
      return <InstagramFakeAdminEnv envProps={envProps} onInteract={onInteract} />

    /* ── WhatsApp classmate impersonation ── */
    case 'whatsappImpersonation':
      return <WhatsappImpersonationEnv envProps={envProps} onInteract={onInteract} />

    /* ── LinkedIn profile clone ── */
    case 'linkedInClone':
      return <LinkedInCloneEnv envProps={envProps} onInteract={onInteract} />

    /* ── Ransomware: Windows desktop file encryption ── */
    case 'ransomwareDesktop':
      return <RansomwareDesktopEnv envProps={envProps} onInteract={onInteract} />

    /* ── Ransomware: Android screen-locker (elderly) ── */
    case 'ransomwareMobile':
      return <RansomwareMobileEnv envProps={envProps} onInteract={onInteract} />

    /* ── Trojan: fake download page + installer wizard ── */
    case 'trojanInstaller':
      return <TrojanInstallerEnv envProps={envProps} onInteract={onInteract} />

    /* ── Virus: USB autorun file manager spread ── */
    case 'virusFileManager':
      return <VirusFileManagerEnv envProps={envProps} onInteract={onInteract} />

    /* ── Virus: email attachment with macro payload ── */
    case 'virusEmail':
      return <VirusEmailEnv envProps={envProps} onInteract={onInteract} />

    /* ── Adware: browser PUP bundle + popup storm ── */
    case 'adwareBrowser':
      return <AdwareBrowserEnv envProps={envProps} onInteract={onInteract} />

    /* ── Adware: malicious mobile flashlight app ── */
    case 'adwareMobile':
      return <AdwareMobileEnv envProps={envProps} onInteract={onInteract} />

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
