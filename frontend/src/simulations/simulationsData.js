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

  /* RANSOMWARE — PROFESSIONAL — Windows desktop encryption attack */
  'mal-virus-student': {
    title: 'Computer Virus: USB Autorun',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 60,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'virusFileManager',
        envProps: {
          usbLabel: 'USB Drive (E:) — "ClassNotes_Sem4"',
          usbMessage: 'USB Drive inserted. What would you like to do?',
        },
        situation: 'Your classmate hands you a USB drive with "Semester 4 notes" on it. You plug it into your laptop and a notification pops up.',
        choices: [
          {
            id: 'opened_autorun',
            text: 'Open the suspicious USB executable/autorun content to quickly view notes.',
            isCorrect: false,
            consequence: 'The moment you open the USB, an autorun script executes silently. The virus copies itself into your Documents, Desktop, and Downloads folders — renaming your files with hidden extensions. Your classmate did not know the drive was infected.',
            tip: 'Never use the autorun prompt for USB drives. Always open USB drives manually via File Explorer, and run an antivirus scan on the drive before opening any files. Autorun.inf scripts on USB drives are a classic virus delivery method.',
          },
          {
            id: 'scanned_usb',
            text: 'Cancel autorun and scan the USB with antivirus first.',
            isCorrect: true,
            consequence: 'Good instinct. The antivirus scan detects "Autorun.inf" and a disguised executable named "ClassNotes.exe". The files are quarantined. Your system stays clean. Your classmate is surprised — they had no idea their drive was infected.',
            tip: 'Always scan USB drives before opening them, especially shared drives from friends or colleagues. Right-click the drive in File Explorer and select "Scan with [Antivirus]". This takes 30 seconds and can prevent a full system infection.',
          },
          {
            id: 'ejected_safely',
            text: 'Cancel and give the drive back without opening it.',
            isCorrect: true,
            consequence: 'You hand back the drive without opening it. Safe choice. Later your classmate discovers the drive was infected after their home computer gets the virus from it. Your laptop is completely fine.',
            tip: 'If you have any doubt about a USB drive\'s safety — especially one you didn\'t buy yourself — the safest choice is to not use it. Politely ask for the files to be sent via email or cloud storage instead.',
          },
        ],
      },
      {
        id: 2,
        situation: 'Your friend asks you to help. They opened the USB on their laptop and now their files are showing strange ".locked" extensions. Their antivirus is warning about "WORM.Autorun.Generic". What do you tell them to do first?',
        choices: [
          {
            id: 'a',
            text: 'Restart the laptop — it will clear the virus from memory.',
            isCorrect: false,
            consequence: 'Restarting does not remove the virus. Many worms write themselves to startup entries, so they re-execute on every reboot. After the restart, the virus continues scanning the system for more files to infect.',
            tip: 'A restart does not remove malware. Worms and viruses typically persist through reboots by adding themselves to Windows startup registry keys or startup folders. Removal requires antivirus scanning in Safe Mode.',
          },
          {
            id: 'b',
            text: 'Immediately disconnect from Wi-Fi and run a full antivirus scan in Safe Mode.',
            isCorrect: true,
            consequence: 'Disconnecting stops the virus from sending copies via email or network shares. Safe Mode prevents the virus from loading at startup, making it easier for the antivirus to detect and remove it. Files with ".locked" extensions are restored after cleaning.',
            tip: 'Safe Mode + disconnected internet is the correct environment for virus removal. In Safe Mode (press F8 at boot), fewer background processes run, so the antivirus can find and remove virus files that would normally be locked by the OS.',
          },
          {
            id: 'c',
            text: 'Format the USB drive to remove the virus source.',
            isCorrect: false,
            consequence: 'Formatting the USB drive removes the source, but the virus has already copied itself onto the laptop. The infection is now on the local disk — formatting the USB changes nothing about the laptop\'s infection status.',
            tip: 'Formatting the source drive does not remove a virus that has already spread to a system. Once a virus has executed and copied itself to the hard drive, the source medium is irrelevant. Focus on cleaning the infected machine, not the delivery device.',
          },
        ],
      },
    ],
  },

  /* ── COMPUTER VIRUS — STUDENT (EMAIL ATTACHMENT) ──
     Platform: Desktop
     Environment: VirusEmailEnv
     Steps: 2 — suspicious mail + macro prompt → containment
  ── */
  'mal-virus-student-email': {
    title: 'Computer Virus: Email Attachment Trap',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 62,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'virusEmail',
        envProps: {
          senderName: 'Class Rep - ECE A',
          senderEmail: 'classrep.materials@ece-share-drive.net',
          emailSubject: 'Internal: Unit Test Notes + Lab Record Format',
          emailBody: [
            'Hi everyone,',
            'Please use the attached file for Unit Test prep and lab record format.',
            'The document is protected, so click Enable Content to view all pages correctly.',
            'Share this with your project groups today.',
          ],
          attachmentName: 'UnitTest_Notes_Viewer.docm',
          attachmentSize: '912 KB',
          userDisplayName: 'Student User',
          networkFiles: ['college_login_tokens.txt', 'saved_passwords.csv', 'project_report_draft.docx', 'photos_backup.zip', 'banking_shortcuts.url'],
        },
        situation: 'You receive a college-related email with an attachment that says macros must be enabled to view notes. The sender name looks familiar, but the domain is not your college domain.',
        choices: [
          {
            id: 'reported_email',
            text: 'Report the email and avoid opening the attachment.',
            isCorrect: true,
            consequence: 'You report it in time. The class group is alerted that the attachment is malicious, and multiple students avoid infection.',
            tip: 'For academic emails, verify the exact domain. Familiar display names can be spoofed, but domains reveal the source.',
          },
          {
            id: 'deleted_attachment',
            text: 'Delete the email and ask for notes through the official class channel.',
            isCorrect: true,
            consequence: 'You avoid the trap and request notes on the official LMS/WhatsApp class group. The fake email was part of a broad phishing attempt.',
            tip: 'Use official channels (LMS, class group, verified college ID) for study materials, not unknown attachment links.',
          },
          {
            id: 'enabled_macros',
            text: 'Enable content in the document to view all pages.',
            isCorrect: false,
            consequence: 'The macro runs a script that starts exfiltrating browser-saved credentials and sends copies to contacts. Infection spreads quickly.',
            tip: 'Never enable macros in unexpected documents. Macro prompts are a common malware delivery tactic in student and corporate environments.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: 'A friend enabled macros on the same file. Their laptop now shows unusual outbound network activity and suspicious file access. What should be done first?',
        choices: [
          {
            id: 'a',
            text: 'Disconnect Wi-Fi immediately and run a full antivirus scan.',
            isCorrect: true,
            consequence: 'Correct first move. Isolating the machine prevents further spread and data exfiltration while antivirus cleanup starts.',
            tip: 'Containment first, cleanup next. Disconnect network access immediately when malware activity is suspected.',
          },
          {
            id: 'b',
            text: 'Forward the attachment to classmates to ask if they can open it.',
            isCorrect: false,
            consequence: 'Forwarding spreads the malicious file to more people and increases the blast radius of the attack.',
            tip: 'Never forward suspicious attachments. Report to class admins/IT support instead.',
          },
          {
            id: 'c',
            text: 'Restart and continue using the laptop if the popups stop.',
            isCorrect: false,
            consequence: 'The malware persists after reboot and may resume background exfiltration silently.',
            tip: 'A reboot does not guarantee removal. Use isolation + scanning + password reset from a clean device.',
          },
        ],
      },
    ],
  },

  /* ── COMPUTER VIRUS — PROFESSIONAL ──
     Platform: Desktop
     Environment: VirusEmailEnv (office macro email)
     Steps: 2 — macro email → containment decision
  ── */
  'mal-virus-pro': {
    title: 'Computer Virus: Office Macro Attack',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 65,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'virusEmail',
        envProps: {
          senderName: 'Ravi Kumar',
          senderEmail: 'ravi.kumar@techvend0r-india.com',
          subject: 'Q3 Purchase Order — Final.docx',
          body: 'Dear Team,\n\nPlease find attached the finalised Q3 purchase order for your review and approval. The document requires macros to be enabled for the interactive approval fields to function correctly.\n\nKindly review and revert by EOD.\n\nRegards,\nRavi Kumar\nTechVendor Solutions',
          attachmentName: 'PurchaseOrder_Q3_Final.docx',
          macroWarningText: 'SECURITY WARNING: Macros have been disabled. Enable content to use interactive features.',
          infectionMsg: 'Virus spreading through your Outlook contacts list...',
          infectedContacts: ['ceo@yourcompany.com', 'hr@yourcompany.com', 'finance@yourcompany.com', 'allstaff@yourcompany.com'],
        },
        situation: 'You receive an email at work. It looks like a routine vendor document. The sender\'s name is familiar but you haven\'t emailed this vendor recently.',
        choices: [
          {
            id: 'enabled_macros',
            text: 'Enable macros to view the approval form as requested.',
            isCorrect: false,
            consequence: 'Enabling macros executes a Visual Basic script. Within 3 seconds it accesses Outlook\'s contact list and sends a copy of the email — with the infected attachment — to every contact in your address book, including the CEO, HR, and Finance. The IT department gets 47 alerts.',
            tip: 'Macro-enabled Office documents are the most common corporate malware delivery vector. Legitimate vendors never require you to enable macros. The email domain "techvend0r" (with a zero instead of o) is a telltale spoof. Always verify the sender domain carefully.',
            terminalState: false,
          },
          {
            id: 'reported_it',
            text: 'Do not open the attachment — forward it to IT security and delete it.',
            isCorrect: true,
            consequence: 'IT Security confirms the email is a phishing attempt. The domain "techvend0r-india.com" (note the zero) is a spoofed lookalike of your actual vendor\'s domain. The attachment contained a macro virus. Your report triggers a company-wide warning. No damage done.',
            tip: 'Before opening any unexpected attachment, verify the sender\'s exact email domain character by character. Attackers commonly substitute visually similar characters (0 for o, 1 for l). When in doubt, call the supposed sender directly — never reply to the suspicious email.',
          },
          {
            id: 'called_vendor',
            text: 'Call Ravi Kumar directly to verify before opening the attachment.',
            isCorrect: true,
            consequence: 'You call the real vendor. Ravi Kumar confirms he sent no such email. This is a Business Email Compromise (BEC) attack using a lookalike domain. You report it to IT Security. The attack is blocked before any damage.',
            tip: 'Calling to verify is the gold standard for suspicious work emails — especially those requesting action on attachments. Always use contact details from your company\'s existing records, not from the suspicious email itself.',
          },
        ],
      },
      {
        id: 2,
        situation: 'A colleague in your office did enable macros on the same email. Their computer is now sending automated emails to contacts. IT Security asks you to help contain the spread. What is the single most important immediate action?',
        choices: [
          {
            id: 'a',
            text: 'Delete all the outgoing emails from the colleague\'s Sent folder.',
            isCorrect: false,
            consequence: 'Deleting sent emails does not stop the virus — it has already sent infected emails to dozens of contacts. The virus script is still running on the machine, and the recipients have already received the malicious attachment.',
            tip: 'Deleting sent emails is ineffective after a macro virus has already executed. The virus script continues to run, and copies of the infected email are already in recipients\' inboxes. Email deletion is not a containment action.',
          },
          {
            id: 'b',
            text: 'Immediately disconnect the colleague\'s machine from the network — unplug ethernet and disable Wi-Fi.',
            isCorrect: true,
            consequence: 'Network isolation is correct. Disconnecting stops the macro virus from sending more emails, accessing shared drives, or communicating with its command-and-control server. IT Security can now clean the machine without risk of further spread.',
            tip: 'Network isolation is always the first containment step for any spreading malware. Physically disconnecting — unplugging the ethernet cable, not just disabling Wi-Fi from the taskbar — is the most reliable method, as some malware can re-enable Wi-Fi via software.',
          },
          {
            id: 'c',
            text: 'Install a new antivirus on the colleague\'s machine immediately.',
            isCorrect: false,
            consequence: 'Installing new software on an already-infected machine while it is still on the network can be risky. The virus is actively running and may interfere with the install. More importantly, the machine continues spreading the infection across the network during this time.',
            tip: 'Containment comes before remediation. A new antivirus installation cannot happen properly while the virus is actively running and the machine is network-connected. Isolate first, then clean with antivirus in Safe Mode.',
          },
        ],
      },
    ],
  },

  /* ── COMPUTER VIRUS — ELDERLY ──
     Platform: Desktop
     Environment: VirusEmailEnv (trusted contact forward)
     Steps: 2 — forwarded email → response
  ── */
  'mal-virus-elderly': {
    title: 'Computer Virus: Forwarded Email Trap',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 55,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'virusEmail',
        envProps: {
          senderName: 'Meena (Sister)',
          senderEmail: 'meena.rao1952@gmail.com',
          subject: 'Fwd: IMPORTANT — Government Health Scheme 2025 — Register Now',
          body: 'Dear all,\n\nFwd from my friend. This is very important. The government has announced a new health scheme for senior citizens. You must register before 31st March to get free medicines and hospital coverage.\n\nPlease open the attachment to fill the form. Share with all family members.\n\nMeena',
          attachmentName: 'HealthScheme_Registration_Form.exe',
          macroWarningText: 'This program is from an unverified publisher. Run anyway?',
          infectionMsg: 'The program is accessing your email contacts and bank bookmarks...',
          infectedContacts: ['daughter@gmail.com', 'son.abroad@gmail.com', 'granddaughter@gmail.com', 'friend.raju@gmail.com'],
        },
        situation: 'You receive a forwarded email from your sister Meena about a government health scheme. The message looks helpful and was sent by someone you trust.',
        choices: [
          {
            id: 'opened_attachment',
            text: 'Open the attachment to fill the registration form.',
            isCorrect: false,
            consequence: 'The file "HealthScheme_Registration_Form.exe" is not a form — it is a virus. It immediately accesses your email contacts and sends itself to your daughter, son, granddaughter, and other family members. It also bookmarks your banking sites for a later credential-stealing payload.',
            tip: 'Government forms are never .exe files. Government health schemes are announced on official sites like nhm.gov.in or pmjay.gov.in — never via forwarded email attachments. When you see a .exe file attached to an email, never open it — even if it came from a trusted contact.',
          },
          {
            id: 'called_sister',
            text: 'Call Meena directly and ask if she really sent this.',
            isCorrect: true,
            consequence: 'You call Meena. She says she just forwarded it without thinking — her friend sent it and it looked official. Neither of them opened the attachment yet. You both delete it. Meena\'s friend\'s computer was the original source of the virus.',
            tip: 'Calling to verify is always the right move when a forwarded email asks you to open a file or click a link — even from people you trust. Viruses often spread through trusted contacts precisely because we lower our guard with family. A quick call takes 1 minute and can prevent infection.',
          },
          {
            id: 'checked_gov_site',
            text: 'Ignore the email and check the official government website directly for the scheme.',
            isCorrect: true,
            consequence: 'You go to nhm.gov.in directly in your browser. There is no such scheme registration open. The email was entirely fake. The attachment was a virus. Your computer is safe and you delete the email.',
            tip: 'For any government scheme, always go directly to the official website — type the address yourself or use Google to find the official .gov.in domain. Never trust links or attachments in forwarded emails, however legitimate they look.',
          },
        ],
      },
      {
        id: 2,
        situation: 'Your daughter calls and says she opened the same forwarded email on her phone and clicked the attachment. Her phone is now showing strange behaviour — apps crashing and battery draining fast. What should she do?',
        choices: [
          {
            id: 'a',
            text: 'Delete the email from her phone and restart it.',
            isCorrect: false,
            consequence: 'Deleting the email and restarting does not remove the virus. The malicious app has already been installed and continues running. Simply restarting re-launches all startup apps, including the virus.',
            tip: 'Deleting the source email after an app has already been installed does not remove the installed app. The infection is on the device, not in the email anymore. Restarting does not uninstall malicious apps.',
          },
          {
            id: 'b',
            text: 'Go to Settings → Apps, find the suspicious app, and uninstall it, then run a Play Protect scan.',
            isCorrect: true,
            consequence: 'Your daughter finds an app called "HealthScheme" in her installed apps list — one she never intentionally installed. She uninstalls it. Google Play Protect confirms the threat has been removed. She also changes her email password as a precaution.',
            tip: 'After installing a suspicious app on Android, go to Settings → Apps → See all apps. Look for any recently installed app you do not recognise. Uninstall it, then run a Google Play Protect scan (Settings → Security → Play Protect). Also change passwords for any accounts you use on the device.',
          },
          {
            id: 'c',
            text: 'Tell her to immediately call the bank and inform them, then change all passwords.',
            isCorrect: true,
            consequence: 'Smart priority. Since the virus accessed banking bookmarks on the original computer, your daughter contacts her bank to flag potential credential theft and enables two-factor authentication. No fraudulent transactions occur because she acted quickly.',
            tip: 'If a device has been infected and you use banking apps or have saved bank passwords on it, contacting your bank immediately is always the right call. Banks can put temporary holds, disable net banking access, or flag unusual transactions — acting within the first hour is critical.',
          },
        ],
      },
    ],
  },

  /* ── TROJAN — STUDENT ──
     Platform: Desktop
     Environment: TrojanInstallerEnv (cracked game download)
     Steps: 2 — installer → task manager
  ── */
  'mal-trojan-student': {
    title: 'Trojan Horse: Cracked Game Download',
    category: 'Malware & Device Safety',
    difficulty: 'Intermediate',
    xp: 80,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'trojanInstaller',
        envProps: {
          siteName: 'GameCrackZone',
          siteUrl: 'gamecrackzone.net/download/progamer-deluxe',
          softwareName: 'ProGamer Deluxe 2025',
          softwareDesc: 'Full version with all DLCs unlocked. No activation key needed. Works offline.',
          softwareSize: '2.4 GB',
          downloads: '1,42,500',
          reviews: '4.8',
          reviewCount: '2,341',
          installerTitle: 'ProGamer Deluxe Setup',
          bundledItems: [
            { name: 'Install ProGamer Deluxe 2025', checked: true, locked: true },
            { name: 'Install SearchHelper Toolbar (Recommended)', checked: true, isMalware: false },
            { name: 'Set MySearch as default browser homepage', checked: true, isMalware: false },
            { name: 'Install System Performance Optimizer Pro', checked: true, isMalware: true, malwareNote: 'This installs a keylogger' },
          ],
          accentColor: '#4caf50',
        },
        situation: 'Your friends are all playing ProGamer Deluxe 2025. It costs ₹2,499. A classmate sends you a link to download the full game for free from "GameCrackZone". The site looks professional and has thousands of positive reviews.',
        choices: [
          {
            id: 'unchecked_malware',
            text: 'Read the installer carefully and uncheck "System Performance Optimizer Pro" before installing.',
            isCorrect: true,
            consequence: 'You notice "System Performance Optimizer Pro" is pre-checked but vaguely named. You uncheck it. The game installs but the keylogger payload is blocked. However, the site itself is still illegal and the game may contain other embedded malware not visible in the installer.',
            tip: 'Always read every screen in an installer. Bundled items are often pre-checked and positioned to look like optional features. Unchecking is better than accepting blindly, but downloading cracked software from unofficial sites always carries risk — including malware not disclosed in the installer.',
          },
          {
            id: 'cancelled_install',
            text: 'Close the installer without installing anything.',
            isCorrect: true,
            consequence: 'Good decision. You close the installer and delete the downloaded file. The game\'s publisher sells a student discount version for ₹799 on Steam. You buy the legitimate version and can play without risk.',
            tip: 'Cracked software from unofficial sites is never truly free — you pay with privacy or device security. Keyloggers from these installers can steal your college login, email passwords, and banking credentials silently for months. Student discounts on legitimate platforms like Steam, Amazon, or the developer\'s site are often available.',
          },
          {
            id: 'ran_installer',
            text: 'Click through the installer quickly without reading and install everything.',
            isCorrect: false,
            consequence: 'The "System Performance Optimizer" installs a keylogger that runs silently in the background. Over the next two weeks it captures your email password, college login credentials, and your parents\' UPI PIN when they use the laptop. The keylogger transmits everything to a remote server.',
            tip: 'Clicking through installers without reading is how the majority of PUP (Potentially Unwanted Program) and Trojan infections happen. Attackers design installers to look routine so users skip reading. The most dangerous checkbox is always the one that looks most official.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: 'Your roommate installed the same cracked game last week. He shows you his Task Manager and you notice "svchost-helper.exe" and "keylog-driver.sys" running — processes you don\'t recognise. CPU is at 28% with no apps open. What should you do?',
        choices: [
          {
            id: 'a',
            text: 'Search for "svchost-helper.exe" online to check if it is dangerous.',
            isCorrect: false,
            consequence: 'Searching online while the keylogger is running means every keystroke — including the search — is being logged. You also find conflicting results because attackers seed fake "it\'s safe" posts for their malware names. Time is wasted while credential theft continues.',
            tip: 'Do not type passwords or sensitive searches on a device you suspect has a keylogger. Every keystroke is being captured. If you need to research, use a different clean device. The suspicious process names were enough evidence to act immediately.',
          },
          {
            id: 'b',
            text: 'Immediately disconnect from internet, run a full antivirus scan, and change all passwords from a different device.',
            isCorrect: true,
            consequence: 'You disconnect the laptop from Wi-Fi to stop any live data transmission. The antivirus scan identifies and removes "keylog-driver.sys" and "svchost-helper.exe". Passwords are changed from your own clean device. No credential theft is confirmed.',
            tip: 'If you suspect a keylogger: (1) Disconnect from internet immediately to stop live transmission. (2) Run a full antivirus scan. (3) Change all important passwords from a DIFFERENT device — not the infected one. (4) Enable two-factor authentication where possible so passwords alone are not sufficient.',
          },
          {
            id: 'c',
            text: 'Uninstall the cracked game and restart the computer.',
            isCorrect: false,
            consequence: 'Uninstalling the game does not remove the Trojan. The keylogger was installed as a separate "System Performance Optimizer" component — it persists after the game is uninstalled. Restarting the computer re-launches the keylogger from its startup entry.',
            tip: 'Trojans install their malicious payload as a separate component from the software they disguise themselves as. Uninstalling the host software does not remove the Trojan. A dedicated antivirus scan is required to find and remove all components.',
          },
        ],
      },
    ],
  },

  /* ── TROJAN — PROFESSIONAL ──
     Platform: Desktop
     Environment: TrojanInstallerEnv (fake IT patch)
     Steps: 2 — fake update installer → RAT detection
  ── */
  'mal-trojan-pro': {
    title: 'Trojan Horse: Fake IT Security Patch',
    category: 'Malware & Device Safety',
    difficulty: 'Intermediate',
    xp: 85,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'trojanInstaller',
        envProps: {
          siteName: 'IT Security Update',
          siteUrl: 'windows-security-patch.com/critical-update',
          softwareName: 'Windows Security Patch KB5031356',
          softwareDesc: 'Critical security update addressing CVE-2024-38112. Apply immediately to protect against remote code execution.',
          softwareSize: '84 MB',
          downloads: '2,18,000',
          reviews: '4.9',
          reviewCount: '1,105',
          installerTitle: 'Windows Security Update',
          bundledItems: [
            { name: 'Apply Security Patch KB5031356', checked: true, locked: true },
            { name: 'Enable Windows Telemetry (Recommended)', checked: true, isMalware: false },
            { name: 'Install Remote Management Assistant', checked: true, isMalware: true, malwareNote: 'This installs a Remote Access Trojan' },
          ],
          accentColor: '#0078d4',
        },
        situation: 'You receive an email from "IT Support" saying a critical Windows security patch must be applied immediately. The link takes you to a page that looks like a Microsoft update portal. Your company\'s IT team sometimes sends patch notifications like this.',
        choices: [
          {
            id: 'unchecked_malware',
            text: 'Notice "Remote Management Assistant" is pre-checked and uncheck it before installing.',
            isCorrect: false,
            consequence: 'You uncheck the Remote Management Assistant, but the domain "windows-security-patch.com" is not Microsoft — it is a phishing site. Even with that component unchecked, the "patch" itself contains an embedded Trojan. The correct action was to verify the source first.',
            tip: 'Even if you spot and uncheck the suspicious component, downloading software from a non-official domain is still dangerous. Microsoft Windows updates are always delivered through Windows Update (Settings → Windows Update) — never through a website link in an email.',
          },
          {
            id: 'cancelled_install',
            text: 'Close everything and verify the update through official Windows Update settings.',
            isCorrect: true,
            consequence: 'You go to Settings → Windows Update and check for updates. There is no pending patch KB5031356. You forward the email to IT Security. They confirm it is a spear-phishing attack targeting your department. The attack is blocked before installation.',
            tip: 'Windows security patches are ONLY distributed through Windows Update (Settings → Update & Security → Windows Update) or your corporate WSUS server managed by IT. Any email with a link to download a "critical patch" is a social engineering attack. Always verify through official channels.',
          },
          {
            id: 'ran_installer',
            text: 'Install the patch as instructed — IT updates are always urgent.',
            isCorrect: false,
            consequence: 'The "Remote Management Assistant" installs a Remote Access Trojan (RAT). The attacker now has full control of your work computer — they can access company files, watch your screen live, use your credentials to log into internal systems, and move laterally to other machines on the network.',
            tip: 'Urgency is the attacker\'s most powerful tool. Legitimate IT security patches are never delivered as email links requiring immediate manual download. When an IT message creates extreme urgency ("apply NOW", "critical breach"), slow down — that pressure is a red flag, not a reason to comply faster.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: 'Your colleague in the same department received the same email and installed the "patch" yesterday. IT Security confirms a RAT is installed on their machine and the attacker has been accessing company files for 18 hours. What is the most critical action for IT Security to take RIGHT NOW?',
        choices: [
          {
            id: 'a',
            text: 'Change the colleague\'s Windows login password immediately.',
            isCorrect: false,
            consequence: 'Changing the password while the RAT is still active is insufficient. The attacker already has a persistent backdoor via the RAT — they do not need the Windows password to maintain access. The RAT will continue operating until the machine is isolated and cleaned.',
            tip: 'A Remote Access Trojan creates its own persistent access channel independent of your Windows login credentials. Changing passwords does not remove a RAT. The machine must be isolated from the network first to prevent ongoing access.',
          },
          {
            id: 'b',
            text: 'Isolate the machine from the network immediately and check which files and systems the attacker has accessed.',
            isCorrect: true,
            consequence: 'Network isolation cuts the attacker\'s live access. IT Security then analyses access logs and finds the attacker has been reading the HR salary database and client contract folder. No data has been exfiltrated yet. Isolation was made in time to prevent data theft.',
            tip: 'After a RAT incident: (1) Isolate the machine to cut live attacker access. (2) Preserve logs — do not restart or clean before forensic analysis. (3) Check what the attacker accessed, downloaded, or modified. (4) Check if they moved laterally to other machines. (5) Report to CERT-IN if it involves sensitive data.',
          },
          {
            id: 'c',
            text: 'Run antivirus on the affected machine to remove the RAT.',
            isCorrect: false,
            consequence: 'Running antivirus while the machine is still connected to the network allows the attacker to receive an alert through the RAT and potentially exfiltrate data before access is cut. Isolation must come before any remediation steps.',
            tip: 'The order matters: isolate first, remediate second. Running antivirus on an actively-controlled machine tips off the attacker and allows them to accelerate data exfiltration before you can act. Always isolate the network connection before beginning any cleanup.',
          },
        ],
      },
    ],
  },

  /* ── RANSOMWARE — PROFESSIONAL ──
     Platform: Desktop
     Environment: RansomwareDesktopEnv (Windows file encryption)
     Steps: 2 — ransom note → recovery decision
  ── */
  'mal-ransomware-pro': {
    title: 'Ransomware: Office File Encryption',
    category: 'Malware & Device Safety',
    difficulty: 'Advanced',
    xp: 100,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'ransomwareDesktop',
        envProps: {
          encryptDelayMs: 2500,
          ransomBtc: '0.5 BTC',
          ransomWallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf4a',
          countdownHours: 47,
          attackerEmail: 'decrypt0r@protonmail.ch',
        },
        situation: 'You are working on quarterly reports when your screen suddenly dims. Files on your desktop begin renaming one by one to ".locked" extensions. A ransom note appears.',
        choices: [
          {
            id: 'paid_ransom',
            text: 'Pay 0.5 BTC immediately — you cannot lose these files.',
            isCorrect: false,
            consequence: 'You pay ₹3,40,000 in Bitcoin. The attackers take 48 hours to respond. When they do, the decryption key provided only works on 60% of your files. The rest remain permanently encrypted. You also now appear on a "paying victims" list sold to other ransomware groups.',
            tip: 'Cybercrime authorities globally — including CERT-IN in India — advise against paying ransomware. Payment funds criminal operations, does not guarantee file recovery, and marks your organisation as one that pays — making you a target for future attacks.',
            terminalState: true,
          },
          {
            id: 'disconnected_network',
            text: 'Disconnect from the network immediately — unplug ethernet and turn off Wi-Fi.',
            isCorrect: true,
            consequence: 'You disconnect within 45 seconds of the ransom note appearing. IT confirms that network isolation prevented the ransomware from encrypting shared drives on the server. Only files on your local desktop are affected — shared project files and databases are safe. Recovery begins from backup.',
            tip: 'Network isolation is the single most critical first response to ransomware. Every second the infected machine stays connected, the ransomware encrypts more files — including shared network drives accessible by everyone in your organisation. Physical disconnection (pulling the cable) is faster and more reliable than software disabling.',
          },
          {
            id: 'restarted_computer',
            text: 'Restart the computer to clear the ransomware.',
            isCorrect: false,
            consequence: 'Restarting triggers the ransomware\'s secondary payload. During boot, it finishes encrypting the remaining files it had queued. After restart, the ransom note is now set as the desktop wallpaper and appears on every login. The encryption is complete.',
            tip: 'Never restart a ransomware-infected machine without expert guidance. Some ransomware strains use the brief reboot window to complete their encryption queue. Others install bootloaders that activate during restart. Isolation without restart is always the correct first step.',
            terminalState: true,
          },
        ],
      },
      {
        id: 2,
        situation: 'Your machine is isolated. IT confirms the last full backup was made three days ago. The ransomware has encrypted files created in the last three days — about 72 hours of work. IT Manager asks: how should we proceed with recovery?',
        choices: [
          {
            id: 'a',
            text: 'Restore from the three-day-old backup and accept the data loss.',
            isCorrect: true,
            consequence: 'The machine is wiped, reimaged from a clean OS image, and files are restored from the clean backup. Three days of work is lost but all company databases, client files, and shared resources are safe. IT patches the email gateway to block the exploit vector. A post-incident review is scheduled.',
            tip: 'Restoring from a clean backup is the standard and recommended recovery path for ransomware. Three days of data loss is painful but recoverable. This outcome reinforces why daily backups — especially to offline or air-gapped storage — are a non-negotiable security control.',
          },
          {
            id: 'b',
            text: 'Search online for a free decryption tool for this ransomware variant.',
            isCorrect: false,
            consequence: 'A search finds several "free decryptors" from unknown sites. Two of them are themselves malware. The one legitimate tool (from nomoreransom.org) does not support this ransomware variant. Two hours are wasted while the encrypted machine remains unclean.',
            tip: 'If a decryption tool is needed, use ONLY tools from nomoreransom.org — the official joint initiative by Europol, Interpol, and cybersecurity firms. Never download decryptors from random search results. In most cases, restoring from backups is faster and safer.',
          },
          {
            id: 'c',
            text: 'Attempt to recover the files using Windows Shadow Copy (Previous Versions).',
            isCorrect: true,
            consequence: 'IT checks Windows Shadow Copy. Some ransomware strains delete shadow copies — this one partially did, but files older than 5 days are recoverable. Combined with the backup, the team recovers 85% of the lost work. The remaining 15% must be recreated.',
            tip: 'Windows Shadow Copy (right-click a folder → Properties → Previous Versions) can sometimes recover files before the ransomware reached them. However, sophisticated ransomware specifically targets and deletes shadow copies. Always check — it costs nothing and may save hours of recovery work.',
          },
        ],
      },
    ],
  },

  /* ── RANSOMWARE — ELDERLY ──
     Platform: Mobile (Android screen-locker)
     Environment: RansomwareMobileEnv (fake police notice)
     Steps: 2 — phone locked → response
  ── */
  'mal-ransomware-elderly': {
    title: 'Ransomware: Phone Locked by Fake Police',
    category: 'Malware & Device Safety',
    difficulty: 'Advanced',
    xp: 90,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'ransomwareMobile',
        envProps: {
          fineAmount: '3,500',
          agencyName: 'Cyber Crime Investigation Bureau — MHA',
          warningTitle: 'YOUR DEVICE HAS BEEN LOCKED',
          lockDelayMs: 2500,
        },
        situation: 'You receive a WhatsApp message from an unknown number: "Govt health scheme APK — install for free medicines." You install the app. Minutes later, your phone screen goes black and then shows this.',
        choices: [
          {
            id: 'paid_fine',
            text: 'Pay ₹3,500 via UPI to unlock your phone.',
            isCorrect: false,
            consequence: 'You pay ₹3,500 to a UPI address shown on screen. Your phone remains locked — the payment option was fake. The attacker received your money but the ransomware is still running. You have now also confirmed that this UPI number is active, making you a target for follow-up calls.',
            tip: 'The Indian government, police, and courts NEVER lock your phone and demand payment via UPI or gift cards. This is called "scareware ransomware" — it uses official logos and legal language to frighten victims into paying. A real legal notice is always delivered physically through official channels, never via a phone lock screen.',
            terminalState: true,
          },
          {
            id: 'force_restart',
            text: 'Force restart the phone by holding the power button for 10 seconds.',
            isCorrect: false,
            consequence: 'Force restarting may give temporary relief on some Android devices. However, since you installed the ransomware as an APK app, it will restart with the phone and re-lock the screen. The restart bought you a few seconds of normal screen before the lock reappeared.',
            tip: 'Force restarting does not remove installed malware. Android ransomware that was installed as an app persists through restarts because it has system boot permissions. The malicious app must be uninstalled — which requires Safe Mode on Android since the ransomware blocks normal app removal.',
          },
          {
            id: 'contacted_support',
            text: 'Call a trusted family member or visit a service centre to help remove the app.',
            isCorrect: true,
            consequence: 'Your son helps. He boots the phone into Android Safe Mode (hold Power → long press "Power off" → select Safe Mode). In Safe Mode, the ransomware app cannot run. You find and uninstall the suspicious APK. The phone returns to normal.',
            tip: 'Android Safe Mode prevents third-party apps from launching — including ransomware. To enter: hold Power button → long press "Power off" option → tap "OK" for Safe Mode. In Safe Mode, go to Settings → Apps → find the suspicious recently installed app → Uninstall. Never pay screen-locker ransomware.',
          },
        ],
      },
      {
        id: 2,
        situation: 'The app is removed. Your neighbour Krishnama Aunty says she got the same WhatsApp message and also installed the app. Her phone is showing the same lock screen but she has already paid ₹3,500 to the UPI number. What should she do now?',
        choices: [
          {
            id: 'a',
            text: 'Pay more — the message says the fine is now ₹7,000 because of delay.',
            isCorrect: false,
            consequence: 'This is an escalation tactic. After the first payment, the attacker increased the demand. If she pays again, the same thing will happen. There is no legitimate authority behind this screen lock — every payment is lost money.',
            tip: 'Escalating demands after initial payment are a classic extortion tactic. Attackers know that once a victim has paid once, they are more likely to pay again. Never pay a second time. There is no "fine" to pay — it was fraud from the start.',
          },
          {
            id: 'b',
            text: 'Remove the malicious app using Safe Mode, file a complaint on cybercrime.gov.in, and call the bank to flag the UPI payment.',
            isCorrect: true,
            consequence: 'She removes the app in Safe Mode. She files a complaint on cybercrime.gov.in with the UPI number and screenshot. She calls her bank to flag the fraudulent UPI transaction. The bank initiates a reversal request — UPI fraud complaints within 24 hours have a reasonable chance of recovery.',
            tip: 'If you have paid a fraudster via UPI: (1) Call your bank immediately and report the transaction. UPI fraud reported within 24 hours can sometimes be reversed. (2) File a complaint on cybercrime.gov.in or call 1930. (3) Keep screenshots of the lock screen and UPI transaction as evidence. Report the UPI ID to NPCI via your bank.',
          },
          {
            id: 'c',
            text: 'Reset the phone to factory settings.',
            isCorrect: true,
            consequence: 'Factory reset removes all malware completely. The phone is clean. However, Krishnama Aunty also loses her photos and contacts since there was no backup. It works, but calling the bank about the fraudulent payment should also be done from another phone before the reset.',
            tip: 'Factory reset is a reliable last resort when Safe Mode removal is not possible. However: (1) Back up contacts and photos if accessible before resetting. (2) Make all urgent calls (bank, cybercrime helpline) from another phone BEFORE factory resetting, as you may need the device for evidence. (3) After reset, only re-install apps from the official Google Play Store.',
          },
        ],
      },
    ],
  },

  /* ── ADWARE — STUDENT ──
     Platform: Desktop
     Environment: AdwareBrowserEnv (browser hijack + popup storm)
     Steps: 2 — install → popup response
  ── */
  'mal-adware-student': {
    title: 'Adware & PUP: Browser Hijack',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 55,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'adwareBrowser',
        envProps: {
          siteName: 'FreeDownloadHub',
          siteUrl: 'freedownloadhub.net/video-converter',
          softwareName: 'UltraVideoConverter Pro',
          softwareDesc: 'Convert any video format for free. No watermark. No limits. Works on all browsers.',
          fakeHomepage: 'search.mysearchengine.net',
          toolbarName: 'VideoHelper Toolbar',
        },
        situation: 'You need to convert a video for a college presentation. A Google search leads you to "FreeDownloadHub" offering a free video converter. You download and run the installer.',
        choices: [
          {
            id: 'opened_settings',
            text: 'Open browser settings and remove hijacker changes immediately.',
            isCorrect: true,
            consequence: 'You move quickly to browser settings and remove the hijacker extension/homepage override before it fully entrenches itself. Popups drop and your search defaults are restored.',
            tip: 'For browser hijacks, immediate settings cleanup + extension removal is the fastest containment step before deeper cleanup.',
          },
          {
            id: 'closed_popups',
            text: 'Close popup storm windows, then uninstall the bundled app and clean browser components.',
            isCorrect: true,
            consequence: 'You close the fake alerts, remove the bundled software, reset browser settings, and clear notification permissions. Hijack behavior stops.',
            tip: 'Adware removal works best as a sequence: close fake prompts, uninstall bundle, remove extension, reset browser, then scan for leftovers.',
          },
          {
            id: 'ran_cleanup',
            text: 'Click popup-style security prompts and follow whatever they ask.',
            isCorrect: false,
            consequence: 'Your browser homepage changes to "search.mysearchengine.net". A "VideoHelper Toolbar" appears in your browser. Every search is now routed through an ad-injecting proxy. Within 30 minutes, popup ads start appearing — fake PC warnings, prize claims, and update prompts. Your browsing data is being sold.',
            tip: 'Browser toolbars and homepage hijackers seem minor but they: (1) Track every website you visit. (2) Inject ads into pages. (3) Redirect your searches through their servers. (4) Are difficult to remove once installed. There is no "just a toolbar" — they are data collection tools masquerading as convenience features.',
          },
        ],
      },
      {
        id: 2,
        situation: 'Your browser has been hijacked — the homepage changed to "search.mysearchengine.net" and you cannot change it back through browser settings. Popup ads appear every 2 minutes. How do you properly remove the adware?',
        choices: [
          {
            id: 'a',
            text: 'Change the homepage manually in browser settings and reinstall the browser.',
            isCorrect: false,
            consequence: 'You change the homepage but it reverts after every restart. Reinstalling the browser does not help because the PUP wrote itself to Windows startup and a browser extension. It rewrites the homepage setting every time the browser launches.',
            tip: 'Browser PUPs typically persist in three places: a browser extension, a Windows startup entry, and sometimes a scheduled task. Changing the homepage in browser settings without removing these underlying components has no lasting effect. You must find and remove all three.',
          },
          {
            id: 'b',
            text: 'Uninstall the video converter from Control Panel, remove the browser extension, and reset browser settings to default.',
            isCorrect: true,
            consequence: 'You uninstall "UltraVideoConverter Pro" from Control Panel (which removes the startup entry). You remove the "VideoHelper" extension from browser extensions. You reset Chrome settings (Settings → Reset → Restore settings to original defaults). The browser is clean.',
            tip: 'Complete PUP removal requires: (1) Uninstall from Control Panel/Settings → Apps. (2) Remove the browser extension (chrome://extensions or Firefox Add-ons). (3) Reset browser settings to default. (4) Optionally: run Malwarebytes AdwCleaner (free tool) to catch any residual entries in the registry or scheduled tasks.',
          },
          {
            id: 'c',
            text: 'Run a full system antivirus scan.',
            isCorrect: false,
            consequence: 'Standard antivirus scans often miss PUPs (Potentially Unwanted Programs) because they are technically "consent-ware" — the user clicked "I Agree" during installation. The antivirus reports no threats, but the adware continues running and showing popups.',
            tip: 'Standard antivirus tools are often not designed to detect PUPs because they were installed with user consent (buried in the installer). For adware removal specifically, use dedicated tools like Malwarebytes AdwCleaner or HitmanPro, which target PUPs differently than traditional antivirus.',
          },
        ],
      },
    ],
  },

  /* ── ADWARE — ELDERLY ──
     Platform: Mobile (Android fake app)
     Environment: AdwareMobileEnv (fake flashlight with ad storm)
     Steps: 2 — app install → popup response
  ── */
  'mal-adware-elderly': {
    title: 'Adware: Fake App from Outside Play Store',
    category: 'Malware & Device Safety',
    difficulty: 'Beginner',
    xp: 55,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'adwareMobile',
        envProps: {
          appName: 'Super Flashlight Pro',
          packageName: 'com.superflash.free',
          appIcon: 'flashlight',
          permissionsRequested: ['Contacts', 'Location', 'Camera', 'Microphone', 'Storage', 'Phone', 'SMS'],
          adFrequencySeconds: 15,
        },
        situation: 'Your grandchild sends you a WhatsApp message: "Dadi/Nana, install this — best torch app, very bright, free!". They share an APK file directly in WhatsApp (not a Play Store link).',
        choices: [
          {
            id: 'accepted_permissions',
            text: 'Install the app and accept all the permissions it requests.',
            isCorrect: false,
            consequence: 'The "flashlight" app works, but it asks for access to Contacts, Location, Microphone, Camera, SMS and Phone. After granting all of these, the app begins showing fullscreen ads every 15 seconds. Your contact list is uploaded to an ad server. Your location is tracked and sold. Fake security warnings appear asking you to call a number.',
            tip: 'A flashlight app has no legitimate reason to access Contacts, Location, Microphone, Camera, or SMS. When an app requests permissions that have nothing to do with its advertised function, that is a major red flag. Legitimate flashlight apps need only Camera permission (to control the LED). Excessive permissions = data harvesting.',
          },
          {
            id: 'declined_and_refused',
            text: 'Tell your grandchild you prefer to get apps only from the Google Play Store.',
            isCorrect: true,
            consequence: 'You look for "Flashlight" on the Google Play Store directly. You find an app from Google with 4.8 stars and 500 million installs that requests only the Camera permission. It works perfectly with no ads and no suspicious permissions.',
            tip: 'The Google Play Store is not perfect, but it provides baseline safety checks that sideloaded APKs do not. Never install APK files sent via WhatsApp, SMS, or websites — even from people you trust, as they may not know the file is dangerous. Always use the Play Store or App Store for downloads.',
          },
          {
            id: 'checked_permissions',
            text: 'Install the app but deny all permissions except Camera when it asks.',
            isCorrect: true,
            consequence: 'You install the app and when it asks for Contacts — you tap Deny. Location — Deny. Microphone — Deny. Camera — Allow. The flashlight works. The app still shows some ads, but without your personal data permissions, the harm is limited. You later uninstall it and find a Play Store alternative.',
            tip: 'Denying unnecessary permissions limits the damage an adware app can do. On Android, you can also review and revoke permissions after installation: Settings → Apps → [App name] → Permissions. This is a good safety habit for all apps — not just suspicious ones.',
          },
        ],
      },
      {
        id: 2,
        situation: 'Your neighbour Suresh Uncle has had a "free games app" on his Android phone for a month. He says ads pop up every few minutes, his phone battery drains in 3 hours (used to last a day), and recently got a call from someone claiming to be "Google Support" saying his phone has a virus. What should Suresh Uncle do?',
        choices: [
          {
            id: 'a',
            text: 'Call the "Google Support" number back — they can help remove the ads.',
            isCorrect: false,
            consequence: 'The "Google Support" caller is a tech support scammer. They likely triggered fake pop-up ads on his phone specifically to generate these calls. If Suresh Uncle calls back, the scammer will ask him to install a remote access app — giving them full control of his phone and banking apps.',
            tip: 'Google never calls users to inform them about phone viruses. Tech support scammers use adware and scare popups specifically to manufacture the problem they then offer to "fix". Never call numbers shown in pop-up warnings, and never accept calls from strangers claiming to be tech support for Google, Microsoft, or Apple.',
          },
          {
            id: 'b',
            text: 'Find the suspicious app in Settings → Apps and uninstall it, then run a Play Protect scan.',
            isCorrect: true,
            consequence: 'Suresh Uncle finds "FunGames Unlimited" installed 1 month ago — right when the problems started. He uninstalls it. Play Protect scan finds no further threats. Ads stop immediately. Battery returns to normal. He never calls the "Google Support" number.',
            tip: 'Battery drain and constant popup ads are reliable symptoms of adware. The fix is almost always removing the offending app: Settings → Apps → See all apps → sort by Install Date. Find apps installed around when problems started. Uninstall them. Then run Play Protect (Settings → Security → Play Protect → Scan).',
          },
          {
            id: 'c',
            text: 'Turn off mobile data and Wi-Fi to stop the ads.',
            isCorrect: false,
            consequence: 'Turning off data reduces the number of ads temporarily (since most ads require internet to load), but the adware app is still installed and running. When he turns data back on, the ads return. The app is still collecting whatever local data it has access to.',
            tip: 'Disabling internet stops ad loading but does not remove the app causing it. Some adware also caches ads locally to display even without internet. The solution is always to remove the offending app — disabling internet is only a temporary workaround.',
          },
        ],
      },
    ],
  },


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
    difficulty: 'Intermediate',
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
            id: 'a',
            text: 'You scanned the QR code and proceeded to pay.',
            isCorrect: false,
            consequence: 'You scanned the QR. Your UPI app showed a payment request of ₹12,000 — not ₹500 — to an unknown UPI ID. You realised just in time and cancelled. The QR was designed to collect a far larger amount than discussed. Had you entered your PIN, ₹12,000 would have left your account.',
            tip: 'A UPI QR code can ONLY send money FROM you — it cannot receive money into your account. Any stranger asking you to "scan to return" money is running this exact scam. Always check the amount and recipient before entering your PIN.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You sent the money back directly using their UPI ID — without scanning.',
            isCorrect: false,
            consequence: 'You transferred ₹500 directly. Three days later your bank notified you that the original ₹500 credit was from a stolen account — its owner is now disputing the transaction and the bank may reverse it. The person you "returned" it to was the fraudster who made the original transfer from a victim\'s account.',
            tip: 'Unexpected credits should not be returned immediately via transfer. Contact your bank to reverse it through official channels — the original sender may themselves be a victim whose account was misused.',
          },
          {
            id: 'c',
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

  /* ═══════════════════════════════════════════════════════
     FINANCIAL SECURITY - VISUAL SIMULATIONS
  ═══════════════════════════════════════════════════════ */

  /* ── Bank KYC Update Scam — Beginner, Visual ── */
  'fs-v-kyc-1': {
    title: 'Bank KYC Update Scam',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'smsConversation',
        envProps: {
          senderName: 'HDFC Bank',
          trackingId: 'KYC-UPDATE',
          fakeDomain: 'hdfc-kyc-update.com',
          amount: 'KYC Verification',
        },
        situation: 'You receive an SMS from what appears to be your bank asking you to update your KYC (Know Your Customer) information. The message looks official and includes a link.',
        choices: [
          {
            id: 'a',
            text: 'You click on the link to update your KYC details.',
            isCorrect: false,
            consequence: 'The link opens a fake bank website that looks identical to the real HDFC portal. It asks you to enter your account number, Aadhaar, date of birth, and CVV. You realise too late — real banks never ask for CVV or Aadhaar via SMS.',
            tip: 'Banks never ask you to verify KYC details via SMS links. Always log in directly through the official app or website, not through links in messages.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You ignore the SMS and log into your bank app to check if any action is needed.',
            isCorrect: true,
            consequence: 'You open your HDFC Bank app and log in directly. No KYC update is required — your information is current. The SMS was a phishing attempt. You report the number to the bank.',
            tip: 'Never click links from unexpected SMS messages, even if they look official. Always access your bank account through the official app or website to verify any claims.',
          },
          {
            id: 'c',
            text: 'You call the bank using the number on your debit card to verify the message.',
            isCorrect: true,
            consequence: 'The bank confirms they sent no such SMS. Your KYC is current. They advise you not to click any links and report the phishing SMS. You mark the message as spam.',
            tip: 'When in doubt, call your bank directly using the number on your card. This is the fastest way to verify whether a message is legitimate.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeGovPortal',
        envProps: {
          portalName: 'HDFC Bank KYC Portal',
          portalUrl: 'hdfc-kyc-verify.in',
          fields: ['Account Number', 'Aadhaar Number', 'Date of Birth', 'CVV'],
          logoStyle: { background: '#003580' },
        },
        situation: 'If you had clicked the link, this fake KYC portal would appear. It mimics the official HDFC Bank interface perfectly.',
        choices: [
          {
            id: 'a',
            text: 'You notice the domain is "hdfc-kyc-verify.in" instead of "hdfc.com" and close the page immediately.',
            isCorrect: true,
            consequence: 'Smart catch! The URL is the biggest tell. Real banks use their official domain (.com or .co.in directly under their name). You close the page, report it, and your data is safe.',
            tip: 'Always check the URL in your browser\'s address bar. Scammers use domains that look similar (hdfc-kyc-verify.in) but are not the official domain (hdfc.com). This is the fastest security check.',
          },
          {
            id: 'b',
            text: 'You enter your account number and Aadhaar to complete the update.',
            isCorrect: false,
            consequence: 'Your data is captured by the scammer. Within hours, a loan application is submitted using your Aadhaar and account details. Your credit profile is compromised.',
            tip: 'Never enter sensitive financial information (account numbers, Aadhaar, CVV) on any website unless you initiated the visit and confirmed the domain is official.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── OTP Sharing Fraud — Beginner, Visual ── */
  'fs-v-otp-1': {
    title: 'OTP Sharing Fraud',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'smsConversation',
        envProps: {
          senderName: 'Bank Customer Care',
          trackingId: 'OTP-VERIFICATION',
          fakeDomain: 'bank-verify.com',
          amount: 'OTP Request',
        },
        situation: 'You receive an SMS followed by a call claiming to be from your bank\'s customer care. They say your account has suspicious activity and need your OTP to verify your identity.',
        choices: [
          {
            id: 'a',
            text: 'You provide your OTP to "prove" your identity.',
            isCorrect: false,
            consequence: 'The moment you share the OTP, the scammer uses it to authorise a large transfer from your account. OTP is never meant to be shared with anyone, even your bank. Your money is gone.',
            tip: 'OTP = One-Time Password. It authorises a specific transaction. Never share it with anyone, even if they claim to be from your bank.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You refuse to share the OTP and hang up immediately.',
            isCorrect: true,
            consequence: 'You hang up and call your bank directly using the number on your card. They confirm they never called you. No transaction was completed. Your account is secure.',
            tip: 'Banks never ask for OTPs over the phone. If someone calls asking for an OTP, it\'s a scam. Hang up and call the bank using the official number.',
          },
          {
            id: 'c',
            text: 'You realise the SMS has no OTP in it (unusual), so you think it\'s a vishing scam and hang up.',
            isCorrect: true,
            consequence: 'Correct! Real bank SMSs always include OTPs for security reasons. This SMS asking you to provide an OTP over the phone was definitely a scam. You hang up and report the number.',
            tip: 'Real bank security SMSs always include the 6-digit OTP in the message. If someone calls asking for an OTP they claim they sent, it\'s a scam.',
          },
        ],
      },
      {
        id: 2,
        environment: 'authorityCall',
        envProps: {
          callerName: 'Bank Fraud Division',
          callerTitle: 'Customer Service Representative',
          phoneNumber: '+91-8800-XXXXX',
          message: 'Sir, this is urgent. We detected unauthorized access to your account. Share your OTP to lock it immediately.',
          isSpoofed: true,
        },
        situation: 'The "bank" calls again, this time with more urgency. They claim someone is trying to access your account right now.',
        choices: [
          {
            id: 'a',
            text: 'Panic sets in. You share the OTP to "lock" your account.',
            isCorrect: false,
            consequence: 'There is no "lock with OTP" feature in any bank. The scammer uses the OTP to transfer ₹50,000 from your account. By the time you realise, the money is in a mule account.',
            tip: 'Urgency and panic are tools of scammers. Real banks give you time to verify through official channels. Never act on urgent calls — always verify first.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You tell them you will verify the call with the bank and call them back using the number on your card.',
            isCorrect: true,
            consequence: 'You call the official number. The bank confirms no such call was made and no suspicious activity detected. You report the scam number to the bank and cybercrime portal.',
            tip: 'If any call creates urgency about your money, verify it independently before taking any action. Use the official number from your card, not any number from the call.',
          },
        ],
      },
    ],
  },

  /* ── Lottery/Prize Scam — Beginner, Visual ── */
  'fs-v-lottery-1': {
    title: 'Lottery / Prize Scam',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'smsConversation',
        envProps: {
          senderName: 'Lucky Prize Draw',
          trackingId: 'DRAW-2024',
          fakeDomain: 'luckyprize.in',
          amount: '₹5,00,000',
        },
        situation: 'You receive an SMS saying you have won ₹5,00,000 in a national lottery. You never entered any lottery. The message includes a link to "claim your prize."',
        choices: [
          {
            id: 'a',
            text: 'You click the link to claim your prize — it seems legitimate.',
            isCorrect: false,
            consequence: 'The website shows your "winnings" and asks for a "processing fee" of ₹15,000 to release the funds. You pay, then they ask for "tax clearance fees," Then "bank account verification fees." You end up paying ₹45,000 total. No prize ever comes.',
            tip: 'You cannot win a lottery you did not enter. Any unsolicited prize notification followed by fee requests is fraud. Real lotteries never ask for upfront fees.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You search for "National Lottery 2024" on the official website and find you\'ve never entered.',
            isCorrect: true,
            consequence: 'You realise you never participated in any lottery, so the claim is impossible. You delete the SMS and do not click any links. Your money is safe.',
            tip: 'You cannot win a contest you didn\'t enter. That\'s the simplest check. If you have no memory of participating, it\'s definitely a scam.',
          },
          {
            id: 'c',
            text: 'You report the SMS as spam to your telecom provider without clicking any links.',
            isCorrect: true,
            consequence: 'You report the number to your telecom provider\'s anti-fraud system. The SMS is flagged and the scam number is traced. You contribute to blocking future victims from the same campaign.',
            tip: 'Reporting spam helps your provider identify and shut down scam campaigns. Always report lottery and prize SMSs you receive.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeStore',
        envProps: {
          shopName: 'Lucky Prize Claims Portal',
          shopUrl: 'luckyprize.in',
          items: [{ name: 'You have won ₹5,00,000!', price: 'Processing Fee: ₹15,000', image: '🎁' }],
          ctaText: 'Claim Prize Now',
          productColor: '#FFD700',
        },
        situation: 'If you had clicked, this is what would appear — a fake prize claiming website with escalating fee requests.',
        choices: [
          {
            id: 'a',
            text: 'You notice it asks for a fee before releasing "your" prize and immediately close the page.',
            isCorrect: true,
            consequence: 'Smart! No legitimate lottery or prize draw asks for an upfront fee. You close the page and don\'t share any data with the site.',
            tip: 'The universal rule: Legitimate prizes are never released after paying a fee. Any fee request is certain fraud.',
          },
          {
            id: 'b',
            text: 'You pay the ₹15,000 "processing fee" to get your prize.',
            isCorrect: false,
            consequence: 'After paying, the site says your prize requires "tax clearance" (another ₹25,000), then "bank verification" (another ₹12,000). You realise the scam only after losing ₹52,000.',
            tip: 'Advance fees are never for real prizes. Every fee request is a red flag. Stop engaging once fees are mentioned.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Pension/Government Benefits Scam — Beginner, Visual ── */
  'fs-v-pension-1': {
    title: 'Pension / Government Benefits Scam',
    category: 'Financial Security',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'smsConversation',
        envProps: {
          senderName: 'Govt. Pension Portal',
          trackingId: 'PENSION-VERIFY',
          fakeDomain: 'pension-verify.gov.in',
          amount: 'Pension Verification',
        },
        situation: 'You receive an official-looking SMS claiming your pension account will be suspended unless you verify your details on a government portal within 24 hours.',
        choices: [
          {
            id: 'a',
            text: 'You click the link to verify your details on the "government portal."',
            isCorrect: false,
            consequence: 'The fake portal asks for your Aadhaar, bank account, and OTP. You enter your details. The scammer now has access to your pension account and can file fraudulent claims.',
            tip: 'Government portals never ask you to verify via SMS links. Real pensions are accessed through official channels with proper login credentials.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You ignore the SMS and log into the official Pension Portal (pension.gov.in) directly.',
            isCorrect: true,
            consequence: 'You log in directly and find no such notification. Your pension account is fine. The SMS was a phishing attempt. You report it to the pension office.',
            tip: 'Never click links from unsolicited SMSs about government benefits. Always access government portals directly through the official URL.',
          },
          {
            id: 'c',
            text: 'You call your local pension office using the number from your pension documents.',
            isCorrect: true,
            consequence: 'The office confirms your pension is active and no verification was needed. They log the scam attempt and advise you to report it. Your benefits are secure.',
            tip: 'Government offices maintain phone lines for exactly this reason. When in doubt, call directly using the number from your official documents.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeGovPortal',
        envProps: {
          portalName: 'Government Pension Portal',
          portalUrl: 'pension-verify.gov.in',
          fields: ['Aadhaar Number', 'Bank Account Number', 'OTP from SMS'],
          logoStyle: { background: '#004B87' },
        },
        situation: 'This is the fake portal that would appear if you clicked the link — it looks like a government website.',
        choices: [
          {
            id: 'a',
            text: 'You check the domain and notice it says "pension-verify.gov.in" instead of "pension.gov.in" — a subtle difference.',
            isCorrect: true,
            consequence: 'You noticed the typo! The real portal is pension.gov.in. This clone added "-verify" to the domain to appear official. You close it immediately.',
            tip: 'Scammers use URLs that look similar to official ones. Always check the exact domain spelling. Add extra words like "-verify" or "-check" are red flags.',
          },
          {
            id: 'b',
            text: 'You enter your Aadhaar and bank details to verify your identity.',
            isCorrect: false,
            consequence: 'Your Aadhaar and banking information are now in the scammer\'s hands. They can open fraudulent accounts, take loans, or file false claims in your name.',
            tip: 'Never enter Aadhaar or banking details on any website unless you initiated the visit through the official channel.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Investment/Trading Scam — Advanced, Visual ── */
  'fs-v-invest-1': {
    title: 'Investment / Trading Scam',
    category: 'Financial Security',
    difficulty: 'Advanced',
    xp: 100,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'socialAd',
        envProps: {
          adTitle: 'GUARANTEED 50% Monthly Returns! 📈',
          adDescription: 'Join 50,000+ members earning passive income. Real traders managing your money. Limited slots available.',
          adCta: 'Join Exclusive Trading Group',
          adImage: '📊',
          adColor: '#1FCC79',
        },
        situation: 'You see an ad on social media promising guaranteed 50% monthly returns on a trading platform. It shows testimonials from "real traders" earning ₹1,00,000+ monthly.',
        choices: [
          {
            id: 'a',
            text: 'You join the group to learn more about the opportunity.',
            isCorrect: false,
            consequence: 'The group floods you with "profit screenshots." An admin DMs you privately with a "limited offer" — invest ₹50,000 for guaranteed 50% returns. You deposit. The next day, the admin goes offline. The group disappears. You\'ve lost ₹50,000.',
            tip: 'No investment can guarantee 50% monthly returns. Anyone promising this is committing fraud. Screenshots of profits are trivially easy to fake.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You search "[company name] trading scam" before clicking anything.',
            isCorrect: true,
            consequence: 'Your search returns dozens of fraud complaints and articles explaining this exact scam structure. You realise it\'s a "pump and dump" scheme targeting inexperienced investors. You do not click the link.',
            tip: 'Before engaging with any investment opportunity, search "[name] scam" or "[name] fraud" on Google. Scammers rely on targets not researching. Real traders don\'t need ads — they have track records.',
          },
          {
            id: 'c',
            text: 'You check if the investment platform is registered on the SEBI website before engaging.',
            isCorrect: true,
            consequence: 'You visit sebi.gov.in and search for the trading platform. It\'s not registered. You report the ad to the social media platform for impersonation and investment fraud.',
            tip: 'All legitimate investment platforms in India must be registered with SEBI (Securities and Exchange Board of India). Check sebi.gov.in before investing any money. If it\'s not there, it\'s not legitimate.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeStore',
        envProps: {
          shopName: 'Elite Trading Platform',
          shopUrl: 'elitetrading-pro.com',
          items: [
            { name: 'Invest ₹50,000', price: 'Returns: ₹75,000 (Month 1)', image: '💰' },
            { name: 'Invest ₹1,00,000', price: 'Returns: ₹1,50,000 (Month 1)', image: '💵' },
          ],
          ctaText: 'Invest Now - Limited Slots!',
          productColor: '#00D084',
        },
        situation: 'This is the fake trading platform dashboard. It shows "live trading" with constant profits and a progress bar showing "99% Capital Safety."',
        choices: [
          {
            id: 'a',
            text: 'You notice the platform guarantees 50% returns and claims "99% capital safety" — claims no real trader makes.',
            isCorrect: true,
            consequence: 'Real investments have risk. No platform can guarantee returns or capital safety. You close the page and report it to SEBI as an investment scam.',
            tip: 'The moment you see "guaranteed returns" or "100% safe," it\'s a scam. Legitimate investments always disclose risks clearly.',
          },
          {
            id: 'b',
            text: 'You deposit ₹50,000 to start earning the promised returns.',
            isCorrect: false,
            consequence: 'Your dashboard shows ₹75,000 in "profits" the next day, encouraging you to deposit more. You add another ₹1,00,000. Two days later, the platform goes offline. The "profits" were never real — you\'ve lost ₹1,50,000.',
            tip: 'The initial "profits" you see in your account are fiction shown on a fake dashboard. They\'re designed to make you deposit more money. Once you can\'t withdraw, you\'ll realise the truth.',
            terminalState: true,
          },
          {
            id: 'c',
            text: 'Before depositing more, you try to withdraw your "profits" to verify the platform is real.',
            isCorrect: true,
            consequence: 'Your withdrawal request is denied with messages like "Pending verification" or "Minimum deposit too low." You try contacting support — no response. You realise the profits were never real and close the account without depositing.',
            tip: 'Before depositing a large sum, always test withdrawal of small amounts first. Scam platforms will block withdrawals while claiming you need to deposit more. This is the ultimate test of legitimacy.',
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     CAREER, EDUCATION & OPPORTUNITY - VISUAL SIMULATIONS
  ═══════════════════════════════════════════════════════ */

  /* ── Fake Job Offer Scam — Intermediate, Visual ── */
  'ceo-v-job-1': {
    title: 'Fake Job Offer Scam',
    category: 'Career, Education & Opportunity',
    difficulty: 'Intermediate',
    xp: 85,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'officialEmail',
        envProps: {
          senderName: 'Google India Recruitment',
          senderEmail: 'recruitment@google-india.com',
          subject: 'Job Offer — Senior Software Engineer Position',
          emailBody: `Dear Candidate,

Congratulations! You have been selected for the Senior Software Engineer position at Google India.

Position Details:
- Location: Bangalore
- Salary: ₹40,00,000/year
- Start Date: Immediate

To proceed with your onboarding, please complete the registration and background verification process on our portal.

Registration Link: [Complete Onboarding]

Best regards,
Google India Recruitment Team`,
          companyLogo: '🔵',
        },
        situation: 'You receive an email from what appears to be Google\'s recruitment team offering you a job as a Senior Software Engineer with a competitive salary. You never applied to this position.',
        choices: [
          {
            id: 'a',
            text: 'You click the registration link to proceed with onboarding.',
            isCorrect: false,
            consequence: 'The portal asks you to complete "background verification" and requests a registration fee of ₹5,000 for document processing. You pay, thinking it\'s a legitimate company process. After paying, the site disappears.',
            tip: 'Legitimate companies never charge registration or document processing fees. Any fee requested by a recruiter is a red flag.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You notice the email is from "google-india.com" — not the official Google domain. You check Google\'s official careers website.',
            isCorrect: true,
            consequence: 'Google\'s official domain is "google.com," not "google-india.com." The email is a phishing attempt. You check careers.google.com and find you were never shortlisted. You report the email as phishing.',
            tip: 'Check the sender\'s email domain carefully. Scammers use domains that look similar to official ones (google-india vs google). Always verify through the official channels.',
          },
          {
            id: 'c',
            text: 'You call Google\'s official HR number to verify the job offer.',
            isCorrect: true,
            consequence: 'Google\'s HR confirms they never sent you an offer. They log the details as part of a phishing campaign. You report the email address to their security team.',
            tip: 'If you\'ve never applied and receive a surprise job offer, verify it directly with the company\'s official HR department before acting on it.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeStore',
        envProps: {
          shopName: 'Google Onboarding Portal',
          shopUrl: 'google-onboarding-in.com',
          items: [
            { name: 'Document Processing Fee', price: '₹5,000', image: '📄' },
            { name: 'Background Verification', price: '₹8,000', image: '✓' },
          ],
          ctaText: 'Pay & Continue Onboarding',
          productColor: '#4285F4',
        },
        situation: 'This is the fake onboarding portal. It requests escalating fees for various "required" processes.',
        choices: [
          {
            id: 'a',
            text: 'You realise legitimate companies process documents and verification internally without charging employees.',
            isCorrect: true,
            consequence: 'You recognise the scam immediately and do not pay anything. You report the portal to Google\'s security team as an impersonation site.',
            tip: 'No legitimate employer charges an employee for document processing or background verification. These are standard HR processes covered by the company.',
          },
          {
            id: 'b',
            text: 'You pay the ₹5,000 registration fee to proceed with onboarding.',
            isCorrect: false,
            consequence: 'After you pay, the portal requests another ₹8,000 for "background verification," then ₹10,000 for "biometric enrollment." You realise the scam only after losing ₹23,000.',
            tip: 'Escalating fee requests are the signature of recruitment scams. Real companies have a defined onboarding process without student payments.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Scholarship Scam — Beginner, Visual ── */
  'ceo-v-scholarship-1': {
    title: 'Scholarship Scam',
    category: 'Career, Education & Opportunity',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'officialEmail',
        envProps: {
          senderName: 'National Scholarship Board',
          senderEmail: 'scholarship@nsb-india.org',
          subject: 'Congratulations! Your Scholarship Application is Approved',
          emailBody: `Dear Student,

You have been selected for the National Merit Scholarship for the academic year 2024-25.

Scholarship Details:
- Amount: ₹2,00,000 per year
- Duration: 4 years
- Total Value: ₹8,00,000

To activate your scholarship, please complete the application verification on our portal.

Verification Link: [Complete Verification]

Best regards,
National Scholarship Board`,
          companyLogo: '🎓',
        },
        situation: 'You receive a congratulations email about a scholarship you never applied for. The email looks official and promises ₹2,00,000/year.',
        choices: [
          {
            id: 'a',
            text: 'You click the verification link excited about the prospect of a scholarship.',
            isCorrect: false,
            consequence: 'The portal asks for your bank account details, Aadhaar, and a "processing fee" of ₹3,000. You realise too late — legitimate scholarships never charge applicants. Your data is compromised.',
            tip: 'Government and legitimate scholarships never charge application or processing fees. Any fee request in scholarship communications is fraud.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You visit the official NSB website (scholarships.gov.in) and search for your application.',
            isCorrect: true,
            consequence: 'Your application is not listed on the official site. The email was a phishing attempt. You report the email to the official NSB.',
            tip: 'Always verify through the official government website before clicking links in emails about scholarships or benefits. Government sites don\'t send emails asking you to verify on links.',
          },
          {
            id: 'c',
            text: 'You realise you never applied for this scholarship and immediately suspect a scam.',
            isCorrect: true,
            consequence: 'You research the scholarship name online and find dozens of complaints from students who lost money to the same scam. You delete the email and block the sender.',
            tip: 'You cannot receive a scholarship for which you never applied. That\'s the simplest check. Unsolicited scholarship offers are always scams.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeGovPortal',
        envProps: {
          portalName: 'National Scholarship Board Portal',
          portalUrl: 'scholarship-verify.org.in',
          fields: ['Bank Account Number', 'IFSC Code', 'Aadhaar Number', 'Processing Fee: ₹3,000'],
          logoStyle: { background: '#1F5296' },
        },
        situation: 'If you had clicked, this fake scholarship portal would ask for your sensitive information and fees.',
        choices: [
          {
            id: 'a',
            text: 'You notice the domain is "scholarship-verify.org.in" instead of "scholarships.gov.in" — a red flag.',
            isCorrect: true,
            consequence: 'You caught the domain mismatch! Government scholarships are on scholarships.gov.in, not scholarship-verify.org.in. You close the page immediately.',
            tip: 'Government sites use .gov.in domains. Scammers use lookalike domains like .org.in or .co.in. Check the domain carefully.',
          },
          {
            id: 'b',
            text: 'You enter your bank account details and Aadhaar to "verify" your identity.',
            isCorrect: false,
            consequence: 'Your banking information is stolen. The scammer attempts to transfer your funds or open loan accounts in your name.',
            tip: 'Government sites never ask for bank details on verification portals. Never enter sensitive financial information without initiating the visit yourself.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Exam Result Phishing (Phone Version) — Beginner, Visual ── */
  'ceo-v-exam-phone-1': {
    title: 'Exam Result Phishing (Phone)',
    category: 'Career, Education & Opportunity',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'smsConversation',
        envProps: {
          senderName: 'University Results Portal',
          trackingId: 'RESULT-2024',
          fakeDomain: 'university-results.in',
          amount: 'Your Exam Results',
        },
        situation: 'You receive an SMS shortly after your university exam period. It says your results are ready and includes a link to check them on the university portal.',
        choices: [
          {
            id: 'a',
            text: 'You click the link in the SMS to check your results.',
            isCorrect: false,
            consequence: 'The fake portal looks like your university site. It asks you to log in with your email and password. You enter your credentials. The scammer now has access to your university email and can reset your password.',
            tip: 'Universities never send result links via SMS. Always log in through the official website or app directly.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You ignore the SMS and log into your university portal directly through the official website.',
            isCorrect: true,
            consequence: 'You log in and check your results. No SMS was sent by the university — the message was a phishing attempt. You report it to your university IT department.',
            tip: 'Never click links from unsolicited SMSs about important matters like results. Always visit the official website or app directly.',
          },
          {
            id: 'c',
            text: 'You call your university\'s helpline to verify if they sent the SMS.',
            isCorrect: true,
            consequence: 'The helpline confirms they never sent SMSs with result links. You report the phishing SMS to the university IT team. Your login credentials are safe.',
            tip: 'When in doubt about institutional communications, contact the institution directly. This is the fastest way to verify.',
          },
        ],
      },
      {
        id: 2,
        environment: 'gamingLoginPage',
        envProps: {
          pageTitle: 'University Exam Results Portal',
          pageUrl: 'university-results.in',
          fields: ['Email ID', 'Password'],
          logoStyle: { background: '#1F5296' },
        },
        situation: 'This is the fake login page. It perfectly mimics the university\'s official results portal.',
        choices: [
          {
            id: 'a',
            text: 'You notice the URL says "university-results.in" instead of your university\'s official domain.',
            isCorrect: true,
            consequence: 'You caught the URL mismatch! The real university portal has a different domain. You close the page without entering any credentials.',
            tip: 'Always check the URL in the browser address bar. Scammers use lookalike domains. Your university\'s official domain should match their website.',
          },
          {
            id: 'b',
            text: 'You log in with your email and password to check results.',
            isCorrect: false,
            consequence: 'Your university email account is compromised. The scammer resets your password and locks you out. They access your university student records and personal information.',
            tip: 'Never enter your real credentials on a website unless you initiated the visit through an official channel.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Exam Result Phishing (Desktop Version) — Beginner, Visual ── */
  'ceo-v-exam-desktop-1': {
    title: 'Exam Result Phishing (Desktop)',
    category: 'Career, Education & Opportunity',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'officialEmail',
        envProps: {
          senderName: 'University Results Portal',
          senderEmail: 'results@university-portal.in',
          subject: 'Your Exam Results Are Ready for Download',
          emailBody: `Dear Student,

Your exam results for the semester are now available for download on the university portal.

Access Your Results: [Check Results Portal]

Please log in with your university credentials to view your mark sheet.

Regards,
University Examination Board`,
          companyLogo: '🎓',
        },
        situation: 'You receive an email from your university saying your exam results are ready. It includes a link to check your results on "the university portal."',
        choices: [
          {
            id: 'a',
            text: 'You click the link in the email to view your results.',
            isCorrect: false,
            consequence: 'The fake portal looks identical to the real university site. It asks for your login credentials. You enter them. Your email account is compromised, and your personal data is at risk.',
            tip: 'Universities rarely send result links via email. The safe approach is to visit the official website directly and log in.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You visit your university\'s main website directly (typing the URL yourself) and navigate to the results section.',
            isCorrect: true,
            consequence: 'You navigate through the official site and find the results portal. Your credentials are safe, and you view your results securely.',
            tip: 'For any institution or service, visit the official website directly — don\'t click links from emails. Type the domain yourself to be sure.',
          },
          {
            id: 'c',
            text: 'You reply to the email asking if it\'s legitimate before clicking any links.',
            isCorrect: true,
            consequence: 'The email bounces as undelivurable — a sign it was phishing. You contact your university through the official phone number and confirm they don\'t send result emails with links.',
            tip: 'Legitimate institution emails usually have reply addresses that work. Phishing emails often have broken reply addresses. Try replying to test.',
          },
        ],
      },
      {
        id: 2,
        environment: 'gamingLoginPage',
        envProps: {
          pageTitle: 'University Exam Results Portal',
          pageUrl: 'university-portal-results.com',
          fields: ['University Email', 'Password'],
          logoStyle: { background: '#1F5296' },
        },
        situation: 'If you had clicked, this fake login page would appear — designed to steal credentials.',
        choices: [
          {
            id: 'a',
            text: 'You notice the domain is "university-portal-results.com" — not your university\'s official domain.',
            isCorrect: true,
            consequence: 'You recognised the domain mismatch instantly. Your university\'s official domain is something like "university.ac.in" or "university.edu.in", not "university-portal-results.com". You close the page.',
            tip: 'The domain is the most reliable way to verify a site is official. Know your institution\'s official domain beforehand.',
          },
          {
            id: 'b',
            text: 'The page looks very official, so you enter your university email and password.',
            isCorrect: false,
            consequence: 'Your university email is compromised. The attacker resets your password and gains access to all your personal academic records, financial information, and communication history.',
            tip: 'Never trust appearance. Always verify the domain, and only log in to URLs you\'ve accessed directly — not through links in emails.',
            terminalState: true,
          },
        ],
      },
    ],
  },

  /* ── Giveaway/Influencer Scam — Beginner, Visual ── */
  'ceo-v-giveaway-1': {
    title: 'Giveaway / Influencer Scam',
    category: 'Career, Education & Opportunity',
    difficulty: 'Beginner',
    xp: 70,
    type: 'visual',
    steps: [
      {
        id: 1,
        environment: 'socialAd',
        envProps: {
          adTitle: '🎁 iPhone 15 Pro Giveaway! 🎁',
          adDescription: 'Follow + Like + Comment to enter. 5 winners announced tomorrow! Tap to claim your link.',
          adCta: 'Claim Your Prize',
          adImage: '📱',
          adColor: '#FFA500',
        },
        situation: 'You see a popular influencer\'s Instagram post about a giveaway. They\'re giving away iPhone 15 Pros. You just need to follow, like, and tap a link to "claim your slot."',
        choices: [
          {
            id: 'a',
            text: 'You click "Claim Your Prize" to enter the giveaway.',
            isCorrect: false,
            consequence: 'The link takes you to a fake claim page asking for shipping details, including your address and a "handling fee" of ₹2,000 to "secure your prize." You pay. No iPhone arrives.',
            tip: 'Real giveaways never ask for payment to claim prizes. Any fee request is a scam.',
            terminalState: true,
          },
          {
            id: 'b',
            text: 'You check if the influencer is verified on Instagram before clicking anything.',
            isCorrect: true,
            consequence: 'The account has no verification badge and was created 2 weeks ago. It\'s impersonating a real influencer. You report the account for impersonation and don\'t click any links.',
            tip: 'Scammers create fake influencer accounts that look similar to real ones. Verification badges are a good indicator, but always check the account creation date and follower engagement.',
          },
          {
            id: 'c',
            text: 'You search the real influencer\'s official account to see if they mention this giveaway.',
            isCorrect: true,
            consequence: 'The real influencer has no such giveaway. This fake account is a scam impersonating them. You report both the fake account and the scam post.',
            tip: 'For any celebrity or influencer giveaway, verify on their official verified account before engaging. Scammers impersonate influencers all the time.',
          },
        ],
      },
      {
        id: 2,
        environment: 'fakeStore',
        envProps: {
          shopName: 'Prize Claim Portal',
          shopUrl: 'claim-iphone-prize.in',
          items: [
            { name: 'iPhone 15 Pro Claimed!', price: 'Handling Fee: ₹2,000', image: '📱' },
            { name: 'Shipping Address Verification', price: '₹1,500', image: '📦' },
          ],
          ctaText: 'Confirm Claim & Pay',
          productColor: '#FF9500',
        },
        situation: 'If you had clicked, this fake claim page would ask for payment to release your "prize."',
        choices: [
          {
            id: 'a',
            text: 'You realise legitimate giveaways never charge "handling fees" to claim prizes.',
            isCorrect: true,
            consequence: 'You recognise the scam immediately and close the page. You report the fake influencer account to Instagram.',
            tip: 'Real prizes are delivered without recipient payments. Any fee request for claiming a prize is a guarantee of fraud.',
          },
          {
            id: 'b',
            text: 'You pay the ₹2,000 "handling fee" to secure your iPhone.',
            isCorrect: false,
            consequence: 'After payment, the page requests a "shipping fee" of ₹1,500, then a "customs clearance fee." By the time you stop, you\'ve lost ₹5,000. No iPhone ever arrives.',
            tip: 'Escalating fee requests are the signature of giveaway scams. Real companies don\'t charge multiple fees before delivery.',
            terminalState: true,
          },
        ],
      },
    ],
  },

}

/* Convenience: category route slug → display name */
export const CATEGORY_ROUTE_MAP = {
  'Financial Security':          'financial-security',
  'Identity & Impersonation':    'identity-impersonation',
  'Malware & Device Safety':     'malware-device-safety',
  'Online Commerce Safety':      'online-commerce-safety',
  'Phishing & Emerging Threats': 'phishing-emerging-threats',
  'Career, Education & Opportunity': 'career-education-opportunity',
}

export const DIFF_COLORS = {
  Beginner:     '#2EB87A',
  Intermediate: '#D4891A',
  Advanced:     '#C94E4E',
}
