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
      { id: '1', title: 'Lumina SaaS UI Kit', category: 'Website UI', price: 49, originalPrice: 79, rating: 4.9, reviews: 128, stock: 'In Stock', desc: 'A complete, modern SaaS dashboard interface system designed for tech platforms.', features: ['Fully Editable Figma File','120+ Premium Components','Dark & Light Mode','Organized Layers','Responsive Design','Free Fonts Used'], software: 'Figma, Adobe Illustrator', longDesc: 'The Lumina SaaS UI Kit is a comprehensive design system built for modern SaaS platforms.', whatsIncluded: 'Figma Source File, Icon Set, Documentation PDF, Font Files', image: null, screenshots: [] },
      { id: '2', title: 'Minimalist Post Pack', category: 'Social Media', price: 19, originalPrice: 29, rating: 4.8, reviews: 94, stock: 'Few Left', desc: 'Professional, minimalist social media templates with clean Swiss typography.', features: ['30+ Instagram Post Templates','Fully Editable Text & Colors','Organized Figma Layers','Print-Ready 300 DPI','Free Fonts Included','Commercial Use License'], software: 'Figma, Adobe Photoshop', longDesc: 'Elevate your social media presence with this premium pack of minimalist templates.', whatsIncluded: 'Figma File, Photoshop PSD, Preview Images, Font Files', image: null, screenshots: [] },
      { id: '3', title: 'Tech Review Thumbnails', category: 'YouTube Thumbnails', price: 12, rating: 4.7, reviews: 203, stock: 'In Stock', desc: '10 high-CTR YouTube thumbnail templates optimized for tech review channels.', features: ['10 Unique Thumbnail Templates','1920x1080px HD Resolution','Editable Text Layers','Bold Typography Styles','Neon Glow Effects','Drag & Drop Ready'], software: 'Adobe Photoshop', longDesc: 'Get more views with these high-conversion thumbnail templates designed for tech review channels.', whatsIncluded: 'PSD Files, PNG Previews, Font Files', image: null, screenshots: [] },
      { id: '4', title: 'Fintech Mobile Kit', category: 'App UI', price: 34, originalPrice: 54, rating: 4.9, reviews: 67, stock: 'Limited', desc: 'iOS & Android optimized finance app UI kit with glassmorphism cards.', features: ['iOS & Android Screens','Glassmorphism Design','Interactive Charts','Dark Mode Included','50+ App Screens','Component Library'], software: 'Figma', longDesc: 'A premium fintech mobile UI kit featuring glassmorphism design elements.', whatsIncluded: 'Figma File, Icon Set, Wireframe PDF', image: null, screenshots: [] },
      { id: '5', title: 'Liquid Gradient Vol. 2', category: 'Posters', price: 25, rating: 5.0, reviews: 45, stock: 'In Stock', desc: 'Abstract gradient poster collection with fluid organic shapes.', features: ['12 Unique Poster Designs','24x36 Inch Print Ready','300 DPI High Resolution','CMYK & RGB Color Modes','Vibrant Gradient Palette','Commercial License'], software: 'Adobe Photoshop, Adobe Illustrator', longDesc: 'A stunning collection of abstract gradient posters.', whatsIncluded: 'PSD Files, AI Files, PDF Print Files, Preview Images', image: null, screenshots: [] },
      { id: '6', title: 'Vogue E-comm Kit', category: 'Website UI', price: 59, rating: 4.7, reviews: 156, stock: 'In Stock', desc: 'Premium e-commerce website design template with high-fashion aesthetic.', features: ['15+ Page Templates','Product Quick View','Shopping Cart UI','Checkout Flow','Mobile Responsive','Figma Auto Layout'], software: 'Figma', longDesc: 'A luxury e-commerce website UI kit designed for high-end fashion brands.', whatsIncluded: 'Figma File, UI Components, Documentation', image: null, screenshots: [] },
      { id: '7', title: 'Agency Framer Pack', category: 'Website UI', price: 45, rating: 4.9, reviews: 89, stock: 'Few Left', desc: 'Professional agency portfolio sections for creative studios.', features: ['20+ Section Templates','Hero & Header Designs','Project Portfolio Grid','Testimonial Blocks','Service Pages','Framer Compatible'], software: 'Figma, Framer', longDesc: 'A complete agency website pack with 20+ professionally designed sections.', whatsIncluded: 'Figma Source File, Framer Export Guide, Assets', image: null, screenshots: [] },
      { id: '8', title: 'Corporate Bundle', category: 'Social Media', price: 29, rating: 4.6, reviews: 178, stock: 'In Stock', desc: 'Corporate presentation slides and social media templates for consultants.', features: ['50+ Slide Templates','LinkedIn & Twitter Optimized','Data Visualization Charts','Brand Guidelines Page','Icon Library Included','PowerPoint & Keynote'], software: 'Microsoft PowerPoint, Apple Keynote', longDesc: 'A complete corporate branding bundle with 50+ presentation slides.', whatsIncluded: 'PowerPoint File, Keynote File, Font Files, Icon Pack', image: null, screenshots: [] },
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
