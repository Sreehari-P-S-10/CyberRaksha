-- ══════════════════════════════════════════════════════════════════
-- CyberRaksha — Seed: Quiz Questions (migrated from quizData.js)
-- Run AFTER 001_seed_simulations.sql which creates the quizzes rows.
-- ══════════════════════════════════════════════════════════════════

-- ── ii-s-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'An Instagram account called "@vit_vellore_admissions" has 847 followers, no blue tick, and was created 3 weeks ago. It is running a paid sponsored post about fee waivers. A real VIT Vellore account would have:',
  'Roughly the same follower count — universities keep social media small',
  'A blue verified tick, hundreds of thousands of followers, and years of post history',
  'No verified tick — Instagram does not verify educational institutions',
  'A similar follower count since most students do not follow official pages',
  'b',
  'Major Indian universities have verified accounts with very large followings built over years. An account created recently with under a thousand followers claiming to be an official institution is definitively fake.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A scholarship form asks for your Aadhaar number, bank account number, and IFSC code to "disburse the award." Which of these should never appear on an initial scholarship application?',
  'Your name and roll number',
  'Your percentage or CGPA',
  'Bank account number and Aadhaar — collected only after selection and verification in person',
  'Your department and year of study',
  'c',
  'Legitimate scholarship applications collect academic and personal details first. Bank and Aadhaar details are collected only after selection through a secure official process — never in an initial online form linked from social media.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'The official government portal for central scholarship schemes in India is:',
  'scholarships.india.gov.in',
  'scholarships.gov.in — the National Scholarship Portal',
  'mhrd.gov.in/scholarships',
  'scholarship-india.in',
  'b',
  'The National Scholarship Portal at scholarships.gov.in is the official central government platform for all central and state scholarship schemes. Any other domain claiming to offer government scholarships should be treated with suspicion.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A sponsored Instagram ad can be run by:',
  'Only verified businesses and institutions',
  'Only accounts older than 6 months',
  'Anyone with a payment method — including scammers running fake institutional accounts',
  'Only accounts with more than 10,000 followers',
  'c',
  'Instagram ads can be purchased by anyone. A sponsored label does not indicate legitimacy. Scammers specifically use ads to reach students in a college''s geographic area with targeted scholarship posts.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Your Aadhaar number was collected by a fake scholarship form. Which action at uidai.gov.in specifically prevents someone from using it to register a new SIM card in your name?',
  'Updating your mobile number on UIDAI',
  'Downloading your Aadhaar e-copy',
  'Locking your Aadhaar biometrics — this blocks biometric authentication required for new SIM and bank registrations',
  'Filing a name correction request',
  'c',
  'Locking biometrics at myaadhaar.uidai.gov.in blocks all biometric authentication. Telecom operators require biometric verification to issue a new SIM — locking this makes your Aadhaar unusable for SIM fraud even if someone has your number and photo.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-1'
ON CONFLICT DO NOTHING;

-- ── ii-s-2 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A scammer wants to impersonate your friend Meera on WhatsApp. What information do they need, and where do they most commonly get it?',
  'Meera''s WhatsApp account password — obtained through phishing',
  'Meera''s name and profile photo — scraped from her public Instagram or Facebook profile',
  'Meera''s contact list — obtained by hacking her phone',
  'Meera''s IMEI number — obtained from her mobile carrier',
  'b',
  'WhatsApp impersonation requires only a name and profile photo — both freely available from any public social media profile. The scammer creates a new SIM, sets up WhatsApp, and uses the scraped photo and name to pose as the real person.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-2'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'You receive a money request on WhatsApp from what appears to be your cousin''s number but with a slightly different profile photo. The message says "changed my phone, this is my new number." What is the most reliable verification method?',
  'Ask them to share a recent selfie',
  'Call the number that just messaged you',
  'Call the original saved number for your cousin',
  'Ask them their date of birth',
  'c',
  'The original saved number is the only reliable channel. Calling the new number confirms the scammer. A selfie can be sourced from public photos. Date of birth is often findable on social media. Only the original saved number connects you to the real person.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-2'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Why can''t you trust a familiar profile picture as proof of identity on WhatsApp?',
  'WhatsApp compresses profile photos making them unrecognisable',
  'Anyone can download a photo from a public profile and set it as their WhatsApp picture',
  'Profile pictures are automatically blurred for privacy',
  'WhatsApp randomises profile photos for new numbers',
  'b',
  'There is no authentication behind a WhatsApp profile picture. Anyone can screenshot a photo from Instagram or Facebook and use it as their profile image. A familiar face proves nothing about who owns the number.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-2'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Once you send money via UPI to a scammer, what is the realistic chance of recovering it?',
  'Very high — UPI has a 48-hour automatic reversal window',
  'Moderate — banks automatically freeze suspicious recipient accounts',
  'Very low — UPI transfers are instant and largely irreversible once the recipient withdraws the funds',
  'Guaranteed — NPCI insures all UPI transactions against fraud',
  'c',
  'UPI transfers are designed for speed and finality. Once sent to a scammer who quickly withdraws or moves the funds, recovery through the bank or cybercrime portal is possible but uncertain and often unsuccessful. Prevention is the only reliable protection.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-2'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Your friend''s phone number is visible in their public Instagram bio. Why is this specifically a security risk for impersonation scams?',
  'Instagram can sell the number to advertisers',
  'It allows scammers to associate the number with the person''s identity and photo for targeted WhatsApp impersonation of their contacts',
  'It enables SIM cloning by mobile carriers',
  'It makes their account easier to directly hack',
  'b',
  'A public phone number combined with a name and photo gives a scammer everything needed to send convincing WhatsApp impersonation messages to the person''s contacts. Removing phone numbers from public bios eliminates this data source entirely.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-2'
ON CONFLICT DO NOTHING;

-- ── ii-s-3 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'At myaadhaar.uidai.gov.in, the "Aadhaar Authentication History" feature shows:',
  'A list of people who have searched for your Aadhaar number',
  'Every time your Aadhaar was used for verification, including the date, time, and requesting agency',
  'Only your own login history on the UIDAI portal',
  'The last 3 bank transactions linked to your Aadhaar',
  'b',
  'The Authentication History log shows a complete record of every Aadhaar authentication — the exact timestamp and the name of the agency that requested it. Any entry you do not recognise is direct evidence of misuse.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A fraudulent SIM registered in your name is dangerous primarily because:',
  'You will be billed for calls you did not make',
  'It can receive OTPs for your bank accounts, enabling the attacker to access them',
  'Your phone will experience signal interference',
  'The telecom company will block your original SIM immediately',
  'b',
  'Most Indian banks use your registered mobile number to send OTPs for transactions and password resets. A fraudulent SIM registered in your name receives those OTPs, giving the attacker full access to any account linked to that mobile number.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'You receive an OTP you did not request, followed immediately by your phone losing network signal. What is most likely happening?',
  'A routine carrier maintenance update',
  'A SIM swap attack — someone is porting your number to a new SIM using your Aadhaar',
  'Your phone is being remotely accessed',
  'The OTP was sent to you by mistake',
  'b',
  'An unsolicited OTP followed by sudden loss of signal is the classic sign of a SIM swap in progress. Call your carrier immediately from another phone and call your bank to freeze transactions — time is critical.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'The portal sancharsaathi.gov.in is used to:',
  'File income tax returns online',
  'Report fraudulent SIM registrations and block mobile numbers linked to fraud',
  'Lock your Aadhaar biometrics',
  'Check your CIBIL credit score',
  'b',
  'sancharsaathi.gov.in is TRAI''s portal for telecom-related fraud — reporting fraudulent calls, blocking SIMs used in fraud, and checking how many SIMs are registered against your Aadhaar.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'After a fraudulent loan is taken in your name, filing a CIBIL dispute specifically does what?',
  'Immediately removes the fraudulent loan from your credit history',
  'Places a fraud alert on your credit report, warning all lenders that your identity may have been misused',
  'Cancels the loan and refunds amounts already disbursed',
  'Freezes all future credit applications under your PAN permanently',
  'b',
  'A CIBIL fraud alert notifies all CIBIL member lenders that your identity may be compromised. While it does not automatically remove the loan, it triggers an investigation and prevents new fraudulent credit from being easily approved.'
FROM quizzes q WHERE q.simulation_id = 'ii-s-3'
ON CONFLICT DO NOTHING;

-- ── ii-p-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A LinkedIn profile for "Rahul Mehta, Senior Manager at TCS" has 8 connections, no posts, and a URL of "rahul-mehta-tcs-snr-mgr". The real Rahul has 600+ connections and the URL "rahul-mehta-tcs". A colleague received a connection request from the first profile. This is most likely:',
  'Rahul created a second account for a different purpose',
  'A profile clone designed to impersonate Rahul and harvest data from his network',
  'LinkedIn created a duplicate during a system migration',
  'Rahul''s profile was moved to a new account',
  'b',
  'A near-identical profile with very few connections, no activity, and a slightly modified URL is the signature of a clone account created to impersonate someone and deceive their contacts.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Why does hiding your LinkedIn connections list specifically reduce the risk of being impersonated?',
  'It prevents the attacker from copying your profile photo',
  'It removes the attacker''s list of targets — they need to know your contacts to impersonate you to them effectively',
  'It makes your profile invisible in search results',
  'It prevents anyone from sending you connection requests',
  'b',
  'The value of a clone account is in deceiving the victim''s contacts. Without access to your connections list, the attacker does not know who to approach. Hiding this list is one of the most effective single privacy changes against profile cloning.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'LinkedIn''s reporting path for a profile impersonating you is:',
  'Settings → Privacy → Report misuse',
  'The profile → three-dot menu → Report → Pretending to be someone else → Me',
  'Help Centre → Submit a ticket → Identity theft',
  'Connections → Block and report → Impersonation',
  'b',
  'From the clone''s profile: tap the three-dot menu (···) → Report → Pretending to be someone else → Me. This routes your report to LinkedIn''s trust and safety team who handle impersonation cases, typically within 24–48 hours.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A cloned LinkedIn profile collected employee IDs, project names, and personal emails from 12 colleagues. What is the most immediate organisational risk from this data?',
  'The attacker can directly access the company''s HR system using employee IDs',
  'The data enables targeted spear-phishing emails that appear to come from known colleagues',
  'The colleagues'' LinkedIn accounts will be cloned next',
  'The company''s public LinkedIn page will be impersonated',
  'b',
  'Names, roles, project details, and emails are the exact ingredients of a spear-phishing attack. The attacker can send highly personalised emails that are far more convincing than generic phishing — and far more likely to succeed.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'LinkedIn does not automatically notify people who connected with a profile later removed for impersonation. Why does this matter practically?',
  'It does not matter — the clone is gone once removed',
  'Those people may have already shared sensitive information with the clone and need to be warned manually by you',
  'It means LinkedIn will restore the clone account',
  'It means your real account gets suspended too',
  'b',
  'The damage does not stop when LinkedIn removes the clone. Colleagues who accepted the request may have already shared their email, employee ID, or project details. They need to be told directly so they can be vigilant about follow-up phishing attempts using that data.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-1'
ON CONFLICT DO NOTHING;

-- ── ii-p-3 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'An attacker wants to clone your CEO''s voice. Which source provides sufficient audio for a modern AI voice cloning tool?',
  'A 10-second voicemail greeting',
  'A 30-second clip from a publicly available earnings call or conference talk',
  'At least 2 hours of studio-quality speech',
  'Voice cloning requires access to the person''s phone microphone',
  'b',
  'Modern AI voice cloning tools require as little as 30 seconds of clean audio. Earnings calls, conference presentations, and YouTube interviews are freely available and provide more than enough source material for a convincing clone.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Caller ID showing your manager''s exact number does NOT confirm the call is really from them because:',
  'Your manager''s number might have changed recently',
  'Caller ID can be spoofed using VoIP services to display any number the attacker chooses',
  'Mobile carriers sometimes route calls through incorrect caller IDs',
  'Caller ID is only reliable for landline numbers',
  'b',
  'Caller ID spoofing is easy with VoIP services. An attacker can make any call appear to come from any number. This means a recognisable voice AND a matching caller ID still provides zero authentication — both can be faked independently.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A company establishes a safe word policy for urgent out-of-band requests. A caller using the CEO''s cloned voice claims they forgot the safe word and asks the employee to proceed anyway. The correct response is:',
  'Proceed — forgetting a safe word occasionally is normal',
  'Decline and report the call to IT security immediately',
  'Ask a security question as an alternative',
  'Process a smaller amount as a compromise',
  'b',
  'The safe word policy has no exceptions. A real executive who forgot the word would follow the established escalation process — they would not pressure an employee to bypass security. Any request to override verification is itself a red flag.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Which of the following would a real-time AI voice clone struggle most with?',
  'Answering general questions about the company',
  'Expressing urgency and emotional pressure convincingly',
  'Answering a personal question only the real person would know — a shared memory or private detail',
  'Providing a plausible reason for the financial request',
  'c',
  'AI voice clones can generate any words in the target''s voice, but they cannot know private information. A question like "What did we discuss at dinner last Thursday?" cannot be answered by an AI using only audio data.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-3'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Why is "please don''t mention this to anyone yet" a specific indicator of social engineering rather than legitimate confidentiality?',
  'Legitimate confidentiality is never communicated verbally',
  'It isolates the target from colleagues who would question or block the fraudulent request',
  'Real urgent requests are always announced company-wide',
  'Confidential instructions are always sent in writing',
  'b',
  'Isolation is the core tactic. By preventing the employee from consulting a colleague or checking with finance, the attacker removes the informal checks that would catch the fraud. Legitimate urgent business tasks always survive a 60-second check with another person.'
FROM quizzes q WHERE q.simulation_id = 'ii-p-3'
ON CONFLICT DO NOTHING;

-- ── ii-authority-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'You receive an email from "incometax-helpdesk@gov-india.com" about a pending tax notice. Which part proves it is not from the Indian government?',
  '"incometax-helpdesk" — government departments use simpler names',
  '"gov-india.com" — all genuine Indian government emails use the exact domain .gov.in',
  'The hyphen between "gov" and "india"',
  '.com — government bodies should use .org',
  'b',
  'Every legitimate Indian central government email uses the .gov.in domain without exception. "gov-india.com" is a completely different domain anyone can register. Only the actual domain after @ matters — display names can say anything.'
FROM quizzes q WHERE q.simulation_id = 'ii-authority-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'TRAI''s actual role is:',
  'Calling subscribers to enforce compliance with telecom regulations',
  'Setting regulatory standards and policies for the telecom sector — it does not make enforcement calls to individual subscribers',
  'Disconnecting mobile numbers that receive spam complaints',
  'Verifying Aadhaar-linked SIM registrations',
  'b',
  'TRAI is a regulatory body that sets policies and standards. It does not proactively call individual subscribers. Any call claiming to be from a "TRAI officer" threatening disconnection is fraudulent — TRAI''s helpline 1800-110-420 is for consumer complaints.'
FROM quizzes q WHERE q.simulation_id = 'ii-authority-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A website URL ends in ".in" and has a padlock (HTTPS) icon. Does this make it an official Indian government website?',
  'Yes — .in is the official Indian national domain',
  'Yes — the HTTPS padlock confirms government ownership',
  'No — .in is a public domain anyone can register, and HTTPS only means the connection is encrypted, not that the site is legitimate',
  'Only if the site also displays a government logo',
  'c',
  '.in is a generic country-code domain open to anyone. Only .gov.in is restricted to government entities. HTTPS means the connection is encrypted — it says nothing about who operates the site. Scammers routinely use HTTPS on fake sites.'
FROM quizzes q WHERE q.simulation_id = 'ii-authority-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'The Income Tax Department of India delivers official demand notices through:',
  'WhatsApp Business messages from official government numbers',
  'Registered post and through the official e-filing portal at incometax.gov.in',
  'Phone calls from 1800-103-0025 with payment demands',
  'SMS with a payment link and a 24-hour deadline',
  'b',
  'Income Tax notices are sent by registered post and can be verified and responded to through incometax.gov.in. The IT Department never demands immediate payment over phone or through SMS links.'
FROM quizzes q WHERE q.simulation_id = 'ii-authority-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'A fake government portal has a countdown timer saying your Aadhaar will be deactivated in 38 minutes. A genuine UIDAI deactivation process would involve:',
  'A similar time window since it is an automated process',
  'Written notices, a formal process with appeal rights, and timelines measured in weeks — not minutes',
  'Silent deactivation with no notification',
  'An SMS with a payment link to reverse it',
  'b',
  'Government processes affecting citizen rights involve formal notices, stated reasons, and appeal mechanisms under law. They are not executed through website countdown timers. Any timer threatening immediate government action is a fabricated pressure tactic.'
FROM quizzes q WHERE q.simulation_id = 'ii-authority-1'
ON CONFLICT DO NOTHING;

-- ── ii-relative-emergency-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A scammer contacts an elderly person claiming to be their grandson using a new WhatsApp number. The scammer knows his name, city, and that he studies engineering. Where did they most likely get this information?',
  'By hacking the grandson''s phone',
  'From public social media profiles or family WhatsApp group posts',
  'From the telecom company''s subscriber database',
  'By guessing based on common names',
  'b',
  'Names, cities, and educational details are routinely visible on public Instagram, Facebook, or LinkedIn profiles. Family WhatsApp groups where relatives congratulate students are also a source. Scammers research targets before calling.'
FROM quizzes q WHERE q.simulation_id = 'ii-relative-emergency-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A UPI transfer of ₹20,000 is sent to a scammer. The victim calls the cybercrime helpline 1930 immediately. What is the realistic outcome?',
  'The money is automatically reversed within 24 hours',
  'Recovery is possible if the account is frozen before withdrawal, but not guaranteed — scammers move funds within minutes',
  'NPCI guarantees full recovery of all fraudulent UPI transfers',
  'The bank is legally required to reimburse the full amount',
  'b',
  'Cybercrime helpline 1930 can sometimes freeze the recipient account if called very quickly. However, scammers typically withdraw or transfer funds within minutes. Recovery is uncertain and often partial — prevention through verification is the only reliable defence.'
FROM quizzes q WHERE q.simulation_id = 'ii-relative-emergency-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Which type of personal question is MOST effective for verifying a family member''s identity over a new WhatsApp number?',
  '"What is your date of birth?" — this may be publicly available on social media',
  '"What did we have for dinner at your last visit?" — a private shared memory the scammer cannot research',
  '"What is your employee ID?" — a factual identifier',
  '"What is your mother''s maiden name?" — a common security question',
  'b',
  'Highly specific private shared memories are impossible for a scammer to research. Date of birth, mother''s maiden name, and similar details can often be found on social media or through social engineering.'
FROM quizzes q WHERE q.simulation_id = 'ii-relative-emergency-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'The scammer insists "don''t tell Appa, he will overreact — please just send the money quietly." Why is enforced secrecy from other family members a critical red flag?',
  'It shows the person is embarrassed about their situation',
  'It prevents another family member from calling the real person and immediately exposing the fraud',
  'It indicates the situation involves legal proceedings that must be kept confidential',
  'It is a sign the person recently changed their phone',
  'b',
  'A second family member would almost certainly call the real person''s number and discover they are safe. The "keep it secret" instruction exists solely to prevent this. In a genuine family emergency, transparency helps — not harms.'
FROM quizzes q WHERE q.simulation_id = 'ii-relative-emergency-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'A family establishes a pre-agreed "family safe word" for emergency money requests. How does this defend against this scam?',
  'It allows the family to verify the transfer was legitimate after sending',
  'A scammer using a scraped profile has no way of knowing the private safe word, so they cannot pass the verification',
  'It encrypts the UPI transaction so scammers cannot intercept it',
  'It alerts the bank to flag the transfer for review',
  'b',
  'A pre-agreed private safe word exists only within the real family. No public profile or social engineering gives the attacker access to it. Inability to provide the word instantly reveals the caller as an impostor.'
FROM quizzes q WHERE q.simulation_id = 'ii-relative-emergency-1'
ON CONFLICT DO NOTHING;

-- ── ii-fake-medical-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'You receive an SMS: "Fortis Hospital: Payment of ₹9,400 pending. Pay now: fortis-billing.in/pay". The real Fortis website is fortishealthcare.com. What does the domain tell you?',
  'fortis-billing.in is probably a regional billing subdomain',
  'It is a fraudulent domain — real Fortis billing only occurs on fortishealthcare.com or their official app',
  'The .in extension confirms it is a legitimate Indian business',
  'It is legitimate because it contains the word "fortis"',
  'b',
  'Any billing portal not on the hospital''s exact official domain is fake. Including the hospital''s name in a .in domain does not make it official — anyone can register any .in domain within minutes.'
FROM quizzes q WHERE q.simulation_id = 'ii-fake-medical-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Scammers who send fake insurance renewal SMS around March and April are exploiting what specific timing?',
  'Hospital admissions peak in summer',
  'The Indian financial year ends March 31, when many insurance policies are due for renewal',
  'Insurance companies raise premiums in Q1',
  'Tax returns are filed during this period',
  'b',
  'Many insurance policies renew around the financial year end (March 31). Scammers send bulk renewal SMS during this period knowing a significant fraction of recipients will genuinely have upcoming renewals — making the timing feel like confirmation of legitimacy.'
FROM quizzes q WHERE q.simulation_id = 'ii-fake-medical-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A legitimate Indian hospital collects bill payments through which channels?',
  'UPI IDs sent via SMS or email for convenience',
  'At the billing counter, through their verified official app, or official payment gateway on their own domain',
  'Google Pay links sent by the billing department',
  'WhatsApp Pay to the billing officer''s personal number',
  'b',
  'Hospitals collect payments through physical billing counters, their own verified apps, or official payment gateways on their registered domain. No hospital sends a UPI ID via SMS and asks for payment within hours under threat of procedure cancellation.'
FROM quizzes q WHERE q.simulation_id = 'ii-fake-medical-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A patient pays ₹8,500 via a fake hospital billing SMS before realising. What are the two most time-critical actions?',
  'Delete the SMS and change their phone number',
  'Call 1930 (cybercrime helpline) and inform their bank to attempt to freeze the recipient account',
  'Visit the hospital in person to explain the situation',
  'Post about it on social media to warn others',
  'b',
  'Calling 1930 immediately and contacting the bank are the two time-critical actions. The cybercrime helpline can attempt to freeze the recipient account if called quickly. Speed is critical — scammers move funds fast.'
FROM quizzes q WHERE q.simulation_id = 'ii-fake-medical-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'The IRDAI (Insurance Regulatory and Development Authority of India) consumer helpline number is:',
  '1800-110-420',
  '155255',
  '1930',
  '14447',
  'b',
  'IRDAI''s consumer helpline is 155255. It handles insurance-related complaints including fake renewal scams. Knowing this number means you can verify any insurance communication directly with the regulator.'
FROM quizzes q WHERE q.simulation_id = 'ii-fake-medical-1'
ON CONFLICT DO NOTHING;

-- ── ii-urgency-pressure-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A coordinated attack sends you an email, SMS, and phone call simultaneously — all about the same banking emergency. Why does this multi-channel approach make the scam more convincing?',
  'Banks actually use all three channels simultaneously for fraud alerts',
  'Multiple independent-seeming sources create the illusion of corroborating evidence, reducing the chance any single channel gets questioned',
  'It ensures at least one message reaches you if spam filters block others',
  'It is required by RBI regulations for high-value fraud alerts',
  'b',
  'When the same threat arrives from multiple apparent sources, the brain interprets them as independent confirmations rather than one coordinated attack. The attacker controls all three channels — they are not independent. This is the core deception.'
FROM quizzes q WHERE q.simulation_id = 'ii-urgency-pressure-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'HDFC Bank''s official 24x7 customer care number, printed on the back of every HDFC card, is:',
  '1800-266-4332',
  '1800-202-6161',
  '1800-103-0025',
  '1800-110-420',
  'b',
  '1800-202-6161 is HDFC Bank''s official 24x7 toll-free number. Using the number on your physical card bypasses any spoofed domain, fake website, or impersonation call and connects you directly to the real bank.'
FROM quizzes q WHERE q.simulation_id = 'ii-urgency-pressure-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A phishing page loads in your browser. You close it immediately without entering any information. Are you definitely safe?',
  'Yes — no data was entered so nothing was shared',
  'Probably, but not certainly — some phishing pages execute scripts that capture browser session tokens without any input',
  'Yes — phishing pages only capture data through forms',
  'No — simply loading any page automatically installs malware',
  'b',
  'Most phishing pages are harmless if you don''t enter data. However, sophisticated pages can steal session cookies without any user input. Reporting the click to IT security ensures sessions can be checked and revoked if needed.'
FROM quizzes q WHERE q.simulation_id = 'ii-urgency-pressure-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'After entering banking credentials on a phishing site, why is "change your password on the bank''s website" potentially risky as a first action?',
  'The bank''s website may also be compromised',
  'Logging in uses the compromised credentials, and if the attacker is monitoring in real time, the new password may be captured too',
  'Banks lock accounts after too many password changes',
  'Password changes take 24 hours to activate',
  'b',
  'If an attacker is actively monitoring a compromised session, a password change through that session can be intercepted. Calling the bank to block the account is safer because it requires no login with the already-compromised credentials.'
FROM quizzes q WHERE q.simulation_id = 'ii-urgency-pressure-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Under RBI guidelines, if you report an unauthorised digital transaction within 3 working days and it was due to a third-party breach (not your negligence), you are entitled to:',
  'Full liability — you are responsible regardless of timing',
  'Zero liability — the bank must credit the full amount within 10 working days',
  'A maximum reimbursement of ₹10,000',
  'A 50% refund at the bank''s discretion',
  'b',
  'Under RBI''s 2017 circular on customer protection for unauthorised electronic transactions, if you report within 3 working days and the breach was not due to your negligence, you have zero liability and the bank must credit the full amount within 10 working days.'
FROM quizzes q WHERE q.simulation_id = 'ii-urgency-pressure-1'
ON CONFLICT DO NOTHING;

-- ── oc-e-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A website sells medicines at 60% below chemist prices and advertises "no prescription required." Which of these is the most important immediate red flag?',
  'The price discount alone — any discount over 20% is suspicious',
  '"No prescription required" for regulated medicines — this is illegal in India and signals an unregulated supply chain',
  'That it appeared in search results — only scam sites advertise online',
  'That it offers home delivery — legitimate pharmacies are walk-in only',
  'b',
  '"No prescription required" for prescription-only drugs is a legal violation in India under the Drugs and Cosmetics Act. It also means the site has no regulated supply chain — you have no way to verify what you are actually receiving.'
FROM quizzes q WHERE q.simulation_id = 'oc-e-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'The Indian government body whose website you should check to verify an online pharmacy''s registration is:',
  'SEBI (Securities and Exchange Board of India)',
  'TRAI (Telecom Regulatory Authority of India)',
  'CDSCO (Central Drugs Standard Control Organisation) at cdsco.gov.in',
  'RBI (Reserve Bank of India)',
  'c',
  'CDSCO at cdsco.gov.in, along with State Drugs Licensing Authority portals, maintains the register of approved online pharmacies. Checking this registry is the primary verification step before ordering medicines online.'
FROM quizzes q WHERE q.simulation_id = 'oc-e-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A fake pharmacy collects your Aadhaar number and medical history "for regulatory compliance." What is the most likely use of this data?',
  'To comply with actual drug licensing requirements',
  'To personalise medicine recommendations',
  'Targeted fraud — selling to data brokers who enable health insurance scams, identity theft, and loan fraud using your Aadhaar',
  'To register you on a customer loyalty programme',
  'c',
  'No pharmacy needs your Aadhaar number or medical history to ship medicines. This data is collected specifically to be sold to fraud operators who use medical history for insurance scams and Aadhaar numbers for SIM registration and identity theft.'
FROM quizzes q WHERE q.simulation_id = 'oc-e-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A friend received an unlabelled tablet in a plain packet from an online pharmacy — no expiry date, no batch number. Beyond the delivery fraud, what is the health risk?',
  'Minimal risk — unbranded medicines are often the same formula at lower cost',
  'The tablet may be counterfeit — wrong dosage, contaminated ingredient, or an entirely different compound — with no way to verify',
  'The main risk is that the medicine may expire soon',
  'No risk if the tablet looks the same colour and shape as the expected medicine',
  'b',
  'Counterfeit medicines are a documented public health risk. Without a batch number, manufacturer, and expiry date, there is no way to verify the dosage, purity, or even the identity of the compound. This is why regulated pharmacies with licensed pharmacists are essential.'
FROM quizzes q WHERE q.simulation_id = 'oc-e-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'If you shared your Aadhaar number with a fake pharmacy website, which action specifically prevents someone from using it to register a new SIM card in your name?',
  'Updating your address on UIDAI',
  'Downloading your e-Aadhaar from UIDAI',
  'Locking your Aadhaar biometrics at myaadhaar.uidai.gov.in — required for new SIM verification',
  'Filing a complaint with the pharmacy',
  'c',
  'Telecom operators must verify biometrics to issue a new SIM card. Locking your Aadhaar biometrics at myaadhaar.uidai.gov.in blocks this verification, making your Aadhaar unusable for SIM fraud even if someone has your number and photo.'
FROM quizzes q WHERE q.simulation_id = 'oc-e-1'
ON CONFLICT DO NOTHING;

-- ── oc-ecommerce-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A sponsored ad shows "Nike shoes at 90% off" with a link to "nikeindiaoutlet-deals.in". Without clicking the link, what is the definitive way to confirm this is a scam?',
  'The discount is too high — Nike never discounts more than 50%',
  'The domain is not Nike''s official domain (nike.com) — no legitimate Nike sale would use a different domain',
  'The ad was shown on Instagram — Nike only advertises on TV',
  'The price ₹399 is too low to be real',
  'b',
  'The domain is the only reliable trust signal. Nike''s official India presence is on nike.com/in. Any sale using a different domain — regardless of branding — is impersonation. The discount level alone is insufficient evidence; some legitimate clearance sales are deep.'
FROM quizzes q WHERE q.simulation_id = 'oc-ecommerce-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A fake store shows "only 2 pairs left in stock" and a countdown timer saying "sale ends in 00:47:23". What is the correct understanding of these elements?',
  'Genuine scarcity — popular items sell out quickly online',
  'Standard e-commerce practice — all stores use timers to indicate flash sales',
  'Manufactured pressure tactics — the timer resets for every new visitor and the stock counter is a hardcoded number, both designed to prevent verification',
  'Evidence the site is real — scam sites would not bother with these details',
  'c',
  'Countdown timers and stock alerts on fake sites are purely cosmetic — scripted to create urgency. The timer resets on each page load. The goal is to make you act before the 30 seconds it would take to verify the domain.'
FROM quizzes q WHERE q.simulation_id = 'oc-ecommerce-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'The comment section under a sponsored Instagram ad shows 47 positive reviews. A comment reads: "Just received! 100% legit, came in 2 days." Is this reliable evidence the store is genuine?',
  'Yes — 47 comments are too many to be fake',
  'Yes — people would not post positively if they had a bad experience',
  'No — comment sections are easily seeded with purchased bot accounts; social proof is cheap and unreliable',
  'Yes — Instagram removes fake comments automatically',
  'c',
  'Bot-generated comments are available in bulk online for very low cost. Instagram''s moderation does not reliably remove all fake comments before scam ads run. The comment section on a sponsored ad is the least reliable trust signal.'
FROM quizzes q WHERE q.simulation_id = 'oc-ecommerce-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'What does the HTTPS padlock (🔒) in the browser address bar actually guarantee about a website?',
  'The website is legitimate and verified by the government',
  'The connection is encrypted — your data travels securely to the server, but says nothing about who owns that server',
  'The website has been reviewed and approved by a cybersecurity company',
  'All transactions on the site are insured against fraud',
  'b',
  'SSL/TLS (the padlock) only means data is encrypted in transit. Scam sites get free SSL certificates in minutes from services like Let''s Encrypt. A padlock on "nikeindiaoutlet-deals.in" means your card details travel encrypted to the scammer''s server — not that the site is trustworthy.'
FROM quizzes q WHERE q.simulation_id = 'oc-ecommerce-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'You paid on a fake e-commerce site an hour ago and the product has not arrived. What is the most important first action?',
  'Wait 7 days for standard delivery time before taking action',
  'Leave a negative review on the site',
  'Call your bank immediately to report unauthorised transaction and dispute the charge — speed is critical',
  'Email the site''s customer support first',
  'c',
  'Your card details are now compromised. The first action is calling your bank to block the card and dispute the charge. Most banks can reverse charges if reported within 24–48 hours. Do not wait for "standard delivery time" — the product will never arrive.'
FROM quizzes q WHERE q.simulation_id = 'oc-ecommerce-1'
ON CONFLICT DO NOTHING;

-- ── oc-courier-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'You receive an SMS from "DTDC Courier" asking you to pay ₹99 at "dtdc-redelivery.co.in" to reschedule a delivery. What is the first thing you should check?',
  'Whether you were recently expecting a delivery',
  'The domain — "dtdc-redelivery.co.in" is not DTDC''s official website (dtdc.com); any difference is a fake',
  'Whether the ₹99 is a reasonable amount',
  'The time the SMS was sent',
  'b',
  'The domain is the single most important check. DTDC''s official website is dtdc.com. "dtdc-redelivery.co.in" is a completely different domain — a spoofed site designed to look like DTDC. The fact that you may be expecting a delivery is what scammers count on.'
FROM quizzes q WHERE q.simulation_id = 'oc-courier-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A ₹99 payment on a fake courier site goes through successfully. Why is a small successful payment actually more dangerous than one that fails?',
  'The ₹99 creates a legal obligation to pay any subsequent charges',
  'It proves your card is live and active — scammers use this "card testing" technique before making larger withdrawals',
  'No reason — a small successful payment is better than the package not arriving',
  'It means your card is definitely stored on the site for future charges',
  'b',
  '"Card testing" is a documented fraud technique. Scammers charge a small amount to verify the card works before making larger unauthorised withdrawals. A successful ₹99 payment signals to the scammer that your card is active — larger charges follow.'
FROM quizzes q WHERE q.simulation_id = 'oc-courier-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'How do you verify a tracking number from a suspicious courier SMS without clicking the link?',
  'Call the number that sent the SMS',
  'Reply to the SMS asking for confirmation',
  'Go directly to the courier''s official app or website (dtdc.com, bluedart.com, etc.) and enter the tracking number there',
  'Wait for a second SMS confirmation before clicking',
  'c',
  'The only safe way to verify a tracking number is through the courier''s official app or website accessed directly — not through any link. If the tracking number doesn''t exist in the official system, the SMS is fraudulent.'
FROM quizzes q WHERE q.simulation_id = 'oc-courier-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Which of the following describes a legitimate practice by courier companies regarding redelivery fees?',
  'Sending a payment link via SMS to the recipient''s phone',
  'Asking the recipient to pay via WhatsApp',
  'Collecting any applicable fees at the door or through their official app — never through unsolicited SMS payment links',
  'Calling from a mobile number and asking for UPI payment',
  'c',
  'Legitimate courier companies collect fees at the time of delivery or through their verified official apps. No reputable courier sends unsolicited SMS payment links. This practice is exclusively used by scammers.'
FROM quizzes q WHERE q.simulation_id = 'oc-courier-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'You accidentally entered your credit card details on a fake courier site. What should you do within the next 30 minutes?',
  'Monitor your account for a week before taking action',
  'Change your card PIN',
  'Block the card by calling your bank immediately and report the transaction as fraud — then file a complaint at cybercrime.gov.in',
  'Delete the SMS and the site from your browser history',
  'c',
  'Your card details are compromised. Blocking the card within minutes stops any subsequent fraudulent charges. Changing the PIN does not protect against card-not-present fraud (online transactions). The clock starts the moment you entered the data.'
FROM quizzes q WHERE q.simulation_id = 'oc-courier-1'
ON CONFLICT DO NOTHING;

-- ── oc-techsupport-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A browser popup appears while you are reading a news article. It shows a Windows Security logo, lists three virus names, and says to call "1800-XXX-4821 immediately." What is true about this popup?',
  'It is a legitimate Windows Defender alert — Microsoft embeds these in websites it monitors',
  'It is JavaScript running inside the webpage — your computer is not infected and Microsoft has no way to detect viruses through a browser tab',
  'It may be real if your antivirus is not updated',
  'It is real if the popup makes a sound — scam popups are always silent',
  'b',
  'Browser virus popups are always fake. Microsoft, Windows Defender, and antivirus software operate at the operating system level — they cannot trigger alerts through a webpage in your browser. The popup is JavaScript designed to look like a system alert.'
FROM quizzes q WHERE q.simulation_id = 'oc-techsupport-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A tech support caller asks you to install AnyDesk and share the 9-digit access code so they can "fix your computer remotely." What should you do?',
  'Install it — AnyDesk is a legitimate company so the support is genuine',
  'Install it but watch carefully to make sure they only access system settings',
  'Hang up immediately — this request, regardless of who is calling, signals a tech support scam',
  'Install it only if the caller knows your name and email address',
  'c',
  'AnyDesk and TeamViewer are legitimate tools — but giving anyone who cold-called you remote access is always a scam. Knowing your name does not make a call legitimate. Hang up and, if concerned, contact Microsoft or your antivirus company directly using numbers from their official website.'
FROM quizzes q WHERE q.simulation_id = 'oc-techsupport-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A scammer has remote access to your computer for approximately 12 minutes before you disconnect. Why is a standard antivirus scan NOT sufficient protection after this?',
  'Antivirus software cannot scan in the 24 hours after a remote session',
  'Scammers use the remote access tool itself — which is legitimate software — and manually operate your browser to perform bank transfers, bypassing antivirus detection entirely',
  'Antivirus software is expensive and most people do not have it',
  'A scan is sufficient — it will detect any malware installed',
  'b',
  'Tech support scammers do not install traditional malware — they manually use your browser to access your bank account and initiate transfers. The banking transfer happens through the bank''s own legitimate website. No antivirus monitors this. Bank security and password changes are the critical responses.'
FROM quizzes q WHERE q.simulation_id = 'oc-techsupport-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'If your browser appears frozen or "locked" by a scam popup and you cannot close it normally, the correct method to force-close it is:',
  'Call the number shown in the popup to resolve it',
  'Restart your computer by holding the power button — this will install the popup permanently',
  'Press Ctrl+Shift+Esc (Windows) to open Task Manager and end the browser process — or Ctrl+W to close the tab',
  'Disconnect from the internet — the popup will resolve when offline',
  'c',
  'Ctrl+Shift+Esc opens Task Manager on Windows, where you can force-end the browser process. Ctrl+W closes the current tab. Restarting via power button also works but is slower. The popup has no persistence — it only exists as a webpage and disappears when the browser closes.'
FROM quizzes q WHERE q.simulation_id = 'oc-techsupport-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Your neighbour gave a scammer remote access for 10 minutes before hanging up. They ran an antivirus scan and it found nothing. Which action is now the most urgent?',
  'The clean scan confirms there is no problem — no further action is needed',
  'Run another antivirus scan with a different software tool',
  'Call the bank immediately to place a hold on accounts — then change all passwords from a different device and file at cybercrime.gov.in',
  'Reset the Windows password',
  'c',
  'A clean antivirus scan is irrelevant after tech support scam remote access — the attack happens through legitimate tools and browser sessions, not malware. The priority is banking (call within minutes) and password changes from a separate device. Speed prevents or reverses financial loss.'
FROM quizzes q WHERE q.simulation_id = 'oc-techsupport-1'
ON CONFLICT DO NOTHING;

-- ── oc-gaming-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A Discord account named "ValorantOfficial_Rewards" was created 4 days ago and has DMed you about a free skin giveaway. What does the account age tell you?',
  'Nothing — new accounts can be legitimate',
  'The account is likely genuine — Riot creates new accounts for giveaway campaigns',
  'A strong signal of fraud — brand impersonation accounts are almost always newly created with no post history',
  'The account may be genuine if it has a profile picture',
  'c',
  'Legitimate brand accounts have months or years of history. A brand-named account created 4 days ago with no mutual servers and no post history is a clear impersonation indicator. Account age alone is sufficient reason to stop engaging.'
FROM quizzes q WHERE q.simulation_id = 'oc-gaming-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'The giveaway link leads to a page that looks identical to the Riot Games login. The URL shows "valorant-free-skins.net". Why does the page design being identical not make it trustworthy?',
  'It does make it trustworthy — scammers cannot replicate official site designs',
  'A webpage''s visual design can be copied in minutes — the domain is the only reliable identifier, and "valorant-free-skins.net" is not "playvalorant.com"',
  'Login pages all look similar — the design alone cannot distinguish them',
  'The page is safe because it loads over HTTPS',
  'b',
  'Copying a website''s appearance takes minutes using browser developer tools. Scammers routinely create pixel-perfect replicas of legitimate login pages. The domain is the only element they cannot fake — always verify the URL before entering credentials.'
FROM quizzes q WHERE q.simulation_id = 'oc-gaming-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A phishing login page accepts your test entry of "testuser / wrongpassword" and shows "Verification complete!" What does this confirm?',
  'Your real credentials happen to match — your account has been found',
  'The site is real but its verification is broken',
  'The site accepts any input — it is a data-harvesting form, not real authentication',
  'The site is safe since it did not detect your fake credentials',
  'c',
  'A login page that accepts any credentials is a phishing form — it is not authenticating you against any real database. It is simply recording whatever you type and displaying a success message. Any input "works" because the goal is data collection, not authentication.'
FROM quizzes q WHERE q.simulation_id = 'oc-gaming-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Which security setting provides the strongest protection against losing a gaming account even if your password is phished?',
  'Using a long and complex password',
  'Two-Factor Authentication (2FA) — a scammer with your password still cannot log in without the code sent to your phone',
  'Logging out of the account after each session',
  'Using a different password for each game',
  'b',
  '2FA adds a second verification step that the scammer cannot bypass even if they have your exact username and password. This is the single most effective account protection for gaming accounts. Enable it in account security settings immediately.'
FROM quizzes q WHERE q.simulation_id = 'oc-gaming-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Your gaming account was compromised through a phishing login. The scammer changed the password. What is your first step to recover the account?',
  'Create a new account and start over',
  'Contact the scammer via Discord to negotiate return of the account',
  'Use the game''s official "Account Recovery" or "Account Hacked" process at their official website, providing original registration details as proof of ownership',
  'File a police report and wait for them to recover it',
  'c',
  'Game companies have account recovery processes specifically for compromised accounts. For Riot: support.riotgames.com. Provide original registration email, payment history, and account creation details. This is the only reliable path — contacting the scammer achieves nothing.'
FROM quizzes q WHERE q.simulation_id = 'oc-gaming-1'
ON CONFLICT DO NOTHING;

-- ── mal-virus-student ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'What does the Windows "AutoRun" or "AutoPlay" prompt actually do when a USB drive is plugged in?',
  'It scans the drive for viruses automatically',
  'It offers to automatically run or open content from the drive — which malware exploits to execute itself without user action',
  'It backs up the drive''s contents to your computer',
  'It displays the drive manufacturer''s safety certificate',
  'b',
  'AutoRun/AutoPlay is a convenience feature that can automatically launch programs or open files from an inserted drive. Malware exploits this by placing an executable that runs when the drive is plugged in. Cancelling the prompt and scanning manually prevents this.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A friend''s USB drive contains a file called "Notes_Sem4.exe" alongside the actual PDFs. What does the .exe extension tell you?',
  'It is a self-extracting archive — common for large note collections',
  'It is an executable program — notes are never .exe files; this is malware',
  'It is a Windows-specific PDF viewer',
  'It is a compressed folder that automatically opens',
  'b',
  'Study notes are documents — PDFs, Word files, PowerPoints. They are never .exe files. An .exe file is a program that runs code when opened. Any .exe file on a USB drive labelled as notes or documents is almost certainly malware.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Ransomware encrypts your files and demands payment for a decryption key. Why does disconnecting from the internet matter even after encryption has already started on your device?',
  'Disconnecting prevents the ransomware from downloading its own removal tool',
  'Ransomware sends the encryption key to the attacker''s server and can spread to connected network drives — disconnecting cuts both, limiting total damage',
  'The ransomware stops running when internet access is removed',
  'Disconnecting triggers Windows Defender to automatically decrypt the files',
  'b',
  'Network disconnection serves two critical purposes: it cuts the ransomware''s communication with its command-and-control server (which receives the encryption key), and it prevents the malware from spreading to shared network drives and other machines on the same network.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Why is running an antivirus scan in "Safe Mode" more effective against active malware than scanning in normal mode?',
  'Safe Mode gives antivirus administrator privileges',
  'In Safe Mode, only essential Windows processes run — most malware cannot load at startup, so the antivirus can detect and remove it without the malware actively defending itself',
  'Safe Mode runs the antivirus at a higher processor priority',
  'Safe Mode connects to a more comprehensive cloud malware database',
  'b',
  'Malware often includes self-defence mechanisms that disable antivirus in normal mode. Safe Mode strips Windows down to essential processes, preventing malware from loading at startup — giving antivirus a clear shot at detection and removal.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Your files have .locked extensions and you cannot open them. A ransom note says to pay ₹50,000 in Bitcoin for the decryption key. You should check which resource before doing anything else?',
  'The attacker''s website to verify the payment is genuine',
  'nomoreransom.org — a free resource with decryption tools for hundreds of ransomware families',
  'A Bitcoin exchange to purchase cryptocurrency',
  'Your antivirus company''s paid recovery service',
  'b',
  'No More Ransom (nomoreransom.org) is a joint initiative by law enforcement and cybersecurity companies offering free decryption tools for known ransomware variants. Check there before considering payment — many families have free decryption available.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student'
ON CONFLICT DO NOTHING;

-- ── mal-virus-student-email ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A Word document opens and displays a yellow bar saying "ENABLE CONTENT — This document is protected. You must enable content to view it." What is actually happening?',
  'The document is DRM-protected and needs your Microsoft account to unlock',
  'The document is trying to get you to enable macros — small programs embedded in the file that will execute the attacker''s code if activated',
  'The document requires a newer version of Microsoft Office',
  'The document is encrypted and your computer needs to decrypt it',
  'b',
  '"Enable Content" is Microsoft Office''s prompt to run macros. Legitimate documents — notes, timetables, forms — never need macros to display their content. This prompt is the standard delivery mechanism for macro-based malware.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student-email'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'An email says it''s from "Prof. Sharma (examcell@ktu-exam.in)" about postponed exams. The real KTU domain is ktu.edu.in. What should tip you off?',
  'The message is about postponed exams — colleges don''t email about this',
  'The sending domain is ktu-exam.in — the real KTU uses ktu.edu.in — this is a spoofed domain',
  'Professor names are never included in official emails',
  'The email uses a hyphen in the address',
  'b',
  'The display name can say anything — "Prof. Sharma" is just text. The actual sending domain "ktu-exam.in" is completely different from the real "ktu.edu.in." Anyone can register ktu-exam.in. Only the domain after @ is reliable.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student-email'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'After opening a malicious document, your laptop begins sending emails to your contacts from your account without your action. What type of malware behaviour is this?',
  'Ransomware — it''s encrypting your email contacts',
  'A worm or email-spreading malware using your credentials to propagate itself to new victims',
  'Adware displaying email-based advertisements',
  'Spyware logging your emails for later review',
  'b',
  'Using a compromised account to send infected emails to the victim''s contacts is a self-propagation technique — each new recipient trusts the email because it comes from a known sender. Disconnecting from the network immediately stops the spread.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student-email'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'After a malware infection on your laptop, you need to change your email password. Why should you do this from a different device?',
  'The infected laptop may not have internet access after disconnecting',
  'If a keylogger is active, the new password typed on the infected laptop will be captured immediately, making the change useless',
  'Google and Microsoft block password changes from infected devices',
  'The malware will intercept the password reset email',
  'b',
  'A keylogger records every keystroke. If one is active on your laptop, typing a new password there gives the attacker your new password immediately. Always change passwords from a verified clean device — a phone that was not connected to the infected network, or another computer.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student-email'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'A classmate asks you to forward a suspicious attachment to them "to see if they can open it." Why is this a bad idea even if you haven''t opened it yourself?',
  'Forwarding the email is illegal',
  'You would be delivering the malware directly to another victim — the file is dangerous regardless of who opens it',
  'The attachment may grow in size during forwarding',
  'Forwarding activates the macro automatically',
  'b',
  'The malicious file is dangerous to anyone who opens it, not just to you. Forwarding it spreads the threat to another potential victim. The correct action is to report the email to IT or your college''s helpdesk and delete it.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-student-email'
ON CONFLICT DO NOTHING;

-- ── mal-virus-pro ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'A vendor you work with has a domain "ravi-supplies.com". You receive an invoice attachment from "accounts@ravi-supplyes.com". What is the most likely explanation?',
  'The vendor made a typo when creating their email address',
  'This is a Business Email Compromise (BEC) attack — an attacker registered a near-identical domain to impersonate the vendor',
  'The vendor switched email providers and this is their new domain',
  'This is an automatic email forwarding alias',
  'b',
  'Registering a near-identical domain ("ravi-supplyes.com" vs "ravi-supplies.com") is a classic Business Email Compromise technique. The attacker sends malicious invoices or requests from the lookalike domain. Always verify with a direct phone call before opening attachments from vendors.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Legitimate software updates from Microsoft are delivered through:',
  'Email links from IT Support with download instructions',
  'Windows Update (Settings → Windows Update) or a corporate patch management system like SCCM or Intune — never via email links',
  'Pop-up notifications in web browsers',
  'WhatsApp messages from the IT department',
  'b',
  'Microsoft delivers updates through the built-in Windows Update mechanism, not through email links. If your company has a patch management system, updates come through that. Any email asking you to download a "critical patch" via a link is a Trojan attack.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A colleague''s machine is actively spreading malware emails to your company''s client contacts. What is the most urgent action and why?',
  'Run antivirus immediately — removing the malware is the priority',
  'Disconnect the machine from the network immediately — this stops all outbound activity. Scanning can only happen safely after isolation.',
  'Change the colleague''s email password to stop outbound emails',
  'Restart the machine to interrupt the malware process',
  'b',
  'Network isolation is always the first step. An antivirus scan while connected to the network allows the malware to continue spreading and potentially download additional payloads during the scan. Isolation stops all network activity instantly; everything else comes after.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Why is a corporate macro malware infection particularly dangerous compared to one on a personal laptop?',
  'Corporate laptops have more files to encrypt',
  'Corporate machines are connected to shared network drives containing client data — malware can spread to all connected machines and access data company-wide',
  'Corporate antivirus is generally less effective',
  'Corporate emails have larger attachment size limits enabling bigger malware',
  'b',
  'Corporate network connectivity is what transforms a single infected laptop into a company-wide incident. Malware on a networked machine can reach shared drives, other workstations, and servers — accessing and encrypting or exfiltrating data across the entire organisation.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'CERT-In (Indian Computer Emergency Response Team) should be notified when:',
  'Any individual receives a suspicious email',
  'A corporate or critical infrastructure malware incident occurs, especially if client data may have been compromised',
  'A personal laptop gets adware',
  'An email goes to spam',
  'b',
  'CERT-In (cert-in.org.in) handles national-level cyber incidents — corporate breaches, critical infrastructure attacks, and large-scale malware campaigns. Reporting helps them track threat actors and issue national advisories to protect other organisations.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-pro'
ON CONFLICT DO NOTHING;

-- ── mal-virus-elderly ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'You receive a forwarded WhatsApp message from your daughter about a government health scheme with an APK file attachment. Your daughter frequently shares useful information. What should you do first?',
  'Install the APK — it came from your daughter so it must be safe',
  'Call your daughter directly to ask if she intentionally sent this',
  'Search online for the health scheme to verify it exists',
  'Forward it to other family members who might benefit',
  'b',
  'Malware spreads through trusted contacts without their knowledge. Your daughter''s account may have forwarded the message automatically, or she may not realise the APK is malicious. A direct call takes 30 seconds and prevents installation.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'What is an APK file, and why is installing one from WhatsApp risky?',
  'A photo file — risky because it can contain viruses embedded in images',
  'An Android app installer that bypasses the Play Store''s safety checks, which means the app has not been reviewed by Google for malware',
  'A government document format used for scheme registration',
  'A compressed folder for sharing multiple files',
  'b',
  'APK (Android Package) files install apps directly, bypassing the Play Store vetting process. Google''s Play Protect screens Play Store apps for malware — APKs from outside the store skip this entirely, making them a primary delivery method for Android malware.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A suspicious app on your phone requested "SMS" permission when installing. Why is this particularly dangerous?',
  'The app can send paid SMS messages from your number',
  'The app can read all incoming SMS messages including OTPs sent by your bank — giving it access to your accounts',
  'The app can delete your text message history',
  'The app can block texts from your contacts',
  'b',
  'Banks send OTPs via SMS for every transaction approval and password reset. An app with SMS permission reads these OTPs in real time, giving the attacker the ability to approve transactions and access accounts without needing your password.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Google Play Protect is found at:',
  'Settings → Security → Play Protect',
  'Play Store → Profile icon (top right) → Play Protect → Scan device',
  'Google app → Settings → Security',
  'Phone Dialer → *#*#426#*#*',
  'b',
  'Play Protect is accessed through the Play Store app: tap your profile picture in the top right → Play Protect → Scan. It checks all installed apps against Google''s malware database and can flag or remove harmful apps.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Why should you never call "Google Support" numbers that appear in pop-up messages or web pages on your phone?',
  'Google does not have a phone support service',
  'These are fake numbers — Google never displays support phone numbers in pop-ups. Calling connects you to scammers who will attempt to gain remote access to your device.',
  'Google support only operates in English',
  'The calls are automatically charged at premium rates',
  'b',
  'Legitimate tech companies including Google, Samsung, and Apple do not display phone numbers in pop-up warnings. Any pop-up or website showing a "support number" is a scam designed to connect you with fraudsters who will attempt remote access or extort fees.'
FROM quizzes q WHERE q.simulation_id = 'mal-virus-elderly'
ON CONFLICT DO NOTHING;

-- ── mal-trojan-student ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'What is a Trojan horse in the context of software, and how does it differ from a virus?',
  'A Trojan self-replicates across networks; a virus requires a host program',
  'A Trojan disguises itself as legitimate software to trick users into installing it; a virus spreads automatically by infecting existing files',
  'A Trojan encrypts files; a virus displays advertisements',
  'They are the same — "Trojan" is an older name for "virus"',
  'b',
  'A Trojan relies on deception — it looks like something you want (a game, a tool) but installs malicious code alongside or instead of the stated function. Unlike viruses, Trojans do not self-replicate — they depend entirely on the user choosing to install them.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Software installers for cracked games often use a technique called "bundling." What does this mean?',
  'The installer compresses multiple game files into one package',
  'The installer includes additional hidden software — often malware — that installs alongside the advertised program, sometimes with pre-checked consent boxes',
  'The game bundles with a music playlist',
  'Multiple users share the same licence',
  'b',
  'Bundling is a technique where installers include additional programs — keyloggers, adware, RATs — either hidden or in pre-checked boxes that most users click past. Reading every screen of every installer and unchecking additional programs is the only defence.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'You see a process called "keylog-driver.sys" running in your roommate''s Task Manager. What does "keylog" in the process name suggest?',
  'It is a keyboard driver update service',
  'It is likely a keylogger — software that records every keystroke typed, including passwords, OTPs, and credit card numbers',
  'It is a system performance monitoring tool',
  'It is a Windows log cleanup utility',
  'b',
  'A keylogger silently records every keystroke. Legitimate Windows and driver processes do not have "keylog" in their name. A process with this name is almost certainly malware that has been recording passwords and sensitive information typed on the machine.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'If a keylogger was active on your machine for a week, what is the correct scope of password changes needed?',
  'Only change the password you use most frequently',
  'Change every account password that was typed on that machine during the period — email, banking, social media, college portals — from a different clean device',
  'Change only your Windows login password',
  'Passwords changed in private/incognito mode are not captured by keyloggers',
  'b',
  'A keylogger captures every keystroke regardless of browser mode, app, or website. Every account whose password was typed on the infected machine must be considered compromised. All changes must be made from a verified clean device — otherwise the new passwords are captured immediately too.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'What is the safest source to download software to guarantee it has not been bundled with malware?',
  'Any site that appears in the top 3 Google search results',
  'The software developer''s official website, the Microsoft Store, or verified platform storefronts like Steam',
  'Torrent sites with high seeder counts indicating popular, verified files',
  'Sites labelled "mirror download" which are faster alternatives to official sites',
  'b',
  'Only the developer''s own website and verified storefronts guarantee the software has not been modified. Search results, torrent sites, and third-party "mirror" sites are not safe. High seeder count means many people downloaded it — not that it is safe.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-student'
ON CONFLICT DO NOTHING;

-- ── mal-trojan-pro ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'What is a Remote Access Trojan (RAT) and what can an attacker do with one installed on a machine?',
  'A RAT encrypts files for ransom',
  'A RAT gives the attacker full remote control of the machine — browsing files, activating the webcam, logging keystrokes, and moving through the network — all invisibly',
  'A RAT displays advertisements',
  'A RAT monitors internet bandwidth usage',
  'b',
  'A RAT is one of the most dangerous forms of malware because it gives a human attacker full, real-time, interactive control of the victim''s machine. Unlike automated malware, a RAT operator actively explores the system, reads documents, and plans next steps.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Your IT department has never delivered an update via email link before. Today you receive one claiming a "critical patch" must be applied immediately. The most likely explanation is:',
  'IT changed their update delivery method without announcement',
  'This is a spear-phishing attack specifically targeting your organisation using social engineering against employees who know updates are important',
  'The update is too large for the company''s patch management system',
  'The patch management system is temporarily down',
  'b',
  'Attackers research their targets before striking. Knowing employees expect IT updates allows a convincing fake. Legitimate IT departments follow established, consistent procedures — a sudden change in delivery method, especially via email link, is a strong attack indicator.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A RAT is confirmed on a colleague''s machine. IT asks you to help. What is the correct order of first actions?',
  'Run antivirus → then disconnect from network → then change passwords',
  'Disconnect from network immediately → run antivirus in isolation → assess what the attacker accessed → change relevant credentials',
  'Change all passwords → restart the machine → run antivirus',
  'Reinstall Windows → reconnect to network → run antivirus',
  'b',
  'Network isolation always comes first. With a RAT, a human attacker may be actively on the machine at that moment — every second of connectivity is a window for exfiltration or lateral movement. Isolation → scan → assess damage → remediate is the correct sequence.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Why is "run antivirus to remove the RAT" alone an insufficient response to a confirmed RAT infection?',
  'Antivirus cannot detect RATs',
  'The attacker may have already exfiltrated data, created backdoors, or accessed other network resources before the RAT was detected — these consequences exist regardless of removal',
  'Antivirus removes the RAT but cannot remove its effects on performance',
  'A new antivirus must be installed before removing the old one',
  'b',
  'Removing the RAT stops ongoing access but does not undo what the attacker did while it was active. They may have copied files, planted additional backdoors, stolen credentials, or mapped the network. A full forensic assessment of "what did they access?" must follow removal.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Before opening any unexpected document attachment from a vendor, the most effective verification is:',
  'Hovering over the attachment to preview the file contents',
  'Calling the vendor directly on a known, saved phone number to confirm they sent it',
  'Checking if the email has an unsubscribe link — legitimate emails always do',
  'Opening in Google Drive viewer rather than locally',
  'b',
  'A direct phone call to the vendor on a number you already have is the only verification that cannot be spoofed. Email domains can be cloned, display names can be faked, and previews can still trigger malicious scripts in some environments.'
FROM quizzes q WHERE q.simulation_id = 'mal-trojan-pro'
ON CONFLICT DO NOTHING;

-- ── mal-ransomware-pro ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'Ransomware typically enters a corporate environment through which most common initial vector?',
  'Physical USB drives left in public areas',
  'Phishing emails with malicious attachments or links that an employee opens',
  'Automatic infection when visiting any news website',
  'Vulnerabilities in the office Wi-Fi router firmware',
  'b',
  'Phishing emails remain the dominant ransomware entry point in corporate environments. An employee opening a malicious attachment or clicking a link that downloads a dropper is how most ransomware campaigns begin. This is why email security, macro policies, and user training are the primary corporate defences.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'The ransom demand says paying 0.5 BTC will guarantee decryption within 24 hours. Research shows ransomware groups have a payment-to-decryption success rate of:',
  'Near 100% — attackers have a business reputation to maintain',
  'Highly variable — many victims receive no key, a broken key, or partial decryption even after payment',
  'Exactly 50% by law — they must partially comply',
  '0% — all ransomware groups are scams with no real decryption capability',
  'b',
  'Payment outcomes vary significantly. Some groups provide working decryption keys to maintain their "reputation." Others take payment and vanish. Decryption keys may be slow, partial, or broken. Payment also funds future attacks and marks the victim as willing to pay.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Windows "Previous Versions" or "Shadow Copy" can help recover encrypted files because:',
  'It stores encrypted files in their original format',
  'Windows periodically creates snapshots of files before they are modified — if ransomware didn''t delete these shadow copies, you can restore previous unencrypted versions',
  'It connects to Microsoft''s cloud backup automatically',
  'Shadow copies are stored on a separate network drive outside ransomware reach',
  'b',
  'Windows Volume Shadow Copy Service (VSS) creates point-in-time snapshots of files. Modern ransomware often deletes shadow copies first — but some variants don''t. Right-clicking an encrypted file → Properties → Previous Versions is always worth checking before other options.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'The most reliable protection against ransomware data loss in an organisation is:',
  'Having antivirus on every machine',
  'Regular, tested backups stored on systems not connected to the main network — so ransomware cannot reach and encrypt the backup copies',
  'Disabling USB ports on all machines',
  'Using strong passwords on all employee accounts',
  'b',
  'Offline or air-gapped backups are the definitive ransomware defence. Backups connected to the network will be encrypted along with everything else. The backup must also be tested regularly — an untested backup that fails during recovery is as useful as no backup.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-pro'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'nomoreransom.org is a resource jointly run by Europol, the Dutch Police, and cybersecurity companies. It offers:',
  'A service to negotiate ransom payments on your behalf',
  'Free decryption tools for hundreds of ransomware families — always check here before considering payment',
  'A Bitcoin escrow service for safer ransom payment',
  'Legal advice on liability after a ransomware attack',
  'b',
  'No More Ransom (nomoreransom.org) offers free decryption tools for known ransomware strains. Law enforcement recovers and publishes decryption keys when criminal groups are dismantled. Many victims can recover files for free — always check before paying.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-pro'
ON CONFLICT DO NOTHING;

-- ── mal-ransomware-elderly ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'Police ransomware (phone locker malware) typically claims to be from an authority like "National Cyber Crime Department." Which of the following would a real Indian law enforcement agency never do?',
  'Send written notices through registered post',
  'Remotely lock your phone and demand immediate UPI payment to unlock it',
  'Issue warrants through a magistrate',
  'File cases through the court system',
  'b',
  'Indian law enforcement operates through courts, registered notices, and physical processes — not remote phone locking and UPI payment demands. No Indian police authority, court, or government agency has the technical mechanism or legal authority to lock a private phone remotely and demand digital payment.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Android "Safe Mode" is useful for removing a phone-locking app because:',
  'It connects to Google''s servers to automatically remove malware',
  'In Safe Mode, only pre-installed system apps run — third-party apps including the malicious locker are disabled, letting you access Settings to uninstall it',
  'Safe Mode gives you a 30-minute window before the screen locks again',
  'It resets the phone to factory settings automatically',
  'b',
  'Safe Mode boots Android with only core system apps. The malicious locker app cannot run in Safe Mode, giving you full access to Settings → Apps where you can find and uninstall it. To enter Safe Mode: hold power button → tap and hold "Power off" → confirm "Reboot to safe mode."'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A phone locker app requests "Device Administrator" permission during installation. If granted, this allows the app to:',
  'Update itself automatically in the background',
  'Lock the screen, change the lock PIN, and resist uninstallation — making it much harder to remove',
  'Access your phone contacts and call history',
  'Enable screen recording during your calls',
  'b',
  'Device Administrator permission gives an app the ability to lock the screen, wipe the device, and prevent its own uninstallation. Malicious apps seek this permission specifically to make removal difficult. To remove a Device Admin app: Settings → Security → Device Admin Apps → deactivate → then uninstall.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A fake police notice on your phone displays your photo (taken by the front camera). The purpose of showing your photo is:',
  'To confirm the notice was sent to the correct person',
  'To make the notice appear more official and frighten you into paying by suggesting authorities already have your image',
  'To check if you match a criminal database',
  'To video call the authorities automatically',
  'b',
  'The app secretly activates the front camera and captures your photo when the lockscreen appears. Displaying "your" photo makes the notice feel personalised and authoritative — suggesting authorities have already identified you. It is pure psychological manipulation with no legal basis.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'If Safe Mode removal of a phone locker malware fails, what is the nuclear option and what does it cost you?',
  'Replacing the phone — the malware permanently damages hardware',
  'Factory reset — this removes all malware but also deletes all personal data, photos, and apps not backed up to Google',
  'Removing the SIM card — this breaks the malware''s connection to its control server',
  'Flashing a new ROM — only possible with a rooted phone',
  'b',
  'A factory reset (Settings → General Management → Reset → Factory Reset) removes all software including malware — but also wipes all data stored on the phone. Photos backed up to Google Photos and contacts synced to Google are recoverable. Locally stored data that was not backed up is lost.'
FROM quizzes q WHERE q.simulation_id = 'mal-ransomware-elderly'
ON CONFLICT DO NOTHING;

-- ── mal-adware-student ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'After installing a "free video converter" from an unofficial site, your browser homepage changed to "search.mysearchengine.net" without your permission. This is called:',
  'A browser update that changed default settings',
  'A browser hijack — adware or a PUP (Potentially Unwanted Program) modified your browser settings as part of a bundled installation',
  'A Chrome synchronisation issue from another device',
  'A Microsoft update that resets homepage settings',
  'b',
  'A browser hijack occurs when software modifies your homepage, search engine, or new tab page without clear consent. It is typically installed bundled with free software from unofficial sites. The "new" search engine sends your searches to advertisers and collects browsing data.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A browser popup appears on a website warning "VIRUS DETECTED — Your PC is infected with 3 viruses. Call Microsoft Support at 1800-XXX-XXXX immediately." You should:',
  'Call the number — Microsoft monitors for infections and this is a genuine alert',
  'Close the tab — legitimate antivirus software never displays virus warnings in web browser popups, and this number connects to scammers',
  'Click the provided link to run Microsoft''s online scan',
  'Copy the virus names shown and search for removal instructions',
  'b',
  'Legitimate antivirus software displays alerts in its own application window — never in a web browser tab. Browser-based "virus warnings" are either adware running on your machine or scam websites. The phone number connects to tech support scammers who will charge fees for fake removal.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'To fully remove a browser hijacker, which steps are required in the correct order?',
  'Restart the browser → change homepage → install new antivirus',
  'Uninstall the source program from Control Panel → remove the browser extension → reset browser settings',
  'Reset browser settings → restart the computer → reinstall the browser',
  'Clear browser cache → change the search engine manually → delete cookies',
  'b',
  'Browser hijackers typically persist via three mechanisms: the installed program, a browser extension, and modified browser settings. All three must be removed in sequence. Resetting the browser without uninstalling the program often fails because the extension reinstalls the changes.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A website says "Your download is ready" and shows a large blue "Download" button and a smaller grey "Skip" link. What is the large button most likely doing?',
  'Downloading the file you requested',
  'Downloading a different file — often adware or a PUP — designed to look like the real download button, while the actual file link is the small grey text',
  'Verifying your download eligibility',
  'Opening the file directly in the browser',
  'b',
  'Download sites frequently use fake "Download" buttons that are actually advertisements for bundled software. The real download is often a small plain link. Always pause and look for which button is the advertisement versus the actual file you want.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-student'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'AdwCleaner is a tool specifically designed to remove:',
  'Ransomware encryption',
  'Adware, browser hijackers, and Potentially Unwanted Programs (PUPs) — categories that standard antivirus often misses',
  'Trojans and Remote Access Tools',
  'Browser cookies and cached data',
  'b',
  'AdwCleaner (by Malwarebytes, free at malwarebytes.com/adwcleaner) is purpose-built for adware, PUPs, and browser hijackers — categories that traditional antivirus scanners often classify as "not malware" and therefore don''t remove. It fills an important gap for these annoying but persistent threats.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-student'
ON CONFLICT DO NOTHING;

-- ── mal-adware-elderly ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'Your Android phone has a setting called "Install unknown apps" or "Unknown sources." What risk does enabling this setting create?',
  'It allows apps to use more mobile data',
  'It allows APK files from outside the Play Store to be installed — bypassing Google''s safety checks that screen apps for malware',
  'It gives apps permission to make phone calls',
  'It allows the phone to be accessed remotely by Google',
  'b',
  'The "Unknown sources" / "Install unknown apps" setting controls whether Android allows APK installations from outside the Play Store. Enabling it bypasses Google Play Protect''s screening. It should be kept OFF unless you specifically need it, and turned off again immediately after.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'An app called "Super Torch HD" on the Play Store requests access to your Contacts, SMS, Location, and Camera. A torch app realistically needs:',
  'All of these permissions — modern torch apps use location to adjust brightness based on ambient light',
  'Only Camera permission — to access the camera flash. Contacts, SMS, and Location have no legitimate use for a torch',
  'Contacts and Camera — to share torch activation with friends',
  'Location only — to set automatic brightness schedules',
  'b',
  'A torch app needs only Camera permission to activate the flash LED. Any app requesting Contacts, SMS, or Location beyond what its function requires is harvesting data. Deny unnecessary permissions — you can always grant them later if genuinely needed.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Ads appear as full-screen pop-ups on your phone even when you are not using any app. This behaviour most likely indicates:',
  'Your mobile data plan includes advertising',
  'An adware app is installed that displays ads on the home screen and over other apps using Android''s "Display over other apps" permission',
  'Your phone''s operating system needs an update',
  'Your Wi-Fi router is injecting advertisements',
  'b',
  'Full-screen ads that appear outside of any app indicate an adware app with "Display over other apps" (overlay) permission. This permission allows apps to draw on top of everything else on screen. Find the culprit in Settings → Apps → [suspicious app] → Permissions.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'An unknown caller says: "We are calling from Samsung. Our systems show your phone has a dangerous virus. Please give us remote access and we will fix it for free." You should:',
  'Grant access — Samsung monitors all Galaxy phones for security issues',
  'Hang up immediately — Samsung, Google, and no legitimate company calls you unsolicited to remotely fix your device',
  'Ask them to send an official SMS first before proceeding',
  'Allow read-only access but not full control',
  'b',
  'No legitimate technology company calls you unsolicited to fix a virus on your device. These are "tech support scam" calls. Remote access given to the caller allows them to install malware, access banking apps, and capture OTPs. Hanging up immediately is always the correct response.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-elderly'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'You suspect an app is draining your battery by running ads in the background. Where in Android settings can you see which apps are consuming the most battery?',
  'Settings → Display → Battery saver',
  'Settings → Battery → Battery usage — this shows each app''s percentage of battery consumption',
  'Settings → Apps → Running apps',
  'Settings → Developer options → Process stats',
  'b',
  'Settings → Battery → Battery usage shows each app''s battery consumption as a percentage. An app consuming disproportionately more battery than its usage justifies — especially one running in the background — is likely running hidden processes like ad loading or data collection.'
FROM quizzes q WHERE q.simulation_id = 'mal-adware-elderly'
ON CONFLICT DO NOTHING;

-- ── fs-v-kyc-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'What does KYC stand for, and what is its actual purpose in banking?',
  'Know Your Credentials — a system for resetting banking passwords',
  'Know Your Customer — a regulatory process for banks to verify customer identity and address to prevent fraud and money laundering',
  'Keep Your Card — a reminder to update debit card details annually',
  'Know Your Credit — a system for checking credit scores',
  'b',
  'KYC (Know Your Customer) is a mandatory RBI process for banks to verify customer identity. Genuine KYC updates happen at a branch or through the official bank app — never through links sent via SMS. Understanding this makes any SMS-based KYC request immediately suspicious.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-kyc-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'You receive an SMS: "Dear customer, your SBI account KYC is pending. Update now at sbi-kyc-portal.in or your account will be blocked." The real SBI website is sbi.co.in. What does the domain tell you?',
  '"sbi-kyc-portal.in" is an SBI sub-domain for KYC updates',
  '"sbi-kyc-portal.in" is a fraudulent domain — SBI only operates on sbi.co.in',
  'The .in extension confirms it is an official Indian bank portal',
  'It could be legitimate — banks sometimes use separate domains for specific services',
  'b',
  '"sbi-kyc-portal.in" is a completely different domain from "sbi.co.in." Anyone can register any .in domain. Banks only use their one official domain for all services. Any variation is fraudulent.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-kyc-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A fake KYC portal asks for your account number, Aadhaar, PAN, and debit card PIN together. Why is collecting all of these at once a red flag?',
  'It is a normal requirement — banks need all details to verify identity',
  'A genuine KYC update requires identity verification, not payment credentials like a PIN — collecting PIN alongside identity documents is designed for account takeover, not KYC',
  'It is suspicious only if they also ask for your OTP',
  'Banks collect all of these together during initial account opening, so repeat collection is normal',
  'b',
  'Genuine KYC updates verify who you are — they require identity documents. Your debit card PIN is a transaction authorisation tool, not an identity document. Any form asking for PIN alongside Aadhaar and account number is harvesting credentials for account takeover.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-kyc-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'The safest way to check if your bank account genuinely requires a KYC update is:',
  'Click the link in the SMS since it arrived from a number that looks like your bank''s',
  'Open your bank''s official app directly and check for notifications, or call the number on the back of your card',
  'Google "bank KYC update" and follow the first result',
  'Reply to the SMS asking for confirmation',
  'b',
  'The official app and the number on your card are the only two channels that cannot be spoofed. SMS sender IDs can be faked. Links in SMS lead to fake sites. Only the bank''s own app and their printed helpline number are trustworthy.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-kyc-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'RBI guidelines state that banks should send KYC update requests through which channels?',
  'Any channel including SMS links, since reaching customers quickly is the priority',
  'Official registered post, through the bank''s official app, or in person at a branch — never through SMS links demanding immediate action',
  'WhatsApp Business messages from verified bank numbers',
  'Email with attached forms requiring digital signatures',
  'b',
  'RBI mandates that KYC updates happen through secure, verified channels — physical branch visits, official app notifications, or registered post. SMS links demanding immediate action violate RBI''s own guidelines.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-kyc-1'
ON CONFLICT DO NOTHING;

-- ── fs-v-otp-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'What is the purpose of an OTP (One Time Password) in banking transactions?',
  'It is a permanent code for logging into net banking',
  'It is a single-use code sent to your registered mobile to confirm you — and only you — are authorising a specific transaction at that moment',
  'It is a code the bank uses to verify their own identity to you',
  'It is a backup password in case you forget your main banking PIN',
  'b',
  'An OTP is a single-use time-sensitive code that proves the person authorising a transaction has physical access to your registered phone. Sharing it defeats this entirely — the bank sends it to you specifically because it should never be known to anyone else, including bank staff.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-otp-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A caller says: "I am from HDFC Bank. Your account is under attack. To freeze the unauthorised transaction, you must share the OTP we just sent you." What is actually happening?',
  'The bank is genuinely trying to protect your account by verifying your identity',
  'The attacker has already initiated a transaction on your account and needs your OTP to complete it — the "freeze" story is the pretext',
  'This is a standard security protocol banks use when they detect suspicious logins',
  'The bank needs the OTP to reverse an unauthorised transaction on your behalf',
  'b',
  'When you receive an OTP you didn''t request, it means someone has your account details and has initiated a transaction. The OTP is the last barrier. The fraudster''s call is specifically to get you to hand over that barrier — framed as "protection" to reverse your instinct to refuse.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-otp-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Every major Indian bank''s official policy on OTP sharing states:',
  'Bank staff may ask for OTP during security verification calls',
  'No bank employee will ever ask for your OTP, PIN, or password — for any reason, in any situation',
  'OTP sharing is permitted only with senior bank officers for account freezing',
  'OTP can be shared with bank-verified callers who provide their employee ID',
  'b',
  'Every major Indian bank states explicitly that no bank employee will ever ask for your OTP, password, or PIN under any circumstances. This rule has no exceptions. Any caller asking for these details is a fraudster.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-otp-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'You receive an OTP from your bank that you did not request. What does this indicate and what should you do first?',
  'It is a routine security check — ignore it',
  'Someone has your banking credentials and has initiated a transaction — call your bank immediately using the number on your card to freeze the account',
  'It means your phone number is registered to multiple accounts — contact your carrier',
  'Forward the OTP to the number that called you to help them identify the fraud',
  'b',
  'An unrequested OTP is a strong signal that someone is actively using your account details. They have your credentials but lack the OTP. Calling your bank immediately to freeze the account can prevent the transaction from completing.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-otp-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'A scammer already knows your full name, account number, and the last four digits of your card. Why should this NOT change your decision to share the OTP?',
  'It confirms they are from the bank — the bank is the only one who has your details',
  'This data is available from previous data breaches and phishing — possessing it does not verify the caller is from your bank. The no-OTP-sharing rule applies regardless.',
  'It is suspicious only if they also know your full card number',
  'If they know your account details they must be legitimate — hackers would not need to call',
  'b',
  'Account numbers, card numbers, and names are exposed in data breaches and available on dark web marketplaces. A fraudster having your details does not confirm they work for your bank. The no-OTP-sharing rule applies regardless of what information the caller already has.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-otp-1'
ON CONFLICT DO NOTHING;

-- ── fs-v-lottery-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'In India, which government bodies are legally permitted to run lotteries?',
  'The central government through a national lottery department',
  'Only state governments — and only in states where lotteries are legal under the Lotteries (Regulation) Act, 1998',
  'Any registered company with a gaming licence',
  'Telecom operators who run subscriber prize schemes',
  'b',
  'Under the Lotteries (Regulation) Act 1998, only state governments can run lotteries — and only in states that have legalised them (Kerala, Goa, Maharashtra etc.). There is no central government lottery. Any "National Lottery" is fraudulent by definition.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-lottery-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Lottery scams use an "advance fee" model. What does this mean?',
  'The prize amount is paid in advance before you submit any documents',
  'The scammer collects a series of fees before "releasing" the prize — the prize never arrives and fees keep escalating',
  'You pay the prize tax in advance and the government reimburses it later',
  'A small registration fee is charged in advance to validate your winning ticket',
  'b',
  'The advance fee model: a small initial fee (processing, taxes, courier) is followed by ever-increasing demands — legal clearance, customs, insurance — until the victim stops paying. The prize is fictional and no payment results in it being received.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-lottery-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A lottery message says: "Pay ₹15,000 in taxes now and receive ₹5,00,000. The government requires tax to be paid before prize disbursement." Why is this claim false?',
  'Prize winnings are not taxed in India',
  'Under Section 194B of the Income Tax Act, the prize organiser deducts TDS at 30% before paying the winner — the winner never pays taxes separately upfront',
  'Only prizes above ₹10 lakh require upfront tax payment',
  'The government collects prize taxes directly through UPI, not through organisers',
  'b',
  'Section 194B requires lottery and prize organisers to deduct TDS at 30% before disbursing the prize. The winner receives the net amount. No legitimate prize ever asks you to pay taxes upfront to "release" your winnings — that tax has already been deducted at source.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-lottery-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A friend has paid ₹8,000 in "processing fees" for a lottery win and is now being asked for ₹12,000 more for "customs clearance." What should you advise?',
  'Pay the ₹12,000 — they have already invested ₹8,000 and stopping now wastes that money',
  'Stop all payments immediately — the escalating fees confirm it is a scam. Each new fee is a fresh loss, not a recovery of the first.',
  'Ask for a customs clearance certificate before paying',
  'Negotiate down and pay ₹6,000 as a compromise',
  'b',
  'Escalating fee demands after an initial payment are the clearest confirmation of lottery fraud. The ₹8,000 already paid is a sunk cost — additional payment will only deepen the loss. Stop immediately and file at cybercrime.gov.in.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-lottery-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Which Indian government portal would list a genuine national government lottery scheme?',
  'nationalprize.gov.in',
  'india.gov.in — the official National Portal of India, which lists all central government schemes',
  'lottery.gov.in',
  'prizes.india.gov.in',
  'b',
  'india.gov.in is the official National Portal linking to all central government schemes. There is no central government lottery in India — the only legal lotteries are run by state governments through their own official state portals.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-lottery-1'
ON CONFLICT DO NOTHING;

-- ── fs-v-pension-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'The official domain for the Employees'' Provident Fund Organisation (EPFO) in India is:',
  'epfo.org.in',
  'epfindia.gov.in',
  'epfo-india.in',
  'providentfund.gov.in',
  'b',
  'The official EPFO portal is epfindia.gov.in. All EPFO account management, balance checks, and claim submissions happen here. Any domain other than epfindia.gov.in claiming to be EPFO is fraudulent.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-pension-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A fake pension portal URL reads "pension-verify.gov.in" while the real portal is "pension.gov.in." Why is the fake URL dangerous despite ending in .gov.in?',
  '"pension-verify.gov.in" is a legitimate sub-domain of the real portal — both are genuine',
  '"pension-verify.gov.in" and "pension.gov.in" are separate registrations — always verify against the exact official URL from your pension documents, not just the .gov.in suffix',
  'Both are equally legitimate since both end in .gov.in',
  'The hyphen makes it suspicious but .gov.in still confirms it is government-run',
  'b',
  'While .gov.in domains are restricted to government entities, different sub-strings before .gov.in are separate registrations. The legitimate pension portal is pension.gov.in — not pension-verify.gov.in. Always verify the exact domain against official documents.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-pension-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'How does the Indian government officially notify citizens when their pension account requires attention?',
  'Via SMS with a link to update details within 24 hours',
  'Through registered post and official notifications on the account holder''s registered portal — never through SMS links with urgent deadlines',
  'Via WhatsApp messages from the pension ministry''s official number',
  'Through automated phone calls with an IVR system to collect details',
  'b',
  'Government pension communications go through formal channels — registered post, official portal notifications, and in-person visits to pension offices. SMS links with urgent deadlines are not a government communication method.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-pension-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'A pension scam portal asks for your Aadhaar, bank account number, and UAN (Universal Account Number) together. Why is this combination particularly dangerous?',
  'It is standard for pension verification — all three are needed to confirm your identity',
  'Together these three allow an attacker to access your EPFO account, change the bank account on file, and divert all future pension payments to their account',
  'It is only dangerous if combined with your date of birth',
  'The UAN alone is the risk — Aadhaar and bank account are publicly available',
  'b',
  'Aadhaar verifies identity, bank account details allow redirection of payments, and UAN is the access key to your EPFO account. With all three, an attacker can log into your EPFO account and change the bank account on file — diverting all future pension payments.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-pension-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'The EPFO official helpline number for pension account queries is:',
  '1800-103-0025',
  '1800-118-005',
  '1930',
  '155255',
  'b',
  'EPFO''s official toll-free helpline is 1800-118-005. This is the number to call to verify any communication claiming to be about your EPFO/pension account. 1800-103-0025 is Income Tax, 1930 is the cybercrime helpline, and 155255 is IRDAI.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-pension-1'
ON CONFLICT DO NOTHING;

-- ── fs-v-invest-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'An investment platform promises "guaranteed 40% monthly returns with 99% capital safety." Under SEBI regulations, a registered investment advisor making this claim would be:',
  'Operating legally — advisors with strong track records can guarantee returns',
  'In violation of SEBI regulations — no registered entity is permitted to guarantee investment returns',
  'Required to back the claim with an insurance policy',
  'Legal only if the platform is registered as an NBFC',
  'b',
  'SEBI regulations explicitly prohibit registered investment advisors and brokers from guaranteeing returns. All investments carry risk — this is a fundamental principle of financial markets. Any entity guaranteeing returns is either unregistered or fraudulent.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-invest-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Where can you verify if an investment platform or advisor is officially registered with SEBI?',
  'On the platform''s own "About" or "Credentials" page',
  'On sebi.gov.in under the Registered Intermediaries section',
  'By calling the platform''s customer care and asking for their SEBI number',
  'On Google by searching the platform name + "SEBI registered"',
  'b',
  'sebi.gov.in maintains the official authoritative list of all SEBI-registered entities. A platform can easily fake a registration number on their own website. Only the official SEBI portal confirms real registration.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-invest-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A fake trading dashboard shows your ₹50,000 investment growing to ₹1,85,000 in 3 weeks. When you try to withdraw, you are told to pay a ₹22,000 "income tax clearance" first. This reveals:',
  'That tax must be paid before profits can be transferred — this is a genuine regulatory requirement',
  'That the ₹1,85,000 balance is fictional — legitimate platforms deduct TDS automatically and never require pre-withdrawal tax deposits from users',
  'That the platform is legitimate but has strict tax compliance procedures',
  'That you need to negotiate the tax amount before paying',
  'b',
  'Legitimate investment platforms deduct TDS (Tax Deducted at Source) automatically — they are legally required to do so. No real platform asks you to pay taxes separately before releasing your funds. A pre-withdrawal tax payment demand confirms the balance is fake.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-invest-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Fake trading platform testimonials typically show very specific profit amounts like "₹87,430 in 11 days." Why the specificity?',
  'They are real testimonials — specific amounts confirm authenticity',
  'Specific amounts create an illusion of authenticity — precise figures appear more credible than round numbers, so fraudsters use them to make fabricated testimonials seem real',
  'SEBI requires specific profit disclosures in testimonials',
  'The specificity indicates the platform tracks individual trades accurately',
  'b',
  'Human psychology treats specific numbers as more credible than round numbers. "₹87,430" reads as a real trade outcome while "₹80,000" reads as an estimate. Fraudsters exploit this by fabricating precise figures.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-invest-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'The best first action when evaluating a new investment opportunity found on social media is:',
  'Invest a small amount first to test if withdrawals work',
  'Search "[platform name] scam" and check SEBI registration at sebi.gov.in before engaging at all',
  'Join their WhatsApp group to see proof of payments from other members',
  'Ask the platform for their SEBI certificate and check if it looks official',
  'b',
  'Searching for fraud reports costs nothing and takes 2 minutes — victims frequently post warnings. SEBI verification is authoritative and definitive. Both checks come before engaging. A small "test" investment still puts money at risk and doesn''t verify legitimacy.'
FROM quizzes q WHERE q.simulation_id = 'fs-v-invest-1'
ON CONFLICT DO NOTHING;

-- ── ceo-v-job-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'Why do job scammers register lookalike domains like "google-india.com" instead of spoofing the real domain directly?',
  'Lookalike domains are cheaper to register',
  'Sending email that appears to originate from the real domain (google.com) is technically much harder due to email authentication standards like DMARC — lookalike domains are trivially easy to register',
  'Google and Infosys have legal protections that make their domains impossible to spoof',
  'Lookalike domains rank higher in search results',
  'b',
  'Spoofing the actual sending domain of a major company is technically difficult due to DMARC and SPF email authentication standards. Registering "google-india.com" takes minutes and costs under ₹1,000. Most people read the display name and don''t examine the actual domain after @.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-job-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A recruiter asks you to pay ₹4,500 for "mandatory background verification" before your joining date. Legitimate companies:',
  'May charge for background checks since third-party agencies are involved',
  'Never charge candidates for any part of the hiring process — all verification, training, and onboarding costs are borne by the employer',
  'Sometimes charge for security clearances in sensitive roles',
  'Charge only for international background verification',
  'b',
  'In legitimate hiring, the employer pays for background checks — not the candidate. This is a universal standard. Any fee at any stage of recruitment is the defining characteristic of a job scam, regardless of how it is framed.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-job-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A fake onboarding portal demands escalating fees: registration → document processing → training materials → security deposit. What is the purpose of this escalation?',
  'It reflects the actual stages of corporate onboarding',
  'Each payment builds sunk cost — having paid previous fees makes victims more likely to pay the next one rather than accept that all prior payments were lost',
  'It allows the company to verify financial capability before offering employment',
  'It is a test of commitment to the role',
  'b',
  'The escalation exploits the sunk cost fallacy. Once you''ve paid ₹4,500 for registration, paying ₹3,000 more for documents feels like protecting the original investment. Each payment creates psychological momentum toward the next.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-job-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'How can you verify in under 2 minutes whether a job offer from a major company is genuine?',
  'Search the recruiter''s name on LinkedIn and check their connection count',
  'Visit the company''s official careers page directly and search for the role — if it doesn''t exist there, the offer is fake',
  'Call the phone number in the email to ask if the offer is real',
  'Check if the offer letter has the company''s logo and signature',
  'b',
  'Every legitimate open position at a major company is listed on their official careers page. If the role you were "selected for" doesn''t appear there, no such position exists. The official careers page cannot be faked.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-job-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'A job scam offer typically includes a salary significantly above market rate. Why?',
  'The company is trying to attract the best candidates from competitors',
  'An inflated salary makes victims more emotionally invested in the "opportunity" and less likely to question red flags — financial excitement overrides critical thinking',
  'Above-market salaries indicate the company is well-funded',
  'Remote and international roles command higher salaries',
  'b',
  'The above-market salary is bait. Once you are excited about earning ₹25 LPA instead of the expected ₹12 LPA, you are more motivated to "secure" the offer by paying fees and more reluctant to walk away. Emotional investment suppresses critical thinking.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-job-1'
ON CONFLICT DO NOTHING;

-- ── ceo-v-scholarship-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'What is the minimum requirement for being considered for any legitimate scholarship in India?',
  'A minimum CGPA of 7.0 or above',
  'A submitted application — you must have applied and been assessed. Selection without any application from you is impossible in any legitimate scheme.',
  'Being enrolled in a government-recognised institution',
  'Having an Aadhaar-linked bank account for disbursement',
  'b',
  'Every legitimate scholarship requires a formal application reviewed against stated eligibility criteria. Selection without an application means no eligibility check was done. It is structurally impossible to be genuinely selected for a scholarship you never applied for.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-scholarship-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'The official Indian government portal for all central scholarship schemes is:',
  'scholarship-india.gov.in',
  'scholarships.gov.in — the National Scholarship Portal',
  'mhrd.scholarships.in',
  'india-scholarship.org.in',
  'b',
  'scholarships.gov.in is the only official National Scholarship Portal managed by the Ministry of Education. All central and most state government scholarships are accessible here. If a scholarship is not listed on this portal, it is not a government scholarship.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-scholarship-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A scholarship portal URL reads "scholarship-verify.org.in" while the real portal is "scholarships.gov.in." Why should the .org.in domain raise suspicion?',
  '.org.in domains are for NGOs — some scholarships are run by non-profits, so this could be legitimate',
  'Government scholarship portals use .gov.in — a .org.in domain claiming to administer a government scholarship is a mismatch that confirms it is fraudulent',
  'Both .gov.in and .org.in are equally reliable for scholarship portals',
  'The "verify" part of the domain is the red flag, not the .org.in extension',
  'b',
  'Government scholarship administration is a government function — it uses .gov.in domains. A .org.in domain can be registered by any organisation including fraudsters. Seeing .org.in for what is claimed to be a government scholarship portal is a clear domain type mismatch.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-scholarship-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'When does a real scholarship actually need your bank details?',
  'On the initial application form to pre-validate your account',
  'Only after you have been officially selected, through a secure verified process at your institution or official portal — never on an initial "claim" page',
  'At the same time as your academic documents',
  'Bank details are never needed — all funds go through the college',
  'b',
  'Bank details for scholarship disbursement are collected only after formal selection, through official processes — typically through your educational institution or after logging into the official portal with your student credentials.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-scholarship-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'A scholarship scam email creates urgency: "Claim within 48 hours or the award will be reallocated." What is the purpose of this time pressure?',
  'It reflects genuine scholarship reallocation procedures',
  'It prevents you from taking the time to verify the scholarship''s legitimacy through official channels — decisions made under time pressure skip the verification step',
  'It is a standard administrative deadline for fund disbursement',
  'It creates competition among selected students',
  'b',
  'The 48-hour deadline is designed to prevent you from doing what would immediately expose the scam: checking scholarships.gov.in, calling your college, or searching the scholarship name. Verification takes 5 minutes — urgency is the tool that stops people from taking those 5 minutes.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-scholarship-1'
ON CONFLICT DO NOTHING;

-- ── ceo-v-exam-phone-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'Exam result phishing SMS are sent in large volumes specifically during result announcement periods. Why does timing make the attack more effective?',
  'Students are logged into their portals frequently during this period',
  'Students are anxious and actively looking for result links, making them more likely to click without verifying — the brain is already in "find results" mode',
  'Students have more free time during result season',
  'University portals are slower during result season, making fake links seem convenient',
  'b',
  'Timing is the key tactic. When results are expected, students are actively searching and emotionally primed to act quickly. A message saying "your results are ready" during this window exploits existing anxiety — reducing scepticism.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-phone-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A phishing results page looks identical to your university''s real portal. What is the only reliable way to distinguish it from the real one?',
  'Check if the page has the university''s logo and colour scheme',
  'Check the URL in the address bar — the real portal is on the university''s official domain, not a generic domain like "university-results.in"',
  'Check if the page loads quickly — fake sites are usually slow',
  'Check if the page has a padlock (HTTPS) icon',
  'b',
  'Logos, colour schemes, and layout can all be copied in minutes. HTTPS (the padlock) can be obtained by anyone including fake sites. Only the URL in the address bar is unfalsifiable — it shows exactly which domain is serving the page.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-phone-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'A student logged into a fake results page with their university email and password. Beyond changing their university password, what other accounts are at immediate risk?',
  'Only the university account — phishing pages capture only what is entered',
  'Any other account where the same email and password combination is used — personal email, banking, social media',
  'Only accounts linked to the same email address',
  'Only the university account — other sites use different authentication',
  'b',
  'Password reuse across multiple accounts is extremely common. If a student uses the same password for their university account, Gmail, and banking app, capturing the university login gives access to all three. Every account sharing that password must be changed immediately — from a clean device.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-phone-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'What is the safest method for checking exam results?',
  'Click the first Google result for "[university name] results"',
  'Type your university''s official URL directly into the browser, or use a bookmark you created previously',
  'Use the link in the SMS since it is faster than navigating to the website',
  'Open the link in incognito mode for additional safety',
  'b',
  'Typing the URL directly or using a pre-saved bookmark guarantees you reach the real site. Google results can be manipulated. SMS links are under the attacker''s control. Incognito mode changes nothing about which server you connect to.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-phone-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Two-factor authentication (2FA) on your university email provides protection against phishing credential theft because:',
  'It prevents phishing pages from loading on your device',
  'Even if an attacker has your email and password, they cannot log in without the second factor which they do not have',
  'It alerts your university''s IT team when someone logs in from an unfamiliar device',
  'It changes your password automatically after a phishing incident is detected',
  'b',
  '2FA adds a second verification step — typically an OTP or authenticator code — that an attacker cannot provide even with your password. A captured password alone is insufficient to access your account.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-phone-1'
ON CONFLICT DO NOTHING;

-- ── ceo-v-exam-desktop-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'An email shows the sender name as "VIT University Results Team" but when you expand the address it shows "results@university-portal-results.com". What does this tell you?',
  'VIT uses a third-party results management company — this domain is theirs',
  'The display name is fake — the actual sending domain has nothing to do with VIT, whose real domain is vit.ac.in',
  'Results notifications use a different domain than the main university website',
  'The .com extension is suspicious but the sender name confirms it is VIT',
  'b',
  'Email display names are just text — any email can display any name. The actual sending domain (after @) is what determines who really sent the email. VIT''s domain is vit.ac.in. "university-portal-results.com" is a completely unrelated domain anyone could have registered.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-desktop-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'Universities in India typically use which domain extensions for their official email and web addresses?',
  '.com and .org — universities choose freely',
  '.edu.in or .ac.in — the standard academic domain extensions in India',
  '.in — all Indian institutions use this',
  '.gov.in — universities are government institutions',
  'b',
  '.edu.in is reserved for educational institutions in India, and .ac.in is the academic domain. Real Indian university websites and emails use these — IIT domains are iitb.ac.in, iitd.ac.in etc. A university email from a .com or .org.in domain is a strong indicator of fraud.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-desktop-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'After entering credentials on a fake university login page, what is the most immediate risk beyond your university account?',
  'Your university may expel you for the security breach',
  'The attacker can use your university email to send phishing emails to your professors and classmates, who will trust messages from your address',
  'Your phone number linked to the account may be sold to advertisers',
  'Your academic records may be deleted',
  'b',
  'A compromised university email becomes a phishing weapon — messages from your real student address carry high trust with professors, classmates, and staff. Attackers use compromised legitimate accounts to launch the next wave of attacks.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-desktop-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'Which is the most effective single habit for avoiding exam result phishing via email?',
  'Opening email links only in incognito mode',
  'Never following email links to university login pages — always navigate directly to the official URL',
  'Checking if the email has an unsubscribe link — phishing emails usually don''t',
  'Checking if the email arrived in your primary inbox rather than spam',
  'b',
  'Never following email links to login pages makes it impossible for a phishing email to lead you to a fake page, regardless of how convincing it looks. Type the URL or use a bookmark — every time.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-desktop-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'Your university''s IT department should be notified when you submit credentials to a phishing page because:',
  'They are legally required to report it to the government',
  'They can revoke your compromised account session, reset credentials securely, and warn other students about the active phishing campaign',
  'They will fine you for the security incident',
  'They are only needed if the attacker has already used your account',
  'b',
  'IT security teams act quickly to limit damage: session revocation stops active attacker access, secure credential reset replaces compromised ones, and a campus-wide alert prevents other students from falling for the same attack.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-exam-desktop-1'
ON CONFLICT DO NOTHING;

-- ── ceo-v-giveaway-1 ──────────────────────────
INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 1,
  'Why do giveaway scammers specifically impersonate major influencers rather than creating entirely fictional accounts?',
  'Major influencers have larger prize budgets, making the scam more credible',
  'An established influencer''s name carries existing trust with their audience — impersonating them means the scammer inherits that trust without having to build it from scratch',
  'Fictional accounts get banned faster by Instagram''s moderation',
  'Influencers are legally prohibited from suing impersonators',
  'b',
  'Trust is the scammer''s primary asset. Creating a fictional account requires building credibility from zero. Impersonating someone with millions of followers means their audience already has a positive emotional relationship with that name and face.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-giveaway-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 2,
  'A giveaway "prize claim" page asks for a ₹2,000 "handling and shipping fee" to deliver an iPhone 15 Pro worth ₹1,34,900. The fee-to-prize ratio is designed to:',
  'Cover actual logistics costs — premium devices require secure handling',
  'Make the payment seem trivially small relative to the prize, reducing psychological resistance to paying',
  'Verify that the winner is financially capable of receiving a high-value prize',
  'Comply with RBI guidelines on prize disbursement',
  'b',
  'A ₹2,000 fee for a ₹1.35 lakh phone appears rational — "investing" 1.5% for a huge return. This ratio is carefully calculated to minimise resistance. Real giveaways bear all costs — the winner pays nothing. The fee is the entire revenue model of the scam.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-giveaway-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 3,
  'Instagram''s blue verified tick on an account confirms:',
  'The account owner is trustworthy and reputable',
  'Instagram has verified that the account authentically represents the public figure or brand it claims to be',
  'The account has more than 100,000 followers',
  'The account has been active for more than 2 years',
  'b',
  'The blue tick is an authenticity verification — Instagram has confirmed this account belongs to the real person or brand. Its specific purpose is anti-impersonation. A tick means this is the real account, not a clone.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-giveaway-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 4,
  'In a legitimate brand giveaway (e.g. Apple, Samsung, an influencer partnership), who pays for the shipping and delivery of the prize to the winner?',
  'The winner pays shipping — this is standard for large prize items',
  'The organising brand or sponsor covers all costs — the winner pays absolutely nothing to receive their prize',
  'Costs are split 50/50 between the brand and winner',
  'The winner pays customs only for international prizes',
  'b',
  'In all legitimate giveaways, the organiser covers the full cost including packaging, shipping, and any applicable duties. Any request for the winner to pay any amount — regardless of how it is framed — makes it a scam.'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-giveaway-1'
ON CONFLICT DO NOTHING;

INSERT INTO quiz_questions (quiz_id, question_order, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
SELECT q.id, 5,
  'You want to verify whether a major influencer is genuinely running a giveaway. The most reliable check is:',
  'Checking how many likes and comments the giveaway post has received',
  'Searching for the real influencer''s verified account and checking if they have posted about this giveaway there',
  'Googling the giveaway announcement to see if news outlets have covered it',
  'Checking if the prize brand has confirmed the giveaway on their own account',
  'b',
  'The real influencer''s verified account is the ground truth. If they are genuinely running a giveaway, it will be prominently announced there. If their real account has no mention, the account you found is fake — regardless of how many likes the post has (bots can generate those too).'
FROM quizzes q WHERE q.simulation_id = 'ceo-v-giveaway-1'
ON CONFLICT DO NOTHING;
