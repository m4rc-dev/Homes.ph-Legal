'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import LawyerSidebar from '@/components/lawyer/LawyerSidebar'
import DashboardTopbar from '@/components/dashboard/DashboardTopbar'

export default function LawyerLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) router.replace('/login')
      else if (user?.role === 'user') router.replace('/dashboard/home')
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || !isAuthenticated || user?.role === 'user') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--navy)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontSize: 18 }}>Loading…</div>
      </div>
    )
  }

  return (
    <div className="app-shell" style={{ flexDirection: 'column' }}>
      <DashboardTopbar isLawyer />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LawyerSidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  )
}
