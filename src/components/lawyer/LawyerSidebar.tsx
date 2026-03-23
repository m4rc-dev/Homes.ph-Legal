'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LAWYERS } from '@/lib/data'
import { Icons } from '@/components/shared/Icons'

const NAV_ITEMS = [
  { href: '/lawyer/home', icon: 'Dashboard', label: 'Dashboard' },
  { href: '/lawyer/schedule', icon: 'Schedule', label: 'My Schedule', badge: '4' },
  { href: '/lawyer/clients', icon: 'Clients', label: 'Clients' },
  { href: '/lawyer/documents', icon: 'Documents', label: 'Documents' },
]

const ACCOUNT_ITEMS = [
  { href: '/lawyer/profile', icon: 'Profile', label: 'My Profile' },
  { href: '#', icon: 'Notifications', label: 'Notifications' },
  { href: '#', icon: 'Settings', label: 'Settings' },
]

export default function LawyerSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const lawyerData = LAWYERS['santos'] // default to santos for demo

  return (
    <aside className="sidebar">
      <div style={{ height: 20 }} />

      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{ background: 'rgba(201,168,76,.1)', border: '1px solid rgba(201,168,76,.2)', borderRadius: 'var(--radius-sm)', padding: '8px 12px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 3 }}>Lawyer Portal</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>IBP · SC Roll Verified</div>
        </div>
      </div>

      <div className="sidebar-section-label">Navigation</div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const IconComp = Icons[item.icon as keyof typeof Icons]
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <button className={`sidebar-item ${pathname.startsWith(item.href) ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                  <IconComp size={18} />
                </span>
                {item.label}
                {item.badge && <span className="sidebar-item-badge">{item.badge}</span>}
              </button>
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-divider" />

      <div className="sidebar-section-label">Account</div>
      <nav className="sidebar-nav">
        {ACCOUNT_ITEMS.map(item => {
          const IconComp = Icons[item.icon as keyof typeof Icons]
          return (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <button className={`sidebar-item ${pathname === item.href ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                  <IconComp size={18} />
                </span>
                {item.label}
              </button>
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.avatar}</div>
          <div>
            <div className="sidebar-user-name">{user?.name ?? lawyerData.name}</div>
            <div className="sidebar-user-role">{lawyerData.specialization.split(' ')[0]} Lawyer</div>
          </div>
          <button className="sidebar-logout" onClick={logout} title="Logout">
            <Icons.Logout size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
