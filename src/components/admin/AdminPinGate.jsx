import { useState } from 'react'
import SEO from '../SEO'

const ADMIN_PIN = '1234'

export default function AdminPinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('admin_unlocked', 'true')
      setPinError('')
      onUnlock()
    } else {
      setPinError('Wrong PIN. Try again.')
      setPin('')
    }
  }

  return (
    <>
      <SEO title="Restricted" description="Restricted area" />
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f5f5f7] flex items-center justify-center">
            <svg aria-hidden="true" className="w-8 h-8 text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
          </div>
          <h1 className="text-[24px] font-[600] text-[#1d1d1f] mb-2">Restricted Area</h1>
          <p className="text-[14px] text-[#7a7a7a] mb-6">Enter admin PIN to continue</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError('') }}
            className="w-full px-4 py-3 bg-[#f5f5f7] rounded-full text-[17px] text-center outline-none placeholder:text-[#7a7a7a] mb-3"
            placeholder="Enter PIN"
            autoFocus
            maxLength={10}
          />
          {pinError && <p className="text-[14px] text-red-500 mb-3">{pinError}</p>}
          <button type="submit" className="w-full px-8 py-3 bg-[#0066cc] text-white rounded-full text-[14px] font-[500] hover:bg-[#0055aa] transition-colors cursor-pointer">
            Unlock
          </button>
        </form>
      </div>
    </>
  )
}