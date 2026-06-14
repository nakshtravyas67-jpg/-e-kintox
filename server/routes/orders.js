import { Router } from 'express'
import Razorpay from 'razorpay'
import nodemailer from 'nodemailer'
import auth from '../middleware/auth.js'
import rateLimit from 'express-rate-limit'
import { addOrder, getOrders } from '../lib/store.js'

const router = Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_7j2OQp7byLBP3B',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '6k3D5FUm4vLNbYBAGdyFUM4g',
})

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many orders. Try again later.' },
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
}

router.post('/razorpay-order', auth, async (req, res) => {
  try {
    const { amount } = req.body
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: { email: req.user.email },
    })

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('Razorpay order error:', err)
    res.status(500).json({ error: 'Failed to create payment order' })
  }
})

router.get('/my', auth, (req, res) => {
  const orders = getOrders().filter((o) => o.user?.email === req.user.email)
  res.json({ orders })
})

router.post('/product', auth, orderLimiter, async (req, res) => {
  try {
    const { items, total, customer, paymentMethod, paymentId } = req.body
    if (!items?.length) return res.status(400).json({ error: 'Cart is empty' })

    const orderData = {
      id: Date.now().toString(36),
      type: 'product',
      user: req.user,
      items,
      total,
      customer,
      paymentMethod: paymentMethod || 'cod',
      paymentId: paymentId || null,
      status: paymentMethod === 'razorpay' ? 'paid' : 'pending',
      timestamp: new Date().toISOString(),
    }

    addOrder(orderData)

    res.json({ success: true, message: 'Order placed successfully', order: orderData })
  } catch (err) {
    console.error('Product order error:', err)
    res.status(500).json({ error: 'Failed to place order' })
  }
})

router.post('/', auth, orderLimiter, async (req, res) => {
  try {
    const { service, package: pkg, details } = req.body
    if (!service || !pkg) return res.status(400).json({ error: 'Service and package required' })

    const orderData = {
      id: Date.now().toString(36),
      user: req.user,
      service,
      package: pkg,
      details: details || {},
      timestamp: new Date().toISOString(),
    }

    addOrder(orderData)

    const detailsHtml = Object.entries(details)
      .filter(([_, v]) => v)
      .map(([k, v]) => `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`)
      .join('')

    await transporter.sendMail({
      from: `"KINTOX Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: req.user.email,
      subject: `[KINTOX Order] ${service} - ${pkg}`,
      html: `
        <h3>New Order Received</h3>
        <p><strong>Customer:</strong> ${escapeHtml(req.user.name)} (${escapeHtml(req.user.email)})</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Package:</strong> ${escapeHtml(pkg)}</p>
        ${detailsHtml}
        <hr>
        <p style="color:#888;font-size:12px;">Order placed at ${orderData.timestamp}</p>
      `,
    })

    res.json({ success: true, message: 'Order placed successfully', order: orderData })
  } catch (err) {
    console.error('Order error:', err)
    res.status(500).json({ error: 'Failed to place order' })
  }
})

export default router
