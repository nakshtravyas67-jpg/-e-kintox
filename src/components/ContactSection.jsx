import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from './SEO'
import { api } from '../lib/api'
import { useToast } from '../context/ToastContext'

export default function ContactSection({ standalone }) {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const contactInfo = [
    { label: 'Email', value: 'nakshtr.144@gmail.com', href: 'mailto:nakshtr.144@gmail.com', d: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
    { label: 'Phone', value: '+91 98757 66841', href: 'tel:+919875766841', d: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' },
    { label: 'Location', value: 'Bhilwara, Rajasthan, IN', href: 'https://maps.google.com/?q=Bhilwara+Rajasthan', d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
  ]
  const socials = [
    { name: 'Instagram', link: 'https://instagram.com/nakshtr53', d: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.16 0-3.54.01-4.8.07-2.43.11-3.62 1.21-3.73 3.73-.06 1.26-.07 1.64-.07 4.8s.01 3.54.07 4.8c.11 2.52 1.3 3.62 3.73 3.73 1.26.06 1.64.07 4.8.07s3.54-.01 4.8-.07c2.43-.11 3.62-1.21 3.73-3.73.06-1.26.07-1.64.07-4.8s-.01-3.54-.07-4.8c-.11-2.52-1.3-3.62-3.73-3.73-1.26-.06-1.64-.07-4.8-.07zm0 3.06a4.98 4.98 0 100 9.96 4.98 4.98 0 000-9.96zm0 8.16a3.18 3.18 0 110-6.36 3.18 3.18 0 010 6.36zm5.17-8.5a1.16 1.16 0 100 2.32 1.16 1.16 0 000-2.32z' },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/nakshtra-vyas', d: 'M20.45 20.45H16.9v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.41H9.55V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.1 20.45H3.58V9h3.52v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z' },
    { name: 'Twitter', link: 'https://twitter.com', d: 'M18.24 2.25h3.3l-7.2 8.26 8.48 11.24h-6.64l-5.2-6.82-5.95 6.82H1.73l7.72-8.84L1.3 2.25h6.8l4.7 6.22 5.44-6.22zm-1.16 17.5h1.83L7.08 4.13H5.1l11.98 15.62z' },
  ]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/contact', form)
      setSent(true)
      toast.success('Message sent successfully!')
      setTimeout(() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }, 3000)
    } catch {
      toast.error('Failed to send. Please email nakshtr.144@gmail.com')
    }
    setLoading(false)
  }

  return (
    <>
      {standalone && <SEO title="Contact" description="Get in touch with KINTOX for premium graphic design services. Based in Bhilwara, Rajasthan." path="/contact" />}
    <section className="bg-[#f5f5f7]">
      <div className="mx-auto max-w-[980px] py-20 px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold leading-[1.1] text-[#1d1d1f] mb-4">
            Get In Touch
          </h2>
          <p className="text-[17px] font-[400] text-[#7a7a7a] max-w-xl mx-auto">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-center gap-4 p-4 bg-white rounded-[11px] border border-[#e0e0e0] hover:border-[#0066cc]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center shrink-0">
                  <svg aria-hidden="true" className="w-4 h-4 text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor"><path d={info.d} /></svg>
                </div>
                <div>
                  <p className="text-[14px] font-[400] text-[#7a7a7a]">{info.label}</p>
                  <p className="text-[15px] font-[500] text-[#1d1d1f]">{info.value}</p>
                </div>
              </a>
            ))}

            <div className="p-4 bg-white rounded-[11px] border border-[#e0e0e0]">
              <p className="text-[14px] font-[400] text-[#7a7a7a] mb-3">Follow Us</p>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a key={s.name} href={s.link || '#'} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="w-11 h-11 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-[#0066cc]/10 transition-colors">
                    <svg aria-hidden="true" className="w-4 h-4 text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} action="https://formspree.io/f/xrbekwae" method="POST" className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-[14px] font-[400] text-[#7a7a7a] mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] transition-colors placeholder:text-[#7a7a7a]"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[14px] font-[400] text-[#7a7a7a] mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] transition-colors placeholder:text-[#7a7a7a]"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-[14px] font-[400] text-[#7a7a7a] mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] transition-colors placeholder:text-[#7a7a7a]"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-[14px] font-[400] text-[#7a7a7a] mb-1">Message</label>
                <textarea
                  name="message"
                  id="contact-message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-white border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none focus:border-[#0066cc] transition-colors placeholder:text-[#7a7a7a] resize-none min-h-[120px]"
                />
              </div>
              <button
                type="submit"
                disabled={sent || loading}
                className="w-full py-3 px-6 bg-[#0071e3] text-white text-[17px] font-semibold rounded-[980px] hover:bg-[#0077ed] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>Sending…</>
                ) : sent ? (
                  <>Sent! ✓</>
                ) : (
                  <>Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
