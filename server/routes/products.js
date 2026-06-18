import { Router } from 'express'
import multer from 'multer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')
const UPLOADS_DIR = join(__dirname, '..', 'uploads')

if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  },
})

const router = Router()

function getProducts() {
  if (!existsSync(PRODUCTS_FILE)) {
    const seed = [
      { id: '1', title: 'YouTube Thumbnail Design', category: 'YouTube Thumbnails', price: 499, originalPrice: 999, rating: 4.9, reviews: 203, stock: 'In Stock', desc: 'High-CTR custom YouTube thumbnail designs optimized for maximum audience retention.', features: ['Custom HD Thumbnail Design','1920x1080px Resolution','Bold Typography & Effects','Color Grading Included','Source File Provided','Unlimited Revisions'], software: 'Adobe Photoshop, Illustrator', longDesc: 'Professional YouTube thumbnail designs engineered for high click-through rates.', whatsIncluded: 'PSD Source File, PNG Export, Font Files', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', screenshots: [] },
      { id: '2', title: 'Poster Design', category: 'Posters', price: 699, originalPrice: 1299, rating: 4.8, reviews: 156, stock: 'In Stock', desc: 'Premium poster designs for events, promotions, and brand campaigns.', features: ['Custom Poster Layout','24x36 Inch Print Ready','300 DPI High Resolution','CMYK & RGB Both Included','Editable Source Files','Commercial License'], software: 'Adobe Photoshop, Illustrator, InDesign', longDesc: 'Eye-catching poster designs that demand attention. Print-ready with full source files.', whatsIncluded: 'PSD + AI + PDF Files, Font Pack, Print Guide', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80', screenshots: [] },
      { id: '3', title: 'Business Card Design', category: 'Business Cards', price: 299, originalPrice: 599, rating: 4.7, reviews: 312, stock: 'In Stock', desc: 'Professional business card designs that leave a lasting impression.', features: ['Front & Back Design','Standard 3.5x2 inch Size','300 DPI Print Ready','CMYK Color Mode','Bleed Marks Included','Editable Source File'], software: 'Adobe Illustrator, Photoshop', longDesc: 'Make a lasting impression with premium business card designs tailored to your brand.', whatsIncluded: 'AI + PSD Source Files, PDF Print File, Font Files', image: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80', screenshots: [] },
      { id: '4', title: 'Wedding Card Design', category: 'Wedding Cards', price: 999, originalPrice: 1999, rating: 4.9, reviews: 89, stock: 'Limited', desc: 'Elegant wedding invitation card designs with traditional and modern aesthetics.', features: ['Custom Wedding Card Design','Front & Inside Layout','5x7 Inch Standard Size','300 DPI Print Ready','CMYK Color Mode','Unlimited Revisions'], software: 'Adobe Illustrator, Photoshop, InDesign', longDesc: 'Elegant wedding invitation cards designed to capture the essence of your special day.', whatsIncluded: 'AI + PSD + PDF Files, Envelope Template, Font Files', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', screenshots: [] },
    ]
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(PRODUCTS_FILE, JSON.stringify(seed, null, 2))
    return seed
  }
  try { return JSON.parse(readFileSync(PRODUCTS_FILE, 'utf-8')) } catch { return [] }
}

function saveProducts(products) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

router.get('/', (_req, res) => {
  const products = getProducts().map((p) => ({
    ...p,
    image: p.image?.startsWith('/') ? `${_req.protocol}://${_req.get('host')}${p.image}` : p.image,
    screenshots: p.screenshots?.map((s) => s?.startsWith('/') ? `${_req.protocol}://${_req.get('host')}${s}` : s),
  }))
  res.json({ products, total: products.length })
})

router.get('/:id', (req, res) => {
  const product = getProducts().find((p) => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

router.post('/', auth, adminAuth, upload.array('images', 5), (req, res) => {
  try {
    const { title, category, price, desc, features, software } = req.body
    if (!title?.trim() || !category?.trim() || !price) return res.status(400).json({ error: 'Title, category, and price required' })

    const priceVal = Number(price)
    if (isNaN(priceVal) || priceVal <= 0) return res.status(400).json({ error: 'Invalid price' })

    const products = getProducts()
    const files = req.files || []
    const imageUrl = files[0] ? `/uploads/${files[0].filename}` : null
    const screenshots = files.map((f) => `/uploads/${f.filename}`)

    const origPrice = Number(req.body.originalPrice)
    const product = {
      id: String(Date.now()),
      title: title.trim(),
      category: category.trim(),
      price: priceVal,
      originalPrice: (!isNaN(origPrice) && origPrice > 0) ? origPrice : priceVal,
      rating: 5,
      reviews: 0,
      stock: 'In Stock',
      image: imageUrl,
      screenshots,
      desc: desc?.trim() || '',
      features: features ? features.split(',').map((f) => f.trim()) : [],
      software: software?.trim() || '',
      longDesc: desc?.trim() || '',
      whatsIncluded: req.body.whatsIncluded?.trim() || '',
      createdAt: new Date().toISOString(),
    }

    products.unshift(product)
    saveProducts(products)
    res.status(201).json({ success: true, product })
  } catch (err) {
    console.error('Product upload error:', err)
    res.status(500).json({ error: err.message || 'Failed to upload product' })
  }
})

router.delete('/:id', auth, adminAuth, (req, res) => {
  let products = getProducts()
  const idx = products.findIndex((p) => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Product not found' })
  products.splice(idx, 1)
  saveProducts(products)
  res.json({ success: true })
})

export default router
