import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import SEO from './SEO'
import ImagePlaceholder from './common/ImagePlaceholder'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart()

  if (cartCount === 0) {
    return (
      <>
        <SEO title="Cart is empty" description="Your shopping cart is empty. Browse KINTOX design store to find premium digital assets." path="/cart" />
        <div className="bg-white text-[#1d1d1f] min-h-screen pt-32">
          <div className="max-w-[980px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-[40px] font-semibold text-[#1d1d1f] mb-3">Your bag is empty.</h2>
            <p className="text-[17px] text-[#7a7a7a] mb-8">Browse our store and add some designs to your bag.</p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 bg-[#0066cc] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#0077ed] transition-colors">
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title={`Shopping Cart (${cartCount})`} description="Review your selected designs in the KINTOX shopping cart." path="/cart" />
      <div className="bg-white text-[#1d1d1f] min-h-screen pt-10">
        <div className="max-w-[980px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f]">Your Bag ({cartCount})</h1>
            <div className="flex items-center gap-4">
              <button onClick={clearCart} className="text-[14px] text-[#7a7a7a] hover:text-red-500 transition-colors cursor-pointer">
                Clear All
              </button>
              <Link to="/portfolio" className="text-[14px] text-[#0066cc] font-medium hover:text-[#0077ed] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 py-5 border-b border-[#e0e0e0]">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-14 sm:w-20 h-14 sm:h-20 rounded-[11px] bg-[#f5f5f7] overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlaceholder className="w-6 sm:w-8 h-6 sm:h-8" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${item.id}`} className="text-[15px] sm:text-[17px] font-semibold text-[#1d1d1f] hover:text-[#0066cc] transition-colors line-clamp-1">
                      {item.title}
                    </Link>
                    <div className="text-right sm:hidden mt-1">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">{formatPrice(item.price * (item.quantity || 1))}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right shrink-0">
                    <span className="text-[17px] font-medium text-[#1d1d1f]">{formatPrice(item.price * (item.quantity || 1))}</span>
                    {item.quantity > 1 && (
                      <p className="text-[12px] text-[#7a7a7a]">{formatPrice(item.price)} each</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-[64px] sm:pl-0">
                  <div className="flex items-center gap-3 border border-[#e0e0e0] rounded-full px-1 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[18px] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-[15px] font-medium text-[#1d1d1f] min-w-[24px] text-center">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[18px] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[#7a7a7a] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-6 pb-8">
            <span className="text-[17px] font-semibold text-[#1d1d1f]">Subtotal ({cartCount} item{cartCount !== 1 ? 's' : ''})</span>
            <span className="text-[24px] font-semibold text-[#1d1d1f]">{formatPrice(cartTotal)}</span>
          </div>
          <Link to="/checkout" className="block w-full text-center bg-[#0066cc] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#0077ed] transition-colors">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  )
}
