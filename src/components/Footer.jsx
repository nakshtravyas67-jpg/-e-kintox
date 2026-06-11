import { Link } from 'react-router-dom'
import KintoxLogo from './KintoxLogo'

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
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'FAQ', path: '#' },
    { label: 'Refund Policy', path: '#' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full bg-[#1D1D1F] border-t border-white/[0.06]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
            <div className="col-span-2 md:col-span-4">
              <KintoxLogo dark showTagline />
              <p className="text-white/40 text-xs mt-3 leading-relaxed max-w-xs">
                Premium graphics design agency specializing in high-converting visuals, brand identity, and digital experiences.
              </p>
              <div className="flex items-center gap-2.5 mt-6">
                <a href="https://instagram.com/nakshtr53" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] hover:scale-110 transition-all duration-200">
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.16 0-3.54.01-4.8.07-2.43.11-3.62 1.21-3.73 3.73-.06 1.26-.07 1.64-.07 4.8s.01 3.54.07 4.8c.11 2.52 1.3 3.62 3.73 3.73 1.26.06 1.64.07 4.8.07s3.54-.01 4.8-.07c2.43-.11 3.62-1.21 3.73-3.73.06-1.26.07-1.64.07-4.8s-.01-3.54-.07-4.8c-.11-2.52-1.3-3.62-3.73-3.73-1.26-.06-1.64-.07-4.8-.07zm0 3.06a4.98 4.98 0 100 9.96 4.98 4.98 0 000-9.96zm0 8.16a3.18 3.18 0 110-6.36 3.18 3.18 0 010 6.36zm5.17-8.5a1.16 1.16 0 100 2.32 1.16 1.16 0 000-2.32z" /></svg>
                </a>
                <a href="https://linkedin.com/in/nakshtra-vyas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] hover:scale-110 transition-all duration-200">
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45H16.9v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.41H9.55V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.1 20.45H3.58V9h3.52v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" /></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] hover:scale-110 transition-all duration-200">
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.3l-7.2 8.26 8.48 11.24h-6.64l-5.2-6.82-5.95 6.82H1.73l7.72-8.84L1.3 2.25h6.8l4.7 6.22 5.44-6.22zm-1.16 17.5h1.83L7.08 4.13H5.1l11.98 15.62z" /></svg>
                </a>
              </div>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="col-span-1 md:col-span-2 md:col-start-auto">
                <h4 className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="text-white/70 hover:text-white text-xs font-medium transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-white/[0.06] gap-4">
          <p className="text-white/30 text-[11px]">&copy; {year} KINTOX. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/30 text-[11px]">
              <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              {['visa', 'mastercard', 'paypal', 'amex'].map((card) => (
                <span key={card} className="text-white/20 text-[10px] font-semibold uppercase bg-white/[0.04] px-2 py-1 rounded">{card}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
