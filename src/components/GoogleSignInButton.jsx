import { useState, useEffect, useRef, useCallback } from 'react'

export default function GoogleSignInButton({ onSuccess, onError, disabled }) {
  const btnRef = useRef(null)
  const fallbackBtnRef = useRef(null)
  const [gsiReady, setGsiReady] = useState(false)
  const [gsiFailed, setGsiFailed] = useState(false)
  const [fallbackLoading, setFallbackLoading] = useState(false)
  const initialized = useRef(false)

  useEffect(() => {
    const existing = document.querySelector('script[src*="accounts.google.com/gsi/client"]')
    if (existing) { setGsiReady(true); return }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => setGsiReady(true)
    script.onerror = () => setGsiFailed(true)
    document.body.appendChild(script)
    setTimeout(() => { if (!initialized.current) setGsiFailed(true) }, 5000)
  }, [])

  useEffect(() => {
    if (!gsiReady || !btnRef.current || initialized.current) return
    try {
      if (!window.google?.accounts?.id) { setGsiFailed(true); return }
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (response?.credential) onSuccess(response.credential)
        },
        cancel_on_tap_outside: false,
      })
      window.google.accounts.id.renderButton(btnRef.current, {
        type: 'standard', shape: 'pill', theme: 'outline',
        text: 'signin_with', size: 'large',
        logo_alignment: 'left', width: '100%',
      })
      initialized.current = true
    } catch { setGsiFailed(true) }
  }, [gsiReady, onSuccess])

  const handleFallback = useCallback(async () => {
    setFallbackLoading(true)
    try {
      await onSuccess(null)
    } catch (e) { onError?.(e) }
    setFallbackLoading(false)
  }, [onSuccess, onError])

  if (gsiFailed || (!gsiReady && !initialized.current)) {
    return (
      <button
        onClick={handleFallback}
        disabled={disabled || fallbackLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-[#dadce0] rounded-full text-[14px] font-[500] text-[#1d1d1f] hover:bg-[#f8f9fa] transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
      >
        {fallbackLoading ? (
          <div className="w-5 h-5 border-2 border-[#1d1d1f] border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </>
        )}
      </button>
    )
  }

  return (
    <div ref={btnRef} className={`w-full min-h-[44px] ${disabled ? 'pointer-events-none opacity-50' : ''}`} />
  )
}