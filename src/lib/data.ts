import type { User, LawyerProfile, Document, ChatHistory, Client } from './types'

// ─── Demo Accounts ────────────────────────────────────────────────────────────

export const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  'demo@lexportal.ph': {
    password: 'demo1234',
    user: {
      id: 'user-1',
      email: 'demo@lexportal.ph',
      name: 'Juan dela Cruz',
      role: 'user',
      avatar: 'JD',
      plan: 'free',
    },
  },
  'atty.santos@lexportal.ph': {
    password: 'lawyer1234',
    user: {
      id: 'lawyer-cagara',
      email: 'atty.santos@lexportal.ph',
      name: 'Atty. Marcelo Cagara',
      role: 'lawyer',
      avatar: 'MC',
    },
  },
}

// ─── Lawyer Data ──────────────────────────────────────────────────────────────

export const LAWYERS: Record<string, LawyerProfile> = {
  cagara: {
    id: 'cagara',
    initials: 'MC',
    name: 'Atty. Marcelo Cagara',
    title: 'Legal Consultant & Attorney',
    specialization: 'Corporate & Civil Law',
    location: 'BGC, Taguig City',
    roll: 'SC Roll No. 72143',
    experience: '15 yrs experience',
    rating: 5.0,
    reviewCount: 342,
    caseCount: '1,200+',
    responseRate: '100%',
    price: '₱2,500',
    about:
      'Atty. Marcelo Cagara is a distinguished legal professional with over 15 years of experience in corporate law, civil litigation, and strategic legal consulting. He has handled high-profile cases and advised numerous startups on scaling their legal infrastructure. He is a senior partner and leads the digital transformation task force for legal services.',
    specializations: [
      { title: 'Corporate Law', subtitle: 'SEC, compliance, structuring', proficiency: 98, color: '#1428AE' },
      { title: 'Civil Litigation', subtitle: 'RTC, CA, Supreme Court', proficiency: 95, color: '#F4AB1F' },
      { title: 'Legal Strategy', subtitle: 'Consulting, risk management', proficiency: 90, color: '#0F6E56' },
      { title: 'Digital Transformation', subtitle: 'Legal tech, E-governance', proficiency: 85, color: '#534AB7' },
    ],
    caseTags: [
      'Corporate law', 'Civil litigation', 'Joint ventures',
      'Legal consulting', 'Risk management', 'Tech law',
      'Contract strategy', 'Dispute resolution', 'M&A advisory',
    ],
    languages: ['Filipino', 'English'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — Ateneo Law School', subtitle: 'With Honors', date: 'Graduated 2008' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'SC Roll No. 72143', date: '2009 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'Makati Chapter', date: 'Member since 2009' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'JD', reviewerName: 'Juan D.', rating: 5, text: 'Atty. Cagara provided exceptional legal advice for our company restructuring. His strategic approach saved us months of delay.', date: 'March 2026', caseType: 'Corporate Restructuring' },
    ],
    slots: [
      { id: '1', date: 'Mon Mar 17', time: '9:00 AM', type: 'video', status: 'available' },
      { id: '2', date: 'Tue Mar 18', time: '11:00 AM', type: 'video', status: 'available' },
    ],
    address: '8th Avenue, BGC, Taguig City',
    website: 'www.cagaralaw.ph',
    phone: '+63 917 XXX XXXX',
    thisMonthEarnings: '₱120,000',
    totalClients: 1200,
    upcomingConsultations: 8,
  },
  santos: {
    id: 'santos',
    initials: 'MM',
    name: 'Atty. Maria M. Santos',
    title: 'Corporate & Business Law Attorney',
    specialization: 'Corporate & Business Law',
    location: 'Makati City, Metro Manila',
    roll: 'SC Roll No. 48821',
    experience: '12 yrs experience',
    rating: 4.9,
    reviewCount: 128,
    caseCount: '340+',
    responseRate: '98%',
    price: '₱1,500',
    about:
      'Atty. Santos is a corporate law practitioner with over 12 years of experience in business registration, mergers and acquisitions, contract drafting, and regulatory compliance. She assists both startups and established enterprises navigate SEC, DTI, and BIR requirements. She is a graduate of UP College of Law and passed the bar in 2012.',
    specializations: [
      { title: 'Corporate Law', subtitle: 'SEC, incorporation, articles', proficiency: 95, color: '#185FA5' },
      { title: 'Business Registration', subtitle: 'DTI, BIR, LGU permits', proficiency: 90, color: '#0F6E56' },
      { title: 'Contract Drafting', subtitle: 'NDAs, JVAs, MOAs', proficiency: 80, color: '#534AB7' },
      { title: 'M&A Advisory', subtitle: 'Due diligence, structuring', proficiency: 70, color: '#854F0B' },
    ],
    caseTags: [
      'Business name registration', 'Sole proprietorship setup', 'Corporation formation',
      'SEC registration', 'Partnership agreements', 'Contract review',
      'NDA drafting', 'Regulatory compliance', 'Joint venture structuring',
    ],
    languages: ['Filipino', 'English', 'Cebuano'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — University of the Philippines', subtitle: 'College of Law, Diliman', date: 'Graduated 2011' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'Supreme Court Roll of Attorneys No. 48821', date: '2012 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'Integrated Bar of the Philippines — Makati Chapter', date: 'Member since 2012 · Dues current' },
      { id: '4', icon: '📋', title: 'PRC Professional License', subtitle: 'Professional Regulation Commission — Active', date: 'Renewed Jan 2025 · Valid until Jan 2028' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'RC', reviewerName: 'Ramon C.', rating: 5, text: 'Atty. Santos guided me through the entire SEC incorporation process. Very thorough, responsive, and explained every step clearly. Highly recommended for startups.', date: 'February 2026', caseType: 'Corporate registration' },
      { id: '2', reviewerInitials: 'LG', reviewerName: 'Luisa G.', rating: 5, text: 'She reviewed our supplier contracts and caught critical issues we had missed. Very detailed and professional. Will definitely work with her again.', date: 'January 2026', caseType: 'Contract review' },
      { id: '3', reviewerInitials: 'JP', reviewerName: 'Jose P.', rating: 4, text: 'Good consultation overall. Atty. Santos is very knowledgeable. She was a bit busy that week but still responded within the day.', date: 'December 2025', caseType: 'Partnership agreement' },
      { id: '4', reviewerInitials: 'MR', reviewerName: 'Maria R.', rating: 5, text: 'Handled my DTI registration and BIR onboarding seamlessly. Clear explanations, zero jargon. Best legal experience I\'ve had.', date: 'November 2025', caseType: 'Business registration' },
    ],
    slots: [
      { id: '1', date: 'Mon Mar 17', time: '10:00 AM', type: 'video', status: 'available' },
      { id: '2', date: 'Tue Mar 18', time: '2:00 PM', type: 'in-person', status: 'available', clientName: undefined },
      { id: '3', date: 'Wed Mar 19', time: '9:00 AM', type: 'video', status: 'full', clientName: 'Juan dela Cruz' },
      { id: '4', date: 'Thu Mar 20', time: '3:00 PM', type: 'video', status: 'available' },
      { id: '5', date: 'Fri Mar 21', time: '11:00 AM', type: 'in-person', status: 'available' },
      { id: '6', date: 'Mon Mar 24', time: '9:00 AM', type: 'video', status: 'booked', clientName: 'Grace R.' },
      { id: '7', date: 'Tue Mar 25', time: '1:00 PM', type: 'video', status: 'available' },
    ],
    address: '2/F Legaspi Towers, Makati City',
    website: 'www.santoslaw.ph',
    phone: '+63 917 XXX XXXX',
    thisMonthEarnings: '₱42,500',
    totalClients: 128,
    upcomingConsultations: 4,
  },
  reyes: {
    id: 'cagara', initials: 'MC', name: 'Atty. Marcelo Cagara',
    title: 'Labor & Employment Law Attorney', specialization: 'Labor & Employment Law',
    location: 'Taguig City, Metro Manila', roll: 'SC Roll No. 52174', experience: '9 yrs experience',
    rating: 4.7, reviewCount: 85, caseCount: '210+', responseRate: '95%', price: '₱1,200',
    about: 'Atty. Reyes specializes in labor disputes, illegal dismissal cases, NLRC proceedings, and employment contract review. He has represented both employees and employers in regional arbitration branches across Metro Manila.',
    specializations: [
      { title: 'Labor Disputes', subtitle: 'NLRC, dismissal cases', proficiency: 95, color: '#185FA5' },
      { title: 'Employment Contracts', subtitle: 'Review and drafting', proficiency: 88, color: '#0F6E56' },
      { title: 'CBA Negotiation', subtitle: 'Collective bargaining', proficiency: 75, color: '#534AB7' },
      { title: 'Workplace Compliance', subtitle: 'DOLE regulations', proficiency: 70, color: '#854F0B' },
    ],
    caseTags: ['Illegal dismissal', 'Labor disputes', 'NLRC cases', 'Employment contracts', 'CBA negotiation', 'Workplace compliance'],
    languages: ['Filipino', 'English'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — Ateneo de Manila University', subtitle: 'School of Law', date: 'Graduated 2014' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'Supreme Court Roll No. 52174', date: '2015 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'IBP — Taguig Chapter', date: 'Member since 2015' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'GR', reviewerName: 'Grace R.', rating: 5, text: 'Found a lawyer for my labor dispute in minutes. Atty. Reyes was professional and the fee was clearly stated upfront. No surprises at all.', date: 'January 2026', caseType: 'Illegal dismissal' },
    ],
    slots: [
      { id: '1', date: 'Mon Mar 17', time: '2:00 PM', type: 'video', status: 'available' },
      { id: '2', date: 'Wed Mar 19', time: '10:00 AM', type: 'in-person', status: 'available' },
      { id: '3', date: 'Fri Mar 21', time: '3:00 PM', type: 'video', status: 'full' },
    ],
    address: 'Unit 305, McKinley Hill, Taguig City', website: 'www.reyeslaborlaw.ph', phone: '+63 918 XXX XXXX',
    thisMonthEarnings: '₱28,000', totalClients: 85, upcomingConsultations: 2,
  },
  cruz: {
    id: 'cruz', initials: 'AC', name: 'Atty. Ana C. Cruz',
    title: 'Family & Civil Law Attorney', specialization: 'Family & Civil Law',
    location: 'Quezon City, Metro Manila', roll: 'SC Roll No. 61023', experience: '8 yrs experience',
    rating: 4.8, reviewCount: 102, caseCount: '180+', responseRate: '97%', price: '₱1,300',
    about: 'Atty. Cruz handles annulment, legal separation, child custody, adoption, and property disputes. She is known for her compassionate approach with clients going through difficult personal legal situations.',
    specializations: [
      { title: 'Annulment & Separation', subtitle: 'Family court proceedings', proficiency: 95, color: '#185FA5' },
      { title: 'Child Custody', subtitle: 'VAWC, custody disputes', proficiency: 90, color: '#0F6E56' },
      { title: 'Property Disputes', subtitle: 'Land, inheritance', proficiency: 78, color: '#534AB7' },
      { title: 'Adoption', subtitle: 'Domestic & intercountry', proficiency: 70, color: '#854F0B' },
    ],
    caseTags: ['Annulment', 'Legal separation', 'Child custody', 'Adoption', 'Property disputes', 'VAWC cases'],
    languages: ['Filipino', 'English'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — UST Faculty of Civil Law', subtitle: 'University of Santo Tomas', date: 'Graduated 2015' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'SC Roll No. 61023', date: '2016 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'IBP — Quezon City Chapter', date: 'Member since 2016' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'ML', reviewerName: 'Maria L.', rating: 5, text: 'Atty. Cruz handled my annulment case with so much care and professionalism. She was always available to answer my questions.', date: 'February 2026', caseType: 'Annulment' },
    ],
    slots: [
      { id: '1', date: 'Tue Mar 18', time: '9:00 AM', type: 'video', status: 'available' },
      { id: '2', date: 'Thu Mar 20', time: '1:00 PM', type: 'in-person', status: 'available' },
    ],
    address: '8/F Pacific Star Bldg, Quezon City', website: 'www.cruzfamilylaw.ph', phone: '+63 919 XXX XXXX',
    thisMonthEarnings: '₱33,800', totalClients: 102, upcomingConsultations: 3,
  },
  mendoza: {
    id: 'mendoza', initials: 'BM', name: 'Atty. Benjamin M. Mendoza',
    title: 'Criminal Law Attorney', specialization: 'Criminal Law',
    location: 'Pasig City, Metro Manila', roll: 'SC Roll No. 47890', experience: '14 yrs experience',
    rating: 4.6, reviewCount: 71, caseCount: '290+', responseRate: '92%', price: '₱2,000',
    about: 'Atty. Mendoza is a seasoned criminal defense attorney with 14 years of experience handling cases from estafa and qualified theft to drug charges and white-collar crime.',
    specializations: [
      { title: 'Criminal Defense', subtitle: 'RTC, CA, SC cases', proficiency: 95, color: '#185FA5' },
      { title: 'White-Collar Crime', subtitle: 'Estafa, fraud cases', proficiency: 85, color: '#0F6E56' },
      { title: 'Drug Cases', subtitle: 'RA 9165 defense', proficiency: 75, color: '#534AB7' },
      { title: 'Bail Applications', subtitle: 'Bail bonds, hearings', proficiency: 90, color: '#854F0B' },
    ],
    caseTags: ['Criminal defense', 'Estafa', 'Qualified theft', 'Drug cases', 'Bail applications', 'Appeals'],
    languages: ['Filipino', 'English'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — FEU Institute of Law', subtitle: 'Far Eastern University', date: 'Graduated 2009' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'SC Roll No. 47890', date: '2010 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'IBP — Pasig Chapter', date: 'Member since 2010' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'RP', reviewerName: 'Roberto P.', rating: 5, text: 'Atty. Mendoza fought hard for my case and got an acquittal. I highly recommend him for criminal defense.', date: 'March 2026', caseType: 'Criminal defense' },
    ],
    slots: [
      { id: '1', date: 'Mon Mar 17', time: '3:00 PM', type: 'in-person', status: 'available' },
      { id: '2', date: 'Thu Mar 20', time: '10:00 AM', type: 'video', status: 'available' },
    ],
    address: '5/F PDCP Bank Centre, Pasig City', website: 'www.mendozalaw.ph', phone: '+63 920 XXX XXXX',
    thisMonthEarnings: '₱56,000', totalClients: 71, upcomingConsultations: 1,
  },
  lim: {
    id: 'lim', initials: 'SL', name: 'Atty. Sofia L. Lim',
    title: 'Intellectual Property Attorney', specialization: 'Intellectual Property',
    location: 'BGC, Taguig', roll: 'SC Roll No. 68412', experience: '6 yrs experience',
    rating: 4.9, reviewCount: 59, caseCount: '120+', responseRate: '99%', price: '₱1,800',
    about: 'Atty. Lim focuses on trademark registration, copyright protection, IP licensing, and enforcement proceedings before the Intellectual Property Office of the Philippines (IPOPHL).',
    specializations: [
      { title: 'Trademark Registration', subtitle: 'IPOPHL filings', proficiency: 95, color: '#185FA5' },
      { title: 'Copyright Protection', subtitle: 'Creative works, software', proficiency: 90, color: '#0F6E56' },
      { title: 'IP Licensing', subtitle: 'Agreements, royalties', proficiency: 82, color: '#534AB7' },
      { title: 'IP Litigation', subtitle: 'Enforcement proceedings', proficiency: 75, color: '#854F0B' },
    ],
    caseTags: ['Trademark registration', 'Copyright', 'IP licensing', 'Trade secrets', 'Domain disputes', 'IP litigation'],
    languages: ['Filipino', 'English', 'Mandarin'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — De La Salle College of Law', subtitle: 'Cum Laude', date: 'Graduated 2017' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'SC Roll No. 68412', date: '2018 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'IBP — Taguig Chapter', date: 'Member since 2018' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'TC', reviewerName: 'Tech Co.', rating: 5, text: 'Atty. Lim handled our entire trademark portfolio. Highly efficient and very knowledgeable in IP law.', date: 'March 2026', caseType: 'Trademark registration' },
    ],
    slots: [
      { id: '1', date: 'Mon Mar 17', time: '11:00 AM', type: 'video', status: 'available' },
      { id: '2', date: 'Wed Mar 19', time: '2:00 PM', type: 'video', status: 'available' },
      { id: '3', date: 'Fri Mar 21', time: '9:00 AM', type: 'in-person', status: 'full' },
    ],
    address: 'Net Lima Building, BGC, Taguig', website: 'www.limipatentlaw.ph', phone: '+63 921 XXX XXXX',
    thisMonthEarnings: '₱39,600', totalClients: 59, upcomingConsultations: 5,
  },
  garcia: {
    id: 'garcia', initials: 'EG', name: 'Atty. Eduardo A. Garcia',
    title: 'Real Estate Law Attorney', specialization: 'Real Estate Law',
    location: 'Cebu City', roll: 'SC Roll No. 55231', experience: '11 yrs experience',
    rating: 4.5, reviewCount: 44, caseCount: '160+', responseRate: '90%', price: '₱1,400',
    about: 'Atty. Garcia is based in Cebu and handles property due diligence, deed of sale preparation, title transfer, ejectment cases, and condominium law.',
    specializations: [
      { title: 'Title Transfer', subtitle: 'LRA, Registry of Deeds', proficiency: 95, color: '#185FA5' },
      { title: 'Property Due Diligence', subtitle: 'Land verification', proficiency: 90, color: '#0F6E56' },
      { title: 'Ejectment Cases', subtitle: 'Unlawful detainer', proficiency: 80, color: '#534AB7' },
      { title: 'Condominium Law', subtitle: 'CARP, master deeds', proficiency: 70, color: '#854F0B' },
    ],
    caseTags: ['Title transfer', 'Property due diligence', 'Ejectment', 'Deed of sale', 'Land registration', 'Condominium law'],
    languages: ['Filipino', 'English', 'Cebuano'],
    credentials: [
      { id: '1', icon: '🎓', title: 'Juris Doctor — USC School of Law', subtitle: 'University of San Carlos, Cebu', date: 'Graduated 2012' },
      { id: '2', icon: '📜', title: 'Philippine Bar Passer', subtitle: 'SC Roll No. 55231', date: '2013 Bar Examinations' },
      { id: '3', icon: '⚖', title: 'IBP Active Member', subtitle: 'IBP — Cebu Chapter', date: 'Member since 2013' },
    ],
    reviews: [
      { id: '1', reviewerInitials: 'BB', reviewerName: 'Beth B.', rating: 5, text: 'Atty. Garcia helped us transfer the title of our property smoothly. Very professional and knowledgeable.', date: 'February 2026', caseType: 'Title transfer' },
    ],
    slots: [
      { id: '1', date: 'Tue Mar 18', time: '10:00 AM', type: 'video', status: 'available' },
      { id: '2', date: 'Thu Mar 20', time: '2:00 PM', type: 'in-person', status: 'available' },
    ],
    address: 'Skyrise 4B, IT Park, Cebu City', website: 'www.garciarealestate.ph', phone: '+63 922 XXX XXXX',
    thisMonthEarnings: '₱25,200', totalClients: 44, upcomingConsultations: 2,
  },
}

export const LAWYER_LIST = Object.values(LAWYERS)

// ─── User Documents ───────────────────────────────────────────────────────────

export const USER_DOCUMENTS: Document[] = [
  { id: '1', code: 'DTI', title: 'DTI Business Name Application Form', type: 'Form', lastEdited: '2 days ago', status: 'in-progress', statusText: 'In progress — 3 fields remaining' },
  { id: '2', code: 'BIR', title: 'BIR Form 1901 — Registration', type: 'Form', lastEdited: '5 days ago', status: 'complete', statusText: 'Complete — ready to submit' },
  { id: '3', code: 'AFF', title: 'General Affidavit Template', type: 'Template', lastEdited: 'Standard form', status: 'not-started', statusText: 'Not started' },
  { id: '4', code: 'NDA', title: 'Non-Disclosure Agreement', type: 'Contract template', lastEdited: 'Standard', status: 'not-started', statusText: 'Not started' },
]

// ─── Chat histories ────────────────────────────────────────────────────────────

export const CHAT_HISTORIES: ChatHistory[] = [
  { id: '1', title: 'Business registration req.', active: true },
  { id: '2', title: 'Employment contract law', active: false },
  { id: '3', title: 'Barangay clearance process', active: false },
  { id: '4', title: 'Property deed transfer', active: false },
]

// ─── Lawyer clients ───────────────────────────────────────────────────────────

export const LAWYER_CLIENTS: Client[] = [
  { id: '1', initials: 'JD', name: 'Juan dela Cruz', caseType: 'Business registration', lastConsultation: 'Mar 10, 2026', status: 'upcoming', consultationDate: 'Wed Mar 19 · 9:00 AM' },
  { id: '2', initials: 'GR', name: 'Grace R.', caseType: 'Contract review', lastConsultation: 'Mar 5, 2026', status: 'upcoming', consultationDate: 'Mon Mar 24 · 9:00 AM' },
  { id: '3', initials: 'RC', name: 'Ramon C.', caseType: 'SEC incorporation', lastConsultation: 'Feb 28, 2026', status: 'completed' },
  { id: '4', initials: 'LG', name: 'Luisa G.', caseType: 'Contract review', lastConsultation: 'Jan 15, 2026', status: 'completed' },
  { id: '5', initials: 'JP', name: 'Jose P.', caseType: 'Partnership agreement', lastConsultation: 'Dec 20, 2025', status: 'completed' },
  { id: '6', initials: 'MR', name: 'Maria R.', caseType: 'DTI registration', lastConsultation: 'Nov 10, 2025', status: 'completed' },
]
