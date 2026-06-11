import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { api, setToken, getToken } from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('kintox_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('kintox_user', JSON.stringify(data.user))
    return data.user
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const data = await api.post('/auth/signup', { name, email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('kintox_user', JSON.stringify(data.user))
    return data.user
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('kintox_user')
  }, [])

  const isAuthenticated = useMemo(() => user !== null, [user])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
