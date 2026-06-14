import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import SEO from './SEO'

export default function MyOrders() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    api.get('/orders/my').then(data => setOrders(data.orders)).catch(() => {}).finally(() => setLoading(false))
  }, [isAuthenticated, navigate])

  return (
    <>
      <SEO title="My Orders — KINTOX" description="Your order history" path="/my-orders" />
      <div className="bg-[#272729] pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-[40px] font-[600] text-white leading-tight">My Orders</h1>
          <p className="text-[17px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} placed
          </p>
        </div>
      </div>
      <div className="bg-white min-h-[50vh]">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 py-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <svg aria-hidden="true" className="w-12 h-12 text-[#7a7a7a] mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.02 4.77L7.2 7h12.63l-1.97 5.68c-.2.59-.76 1-1.38 1H9.66c-.63 0-1.18-.41-1.38-1L7.2 7l-1.2-2.23C5.73 4.3 5.37 4 5 4H2v2h2l2.02 4.77z" /></svg>
              <p className="text-[#7a7a7a] text-[17px] mb-2">No orders yet.</p>
              <p className="text-[14px] text-[#7a7a7a]">Browse our services and place your first order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-[#e0e0e0] rounded-[18px] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-[600] text-[#0066cc] uppercase tracking-wider">{order.service}</span>
                      <h3 className="text-[17px] font-[600] text-[#1d1d1f] mt-1">{order.package}</h3>
                      <p className="text-[12px] text-[#7a7a7a] mt-1">Order #{order.id}</p>
                    </div>
                    <span className="shrink-0 px-3 py-1 bg-green-50 text-green-700 text-[12px] font-[500] rounded-full border border-green-200">
                      {order.status || 'Confirmed'}
                    </span>
                  </div>
                  {order.details && Object.keys(order.details).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
                      <p className="text-[12px] font-[600] text-[#7a7a7a] uppercase tracking-wider mb-2">Details</p>
                      <div className="grid grid-cols-2 gap-2 text-[14px] text-[#1d1d1f]">
                        {Object.entries(order.details).filter(([_, v]) => v).map(([k, v]) => (
                          <div key={k}><span className="text-[#7a7a7a]">{k}:</span> {v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-[12px] text-[#7a7a7a] mt-3">Placed on {new Date(order.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
