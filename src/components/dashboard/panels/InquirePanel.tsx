'use client'

import { useState, useRef, useEffect } from 'react'
import type { ChatMessage } from '@/lib/types'
import { CHAT_HISTORIES } from '@/lib/data'

const QUICK_PROMPTS = [
  'What do I need to register a business?',
  'How do I get a Barangay clearance?',
  'Explain the Labor Code',
  'Tenant rights in the Philippines',
]

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '0', role: 'bot', text: "Hello! I can help you with questions about Philippine law. What would you like to know?\n\nYou can ask about business registration, labor law, civil code, contracts, property, and more.", refs: [], timestamp: '' },
  { id: '1', role: 'user', text: 'What are the requirements to register a sole proprietorship in the Philippines?', refs: [], timestamp: '' },
  { id: '2', role: 'bot', text: 'To register a sole proprietorship in the Philippines, you\'ll need to complete three main steps:\n\n**1. DTI Business Name Registration** — register your trade name at the Department of Trade and Industry. Valid for 5 years and renewable.\n\n**2. Local Government Unit (LGU) permits** — secure a Barangay Clearance and Mayor\'s Business Permit from your city or municipality.\n\n**3. BIR Registration** — register with the Bureau of Internal Revenue to obtain your Certificate of Registration (Form 2303) and authority to print official receipts.', refs: ['Ref: RA 3883', 'BIR RR 7-2012'], timestamp: '' },
]

function getReply(msg: string): { text: string; refs: string[] } {
  const m = msg.toLowerCase()
  if (m.includes('clearance') || m.includes('barangay'))
    return { text: 'A Barangay Clearance is obtained from your local Barangay Hall. You\'ll need a valid ID, a request form, and a minimal fee (₱50–₱200). Processing takes 1–3 business days.', refs: ['Ref: Local Government Code'] }
  if (m.includes('labor') || m.includes('employment') || m.includes('dismissal'))
    return { text: 'The Labor Code of the Philippines (PD 442) governs employment relationships. Key areas include minimum wage, probationary employment (180-day max), 13th month pay (RA 6686), and just causes for termination under Art. 297.', refs: ['Ref: PD 442', 'RA 6686'] }
  if (m.includes('tenant') || m.includes('rent'))
    return { text: 'Tenant rights in the Philippines are protected under the Rent Control Act (RA 9653) for units with monthly rent of ₱10,000 or below. Key rights include protection from illegal eviction and a 2% max annual rent increase cap.', refs: ['Ref: RA 9653'] }
  if (m.includes('register') || m.includes('dti') || m.includes('bir') || m.includes('business'))
    return { text: 'To register a sole proprietorship: (1) DTI Business Name Registration, (2) Barangay Clearance and Mayor\'s Permit from your LGU, and (3) BIR Certificate of Registration via Form 1901. Estimated total cost: ₱1,000–₱5,000.', refs: ['Ref: RA 3883', 'BIR RR 7-2012'] }
  return { text: 'I can help with that. Could you provide more context so I can give you the most accurate information based on Philippine law?', refs: [] }
}

export default function InquirePanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text, refs: [], timestamp: '' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const reply = getReply(text)
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'bot', text: reply.text, refs: reply.refs, timestamp: '' }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="panel">
      <div className="page-header">
        <div className="page-title">Legal Inquiries</div>
        <div className="page-sub">Ask about Philippine law. Answers include references to applicable statutes.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, height: 'calc(100vh - 200px)' }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: '14px 10px', overflowY: 'auto' }}>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 12, fontSize: 12 }} onClick={() => setMessages([INITIAL_MESSAGES[0]])}>+ New chat</button>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', padding: '0 10px', marginBottom: 6, marginTop: 10 }}>Recent</div>
          {CHAT_HISTORIES.map(h => (
            <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: 12, color: h.active ? 'var(--navy)' : 'var(--gray-600)', background: h.active ? 'var(--gray-100)' : 'transparent', fontWeight: h.active ? 500 : 400, cursor: 'pointer', marginBottom: 2 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: h.active ? 'var(--navy)' : 'var(--gray-300)', flexShrink: 0 }} />
              {h.title}
            </div>
          ))}
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', padding: '0 10px', marginBottom: 6, marginTop: 14 }}>Topics</div>
          {['Labor law', 'Corporate law', 'Civil code', 'Family law'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--gray-600)', cursor: 'pointer', marginBottom: 2 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gray-300)', flexShrink: 0 }} />
              {t}
            </div>
          ))}
        </div>

        {/* Chat window */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💬</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>Legal inquiry assistant</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Answers reference Philippine law — not a substitute for legal counsel</div>
            </div>
            <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>5 / 10 used</span>
          </div>

          {/* Quick prompts */}
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {QUICK_PROMPTS.map(p => (
              <button key={p} onClick={() => send(p)} style={{ fontSize: 11, padding: '5px 11px', borderRadius: 99, border: '1px solid var(--gray-200)', color: 'var(--gray-600)', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>{p}</button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: msg.role === 'user' ? '78%' : '85%' }}>
                {msg.role === 'user' ? (
                  <div style={{ background: 'var(--navy)', color: 'white', borderRadius: '14px 14px 4px 14px', padding: '11px 15px', fontSize: 13, lineHeight: 1.55 }}>{msg.text}</div>
                ) : (
                  <>
                    <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: '14px 14px 14px 4px', padding: '12px 15px', fontSize: 13, lineHeight: 1.65, color: 'var(--gray-800)' }}>
                      {msg.text.split('\n').map((line, i) => {
                        const bold = line.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`)
                        return <p key={i} style={{ marginBottom: line === '' ? 4 : 0 }} dangerouslySetInnerHTML={{ __html: bold }} />
                      })}
                    </div>
                    {msg.refs && msg.refs.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        {msg.refs.map(r => <span key={r} style={{ fontSize: 10, background: 'var(--blue-bg)', color: 'var(--blue)', padding: '2px 8px', borderRadius: 99 }}>{r}</span>)}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: '14px 14px 14px 4px', padding: '12px 15px', fontSize: 13, color: 'var(--gray-400)' }}>
                Typing…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid var(--gray-200)', padding: '12px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)} placeholder="Ask a follow-up question…" style={{ flex: 1, height: 38, border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', padding: '0 14px', fontSize: 13, outline: 'none', fontFamily: 'var(--font-sans)' }} />
            <button onClick={() => send(input)} className="btn btn-primary" style={{ height: 38 }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
