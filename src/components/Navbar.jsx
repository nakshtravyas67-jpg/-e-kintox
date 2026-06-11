import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import KintoxLogo from './KintoxLogo'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Team', path: '/team' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)
  const { cartCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    let lastScroll = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > 300 && y > lastScroll)

      const sections = document.querySelectorAll('[data-nav-theme]')
      let currentTheme = false
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect()
        if (rect.top <= 80 && rect.bottom >= 80) {
          currentTheme = s.getAttribute('data-nav-theme') === 'dark'
        }
      })
      setDarkTheme(currentTheme)

      lastScroll = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl backdrop-saturate-[1.8] transition-[background-color,box-shadow] duration-300 ${
        darkTheme && !scrolled ? '' : 'bg-white/80'
      }`}
      style={{
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        backdropFilter: 'saturate(180%) blur(20px)',
        transform: 'translateZ(0)',
        willChange: 'transform',
        backgroundColor: darkTheme && !scrolled ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.8)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <nav className="flex items-center justify-between px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-11">
        <KintoxLogo dark={darkTheme && !scrolled} />

        <div className="hidden md:flex items-center justify-center flex-1 gap-0">
          {links.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-4 md:px-6 py-1 text-[11px] md:text-[12px] font-normal tracking-wide transition-colors duration-200 ${
                  darkTheme && !scrolled
                    ? (isActive ? 'text-white/90' : 'text-white/50 hover:text-white/70')
                    : (isActive ? 'text-[#1D1D1F]' : 'text-[#6E6E73] hover:text-[#1D1D1F]')
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-end w-[110px] shrink-0 gap-0.5">
          <Link
            to="/contact"
            className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-semibold rounded-lg transition-all duration-200 ${
              darkTheme && !scrolled
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-sm'
            }`}
          >
            Start Project
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => { if (isAuthenticated) { setUserMenuOpen(!userMenuOpen) } else { window.location.href = '/login' } }}
              className={`p-1.5 transition-colors duration-200 cursor-pointer ${
                darkTheme && !scrolled
                  ? 'text-white/50 hover:text-white/70'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
              aria-label={isAuthenticated ? 'Open user menu' : 'Sign in'}
            >
              {isAuthenticated ? (
                <svg className="w-[15px] h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              ) : (
                <svg className="w-[15px] h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              )}
            </button>
            <AnimatePresence>
              {userMenuOpen && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E8E8ED] overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-[#F5F5F7]">
                    <p className="text-xs font-semibold text-[#1D1D1F]">{user?.name}</p>
                    <p className="text-[10px] text-[#6E6E73]">{user?.email}</p>
                  </div>
                  <Link
                    to="/my-designs"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                    My Designs
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                    Admin
                  </Link>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false) }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/cart" className={`relative p-1.5 transition-colors duration-200 ${darkTheme && !scrolled ? 'text-white/50 hover:text-white/70' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}>
            <svg className="w-[18px] h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.02 4.77L7.2 7h12.63l-1.97 5.68c-.2.59-.76 1-1.38 1H9.66c-.63 0-1.18-.41-1.38-1L7.2 7l-1.2-2.23C5.73 4.3 5.37 4 5 4H2v2h2l2.02 4.77z" /></svg>
            {cartCount > 0 && (
              <span className={`absolute -top-0.5 -right-0.5 text-[8px] font-bold w-[14px] h-[14px] rounded-full flex items-center justify-center transition-colors duration-200 ${darkTheme && !scrolled ? 'bg-white text-black' : 'bg-[#1D1D1F] text-white'}`}>
                {cartCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-1 transition-colors duration-200 ${darkTheme && !scrolled ? 'text-white/50 hover:text-white/70' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
          >
            <svg width="18" height="44" viewBox="0 0 18 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 14H2c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zm0 7H2c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zm0 7H2c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl backdrop-saturate-[1.8] overflow-hidden border-t border-black/[0.06]"
            style={{ WebkitBackdropFilter: 'saturate(180%) blur(20px)', backdropFilter: 'saturate(180%) blur(20px)' }}
          >
            <div className="flex flex-col items-center py-4 px-margin-mobile">
              {links.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full text-center py-3 text-sm font-normal border-b border-black/[0.04] last:border-0 transition-colors duration-200 ${
                      isActive ? 'text-[#1D1D1F]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-designs"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 text-sm font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                    My Designs
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 text-sm font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    Admin
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); logout() }}
                    className="w-full text-center py-3 text-sm font-normal text-red-500 hover:text-red-600 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); window.location.href = '/login' }}
                  className="w-full text-center py-3 text-sm font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  Sign In
                </button>
              )}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 text-sm font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2h2V8h4v2h2V8h2v12z" /></svg>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
