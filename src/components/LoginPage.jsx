import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from './SEO'
import { useAuth } from '../context/AuthContext'
import KintoxLogo from './KintoxLogo'

const slideVariants = {
  enter: (dir) => ({ x: dir * 200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir * -200, opacity: 0 }),
}

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
  const { login, signup } = useAuth()

  const switchMode = (m) => {
    setErrors({})
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

  return (
    <>
      <SEO title={mode === 'login' ? 'Sign In' : 'Create Account'} description="Sign in or create an account at KINTOX." path="/login" />
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1D1D1F] items-center justify-center">
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#0071E3] blur-[120px]" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#0071E3] blur-[120px]" />
          </div>
          <div className="relative z-10 text-center px-16">
            <div className="flex justify-center mb-8"><KintoxLogo dark size="lg" /></div>
            <h2 className="text-white text-4xl font-bold tracking-tight leading-[1.1] mb-4">
              Design that<br />speaks volumes
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
              Join thousands of creators who trust KINTOX for premium design assets and brand identity solutions.
            </p>
            <div className="flex items-center justify-center gap-8 mt-12">
              {[
                { value: '50+', label: 'Projects' },
                { value: '30+', label: 'Clients' },
                { value: '95%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-bold text-2xl tracking-tight">{stat.value}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-5 md:px-16 py-20">
          <div className="w-full max-w-sm">
            <div className="hidden md:block lg:hidden mb-8 p-5 bg-[#1D1D1F] rounded-2xl flex justify-center">
              <KintoxLogo dark showTagline />
            </div>
            <div className="mb-10">
              <Link to="/" className="lg:hidden"><KintoxLogo /></Link>
              <h1 className="text-[#1D1D1F] text-3xl font-bold tracking-tight mt-8 mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="text-[#6E6E73] text-sm">
                {mode === 'login' ? "Sign in to access your orders and downloads." : "Start your journey with KINTOX."}
              </p>
            </div>

            <div className="flex bg-[#F5F5F7] rounded-2xl p-1 mb-8">
              {[
                { key: 'login', label: 'Sign In' },
                { key: 'signup', label: 'Sign Up' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => switchMode(key)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    mode === key ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" custom={mode === 'login' ? 1 : -1}>
              <motion.form
                key={mode}
                custom={mode === 'login' ? 1 : -1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="login-name" className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      id="login-name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none transition-all placeholder:text-[#6E6E73] text-[#1D1D1F] ${
                        errors.name ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>
                )}
                <div>
                    <label htmlFor="login-email" className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-widest mb-2">Email Address</label>
                  <input
                      type="email"
                      id="login-email"
                      value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none transition-all placeholder:text-[#6E6E73] text-[#1D1D1F] ${
                      errors.email ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="login-password" className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-widest mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                      placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                      className={`w-full px-4 py-3 pr-10 bg-[#F5F5F7] rounded-xl text-sm outline-none transition-all placeholder:text-[#6E6E73] text-[#1D1D1F] ${
                        errors.password ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'
                      }`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        {showPassword
                          ? <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          : <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                        }
                      </svg>
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>}
                </div>

                {mode === 'signup' && (
                  <div>
                    <label htmlFor="login-confirm" className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-widest mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                      type={showConfirm ? 'text' : 'password'}
                      id="login-confirm"
                      value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })) }}
                        placeholder="Re-enter your password"
                        className={`w-full px-4 py-3 pr-10 bg-[#F5F5F7] rounded-xl text-sm outline-none transition-all placeholder:text-[#6E6E73] text-[#1D1D1F] ${
                          errors.confirmPassword ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'
                        }`}
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          {showConfirm
                            ? <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            : <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                          }
                        </svg>
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-[11px] mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {mode === 'login' && (
                  <div className="text-right">
                    <Link to="#" className="text-xs text-[#0071E3] hover:underline">Forgot password?</Link>
                  </div>
                )}

                {errors.form && <p className="text-red-500 text-[11px] text-center">{errors.form}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all active:scale-[0.98] shadow-lg shadow-[#0071E3]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading && (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                      <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
                    </svg>
                  )}
                  {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign In' : 'Create Account')}
                </button>

                {mode === 'signup' && (
                  <p className="text-[10px] text-[#6E6E73] text-center leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <Link to="#" className="text-[#0071E3] hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="#" className="text-[#0071E3] hover:underline">Privacy Policy</Link>.
                  </p>
                )}
              </motion.form>
            </AnimatePresence>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E8E8ED]" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-[#6E6E73]">or continue with</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Google', d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z' },
                { name: 'Apple', d: 'M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' },
                { name: 'GitHub', d: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z' },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={async () => {
                    setLoading(true)
                    await new Promise((r) => setTimeout(r, 1000))
                    login({ email: `${p.name.toLowerCase()}@user.com`, name: `${p.name} User` })
                    setLoading(false)
                    navigate('/', { replace: true })
                  }}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 border border-[#E8E8ED] rounded-xl hover:bg-[#F5F5F7] transition-all active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  aria-label={`Sign in with ${p.name}`}
                >
                  <svg className="w-5 h-5 text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d={p.d} /></svg>
                  <span className="text-xs text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors hidden sm:inline">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
