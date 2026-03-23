'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { LAWYERS } from '@/lib/data'
import StarRating from '@/components/shared/StarRating'

export default function LawyerProfileSettingsPanel() {
  const { user } = useAuth()
  const { showToast } = useToast()
  
  // Use state to make the profile editable
  const [profile, setProfile] = useState(LAWYERS['cagara'])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, this would be an API call
    showToast(`✅ Profile for ${profile.name} updated successfully`)
  }

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">My Profile</div>
        <div className="page-sub">Manage your public profile and account settings.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Left */}
        <div>
          <div className="card" style={{ textAlign: 'center', marginBottom: 14 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--gold-light)', margin: '0 auto 14px', border: '3px solid var(--gold-pale)' }}>{profile.initials}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>{profile.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 10, fontWeight: 300 }}>{profile.specialization}</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <StarRating rating={profile.rating} size={12} />
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{profile.rating} · {profile.reviewCount} reviews</span>
            </div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green-text)' }}>IBP Verified</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--blue-bg)', color: 'var(--blue)' }}>SC Roll Confirmed</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {[[profile.thisMonthEarnings,'Earnings'],[String(profile.totalClients),'Clients'],[String(profile.upcomingConsultations),'Upcoming'],[profile.responseRate,'Response']].map(([v,l]) => (
                <div key={l} style={{ textAlign: 'center', padding: '10px 8px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-100)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-sm">
            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 10, fontWeight: 300 }}>Your public profile is visible to all LexPortal users.</div>
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={() => showToast('Profile preview opened')}>Preview public profile</button>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="section-title">Professional information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="form-label">Full name</label>
                <input 
                  className="form-control" 
                  name="name"
                  value={profile.name} 
                  onChange={handleChange}
                  style={{ width: '100%' }} 
                />
              </div>
              <div>
                <label className="form-label">Specialization</label>
                <input 
                  className="form-control" 
                  name="specialization"
                  value={profile.specialization} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input 
                  className="form-control" 
                  name="location"
                  value={profile.location} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">SC Roll number</label>
                <input 
                  className="form-control" 
                  name="roll"
                  value={profile.roll} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Years of experience</label>
                <input 
                  className="form-control" 
                  defaultValue="12" 
                />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="form-label">About / Bio</label>
                <textarea 
                  className="form-control" 
                  name="about"
                  value={profile.about} 
                  onChange={handleChange}
                  rows={4} 
                  style={{ height: 'auto', resize: 'vertical', padding: '8px 12px', lineHeight: 1.6 }} 
                />
              </div>
              <div>
                <label className="form-label">Consultation rate (30 min)</label>
                <input 
                  className="form-control" 
                  defaultValue="₱1,500" 
                />
              </div>
              <div>
                <label className="form-label">Office address</label>
                <input 
                  className="form-control" 
                  name="address"
                  value={profile.address} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Website</label>
                <input 
                  className="form-control" 
                  name="website"
                  value={profile.website} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Contact number</label>
                <input 
                  className="form-control" 
                  name="phone"
                  value={profile.phone} 
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)' }}>
              <button className="btn" onClick={() => setProfile(LAWYERS['santos'])}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
            </div>
          </div>

          <div className="card card-sm">
            <div className="section-title">Account & security</div>
            {[
              { title: 'Email address', val: user?.email ?? profile.name, action: 'Change', fn: () => showToast('Email change email sent') },
              { title: 'Password', val: 'Last changed 3 months ago', action: 'Change', fn: () => showToast('Password reset email sent') },
              { title: '2-Factor authentication', val: 'Disabled', action: 'Enable', fn: () => showToast('2FA setup started') },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{item.val}</div>
                </div>
                <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={item.fn}>{item.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
