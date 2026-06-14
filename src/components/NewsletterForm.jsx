import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <section className="mt-20 py-16 px-8 md:px-16 rounded-2xl bg-[#0071E3] relative overflow-hidden">
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-white mb-4">Join the Kintox Collective</h2>
        <p className="text-white/80 text-lg mb-8">Get early access to weekly design drops, freebies, and professional design tips delivered to your inbox.</p>
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`px-6 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-white/20 transition-all w-full sm:w-80 text-sm ${
                status === 'error' ? 'border-red-400' : 'border-white/20'
              }`}
              placeholder="Your email address"
              type="email"
              autoComplete="email"
              inputMode="email"
            />
            <button onClick={handleSubmit} className="px-8 py-3.5 rounded-xl bg-white text-[#0071E3] font-semibold text-sm hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap cursor-pointer">Subscribe</button>
          </div>
          {status === 'error' && <p className="text-red-300 text-xs">Please enter a valid email address.</p>}
          {status === 'success' && <p className="text-green-300 text-xs">Thanks for subscribing!</p>}
        </div>
      </div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  )
}
