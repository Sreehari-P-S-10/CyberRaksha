/**
 * simulationsData.js
 * ─────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for every simulation in CyberRaksha.
 *
 * Two simulation types co-exist here:
 *
 *   type: 'text'    — classic step/choice engine (existing sims)
 *   type: 'visual'  — step-based with a UI environment per step
 *
 * Visual step schema:
 *   {
 *     id,
 *     environment,   // which reusable UI to render: 'socialAd' | 'fakeStore' |
 *                    // 'checkout' | 'phoneMessages' | 'smsConversation' |
 *                    // 'courierSite' | 'browserWithPopup' | 'fakeCall' |
 *                    // 'discordServer' | 'discordDM' | 'gamingLoginPage'
 *     envProps,      // data passed into that environment component
 *     situation,     // optional narrative shown above environment
 *     choices,       // same schema as text engine
 *   }
 *
 * Text step schema (unchanged):
 *   { id, situation, choices[] }
 *
 * Choice schema (both types):
 *   { id, text, isCorrect, consequence, tip, terminalState? }
 * ─────────────────────────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════════════════
   TEXT-ENGINE SIMULATIONS  (all existing sims, untouched)
═══════════════════════════════════════════════════════════ */

export const SIMULATIONS = {

  /* ── FINANCIAL SECURITY ─────────────────────────────── */

  'fs-s-1': {
    title: 'The UPI Refund Trick',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 50,
    type: 'text',
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
    type: 'text',
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
    type: 'text',
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
    type: 'text',
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

  /* ── PHISHING & EMERGING THREATS ────────────────────── */

  'pe-s-1': {
    title: 'University Login Page Clone',
    category: 'Phishing & Emerging Threats',
    difficulty: 'Beginner',
    xp: 50,
    type: 'text',
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
    type: 'text',
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

  /* ── MALWARE & DEVICE SAFETY ─────────────────────────── */

  'md-p-2': {
    title: 'Ransomware: File Lockdown',
    category: 'Malware & Device Safety',
    difficulty: 'Intermediate',
    xp: 90,
    type: 'text',
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
    type: 'text',
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

  /* ── IDENTITY & IMPERSONATION ───────────────────────── */

  'ii-p-3': {
    title: 'Deep Fake Voice Call',
    category: 'Identity & Impersonation',
    difficulty: 'Advanced',
    xp: 100,
    type: 'text',
    steps: [
      {
        id: 1,
        situation: `You receive a WhatsApp voice call from your manager's saved number. The voice sounds exactly like him:\n\n"Hey, I'm in an important client meeting and my laptop died. I need you to urgently transfer ₹85,000 to a vendor — it's for a last-minute software licence or the deal falls through today. I'll sort the paperwork when I'm back. I'll send you the account details on this chat now."\n\nThe account details arrive in the same chat. The voice genuinely sounds like your manager.`,
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
        situation: `IT Security has been notified. They confirm the manager's WhatsApp was indeed compromised and the voice was AI-generated. The CISO now asks the team: "What procedural change should we implement to prevent this in the future?"`,
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

  /* ── OPPORTUNITY & INVESTMENT ───────────────────────── */

  'oi-s-1': {
    title: 'Work-from-Home Data Entry Job',
    category: 'Opportunity & Investment',
    difficulty: 'Beginner',
    xp: 50,
    type: 'text',
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

  /* ── ONLINE COMMERCE SAFETY ─────────────────────────── */

  'oc-e-1': {
    title: 'Fake Online Medical Store',
    category: 'Online Commerce Safety',
    difficulty: 'Beginner',
    xp: 50,
    type: 'text',
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

  /* ══════════════════════════════════════════════════════
     VISUAL SIMULATIONS — Online Commerce Safety
     type: 'visual' — rendered by SimulationRenderer
  ══════════════════════════════════════════════════════ */

  'oc-ecommerce-1': {
    title: 'Fake E-commerce Scam',
    category: 'Online Commerce Safety',
    difficulty: 'Beginner',
    xp: 60,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'socialAd',
        envProps: {
          accountName: 'NikeIndiaDeals',
          sponsored: true,
          emoji: '👟',
          brand: 'NIKE',
          discountLabel: '90% OFF',
          priceNew: '₹399',
          priceOld: '₹3,999',
          stockCount: 3,
          fakeDomain: 'nikeindiaoutlet-deals.in',
          fakeComments: [
            { user: 'rahul_buys', text: 'Just ordered mine! 🙌' },
            { user: 'priya.k', text: 'Received in 2 days, 100% legit' },
          ],
          ctaLabel: 'Shop Now — Limited Stock!',
        },
        choices: [
          {
            id: 'a',
            text: 'Click the link immediately — the countdown is running and stock is almost gone.',
            isCorrect: false,
            consequence: 'You click the link. It opens a website with Nike branding and a countdown timer. The site shows "2 pairs left." This urgency is manufactured — the timer resets for every new visitor. You\'ve entered a fake store designed to steal your payment details.',
            tip: 'Countdown timers and "only X left" notices are manufactured pressure tactics. The domain "nikeindiaoutlet-deals.in" is NOT Nike\'s official domain (nike.com). When a deal creates urgency, that urgency is the red flag.',
          },
          {
            id: 'b',
            text: 'Pause. Check the domain name and the account that posted this before clicking.',
            isCorrect: true,
            consequence: '"nikeindiaoutlet-deals.in" is not Nike\'s official site. The Instagram account was created 11 days ago with no prior content. The likes were purchased. You\'ve correctly identified a scam ad without losing a rupee.',
            tip: 'Before clicking any sale link: (1) Check the exact domain. (2) Check the account age. (3) Search the sale on the brand\'s official website.',
          },
          {
            id: 'c',
            text: 'Trust the comments — they all look positive and real.',
            isCorrect: false,
            consequence: 'The comments were posted by fake bot accounts. Scammers purchase social proof routinely. Trusting comments without verifying the domain is how victims enter the purchase funnel.',
            tip: 'Comment sections on sponsored ads are easily manipulated with purchased bots. The only reliable trust signal is the official domain.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeStore',
        envProps: {
          domain: 'nikeindiaoutlet-deals.in',
          realDomain: 'nike.com',
          productEmoji: '👟',
          productName: 'Nike Air Max 270 — Original',
          priceNew: '₹399',
          priceOld: '₹3,999',
          stockCount: 2,
          reviews: [
            { name: 'Arjun M.', text: '100% original, received in 2 days!' },
            { name: 'Priya K.', text: 'Best deal ever, recommend!' },
          ],
        },
        choices: [
          {
            id: 'a',
            text: 'Add to cart and proceed to checkout — the padlock shows it\'s secure.',
            isCorrect: false,
            consequence: 'You add the item. The checkout asks for your card number, expiry and CVV. The "padlock" only means the connection is encrypted — not that the site is honest. Entering your card details here hands them directly to the scammer.',
            tip: 'SSL (the padlock) only proves data travels encrypted to the server. It says nothing about who owns that server. Scam sites get free SSL certificates in minutes.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Leave the site. Check the product on Nike\'s official site (nike.com/in) first.',
            isCorrect: true,
            consequence: 'You visit nike.com/in. The same model costs ₹8,995. No flash sale is running. You\'ve confirmed the deal was fraudulent and reported the ad to Instagram.',
            tip: 'When in doubt, go directly to the brand\'s official website to verify. A 30-second check prevents financial loss.',
          },
        ],
      },
    ],
  },

  'oc-courier-1': {
    title: 'Courier Delivery Scam',
    category: 'Online Commerce Safety',
    difficulty: 'Beginner',
    xp: 55,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'phoneMessages',
        envProps: {
          existingMessages: [
            { name: 'Mom', preview: 'Are you coming for dinner tonight?', time: 'Yesterday', avatarBg: '#34c759' },
            { name: 'Arjun', preview: 'Did you watch the match?? 🏏', time: 'Mon', avatarBg: '#ff9f0a' },
          ],
          newMessage: {
            name: 'DTDC Courier',
            preview: 'Your package delivery failed. Pay ₹99 redelivery fee...',
            avatarBg: '#5856d6',
            avatarLabel: 'D',
            delayMs: 2000,
          },
        },
        choices: [
          {
            id: 'a',
            text: 'Tap the SMS and open the link — you are expecting a delivery.',
            isCorrect: false,
            consequence: 'You tap the link. A page loads showing a failed delivery notice and a payment form for ₹99. You\'re now inside the scam funnel — entering payment details here will compromise your card.',
            tip: 'Real couriers do not send payment links via unsolicited SMS. "dtdc-redelivery.co.in" is not DTDC\'s official domain (dtdc.com). Never tap payment links in SMS from unknown numbers.',
          },
          {
            id: 'b',
            text: 'Open the DTDC app and check the tracking number directly.',
            isCorrect: true,
            consequence: 'You open the DTDC app and search for the tracking number. It doesn\'t exist. The SMS was fabricated. You block the number and report it via sancharsaathi.gov.in.',
            tip: 'Always track parcels through the official app or website — never through links in SMS.',
          },
          {
            id: 'c',
            text: 'Call the number that sent the SMS to confirm.',
            isCorrect: false,
            consequence: 'The scammer answers, posing as "DTDC Support." They apply pressure to pay within 2 hours. You\'re talking directly to the fraudster.',
            tip: 'Scammers answer calls from phishing numbers. Call the official helpline from the company\'s website — never from the SMS.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        environment: 'courierSite',
        envProps: {
          domain: 'dtdc-redelivery.co.in',
          realDomain: 'dtdc.com',
          trackingId: 'DT8823041IN',
          amount: '₹99',
          brandName: 'DTDC',
          brandColor: '#5856d6',
        },
        choices: [
          {
            id: 'a',
            text: 'Pay the ₹99 — it\'s a small amount and you want the package.',
            isCorrect: false,
            consequence: 'You pay ₹99. Within 24 hours, ₹3,400 in fraudulent charges appear on your card. The ₹99 was a "card testing" transaction — the scammer verified your card is live before making larger withdrawals.',
            tip: 'Small payments on fake sites verify that a card is active. The ₹99 is not the real goal — your card data is.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Check the URL bar carefully before entering anything.',
            isCorrect: true,
            consequence: '"dtdc-redelivery.co.in" — not "dtdc.com". The domain is obviously spoofed. You close the tab, report the URL to cybercrime.gov.in and forward the SMS to 1909.',
            tip: 'The address bar never lies if you read it carefully. Any courier redelivery request from the official company will use the exact official domain.',
          },
        ],
      },
    ],
  },

  'oc-techsupport-1': {
    title: 'Fake Tech Support Scam',
    category: 'Online Commerce Safety',
    difficulty: 'Intermediate',
    xp: 75,
    type: 'visual',
    steps: [
      {
        /* Step 1 — Browser popup + full phone call experience
           The environment handles the entire interaction internally.
           onInteract fires one of:
             'closed_tab'       → user closed without calling (correct)
             'call_ended_good'  → user hung up / refused during call (correct)
             'scam_complete'    → user gave remote access (bad)
           Choices here map to those outcomes for the engine. */
        id: 1,
        environment: 'browserWithPopup',
        envProps: {
          normalUrl: 'indiatimes.com/technology/news',
          articleTitle: 'India\'s Digital Economy Grows 15% in 2024',
          popupDelayMs: 3000,
          popupPhone: '1800-XXX-4821',
          popupThreats: ['Trojan.GenericKD.45', 'Spyware.BankCapture', 'Rootkit.HiddenAccess'],
        },
        choices: [
          {
            id: 'closed_tab',
            text: 'You closed the browser tab without calling.',
            isCorrect: true,
            consequence: 'The popup vanished the instant you closed the tab. Your computer was never infected — the alarm, the scan bar, and the threat list were all JavaScript running inside a webpage. Microsoft has no way to detect viruses through a browser popup.',
            tip: 'Any browser popup claiming to be from Microsoft, Windows Defender, or your antivirus showing a phone number is always a scam. Close the tab. If your mouse seems stuck or the browser appears frozen, use Ctrl+W or Task Manager (Ctrl+Shift+Esc) to force-close it.',
          },
          {
            id: 'call_ended_good',
            text: 'You called but recognised the scam and hung up.',
            isCorrect: true,
            consequence: 'You hung up before the scammer could get remote access. The scammer called back twice — you didn\'t answer. Your computer was never at risk. The popup was a webpage, not a real system alert.',
            tip: 'Microsoft, Apple, and antivirus companies never call you about infections — they have no way to know who you are from a browser popup. The moment anyone on a cold call asks you to install software like AnyDesk or TeamViewer, end the call immediately. Legitimate IT support is only valid when YOU initiate contact.',
          },
          {
            id: 'scam_complete',
            text: 'You called and gave the scammer remote access.',
            isCorrect: false,
            consequence: 'The scammer spent 12 minutes on your computer. They opened your net banking website, navigated to fund transfer, and moved ₹42,000 to an untraceable mule account while keeping you on the phone explaining what they were "fixing." By the time you realised what was happening, the transfer was complete.',
            tip: 'Remote access tools (AnyDesk, TeamViewer, AnySupport) are legitimate tools — but they hand full control of your screen to whoever is on the other end. No legitimate company will ever ask you to install them in response to a browser popup. If you ever give remote access to a scammer: (1) disconnect from the internet immediately, (2) call your bank to freeze the account, (3) change all passwords from a different device, (4) report to cybercrime.gov.in.',
            terminalState: true,
          },
        ],
      },
      {
        /* Step 2 — Knowledge check: what to do AFTER hanging up */
        id: 2,
        situation: 'You ended the call. The scammer called back 3 times in 10 minutes. Your neighbour calls you the next day and says the same thing happened to her — but she installed the software before she got suspicious. She asks you what she should do right now.',
        choices: [
          {
            id: 'a',
            text: 'Tell her not to worry — if she\'s already closed the software, her computer is probably fine.',
            isCorrect: false,
            consequence: 'This is dangerous advice. Closing AnyDesk doesn\'t undo what the scammer may have already done. In 10–15 minutes of remote access, a scammer can install persistent malware, copy saved passwords, screenshot banking details, or initiate transfers. Inaction here can cost her everything.',
            tip: 'Closing a remote access session does not remove anything the scammer may have installed or captured. Always treat a completed remote access session as a full compromise — act immediately.',
          },
          {
            id: 'b',
            text: 'Tell her to immediately disconnect from the internet, call her bank, change all passwords from a different device, and file a complaint on cybercrime.gov.in.',
            isCorrect: true,
            consequence: 'Your neighbour disconnects her Wi-Fi, calls her bank within 8 minutes, and the bank places a hold on her account. A pending transfer of ₹28,000 is stopped. She files a complaint on the National Cybercrime Reporting Portal (cybercrime.gov.in) and calls 1930. Her device is professionally cleaned the next day.',
            tip: 'After any remote access by a scammer — even briefly: (1) Cut internet immediately. (2) Call bank on 1930 or their official helpline. (3) Change all passwords from a DIFFERENT device. (4) File at cybercrime.gov.in or call 1930 (National Cybercrime Helpline). (5) Take the device to a professional for cleaning. Speed is everything — act within minutes, not days.',
          },
          {
            id: 'c',
            text: 'Tell her to run a virus scan and if nothing is found, she is safe.',
            isCorrect: false,
            consequence: 'A standard antivirus scan will not detect a scammer who used legitimate remote access software. The scammer didn\'t install a traditional virus — they used a real tool to do real damage through normal browser interactions. The banking transfer happened through the bank\'s own website, which no antivirus monitors.',
            tip: 'Tech support scammers don\'t use conventional malware that antivirus catches. They use legitimate remote access tools to manually operate your device. A clean scan means nothing after an AnyDesk session with a scammer. Bank security and password changes are the urgent priorities.',
          },
        ],
      },
    ],
  },

  'oc-gaming-1': {
    title: 'Gaming Account Scam',
    category: 'Online Commerce Safety',
    difficulty: 'Beginner',
    xp: 50,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'discordDM',
        envProps: {
          serverName: 'Valorant India',
          scamAccount: 'ValorantOfficial_Rewards',
          scamAccountAge: '4 days ago',
          skinName: 'Prime Collection',
          skinValue: '₹3,500',
          fakeDomain: 'valorant-free-skins.net',
          expiryMinutes: 30,
        },
        choices: [
          {
            id: 'a',
            text: 'Click the link — Prime skins are expensive and 30 minutes isn\'t much time.',
            isCorrect: false,
            consequence: 'You click the link. A page styled exactly like Riot Games\' login portal asks you to "sign in with your Riot account" to claim your skins. You\'re now on a phishing page.',
            tip: 'Urgency ("30 minutes") prevents critical thinking. Legitimate giveaways are never sent via unsolicited DMs.',
          },
          {
            id: 'b',
            text: 'Check the account profile — when was it created and how much activity does it have?',
            isCorrect: true,
            consequence: '"ValorantOfficial_Rewards" was created 4 days ago, has 0 mutual servers, and no post history. You report it to Discord for impersonation.',
            tip: 'Account age and activity are quick but powerful signals. Brand-impersonating accounts are almost always new with no history.',
          },
          {
            id: 'c',
            text: 'Reply and ask if it\'s real before clicking.',
            isCorrect: false,
            consequence: 'The account responds instantly with a convincing script. You click the link. The reply was automated — phishing bots respond to common "is this real?" questions.',
            tip: 'Phishing bots send pre-written responses. A convincing reply doesn\'t verify legitimacy. Check the official game website instead.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        environment: 'gamingLoginPage',
        envProps: {
          fakeDomain: 'valorant-free-skins.net',
          realDomain: 'playvalorant.com',
          gameName: 'RIOT GAMES',
          gameEmoji: '🎮',
          skinName: 'Prime Collection',
          skinValue: '₹3,500',
          accentColor: '#ff4458',
        },
        choices: [
          {
            id: 'a',
            text: 'Enter your Riot username and password — the page looks exactly like the real login.',
            isCorrect: false,
            consequence: 'You enter your credentials. The page shows "Verification complete!" No skins arrive. Within the hour, your Riot account password is changed. The scammer now controls your account and all your existing skins.',
            tip: 'A webpage can look identical to any legitimate site. The domain is the only reliable identifier. "valorant-free-skins.net" is not "playvalorant.com."',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Read the URL in the address bar before entering anything.',
            isCorrect: true,
            consequence: '"valorant-free-skins.net" — not "playvalorant.com." The domain is obviously fake. You close the tab and enable 2FA on your real Riot account.',
            tip: 'The address bar is your most reliable security tool. Always check the full domain before entering credentials.',
          },
          {
            id: 'c',
            text: 'Enter a fake username and wrong password — if it "accepts" it, you\'ll know it\'s fake.',
            isCorrect: true,
            consequence: 'You enter "testuser123" / "wrongpassword". The site shows "Verification complete!" — accepting any input. This confirms it\'s a data-harvesting form, not real authentication.',
            tip: 'If a login page accepts wrong credentials, it\'s harvesting whatever you type. Real authentication always rejects incorrect credentials.',
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     VISUAL SIMULATIONS — Identity & Impersonation
     Authority Impersonation Scam
     Target group: Professionals & Elderly
     Awareness level: Intermediate
  ══════════════════════════════════════════════════════════ */

  'ii-authority-1': {
    title: 'Authority Impersonation Scam',
    category: 'Identity & Impersonation',
    difficulty: 'Beginner',
    xp: 85,
    type: 'visual',
    steps: [
      {
        /* ── Step 1 ─────────────────────────────────────────────
           A spoofed Income Tax Department email arrives.
           The user must decide whether to click the CTA link,
           open the attachment, or close the email entirely.
        ──────────────────────────────────────────────────────── */
        id: 1,
        environment: 'officialEmail',
        envProps: {
          senderName:    'Income Tax Department — India',
          senderEmail:   'notice-efiling@incometax-dept.gov.in.notices.cc',
          realDomain:    'incometax.gov.in',
          subject:       'URGENT: Discrepancy in ITR — Outstanding Tax of ₹18,400',
          logoEmoji:     '🏛️',
          accentColor:   '#1a56db',
          bodyLines: [
            'Dear Taxpayer,',
            'Our systems have detected a discrepancy in your Income Tax Return (ITR) for Assessment Year 2023–24. An outstanding tax liability of ₹18,400 has been identified against your PAN.',
            'Failure to clear this outstanding amount within 24 hours will result in a hold being placed on your bank accounts and initiation of legal proceedings under Section 156 of the Income Tax Act.',
            'Click the button below to view your notice and make the payment securely.',
          ],
          callToAction:   'View Notice & Pay ₹18,400',
          ctaUrl:         'incometax-dept-notice.in/pay',
          attachmentName: 'ITR_Discrepancy_Notice_2024.pdf',
          redFlags: [
            'Sender domain: "incometax-dept.gov.in.notices.cc" — Real domain is only "incometax.gov.in"',
            'Threatening language about account holds and legal proceedings creates panic',
            'Legitimate IT notices are sent via NSDL/CPC portals, never asking for direct payment via email',
            'Legitimate PDF attachments from IT Dept contain official notice numbers — not vague filenames',
          ],
        },
        choices: [
          {
            id: 'clicked_link',
            text: 'You clicked "View Notice & Pay ₹18,400".',
            isCorrect: false,
            consequence: 'The link opens a convincing fake portal styled like the Income Tax e-filing website. It asks for your PAN, Aadhaar, and bank details. You enter them. Within 24 hours, your account is drained. The real Income Tax Department never sends payment links via email — all notices appear on the official portal after login.',
            tip: 'The Income Tax Department communicates through the official portal (incometax.gov.in) and sends physical notices. They never demand payment via email links. If you receive such an email, log in to the official IT portal directly from your browser to check if any genuine notice exists.',
            terminalState: true,
          },
          {
            id: 'opened_attachment',
            text: 'You opened the PDF attachment.',
            isCorrect: false,
            consequence: 'The PDF opens but immediately prompts you to "Enable Macros to view the document." The macro installs a keylogger that records your banking credentials over the next 72 hours. Malware is routinely delivered through official-looking PDF attachments with fake content warnings.',
            tip: 'Never open attachments from unknown or suspicious email addresses. Macros in Office documents and JavaScript in PDFs are common malware delivery methods. Legitimate government documents are plain PDFs — they never ask you to enable anything.',
            terminalState: true,
          },
          {
            id: 'closed_without_action',
            text: 'You closed the email without clicking anything.',
            isCorrect: true,
            consequence: 'Good instinct. You log in directly to incometax.gov.in from your browser and check your account. No outstanding notice exists. You report the phishing email to incident@cert-in.org.in and forward it to your bank\'s fraud reporting email.',
            tip: 'The sender domain "incometax-dept.gov.in.notices.cc" is a lookalike domain — the real domain is "incometax.gov.in" only. Always verify tax notices by logging into the official portal directly. Never click email links or open unsolicited attachments, no matter how official they look.',
          },
        ],
      },

      {
        /* ── Step 2 ─────────────────────────────────────────────
           A call from a spoofed "TRAI official" threatens
           mobile disconnection unless the user pays a fee.
           Caller sounds authoritative, uses official jargon.
        ──────────────────────────────────────────────────────── */
        id: 2,
        environment: 'authorityCall',
        envProps: {
          callerName:     'TRAI Compliance Dept',
          callerNumber:   '+91 11-2323-XXXX',
          callerSubtitle: 'New Delhi — Government of India',
          callerEmoji:    '📡',
          accentColor:    '#30b0c7',
          delayPerLine:   2600,
          scriptLines: [
            { role: 'caller', text: 'Hello, am I speaking with the registered owner of this mobile number?' },
            { role: 'caller', text: 'This is Officer Pradeep Sharma calling from the Telecom Regulatory Authority of India — TRAI. We have received a complaint that your number is being used to send fraudulent messages.' },
            { role: 'caller', text: 'Under the Telecom Act 2023, your number will be permanently disconnected within 2 hours unless you complete a verification payment of ₹1,499 to our compliance portal.' },
            { role: 'caller', text: 'I am transferring you to our secure payment portal now. Please stay on the line.' },
          ],
        },
        choices: [
          {
            id: 'declined_call',
            text: 'You declined the call.',
            isCorrect: true,
            consequence: 'The caller rang back three more times. You did not answer. You looked up TRAI\'s official number (1800-110-420) and called them directly. TRAI confirmed they do not make such calls and never demand payment over the phone. You reported the number to trai.gov.in/consumer.',
            tip: 'Government agencies — TRAI, Income Tax, police, RBI — never call you demanding immediate payment to avoid disconnection or arrest. These are manufactured threats designed to create panic. The correct response is always to hang up and call the agency\'s official number directly.',
          },
          {
            id: 'hung_up',
            text: 'You answered, listened, and then hung up.',
            isCorrect: true,
            consequence: 'Smart decision. After hearing the payment demand, you recognised the pattern and ended the call. TRAI does not make outbound calls demanding compliance payments — this is a well-documented scam that has defrauded thousands of professionals and elderly victims across India.',
            tip: 'The moment any caller claiming to be a government official demands immediate payment to avoid a penalty or disconnection, the call is a scam — 100% of the time. Government departments send written notices; they do not call demanding instant payment.',
          },
          {
            id: 'called_back_official',
            text: 'You told them you\'d call back on the official TRAI number.',
            isCorrect: true,
            consequence: 'The "officer" became aggressive, insisting the 2-hour window was closing. You calmly said goodbye and called 1800-110-420 — TRAI\'s actual helpline. The agent confirmed no such complaint existed and advised you to report the number at sancharsaathi.gov.in.',
            tip: 'Legitimate officials will always be comfortable with you verifying by calling back on an official number. Any resistance to verification — or escalating threats when you suggest it — is a definitive sign of fraud. Report numbers at sancharsaathi.gov.in.',
          },
          {
            id: 'complied',
            text: 'You followed the caller\'s instructions.',
            isCorrect: false,
            consequence: 'The "secure payment portal" they transferred you to was a fake site that collected your card details. The ₹1,499 was just the first charge — your card was used for ₹34,000 in fraudulent transactions within 48 hours. TRAI confirmed they made no such call.',
            tip: 'TRAI, police, courts, and all legitimate government agencies follow written legal processes. They do not call demanding immediate payment over the phone. Any such call is a scam. Report it to 1930 (National Cybercrime Helpline) immediately.',
            terminalState: true,
          },
        ],
      },

      {
        /* ── Step 3 ─────────────────────────────────────────────
           A fake "TRAI Compliance Portal" is shown in a browser.
           It has a convincing government look, official-sounding
           links, a countdown timer, and a fine payment button.
           The URL is the key red flag.
        ──────────────────────────────────────────────────────── */
        id: 3,
        environment: 'fakeGovPortal',
        envProps: {
          fakeDomain:   'trai-compliance-portal.in',
          realDomain:   'trai.gov.in',
          portalName:   'TRAI Compliance Portal',
          logoEmoji:    '📡',
          accentColor:  '#1a4ea0',
          headerBg:     '#003087',
          alertTitle:   'Your Mobile Connection Will Be Disconnected',
          alertBody:    'Our records indicate that your registered mobile number has been flagged under the IT Act 2000 for suspicious messaging activity. To prevent permanent disconnection, pay the compliance verification fee immediately.',
          fineAmount:   '₹1,499',
          deadlineLabel:'Action Required Within: ',
          timerSeconds: 3600,
          officialLinks:['trai.gov.in', 'india.gov.in', 'dot.gov.in'],
          sealEmoji:    '🇮🇳',
          badgeLines:   ['Government of India', 'Ministry of Communications — TRAI'],
        },
        situation: 'The caller transferred you to a website that looks like an official government portal. What do you do?',
        choices: [
          {
            id: 'paid_fine',
            text: 'You paid ₹1,499 — the site looks very official and the timer is running.',
            isCorrect: false,
            consequence: 'Your card was charged ₹1,499. The "confirmation" page said your number was safe. Within 24 hours, your card details were used for ₹22,000 in additional fraudulent transactions. The timer, the government branding, and the threatening language were all designed to stop you from checking the URL.',
            tip: 'The URL "trai-compliance-portal.in" is not a government domain. All official Indian government portals use ".gov.in" exclusively — for example, "trai.gov.in". Any site using ".in", ".com", ".co.in" for government services is fake.',
            terminalState: true,
          },
          {
            id: 'checked_domain',
            text: 'You inspected the URL in the browser address bar before doing anything.',
            isCorrect: true,
            consequence: 'You noticed the domain is "trai-compliance-portal.in" — not "trai.gov.in". Real government portals only use the ".gov.in" suffix. You closed the tab, reported the URL to cybercrime.gov.in, and called TRAI\'s official helpline (1800-110-420) to confirm no action was needed.',
            tip: 'The address bar is your most reliable fraud detector. Indian government websites always end in ".gov.in". This applies to TRAI, Income Tax, UIDAI, police portals, and every other government body. If it doesn\'t end in ".gov.in", it is not a government site.',
          },
          {
            id: 'reported_fraud',
            text: 'You clicked "Report This as Fraud" without entering any details.',
            isCorrect: true,
            consequence: 'Without entering any personal or payment information, you reported the URL to cybercrime.gov.in. You also called 1930 to report the phone number that sent you to this site. TRAI confirmed this is an ongoing impersonation campaign and your report helped get the domain flagged.',
            tip: 'If you suspect fraud, report it immediately — even if you did not fall for it. Reports to cybercrime.gov.in, 1930 (National Cybercrime Helpline), and sancharsaathi.gov.in help authorities take down fraudulent domains and warn others.',
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SOCIAL ENGINEERING SIMULATIONS
     Category: Identity & Impersonation
  ══════════════════════════════════════════════════════════ */

  /* ── Relative Emergency Scam — Elderly, Beginner ── */
  'ii-relative-emergency-1': {
    title: 'Relative Emergency Scam',
    category: 'Identity & Impersonation',
    difficulty: 'Beginner',
    xp: 60,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'relativeEmergencyCall',
        envProps: {
          contactName:    'Rahul (Son)',
          contactInitial: 'R',
          contactBg:      '#34c759',
          messageDelayMs: 1600,
          callDelayMs:    9000,
          urgencyAmount:  '₹25,000',
          accentColor:    '#25d366',
          scamMessages: [
            { role: 'incoming', text: 'Amma, it\'s me Rahul. Please don\'t call back on my number — police have it. Use only this WhatsApp.' },
            { role: 'incoming', text: 'I\'m at the police station. There was an accident. I need ₹25,000 immediately for bail. Please transfer right now.' },
            { role: 'incoming', text: 'Please don\'t tell Appa. I\'ll explain everything. Send to this UPI: bail.help2024@ybl' },
          ],
        },
        choices: [
          {
            id: 'transferred_money',
            text: 'You transferred ₹25,000 immediately — your son sounded desperate.',
            isCorrect: false,
            consequence: 'You transferred the money. An hour later you called Rahul on his real number. He answered from home — completely unaware of any of this. The WhatsApp account was a scammer who had obtained your number and your son\'s name from social media. The ₹25,000 is unrecoverable.',
            tip: 'The "don\'t call my real number" instruction is the defining feature of this scam — it is specifically designed to prevent you from verifying. Any family emergency message that asks you NOT to contact the person through normal channels is a scam, every time.',
            terminalState: true,
          },
          {
            id: 'declined_call',
            text: 'You declined the WhatsApp call and immediately called Rahul on his saved number.',
            isCorrect: true,
            consequence: 'Rahul answered from home, laughing — he was watching TV. The WhatsApp account had used a photo scraped from his Instagram. You reported the number to cybercrime.gov.in and warned other family members about the scam.',
            tip: 'Any "emergency money" request — regardless of who it appears to come from — must be verified by calling the person directly on their known, saved phone number. This one call takes 10 seconds and prevents 100% of these scams.',
          },
          {
            id: 'hung_up_to_verify',
            text: 'You answered the call but immediately said you would call Rahul\'s real number first.',
            isCorrect: true,
            consequence: 'The caller became aggressive and said there was "no time." You hung up and called Rahul\'s saved number. He answered immediately. The WhatsApp "Rahul" had already moved on to the next victim on their list.',
            tip: 'Genuine emergencies can wait 30 seconds for you to verify. A real family member in trouble will always want you to confirm it\'s them. Only a scammer will insist there is "no time" to verify.',
          },
          {
            id: 'called_back_to_verify',
            text: 'You asked them a personal question only the real Rahul would know.',
            isCorrect: true,
            consequence: 'You asked: "What did we name our dog when you were 8?" The caller hesitated, then gave a wrong answer. You hung up. Family code words or personal questions are an excellent defence against voice/message impersonation.',
            tip: 'Establishing a family "safe word" or personal verification question in advance is one of the most effective defences against relative emergency scams. Agree on something specific that only your family would know.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You safely identified the scam. The next day, your neighbour Mrs. Sharma says she received an identical message claiming to be from her daughter, and she is about to transfer ₹40,000. She asks what you think.',
        choices: [
          {
            id: 'a',
            text: 'Tell her to call her daughter\'s real number right now before sending anything.',
            isCorrect: true,
            consequence: 'Mrs. Sharma calls her daughter, who is at work and completely fine. She is shaken but grateful. The scammer had obtained her daughter\'s name from a local WhatsApp community group. A single verification call saved ₹40,000.',
            tip: 'Speed matters when someone is about to be scammed. A clear, direct instruction — "call her real number right now" — is more useful than a long explanation. Act fast and be specific.',
          },
          {
            id: 'b',
            text: 'Tell her to ask the person on WhatsApp some personal questions to verify.',
            isCorrect: true,
            consequence: 'Mrs. Sharma asks "Which school did you attend?" The scammer gives a plausible but wrong answer. Mrs. Sharma is unconvinced and calls her daughter directly. The scam fails.',
            tip: 'Personal verification questions are a solid first step, but calling the real number is the most reliable method. Use both if needed — the goal is to confirm identity through a completely separate channel.',
          },
          {
            id: 'c',
            text: 'Tell her it\'s probably fine — if it\'s really her daughter, she\'ll call her normal number soon.',
            isCorrect: false,
            consequence: 'Mrs. Sharma transfers the money "just to be safe." Her real daughter calls an hour later, confused. Telling someone to wait and see while they\'re about to lose ₹40,000 was the wrong response.',
            tip: 'When someone is on the verge of being scammed, passive reassurance is harmful. Intervene directly and clearly. The cost of being wrong is zero — the cost of not acting could be thousands of rupees.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Fake Medical Assistance Scam — All Users, Intermediate ── */
  'ii-fake-medical-1': {
    title: 'Fake Medical Assistance Scam',
    category: 'Identity & Impersonation',
    difficulty: 'Intermediate',
    xp: 80,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'fakeMedicalPortal',
        envProps: {
          fakeDomain:   'apollo-billing-portal.in',
          realDomain:   'apollohospitals.com',
          hospitalName: 'Apollo Hospitals',
          hospitalEmoji:'🏥',
          headerBg:     '#0057a8',
          patientName:  'Valued Patient',
          alertTitle:   'Urgent: Outstanding Bill — Treatment at Risk',
          alertBody:    'Your insurance claim has been rejected due to a documentation error. An outstanding amount of ₹12,800 must be paid within 2 hours to avoid cancellation of your scheduled procedure.',
          amountDue:    '₹12,800',
          timerSeconds: 7200,
          upiId:        'apollobilling@ybl',
          realUpiNote:  'Real hospitals never collect payments via UPI IDs in SMS or email — always pay at the hospital counter or their verified app',
        },
        choices: [
          {
            id: 'paid',
            text: 'You paid ₹12,800 — you cannot risk a cancelled procedure.',
            isCorrect: false,
            consequence: 'The payment went to a fraudster\'s UPI account. The real Apollo Hospital had no record of any outstanding bill. You received a "confirmation" PDF — a convincing fake. The actual billing department was unaware until you called them in a panic.',
            tip: 'Medical urgency is one of the most effective pressure tactics used in fraud. Real hospitals send bills via post or their official app — they never send UPI IDs via SMS or email and demand payment within hours under threat of cancelling treatment.',
            terminalState: true,
          },
          {
            id: 'checked_url',
            text: 'You clicked the URL bar and inspected the domain before doing anything.',
            isCorrect: true,
            consequence: '"apollo-billing-portal.in" — not "apollohospitals.com." The real Apollo Hospitals website uses only their official domain. You closed the tab and called the hospital directly using the number on your original appointment letter.',
            tip: 'Any hospital billing page not on the hospital\'s own verified domain (.com, .in, or .org that matches their brand exactly) is fake. The ".in" top-level domain does not make a site official — anyone can register "anyname.in" within minutes.',
          },
          {
            id: 'called_hospital_directly',
            text: 'You called Apollo Hospitals directly using their official number to verify the bill.',
            isCorrect: true,
            consequence: 'The hospital\'s billing department confirmed no outstanding amount exists on your account. They flagged the spoofed domain and reported it to their cybersecurity team. Your procedure is proceeding normally at zero additional cost.',
            tip: 'When in doubt about any medical bill: call the hospital directly using a number from your physical appointment letter or their official website — not any number in the suspicious email or SMS. This single step catches 100% of fake medical billing scams.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You avoided the scam. Later you receive an SMS: "Your health insurance policy INS-2034 lapses TODAY. Pay ₹4,200 now to avoid loss of coverage: healthinsure-renewal.in/pay". Your policy renewal is actually due this month.',
        choices: [
          {
            id: 'a',
            text: 'Pay through the SMS link — your renewal is genuinely due and this seems related.',
            isCorrect: false,
            consequence: 'You pay ₹4,200. Your actual insurer has no record of the transaction. The domain "healthinsure-renewal.in" was registered 12 days ago by a fraudster who sends mass SMS to thousands of people knowing some will have genuine upcoming renewals.',
            tip: 'Scammers send renewal scam SMS in bulk — the timing of a genuine renewal feels like confirmation, but it is coincidence. Always renew insurance only through the insurer\'s official app, website, or by calling their helpline directly.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Log in to your insurer\'s official app or website directly to check your policy status.',
            isCorrect: true,
            consequence: 'You open your insurer\'s app directly. Your policy shows a renewal notice — but it links to payment through the app itself, not a third-party site. You renew securely through the official channel. The SMS was fraudulent mass spam that happened to time with your genuine renewal.',
            tip: 'The correct response to any financial or insurance urgency SMS is always to go directly to the official app or website — never through links in the message. Fraudsters deliberately time SMS campaigns around common renewal periods (March, financial year-end) to improve hit rates.',
          },
        ],
      },
    ],
  },

  /* ── Urgency Pressure Attack — All Users, Advanced ── */
  'ii-urgency-pressure-1': {
    title: 'Urgency Pressure Attack',
    category: 'Identity & Impersonation',
    difficulty: 'Advanced',
    xp: 100,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'urgencyPressure',
        envProps: {
          scenarioTitle:  'You Have 10 Minutes',
          emailSender:    'fraud-alert@hdfc-security-alert.in',
          emailSubject:   'FINAL NOTICE: Fraudulent Transaction Detected — Account Freeze Imminent',
          emailBody:      'We have detected an unauthorised transaction of ₹87,400 from your account to an unrecognised recipient. Your account will be frozen in 10 minutes unless you verify your identity through the secure link below.',
          callerId:       '+91 22-6652-XXXX',
          callerClaim:    'HDFC Fraud Prevention',
          smsText:        'HDFC ALERT: Unauthzd txn ₹87400 detected. Acct freeze in 10 mins. Verify NOW: hdfc-fraud-verify.in/urgent REF:FRD8821',
          timerSeconds:   600,
          accentColor:    '#1a56db',
          pressureMessages: [
            'New alert: Your account is being accessed from an unrecognised device in Chennai.',
            'Warning: 3 failed verification attempts detected. Account freeze in progress.',
            'Final warning: Your account will be permanently restricted in 2 minutes unless verified.',
          ],
        },
        choices: [
          {
            id: 'acted_under_pressure',
            text: 'A — You followed the email link immediately to protect your account.',
            isCorrect: false,
            consequence: 'The link took you to a convincing HDFC login page. You entered your credentials. Within minutes, ₹87,400 was transferred out of your actual account — not by a fictional fraudster, but by the real one who now had your login. The email, SMS, and call were all orchestrated simultaneously to prevent rational thinking. The timer and escalating alerts were entirely fabricated.',
            tip: 'This is a coordinated social engineering attack. Urgency, multiple simultaneous channels, and escalating threats are all psychological tools designed to prevent you from thinking clearly. No bank will freeze your account in 10 minutes — account security decisions take hours and involve regulatory processes.',
            terminalState: true,
          },
          {
            id: 'paused_and_assessed',
            text: 'B — You stopped, recognised the pressure tactics, and assessed before acting.',
            isCorrect: true,
            consequence: 'You put your phone down for 60 seconds. You noticed: the email domain is "hdfc-security-alert.in" — not "hdfcbank.com." The SMS link is "hdfc-fraud-verify.in" — not hdfcbank.com. The 10-minute timer is designed to prevent this exact pause. You call HDFC\'s real number from the back of your card.',
            tip: 'The pause is the defence. Urgency is a weapon — the moment you feel rushed into a financial decision, that feeling itself is the red flag. Real fraud investigations by banks are conducted over days, not 10-minute windows. Manufactured urgency always signals manipulation.',
          },
          {
            id: 'called_bank_official_number',
            text: 'C — You called HDFC\'s official number from the back of your card.',
            isCorrect: true,
            consequence: 'You called 1800-202-6161 — the number printed on your HDFC card. The automated system confirmed no fraud alerts on your account. You were connected to a fraud specialist who confirmed: no transaction of ₹87,400 had occurred, no freeze was in progress, and the email domain and SMS link were both fraudulent. The call took 4 minutes.',
            tip: 'The bank\'s official helpline number is the single most reliable resource in any banking emergency. It is printed on your card for exactly this reason. This number bypasses all spoofed domains, fake portals, and impersonators in one step.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You recognised and avoided the attack. Your colleague Deepak comes to you the next day, visibly stressed. He says: "I got the same messages but I clicked the link and entered my details before I realised. My account hasn\'t been drained yet — what do I do right now?"',
        choices: [
          {
            id: 'a',
            text: 'Tell him to change his password immediately on the bank\'s website.',
            isCorrect: false,
            consequence: 'Deepak changes his password — but on the bank\'s website, which requires logging in with the compromised credentials first. If the scammer is monitoring in real time, this login attempt reveals his new password too. The correct first step is to call the bank directly to block the account, not to log in.',
            tip: 'After credential compromise, the safest first step is always to call the bank\'s helpline directly and request an account block — not to log in from any device, which may itself be monitored. Let the bank initiate the security reset from their end.',
          },
          {
            id: 'b',
            text: 'Tell him to call HDFC\'s helpline (1800-202-6161) immediately and request a temporary account block.',
            isCorrect: true,
            consequence: 'Deepak calls and gets his account temporarily blocked within 3 minutes. No fraudulent transactions had been attempted yet. The bank\'s fraud team initiates a full credential reset and issues new login details by post. Deepak also files a report on cybercrime.gov.in. His money is safe.',
            tip: 'Time is the critical variable after credential compromise. Every minute the account remains active with compromised credentials is a window for the attacker. A phone call to the helpline can block an account in under 5 minutes — this is always the first and fastest move.',
          },
          {
            id: 'c',
            text: 'Tell him to run an antivirus scan first to make sure his device is clean.',
            isCorrect: false,
            consequence: 'Deepak spends 20 minutes running a scan (which comes back clean — there was no malware, just a phishing site). In the meantime, the scammer who obtained his credentials attempts a ₹45,000 NEFT transfer. The bank\'s own system flags and blocks it — but only barely. The antivirus scan was the wrong first priority.',
            tip: 'An antivirus scan addresses malware — a phishing attack involves no malware. The compromise was the act of entering credentials on a fake site. The correct priority is securing the financial account immediately, not scanning the device.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     FINANCIAL SECURITY — Visual Simulations
  ══════════════════════════════════════════════════════════ */

  /* ── UPI QR Scam — All Users, Beginner ── */
  'fs-visual-upi-1': {
    title: 'The UPI QR Trap',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 60,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'upiQrScam',
        envProps: {
          senderName:    'Unknown — +91 87654 XXXXX',
          creditAmount:  '₹500',
          returnAmount:  '₹500',
          accentColor:   '#6200ea',
          upiApp:        'Google Pay',
          scammerNumber: '+91 87654 XXXXX',
        },
        choices: [
          {
            id: 'scanned_qr',
            text: 'You scanned the QR code and proceeded to pay.',
            isCorrect: false,
            consequence: 'You scanned the QR. Your UPI app showed a payment request of ₹12,000 — not ₹500 — to an unknown UPI ID. You realised just in time and cancelled. The QR was designed to collect a far larger amount than discussed. Had you entered your PIN, ₹12,000 would have left your account.',
            tip: 'A UPI QR code can ONLY send money FROM you — it cannot receive money into your account. Any stranger asking you to "scan to return" money is running this exact scam. Always check the amount and recipient before entering your PIN.',
            terminalState: true,
          },
          {
            id: 'returned_via_upi_id',
            text: 'You sent the money back directly using their UPI ID — without scanning.',
            isCorrect: false,
            consequence: 'You transferred ₹500 directly. Three days later your bank notified you that the original ₹500 credit was from a stolen account — its owner is now disputing the transaction and the bank may reverse it. The person you "returned" it to was the fraudster who made the original transfer from a victim\'s account.',
            tip: 'Unexpected credits should not be returned immediately via transfer. Contact your bank to reverse it through official channels — the original sender may themselves be a victim whose account was misused.',
          },
          {
            id: 'refused_qr',
            text: 'You refused to scan the QR and told them to contact your bank for a reversal.',
            isCorrect: true,
            consequence: 'You declined both options and advised the caller to contact your bank directly for a transaction reversal. The "caller" never called your bank — confirming the credit was either a deliberate scam setup or a mistaken transfer that will resolve itself. Your account was never at risk.',
            tip: 'The safest response to unexpected UPI credits: do nothing immediately. Call your bank, explain the situation, and let them handle any reversal. Never scan QR codes from strangers, even for seemingly small amounts.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You correctly handled the QR scam. A few days later, your bank sends an in-app notification: "You have received ₹2,000 from an unknown sender. Tap to return via QR." The notification looks official and has your bank\'s logo.',
        choices: [
          {
            id: 'a',
            text: 'Tap the notification and scan the QR — it\'s from the bank\'s official app.',
            isCorrect: false,
            consequence: 'The notification was a fake — a push notification from a malicious app you installed last month that mimics banking alerts. The QR it showed would have sent ₹2,000 from your account. Legitimate banks never ask you to return money via QR through a push notification.',
            tip: 'Push notifications are easy to spoof. Even if a notification looks like it\'s from your bank, open the actual banking app directly and check your transaction history — never tap "return money" links in notifications.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Open your bank\'s official app directly and check your actual account balance and transactions.',
            isCorrect: true,
            consequence: 'You open your bank app directly. No ₹2,000 credit exists. The notification was from a fake banking app. You uninstall it and report it to cybercrime.gov.in. Only transactions visible in your official banking app are real.',
            tip: 'Always verify any banking notification by opening the official app directly — never through links in notifications. If a credit doesn\'t appear in your official app, it doesn\'t exist.',
          },
        ],
      },
    ],
  },

  /* ── Fake Investment Telegram Group — All Users, Intermediate ── */
  'oi-visual-invest-1': {
    title: 'Fake Investment Telegram Group',
    category: 'Opportunity & Investment',
    difficulty: 'Intermediate',
    xp: 85,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'telegramInvest',
        envProps: {
          groupName:      'TradeKing India Premium 💰',
          adminName:      'TradeKing_Admin',
          memberCount:    '14,832',
          accentColor:    '#2ca5e0',
          dmDelayMs:      7000,
          depositAmount:  '₹5,000',
          promisedReturn: '₹12,500 in 7 days',
          fakeDomain:     'tradeking-invest.in',
          profits: [
            { name: 'Rajesh_Trades', avatarBg: '#e91e63', profit: '+₹8,400', strategy: 'NIFTY options signal' },
            { name: 'Sunita_M', avatarBg: '#ff9800', text: 'Got my withdrawal in 10 mins 🙌 this group is 100% legit' },
            { name: 'TradeKing_Admin', avatarBg: '#2ca5e0', isAdmin: true, text: 'Today\'s signal: BUY BANKNIFTY 48500 CE. Expected return 40% in 2 hrs. Only for VIP members 👑' },
            { name: 'Amit_Investor', avatarBg: '#4caf50', profit: '+₹14,200', strategy: 'BANKNIFTY signal today' },
            { name: 'Priya_K', avatarBg: '#9c27b0', text: 'Joined last week, already made ₹22,000 profit 😍' },
          ],
        },
        choices: [
          {
            id: 'deposited',
            text: 'You deposited ₹5,000 to claim the VIP slot.',
            isCorrect: false,
            consequence: 'You paid ₹5,000 to "tradeking-invest.in". The admin confirmed your VIP slot and shared signals. Your "account balance" showed ₹14,500 after 3 days. When you tried to withdraw, a "tax clearance fee" of ₹3,000 was required. Then ₹8,000. The balance was fictional — a number on a fake dashboard. All members posting profits were paid actors or bots. You lost ₹5,000 minimum.',
            tip: 'Unsolicited investment groups on Telegram are almost universally fraudulent. The profit screenshots are fabricated, the members are bots, and any "returns" shown on a dashboard are fictitious numbers designed to extract more money via fees before you can "withdraw."',
            terminalState: true,
          },
          {
            id: 'investigated_group',
            text: 'You researched the group and the domain before doing anything.',
            isCorrect: true,
            consequence: 'You searched "TradeKing India Telegram scam" — 47 results from fraud reporting sites appeared. The domain "tradeking-invest.in" was registered 19 days ago. The "14,832 members" included thousands of bots. You reported the group to Telegram and to SEBI\'s investor helpline (1800-266-7575).',
            tip: 'Before engaging with any investment group: (1) Search "[group name] + scam". (2) Check domain registration date — new domains are a major red flag. (3) Verify with SEBI\'s registered advisor list at sebi.gov.in. Legitimate advisors are never found on unsolicited Telegram groups.',
          },
          {
            id: 'ignored_and_left',
            text: 'You left the group immediately without engaging.',
            isCorrect: true,
            consequence: 'You left the group and blocked the admin. No money lost, no data shared. You later learned 4 people in your office fell for the same group and collectively lost ₹1.4 lakh.',
            tip: 'The safest response to unsolicited investment groups is simply to leave. SEBI-registered investment advisors never recruit clients through random Telegram groups.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You avoided the scam. A week later a colleague tells you their dashboard shows ₹38,000 in "profits" from the same group. They haven\'t tried to withdraw yet and want to deposit ₹15,000 more to unlock a "premium tier."',
        choices: [
          {
            id: 'a',
            text: 'Tell them to try withdrawing the ₹38,000 first before depositing anything more.',
            isCorrect: true,
            consequence: 'Your colleague attempts a withdrawal. They are told a ₹6,000 "income tax deposit" is required first. Then a ₹12,000 "SEBI compliance fee." The ₹38,000 never existed — it was a fake dashboard number. The withdrawal barrier reveals the scam. They avoid the additional ₹15,000 deposit.',
            tip: 'Always attempt a withdrawal before depositing more into any investment platform. A legitimate platform has no reason to charge fees before releasing your own money. Any pre-withdrawal fee is a classic scam mechanic.',
          },
          {
            id: 'b',
            text: 'Tell them the dashboard profit is fictional and show them the fraud reports you found.',
            isCorrect: true,
            consequence: 'Your colleague is initially resistant. But after seeing the fraud reports and the domain registration date, they attempt a test withdrawal. A ₹5,000 fee is demanded. They exit and report to cybercrime.gov.in.',
            tip: 'Numbers on a scam dashboard feel real because our brains treat them as money. The true test of any investment balance is whether you can withdraw it freely. Paper profits with withdrawal barriers are always fraudulent.',
          },
          {
            id: 'c',
            text: 'Tell them the ₹38,000 looks legitimate and it\'s probably safe to deposit more.',
            isCorrect: false,
            consequence: 'Your colleague deposits ₹15,000. Their dashboard now shows ₹67,000. The admin says a ₹22,000 "tax clearance" is needed to withdraw. Your colleague has now lost ₹15,000 plus their original deposit.',
            tip: 'When someone shows you a dashboard profit from an unsolicited investment group, assume it is fraudulent until proven otherwise. The correct advice is always: try to withdraw before investing more.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Spear Phishing Email — Professionals & Students, Intermediate ── */
  'pe-visual-spear-1': {
    title: 'Spear Phishing Email',
    category: 'Phishing & Emerging Threats',
    difficulty: 'Intermediate',
    xp: 80,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'spearPhishEmail',
        envProps: {
          recipientName:  'Priya Sharma',
          senderDisplay:  'IT Security — Infosys',
          senderEmail:    'itsecurity@infosys-helpdesk.net',
          realDomain:     'infosys.com',
          subject:        'Action Required: Mandatory Security Policy Reset — Expires Today',
          companyLogo:    '🔷',
          accentColor:    '#0078d4',
          ctaLabel:       'Reset Security Credentials Now',
          ctaUrl:         'infosys-helpdesk.net/policy-reset',
          headerDetails:  { spf: 'FAIL — sender not authorised for infosys.com' },
          bodyLines: [
            'Hi Priya,',
            'Following our updated Information Security Policy (ISP-2024), all employees must complete a mandatory security credential reset by end of business today.',
            'Failure to complete this reset will result in temporary account suspension affecting your Outlook, Teams, and VPN access.',
            'This takes less than 2 minutes. Click below to complete your reset securely.',
          ],
        },
        choices: [
          {
            id: 'clicked_reset_link',
            text: 'You clicked "Reset Security Credentials Now."',
            isCorrect: false,
            consequence: 'The link opened a convincing SSO login page. You entered your credentials. The page said "Reset complete." But your credentials were captured. Within 3 hours, the attacker accessed your corporate email, downloaded client contracts, and sent phishing emails to 12 of your contacts using your account.',
            tip: 'Spear phishing uses your name, company, and realistic context. The tell is always the domain: "infosys-helpdesk.net" is not "infosys.com." Legitimate IT departments send policy resets through official ticketing systems or the intranet — never through external links with urgent deadlines.',
            terminalState: true,
          },
          {
            id: 'inspected_headers',
            text: 'You clicked the sender\'s email to inspect the full sending address.',
            isCorrect: true,
            consequence: 'You saw the full address: "itsecurity@infosys-helpdesk.net" — not "@infosys.com." The SPF header shows FAIL. The domain was registered 8 days ago. You forwarded the email to IT security and confirmed via Teams that no mandatory reset had been issued.',
            tip: 'The display name can say anything — the actual sending domain always reveals the truth. One click to expand the full email address is the most important habit in email security.',
          },
          {
            id: 'reported_to_it',
            text: 'You reported it to IT Security without clicking anything.',
            isCorrect: true,
            consequence: 'Your IT team confirms: no security reset was issued. The domain "infosys-helpdesk.net" is a phishing domain. IT blocks it company-wide and alerts 4,200 employees. Your report prevented a large-scale credential harvest.',
            tip: 'Reporting phishing emails — even if you\'re only 60% sure — is always the right move. One report can protect thousands of colleagues.',
          },
          {
            id: 'deleted_without_clicking',
            text: 'You deleted the email without clicking anything.',
            isCorrect: true,
            consequence: 'Your credentials are safe. However, a colleague received the same email and clicked the link — their account was compromised. Reporting to IT rather than just deleting would have protected them too.',
            tip: 'Deleting is safe — but reporting is better. Reporting takes 10 seconds and can prevent the same email from compromising colleagues.',
          },
        ],
      },
      {
        id: 2,
        situation: 'IT sends an all-staff advisory about the campaign. Your colleague Vikram says he clicked the link but didn\'t enter his password — he just looked at the page and closed it. He asks if he\'s safe.',
        choices: [
          {
            id: 'a',
            text: 'Tell him he\'s fine — he didn\'t type anything, so no data was shared.',
            isCorrect: false,
            consequence: 'Vikram was not fully safe. The phishing page loaded JavaScript that captured his browser session cookies without any input. His Teams session token was compromised and used to access his account. Simply loading a malicious page can have consequences.',
            tip: 'Modern phishing pages can capture browser session tokens without any user input. Clicking a phishing link without entering credentials reduces — but does not eliminate — risk. Always report the click to IT regardless.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Tell him to report to IT immediately — the click itself may have exposed session data.',
            isCorrect: true,
            consequence: 'Vikram reports to IT. They run a session audit and find his browser token was captured. They revoke all active sessions and force a full re-login. The risk is contained within 45 minutes. Early reporting turned a potential breach into a non-event.',
            tip: 'Any click on a known phishing link should be reported to IT immediately, even without credential entry. Session hijacking is possible the moment a malicious page loads. IT can revoke sessions before they\'re misused.',
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     IDENTITY & IMPERSONATION — Student Simulations
  ══════════════════════════════════════════════════════════ */

  /* ── Level 1: Fake College Admin Account — Beginner, Visual ── */
  'ii-s-1': {
    title: 'Fake College Admin Account',
    category: 'Identity & Impersonation',
    difficulty: 'Beginner',
    xp: 50,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'instagramFakeAdmin',
        envProps: {
          fakeHandle:    '@srm_admissions_official',
          realHandle:    '@srm_university',
          collegeName:   'SRM University',
          followerCount: '1,204',
          postCount:     '3',
          bio:           'Official Admissions Office — SRM University 🎓\nScholarship & Admission Updates',
          postCaption:   '🎓 SCHOLARSHIP ALERT 🎓\n\nSRM Merit Scholarship 2024 is NOW OPEN.\nDeadline: This Friday.\n\nSubmit your details via the link in bio to apply.',
          fakeDomain:    'srm-scholarship-apply.in',
          postAge:       '2 hours ago',
          accountAge:    'Account created 11 days ago',
          redFlags: [
            'No blue verification tick — the real SRM account is verified',
            'Only 1,204 followers — a real university has tens of thousands',
            'Account created just 11 days ago',
            'Domain "srm-scholarship-apply.in" is not the official "srmist.edu.in"',
            'Sponsored post — scammers pay to reach students via Instagram ads',
          ],
        },
        choices: [
          {
            id: 'followed_link',
            text: 'You opened the scholarship link and submitted your details.',
            isCorrect: false,
            consequence: 'The form asked for your name, student ID, phone number, email, Aadhaar number, and bank account details for "scholarship disbursement." You submitted everything. The data was harvested. Three days later you received calls from unknown numbers offering fake loan schemes — your details had been sold.',
            tip: 'Legitimate scholarship applications never ask for Aadhaar or bank details through an Instagram link. Always apply via the official college website or the admissions office directly. No real university runs scholarship applications through a third-party ".in" domain.',
            terminalState: true,
          },
          {
            id: 'checked_official_account',
            text: 'You searched Instagram for the real official SRM account to compare.',
            isCorrect: true,
            consequence: 'You found the real @srm_university account — blue verified tick, 87,400 followers, posts going back 6 years. No scholarship post like this one. You reported the fake account via Instagram\'s "Report > Pretending to be someone else" option and warned your college WhatsApp group.',
            tip: 'Always verify institutional accounts by checking: (1) blue verified tick, (2) follower count consistent with the institution\'s size, (3) account age visible in posts, (4) matching domain in the bio. Real college accounts don\'t run scholarship deadlines through sponsored posts.',
          },
          {
            id: 'reported_account',
            text: 'You reported the account for impersonation without clicking the link.',
            isCorrect: true,
            consequence: 'You reported the account. Instagram removes it within 48 hours. You also posted a warning in your batch WhatsApp group — 3 classmates who had almost submitted their details saw it in time.',
            tip: 'Reporting fake accounts protects everyone, not just you. Instagram\'s impersonation reporting is effective and fast. You don\'t need to click the link before reporting — the account itself is the evidence.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You identified the fake account and reported it. The next day, a classmate sends a message in your batch group:\n\n"I already submitted the form — should I be worried? It asked for my Aadhaar and bank account number."\n\nWhat do you advise them to do?',
        choices: [
          {
            id: 'a',
            text: 'Tell them not to worry — Aadhaar and account numbers alone can\'t cause harm.',
            isCorrect: false,
            consequence: 'This is incorrect advice. Aadhaar combined with a name and phone number can be used for SIM swap fraud and targeted vishing attacks. Minimising the risk delayed your classmate from taking protective action.',
            tip: 'Any combination of personal data in a scammer\'s hands is a risk. Always advise prompt action — not reassurance.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Tell them to call their bank immediately, lock their Aadhaar biometrics at uidai.gov.in, and report to cybercrime.gov.in.',
            isCorrect: true,
            consequence: 'Your classmate locks their Aadhaar biometrics through the UIDAI app, sets up transaction alerts with their bank, and files a report on cybercrime.gov.in. No fraud occurs. Prompt action made the stolen data much less useful.',
            tip: 'After a data exposure: (1) Lock Aadhaar biometrics at uidai.gov.in or the mAadhaar app — this prevents misuse for new SIM registrations or bank accounts. (2) Enable transaction SMS alerts with your bank. (3) Report at cybercrime.gov.in or call 1930.',
          },
        ],
      },
    ],
  },

  /* ── Level 2: WhatsApp Classmate Impersonation — Intermediate, Visual ── */
  'ii-s-2': {
    title: 'WhatsApp Classmate Impersonation',
    category: 'Identity & Impersonation',
    difficulty: 'Intermediate',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'whatsappImpersonation',
        envProps: {
          contactName:    'Arjun Mehta',
          contactInitial: 'A',
          contactBg:      '#ff9800',
          newNumber:      '+91 94XXX XXXXX',
          originalNumber: '+91 98XXX XXXXX',
          amount:         '₹3,000',
          reason:         'stuck at the airport, wallet stolen',
          upiId:          'arjun.help2024@paytm',
          messageDelayMs: 1500,
          accentColor:    '#25d366',
        },
        choices: [
          {
            id: 'sent_money',
            text: 'You sent ₹3,000 to the UPI ID — Arjun sounded desperate.',
            isCorrect: false,
            consequence: 'You transferred ₹3,000. An hour later you called Arjun on his saved number — he was in college, completely unaware. His Instagram was public and the scammer had scraped his name and photo, then messaged everyone from a new number. The ₹3,000 is unrecoverable.',
            tip: 'A new number claiming to be a friend in an emergency is one of the most common student-targeted scams. The "don\'t call the old number" instruction is specifically designed to stop you from verifying. Always call the saved number first.',
            terminalState: true,
          },
          {
            id: 'called_original_number',
            text: 'You called Arjun on his saved number before sending anything.',
            isCorrect: true,
            consequence: 'Arjun answered immediately from the college library. He had no idea what you were talking about. His Instagram was public and the scammer had scraped his name and photo. You warned him, and he locked his Instagram account and posted a warning for others.',
            tip: 'One phone call to the original saved number takes 20 seconds and catches 100% of these scams. The moment a new number asks you not to call the old one, that instruction itself is the red flag.',
          },
          {
            id: 'asked_verification_question',
            text: 'You replied asking something only the real Arjun would know.',
            isCorrect: true,
            consequence: 'You asked: "What\'s the name of our project group in Teams?" The scammer replied with something generic. You knew it was wrong and blocked the number. Arjun\'s real answer would have been immediate and specific.',
            tip: 'Shared memories or specific details from your real friendship are excellent quick verification tools. A scammer using a scraped profile has no access to those details.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You correctly identified the impersonation. Arjun tells you his Instagram account was public and had his phone number in the bio. He asks what settings he should change to prevent this happening again.',
        choices: [
          {
            id: 'a',
            text: 'Tell him to delete Instagram — it\'s not safe.',
            isCorrect: false,
            consequence: 'Deleting Instagram is an extreme response that doesn\'t address the root issue. Scammers also scrape LinkedIn, Facebook, and college directories. The real protection comes from limiting public personal information, not abandoning platforms.',
            tip: 'Platform deletion isn\'t necessary. The correct response is to reduce public exposure of personally identifying information like phone numbers.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Tell him to set Instagram to private, remove his phone number from bio, and enable two-factor authentication.',
            isCorrect: true,
            consequence: 'Arjun sets his account to private, removes his phone number from the bio, enables 2FA, and sets a personal code word with close friends for any future emergency money requests. These steps significantly reduce his impersonation risk.',
            tip: 'Three quick wins that prevent most social media impersonation: (1) Never put your phone number in a public bio. (2) Enable 2FA on all accounts. (3) Set a personal code word with close friends for verifying emergency requests — a real friend will know it, a scammer won\'t.',
          },
        ],
      },
    ],
  },

  /* ── Level 4: Aadhaar Identity Theft — Advanced, Text ── */
  'ii-s-3': {
    title: 'Aadhaar Identity Theft',
    category: 'Identity & Impersonation',
    difficulty: 'Advanced',
    xp: 100,
    type: 'text',
    steps: [
      {
        id: 1,
        situation: 'You shared a photo of your Aadhaar card in a college WhatsApp group last semester to fill a hostel form. You later deleted the message, but screenshots may have circulated.\n\nToday you receive an SMS: "Your Aadhaar has been used to register a new SIM card at Jio. If not done by you, call 1800-XXX-XXXX immediately."\n\nThe number in the SMS is not Jio\'s official helpline.',
        choices: [
          {
            id: 'a',
            text: 'Call the number in the SMS immediately — someone may have stolen your identity.',
            isCorrect: false,
            consequence: 'The number connects to a scammer posing as a "TRAI officer." They claim your Aadhaar has been misused and ask you to share your OTP to "lock" it. You share the OTP — it was for a new account being opened in your name. Your panic was exploited before you could think clearly.',
            tip: 'Never call numbers from unexpected SMS messages about Aadhaar misuse. These are vishing attacks designed to create panic and extract OTPs. Verify only through official channels.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Ignore the SMS and check your Aadhaar usage history at myaadhaar.uidai.gov.in.',
            isCorrect: true,
            consequence: 'You log in to myaadhaar.uidai.gov.in and check "Aadhaar Authentication History." No recent SIM-related authentication appears. The SMS was a vishing attempt. You report the sender number to TRAI at sancharsaathi.gov.in.',
            tip: 'myaadhaar.uidai.gov.in shows a complete history of where and when your Aadhaar was authenticated. This is the only reliable source of Aadhaar misuse information — not SMS alerts from unknown numbers.',
          },
          {
            id: 'c',
            text: 'Call Jio\'s official helpline (198) to check if a SIM was actually registered.',
            isCorrect: true,
            consequence: 'Jio\'s helpline confirms no new SIM has been registered using your Aadhaar. The SMS was fraudulent. You report the number via sancharsaathi.gov.in and block it.',
            tip: 'Telecom operators can confirm whether a SIM was registered using your Aadhaar. Always use the official helpline numbers from the operator\'s website — never from the suspicious SMS.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You confirm through UIDAI that your Aadhaar WAS actually authenticated once — 3 weeks ago — at a telecom outlet you have never visited. Someone used your Aadhaar photo to register a SIM.\n\nWhat do you do first?',
        choices: [
          {
            id: 'a',
            text: 'Post about it on social media to warn others.',
            isCorrect: false,
            consequence: 'Posting publicly can alert the fraudster to cover their tracks before you\'ve taken protective action. Taking action first, then warning others, is the correct order.',
            tip: 'In any identity theft situation, protect first — warn later. Alerting the fraudster before securing your accounts gives them time to act.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Lock your Aadhaar biometrics on UIDAI, file a complaint on cybercrime.gov.in, and request the fraudulent SIM be blocked via TRAI.',
            isCorrect: true,
            consequence: 'You lock your Aadhaar biometrics through the UIDAI portal — preventing any further authentication. You file a complaint on cybercrime.gov.in with the authentication record as evidence. TRAI traces and blocks the fraudulent SIM within a week. No further misuse occurs.',
            tip: 'The three-step response to confirmed Aadhaar misuse: (1) Lock biometrics at myaadhaar.uidai.gov.in immediately. (2) File at cybercrime.gov.in with the authentication timestamp as evidence. (3) Report the fraudulent SIM to TRAI at sancharsaathi.gov.in.',
          },
        ],
      },
      {
        id: 3,
        situation: 'Your Aadhaar biometrics are locked and the complaint is filed. A week later, a bank calls saying a loan application was submitted in your name 5 weeks ago using your Aadhaar and PAN. The application is still pending.\n\nThe loan amount: ₹2,40,000.',
        choices: [
          {
            id: 'a',
            text: 'Tell the bank to simply reject the application — your details were stolen.',
            isCorrect: false,
            consequence: 'Verbally telling the bank is insufficient. Without a formal written complaint and cybercrime report reference number, the bank may not be able to stop the application from being processed. Proper documentation is essential.',
            tip: 'Verbal communication is not enough for financial fraud cases. Always submit a written complaint with your cybercrime.gov.in reference number — this creates a legal paper trail that banks are required to act on.',
          },
          {
            id: 'b',
            text: 'Visit the bank with your cybercrime complaint reference number, submit a written fraud declaration, and request a CIBIL fraud alert.',
            isCorrect: true,
            consequence: 'You visit the bank with your cybercrime.gov.in reference number and submit a written fraud declaration. The bank freezes the application and flags your PAN. You file a CIBIL dispute, which places a fraud alert on your credit report. The loan application is cancelled. Your credit score is protected.',
            tip: 'For fraudulent loan applications: (1) Submit a written fraud declaration to the bank with your cybercrime reference number. (2) File a CIBIL dispute at cibil.com to place a fraud alert on your credit report — this warns all lenders. (3) Follow up in writing every 7 days until confirmation.',
          },
        ],
      },
    ],
  },

  /* ── Level 1: LinkedIn Profile Cloning — Beginner, Visual ── */
  'ii-p-1': {
    title: 'LinkedIn Profile Cloning',
    category: 'Identity & Impersonation',
    difficulty: 'Beginner',
    xp: 60,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'linkedInClone',
        envProps: {
          yourName:         'Priya Sharma',
          yourTitle:        'Senior Software Engineer at Infosys',
          yourLocation:     'Bengaluru, Karnataka',
          yourConnections:  '487',
          yourInitial:      'P',
          yourAvatarBg:     '#0077b5',
          cloneHandle:      'priya-sharma-infosys-engineer',
          realHandle:       'priya-sharma-infosys',
          cloneConnections: '3',
          cloneJoined:      'Joined 6 days ago',
          colleagueName:    'Rahul Verma',
          colleagueInitial: 'R',
          scamMessage:      'Hi Rahul, I\'m updating my contact list. Can you share your personal email and what project you\'re currently on? Also, our team lead asked me to collect everyone\'s employee IDs for the new access system.',
        },
        choices: [
          {
            id: 'ignored_request',
            text: 'You ignored the connection request and did nothing.',
            isCorrect: false,
            consequence: 'You ignored it. Over the next 3 days, the clone account connects with 23 of your contacts and collects employee IDs, personal emails, and project details from 6 colleagues who assumed it was really you. By the time a colleague flags it, significant data has already been harvested.',
            tip: 'Ignoring a profile clone without reporting it allows the attacker to continue targeting your network. Your connections trust messages from "you" — that trust is the weapon. Report and alert immediately.',
            terminalState: true,
          },
          {
            id: 'reported_clone',
            text: 'You reported the cloned profile to LinkedIn for impersonation.',
            isCorrect: true,
            consequence: 'You reported the profile using LinkedIn\'s "Report > Pretending to be someone else > Me" option. LinkedIn removes the clone within 24 hours. You also posted a brief warning on your own profile and messaged your closest connections directly. No colleague data was compromised.',
            tip: 'Reporting a clone on LinkedIn is quick: go to the profile → three dots (···) → Report → Pretending to be someone else → Me. LinkedIn takes impersonation seriously and acts within 24–48 hours. Report first, then alert your network.',
          },
          {
            id: 'alerted_contacts',
            text: 'You posted a public warning on your real profile and messaged your connections.',
            isCorrect: true,
            consequence: 'You posted "Someone has cloned my LinkedIn profile. Please do not accept connection requests or share any information with a profile that is not linkedin.com/in/priya-sharma-infosys." Several colleagues who had already accepted the clone request immediately withdrew the connection. You also reported the profile to LinkedIn.',
            tip: 'Publicly alerting your network is an effective defence because it uses the same trust channel the attacker is exploiting. Your connections are far more likely to see a warning from your real profile than to check a URL carefully. Do both — report to LinkedIn AND alert your network.',
          },
        ],
      },
      {
        id: 2,
        situation: 'You reported the clone and warned your connections. Later that day, your colleague Rahul messages you:\n\n"I got a message from what I thought was your profile asking for my employee ID and project details. I sent my employee ID before I realised it was a clone. What should I do?"\n\nWhat do you advise him?',
        choices: [
          {
            id: 'a',
            text: 'Tell him employee IDs are not sensitive — he doesn\'t need to do anything.',
            isCorrect: false,
            consequence: 'Employee IDs combined with names, email addresses, and project names can be used to craft convincing spear-phishing emails to Rahul\'s colleagues, impersonate him in internal systems, or socially engineer IT helpdesks into resetting passwords. Dismissing the risk was the wrong advice.',
            tip: 'Seemingly low-value data like an employee ID becomes dangerous when combined with other information. Always report any data that was shared under false pretences — let your organisation\'s security team assess the risk.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Tell him to report it to his IT security team immediately with the clone profile URL as evidence.',
            isCorrect: true,
            consequence: 'Rahul reports to the IT security team. They issue a company-wide advisory warning employees about the LinkedIn clone campaign. IT also checks whether the employee ID was used in any access attempts. No breach occurs. The IT team notes that 3 other employees had also shared information with the clone.',
            tip: 'Any data shared under false pretences must be reported to IT security immediately — even if the data seems minor. IT can assess whether the data creates an access risk, monitor for misuse, and alert other potentially affected employees. Speed of reporting determines the size of the damage.',
          },
        ],
      },
      {
        id: 3,
        situation: 'The clone has been removed. Rahul has reported to IT. Now you want to make sure your LinkedIn profile is harder to clone in the future.\n\nWhich settings changes are most effective?',
        choices: [
          {
            id: 'a',
            text: 'Delete your LinkedIn account — it\'s impossible to clone a profile that doesn\'t exist.',
            isCorrect: false,
            consequence: 'Deleting LinkedIn is not a realistic or necessary response. Attackers also scrape data from company websites, directories, conference speaker lists, and press releases. Reducing your LinkedIn exposure is useful — eliminating it entirely is unnecessary and professionally costly.',
            tip: 'Profile cloning doesn\'t require an active LinkedIn account — attackers scrape data before accounts are deleted. The correct approach is reducing the information available while keeping the professional benefits of the platform.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'Set your connections list to private, limit who can see your contact info, and enable profile viewing notifications.',
            isCorrect: true,
            consequence: 'You make your connections list visible only to you — this prevents the clone from easily identifying and targeting your network. You remove your phone number from the profile and restrict email visibility. You enable "Who viewed your profile" alerts. These changes significantly reduce the clone\'s ability to impersonate you effectively.',
            tip: 'The three most effective LinkedIn privacy settings against cloning: (1) Hide your connections list — under Settings > Visibility > Who can see your connections. (2) Remove personal contact details from public view. (3) Enable profile view notifications — unusual spikes in views can signal someone is scraping your profile to clone it.',
          },
        ],
      },
    ],
  },

}


export const CATEGORY_ROUTE_MAP = {
  'Financial Security':          'financial-security',
  'Identity & Impersonation':    'identity-impersonation',
  'Malware & Device Safety':     'malware-device-safety',
  'Online Commerce Safety':      'online-commerce-safety',
  'Phishing & Emerging Threats': 'phishing-emerging-threats',
  'Opportunity & Investment':    'opportunity-investment',
}

export const DIFF_COLORS = {
  Beginner:     '#2EB87A',
  Intermediate: '#D4891A',
  Advanced:     '#C94E4E',
}
