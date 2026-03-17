/**
 * quizData.js
 * Quiz questions test UNDERSTANDING and APPLICATION —
 * not memory of simulation choices.
 */

export const QUIZZES = {

  'ii-s-1': {
    simId: 'ii-s-1', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'An Instagram account called "@vit_vellore_admissions" has 847 followers, no blue tick, and was created 3 weeks ago. It is running a paid sponsored post about fee waivers. A real VIT Vellore account would have:',
        options: [
          { id: 'a', text: 'Roughly the same follower count — universities keep social media small' },
          { id: 'b', text: 'A blue verified tick, hundreds of thousands of followers, and years of post history' },
          { id: 'c', text: 'No verified tick — Instagram does not verify educational institutions' },
          { id: 'd', text: 'A similar follower count since most students do not follow official pages' },
        ],
        correctId: 'b',
        explanation: 'Major Indian universities have verified accounts with very large followings built over years. An account created recently with under a thousand followers claiming to be an official institution is definitively fake.',
      },
      {
        id: 'q2',
        question: 'A scholarship form asks for your Aadhaar number, bank account number, and IFSC code to "disburse the award." Which of these should never appear on an initial scholarship application?',
        options: [
          { id: 'a', text: 'Your name and roll number' },
          { id: 'b', text: 'Your percentage or CGPA' },
          { id: 'c', text: 'Bank account number and Aadhaar — collected only after selection and verification in person' },
          { id: 'd', text: 'Your department and year of study' },
        ],
        correctId: 'c',
        explanation: 'Legitimate scholarship applications collect academic and personal details first. Bank and Aadhaar details are collected only after selection through a secure official process — never in an initial online form linked from social media.',
      },
      {
        id: 'q3',
        question: 'The official government portal for central scholarship schemes in India is:',
        options: [
          { id: 'a', text: 'scholarships.india.gov.in' },
          { id: 'b', text: 'scholarships.gov.in — the National Scholarship Portal' },
          { id: 'c', text: 'mhrd.gov.in/scholarships' },
          { id: 'd', text: 'scholarship-india.in' },
        ],
        correctId: 'b',
        explanation: 'The National Scholarship Portal at scholarships.gov.in is the official central government platform for all central and state scholarship schemes. Any other domain claiming to offer government scholarships should be treated with suspicion.',
      },
      {
        id: 'q4',
        question: 'A sponsored Instagram ad can be run by:',
        options: [
          { id: 'a', text: 'Only verified businesses and institutions' },
          { id: 'b', text: 'Only accounts older than 6 months' },
          { id: 'c', text: 'Anyone with a payment method — including scammers running fake institutional accounts' },
          { id: 'd', text: 'Only accounts with more than 10,000 followers' },
        ],
        correctId: 'c',
        explanation: 'Instagram ads can be purchased by anyone. A sponsored label does not indicate legitimacy. Scammers specifically use ads to reach students in a college\'s geographic area with targeted scholarship posts.',
      },
      {
        id: 'q5',
        question: 'Your Aadhaar number was collected by a fake scholarship form. Which action at uidai.gov.in specifically prevents someone from using it to register a new SIM card in your name?',
        options: [
          { id: 'a', text: 'Updating your mobile number on UIDAI' },
          { id: 'b', text: 'Downloading your Aadhaar e-copy' },
          { id: 'c', text: 'Locking your Aadhaar biometrics — this blocks biometric authentication required for new SIM and bank registrations' },
          { id: 'd', text: 'Filing a name correction request' },
        ],
        correctId: 'c',
        explanation: 'Locking biometrics at myaadhaar.uidai.gov.in blocks all biometric authentication. Telecom operators require biometric verification to issue a new SIM — locking this makes your Aadhaar unusable for SIM fraud even if someone has your number and photo.',
      },
    ],
  },

  'ii-s-2': {
    simId: 'ii-s-2', passMark: 60, xp: 40,
    questions: [
      {
        id: 'q1',
        question: 'A scammer wants to impersonate your friend Meera on WhatsApp. What information do they need, and where do they most commonly get it?',
        options: [
          { id: 'a', text: 'Meera\'s WhatsApp account password — obtained through phishing' },
          { id: 'b', text: 'Meera\'s name and profile photo — scraped from her public Instagram or Facebook profile' },
          { id: 'c', text: 'Meera\'s contact list — obtained by hacking her phone' },
          { id: 'd', text: 'Meera\'s IMEI number — obtained from her mobile carrier' },
        ],
        correctId: 'b',
        explanation: 'WhatsApp impersonation requires only a name and profile photo — both freely available from any public social media profile. The scammer creates a new SIM, sets up WhatsApp, and uses the scraped photo and name to pose as the real person.',
      },
      {
        id: 'q2',
        question: 'You receive a money request on WhatsApp from what appears to be your cousin\'s number but with a slightly different profile photo. The message says "changed my phone, this is my new number." What is the most reliable verification method?',
        options: [
          { id: 'a', text: 'Ask them to share a recent selfie' },
          { id: 'b', text: 'Call the number that just messaged you' },
          { id: 'c', text: 'Call the original saved number for your cousin' },
          { id: 'd', text: 'Ask them their date of birth' },
        ],
        correctId: 'c',
        explanation: 'The original saved number is the only reliable channel. Calling the new number confirms the scammer. A selfie can be sourced from public photos. Date of birth is often findable on social media. Only the original saved number connects you to the real person.',
      },
      {
        id: 'q3',
        question: 'Why can\'t you trust a familiar profile picture as proof of identity on WhatsApp?',
        options: [
          { id: 'a', text: 'WhatsApp compresses profile photos making them unrecognisable' },
          { id: 'b', text: 'Anyone can download a photo from a public profile and set it as their WhatsApp picture' },
          { id: 'c', text: 'Profile pictures are automatically blurred for privacy' },
          { id: 'd', text: 'WhatsApp randomises profile photos for new numbers' },
        ],
        correctId: 'b',
        explanation: 'There is no authentication behind a WhatsApp profile picture. Anyone can screenshot a photo from Instagram or Facebook and use it as their profile image. A familiar face proves nothing about who owns the number.',
      },
      {
        id: 'q4',
        question: 'Once you send money via UPI to a scammer, what is the realistic chance of recovering it?',
        options: [
          { id: 'a', text: 'Very high — UPI has a 48-hour automatic reversal window' },
          { id: 'b', text: 'Moderate — banks automatically freeze suspicious recipient accounts' },
          { id: 'c', text: 'Very low — UPI transfers are instant and largely irreversible once the recipient withdraws the funds' },
          { id: 'd', text: 'Guaranteed — NPCI insures all UPI transactions against fraud' },
        ],
        correctId: 'c',
        explanation: 'UPI transfers are designed for speed and finality. Once sent to a scammer who quickly withdraws or moves the funds, recovery through the bank or cybercrime portal is possible but uncertain and often unsuccessful. Prevention is the only reliable protection.',
      },
      {
        id: 'q5',
        question: 'Your friend\'s phone number is visible in their public Instagram bio. Why is this specifically a security risk for impersonation scams?',
        options: [
          { id: 'a', text: 'Instagram can sell the number to advertisers' },
          { id: 'b', text: 'It allows scammers to associate the number with the person\'s identity and photo for targeted WhatsApp impersonation of their contacts' },
          { id: 'c', text: 'It enables SIM cloning by mobile carriers' },
          { id: 'd', text: 'It makes their account easier to directly hack' },
        ],
        correctId: 'b',
        explanation: 'A public phone number combined with a name and photo gives a scammer everything needed to send convincing WhatsApp impersonation messages to the person\'s contacts. Removing phone numbers from public bios eliminates this data source entirely.',
      },
    ],
  },

  'ii-s-3': {
    simId: 'ii-s-3', passMark: 60, xp: 60,
    questions: [
      {
        id: 'q1',
        question: 'At myaadhaar.uidai.gov.in, the "Aadhaar Authentication History" feature shows:',
        options: [
          { id: 'a', text: 'A list of people who have searched for your Aadhaar number' },
          { id: 'b', text: 'Every time your Aadhaar was used for verification, including the date, time, and requesting agency' },
          { id: 'c', text: 'Only your own login history on the UIDAI portal' },
          { id: 'd', text: 'The last 3 bank transactions linked to your Aadhaar' },
        ],
        correctId: 'b',
        explanation: 'The Authentication History log shows a complete record of every Aadhaar authentication — the exact timestamp and the name of the agency that requested it. Any entry you do not recognise is direct evidence of misuse.',
      },
      {
        id: 'q2',
        question: 'A fraudulent SIM registered in your name is dangerous primarily because:',
        options: [
          { id: 'a', text: 'You will be billed for calls you did not make' },
          { id: 'b', text: 'It can receive OTPs for your bank accounts, enabling the attacker to access them' },
          { id: 'c', text: 'Your phone will experience signal interference' },
          { id: 'd', text: 'The telecom company will block your original SIM immediately' },
        ],
        correctId: 'b',
        explanation: 'Most Indian banks use your registered mobile number to send OTPs for transactions and password resets. A fraudulent SIM registered in your name receives those OTPs, giving the attacker full access to any account linked to that mobile number.',
      },
      {
        id: 'q3',
        question: 'You receive an OTP you did not request, followed immediately by your phone losing network signal. What is most likely happening?',
        options: [
          { id: 'a', text: 'A routine carrier maintenance update' },
          { id: 'b', text: 'A SIM swap attack — someone is porting your number to a new SIM using your Aadhaar' },
          { id: 'c', text: 'Your phone is being remotely accessed' },
          { id: 'd', text: 'The OTP was sent to you by mistake' },
        ],
        correctId: 'b',
        explanation: 'An unsolicited OTP followed by sudden loss of signal is the classic sign of a SIM swap in progress. Call your carrier immediately from another phone and call your bank to freeze transactions — time is critical.',
      },
      {
        id: 'q4',
        question: 'The portal sancharsaathi.gov.in is used to:',
        options: [
          { id: 'a', text: 'File income tax returns online' },
          { id: 'b', text: 'Report fraudulent SIM registrations and block mobile numbers linked to fraud' },
          { id: 'c', text: 'Lock your Aadhaar biometrics' },
          { id: 'd', text: 'Check your CIBIL credit score' },
        ],
        correctId: 'b',
        explanation: 'sancharsaathi.gov.in is TRAI\'s portal for telecom-related fraud — reporting fraudulent calls, blocking SIMs used in fraud, and checking how many SIMs are registered against your Aadhaar.',
      },
      {
        id: 'q5',
        question: 'After a fraudulent loan is taken in your name, filing a CIBIL dispute specifically does what?',
        options: [
          { id: 'a', text: 'Immediately removes the fraudulent loan from your credit history' },
          { id: 'b', text: 'Places a fraud alert on your credit report, warning all lenders that your identity may have been misused' },
          { id: 'c', text: 'Cancels the loan and refunds amounts already disbursed' },
          { id: 'd', text: 'Freezes all future credit applications under your PAN permanently' },
        ],
        correctId: 'b',
        explanation: 'A CIBIL fraud alert notifies all CIBIL member lenders that your identity may be compromised. While it does not automatically remove the loan, it triggers an investigation and prevents new fraudulent credit from being easily approved.',
      },
    ],
  },

  'ii-p-1': {
    simId: 'ii-p-1', passMark: 60, xp: 40,
    questions: [
      {
        id: 'q1',
        question: 'A LinkedIn profile for "Rahul Mehta, Senior Manager at TCS" has 8 connections, no posts, and a URL of "rahul-mehta-tcs-snr-mgr". The real Rahul has 600+ connections and the URL "rahul-mehta-tcs". A colleague received a connection request from the first profile. This is most likely:',
        options: [
          { id: 'a', text: 'Rahul created a second account for a different purpose' },
          { id: 'b', text: 'A profile clone designed to impersonate Rahul and harvest data from his network' },
          { id: 'c', text: 'LinkedIn created a duplicate during a system migration' },
          { id: 'd', text: 'Rahul\'s profile was moved to a new account' },
        ],
        correctId: 'b',
        explanation: 'A near-identical profile with very few connections, no activity, and a slightly modified URL is the signature of a clone account created to impersonate someone and deceive their contacts.',
      },
      {
        id: 'q2',
        question: 'Why does hiding your LinkedIn connections list specifically reduce the risk of being impersonated?',
        options: [
          { id: 'a', text: 'It prevents the attacker from copying your profile photo' },
          { id: 'b', text: 'It removes the attacker\'s list of targets — they need to know your contacts to impersonate you to them effectively' },
          { id: 'c', text: 'It makes your profile invisible in search results' },
          { id: 'd', text: 'It prevents anyone from sending you connection requests' },
        ],
        correctId: 'b',
        explanation: 'The value of a clone account is in deceiving the victim\'s contacts. Without access to your connections list, the attacker does not know who to approach. Hiding this list is one of the most effective single privacy changes against profile cloning.',
      },
      {
        id: 'q3',
        question: 'LinkedIn\'s reporting path for a profile impersonating you is:',
        options: [
          { id: 'a', text: 'Settings → Privacy → Report misuse' },
          { id: 'b', text: 'The profile → three-dot menu → Report → Pretending to be someone else → Me' },
          { id: 'c', text: 'Help Centre → Submit a ticket → Identity theft' },
          { id: 'd', text: 'Connections → Block and report → Impersonation' },
        ],
        correctId: 'b',
        explanation: 'From the clone\'s profile: tap the three-dot menu (···) → Report → Pretending to be someone else → Me. This routes your report to LinkedIn\'s trust and safety team who handle impersonation cases, typically within 24–48 hours.',
      },
      {
        id: 'q4',
        question: 'A cloned LinkedIn profile collected employee IDs, project names, and personal emails from 12 colleagues. What is the most immediate organisational risk from this data?',
        options: [
          { id: 'a', text: 'The attacker can directly access the company\'s HR system using employee IDs' },
          { id: 'b', text: 'The data enables targeted spear-phishing emails that appear to come from known colleagues' },
          { id: 'c', text: 'The colleagues\' LinkedIn accounts will be cloned next' },
          { id: 'd', text: 'The company\'s public LinkedIn page will be impersonated' },
        ],
        correctId: 'b',
        explanation: 'Names, roles, project details, and emails are the exact ingredients of a spear-phishing attack. The attacker can send highly personalised emails that are far more convincing than generic phishing — and far more likely to succeed.',
      },
      {
        id: 'q5',
        question: 'LinkedIn does not automatically notify people who connected with a profile later removed for impersonation. Why does this matter practically?',
        options: [
          { id: 'a', text: 'It does not matter — the clone is gone once removed' },
          { id: 'b', text: 'Those people may have already shared sensitive information with the clone and need to be warned manually by you' },
          { id: 'c', text: 'It means LinkedIn will restore the clone account' },
          { id: 'd', text: 'It means your real account gets suspended too' },
        ],
        correctId: 'b',
        explanation: 'The damage does not stop when LinkedIn removes the clone. Colleagues who accepted the request may have already shared their email, employee ID, or project details. They need to be told directly so they can be vigilant about follow-up phishing attempts using that data.',
      },
    ],
  },

  'ii-p-3': {
    simId: 'ii-p-3', passMark: 60, xp: 60,
    questions: [
      {
        id: 'q1',
        question: 'An attacker wants to clone your CEO\'s voice. Which source provides sufficient audio for a modern AI voice cloning tool?',
        options: [
          { id: 'a', text: 'A 10-second voicemail greeting' },
          { id: 'b', text: 'A 30-second clip from a publicly available earnings call or conference talk' },
          { id: 'c', text: 'At least 2 hours of studio-quality speech' },
          { id: 'd', text: 'Voice cloning requires access to the person\'s phone microphone' },
        ],
        correctId: 'b',
        explanation: 'Modern AI voice cloning tools require as little as 30 seconds of clean audio. Earnings calls, conference presentations, and YouTube interviews are freely available and provide more than enough source material for a convincing clone.',
      },
      {
        id: 'q2',
        question: 'Caller ID showing your manager\'s exact number does NOT confirm the call is really from them because:',
        options: [
          { id: 'a', text: 'Your manager\'s number might have changed recently' },
          { id: 'b', text: 'Caller ID can be spoofed using VoIP services to display any number the attacker chooses' },
          { id: 'c', text: 'Mobile carriers sometimes route calls through incorrect caller IDs' },
          { id: 'd', text: 'Caller ID is only reliable for landline numbers' },
        ],
        correctId: 'b',
        explanation: 'Caller ID spoofing is easy with VoIP services. An attacker can make any call appear to come from any number. This means a recognisable voice AND a matching caller ID still provides zero authentication — both can be faked independently.',
      },
      {
        id: 'q3',
        question: 'A company establishes a safe word policy for urgent out-of-band requests. A caller using the CEO\'s cloned voice claims they forgot the safe word and asks the employee to proceed anyway. The correct response is:',
        options: [
          { id: 'a', text: 'Proceed — forgetting a safe word occasionally is normal' },
          { id: 'b', text: 'Decline and report the call to IT security immediately' },
          { id: 'c', text: 'Ask a security question as an alternative' },
          { id: 'd', text: 'Process a smaller amount as a compromise' },
        ],
        correctId: 'b',
        explanation: 'The safe word policy has no exceptions. A real executive who forgot the word would follow the established escalation process — they would not pressure an employee to bypass security. Any request to override verification is itself a red flag.',
      },
      {
        id: 'q4',
        question: 'Which of the following would a real-time AI voice clone struggle most with?',
        options: [
          { id: 'a', text: 'Answering general questions about the company' },
          { id: 'b', text: 'Expressing urgency and emotional pressure convincingly' },
          { id: 'c', text: 'Answering a personal question only the real person would know — a shared memory or private detail' },
          { id: 'd', text: 'Providing a plausible reason for the financial request' },
        ],
        correctId: 'c',
        explanation: 'AI voice clones can generate any words in the target\'s voice, but they cannot know private information. A question like "What did we discuss at dinner last Thursday?" cannot be answered by an AI using only audio data.',
      },
      {
        id: 'q5',
        question: 'Why is "please don\'t mention this to anyone yet" a specific indicator of social engineering rather than legitimate confidentiality?',
        options: [
          { id: 'a', text: 'Legitimate confidentiality is never communicated verbally' },
          { id: 'b', text: 'It isolates the target from colleagues who would question or block the fraudulent request' },
          { id: 'c', text: 'Real urgent requests are always announced company-wide' },
          { id: 'd', text: 'Confidential instructions are always sent in writing' },
        ],
        correctId: 'b',
        explanation: 'Isolation is the core tactic. By preventing the employee from consulting a colleague or checking with finance, the attacker removes the informal checks that would catch the fraud. Legitimate urgent business tasks always survive a 60-second check with another person.',
      },
    ],
  },

  'ii-authority-1': {
    simId: 'ii-authority-1', passMark: 60, xp: 50,
    questions: [
      {
        id: 'q1',
        question: 'You receive an email from "incometax-helpdesk@gov-india.com" about a pending tax notice. Which part proves it is not from the Indian government?',
        options: [
          { id: 'a', text: '"incometax-helpdesk" — government departments use simpler names' },
          { id: 'b', text: '"gov-india.com" — all genuine Indian government emails use the exact domain .gov.in' },
          { id: 'c', text: 'The hyphen between "gov" and "india"' },
          { id: 'd', text: '.com — government bodies should use .org' },
        ],
        correctId: 'b',
        explanation: 'Every legitimate Indian central government email uses the .gov.in domain without exception. "gov-india.com" is a completely different domain anyone can register. Only the actual domain after @ matters — display names can say anything.',
      },
      {
        id: 'q2',
        question: 'TRAI\'s actual role is:',
        options: [
          { id: 'a', text: 'Calling subscribers to enforce compliance with telecom regulations' },
          { id: 'b', text: 'Setting regulatory standards and policies for the telecom sector — it does not make enforcement calls to individual subscribers' },
          { id: 'c', text: 'Disconnecting mobile numbers that receive spam complaints' },
          { id: 'd', text: 'Verifying Aadhaar-linked SIM registrations' },
        ],
        correctId: 'b',
        explanation: 'TRAI is a regulatory body that sets policies and standards. It does not proactively call individual subscribers. Any call claiming to be from a "TRAI officer" threatening disconnection is fraudulent — TRAI\'s helpline 1800-110-420 is for consumer complaints.',
      },
      {
        id: 'q3',
        question: 'A website URL ends in ".in" and has a padlock (HTTPS) icon. Does this make it an official Indian government website?',
        options: [
          { id: 'a', text: 'Yes — .in is the official Indian national domain' },
          { id: 'b', text: 'Yes — the HTTPS padlock confirms government ownership' },
          { id: 'c', text: 'No — .in is a public domain anyone can register, and HTTPS only means the connection is encrypted, not that the site is legitimate' },
          { id: 'd', text: 'Only if the site also displays a government logo' },
        ],
        correctId: 'c',
        explanation: '.in is a generic country-code domain open to anyone. Only .gov.in is restricted to government entities. HTTPS means the connection is encrypted — it says nothing about who operates the site. Scammers routinely use HTTPS on fake sites.',
      },
      {
        id: 'q4',
        question: 'The Income Tax Department of India delivers official demand notices through:',
        options: [
          { id: 'a', text: 'WhatsApp Business messages from official government numbers' },
          { id: 'b', text: 'Registered post and through the official e-filing portal at incometax.gov.in' },
          { id: 'c', text: 'Phone calls from 1800-103-0025 with payment demands' },
          { id: 'd', text: 'SMS with a payment link and a 24-hour deadline' },
        ],
        correctId: 'b',
        explanation: 'Income Tax notices are sent by registered post and can be verified and responded to through incometax.gov.in. The IT Department never demands immediate payment over phone or through SMS links.',
      },
      {
        id: 'q5',
        question: 'A fake government portal has a countdown timer saying your Aadhaar will be deactivated in 38 minutes. A genuine UIDAI deactivation process would involve:',
        options: [
          { id: 'a', text: 'A similar time window since it is an automated process' },
          { id: 'b', text: 'Written notices, a formal process with appeal rights, and timelines measured in weeks — not minutes' },
          { id: 'c', text: 'Silent deactivation with no notification' },
          { id: 'd', text: 'An SMS with a payment link to reverse it' },
        ],
        correctId: 'b',
        explanation: 'Government processes affecting citizen rights involve formal notices, stated reasons, and appeal mechanisms under law. They are not executed through website countdown timers. Any timer threatening immediate government action is a fabricated pressure tactic.',
      },
    ],
  },

  'ii-relative-emergency-1': {
    simId: 'ii-relative-emergency-1', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'A scammer contacts an elderly person claiming to be their grandson using a new WhatsApp number. The scammer knows his name, city, and that he studies engineering. Where did they most likely get this information?',
        options: [
          { id: 'a', text: 'By hacking the grandson\'s phone' },
          { id: 'b', text: 'From public social media profiles or family WhatsApp group posts' },
          { id: 'c', text: 'From the telecom company\'s subscriber database' },
          { id: 'd', text: 'By guessing based on common names' },
        ],
        correctId: 'b',
        explanation: 'Names, cities, and educational details are routinely visible on public Instagram, Facebook, or LinkedIn profiles. Family WhatsApp groups where relatives congratulate students are also a source. Scammers research targets before calling.',
      },
      {
        id: 'q2',
        question: 'A UPI transfer of ₹20,000 is sent to a scammer. The victim calls the cybercrime helpline 1930 immediately. What is the realistic outcome?',
        options: [
          { id: 'a', text: 'The money is automatically reversed within 24 hours' },
          { id: 'b', text: 'Recovery is possible if the account is frozen before withdrawal, but not guaranteed — scammers move funds within minutes' },
          { id: 'c', text: 'NPCI guarantees full recovery of all fraudulent UPI transfers' },
          { id: 'd', text: 'The bank is legally required to reimburse the full amount' },
        ],
        correctId: 'b',
        explanation: 'Cybercrime helpline 1930 can sometimes freeze the recipient account if called very quickly. However, scammers typically withdraw or transfer funds within minutes. Recovery is uncertain and often partial — prevention through verification is the only reliable defence.',
      },
      {
        id: 'q3',
        question: 'Which type of personal question is MOST effective for verifying a family member\'s identity over a new WhatsApp number?',
        options: [
          { id: 'a', text: '"What is your date of birth?" — this may be publicly available on social media' },
          { id: 'b', text: '"What did we have for dinner at your last visit?" — a private shared memory the scammer cannot research' },
          { id: 'c', text: '"What is your employee ID?" — a factual identifier' },
          { id: 'd', text: '"What is your mother\'s maiden name?" — a common security question' },
        ],
        correctId: 'b',
        explanation: 'Highly specific private shared memories are impossible for a scammer to research. Date of birth, mother\'s maiden name, and similar details can often be found on social media or through social engineering.',
      },
      {
        id: 'q4',
        question: 'The scammer insists "don\'t tell Appa, he will overreact — please just send the money quietly." Why is enforced secrecy from other family members a critical red flag?',
        options: [
          { id: 'a', text: 'It shows the person is embarrassed about their situation' },
          { id: 'b', text: 'It prevents another family member from calling the real person and immediately exposing the fraud' },
          { id: 'c', text: 'It indicates the situation involves legal proceedings that must be kept confidential' },
          { id: 'd', text: 'It is a sign the person recently changed their phone' },
        ],
        correctId: 'b',
        explanation: 'A second family member would almost certainly call the real person\'s number and discover they are safe. The "keep it secret" instruction exists solely to prevent this. In a genuine family emergency, transparency helps — not harms.',
      },
      {
        id: 'q5',
        question: 'A family establishes a pre-agreed "family safe word" for emergency money requests. How does this defend against this scam?',
        options: [
          { id: 'a', text: 'It allows the family to verify the transfer was legitimate after sending' },
          { id: 'b', text: 'A scammer using a scraped profile has no way of knowing the private safe word, so they cannot pass the verification' },
          { id: 'c', text: 'It encrypts the UPI transaction so scammers cannot intercept it' },
          { id: 'd', text: 'It alerts the bank to flag the transfer for review' },
        ],
        correctId: 'b',
        explanation: 'A pre-agreed private safe word exists only within the real family. No public profile or social engineering gives the attacker access to it. Inability to provide the word instantly reveals the caller as an impostor.',
      },
    ],
  },

  'ii-fake-medical-1': {
    simId: 'ii-fake-medical-1', passMark: 60, xp: 50,
    questions: [
      {
        id: 'q1',
        question: 'You receive an SMS: "Fortis Hospital: Payment of ₹9,400 pending. Pay now: fortis-billing.in/pay". The real Fortis website is fortishealthcare.com. What does the domain tell you?',
        options: [
          { id: 'a', text: 'fortis-billing.in is probably a regional billing subdomain' },
          { id: 'b', text: 'It is a fraudulent domain — real Fortis billing only occurs on fortishealthcare.com or their official app' },
          { id: 'c', text: 'The .in extension confirms it is a legitimate Indian business' },
          { id: 'd', text: 'It is legitimate because it contains the word "fortis"' },
        ],
        correctId: 'b',
        explanation: 'Any billing portal not on the hospital\'s exact official domain is fake. Including the hospital\'s name in a .in domain does not make it official — anyone can register any .in domain within minutes.',
      },
      {
        id: 'q2',
        question: 'Scammers who send fake insurance renewal SMS around March and April are exploiting what specific timing?',
        options: [
          { id: 'a', text: 'Hospital admissions peak in summer' },
          { id: 'b', text: 'The Indian financial year ends March 31, when many insurance policies are due for renewal' },
          { id: 'c', text: 'Insurance companies raise premiums in Q1' },
          { id: 'd', text: 'Tax returns are filed during this period' },
        ],
        correctId: 'b',
        explanation: 'Many insurance policies renew around the financial year end (March 31). Scammers send bulk renewal SMS during this period knowing a significant fraction of recipients will genuinely have upcoming renewals — making the timing feel like confirmation of legitimacy.',
      },
      {
        id: 'q3',
        question: 'A legitimate Indian hospital collects bill payments through which channels?',
        options: [
          { id: 'a', text: 'UPI IDs sent via SMS or email for convenience' },
          { id: 'b', text: 'At the billing counter, through their verified official app, or official payment gateway on their own domain' },
          { id: 'c', text: 'Google Pay links sent by the billing department' },
          { id: 'd', text: 'WhatsApp Pay to the billing officer\'s personal number' },
        ],
        correctId: 'b',
        explanation: 'Hospitals collect payments through physical billing counters, their own verified apps, or official payment gateways on their registered domain. No hospital sends a UPI ID via SMS and asks for payment within hours under threat of procedure cancellation.',
      },
      {
        id: 'q4',
        question: 'A patient pays ₹8,500 via a fake hospital billing SMS before realising. What are the two most time-critical actions?',
        options: [
          { id: 'a', text: 'Delete the SMS and change their phone number' },
          { id: 'b', text: 'Call 1930 (cybercrime helpline) and inform their bank to attempt to freeze the recipient account' },
          { id: 'c', text: 'Visit the hospital in person to explain the situation' },
          { id: 'd', text: 'Post about it on social media to warn others' },
        ],
        correctId: 'b',
        explanation: 'Calling 1930 immediately and contacting the bank are the two time-critical actions. The cybercrime helpline can attempt to freeze the recipient account if called quickly. Speed is critical — scammers move funds fast.',
      },
      {
        id: 'q5',
        question: 'The IRDAI (Insurance Regulatory and Development Authority of India) consumer helpline number is:',
        options: [
          { id: 'a', text: '1800-110-420' },
          { id: 'b', text: '155255' },
          { id: 'c', text: '1930' },
          { id: 'd', text: '14447' },
        ],
        correctId: 'b',
        explanation: 'IRDAI\'s consumer helpline is 155255. It handles insurance-related complaints including fake renewal scams. Knowing this number means you can verify any insurance communication directly with the regulator.',
      },
    ],
  },

  'ii-urgency-pressure-1': {
    simId: 'ii-urgency-pressure-1', passMark: 60, xp: 60,
    questions: [
      {
        id: 'q1',
        question: 'A coordinated attack sends you an email, SMS, and phone call simultaneously — all about the same banking emergency. Why does this multi-channel approach make the scam more convincing?',
        options: [
          { id: 'a', text: 'Banks actually use all three channels simultaneously for fraud alerts' },
          { id: 'b', text: 'Multiple independent-seeming sources create the illusion of corroborating evidence, reducing the chance any single channel gets questioned' },
          { id: 'c', text: 'It ensures at least one message reaches you if spam filters block others' },
          { id: 'd', text: 'It is required by RBI regulations for high-value fraud alerts' },
        ],
        correctId: 'b',
        explanation: 'When the same threat arrives from multiple apparent sources, the brain interprets them as independent confirmations rather than one coordinated attack. The attacker controls all three channels — they are not independent. This is the core deception.',
      },
      {
        id: 'q2',
        question: 'HDFC Bank\'s official 24x7 customer care number, printed on the back of every HDFC card, is:',
        options: [
          { id: 'a', text: '1800-266-4332' },
          { id: 'b', text: '1800-202-6161' },
          { id: 'c', text: '1800-103-0025' },
          { id: 'd', text: '1800-110-420' },
        ],
        correctId: 'b',
        explanation: '1800-202-6161 is HDFC Bank\'s official 24x7 toll-free number. Using the number on your physical card bypasses any spoofed domain, fake website, or impersonation call and connects you directly to the real bank.',
      },
      {
        id: 'q3',
        question: 'A phishing page loads in your browser. You close it immediately without entering any information. Are you definitely safe?',
        options: [
          { id: 'a', text: 'Yes — no data was entered so nothing was shared' },
          { id: 'b', text: 'Probably, but not certainly — some phishing pages execute scripts that capture browser session tokens without any input' },
          { id: 'c', text: 'Yes — phishing pages only capture data through forms' },
          { id: 'd', text: 'No — simply loading any page automatically installs malware' },
        ],
        correctId: 'b',
        explanation: 'Most phishing pages are harmless if you don\'t enter data. However, sophisticated pages can steal session cookies without any user input. Reporting the click to IT security ensures sessions can be checked and revoked if needed.',
      },
      {
        id: 'q4',
        question: 'After entering banking credentials on a phishing site, why is "change your password on the bank\'s website" potentially risky as a first action?',
        options: [
          { id: 'a', text: 'The bank\'s website may also be compromised' },
          { id: 'b', text: 'Logging in uses the compromised credentials, and if the attacker is monitoring in real time, the new password may be captured too' },
          { id: 'c', text: 'Banks lock accounts after too many password changes' },
          { id: 'd', text: 'Password changes take 24 hours to activate' },
        ],
        correctId: 'b',
        explanation: 'If an attacker is actively monitoring a compromised session, a password change through that session can be intercepted. Calling the bank to block the account is safer because it requires no login with the already-compromised credentials.',
      },
      {
        id: 'q5',
        question: 'Under RBI guidelines, if you report an unauthorised digital transaction within 3 working days and it was due to a third-party breach (not your negligence), you are entitled to:',
        options: [
          { id: 'a', text: 'Full liability — you are responsible regardless of timing' },
          { id: 'b', text: 'Zero liability — the bank must credit the full amount within 10 working days' },
          { id: 'c', text: 'A maximum reimbursement of ₹10,000' },
          { id: 'd', text: 'A 50% refund at the bank\'s discretion' },
        ],
        correctId: 'b',
        explanation: 'Under RBI\'s 2017 circular on customer protection for unauthorised electronic transactions, if you report within 3 working days and the breach was not due to your negligence, you have zero liability and the bank must credit the full amount within 10 working days.',
      },
    ],
  },

  /* ── ONLINE COMMERCE SAFETY ─────────────────────────── */

  'oc-e-1': {
    simId: 'oc-e-1', passMark: 60, xp: 35,
    questions: [
      {
        id: 'q1',
        question: 'A website sells medicines at 60% below chemist prices and advertises "no prescription required." Which of these is the most important immediate red flag?',
        options: [
          { id: 'a', text: 'The price discount alone — any discount over 20% is suspicious' },
          { id: 'b', text: '"No prescription required" for regulated medicines — this is illegal in India and signals an unregulated supply chain' },
          { id: 'c', text: 'That it appeared in search results — only scam sites advertise online' },
          { id: 'd', text: 'That it offers home delivery — legitimate pharmacies are walk-in only' },
        ],
        correctId: 'b',
        explanation: '"No prescription required" for prescription-only drugs is a legal violation in India under the Drugs and Cosmetics Act. It also means the site has no regulated supply chain — you have no way to verify what you are actually receiving.',
      },
      {
        id: 'q2',
        question: 'The Indian government body whose website you should check to verify an online pharmacy\'s registration is:',
        options: [
          { id: 'a', text: 'SEBI (Securities and Exchange Board of India)' },
          { id: 'b', text: 'TRAI (Telecom Regulatory Authority of India)' },
          { id: 'c', text: 'CDSCO (Central Drugs Standard Control Organisation) at cdsco.gov.in' },
          { id: 'd', text: 'RBI (Reserve Bank of India)' },
        ],
        correctId: 'c',
        explanation: 'CDSCO at cdsco.gov.in, along with State Drugs Licensing Authority portals, maintains the register of approved online pharmacies. Checking this registry is the primary verification step before ordering medicines online.',
      },
      {
        id: 'q3',
        question: 'A fake pharmacy collects your Aadhaar number and medical history "for regulatory compliance." What is the most likely use of this data?',
        options: [
          { id: 'a', text: 'To comply with actual drug licensing requirements' },
          { id: 'b', text: 'To personalise medicine recommendations' },
          { id: 'c', text: 'Targeted fraud — selling to data brokers who enable health insurance scams, identity theft, and loan fraud using your Aadhaar' },
          { id: 'd', text: 'To register you on a customer loyalty programme' },
        ],
        correctId: 'c',
        explanation: 'No pharmacy needs your Aadhaar number or medical history to ship medicines. This data is collected specifically to be sold to fraud operators who use medical history for insurance scams and Aadhaar numbers for SIM registration and identity theft.',
      },
      {
        id: 'q4',
        question: 'A friend received an unlabelled tablet in a plain packet from an online pharmacy — no expiry date, no batch number. Beyond the delivery fraud, what is the health risk?',
        options: [
          { id: 'a', text: 'Minimal risk — unbranded medicines are often the same formula at lower cost' },
          { id: 'b', text: 'The tablet may be counterfeit — wrong dosage, contaminated ingredient, or an entirely different compound — with no way to verify' },
          { id: 'c', text: 'The main risk is that the medicine may expire soon' },
          { id: 'd', text: 'No risk if the tablet looks the same colour and shape as the expected medicine' },
        ],
        correctId: 'b',
        explanation: 'Counterfeit medicines are a documented public health risk. Without a batch number, manufacturer, and expiry date, there is no way to verify the dosage, purity, or even the identity of the compound. This is why regulated pharmacies with licensed pharmacists are essential.',
      },
      {
        id: 'q5',
        question: 'If you shared your Aadhaar number with a fake pharmacy website, which action specifically prevents someone from using it to register a new SIM card in your name?',
        options: [
          { id: 'a', text: 'Updating your address on UIDAI' },
          { id: 'b', text: 'Downloading your e-Aadhaar from UIDAI' },
          { id: 'c', text: 'Locking your Aadhaar biometrics at myaadhaar.uidai.gov.in — required for new SIM verification' },
          { id: 'd', text: 'Filing a complaint with the pharmacy' },
        ],
        correctId: 'c',
        explanation: 'Telecom operators must verify biometrics to issue a new SIM card. Locking your Aadhaar biometrics at myaadhaar.uidai.gov.in blocks this verification, making your Aadhaar unusable for SIM fraud even if someone has your number and photo.',
      },
    ],
  },

  'oc-ecommerce-1': {
    simId: 'oc-ecommerce-1', passMark: 60, xp: 40,
    questions: [
      {
        id: 'q1',
        question: 'A sponsored ad shows "Nike shoes at 90% off" with a link to "nikeindiaoutlet-deals.in". Without clicking the link, what is the definitive way to confirm this is a scam?',
        options: [
          { id: 'a', text: 'The discount is too high — Nike never discounts more than 50%' },
          { id: 'b', text: 'The domain is not Nike\'s official domain (nike.com) — no legitimate Nike sale would use a different domain' },
          { id: 'c', text: 'The ad was shown on Instagram — Nike only advertises on TV' },
          { id: 'd', text: 'The price ₹399 is too low to be real' },
        ],
        correctId: 'b',
        explanation: 'The domain is the only reliable trust signal. Nike\'s official India presence is on nike.com/in. Any sale using a different domain — regardless of branding — is impersonation. The discount level alone is insufficient evidence; some legitimate clearance sales are deep.',
      },
      {
        id: 'q2',
        question: 'A fake store shows "only 2 pairs left in stock" and a countdown timer saying "sale ends in 00:47:23". What is the correct understanding of these elements?',
        options: [
          { id: 'a', text: 'Genuine scarcity — popular items sell out quickly online' },
          { id: 'b', text: 'Standard e-commerce practice — all stores use timers to indicate flash sales' },
          { id: 'c', text: 'Manufactured pressure tactics — the timer resets for every new visitor and the stock counter is a hardcoded number, both designed to prevent verification' },
          { id: 'd', text: 'Evidence the site is real — scam sites would not bother with these details' },
        ],
        correctId: 'c',
        explanation: 'Countdown timers and stock alerts on fake sites are purely cosmetic — scripted to create urgency. The timer resets on each page load. The goal is to make you act before the 30 seconds it would take to verify the domain.',
      },
      {
        id: 'q3',
        question: 'The comment section under a sponsored Instagram ad shows 47 positive reviews. A comment reads: "Just received! 100% legit, came in 2 days." Is this reliable evidence the store is genuine?',
        options: [
          { id: 'a', text: 'Yes — 47 comments are too many to be fake' },
          { id: 'b', text: 'Yes — people would not post positively if they had a bad experience' },
          { id: 'c', text: 'No — comment sections are easily seeded with purchased bot accounts; social proof is cheap and unreliable' },
          { id: 'd', text: 'Yes — Instagram removes fake comments automatically' },
        ],
        correctId: 'c',
        explanation: 'Bot-generated comments are available in bulk online for very low cost. Instagram\'s moderation does not reliably remove all fake comments before scam ads run. The comment section on a sponsored ad is the least reliable trust signal.',
      },
      {
        id: 'q4',
        question: 'What does the HTTPS padlock (🔒) in the browser address bar actually guarantee about a website?',
        options: [
          { id: 'a', text: 'The website is legitimate and verified by the government' },
          { id: 'b', text: 'The connection is encrypted — your data travels securely to the server, but says nothing about who owns that server' },
          { id: 'c', text: 'The website has been reviewed and approved by a cybersecurity company' },
          { id: 'd', text: 'All transactions on the site are insured against fraud' },
        ],
        correctId: 'b',
        explanation: 'SSL/TLS (the padlock) only means data is encrypted in transit. Scam sites get free SSL certificates in minutes from services like Let\'s Encrypt. A padlock on "nikeindiaoutlet-deals.in" means your card details travel encrypted to the scammer\'s server — not that the site is trustworthy.',
      },
      {
        id: 'q5',
        question: 'You paid on a fake e-commerce site an hour ago and the product has not arrived. What is the most important first action?',
        options: [
          { id: 'a', text: 'Wait 7 days for standard delivery time before taking action' },
          { id: 'b', text: 'Leave a negative review on the site' },
          { id: 'c', text: 'Call your bank immediately to report unauthorised transaction and dispute the charge — speed is critical' },
          { id: 'd', text: 'Email the site\'s customer support first' },
        ],
        correctId: 'c',
        explanation: 'Your card details are now compromised. The first action is calling your bank to block the card and dispute the charge. Most banks can reverse charges if reported within 24–48 hours. Do not wait for "standard delivery time" — the product will never arrive.',
      },
    ],
  },

  'oc-courier-1': {
    simId: 'oc-courier-1', passMark: 60, xp: 35,
    questions: [
      {
        id: 'q1',
        question: 'You receive an SMS from "DTDC Courier" asking you to pay ₹99 at "dtdc-redelivery.co.in" to reschedule a delivery. What is the first thing you should check?',
        options: [
          { id: 'a', text: 'Whether you were recently expecting a delivery' },
          { id: 'b', text: 'The domain — "dtdc-redelivery.co.in" is not DTDC\'s official website (dtdc.com); any difference is a fake' },
          { id: 'c', text: 'Whether the ₹99 is a reasonable amount' },
          { id: 'd', text: 'The time the SMS was sent' },
        ],
        correctId: 'b',
        explanation: 'The domain is the single most important check. DTDC\'s official website is dtdc.com. "dtdc-redelivery.co.in" is a completely different domain — a spoofed site designed to look like DTDC. The fact that you may be expecting a delivery is what scammers count on.',
      },
      {
        id: 'q2',
        question: 'A ₹99 payment on a fake courier site goes through successfully. Why is a small successful payment actually more dangerous than one that fails?',
        options: [
          { id: 'a', text: 'The ₹99 creates a legal obligation to pay any subsequent charges' },
          { id: 'b', text: 'It proves your card is live and active — scammers use this "card testing" technique before making larger withdrawals' },
          { id: 'c', text: 'No reason — a small successful payment is better than the package not arriving' },
          { id: 'd', text: 'It means your card is definitely stored on the site for future charges' },
        ],
        correctId: 'b',
        explanation: '"Card testing" is a documented fraud technique. Scammers charge a small amount to verify the card works before making larger unauthorised withdrawals. A successful ₹99 payment signals to the scammer that your card is active — larger charges follow.',
      },
      {
        id: 'q3',
        question: 'How do you verify a tracking number from a suspicious courier SMS without clicking the link?',
        options: [
          { id: 'a', text: 'Call the number that sent the SMS' },
          { id: 'b', text: 'Reply to the SMS asking for confirmation' },
          { id: 'c', text: 'Go directly to the courier\'s official app or website (dtdc.com, bluedart.com, etc.) and enter the tracking number there' },
          { id: 'd', text: 'Wait for a second SMS confirmation before clicking' },
        ],
        correctId: 'c',
        explanation: 'The only safe way to verify a tracking number is through the courier\'s official app or website accessed directly — not through any link. If the tracking number doesn\'t exist in the official system, the SMS is fraudulent.',
      },
      {
        id: 'q4',
        question: 'Which of the following describes a legitimate practice by courier companies regarding redelivery fees?',
        options: [
          { id: 'a', text: 'Sending a payment link via SMS to the recipient\'s phone' },
          { id: 'b', text: 'Asking the recipient to pay via WhatsApp' },
          { id: 'c', text: 'Collecting any applicable fees at the door or through their official app — never through unsolicited SMS payment links' },
          { id: 'd', text: 'Calling from a mobile number and asking for UPI payment' },
        ],
        correctId: 'c',
        explanation: 'Legitimate courier companies collect fees at the time of delivery or through their verified official apps. No reputable courier sends unsolicited SMS payment links. This practice is exclusively used by scammers.',
      },
      {
        id: 'q5',
        question: 'You accidentally entered your credit card details on a fake courier site. What should you do within the next 30 minutes?',
        options: [
          { id: 'a', text: 'Monitor your account for a week before taking action' },
          { id: 'b', text: 'Change your card PIN' },
          { id: 'c', text: 'Block the card by calling your bank immediately and report the transaction as fraud — then file a complaint at cybercrime.gov.in' },
          { id: 'd', text: 'Delete the SMS and the site from your browser history' },
        ],
        correctId: 'c',
        explanation: 'Your card details are compromised. Blocking the card within minutes stops any subsequent fraudulent charges. Changing the PIN does not protect against card-not-present fraud (online transactions). The clock starts the moment you entered the data.',
      },
    ],
  },

  'oc-techsupport-1': {
    simId: 'oc-techsupport-1', passMark: 60, xp: 50,
    questions: [
      {
        id: 'q1',
        question: 'A browser popup appears while you are reading a news article. It shows a Windows Security logo, lists three virus names, and says to call "1800-XXX-4821 immediately." What is true about this popup?',
        options: [
          { id: 'a', text: 'It is a legitimate Windows Defender alert — Microsoft embeds these in websites it monitors' },
          { id: 'b', text: 'It is JavaScript running inside the webpage — your computer is not infected and Microsoft has no way to detect viruses through a browser tab' },
          { id: 'c', text: 'It may be real if your antivirus is not updated' },
          { id: 'd', text: 'It is real if the popup makes a sound — scam popups are always silent' },
        ],
        correctId: 'b',
        explanation: 'Browser virus popups are always fake. Microsoft, Windows Defender, and antivirus software operate at the operating system level — they cannot trigger alerts through a webpage in your browser. The popup is JavaScript designed to look like a system alert.',
      },
      {
        id: 'q2',
        question: 'A tech support caller asks you to install AnyDesk and share the 9-digit access code so they can "fix your computer remotely." What should you do?',
        options: [
          { id: 'a', text: 'Install it — AnyDesk is a legitimate company so the support is genuine' },
          { id: 'b', text: 'Install it but watch carefully to make sure they only access system settings' },
          { id: 'c', text: 'Hang up immediately — this request, regardless of who is calling, signals a tech support scam' },
          { id: 'd', text: 'Install it only if the caller knows your name and email address' },
        ],
        correctId: 'c',
        explanation: 'AnyDesk and TeamViewer are legitimate tools — but giving anyone who cold-called you remote access is always a scam. Knowing your name does not make a call legitimate. Hang up and, if concerned, contact Microsoft or your antivirus company directly using numbers from their official website.',
      },
      {
        id: 'q3',
        question: 'A scammer has remote access to your computer for approximately 12 minutes before you disconnect. Why is a standard antivirus scan NOT sufficient protection after this?',
        options: [
          { id: 'a', text: 'Antivirus software cannot scan in the 24 hours after a remote session' },
          { id: 'b', text: 'Scammers use the remote access tool itself — which is legitimate software — and manually operate your browser to perform bank transfers, bypassing antivirus detection entirely' },
          { id: 'c', text: 'Antivirus software is expensive and most people do not have it' },
          { id: 'd', text: 'A scan is sufficient — it will detect any malware installed' },
        ],
        correctId: 'b',
        explanation: 'Tech support scammers do not install traditional malware — they manually use your browser to access your bank account and initiate transfers. The banking transfer happens through the bank\'s own legitimate website. No antivirus monitors this. Bank security and password changes are the critical responses.',
      },
      {
        id: 'q4',
        question: 'If your browser appears frozen or "locked" by a scam popup and you cannot close it normally, the correct method to force-close it is:',
        options: [
          { id: 'a', text: 'Call the number shown in the popup to resolve it' },
          { id: 'b', text: 'Restart your computer by holding the power button — this will install the popup permanently' },
          { id: 'c', text: 'Press Ctrl+Shift+Esc (Windows) to open Task Manager and end the browser process — or Ctrl+W to close the tab' },
          { id: 'd', text: 'Disconnect from the internet — the popup will resolve when offline' },
        ],
        correctId: 'c',
        explanation: 'Ctrl+Shift+Esc opens Task Manager on Windows, where you can force-end the browser process. Ctrl+W closes the current tab. Restarting via power button also works but is slower. The popup has no persistence — it only exists as a webpage and disappears when the browser closes.',
      },
      {
        id: 'q5',
        question: 'Your neighbour gave a scammer remote access for 10 minutes before hanging up. They ran an antivirus scan and it found nothing. Which action is now the most urgent?',
        options: [
          { id: 'a', text: 'The clean scan confirms there is no problem — no further action is needed' },
          { id: 'b', text: 'Run another antivirus scan with a different software tool' },
          { id: 'c', text: 'Call the bank immediately to place a hold on accounts — then change all passwords from a different device and file at cybercrime.gov.in' },
          { id: 'd', text: 'Reset the Windows password' },
        ],
        correctId: 'c',
        explanation: 'A clean antivirus scan is irrelevant after tech support scam remote access — the attack happens through legitimate tools and browser sessions, not malware. The priority is banking (call within minutes) and password changes from a separate device. Speed prevents or reverses financial loss.',
      },
    ],
  },

  'oc-gaming-1': {
    simId: 'oc-gaming-1', passMark: 60, xp: 35,
    questions: [
      {
        id: 'q1',
        question: 'A Discord account named "ValorantOfficial_Rewards" was created 4 days ago and has DMed you about a free skin giveaway. What does the account age tell you?',
        options: [
          { id: 'a', text: 'Nothing — new accounts can be legitimate' },
          { id: 'b', text: 'The account is likely genuine — Riot creates new accounts for giveaway campaigns' },
          { id: 'c', text: 'A strong signal of fraud — brand impersonation accounts are almost always newly created with no post history' },
          { id: 'd', text: 'The account may be genuine if it has a profile picture' },
        ],
        correctId: 'c',
        explanation: 'Legitimate brand accounts have months or years of history. A brand-named account created 4 days ago with no mutual servers and no post history is a clear impersonation indicator. Account age alone is sufficient reason to stop engaging.',
      },
      {
        id: 'q2',
        question: 'The giveaway link leads to a page that looks identical to the Riot Games login. The URL shows "valorant-free-skins.net". Why does the page design being identical not make it trustworthy?',
        options: [
          { id: 'a', text: 'It does make it trustworthy — scammers cannot replicate official site designs' },
          { id: 'b', text: 'A webpage\'s visual design can be copied in minutes — the domain is the only reliable identifier, and "valorant-free-skins.net" is not "playvalorant.com"' },
          { id: 'c', text: 'Login pages all look similar — the design alone cannot distinguish them' },
          { id: 'd', text: 'The page is safe because it loads over HTTPS' },
        ],
        correctId: 'b',
        explanation: 'Copying a website\'s appearance takes minutes using browser developer tools. Scammers routinely create pixel-perfect replicas of legitimate login pages. The domain is the only element they cannot fake — always verify the URL before entering credentials.',
      },
      {
        id: 'q3',
        question: 'A phishing login page accepts your test entry of "testuser / wrongpassword" and shows "Verification complete!" What does this confirm?',
        options: [
          { id: 'a', text: 'Your real credentials happen to match — your account has been found' },
          { id: 'b', text: 'The site is real but its verification is broken' },
          { id: 'c', text: 'The site accepts any input — it is a data-harvesting form, not real authentication' },
          { id: 'd', text: 'The site is safe since it did not detect your fake credentials' },
        ],
        correctId: 'c',
        explanation: 'A login page that accepts any credentials is a phishing form — it is not authenticating you against any real database. It is simply recording whatever you type and displaying a success message. Any input "works" because the goal is data collection, not authentication.',
      },
      {
        id: 'q4',
        question: 'Which security setting provides the strongest protection against losing a gaming account even if your password is phished?',
        options: [
          { id: 'a', text: 'Using a long and complex password' },
          { id: 'b', text: 'Two-Factor Authentication (2FA) — a scammer with your password still cannot log in without the code sent to your phone' },
          { id: 'c', text: 'Logging out of the account after each session' },
          { id: 'd', text: 'Using a different password for each game' },
        ],
        correctId: 'b',
        explanation: '2FA adds a second verification step that the scammer cannot bypass even if they have your exact username and password. This is the single most effective account protection for gaming accounts. Enable it in account security settings immediately.',
      },
      {
        id: 'q5',
        question: 'Your gaming account was compromised through a phishing login. The scammer changed the password. What is your first step to recover the account?',
        options: [
          { id: 'a', text: 'Create a new account and start over' },
          { id: 'b', text: 'Contact the scammer via Discord to negotiate return of the account' },
          { id: 'c', text: 'Use the game\'s official "Account Recovery" or "Account Hacked" process at their official website, providing original registration details as proof of ownership' },
          { id: 'd', text: 'File a police report and wait for them to recover it' },
        ],
        correctId: 'c',
        explanation: 'Game companies have account recovery processes specifically for compromised accounts. For Riot: support.riotgames.com. Provide original registration email, payment history, and account creation details. This is the only reliable path — contacting the scammer achieves nothing.',
      },
    ],
  },

  /* ══════════════════════════════════════════════
     MALWARE & DEVICE SAFETY QUIZZES
  ══════════════════════════════════════════════ */

  'mal-virus-student': {
    simId: 'mal-virus-student', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'What does the Windows "AutoRun" or "AutoPlay" prompt actually do when a USB drive is plugged in?',
        options: [
          { id: 'a', text: 'It scans the drive for viruses automatically' },
          { id: 'b', text: 'It offers to automatically run or open content from the drive — which malware exploits to execute itself without user action' },
          { id: 'c', text: 'It backs up the drive\'s contents to your computer' },
          { id: 'd', text: 'It displays the drive manufacturer\'s safety certificate' },
        ],
        correctId: 'b',
        explanation: 'AutoRun/AutoPlay is a convenience feature that can automatically launch programs or open files from an inserted drive. Malware exploits this by placing an executable that runs when the drive is plugged in. Cancelling the prompt and scanning manually prevents this.',
      },
      {
        id: 'q2',
        question: 'A friend\'s USB drive contains a file called "Notes_Sem4.exe" alongside the actual PDFs. What does the .exe extension tell you?',
        options: [
          { id: 'a', text: 'It is a self-extracting archive — common for large note collections' },
          { id: 'b', text: 'It is an executable program — notes are never .exe files; this is malware' },
          { id: 'c', text: 'It is a Windows-specific PDF viewer' },
          { id: 'd', text: 'It is a compressed folder that automatically opens' },
        ],
        correctId: 'b',
        explanation: 'Study notes are documents — PDFs, Word files, PowerPoints. They are never .exe files. An .exe file is a program that runs code when opened. Any .exe file on a USB drive labelled as notes or documents is almost certainly malware.',
      },
      {
        id: 'q3',
        question: 'Ransomware encrypts your files and demands payment for a decryption key. Why does disconnecting from the internet matter even after encryption has already started on your device?',
        options: [
          { id: 'a', text: 'Disconnecting prevents the ransomware from downloading its own removal tool' },
          { id: 'b', text: 'Ransomware sends the encryption key to the attacker\'s server and can spread to connected network drives — disconnecting cuts both, limiting total damage' },
          { id: 'c', text: 'The ransomware stops running when internet access is removed' },
          { id: 'd', text: 'Disconnecting triggers Windows Defender to automatically decrypt the files' },
        ],
        correctId: 'b',
        explanation: 'Network disconnection serves two critical purposes: it cuts the ransomware\'s communication with its command-and-control server (which receives the encryption key), and it prevents the malware from spreading to shared network drives and other machines on the same network.',
      },
      {
        id: 'q4',
        question: 'Why is running an antivirus scan in "Safe Mode" more effective against active malware than scanning in normal mode?',
        options: [
          { id: 'a', text: 'Safe Mode gives antivirus administrator privileges' },
          { id: 'b', text: 'In Safe Mode, only essential Windows processes run — most malware cannot load at startup, so the antivirus can detect and remove it without the malware actively defending itself' },
          { id: 'c', text: 'Safe Mode runs the antivirus at a higher processor priority' },
          { id: 'd', text: 'Safe Mode connects to a more comprehensive cloud malware database' },
        ],
        correctId: 'b',
        explanation: 'Malware often includes self-defence mechanisms that disable antivirus in normal mode. Safe Mode strips Windows down to essential processes, preventing malware from loading at startup — giving antivirus a clear shot at detection and removal.',
      },
      {
        id: 'q5',
        question: 'Your files have .locked extensions and you cannot open them. A ransom note says to pay ₹50,000 in Bitcoin for the decryption key. You should check which resource before doing anything else?',
        options: [
          { id: 'a', text: 'The attacker\'s website to verify the payment is genuine' },
          { id: 'b', text: 'nomoreransom.org — a free resource with decryption tools for hundreds of ransomware families' },
          { id: 'c', text: 'A Bitcoin exchange to purchase cryptocurrency' },
          { id: 'd', text: 'Your antivirus company\'s paid recovery service' },
        ],
        correctId: 'b',
        explanation: 'No More Ransom (nomoreransom.org) is a joint initiative by law enforcement and cybersecurity companies offering free decryption tools for known ransomware variants. Check there before considering payment — many families have free decryption available.',
      },
    ],
  },

  'mal-virus-student-email': {
    simId: 'mal-virus-student-email', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'A Word document opens and displays a yellow bar saying "ENABLE CONTENT — This document is protected. You must enable content to view it." What is actually happening?',
        options: [
          { id: 'a', text: 'The document is DRM-protected and needs your Microsoft account to unlock' },
          { id: 'b', text: 'The document is trying to get you to enable macros — small programs embedded in the file that will execute the attacker\'s code if activated' },
          { id: 'c', text: 'The document requires a newer version of Microsoft Office' },
          { id: 'd', text: 'The document is encrypted and your computer needs to decrypt it' },
        ],
        correctId: 'b',
        explanation: '"Enable Content" is Microsoft Office\'s prompt to run macros. Legitimate documents — notes, timetables, forms — never need macros to display their content. This prompt is the standard delivery mechanism for macro-based malware.',
      },
      {
        id: 'q2',
        question: 'An email says it\'s from "Prof. Sharma (examcell@ktu-exam.in)" about postponed exams. The real KTU domain is ktu.edu.in. What should tip you off?',
        options: [
          { id: 'a', text: 'The message is about postponed exams — colleges don\'t email about this' },
          { id: 'b', text: 'The sending domain is ktu-exam.in — the real KTU uses ktu.edu.in — this is a spoofed domain' },
          { id: 'c', text: 'Professor names are never included in official emails' },
          { id: 'd', text: 'The email uses a hyphen in the address' },
        ],
        correctId: 'b',
        explanation: 'The display name can say anything — "Prof. Sharma" is just text. The actual sending domain "ktu-exam.in" is completely different from the real "ktu.edu.in." Anyone can register ktu-exam.in. Only the domain after @ is reliable.',
      },
      {
        id: 'q3',
        question: 'After opening a malicious document, your laptop begins sending emails to your contacts from your account without your action. What type of malware behaviour is this?',
        options: [
          { id: 'a', text: 'Ransomware — it\'s encrypting your email contacts' },
          { id: 'b', text: 'A worm or email-spreading malware using your credentials to propagate itself to new victims' },
          { id: 'c', text: 'Adware displaying email-based advertisements' },
          { id: 'd', text: 'Spyware logging your emails for later review' },
        ],
        correctId: 'b',
        explanation: 'Using a compromised account to send infected emails to the victim\'s contacts is a self-propagation technique — each new recipient trusts the email because it comes from a known sender. Disconnecting from the network immediately stops the spread.',
      },
      {
        id: 'q4',
        question: 'After a malware infection on your laptop, you need to change your email password. Why should you do this from a different device?',
        options: [
          { id: 'a', text: 'The infected laptop may not have internet access after disconnecting' },
          { id: 'b', text: 'If a keylogger is active, the new password typed on the infected laptop will be captured immediately, making the change useless' },
          { id: 'c', text: 'Google and Microsoft block password changes from infected devices' },
          { id: 'd', text: 'The malware will intercept the password reset email' },
        ],
        correctId: 'b',
        explanation: 'A keylogger records every keystroke. If one is active on your laptop, typing a new password there gives the attacker your new password immediately. Always change passwords from a verified clean device — a phone that was not connected to the infected network, or another computer.',
      },
      {
        id: 'q5',
        question: 'A classmate asks you to forward a suspicious attachment to them "to see if they can open it." Why is this a bad idea even if you haven\'t opened it yourself?',
        options: [
          { id: 'a', text: 'Forwarding the email is illegal' },
          { id: 'b', text: 'You would be delivering the malware directly to another victim — the file is dangerous regardless of who opens it' },
          { id: 'c', text: 'The attachment may grow in size during forwarding' },
          { id: 'd', text: 'Forwarding activates the macro automatically' },
        ],
        correctId: 'b',
        explanation: 'The malicious file is dangerous to anyone who opens it, not just to you. Forwarding it spreads the threat to another potential victim. The correct action is to report the email to IT or your college\'s helpdesk and delete it.',
      },
    ],
  },

  'mal-virus-pro': {
    simId: 'mal-virus-pro', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'A vendor you work with has a domain "ravi-supplies.com". You receive an invoice attachment from "accounts@ravi-supplyes.com". What is the most likely explanation?',
        options: [
          { id: 'a', text: 'The vendor made a typo when creating their email address' },
          { id: 'b', text: 'This is a Business Email Compromise (BEC) attack — an attacker registered a near-identical domain to impersonate the vendor' },
          { id: 'c', text: 'The vendor switched email providers and this is their new domain' },
          { id: 'd', text: 'This is an automatic email forwarding alias' },
        ],
        correctId: 'b',
        explanation: 'Registering a near-identical domain ("ravi-supplyes.com" vs "ravi-supplies.com") is a classic Business Email Compromise technique. The attacker sends malicious invoices or requests from the lookalike domain. Always verify with a direct phone call before opening attachments from vendors.',
      },
      {
        id: 'q2',
        question: 'Legitimate software updates from Microsoft are delivered through:',
        options: [
          { id: 'a', text: 'Email links from IT Support with download instructions' },
          { id: 'b', text: 'Windows Update (Settings → Windows Update) or a corporate patch management system like SCCM or Intune — never via email links' },
          { id: 'c', text: 'Pop-up notifications in web browsers' },
          { id: 'd', text: 'WhatsApp messages from the IT department' },
        ],
        correctId: 'b',
        explanation: 'Microsoft delivers updates through the built-in Windows Update mechanism, not through email links. If your company has a patch management system, updates come through that. Any email asking you to download a "critical patch" via a link is a Trojan attack.',
      },
      {
        id: 'q3',
        question: 'A colleague\'s machine is actively spreading malware emails to your company\'s client contacts. What is the most urgent action and why?',
        options: [
          { id: 'a', text: 'Run antivirus immediately — removing the malware is the priority' },
          { id: 'b', text: 'Disconnect the machine from the network immediately — this stops all outbound activity. Scanning can only happen safely after isolation.' },
          { id: 'c', text: 'Change the colleague\'s email password to stop outbound emails' },
          { id: 'd', text: 'Restart the machine to interrupt the malware process' },
        ],
        correctId: 'b',
        explanation: 'Network isolation is always the first step. An antivirus scan while connected to the network allows the malware to continue spreading and potentially download additional payloads during the scan. Isolation stops all network activity instantly; everything else comes after.',
      },
      {
        id: 'q4',
        question: 'Why is a corporate macro malware infection particularly dangerous compared to one on a personal laptop?',
        options: [
          { id: 'a', text: 'Corporate laptops have more files to encrypt' },
          { id: 'b', text: 'Corporate machines are connected to shared network drives containing client data — malware can spread to all connected machines and access data company-wide' },
          { id: 'c', text: 'Corporate antivirus is generally less effective' },
          { id: 'd', text: 'Corporate emails have larger attachment size limits enabling bigger malware' },
        ],
        correctId: 'b',
        explanation: 'Corporate network connectivity is what transforms a single infected laptop into a company-wide incident. Malware on a networked machine can reach shared drives, other workstations, and servers — accessing and encrypting or exfiltrating data across the entire organisation.',
      },
      {
        id: 'q5',
        question: 'CERT-In (Indian Computer Emergency Response Team) should be notified when:',
        options: [
          { id: 'a', text: 'Any individual receives a suspicious email' },
          { id: 'b', text: 'A corporate or critical infrastructure malware incident occurs, especially if client data may have been compromised' },
          { id: 'c', text: 'A personal laptop gets adware' },
          { id: 'd', text: 'An email goes to spam' },
        ],
        correctId: 'b',
        explanation: 'CERT-In (cert-in.org.in) handles national-level cyber incidents — corporate breaches, critical infrastructure attacks, and large-scale malware campaigns. Reporting helps them track threat actors and issue national advisories to protect other organisations.',
      },
    ],
  },

  'mal-virus-elderly': {
    simId: 'mal-virus-elderly', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'You receive a forwarded WhatsApp message from your daughter about a government health scheme with an APK file attachment. Your daughter frequently shares useful information. What should you do first?',
        options: [
          { id: 'a', text: 'Install the APK — it came from your daughter so it must be safe' },
          { id: 'b', text: 'Call your daughter directly to ask if she intentionally sent this' },
          { id: 'c', text: 'Search online for the health scheme to verify it exists' },
          { id: 'd', text: 'Forward it to other family members who might benefit' },
        ],
        correctId: 'b',
        explanation: 'Malware spreads through trusted contacts without their knowledge. Your daughter\'s account may have forwarded the message automatically, or she may not realise the APK is malicious. A direct call takes 30 seconds and prevents installation.',
      },
      {
        id: 'q2',
        question: 'What is an APK file, and why is installing one from WhatsApp risky?',
        options: [
          { id: 'a', text: 'A photo file — risky because it can contain viruses embedded in images' },
          { id: 'b', text: 'An Android app installer that bypasses the Play Store\'s safety checks, which means the app has not been reviewed by Google for malware' },
          { id: 'c', text: 'A government document format used for scheme registration' },
          { id: 'd', text: 'A compressed folder for sharing multiple files' },
        ],
        correctId: 'b',
        explanation: 'APK (Android Package) files install apps directly, bypassing the Play Store vetting process. Google\'s Play Protect screens Play Store apps for malware — APKs from outside the store skip this entirely, making them a primary delivery method for Android malware.',
      },
      {
        id: 'q3',
        question: 'A suspicious app on your phone requested "SMS" permission when installing. Why is this particularly dangerous?',
        options: [
          { id: 'a', text: 'The app can send paid SMS messages from your number' },
          { id: 'b', text: 'The app can read all incoming SMS messages including OTPs sent by your bank — giving it access to your accounts' },
          { id: 'c', text: 'The app can delete your text message history' },
          { id: 'd', text: 'The app can block texts from your contacts' },
        ],
        correctId: 'b',
        explanation: 'Banks send OTPs via SMS for every transaction approval and password reset. An app with SMS permission reads these OTPs in real time, giving the attacker the ability to approve transactions and access accounts without needing your password.',
      },
      {
        id: 'q4',
        question: 'Google Play Protect is found at:',
        options: [
          { id: 'a', text: 'Settings → Security → Play Protect' },
          { id: 'b', text: 'Play Store → Profile icon (top right) → Play Protect → Scan device' },
          { id: 'c', text: 'Google app → Settings → Security' },
          { id: 'd', text: 'Phone Dialer → *#*#426#*#*' },
        ],
        correctId: 'b',
        explanation: 'Play Protect is accessed through the Play Store app: tap your profile picture in the top right → Play Protect → Scan. It checks all installed apps against Google\'s malware database and can flag or remove harmful apps.',
      },
      {
        id: 'q5',
        question: 'Why should you never call "Google Support" numbers that appear in pop-up messages or web pages on your phone?',
        options: [
          { id: 'a', text: 'Google does not have a phone support service' },
          { id: 'b', text: 'These are fake numbers — Google never displays support phone numbers in pop-ups. Calling connects you to scammers who will attempt to gain remote access to your device.' },
          { id: 'c', text: 'Google support only operates in English' },
          { id: 'd', text: 'The calls are automatically charged at premium rates' },
        ],
        correctId: 'b',
        explanation: 'Legitimate tech companies including Google, Samsung, and Apple do not display phone numbers in pop-up warnings. Any pop-up or website showing a "support number" is a scam designed to connect you with fraudsters who will attempt remote access or extort fees.',
      },
    ],
  },

  'mal-trojan-student': {
    simId: 'mal-trojan-student', passMark: 60, xp: 40,
    questions: [
      {
        id: 'q1',
        question: 'What is a Trojan horse in the context of software, and how does it differ from a virus?',
        options: [
          { id: 'a', text: 'A Trojan self-replicates across networks; a virus requires a host program' },
          { id: 'b', text: 'A Trojan disguises itself as legitimate software to trick users into installing it; a virus spreads automatically by infecting existing files' },
          { id: 'c', text: 'A Trojan encrypts files; a virus displays advertisements' },
          { id: 'd', text: 'They are the same — "Trojan" is an older name for "virus"' },
        ],
        correctId: 'b',
        explanation: 'A Trojan relies on deception — it looks like something you want (a game, a tool) but installs malicious code alongside or instead of the stated function. Unlike viruses, Trojans do not self-replicate — they depend entirely on the user choosing to install them.',
      },
      {
        id: 'q2',
        question: 'Software installers for cracked games often use a technique called "bundling." What does this mean?',
        options: [
          { id: 'a', text: 'The installer compresses multiple game files into one package' },
          { id: 'b', text: 'The installer includes additional hidden software — often malware — that installs alongside the advertised program, sometimes with pre-checked consent boxes' },
          { id: 'c', text: 'The game bundles with a music playlist' },
          { id: 'd', text: 'Multiple users share the same licence' },
        ],
        correctId: 'b',
        explanation: 'Bundling is a technique where installers include additional programs — keyloggers, adware, RATs — either hidden or in pre-checked boxes that most users click past. Reading every screen of every installer and unchecking additional programs is the only defence.',
      },
      {
        id: 'q3',
        question: 'You see a process called "keylog-driver.sys" running in your roommate\'s Task Manager. What does "keylog" in the process name suggest?',
        options: [
          { id: 'a', text: 'It is a keyboard driver update service' },
          { id: 'b', text: 'It is likely a keylogger — software that records every keystroke typed, including passwords, OTPs, and credit card numbers' },
          { id: 'c', text: 'It is a system performance monitoring tool' },
          { id: 'd', text: 'It is a Windows log cleanup utility' },
        ],
        correctId: 'b',
        explanation: 'A keylogger silently records every keystroke. Legitimate Windows and driver processes do not have "keylog" in their name. A process with this name is almost certainly malware that has been recording passwords and sensitive information typed on the machine.',
      },
      {
        id: 'q4',
        question: 'If a keylogger was active on your machine for a week, what is the correct scope of password changes needed?',
        options: [
          { id: 'a', text: 'Only change the password you use most frequently' },
          { id: 'b', text: 'Change every account password that was typed on that machine during the period — email, banking, social media, college portals — from a different clean device' },
          { id: 'c', text: 'Change only your Windows login password' },
          { id: 'd', text: 'Passwords changed in private/incognito mode are not captured by keyloggers' },
        ],
        correctId: 'b',
        explanation: 'A keylogger captures every keystroke regardless of browser mode, app, or website. Every account whose password was typed on the infected machine must be considered compromised. All changes must be made from a verified clean device — otherwise the new passwords are captured immediately too.',
      },
      {
        id: 'q5',
        question: 'What is the safest source to download software to guarantee it has not been bundled with malware?',
        options: [
          { id: 'a', text: 'Any site that appears in the top 3 Google search results' },
          { id: 'b', text: 'The software developer\'s official website, the Microsoft Store, or verified platform storefronts like Steam' },
          { id: 'c', text: 'Torrent sites with high seeder counts indicating popular, verified files' },
          { id: 'd', text: 'Sites labelled "mirror download" which are faster alternatives to official sites' },
        ],
        correctId: 'b',
        explanation: 'Only the developer\'s own website and verified storefronts guarantee the software has not been modified. Search results, torrent sites, and third-party "mirror" sites are not safe. High seeder count means many people downloaded it — not that it is safe.',
      },
    ],
  },

  'mal-trojan-pro': {
    simId: 'mal-trojan-pro', passMark: 60, xp: 40,
    questions: [
      {
        id: 'q1',
        question: 'What is a Remote Access Trojan (RAT) and what can an attacker do with one installed on a machine?',
        options: [
          { id: 'a', text: 'A RAT encrypts files for ransom' },
          { id: 'b', text: 'A RAT gives the attacker full remote control of the machine — browsing files, activating the webcam, logging keystrokes, and moving through the network — all invisibly' },
          { id: 'c', text: 'A RAT displays advertisements' },
          { id: 'd', text: 'A RAT monitors internet bandwidth usage' },
        ],
        correctId: 'b',
        explanation: 'A RAT is one of the most dangerous forms of malware because it gives a human attacker full, real-time, interactive control of the victim\'s machine. Unlike automated malware, a RAT operator actively explores the system, reads documents, and plans next steps.',
      },
      {
        id: 'q2',
        question: 'Your IT department has never delivered an update via email link before. Today you receive one claiming a "critical patch" must be applied immediately. The most likely explanation is:',
        options: [
          { id: 'a', text: 'IT changed their update delivery method without announcement' },
          { id: 'b', text: 'This is a spear-phishing attack specifically targeting your organisation using social engineering against employees who know updates are important' },
          { id: 'c', text: 'The update is too large for the company\'s patch management system' },
          { id: 'd', text: 'The patch management system is temporarily down' },
        ],
        correctId: 'b',
        explanation: 'Attackers research their targets before striking. Knowing employees expect IT updates allows a convincing fake. Legitimate IT departments follow established, consistent procedures — a sudden change in delivery method, especially via email link, is a strong attack indicator.',
      },
      {
        id: 'q3',
        question: 'A RAT is confirmed on a colleague\'s machine. IT asks you to help. What is the correct order of first actions?',
        options: [
          { id: 'a', text: 'Run antivirus → then disconnect from network → then change passwords' },
          { id: 'b', text: 'Disconnect from network immediately → run antivirus in isolation → assess what the attacker accessed → change relevant credentials' },
          { id: 'c', text: 'Change all passwords → restart the machine → run antivirus' },
          { id: 'd', text: 'Reinstall Windows → reconnect to network → run antivirus' },
        ],
        correctId: 'b',
        explanation: 'Network isolation always comes first. With a RAT, a human attacker may be actively on the machine at that moment — every second of connectivity is a window for exfiltration or lateral movement. Isolation → scan → assess damage → remediate is the correct sequence.',
      },
      {
        id: 'q4',
        question: 'Why is "run antivirus to remove the RAT" alone an insufficient response to a confirmed RAT infection?',
        options: [
          { id: 'a', text: 'Antivirus cannot detect RATs' },
          { id: 'b', text: 'The attacker may have already exfiltrated data, created backdoors, or accessed other network resources before the RAT was detected — these consequences exist regardless of removal' },
          { id: 'c', text: 'Antivirus removes the RAT but cannot remove its effects on performance' },
          { id: 'd', text: 'A new antivirus must be installed before removing the old one' },
        ],
        correctId: 'b',
        explanation: 'Removing the RAT stops ongoing access but does not undo what the attacker did while it was active. They may have copied files, planted additional backdoors, stolen credentials, or mapped the network. A full forensic assessment of "what did they access?" must follow removal.',
      },
      {
        id: 'q5',
        question: 'Before opening any unexpected document attachment from a vendor, the most effective verification is:',
        options: [
          { id: 'a', text: 'Hovering over the attachment to preview the file contents' },
          { id: 'b', text: 'Calling the vendor directly on a known, saved phone number to confirm they sent it' },
          { id: 'c', text: 'Checking if the email has an unsubscribe link — legitimate emails always do' },
          { id: 'd', text: 'Opening in Google Drive viewer rather than locally' },
        ],
        correctId: 'b',
        explanation: 'A direct phone call to the vendor on a number you already have is the only verification that cannot be spoofed. Email domains can be cloned, display names can be faked, and previews can still trigger malicious scripts in some environments.',
      },
    ],
  },

  'mal-ransomware-pro': {
    simId: 'mal-ransomware-pro', passMark: 60, xp: 60,
    questions: [
      {
        id: 'q1',
        question: 'Ransomware typically enters a corporate environment through which most common initial vector?',
        options: [
          { id: 'a', text: 'Physical USB drives left in public areas' },
          { id: 'b', text: 'Phishing emails with malicious attachments or links that an employee opens' },
          { id: 'c', text: 'Automatic infection when visiting any news website' },
          { id: 'd', text: 'Vulnerabilities in the office Wi-Fi router firmware' },
        ],
        correctId: 'b',
        explanation: 'Phishing emails remain the dominant ransomware entry point in corporate environments. An employee opening a malicious attachment or clicking a link that downloads a dropper is how most ransomware campaigns begin. This is why email security, macro policies, and user training are the primary corporate defences.',
      },
      {
        id: 'q2',
        question: 'The ransom demand says paying 0.5 BTC will guarantee decryption within 24 hours. Research shows ransomware groups have a payment-to-decryption success rate of:',
        options: [
          { id: 'a', text: 'Near 100% — attackers have a business reputation to maintain' },
          { id: 'b', text: 'Highly variable — many victims receive no key, a broken key, or partial decryption even after payment' },
          { id: 'c', text: 'Exactly 50% by law — they must partially comply' },
          { id: 'd', text: '0% — all ransomware groups are scams with no real decryption capability' },
        ],
        correctId: 'b',
        explanation: 'Payment outcomes vary significantly. Some groups provide working decryption keys to maintain their "reputation." Others take payment and vanish. Decryption keys may be slow, partial, or broken. Payment also funds future attacks and marks the victim as willing to pay.',
      },
      {
        id: 'q3',
        question: 'Windows "Previous Versions" or "Shadow Copy" can help recover encrypted files because:',
        options: [
          { id: 'a', text: 'It stores encrypted files in their original format' },
          { id: 'b', text: 'Windows periodically creates snapshots of files before they are modified — if ransomware didn\'t delete these shadow copies, you can restore previous unencrypted versions' },
          { id: 'c', text: 'It connects to Microsoft\'s cloud backup automatically' },
          { id: 'd', text: 'Shadow copies are stored on a separate network drive outside ransomware reach' },
        ],
        correctId: 'b',
        explanation: 'Windows Volume Shadow Copy Service (VSS) creates point-in-time snapshots of files. Modern ransomware often deletes shadow copies first — but some variants don\'t. Right-clicking an encrypted file → Properties → Previous Versions is always worth checking before other options.',
      },
      {
        id: 'q4',
        question: 'The most reliable protection against ransomware data loss in an organisation is:',
        options: [
          { id: 'a', text: 'Having antivirus on every machine' },
          { id: 'b', text: 'Regular, tested backups stored on systems not connected to the main network — so ransomware cannot reach and encrypt the backup copies' },
          { id: 'c', text: 'Disabling USB ports on all machines' },
          { id: 'd', text: 'Using strong passwords on all employee accounts' },
        ],
        correctId: 'b',
        explanation: 'Offline or air-gapped backups are the definitive ransomware defence. Backups connected to the network will be encrypted along with everything else. The backup must also be tested regularly — an untested backup that fails during recovery is as useful as no backup.',
      },
      {
        id: 'q5',
        question: 'nomoreransom.org is a resource jointly run by Europol, the Dutch Police, and cybersecurity companies. It offers:',
        options: [
          { id: 'a', text: 'A service to negotiate ransom payments on your behalf' },
          { id: 'b', text: 'Free decryption tools for hundreds of ransomware families — always check here before considering payment' },
          { id: 'c', text: 'A Bitcoin escrow service for safer ransom payment' },
          { id: 'd', text: 'Legal advice on liability after a ransomware attack' },
        ],
        correctId: 'b',
        explanation: 'No More Ransom (nomoreransom.org) offers free decryption tools for known ransomware strains. Law enforcement recovers and publishes decryption keys when criminal groups are dismantled. Many victims can recover files for free — always check before paying.',
      },
    ],
  },

  'mal-ransomware-elderly': {
    simId: 'mal-ransomware-elderly', passMark: 60, xp: 60,
    questions: [
      {
        id: 'q1',
        question: 'Police ransomware (phone locker malware) typically claims to be from an authority like "National Cyber Crime Department." Which of the following would a real Indian law enforcement agency never do?',
        options: [
          { id: 'a', text: 'Send written notices through registered post' },
          { id: 'b', text: 'Remotely lock your phone and demand immediate UPI payment to unlock it' },
          { id: 'c', text: 'Issue warrants through a magistrate' },
          { id: 'd', text: 'File cases through the court system' },
        ],
        correctId: 'b',
        explanation: 'Indian law enforcement operates through courts, registered notices, and physical processes — not remote phone locking and UPI payment demands. No Indian police authority, court, or government agency has the technical mechanism or legal authority to lock a private phone remotely and demand digital payment.',
      },
      {
        id: 'q2',
        question: 'Android "Safe Mode" is useful for removing a phone-locking app because:',
        options: [
          { id: 'a', text: 'It connects to Google\'s servers to automatically remove malware' },
          { id: 'b', text: 'In Safe Mode, only pre-installed system apps run — third-party apps including the malicious locker are disabled, letting you access Settings to uninstall it' },
          { id: 'c', text: 'Safe Mode gives you a 30-minute window before the screen locks again' },
          { id: 'd', text: 'It resets the phone to factory settings automatically' },
        ],
        correctId: 'b',
        explanation: 'Safe Mode boots Android with only core system apps. The malicious locker app cannot run in Safe Mode, giving you full access to Settings → Apps where you can find and uninstall it. To enter Safe Mode: hold power button → tap and hold "Power off" → confirm "Reboot to safe mode."',
      },
      {
        id: 'q3',
        question: 'A phone locker app requests "Device Administrator" permission during installation. If granted, this allows the app to:',
        options: [
          { id: 'a', text: 'Update itself automatically in the background' },
          { id: 'b', text: 'Lock the screen, change the lock PIN, and resist uninstallation — making it much harder to remove' },
          { id: 'c', text: 'Access your phone contacts and call history' },
          { id: 'd', text: 'Enable screen recording during your calls' },
        ],
        correctId: 'b',
        explanation: 'Device Administrator permission gives an app the ability to lock the screen, wipe the device, and prevent its own uninstallation. Malicious apps seek this permission specifically to make removal difficult. To remove a Device Admin app: Settings → Security → Device Admin Apps → deactivate → then uninstall.',
      },
      {
        id: 'q4',
        question: 'A fake police notice on your phone displays your photo (taken by the front camera). The purpose of showing your photo is:',
        options: [
          { id: 'a', text: 'To confirm the notice was sent to the correct person' },
          { id: 'b', text: 'To make the notice appear more official and frighten you into paying by suggesting authorities already have your image' },
          { id: 'c', text: 'To check if you match a criminal database' },
          { id: 'd', text: 'To video call the authorities automatically' },
        ],
        correctId: 'b',
        explanation: 'The app secretly activates the front camera and captures your photo when the lockscreen appears. Displaying "your" photo makes the notice feel personalised and authoritative — suggesting authorities have already identified you. It is pure psychological manipulation with no legal basis.',
      },
      {
        id: 'q5',
        question: 'If Safe Mode removal of a phone locker malware fails, what is the nuclear option and what does it cost you?',
        options: [
          { id: 'a', text: 'Replacing the phone — the malware permanently damages hardware' },
          { id: 'b', text: 'Factory reset — this removes all malware but also deletes all personal data, photos, and apps not backed up to Google' },
          { id: 'c', text: 'Removing the SIM card — this breaks the malware\'s connection to its control server' },
          { id: 'd', text: 'Flashing a new ROM — only possible with a rooted phone' },
        ],
        correctId: 'b',
        explanation: 'A factory reset (Settings → General Management → Reset → Factory Reset) removes all software including malware — but also wipes all data stored on the phone. Photos backed up to Google Photos and contacts synced to Google are recoverable. Locally stored data that was not backed up is lost.',
      },
    ],
  },

  'mal-adware-student': {
    simId: 'mal-adware-student', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'After installing a "free video converter" from an unofficial site, your browser homepage changed to "search.mysearchengine.net" without your permission. This is called:',
        options: [
          { id: 'a', text: 'A browser update that changed default settings' },
          { id: 'b', text: 'A browser hijack — adware or a PUP (Potentially Unwanted Program) modified your browser settings as part of a bundled installation' },
          { id: 'c', text: 'A Chrome synchronisation issue from another device' },
          { id: 'd', text: 'A Microsoft update that resets homepage settings' },
        ],
        correctId: 'b',
        explanation: 'A browser hijack occurs when software modifies your homepage, search engine, or new tab page without clear consent. It is typically installed bundled with free software from unofficial sites. The "new" search engine sends your searches to advertisers and collects browsing data.',
      },
      {
        id: 'q2',
        question: 'A browser popup appears on a website warning "VIRUS DETECTED — Your PC is infected with 3 viruses. Call Microsoft Support at 1800-XXX-XXXX immediately." You should:',
        options: [
          { id: 'a', text: 'Call the number — Microsoft monitors for infections and this is a genuine alert' },
          { id: 'b', text: 'Close the tab — legitimate antivirus software never displays virus warnings in web browser popups, and this number connects to scammers' },
          { id: 'c', text: 'Click the provided link to run Microsoft\'s online scan' },
          { id: 'd', text: 'Copy the virus names shown and search for removal instructions' },
        ],
        correctId: 'b',
        explanation: 'Legitimate antivirus software displays alerts in its own application window — never in a web browser tab. Browser-based "virus warnings" are either adware running on your machine or scam websites. The phone number connects to tech support scammers who will charge fees for fake removal.',
      },
      {
        id: 'q3',
        question: 'To fully remove a browser hijacker, which steps are required in the correct order?',
        options: [
          { id: 'a', text: 'Restart the browser → change homepage → install new antivirus' },
          { id: 'b', text: 'Uninstall the source program from Control Panel → remove the browser extension → reset browser settings' },
          { id: 'c', text: 'Reset browser settings → restart the computer → reinstall the browser' },
          { id: 'd', text: 'Clear browser cache → change the search engine manually → delete cookies' },
        ],
        correctId: 'b',
        explanation: 'Browser hijackers typically persist via three mechanisms: the installed program, a browser extension, and modified browser settings. All three must be removed in sequence. Resetting the browser without uninstalling the program often fails because the extension reinstalls the changes.',
      },
      {
        id: 'q4',
        question: 'A website says "Your download is ready" and shows a large blue "Download" button and a smaller grey "Skip" link. What is the large button most likely doing?',
        options: [
          { id: 'a', text: 'Downloading the file you requested' },
          { id: 'b', text: 'Downloading a different file — often adware or a PUP — designed to look like the real download button, while the actual file link is the small grey text' },
          { id: 'c', text: 'Verifying your download eligibility' },
          { id: 'd', text: 'Opening the file directly in the browser' },
        ],
        correctId: 'b',
        explanation: 'Download sites frequently use fake "Download" buttons that are actually advertisements for bundled software. The real download is often a small plain link. Always pause and look for which button is the advertisement versus the actual file you want.',
      },
      {
        id: 'q5',
        question: 'AdwCleaner is a tool specifically designed to remove:',
        options: [
          { id: 'a', text: 'Ransomware encryption' },
          { id: 'b', text: 'Adware, browser hijackers, and Potentially Unwanted Programs (PUPs) — categories that standard antivirus often misses' },
          { id: 'c', text: 'Trojans and Remote Access Tools' },
          { id: 'd', text: 'Browser cookies and cached data' },
        ],
        correctId: 'b',
        explanation: 'AdwCleaner (by Malwarebytes, free at malwarebytes.com/adwcleaner) is purpose-built for adware, PUPs, and browser hijackers — categories that traditional antivirus scanners often classify as "not malware" and therefore don\'t remove. It fills an important gap for these annoying but persistent threats.',
      },
    ],
  },

  'mal-adware-elderly': {
    simId: 'mal-adware-elderly', passMark: 60, xp: 30,
    questions: [
      {
        id: 'q1',
        question: 'Your Android phone has a setting called "Install unknown apps" or "Unknown sources." What risk does enabling this setting create?',
        options: [
          { id: 'a', text: 'It allows apps to use more mobile data' },
          { id: 'b', text: 'It allows APK files from outside the Play Store to be installed — bypassing Google\'s safety checks that screen apps for malware' },
          { id: 'c', text: 'It gives apps permission to make phone calls' },
          { id: 'd', text: 'It allows the phone to be accessed remotely by Google' },
        ],
        correctId: 'b',
        explanation: 'The "Unknown sources" / "Install unknown apps" setting controls whether Android allows APK installations from outside the Play Store. Enabling it bypasses Google Play Protect\'s screening. It should be kept OFF unless you specifically need it, and turned off again immediately after.',
      },
      {
        id: 'q2',
        question: 'An app called "Super Torch HD" on the Play Store requests access to your Contacts, SMS, Location, and Camera. A torch app realistically needs:',
        options: [
          { id: 'a', text: 'All of these permissions — modern torch apps use location to adjust brightness based on ambient light' },
          { id: 'b', text: 'Only Camera permission — to access the camera flash. Contacts, SMS, and Location have no legitimate use for a torch' },
          { id: 'c', text: 'Contacts and Camera — to share torch activation with friends' },
          { id: 'd', text: 'Location only — to set automatic brightness schedules' },
        ],
        correctId: 'b',
        explanation: 'A torch app needs only Camera permission to activate the flash LED. Any app requesting Contacts, SMS, or Location beyond what its function requires is harvesting data. Deny unnecessary permissions — you can always grant them later if genuinely needed.',
      },
      {
        id: 'q3',
        question: 'Ads appear as full-screen pop-ups on your phone even when you are not using any app. This behaviour most likely indicates:',
        options: [
          { id: 'a', text: 'Your mobile data plan includes advertising' },
          { id: 'b', text: 'An adware app is installed that displays ads on the home screen and over other apps using Android\'s "Display over other apps" permission' },
          { id: 'c', text: 'Your phone\'s operating system needs an update' },
          { id: 'd', text: 'Your Wi-Fi router is injecting advertisements' },
        ],
        correctId: 'b',
        explanation: 'Full-screen ads that appear outside of any app indicate an adware app with "Display over other apps" (overlay) permission. This permission allows apps to draw on top of everything else on screen. Find the culprit in Settings → Apps → [suspicious app] → Permissions.',
      },
      {
        id: 'q4',
        question: 'An unknown caller says: "We are calling from Samsung. Our systems show your phone has a dangerous virus. Please give us remote access and we will fix it for free." You should:',
        options: [
          { id: 'a', text: 'Grant access — Samsung monitors all Galaxy phones for security issues' },
          { id: 'b', text: 'Hang up immediately — Samsung, Google, and no legitimate company calls you unsolicited to remotely fix your device' },
          { id: 'c', text: 'Ask them to send an official SMS first before proceeding' },
          { id: 'd', text: 'Allow read-only access but not full control' },
        ],
        correctId: 'b',
        explanation: 'No legitimate technology company calls you unsolicited to fix a virus on your device. These are "tech support scam" calls. Remote access given to the caller allows them to install malware, access banking apps, and capture OTPs. Hanging up immediately is always the correct response.',
      },
      {
        id: 'q5',
        question: 'You suspect an app is draining your battery by running ads in the background. Where in Android settings can you see which apps are consuming the most battery?',
        options: [
          { id: 'a', text: 'Settings → Display → Battery saver' },
          { id: 'b', text: 'Settings → Battery → Battery usage — this shows each app\'s percentage of battery consumption' },
          { id: 'c', text: 'Settings → Apps → Running apps' },
          { id: 'd', text: 'Settings → Developer options → Process stats' },
        ],
        correctId: 'b',
        explanation: 'Settings → Battery → Battery usage shows each app\'s battery consumption as a percentage. An app consuming disproportionately more battery than its usage justifies — especially one running in the background — is likely running hidden processes like ad loading or data collection.',
      },
    ],
  },

}
