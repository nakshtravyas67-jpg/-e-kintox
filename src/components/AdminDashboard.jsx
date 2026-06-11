import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from './SEO'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [tab, setTab] = useState('products')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Website UI', price: '', originalPrice: '', desc: '', features: '', software: '', whatsIncluded: '' })
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [u, o, p] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/orders'),
        api.get('/products'),
      ])
      setUsers(u.users)
      setOrders(o.orders)
      setProducts(p.products)
    } catch {}
    setLoading(false)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    setPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!form.title || !form.price) { setMsg('Title and price required'); return }
    setUploading(true)
    setMsg('')
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('category', form.category)
      fd.append('price', form.price)
      fd.append('originalPrice', form.originalPrice || form.price)
      fd.append('desc', form.desc)
      fd.append('features', form.features)
      fd.append('software', form.software)
      fd.append('whatsIncluded', form.whatsIncluded)
      images.forEach((img) => fd.append('images', img))

      const token = localStorage.getItem('kintox_token')
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg('Product uploaded successfully!')
      setForm({ title: '', category: 'Website UI', price: '', originalPrice: '', desc: '', features: '', software: '', whatsIncluded: '' })
      setImages([])
      setPreviews([])
      setShowForm(false)
      loadData()
    } catch (err) {
      setMsg(err.message)
    }
    setUploading(false)
  }

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/products/${id}`)
      loadData()
    } catch {}
  }

  const API = import.meta.env.VITE_API_URL || ''

  return (
    <>
      <SEO title="Admin — KINTOX" description="Admin dashboard" path="/admin" />
      <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-32 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">Admin Dashboard</h1>
              <p className="text-[#6E6E73] text-sm mt-1">Welcome back, {user?.name}</p>
            </div>
            <button onClick={loadData} className="text-[#0071E3] text-sm font-medium hover:underline cursor-pointer">Refresh</button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'products', label: `Store (${products.length})` },
              { key: 'users', label: `Users (${users.length})` },
              { key: 'orders', label: `Orders (${orders.length})` },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setShowForm(false) }}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  tab === t.key ? 'bg-[#0071E3] text-white shadow-sm' : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-[#E8E8ED]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : tab === 'products' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1D1D1F]">Design Store Products</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 bg-[#0071E3] text-white text-sm font-medium rounded-xl hover:bg-[#0077ED] transition-all cursor-pointer"
                >
                  {showForm ? 'Cancel' : '+ Add Design'}
                </button>
              </div>

              {showForm && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleUpload}
                  className="bg-white rounded-2xl border border-[#E8E8ED] p-6 mb-6 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prod-title" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Title *</label>
                      <input id="prod-title" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20" placeholder="e.g. Premium Branding Pack" />
                    </div>
                    <div>
                      <label htmlFor="prod-category" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Category</label>
                      <select id="prod-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20">
                        {['Website UI', 'Social Media', 'Branding', 'Thumbnails', 'App UI', 'Illustrations', 'Print'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="prod-price" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Price (₹) *</label>
                      <input id="prod-price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20" placeholder="499" />
                    </div>
                    <div>
                      <label htmlFor="prod-oprice" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Original Price (₹)</label>
                      <input id="prod-oprice" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20" placeholder="999" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="prod-desc" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Description</label>
                    <textarea id="prod-desc" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20 resize-none" placeholder="Describe your design..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prod-features" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Features (comma separated)</label>
                      <input id="prod-features" type="text" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20" placeholder="Editable Figma, 30+ Templates, Free Fonts" />
                    </div>
                    <div>
                      <label htmlFor="prod-software" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Software</label>
                      <input id="prod-software" type="text" value={form.software} onChange={(e) => setForm({ ...form, software: e.target.value })} className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20" placeholder="Figma, Photoshop" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="prod-images" className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Design Images *</label>
                    <input id="prod-images" type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full text-sm text-[#6E6E73] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[#0071E3]/10 file:text-[#0071E3] hover:file:bg-[#0071E3]/20" />
                    {previews.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {previews.map((p, i) => (
                          <img key={i} src={p} alt={`Preview ${i + 1}`} className="w-16 h-16 object-cover rounded-lg border border-[#E8E8ED]" />
                        ))}
                      </div>
                    )}
                  </div>
                  {msg && <p className={`text-xs font-medium ${msg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" /><path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" /></svg> Uploading...</>
                    ) : 'Upload to Store'}
                  </button>
                </motion.form>
              )}

              <div className="bg-white rounded-2xl border border-[#E8E8ED] overflow-hidden">
                {products.length === 0 ? (
                  <div className="p-10 text-center text-[#6E6E73]">
                    <p>No products in store yet</p>
                    <button onClick={() => setShowForm(true)} className="text-[#0071E3] text-sm font-medium mt-2 hover:underline cursor-pointer">Add your first design</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {products.map((p) => (
                      <div key={p.id} className="bg-[#F5F5F7] rounded-xl overflow-hidden border border-[#E8E8ED] group">
                        <div className="aspect-[4/3] overflow-hidden bg-white">
                          <img
                            src={p.image?.startsWith('/') ? `${API}${p.image}` : p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-[10px] text-[#0071E3] font-semibold uppercase tracking-wider">{p.category}</span>
                          <h3 className="text-sm font-semibold text-[#1D1D1F] mt-1 truncate">{p.title}</h3>
                          <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2">{p.desc}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-base text-[#1D1D1F]">₹{p.price}</span>
                            <button onClick={() => deleteProduct(p.id)} className="text-[#6E6E73] hover:text-red-500 text-xs font-medium transition-colors cursor-pointer">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : tab === 'users' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-[#E8E8ED] overflow-hidden">
              {users.length === 0 ? (
                <div className="p-10 text-center text-[#6E6E73]">No registered users yet</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E8E8ED] bg-[#F5F5F7]">
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">ID</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Name</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Email</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-[#F5F5F7] hover:bg-[#FAFAFA] transition-colors">
                          <td className="px-5 py-4 text-[#6E6E73] font-mono text-xs">#{u.id}</td>
                          <td className="px-5 py-4 text-[#1D1D1F] font-medium">{u.name}</td>
                          <td className="px-5 py-4 text-[#6E6E73]">{u.email}</td>
                          <td className="px-5 py-4 text-[#6E6E73] text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-[#E8E8ED] overflow-hidden">
              {orders.length === 0 ? (
                <div className="p-10 text-center text-[#6E6E73]">No orders yet</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E8E8ED] bg-[#F5F5F7]">
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">ID</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Customer</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Service</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Package</th>
                        <th className="text-left px-5 py-3 text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-[#F5F5F7] hover:bg-[#FAFAFA] transition-colors">
                          <td className="px-5 py-4 text-[#6E6E73] font-mono text-xs">#{o.id}</td>
                          <td className="px-5 py-4">
                            <p className="text-[#1D1D1F] font-medium">{o.user?.name}</p>
                            <p className="text-[#6E6E73] text-xs">{o.user?.email}</p>
                          </td>
                          <td className="px-5 py-4 text-[#1D1D1F]">{o.service}</td>
                          <td className="px-5 py-4"><span className="bg-[#0071E3]/10 text-[#0071E3] text-xs font-medium px-2.5 py-1 rounded-full">{o.package}</span></td>
                          <td className="px-5 py-4 text-[#6E6E73] text-xs">{new Date(o.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
