import { Router } from 'express'
import nodemailer from 'nodemailer'
import auth from '../middleware/auth.js'
import rateLimit from 'express-rate-limit'
import { addOrder } from '../lib/store.js'

const router = Router()

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many orders. Try again later.' },
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
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
      .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
      .join('')

    await transporter.sendMail({
      from: `"KINTOX Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: req.user.email,
      subject: `[KINTOX Order] ${service} - ${pkg}`,
      html: `
        <h3>New Order Received</h3>
        <p><strong>Customer:</strong> ${req.user.name} (${req.user.email})</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Package:</strong> ${pkg}</p>
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
