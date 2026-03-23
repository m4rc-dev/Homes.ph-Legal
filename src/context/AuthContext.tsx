'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { User, AuthState } from '@/lib/types'
import { DEMO_ACCOUNTS } from '@/lib/data'

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'lexportal_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored) as User)
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      const account = DEMO_ACCOUNTS[email.toLowerCase().trim()]
      if (!account) return { success: false, error: 'No account found with that email.' }
      if (account.password !== password) return { success: false, error: 'Incorrect password.' }

      setUser(account.user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account.user))

      // Redirect based on role
      if (account.user.role === 'lawyer') {
        router.push('/lawyer/home')
      } else {
        router.push('/dashboard/home')
      }
      return { success: true }
    },
    [router]
  )

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    router.push('/')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
