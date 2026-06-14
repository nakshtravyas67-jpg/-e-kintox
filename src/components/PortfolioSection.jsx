import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { allProducts as hardcodedProducts, categories } from '../data/products'
import { portfolioProjects, portfolioCategories } from '../data/portfolio'
import { useCart } from '../context/CartContext'
import { api } from '../lib/api'
import QuickViewModal from './store/QuickViewModal'
import SEO from './SEO'
import PortfolioGrid from './PortfolioGrid'
import SaleBanner from './SaleBanner'
import PortfolioFilter from './PortfolioFilter'
import TrendingCarousel from './TrendingCarousel'
import ProductGrid from './ProductGrid'
import RecentlyViewed from './RecentlyViewed'
import NewsletterForm from './NewsletterForm'
import BackToTop from './BackToTop'

export default function PortfolioSection() {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState('portfolio')
  const [portfolioFilter, setPortfolioFilter] = useState('Web Design')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const [portfolioVisible, setPortfolioVisible] = useState(6)
  const [visibleCount, setVisibleCount] = useState(8)
  const [apiProducts, setApiProducts] = useState([])
  const [mergedProducts, setMergedProducts] = useState(hardcodedProducts)
  const [addedItems, setAddedItems] = useState(new Set())
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
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
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
    api.get('/products').then((data) => {
      if (data?.products?.length) {
        setApiProducts(data.products)
        const existingIds = new Set(hardcodedProducts.map((p) => String(p.id)))
        const newProducts = data.products.filter((p) => !existingIds.has(String(p.id)))
        setMergedProducts([...hardcodedProducts, ...newProducts])
      }
    }).catch(() => {})
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
      counts[cat] = cat === 'All' ? mergedProducts.length : mergedProducts.filter(p => p.category === cat).length
    })
    return counts
  }, [mergedProducts])

  const filtered = useMemo(() => {
    return mergedProducts.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = debouncedQuery
        ? p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.desc.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
        : true
      return matchCat && matchSearch
    })
  }, [activeCategory, debouncedQuery, mergedProducts])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price
      if (sortBy === 'Price: High to Low') return b.price - a.price
      if (sortBy === 'Popular') return b.rating - a.rating
      return 0
    })
  }, [filtered, sortBy])

  const trending = useMemo(() => [...sorted].sort((a, b) => b.rating - a.rating).slice(0, 4), [sorted])

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

  const tabIcon = (key) => {
    return key === 'portfolio'
      ? 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
      : 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z'
  }

  return (
    <>
      <SEO title="Portfolio — Design Store" description="Browse KINTOX design portfolio and purchase premium digital assets including UI kits, brand identity, and social media templates." path="/portfolio" />
      <div data-nav-theme="light" className="bg-white text-[#1D1D1F] min-h-screen">
      <div className="max-w-[980px] mx-auto px-4 md:px-6 py-20 md:py-24">
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
            { key: 'portfolio', label: 'Portfolio' },
            { key: 'store', label: 'Design Store' },
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
              <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={tabIcon(tab.key)} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'portfolio' ? (
          <PortfolioGrid
            filter={portfolioFilter}
            onFilterChange={setPortfolioFilter}
            visible={portfolioVisible}
            onLoadMore={() => setPortfolioVisible(p => p + 6)}
            onSelectProject={setPortfolioModal}
            modalProject={portfolioModal}
            onCloseModal={() => setPortfolioModal(null)}
          />
        ) : (
          <div ref={storeRef}>
            <SaleBanner timeLeft={timeLeft} onBrowseAll={() => storeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
            <PortfolioFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categoryCounts={categoryCounts}
            />
            <TrendingCarousel products={trending} />
            <ProductGrid
              products={sorted}
              visibleCount={visibleCount}
              onLoadMore={() => setVisibleCount(p => p + 8)}
              onQuickView={handleQuickView}
              searchQuery={debouncedQuery}
            />
            <RecentlyViewed products={recentlyViewed} />
            <NewsletterForm />
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}

      <BackToTop visible={showBackTop} />
    </div>
    </>
  )
}
