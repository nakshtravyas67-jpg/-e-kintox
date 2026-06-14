import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
  const token = req.cookies?.kintox_token || (
    req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null
  )
  if (!token) return res.status(401).json({ error: 'Authentication required' })

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
