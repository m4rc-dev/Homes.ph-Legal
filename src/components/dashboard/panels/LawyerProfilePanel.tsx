'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/context/ToastContext'
import { LAWYERS } from '@/lib/data'
import StarRating from '@/components/shared/StarRating'

type Tab = 'overview' | 'credentials' | 'reviews' | 'availability'

interface Props { lawyerId: string }

export default function LawyerProfilePanel({ lawyerId }: Props) {
  const { showToast } = useToast()
  const [tab, setTab] = useState<Tab>('overview')
  const lawyer = LAWYERS[lawyerId]

  if (!lawyer) return (
    <div className="panel">
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚖</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--navy)' }}>Lawyer not found</div>
        <Link href="/dashboard/lawyers"><button className="btn btn-primary" style={{ marginTop: 16 }}>← Back to lawyers</button></Link>
      </div>
    </div>
  )

  const ratingBars = [['5 ★', 85], ['4 ★', 11], ['3 ★', 3], ['2 ★', 1], ['1 ★', 0]] as [string, number][]

  return (
    <div style={{ padding: 0 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--gray-400)', padding: '10px 28px', borderBottom: '1px solid var(--gray-200)', background: 'white' }}>
        <Link href="/dashboard/lawyers" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Find a Lawyer</Link>
        <span>›</span>
        <span style={{ color: 'var(--blue)' }}>{lawyer.specialization}</span>
        <span>›</span>
        <span>{lawyer.name}</span>
      </div>

      {/* Hero */}
      <div style={{ padding: '24px 28px 0', borderBottom: '1px solid var(--gray-200)', background: 'white' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--navy)', border: '3px solid var(--gold-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 700, color: 'var(--gold-light)' }}>{lawyer.initials}</div>
            <div style={{ position: 'absolute', bottom: 3, right: 3, width: 22, height: 22, borderRadius: '50%', background: 'var(--green-bg)', border: '2.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{lawyer.name}</div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 12, fontWeight: 300 }}>{lawyer.title} · {lawyer.location}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green-text)' }}>IBP Verified</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--blue-bg)', color: 'var(--blue)' }}>{lawyer.roll}</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, border: '1px solid var(--gray-200)', color: 'var(--gray-600)' }}>{lawyer.experience}</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, border: '1px solid var(--gray-200)', color: 'var(--gray-600)' }}>Available this week</span>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['Rating', lawyer.rating], ['Reviews', lawyer.reviewCount], ['Cases handled', lawyer.caseCount], ['Response rate', lawyer.responseRate]].map(([l, v]) => (
                <div key={l as string} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 170, flexShrink: 0 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center', fontSize: 13, height: 38 }} onClick={() => showToast('Opening booking calendar…')}>Book consultation</button>
            <button className="btn" style={{ justifyContent: 'center', fontSize: 13, height: 38 }} onClick={() => showToast('Message sent!')}>Send message</button>
            <button className="btn" style={{ justifyContent: 'center', fontSize: 12, height: 36 }} onClick={() => showToast('Profile link copied!')}>Share profile</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', paddingBottom: 0, marginBottom: -1 }}>
          {(['overview','credentials','reviews','availability'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ fontSize: 13, padding: '11px 16px', color: tab === t ? 'var(--navy)' : 'var(--gray-500)', fontWeight: tab === t ? 600 : 400, borderBottom: `2.5px solid ${tab === t ? 'var(--navy)' : 'transparent'}`, background: 'none', border: 'none', borderBottomWidth: 2.5, borderBottomStyle: 'solid', borderBottomColor: tab === t ? 'var(--navy)' : 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', textTransform: 'capitalize', marginBottom: -1 }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, padding: '20px 28px', background: 'var(--gray-50)', alignItems: 'start' }}>
        {/* Left */}
        <div>
          {tab === 'overview' && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'var(--green-bg)', border: '1px solid rgba(45,122,79,.25)', borderRadius: 'var(--radius-sm)', marginBottom: 18 }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 12, color: 'var(--green-text)', lineHeight: 1.55 }}>IBP membership verified · SC Roll confirmed · Background check passed · Active PRC license</span>
              </div>
              <div className="card" style={{ marginBottom: 14 }}>
                <div className="section-title">About</div>
                <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.7, fontWeight: 300 }}>{lawyer.about}</p>
              </div>
              <div className="card" style={{ marginBottom: 14 }}>
                <div className="section-title">Specializations</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                  {lawyer.specializations.map(s => (
                    <div key={s.title} style={{ padding: '10px 12px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy)' }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{s.subtitle}</div>
                      <div style={{ height: 3, background: 'var(--gray-200)', borderRadius: 99, overflow: 'hidden', marginTop: 8 }}>
                        <div style={{ height: '100%', width: `${s.proficiency}%`, background: s.color, borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section-title" style={{ marginBottom: 8 }}>Common cases handled</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {lawyer.caseTags.map(t => <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 99, border: '1px solid var(--gray-200)', color: 'var(--gray-500)' }}>{t}</span>)}
                </div>
                <div className="section-title" style={{ marginBottom: 8 }}>Languages</div>
                <div style={{ display: 'flex', gap: 7 }}>
                  {lawyer.languages.map(l => <span key={l} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, background: 'var(--gray-100)', color: 'var(--navy)', border: '1px solid var(--gray-200)' }}>{l}</span>)}
                </div>
              </div>
              <div className="card">
                <div className="section-title" style={{ marginBottom: 10 }}>Recent reviews</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                  {lawyer.reviews.slice(0, 2).map(r => (
                    <div key={r.id} style={{ padding: '12px 14px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--gold)', flexShrink: 0 }}>{r.reviewerInitials}</div>
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy)', flex: 1 }}>{r.reviewerName}</span>
                        <StarRating rating={r.rating} size={10} />
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.55 }}>{r.text}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>{r.date} · {r.caseType}</div>
                    </div>
                  ))}
                </div>
                <button className="btn" style={{ fontSize: 12 }} onClick={() => setTab('reviews')}>See all {lawyer.reviewCount} reviews →</button>
              </div>
            </>
          )}

          {tab === 'credentials' && (
            <div className="card">
              <div className="section-title" style={{ marginBottom: 10 }}>Education & Bar</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {lawyer.credentials.map(c => (
                  <div key={c.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{c.subtitle}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{c.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="card">
              <div className="section-title" style={{ marginBottom: 10 }}>All reviews</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {lawyer.reviews.map(r => (
                  <div key={r.id} style={{ padding: '12px 14px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--gold)', flexShrink: 0 }}>{r.reviewerInitials}</div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy)', flex: 1 }}>{r.reviewerName}</span>
                      <StarRating rating={r.rating} size={10} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.55 }}>{r.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>{r.date} · {r.caseType}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'availability' && (
            <div className="card">
              <div className="section-title" style={{ marginBottom: 14 }}>Upcoming available slots</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {lawyer.slots.map(slot => (
                  <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', border: `1px solid ${slot.status === 'available' ? 'rgba(45,122,79,.3)' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-sm)', background: slot.status === 'available' ? 'var(--green-bg)' : 'white', opacity: slot.status === 'full' ? .6 : 1 }}>
                    <span style={{ fontWeight: 500, color: slot.status === 'available' ? 'var(--navy)' : 'var(--gray-400)', flex: 1, fontSize: 12 }}>{slot.date} · {slot.time}</span>
                    <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{slot.type === 'video' ? 'Video call' : 'In-person'}</span>
                    {slot.status === 'available' && <button style={{ fontSize: 11, fontWeight: 500, padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green)', background: 'transparent', color: 'var(--green)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }} onClick={() => showToast(`✅ Slot booked for ${slot.date}`)}>Book</button>}
                    {slot.status === 'full' && <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--red)', background: 'var(--red-bg)', padding: '2px 8px', borderRadius: 99 }}>Full</span>}
                    {slot.status === 'booked' && <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{slot.clientName}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div>
          {/* Booking card */}
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 14, padding: 18, marginBottom: 14, background: 'white' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>{lawyer.price} <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 400, color: 'var(--gray-400)' }}>/ 30-min consultation</span></div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 14, fontWeight: 300 }}>Also offers ₱2,500 / 1-hr session · Document review from ₱3,000</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy)', marginBottom: 8 }}>Available slots this week</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              {lawyer.slots.slice(0, 4).map(slot => (
                <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', border: `1px solid ${slot.status === 'available' ? 'rgba(45,122,79,.3)' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-sm)', background: slot.status === 'available' ? 'var(--green-bg)' : 'white', opacity: slot.status === 'full' ? .6 : 1 }}>
                  <span style={{ fontWeight: 500, color: slot.status === 'available' ? 'var(--navy)' : 'var(--gray-400)', flex: 1, fontSize: 12 }}>{slot.date} · {slot.time}</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{slot.type === 'video' ? 'Video' : 'In-person'}</span>
                  {slot.status === 'available' && <button style={{ fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green)', background: 'transparent', color: 'var(--green)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }} onClick={() => showToast('✅ Slot booked!')}>Book</button>}
                  {slot.status === 'full' && <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--red)' }}>Full</span>}
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 7 }} onClick={() => showToast('Opening full calendar…')}>Book a consultation</button>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={() => setTab('availability')}>View full calendar</button>
          </div>

          {/* Contact */}
          <div className="card card-sm" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 9 }}>Contact</div>
            {[['📍', lawyer.address], ['🌐', lawyer.website], ['📞', lawyer.phone]].map(([icon, val]) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--gray-600)', marginBottom: 7 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>{icon}</div>
                {val}
              </div>
            ))}
          </div>

          {/* Rating breakdown */}
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 14, padding: 16, background: 'white' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 12 }}>Rating breakdown</div>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{lawyer.rating}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 3, margin: '5px 0 3px' }}>
                <StarRating rating={lawyer.rating} size={15} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{lawyer.reviewCount} reviews</div>
            </div>
            {ratingBars.map(([label, pct]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: 'var(--gray-500)', minWidth: 28 }}>{label}</span>
                <div style={{ flex: 1, height: 4, background: 'var(--gray-200)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gold)', borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--gray-400)', minWidth: 28, textAlign: 'right' }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
