import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    setUser(data.user)
    return data.user
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const data = await api.post('/auth/signup', { name, email, password })
    setUser(data.user)
    return data.user
  }, [])

  const socialLogin = useCallback(async (name, email, provider, accessToken) => {
    const data = await api.post('/auth/social', { name, email, provider, accessToken })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try { await api.post('/auth/logout') } catch {}
    setUser(null)
  }, [])

  const isAuthenticated = useMemo(() => user !== null, [user])
  const isAdmin = useMemo(() => user?.role === 'admin', [user])

  return (
    <AuthContext.Provider value={{ user, login, signup, socialLogin, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
