'use client'

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setVisible(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: 'var(--navy)', color: 'white',
          padding: '12px 18px', borderRadius: 14,
          fontSize: 13, boxShadow: 'var(--shadow-lg)',
          display: 'flex', alignItems: 'center', gap: 10,
          maxWidth: 320,
          transform: visible ? 'translateY(0)' : 'translateY(80px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.32s cubic-bezier(.4,0,.2,1), opacity 0.32s cubic-bezier(.4,0,.2,1)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
