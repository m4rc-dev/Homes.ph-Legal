'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardTopbar from '@/components/dashboard/DashboardTopbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login')
      } else if (user?.role === 'lawyer') {
        router.replace('/lawyer/home')
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || !isAuthenticated || user?.role === 'lawyer') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--navy)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontSize: 18 }}>Loading…</div>
      </div>
    )
  }

  return (
    <div className="app-shell" style={{ flexDirection: 'column' }}>
      <DashboardTopbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <DashboardSidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  )
}
