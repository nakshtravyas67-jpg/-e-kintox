import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from './SEO'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const categories = ['Web Design', 'App Design', 'Branding', 'Social Media', 'Thumbnail', 'UI/UX', 'Custom']

export default function MyDesigns() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', category: 'Custom', tags: '' })
  const [tab, setTab] = useState('all')

  const API_BASE = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    loadDesigns()
  }, [])

  const loadDesigns = async () => {
    try {
      const data = await api.get('/uploads')
      setDesigns(data.designs)
    } catch {}
    setLoading(false)
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setForm((p) => ({ ...p, file }))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!form.file || !form.title.trim()) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', form.file)
      fd.append('title', form.title)
      fd.append('description', form.description)
      fd.append('category', form.category)
      fd.append('tags', form.tags)
      const token = localStorage.getItem('kintox_token')
      const res = await fetch(`${API_BASE}/api/uploads`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const data = await res.json()
      if (data.success) {
        setDesigns((p) => [data.design, ...p])
        setShowForm(false)
        setForm({ title: '', description: '', category: 'Custom', tags: '' })
        setPreview(null)
      }
    } catch {}
    setUploading(false)
  }

  const filtered = tab === 'all' ? designs : designs.filter((d) => d.category === tab)
  const categories_ = ['all', ...new Set(designs.map((d) => d.category))]

  return (
    <>
      <SEO title="My Designs — KINTOX" description="Upload and manage your design portfolio" path="/my-designs" />
      <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-32 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">My Designs</h1>
              <p className="text-[#6E6E73] text-sm mt-1">{designs.length} design{designs.length !== 1 ? 's' : ''} uploaded</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 bg-[#0071E3] text-white text-sm font-semibold rounded-xl hover:bg-[#0077ED] transition-all shadow-sm cursor-pointer"
            >
              {showForm ? 'Cancel' : '+ Upload Design'}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleUpload}
                className="bg-white rounded-2xl border border-[#E8E8ED] p-6 mb-8 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Design Image</label>
                    <div
                      onClick={() => document.getElementById('design-image').click()}
                      className="border-2 border-dashed border-[#E8E8ED] rounded-xl p-8 text-center cursor-pointer hover:border-[#0071E3]/30 transition-colors"
                    >
                      {preview ? (
                        <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                      ) : (
                        <div>
                          <svg className="w-8 h-8 text-[#6E6E73] mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                          <p className="text-xs text-[#6E6E73]">Click to upload design image</p>
                          <p className="text-[10px] text-[#6E6E73]/60 mt-1">Max 10MB, JPG/PNG/WebP</p>
                        </div>
                      )}
                      <input id="design-image" type="file" accept="image/*" onChange={handleImage} className="hidden" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="design-title" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Title *</label>
                      <input id="design-title" type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required placeholder="e.g. E-commerce Dashboard Redesign" className="w-full px-4 py-2.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 placeholder:text-[#6E6E73]" />
                    </div>
                    <div>
                      <label htmlFor="design-desc" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Description / Direction</label>
                      <textarea id="design-desc" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="Tell us about this design — tools used, concept, client..." className="w-full px-4 py-2.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 placeholder:text-[#6E6E73] resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="design-cat" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Category</label>
                        <select id="design-cat" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none">
                          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="design-tags" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Tags</label>
                        <input id="design-tags" type="text" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="Figma, UI, Dashboard" className="w-full px-4 py-2.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 placeholder:text-[#6E6E73]" />
                      </div>
                    </div>
                    <button type="submit" disabled={uploading || !form.title.trim() || !form.file} className="w-full py-3 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm">
                      {uploading ? 'Uploading...' : 'Upload Design'}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {categories_.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
              {categories_.map((c) => (
                <button
                  key={c}
                  onClick={() => setTab(c)}
                  className={`shrink-0 px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    tab === c ? 'bg-[#1D1D1F] text-white' : 'bg-white text-[#6E6E73] border border-[#E8E8ED] hover:text-[#1D1D1F]'
                  }`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-12 h-12 text-[#6E6E73] mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
              <p className="text-[#6E6E73] text-sm">No designs yet. Upload your first design!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((design, i) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E8ED] hover:shadow-lg hover:shadow-[#0071E3]/5 hover:border-[#0071E3]/20 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F7]">
                    <img src={`${API_BASE}${design.image}`} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-wider bg-[#0071E3]/10 px-2 py-0.5 rounded">{design.category}</span>
                    <h3 className="text-[#1D1D1F] font-semibold text-sm mt-2">{design.title}</h3>
                    {design.description && <p className="text-[#6E6E73] text-xs mt-1.5 leading-relaxed">{design.description}</p>}
                    {design.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {design.tags.map((t) => <span key={t} className="text-[10px] text-[#6E6E73] bg-[#F5F5F7] px-2 py-0.5 rounded">{t}</span>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
