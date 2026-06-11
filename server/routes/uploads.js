import { Router } from 'express'
import multer from 'multer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import auth from '../middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = join(__dirname, '..', 'uploads')
const DATA_FILE = join(__dirname, '..', 'data', 'designs.json')

if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true })
if (!existsSync(join(__dirname, '..', 'data'))) mkdirSync(join(__dirname, '..', 'data'), { recursive: true })
if (!existsSync(DATA_FILE)) writeFileSync(DATA_FILE, '[]')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')}`),
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  },
})

function getDesigns() {
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf-8')) }
  catch { return [] }
}

function saveDesigns(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

const router = Router()

router.post('/', auth, upload.single('image'), (req, res) => {
  try {
    const { title, description, category, tags } = req.body
    if (!req.file) return res.status(400).json({ error: 'Image required' })
    if (!title?.trim()) return res.status(400).json({ error: 'Title required' })

    const design = {
      id: Date.now().toString(36),
      image: `/uploads/${req.file.filename}`,
      title: title.trim(),
      description: description?.trim() || '',
      category: category?.trim() || 'Custom',
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      uploadedAt: new Date().toISOString(),
    }

    const designs = getDesigns()
    designs.unshift(design)
    saveDesigns(designs)

    res.status(201).json({ success: true, design })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

router.get('/', (_req, res) => {
  res.json({ designs: getDesigns() })
})

router.delete('/:id', auth, (req, res) => {
  const designs = getDesigns().filter((d) => d.id !== req.params.id)
  saveDesigns(designs)
  res.json({ success: true })
})

export default router
