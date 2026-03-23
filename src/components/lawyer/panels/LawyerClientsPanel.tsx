'use client'

import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import { LAWYER_CLIENTS } from '@/lib/data'
import { Icons } from '@/components/shared/Icons'

export default function LawyerClientsPanel() {
  const { showToast } = useToast()
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

  const filtered = LAWYER_CLIENTS.filter(c => filter === 'all' || c.status === filter)

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">Clients</div>
        <div className="page-sub">Manage your client relationships and consultation history.</div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {(['all','upcoming','completed'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 99, border: `1px solid ${filter === f ? 'transparent' : 'var(--gray-200)'}`, background: filter === f ? 'var(--navy)' : 'white', color: filter === f ? 'white' : 'var(--gray-600)', cursor: 'pointer', fontFamily: 'var(--font-sans)', textTransform: 'capitalize' }}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--gray-400)', alignSelf: 'center' }}>{filtered.length} clients</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(client => (
          <div key={client.id} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: client.status === 'upcoming' ? 'var(--navy)' : 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: client.status === 'upcoming' ? 'var(--gold)' : 'var(--gray-600)', flexShrink: 0 }}>{client.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--navy)', marginBottom: 2 }}>{client.name}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{client.caseType}</div>
              {client.consultationDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--blue)', marginTop: 4, fontWeight: 500 }}>
                  <Icons.Schedule size={12} /> {client.consultationDate}
                </div>
              )}
              {!client.consultationDate && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>Last: {client.lastConsultation}</div>}
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
              <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 99, background: client.status === 'upcoming' ? 'var(--blue-bg)' : 'var(--green-bg)', color: client.status === 'upcoming' ? 'var(--blue)' : 'var(--green-text)' }}>
                {client.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </span>
              {client.status === 'upcoming' && (
                <button className="btn btn-primary" style={{ fontSize: 11, height: 30 }} onClick={() => showToast(`Joining session with ${client.name}`)}>Join session</button>
              )}
              <button className="btn" style={{ fontSize: 11, height: 30 }} onClick={() => showToast(`Opening ${client.name}'s file`)}>View file</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
