import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import s from './SimulationPlayerPage.module.css'

/* ─── SVG Icons (consistent with full app) ─── */
const paths = {
  shield:      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  arrowLeft:   <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  xCircle:     <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
  alertTri:    <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  award:       <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  zap:         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  rotCcw:      <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.65"/></>,
  bookOpen:    <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  chevRight:   <polyline points="9 18 15 12 9 6"/>,
  lock:        <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  info:        <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  user:        <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  logOut:      <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  target:      <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  clock:       <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  shield2:     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
}

function Icon({ name, size = 18, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   SIMULATION CONTENT DATABASE
   Structure per sim:
     title, category, difficulty, xp
     steps[] → { id, situation, choices[] }
     choices → { id, text, isCorrect, consequence, tip, terminalState? }
     terminalState: if true, simulation ends here (no further steps after consequence)
   ══════════════════════════════════════════════════════════ */
const SIMULATIONS = {

  /* ── FINANCIAL SECURITY ── */
  'fs-s-1': {
    title: 'The UPI Refund Trick',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 50,
    steps: [
      {
        id: 1,
        situation: `You receive a UPI payment of ₹500 from an unknown number. Minutes later, the same person calls you and says:\n\n"Sir, I accidentally sent you money. It was meant for my mother. Can you please scan this QR code to send it back?"\n\nHe sounds genuinely distressed. The ₹500 is sitting in your account.`,
        choices: [
          {
            id: 'a', text: 'Scan the QR code and send the ₹500 back — it seems like the right thing to do.',
            isCorrect: false,
            consequence: 'You scan the QR code. Instead of sending ₹500, your UPI app asks you to enter your PIN to authorise a payment of ₹12,000. You realise too late — a QR code for "receiving" money does not exist. All QR codes on UPI are payment requests. You have just authorised a ₹12,000 transfer. The scammer disconnects.',
            tip: 'A QR code on UPI always initiates a payment FROM you — never to you. Anyone asking you to "scan to receive" is running a well-known scam. If you genuinely want to return money, use the sender\'s UPI ID directly.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Send the money back using his UPI ID directly — without scanning anything.',
            isCorrect: true,
            consequence: 'Good thinking. You transfer the ₹500 using his UPI ID directly. However, a few days later, you realise the original ₹500 was sent using a stolen bank account. The actual victim may now dispute the transaction with their bank.',
            tip: 'Even the "safe" choice here has a risk. The ideal response to unexpected inbound payments is to not act immediately — wait 24–48 hours, or contact your bank to reverse the transaction through official channels. Never scan a QR code to return money.',
          },
          {
            id: 'c', text: 'Tell him you will contact your bank and ask them to reverse it — hang up.',
            isCorrect: true,
            consequence: 'This is the safest response. You contact your bank, explain the situation, and request a transaction reversal. The bank handles it through proper channels. The scammer never gets an opportunity to exploit you.',
            tip: 'Unexpected inbound payments are sometimes used to initiate scam cycles. Always let your bank handle reversals. Never scan a QR code on behalf of a stranger.',
          },
        ],
      },
      {
        id: 2,
        situation: `Two days later, a different number calls. The caller says he is from your bank's "UPI Fraud Division" and that your account has been flagged for suspicious activity related to the ₹500 incident.\n\nHe says: "To protect your account, I need to verify your identity. Please share your registered mobile OTP — it will only be used for internal verification."`,
        choices: [
          {
            id: 'a', text: 'Share the OTP — you want the issue cleared quickly.',
            isCorrect: false,
            consequence: 'The moment you read out the OTP, the caller uses it to authorise a ₹45,000 transfer from your account. Your bank will later confirm: they never called you. This was a follow-up scam targeting people who were already involved in a UPI dispute.',
            tip: 'Banks never ask for OTPs over a phone call — for any reason. An OTP is a One-Time Password. The moment you share it with anyone, you authorise whatever transaction it was generated for.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Refuse to share the OTP and hang up. Call the bank\'s official number yourself to verify.',
            isCorrect: true,
            consequence: 'You hang up and call the official number on the back of your debit card. The bank confirms no such call was made. You report the scam attempt. Your account remains safe.',
            tip: 'If you receive a call from someone claiming to be your bank, hang up and call the bank yourself using the number on their official website or card. Never trust incoming calls, even if they seem to know your details.',
          },
        ],
      },
    ],
  },

  'fs-s-3': {
    title: 'College Fest Ticket Fraud',
    category: 'Financial Security',
    difficulty: 'Intermediate',
    xp: 80,
    steps: [
      {
        id: 1,
        situation: `You see an Instagram post from an account called "@festpass_official" offering tickets to a popular inter-college fest at 40% discount. The account has 2,400 followers and several positive comments like "Got my tickets! Legit seller 🔥".\n\nThe DM price: ₹400 for a pair. Original price is ₹700. They ask for payment via UPI before sending the e-ticket PDF.`,
        choices: [
          {
            id: 'a', text: 'Pay ₹400 via UPI — the account looks active and has reviews.',
            isCorrect: false,
            consequence: 'You pay. The seller sends a PDF that looks exactly like the official ticket. On the day of the fest, security scans your ticket — it is a duplicate. At least 15 others are holding the same QR code. You are denied entry. The Instagram account is deleted by morning.',
            tip: 'Scam accounts on Instagram buy followers and post fake comments to appear legitimate. Always buy event tickets from the official website or college\'s verified social media account. Discounts from unknown sellers are almost always fraudulent.',
          },
          {
            id: 'b', text: 'Ask the seller for a video call showing physical tickets before paying.',
            isCorrect: true,
            consequence: 'The seller initially agrees but goes silent. After an hour, they say their "camera is broken" and offer a 10% additional discount instead. This is a clear deflection tactic.',
            tip: 'Good instinct. Any legitimate seller can verify identity. Resistance to video verification is a red flag. Proceed to the next step carefully.',
          },
          {
            id: 'c', text: 'Ignore it — look for tickets only on the official college event website.',
            isCorrect: true,
            consequence: 'You find the official ticket link on the college\'s verified Instagram page and buy directly. You pay ₹700 for a confirmed, genuine ticket. No risk, no regrets.',
            tip: 'The right call. For events, always start with the official source — official website, verified social handle, or authorised outlets. Discounts are never worth the risk of fraud.',
          },
        ],
      },
      {
        id: 2,
        situation: `You decided to ask for verification and the seller refused. Now they message again:\n\n"Bro I only have 3 pairs left. Other people are asking. If you don't pay in the next 10 minutes I'm giving it to them. Your loss."\n\nYou want to attend the fest. Time pressure is making you anxious.`,
        choices: [
          {
            id: 'a', text: 'Pay quickly before the "last 3 pairs" are gone.',
            isCorrect: false,
            consequence: 'The artificial urgency worked exactly as the scammer intended. You pay. The tickets are fake. The seller disappears. The "10-minute deadline" and "only 3 left" were pressure tactics designed to stop you from thinking clearly.',
            tip: 'Urgency and scarcity are the two most commonly used manipulation tactics in fraud. Any seller who creates a "pay now or lose it" situation is trying to prevent you from making a careful decision. Real sellers do not need to pressure you.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Walk away entirely. The red flags are too many.',
            isCorrect: true,
            consequence: 'You close the chat. You buy a ticket from the official source the next day at full price. At the fest, you later hear from friends that several people fell for the same scam. You made the right call.',
            tip: 'Artificial time pressure is a manipulation tool. When a seller rushes you, it is always better to walk away than to risk being defrauded. A real deal will still exist tomorrow.',
          },
        ],
      },
    ],
  },

  'fs-p-1': {
    title: 'Business Email Invoice Swap',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 60,
    steps: [
      {
        id: 1,
        situation: `Your accounts team receives an email from "invoicing@techsupply-india.com" — a vendor you have worked with for two years. The email reads:\n\n"Please note our bank account details have changed effective this month. Please update your records and process the pending invoice of ₹2,80,000 to the new account: HDFC XXXX4821 (Techsupply Solutions Pvt Ltd)."\n\nThe email signature, logo, and formatting look identical to previous emails from this vendor.`,
        choices: [
          {
            id: 'a', text: 'Update the bank details and process the payment — the email looks legitimate.',
            isCorrect: false,
            consequence: 'The payment is processed to the new account. Three days later, the real vendor follows up asking why payment has not arrived. A comparison of email headers reveals the domain was "techsupply-india.com" — your actual vendor uses "techsupply-india.in". One character difference. ₹2,80,000 is unrecoverable.',
            tip: 'This is called a Business Email Compromise (BEC) attack. Attackers register lookalike domains and mirror legitimate email signatures exactly. Always verify bank detail change requests by calling the vendor on a known phone number — never one provided in the suspicious email.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Call the vendor on their registered phone number to verbally confirm the account change.',
            isCorrect: true,
            consequence: 'You call the vendor\'s finance team using the number from your original contract — not the one in the email. They are confused. They have not sent any such email and have not changed their bank account. You have just prevented a ₹2,80,000 fraud.',
            tip: 'Any request to change payment details must be verified through a completely separate communication channel — a phone call to a pre-verified number. Email alone is never sufficient to authorise a payment detail change.',
          },
          {
            id: 'c', text: 'Reply to the email asking them to confirm the change in writing again.',
            isCorrect: false,
            consequence: 'The attacker replies immediately with a convincing confirmation and an official-looking letterhead attachment. You process the payment. It reaches the fraudster\'s account. Replying to the same compromised email channel confirms nothing — the attacker controls that inbox.',
            tip: 'Replying to the same email asking for "confirmation" is ineffective because you are still communicating with the attacker. Always verify through a separate, pre-established channel like a phone call.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: `You called and confirmed it was fraud. The vendor is grateful. Now your manager asks you to investigate how the attacker knew about the pending invoice amount of exactly ₹2,80,000 — a figure that was never in any public document.`,
        choices: [
          {
            id: 'a', text: 'Someone in the company likely leaked the information intentionally.',
            isCorrect: false,
            consequence: 'This assumption is premature without investigation. While insider threats exist, the more likely explanation involves technical compromise — not necessarily a human leak.',
            tip: 'Before assuming malicious insider activity, investigate technical vectors first. Jumping to conclusions can damage team trust unnecessarily.',
          },
          {
            id: 'b', text: 'The attacker likely had access to one of your email accounts or the vendor\'s email account.',
            isCorrect: true,
            consequence: 'IT investigation reveals that the vendor\'s email account was compromised weeks earlier. The attacker had been silently reading their emails — including invoices sent to your company — waiting for the right moment to intercept a large payment.',
            tip: 'This attack pattern is called "email thread hijacking." Attackers monitor compromised inboxes for months before striking. This is why all accounts should have two-factor authentication enabled and suspicious login alerts turned on.',
          },
        ],
      },
    ],
  },

  'fs-e-1': {
    title: 'The KYC Expiry Call',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 50,
    steps: [
      {
        id: 1,
        situation: `You receive a phone call. The caller introduces himself as "Ramesh Kumar, KYC Verification Officer from SBI." He says:\n\n"Your account KYC has expired. As per RBI guidelines, your account will be blocked within 24 hours unless you complete re-verification. I will guide you through the process right now. First, please tell me your registered mobile number."`,
        choices: [
          {
            id: 'a', text: 'Give him your registered mobile number — it seems like a routine verification.',
            isCorrect: false,
            consequence: 'You share your number. He then asks for your account number "to pull up your records," then your date of birth "to confirm identity." Each piece of information he collects makes the next request seem more legitimate. Within minutes, he has enough to attempt account takeover.',
            tip: 'This is called a "pretext call." Scammers build legitimacy step by step — each small piece of information you give makes the next request feel safer. Banks never initiate KYC through unsolicited phone calls. All KYC processes happen through the bank\'s official app, website, or branch.',
          },
          {
            id: 'b', text: 'Tell him you will visit the branch in person for any KYC update and hang up.',
            isCorrect: true,
            consequence: 'You hang up and visit your branch. The staff confirm your KYC is perfectly valid and no such call was authorised by the bank. The branch manager notes your report and advises other customers.',
            tip: 'This is the right response every time. KYC renewals, if genuinely required, are communicated through official bank letters, app notifications, or in-branch notices — never through unsolicited phone calls asking for personal details.',
          },
          {
            id: 'c', text: 'Ask him for his employee ID and the bank\'s official helpline number, then verify.',
            isCorrect: true,
            consequence: 'He gives you an "employee ID" and a phone number. You hang up and call SBI\'s official number (1800-11-2211) instead. The bank confirms no such call was made and the number he gave you is not theirs. You have successfully identified and avoided a fraud attempt.',
            tip: 'Asking for employee ID is a good instinct — but always verify by calling the bank\'s official number yourself, not one given to you by the caller. Official numbers are printed on your passbook, debit card, or the bank\'s official website.',
          },
        ],
      },
      {
        id: 2,
        situation: `A week later, your neighbour tells you she received the same call but shared her account number and Aadhaar number before getting suspicious. She asks what she should do now.`,
        choices: [
          {
            id: 'a', text: 'Tell her not to worry — sharing account number and Aadhaar alone cannot cause harm.',
            isCorrect: false,
            consequence: 'This is incorrect advice. While an account number and Aadhaar alone may not immediately drain an account, they can be combined with social engineering in follow-up calls to extract OTPs or additional information that enables fraud.',
            tip: 'Never minimise a data exposure. Any combination of personal information in a scammer\'s hands is a risk. Always err on the side of reporting and taking precautionary action.',
          },
          {
            id: 'b', text: 'Advise her to call her bank immediately, request an account alert setup, and file a complaint on cybercrime.gov.in.',
            isCorrect: true,
            consequence: 'She calls her bank, who places additional security on her account and sets up transaction alerts. She also files a complaint on the National Cybercrime Reporting Portal. No fraudulent transactions occur. Prompt action protected her.',
            tip: 'After any data exposure: (1) Inform your bank immediately. (2) Enable all transaction alerts. (3) File a report on cybercrime.gov.in or call 1930 (National Cybercrime Helpline). Speed matters — act within hours, not days.',
          },
        ],
      },
    ],
  },

  /* ── PHISHING & EMERGING THREATS ── */
  'pe-s-1': {
    title: 'University Login Page Clone',
    category: 'Phishing & Emerging Threats',
    difficulty: 'Beginner',
    xp: 50,
    steps: [
      {
        id: 1,
        situation: `Your college WhatsApp group receives a forwarded message:\n\n"URGENT: Fee payment portal updated. All students must re-verify their login by 5 PM today to avoid deregistration. Link: http://srm-portal-verify.in/login"\n\nYou click the link. It opens a page that looks exactly like your college portal — same logo, same layout, same colours.`,
        choices: [
          {
            id: 'a', text: 'Enter your student ID and password to re-verify.',
            isCorrect: false,
            consequence: 'You enter your credentials. The page shows "Verification successful — redirecting..." and then loads the real college portal. You think nothing of it. But your username and password were just submitted to a server in another country. Within hours, your account is used to access your fee receipts, personal address, and contact details.',
            tip: 'Phishing pages are designed to redirect you to the real site after stealing credentials — so you don\'t notice anything wrong. Always check the URL bar before entering any login details. "srm-portal-verify.in" is not your college\'s domain.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Check the URL in the browser address bar before entering anything.',
            isCorrect: true,
            consequence: 'You look at the address bar. The URL reads "srm-portal-verify.in" — not your actual college domain. The padlock icon is present, but that only means the connection is encrypted — it does not mean the site is legitimate. You close the tab.',
            tip: 'HTTPS and the padlock icon only confirm encryption, not authenticity. Any site can obtain an SSL certificate. The only thing that confirms legitimacy is the domain name itself — and it must match exactly what your institution uses officially.',
          },
          {
            id: 'c', text: 'Forward the message to more classmates so they can re-verify too.',
            isCorrect: false,
            consequence: 'You forward it to two other groups. Now 140 more students have seen the link. Several enter their credentials. You have unintentionally amplified a phishing attack. The scammer\'s reach expands without any additional effort from them.',
            tip: 'Never forward unverified links — especially urgent-sounding ones. Even if you don\'t click them yourself, forwarding them makes you an unwitting participant in the attack. Always verify with a trusted source before sharing.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: `You avoided the trap and reported it to the college IT helpdesk. They thank you and ask: "How can other students verify if a link is safe before clicking?"\n\nYou want to give them a clear, accurate answer.`,
        choices: [
          {
            id: 'a', text: 'If the site has HTTPS and a padlock, it is safe to enter credentials.',
            isCorrect: false,
            consequence: 'This is a dangerous misconception. HTTPS confirms the connection is encrypted — it does not confirm the site is who it claims to be. Phishing sites routinely use HTTPS. This advice would put students at risk.',
            tip: 'HTTPS = encrypted connection. It does not mean "safe" or "legitimate." Phishing sites have used HTTPS for years. Domain name accuracy is the key check, not the padlock.',
          },
          {
            id: 'b', text: 'Check the full domain name carefully, navigate directly to the college website instead of clicking links, and verify urgent notices through official channels.',
            isCorrect: true,
            consequence: 'The IT team incorporates your suggestion into a cybersecurity awareness notice sent to all students. Three additional phishing attempts targeting the college that semester are reported and shut down quickly because students are now checking URLs.',
            tip: 'The three habits that prevent most phishing: (1) Never click links in messages — type the address directly. (2) Check the full domain name carefully for subtle misspellings. (3) Verify urgent notices through an independent official source before acting.',
          },
        ],
      },
    ],
  },

  'pe-p-2': {
    title: 'DocuSign Phishing Lure',
    category: 'Phishing & Emerging Threats',
    difficulty: 'Intermediate',
    xp: 80,
    steps: [
      {
        id: 1,
        situation: `You receive an email from "docusign-notifications@docu-sign-secure.com" with the subject "Action Required: Contract Renewal — Please Sign by EOD".\n\nThe email has the DocuSign logo, a yellow "Review Document" button, and says the document requires your digital signature. It notes that your Microsoft 365 credentials will be used to verify your identity before signing.`,
        choices: [
          {
            id: 'a', text: 'Click "Review Document" and enter your Microsoft 365 credentials to proceed.',
            isCorrect: false,
            consequence: 'The link opens a convincing Microsoft login page. You enter your email and password. The page then asks for your authenticator code. You enter it. The attacker now has your credentials and, having used them within the 30-second window, has full access to your Microsoft 365 account — email, Teams, SharePoint, and OneDrive.',
            tip: 'DocuSign never requires your Microsoft or Google credentials to view a document. Legitimate document signing uses its own authentication. Any service asking for credentials from a different platform is phishing.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Examine the sender\'s email domain before doing anything.',
            isCorrect: true,
            consequence: 'You look at the full sender address: "docu-sign-secure.com." DocuSign\'s actual domain is "docusign.com." The hyphens and "secure" addition are classic domain spoofing tactics. You do not click the link.',
            tip: 'Attackers register domains that look similar to trusted brands: "paypa1.com", "amaz0n-support.in", "docu-sign-secure.com". Always examine the full domain, not just the display name. The display name can say anything — the domain is what matters.',
          },
        ],
      },
      {
        id: 2,
        situation: `You identified it as phishing and did not click. You now need to decide what to do with this email. Your IT security team has asked all employees to report suspicious emails, but you are also not sure if others have already received it.`,
        choices: [
          {
            id: 'a', text: 'Delete the email and move on — you already avoided it.',
            isCorrect: false,
            consequence: 'Two colleagues in your team receive the same email the next day and one of them enters their credentials. A formal investigation later reveals the email campaign targeted your entire organisation. Early reporting could have triggered a company-wide alert.',
            tip: 'Deleting a phishing email without reporting it is a missed opportunity to protect your colleagues. Reporting it allows IT to block the domain, warn others, and investigate whether anyone was already compromised.',
          },
          {
            id: 'b', text: 'Forward it to IT security with a note about the suspicious domain, without clicking any links in it.',
            isCorrect: true,
            consequence: 'IT blocks the sending domain within the hour and sends a company-wide alert. Three employees who had received the email but not yet opened it are protected. Your report is noted as a successful threat identification.',
            tip: 'Always report phishing attempts to your IT/security team. Do not click any links in the email, even to "investigate." Forward as an attachment if possible, or note the sender domain and subject line. Speed of reporting determines how many people are protected.',
          },
        ],
      },
    ],
  },

  /* ── MALWARE & DEVICE SAFETY ── */
  'md-p-2': {
    title: 'Ransomware: File Lockdown',
    category: 'Malware & Device Safety',
    difficulty: 'Intermediate',
    xp: 90,
    steps: [
      {
        id: 1,
        situation: `A colleague opens an email attachment labelled "Q4_Invoice_Final.docx" sent from an external address. Within minutes, a message appears on their screen:\n\n"YOUR FILES HAVE BEEN ENCRYPTED. Pay 0.5 BTC to [wallet address] within 48 hours or your data will be permanently deleted. Do not restart. Do not contact authorities."\n\nYou are the first person to notice. Your colleague is panicking. Their system is on the company network.`,
        choices: [
          {
            id: 'a', text: 'Pay the ransom immediately to recover the files before the deadline.',
            isCorrect: false,
            consequence: 'You advise paying. The IT manager is notified too late. The payment is made in Bitcoin — untraceable. Files are not recovered. Paying ransomware provides no guarantee of decryption and signals to attackers that your organisation pays, making you a future target.',
            tip: 'Law enforcement agencies globally advise against paying ransomware. Payment does not guarantee file recovery, funds criminal operations, and marks your organisation as a "paying victim" for future attacks. Always isolate, report, and recover from backups instead.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Immediately disconnect their machine from the network — unplug the ethernet cable or turn off Wi-Fi.',
            isCorrect: true,
            consequence: 'You disconnect the machine from the network within 90 seconds of detection. IT confirms that ransomware typically needs network access to encrypt files on shared drives and propagate to other machines. Your quick action limited the infection to a single device.',
            tip: 'Isolation is the single most critical step in a ransomware incident. Every second the infected machine stays on the network, more files — including shared drives — are at risk. Physical disconnection (not just disabling Wi-Fi via software) is the fastest method.',
          },
          {
            id: 'c', text: 'Restart the machine to clear the ransomware from memory.',
            isCorrect: false,
            consequence: 'Restarting triggers the ransomware\'s secondary payload, which finishes encrypting remaining files before the OS loads. The ransom note is now set as the desktop wallpaper on every reboot. The attacker\'s note specifically said not to restart — because a partial restart window is their one vulnerability.',
            tip: 'Never restart a ransomware-infected machine without expert guidance. Some ransomware strains use the reboot window to complete encryption. Others install bootloaders that activate during restart. Isolation without restart is the correct first response.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: `The machine is isolated. IT has been notified. Now the IT manager asks you: "We have a full backup from last Tuesday. The infected machine has 3 days of new work. How should we proceed?"`,
        choices: [
          {
            id: 'a', text: 'Restore from the Tuesday backup, accept the 3-day data loss, and wipe the infected machine.',
            isCorrect: true,
            consequence: 'The machine is wiped, reimaged, and restored from the clean backup. Three days of work are lost but all other company data is intact. IT also patches the vulnerability that allowed the macro to execute and conducts a phishing awareness session for all staff.',
            tip: 'Restoring from a clean backup is the standard recovery path for ransomware. Data loss is unfortunate but recoverable. This outcome reinforces why regular, offline or air-gapped backups are a non-negotiable security control for any organisation.',
          },
          {
            id: 'b', text: 'Try to decrypt the files using a free decryption tool found online before restoring.',
            isCorrect: false,
            consequence: 'The "free decryption tool" found via a search engine is itself malware — a second infection layered on top of the first. IT now has two incidents to contain. The legitimate decryption tools on nomoreransom.org were not checked first.',
            tip: 'If decryption tools are needed, use only those from nomoreransom.org — the official joint initiative by Europol, Interpol, and cybersecurity firms. Never download tools from random search results. In most cases, restoring from backups is faster and safer than seeking decryption.',
          },
        ],
      },
    ],
  },

  'md-e-1': {
    title: 'Fake Tech Support Pop-up',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 50,
    steps: [
      {
        id: 1,
        situation: `You are browsing a recipe website when suddenly the entire browser fills with a red warning screen. A loud alarm sound plays. The screen reads:\n\n"CRITICAL ALERT: Your computer has been infected with a dangerous virus. Your personal files, banking passwords, and photos are at risk. Call Microsoft Support immediately: 1800-XXX-XXXX. DO NOT CLOSE THIS WINDOW."\n\nYour computer seems fine — it is working normally — but the sound is alarming.`,
        choices: [
          {
            id: 'a', text: 'Call the number on the screen immediately — your computer might really be infected.',
            isCorrect: false,
            consequence: 'You call the number. A polite, English-speaking "technician" answers. He asks you to install a remote access app called AnyDesk "to diagnose the issue." Once installed, he takes control of your computer, opens your banking website, and drains your account while keeping you talking on the phone.',
            tip: 'Microsoft, Windows, and antivirus companies never display emergency phone numbers inside a browser window. This is called a "tech support scam pop-up." The alarm, the red screen, and the urgency are all fake — designed to panic you into calling a fraudster.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Close the browser using Task Manager (Ctrl + Shift + Esc) since the window won\'t close normally.',
            isCorrect: true,
            consequence: 'You press Ctrl + Shift + Esc, find the browser in the list, and click "End Task." The alarming screen disappears. Your computer is completely fine. The website you visited was running a script that made it full-screen and played sounds — it had no actual access to your computer.',
            tip: 'Tech support scam pop-ups make it hard to close the browser window using the normal X button. Task Manager always works. After closing, avoid revisiting that website. You may also run a scan with Windows Defender (pre-installed and free) for peace of mind.',
          },
          {
            id: 'c', text: 'Turn off the computer immediately to stop the virus.',
            isCorrect: false,
            consequence: 'Turning off the computer does stop the alarm — but when you turn it back on and open the browser, it may reopen the same page (browser session restore). The "virus" was never on your computer — it was just a webpage script. Turning off the computer is unnecessary and does not address the root cause.',
            tip: 'The pop-up is a webpage, not a virus. Closing the browser is sufficient. If the browser tries to restore the session when reopened, decline the restoration, or clear browsing history and cache.',
          },
        ],
      },
      {
        id: 2,
        situation: `You safely closed the browser. Your daughter is visiting and tells you her friend installed something called "AnyDesk" after a similar pop-up and gave a stranger control of their laptop. She asks if there is anything her friend can do now.`,
        choices: [
          {
            id: 'a', text: 'The laptop is already compromised — there is nothing to do except buy a new one.',
            isCorrect: false,
            consequence: 'This is incorrect and unnecessarily alarming. The situation is serious but recoverable with the right steps. Buying a new laptop without addressing the core issue does not help if the banking credentials were already stolen.',
            tip: 'A compromised device does not require replacement — it requires proper remediation. The priority is protecting financial accounts, then cleaning the device.',
          },
          {
            id: 'b', text: 'Immediately change all passwords and banking PINs from a different, clean device, contact the bank, uninstall AnyDesk, and run a full antivirus scan.',
            isCorrect: true,
            consequence: 'The friend follows these steps. Bank account alerts are enabled immediately. The IT cell at school helps clean the laptop. No financial loss occurs because the passwords were changed before any fraudulent transactions could be completed.',
            tip: 'After a remote access compromise: (1) Change all passwords from a different device immediately. (2) Call your bank and enable transaction alerts or freeze the account temporarily. (3) Uninstall the remote access tool. (4) Run a full scan with Windows Defender or a trusted antivirus. (5) Report to cybercrime.gov.in.',
          },
        ],
      },
    ],
  },

  /* ── IDENTITY & IMPERSONATION ── */
  'ii-p-3': {
    title: 'Deep Fake Voice Call',
    category: 'Identity & Impersonation',
    difficulty: 'Advanced',
    xp: 100,
    steps: [
      {
        id: 1,
        situation: `You receive a WhatsApp voice call from your manager\'s saved number. The voice sounds exactly like him:\n\n"Hey, I\'m in an important client meeting and my laptop died. I need you to urgently transfer ₹85,000 to a vendor — it\'s for a last-minute software licence or the deal falls through today. I\'ll sort the paperwork when I\'m back. I\'ll send you the account details on this chat now."\n\nThe account details arrive in the same chat. The voice genuinely sounds like your manager.`,
        choices: [
          {
            id: 'a', text: 'Process the transfer — your manager\'s voice and number both check out.',
            isCorrect: false,
            consequence: 'The transfer is processed. Your real manager calls on his office landline two hours later asking about a different matter. You mention the transfer. He has no knowledge of it. His WhatsApp was cloned by a scammer who used 15 seconds of his public conference speech to synthesise his voice with AI. ₹85,000 is unrecoverable.',
            tip: 'AI voice cloning can now replicate any voice from as little as 3 seconds of audio. Any public speech, podcast appearance, or social media video is sufficient source material. A familiar voice on a phone call is no longer a reliable form of identity verification.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Tell him you will process it but need to quickly verify through the company\'s internal finance protocol — hang up and call his office number.',
            isCorrect: true,
            consequence: 'You call his direct office number. He answers immediately — he is in a meeting but has his laptop open. He has no idea what you are talking about. His WhatsApp account was compromised. You report the attempt to IT security. No funds are lost.',
            tip: 'The verification step saved ₹85,000. Establish a verbal code word with your team for authorising out-of-band financial requests. Any payment request that bypasses normal approval workflows — regardless of who it appears to be from — must be verified through a separate, pre-established channel.',
          },
          {
            id: 'c', text: 'Ask him to send a photo holding a handwritten note with today\'s date before processing.',
            isCorrect: true,
            consequence: 'The caller hesitates, then says the meeting is about to resume and he\'ll sort it another way. He disconnects. A real manager would understand a verification request. The resistance to a simple verification is itself a red flag.',
            tip: 'Requesting real-time proof (a selfie with today\'s date, or answering a pre-agreed personal question) is a practical defence against voice impersonation. Any genuine requester will understand and comply. Resistance or urgency escalation is a strong indicator of fraud.',
          },
        ],
      },
      {
        id: 2,
        situation: `IT Security has been notified. They confirm the manager\'s WhatsApp was indeed compromised and the voice was AI-generated. The CISO now asks the team: "What procedural change should we implement to prevent this in the future?"`,
        choices: [
          {
            id: 'a', text: 'Ban all WhatsApp usage for company business.',
            isCorrect: false,
            consequence: 'This is impractical and does not address the underlying vulnerability. Attackers can use any communication channel — phone, email, or SMS. The problem is the lack of a verification protocol, not the specific app used.',
            tip: 'Banning apps treats the symptom, not the cause. The vulnerability is the absence of an out-of-band verification process for financial transactions — that is what needs to be fixed.',
          },
          {
            id: 'b', text: 'Implement a dual-authorisation policy: all unplanned financial transfers above a threshold require verbal confirmation from two senior employees via office landlines.',
            isCorrect: true,
            consequence: 'The policy is implemented company-wide. Two months later, a similar AI voice scam targets the finance team. The dual-authorisation protocol immediately flags it as unverifiable and the attempt is blocked without any financial loss.',
            tip: 'Dual authorisation is the gold standard for preventing social engineering-based financial fraud. No single person should be able to authorise an unplanned, out-of-policy transfer — regardless of how senior or how trusted the apparent requester appears to be.',
          },
        ],
      },
    ],
  },

  /* ── OPPORTUNITY & INVESTMENT ── */
  'oi-s-1': {
    title: 'Work-from-Home Data Entry Job',
    category: 'Opportunity & Investment',
    difficulty: 'Beginner',
    xp: 50,
    steps: [
      {
        id: 1,
        situation: `You find a Telegram channel called "EasyEarn_India" with 14,000 members. The pinned message says:\n\n"Simple work-from-home job: Rate products on Amazon. ₹500 per task. No experience needed. First task free. DM 'START' to begin."\n\nYou DM them. They assign you 5 tasks — rating some Amazon products. After completing them, they confirm: "₹2,500 earned. To withdraw, you must first complete a VIP task set with a minimum deposit of ₹2,000."`,
        choices: [
          {
            id: 'a', text: 'Deposit ₹2,000 to access the VIP tasks and withdraw your earnings.',
            isCorrect: false,
            consequence: 'You deposit ₹2,000. They assign more tasks, and your "balance" grows to ₹18,000. But each withdrawal attempt requires a higher deposit — first ₹5,000, then ₹12,000 for "tax clearance." The earnings were never real. The balance shown is fictional. You have lost ₹2,000 with nothing recoverable.',
            tip: 'This is a classic "task scam" pattern. The first tasks are free to build trust and show a growing "balance." The deposit requirement is the actual scam — you will never withdraw anything. Any platform that requires payment to access your own earnings is fraudulent.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Refuse the deposit requirement. Research the platform name before going further.',
            isCorrect: true,
            consequence: 'A Google search for "EasyEarn_India Telegram scam" returns dozens of fraud reports. You find a Reddit thread with 40 people describing the exact same deposit escalation pattern. You report the Telegram channel and exit.',
            tip: 'Searching for "[platform name] + scam" before engaging or paying is one of the most effective fraud prevention habits. Scammers rely on targets not searching. A few minutes of research prevents financial loss.',
          },
          {
            id: 'c', text: 'Ask someone in the group chat if anyone has successfully withdrawn money.',
            isCorrect: false,
            consequence: 'Several members immediately reply with "Yes I withdrew ₹15,000 last week!" with screenshots of bank transfers. These members are either paid accomplices or bots. The social proof is manufactured. You deposit ₹2,000 and lose it.',
            tip: 'Fake testimonials and manufactured social proof are standard tools in investment and task scams. Screenshots of "successful withdrawals" are trivially easy to fabricate. Never rely on group chat feedback as evidence of legitimacy.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: `You avoided the scam. A friend in your college WhatsApp group shares the same Telegram link saying "this is genuine, I made ₹3,000 already." He is excited and encouraging others to join.`,
        choices: [
          {
            id: 'a', text: 'Let him be — it is his choice, and he seems happy.',
            isCorrect: false,
            consequence: 'Your friend deposits ₹3,000 for VIP access and loses it. He then feels embarrassed and doesn\'t tell others. By the time the group realises, four more people have joined and deposited money.',
            tip: 'Staying silent when you have information that could protect someone from fraud is a missed opportunity. You don\'t need to be forceful — a simple, factual message with a link to the scam reports is enough.',
          },
          {
            id: 'b', text: 'Privately message your friend with the scam reports you found and warn him before he goes further.',
            isCorrect: true,
            consequence: 'Your friend is initially defensive but reads the reports. He realises he has earned "₹3,000" but hasn\'t actually tried to withdraw it yet. He attempts a withdrawal — it fails with a new requirement. He exits and thanks you for the warning.',
            tip: 'The "I\'ve already made money" feeling is deliberate — scammers let early tasks "succeed" to create emotional investment. Your friend\'s ₹3,000 balance was never real money. Early warning before the deposit stage is the most impactful intervention.',
          },
        ],
      },
    ],
  },

  /* ── ONLINE COMMERCE SAFETY ── */
  'oc-e-1': {
    title: 'Fake Online Medical Store',
    category: 'Online Commerce Safety',
    difficulty: 'Beginner',
    xp: 50,
    steps: [
      {
        id: 1,
        situation: `You search online for a specific medicine that is expensive at your local chemist. A website called "MediSave24.in" appears at the top of search results. The price is 60% cheaper, they offer home delivery within 24 hours, and they list "no prescription required" as a feature.\n\nYou add the medicine to the cart. Before checkout, they ask for your full name, address, phone number, Aadhaar number, and medical history "for regulatory compliance."`,
        choices: [
          {
            id: 'a', text: 'Fill in all the details and complete the purchase — the site looks professional.',
            isCorrect: false,
            consequence: 'You complete the purchase. The medicine never arrives. Worse, three weeks later, you receive calls from unknown numbers offering "health insurance" schemes — they have your medical history, Aadhaar number, and address. Your health data has been sold. You have also paid for a product you will never receive.',
            tip: 'Legitimate online pharmacies in India are registered with the State Drugs Controller and require a valid prescription for prescription medicines. "No prescription required" for regulated drugs is illegal and a clear red flag. Never share Aadhaar or medical history with unverified websites.',
            terminalState: true,
          },
          {
            id: 'b', text: 'Check if the website is registered on the government\'s online pharmacy portal before proceeding.',
            isCorrect: true,
            consequence: 'You search for "MediSave24.in" on the Central Drugs Standard Control Organisation (CDSCO) website and the State Drugs Controller portal. No registration exists. You find one review mentioning the site never delivered. You close the tab.',
            tip: 'Legitimate online pharmacies in India must be registered with the State Drugs Licensing Authority. You can verify at cdsco.gov.in. Additionally, approved online pharmacies require a doctor\'s prescription — "no prescription needed" for Rx drugs is a legal violation and a scam indicator.',
          },
          {
            id: 'c', text: 'Purchase only the medicine and skip filling in the Aadhaar and medical history fields.',
            isCorrect: false,
            consequence: 'The checkout process does not allow you to proceed without filling in all fields. You fill them in. The medicine arrives — it is an unlabelled tablet in a plain packet. There is no batch number, no expiry date, no manufacturer information. You have no way to verify what you have actually received.',
            tip: 'Even if you receive something, an unregulated pharmacy cannot guarantee the quality, dosage, or authenticity of medicines. Counterfeit medicines are a documented public health risk. The Aadhaar and health data collected is a separate exposure entirely.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: `You reported the website to the National Consumer Helpline. They ask you: where should people buy medicines online safely in India?`,
        choices: [
          {
            id: 'a', text: 'Only from large e-commerce platforms like Amazon or Flipkart.',
            isCorrect: false,
            consequence: 'This is incomplete advice. Third-party sellers on large platforms can also list unregulated or counterfeit products. Platform presence alone does not guarantee medicine authenticity or regulatory compliance.',
            tip: 'Large platforms are better than unknown websites, but they are not infallible. Regulatory registration and prescription requirements are the correct standards — not just platform reputation.',
          },
          {
            id: 'b', text: 'From pharmacies registered with their State Drugs Licensing Authority, accessible via cdsco.gov.in, and which require a valid prescription for Rx medicines.',
            isCorrect: true,
            consequence: 'Your answer is noted by the helpline and incorporated into a public advisory. The standard you described — CDSCO registration and prescription requirement — is the legally correct and safest bar for online medicine purchase in India.',
            tip: 'The three checks for safe online medicine purchase in India: (1) Check registration on cdsco.gov.in. (2) They must require a prescription for Rx drugs. (3) They must display a licensed pharmacist\'s name and registration number. All three together indicate a legitimate platform.',
          },
        ],
      },
    ],
  },
}

/* ─── Summary screen XP lookup ─── */
const SIM_XP = Object.fromEntries(
  Object.entries(SIMULATIONS).map(([id, sim]) => [id, sim.xp])
)

/* ══════════════════════════════════════════════════════════
   SUMMARY SCREEN
   ══════════════════════════════════════════════════════════ */
function SummaryScreen({ sim, decisions, onBackToCategory, categoryId }) {
  const navigate = useNavigate()
  const totalSteps = sim.steps.length
  const correctCount = decisions.filter(d => d.isCorrect).length
  const score = Math.round((correctCount / totalSteps) * 100)
  const xpEarned = Math.round((sim.xp * correctCount) / totalSteps)

  const grade =
    score === 100 ? { label: 'Perfect', color: '#2EB87A', icon: 'award' } :
    score >= 70   ? { label: 'Good',    color: '#D4891A', icon: 'checkCircle' } :
                    { label: 'Review',  color: '#C94E4E', icon: 'alertTri' }

  return (
    <div className={s.summary}>
      <div className={s.summaryCard}>
        {/* Grade badge */}
        <div className={s.gradeWrap}>
          <div className={s.gradeRing} style={{ borderColor: grade.color + '44' }}>
            <div className={s.gradeInner} style={{ color: grade.color }}>
              <Icon name={grade.icon} size={28} color={grade.color} w={1.5} />
              <span className={s.gradeLabel} style={{ color: grade.color }}>{grade.label}</span>
            </div>
          </div>
        </div>

        <h2 className={s.summaryTitle}>Simulation complete</h2>
        <p className={s.summarySimName}>{sim.title}</p>

        {/* Score row */}
        <div className={s.scoreRow}>
          <div className={s.scoreItem}>
            <span className={s.scoreNum} style={{ color: grade.color }}>{score}%</span>
            <span className={s.scoreDesc}>Score</span>
          </div>
          <div className={s.scoreDivider} />
          <div className={s.scoreItem}>
            <span className={s.scoreNum}>{correctCount}<span style={{ fontSize: 16, color: 'var(--text-3)' }}>/{totalSteps}</span></span>
            <span className={s.scoreDesc}>Correct decisions</span>
          </div>
          <div className={s.scoreDivider} />
          <div className={s.scoreItem}>
            <span className={s.scoreNum} style={{ color: '#D4891A' }}>+{xpEarned}</span>
            <span className={s.scoreDesc}>XP earned</span>
          </div>
        </div>

        {/* Decision review */}
        <div className={s.decisionReview}>
          <h3 className={s.decisionReviewTitle}>Your decisions</h3>
          {decisions.map((d, i) => (
            <div key={i} className={`${s.decisionItem} ${d.isCorrect ? s.decisionOk : s.decisionBad}`}>
              <div className={s.decisionIcon}>
                <Icon
                  name={d.isCorrect ? 'checkCircle' : 'xCircle'}
                  size={15}
                  color={d.isCorrect ? '#2EB87A' : '#C94E4E'}
                  w={2}
                />
              </div>
              <div className={s.decisionText}>
                <span className={s.decisionStep}>Step {i + 1}</span>
                <span className={s.decisionChoice}>{d.choiceText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className={s.summaryActions}>
          <button className={s.btnBack} onClick={onBackToCategory}>
            <Icon name="arrowLeft" size={14} />
            Back to {sim.category}
          </button>
          <button className={s.btnRetake} onClick={() => navigate(0)}>
            <Icon name="rotCcw" size={14} />
            Retake simulation
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN SIMULATION PLAYER
   ══════════════════════════════════════════════════════════ */
export default function SimulationPlayerPage() {
  const { simId } = useParams()
  const navigate = useNavigate()

  const sim = SIMULATIONS[simId]

  // State
  const [stepIndex, setStepIndex]         = useState(0)
  const [chosenId, setChosenId]           = useState(null)   // chosen choice id for current step
  const [decisions, setDecisions]         = useState([])     // array of all decisions made
  const [showConsequence, setShowConsequence] = useState(false)
  const [isComplete, setIsComplete]       = useState(false)

  const consequenceRef = useRef(null)

  // Derive category id from sim metadata for back navigation
  const categoryRouteMap = {
    'Financial Security':          'financial-security',
    'Identity & Impersonation':    'identity-impersonation',
    'Malware & Device Safety':     'malware-device-safety',
    'Online Commerce Safety':      'online-commerce-safety',
    'Phishing & Emerging Threats': 'phishing-emerging-threats',
    'Opportunity & Investment':    'opportunity-investment',
  }
  const categoryId = sim ? categoryRouteMap[sim.category] : null

  // Scroll to consequence after it appears
  useEffect(() => {
    if (showConsequence && consequenceRef.current) {
      setTimeout(() => {
        consequenceRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 80)
    }
  }, [showConsequence])

  if (!sim) {
    return (
      <div className={s.notFound}>
        <Icon name="alertTri" size={32} color="var(--text-3)" />
        <p>Simulation not found.</p>
        <button onClick={() => navigate(-1)} className={s.btnBack}>
          <Icon name="arrowLeft" size={14} /> Go back
        </button>
      </div>
    )
  }

  const currentStep = sim.steps[stepIndex]
  const chosen = chosenId ? currentStep.choices.find(c => c.id === chosenId) : null

  function handleChoiceSelect(choice) {
    if (chosenId) return // locked — already chosen
    setChosenId(choice.id)
    setShowConsequence(true)
    setDecisions(prev => [...prev, {
      stepId: currentStep.id,
      choiceText: choice.text,
      isCorrect: choice.isCorrect,
    }])
  }

  function handleContinue() {
    // If this choice was a terminal state OR it's the last step → end simulation
    if (chosen.terminalState || stepIndex === sim.steps.length - 1) {
      // TODO: POST /api/progress/complete { simulation_id: simId, xp: calculated }
      setIsComplete(true)
      return
    }
    // Advance to next step
    setStepIndex(i => i + 1)
    setChosenId(null)
    setShowConsequence(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBackToCategory() {
    navigate(`/category/${categoryId}`)
  }

  const DIFF_COLORS = {
    Beginner:     '#2EB87A',
    Intermediate: '#D4891A',
    Advanced:     '#C94E4E',
  }
  const diffColor = DIFF_COLORS[sim.difficulty] || 'var(--amber)'

  // ── SUMMARY SCREEN ──
  if (isComplete) {
    return (
      <div className={s.root}>
        <div className={s.noiseBg} aria-hidden />
        <TopBar onBack={handleBackToCategory} />
        <SummaryScreen
          sim={sim}
          decisions={decisions}
          onBackToCategory={handleBackToCategory}
          categoryId={categoryId}
        />
      </div>
    )
  }

  // ── SIMULATION PLAYER ──
  return (
    <div className={s.root}>
      <div className={s.noiseBg} aria-hidden />
      <div className={s.ambientRight} aria-hidden />

      <TopBar onBack={handleBackToCategory} />

      <main className={s.main}>
        <div className={s.mainWrap}>

          {/* ── Sim meta header ── */}
          <div className={s.simHeader}>
            <div className={s.simHeaderLeft}>
              <nav className={s.breadcrumb}>
                <button onClick={handleBackToCategory} className={s.breadcrumbBack}>
                  <Icon name="arrowLeft" size={13} color="var(--text-3)" />
                  {sim.category}
                </button>
                <span className={s.breadcrumbSep}>/</span>
                <span className={s.breadcrumbCurrent}>{sim.title}</span>
              </nav>

              <h1 className={s.simTitle}>{sim.title}</h1>

              <div className={s.simMeta}>
                <span className={s.simDiff} style={{ color: diffColor, background: diffColor + '18', borderColor: diffColor + '33' }}>
                  {sim.difficulty}
                </span>
                <span className={s.simCat}>{sim.category}</span>
                <span className={s.simXp}>
                  <Icon name="zap" size={12} color="var(--amber)" w={2} />
                  {sim.xp} XP
                </span>
              </div>
            </div>

            {/* Step counter */}
            <div className={s.stepCounter}>
              <span className={s.stepCounterNum}>
                {stepIndex + 1}<span className={s.stepCounterOf}>/{sim.steps.length}</span>
              </span>
              <span className={s.stepCounterLabel}>
                {sim.steps.length === 1 ? 'scenario' : 'scenario steps'}
              </span>
            </div>
          </div>

          {/* ── Step dots ── */}
          {sim.steps.length > 1 && (
            <div className={s.stepDots}>
              {sim.steps.map((_, i) => (
                <div
                  key={i}
                  className={`${s.stepDot} ${i < stepIndex ? s.stepDotDone : ''} ${i === stepIndex ? s.stepDotActive : ''}`}
                />
              ))}
            </div>
          )}

          {/* ── Situation card ── */}
          <div className={s.situationCard}>
            <div className={s.situationLabel}>
              <Icon name="info" size={13} color="var(--amber)" w={2} />
              Situation
            </div>
            <p className={s.situationText}>
              {currentStep.situation.split('\n').map((line, i) =>
                line === '' ? <br key={i} /> : <span key={i}>{line}<br /></span>
              )}
            </p>
          </div>

          {/* ── Choices ── */}
          <div className={s.choicesSection}>
            <p className={s.choicesLabel}>What do you do?</p>
            <div className={s.choicesList}>
              {currentStep.choices.map((choice) => {
                const isSelected = chosenId === choice.id
                const isOther    = chosenId && chosenId !== choice.id
                const isCorrect  = choice.isCorrect

                let state = 'idle'
                if (isSelected && isCorrect)  state = 'correct'
                if (isSelected && !isCorrect) state = 'wrong'
                if (isOther && isCorrect && chosenId) state = 'missed' // show correct answer after wrong pick
                if (isOther && !isCorrect) state = 'faded'

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice)}
                    disabled={!!chosenId}
                    className={`${s.choiceBtn} ${s[`choice_${state}`]}`}
                  >
                    <div className={s.choiceLetter}>{choice.id.toUpperCase()}</div>
                    <span className={s.choiceText}>{choice.text}</span>
                    {isSelected && (
                      <div className={s.choiceResultIcon}>
                        <Icon
                          name={isCorrect ? 'checkCircle' : 'xCircle'}
                          size={16}
                          color={isCorrect ? '#2EB87A' : '#C94E4E'}
                          w={2}
                        />
                      </div>
                    )}
                    {state === 'missed' && (
                      <div className={s.choiceResultIcon}>
                        <Icon name="checkCircle" size={16} color="#2EB87A" w={2} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Consequence (appears after choosing) ── */}
          {showConsequence && chosen && (
            <div
              ref={consequenceRef}
              className={`${s.consequenceCard} ${chosen.isCorrect ? s.consequenceOk : s.consequenceBad}`}
            >
              {/* Header */}
              <div className={s.consequenceHeader}>
                <div className={s.consequenceIconWrap} style={{
                  background: chosen.isCorrect ? 'rgba(46,184,122,0.12)' : 'rgba(201,78,78,0.12)',
                  border: `1px solid ${chosen.isCorrect ? 'rgba(46,184,122,0.3)' : 'rgba(201,78,78,0.3)'}`,
                }}>
                  <Icon
                    name={chosen.isCorrect ? 'checkCircle' : 'alertTri'}
                    size={18}
                    color={chosen.isCorrect ? '#2EB87A' : '#C94E4E'}
                    w={1.8}
                  />
                </div>
                <span className={s.consequenceHeaderLabel} style={{
                  color: chosen.isCorrect ? '#2EB87A' : '#C94E4E',
                }}>
                  {chosen.isCorrect ? 'Good decision' : 'What happened next'}
                </span>
              </div>

              {/* Consequence text */}
              <p className={s.consequenceText}>{chosen.consequence}</p>

              {/* Prevention tip */}
              <div className={s.tipBox}>
                <div className={s.tipLabel}>
                  <Icon name="bookOpen" size={13} color="var(--amber)" w={2} />
                  Key insight
                </div>
                <p className={s.tipText}>{chosen.tip}</p>
              </div>

              {/* Continue / End */}
              <div className={s.consequenceFooter}>
                {chosen.terminalState && (
                  <p className={s.terminalNote}>
                    <Icon name="lock" size={13} color="var(--text-3)" />
                    This decision ended the simulation. You can retake it from the beginning.
                  </p>
                )}
                <button className={s.btnContinue} onClick={handleContinue}>
                  {chosen.terminalState || stepIndex === sim.steps.length - 1
                    ? 'View results'
                    : 'Continue to next step'
                  }
                  <Icon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

/* ─── Topbar (shared between player and summary) ─── */
function TopBar({ onBack }) {
  return (
    <header className={s.topbar}>
      <div className={s.topbarWrap}>
        <Link to="/" className={s.topbarLogo}>
          <div className={s.logoMark}>
            <Icon name="shield" size={14} color="#D4891A" w={2.2} />
          </div>
          <span>Cyber<strong>Raksha</strong></span>
        </Link>
        <button onClick={onBack} className={s.topbarBack}>
          <Icon name="arrowLeft" size={14} color="var(--text-3)" />
          Exit simulation
        </button>
      </div>
    </header>
  )
}
