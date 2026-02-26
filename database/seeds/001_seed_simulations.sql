-- CyberRaksha Seed Data — Sample Simulations
-- Run with: psql $DATABASE_URL -f seeds/001_seed_simulations.sql

INSERT INTO simulations (title, category, difficulty_level, description) VALUES
('The Suspicious Email', 'phishing', 'beginner', 'You receive an urgent email from your bank asking to verify your account. What do you do?'),
('UPI Payment Trap', 'finance_scam', 'beginner', 'A stranger sends you ₹1 on UPI and asks you to scan a QR code to "receive" ₹10,000.'),
('Fake Job Offer', 'social_engineering', 'intermediate', 'You receive a WhatsApp message offering a high-paying remote job requiring an upfront registration fee.'),
('Ransomware Download', 'malware', 'intermediate', 'You find a free video converter online. What happens when you download and run the installer?'),
('OTP Sharing Scam', 'finance_scam', 'beginner', 'A caller claiming to be from your bank asks for the OTP sent to your phone to "reactivate" your account.'),
('USB Drive Attack', 'malware', 'advanced', 'You find a USB drive in the college parking lot labeled "Salary Slips Q3". You plug it into your laptop...');

-- Sample steps for simulation 1 (Phishing Email)
INSERT INTO simulation_steps (simulation_id, step_order, scenario_text, step_type) VALUES
(1, 1, 'You receive an email: "Dear Customer, Your SBI account has been suspended. Click here immediately to verify: http://sbi-secure-verify.com/login"  The email looks official with the SBI logo. What do you do?', 'decision'),
(1, 2, 'You clicked the link. The page looks exactly like the real SBI website. It asks for your User ID, Password, and ATM PIN. What do you do?', 'decision'),
(1, 3, '⚠️ You have entered your credentials on a fake website. Your account is now compromised. Here is what happened...', 'consequence');

-- Choices for step 1
INSERT INTO step_choices (step_id, choice_text, is_correct, consequence_text, explanation, prevention_tip, points, next_step_id) VALUES
(1, 'Click the link immediately — my account might be blocked!', FALSE, 'You were taken to a phishing website designed to steal your credentials.', 'Legitimate banks NEVER ask you to click links in emails to verify accounts. This is a classic phishing attack.', 'Always go directly to your bank website by typing the URL manually. Never click links in emails.', 0, 2),
(1, 'Check the sender email address carefully before doing anything', TRUE, 'Good move! The sender email is "support@sbi-verify-secure.com" — not the official sbi.co.in domain. This is fake.', 'Phishing emails always use fake domains that look similar to the real one. Always check the full email address.', 'The official SBI domain is sbi.co.in. Any other domain is suspicious.', 10, NULL),
(1, 'Delete the email and call SBI customer care directly on their official number', TRUE, 'Excellent! You avoided the trap by using the official contact channel.', 'When in doubt, always contact the organization directly using the number from their official website — not from the email.', 'Save official helpline numbers in your phone. Never trust phone numbers or links in unsolicited emails.', 15, NULL);

-- Sample quiz questions for simulation 1
INSERT INTO quiz_questions (simulation_id, question_text, option_a, option_b, option_c, option_d, correct_option, points, explanation) VALUES
(1, 'What is the first thing you should check in a suspicious email?', 'The subject line', 'The sender email address and domain', 'Whether it has attachments', 'The email body text', 'b', 5, 'The sender domain reveals if the email is from a legitimate source or a fraudster mimicking a real brand.'),
(1, 'Which of these is a red flag in a phishing email?', 'Personalized greeting with your name', 'Urgent language like "Act immediately or your account will be closed"', 'An email from the official domain', 'An email with no links', 'b', 5, 'Phishing emails create artificial urgency to make you act without thinking. Real banks do not threaten immediate account closure over email.'),
(1, 'What should you do if you accidentally clicked a phishing link?', 'Close the tab and ignore it', 'Change your passwords immediately and contact your bank', 'Scan your device and continue normally', 'Report it to your friend', 'b', 5, 'Immediately change all potentially compromised passwords and inform your bank so they can monitor for suspicious activity.');
