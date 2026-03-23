# Homes.ph Legal — Next.js + TypeScript

A full-stack Philippine legal services platform built with **Next.js 14 App Router** and **TypeScript**.

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| User | `demo@lexportal.ph` | `demo1234` |
| Lawyer | `atty.santos@lexportal.ph` | `lawyer1234` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page (/)
│   ├── login/page.tsx            # Login (/login)
│   ├── dashboard/                # User dashboard (/dashboard/*)
│   │   ├── layout.tsx            # Auth guard + shell
│   │   ├── home/page.tsx
│   │   ├── register/page.tsx
│   │   ├── inquire/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── lawyers/page.tsx
│   │   ├── lawyers/[id]/page.tsx # Lawyer public profile
│   │   └── profile/page.tsx
│   └── lawyer/                   # Lawyer dashboard (/lawyer/*)
│       ├── layout.tsx            # Auth guard + shell
│       ├── home/page.tsx
│       ├── schedule/page.tsx
│       ├── clients/page.tsx
│       ├── documents/page.tsx
│       └── profile/page.tsx
├── components/
│   ├── landing/LandingPage.tsx
│   ├── auth/LoginPage.tsx
│   ├── dashboard/
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardTopbar.tsx
│   │   └── panels/               # One component per page panel
│   ├── lawyer/
│   │   ├── LawyerSidebar.tsx
│   │   └── panels/               # Lawyer dashboard panels
│   └── shared/
│       ├── StarRating.tsx
│       └── StatusDot.tsx
├── context/
│   ├── AuthContext.tsx           # Login, logout, role-based routing
│   └── ToastContext.tsx          # Global toast notifications
└── lib/
    ├── types.ts                  # All TypeScript types
    └── data.ts                   # Demo data (lawyers, documents, etc.)
```

## Routing Logic

- `/` — Public landing page
- `/login` — Login page (two demo accounts)
- `/dashboard/*` — Protected. Redirects to `/login` if not authenticated; redirects lawyers to `/lawyer/home`
- `/lawyer/*` — Protected. Redirects to `/login` if not authenticated; redirects users to `/dashboard/home`

## Tech Stack

- **Next.js 14** — App Router, server/client components
- **TypeScript** — Strict mode, full type coverage
- **CSS** — Global design system via `globals.css`, inline styles for components
- **Fonts** — Playfair Display (serif/headings) + DM Sans (body) via Google Fonts

## Features

### User Dashboard
- 🏠 Home — stats, feature cards, activity feed, compliance reminders
- 📋 Registration — 5-step wizard (type, details, documents, review, submit)
- 💬 Inquire — chat interface with keyword-matched Philippine law responses
- 📄 Documents — DTI/BIR form management with status tracking
- ⚖ Find a Lawyer — searchable/filterable lawyer directory
- 👤 Profile — editable personal info + security settings

### Lawyer Dashboard
- 🏠 Home — earnings, upcoming consultations, recent clients
- 📅 Schedule — slot management, availability editor
- 👥 Clients — client list with session management
- 📄 Documents — templates, invoices, client documents
- ⚖ Profile — public profile editor + account settings

### Lawyer Public Profile
- Overview: About, specializations, case tags, languages, reviews
- Credentials: Education, bar exam, IBP, PRC
- Reviews: All client reviews with ratings
- Availability: Bookable slots (video/in-person)
- Sidebar: Live slot booking, contact info, rating histogram
