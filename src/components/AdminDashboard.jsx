import { useState, useEffect } from 'react'
import SEO from './SEO'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import AdminPinGate from './admin/AdminPinGate'
import AdminOverview from './admin/AdminOverview'
import AdminProducts from './admin/AdminProducts'
import AdminUsers from './admin/AdminUsers'
import AdminOrders from './admin/AdminOrders'
import AdminMessages from './admin/AdminMessages'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('admin_unlocked') === 'true')
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState(null)
  const [ordersByMonth, setOrdersByMonth] = useState({})
  const [ordersByStatus, setOrdersByStatus] = useState({})
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])

  const loadData = async () => {
    setLoading(true)
    try {
      const [u, o, p, s, m] = await Promise.all([
        api.get('/admin/users'), api.get('/admin/orders'), api.get('/products'),
        api.get('/admin/stats'), api.get('/admin/messages').catch(() => ({ messages: [] })),
      ])
      setUsers(u.users); setOrders(o.orders); setProducts(p.products); setStats(s.stats)
      setOrdersByMonth(s.ordersByMonth); setOrdersByStatus(s.ordersByStatus)
      setMessages(m.messages || [])
    } catch {}
    setLoading(false)
  }

  useEffect(() => { if (unlocked) loadData() }, [unlocked])

  const tabs = [
    { key: 'overview', label: `Overview` },
    { key: 'products', label: `Store (${products.length})` },
    { key: 'users', label: `Users (${users.length})` },
    { key: 'orders', label: `Orders (${orders.length})` },
    { key: 'messages', label: `Messages (${messages.length})` },
  ]

  if (!unlocked) return <AdminPinGate onUnlock={() => setUnlocked(true)} />

  return (
    <>
      <SEO title="Admin — KINTOX" description="Admin dashboard" path="/admin" />
      <div className="min-h-screen bg-white">
        <div className="bg-tile-1 py-16 md:py-20 text-center">
          <h1 className="text-display-lg text-white">Admin Dashboard</h1>
          <p className="text-body text-white/60 mt-2">Welcome back, {user?.name}</p>
        </div>
        <div className="section-container-wide py-10">
          <div className="flex border border-hairline rounded-pill overflow-hidden mb-8">
            {tabs.map((t, i) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex-1 px-6 py-3 text-caption-strong transition-colors cursor-pointer ${i < tabs.length - 1 ? 'border-r border-hairline' : ''} ${tab === t.key ? 'bg-action-blue text-white' : 'bg-transparent text-muted hover:text-ink'}`}>
                {t.label}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-action-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : tab === 'overview' ? <AdminOverview stats={stats} ordersByMonth={ordersByMonth} ordersByStatus={ordersByStatus} />
          : tab === 'products' ? <AdminProducts products={products} onRefresh={loadData} />
          : tab === 'users' ? <AdminUsers users={users} orders={orders} onRefresh={loadData} />
          : tab === 'orders' ? <AdminOrders orders={orders} onRefresh={loadData} />
          : tab === 'messages' ? <AdminMessages messages={messages} onRefresh={loadData} />
          : null}
        </div>
      </div>
    </>
  )
}