import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/products'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const categoryColors = {
  'YouTube Thumbnails': { bar: '#ff3b30', text: '#ff3b30', bg: 'rgba(255,59,48,0.08)' },
  'Posters': { bar: '#34c759', text: '#34c759', bg: 'rgba(52,199,89,0.08)' },
  'Business Cards': { bar: '#5856d6', text: '#5856d6', bg: 'rgba(88,86,214,0.08)' },
  'Wedding Cards': { bar: '#ff9500', text: '#ff9500', bg: 'rgba(255,149,0,0.08)' },
}

export default function ProductPackages({ product, index = 0 }) {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [added, setAdded] = useState(null)
  const cc = categoryColors[product.category] || { bar: '#0066cc', text: '#0066cc', bg: 'rgba(0,102,204,0.08)' }

  const handleOrder = (pkg) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/portfolio' } })
      return
    }
    addToCart({ ...product, selectedPkg: pkg.tier, price: pkg.price, title: `${product.title} — ${pkg.tier}` })
    setAdded(pkg.tier)
    toast.success(`${product.title} — ${pkg.tier} added to cart!`)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 last:mb-0"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: cc.bar }} />
        <h2 className="text-[28px] md:text-[34px] font-[600] text-[#1d1d1f]">{product.title}</h2>
        {product.badge && (
          <span className="text-[10px] font-[600] text-[#0066cc] bg-[#e8f0fe] px-2.5 py-1 rounded-full">{product.badge}</span>
        )}
      </div>
      <p className="text-[14px] text-[#7a7a7a] ml-4 mb-2 max-w-xl">{product.desc}</p>
      <p className="text-[12px] text-[#7a7a7a] ml-4 mb-6">{product.software}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {product.packages?.map((pkg) => (
          <motion.div
            key={pkg.tier}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative bg-white border rounded-[18px] p-6 flex flex-col ${
              pkg.popular ? 'border-[#0066cc] shadow-md shadow-[#0066cc]/10' : 'border-[#e0e0e0]'
            }`}
          >
            {pkg.popular && (
              <>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0066cc] text-white text-[10px] font-[600] px-4 py-1 rounded-full">Most Popular</span>
                </div>
              </>
            )}
            <div className="flex items-center justify-between mb-1 mt-1">
              <span className="text-[15px] font-[600] text-[#1d1d1f]">{pkg.tier}</span>
              <span className="text-[10px] text-[#7a7a7a] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{pkg.recommend}</span>
            </div>
            <p className={`text-[32px] font-[600] my-3 ${pkg.popular ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>{formatPrice(pkg.price)}</p>
            <ul className="space-y-2 flex-1 mb-5">
              {pkg.features.map((f, i) => (
                <li key={i} className="text-[13px] text-[#7a7a7a] flex items-start gap-2">
                  <svg aria-hidden="true" className="w-4 h-4 text-[#34c759] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleOrder(pkg)}
              className={`w-full min-h-[44px] rounded-full text-[14px] font-[500] transition-all cursor-pointer ${
                added === pkg.tier
                  ? 'bg-[#34c759] text-white'
                  : pkg.popular
                    ? 'bg-[#0066cc] text-white hover:opacity-90'
                    : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
              }`}
            >
              {added === pkg.tier ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}