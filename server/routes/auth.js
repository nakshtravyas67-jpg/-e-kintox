import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import { getUsers, addUser, updateUser } from '../lib/store.js'

const router = Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Try again later.' },
})

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many signup attempts. Try again later.' },
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

function setTokenCookie(res, token) {
  const isSecure = process.env.NODE_ENV === 'production'
  res.cookie('kintox_token', token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

function clearTokenCookie(res) {
  res.cookie('kintox_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })
}

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role || 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function stripSensitive(user) {
  const { password, verificationToken, verificationTokenExpires, resetToken, resetTokenExpires, ...rest } = user
  return rest
}

router.get('/me', (req, res) => {
  const token = req.cookies?.kintox_token
  if (!token) return res.status(401).json({ error: 'Not authenticated' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = getUsers().find((u) => u.id === decoded.id)
    if (!user) return res.status(401).json({ error: 'User not found' })
    res.json({ user: stripSensitive(user) })
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
})

router.post('/signup', signupLimiter, async (req, res) => {
  try {
    let { name, email, password } = req.body
    name = String(name || '').trim().replace(/<[^>]*>/g, '')
    email = String(email || '').trim().toLowerCase().replace(/[^\w@.+\-]/g, '')
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' })
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })

    const existing = getUsers().find((u) => u.email === email)
    if (existing) return res.status(409).json({ error: 'Email already registered' })

    const hash = await bcrypt.hash(password, 10)
    const users = getUsers()
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const user = {
      id: String(users.length + 1),
      name: name.trim(),
      email,
      password: hash,
      role: 'user',
      verified: false,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    }
    addUser(user)

    const verifyUrl = `${process.env.VERIFICATION_URL || process.env.FRONTEND_URL || 'http://localhost:5173'}/api/auth/verify-email?token=${verificationToken}`
    const token = signToken(user)
    setTokenCookie(res, token)

    try {
      await transporter.sendMail({
        from: `"KINTOX" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your KINTOX email address',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
            <h1 style="font-size:24px;font-weight:600;color:#1d1d1f;margin-bottom:16px">Welcome to KINTOX</h1>
            <p style="font-size:15px;color:#7a7a7a;line-height:1.5;margin-bottom:24px">Thanks for signing up! Please verify your email address by clicking the button below.</p>
            <a href="${verifyUrl}" style="display:inline-block;background:#0066cc;color:#fff;font-size:15px;font-weight:600;padding:12px 28px;border-radius:24px;text-decoration:none">Verify Email</a>
            <p style="font-size:13px;color:#7a7a7a;margin-top:24px">Or copy this link: ${verifyUrl}</p>
            <p style="font-size:13px;color:#7a7a7a;margin-top:16px">This link expires in 24 hours.</p>
          </div>
        `,
      })
    } catch (mailErr) {
      console.error('Verification email failed:', mailErr.message)
    }

    res.status(201).json({ user: stripSensitive(user) })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/verify-email', (req, res) => {
  try {
    const { token } = req.query
    if (!token) return res.status(400).json({ error: 'Verification token required' })

    const users = getUsers()
    const user = users.find((u) => u.verificationToken === token)
    if (!user) return res.status(400).json({ error: 'Invalid or expired verification token' })

    if (new Date(user.verificationTokenExpires) < new Date()) {
      return res.status(400).json({ error: 'Verification token has expired. Please sign up again.' })
    }

    updateUser(user.id, {
      verified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    })

    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?verified=true`)
  } catch (err) {
    console.error('Verify email error:', err)
    res.status(500).json({ error: 'Verification failed' })
  }
})

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const user = getUsers().find((u) => u.email === email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    if (!user.password) return res.status(401).json({ error: 'This account uses social login. Please sign in with ' + (user.provider || 'Google/Apple/GitHub') + '.' })
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    if (!user.verified) {
      return res.status(403).json({
        error: 'Please verify your email before logging in. Check your inbox for the verification link.',
        needsVerification: true,
        email: user.email,
      })
    }

    const token = signToken(user)
    setTokenCookie(res, token)
    res.json({ user: stripSensitive(user) })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/social', async (req, res) => {
  try {
    const { name, email, provider, accessToken } = req.body

    let providerEmail = email
    if (provider === 'google' && accessToken) {
      try {
        const ticket = await googleClient.verifyIdToken({ idToken: accessToken, audience: process.env.GOOGLE_CLIENT_ID })
        const payload = ticket.getPayload()
        if (payload?.email) providerEmail = payload.email
      } catch (e) {
        console.error('Google verify error:', e.message)
      }
    } else if (provider === 'github' && accessToken) {
      try {
        const resp = await fetch('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (resp.ok) {
          const data = await resp.json()
          if (data.email) providerEmail = data.email
        }
      } catch { }
    }

    if (!providerEmail) return res.status(400).json({ error: 'Email required' })

    let users = getUsers()
    let user = users.find((u) => u.email === providerEmail)
    if (!user) {
      user = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + String(Math.random()).slice(2),
        name: name || provider || 'User',
        email: providerEmail,
        password: null,
        role: 'user',
        verified: true,
        provider,
        createdAt: new Date().toISOString(),
      }
      addUser(user)
    }

    const token = signToken(user)
    setTokenCookie(res, token)
    res.json({ user: stripSensitive(user) })
  } catch (err) {
    console.error('Social login error:', err)
    res.status(500).json({ error: 'Social login failed' })
  }
})

const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Too many password reset requests. Try again later.' },
})

const resendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many verification requests. Try again later.' },
})

router.post('/forgot-password', forgotLimiter, async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })

    const users = getUsers()
    const user = users.find((u) => u.email === email)
    if (!user) return res.json({ message: 'If that email is registered, a reset link has been sent.' })

    const resetToken = crypto.randomBytes(32).toString('hex')
    updateUser(user.id, {
      resetToken,
      resetTokenExpires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    })

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`

    try {
      await transporter.sendMail({
        from: `"KINTOX" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset your KINTOX password',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
            <h1 style="font-size:24px;font-weight:600;color:#1d1d1f;margin-bottom:16px">Password Reset</h1>
            <p style="font-size:15px;color:#7a7a7a;line-height:1.5;margin-bottom:24px">Click the button below to reset your password. This link expires in 1 hour.</p>
            <a href="${resetUrl}" style="display:inline-block;background:#0066cc;color:#fff;font-size:15px;font-weight:600;padding:12px 28px;border-radius:24px;text-decoration:none">Reset Password</a>
            <p style="font-size:13px;color:#7a7a7a;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      })
    } catch (mailErr) {
      console.error('Password reset email failed:', mailErr.message)
    }

    res.json({ message: 'If that email is registered, a reset link has been sent.' })
  } catch (err) {
    console.error('Forgot password error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body
    if (!token || !password) return res.status(400).json({ error: 'Token and password required' })
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })

    const users = getUsers()
    const user = users.find((u) => u.resetToken === token)
    if (!user) return res.status(400).json({ error: 'Invalid or expired reset token' })

    if (new Date(user.resetTokenExpires) < new Date()) {
      return res.status(400).json({ error: 'Reset token has expired. Please request a new one.' })
    }

    const hash = await bcrypt.hash(password, 10)
    updateUser(user.id, {
      password: hash,
      resetToken: null,
      resetTokenExpires: null,
    })

    res.json({ message: 'Password reset successful. You can now log in with your new password.' })
  } catch (err) {
    console.error('Reset password error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/resend-verification', resendLimiter, async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })

    const users = getUsers()
    const user = users.find((u) => u.email === email)
    if (!user) return res.status(404).json({ error: 'No account found with this email' })
    if (user.verified) return res.json({ message: 'Email is already verified' })

    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verifyUrl = `${process.env.VERIFICATION_URL || process.env.FRONTEND_URL || 'http://localhost:5173'}/api/auth/verify-email?token=${verificationToken}`

    updateUser(user.id, {
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })

    try {
      await transporter.sendMail({
        from: `"KINTOX" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your KINTOX email address',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
            <h1 style="font-size:24px;font-weight:600;color:#1d1d1f;margin-bottom:16px">Verify your email</h1>
            <p style="font-size:15px;color:#7a7a7a;line-height:1.5;margin-bottom:24px">Click the button below to verify your email address.</p>
            <a href="${verifyUrl}" style="display:inline-block;background:#0066cc;color:#fff;font-size:15px;font-weight:600;padding:12px 28px;border-radius:24px;text-decoration:none">Verify Email</a>
            <p style="font-size:13px;color:#7a7a7a;margin-top:24px">Or copy this link: ${verifyUrl}</p>
          </div>
        `,
      })
    } catch (mailErr) {
      console.error('Resend verification email failed:', mailErr.message)
    }

    res.json({ message: 'Verification email sent' })
  } catch (err) {
    console.error('Resend verification error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/logout', (req, res) => {
  clearTokenCookie(res)
  res.json({ message: 'Logged out successfully' })
})

export default router
