import { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import SEO from './SEO'
import KintoxLogo from './KintoxLogo'
import { api } from '../lib/api'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) { setError('Invalid or missing reset token'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      const data = await api.post('/auth/reset-password', { token, password })
      setSuccess(data.message)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <>
        <SEO title="Reset Password" />
        <div className="min-h-screen bg-white flex items-center justify-center px-5">
          <div className="text-center max-w-[400px]">
            <div className="flex justify-center mb-6"><KintoxLogo /></div>
            <h1 className="text-[#1d1d1f] text-3xl font-bold tracking-tight mb-2">Invalid link</h1>
            <p className="text-[#7a7a7a] text-[17px] mb-6">This password reset link is invalid or has expired.</p>
            <Link to="/login" className="inline-block py-3 px-8 bg-[#0066cc] text-white text-[17px] font-semibold rounded-full hover:bg-[#0055b3] transition-colors">Back to Sign In</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Reset Password" />
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="w-full max-w-[400px]">
          <div className="flex justify-center mb-6"><KintoxLogo /></div>
          <h1 className="text-[#1d1d1f] text-3xl font-bold tracking-tight text-center mb-2">Set new password</h1>
          <p className="text-[#7a7a7a] text-[17px] text-center mb-8">Enter your new password below.</p>

          {success ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-[11px]">
              <p className="text-[14px] text-green-700">{success}</p>
              <p className="text-[13px] text-[#7a7a7a] mt-2">Redirecting to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="reset-pass" className="block text-[14px] font-[400] text-[#7a7a7a] mb-1">New Password</label>
                <input
                  type="password"
                  id="reset-pass"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#7a7a7a] focus:border-[#0066cc]"
                />
              </div>
              <div>
                <label htmlFor="reset-confirm" className="block text-[14px] font-[400] text-[#7a7a7a] mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="reset-confirm"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setError('') }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#7a7a7a] focus:border-[#0066cc]"
                />
              </div>
              {error && <p className="text-[14px] text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0066cc] text-white text-[17px] font-semibold rounded-full hover:bg-[#0055b3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <Link to="/login" className="text-[14px] text-[#0066cc]">Back to sign in</Link>
          </div>
        </div>
      </div>
    </>
  )
}
