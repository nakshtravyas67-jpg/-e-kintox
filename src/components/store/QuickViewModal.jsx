import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, cart } = useCart()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const inCart = cart.some(p => p.id === product.id)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all">
            <svg className="w-5 h-5 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-full bg-[#F5F5F7] flex items-center justify-center p-8">
              <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-wider">{product.category}</span>
                <h2 className="font-headline-md text-headline-md text-[#1D1D1F] mt-2 mb-3">{product.title}</h2>
                <p className="text-sm text-[#6E6E73] mb-4">{product.desc}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-2xl text-[#1D1D1F]">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#6E6E73] line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <span className="text-sm font-medium text-[#1D1D1F]">{product.rating}</span>
                    <span className="text-xs text-[#6E6E73]">({product.reviews} reviews)</span>
                  </div>
                </div>

                {product.features && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-2">Features</p>
                    <ul className="space-y-1.5">
                      {product.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#6E6E73]">
                          <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.software && (
                  <div className="flex items-center gap-2 text-xs text-[#6E6E73] mb-6">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6v2H8v2h8v-2h-2v-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z" /></svg>
                    Compatible with: <span className="text-[#1D1D1F] font-medium">{product.software}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${
                    inCart
                      ? 'bg-green-500 text-white'
                      : 'bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-lg shadow-[#0071E3]/20'
                  }`}
                >
                  {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-2xl font-semibold text-sm bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] transition-all text-center"
                >
                  Full Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
