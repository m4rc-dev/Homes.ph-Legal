'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Icons } from '@/components/shared/Icons'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('demo@lexportal.ph')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    if (!result.success) {
      setError(result.error ?? 'Login failed')
      setLoading(false)
    }
  }

  const fillDemo = (type: 'user' | 'lawyer') => {
    if (type === 'user') { setEmail('demo@lexportal.ph'); setPassword('demo1234') }
    else { setEmail('atty.santos@lexportal.ph'); setPassword('lawyer1234') }
    setError('')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 44, border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)',
    padding: '0 14px', fontSize: 14, color: 'var(--gray-800)', background: 'white',
    outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color .2s',
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* Left — form */}
      <div style={{ flex: '0 0 480px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 56px' }}>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
          <img src="/images/legal_logo.png" alt="Homes.ph Legal" style={{ width: 184, height: 51, objectFit: 'contain' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 6, alignSelf: 'flex-start' }}>Welcome back</h1>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 28, alignSelf: 'flex-start', fontWeight: 300 }}>Sign in to your account to continue</p>

        {/* Demo credentials hints */}
        <div style={{ display: 'flex', gap: 8, width: '100%', marginBottom: 20 }}>
          <button onClick={() => fillDemo('user')} style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', background: 'var(--gray-50)', cursor: 'pointer', fontSize: 11, color: 'var(--gray-600)', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
            <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icons.User size={12} /> Demo User
            </div>
            <div>demo@lexportal.ph</div>
          </button>
          <button onClick={() => fillDemo('lawyer')} style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--gold)', borderRadius: 'var(--radius-sm)', background: 'var(--gold-pale)', cursor: 'pointer', fontSize: 11, color: 'var(--gray-600)', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
            <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icons.Register size={12} /> Demo Lawyer
            </div>
            <div>atty.santos@lexportal.ph</div>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--gray-600)', marginBottom: 6, letterSpacing: '.02em' }}>Email address</label>
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div style={{ marginBottom: 6 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--gray-600)', marginBottom: 6, letterSpacing: '.02em' }}>Password</label>
            <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <a href="#" style={{ fontSize: 12, color: 'var(--navy)', fontWeight: 500 }}>Forgot password?</a>
          </div>
          {error && <p style={{ fontSize: 12, color: 'var(--red)', marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%', height: 46, background: loading ? 'var(--gray-400)' : 'var(--navy)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', transition: 'background .2s' }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 24, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--navy)', fontWeight: 500 }}>Register free</Link>
        </p>

        <div style={{ marginTop: 24 }}>
          <Link href="/" style={{ fontSize: 12, color: 'var(--gray-400)' }}>← Back to home</Link>
        </div>
      </div>

      {/* Right — visual */}
      <div style={{ flex: 1, background: 'var(--navy)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 64, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 40%, rgba(201,168,76,.13) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: .035, backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 440, textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 72, lineHeight: .8, color: 'var(--gold)', opacity: .4, marginBottom: 12 }}>"</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,.85)', lineHeight: 1.5, marginBottom: 20 }}>Justice is the constant and perpetual will to give every man his due.</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontWeight: 300 }}>— Domitius Ulpianus</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1, width: '100%', maxWidth: 360 }}>
          {[
            { icon: 'Register' as const, title: 'Register your business', desc: 'Guided DTI, BIR, SEC & LGU registration' },
            { icon: 'Inquire' as const, title: 'Inquire about the law', desc: 'Plain-language legal answers with RA references' },
            { icon: 'Documents' as const, title: 'Document assistance', desc: 'Fill, review, and submit legal forms & contracts' },
            { icon: 'Lawyers' as const, title: 'Verified lawyer directory', desc: 'IBP-verified, SC-registered attorneys' },
          ].map(f => {
            const IconComp = Icons[f.icon]
            return (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                  <IconComp size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.85)' }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 2, fontWeight: 300 }}>{f.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
