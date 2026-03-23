'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const S: Record<string, React.CSSProperties> = {
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s, box-shadow .2s', background: 'white' },
  navScrolled: { background: 'rgba(250,248,243,0.96)', backdropFilter: 'blur(12px)', boxShadow: '0 1px 0 rgba(13,27,42,.08)' },
  navInner: { width: 1440, maxWidth: '100%', margin: '0 auto', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brand: { display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 700, color: 'var(--navy)', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: 16, alignItems: 'center' },
  navActions: { display: 'flex', gap: 8, alignItems: 'center' },
  btnGhost: { fontSize: 18, fontWeight: 400, color: '#002143', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontFamily: 'Outfit, var(--font-sans)' },
  btnNavy: { fontSize: 14, fontWeight: 500, color: 'var(--cream)', background: '#1428AE', padding: '9px 20px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If not on home page, let the default Link behavior take over (which will go to /#id)
    }
  }

  return (
    <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .nav-link {
          position: relative;
          padding: 8px 16px;
          border-radius: 8px;
          color: #002143;
          transition: all 0.2s ease;
          text-decoration: none;
          cursor: pointer;
          font-family: Outfit, var(--font-sans);
          font-size: 16px;
          font-weight: 500;
        }
        .nav-link:hover {
          color: #F4AB1F;
          background-color: rgba(244, 171, 31, 0.1);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #F4AB1F;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: all 0.2s ease-out;
        }
        .nav-link:hover::after {
          opacity: 1;
          transform: scaleX(1);
        }
      `}} />
      <div style={S.navInner}>
        <Link href="/" style={S.brand}>
          <img src="/images/legal_logo.png" alt="LexPortal" style={{ height: 45, objectFit: 'contain' }} />
        </Link>
        <div style={S.navLinks}>
          <Link href="/#features" onClick={(e) => handleNavClick(e, 'features')} className="nav-link">Features</Link>
          <Link href="/lawyers" className="nav-link">Find a Lawyer</Link>
          <Link href="/#faq" onClick={(e) => handleNavClick(e, 'faq')} className="nav-link">Faq</Link>
        </div>
        <div style={S.navActions}>
          <Link href="/login" style={S.btnGhost}>Log in</Link>
          <Link href="/register" style={S.btnNavy}>Get started free</Link>
        </div>
      </div>
    </nav>
  )
}
