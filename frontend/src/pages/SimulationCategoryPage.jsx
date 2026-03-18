import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import s from './SimulationCategoryPage.module.css'

/* ─── SVG Icon system (consistent with rest of app) ─── */
const paths = {
  shield:      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>,
  arrowLeft:   <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  lock:        <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  clock:       <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  zap:         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  target:      <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  bookOpen:    <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  award:       <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
  bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  user:        <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  mail:        <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></>,
  phone:       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.12 1.05.37 2.05.7 3.01a2 2 0 01-.45 2.11L6.09 9a16 16 0 006.91 6.91l1.16-1.16a2 2 0 012.11-.45c.96.33 1.96.58 3.01.7A2 2 0 0122 16.92z"/>,
  cpu:         <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></>,
  shoppingBag: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>,
  trendingUp:  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  wifi:        <><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
  activity:    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  chevrRight:  <polyline points="9 18 15 12 9 6"/>,
}

function Icon({ name, size = 18, color = 'currentColor', w = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/* ─── Category metadata ─── */
const CATEGORY_META = {
  'financial-security': {
    id: 'financial-security',
    title: 'Financial Security',
    subtitle: 'Recognise and resist fraud targeting your money, banking, and payment systems.',
    icon: 'zap',
  },
  'identity-impersonation': {
    id: 'identity-impersonation',
    title: 'Identity & Impersonation',
    subtitle: 'Understand how attackers steal identities and impersonate trusted sources.',
    icon: 'eye',
  },
  'malware-device-safety': {
    id: 'malware-device-safety',
    title: 'Malware & Device Safety',
    subtitle: 'Learn how malicious software infects devices and how to stay protected.',
    icon: 'cpu',
  },
  'online-commerce-safety': {
    id: 'online-commerce-safety',
    title: 'Online Commerce Safety',
    subtitle: 'Navigate e-commerce fraud, fake listings, and unsafe payment gateways safely.',
    icon: 'shoppingBag',
  },
  'career-education-opportunity': {
    id: 'career-education-opportunity',
    title: 'Career, Education & Opportunity',
    subtitle: 'Spot fraudulent job offers, fake scholarships, and educational scams before they strike.',
    icon: 'trendingUp',
  },
}

/* ─── Simulation content
    Structure: SIMULATIONS[categoryId][ageGroup] = array of simulation objects
    Each simulation: { id, level, difficulty, title, desc, duration, objectives }
─── */
const SIMULATIONS = {
  'financial-security': {
    student: [

      {
        id: 'fs-v-otp-1', level: 5, difficulty: 'beginner',
        title: 'OTP Sharing Fraud',
        desc: 'Your bank calls asking for an OTP to verify your identity. Realise why sharing an OTP is always a mistake — it authorises transactions.',
        duration: '10 min', objectives: ['Understand OTP security', 'Identify vishing attacks', 'Know the correct bank verification process'],
        badge: 'New',
      },

    ],
    professional: [

      {
        id: 'fs-v-kyc-1', level: 6, difficulty: 'beginner',
        title: 'Bank KYC Update Scam',
        desc: 'Your bank sends an SMS asking to update KYC details with a link. Spot the phishing attempt and verify through official channels.',
        duration: '10 min', objectives: ['Identify SMS phishing patterns', 'Verify bank communications', 'Know when banks ask for documentation'],
        badge: 'New',
      },
      {
        id: 'fs-v-otp-1', level: 7, difficulty: 'beginner',
        title: 'OTP Sharing Fraud',
        desc: 'Your bank calls asking for an OTP to verify your identity. Realise why sharing an OTP is always a mistake — it authorises transactions.',
        duration: '10 min', objectives: ['Understand OTP security', 'Identify vishing attacks', 'Know the correct bank verification process'],
        badge: 'New',
      },
      {
        id: 'fs-v-invest-1', level: 8, difficulty: 'advanced',
        title: 'Investment / Trading Scam',
        desc: 'An ad promises 50% monthly returns on a trading platform. Screenshot profits flood a group. Spot the manufactured trust and fee escalation patterns.',
        duration: '12 min', objectives: ['Identify investment red flags', 'Verify regulatory registration', 'Test withdrawals before depositing large sums'],
        badge: 'New',
      },
    ],
    elderly: [
      {
        id: 'fs-v-kyc-1', level: 4, difficulty: 'beginner',
        title: 'Bank KYC Update Scam',
        desc: 'Your bank sends an SMS asking to update KYC details with a link. Spot the phishing attempt and verify through official channels.',
        duration: '10 min', objectives: ['Identify SMS phishing patterns', 'Verify bank communications', 'Know when banks ask for documentation'],
        badge: 'New',
      },
      {
        id: 'fs-v-otp-1', level: 5, difficulty: 'beginner',
        title: 'OTP Sharing Fraud',
        desc: 'Your bank calls asking for an OTP to verify your identity. Realise why sharing an OTP is always a mistake — it authorises transactions.',
        duration: '10 min', objectives: ['Understand OTP security', 'Identify vishing attacks', 'Know the correct bank verification process'],
        badge: 'New',
      },
      {
        id: 'fs-v-lottery-1', level: 6, difficulty: 'beginner',
        title: 'Lottery / Prize Scam',
        desc: 'You receive an SMS claiming you won a lottery. A link asks for a "processing fee" to claim your ₹5,00,000 prize. Spot the advance-fee trap.',
        duration: '10 min', objectives: ['Identify advance-fee fraud', 'Recognise lottery scam patterns', 'Know you cannot win a lottery you didn\'t enter'],
        badge: 'New',
      },
      {
        id: 'fs-v-pension-1', level: 7, difficulty: 'beginner',
        title: 'Pension / Government Benefits Scam',
        desc: 'A fake government portal asks for your Aadhaar and bank details to verify your pension. Spot the domain spoofing and verify through official channels.',
        duration: '10 min', objectives: ['Identify government portal phishing', 'Verify government communications', 'Protect Aadhaar and banking details'],
        badge: 'New',
      },
    ],
  },

  'identity-impersonation': {
    student: [
      {
        id: 'ii-s-1', level: 1, difficulty: 'beginner',
        title: 'Fake College Admin Account',
        desc: 'An Instagram account impersonating your college admin is asking students to submit personal details for a "scholarship portal." Spot the fake.',
        duration: '8 min', objectives: ['Verify official social accounts', 'Identify information harvesting', 'Report impersonation attempts'],
      },
      {
        id: 'ii-s-2', level: 2, difficulty: 'intermediate',
        title: 'WhatsApp Classmate Impersonation',
        desc: 'A contact using your classmate\'s photo and name asks to borrow money urgently. Their real number was recently changed. Verify before you act.',
        duration: '10 min', objectives: ['Verify identity through secondary channels', 'Recognise account takeover signs', 'Respond without escalating risk'],
      },
      {
        id: 'ii-s-3', level: 3, difficulty: 'advanced',
        title: 'Aadhaar Identity Theft',
        desc: 'Your Aadhaar details were shared carelessly. Walk through how an attacker could misuse them and what protective steps you can take immediately.',
        duration: '15 min', objectives: ['Understand Aadhaar misuse vectors', 'Lock Aadhaar biometrics correctly', 'File an identity theft complaint'],
      },
      {
        id: 'ii-fake-medical-1', level: 4, difficulty: 'intermediate',
        title: 'Fake Medical Assistance Scam',
        desc: 'A spoofed hospital billing portal demands urgent payment or a procedure is cancelled. Inspect the domain, verify the UPI ID, and call the hospital directly.',
        duration: '12 min', objectives: [
          'Identify fake medical billing portals',
          'Verify hospital bills through official channels',
          'Recognise insurance renewal SMS fraud',
        ],
        targetGroups: ['Professionals', 'Elderly', 'Students'],
        badge: 'New',
      },
      {
        id: 'ii-urgency-pressure-1', level: 5, difficulty: 'advanced',
        title: 'Urgency Pressure Attack',
        desc: 'Simultaneous email, SMS and phone calls claim your bank account will be frozen in 10 minutes. A live countdown runs as you decide what to do.',
        duration: '15 min', objectives: [
          'Identify multi-channel coordinated social engineering',
          'Recognise manufactured urgency as a manipulation tool',
          'Respond correctly after credentials are compromised',
        ],
        targetGroups: ['Professionals', 'Elderly', 'Students'],
        badge: 'New',
      },
    ],
    professional: [
      {
        id: 'ii-p-1', level: 1, difficulty: 'beginner',
        title: 'LinkedIn Profile Cloning',
        desc: 'Someone has cloned your LinkedIn profile and is approaching your contacts. Identify, report, and mitigate the reputational damage.',
        duration: '10 min', objectives: ['Detect profile cloning', 'Alert contacts safely', 'Use LinkedIn reporting tools'],
      },
      {
        id: 'ii-authority-1', level: 2, difficulty: 'intermediate',
        title: 'Authority Impersonation Scam',
        desc: 'A threatening Income Tax email, a TRAI officer\'s call, and a fake government portal all target you in one campaign. Navigate each step without losing money or data.',
        duration: '15 min', objectives: [
          'Spot spoofed government email domains',
          'Respond safely to authority impersonation calls',
          'Verify government portals using .gov.in domains',
        ],
        targetGroups: ['Professionals', 'Elderly'],
        badge: 'New',
      },
      {
        id: 'ii-fake-medical-1', level: 3, difficulty: 'intermediate',
        title: 'Fake Medical Assistance Scam',
        desc: 'A spoofed hospital billing portal demands ₹12,800 within 2 hours or your procedure is cancelled. Inspect the domain, verify the UPI, and call the hospital directly.',
        duration: '12 min', objectives: [
          'Identify fake medical billing portals',
          'Verify hospital bills through official channels',
          'Recognise insurance renewal SMS fraud',
        ],
        targetGroups: ['Professionals', 'Elderly', 'Students'],
        badge: 'New',
      },
      {
        id: 'ii-urgency-pressure-1', level: 4, difficulty: 'advanced',
        title: 'Urgency Pressure Attack',
        desc: 'Simultaneous email, SMS and phone calls claim your account will be frozen in 10 minutes. A live countdown runs as you decide. Test your response under maximum pressure.',
        duration: '15 min', objectives: [
          'Identify multi-channel coordinated social engineering',
          'Recognise manufactured urgency as a manipulation tool',
          'Respond correctly after credentials are compromised',
        ],
        targetGroups: ['Professionals', 'Elderly', 'Students'],
        badge: 'New',
      },
    ],
    elderly: [
      {
        id: 'ii-relative-emergency-1', level: 1, difficulty: 'beginner',
        title: 'Relative Emergency Scam',
        desc: 'A WhatsApp message and call claim your son is at the police station needing urgent bail money. Panic sets in — but so does suspicion. Navigate it.',
        duration: '10 min', objectives: [
          'Recognise the "don\'t call my real number" trick',
          'Verify identity through an independent channel',
          'Protect others about to be scammed',
        ],
        targetGroups: ['Elderly'],
        badge: 'New',
      },
      {
        id: 'ii-authority-1', level: 2, difficulty: 'intermediate',
        title: 'Authority Impersonation Scam',
        desc: 'A threatening Income Tax email, a TRAI officer\'s call, and a fake government portal — all in one scam campaign. Walk through each interactive step.',
        duration: '15 min', objectives: [
          'Spot spoofed government email domains',
          'Respond safely to authority impersonation calls',
          'Verify government portals using .gov.in domains',
        ],
        targetGroups: ['Professionals', 'Elderly'],
        badge: 'New',
      },
      {
        id: 'ii-fake-medical-1', level: 3, difficulty: 'intermediate',
        title: 'Fake Medical Assistance Scam',
        desc: 'A spoofed hospital billing portal demands urgent payment or a procedure is cancelled. The domain, UPI and timer are all fabricated.',
        duration: '12 min', objectives: [
          'Identify fake medical billing portals',
          'Verify hospital bills through official channels',
          'Recognise insurance renewal SMS fraud',
        ],
        targetGroups: ['Professionals', 'Elderly', 'Students'],
        badge: 'New',
      },
      {
        id: 'ii-urgency-pressure-1', level: 4, difficulty: 'advanced',
        title: 'Urgency Pressure Attack',
        desc: 'Simultaneous email, SMS and phone calls claim your account will be frozen in 10 minutes. A live countdown runs as pressure mounts. Test your composure.',
        duration: '15 min', objectives: [
          'Identify multi-channel coordinated social engineering',
          'Recognise manufactured urgency as a manipulation tool',
          'Respond correctly after credentials are compromised',
        ],
        targetGroups: ['Professionals', 'Elderly', 'Students'],
        badge: 'New',
      },
    ],
  },

  'malware-device-safety': {
    /* ── STUDENT: Virus (USB + email), Adware, Trojan ── */
    student: [
      {
        id: 'mal-virus-student', level: 1, difficulty: 'beginner',
        title: 'Computer Virus: USB Autorun',
        desc: 'A classmate hands you a USB drive with "notes". Plugging it in triggers an autorun script that tries to spread across your folders. See what happens before you click.',
        duration: '10 min', objectives: ['Understand USB autorun virus mechanics', 'Identify autorun-based infection vectors', 'Respond correctly to a friend\'s infected device'],
        badge: 'Interactive',
      },
      {
        id: 'mal-virus-student-email', level: 2, difficulty: 'beginner',
        title: 'Computer Virus: Email Attachment Trap',
        desc: 'A forwarded exam-material email includes a "viewer" attachment that asks for macros. Interact with the inbox and document warning before the virus spreads.',
        duration: '11 min', objectives: ['Identify suspicious email domains and attachments', 'Handle macro warnings safely on desktop', 'Contain spread after a macro-based infection'],
        badge: 'Interactive',
      },
      {
        id: 'mal-adware-student', level: 3, difficulty: 'beginner',
        title: 'Adware & PUP: Browser Hijack',
        desc: 'A free desktop converter bundles a toolbar and search hijacker. Use the browser-style simulation to spot red flags and prevent popup-storm infections.',
        duration: '10 min', objectives: ['Identify bundled adware in free installers', 'Recognise browser hijack indicators', 'Remove PUPs and restore browser settings safely'],
        badge: 'Interactive',
      },
      {
        id: 'mal-trojan-student', level: 4, difficulty: 'intermediate',
        title: 'Trojan Horse: Cracked Game Download',
        desc: 'A free download of a paid game looks professional — verified badges, thousands of reviews. Click through the installer and watch what silently installs alongside the game.',
        duration: '14 min', objectives: ['Identify Trojan payloads in free software installers', 'Read installer screens before clicking Next', 'Detect and remove a keylogger from your system'],
        badge: 'Interactive',
      },
    ],
    /* ── PROFESSIONAL: Virus (beginner) + Trojan (intermediate) + Ransomware (advanced) ── */
    professional: [
      {
        id: 'mal-virus-pro', level: 1, difficulty: 'beginner',
        title: 'Computer Virus: Office Macro Attack',
        desc: 'A vendor email arrives with a Word attachment that "requires macros". Enabling them triggers a virus that spreads itself across your organisation\'s contact list in seconds.',
        duration: '10 min', objectives: ['Identify spoofed sender domains', 'Understand how macro viruses spread', 'Contain an active email virus in a corporate setting'],
        badge: 'Interactive',
      },
      {
        id: 'mal-trojan-pro', level: 2, difficulty: 'intermediate',
        title: 'Trojan Horse: Fake IT Security Patch',
        desc: 'An urgent email from "IT Support" links to a critical Windows patch. The installer looks like Microsoft. A Remote Access Trojan installs alongside — giving attackers full system control.',
        duration: '14 min', objectives: ['Verify patch authenticity before installing', 'Identify Remote Access Trojan (RAT) behaviour', 'Execute incident response for a RAT compromise'],
        badge: 'Interactive',
      },
      {
        id: 'mal-ransomware-pro', level: 3, difficulty: 'advanced',
        title: 'Ransomware: Office File Encryption',
        desc: 'Files on your work desktop begin locking one by one. A ransom note appears with a countdown timer. Every second you stay connected, more files — including shared drives — are at risk.',
        duration: '18 min', objectives: ['Respond to live ransomware encryption in real time', 'Isolate the infected machine before network spread', 'Recover using backups — not by paying the ransom'],
        badge: 'Interactive',
      },
    ],
    /* ── ELDERLY: Virus (beginner) + Ransomware (advanced) + Adware (beginner) ── */
    elderly: [
      {
        id: 'mal-virus-elderly', level: 1, difficulty: 'beginner',
        title: 'Computer Virus: Forwarded Email Trap',
        desc: 'A trusted family member forwards a "government health scheme" email with an attachment. The file is a virus that silently spreads itself to your contact list the moment you open it.',
        duration: '10 min', objectives: ['Recognise virus delivery through trusted contacts', 'Verify government scheme authenticity before opening', 'Help a family member clean an infected device'],
        badge: 'Interactive',
      },
      {
        id: 'mal-adware-elderly', level: 2, difficulty: 'beginner',
        title: 'Adware: Fake App from Outside Play Store',
        desc: 'A "free flashlight app" arrives as an APK via WhatsApp. After install it floods your screen with ads every 15 seconds, requests access to your contacts and location, and triggers fake support calls.',
        duration: '12 min', objectives: ['Identify dangerous app permissions', 'Understand APK sideloading risks', 'Remove adware apps and stop fake support scams'],
        badge: 'Interactive',
      },
      {
        id: 'mal-ransomware-elderly', level: 3, difficulty: 'advanced',
        title: 'Ransomware: Phone Locked by Fake Police',
        desc: 'A WhatsApp APK installs ransomware that locks your Android screen with a fake Ministry of Home Affairs notice demanding ₹3,500. It looks official. It is entirely fake.',
        duration: '14 min', objectives: ['Identify government impersonation screen-locker ransomware', 'Remove mobile ransomware using Android Safe Mode', 'Report UPI fraud and recover from a payment mistake'],
        badge: 'Interactive',
      },
    ],
  },

    'online-commerce-safety': {

    /* ── STUDENT: sees Gaming Account + Fake E-commerce + Courier Delivery ── */
    student: [
      {
        id: 'oc-gaming-1',
        level: 1,
        difficulty: 'beginner',
        title: 'Gaming Account Scam',
        desc: 'A Discord message promises free in-game skins via a giveaway link. Clicking it opens a fake gaming login page that harvests your credentials.',
        duration: '10 min',
        objectives: [
          'Identify phishing via gaming chat platforms',
          'Recognise fake login page indicators',
          'Protect gaming account credentials',
        ],
        targetGroups: ['Students'],
      },
      {
        id: 'oc-ecommerce-1',
        level: 2,
        difficulty: 'beginner',
        title: 'Fake E-commerce Scam',
        desc: 'A social media ad promises 90% off on branded shoes. Clicking it opens a convincing fake store that collects payment details and never ships the product.',
        duration: '12 min',
        objectives: [
          'Spot unrealistic discounts and fake urgency tactics',
          'Verify e-commerce domain and seller authenticity',
          'Identify fake reviews and countdown pressure',
        ],
        targetGroups: ['Students', 'Professionals', 'Elderly'],
      },
      {
        id: 'oc-courier-1',
        level: 3,
        difficulty: 'beginner',
        title: 'Courier Delivery Scam',
        desc: 'An SMS claims your package delivery failed and asks you to pay a ₹99 re-delivery fee via a link. The link leads to a fake courier site that steals your card details.',
        duration: '10 min',
        objectives: [
          'Identify SMS phishing (smishing) in delivery contexts',
          'Verify courier communication through official apps',
          'Never pay re-delivery fees via SMS links',
        ],
        targetGroups: ['Students', 'Professionals', 'Elderly'],
      },
    ],

    /* ── PROFESSIONAL: sees Fake E-commerce + Courier Delivery + Fake Tech Support ── */
    professional: [
      {
        id: 'oc-ecommerce-1',
        level: 1,
        difficulty: 'beginner',
        title: 'Fake E-commerce Scam',
        desc: 'A social media ad promises 90% off on branded shoes. Clicking it opens a convincing fake store that collects payment details and never ships the product.',
        duration: '12 min',
        objectives: [
          'Spot unrealistic discounts and fake urgency tactics',
          'Verify e-commerce domain and seller authenticity',
          'Identify fake reviews and countdown pressure',
        ],
        targetGroups: ['Students', 'Professionals', 'Elderly'],
      },
      {
        id: 'oc-courier-1',
        level: 2,
        difficulty: 'beginner',
        title: 'Courier Delivery Scam',
        desc: 'An SMS claims your package delivery failed and asks you to pay a ₹99 re-delivery fee via a link. The link leads to a fake courier site that steals your card details.',
        duration: '10 min',
        objectives: [
          'Identify SMS phishing (smishing) in delivery contexts',
          'Verify courier communication through official apps',
          'Never pay re-delivery fees via SMS links',
        ],
        targetGroups: ['Students', 'Professionals', 'Elderly'],
      },
      {
        id: 'oc-techsupport-1',
        level: 3,
        difficulty: 'intermediate', 
        title: 'Fake Tech Support Scam',
        desc: 'While browsing, a fullscreen popup warns your computer is infected and displays a tech support number. Calling it connects you to scammers who ask for remote access and payment.',
        duration: '14 min',
        objectives: [
          'Identify fake security alert popups in browsers',
          'Understand why legitimate companies never cold-call for support',
          'Safely close rogue browser warnings without calling the number',
        ],
        targetGroups: ['Professionals', 'Elderly'],
      },
    ],

    /* ── ELDERLY: sees Fake E-commerce + Courier Delivery + Fake Tech Support ── */
    elderly: [
      {
        id: 'oc-ecommerce-1',
        level: 1,
        difficulty: 'beginner',
        title: 'Fake E-commerce Scam',
        desc: 'A social media ad promises 90% off on branded shoes. Clicking it opens a convincing fake store that collects payment details and never ships the product.',
        duration: '12 min',
        objectives: [
          'Spot unrealistic discounts and fake urgency tactics',
          'Verify e-commerce domain and seller authenticity',
          'Identify fake reviews and countdown pressure',
        ],
        targetGroups: ['Students', 'Professionals', 'Elderly'],
      },
      {
        id: 'oc-courier-1',
        level: 2,
        difficulty: 'beginner',
        title: 'Courier Delivery Scam',
        desc: 'An SMS claims your package delivery failed and asks you to pay a ₹99 re-delivery fee via a link. The link leads to a fake courier site that steals your card details.',
        duration: '10 min',
        objectives: [
          'Identify SMS phishing (smishing) in delivery contexts',
          'Verify courier communication through official apps',
          'Never pay re-delivery fees via SMS links',
        ],
        targetGroups: ['Students', 'Professionals', 'Elderly'],
      },
      {
        id: 'oc-techsupport-1',
        level: 3,
        difficulty: 'intermediate',
        title: 'Fake Tech Support Scam',
        desc: 'While browsing, a fullscreen popup warns your computer is infected and displays a tech support number. Calling it connects you to scammers who ask for remote access and payment.',
        duration: '14 min',
        objectives: [
          'Identify fake security alert popups in browsers',
          'Understand why legitimate companies never cold-call for support',
          'Safely close rogue browser warnings without calling the number',
        ],
        targetGroups: ['Professionals', 'Elderly'],
      },
    ],
  },

  'career-education-opportunity': {
    student: [
      {
        id: 'ceo-v-job-1', level: 1, difficulty: 'intermediate',
        title: 'Fake Job Offer Scam',
        desc: 'You receive an official-looking job offer email from a prestigious company. They ask you to complete registration on a recruitment portal with a fee.',
        duration: '12 min', objectives: ['Identify recruitment scam patterns', 'Verify job offers through official channels', 'Know legitimate companies never charge job applicants'],
        badge: 'New',
      },
      {
        id: 'ceo-v-scholarship-1', level: 2, difficulty: 'beginner',
        title: 'Scholarship Scam',
        desc: 'You receive a congratulations email about a scholarship you never applied for. A "verification link" asks for Aadhaar and a processing fee.',
        duration: '10 min', objectives: ['Spot unsolicited scholarship offers', 'Verify through official government portals', 'Never pay fees for legitimate scholarships'],
        badge: 'New',
      },
      {
        id: 'ceo-v-exam-phone-1', level: 3, difficulty: 'beginner',
        title: 'Exam Result Phishing (Phone)',
        desc: 'You get an SMS claiming your exam results are ready with a link to check them. The fake portal asks for your university login credentials.',
        duration: '10 min', objectives: ['Identify phishing via SMS', 'Never click links in unsolicited messages', 'Access university portals directly'],
        badge: 'New',
      },
      {
        id: 'ceo-v-exam-desktop-1', level: 3, difficulty: 'beginner',
        title: 'Exam Result Phishing (Desktop)',
        desc: 'You receive an email claiming your exam results are ready. A "login link" is actually a phishing page asking for your credentials.',
        duration: '10 min', objectives: ['Identify phishing via email', 'Verify sender legitimacy', 'Access university portals directly'],
        badge: 'New',
      },
      {
        id: 'ceo-v-giveaway-1', level: 4, difficulty: 'beginner',
        title: 'Giveaway / Influencer Scam',
        desc: 'A popular Instagram influencer is giving away iPhones. You just need to claim your prize via a link, which asks for a "handling fee."',
        duration: '10 min', objectives: ['Verify influencer accounts', 'Spot fake giveaways', 'Know real prizes never require upfront fees'],
        badge: 'New',
      },
    ],
    professional: [
      {
        id: 'ceo-v-job-1', level: 1, difficulty: 'intermediate',
        title: 'Fake Job Offer Scam',
        desc: 'You receive an official-looking job offer email from a prestigious company. They ask you to complete registration on a recruitment portal with a fee.',
        duration: '12 min', objectives: ['Identify recruitment scam patterns', 'Verify job offers through official channels', 'Know legitimate companies never charge job applicants'],
        badge: 'New',
      },
    ],
    elderly: [],
  },
}

/* ─── Difficulty label & colour ─── */
const DIFF_META = {
  beginner:     { label: 'Beginner',     color: '#2EB87A', bg: 'rgba(46,184,122,0.10)' },
  intermediate: { label: 'Intermediate', color: '#D4891A', bg: 'rgba(212,137,26,0.10)' },
  advanced:     { label: 'Advanced',     color: '#C94E4E', bg: 'rgba(201,78,78,0.10)' },
}

/* ─── Expertise → which difficulties are unlocked ─── */
const UNLOCKED = {
  beginner:     ['beginner',],
  intermediate: ['beginner', 'intermediate'],
  advanced:     ['beginner', 'intermediate', 'advanced'],
}

/* ─── Mock current user (replace with real auth context later) ─── */
const MOCK_USER = {
  name: 'User',
  userId: 'CR-8802',
  ageGroup: 'student',       // 'student' | 'professional' | 'elderly'
  expertise: 'advanced', // 'beginner' | 'intermediate' | 'advanced'
  completedIds: ['fs-s-1'],  // IDs of completed simulations
}

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════ */
export default function SimulationCategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  // In a real app these come from auth context / API
  const user = MOCK_USER
  const [completed, setCompleted] = useState(new Set(user.completedIds))

  const meta = CATEGORY_META[categoryId]
  const sims = SIMULATIONS[categoryId]?.[user.ageGroup] ?? []
  const unlockedDiffs = UNLOCKED[user.expertise]

  // Scroll to top on category change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [categoryId])

  if (!meta) {
    return (
      <div className={s.notFound}>
        <p>Category not found.</p>
        <Link to="/dashboard">← Back to Dashboard</Link>
      </div>
    )
  }

  const handleComplete = (simId) => {
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(simId)
      return next
    })
    // TODO: POST /api/progress/complete { simulation_id: simId }
  }

  const completedCount = sims.filter(sim => completed.has(sim.id)).length

  return (
    <div className={s.root}>
      {/* Ambient background (consistent with other pages) */}
      <div className={s.noiseBg} aria-hidden />
      <div className={s.ambientTop} aria-hidden />

      {/* ── TOPBAR ── */}
      <header className={s.topbar}>
        <div className={s.topbarWrap}>
          <Link to="/" className={s.topbarLogo}>
            <div className={s.logoMark}>
              <Icon name="shield" size={14} color="#D4891A" w={2.2} />
            </div>
            <span>Cyber<strong>Raksha</strong></span>
          </Link>

          <div className={s.topbarRight}>
            <button className={s.topbarIcon} aria-label="Notifications">
              <Icon name="bell" size={18} color="var(--text-3)" />
            </button>
            <div className={s.topbarUser}>
              <div className={s.topbarUserInfo}>
                <span className={s.topbarUserName}>{user.name}</span>
                <span className={s.topbarUserId}>ID: {user.userId}</span>
              </div>
              <div className={s.topbarAvatar}>
                <Icon name="user" size={16} color="var(--text-2)" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className={s.main}>
        <div className={s.mainWrap}>

          {/* Breadcrumb */}
          <nav className={s.breadcrumb}>
            <Link to="/dashboard" className={s.breadcrumbBack}>
              <Icon name="arrowLeft" size={14} color="var(--text-3)" />
              Dashboard
            </Link>
            <span className={s.breadcrumbSep}>/</span>
            <span className={s.breadcrumbCurrent}>{meta.title}</span>
          </nav>

          {/* Page header */}
          <div className={s.pageHeader}>
            <div className={s.pageHeaderLeft}>
              <div className={s.categoryIconWrap}>
                <Icon name={meta.icon} size={22} color="var(--amber)" w={1.5} />
              </div>
              <div>
                <p className={s.eyebrow}>Simulation Category</p>
                <h1 className={s.pageTitle}>{meta.title}</h1>
                <p className={s.pageSubtitle}>{meta.subtitle}</p>
              </div>
            </div>

            {/* Progress summary */}
            <div className={s.progressSummary}>
              <div className={s.progressRing}>
                <svg viewBox="0 0 48 48" width="56" height="56">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border-lt)" strokeWidth="3.5"/>
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--amber)" strokeWidth="3.5"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - completedCount / Math.max(sims.length, 1))}`}
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                </svg>
                <div className={s.progressRingText}>
                  <span className={s.progressRingNum}>{completedCount}</span>
                  <span className={s.progressRingDen}>/{sims.length}</span>
                </div>
              </div>
              <div className={s.progressMeta}>
                <span className={s.progressLabel}>Completed</span>
                <span className={s.progressSub}>{sims.length - completedCount} remaining</span>
              </div>
            </div>
          </div>

          {/* User context pill */}
          <div className={s.contextPill}>
            <div className={s.contextItem}>
              <Icon name="user" size={12} color="var(--text-3)" />
              <span>{user.ageGroup === 'student' ? 'Student' : user.ageGroup === 'professional' ? 'Professional' : 'Senior Citizen'}</span>
            </div>
            <div className={s.contextDot} />
            <div className={s.contextItem}>
              <Icon name="target" size={12} color={DIFF_META[user.expertise].color} />
              <span style={{ color: DIFF_META[user.expertise].color }}>
                {DIFF_META[user.expertise].label} access
              </span>
            </div>
            <div className={s.contextDot} />
            <div className={s.contextItem}>
              <Icon name="award" size={12} color="var(--text-3)" />
              <span>Higher levels unlock as you progress</span>
            </div>
          </div>

          {/* ── SIMULATION GRID ── */}
          <section className={s.simSection}>
            <h2 className={s.simSectionTitle}>
              Choose your simulation
            </h2>

            <div className={s.simGrid}>
              {sims.map((sim) => {
                const isUnlocked = unlockedDiffs.includes(sim.difficulty)
                const isDone = completed.has(sim.id)
                const diff = DIFF_META[sim.difficulty]

                return (
                  <div
                    key={sim.id}
                    className={`${s.simCard} ${!isUnlocked ? s.simCardLocked : ''} ${isDone ? s.simCardDone : ''}`}
                  >
                    {/* Lock overlay */}
                    {!isUnlocked && (
                      <div className={s.lockOverlay}>
                        <div className={s.lockIconWrap}>
                          <Icon name="lock" size={20} color="var(--text-3)" w={1.8} />
                        </div>
                        <span className={s.lockMsg}>
                          Reach <strong>{sim.difficulty}</strong> level to unlock
                        </span>
                      </div>
                    )}

                    {/* Done tick */}
                    {isDone && (
                      <div className={s.doneBadge}>
                        <Icon name="checkCircle" size={14} color="#2EB87A" w={2} />
                        Completed
                      </div>
                    )}

                    {/* Card top row */}
                    <div className={s.simCardTop}>
                      <span className={s.simLevel}>Level {sim.level}</span>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        {sim.badge && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                            padding: '2px 7px', borderRadius: 4,
                            background: 'rgba(212,137,26,0.15)',
                            color: 'var(--amber-lt)',
                            border: '1px solid rgba(212,137,26,0.3)',
                            textTransform: 'uppercase',
                          }}>{sim.badge}</span>
                        )}
                        {isUnlocked && (
                          <span className={s.simDiff} style={{ color: diff.color, background: diff.bg }}>
                            {diff.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & desc */}
                    <h3 className={s.simTitle}>{sim.title}</h3>
                    <p className={s.simDesc}>{sim.desc}</p>

                    {/* Objectives */}
                    {isUnlocked && (
                      <ul className={s.simObjectives}>
                        {sim.objectives.map((obj, i) => (
                          <li key={i}>
                            <Icon name="chevrRight" size={12} color="var(--amber)" w={2} />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Footer */}
                    <div className={s.simCardFooter}>
                      {isUnlocked && (
                        <div className={s.simMeta}>
                          <Icon name="clock" size={13} color="var(--text-3)" />
                          <span>{sim.duration}</span>
                        </div>
                      )}

                      {isUnlocked ? (
                        isDone ? (
                          <button className={s.btnReview} onClick={() => navigate(`/simulation/${sim.id}`)}>
                            Review <Icon name="arrowRight" size={13} />
                          </button>
                        ) : (
                          <button className={s.btnStart} onClick={() => {
                            // Mark as complete for demo; real app navigates to sim page
                            handleComplete(sim.id)
                            navigate(`/simulation/${sim.id}`)
                          }}>
                            Start <Icon name="arrowRight" size={13} />
                          </button>
                        )
                      ) : (
                        <button className={s.btnLocked} disabled>
                          <Icon name="lock" size={13} color="var(--text-3)" />
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── OTHER CATEGORIES ── */}
          <section className={s.otherSection}>
            <h2 className={s.otherTitle}>Other categories</h2>
            <div className={s.otherGrid}>
              {Object.values(CATEGORY_META)
                .filter(c => c.id !== categoryId)
                .map(cat => (
                  <Link key={cat.id} to={`/category/${cat.id}`} className={s.otherCard}>
                    <div className={s.otherIconWrap}>
                      <Icon name={cat.icon} size={16} color="var(--amber)" w={1.5} />
                    </div>
                    <span className={s.otherLabel}>{cat.title}</span>
                    <Icon name="chevrRight" size={14} color="var(--text-3)" />
                  </Link>
                ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
