import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import contactRoutes from './routes/contact.js'
import chatRoutes from './routes/chat.js'
import orderRoutes from './routes/orders.js'
import adminRoutes from './routes/admin.js'
import productRoutes from './routes/products.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, try again later' },
})

app.set('trust proxy', 1)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https://images.unsplash.com"],
    },
  },
}))
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(join(__dirname, 'uploads')))
app.use(express.static(join(__dirname, 'dist')))
app.use('/api', limiter)

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/products', productRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.get('*', (_req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))

app.use((err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -`, err.message)
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`KINTOX API running on http://localhost:${PORT}`))
