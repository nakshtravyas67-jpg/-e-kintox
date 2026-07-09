import { useState } from 'react'
import { Link } from 'react-router-dom'

const footerLinks = {
  'Portfolio': [
    { label: 'Web Design', path: '/portfolio' },
    { label: 'App UI', path: '/portfolio' },
    { label: 'Thumbnails', path: '/portfolio' },
    { label: 'Branding', path: '/portfolio' },
  ],
  'Company': [
    { label: 'About', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ],
  'Support': [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Refund Policy', path: '/refund' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="w-full bg-[#f5f5f7] border-t border-[#e0e0e0]">
      <div className="max-w-[980px] mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-6">
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2.5">
                <svg aria-hidden="true" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="30" height="30" rx="8" fill="#0066cc" />
                  <path d="M10 8L16 16L10 24M22 8L16 16L22 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 16H25" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[14px] font-[600] tracking-tight text-[#1d1d1f]">KINTOX</span>
                  <span className="text-[9px] tracking-wider text-[#7a7a7a]">PREMIUM GRAPHICS DESIGN</span>
                </div>
              </div>
            </Link>
            <p className="text-[12px] text-[#7a7a7a] mt-4 leading-[1.43] max-w-xs">
              Premium graphics design agency specializing in high-converting visuals, brand identity, and digital experiences.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[{ href: 'https://instagram.com/nakshtr53', label: 'Instagram' }, { href: 'https://linkedin.com/in/nakshtra-vyas', label: 'LinkedIn' }, { href: 'https://twitter.com', label: 'Twitter' }].map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#e8e8e8] flex items-center justify-center hover:bg-[#d2d2d7] transition-colors">
                  <svg aria-hidden="true" className="w-4 h-4 text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor">
                    {label === 'Instagram' && <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.16 0-3.54.01-4.8.07-2.43.11-3.62 1.21-3.73 3.73-.06 1.26-.07 1.64-.07 4.8s.01 3.54.07 4.8c.11 2.52 1.3 3.62 3.73 3.73 1.26.06 1.64.07 4.8.07s3.54-.01 4.8-.07c2.43-.11 3.62-1.21 3.73-3.73.06-1.26.07-1.64.07-4.8s-.01-3.54-.07-4.8c-.11-2.52-1.3-3.62-3.73-3.73-1.26-.06-1.64-.07-4.8-.07zm0 3.06a4.98 4.98 0 100 9.96 4.98 4.98 0 000-9.96zm0 8.16a3.18 3.18 0 110-6.36 3.18 3.18 0 010 6.36zm5.17-8.5a1.16 1.16 0 100 2.32 1.16 1.16 0 000-2.32z" />}
                    {label === 'LinkedIn' && <path d="M20.45 20.45H16.9v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.41H9.55V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.1 20.45H3.58V9h3.52v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />}
                    {label === 'Twitter' && <path d="M18.24 2.25h3.3l-7.2 8.26 8.48 11.24h-6.64l-5.2-6.82-5.95 6.82H1.73l7.72-8.84L1.3 2.25h6.8l4.7 6.22 5.44-6.22zm-1.16 17.5h1.83L7.08 4.13H5.1l11.98 15.62z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1 md:col-span-2">
              <h4 className="text-[12px] font-[600] text-[#7a7a7a] mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-[12px] text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors inline-block py-1">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 py-8 border-t border-b border-[#e0e0e0]">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-[14px] font-[600] text-[#1d1d1f] mb-1">Stay in the loop</h4>
            <p className="text-[12px] text-[#7a7a7a] mb-4">Get design tips, early access to new products, and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 min-h-[44px] px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[14px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] focus:border-[#0066cc] transition-colors"
              />
              <button
                type="submit"
                className="min-h-[44px] px-5 py-3 bg-[#0066cc] text-white text-[14px] font-[500] rounded-[11px] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {subscribed && <p className="text-[12px] text-[#34c759] mt-2">Thanks for subscribing!</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-[12px] text-[#7a7a7a]">&copy; {year} KINTOX. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[12px] text-[#7a7a7a]">
              <svg aria-hidden="true" className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              {['visa', 'mastercard', 'paypal', 'amex'].map((card) => (
                <span key={card} className="text-[10px] font-[600] uppercase text-[#7a7a7a] bg-[#e8e8e8] px-2 py-1 rounded-[5px]">{card}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
