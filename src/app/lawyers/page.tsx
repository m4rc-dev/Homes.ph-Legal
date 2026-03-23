'use client'

import Navbar from '@/components/layout/Navbar'
import { LAWYER_LIST } from '@/lib/data'

const S: Record<string, React.CSSProperties> = {
  page: { background: 'var(--cream)', minHeight: '100vh', fontFamily: 'var(--font-sans)' },
  container: { width: 1440, maxWidth: '100%', margin: '0 auto', padding: '160px 60px 80px' },
  title: { fontFamily: 'Outfit, var(--font-sans)', fontSize: 48, fontWeight: 700, marginBottom: 12, textAlign: 'center', color: '#002143' },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 60, textAlign: 'center', fontWeight: 300, fontFamily: 'Outfit, var(--font-sans)', maxWidth: 640, margin: '0 auto 60px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 },
  card: { border: '1px solid var(--gray-100)', borderRadius: 24, padding: 40, textAlign: 'center', background: 'white', transition: 'transform 0.3s ease, box-shadow 0.3s ease', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' },
  av: { width: 84, height: 84, borderRadius: '50%', background: '#002143', border: '4px solid rgba(244, 171, 31, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, var(--font-sans)', fontSize: 28, fontWeight: 700, color: '#F4AB1F', margin: '0 auto 20px' },
  name: { fontSize: 20, fontWeight: 600, marginBottom: 6, color: '#002143', fontFamily: 'Outfit, var(--font-sans)' },
  spec: { fontSize: 15, color: 'var(--gray-400)', marginBottom: 28, fontWeight: 300, fontFamily: 'Outfit, var(--font-sans)' },
  stats: { display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 32, borderTop: '1px solid var(--gray-50)', paddingTop: 24 },
  statItem: { flex: 1, textAlign: 'center', borderRight: '1px solid var(--gray-100)' },
  statItemLast: { flex: 1, textAlign: 'center' },
  statValue: { fontSize: 18, fontWeight: 600, color: '#002143', fontFamily: 'Outfit, var(--font-sans)' },
  statLabel: { fontSize: 11, color: 'var(--gray-400)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4, fontFamily: 'Outfit, var(--font-sans)' },
  btn: { width: '100%', padding: '14px', fontSize: 14, fontWeight: 600, color: '#002143', background: 'transparent', border: '1.5px solid #002143', borderRadius: 12, cursor: 'pointer', transition: 'all .2s', fontFamily: 'Outfit, var(--font-sans)' }
}

export default function LawyersPage() {
  return (
    <div style={S.page}>
      <Navbar />
      
      <main style={S.container}>
        <h1 style={S.title}>Our Verified Lawyers</h1>
        <p style={S.subtitle}>Browse through our network of experienced legal professionals across the Philippines.</p>
        
        <div style={S.grid}>
          {LAWYER_LIST.map(l => (
            <div key={l.id} style={S.card}>
              <div style={S.av}>{l.initials}</div>
              <h2 style={S.name}>{l.name}</h2>
              <p style={S.spec}>{l.specialization}</p>
              
              <div style={S.stats}>
                <div style={S.statItem}>
                  <div style={S.statValue}>{l.rating}</div>
                  <div style={S.statLabel}>Rating</div>
                </div>
                <div style={S.statItem}>
                  <div style={S.statValue}>{l.experience.split(' ')[0]}</div>
                  <div style={S.statLabel}>Years</div>
                </div>
                <div style={S.statItemLast}>
                  <div style={S.statValue}>{l.reviewCount}</div>
                  <div style={S.statLabel}>Reviews</div>
                </div>
              </div>
              
              <button style={S.btn}>View full profile</button>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer can be added here if needed */}
    </div>
  )
}
