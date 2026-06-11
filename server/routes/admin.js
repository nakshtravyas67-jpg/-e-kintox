import { Router } from 'express'
import auth from '../middleware/auth.js'
import { getUsers, getOrders } from '../lib/store.js'

const router = Router()

router.use(auth)

router.get('/users', (_req, res) => {
  const users = getUsers().map(({ password, ...u }) => u)
  res.json({ users, total: users.length })
})

router.get('/orders', (_req, res) => {
  const orders = getOrders()
  res.json({ orders, total: orders.length })
})

export default router
