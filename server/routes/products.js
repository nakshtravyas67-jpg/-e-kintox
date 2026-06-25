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
      { id: '1', title: 'YouTube Thumbnail Design', category: 'YouTube Thumbnails', rating: 4.9, reviews: 203, desc: 'High-CTR custom YouTube thumbnail designs optimized for maximum audience retention.', software: 'Adobe Photoshop, Illustrator', longDesc: 'Professional YouTube thumbnail designs engineered for high click-through rates.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', screenshots: [], packages: [{ tier: 'Basic', price: 499, features: ['5 Custom Thumbnails','1920x1080 HD Resolution','Bold Typography','2 Revisions','Delivery in 48 Hours','PNG + JPG Format'], recommend: 'New YouTubers' }, { tier: 'Professional', price: 999, popular: true, features: ['15 Custom Thumbnails','HD + 4K Resolution','Bold Typography & Effects','Color Grading','Unlimited Revisions','Source File (PSD)','Priority Support'], recommend: 'Growing Creators' }, { tier: 'Ultra', price: 1499, features: ['30 Custom Thumbnails','HD + 4K Resolution','Advanced Effects & Graphics','Color Grading + Retouching','Unlimited Revisions','Source Files (PSD + AI)','24/7 Priority Support','After-Delivery Support'], recommend: 'Professional YouTubers' }] },
      { id: '2', title: 'Poster Design', category: 'Posters', rating: 4.8, reviews: 156, desc: 'Premium poster designs for events, promotions, and brand campaigns.', software: 'Adobe Photoshop, Illustrator, InDesign', longDesc: 'Eye-catching poster designs that demand attention.', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80', screenshots: [], packages: [{ tier: 'Basic', price: 699, features: ['1 Poster Design','Custom Typography & Layout','24x36 Inch Print Ready','300 DPI | CMYK','2 Revisions','Delivery in 48 Hours'], recommend: 'Small Businesses' }, { tier: 'Professional', price: 1299, popular: true, features: ['3 Poster Designs','Custom Illustrations & Graphics','24x36 Inch Print Ready','300 DPI | CMYK + RGB','Unlimited Revisions','Source Files (PSD + AI)','Multi-Format Export'], recommend: 'Growing Brands' }, { tier: 'Ultra', price: 2499, features: ['5 Poster Designs','Full Campaign Creative Suite','Custom 3D Elements','Unlimited Revisions','Source Files (PSD + AI + INDD)','Multi-Platform Adaptation','7-Day After-Delivery Support'], recommend: 'Marketing Agencies' }] },
      { id: '3', title: 'Business Card Design', category: 'Business Cards', rating: 4.7, reviews: 312, desc: 'Professional business card designs that leave a lasting impression.', software: 'Adobe Illustrator, Photoshop', longDesc: 'Make a lasting impression with premium business card designs tailored to your brand.', image: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80', screenshots: [], packages: [{ tier: 'Basic', price: 299, features: ['Single Side Design','Standard 3.5x2 inch','300 DPI Print Ready','CMYK Color Mode','2 Revisions','PDF + JPG Format'], recommend: 'Freelancers' }, { tier: 'Professional', price: 599, popular: true, features: ['Front & Back Design','Standard 3.5x2 inch','300 DPI Print Ready','CMYK + Spot UV Setup','Unlimited Revisions','Source File (AI + PSD)','Bleed Marks Included'], recommend: 'Small Teams' }, { tier: 'Ultra', price: 999, features: ['Front & Back + Foil Setup','Custom Shape Available','300 DPI Print Ready','CMYK + Spot UV + Foil','Unlimited Revisions','Source Files (AI + PSD + PDF)','Die-Line Template Included','Priority Support'], recommend: 'Premium Brands' }] },
      { id: '4', title: 'Wedding Card Design', category: 'Wedding Cards', rating: 4.9, reviews: 89, desc: 'Elegant wedding invitation card designs with traditional and modern aesthetics.', software: 'Adobe Illustrator, Photoshop, InDesign', longDesc: 'Elegant wedding invitation cards designed to capture the essence of your special day.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', screenshots: [], packages: [{ tier: 'Basic', price: 999, features: ['1 Wedding Card Design','Front & Inside Layout','5x7 Inch Standard Size','300 DPI | CMYK','3 Revisions','PDF + JPG Format'], recommend: 'Simple Weddings' }, { tier: 'Professional', price: 1999, popular: true, features: ['2 Wedding Card Designs','Front & Inside + Envelope','5x7 + 4x6 Inch Sizes','300 DPI | CMYK + Gold Foil','Unlimited Revisions','Source Files (AI + PSD)','Envelope Template Included'], recommend: 'Traditional Weddings' }, { tier: 'Ultra', price: 3499, features: ['3 Wedding Card Designs','Full Wedding Suite','Custom Size & Shape','300 DPI | CMYK + Gold/Silver Foil','Unlimited Revisions','Source Files (AI + PSD + INDD)','Digital Proof','Priority Support'], recommend: 'Destination & Luxury Weddings' }] },
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
