'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Icons } from '@/components/shared/Icons'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'user' | 'lawyer'>('user')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 44, border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)',
    padding: '0 14px', fontSize: 14, color: 'var(--gray-800)', background: 'white',
    outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color .2s',
  }

  if (success) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-bg)', color: 'var(--green-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Icons.Check size={32} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Check your email</h1>
        <p style={{ maxWidth: 400, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 32 }}>
          We've sent a verification link to <strong>{email}</strong>. Please click the link to activate your account.
        </p>
        <Link href="/login">
          <button style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Back to login
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Left — form */}
      <div style={{ flex: '0 0 520px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 64px' }}>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
          <img src="/images/legal_logo.png" alt="Homes.ph Legal" style={{ width: 184, height: 51, objectFit: 'contain' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>Create your account</h1>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 32, fontWeight: 300 }}>Join 10,000+ Filipinos making legal services simple.</p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          <button 
            onClick={() => setRole('user')}
            style={{ 
              flex: 1, padding: '14px', borderRadius: 'var(--radius-sm)', 
              border: `1.5px solid ${role === 'user' ? 'var(--navy)' : 'var(--gray-200)'}`,
              background: role === 'user' ? 'var(--gray-50)' : 'white',
              cursor: 'pointer', transition: 'all .2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
              <Icons.User size={18} color={role === 'user' ? 'var(--navy)' : 'var(--gray-400)'} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>I'm a Client</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>Register a business</div>
              </div>
            </div>
          </button>
          <button 
            onClick={() => setRole('lawyer')}
            style={{ 
              flex: 1, padding: '14px', borderRadius: 'var(--radius-sm)', 
              border: `1.5px solid ${role === 'lawyer' ? 'var(--navy)' : 'var(--gray-200)'}`,
              background: role === 'lawyer' ? 'var(--gray-50)' : 'white',
              cursor: 'pointer', transition: 'all .2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
              <Icons.Register size={18} color={role === 'lawyer' ? 'var(--navy)' : 'var(--gray-400)'} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>I'm a Lawyer</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>Provide legal help</div>
              </div>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Full name</label>
            <input style={inputStyle} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Juan dela Cruz" required />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Email address</label>
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Password</label>
            <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" required />
          </div>
          
          <button type="submit" disabled={loading} style={{ width: '100%', height: 48, background: loading ? 'var(--gray-400)' : 'var(--navy)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', transition: 'background .2s' }}>
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 24, textAlign: 'center' }}>
          By clicking "Create account", you agree to our{' '}
          <a href="#" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>Terms</a> and{' '}
          <a href="#" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>Privacy Policy</a>.
        </p>

        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 32, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--navy)', fontWeight: 600 }}>Login here</Link>
        </p>
      </div>

      {/* Right — visual */}
      <div style={{ flex: 1, background: '#0e3053', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .1, backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: 32 }}>
            <Icons.Check size={24} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, color: 'white', lineHeight: 1.1, marginBottom: 24 }}>Every Filipino deserves simple legal access.</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,.6)', lineHeight: 1.6, maxWidth: 480, marginBottom: 48, fontWeight: 300 }}>
            Join the platform that's bridging the gap between complexity and justice.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { label: '10K+', desc: 'Registered users' },
              { label: '340+', desc: 'Verified lawyers' },
              { label: '2.5min', desc: 'Avg. response time' },
              { label: '100%', desc: 'Secured payments' },
            ].map(s => (
              <div key={s.desc}>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.4)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
