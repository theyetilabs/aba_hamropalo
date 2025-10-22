"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  phone: string
  tokens: number
  isVerified: boolean
  verificationLevel: 'basic' | 'enhanced' | 'complete'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user credentials
const DEMO_USER = {
  phone: '9802834141',
  password: 'password',
  userData: {
    id: '1',
    name: 'Prem Regmi',
    phone: '9802834141',
    tokens: 1250,
    isVerified: true,
    verificationLevel: 'enhanced' as const
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check demo user credentials
    const cleanPhone = phone.replace(/\s/g, '').replace('+977', '')
    if (cleanPhone === DEMO_USER.phone && password === DEMO_USER.password) {
      setUser(DEMO_USER.userData)
      localStorage.setItem('auth_user', JSON.stringify(DEMO_USER.userData))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
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