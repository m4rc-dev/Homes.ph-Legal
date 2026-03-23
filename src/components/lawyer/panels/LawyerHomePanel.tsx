'use client'

import Link from 'next/link'
import { useToast } from '@/context/ToastContext'
import { LAWYERS, LAWYER_CLIENTS } from '@/lib/data'
import StarRating from '@/components/shared/StarRating'

export default function LawyerHomePanel() {
  const { showToast } = useToast()
  const lawyer = LAWYERS['cagara']

  const upcoming = LAWYER_CLIENTS.filter(c => c.status === 'upcoming')
  const completed = LAWYER_CLIENTS.filter(c => c.status === 'completed')

  return (
    <div className="panel">
      {/* Welcome banner */}
      <div style={{ 
        background: `linear-gradient(rgba(20, 40, 174, 0.85), rgba(20, 40, 174, 0.85)), url('/images/banner.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%', 
        borderRadius: 20, 
        padding: '28px 32px', 
        marginBottom: 24, 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%,rgba(201,168,76,.15) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 4 }}>Welcome back, {lawyer.name} <span style={{ fontSize: 20 }}>👋</span></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 300, marginBottom: 18 }}>You have {upcoming.length} upcoming consultations this week.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/lawyer/schedule">
                <button style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 'var(--radius-sm)', background: 'var(--gold)', color: 'var(--navy)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>View schedule</button>
              </Link>
              <Link href="/lawyer/profile">
                <button style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'rgba(255,255,255,.75)', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Edit public profile</button>
              </Link>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 4 }}>
              <StarRating rating={lawyer.rating} size={13} />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-light)' }}>{lawyer.rating}</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>{lawyer.reviewCount} reviews · {lawyer.caseCount} cases</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Earnings this month', value: lawyer.thisMonthEarnings, sub: 'From consultations' },
          { label: 'Total clients', value: String(lawyer.totalClients), sub: 'All time' },
          { label: 'Upcoming consults', value: String(lawyer.upcomingConsultations), sub: 'This week' },
          { label: 'Response rate', value: lawyer.responseRate, sub: 'Last 30 days' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--gray-400)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4, fontWeight: 300 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Upcoming consultations */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Upcoming consultations</div>
            <Link href="/lawyer/schedule"><span style={{ fontSize: 12, color: 'var(--blue)', cursor: 'pointer' }}>View all →</span></Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcoming.map(client => (
              <div key={client.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid rgba(26,95,168,.2)', borderRadius: 'var(--radius-sm)', background: 'var(--blue-bg)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--gold)', flexShrink: 0 }}>{client.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{client.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{client.caseType}</div>
                  <div style={{ fontSize: 11, color: 'var(--blue)', marginTop: 2, fontWeight: 500 }}>{client.consultationDate}</div>
                </div>
                <button className="btn btn-primary" style={{ fontSize: 11, height: 30, padding: '0 10px' }} onClick={() => showToast(`Starting session with ${client.name}`)}>Join</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent clients */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Recent clients</div>
            <Link href="/lawyer/clients"><span style={{ fontSize: 12, color: 'var(--blue)', cursor: 'pointer' }}>View all →</span></Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {completed.slice(0, 4).map(client => (
              <div key={client.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', flexShrink: 0 }}>{client.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{client.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{client.caseType} · {client.lastConsultation}</div>
                </div>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green-text)' }}>Completed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
