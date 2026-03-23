import { usePathname } from 'next/navigation'
import { Icons } from '@/components/shared/Icons'

const TITLES: Record<string, string> = {
  '/dashboard/home': 'Dashboard',
  '/dashboard/register': 'Registration',
  '/dashboard/inquire': 'Legal Inquiries',
  '/dashboard/documents': 'Documents',
  '/dashboard/lawyers': 'Find a Lawyer',
  '/dashboard/profile': 'My Profile',
  '/lawyer/home': 'Dashboard',
  '/lawyer/schedule': 'My Schedule',
  '/lawyer/clients': 'Clients',
  '/lawyer/documents': 'Documents',
  '/lawyer/profile': 'My Profile',
}

interface Props {
  isLawyer?: boolean
}

export default function DashboardTopbar({ isLawyer = false }: Props) {
  const pathname = usePathname()
  const title = Object.entries(TITLES).find(([k]) => pathname.startsWith(k))?.[1]
    ?? (isLawyer ? 'Lawyer Portal' : 'Dashboard')

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/legal_logo.png" alt="Homes.ph Legal" style={{ width: 184, height: 51, objectFit: 'contain' }} />
        </div>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-search">
          <Icons.Search size={14} style={{ opacity: .5 }} />
          &nbsp; Search…
        </div>
        <div className="topbar-notif">
          <Icons.Notifications size={18} />
          <div className="notif-dot" />
        </div>
      </div>
    </div>
  )
}
