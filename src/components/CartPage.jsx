import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import SEO from './SEO'

export default function CartPage() {
  const { cart, removeFromCart, cartCount } = useCart()

  if (cartCount === 0) {
    return (
      <>
        <SEO title="Cart is empty" description="Your shopping cart is empty. Browse KINTOX design store to find premium digital assets." path="/cart" />
        <div className="bg-white text-[#1D1D1F] min-h-screen pt-32">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center py-20">
            <svg className="w-16 h-16 text-[#6E6E73] mb-4 block mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2h2V8h4v2h2V8h2v12z" /></svg>
            <h2 className="font-headline-lg text-headline-lg text-[#1D1D1F] mb-3">Your cart is empty</h2>
            <p className="text-[#6E6E73] mb-8">Browse our store and add some designs to your cart.</p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 bg-[#0071E3] text-white px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#0077ED] transition-all">
              Go to Store <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const total = cart.reduce((s, i) => s + i.price, 0)

  return (
    <>
      <SEO title={`Shopping Cart (${cartCount})`} description="Review your selected designs in the KINTOX shopping cart." path="/cart" />
      <div className="bg-white text-[#1D1D1F] min-h-screen pt-24 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center justify-between mb-10 pt-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F]">Shopping Cart ({cartCount})</h1>
            <Link to="/portfolio" className="text-sm text-[#0071E3] font-medium hover:text-[#0077ED] transition-colors">
              Continue Shopping
            </Link>
          </div>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-[#F5F5F7] rounded-2xl hover:bg-[#F0F0F2] transition-colors group">
                <img src={item.image} alt={item.title} className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-semibold text-sm md:text-base text-[#1D1D1F] hover:text-[#0071E3] transition-colors">{item.title}</Link>
                  <p className="text-xs text-[#6E6E73] mt-0.5">{item.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-base md:text-lg text-[#1D1D1F]">{formatPrice(item.price)}</span>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-[#6E6E73] hover:text-red-500 transition-colors cursor-pointer p-2 opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="Remove item">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-6 md:p-8 bg-[#F5F5F7] rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Total</p>
              <p className="text-xs text-[#6E6E73] mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-[#0071E3]">{formatPrice(total)}</span>
          </div>
          <div className="mt-8 text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 bg-[#0071E3] text-white px-10 py-4 rounded-2xl font-semibold text-sm hover:bg-[#0077ED] transition-all shadow-lg shadow-[#0071E3]/20 active:scale-[0.98]">
              Proceed to Checkout <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
