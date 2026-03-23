'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LAWYER_LIST } from '@/lib/data'
import StarRating from '@/components/shared/StarRating'

export default function FindLawyerPanel() {
  const [search, setSearch] = useState('')
  const [spec, setSpec] = useState('All')
  const [location, setLocation] = useState('All')

  const filtered = LAWYER_LIST.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.specialization.toLowerCase().includes(search.toLowerCase())
    const matchSpec = spec === 'All' || l.specialization.includes(spec)
    const matchLoc = location === 'All' || l.location.includes(location)
    return matchSearch && matchSpec && matchLoc
  })

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">Find a Lawyer</div>
        <div className="page-sub">Browse IBP-verified, SC-registered attorneys across all practice areas.</div>
      </div>

      {/* Search bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, specialization, or city…"
          style={{ flex: 1, height: 40, border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', padding: '0 14px', fontSize: 13, outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color .2s' }} />
        <select value={spec} onChange={e => setSpec(e.target.value)}
          style={{ height: 40, padding: '0 12px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--gray-600)', background: 'white', outline: 'none', fontFamily: 'var(--font-sans)' }}>
          {['All', 'Corporate', 'Labor', 'Family', 'Criminal', 'Intellectual Property', 'Real Estate'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={location} onChange={e => setLocation(e.target.value)}
          style={{ height: 40, padding: '0 12px', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--gray-600)', background: 'white', outline: 'none', fontFamily: 'var(--font-sans)' }}>
          {['All', 'Makati', 'Taguig', 'Quezon City', 'Pasig', 'Cebu'].map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 16 }}>
        Showing {filtered.length} of {LAWYER_LIST.length} verified lawyers
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {filtered.map(l => (
          <div key={l.id} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 22, textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s, border-color .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.borderColor = '' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--navy)', border: '3px solid var(--gold-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--gold-light)', margin: '0 auto 12px' }}>{l.initials}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', marginBottom: 3 }}>{l.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 10, fontWeight: 300 }}>{l.specialization} · {l.location}</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <StarRating rating={l.rating} size={11} />
              <span style={{ fontSize: 11, color: 'var(--gray-400)', marginLeft: 4 }}>{l.rating} · {l.reviewCount} reviews</span>
            </div>
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
              {l.caseTags.slice(0, 3).map(t => <span key={t} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, border: '1px solid var(--gray-200)', color: 'var(--gray-500)' }}>{t}</span>)}
            </div>
            <Link href={`/dashboard/lawyers/${l.id}`} style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', fontSize: 12, fontWeight: 500, padding: 9, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--navy)', background: 'transparent', color: 'var(--navy)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--navy)'; (e.currentTarget as HTMLElement).style.color = 'var(--cream)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '' }}>
                View profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
