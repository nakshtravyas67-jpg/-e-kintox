import { Router } from 'express'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const MESSAGES_FILE = join(DATA_DIR, 'messages.json')

const router = Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages. Try again later.' },
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

function sanitize(str) {
  return String(str || '').trim()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
    .substring(0, 5000)
}

function getMessages() {
  if (!existsSync(MESSAGES_FILE)) return []
  try { return JSON.parse(readFileSync(MESSAGES_FILE, 'utf-8')) } catch { return [] }
}

function saveMessages(msgs) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2))
}

router.get('/', auth, adminAuth, (_req, res) => {
  res.json({ messages: getMessages() })
})

router.post('/', contactLimiter, async (req, res) => {
  try {
    const name = sanitize(req.body.name)
    const email = String(req.body.email || '').trim().toLowerCase().replace(/[^\w@.+\-]/g, '')
    const subject = sanitize(req.body.subject).substring(0, 200)
    const message = sanitize(req.body.message).substring(0, 5000)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const msgData = { id: Date.now().toString(36), name, email, subject, message, timestamp: new Date().toISOString() }
    const messages = getMessages()
    messages.unshift(msgData)
    saveMessages(messages)

    try {
      await transporter.sendMail({
        from: `"KINTOX Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[KINTOX Contact] ${subject}`,
        html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name.replace(/\n/g, '<br>')}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p><hr><p style="color:#888;font-size:12px;">Sent from KINTOX contact form</p>`,
      })
    } catch {}
    res.json({ success: true, message: 'Message sent successfully' })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router