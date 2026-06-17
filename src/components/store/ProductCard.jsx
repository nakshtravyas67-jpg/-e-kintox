import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { motion } from 'framer-motion'
import ImagePlaceholder from '../common/ImagePlaceholder'

const categoryColors = {
  'Website UI': { bar: '#0066cc', text: '#0066cc', bg: 'rgba(0,102,204,0.08)' },
  'Social Media': { bar: '#ff9500', text: '#ff9500', bg: 'rgba(255,149,0,0.08)' },
  'YouTube Thumbnails': { bar: '#ff3b30', text: '#ff3b30', bg: 'rgba(255,59,48,0.08)' },
  'App UI': { bar: '#5856d6', text: '#5856d6', bg: 'rgba(88,86,214,0.08)' },
  'Posters': { bar: '#34c759', text: '#34c759', bg: 'rgba(52,199,89,0.08)' },
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function ProductCard({ product, index = 0, onQuickView }) {
  const { addToCart, cart } = useCart()
  const { inWishlist, toggleWishlist } = useWishlist()
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [added, setAdded] = useState(false)
  const touch = useRef(false)
  const cc = categoryColors[product.category] || { bar: '#7a7a7a', text: '#7a7a7a', bg: '#f5f5f7' }

  useEffect(() => {
    touch.current = isTouchDevice()
  }, [])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 12, y: y * -12 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const inCart = cart.some(p => p.id === product.id)
  const alwaysShow = touch.current

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/product/${product.id}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group block perspective-[800px]"
      >
        <div
          className="bg-[#F5F5F7] rounded-2xl overflow-hidden transition-all duration-[400ms] relative"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          <div className="relative h-48 overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed]">
                <ImagePlaceholder standalone className="w-12 h-12" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="bg-[#0071E3] text-white px-3 py-1 rounded-full text-[10px] font-medium">{product.badge}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-medium">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {product.stock && (
              <div className={`absolute bottom-3 left-3 text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                product.stock === 'In Stock' ? 'text-green-700 bg-green-50 border-green-200' :
                product.stock === 'Few Left' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                'text-red-600 bg-red-50 border-red-200'
              }`}>
                {product.stock}
              </div>
            )}

            <div className={`absolute top-3 right-3 flex flex-col gap-1.5 transition-all duration-300 ${
                alwaysShow ? 'opacity-100 translate-x-0' : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
              }`}>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product) }}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg cursor-pointer"
                aria-label={inWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill={inWishlist(product.id) ? '#ff3b30' : 'none'} stroke={inWishlist(product.id) ? '#ff3b30' : '#1D1D1F'} strokeWidth="2"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" /></svg>
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product) }}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg cursor-pointer"
                aria-label="Quick view"
              >
                <svg aria-hidden="true" className="w-4 h-4 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
              </button>
            </div>
          </div>

          <div className="p-6 bg-white relative">
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: cc.bar }} />
            <div className="flex items-center justify-between mb-2 pl-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: cc.text }}>{product.category}</span>
              {product.software && (
                <span className="text-[9px] text-[#6E6E73] bg-[#F5F5F7] px-2 py-0.5 rounded-full">{product.software.split(',')[0].trim()}</span>
              )}
            </div>

            <h3 className="font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors transition-apple-fast pl-3">{product.title}</h3>
            <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2 pl-3">{product.desc}</p>

            <div className="flex items-center gap-2 mt-3 mb-3 pl-3">
              {product.colors?.map((c) => (
                <button
                  key={c}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                  className="w-7 h-7 rounded-full border-2 border-transparent hover:border-[#0071E3] transition-colors min-w-[28px] min-h-[28px]"
                  style={{background: c}}
                  aria-label={c}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pl-3">
              <div className="flex items-baseline gap-1.5 overflow-hidden">
                <span className="font-bold text-lg text-[#0071E3] transition-all duration-300 group-hover:-translate-y-1 block">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#6E6E73] line-through transition-all duration-300 group-hover:-translate-y-1 block">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <svg aria-hidden="true" className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <span className="text-xs text-[#6E6E73]">{product.rating}</span>
                  <span className="text-[10px] text-[#6E6E73] ml-0.5">({product.reviews})</span>
                </div>
                <button
                  onClick={handleAdd}
                  className={`min-w-[44px] min-h-[44px] px-4 py-2.5 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                    added || inCart
                      ? 'bg-green-500 text-white'
                      : 'bg-[#0071E3] text-white'
                  }`}
                >
                  {added || inCart ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}