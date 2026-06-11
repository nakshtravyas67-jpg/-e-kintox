import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { allProducts, categories, formatPrice } from '../data/products'
import { portfolioProjects, portfolioCategories } from '../data/portfolio'
import { useCart } from '../context/CartContext'
import ProductCard from './store/ProductCard'
import QuickViewModal from './store/QuickViewModal'
import SEO from './SEO'

const iconMap = {
  'All': 'grid_view', 'Website UI': 'web', 'App UI': 'smartphone',
  'YouTube Thumbnails': 'smart_display', 'Posters': 'wall_art', 'Social Media': 'share',
}

const svgIcons = {
  search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  arrow_back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  arrow_forward: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  arrow_upward: 'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z',
  arrow_outward: 'M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z',
  check_circle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  verified: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  auto_awesome: 'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z',
  lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  search_off: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 000 9.5C0 5.36 3.36 2 7.5 2c1.5 0 2.89.45 4.05 1.21L15 8l-2 2v2l-2 2 8 8 2-2-8-8z',
  trending_up: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  timer: 'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
}

function SvgIcon({ name, className }) {
  return (
    <svg className={className || 'w-5 h-5'} viewBox="0 0 24 24" fill="currentColor">
      <path d={svgIcons[name] || ''} />
    </svg>
  )
}

function PortfolioModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer">
            <SvgIcon name="close" className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
            <h3 className="text-white text-2xl font-bold mt-2">{project.title}</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div><span className="text-[#6E6E73]">Client:</span> <span className="text-[#1D1D1F] font-medium">{project.client}</span></div>
            <div><span className="text-[#6E6E73]">Year:</span> <span className="text-[#1D1D1F] font-medium">{project.year}</span></div>
            <div><span className="text-[#6E6E73]">Role:</span> <span className="text-[#1D1D1F] font-medium">{project.role}</span></div>
          </div>
          <p className="text-[#6E6E73] text-sm leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-medium text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-md">{tag}</span>
            ))}
          </div>
          {project.results && (
            <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
              <SvgIcon name="trending_up" className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{project.results}</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const { addToCart, cart } = useCart()
  const [activeTab, setActiveTab] = useState('portfolio')
  const [portfolioFilter, setPortfolioFilter] = useState('Web Design')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const [portfolioVisible, setPortfolioVisible] = useState(6)
  const [visibleCount, setVisibleCount] = useState(8)
  const handleLoadMore = () => setVisibleCount(prev => prev + 8)
  const handlePortfolioLoadMore = () => setPortfolioVisible(prev => prev + 6)
  const [addedItems, setAddedItems] = useState(new Set())
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('')
  const [showBackTop, setShowBackTop] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [portfolioModal, setPortfolioModal] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [timeLeft, setTimeLeft] = useState({ hours: 2, mins: 30, secs: 0 })

  const storeRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('kintox_sale_end')
    let endTime = stored ? parseInt(stored, 10) : null
    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000
      localStorage.setItem('kintox_sale_end', endTime.toString())
    }
    const timer = setInterval(() => {
      const diff = Math.max(0, endTime - Date.now())
      const hours = Math.floor(diff / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ hours, mins, secs })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    try { setRecentlyViewed(JSON.parse(localStorage.getItem('kintox_recent') || '[]')) } catch { }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  useEffect(() => {
    setVisibleCount(8)
    setAddedItems(new Set())
  }, [debouncedQuery, activeCategory, sortBy])

  const categoryCounts = useMemo(() => {
    const counts = {}
    categories.forEach(cat => {
      counts[cat] = cat === 'All' ? allProducts.length : allProducts.filter(p => p.category === cat).length
    })
    return counts
  }, [])

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = debouncedQuery
        ? p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.desc.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
        : true
      return matchCat && matchSearch
    })
  }, [activeCategory, debouncedQuery])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price
      if (sortBy === 'Price: High to Low') return b.price - a.price
      if (sortBy === 'Popular') return b.rating - a.rating
      return 0
    })
  }, [filtered, sortBy])

  const trending = useMemo(() => [...sorted].sort((a, b) => b.rating - a.rating).slice(0, 4), [sorted])

  const filteredPortfolio = useMemo(() => {
    return portfolioProjects.filter(p => p.category === portfolioFilter)
  }, [portfolioFilter])

  const handleQuickAdd = useCallback((e, product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAddedItems(prev => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 1500)
  }, [addToCart])

  const handleQuickView = (product) => {
    setQuickViewProduct(product)
    setRecentlyViewed(prev => {
      const next = [product, ...prev.filter(p => p.id !== product.id)].slice(0, 6)
      localStorage.setItem('kintox_recent', JSON.stringify(next))
      return next
    })
  }

  const scrollToStore = () => {
    setActiveTab('store')
    setTimeout(() => {
      storeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleNewsletter = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(newsletterEmail)) {
      setNewsletterStatus('error')
      return
    }
    setNewsletterStatus('success')
    setNewsletterEmail('')
    setTimeout(() => setNewsletterStatus(''), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stockBadge = (stock) => {
    if (stock === 'In Stock') return 'text-green-700 bg-green-50 border-green-200'
    if (stock === 'Few Left') return 'text-orange-600 bg-orange-50 border-orange-200'
    if (stock === 'Limited') return 'text-red-600 bg-red-50 border-red-200'
    return 'text-[#6E6E73] bg-[#F5F5F7] border-[#E8E8ED]'
  }

  return (
    <>
      <SEO title="Portfolio — Design Store" description="Browse KINTOX design portfolio and purchase premium digital assets including UI kits, brand identity, and social media templates." path="/portfolio" />
      <div data-nav-theme="light" className="bg-white text-[#1D1D1F] min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap-desktop">
        <header className="mb-8 md:mb-10 text-center">
          <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-widest block mb-4">PORTFOLIO & STORE</span>
          <h1 className="font-headline-lg text-headline-lg text-[#1D1D1F] mb-4 leading-tight">
            Work & Products
          </h1>
          <p className="text-[#6E6E73] max-w-2xl mx-auto text-lg">
            Browse our design portfolio and purchase premium digital assets.
          </p>
        </header>

        <div className="flex items-center justify-center gap-1 mb-12 bg-[#F5F5F7] p-1 rounded-2xl w-fit mx-auto">
          {[
            { key: 'portfolio', label: 'Portfolio', icon: 'palette' },
            { key: 'store', label: 'Design Store', icon: 'store' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-[#1D1D1F] shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={tab.key === 'portfolio'
                  ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  : "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'portfolio' ? (
          <section>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">Featured Projects</h2>
              <div className="flex flex-wrap gap-2">
                {portfolioCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      portfolioFilter === cat
                        ? 'bg-[#1D1D1F] text-white'
                        : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolio.slice(0, portfolioVisible).map((project) => (
                <div key={project.id} onClick={() => setPortfolioModal(project)} className="group bg-[#F5F5F7] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                      <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium bg-[#0071E3]/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-[#0071E3] transition-all cursor-pointer">
                        View Project <SvgIcon name="arrow_outward" className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-semibold text-[#0071E3] bg-[#0071E3]/8 px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
                      <span className="text-xs text-[#6E6E73]">{project.year}</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-[#1D1D1F] mb-1">{project.title}</h3>
                    <p className="text-sm text-[#6E6E73] mb-1">Client: <span className="text-[#1D1D1F] font-medium">{project.client}</span></p>
                    <p className="text-xs text-[#6E6E73] mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                    {project.results && (
                      <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                        <SvgIcon name="trending_up" className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{project.results}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {portfolioVisible < filteredPortfolio.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={handlePortfolioLoadMore}
                  className="px-8 py-3.5 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-sm hover:bg-[#E8E8ED] transition-all active:scale-[0.97] cursor-pointer"
                >
                  Load More ({filteredPortfolio.length - portfolioVisible} remaining)
                </button>
              </div>
            )}

            <div className="mt-12 text-center">
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#0071E3] font-medium hover:underline"
              >
                View all projects on Behance <SvgIcon name="arrow_outward" className="w-4 h-4" />
              </a>
            </div>
          </section>
        ) : (
          <div ref={storeRef}>
            <div className="mb-16 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F5F5F7] via-white to-[#F0F4FF] border border-[#E8E8ED]">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0071E3]/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00C6FF]/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#0071E3] uppercase tracking-[0.15em] bg-[#0071E3]/8 px-4 py-1.5 rounded-full">Limited Time Offer</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full">
                      <span className="text-xs">🔥</span> Best Seller
                    </span>
                  </div>
                  <h2 className="text-[#1D1D1F] text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.03em]">
                    Summer <span className="text-[#0071E3]">Design</span> Sale
                  </h2>
                  <div className="flex items-center gap-3">
                    <p className="text-[#6E6E73] text-lg leading-relaxed max-w-lg">
                      Up to <strong className="text-[#1D1D1F]">50% OFF</strong> on Premium UI Kits, Website Templates, App Designs, YouTube Thumbnail Packs, and Social Media Assets.
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1D1D1F] bg-[#F5F5F7] px-3 py-1.5 rounded-full shrink-0">
                      <SvgIcon name="timer" className="w-4 h-4 text-[#0071E3]" />
                      {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.mins).padStart(2, '0')}:{String(timeLeft.secs).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/product/1" className="inline-flex items-center gap-2 bg-[#0071E3] text-white px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-[#0077ED] transition-all shadow-lg shadow-[#0071E3]/20 active:scale-[0.97]">
                      Shop Now <SvgIcon name="arrow_forward" className="w-4 h-4" />
                    </Link>
                    <button onClick={scrollToStore} className="inline-flex items-center gap-2 bg-white text-[#1D1D1F] px-8 py-4 rounded-2xl font-semibold text-sm border border-[#E8E8ED] hover:border-[#0071E3] hover:text-[#0071E3] transition-all active:scale-[0.97] cursor-pointer">
                      Browse All <SvgIcon name="arrow_forward" className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-6 pt-4">
                    {[
                      { icon: 'check_circle', text: 'Instant Download' },
                      { icon: 'verified', text: 'Commercial License' },
                      { icon: 'auto_awesome', text: 'Premium Quality' },
                      { icon: 'lock', text: 'Lifetime Access' },
                    ].map((b) => (
                      <div key={b.text} className="flex items-center gap-2 text-sm text-[#6E6E73]">
                        <SvgIcon name={b.icon} className="w-5 h-5 text-[#0071E3]" />
                        {b.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-xl border border-white/40 animate-bounce-slow flex items-center gap-2 z-10">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-md">⭐</span>
                    <span className="text-xs font-semibold text-[#1D1D1F]">Top Rated</span>
                  </div>
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-xl border border-white/40 animate-bounce-slow flex items-center gap-2 z-10" style={{ animationDelay: '1.5s' }}>
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-bold rounded-md">🚀</span>
                    <span className="text-xs font-semibold text-[#1D1D1F]">New Collection</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl rotate-[-3deg] hover:rotate-0 transition-all duration-500">
                      <div className="h-24 md:h-32 bg-gradient-to-br from-[#0071E3] to-[#00C6FF] flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V4.07c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z" /></svg>
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider">Web Design</p>
                        <p className="text-xs font-semibold text-[#1D1D1F]">UI Kit</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl rotate-[3deg] hover:rotate-0 transition-all duration-500 mt-4">
                      <div className="h-24 md:h-32 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z" /></svg>
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider">App UI</p>
                        <p className="text-xs font-semibold text-[#1D1D1F]">Mobile Kit</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl rotate-[-2deg] hover:rotate-0 transition-all duration-500 -mt-4">
                      <div className="h-24 md:h-32 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3H2v15h7l-2 2v1h10v-1l-2-2h7V3zm-2 13H4V5h16v11z" /></svg>
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider">Thumbnail</p>
                        <p className="text-xs font-semibold text-[#1D1D1F]">Pack</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl rotate-[2deg] hover:rotate-0 transition-all duration-500">
                      <div className="h-24 md:h-32 bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l1.26-2.75L23 5l-2.74-1.26L19 1l-1.26 2.74L15 5l2.74 1.26L19 9zm-9 2l-1.26 2.74L6 15l2.74 1.26L10 19l1.26-2.74L14 15l-2.74-1.26L10 11zm9 4l-1.26 2.74L15 19l2.74 1.26L19 23l1.26-2.74L23 19l-2.74-1.26L19 15z" /></svg>
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider">Poster</p>
                        <p className="text-xs font-semibold text-[#1D1D1F]">Design</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10 space-y-4">
              <div className="relative max-w-xl mx-auto">
                <SvgIcon name="search" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73] pointer-events-none" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F7] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]"
                  placeholder="Search designs by name, category, or description..."
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                    <SvgIcon name="close" className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => {
                  const catIcons = { 'All': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', 'Website UI': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', 'App UI': 'M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zM12 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z', 'YouTube Thumbnails': 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 8v8l6-4z', 'Posters': 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 8v8l6-4z', 'Social Media': 'M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12z' }
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-[#1D1D1F] text-white'
                          : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={catIcons[cat] || catIcons['All']} /></svg>
                      {cat}
                      <span className={`ml-0.5 text-[10px] ${
                        activeCategory === cat ? 'text-white/60' : 'text-[#6E6E73]'
                      }`}>
                        ({categoryCounts[cat]})
                      </span>
                    </button>
                  )
                })}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ml-2 bg-[#F5F5F7] rounded-full px-4 py-2 text-sm text-[#6E6E73] outline-none cursor-pointer border-none"
                >
                  <option>Newest</option>
                  <option>Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-20">
                <SvgIcon name="search_off" className="w-16 h-16 text-[#6E6E73] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">No designs found</h3>
                <p className="text-[#6E6E73]">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              <>
                {trending.length > 0 && (
                  <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">Trending Products</h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => document.getElementById('trending-scroll').scrollBy({ left: -320, behavior: 'smooth' })}
                          className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#E8E8ED] transition-all cursor-pointer"
                        >
                          <SvgIcon name="arrow_back" className="w-4 h-4 text-[#1D1D1F]" />
                        </button>
                        <button
                          onClick={() => document.getElementById('trending-scroll').scrollBy({ left: 320, behavior: 'smooth' })}
                          className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#E8E8ED] transition-all cursor-pointer"
                        >
                          <SvgIcon name="arrow_forward" className="w-4 h-4 text-[#1D1D1F]" />
                        </button>
                      </div>
                    </div>
                    <div id="trending-scroll" className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
                      {trending.map((p) => (
                        <Link key={p.id} to={`/product/${p.id}`} className="shrink-0 w-[280px] snap-start group">
                          <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden h-full">
                            <div className="h-44 overflow-hidden relative">
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute top-3 left-3 flex gap-1.5">
                                {p.badge && <span className="bg-[#0071E3] text-white px-3 py-1 rounded-full text-[10px] font-medium">{p.badge}</span>}
                                {p.originalPrice && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-medium">-{Math.round((1 - p.price / p.originalPrice) * 100)}%</span>}
                              </div>
                            </div>
                            <div className="p-4 bg-white">
                              <span className="text-[10px] text-[#0071E3] font-semibold uppercase tracking-wider">{p.category}</span>
                              <h3 className="font-semibold text-[#1D1D1F] mt-1 group-hover:text-[#0071E3] transition-colors">{p.title}</h3>
                              <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2">{p.desc}</p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-bold text-[#0071E3]">{formatPrice(p.price)}</span>
                                  {p.originalPrice && <span className="text-[10px] text-[#6E6E73] line-through">{formatPrice(p.originalPrice)}</span>}
                                </div>
                                <div className="flex items-center gap-1">
                                  <SvgIcon name="star" className="w-4 h-4 text-orange-400" />
                                  <span className="text-xs text-[#6E6E73]">{p.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                <section className="relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRDFEMUYiIGZpbGwtb3BhY2l0eT0iMC4wMjUiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">{debouncedQuery ? 'Search Results' : 'All Designs'}</h2>
                      <span className="text-sm text-[#6E6E73]">{sorted.length} products</span>
                    </div>
                    <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {sorted.slice(0, visibleCount).map((p, i) => (
                        <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}>
                          <ProductCard product={p} index={i} onQuickView={handleQuickView} />
                        </motion.div>
                      ))}
                    </motion.div>
                  {visibleCount < sorted.length && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={handleLoadMore}
                        className="px-8 py-3.5 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-sm hover:bg-[#E8E8ED] transition-all active:scale-[0.97] cursor-pointer"
                      >
                        Load More ({sorted.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                  </div>
                </section>
              </>
            )}

            {recentlyViewed.length > 0 && (
              <section className="mb-12">
                <h2 className="font-headline-md text-headline-md text-[#1D1D1F] mb-6">Recently Viewed</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                  {recentlyViewed.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} className="shrink-0 w-40 group">
                      <div className="bg-[#F5F5F7] rounded-xl overflow-hidden">
                        <div className="h-24 overflow-hidden">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3 bg-white">
                          <p className="text-xs font-semibold text-[#1D1D1F] truncate">{p.title}</p>
                          <p className="text-[10px] text-[#0071E3] font-medium mt-0.5">{formatPrice(p.price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-20 py-16 px-8 md:px-16 rounded-2xl bg-[#0071E3] relative overflow-hidden">
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="font-headline-lg text-headline-lg text-white mb-4">Join the Kintox Collective</h2>
                <p className="text-white/80 text-lg mb-8">Get early access to weekly design drops, freebies, and professional design tips delivered to your inbox.</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <input
                      value={newsletterEmail}
                      onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus('') }}
                      onKeyDown={(e) => e.key === 'Enter' && handleNewsletter()}
                      className={`px-6 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-white/20 transition-all w-full sm:w-80 text-sm ${
                        newsletterStatus === 'error' ? 'border-red-400' : 'border-white/20'
                      }`}
                      placeholder="Your email address"
                      type="email"
                    />
                    <button onClick={handleNewsletter} className="px-8 py-3.5 rounded-xl bg-white text-[#0071E3] font-semibold text-sm hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap cursor-pointer">Subscribe</button>
                  </div>
                  {newsletterStatus === 'error' && <p className="text-red-300 text-xs">Please enter a valid email address.</p>}
                  {newsletterStatus === 'success' && <p className="text-green-300 text-xs">Thanks for subscribing!</p>}
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
            </section>
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}

      <AnimatePresence>
        {portfolioModal && (
          <PortfolioModal project={portfolioModal} onClose={() => setPortfolioModal(null)} />
        )}
      </AnimatePresence>

      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#1D1D1F] text-white shadow-xl hover:bg-[#0071E3] transition-all flex items-center justify-center cursor-pointer active:scale-90 animate-bounce-slow"
        >
          <SvgIcon name="arrow_upward" className="w-6 h-6" />
        </button>
      )}
    </div>
    </>
  )
}
