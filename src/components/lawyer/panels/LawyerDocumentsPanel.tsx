'use client'

import { useToast } from '@/context/ToastContext'

const DOCS = [
  { code: 'ENG', title: 'Engagement Letter Template', type: 'Template', status: 'ready', note: 'Standard retainer agreement' },
  { code: 'NDA', title: 'Non-Disclosure Agreement', type: 'Template', status: 'ready', note: 'Client confidentiality' },
  { code: 'INV', title: 'Invoice — March 2026', type: 'Invoice', status: 'pending', note: 'Juan dela Cruz · ₱1,500' },
  { code: 'INV', title: 'Invoice — February 2026', type: 'Invoice', status: 'paid', note: 'Ramon C. · ₱3,000' },
  { code: 'CON', title: 'Consultation Summary — Grace R.', type: 'Document', status: 'complete', note: 'Jan 15, 2026' },
]

export default function LawyerDocumentsPanel() {
  const { showToast } = useToast()

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">Documents</div>
        <div className="page-sub">Manage your legal templates, client documents, and invoices.</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
        <button className="btn" style={{ fontSize: 12 }} onClick={() => showToast('Upload dialog opened')}>↑ Upload</button>
        <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('Template creator opened')}>+ New template</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DOCS.map((doc, i) => (
          <div key={i} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 38, height: 44, borderRadius: 7, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--gray-500)', flexShrink: 0 }}>{doc.code}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{doc.title}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{doc.type} · {doc.note}</div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: doc.status === 'paid' || doc.status === 'complete' || doc.status === 'ready' ? 'var(--green-bg)' : 'var(--amber-bg)', color: doc.status === 'paid' || doc.status === 'complete' || doc.status === 'ready' ? 'var(--green-text)' : 'var(--amber)' }}>
                {doc.status}
              </span>
              <button className="btn" style={{ fontSize: 11, height: 30 }} onClick={() => showToast(`Opening ${doc.title}`)}>Open</button>
              <button className="btn" style={{ fontSize: 11, height: 30 }} onClick={() => showToast('Download started')}>↓</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
