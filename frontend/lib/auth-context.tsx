'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import type { AuthUser } from './types'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (token: string, user_id: number, username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const user_id = localStorage.getItem('auth_user_id')
    const username = localStorage.getItem('auth_username')

    if (token && user_id && username) {
      setUser({
        token,
        user_id: Number(user_id),
        username,
      })
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(
    (token: string, user_id: number, username: string) => {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user_id', String(user_id))
      localStorage.setItem('auth_username', username)
      setUser({ token, user_id, username })
      router.push('/')
    },
    [router]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user_id')
    localStorage.removeItem('auth_username')
    setUser(null)
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
