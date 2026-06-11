import { Router } from 'express'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'

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

router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const mailOptions = {
      from: `"KINTOX Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[KINTOX Contact] ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p style="color:#888;font-size:12px;">Sent from KINTOX contact form</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Message sent successfully' })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router
