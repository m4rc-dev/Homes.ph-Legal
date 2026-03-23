'use client'

import { useToast } from '@/context/ToastContext'
import { LAWYERS } from '@/lib/data'
import { Icons } from '@/components/shared/Icons'

export default function LawyerSchedulePanel() {
  const { showToast } = useToast()
  const lawyer = LAWYERS['santos']

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">My Schedule</div>
        <div className="page-sub">Manage your consultation slots and availability.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div className="section-title" style={{ marginBottom: 0 }}>March 2026</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" style={{ fontSize: 12 }}>← Prev</button>
                <button className="btn" style={{ fontSize: 12 }}>Next →</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lawyer.slots.map(slot => (
                <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `1px solid ${slot.status === 'available' ? 'rgba(45,122,79,.3)' : slot.status === 'booked' ? 'rgba(26,95,168,.3)' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-sm)', background: slot.status === 'available' ? 'var(--green-bg)' : slot.status === 'booked' ? 'var(--blue-bg)' : 'white' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{slot.date} · {slot.time}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
                      {slot.type === 'video' ? (
                        <><Icons.Video size={12} /> Video call</>
                      ) : (
                        <><Icons.Building size={12} /> In-person</>
                      )}
                      {slot.clientName ? ` · ${slot.clientName}` : ''}
                    </div>
                  </div>
                  {slot.status === 'available' && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green-text)', border: '1px solid rgba(45,122,79,.3)' }}>Available</span>}
                  {slot.status === 'booked' && (
                    <>
                      <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--blue-bg)', color: 'var(--blue)' }}>Booked</span>
                      <button className="btn btn-primary" style={{ fontSize: 11, height: 30 }} onClick={() => showToast(`Starting session with ${slot.clientName}`)}>Join</button>
                    </>
                  )}
                  {slot.status === 'full' && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--red-bg)', color: 'var(--red)' }}>Full</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="section-title">Add availability</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="form-label">Date</label>
                <input className="form-control" type="date" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label className="form-label">Start time</label>
                  <select className="form-control">
                    {['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Type</label>
                  <select className="form-control">
                    <option>Video call</option>
                    <option>In-person</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => showToast('✅ Slot added to schedule')}>Add slot</button>
            </div>
          </div>

          <div className="card card-sm">
            <div className="section-title" style={{ marginBottom: 10 }}>Consultation rates</div>
            {[['30-min video call', '₱1,500'], ['1-hour session', '₱2,500'], ['Document review', 'From ₱3,000']].map(([t, p]) => (
              <div key={t} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13 }}>
                <span style={{ color: 'var(--gray-600)' }}>{t}</span>
                <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{p}</span>
              </div>
            ))}
            <button className="btn" style={{ fontSize: 12, marginTop: 12 }} onClick={() => showToast('Rate editor opened')}>Edit rates</button>
          </div>
        </div>
      </div>
    </div>
  )
}
