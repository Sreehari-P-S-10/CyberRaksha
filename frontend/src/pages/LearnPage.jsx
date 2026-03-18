/**
 * LearnPage.jsx
 * ─────────────────────────────────────────────────────────────────
 * Learn page for a simulation module.
 * Currently scoped to ii-p-1 (LinkedIn Profile Cloning).
 * Designed to be accessed after completing the simulation.
 *
 * Route: /learn/:simId
 * ─────────────────────────────────────────────────────────────────
 */

import { useParams, useNavigate, Link } from 'react-router-dom'
import s from './LearnPage.module.css'
import { SIMULATIONS, CATEGORY_ROUTE_MAP, DIFF_COLORS } from '../simulations/simulationsData.js'

/* ─── SVG Icons ─── */
const paths = {
  shield:     <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  arrowLeft:  <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  zap:        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  alert:      <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  check:      <><polyline points="20 6 9 17 4 12"/></>,
  link:       <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  bookOpen:   <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  user:       <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
}

function Icon({ name, size = 18, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ─── Learn content keyed by simId ─── */
const LEARN_CONTENT = {

  'ii-s-1': {
    readTime: '4 min read',
    howItWorks: [
      `Attackers create fake Instagram accounts that mimic official college pages — copying the institution's name, logo, and branding. They run paid sponsored posts targeting students with urgent scholarship or admission alerts, making the post appear legitimate in feeds.`,
      `The fake account directs students to a link in bio leading to a third-party form that harvests personal details — name, student ID, phone number, Aadhaar number, and bank account details under the guise of "scholarship disbursement." This data is then sold or used for targeted fraud.`,
      `The key deception is that Instagram allows anyone to create an account with any name. A real university account will have a blue verified tick, tens of thousands of followers, and years of post history. A fake one created last week will have none of these.`,
    ],
    redFlags: [
      'No blue verified tick — official institutional accounts are verified',
      'Very low follower count (hundreds instead of thousands)',
      'Account created recently — visible from post history',
      'Link leads to a third-party domain, not the college\'s official website',
      'Scholarship application asks for Aadhaar number or bank details',
      'Sponsored post — scammers pay to reach students through ads',
      'Deadline pressure — "apply by Friday" to rush you into acting fast',
    ],
    whatToDo: [
      { step: 'Search for the real official account', detail: 'Look for the blue verified tick, high follower count, and years of post history. The real account\'s URL in bio will match the official college website domain.' },
      { step: 'Report the fake account', detail: 'Tap the three dots (···) on the profile → Report → Pretending to be someone else → A business or organisation. Instagram removes impersonation accounts quickly.' },
      { step: 'Warn your batch group', detail: 'Post a warning in your college WhatsApp or Telegram group immediately — other students may be about to submit their details.' },
      { step: 'If you already submitted details', detail: 'Lock your Aadhaar biometrics immediately at uidai.gov.in or the mAadhaar app. Call your bank to enable transaction alerts. File a report at cybercrime.gov.in.' },
      { step: 'Verify scholarships through official channels only', detail: 'All legitimate scholarship applications go through the college\'s official website, the National Scholarship Portal (scholarships.gov.in), or in-person at the admissions office.' },
    ],
    tools: [
      { name: 'scholarships.gov.in — Official NSP', desc: 'National Scholarship Portal — verify all scholarship schemes', url: 'https://scholarships.gov.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'National Cybercrime Reporting Portal', url: 'https://cybercrime.gov.in' },
      { name: 'uidai.gov.in — Lock Aadhaar biometrics', desc: 'Lock your Aadhaar to prevent misuse after data exposure', url: 'https://myaadhaar.uidai.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call to report cybercrime and get immediate guidance', url: 'tel:1930' },
    ],
  },

  'ii-s-2': {
    readTime: '4 min read',
    howItWorks: [
      `An attacker scrapes a target's name and profile photo from public social media — Instagram, Facebook, or a college directory — and creates a new WhatsApp account using a different SIM. They then contact the target's friends and family posing as that person.`,
      `The message follows a predictable script: "New number, lost my old phone, please don't call the old one." This single instruction is the entire scam's foundation — it prevents you from verifying through the one channel that would expose the fraud immediately.`,
      `An emergency situation follows — stuck at the airport, in an accident, in legal trouble — with a request to transfer money to a UPI ID. The emotional urgency is designed to override rational thinking. By the time you realise, the money is gone.`,
    ],
    redFlags: [
      '"New number" combined with an emergency and a money request — this combination is always suspicious',
      'Instruction not to call the saved number — this is specifically designed to prevent verification',
      'Request to transfer money to a UPI ID you don\'t recognise',
      'Emotional urgency — "please help immediately," "I\'ll explain later"',
      'Can\'t answer personal questions correctly — any hesitation is a red flag',
      'Profile photo matches but the writing style feels slightly different',
    ],
    whatToDo: [
      { step: 'Call the saved number immediately', detail: 'Ignore the instruction not to call. A genuine friend in an emergency will always want you to verify it\'s them. Only a scammer insists you can\'t call the original number.' },
      { step: 'Ask a verification question', detail: 'Ask something only the real person would know — a shared memory, a nickname, a specific detail from your friendship. A scammer using a scraped profile has no access to these.' },
      { step: 'Never transfer money to an unfamiliar UPI ID', detail: 'Even if you believe it\'s your friend, call their original number to confirm the UPI ID before sending anything.' },
      { step: 'Report the number to WhatsApp', detail: 'Open the chat → tap the name → Report. WhatsApp investigates impersonation accounts.' },
      { step: 'Advise your friend to lock their accounts', detail: 'Tell the real person their identity is being misused. They should tighten Instagram/Facebook privacy and remove their phone number from public bios.' },
    ],
    tools: [
      { name: 'WhatsApp — Report Impersonation', desc: 'How to report a fake WhatsApp account', url: 'https://faq.whatsapp.com/1324198644914732' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report identity theft and social media fraud', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance on cybercrime including impersonation', url: 'tel:1930' },
    ],
  },

  'ii-s-3': {
    readTime: '6 min read',
    howItWorks: [
      `Aadhaar identity theft begins with data exposure — a photo shared in a WhatsApp group, a photocopy left at a shop, or a form submitted to an untrusted website. Once an attacker has your Aadhaar number and a photo, they can misuse it for SIM registrations, bank account openings, and loan applications.`,
      `The most common immediate misuse is SIM swap fraud — registering a new SIM in your name, then using it to receive OTPs for your bank accounts. Another vector is fraudulent loan applications, where your Aadhaar and PAN are used to apply for personal loans that damage your CIBIL score and create legal liability.`,
      `Attackers also run vishing campaigns — they call you claiming your Aadhaar has been misused, create panic, and then ask for your OTP to "lock" it. The OTP they're asking for is actually for a new account they're opening in your name at that very moment.`,
    ],
    redFlags: [
      'SMS about Aadhaar authentication you did not initiate — check at myaadhaar.uidai.gov.in immediately',
      'Unknown calls claiming to be from UIDAI, TRAI, or police about Aadhaar misuse',
      'Any caller asking for your Aadhaar OTP — UIDAI never calls and asks for OTPs',
      'New SIM activation SMS from your telecom provider that you didn\'t request',
      'Loan approval SMS for a loan you never applied for',
      'Bank transaction alerts from accounts you don\'t recognise',
    ],
    whatToDo: [
      { step: 'Lock Aadhaar biometrics immediately', detail: 'Go to myaadhaar.uidai.gov.in or the mAadhaar app → Lock/Unlock Biometrics. This prevents anyone from using your Aadhaar for new SIM or bank account verification.' },
      { step: 'Check authentication history', detail: 'At myaadhaar.uidai.gov.in → Aadhaar Authentication History — this shows every time your Aadhaar was used. Any entry you don\'t recognise is evidence of misuse.' },
      { step: 'File a complaint on cybercrime.gov.in', detail: 'Use the authentication timestamp from UIDAI as evidence. Note the date, time, and the authentication agency listed.' },
      { step: 'Report fraudulent SIM to TRAI', detail: 'Go to sancharsaathi.gov.in → Report Suspected Fraud Communication. TRAI will trace and block the fraudulent SIM.' },
      { step: 'For fraudulent loans — act immediately', detail: 'Visit the bank with your cybercrime reference number and submit a written fraud declaration. File a CIBIL dispute at cibil.com to place a fraud alert on your credit report.' },
    ],
    tools: [
      { name: 'myaadhaar.uidai.gov.in — Lock Biometrics', desc: 'Lock your Aadhaar and check authentication history', url: 'https://myaadhaar.uidai.gov.in' },
      { name: 'sancharsaathi.gov.in — Report Fraud SIM', desc: 'TRAI portal to report and block fraudulent SIM registrations', url: 'https://sancharsaathi.gov.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'National Cybercrime Reporting Portal', url: 'https://cybercrime.gov.in' },
      { name: 'cibil.com — File a CIBIL dispute', desc: 'Dispute fraudulent loan entries on your credit report', url: 'https://www.cibil.com' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call immediately if you suspect active Aadhaar misuse', url: 'tel:1930' },
    ],
  },

  'ii-p-1': {
    readTime: '5 min read',
    howItWorks: [
      `An attacker finds your public LinkedIn profile and copies everything — your name, photo, job title, company, and headline — creating a near-identical fake account. The only difference is the profile URL, which must be unique on LinkedIn. They might use "priya-sharma-infosys-engineer" instead of your real "priya-sharma-infosys" — a difference most people never notice.`,
      `The clone then sends connection requests to your existing contacts. Because the request appears to come from a trusted colleague or you yourself, people accept without checking the URL carefully. Once connected, the attacker messages them posing as you — requesting personal emails, project details, employee IDs, or even money for a fabricated emergency.`,
      `This attack exploits professional trust. Your connections expect messages from you to be legitimate, and that expectation is exactly what the attacker weaponises. The attack requires no technical skill — just a copy-paste of your public profile.`,
    ],
    redFlags: [
      'Profile URL is slightly different from the real person\'s — an extra word, a hyphen, or a number added',
      'Account has very few connections (under 10) despite claiming a senior role',
      'Account joined recently — check the post history and join date',
      'No experience, education, or posts listed — profile looks unusually sparse',
      'Requests for sensitive information (employee IDs, project details, passwords) sent via DM',
      'Urgency or emotional pressure in messages — "I need this now," "don\'t tell anyone"',
    ],
    whatToDo: [
      { step: 'Report the clone immediately', detail: 'Go to the fake profile → three-dot menu (···) → Report → Pretending to be someone else → Me. LinkedIn acts within 24–48 hours.' },
      { step: 'Post a public warning', detail: 'Write a brief post on your real profile: "A cloned account is impersonating me. My real profile URL is [your URL]. Do not share information with any other account claiming to be me."' },
      { step: 'Message affected contacts directly', detail: 'Reach out personally to connections who may have accepted the clone\'s request or received messages from it.' },
      { step: 'Set your connections list to private', detail: 'Go to Settings → Visibility → Who can see your connections → Only you. This prevents future clones from knowing who to target.' },
      { step: 'Remove personal contact details from your profile', detail: 'Phone numbers and personal email addresses in your bio give attackers ready-made targets. Keep only your professional email if needed.' },
      { step: 'Enable two-factor authentication', detail: 'Protects your real account from being hijacked directly. Settings → Sign In & Security → Two-step verification.' },
    ],
    tools: [
      {
        name: 'LinkedIn Help — Report Impersonation',
        desc: 'Official guide to reporting a profile cloning your identity',
        url: 'https://www.linkedin.com/help/linkedin/answer/a1340567',
      },
      {
        name: 'cybercrime.gov.in — File a complaint',
        desc: 'National Cybercrime Reporting Portal — report identity theft',
        url: 'https://cybercrime.gov.in',
      },
      {
        name: '1930 — National Cybercrime Helpline',
        desc: 'Call to report cybercrime including identity fraud',
        url: 'tel:1930',
      },
      {
        name: 'cert-in.org.in — Report to CERT-In',
        desc: 'Indian Computer Emergency Response Team — cyber incident reporting',
        url: 'https://www.cert-in.org.in',
      },
    ],
  },

  'ii-p-3': {
    readTime: '5 min read',
    howItWorks: [
      `AI voice cloning tools can now replicate a person's voice with as little as 30 seconds of audio — freely available from a YouTube video, a podcast, or a public speech. An attacker records a target's voice, feeds it into a cloning tool, and can then generate any spoken words in that voice.`,
      `In professional contexts, the most dangerous version is CEO or manager impersonation. The attacker calls an employee from a spoofed number — making the caller ID match the real person — and uses the cloned voice to request an urgent financial transfer, confidential data, or access credentials. The combination of a matching number and a convincing voice bypasses almost all instinctive suspicion.`,
      `The attack exploits two signals simultaneously: the visual trust of a correct caller ID, and the emotional trust of a familiar voice. The urgency built into the request ("don't tell anyone yet," "I need this in 10 minutes") is designed to prevent the one thing that would stop it — a verification call through a separate channel.`,
    ],
    redFlags: [
      'Any request for money, credentials, or sensitive data made over phone — even from a known number',
      '"Don\'t tell anyone about this yet" — isolation from oversight is a major red flag',
      'Extreme urgency — "this needs to happen in the next 10 minutes"',
      'Request to bypass normal approval or verification processes',
      'The caller discourages you from calling back on a different number to confirm',
      'Slight audio artifacting, unnatural pauses, or robotic cadence in the voice',
    ],
    whatToDo: [
      { step: 'Always verify through a second channel', detail: 'Call back on a known number (not the one that just called), send an internal message, or walk to the person\'s desk. This one step defeats 100% of voice cloning attacks.' },
      { step: 'Establish a company code word', detail: 'Work with your team to create a verbal passphrase for unexpected urgent requests. The real person will know it; an AI clone will not.' },
      { step: 'Never process unplanned transfers without dual authorisation', detail: 'All financial transfers above a set threshold should require sign-off from two people — a policy that must be immune to override by a single phone call.' },
      { step: 'Ask the caller to send a video message', detail: 'AI voice cloning is common; real-time AI video is far harder. "Can you send me a quick video on Teams confirming this?" will stump a voice-only attacker.' },
      { step: 'Report to IT security immediately', detail: 'Even if you verified and avoided the scam, IT security needs to know. They can alert the organisation and investigate the number spoofing.' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report AI voice fraud and financial cybercrime', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance on financial cyber fraud', url: 'tel:1930' },
      { name: 'cert-in.org.in — Report to CERT-In', desc: 'Report AI-based cyber attacks', url: 'https://www.cert-in.org.in' },
    ],
  },

  'ii-authority-1': {
    readTime: '5 min read',
    howItWorks: [
      `Authority impersonation scams exploit fear of institutions — the Income Tax Department, TRAI, police, or courts. The attack typically starts with a threatening email claiming you owe a fine or face legal action, followed by a phone call from someone posing as an officer, and finally a fake government portal designed to collect payment.`,
      `Each channel reinforces the others. The email makes the call feel expected. The call directs you to the "official" website. The website has government-like branding and a countdown timer. By the time you reach the payment page, three apparently legitimate touchpoints have overwhelmed your scepticism.`,
      `The key fact is that real government agencies never operate this way. Income Tax notices arrive by registered post and through the official IT portal. TRAI does not call individuals. No legitimate government fine requires same-day UPI payment to avoid arrest.`,
    ],
    redFlags: [
      'Government contact via email or WhatsApp instead of registered post',
      'Threats of immediate arrest or account freeze unless payment is made within hours',
      'Email domain does not end exactly in .gov.in — all legitimate Indian government emails do',
      'Caller asks you to stay on the line and not contact anyone else',
      'Payment demanded via UPI, gift cards, or cryptocurrency',
      'Website URL does not match the official .gov.in domain exactly',
      'Countdown timer on the payment page',
    ],
    whatToDo: [
      { step: 'Check the email domain', detail: 'Every legitimate Indian government email ends in .gov.in. Any other domain is fraudulent, regardless of how official the content looks.' },
      { step: 'Hang up and call the official number', detail: 'Income Tax: 1800-103-0025. TRAI: 1800-110-420. Police: 100. Use numbers from the official .gov.in website only.' },
      { step: 'Verify government notices independently', detail: 'Income Tax notices can be verified at incometax.gov.in. No legitimate notice requires immediate payment over phone or through an unfamiliar website.' },
      { step: 'Inspect URLs before clicking', detail: 'A real government portal will always be on a .gov.in domain. Any lookalike domain is a phishing site.' },
      { step: 'Report the attempt', detail: 'Forward spoofed government emails to incident@cert-in.org.in. File a complaint at cybercrime.gov.in. Report the calling number at sancharsaathi.gov.in.' },
    ],
    tools: [
      { name: 'incometax.gov.in — Verify IT notices', desc: 'Check genuine Income Tax notices and demands', url: 'https://www.incometax.gov.in' },
      { name: 'sancharsaathi.gov.in — Report fraud calls', desc: 'TRAI portal to report fraudulent authority impersonation calls', url: 'https://sancharsaathi.gov.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'National Cybercrime Reporting Portal', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call to report authority impersonation scams', url: 'tel:1930' },
    ],
  },

  'ii-relative-emergency-1': {
    readTime: '4 min read',
    howItWorks: [
      `Relative emergency scams target elderly users by exploiting parental fear. The attacker contacts the victim via WhatsApp from an unknown number, claiming to be a son, daughter, or grandchild in an emergency — arrested, in an accident, or stranded. The name and relationship are often obtained from public social media profiles.`,
      `The defining feature is the instruction: "Don't call my real number — the police have it" or "I lost my phone, this is a friend's number." This single instruction is the entire scam's architecture — it is specifically designed to prevent the one action that would immediately reveal the fraud.`,
      `Emotional manipulation is intense. The caller may sound distressed, claim they are in danger, and ask you not to tell other family members. The urgency and secrecy are designed to trigger a protective parental response that overrides rational verification.`,
    ],
    redFlags: [
      'Contact from an unknown number claiming to be a family member',
      '"Don\'t call my real number" — this instruction is always a red flag, no exceptions',
      'Request for urgent money transfer to an unfamiliar UPI ID',
      '"Don\'t tell anyone else in the family" — enforced secrecy is a manipulation tactic',
      'The "relative" cannot correctly answer personal questions',
      'Extreme urgency — "I need the money in the next 30 minutes"',
    ],
    whatToDo: [
      { step: 'Call the family member\'s saved number immediately', detail: 'Ignore any instruction not to call. A genuine emergency will not be made worse by a 30-second verification call. Only a scammer needs you to skip this step.' },
      { step: 'Ask a personal verification question', detail: 'Ask something only the real family member would know — a childhood memory, a family nickname, what you had for dinner last week. A scammer cannot answer these.' },
      { step: 'Contact another family member', detail: 'Call a sibling, spouse, or another relative to check if they know where the person is. This breaks the scammer\'s isolation tactic.' },
      { step: 'Never transfer money under emotional pressure', detail: 'Any financial decision demanded within "30 minutes" is almost certainly a scam. UPI transfers cannot be reversed once sent.' },
      { step: 'Warn neighbours and friends', detail: 'These scams target entire communities. A quick warning prevents others from being victimised.' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report relative emergency scam calls and UPI fraud', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance — call if you\'ve been targeted', url: 'tel:1930' },
      { name: 'WhatsApp — Report a contact', desc: 'How to report a fraudulent WhatsApp account', url: 'https://faq.whatsapp.com/1324198644914732' },
    ],
  },

  'ii-fake-medical-1': {
    readTime: '4 min read',
    howItWorks: [
      `Fake medical billing scams spoof well-known hospitals and health insurance companies. The victim receives an SMS or email claiming an outstanding bill must be paid urgently or a scheduled procedure will be cancelled. A link leads to a convincing but fraudulent billing portal.`,
      `The attack is effective because medical urgency creates genuine fear. The threat of a cancelled procedure triggers immediate action. A countdown timer and threatening language ("your treatment is at risk") are designed to prevent you from pausing to verify.`,
      `Payment is collected via UPI IDs sent in the message — a practice no real hospital follows. Real hospitals collect payment at their billing counter, through their official app, or through verified gateways on their own domain.`,
    ],
    redFlags: [
      'Billing portal URL does not exactly match the hospital\'s official domain',
      'Payment requested via a UPI ID sent in an SMS or email',
      'Countdown timer demanding payment within hours to avoid cancellation',
      'Communication from a domain that doesn\'t match the hospital\'s official website',
      'Insurance renewal SMS with a link to an unknown third-party domain',
      'No reference to your actual patient ID or policy number',
    ],
    whatToDo: [
      { step: 'Inspect the URL before doing anything', detail: 'Any billing page not on the hospital\'s exact verified domain is fake. "apollohospitals.com" is real — "apollo-billing-portal.in" is not.' },
      { step: 'Call the hospital directly', detail: 'Use the number on your original appointment letter or the hospital\'s official website. The billing department can confirm any outstanding amount in minutes.' },
      { step: 'Never pay via UPI IDs in SMS or email', detail: 'Any UPI ID sent via SMS for a medical payment is fraudulent. Report it immediately.' },
      { step: 'For insurance renewals', detail: 'Always renew through your insurer\'s official app or website — never through links in SMS messages.' },
      { step: 'Report the fraudulent domain', detail: 'File at cybercrime.gov.in and forward the SMS to 1909 (TRAI DND registry for SMS fraud).' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report fake medical billing portals and health insurance fraud', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance on medical fraud', url: 'tel:1930' },
      { name: 'IRDAI Consumer Helpline — 155255', desc: 'Insurance Regulatory Authority helpline for insurance fraud', url: 'tel:155255' },
    ],
  },

  /* ── ONLINE COMMERCE SAFETY ─────────────────────────── */

  'oc-e-1': {
    readTime: '4 min read',
    howItWorks: [
      `Fake online pharmacies exploit the price sensitivity of medicine buyers. They appear at the top of search results through paid advertising, offer medicines at 50–70% discounts, and prominently advertise "no prescription required" — which is illegal in India but functions as a lure for those who cannot easily obtain prescriptions.`,
      `The real danger is twofold: first, the medicines either never arrive, or they are counterfeit — unregulated tablets with no verified dosage, batch number, or expiry date. Second, the extensive data collected during checkout (Aadhaar number, medical history, address) is sold to data brokers who enable targeted health fraud, insurance scams, and identity theft.`,
      `These sites look professional because professional-looking templates are cheap. A polished design, a HTTPS padlock, and even fake reviews cost almost nothing to create. The only reliable trust signals are regulatory registration with the Central Drugs Standard Control Organisation (CDSCO) and the legal requirement for a prescription.`,
    ],
    redFlags: [
      '"No prescription required" for regulated medicines — this is illegal in India and an immediate red flag',
      'Website not listed on cdsco.gov.in or the State Drugs Licensing Authority portal',
      'Price more than 30–40% cheaper than established pharmacies — extreme discounts signal counterfeit product',
      'Asking for Aadhaar number or medical history at checkout — no pharmacy needs this data to ship medicine',
      'No licensed pharmacist name or registration number displayed on the site',
      'Delivery promised within 24 hours regardless of location — logistically implausible for regulated medicines',
      'No returns or grievance redressal policy — a regulatory requirement for legitimate pharmacies',
    ],
    whatToDo: [
      { step: 'Verify pharmacy registration before ordering', detail: 'Check cdsco.gov.in and your State Drugs Licensing Authority website. A legitimate online pharmacy will be listed. If you cannot find the registration, do not order.' },
      { step: 'Look for a licensed pharmacist', detail: 'A legitimate online pharmacy must display the name and registration number of a licensed pharmacist. This is a legal requirement. If it is absent, leave the site.' },
      { step: 'Only order with a valid prescription for Rx drugs', detail: 'Any site that allows purchase of prescription medicines without a prescription is operating illegally. This makes their entire supply chain unregulated.' },
      { step: 'Use established, regulated platforms', detail: 'Platforms like Netmeds, PharmEasy, and 1mg are registered and regulated. Verify even these by checking their registration details and pharmacist credentials.' },
      { step: 'If you shared sensitive data — act immediately', detail: 'If you shared your Aadhaar number: lock biometrics at myaadhaar.uidai.gov.in. If you shared bank details: call your bank immediately. File a complaint at cybercrime.gov.in.' },
    ],
    tools: [
      { name: 'cdsco.gov.in — Verify pharmacy registration', desc: 'Central Drugs Standard Control Organisation — check if an online pharmacy is registered', url: 'https://cdsco.gov.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report fake online pharmacies and health data theft', url: 'https://cybercrime.gov.in' },
      { name: 'myaadhaar.uidai.gov.in — Lock Aadhaar biometrics', desc: 'Lock your Aadhaar immediately if you shared your number with an unverified site', url: 'https://myaadhaar.uidai.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call immediately if you have suffered financial loss', url: 'tel:1930' },
    ],
  },

  'oc-ecommerce-1': {
    readTime: '5 min read',
    howItWorks: [
      `Fake e-commerce scams use social media advertising to place fraudulent stores in front of exactly the right audience. A sponsored ad for "Nike at 90% off" targets users who follow shoe brands, engage with fashion content, or recently searched for similar products. The targeting is precise because Meta and Google allow advertisers to use behavioural data — and scammers exploit this the same way legitimate brands do.`,
      `The fake store is designed to manufacture urgency at every step: a countdown timer shows "sale ends in 2:47:12," the stock counter reads "only 2 pairs left," and comment sections are seeded with purchased bot accounts posting five-star testimonials. None of these signals are authentic — the timer resets for every new visitor, the stock counter is a hardcoded number, and the accounts were purchased on bulk-bot marketplaces.`,
      `The scam ends in one of two ways: you pay and receive nothing, or you receive a low-quality counterfeit. Either way, your card details are now compromised. The payment form on a fake store sends your card number, CVV, and expiry date directly to the scammer — often before you ever see an "order failed" message.`,
    ],
    redFlags: [
      'Domain is not the brand\'s official website — "nikeindiaoutlet-deals.in" is not "nike.com"',
      'Discount exceeds 70–80% — legitimate clearance sales rarely exceed this',
      'Countdown timer and "only X left" stock alerts — manufactured pressure to prevent verification',
      'Social media account that ran the ad was created recently with no prior content',
      'Positive comments from accounts with no profile photo or post history — these are bots',
      'Checkout does not offer established payment gateways — only direct card entry or UPI to an unfamiliar ID',
      'No official "Contact Us" page or physical address listed on the site',
    ],
    whatToDo: [
      { step: 'Verify the domain before clicking any ad link', detail: 'The official Nike site is nike.com/in, not any variation of it. Before clicking any sale link, check the URL against the brand\'s verified official domain. A 10-second check prevents 100% of these scams.' },
      { step: 'Search the sale on the brand\'s official website', detail: 'If a flash sale is real, the brand\'s official website will show it. If you cannot find the sale on the official site, the ad is fraudulent.' },
      { step: 'Check the social media account age', detail: 'Tap the account name → View Profile → scroll to their earliest posts. Any account created in the last few weeks running brand-impersonation ads is a scam.' },
      { step: 'Report the fraudulent ad', detail: 'On Instagram: tap the three dots on the ad → Report Ad → It\'s a scam or fraud. On Facebook: tap the three dots → Report Ad. This removes the ad for others.' },
      { step: 'If you already paid — act immediately', detail: 'Call your bank to block the card and dispute the transaction. File a cybercrime complaint at cybercrime.gov.in with screenshots of the ad and the fake website. Speed matters — report within 24 hours.' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report fake e-commerce sites and social media ad fraud', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance if you have paid on a fake site', url: 'tel:1930' },
      { name: 'sancharsaathi.gov.in — Report fraud', desc: 'Report fraudulent digital commerce activity to TRAI', url: 'https://sancharsaathi.gov.in' },
      { name: 'RBI Sachet Portal — Report payment fraud', desc: 'Reserve Bank of India portal to report unauthorised payment transactions', url: 'https://sachet.rbi.org.in' },
    ],
  },

  'oc-courier-1': {
    readTime: '4 min read',
    howItWorks: [
      `Courier scams exploit the fact that most people are regularly expecting at least one delivery. An SMS arrives claiming to be from DTDC, BlueDart, or FedEx stating your package delivery failed and a small redelivery fee (₹29–₹99) must be paid via a link. The small amount reduces your guard — it seems plausible and insignificant.`,
      `The link leads to a convincingly branded site that mimics the courier company's design. It requests your card details to pay the redelivery fee. This is where the real attack happens: your card number, CVV, and expiry date are captured. The ₹99 is irrelevant — it may even go through. But your card details are now in the scammer's hands, and within hours, significantly larger fraudulent charges follow.`,
      `The ₹99 payment is specifically designed to "test" that your card is live before making larger withdrawals. This technique — called "card testing" — is a well-documented fraud methodology. The small test payment is the warning sign, not the main attack.`,
    ],
    redFlags: [
      'Unsolicited SMS about a package you were not expecting',
      'Link domain does not match the official courier website — "dtdc-redelivery.co.in" is not "dtdc.com"',
      'Payment requested via a link in an SMS — official couriers never do this',
      'Tracking number in the SMS does not appear in the official app or website',
      'Small redelivery fee (₹29–₹99) that seems reasonable and reduces scrutiny',
      'Urgency — "pay within 24 hours or your package will be returned"',
    ],
    whatToDo: [
      { step: 'Track the package through the official app or website', detail: 'Copy the tracking number from the SMS and enter it at dtdc.com, bluedart.com, or fedex.com directly — not through the link. If the tracking number doesn\'t exist, the SMS is fraudulent.' },
      { step: 'Check the SMS sender ID', detail: 'Official courier SMS messages come from short codes registered with telecom operators (like "DTDCCR" or "BDREXP"). An SMS from a mobile number (10 digits starting with 9 or 7) claiming to be a courier is always fraudulent.' },
      { step: 'Never tap payment links in SMS', detail: 'No official courier in India sends payment links via SMS. Redelivery fees, if they exist, are collected at the door by the delivery agent or through the courier\'s official app.' },
      { step: 'Report the fraudulent SMS', detail: 'Forward the SMS to 1909 (TRAI\'s spam reporting system). File a report at sancharsaathi.gov.in. File a cybercrime complaint at cybercrime.gov.in with a screenshot.' },
      { step: 'If you entered card details — block the card immediately', detail: 'Call your bank\'s 24-hour helpline or use the mobile app to block the card. Report the transaction as fraud. Banks can often reverse fraudulent charges if you act within 24–48 hours.' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report courier scam SMS and fake delivery payment sites', url: 'https://cybercrime.gov.in' },
      { name: 'sancharsaathi.gov.in — Report fraud SMS', desc: 'Report fraudulent SMS to TRAI via Sanchar Saathi portal', url: 'https://sancharsaathi.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call immediately if you have entered payment details on a fake site', url: 'tel:1930' },
      { name: '1909 — TRAI DND/Spam SMS reporting', desc: 'Forward fraudulent SMS to 1909 to report to TRAI', url: 'tel:1909' },
    ],
  },

  'oc-techsupport-1': {
    readTime: '6 min read',
    howItWorks: [
      `Tech support scams begin with a browser popup — a full-screen alert with Microsoft or Windows branding, a simulated virus scan showing multiple infections, an alarming sound, and a phone number to call for "Microsoft Support." The popup appears while browsing a legitimate website, injected by a malicious ad network. Your computer is not actually infected — the entire alert is JavaScript running in a webpage.`,
      `When you call the number, a professional-sounding agent guides you through installing a remote access tool — AnyDesk, TeamViewer, or a similar legitimate application. This is the critical moment. The moment you install and share the access code, the scammer has complete control of your screen. You can see everything they do, but they control everything.`,
      `With remote access, scammers open your net banking website and initiate fund transfers while keeping you occupied on the phone discussing "the virus." They navigate to "show you the infections" in Event Viewer (which shows harmless system logs that always look alarming to non-technical users) while simultaneously completing a bank transfer in another window. By the time you notice, the transfer is complete and irreversible.`,
    ],
    redFlags: [
      'Any browser popup showing a virus alert with a phone number — Microsoft and Apple never communicate this way',
      'Browser appears "frozen" or trapped — use Ctrl+W or Task Manager (Ctrl+Shift+Esc) to force close it',
      'Cold call claiming to be from Microsoft, Windows Security, or your antivirus company about an infection',
      'Anyone asking you to install AnyDesk, TeamViewer, or any remote access software during a support call',
      'Support agent who wants to "show you the viruses" in Event Viewer or command prompt',
      'Request to open your bank account "to verify the refund" or "check for suspicious transactions"',
    ],
    whatToDo: [
      { step: 'Close the tab immediately if you see a popup', detail: 'Press Ctrl+W (Windows) or Cmd+W (Mac) to close the tab. If the browser appears stuck, use Ctrl+Shift+Esc to open Task Manager and end the browser process. Closing the tab ends the scam — your computer is not infected.' },
      { step: 'Never call numbers shown in browser popups', detail: 'Microsoft, Apple, and antivirus companies cannot detect viruses through your browser. Any popup number connects directly to scammers. The real Microsoft support number is never displayed in a browser alert.' },
      { step: 'Never install remote access software on instruction', detail: 'Legitimate IT support — including from your workplace — will never cold-call you and ask you to install AnyDesk or TeamViewer. This request alone, from any caller, is sufficient reason to hang up.' },
      { step: 'If you gave remote access — act within minutes', detail: 'Disconnect from the internet immediately (unplug ethernet or turn off Wi-Fi). Call your bank\'s fraud helpline to place a hold on your account. Change all passwords from a different device. Report at cybercrime.gov.in.' },
      { step: 'Have your device professionally cleaned', detail: 'If a scammer had remote access, assume all saved passwords and stored files were compromised. Do not just run an antivirus — take the device to a qualified technician who can perform a full audit.' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report tech support scam and remote access fraud', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call immediately if a scammer had remote access to your device', url: 'tel:1930' },
      { name: 'cert-in.org.in — Report to CERT-In', desc: 'Report tech fraud incidents to India\'s Computer Emergency Response Team', url: 'https://www.cert-in.org.in' },
      { name: 'Microsoft Safety Scanner — Legitimate tool', desc: 'Official Microsoft tool to scan for infections — download only from microsoft.com', url: 'https://docs.microsoft.com/en-us/microsoft-365/security/intelligence/safety-scanner-download' },
    ],
  },

  'oc-gaming-1': {
    readTime: '4 min read',
    howItWorks: [
      `Gaming account phishing exploits the high value players place on their accounts — skins, progress, ranks, and rare items accumulated over months or years. Scammers create Discord accounts with names like "ValorantOfficial_Rewards" or "FreeFireSupport_India" and DM players in popular gaming servers with fake giveaway notifications.`,
      `The urgency is extreme: "your Prime Collection skin expires in 30 minutes." This short window is deliberately designed to prevent you from pausing to verify. The link leads to a convincing clone of the game's official login page. The domain is close but not identical — "valorant-free-skins.net" instead of "playvalorant.com." Because you expect to see a Riot Games login page, your brain auto-completes the visual match and you don't read the URL carefully.`,
      `The moment you enter your username and password, the credentials are captured. The scammer logs into your real account from their device, changes the password, and removes linked recovery options. In competitive games with valuable accounts, this can represent thousands of rupees in purchased skins and years of ranked progression — all gone within minutes.`,
    ],
    redFlags: [
      'Unsolicited DM from a gaming-named account offering free skins or rewards',
      'Account sending the DM was created days or weeks ago — check their profile',
      'Extreme urgency: "claim within 30 minutes" — real giveaways do not expire this fast',
      'Link does not go to the game\'s official domain — "valorant-free-skins.net" is not "playvalorant.com"',
      'Login page accepts any username/password combination — a clear sign it is a data-harvesting form',
      'No official giveaway announcement visible on the game\'s verified social media or official website',
      'The DM account has no mutual servers with you and no post history',
    ],
    whatToDo: [
      { step: 'Check the account\'s profile before engaging', detail: 'Tap the account name → View Profile. Check creation date, mutual servers, and post history. Any account created in the last few weeks impersonating a game brand is a scam account.' },
      { step: 'Verify giveaways on official channels only', detail: 'Go directly to the game\'s official website or their verified social media accounts. If there is a real giveaway, it will be prominently announced there.' },
      { step: 'Check the URL before entering credentials', detail: 'Before typing anything on a login page, look at the address bar. The official Riot Games site is playvalorant.com. Any other domain — regardless of how similar the page looks — is a phishing site.' },
      { step: 'Enable Two-Factor Authentication (2FA) on your gaming accounts', detail: '2FA means a scammer with your password still cannot access your account without a code sent to your phone. Enable it in your account security settings — this is the single most effective protection.' },
      { step: 'If your account was compromised — act immediately', detail: 'Use the game\'s official "Account Hacked" or "Recover Account" option on their website. For Riot: support.riotgames.com. Provide proof of original ownership. Report the phishing link to cybercrime.gov.in.' },
    ],
    tools: [
      { name: 'support.riotgames.com — Account recovery', desc: 'Riot Games official support for hacked or phished Valorant accounts', url: 'https://support.riotgames.com' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report gaming account phishing and identity theft', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Guidance on digital account theft and recovery options', url: 'tel:1930' },
      { name: 'Discord Trust & Safety — Report scam accounts', desc: 'Report impersonation and phishing accounts on Discord', url: 'https://discord.com/safety' },
    ],
  },

  'ii-urgency-pressure-1': {
    readTime: '5 min read',
    howItWorks: [
      `Urgency pressure attacks are coordinated multi-channel scams where the attacker simultaneously sends a fraudulent email, an SMS, and makes phone calls — all claiming the same emergency. The goal is to overwhelm your ability to think clearly by making the threat appear to come from multiple independent sources at once.`,
      `A live countdown timer and escalating alerts ("account freeze in 2 minutes") create psychological pressure that mimics a genuine emergency. Under this pressure, the brain seeks the fastest path to resolution — which is exactly what the attacker wants.`,
      `The attack exploits a fundamental truth: under high pressure, people stop verifying and start reacting. The entire architecture — the timer, the multiple channels, the escalating warnings — is designed to eliminate the 30-second pause that would reveal the fraud.`,
    ],
    redFlags: [
      'Multiple channels (email + SMS + phone) all reporting the same emergency simultaneously',
      'Countdown timer claiming your account will be frozen — no bank operates on 10-minute windows',
      'Email domain does not match the bank\'s official domain exactly',
      'SMS link leads to a domain that is not the bank\'s official website',
      'Escalating alerts designed to prevent you from stopping to think',
      'Caller asks you to stay on the line and follow instructions without hanging up',
    ],
    whatToDo: [
      { step: 'Stop and recognise the pressure tactic', detail: 'The moment you feel rushed into a financial decision, that feeling is the red flag. Real bank fraud investigations take hours — not 10-minute windows.' },
      { step: 'Call your bank\'s official helpline from the back of your card', detail: 'HDFC: 1800-202-6161. SBI: 1800-11-2211. ICICI: 1800-1080. The number on your card bypasses all spoofed domains in one step.' },
      { step: 'Never click links in urgent financial alerts', detail: 'Open your bank\'s app directly or type the URL manually. Never follow links from urgent email or SMS alerts.' },
      { step: 'If you entered credentials — act immediately', detail: 'Call your bank to request a temporary account block. Banks can block accounts in under 5 minutes. Speed is critical after credential compromise.' },
      { step: 'Report all three channels', detail: 'Forward the email to incident@cert-in.org.in. Report the SMS to 1909. File a complaint at cybercrime.gov.in with screenshots.' },
    ],
    tools: [
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report coordinated banking fraud attacks', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call immediately if you\'ve shared credentials or transferred money', url: 'tel:1930' },
      { name: 'sancharsaathi.gov.in — Report fraud SMS', desc: 'Report fraudulent SMS sender IDs to TRAI', url: 'https://sancharsaathi.gov.in' },
      { name: 'cert-in.org.in — Report phishing email', desc: 'Forward fraudulent emails to incident@cert-in.org.in', url: 'https://www.cert-in.org.in' },
    ],
  },

  /* ══════════════════════════════════════════════
     MALWARE & DEVICE SAFETY
  ══════════════════════════════════════════════ */

  'mal-virus-student': {
    readTime: '4 min read',
    howItWorks: [
      `USB drives can carry malware that activates the moment you plug them in. When you insert an infected drive, Windows may show an "AutoRun" prompt — this is the malware trying to execute itself automatically. Opening an executable or suspicious file from the drive installs the malware onto your laptop.`,
      `One of the most common payloads delivered this way is ransomware, which encrypts your files and renames them with extensions like ".locked" or ".crypt". Once encrypted, the files cannot be opened without a decryption key that the attacker holds.`,
      `Shared USB drives in college environments — notes, assignments, project files — are a common infection vector because students trust each other and often share drives without thinking. The person who gave you the drive may not even know it is infected.`,
    ],
    redFlags: [
      'USB drive shows an AutoRun or executable (.exe) file when plugged in',
      'Windows prompts you to "Open folder to view files" using a program you don\'t recognise',
      'Files on your laptop begin renaming themselves with strange extensions like .locked, .crypt, or .enc',
      'Antivirus warns about a file on an external drive',
      'A drive from someone else contains .exe or .bat files alongside documents',
    ],
    whatToDo: [
      { step: 'Always cancel AutoRun prompts from unknown drives', detail: 'When you plug in any USB drive, dismiss any auto-play prompts. Never click "Open folder using [unknown program]."' },
      { step: 'Scan before opening', detail: 'Right-click the USB drive in File Explorer → Scan with [your antivirus]. Only open files after the scan is clean.' },
      { step: 'If ransomware has started encrypting files', detail: 'Disconnect from Wi-Fi and unplug ethernet immediately — this stops the malware from communicating with its control server. Do not restart.' },
      { step: 'Boot into Safe Mode for the scan', detail: 'Safe Mode prevents most malware from running at startup, giving antivirus a better chance of detecting and removing it.' },
      { step: 'Report to your college IT helpdesk', detail: 'Infected drives in shared college environments can spread quickly. Alert IT so they can warn other students.' },
    ],
    tools: [
      { name: 'Windows Defender — built-in scan', desc: 'Right-click any drive or file → Scan with Microsoft Defender', url: 'https://support.microsoft.com/en-us/windows/stay-protected-with-windows-security' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report ransomware attacks', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call for guidance on malware and ransomware', url: 'tel:1930' },
    ],
  },

  'mal-virus-student-email': {
    readTime: '4 min read',
    howItWorks: [
      `Email attachments are one of the oldest and most reliable malware delivery methods. Attackers send documents — often Word or Excel files — that claim to contain notes, assignments, or important information. When opened, the document asks you to "Enable Content" or "Enable Macros."`,
      `Macros are small programs embedded in documents. Legitimate documents almost never need macros to display content. When you enable macros on a malicious document, you are executing the attacker's code directly on your machine — it can download additional malware, steal files, or take control of your system.`,
      `Attackers often spoof sender names to match people you know — a professor, a classmate, or a college department. The domain is usually slightly different (e.g. "college-portal.com" instead of the real college domain), but the display name looks familiar enough that people don't check carefully.`,
    ],
    redFlags: [
      'Email attachment asks you to "Enable Content" or "Enable Macros" to view it',
      'Sender\'s display name looks familiar but the email domain is unknown or slightly different',
      'You were not expecting this file from this person',
      'Subject line creates urgency — "URGENT: Exam timetable," "Last date: submit now"',
      'Unusual outbound network activity after opening a file (check Task Manager → Network tab)',
    ],
    whatToDo: [
      { step: 'Never enable macros in documents from unknown senders', detail: 'Legitimate college documents — timetables, notes, forms — never require macros to display. If a file demands macros, it is almost certainly malicious.' },
      { step: 'Verify through the official channel', detail: 'If the email claims to be from your college, check the official website or WhatsApp group for the same announcement before opening any attachment.' },
      { step: 'Report the email', detail: 'In most email clients: three dots → Report phishing, or forward to your college\'s IT security email.' },
      { step: 'If macros were already enabled', detail: 'Disconnect Wi-Fi immediately. Run a full antivirus scan. Change passwords for your email and any accounts accessed from that device — from a different, clean device.' },
      { step: 'Do not forward suspicious files', detail: 'Even if you are unsure whether a file is malicious, never forward it to classmates "to see if they can open it" — you would be spreading the malware.' },
    ],
    tools: [
      { name: 'cert-in.org.in — Report phishing emails', desc: 'Forward suspicious emails to incident@cert-in.org.in', url: 'https://www.cert-in.org.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report email-based malware attacks', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call for guidance after a malware infection', url: 'tel:1930' },
    ],
  },

  'mal-virus-pro': {
    readTime: '4 min read',
    howItWorks: [
      `In professional environments, macro-based malware typically arrives disguised as vendor documents, invoices, or internal forms. The attacker spoofs a vendor or colleague\'s name — someone you are likely to receive documents from — and attaches a file that looks routine.`,
      `When opened, the document claims certain content is hidden for security reasons and asks you to "Enable Content" to see the full document. This is the trigger. Enabling macros executes code that can install keyloggers, remote access tools, or spread across your organisation\'s network.`,
      `In corporate environments the consequences are severe: the malware can access shared drives, steal client data, send emails from your account, and move laterally to other machines on the same network — all while appearing to originate from a trusted insider.`,
    ],
    redFlags: [
      'Document from a known vendor that you were not expecting',
      'File requires you to "Enable Content" or "Enable Macros" to display',
      'Sender\'s email domain differs slightly from the real vendor\'s domain',
      'Your machine begins sending automated emails to contacts without your action',
      'Unusual processes in Task Manager after opening a file',
    ],
    whatToDo: [
      { step: 'Call before opening', detail: 'If an unexpected document arrives from a vendor or colleague, call them directly on a known number to confirm they sent it. This takes 60 seconds and catches 100% of spoofed sender attacks.' },
      { step: 'Forward to IT security immediately', detail: 'Never open a suspicious attachment — forward the email as-is to your IT security team and delete it from your inbox.' },
      { step: 'If a colleague\'s machine is infected', detail: 'The single most important action is network isolation — disconnect the machine from ethernet and disable Wi-Fi immediately. This stops the malware from spreading to other machines on the corporate network.' },
      { step: 'Do not attempt to clean the machine while it is connected', detail: 'Running antivirus on an online, infected machine allows the malware to continue network activity during the scan. Isolate first, then scan.' },
      { step: 'Notify IT and management', detail: 'A corporate malware infection must be escalated immediately. IT needs to assess whether the malware spread before isolation.' },
    ],
    tools: [
      { name: 'cert-in.org.in — Report cyber incidents', desc: 'Report corporate malware incidents to India\'s cyber emergency response team', url: 'https://www.cert-in.org.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report email-based malware and data breaches', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance for corporate malware incidents', url: 'tel:1930' },
    ],
  },

  'mal-virus-elderly': {
    readTime: '4 min read',
    howItWorks: [
      `Forwarded messages are one of the most effective malware vectors targeting elderly users because they appear to come from trusted family members or friends. Attackers craft messages that look like government health scheme notifications, prize winners, or religious content — things people are likely to forward without scrutiny.`,
      `The malicious attachment is typically an APK file (Android app installer) or a document. When installed, the APK may request permissions to read SMS messages — giving the attacker access to OTPs — or show persistent ads, or steal contact lists to spread further.`,
      `The chain effect is powerful: one person installs it, it harvests their contacts, and the malware is forwarded to all of them with the original sender\'s name — making the next round of messages look even more trustworthy.`,
    ],
    redFlags: [
      'A forwarded WhatsApp message with an attachment (APK file or document)',
      'Message claims to be from a government health or welfare scheme',
      'App requests permissions unrelated to its stated function (a "government form" asking for SMS access)',
      'Phone behaves strangely after installing — ads appear, battery drains faster, unknown apps installed',
      'Bank receives unusual login activity after the app was installed',
    ],
    whatToDo: [
      { step: 'Call the person who forwarded it before doing anything', detail: 'Call the family member or friend directly. Ask if they intentionally sent this. They may not know their account forwarded it.' },
      { step: 'Never install APK files from WhatsApp', detail: 'Government schemes are not distributed via WhatsApp APK files. All legitimate government apps are available on the Google Play Store or the official .gov.in website.' },
      { step: 'If a suspicious app is already installed', detail: 'Go to Settings → Apps → find the suspicious app → Uninstall. Then open Play Store → Profile → Play Protect → Scan.' },
      { step: 'Contact your bank immediately', detail: 'If the app had SMS permission, it may have intercepted OTPs. Call your bank to check for unauthorised transactions and enable alerts.' },
      { step: 'Reset passwords from a different device', detail: 'Change your email and banking passwords from a clean phone or computer, not the potentially infected device.' },
    ],
    tools: [
      { name: 'Google Play Protect — Scan your device', desc: 'Play Store → Profile icon → Play Protect → Scan', url: 'https://support.google.com/googleplay/answer/2812853' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report malicious APK files and mobile malware', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call for guidance on mobile malware and banking fraud', url: 'tel:1930' },
    ],
  },

  'mal-trojan-student': {
    readTime: '5 min read',
    howItWorks: [
      `A Trojan horse is malware disguised as something desirable — in this case, a cracked or pirated version of a paid game or software. The download appears to work, but the installer bundles additional hidden programs that install quietly alongside the main application.`,
      `These bundled programs are often keyloggers — software that records every keystroke you type, including passwords, credit card numbers, and OTPs — or Remote Access Trojans (RATs) that give an attacker complete control of your computer.`,
      `Cracked software sites specifically target the knowledge that you want the software and are willing to take risks to get it free. The attacker counts on you clicking through installer screens quickly without reading what is being installed. Unchecking the hidden programs is possible — but most people don\'t.`,
    ],
    redFlags: [
      'Installer has checkboxes for additional programs that are pre-checked — especially vague names like "System Optimizer," "Performance Helper," or "Driver Updater"',
      'Processes with suspicious names in Task Manager (e.g., "keylog-driver.sys," "svchost-helper.exe")',
      'Antivirus quarantines a file from the downloaded software',
      'Browser homepage changes unexpectedly after installation',
      'Passwords stop working after installing software from an unofficial source',
    ],
    whatToDo: [
      { step: 'Read every screen of every installer', detail: 'Scroll through all installer steps. Uncheck anything that is not the core program you wanted. Never click "Next" without reading.' },
      { step: 'Only download software from official sources', detail: 'The official developer\'s website, Steam, or the Google Play/Apple App Store. If a free version exists only on a third-party site, treat it as suspicious.' },
      { step: 'If suspicious processes appear in Task Manager', detail: 'Do not search for them online from the infected machine — the attacker may be monitoring. Immediately disconnect from the internet, then run a full antivirus scan from Safe Mode.' },
      { step: 'Change all passwords from a different device', detail: 'If a keylogger was active, every password typed on the infected machine may be compromised. Change them from a clean phone or another computer.' },
      { step: 'Reinstall the operating system if in doubt', detail: 'A clean OS reinstall is the only guaranteed way to remove a Trojan that has embedded deeply. Back up your data to an external drive first.' },
    ],
    tools: [
      { name: 'Malwarebytes — Free malware scanner', desc: 'Download from malwarebytes.com for deep Trojan scanning', url: 'https://www.malwarebytes.com' },
      { name: 'Windows Defender Offline Scan', desc: 'Runs before Windows starts — effective against persistent Trojans', url: 'https://support.microsoft.com/en-us/windows/help-protect-my-pc-with-microsoft-defender-offline' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report Trojan infections and resulting fraud', url: 'https://cybercrime.gov.in' },
    ],
  },

  'mal-trojan-pro': {
    readTime: '5 min read',
    howItWorks: [
      `Fake IT security patches are a targeted attack against professionals who know that security updates are important and should be applied promptly. The attacker impersonates the IT department or a software vendor and sends an urgent notification about a "critical patch."`,
      `The link leads to a convincing download page. The installer looks like a legitimate update but secretly installs a Remote Access Trojan (RAT) — software that gives the attacker full, persistent control of the machine. Unlike viruses that spread randomly, a RAT is operated by a human who can browse files, activate the camera, log keystrokes, and move through the corporate network.`,
      `The urgency framing — "critical," "apply immediately," "system vulnerable until patched" — is designed to stop you from questioning whether the request is legitimate. IT departments never deliver updates via email links.`,
    ],
    redFlags: [
      'IT update delivered via an email link rather than through Windows Update or the company\'s official patch management system',
      'Installer includes bundled software that is not part of the described update',
      'The "patch" download page is not on the official vendor\'s domain',
      'Colleagues receive the same email simultaneously',
      'Machine behaves slowly or has unexplained network activity after the "update"',
    ],
    whatToDo: [
      { step: 'Always verify IT updates through official channels', detail: 'Legitimate Windows updates come through Settings → Windows Update. Legitimate corporate patches come through your company\'s patch management system (e.g., SCCM, Intune) — never via email links.' },
      { step: 'Call IT before installing anything from an email', detail: 'One phone call to your real IT helpdesk takes 2 minutes and catches 100% of fake IT update attacks.' },
      { step: 'If a RAT is confirmed on a colleague\'s machine', detail: 'Network isolation is the first step — unplug ethernet and disable Wi-Fi immediately. The attacker may be actively browsing the machine and accessing network shares. Every second matters.' },
      { step: 'Assess the blast radius', detail: 'After isolation, IT must check which files the attacker accessed, which network shares were reachable, and whether the RAT spread to other machines. This is a critical incident — treat it as one.' },
      { step: 'Report to CERT-In for serious incidents', detail: 'Corporate RAT infections are reportable cybersecurity incidents. Report to cert-in.org.in, especially if client data may have been accessed.' },
    ],
    tools: [
      { name: 'cert-in.org.in — Report cyber incidents', desc: 'Report RAT infections and corporate security breaches', url: 'https://www.cert-in.org.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report targeted malware attacks', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Immediate guidance for corporate malware incidents', url: 'tel:1930' },
    ],
  },

  'mal-ransomware-pro': {
    readTime: '5 min read',
    howItWorks: [
      `Ransomware is malware that encrypts your files and demands payment for the decryption key. In a professional environment, it typically enters through a phishing email or a compromised website. Once it gains a foothold, it scans your entire machine and any connected network drives for files to encrypt.`,
      `Modern ransomware is fast. From initial execution to full encryption can take minutes. It targets business-critical files — spreadsheets, documents, databases, presentations — and renames them with a new extension (.locked, .enc, .ransomed). A ransom note then appears demanding cryptocurrency payment.`,
      `Paying the ransom does not guarantee file recovery. Attackers frequently take payment and provide no working decryption key, or provide a partial key that only recovers some files. The only reliable recovery mechanism is a clean, recent backup that was not connected to the network when the encryption occurred.`,
    ],
    redFlags: [
      'Files begin renaming themselves with unknown extensions while you watch',
      'System slows dramatically as ransomware scans and encrypts in the background',
      'A ransom note appears on screen — typically a .txt or .html file',
      'Antivirus alerts about unusual file system activity',
      'Network drives become inaccessible — ransomware may have spread via shared folders',
    ],
    whatToDo: [
      { step: 'Disconnect from the network immediately', detail: 'Unplug ethernet and turn off Wi-Fi at the first sign of active encryption. This limits what the ransomware can encrypt and may stop it from spreading to network shares and other machines.' },
      { step: 'Do not restart the computer', detail: 'Restarting does not remove ransomware. Some variants are designed to encrypt remaining files during the shutdown process. Leave the machine powered on but offline.' },
      { step: 'Never pay the ransom', detail: 'Payment does not guarantee decryption. It funds criminal organisations and marks you as a paying target for future attacks. Explore backup restoration and shadow copies first.' },
      { step: 'Check Windows Shadow Copy', detail: 'Right-click an encrypted file → Properties → Previous Versions. Windows may have shadow copies of files from before the encryption occurred.' },
      { step: 'Restore from backup', detail: 'A clean, recent backup is the only guaranteed recovery. Restore to a clean machine, not the infected one. Verify backups are functioning before an incident — not during.' },
    ],
    tools: [
      { name: 'No More Ransom — nomoreransom.org', desc: 'Free decryption tools for hundreds of ransomware families — check before paying', url: 'https://www.nomoreransom.org' },
      { name: 'cert-in.org.in — Report ransomware', desc: 'Report ransomware attacks — especially corporate incidents', url: 'https://www.cert-in.org.in' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report ransomware and file a legal complaint', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call for guidance on ransomware response', url: 'tel:1930' },
    ],
  },

  'mal-ransomware-elderly': {
    readTime: '4 min read',
    howItWorks: [
      `Phone locker malware — sometimes called "police ransomware" — disguises itself as an app sent via WhatsApp, often framed as a government scheme, a free utility, or a religious app. When installed, it takes over the phone screen and displays a fake "police" or "government" notice claiming you have violated a law and must pay a fine to unlock your phone.`,
      `The notice is entirely fake. No Indian government authority locks phones remotely and demands UPI payment to unlock them. The message is designed to create fear and urgency — showing your photo (taken by the front camera), listing fabricated violations, and demanding immediate payment before the "fine increases."`,
      `The app is installed from outside the Play Store as an APK file — a format Android allows but which bypasses Google\'s safety checks. This is why Google warns against installing apps from unknown sources.`,
    ],
    redFlags: [
      'APK file shared via WhatsApp or SMS — legitimate apps are on the Play Store',
      'App requests permission to "display over other apps" or "device administrator" — these allow screen locking',
      'Phone screen is suddenly locked with a fake police or government notice',
      'Notice demands payment via UPI or online transfer to unlock the phone',
      'Notice uses your front camera photo to make it appear more official',
    ],
    whatToDo: [
      { step: 'Never pay — it is a scam', detail: 'No Indian police authority or government agency locks your phone and demands UPI payment. Payment will not unlock the phone and only sends money to criminals.' },
      { step: 'Boot into Safe Mode', detail: 'On most Android phones: hold the power button → tap and hold "Power off" until "Reboot to safe mode" appears → confirm. In Safe Mode, third-party apps are disabled and you can uninstall the malicious app.' },
      { step: 'Uninstall the malicious app in Safe Mode', detail: 'Go to Settings → Apps → find the suspicious app (often with a generic name) → Uninstall. If it resists, go to Settings → Security → Device Admin Apps → deactivate the app first.' },
      { step: 'Factory reset as a last resort', detail: 'If Safe Mode removal fails, a factory reset (Settings → General Management → Reset → Factory Reset) will remove the malware. Back up contacts and photos to Google first if possible.' },
      { step: 'Call your bank', detail: 'If the app had permission to read SMS messages, it may have intercepted OTPs. Contact your bank immediately to check for and block unauthorised transactions.' },
    ],
    tools: [
      { name: 'Google Play Protect — Scan your device', desc: 'Play Store → Profile icon → Play Protect → Scan device', url: 'https://support.google.com/googleplay/answer/2812853' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report mobile ransomware and police impersonation apps', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call for guidance on mobile malware removal', url: 'tel:1930' },
    ],
  },

  'mal-adware-student': {
    readTime: '4 min read',
    howItWorks: [
      `Adware and Potentially Unwanted Programs (PUPs) are software that display unwanted advertisements, collect browsing data, or change browser settings — usually installed alongside a program the user actually wanted. They are distributed through "free" software download sites and are often called browser hijackers.`,
      `When you download a "free" video converter, PDF tool, or game from an unofficial site, the installer bundles additional programs. A common pattern: your browser homepage changes to a fake search engine, new toolbars appear, ads start appearing on every website, and popups warn about "viruses" urging you to download more software.`,
      `The fake virus warnings are designed to make you install more adware. The cycle continues until you identify and remove the original bundled program.`,
    ],
    redFlags: [
      'Browser homepage changes without your action',
      'New toolbars appear in the browser that you did not install',
      'Ads appear on websites that normally do not have many ads',
      'Search results look different or redirect to an unfamiliar search engine',
      'Frequent popups warning about viruses and urging software downloads',
      'Browser is significantly slower than usual',
    ],
    whatToDo: [
      { step: 'Uninstall the source program first', detail: 'Go to Control Panel → Programs → Uninstall a program. Find the software you downloaded from the unofficial site and uninstall it, along with any bundled programs installed around the same time.' },
      { step: 'Remove the browser extension', detail: 'Open browser → three dots → Extensions → find any unfamiliar extension → Remove. Hijackers often install as extensions to persist even after the main program is removed.' },
      { step: 'Reset browser settings', detail: 'Chrome: Settings → Reset settings → Restore settings to original defaults. This removes homepage changes, search engine changes, and startup page changes without removing bookmarks.' },
      { step: 'Only download software from official sources', detail: 'The developer\'s official website, the Microsoft Store, or reputable software repositories. Never use search results that lead to third-party download aggregators.' },
      { step: 'Ignore popups warning about viruses', detail: 'Legitimate antivirus software never displays popups in websites. Any browser popup claiming your device is infected is itself adware or a scam.' },
    ],
    tools: [
      { name: 'AdwCleaner — Free adware removal', desc: 'Download from malwarebytes.com/adwcleaner — specifically targets PUPs and browser hijackers', url: 'https://www.malwarebytes.com/adwcleaner' },
      { name: 'Chrome — Reset browser settings', desc: 'Settings → Reset settings → Restore settings to original defaults', url: 'https://support.google.com/chrome/answer/3296214' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report malicious software distribution', url: 'https://cybercrime.gov.in' },
    ],
  },

  'mal-adware-elderly': {
    readTime: '4 min read',
    howItWorks: [
      `APK files are Android app installers distributed outside the Google Play Store. When someone sends you an APK via WhatsApp — a torch app, a game, a "government scheme" app — installing it bypasses all of Google\'s safety checks. The app may work as advertised but simultaneously run hidden code that displays ads, collects your data, or drains your battery.`,
      `A related threat is fake "Google Support" or "phone repair" calls — attackers call claiming your phone has a virus and offer to fix it, requesting remote access. Once they have remote access, they can install malware, access banking apps, and capture OTPs.`,
      `The key signal is permission abuse. A torch app has no reason to request access to your SMS messages, contacts, or camera. An app that demands permissions unrelated to its function is harvesting data or preparing to show ads.`,
    ],
    redFlags: [
      'App shared as an APK file via WhatsApp — not from the Play Store',
      'App requests permissions that make no sense for its stated function (torch app wanting SMS access)',
      'Phone battery drains significantly faster after installing a new app',
      'Ads appear on the home screen or in other apps after installation',
      'Unknown calls claiming your phone has a virus and offering remote help',
    ],
    whatToDo: [
      { step: 'Only install apps from the Google Play Store', detail: 'The Play Store\'s vetting process catches the majority of malicious apps. Settings → Security → Unknown sources should be turned OFF — this blocks APK installations from outside the Play Store.' },
      { step: 'Review permissions before installing', detail: 'When installing any app, read the permissions list. Deny any permission that seems unrelated to the app\'s function. You can manage permissions later in Settings → Apps → [App Name] → Permissions.' },
      { step: 'If a suspicious app is already installed', detail: 'Settings → Apps → find the app → Uninstall. If it resists, Settings → Security → Device Admin Apps → deactivate the app first, then uninstall.' },
      { step: 'Run Play Protect', detail: 'Play Store → tap your Profile icon → Play Protect → Scan. This checks all installed apps against Google\'s malware database.' },
      { step: 'Never give remote access to unknown callers', detail: 'Google, Samsung, and no legitimate company calls you unsolicited to fix your phone. Hang up immediately on anyone offering to "remove a virus" from your phone remotely.' },
    ],
    tools: [
      { name: 'Google Play Protect — Scan your device', desc: 'Play Store → Profile icon → Play Protect → Scan device', url: 'https://support.google.com/googleplay/answer/2812853' },
      { name: 'cybercrime.gov.in — File a complaint', desc: 'Report malicious APK files and fake support scams', url: 'https://cybercrime.gov.in' },
      { name: '1930 — National Cybercrime Helpline', desc: 'Call for guidance on mobile malware and phone scams', url: 'tel:1930' },
    ],
  },

}

export default function LearnPage() {
  const { simId }  = useParams()
  const navigate   = useNavigate()

  const sim     = SIMULATIONS[simId]
  const content = LEARN_CONTENT[simId]
  const categoryId = sim ? CATEGORY_ROUTE_MAP[sim.category] : null
  const diffColor  = sim ? (DIFF_COLORS[sim.difficulty] || 'var(--amber)') : 'var(--amber)'

  if (!sim || !content) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: 'var(--sans)', color: 'var(--text-2)', background: 'var(--ink)' }}>
        <Icon name="alert" size={32} color="var(--text-3)" />
        <p>Learn content not found for this module.</p>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 6, border: '1px solid var(--border-lt)', color: 'var(--text-2)', fontSize: 13, fontFamily: 'var(--sans)', background: 'none', cursor: 'pointer' }}>
          <Icon name="arrowLeft" size={14} /> Go back
        </button>
      </div>
    )
  }

  function goToQuiz() {
    navigate(`/quiz/${simId}`)
  }

  return (
    <div className={s.root}>
      <div className={s.noiseBg} aria-hidden />
      <div className={s.ambientTop} aria-hidden />

      {/* ── Topbar ── */}
      <header className={s.topbar}>
        <div className={s.topbarWrap}>
          <Link to="/" className={s.topbarLogo}>
            <div className={s.logoMark}>
              <Icon name="shield" size={14} color="#D4891A" w={2.2} />
            </div>
            <span>Cyber<strong>Raksha</strong></span>
          </Link>
          <div className={s.topbarRight}>
            <button onClick={goToQuiz} className={s.btnQuizTop}>
              <Icon name="zap" size={13} color="var(--ink)" w={2} />
              Take Quiz
              <Icon name="arrowRight" size={13} color="var(--ink)" w={2} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className={s.main}>
        <div className={s.mainWrap}>

          {/* Breadcrumb */}
          <nav className={s.breadcrumb}>
            <button onClick={() => navigate(`/category/${categoryId}`)} className={s.breadcrumbBack}>
              <Icon name="arrowLeft" size={13} color="var(--text-3)" />
              {sim.category}
            </button>
            <span className={s.breadcrumbSep}>/</span>
            <span className={s.breadcrumbCurrent}>{sim.title}</span>
            <span className={s.breadcrumbSep}>/</span>
            <span className={s.breadcrumbCurrent}>Learn</span>
          </nav>

          {/* Hero */}
          <div className={s.hero}>
            <div className={s.eyebrow}>
              <div className={s.eyebrowDot} />
              Module · {sim.category}
            </div>
            <h1 className={s.heroTitle}>{sim.title}</h1>
            <div className={s.heroMeta}>
              <span className={s.metaPill + ' ' + s.pillCat}>{sim.category}</span>
              <span className={s.metaPill + ' ' + s.pillDiff} style={{ color: diffColor, background: diffColor + '14', borderColor: diffColor + '30' }}>
                {sim.difficulty}
              </span>
              <span className={s.metaPill + ' ' + s.pillTime}>{content.readTime}</span>
            </div>
          </div>

          {/* Sections */}
          <div className={s.sections}>

            {/* How it works */}
            <section className={s.section}>
              <div className={s.sectionLabel}>
                <Icon name="bookOpen" size={13} color="var(--text-3)" w={1.5} />
                How this scam works
                <div className={s.sectionLabelLine} />
              </div>
              <div className={s.prose}>
                {content.howItWorks.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Red flags */}
            <section className={s.section}>
              <div className={s.sectionLabel}>
                <Icon name="alert" size={13} color="var(--text-3)" w={1.5} />
                Red flags to watch for
                <div className={s.sectionLabelLine} />
              </div>
              <div className={s.redFlagsList}>
                {content.redFlags.map((flag, i) => (
                  <div key={i} className={s.redFlagItem}>
                    <div className={s.redFlagIcon}>
                      <Icon name="alert" size={11} color="#C94E4E" w={2} />
                    </div>
                    <span className={s.redFlagText}>{flag}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What to do */}
            <section className={s.section}>
              <div className={s.sectionLabel}>
                <Icon name="check" size={13} color="var(--text-3)" w={1.5} />
                What to do if this happens
                <div className={s.sectionLabelLine} />
              </div>
              <div className={s.stepsList}>
                {content.whatToDo.map((item, i) => (
                  <div key={i} className={s.stepItem}>
                    <div className={s.stepNum}>{i + 1}</div>
                    <div className={s.stepText}>
                      <strong>{item.step}</strong> — {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools & links */}
            <section className={s.section}>
              <div className={s.sectionLabel}>
                <Icon name="link" size={13} color="var(--text-3)" w={1.5} />
                Useful tools &amp; links
                <div className={s.sectionLabelLine} />
              </div>
              <div className={s.toolsList}>
                {content.tools.map((tool, i) => (
                  <a key={i} href={tool.url} target="_blank" rel="noreferrer" className={s.toolItem}>
                    <div className={s.toolIconWrap}>
                      <Icon name="link" size={14} color="var(--info)" w={1.8} />
                    </div>
                    <div className={s.toolInfo}>
                      <div className={s.toolName}>{tool.name}</div>
                      <div className={s.toolDesc}>{tool.desc}</div>
                    </div>
                    <div className={s.toolArrow}>
                      <Icon name="arrowRight" size={14} color="var(--text-3)" w={1.5} />
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>

          {/* CTA bar */}
          <div className={s.ctaBar}>
            <div className={s.ctaLeft}>
              <div className={s.ctaTitle}>Ready to test your knowledge?</div>
              <div className={s.ctaDesc}>5 questions · ~2 minutes · Earn up to {sim.xp ? Math.round(sim.xp * 0.66) : 40} XP</div>
            </div>
            <button onClick={goToQuiz} className={s.btnQuizCta}>
              <Icon name="zap" size={14} color="var(--ink)" w={2} />
              Take the Quiz
              <Icon name="arrowRight" size={14} color="var(--ink)" w={2} />
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}
