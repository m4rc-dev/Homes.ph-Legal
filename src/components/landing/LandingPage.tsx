'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import { LAWYER_LIST } from '@/lib/data'
import StarRating from '@/components/shared/StarRating'

import { Icons } from '@/components/shared/Icons'

const S: Record<string, React.CSSProperties> = {
  page: { fontFamily: 'var(--font-sans)', background: 'var(--cream)', overflowX: 'hidden' },
  hero: { minHeight: '90vh', background: 'white', display: 'flex', alignItems: 'center', padding: '200px 0 80px', position: 'relative', overflow: 'hidden' },
  heroBg: { position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(/images/hero_image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' },
  heroInner: { width: 1440, maxWidth: '100%', margin: '0 auto', padding: '0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 },
  heroLeft: { textAlign: 'center', maxWidth: 800 },
  eyebrow: { display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 600, color: 'white', background: '#1428AE', padding: '6px 20px', borderRadius: 99, marginBottom: 28 },
  h1: { fontFamily: 'Outfit, var(--font-sans)', fontSize: 75, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.03em', color: '#002143', marginBottom: 28 },
  h1em: { color: 'var(--gold)', fontStyle: 'normal' },
  sub: { fontSize: 20, lineHeight: 1.6, color: '#002143', marginBottom: 40, fontWeight: 300, maxWidth: 800, margin: '0 auto 40px', fontFamily: 'Outfit, var(--font-sans)' },
  ctas: { display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 48 },
  ctaPrimary: { fontSize: 16, fontWeight: 600, color: 'white', background: '#1428AE', padding: '14px 32px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 8 },
  ctaSecondary: { fontSize: 16, fontWeight: 600, color: '#1428AE', background: 'white', padding: '14px 32px', borderRadius: 'var(--radius-md)', border: '1.5px solid #1428AE', cursor: 'pointer', fontFamily: 'var(--font-sans)' },
  proof: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 },
  proofAvs: { display: 'flex' },
  proofAv: { width: 34, height: 34, borderRadius: '50%', background: '#F0F0F0', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#666', marginRight: -10 },
  proofText: { fontSize: 14, color: '#002143', fontWeight: 600 },
  heroRight: { display: 'flex', flexDirection: 'column', gap: 20 },
  heroBox: { background: '#EAEAEA', borderRadius: 24, width: '100%', aspectRatio: '1.8 / 1' },
  statsBar: { display: 'flex', justifyContent: 'center', gap: 0, marginTop: 52, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 36 },
  statItem: { textAlign: 'center', padding: '0 32px', borderRight: '1px solid rgba(255,255,255,.08)' },
  statItemLast: { textAlign: 'center', padding: '0 32px' },
  statNum: { fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 5, fontWeight: 300 },
  trustBar: { background: 'white', borderBottom: '1px solid var(--gray-200)', padding: '16px 0' },
  trustInner: { width: 1440, maxWidth: '100%', margin: '0 auto', padding: '0 60px', display: 'flex', alignItems: 'center' },
  trustLabel: { fontSize: 11, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-400)', whiteSpace: 'nowrap', marginRight: 24 },
  trustPills: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  trustPill: { fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', padding: '5px 14px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' },
  section: { padding: '88px 0' },
  container: { width: 1440, maxWidth: '100%', margin: '0 auto', padding: '0 60px' },
  secHd: { textAlign: 'center', marginBottom: 52 },
  secEyebrow: { fontSize: 11, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#002143', marginBottom: 10 },
  secTitle: { fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, letterSpacing: '-.02em', marginBottom: 12 },
  secDesc: { fontSize: 15, color: 'var(--text-secondary, #4a5568)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto', fontWeight: 300 },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 },
  featCard: { background: 'white', padding: '32px 28px', borderRadius: 20, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', transition: 'box-shadow .2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
  featIc: { width: 46, height: 46, borderRadius: 12, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 18 },
  featTitle: { fontSize: 20, fontWeight: 600, color: '#002143', marginBottom: 8, fontFamily: 'Outfit, var(--font-sans)', lineHeight: 1.25 },
  featDesc: { fontSize: 14, color: '#4a5568', lineHeight: 1.6, marginBottom: 20, fontWeight: 400 },
  featList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 24 },
  featListItem: { display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#002143' },
  featChk: { flexShrink: 0, marginTop: 4 },
  featBtn: { width: '100%', padding: '14px', borderRadius: 12, background: '#EAF0FF', color: '#1428AE', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background .2s', fontFamily: 'var(--font-sans)', marginTop: 'auto', textAlign: 'center' },
  stepsSection: { padding: '88px 0', backgroundImage: 'linear-gradient(rgba(14,48,83,0.9), rgba(14,48,83,0.9)), url(/images/hero_image2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' },
  stepsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative', marginTop: 48 },
  step: { padding: '0 20px', textAlign: 'center' },
  stepNum: { width: 54, height: 54, borderRadius: '50%', margin: '0 auto 18px', background: '#0E3053', border: '1px solid rgba(201,168,76,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--gold)', position: 'relative', zIndex: 1 },
  stepTitle: { fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.88)', marginBottom: 6 },
  stepDesc: { fontSize: 12, color: 'rgba(255,255,255,.42)', lineHeight: 1.55, fontWeight: 300 },
  lawyerGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 },
  lawyerCard: { border: '1px solid var(--gray-100)', borderRadius: 24, padding: 32, textAlign: 'center', cursor: 'pointer', transition: 'transform .3s ease, box-shadow .3s ease', background: 'white', display: 'block', textDecoration: 'none', color: 'inherit', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' },
  lawyerAv: { width: 72, height: 72, borderRadius: '50%', background: '#002143', border: '4px solid rgba(244, 171, 31, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, var(--font-sans)', fontSize: 24, fontWeight: 700, color: '#F4AB1F', margin: '0 auto 16px' },
  testiGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 },
  testiCard: { background: 'white', border: '1px solid var(--gray-100)', borderRadius: 24, padding: '40px 32px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', position: 'relative' },
  testiQuoteIcon: { color: '#F4AB1F', opacity: 0.15, marginBottom: 20, display: 'block' },
  testiText: { fontFamily: 'Outfit, var(--font-sans)', fontStyle: 'normal', fontSize: 16, color: '#002143', lineHeight: 1.7, marginBottom: 28, fontWeight: 300 },
  testiAuthor: { display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--gray-50)', paddingTop: 20 },
  testiAv: { width: 44, height: 44, borderRadius: '50%', background: '#002143', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#F4AB1F', flexShrink: 0 },
  ctaBand: { padding: '96px 0', backgroundImage: 'linear-gradient(rgba(14,48,83,0.9), rgba(14,48,83,0.9)), url(/images/hero_image5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' },
  ctaForm: { display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto 12px' },
  ctaInput: { flex: 1, height: 46, border: '1px solid rgba(255,255,255,.15)', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,.06)', padding: '0 16px', fontSize: 14, color: 'rgba(255,255,255,.8)', outline: 'none', fontFamily: 'var(--font-sans)' },
  ctaBtn: { height: 46, padding: '0 24px', fontSize: 14, fontWeight: 500, background: '#1428AE', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' },
  footer: { background: '#002143', borderTop: '1px solid rgba(255,255,255,.06)', padding: '60px 0 28px' },
  footerTop: { display: 'grid', gridTemplateColumns: '2fr repeat(3,1fr)', gap: 44, marginBottom: 44 },
  footerColTitle: { fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 20, fontFamily: 'Outfit, var(--font-sans)', textTransform: 'uppercase' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: 9 },
  footerLink: { fontSize: 18, color: '#FFFFFF', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', fontFamily: 'Outfit, var(--font-sans)', transition: 'opacity .2s', fontWeight: 400 },
  footerBottom: { borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  footerCopy: { fontSize: 12, color: 'rgba(255,255,255,.28)', fontWeight: 300 },
  footerLegal: { display: 'flex', gap: 18 },
}

const FEATURES = [
  {
    icon: 'Register' as const,
    title: 'Business & entity registration',
    desc: 'Step-by-step guided registration across all government agencies.',
    items: ['DTI, BIR, SEC, and LGU forms', 'Auto-fill from your saved profile', 'Document checklist per type', 'Real-time submission tracking']
  },
  {
    icon: 'Inquire' as const,
    title: 'Legal inquiries',
    desc: 'Submit questions and receive plain-language answers with law references.',
    items: ['References to actual laws & RAs', 'Inquiry history by topic', 'Common question suggestions', 'Links to related documents']
  },
  {
    icon: 'Documents' as const,
    title: 'Document assistance',
    desc: 'Upload, generate, and fill out legal documents with guided instructions.',
    items: ['Template library — contracts, affidavits', 'Form-fill from your profile data', 'PDF preview & download', 'Lawyer review available']
  },
  {
    icon: 'Lawyers' as const,
    title: 'Verified lawyer directory',
    desc: 'Browse IBP-verified, SC-registered attorneys across all practice areas.',
    items: ['SC Roll & IBP membership verified', 'Client ratings and reviews', 'Direct messaging and scheduling', 'Specialization filtering']
  },
  {
    icon: 'Notifications' as const,
    title: 'Deadline & compliance alerts',
    desc: 'Never miss a renewal or filing date with automated reminders.',
    items: ['Business permit renewal alerts', 'BIR filing deadline reminders', 'SEC compliance tracking', 'Custom legal task reminders']
  },
  {
    icon: 'Lock' as const,
    title: 'Secure document vault',
    desc: 'Store all your legal documents in one encrypted, always-accessible place.',
    items: ['End-to-end encrypted storage', 'Share securely with lawyers', 'Version history tracking', 'Mobile access anywhere']
  },
]

const TESTIMONIALS = [
  { initials: 'MC', name: 'Marcelo C.', role: 'Small business owner, Cebu', text: 'Homes.ph Legal made registering my business so much easier. I finished the DTI and BIR registration in one afternoon. Every step was clear and well guided.' },
  { initials: 'MC', name: 'Marcelo C.', role: 'HR Manager, Metro Manila', text: 'I found a lawyer for my labor dispute in minutes. Atty. Reyes was professional and the fee was clearly stated upfront. No surprises at all.' },
  { initials: 'MC', name: 'Marcelo C.', role: 'Startup founder, BGC', text: 'The document templates saved me hours. I filled out my SEC forms using the guided form, reviewed them, and submitted — without a trip to the office.' },
]

const FAQ = [
  { q: 'Is Homes.ph Legal a substitute for hiring a lawyer?', a: 'No. Homes.ph Legal assists with guided registration, document preparation, and general legal information. For complex matters, we connect you with verified attorneys.' },
  { q: 'How are lawyers verified on the platform?', a: 'All lawyers undergo IBP membership verification, SC Roll number validation, PRC license check, and background screening before listing.' },
  { q: 'Is my data safe and confidential?', a: 'Yes. All data is encrypted at rest and in transit, fully compliant with the Data Privacy Act of 2012 (RA 10173).' },
  { q: 'Can I cancel my plan anytime?', a: 'Yes, no long-term contracts. Cancel or downgrade anytime from your account settings.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={S.page}>
      <Navbar />

      {/* Hero */}
      <section style={S.hero}>
        <div style={S.heroBg} />

        <div style={S.heroInner}>
          <div style={S.heroLeft}>
            <div style={S.eyebrow}>Trusted by 10,000+ Filipinos</div>
            <h1 style={S.h1}>
              Legal services made <span style={S.h1em}>simple</span> and accessible
            </h1>
            <p style={S.sub}>
              Register your business, inquire about Philippine law, and get expert document assistance — guided by verified legal professionals.
            </p>
            <div style={S.ctas}>
              <Link href="/login"><button style={S.ctaPrimary}>Get started free →</button></Link>
              <button style={S.ctaSecondary} onClick={() => scrollTo('lp-lawyers')}>Find a lawyer</button>
            </div>
            <div style={S.proof}>
              <div style={S.proofAvs}>
                {['MC', 'MC', 'MC', '+'].map((a, i) => <div key={i} style={{ ...S.proofAv, zIndex: 4 - i }}>{a}</div>)}
              </div>
              <div style={S.heroLeft}>
                <div style={S.proofText}>Joined by 10,000+ users this year.</div>
                <div style={{ fontSize: 12, color: '#333', marginTop: 2 }}>
                  <span style={{ color: 'var(--gold)' }}>★</span> 4.9 rated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar (Moved below hero for better clarity) */}
      <div style={{ background: 'white', padding: '40px 0', borderBottom: '1px solid var(--gray-100)' }}>
        <div style={{ ...S.container, display: 'flex', justifyContent: 'center', gap: 0 }}>
          {[['10,000+', 'Registered users'], ['340+', 'Verified lawyers'], ['28,000+', 'Documents processed'], ['4.9★', 'Platform rating']].map(([n, l], i, arr) => (
            <div key={n} style={{ textAlign: 'center', padding: '0 48px', borderRight: i < arr.length - 1 ? '1.5px solid var(--gray-100)' : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#002143', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 8, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div style={S.trustBar}>
        <div style={S.trustInner}>
          <span style={S.trustLabel}>Works with</span>
          <div style={S.trustPills}>
            {['DTI', 'BIR', 'SEC', 'IBP', 'LGU Portal', 'PhilSys', 'eCourt'].map(p => (
              <span key={p} style={S.trustPill}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section style={{ ...S.section, background: 'white' }} id="lp-features">
        <div style={S.container}>
          <div style={S.secHd}>
            <div style={S.secEyebrow}>What Homes.ph Legal offers</div>
            <h2 style={S.secTitle}>Everything you need for legal matters</h2>
            <p style={S.secDesc}>From registering a business to consulting a verified lawyer — we guide you through every step.</p>
          </div>
          <div style={S.featGrid}>
            {FEATURES.map(f => {
              const IconComp = Icons[f.icon]
              return (
                <div key={f.title} style={S.featCard}>
                  <div style={S.featIc}>
                    <IconComp size={24} color="white" />
                  </div>
                  <h3 style={S.featTitle}>{f.title}</h3>
                  <p style={S.featDesc}>{f.desc}</p>
                  <ul style={S.featList}>
                    {f.items.map(item => (
                      <li key={item} style={S.featListItem}>
                        <div style={S.featChk}>
                          <Icons.Check size={14} style={{ color: '#10B981' }} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button style={S.featBtn}>
                    View Details
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={S.stepsSection}>
        <div style={{ ...S.container, position: 'relative', zIndex: 1 }}>
          <div style={{ ...S.secHd }}>
            <div style={S.secEyebrow}>Simple process</div>
            <h2 style={{ ...S.secTitle, color: 'white' }}>Get started in 4 easy steps</h2>
          </div>
          <div style={{ ...S.stepsRow, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 27, left: 'calc(12.5% + 18px)', right: 'calc(12.5% + 18px)', height: 1, background: 'linear-gradient(90deg,rgba(201,168,76,.25),rgba(201,168,76,.55),rgba(201,168,76,.25))' }} />
            {[
              { n: '1', title: 'Create your account', desc: 'Sign up with your email or PhilSys ID. Takes under 2 minutes.' },
              { n: '2', title: 'Choose what you need', desc: 'Register, inquire, find a lawyer, or get document help.' },
              { n: '3', title: 'Complete your request', desc: 'Follow guided prompts and upload required documents.' },
              { n: '4', title: 'Track & get notified', desc: 'Monitor your progress and receive alerts at every step.' },
            ].map(s => (
              <div key={s.n} style={S.step}>
                <div style={S.stepNum}>{s.n}</div>
                <h3 style={S.stepTitle}>{s.title}</h3>
                <p style={S.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section style={{ ...S.section, background: 'white' }} id="lp-lawyers">
        <div style={S.container}>
          <div style={S.secHd}>
            <div style={S.secEyebrow}>Verified attorneys</div>
            <h2 style={S.secTitle}>Meet our top-rated lawyers</h2>
            <p style={S.secDesc}>All lawyers are IBP members and SC-registered. Browse profiles and book a consultation today.</p>
          </div>
          <div style={S.lawyerGrid}>
            {LAWYER_LIST.slice(0, 3).map((l, idx) => (
              <Link key={l.id} href="/lawyers" style={S.lawyerCard}>
                <div style={S.lawyerAv}>{l.initials}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#002143', marginBottom: 4, fontFamily: 'Outfit, var(--font-sans)' }}>{l.name}</div>
                <div style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 16, fontWeight: 300, fontFamily: 'Outfit, var(--font-sans)' }}>{l.specialization}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  <StarRating rating={l.rating} size={13} />
                  <span style={{ fontSize: 12, color: 'var(--gray-400)', marginLeft: 4, fontFamily: 'Outfit, var(--font-sans)' }}>{l.rating} · {l.reviewCount} reviews</span>
                </div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
                  {l.caseTags.slice(0, 3).map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 99, background: 'rgba(0,33,67,0.04)', color: '#002143', fontWeight: 500, fontFamily: 'Outfit, var(--font-sans)' }}>{t}</span>
                  ))}
                </div>
                <div style={{ width: '100%', fontSize: 14, fontWeight: 600, padding: '12px', borderRadius: 12, border: '1.5px solid #002143', background: 'transparent', color: '#002143', textAlign: 'center', transition: 'all .2s' }}>
                  View profile
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/lawyers" style={{ display: 'inline-block', fontSize: 15, fontWeight: 600, color: '#002143', padding: '12px 32px', border: '1.5px solid #002143', borderRadius: 12, background: 'transparent', cursor: 'pointer', fontFamily: 'Outfit, var(--font-sans)', textDecoration: 'none', transition: 'all .2s' }}>
              Browse all 340+ verified lawyers →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ ...S.section, background: 'var(--cream)' }}>
        <div style={S.container}>
          <div style={S.secHd}>
            <div style={S.secEyebrow}>What users say</div>
            <h2 style={S.secTitle}>Trusted by thousands across the Philippines</h2>
          </div>
          <div style={S.testiGrid}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={S.testiCard}>
                <Icons.Quote style={S.testiQuoteIcon} size={32} />
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  <StarRating rating={5} size={14} />
                </div>
                <p style={S.testiText}>{t.text}</p>
                <div style={S.testiAuthor}>
                  <div style={S.testiAv}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#002143', fontFamily: 'Outfit, var(--font-sans)' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2, fontWeight: 400, fontFamily: 'Outfit, var(--font-sans)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ ...S.section, background: 'var(--gray-50)' }} id="lp-faq">
        <div style={S.container}>
          <div style={S.secHd}>
            <div style={S.secEyebrow}>FAQ</div>
            <h2 style={S.secTitle}>Common questions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {FAQ.map((f, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: '#1428AE', textAlign: 'left' }}
                >
                  {f.q}
                  <span style={{ fontSize: 13, color: 'var(--gray-400)', flexShrink: 0, transition: 'transform .2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ fontSize: 13, color: '#4a5568', lineHeight: 1.65, padding: '0 18px 16px', fontWeight: 300 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={S.ctaBand}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%,rgba(201,168,76,.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ ...S.container, textAlign: 'center', position: 'relative' }}>
          <div style={S.secEyebrow}>Get started today</div>
          <h2 style={{ ...S.secTitle, color: 'white', marginBottom: 12 }}>Ready to simplify your legal needs?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', marginBottom: 28, fontWeight: 300 }}>Join 10,000+ Filipinos who already trust Homes.ph Legal. Start for free today.</p>
          <div style={S.ctaForm}>
            <input style={S.ctaInput} type="email" placeholder="Enter your email address" />
            <Link href="/register"><button style={S.ctaBtn}>Get started free →</button></Link>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>No credit card required · Get started in minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={S.footer}>
        <div style={S.container}>
          <div style={S.footerTop}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <img src="/images/legal_white_logo.png" alt="Homes.ph Legal" style={{ width: 260, height: 72, objectFit: 'contain' }} />
              </div>
              <p style={{ fontSize: 18, color: '#FFFFFF', lineHeight: 1.65, maxWidth: 300, fontWeight: 400, fontFamily: 'Outfit, var(--font-sans)', marginTop: 12 }}>
                Making Philippine legal services accessible to everyone — guided by verified legal professionals.
              </p>
            </div>
            <div>
              <div style={S.footerColTitle}>Platform</div>
              <div style={S.footerLinks}>
                {['Features', 'Find a Lawyer', 'Register', 'Inquire', 'Documents'].map(l => (
                  <Link key={l} href="/login" style={{ ...S.footerLink, textDecoration: 'none' }}>{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={S.footerColTitle}>Legal</div>
              <div style={S.footerLinks}>
                {['Privacy Policy', 'Terms of Service', 'Data Privacy Act', 'Disclaimer'].map(l => (
                  <button key={l} style={S.footerLink}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={S.footerColTitle}>Company</div>
              <div style={S.footerLinks}>
                {['About us', 'Blog', 'Careers', 'Contact', 'Press kit'].map(l => (
                  <button key={l} style={S.footerLink}>{l}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={S.footerBottom}>
            <span style={S.footerCopy}>© 2026 Homes.ph Legal. All rights reserved. Compliant with RA 10173.</span>
            <div style={S.footerLegal}>
              {['Privacy', 'Terms', 'Cookies'].map(l => (
                <button key={l} style={{ ...S.footerLink, fontSize: 12 }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
