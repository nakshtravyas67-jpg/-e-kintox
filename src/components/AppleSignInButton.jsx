import { useState } from 'react'

export default function AppleSignInButton({ onSuccess, onError, disabled }) {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      onSuccess(null)
    } catch (e) { onError?.(e) }
    setLoading(false)
  }

  return (
    <button
      onClick={handleLogin}
      disabled={disabled || loading}
      className="flex items-center justify-center gap-2 py-3 border border-[#e0e0e0] rounded-[11px] hover:bg-[#f5f5f7] transition-colors group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full min-h-[44px]"
      aria-label="Sign in with Apple"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-[#1d1d1f] border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <svg aria-hidden="true" className="w-5 h-5 text-[#7a7a7a] group-hover:text-[#1d1d1f] transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          <span className="text-sm text-[#7a7a7a] group-hover:text-[#1d1d1f] transition-colors">Apple</span>
        </>
      )}
    </button>
  )
}