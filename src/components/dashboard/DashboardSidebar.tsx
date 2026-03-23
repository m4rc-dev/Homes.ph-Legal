'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Icons } from '@/components/shared/Icons'

const NAV_ITEMS = [
  { href: '/dashboard/home', icon: 'Dashboard', label: 'Dashboard' },
  { href: '/dashboard/register', icon: 'Register', label: 'Register', badge: '1' },
  { href: '/dashboard/inquire', icon: 'Inquire', label: 'Inquire' },
  { href: '/dashboard/documents', icon: 'Documents', label: 'Documents' },
  { href: '/dashboard/lawyers', icon: 'Lawyers', label: 'Find a Lawyer' },
]

const ACCOUNT_ITEMS = [
  { href: '/dashboard/profile', icon: 'Profile', label: 'My Profile' },
  { href: '#', icon: 'Notifications', label: 'Notifications' },
  { href: '#', icon: 'Settings', label: 'Settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const isActive = (path: string) => pathname === path

  return (
    <aside className="sidebar">
      <div style={{ height: 20 }} />

      <div className="sidebar-section-label">Main</div>
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
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-role">{user?.plan ? `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} plan` : 'User'}</div>
          </div>
          <button className="sidebar-logout" onClick={logout} title="Logout">
            <Icons.Logout size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
