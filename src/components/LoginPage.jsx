import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SEO from './SEO'
import { useAuth } from '../context/AuthContext'
import KintoxLogo from './KintoxLogo'
import GoogleSignInButton from './GoogleSignInButton'
import AppleSignInButton from './AppleSignInButton'
import GitHubSignInButton from './GitHubSignInButton'
import { api } from '../lib/api'

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mode, setMode] = useState(() => location.hash === '#signup' ? 'signup' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [verifiedMsg, setVerifiedMsg] = useState('')
  const { login, signup, socialLogin } = useAuth()

  useEffect(() => {
    if (location.search.includes('verified=true')) {
      setVerifiedMsg('Email verified! You can now log in.')
      window.history.replaceState({}, '', '/login')
    }
  }, [location])

  const switchMode = (m) => {
    setErrors({})
    setShowForgot(false)
    setForgotSent(false)
    setMode(m)
    window.location.hash = m === 'signup' ? '#signup' : '#login'
  }

  const validate = () => {
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 8) errs.password = 'Minimum 8 characters'
    if (mode === 'signup') {
      if (!name.trim()) errs.name = 'Name is required'
      if (!confirmPassword) errs.confirmPassword = 'Confirm your password'
      else if (confirmPassword !== password) errs.confirmPassword = 'Passwords do not match'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(name, email, password)
      }
      const from = location.state?.from || '/'
      navigate(from, { replace: true })
    } catch (err) {
      setErrors({ form: err.message })
    }
    setLoading(false)
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    if (!forgotEmail.trim()) return
    setForgotLoading(true)
    try {
      await api.post('/auth/forgot-password', { email: forgotEmail })
      setForgotSent(true)
    } catch (err) {
      setErrors({ forgot: err.message })
    }
    setForgotLoading(false)
  }

  const handleResendVerification = async () => {
    setLoading(true)
    try {
      await api.post('/auth/resend-verification', { email })
      setErrors({ form: '' })
      setErrors({ resend: 'Verification email resent! Check your inbox.' })
    } catch (err) {
      setErrors({ form: err.message })
    }
    setLoading(false)
  }

  const inputClass = (field, extra = '') =>
    `w-full px-4 py-3 bg-white border ${errors[field] ? 'border-red-500' : 'border-[#e0e0e0]'} rounded-[11px] text-[17px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#7a7a7a] focus:border-[#0066cc] ${extra}`

  const labelClass = 'block text-[14px] font-[400] text-[#7a7a7a] mb-1'
  const errorClass = 'text-[14px] text-red-500 mt-1'
  const successClass = 'text-[14px] text-green-600 mt-1'

  return (
    <>
      <SEO title={mode === 'login' ? 'Sign In' : 'Create Account'} description="Sign in or create an account at KINTOX." path="/login" />
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:flex lg:w-1/2 bg-[#272729] items-center justify-center">
          <div className="text-center px-16">
            <div className="flex justify-center mb-8"><KintoxLogo dark size="lg" /></div>
            <h2 className="text-white text-[40px] font-[600] leading-[1.1] mb-4">
              Design that<br />speaks volumes
            </h2>
            <p className="text-[17px] font-[400] leading-relaxed max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Join thousands of creators who trust KINTOX for premium design assets and brand identity solutions.
            </p>
            <div className="flex items-center justify-center gap-8 mt-12">
              {[
                { value: '50+', label: 'Projects' },
                { value: '30+', label: 'Clients' },
                { value: '95%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white text-[28px] font-[600]">{stat.value}</p>
                  <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-5 md:px-16 py-20">
          <div className="w-full max-w-[400px]">
            <div className="hidden md:block lg:hidden mb-8 p-5 bg-[#272729] rounded-2xl flex justify-center">
              <KintoxLogo dark showTagline />
            </div>
            <div className="mb-10">
              <Link to="/" className="lg:hidden"><KintoxLogo /></Link>
              <h1 className="text-[#1d1d1f] text-3xl font-bold tracking-tight mt-8 mb-2">
                {showForgot ? 'Reset password' : mode === 'login' ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="text-[#7a7a7a] text-[17px] font-[400]">
                {showForgot ? 'Enter your email and we\'ll send you a reset link.' : mode === 'login' ? "Sign in to access your orders and downloads." : "Start your journey with KINTOX."}
              </p>
            </div>

            {verifiedMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[11px]">
                <p className="text-[14px] text-green-700">{verifiedMsg}</p>
              </div>
            )}

            {!showForgot ? (
              <>
                <div className="flex border border-[#e0e0e0] rounded-[18px] p-1 mb-8">
                  {[
                    { key: 'login', label: 'Sign In' },
                    { key: 'signup', label: 'Sign Up' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => switchMode(key)}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-[18px] transition-colors cursor-pointer ${
                        mode === key ? 'bg-[#0066cc] text-white' : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="login-name" className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        id="login-name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className={inputClass('name')}
                      />
                      {errors.name && <p className={errorClass}>{errors.name}</p>}
                    </div>
                  )}
                  <div>
                    <label htmlFor="login-email" className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      id="login-email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="login-password" className={labelClass}>Password</label>
                    <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                      placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      className={inputClass('password', 'pr-10')}
                    />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors cursor-pointer">
                        <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          {showPassword
                            ? <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            : <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                          }
                        </svg>
                      </button>
                    </div>
                    {errors.password && <p className={errorClass}>{errors.password}</p>}
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="login-confirm" className={labelClass}>Confirm Password</label>
                      <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        id="login-confirm"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })) }}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        className={inputClass('confirmPassword', 'pr-10')}
                      />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors cursor-pointer">
                          <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            {showConfirm
                              ? <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              : <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                            }
                          </svg>
                        </button>
                      </div>
                      {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="text-right">
                      <button type="button" onClick={() => { setShowForgot(true); setErrors({}) }} className="text-[14px] text-[#0066cc] hover:underline bg-transparent border-none cursor-pointer">Forgot password?</button>
                    </div>
                  )}

                  {errors.form && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-[11px]">
                      <p className="text-[14px] text-red-700">{errors.form}</p>
                      {errors.form.includes('verify your email') && (
                        <button type="button" onClick={handleResendVerification} disabled={loading} className="mt-2 text-[14px] text-[#0066cc] hover:underline bg-transparent border-none cursor-pointer disabled:opacity-50">
                          Resend verification email
                        </button>
                      )}
                    </div>
                  )}
                  {errors.resend && <p className={successClass}>{errors.resend}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#0066cc] text-white text-[17px] font-semibold rounded-full hover:bg-[#0055b3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading && (
                      <svg aria-hidden="true" className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                        <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
                      </svg>
                    )}
                    {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign In' : 'Create Account')}
                  </button>

                  {mode === 'signup' && (
                    <p className="text-[12px] text-[#7a7a7a] text-center leading-relaxed">
                      By creating an account, you agree to our{' '}
                      <Link to="#" className="text-[#0066cc]">Terms of Service</Link>{' '}
                      and{' '}
                      <Link to="#" className="text-[#0066cc]">Privacy Policy</Link>.
                    </p>
                  )}
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e0e0e0]" /></div>
                  <div className="relative flex justify-center"><span className="bg-white px-4 text-[14px] text-[#7a7a7a]">or continue with</span></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <GoogleSignInButton
                    onSuccess={async (credential) => {
                      setLoading(true)
                      try {
                        if (credential) {
                          await socialLogin('', '', 'google', credential)
                        } else {
                          await socialLogin('Google User', 'google.user@demo.com', 'google')
                        }
                        navigate('/', { replace: true })
                      } catch (err) {
                        setErrors({ form: err.message })
                      }
                      setLoading(false)
                    }}
                    onError={(msg) => setErrors({ form: msg })}
                    disabled={loading}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <AppleSignInButton
                      onSuccess={async () => {
                        setLoading(true)
                        try {
                          await socialLogin('Apple User', 'apple.user@demo.com', 'apple')
                          navigate('/', { replace: true })
                        } catch {}
                        setLoading(false)
                      }}
                      onError={(msg) => setErrors({ form: msg })}
                      disabled={loading}
                    />
                    <GitHubSignInButton
                      onSuccess={async () => {
                        setLoading(true)
                        try {
                          await socialLogin('GitHub User', 'github.user@demo.com', 'github')
                          navigate('/', { replace: true })
                        } catch {}
                        setLoading(false)
                      }}
                      onError={(msg) => setErrors({ form: msg })}
                      disabled={loading}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setShowForgot(false); setForgotSent(false); setErrors({}) }}
                  className="mb-6 text-[14px] text-[#7a7a7a] hover:text-[#1d1d1f] bg-transparent border-none cursor-pointer flex items-center gap-1"
                >
                  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                  Back to sign in
                </button>

                {!forgotSent ? (
                  <form onSubmit={handleForgot} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="forgot-email" className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        id="forgot-email"
                        value={forgotEmail}
                        onChange={(e) => { setForgotEmail(e.target.value); setErrors((p) => ({ ...p, forgot: '' })) }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#7a7a7a] focus:border-[#0066cc]"
                      />
                    </div>
                    {errors.forgot && <p className={errorClass}>{errors.forgot}</p>}
                    <button
                      type="submit"
                      disabled={forgotLoading || !forgotEmail.trim()}
                      className="w-full py-3 bg-[#0066cc] text-white text-[17px] font-semibold rounded-full hover:bg-[#0055b3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-[11px]">
                    <p className="text-[14px] text-green-700">If that email is registered, a reset link has been sent. Check your inbox and spam folder.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
