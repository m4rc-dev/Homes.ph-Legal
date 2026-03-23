// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = 'user' | 'lawyer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar: string // initials
  plan?: 'free' | 'pro' | 'business'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// ─── Lawyer ───────────────────────────────────────────────────────────────────

export interface Specialization {
  title: string
  subtitle: string
  proficiency: number // 0-100
  color: string
}

export interface Slot {
  id: string
  date: string
  time: string
  type: 'video' | 'in-person'
  status: 'available' | 'booked' | 'full'
  clientName?: string
}

export interface Review {
  id: string
  reviewerInitials: string
  reviewerName: string
  rating: number
  text: string
  date: string
  caseType: string
}

export interface Credential {
  id: string
  icon: string
  title: string
  subtitle: string
  date: string
}

export interface LawyerProfile {
  id: string
  initials: string
  name: string
  title: string
  specialization: string
  location: string
  roll: string
  experience: string
  rating: number
  reviewCount: number
  caseCount: string
  responseRate: string
  price: string
  about: string
  specializations: Specialization[]
  caseTags: string[]
  languages: string[]
  credentials: Credential[]
  reviews: Review[]
  slots: Slot[]
  address: string
  website: string
  phone: string
  // Lawyer-specific stats
  thisMonthEarnings: string
  totalClients: number
  upcomingConsultations: number
}

// ─── Documents ────────────────────────────────────────────────────────────────

export type DocStatus = 'in-progress' | 'complete' | 'not-started' | 'submitted'

export interface Document {
  id: string
  code: string
  title: string
  type: string
  lastEdited: string
  status: DocStatus
  statusText: string
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  refs?: string[]
  timestamp: string
}

export interface ChatHistory {
  id: string
  title: string
  active: boolean
}

// ─── Registration ─────────────────────────────────────────────────────────────

export type RegType = 'individual' | 'business' | 'organization'
export type RegStep = 0 | 1 | 2 | 3 | 4

// ─── Lawyer Dashboard ─────────────────────────────────────────────────────────

export interface Client {
  id: string
  initials: string
  name: string
  caseType: string
  lastConsultation: string
  status: 'upcoming' | 'completed' | 'pending'
  consultationDate?: string
}

export interface Notification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
}
