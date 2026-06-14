import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
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
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
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
      lastScroll = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: '#000000', height: 44, paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <nav className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-5 md:px-6" style={{ paddingLeft: 'max(1.25rem, env(safe-area-inset-left, 0px))', paddingRight: 'max(1.25rem, env(safe-area-inset-right, 0px))' }}>
          <div className="flex items-center gap-8">
            <KintoxLogo dark />
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="hidden md:flex items-center gap-5"
            >
              {links.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.label}
                    variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className="text-[12px] font-[400] tracking-[-0.12px] transition-opacity duration-200"
                      style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
                      onMouseEnter={(e) => e.target.style.opacity = '1'}
                      onMouseLeave={(e) => { if (!isActive) e.target.style.opacity = '' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <Link to="/contact" className="btn-primary text-[14px] font-[400] py-[6px] px-[14px] hidden md:inline-flex">
                Start Project
              </Link>
            )}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => { if (isAuthenticated) { setUserMenuOpen(!userMenuOpen) } else { window.location.href = '/login' } }}
                className="btn-icon-circle bg-white/10 backdrop-blur-none hover:bg-white/20 cursor-pointer"
                aria-label={isAuthenticated ? 'User menu' : 'Sign in'}
              >
                {isAuthenticated ? (
                  <svg aria-hidden="true" className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                ) : (
                  <svg aria-hidden="true" className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                )}
              </button>
              <AnimatePresence>
                {userMenuOpen && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full w-48 bg-white rounded-[18px] shadow-lg border border-[#e0e0e0] overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-[#f0f0f0]">
                      <p className="text-[14px] font-[600] text-[#1d1d1f]">{user?.name}</p>
                      <p className="text-[12px] text-[#7a7a7a]">{user?.email}</p>
                    </div>
                    <Link to="/my-orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-[14px] text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors">My Orders</Link>
                    <Link to="/my-designs" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-[14px] text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors">My Designs</Link>

                    <button onClick={() => { logout(); setUserMenuOpen(false) }} className="w-full flex items-center gap-2 px-4 py-2.5 text-[14px] text-red-500 hover:bg-[#f5f5f7] transition-colors cursor-pointer">Sign Out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/wishlist" className="btn-icon-circle bg-white/10 backdrop-blur-none hover:bg-white/20 relative" aria-label="Wishlist">
              <svg aria-hidden="true" className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" /></svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] rounded-full bg-[#ff3b30] text-white text-[8px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="btn-icon-circle bg-white/10 backdrop-blur-none hover:bg-white/20 relative" aria-label="Cart">
              <svg aria-hidden="true" className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.02 4.77L7.2 7h12.63l-1.97 5.68c-.2.59-.76 1-1.38 1H9.66c-.63 0-1.18-.41-1.38-1L7.2 7l-1.2-2.23C5.73 4.3 5.37 4 5 4H2v2h2l2.02 4.77z"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] rounded-full bg-white text-black text-[8px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Toggle Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden btn-icon-circle bg-white/10 backdrop-blur-none hover:bg-white/20 cursor-pointer"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 5h14M2 9h14M2 13h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80"
            style={{ paddingTop: 'calc(44px + env(safe-area-inset-top, 0px))' }}
          >
            <div className="bg-white h-full overflow-y-auto">
              <div className="flex flex-col px-5 py-6">
                {links.map((link) => {
                  const isActive = location.pathname === link.path
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="py-4 text-[17px] font-[400] border-b border-[#f0f0f0]"
                      style={{ color: isActive ? '#0066cc' : '#1d1d1f' }}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                {isAuthenticated ? (
                  <>
                    <Link to="/my-designs" onClick={() => setMobileOpen(false)} className="py-4 text-[17px] text-[#7a7a7a] border-b border-[#f0f0f0]">My Designs</Link>

                    <button onClick={() => { setMobileOpen(false); logout() }} className="py-4 text-[17px] text-red-500 text-left cursor-pointer">Sign Out</button>
                  </>
                ) : (
                  <button onClick={() => { setMobileOpen(false); window.location.href = '/login' }} className="py-4 text-[17px] text-[#7a7a7a] text-left cursor-pointer">Sign In</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
