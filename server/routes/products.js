import { Router } from 'express'
import multer from 'multer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import auth from '../middleware/auth.js'

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
  if (!existsSync(PRODUCTS_FILE)) return []
  try { return JSON.parse(readFileSync(PRODUCTS_FILE, 'utf-8')) } catch { return [] }
}

function saveProducts(products) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

router.get('/', (_req, res) => {
  const products = getProducts().map((p) => ({
    ...p,
    image: p.image?.startsWith('/') ? p.image : p.image,
  }))
  res.json({ products, total: products.length })
})

router.get('/:id', (req, res) => {
  const product = getProducts().find((p) => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

router.post('/', auth, upload.array('images', 5), (req, res) => {
  try {
    const { title, category, price, desc, features, software } = req.body
    if (!title?.trim() || !category?.trim() || !price) return res.status(400).json({ error: 'Title, category, and price required' })

    const products = getProducts()
    const files = req.files || []
    const imageUrl = files[0] ? `/uploads/${files[0].filename}` : null
    const screenshots = files.map((f) => `/uploads/${f.filename}`)

    const product = {
      id: String(Date.now()),
      title: title.trim(),
      category: category.trim(),
      price: Number(price),
      originalPrice: Number(req.body.originalPrice) || Number(price),
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

router.delete('/:id', auth, (req, res) => {
  let products = getProducts()
  const idx = products.findIndex((p) => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Product not found' })
  products.splice(idx, 1)
  saveProducts(products)
  res.json({ success: true })
})

export default router
