'use client'

import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import type { RegType, RegStep } from '@/lib/types'
import { Icons } from '@/components/shared/Icons'

const STEPS = ['Choose type', 'Your details', 'Documents', 'Review', 'Submit']

export default function RegisterPanel() {
  const { showToast } = useToast()
  const [step, setStep] = useState<RegStep>(0)
  const [regType, setRegType] = useState<RegType>('individual')

  const progress = ((step + 1) / 5) * 100

  const goStep = (n: RegStep) => {
    setStep(n)
    if (n < 4) showToast(`Step ${n + 1} of 5`)
  }

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">Registration</div>
        <div className="page-sub">Register your business or entity with Philippine government agencies.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Sidebar steps */}
        <div className="card" style={{ padding: '16px 12px', height: 'fit-content' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-400)', padding: '0 8px', marginBottom: 10 }}>Steps</div>
          {STEPS.map((label, i) => (
            <button key={i} onClick={() => goStep(i as RegStep)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 'var(--radius-sm)', marginBottom: 4, cursor: 'pointer', width: '100%', textAlign: 'left', border: 'none', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, background: step === i ? 'var(--navy)' : 'transparent', color: step === i ? 'white' : i < step ? 'var(--green)' : 'var(--gray-600)', transition: 'all .2s' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', border: `1.5px solid ${step === i ? 'rgba(255,255,255,.3)' : i < step ? 'var(--green)' : 'var(--gray-200)'}`, background: step === i ? 'rgba(255,255,255,.15)' : i < step ? 'var(--green-bg)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, flexShrink: 0, color: step === i ? 'white' : i < step ? 'var(--green)' : 'inherit' }}>
                {i < step ? <Icons.Check size={12} /> : i + 1}
              </span>
              {label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid var(--gray-200)', margin: '12px 8px 0' }} />
          <div style={{ padding: '0 8px', marginTop: 12 }}>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 6 }}>Step {step + 1} of 5</div>
          </div>
        </div>

        {/* Step content */}
        <div>
          {step === 0 && <StepType regType={regType} setRegType={setRegType} onNext={() => goStep(1)} />}
          {step === 1 && <StepDetails onBack={() => goStep(0)} onNext={() => goStep(2)} />}
          {step === 2 && <StepDocuments onBack={() => goStep(1)} onNext={() => goStep(3)} showToast={showToast} />}
          {step === 3 && <StepReview regType={regType} onBack={() => goStep(2)} onNext={() => { goStep(4); showToast('✅ Registration submitted!') }} />}
          {step === 4 && <StepSubmitted onBack={() => goStep(0)} />}
        </div>
      </div>
    </div>
  )
}

function StepType({ regType, setRegType, onNext }: { regType: RegType; setRegType: (t: RegType) => void; onNext: () => void }) {
  const types: { id: RegType; icon: keyof typeof Icons; label: string; sub: string }[] = [
    { id: 'individual', icon: 'User', label: 'Individual', sub: 'Sole proprietor, freelancer' },
    { id: 'business', icon: 'Building', label: 'Business', sub: 'Corporation, partnership' },
    { id: 'organization', icon: 'Users', label: 'Organization', sub: 'NGO, association, club' },
  ]
  return (
    <div className="card">
      <div className="section-title">Choose registration type</div>
      <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 18, fontWeight: 300 }}>Select the type of entity you want to register.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
        {types.map(t => {
          const IconComp = Icons[t.icon]
          return (
            <div key={t.id} onClick={() => setRegType(t.id)}
              style={{ border: `${regType === t.id ? '1.5px solid var(--navy)' : '1px solid var(--gray-200)'}`, borderRadius: 14, padding: '20px 14px', cursor: 'pointer', textAlign: 'center', background: regType === t.id ? 'rgba(13,27,42,.03)' : 'white', transition: 'all .2s' }}>
              <div style={{ color: 'var(--navy)', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                <IconComp size={24} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{t.label}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{t.sub}</div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

function StepDetails({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="card">
      <div className="section-title">Registration details</div>
      <div style={{ background: 'var(--blue-bg)', border: '1px solid rgba(26,95,168,.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 12, color: 'var(--blue)', marginBottom: 16, lineHeight: 1.5 }}>
        Fields marked * are required. Ensure information matches your valid ID.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { label: 'First name *', val: 'Juan' }, { label: 'Last name *', val: 'dela Cruz' },
          { label: 'Middle name', val: 'Masipag' }, { label: 'Date of birth *', val: '01/15/1990', type: 'date' },
        ].map(f => (
          <div key={f.label}>
            <label className="form-label">{f.label}</label>
            <input className="form-control filled" defaultValue={f.val} />
          </div>
        ))}
        <div style={{ gridColumn: '1/-1' }}>
          <label className="form-label">Address *</label>
          <input className="form-control filled" defaultValue="123 Rizal St., Brgy. San Antonio, Taguig City" style={{ width: '100%' }} />
        </div>
        <div>
          <label className="form-label">Registration type *</label>
          <select className="form-control filled"><option>Sole Proprietorship</option><option>Partnership</option><option>Corporation</option></select>
        </div>
        <div>
          <label className="form-label">TIN (if existing)</label>
          <input className="form-control" placeholder="000-000-000" />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)' }}>
        <button className="btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

function StepDocuments({ onBack, onNext, showToast }: { onBack: () => void; onNext: () => void; showToast: (m: string) => void }) {
  const docs = [
    { label: 'Valid Government ID (front)', status: 'uploaded', file: 'national_id_front.jpg' },
    { label: 'Valid Government ID (back)', status: 'uploaded', file: 'national_id_back.jpg' },
    { label: 'Proof of address', status: 'pending', file: null },
  ]
  return (
    <div className="card">
      <div className="section-title">Required documents</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {docs.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `1px ${d.status === 'pending' ? 'dashed rgba(176,122,26,.4)' : 'solid rgba(45,122,79,.3)'}`, borderRadius: 'var(--radius-sm)', background: d.status === 'uploaded' ? 'var(--green-bg)' : 'white' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: d.status === 'uploaded' ? 'var(--green-bg)' : 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: d.status === 'uploaded' ? 'var(--green-text)' : 'var(--gray-400)', flexShrink: 0 }}>
              {d.status === 'uploaded' ? <Icons.Check size={18} /> : <Icons.Upload size={18} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{d.label}</div>
              {d.file && <div style={{ fontSize: 11, color: 'var(--green-text)', marginTop: 2 }}>{d.file}</div>}
              {!d.file && <div style={{ fontSize: 11, color: 'var(--amber)', marginTop: 2 }}>Not yet uploaded</div>}
            </div>
            {d.status === 'pending' && <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('File browser opened')}>Upload</button>}
          </div>
        ))}
      </div>
      <div onClick={() => showToast('File browser opened')} style={{ border: '1.5px dashed var(--gray-300)', borderRadius: 14, padding: 28, textAlign: 'center', cursor: 'pointer', background: 'var(--gray-50)' }}>
        <Icons.Upload size={24} style={{ color: 'var(--gray-300)', marginBottom: 8 }} />
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)', marginBottom: 4 }}>Drag & drop files here, or click to browse</div>
        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Accepts PDF, JPG, PNG · Max 10MB per file</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)' }}>
        <button className="btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}

function StepReview({ regType, onBack, onNext }: { regType: RegType; onBack: () => void; onNext: () => void }) {
  const rows = [
    ['Type', `Individual — ${regType === 'individual' ? 'Sole Proprietorship' : regType}`],
    ['Full name', 'Juan Masipag dela Cruz'],
    ['Date of birth', 'January 15, 1990'],
    ['Address', '123 Rizal St., Brgy. San Antonio, Taguig City'],
    ['TIN', 'Not provided'],
  ]
  const docs = [['Government ID (front)', '✓ Uploaded', 'var(--green)'], ['Government ID (back)', '✓ Uploaded', 'var(--green)'], ['Proof of address', '⚠ Missing', 'var(--amber)']]
  return (
    <div className="card">
      <div className="section-title">Review your information</div>
      <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16, fontWeight: 300 }}>Please review all information carefully before submitting.</p>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 8 }}>Registration details</div>
        {rows.map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}><span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{k}</span><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{v}</span></div>)}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 8 }}>Documents</div>
        {docs.map(([k, v, c]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}><span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{k}</span><span style={{ fontSize: 13, fontWeight: 500, color: c }}>{v}</span></div>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)' }}>
        <button className="btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Confirm & Submit →</button>
      </div>
    </div>
  )
}

function StepSubmitted({ onBack }: { onBack: () => void }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', margin: '0 auto 20px' }}>
        <Icons.Check size={32} />
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Registration submitted!</div>
      <div style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28, fontWeight: 300, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>Your DTI Business Name Application has been submitted. You will receive confirmation within 3–5 business days.</div>
      <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '16px 24px', display: 'inline-block', textAlign: 'left', marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Reference number</div>
        <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, color: 'var(--navy)', letterSpacing: '.05em' }}>DTI-2026-0317-8821</div>
      </div>
      <br />
      <button className="btn btn-primary" onClick={onBack} style={{ margin: '0 auto' }}>Start new registration</button>
    </div>
  )
}
