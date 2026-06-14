import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../lib/api'

export default function AdminProducts({ products, onRefresh }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Website UI', price: '', originalPrice: '', desc: '', features: '', software: '', whatsIncluded: '' })
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [msg, setMsg] = useState('')

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

      const res = await fetch('/api/products', { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg('Product uploaded successfully!')
      setForm({ title: '', category: 'Website UI', price: '', originalPrice: '', desc: '', features: '', software: '', whatsIncluded: '' })
      setImages([]); setPreviews([]); setShowForm(false)
      onRefresh()
    } catch (err) { setMsg(err.message) }
    setUploading(false)
  }

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await api.delete(`/products/${id}`); onRefresh() } catch { setMsg('Failed to delete product') }
  }

  const API = import.meta.env.VITE_API_URL || ''

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-semibold text-ink">Design Store Products</h2>
        <div className="flex items-center gap-3">
          <button onClick={onRefresh} className="btn-dark-utility">Refresh</button>
          <button onClick={() => setShowForm(!showForm)} className={showForm ? 'btn-dark-utility !bg-muted' : 'btn-primary'}>
            {showForm ? 'Cancel' : '+ Add Design'}
          </button>
        </div>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleUpload} className="store-card mb-8">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="prod-title" className="text-fine-print font-semibold text-muted block">Title *</label>
                <input id="prod-title" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors" placeholder="e.g. Premium Branding Pack" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="prod-category" className="text-fine-print font-semibold text-muted block">Category</label>
                <select id="prod-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors">
                  {['Website UI', 'Social Media', 'Branding', 'Thumbnails', 'App UI', 'Illustrations', 'Print'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="prod-price" className="text-fine-print font-semibold text-muted block">Price (₹) *</label>
                <input id="prod-price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors" placeholder="499" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="prod-oprice" className="text-fine-print font-semibold text-muted block">Original Price (₹)</label>
                <input id="prod-oprice" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors" placeholder="999" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-desc" className="text-fine-print font-semibold text-muted block">Description</label>
              <textarea id="prod-desc" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors resize-none" placeholder="Describe your design..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="prod-features" className="text-fine-print font-semibold text-muted block">Features (comma separated)</label>
                <input id="prod-features" type="text" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors" placeholder="Editable Figma, 30+ Templates, Free Fonts" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="prod-software" className="text-fine-print font-semibold text-muted block">Software</label>
                <input id="prod-software" type="text" value={form.software} onChange={(e) => setForm({ ...form, software: e.target.value })} className="w-full px-4 py-3 bg-white border border-hairline rounded-md text-body outline-none focus:border-action-blue transition-colors" placeholder="Figma, Photoshop" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-images" className="text-fine-print font-semibold text-muted block">Design Images *</label>
              <input id="prod-images" type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full text-body text-muted file:mr-4 file:py-2 file:px-4 file:rounded-pill file:border-none file:text-button-utility file:font-medium file:bg-action-blue file:text-white file:cursor-pointer hover:file:opacity-90 transition-colors" />
              {previews.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {previews.map((p, i) => (
                    <img key={i} src={p} alt={`Preview ${i + 1}`} loading="lazy" className="w-16 h-16 object-cover rounded-lg border border-hairline" />
                  ))}
                </div>
              )}
            </div>
            {msg && <p className={`text-fine-print font-medium ${msg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>}
            <button type="submit" disabled={uploading} className="btn-primary w-full disabled:opacity-60 flex items-center justify-center gap-2">
              {uploading ? (
                <><svg aria-hidden="true" className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" /><path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" /></svg> Uploading...</>
              ) : 'Upload to Store'}
            </button>
          </div>
        </motion.form>
      )}

      <div className="bg-white border border-hairline rounded-lg overflow-hidden">
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-caption text-muted">No products in store yet</p>
            <button onClick={() => setShowForm(true)} className="text-link text-sm font-medium mt-2">Add your first design</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-hairline rounded-lg overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden bg-parchment">
                  <img src={p.image?.startsWith('/') ? `${API}${p.image}` : p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-fine-print font-semibold text-action-blue uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-caption-strong text-ink mt-1 truncate">{p.title}</h3>
                  <p className="text-fine-print text-muted mt-1 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-body-strong text-ink">₹{p.price}</span>
                    <button onClick={() => deleteProduct(p.id)} className="text-fine-print font-medium text-muted hover:text-red-500 transition-colors cursor-pointer">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}