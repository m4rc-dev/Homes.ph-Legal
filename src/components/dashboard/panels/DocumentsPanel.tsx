'use client'

import { useToast } from '@/context/ToastContext'
import { USER_DOCUMENTS } from '@/lib/data'
import StatusDot from '@/components/shared/StatusDot'

const NAV_ITEMS = [
  { label: 'All documents', active: true },
  { label: 'In progress' },
  { label: 'Ready to submit' },
  { label: 'Submitted' },
  { label: 'Archived' },
]
const TEMPLATE_ITEMS = ['Contracts', 'Affidavits', 'Government forms', 'Demand letters']

export default function DocumentsPanel() {
  const { showToast } = useToast()

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">Documents</div>
        <div className="page-sub">Manage your legal documents, templates, and government forms.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: '14px 10px', height: 'fit-content' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', padding: '0 10px', marginBottom: 6, marginTop: 0 }}>My docs</div>
          {NAV_ITEMS.map(i => (
            <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: 12, color: i.active ? 'var(--navy)' : 'var(--gray-600)', fontWeight: i.active ? 500 : 400, background: i.active ? 'var(--gray-100)' : 'transparent', cursor: 'pointer', marginBottom: 2 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: i.active ? 'var(--navy)' : 'var(--gray-300)' }} />
              {i.label}
            </div>
          ))}
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', padding: '0 10px', marginBottom: 6, marginTop: 14 }}>Templates</div>
          {TEMPLATE_ITEMS.map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--gray-600)', cursor: 'pointer', marginBottom: 2 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gray-300)' }} />
              {t}
            </div>
          ))}
        </div>

        {/* Main */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{USER_DOCUMENTS.length} documents</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" style={{ fontSize: 12, height: 36 }} onClick={() => showToast('Upload started')}>↑ Upload</button>
              <button className="btn btn-primary" style={{ fontSize: 12, height: 36 }} onClick={() => showToast('Template picker opened')}>+ New from template</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {USER_DOCUMENTS.map(doc => (
              <div key={doc.id} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, transition: 'box-shadow .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = ''}>
                <div style={{ width: 38, height: 44, borderRadius: 7, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', flexShrink: 0 }}>{doc.code}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{doc.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{doc.type} · {doc.lastEdited}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
                    <StatusDot status={doc.status} />
                    <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{doc.statusText}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {doc.status === 'in-progress' && (
                    <button onClick={() => showToast('Opening form fill…')} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--blue-bg)', color: 'var(--blue)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Fill form</button>
                  )}
                  {doc.status === 'complete' && (
                    <>
                      <button onClick={() => showToast('Preview opened')} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-200)', background: 'transparent', color: 'var(--gray-600)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Preview</button>
                      <button onClick={() => showToast('✅ Submitted to BIR portal')} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--blue-bg)', color: 'var(--blue)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Submit</button>
                    </>
                  )}
                  {doc.status === 'not-started' && (
                    <button onClick={() => showToast('Template opened')} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--blue-bg)', color: 'var(--blue)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Use template</button>
                  )}
                  <button onClick={() => showToast('Download started')} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-200)', background: 'transparent', color: 'var(--gray-600)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>↓</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
