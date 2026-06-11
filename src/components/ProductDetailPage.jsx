import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getProductById, getRelatedProducts, formatPrice, allProducts, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import SEO from './SEO'

const tabs = ['Description', 'Features', 'Screenshots', 'Reviews', 'FAQ']

function ImageZoom({ src, onClose }) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const imgRef = useRef(null)

  const onMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10">
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
      </button>
      <div
        ref={imgRef}
        className="relative w-full max-w-4xl h-[80vh] overflow-hidden cursor-zoom-out"
        onMouseMove={onMove}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Product image"
          className="w-full h-full object-contain"
          style={{ transform: 'scale(1.5)', transformOrigin: `${pos.x}% ${pos.y}%` }}
        />
      </div>
    </motion.div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap-desktop animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="bg-surface-container-high rounded-2xl h-[500px]" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => <div key={i} className="bg-surface-container-high rounded-xl h-20 w-20" />)}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-4 bg-surface-container-high rounded w-1/4" />
          <div className="h-10 bg-surface-container-high rounded w-3/4" />
          <div className="h-4 bg-surface-container-high rounded w-1/3" />
          <div className="h-8 bg-surface-container-high rounded w-1/4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-surface-container-high rounded w-full" />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function StarRating({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} className={`w-[18px] h-[18px] ${i <= Math.round(rating) ? 'text-orange-400' : 'text-outline-variant'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
    )
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('Description')
  const [zoomOpen, setZoomOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const mainImgRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    setSelectedImage(0)
    setActiveTab('Description')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!product) {
    return (
      <>
        <SEO title="Product Not Found" path="/product/*" />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap-desktop text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Product Not Found</h2>
          <p className="font-body-lg text-body-lg text-secondary mb-8">The design you're looking for doesn't exist.</p>
          <Link to="/portfolio" className="bg-primary text-on-primary px-8 py-4 font-button-text text-button-text uppercase tracking-widest inline-block">
            Back to Store
          </Link>
        </div>
      </>
    )
  }

  const relatedProducts = getRelatedProducts(product)
  const images = [product.image, ...product.screenshots]

  const onMouseMove = (e) => {
    if (!mainImgRef.current) return
    const rect = mainImgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const filteredProducts = allProducts.filter((p) => {
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <SEO title={`${product.title} — ${product.category}`} description={product.desc} path={`/product/${id}`} image={product.image} />
      <div className="bg-white text-[#1D1D1F] min-h-screen">
      {/* Store Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#F5F5F7]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3 flex items-center gap-4">
          <Link to="/portfolio" className="font-headline-md text-headline-md text-[#1D1D1F] shrink-0">
            KINTOX <span className="text-[#0071E3] font-normal text-lg">Store</span>
          </Link>
          <div className="hidden md:flex items-center gap-4 flex-1 ml-8">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73] w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F5F5F7] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]"
                placeholder="Search designs..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    filterCategory === cat ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="p-2 hover:bg-[#F5F5F7] rounded-full transition-all">
              <svg className="w-5 h-5 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.02 4.77L7.2 7h12.63l-1.97 5.68c-.2.59-.76 1-1.38 1H9.66c-.63 0-1.18-.41-1.38-1L7.2 7l-1.2-2.23C5.73 4.3 5.37 4 5 4H2v2h2l2.02 4.77zM9 20c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" /></svg>
            </button>
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-2 hover:bg-[#F5F5F7] rounded-full transition-all">
              <svg className="w-5 h-5 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
            </button>
          </div>
        </div>
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-[#F5F5F7] p-4 space-y-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73] w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F5F5F7] rounded-full text-sm outline-none"
                placeholder="Search designs..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    filterCategory === cat ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#6E6E73]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <nav className="flex items-center gap-2 text-sm text-[#6E6E73] mb-8">
          <Link to="/portfolio" className="hover:text-[#0071E3] transition-colors">Store</Link>
          <svg className="w-4 h-4 text-[#6E6E73]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
          <span className="text-[#1D1D1F]">{product.category}</span>
          <svg className="w-4 h-4 text-[#6E6E73]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
          <span className="text-[#1D1D1F] truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div
              ref={mainImgRef}
              className="relative bg-[#F5F5F7] rounded-2xl overflow-hidden cursor-crosshair h-[400px] md:h-[600px]"
              onMouseMove={onMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: isHovering ? `scale(1.8)` : 'scale(1)',
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }}
              />
              <button
                onClick={() => setZoomOpen(true)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-[#0071E3]' : 'border-transparent hover:border-[#0071E3]/30'
                  }`}
                >
                  <img src={img} alt="Product thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider">{product.category}</span>
              <h1 className="font-headline-lg text-headline-lg text-[#1D1D1F] mt-1 leading-tight">{product.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={product.rating} />
                <span className="text-sm text-[#6E6E73]">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-[#1D1D1F]">{formatPrice(product.price)}</div>

            <p className="text-[#6E6E73] leading-relaxed">{product.desc}</p>

            <div>
              <h4 className="font-semibold text-sm text-[#1D1D1F] mb-3 uppercase tracking-wider">Features</h4>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#1D1D1F]">
                    <svg className="w-5 h-5 text-[#0071E3]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#F5F5F7]">
              <div>
                <span className="text-xs text-[#6E6E73] block">What's Included</span>
                <span className="text-sm text-[#1D1D1F] font-medium">{product.whatsIncluded}</span>
              </div>
              <div>
                <span className="text-xs text-[#6E6E73] block">Software</span>
                <span className="text-sm text-[#1D1D1F] font-medium">{product.software}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E8E8ED] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-[#F5F5F7] transition-colors text-[#1D1D1F] font-medium"
                >
                  -
                </button>
                <span className="px-4 py-3 border-x border-[#E8E8ED] text-[#1D1D1F] font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-[#F5F5F7] transition-colors text-[#1D1D1F] font-medium"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { addToCart({ ...product, quantity }); navigate('/cart') }} className="flex-1 bg-[#0071E3] text-white py-4 rounded-xl font-semibold text-sm hover:bg-[#0077ED] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3H4l-4 12h9l-1 6 10-11h-6z" /></svg> Buy Now
              </button>
              <button onClick={() => addToCart({ ...product, quantity })} className="flex-1 border-2 border-[#0071E3] text-[#0071E3] py-4 rounded-xl font-semibold text-sm hover:bg-[#0071E3] hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.02 4.77L7.2 7h12.63l-1.97 5.68c-.2.59-.76 1-1.38 1H9.66c-.63 0-1.18-.41-1.38-1L7.2 7l-1.2-2.23C5.73 4.3 5.37 4 5 4H2v2h2l2.02 4.77zM9 20c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" /></svg> Add to Cart
              </button>
              <button className="p-4 border border-[#E8E8ED] rounded-xl hover:bg-[#F5F5F7] transition-all active:scale-[0.98]">
                <svg className="w-5 h-5 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C7.4 16.72 4.5 14.09 2.5 11.5 0.5 8.91 0 6.67 0 5 0 2.76 2.24 0.5 4.5 0.5 5.8 0.5 7.07 1.05 8 2.02 8.93 1.05 10.2 0.5 11.5 0.5 13.76 0.5 16 2.76 16 5c0 1.67-0.5 3.91-2.5 6.5-2 2.59-4.9 5.22-8.05 8.53L12 21.35z" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex gap-6 border-b border-[#F5F5F7] overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab ? 'text-[#0071E3] border-b-2 border-[#0071E3]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'Description' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                <p className="text-[#6E6E73] leading-relaxed text-lg">{product.longDesc}</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-4 bg-[#F5F5F7] rounded-xl">
                      <svg className="w-5 h-5 text-[#0071E3]" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                      <span className="text-sm text-[#1D1D1F]">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'Features' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                <ul className="space-y-4">
                  {product.features.map((f, i) => (
                    <li key={f} className="flex items-center gap-4 p-4 bg-[#F5F5F7] rounded-xl">
                      <span className="w-8 h-8 bg-[#0071E3] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                      <span className="text-[#1D1D1F]">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {activeTab === 'Screenshots' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="bg-[#F5F5F7] rounded-2xl overflow-hidden group cursor-pointer" onClick={() => { setSelectedImage(i); setZoomOpen(true) }}>
                      <img src={img} alt="" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'Reviews' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#1D1D1F]">{product.rating}</div>
                    <StarRating rating={product.rating} />
                    <div className="text-sm text-[#6E6E73] mt-1">{product.reviews} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1
                      return (
                        <div key={star} className="flex items-center gap-2 text-sm">
                          <span className="text-[#6E6E73] w-8">{star} ★</span>
                          <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[#6E6E73] w-8 text-right">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="py-6 border-t border-[#F5F5F7]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-sm font-semibold text-[#1D1D1F]">
                        {['AK', 'RS', 'MP'][i - 1]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#1D1D1F]">{['Aarav K.', 'Riya S.', 'Mihir P.'][i - 1]}</div>
                        <StarRating rating={5} />
                      </div>
                      <span className="ml-auto text-xs text-[#6E6E73]">{['2 weeks ago', '1 month ago', '3 weeks ago'][i - 1]}</span>
                    </div>
                    <p className="text-sm text-[#6E6E73] leading-relaxed">
                      {['Absolutely stunning design kit! Every component is pixel-perfect and the organization is incredible.',
                        'Best purchase I have made for my design toolkit. The quality is outstanding.',
                        'Great value for money. The components are well-thought-out and easy to customize.'][i - 1]}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 'FAQ' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-4">
                {product.faq.map((item, i) => (
                  <details key={i} className="group bg-[#F5F5F7] rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer text-[#1D1D1F] font-medium text-sm list-none">
                      {item.q}
                      <svg className="transition-transform group-open:rotate-180 text-[#6E6E73] w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-[#6E6E73] leading-relaxed">{item.a}</div>
                  </details>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-[#F5F5F7]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">Related Designs</h2>
              <Link to="/portfolio" className="text-sm text-[#0071E3] font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-[#0071E3] font-semibold uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-[#1D1D1F] font-semibold mt-1">{p.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[#1D1D1F] font-bold">{formatPrice(p.price)}</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
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

        <section className="mt-16 mb-8">
          <h2 className="font-headline-md text-headline-md text-[#1D1D1F] mb-8">All Products</h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-[#6E6E73] mb-4 block mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 009.5 3C6.08 3 3.28 5.64 3.03 9h2.02c.23-2.64 2.41-4.7 5.15-4.7 2.84 0 5.15 2.31 5.15 5.15 0 1.61-.74 3.05-1.9 4.05l.27.27v.79l5 4.99L20.49 19l-4.99-5zM5.59 10l-2-2L2 9.41l2 2-2 2L3.59 15l2-2 2 2L8.41 15l-2-2 2-2L7.59 10l-2 2z" /></svg>
              <p className="text-[#6E6E73]">No designs found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-[#0071E3] font-semibold uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-[#1D1D1F] font-semibold mt-1">{p.title}</h3>
                      <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2">{p.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[#1D1D1F] font-bold">{formatPrice(p.price)}</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                          <span className="text-xs text-[#6E6E73]">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {zoomOpen && <ImageZoom src={images[selectedImage]} onClose={() => setZoomOpen(false)} />}
      </AnimatePresence>
    </div>
    </>
  )
}
