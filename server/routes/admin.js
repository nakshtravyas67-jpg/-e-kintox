import { Router } from 'express'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'
import { getUsers, getOrders, updateOrderStatus } from '../lib/store.js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MESSAGES_FILE = join(__dirname, '..', 'data', 'messages.json')

function getMessages() {
  if (!existsSync(MESSAGES_FILE)) return []
  try { return JSON.parse(readFileSync(MESSAGES_FILE, 'utf-8')) } catch { return [] }
}

const router = Router()

router.use(auth)
router.use(adminAuth)

router.get('/users', (_req, res) => {
  const users = getUsers().map(({ password, ...u }) => u)
  res.json({ users, total: users.length })
})

router.get('/orders', (_req, res) => {
  const orders = getOrders()
  res.json({ orders, total: orders.length })
})

router.patch('/orders/:id/status', (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const valid = ['pending', 'in_progress', 'completed', 'cancelled']
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' })
  const order = updateOrderStatus(id, status)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json({ success: true, order })
})

router.get('/messages', (_req, res) => {
  res.json({ messages: getMessages() })
})

router.get('/stats', (_req, res) => {
  const orders = getOrders()
  const users = getUsers()

  const servicePricing = {
    'Brand Identity': { studio: 4999, project: 8999, enterprise: 14999 },
    'Web Design': { studio: 4999, project: 8999, enterprise: 14999 },
    'App UI': { studio: 4999, project: 8999, enterprise: 14999 },
    'Social Media': { studio: 2499, project: 4999, enterprise: 9999 },
    'Thumbnails': { studio: 2499, project: 4999, enterprise: 9999 },
    'UI Kits': { studio: 2499, project: 4999, enterprise: 9999 },
    'Posters': { studio: 2499, project: 4999, enterprise: 9999 },
  }

  let totalRevenue = 0
  orders.forEach((o) => {
    const pricing = servicePricing[o.service]
    if (pricing && pricing[o.package?.toLowerCase()]) {
      totalRevenue += pricing[o.package.toLowerCase()]
    }
  })

  const ordersByMonth = {}
  const ordersByStatus = {}
  orders.forEach((o) => {
    const month = o.timestamp?.slice(0, 7) || 'unknown'
    ordersByMonth[month] = (ordersByMonth[month] || 0) + 1
    ordersByStatus[o.status || 'pending'] = (ordersByStatus[o.status || 'pending'] || 0) + 1
  })

  res.json({
    stats: {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalRevenue,
      avgOrderValue: orders.length ? Math.round(totalRevenue / orders.length) : 0,
    },
    ordersByMonth,
    ordersByStatus,
  })
})

export default router
