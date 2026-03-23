'use client'

import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export default function UserProfilePanel() {
  const { user } = useAuth()
  const { showToast } = useToast()

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">My Profile</div>
        <div className="page-sub">Manage your personal information and account settings.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Left */}
        <div>
          <div className="card" style={{ textAlign: 'center', marginBottom: 14 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--gold-light)', margin: '0 auto 14px', border: '3px solid var(--gold-pale)' }}>{user?.avatar}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 14 }}>{user?.email} · {user?.plan ? `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} plan` : ''}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--gold-pale)', color: 'var(--amber)', border: '1px solid rgba(201,168,76,.3)' }}>Free plan</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green-text)' }}>Verified</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {[['1','Registrations'],['3','Documents'],['5','Inquiries'],['0','Bookings']].map(([v,l]) => (
                <div key={l} style={{ textAlign: 'center', padding: '10px 8px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-100)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-sm">
            <div className="section-title" style={{ marginBottom: 10 }}>Plan</div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 12, fontWeight: 300 }}>You're on the <strong style={{ color: 'var(--navy)' }}>Free</strong> plan. Upgrade to Pro for unlimited access.</div>
            <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => showToast('Redirecting to upgrade…')}>Upgrade to Pro →</button>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="section-title">Personal information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['First name','Juan'],['Last name','dela Cruz'],['Middle name','Masipag'],['Date of birth',''],].map(([label, val]) => (
                <div key={label}>
                  <label className="form-label">{label}</label>
                  <input className="form-control filled" defaultValue={val} type={label === 'Date of birth' ? 'date' : 'text'} />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1' }}>
                <label className="form-label">Address</label>
                <input className="form-control filled" defaultValue="123 Rizal St., Brgy. San Antonio, Taguig City" style={{ width: '100%' }} />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input className="form-control filled" defaultValue={user?.email} type="email" />
              </div>
              <div>
                <label className="form-label">Contact number</label>
                <input className="form-control filled" defaultValue="+63 917 000 0000" />
              </div>
              <div>
                <label className="form-label">TIN</label>
                <input className="form-control" placeholder="000-000-000" />
              </div>
              <div>
                <label className="form-label">PhilSys ID</label>
                <input className="form-control" placeholder="Enter your national ID number" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)' }}>
              <button className="btn">Cancel</button>
              <button className="btn btn-primary" onClick={() => showToast('✅ Profile saved successfully')}>Save changes</button>
            </div>
          </div>

          <div className="card card-sm">
            <div className="section-title">Security</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { title: 'Password', sub: 'Last changed 3 months ago', action: 'Change', fn: () => showToast('Change password email sent') },
                { title: 'Two-factor authentication', sub: 'Add an extra layer of security', action: 'Enable', fn: () => showToast('2FA setup started') },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{item.sub}</div>
                  </div>
                  <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={item.fn}>{item.action}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
