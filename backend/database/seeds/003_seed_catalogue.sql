-- ══════════════════════════════════════════════════════════════════
-- Seed 003: simulation_catalogue + card_desc + objectives
-- Run after 001 and 002 seeds.
-- ══════════════════════════════════════════════════════════════════

-- ── Step 1: Update simulations with card_desc and objectives ──────
-- These come directly from the SIMULATIONS object in SimulationCategoryPage.jsx

UPDATE simulations SET
  card_desc  = 'Your bank calls asking for an OTP to verify your identity. Realise why sharing an OTP is always a mistake — it authorises transactions.',
  objectives = ARRAY['Understand OTP security', 'Identify vishing attacks', 'Know the correct bank verification process']
WHERE id = 'fs-v-otp-1';

UPDATE simulations SET
  card_desc  = 'Your bank sends an SMS asking to update KYC details with a link. Spot the phishing attempt and verify through official channels.',
  objectives = ARRAY['Identify SMS phishing patterns', 'Verify bank communications', 'Know when banks ask for documentation']
WHERE id = 'fs-v-kyc-1';

UPDATE simulations SET
  card_desc  = 'You receive an SMS claiming you won a lottery. A link asks for a "processing fee" to claim your ₹5,00,000 prize. Spot the advance-fee trap.',
  objectives = ARRAY['Identify advance-fee fraud', 'Recognise lottery scam patterns', 'Know you cannot win a lottery you didn''t enter']
WHERE id = 'fs-v-lottery-1';

UPDATE simulations SET
  card_desc  = 'A fake government portal asks for your Aadhaar and bank details to verify your pension. Spot the domain spoofing and verify through official channels.',
  objectives = ARRAY['Identify government portal phishing', 'Verify government communications', 'Protect Aadhaar and banking details']
WHERE id = 'fs-v-pension-1';

UPDATE simulations SET
  card_desc  = 'An ad promises 50% monthly returns on a trading platform. Screenshot profits flood a group. Spot the manufactured trust and fee escalation patterns.',
  objectives = ARRAY['Identify investment red flags', 'Verify regulatory registration', 'Test withdrawals before depositing large sums']
WHERE id = 'fs-v-invest-1';

UPDATE simulations SET
  card_desc  = 'An Instagram account impersonating your college admin is asking students to submit personal details for a "scholarship portal." Spot the fake.',
  objectives = ARRAY['Verify official social accounts', 'Identify information harvesting', 'Report impersonation attempts']
WHERE id = 'ii-s-1';

UPDATE simulations SET
  card_desc  = 'A contact using your classmate''s photo and name asks to borrow money urgently. Their real number was recently changed. Verify before you act.',
  objectives = ARRAY['Verify identity through secondary channels', 'Recognise account takeover signs', 'Respond without escalating risk']
WHERE id = 'ii-s-2';

UPDATE simulations SET
  card_desc  = 'Your Aadhaar details were shared carelessly. Walk through how an attacker could misuse them and what protective steps you can take immediately.',
  objectives = ARRAY['Understand Aadhaar misuse vectors', 'Lock Aadhaar biometrics correctly', 'File an identity theft complaint']
WHERE id = 'ii-s-3';

UPDATE simulations SET
  card_desc  = 'Someone has cloned your LinkedIn profile and is approaching your contacts. Identify, report, and mitigate the reputational damage.',
  objectives = ARRAY['Detect profile cloning', 'Alert contacts safely', 'Use LinkedIn reporting tools']
WHERE id = 'ii-p-1';

UPDATE simulations SET
  card_desc  = 'A deep fake voice call impersonates your CEO requesting an urgent wire transfer. Test your verification process under pressure.',
  objectives = ARRAY['Identify AI voice cloning attacks', 'Apply out-of-band verification', 'Protect against CEO fraud']
WHERE id = 'ii-p-3';

UPDATE simulations SET
  card_desc  = 'A threatening Income Tax email, a TRAI officer''s call, and a fake government portal all target you in one campaign. Navigate each step without losing money or data.',
  objectives = ARRAY['Spot spoofed government email domains', 'Respond safely to authority impersonation calls', 'Verify government portals using .gov.in domains']
WHERE id = 'ii-authority-1';

UPDATE simulations SET
  card_desc  = 'A WhatsApp message and call claim your son is at the police station needing urgent bail money. Panic sets in — but so does suspicion. Navigate it.',
  objectives = ARRAY['Recognise the "don''t call my real number" trick', 'Verify identity through an independent channel', 'Protect others about to be scammed']
WHERE id = 'ii-relative-emergency-1';

UPDATE simulations SET
  card_desc  = 'A spoofed hospital billing portal demands urgent payment or a procedure is cancelled. Inspect the domain, verify the UPI ID, and call the hospital directly.',
  objectives = ARRAY['Identify fake medical billing portals', 'Verify hospital bills through official channels', 'Recognise insurance renewal SMS fraud']
WHERE id = 'ii-fake-medical-1';

UPDATE simulations SET
  card_desc  = 'Simultaneous email, SMS and phone calls claim your bank account will be frozen in 10 minutes. A live countdown runs as you decide what to do.',
  objectives = ARRAY['Identify multi-channel coordinated social engineering', 'Recognise manufactured urgency as a manipulation tool', 'Respond correctly after credentials are compromised']
WHERE id = 'ii-urgency-pressure-1';

UPDATE simulations SET
  card_desc  = 'A classmate hands you a USB drive with "notes". Plugging it in triggers an autorun script that tries to spread across your folders.',
  objectives = ARRAY['Understand USB autorun virus mechanics', 'Identify autorun-based infection vectors', 'Respond correctly to a friend''s infected device']
WHERE id = 'mal-virus-student';

UPDATE simulations SET
  card_desc  = 'A forwarded exam-material email includes a "viewer" attachment that asks for macros. Interact with the inbox and document warning before the virus spreads.',
  objectives = ARRAY['Identify suspicious email domains and attachments', 'Handle macro warnings safely on desktop', 'Contain spread after a macro-based infection']
WHERE id = 'mal-virus-student-email';

UPDATE simulations SET
  card_desc  = 'A vendor email arrives with a Word attachment that "requires macros". Enabling them triggers a virus that spreads itself across your organisation''s contact list in seconds.',
  objectives = ARRAY['Identify spoofed sender domains', 'Understand how macro viruses spread', 'Contain an active email virus in a corporate setting']
WHERE id = 'mal-virus-pro';

UPDATE simulations SET
  card_desc  = 'A trusted family member forwards a "government health scheme" email with an attachment. The file is a virus that silently spreads itself to your contact list.',
  objectives = ARRAY['Recognise virus delivery through trusted contacts', 'Verify government scheme authenticity before opening', 'Help a family member clean an infected device']
WHERE id = 'mal-virus-elderly';

UPDATE simulations SET
  card_desc  = 'A free download of a paid game looks professional — verified badges, thousands of reviews. Click through the installer and watch what silently installs alongside.',
  objectives = ARRAY['Identify Trojan payloads in free software installers', 'Read installer screens before clicking Next', 'Detect and remove a keylogger from your system']
WHERE id = 'mal-trojan-student';

UPDATE simulations SET
  card_desc  = 'An urgent email from "IT Support" links to a critical Windows patch. The installer looks like Microsoft. A Remote Access Trojan installs alongside — giving attackers full system control.',
  objectives = ARRAY['Verify patch authenticity before installing', 'Identify Remote Access Trojan (RAT) behaviour', 'Execute incident response for a RAT compromise']
WHERE id = 'mal-trojan-pro';

UPDATE simulations SET
  card_desc  = 'Files on your work desktop begin locking one by one. A ransom note appears with a countdown timer. Every second you stay connected, more files are at risk.',
  objectives = ARRAY['Respond to live ransomware encryption in real time', 'Isolate the infected machine before network spread', 'Recover using backups — not by paying the ransom']
WHERE id = 'mal-ransomware-pro';

UPDATE simulations SET
  card_desc  = 'A WhatsApp APK installs ransomware that locks your Android screen with a fake Ministry of Home Affairs notice demanding ₹3,500.',
  objectives = ARRAY['Identify government impersonation screen-locker ransomware', 'Remove mobile ransomware using Android Safe Mode', 'Report UPI fraud and recover from a payment mistake']
WHERE id = 'mal-ransomware-elderly';

UPDATE simulations SET
  card_desc  = 'A free desktop converter bundles a toolbar and search hijacker. Use the browser-style simulation to spot red flags and prevent popup-storm infections.',
  objectives = ARRAY['Identify bundled adware in free installers', 'Recognise browser hijack indicators', 'Remove PUPs and restore browser settings safely']
WHERE id = 'mal-adware-student';

UPDATE simulations SET
  card_desc  = 'A "free flashlight app" arrives as an APK via WhatsApp. After install it floods your screen with ads, requests access to your contacts and location.',
  objectives = ARRAY['Identify dangerous app permissions', 'Understand APK sideloading risks', 'Remove adware apps and stop fake support scams']
WHERE id = 'mal-adware-elderly';

UPDATE simulations SET
  card_desc  = 'A Discord message promises free in-game skins via a giveaway link. Clicking it opens a fake gaming login page that harvests your credentials.',
  objectives = ARRAY['Identify phishing via gaming chat platforms', 'Recognise fake login page indicators', 'Protect gaming account credentials']
WHERE id = 'oc-gaming-1';

UPDATE simulations SET
  card_desc  = 'A social media ad promises 90% off on branded shoes. Clicking it opens a convincing fake store that collects payment details and never ships the product.',
  objectives = ARRAY['Spot unrealistic discounts and fake urgency tactics', 'Verify e-commerce domain and seller authenticity', 'Identify fake reviews and countdown pressure']
WHERE id = 'oc-ecommerce-1';

UPDATE simulations SET
  card_desc  = 'An SMS claims your package delivery failed and asks you to pay a ₹99 re-delivery fee via a link. The link leads to a fake courier site that steals your card details.',
  objectives = ARRAY['Identify SMS phishing (smishing) in delivery contexts', 'Verify courier communication through official apps', 'Never pay re-delivery fees via SMS links']
WHERE id = 'oc-courier-1';

UPDATE simulations SET
  card_desc  = 'While browsing, a fullscreen popup warns your computer is infected and displays a tech support number. Calling it connects you to scammers who ask for remote access.',
  objectives = ARRAY['Identify fake security alert popups in browsers', 'Understand why legitimate companies never cold-call for support', 'Safely close rogue browser warnings without calling the number']
WHERE id = 'oc-techsupport-1';

UPDATE simulations SET
  card_desc  = 'A spoofed hospital billing portal demands payment or a procedure is cancelled. Inspect the domain, verify the UPI, and call the hospital directly.',
  objectives = ARRAY['Identify fake medical billing portals', 'Verify hospital bills through official channels', 'Recognise insurance renewal SMS fraud']
WHERE id = 'oc-e-1';

UPDATE simulations SET
  card_desc  = 'You receive an official-looking job offer email from a prestigious company. They ask you to complete registration on a recruitment portal with a fee.',
  objectives = ARRAY['Identify recruitment scam patterns', 'Verify job offers through official channels', 'Know legitimate companies never charge job applicants']
WHERE id = 'ceo-v-job-1';

UPDATE simulations SET
  card_desc  = 'You receive a congratulations email about a scholarship you never applied for. A "verification link" asks for Aadhaar and a processing fee.',
  objectives = ARRAY['Spot unsolicited scholarship offers', 'Verify through official government portals', 'Never pay fees for legitimate scholarships']
WHERE id = 'ceo-v-scholarship-1';

UPDATE simulations SET
  card_desc  = 'You get an SMS claiming your exam results are ready with a link to check them. The fake portal asks for your university login credentials.',
  objectives = ARRAY['Identify phishing via SMS', 'Never click links in unsolicited messages', 'Access university portals directly']
WHERE id = 'ceo-v-exam-phone-1';

UPDATE simulations SET
  card_desc  = 'You receive an email claiming your exam results are ready. A "login link" is actually a phishing page asking for your credentials.',
  objectives = ARRAY['Identify phishing via email', 'Verify sender legitimacy', 'Access university portals directly']
WHERE id = 'ceo-v-exam-desktop-1';

UPDATE simulations SET
  card_desc  = 'A popular Instagram influencer is giving away iPhones. You just need to claim your prize via a link, which asks for a "handling fee."',
  objectives = ARRAY['Verify influencer accounts', 'Spot fake giveaways', 'Know real prizes never require upfront fees']
WHERE id = 'ceo-v-giveaway-1';


-- ── Step 2: Populate simulation_catalogue ─────────────────────────
-- Each row = one card in the category page grid
-- (simulation_id, category_route, age_group, level_order, duration, badge)

INSERT INTO simulation_catalogue (simulation_id, category_route, age_group, level_order, duration, badge) VALUES

  -- ── financial-security ──────────────────────────────────────────
  ('fs-v-otp-1',    'financial-security', 'student',      5, '10 min', 'New'),
  ('fs-v-kyc-1',    'financial-security', 'professional', 6, '10 min', 'New'),
  ('fs-v-otp-1',    'financial-security', 'professional', 7, '10 min', 'New'),
  ('fs-v-invest-1', 'financial-security', 'professional', 8, '12 min', 'New'),
  ('fs-v-kyc-1',    'financial-security', 'elderly',      4, '10 min', 'New'),
  ('fs-v-otp-1',    'financial-security', 'elderly',      5, '10 min', 'New'),
  ('fs-v-lottery-1','financial-security', 'elderly',      6, '10 min', 'New'),
  ('fs-v-pension-1','financial-security', 'elderly',      7, '10 min', 'New'),

  -- ── identity-impersonation ──────────────────────────────────────
  ('ii-s-1',                'identity-impersonation', 'student',      1, '8 min',  NULL),
  ('ii-s-2',                'identity-impersonation', 'student',      2, '10 min', NULL),
  ('ii-s-3',                'identity-impersonation', 'student',      3, '15 min', NULL),
  ('ii-fake-medical-1',     'identity-impersonation', 'student',      4, '12 min', 'New'),
  ('ii-urgency-pressure-1', 'identity-impersonation', 'student',      5, '15 min', 'New'),
  ('ii-p-1',                'identity-impersonation', 'professional', 1, '10 min', NULL),
  ('ii-authority-1',        'identity-impersonation', 'professional', 2, '15 min', 'New'),
  ('ii-fake-medical-1',     'identity-impersonation', 'professional', 3, '12 min', 'New'),
  ('ii-urgency-pressure-1', 'identity-impersonation', 'professional', 4, '15 min', 'New'),
  ('ii-relative-emergency-1','identity-impersonation','elderly',      1, '10 min', 'New'),
  ('ii-authority-1',        'identity-impersonation', 'elderly',      2, '15 min', 'New'),
  ('ii-fake-medical-1',     'identity-impersonation', 'elderly',      3, '12 min', 'New'),
  ('ii-urgency-pressure-1', 'identity-impersonation', 'elderly',      4, '15 min', 'New'),

  -- ── malware-device-safety ───────────────────────────────────────
  ('mal-virus-student',       'malware-device-safety', 'student',      1, '10 min', 'Interactive'),
  ('mal-virus-student-email', 'malware-device-safety', 'student',      2, '11 min', 'Interactive'),
  ('mal-adware-student',      'malware-device-safety', 'student',      3, '10 min', 'Interactive'),
  ('mal-trojan-student',      'malware-device-safety', 'student',      4, '14 min', 'Interactive'),
  ('mal-virus-pro',           'malware-device-safety', 'professional', 1, '10 min', 'Interactive'),
  ('mal-trojan-pro',          'malware-device-safety', 'professional', 2, '14 min', 'Interactive'),
  ('mal-ransomware-pro',      'malware-device-safety', 'professional', 3, '18 min', 'Interactive'),
  ('mal-virus-elderly',       'malware-device-safety', 'elderly',      1, '10 min', 'Interactive'),
  ('mal-adware-elderly',      'malware-device-safety', 'elderly',      2, '12 min', 'Interactive'),
  ('mal-ransomware-elderly',  'malware-device-safety', 'elderly',      3, '14 min', 'Interactive'),

  -- ── online-commerce-safety ──────────────────────────────────────
  ('oc-gaming-1',    'online-commerce-safety', 'student',      1, '10 min', NULL),
  ('oc-ecommerce-1', 'online-commerce-safety', 'student',      2, '12 min', NULL),
  ('oc-courier-1',   'online-commerce-safety', 'student',      3, '10 min', NULL),
  ('oc-ecommerce-1', 'online-commerce-safety', 'professional', 1, '12 min', NULL),
  ('oc-courier-1',   'online-commerce-safety', 'professional', 2, '10 min', NULL),
  ('oc-techsupport-1','online-commerce-safety','professional', 3, '14 min', NULL),
  ('oc-ecommerce-1', 'online-commerce-safety', 'elderly',      1, '12 min', NULL),
  ('oc-courier-1',   'online-commerce-safety', 'elderly',      2, '10 min', NULL),
  ('oc-techsupport-1','online-commerce-safety','elderly',      3, '14 min', NULL),

  -- ── career-education-opportunity ────────────────────────────────
  ('ceo-v-job-1',         'career-education-opportunity', 'student',      1, '12 min', 'New'),
  ('ceo-v-scholarship-1', 'career-education-opportunity', 'student',      2, '10 min', 'New'),
  ('ceo-v-exam-phone-1',  'career-education-opportunity', 'student',      3, '10 min', 'New'),
  ('ceo-v-exam-desktop-1','career-education-opportunity', 'student',      3, '10 min', 'New'),
  ('ceo-v-giveaway-1',    'career-education-opportunity', 'student',      4, '10 min', 'New'),
  ('ceo-v-job-1',         'career-education-opportunity', 'professional', 1, '12 min', 'New')

ON CONFLICT (simulation_id, category_route, age_group) DO UPDATE SET
  level_order = EXCLUDED.level_order,
  duration    = EXCLUDED.duration,
  badge       = EXCLUDED.badge;
