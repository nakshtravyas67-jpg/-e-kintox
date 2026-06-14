import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import SEO from './SEO'

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart, cart } = useCart()

  return (
    <>
      <SEO title="Wishlist — KINTOX" description="Your saved design products" path="/wishlist" />
      <div className="bg-[#272729] pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-[40px] font-[600] text-white leading-tight">Wishlist</h1>
          <p className="text-[17px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <div className="bg-white min-h-[50vh]">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 py-12">
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <svg aria-hidden="true" className="w-12 h-12 text-[#7a7a7a] mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg>
              <p className="text-[#7a7a7a] text-[17px] mb-4">Your wishlist is empty.</p>
              <Link to="/portfolio" className="inline-flex px-4 md:px-6 py-3 bg-[#0066cc] text-white text-[17px] font-[400] rounded-full hover:opacity-90 transition-opacity">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlist.map((product) => {
                const inCart = cart.some(p => p.id === product.id)
                return (
                  <div key={product.id} className="bg-white border border-[#e0e0e0] rounded-[18px] overflow-hidden group">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="bg-[#f5f5f7] aspect-[4/3] flex items-center justify-center">
                        <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-[600] text-[#0066cc] uppercase tracking-wider">{product.category}</span>
                          <h3 className="text-[17px] font-[600] text-[#1d1d1f] mt-1">{product.title}</h3>
                        </div>
                        <button onClick={() => toggleWishlist(product)} className="shrink-0 w-11 h-11 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e8e8ed] transition-colors cursor-pointer" aria-label="Remove from wishlist">
                          <svg aria-hidden="true" className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        </button>
                      </div>
                      <p className="text-[14px] text-[#7a7a7a] mt-2 line-clamp-2">{product.desc}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[20px] font-[700] text-[#0066cc]">{formatPrice(product.price)}</span>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={inCart}
                          className="px-4 py-2 bg-[#0066cc] text-white text-[14px] font-[500] rounded-full hover:opacity-90 transition-opacity disabled:bg-green-500 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {inCart ? 'In Cart ✓' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
