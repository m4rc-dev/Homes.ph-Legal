'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Icons } from '@/components/shared/Icons'

const STATS = [
  { label: 'Registrations', value: '1', sub: '1 in progress' },
  { label: 'Documents', value: '3', sub: '1 ready to submit' },
  { label: 'Inquiries', value: '5', sub: '10 left this month' },
  { label: 'Next deadline', value: 'Apr 15', sub: 'BIR Q1 filing', small: true },
]

const ACTIVITY = [
  { icon: 'Register', title: 'DTI Business Name Application', meta: 'Step 3 of 5 · Updated 2 days ago', badge: 'In progress', badgeCls: 'badge-amber' },
  { icon: 'Documents', title: 'BIR Form 1901 uploaded', meta: 'Ready to submit · 5 days ago', badge: 'Complete', badgeCls: 'badge-green' },
  { icon: 'Inquire', title: 'Sole proprietorship requirements', meta: 'Inquiry answered · 1 week ago', badge: 'Answered', badgeCls: 'badge-blue' },
]

const REMINDERS = [
  { color: '#c0392b', title: 'BIR Q1 VAT Return', meta: 'Due Apr 15, 2026', urgency: '#c0392b' },
  { color: '#f1c40f', title: "Mayor's Permit Renewal", meta: 'Due Jan 20, 2027' },
  { color: '#2ecc71', title: 'DTI Business Name Renewal', meta: 'Due Dec 2028' },
]

export default function HomePanel() {
  const { user } = useAuth()
  const { showToast } = useToast()

  const firstName = user?.name.split(' ')[0] ?? 'there'

  return (
    <div className="panel">
      {/* Welcome banner */}
      <div style={{ background: 'var(--navy)', borderRadius: 20, padding: '28px 32px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%,rgba(201,168,76,.12) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 4 }}>Good morning, {firstName} <span style={{ fontSize: 20 }}>👋</span></div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>Here's a summary of your legal activities.</div>
          <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
            <Link href="/dashboard/register">
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 'var(--radius-sm)', background: 'var(--gold)', color: 'var(--navy)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                <Icons.Plus size={14} /> New registration
              </button>
            </Link>
            <Link href="/dashboard/inquire">
              <button style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'rgba(255,255,255,.75)', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Ask a question</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--gray-400)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: s.small ? 18 : 26, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4, fontWeight: 300 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        {[
          { href: '/dashboard/register', icon: 'Register', title: 'Can Register', desc: 'Register individuals, businesses, and organizations with step-by-step guided forms.', badge: '1 in progress', badgeCls: 'badge-amber' },
          { href: '/dashboard/inquire', icon: 'Inquire', title: 'Inquire About Law', desc: 'Ask legal questions and get plain-language explanations with references to applicable laws.', badge: '5 inquiries made', badgeCls: 'badge-blue' },
          { href: '/dashboard/documents', icon: 'Documents', title: 'Provide & Assist Docs', desc: 'Upload, generate, and fill out legal documents and official government forms.', badge: '1 ready to submit', badgeCls: 'badge-green' },
        ].map(c => {
          const IconComp = Icons[c.icon as keyof typeof Icons]
          return (
            <Link key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
              <div style={{ border: '1px solid var(--gray-200)', borderRadius: 14, padding: 22, background: 'white', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: 14 }}>
                  <IconComp size={20} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', marginBottom: 5 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.6, fontWeight: 300, marginBottom: 12 }}>{c.desc}</div>
                <span className={`badge ${c.badgeCls}`}>{c.badge}</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card">
          <div className="section-title">Recent activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ACTIVITY.map(a => {
              const IconComp = Icons[a.icon as keyof typeof Icons]
              return (
                <div key={a.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', background: 'white' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)', flexShrink: 0 }}>
                    <IconComp size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{a.meta}</div>
                  </div>
                  <span className={`badge ${a.badgeCls}`} style={{ flexShrink: 0 }}>{a.badge}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div className="section-title">Compliance reminders</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {REMINDERS.map(r => (
              <div key={r.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', background: 'white' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, flexShrink: 0 }}>
                  <Icons.Dot size={14} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: r.urgency ?? 'var(--gray-400)', marginTop: 3 }}>{r.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
