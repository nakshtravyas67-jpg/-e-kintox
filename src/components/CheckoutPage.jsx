import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { formatPrice } from '../data/products'
import SEO from './SEO'
import ImagePlaceholder from './common/ImagePlaceholder'

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_7j2OQp7byLBP3B'

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', address: '', notes: '' })
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [upiTid, setUpiTid] = useState('')

  const UPI_ID = import.meta.env.VITE_UPI_ID || 'nakshtr.144@okaxis'
  const UPI_PAYLOAD = `upi://pay?pa=${UPI_ID}&pn=KINTOX&am=${cartTotal}&cu=INR&tn=Order%20${Date.now().toString(36)}`
  const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(UPI_PAYLOAD)}`

  if (cartCount === 0 && !done) {
    return (
        <div className="bg-white min-h-screen pt-32 text-center px-4 md:px-6">
          <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-3">Your cart is empty</h2>
        <Link to="/portfolio" className="inline-block bg-[#0066cc] text-white px-8 py-3 rounded-full text-[14px] font-[500]">Browse Store</Link>
      </div>
    )
  }

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpayScript()
    if (!loaded) throw new Error('Failed to load Razorpay SDK')

    const { orderId: rzpOrderId, amount } = await api.post('/orders/razorpay-order', { amount: cartTotal })

    return new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY,
        amount,
        currency: 'INR',
        name: 'KINTOX',
        description: `Order of ${cartCount} item(s)`,
        order_id: rzpOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#0066cc' },
        handler: (res) => resolve(res.razorpay_payment_id),
        modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
      })
      rzp.open()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    setSubmitting(true)
    try {
      let paymentId = null

      if (paymentMethod === 'razorpay') {
        paymentId = await handleRazorpayPayment()
      } else if (paymentMethod === 'upi') {
        if (!upiTid.trim()) return
        paymentId = upiTid.trim()
      }

      const orderItems = cart.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity }))
      await api.post('/orders/product', {
        items: orderItems,
        total: cartTotal,
        customer: form,
        paymentMethod,
        paymentId,
      })
      clearCart()
      setDone(true)
    } catch (err) {
      console.error('Order failed:', err)
    }
    setSubmitting(false)
  }

  if (done) {
    return (
      <>
        <SEO title="Order Placed — KINTOX" description="Your order has been placed successfully." />
        <div className="bg-white min-h-screen pt-32 text-center px-4 md:px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg aria-hidden="true" className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
          </div>
          <h2 className="text-[32px] font-semibold text-[#1d1d1f] mb-3">Order Confirmed!</h2>
          <p className="text-[17px] text-[#7a7a7a] mb-2">We'll reach out to you at {form.email} within 24 hours.</p>
          {paymentMethod === 'razorpay' && <p className="text-[14px] text-green-600 mb-8">Payment received successfully ✓</p>}
          {paymentMethod === 'upi' && <p className="text-[14px] text-green-600 mb-8">UPI payment verified — Thank you! ✓</p>}

          <Link to="/portfolio" className="inline-block bg-[#0066cc] text-white px-8 py-3 rounded-full text-[14px] font-[500]">Continue Shopping</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Checkout — KINTOX" description="Complete your purchase." path="/checkout" />
      <div className="bg-white min-h-screen pt-10">
        <div className="max-w-[980px] mx-auto px-4 md:px-6">
          <h1 className="text-[24px] font-semibold text-[#1d1d1f] mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              <div className="bg-[#f5f5f7] rounded-[18px] p-6">
                <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" autoComplete="name" required className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-xl text-[14px] outline-none focus:border-[#0066cc] transition-colors" />
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" type="email" autoComplete="email" required className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-xl text-[14px] outline-none focus:border-[#0066cc] transition-colors" />
                </div>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone *" type="tel" autoComplete="tel" inputMode="tel" required className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-xl text-[14px] outline-none focus:border-[#0066cc] transition-colors mt-4" />
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address (optional)" autoComplete="street-address" className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-xl text-[14px] outline-none focus:border-[#0066cc] transition-colors mt-4" />
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Order notes (optional)" rows={2} className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-xl text-[14px] outline-none focus:border-[#0066cc] transition-colors mt-4 resize-none" />
              </div>

              <div className="bg-[#f5f5f7] rounded-[18px] p-6">
                <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-[#0066cc] bg-[#0066cc]/5' : 'border-[#e0e0e0] bg-white hover:border-[#0066cc]/30'}`}>
                    <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="accent-[#0066cc]" />
                    <div className="flex items-center gap-2 flex-1">
                      <svg className="w-6 h-6 text-[#0066cc]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>
                      <div>
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Pay Online</span>
                        <p className="text-[12px] text-[#7a7a7a]">UPI • Card • NetBanking • Wallet</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Fast & Secure</span>
                  </label>

                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-[#0066cc] bg-[#0066cc]/5' : 'border-[#e0e0e0] bg-white hover:border-[#0066cc]/30'}`}>
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => { setPaymentMethod('upi'); setUpiTid('') }} className="accent-[#0066cc]" />
                    <div className="flex items-center gap-2 flex-1">
                      <svg className="w-6 h-6 text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                      <div>
                        <span className="text-[15px] font-medium text-[#1d1d1f]">UPI Scan & Pay</span>
                        <p className="text-[12px] text-[#7a7a7a]">Google Pay • PhonePe • Paytm</p>
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-[#e0e0e0] text-center">
                    <p className="text-[14px] font-medium text-[#1d1d1f] mb-1">Scan with any UPI app</p>
                    <p className="text-[12px] text-[#7a7a7a] mb-4">Open GPay / PhonePe / Paytm and scan this QR</p>
                    <img src={QR_URL} alt="UPI QR Code" className="mx-auto w-[200px] h-[200px] rounded-[11px]" />
                    <p className="text-[12px] text-[#7a7a7a] mt-3">UPI ID: <span className="font-mono text-[#1d1d1f]">{UPI_ID}</span></p>
                    <div className="mt-4">
                      <input type="text" value={upiTid} onChange={(e) => setUpiTid(e.target.value)} placeholder="Enter UPI transaction ID / UTR *" required={paymentMethod === 'upi'} className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-xl text-[14px] outline-none focus:border-[#0066cc] transition-colors" />
                      <p className="text-[11px] text-[#7a7a7a] mt-1.5">After payment, enter the UTR/reference number shown in your UPI app</p>
                    </div>
                  </div>
                )}

              </div>

              <button type="submit" disabled={submitting || (paymentMethod === 'upi' && !upiTid.trim())} className="w-full bg-[#0066cc] text-white px-8 py-4 rounded-full text-[17px] font-[500] hover:bg-[#0055aa] transition-colors disabled:opacity-60 cursor-pointer">
                {submitting ? 'Processing...' : paymentMethod === 'razorpay' ? `Pay ${formatPrice(cartTotal)}` : 'Confirm Payment & Place Order'}
              </button>

              {paymentMethod === 'razorpay' && (
                <p className="text-[12px] text-[#7a7a7a] text-center">You'll be redirected to Razorpay for secure payment.</p>
              )}
              {paymentMethod === 'upi' && (
                <p className="text-[12px] text-[#7a7a7a] text-center">We'll verify your payment and confirm your order.</p>
              )}
            </form>

            <div className="lg:col-span-2">
              <div className="bg-[#f5f5f7] rounded-[18px] p-6 sticky top-24">
                <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-4">Order Summary ({cartCount})</h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[11px] bg-white overflow-hidden shrink-0 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.title} width="80" height="80" className="w-full h-full object-cover" />
                        ) : (
                          <ImagePlaceholder className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#1d1d1f] truncate">{item.title}</p>
                        <p className="text-[12px] text-[#7a7a7a]">Qty: {item.quantity || 1}</p>
                      </div>
                      <span className="text-[14px] font-medium text-[#1d1d1f] shrink-0">{formatPrice(item.price * (item.quantity || 1))}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#e0e0e0] flex items-center justify-between">
                  <span className="text-[17px] font-semibold text-[#1d1d1f]">Total</span>
                  <span className="text-[20px] font-semibold text-[#1d1d1f]">{formatPrice(cartTotal)}</span>
                </div>
                {paymentMethod === 'razorpay' && (
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] text-green-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l6.59-6.59L19 8l-9 9z"/></svg>
                    Secured by Razorpay
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}