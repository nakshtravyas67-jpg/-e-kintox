import { useState, useEffect } from 'react'
import SEO from './SEO'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ImagePlaceholder from './common/ImagePlaceholder'

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
    } catch { /* ignore */ }
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
      const res = await fetch(`${API_BASE}/api/uploads`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      })
      const data = await res.json()
      if (data.success) {
        setDesigns((p) => [data.design, ...p])
        setShowForm(false)
        setForm({ title: '', description: '', category: 'Custom', tags: '' })
        setPreview(null)
      }
    } catch { /* ignore */ }
    setUploading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this design?')) return
    try {
      const res = await fetch(`${API_BASE}/api/uploads/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) setDesigns((p) => p.filter((d) => d.id !== id))
    } catch { /* ignore */ }
  }

  const filtered = tab === 'all' ? designs : designs.filter((d) => d.category === tab)
  const categories_ = ['all', ...new Set(designs.map((d) => d.category))]

  return (
    <>
      <SEO title="My Designs — KINTOX" description="Upload and manage your design portfolio" path="/my-designs" />
      <div className="bg-[#272729] pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-[40px] font-[600] text-white leading-tight">My Designs</h1>
          <p className="text-[17px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {designs.length} design{designs.length !== 1 ? 's' : ''} uploaded
          </p>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 pt-10 pb-16">
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 md:px-6 py-3 bg-[#0066cc] text-white text-[17px] font-[400] rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              {showForm ? 'Cancel' : '+ Upload Design'}
            </button>
          </div>
          {showForm && (
            <form onSubmit={handleUpload} className="mb-10 border border-[#e0e0e0] rounded-[18px] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] font-[400] text-[#7a7a7a] mb-2">Design Image</label>
                  <div
                    onClick={() => document.getElementById('design-image').click()}
                    className="border border-dashed border-[#e0e0e0] rounded-[11px] p-8 text-center cursor-pointer hover:border-[#0066cc]/30 transition-colors"
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" loading="lazy" className="max-h-48 mx-auto rounded-[11px]" />
                    ) : (
                      <div>
                        <ImagePlaceholder className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-[14px] text-[#7a7a7a]">Click to upload</p>
                        <p className="text-[12px] text-[#7a7a7a]/60 mt-1">Max 10MB, JPG/PNG/WebP</p>
                      </div>
                    )}
                    <input id="design-image" type="file" accept="image/*" onChange={handleImage} className="hidden" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="design-title" className="block text-[14px] font-[400] text-[#7a7a7a] mb-2">Title *</label>
                    <input id="design-title" type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required placeholder="E-commerce Dashboard" className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a]" />
                  </div>
                  <div>
                    <label htmlFor="design-desc" className="block text-[14px] font-[400] text-[#7a7a7a] mb-2">Description</label>
                    <textarea id="design-desc" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="Tools used, concept, client..." className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a] resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="design-cat" className="block text-[14px] font-[400] text-[#7a7a7a] mb-2">Category</label>
                      <select id="design-cat" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc]">
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="design-tags" className="block text-[14px] font-[400] text-[#7a7a7a] mb-2">Tags</label>
                      <input id="design-tags" type="text" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="Figma, UI, Dashboard" className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] placeholder:text-[#7a7a7a]" />
                    </div>
                  </div>
                  <button type="submit" disabled={uploading || !form.title.trim() || !form.file} className="w-full py-3 bg-[#0066cc] text-white text-[17px] font-[400] rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                    {uploading ? 'Uploading...' : 'Upload Design'}
                  </button>
                </div>
              </div>
            </form>
          )}
          {categories_.length > 1 && (
            <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar justify-center snap-x snap-mandatory">
              {categories_.map((c) => (
                <button
                  key={c}
                  onClick={() => setTab(c)}
                  className={`shrink-0 px-5 py-2 text-[14px] font-[400] rounded-full transition-colors cursor-pointer snap-start ${
                    tab === c ? 'bg-[#1d1d1f] text-white' : 'bg-white text-[#7a7a7a] border border-[#e0e0e0] hover:text-[#1d1d1f]'
                  }`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <ImagePlaceholder standalone className="w-12 h-12 mx-auto mb-4" iconColor="text-[#7a7a7a]" />
              <p className="text-[#7a7a7a] text-[17px]">No designs yet. Upload your first design!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((design) => (
                <div key={design.id} className="bg-white border border-[#e0e0e0] rounded-[18px] p-6">
                  <div className="aspect-video bg-[#f5f5f7] rounded-[11px] overflow-hidden mb-4">
                    <img src={`${API_BASE}${design.image}`} alt={design.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[17px] font-[600] text-[#1d1d1f]">{design.title}</h3>
                  <p className="text-[14px] font-[400] text-[#7a7a7a] mt-1">{design.category}</p>
                  {design.description && (
                    <p className="text-[14px] font-[400] text-[#7a7a7a] mt-1 leading-relaxed">{design.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4">
                    <a
                      href={`${API_BASE}${design.image}`}
                      download
                      className="text-[14px] text-[#0066cc] hover:text-[#004d99] transition-colors"
                    >
                      Download
                    </a>
                    <span className="text-[#e0e0e0]">|</span>
                    <button
                      onClick={() => handleDelete(design.id)}
                      className="text-[14px] text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
