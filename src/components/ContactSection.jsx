import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../lib/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
}

const contactInfo = [
  { icon: 'email', label: 'Email', value: 'nakshtr.144@gmail.com', href: 'mailto:nakshtr.144@gmail.com', d: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
  { icon: 'phone', label: 'Phone', value: '+91 98757 66841', href: 'tel:+919875766841', d: 'M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z' },
  { icon: 'location', label: 'Location', value: 'Bhilwara, Rajasthan, India', d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
]

const socials = [
  { name: 'Instagram', link: 'https://instagram.com/nakshtr53', d: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.16 0-3.54.01-4.8.07-2.43.11-3.62 1.21-3.73 3.73-.06 1.26-.07 1.64-.07 4.8s.01 3.54.07 4.8c.11 2.52 1.3 3.62 3.73 3.73 1.26.06 1.64.07 4.8.07s3.54-.01 4.8-.07c2.43-.11 3.62-1.21 3.73-3.73.06-1.26.07-1.64.07-4.8s-.01-3.54-.07-4.8c-.11-2.52-1.3-3.62-3.73-3.73-1.26-.06-1.64-.07-4.8-.07zm0 3.06a4.98 4.98 0 100 9.96 4.98 4.98 0 000-9.96zm0 8.16a3.18 3.18 0 110-6.36 3.18 3.18 0 010 6.36zm5.17-8.5a1.16 1.16 0 100 2.32 1.16 1.16 0 000-2.32z' },
  { name: 'Dribbble', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.6 5.5c.62 1.07.97 2.3 1 3.6-.15-.02-.5-.05-1.13-.05-2.33 0-4.4.5-6.14 1.37l-.13.06c-.02-.04-.03-.08-.05-.12-1.48-3.51-3.29-6.3-3.91-7.5l.06-.03c2.16-.86 4.5-1.09 6.6-.83 1.9.25 3.7.94 5.2 1.92l.5.58zm-7.98.7c.6 1.17 2.38 3.94 3.87 5.46-2.5 1.32-5.36 2.02-8.38 2.02-.47 0-.94-.02-1.4-.06.7-2.7 2.9-4.97 5.9-6.43.01.01 0 .01.01 0zm-6.7 8.08c.3-.05.62-.08.95-.08 3.55 0 6.86-1.12 9.55-3.02l.14-.1c1.07 2.34 1.86 4.88 2.1 6.28-2.68 1.56-5.8 2.37-9.06 2-1.58-.18-3.16-.66-4.53-1.36.29-.88.53-1.8.7-2.75l.15.03zm12.86 3.07c-.34-1.72-1.23-4.42-2.4-6.84 1.4-.43 2.7-.59 3.72-.59.43 0 .72.03.8.04-.06 2.72-1.06 5.2-2.12 7.39z' },
  { name: 'Twitter', d: 'M18.24 2.25h3.3l-7.2 8.26 8.48 11.24h-6.64l-5.2-6.82-5.95 6.82H1.73l7.72-8.84L1.3 2.25h6.8l4.7 6.22 5.44-6.22zm-1.16 17.5h1.83L7.08 4.13H5.1l11.98 15.62z' },
  { name: 'LinkedIn', link: 'https://linkedin.com/in/nakshtra-vyas', d: 'M20.45 20.45H16.9v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.41H9.55V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.1 20.45H3.58V9h3.52v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      setSent(true)
      setTimeout(() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }, 3000)
    } catch {
      setSent(true)
      setTimeout(() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }, 3000)
    }
    setLoading(false)
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0071E3]/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#0071E3]/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="text-center mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#0071E3] uppercase tracking-[0.15em] bg-[#0071E3]/10 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full animate-pulse" />
            CONTACT
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-[#1D1D1F] text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get In <span className="text-[#0071E3]">Touch</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#6E6E73] text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                variants={fadeUp}
                custom={i}
                href={info.href}
                className="flex items-center gap-5 p-5 md:p-6 bg-white rounded-2xl border border-[#E8E8ED] hover:border-[#0071E3]/30 hover:shadow-lg hover:shadow-[#0071E3]/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5F5F7] flex items-center justify-center group-hover:bg-[#0071E3]/10 transition-colors shrink-0">
                  <svg className="w-5 h-5 text-[#6E6E73] group-hover:text-[#0071E3] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d={info.d} /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">{info.label}</p>
                  <p className="text-[#1D1D1F] text-sm font-medium group-hover:text-[#0071E3] transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div variants={fadeUp} custom={3} className="p-5 md:p-6 bg-white rounded-2xl border border-[#E8E8ED]">
              <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-4">Follow Us</p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={s.link || '#'} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="w-10 h-10 rounded-xl bg-[#F5F5F7] flex items-center justify-center hover:bg-[#0071E3]/10 hover:text-[#0071E3] transition-all group">
                    <svg className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0071E3] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} action="https://formspree.io/f/xrbekwae" method="POST" className="bg-white rounded-3xl p-6 md:p-10 border border-[#E8E8ED] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="contact-subject" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="contact-message" className="block text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  id="contact-message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3.5 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sent || loading}
                className="w-full py-4 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all active:scale-[0.98] shadow-lg shadow-[#0071E3]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>Sending... <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" /><path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" /></svg></>
                ) : sent ? (
                  <>Sent! <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg></>
                ) : (
                  <>Send Message <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
