import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SEO from './SEO'
import { useAuth } from '../context/AuthContext'

const services = [
  {
    icon: 'smart_display',
    title: 'YouTube Thumbnail Design',
    desc: 'High-CTR visuals optimized for maximum audience retention. Data-driven color psychology and typography.',
    stats: '60% avg. CTR improvement',
    tools: 'Photoshop, Illustrator',
    price: 'From ₹499/pack',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    packages: [
      {
        tier: 'Basic',
        badge: '🥉',
        price: '₹499',
        features: [
          '5 Professional YouTube Thumbnails',
          'Modern & Clean Design',
          'High CTR Focused',
          '2 Revisions',
          'Delivery in 3 Days',
          'Basic Support',
        ],
        recommend: 'New YouTubers',
      },
      {
        tier: 'Professional',
        badge: '🥈',
        price: '₹999',
        popular: true,
        features: [
          '20 Professional YouTube Thumbnails',
          'AI-Assisted Premium Designs',
          'High-Quality & Eye-Catching Thumbnails',
          'Unlimited Minor Revisions',
          '24/7 Customer Support',
          'After-Delivery Support',
          'Delivery in 3 Days',
        ],
        recommend: 'Growing Creators',
      },
      {
        tier: 'Ultra',
        badge: '🥇',
        price: '₹1,499',
        features: [
          '25 Ultra-Premium YouTube Thumbnails',
          'Custom High CTR Designs',
          'Advanced AI + Manual Editing',
          'Priority Delivery',
          'Unlimited Revisions',
          '24/7 Customer Support',
          '10 Days After-Delivery Support',
          'Source Files Included',
        ],
        recommend: 'Professional YouTubers',
      },
    ],
  },
  {
    icon: 'share',
    title: 'Social Media Design',
    desc: 'Engaging Instagram, Twitter, and LinkedIn content built for viral performance and brand consistency.',
    stats: '3x avg. engagement boost',
    tools: 'Figma, After Effects',
    price: 'From ₹1,499/pack',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  },
  {
    icon: 'auto_awesome_motion',
    title: 'Poster & Ad Creative',
    desc: 'High-conversion print and digital campaign assets designed for brands that demand attention.',
    stats: '150% higher conversion rates',
    tools: 'Photoshop, InDesign',
    price: 'From ₹699/pack',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
    packages: [
      {
        tier: 'Basic',
        badge: '🥉',
        price: '₹699',
        features: [
          '1 Poster / Ad Design',
          'Custom Typography & Layout',
          'High-Resolution Export (300 DPI)',
          '2 Revisions',
          'Delivery in 48 Hours',
          'Print & Digital Ready',
        ],
        recommend: 'Small Businesses',
      },
      {
        tier: 'Professional',
        badge: '🥈',
        price: '₹1,299',
        popular: true,
        features: [
          '3 Poster / Ad Designs',
          'Custom Illustrations & Graphics',
          'High-Resolution Export (300 DPI)',
          'Unlimited Minor Revisions',
          'Delivery in 24 Hours',
          'Multi-Format (Print, Web, Social)',
          'Brand Color & Font Matching',
        ],
        recommend: 'Growing Brands',
      },
      {
        tier: 'Ultra',
        badge: '🥇',
        price: '₹2,499',
        features: [
          '5 Poster / Ad Designs',
          'Full Campaign Creative Suite',
          'Custom Illustrations & 3D Elements',
          'Unlimited Revisions',
          'Priority Delivery (12 Hours)',
          'Source Files (PSD, AI, INDD)',
          'Multi-Platform Adaptation',
          '7-Day After-Delivery Support',
        ],
        recommend: 'Marketing Agencies',
      },
    ],
  },
  {
    icon: 'code',
    title: 'Website Development',
    desc: 'Modern, responsive sites built with React, Framer, and Tailwind. Clean code meets world-class design.',
    stats: '40% faster load times',
    tools: 'React, Framer, Tailwind',
    price: 'From ₹2,999/project',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    packages: [
      {
        tier: 'Basic',
        badge: '💼',
        price: '₹2,999',
        features: [
          '1-3 Pages Website',
          'Mobile Responsive Design',
          'Contact Form',
          'Basic SEO Setup',
          '3 Days Delivery',
          '7 Days Support',
        ],
        recommend: 'Personal & Startups',
      },
      {
        tier: 'Professional',
        badge: '💼',
        price: '₹7,999',
        popular: true,
        features: [
          '5-10 Pages Website',
          'Modern UI/UX Design',
          'Responsive Design',
          'Contact Form + WhatsApp Integration',
          'Basic SEO Optimization',
          'Admin Panel',
          '24/7 Support',
          '7 Days Delivery',
        ],
        recommend: 'Growing Businesses',
      },
      {
        tier: 'Premium',
        badge: '🚀',
        price: '₹14,999+',
        features: [
          'Custom Website Design',
          'Unlimited Pages',
          'Advanced Animations',
          'E-Commerce / Portfolio / Business Website',
          'Payment Gateway Integration',
          'Premium UI/UX',
          'Speed Optimization',
          '24/7 Priority Support',
          '30 Days After-Delivery Support',
        ],
        recommend: 'Large Projects & E-Commerce',
      },
    ],
  },
  {
    icon: 'app_shortcut',
    title: 'Mobile App Development',
    desc: 'Intuitive iOS and Android experiences designed for growth. Smooth UX and user-centric navigation.',
    stats: '4.8★ avg. app rating',
    tools: 'Figma, Swift, Kotlin',
    price: 'From ₹9,999/project',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    icon: 'brush',
    title: 'Branding & Logo Design',
    desc: 'Timeless visual identities with comprehensive brand guidelines. Logos that stand the test of time.',
    stats: '200% brand recognition increase',
    tools: 'Illustrator, Photoshop',
    price: 'From ₹4,999/brand',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
  },
]

const whyUs = [
  { icon: 'speed', title: 'Fast Delivery', desc: 'Most projects delivered within 24-48 hours.' },
  { icon: 'verified', title: 'Premium Quality', desc: 'Pixel-perfect designs with commercial licenses.' },
  { icon: 'support_agent', title: 'Dedicated Support', desc: 'Free revisions until you\'re 100% satisfied.' },
  { icon: 'trending_up', title: 'Data-Driven', desc: 'Every design optimized for conversion & engagement.' },
]

const themes = ['Gaming', 'Tech', 'Vlog', 'Education', 'Finance', 'Entertainment', 'Music', 'Food', 'Fashion', 'Sports', 'News', 'Other']

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0
        const step = Math.ceil(target / (2000 / 16))
        const timer = setInterval(() => {
          current += step
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(current)
        }, 16)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null)
  const [orderForm, setOrderForm] = useState(null)
  const [formData, setFormData] = useState({ topic: '', theme: '', name: '', mobile: '', email: '', instructions: '', websiteType: '', websiteName: '', requiredPages: '', referenceLink: '' })
  const [formStep, setFormStep] = useState('form')
  const [formErrors, setFormErrors] = useState({})
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const requireAuth = (action) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/services' } })
      return false
    }
    return true
  }

  const resetForm = () => {
    setFormData({ topic: '', theme: '', name: '', mobile: '', email: '', instructions: '', websiteType: '', websiteName: '', requiredPages: '', referenceLink: '' })
    setFormStep('form')
    setFormErrors({})
    setOrderForm(null)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    const isWebsite = orderForm?.service?.title?.toLowerCase().includes('website')
    if (isWebsite) {
      if (!formData.name?.trim()) errors.name = 'Name is required'
      if (!formData.email?.trim()) errors.email = 'Email is required'
      if (!formData.mobile?.trim()) errors.mobile = 'Mobile number is required'
      if (!formData.websiteType) errors.websiteType = 'Select a website type'
      if (!formData.websiteName?.trim()) errors.websiteName = 'Website name is required'
    } else {
      if (!formData.topic?.trim()) errors.topic = 'Topic is required'
      if (!formData.theme) errors.theme = 'Select a theme'
      if (!formData.name?.trim()) errors.name = 'Name is required'
      if (!formData.mobile?.trim()) errors.mobile = 'Mobile number is required'
      if (!formData.email?.trim()) errors.email = 'Email is required'
    }
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    setFormStep('confirm')
  }

  return (
    <>
      <SEO title="Services — Creative Design & Development" description="Full-service digital partner offering brand identity, web design, social media creatives, UI/UX, and technical solutions." path="/services" />

      {/* Hero — Dark Tile */}
      <section className="bg-[#272729]">
        <div className="mx-auto max-w-[980px] px-4 md:px-6 py-20 text-center">
          <h1 className="text-[56px] font-[600] leading-[1.07] tracking-[-0.28px] text-white mb-5">
            Creative Design, Web Development &amp; Digital Solutions.
          </h1>
          <p className="text-[28px] font-[400] text-[rgba(255,255,255,0.7)] max-w-[680px] mx-auto">
            From viral visuals to robust infrastructure — we empower creators and brands with world-class design and technical execution.
          </p>
          <div className="flex justify-center gap-10 mt-12">
            {[
              { number: 2000, suffix: '+', label: 'Projects Delivered' },
              { number: 150, suffix: '+', label: 'Happy Clients' },
              { number: 49, suffix: '★', label: 'Avg. Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[24px] font-[600] text-white">
                  <CountUp target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-[12px] text-[rgba(255,255,255,0.5)] uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Light Tile */}
      <section className="bg-[#ffffff]">
        <div className="mx-auto max-w-[980px] px-4 md:px-6 py-20">
          <h2 className="text-[40px] font-[600] leading-[1.1] text-[#1d1d1f] text-center mb-3">
            Every Creative Service Under One Roof
          </h2>
          <p className="text-[17px] font-[400] leading-[1.47] text-[#7a7a7a] text-center max-w-[680px] mx-auto mb-12">
            From thumbnails that stop the scroll to full-scale web platforms — we handle every layer of your digital presence with precision and artistry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                onClick={() => setSelectedService(s)}
                className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 cursor-pointer flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[17px] font-[600] text-[#1d1d1f]">{s.title}</h3>
                  <span className="text-[11px] text-[#7a7a7a] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{s.stats}</span>
                </div>
                <p className="text-[14px] font-[400] text-[#7a7a7a] mb-4 leading-relaxed">{s.desc}</p>
                <p className="text-[12px] text-[#7a7a7a] mb-4">{s.tools}</p>
                {s.packages ? (
                  <div className="mt-auto space-y-3 border-t border-[#e0e0e0] pt-4">
                    {s.packages.map((pkg) => (
                      <div key={pkg.tier} className="flex items-center justify-between">
                        <div>
                          <span className="text-[14px] font-[400] text-[#7a7a7a]">{pkg.tier}</span>
                          {pkg.popular && <span className="text-[10px] text-[#0066cc] ml-1.5 font-[600]">Popular</span>}
                        </div>
                        <span className={`text-[17px] font-[600] ${pkg.popular ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>{pkg.price}</span>
                      </div>
                    ))}
                    <button
                      onClick={(e) => { e.stopPropagation(); if (requireAuth()) { setOrderForm({ service: s, pkg: s.packages[0] }); setFormStep('form'); setFormData(prev => ({ ...prev, theme: s.title.includes('Thumbnail') ? prev.theme : '' })) } }}
                      className="btn-primary w-full mt-2"
                    >
                      Order Now
                    </button>
                  </div>
                ) : (
                  <div className="mt-auto border-t border-[#e0e0e0] pt-4">
                    <div className="text-[17px] font-[600] text-[#1d1d1f] mb-3">{s.price}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedService(s) }}
                      className="btn-secondary-pill w-full"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — Parchment Tile */}
      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-[980px] px-4 md:px-6 py-20">
          <h2 className="text-[40px] font-[600] leading-[1.1] text-[#1d1d1f] text-center mb-12">
            Built for Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-[17px] font-[600] text-[#1d1d1f] mb-2">{item.title}</h3>
                <p className="text-[14px] font-[400] text-[#7a7a7a] leading-[1.47]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Dark Tile */}
      <section className="bg-[#272729]">
        <div className="mx-auto max-w-[980px] px-4 md:px-6 py-20 text-center">
          <h2 className="text-[40px] font-[600] leading-[1.1] text-white mb-4">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-[17px] font-[400] leading-[1.47] text-[rgba(255,255,255,0.7)] max-w-[600px] mx-auto mb-8">
            Join 2,000+ creators and brands who trust Kintox for their visual and technical needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:nakshtr.144@gmail.com?subject=Consultation" className="btn-primary">
              Book a Consultation
            </a>
            <Link to="/portfolio" className="btn-secondary-pill">
              View Work
            </Link>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedService(null)}
          >
            <div className="absolute inset-0 bg-black/60" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-[18px]"
            >
              <div className="h-40 md:h-72 overflow-hidden relative">
                <img src={selectedService.image} alt={selectedService.title} loading="lazy" className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg aria-hidden="true" className="w-[18px] h-[18px] text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                </button>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] text-[#7a7a7a] bg-[#f5f5f7] px-2 py-0.5 rounded-full">{selectedService.stats}</span>
                  <span className="text-[11px] text-[#7a7a7a]">{selectedService.tools}</span>
                </div>

                <h2 className="text-[40px] font-[600] leading-[1.1] text-[#1D1D1F] mt-4 mb-3">{selectedService.title}</h2>
                <p className="text-[17px] font-[400] leading-[1.47] text-[#7a7a7a] mb-8">{selectedService.desc}</p>

                {selectedService.packages ? (
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedService.packages.map((pkg) => (
                        <div
                          key={pkg.tier}
                          className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 flex flex-col"
                        >
                          {pkg.popular && (
                            <span className="text-[11px] font-[600] text-[#0066cc] mb-2">Popular</span>
                          )}
                          <p className="text-[17px] font-[600] text-[#1d1d1f] mb-1">{pkg.tier}</p>
                          <p className={`text-[40px] font-[600] mb-4 ${pkg.popular ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>{pkg.price}</p>
                          <ul className="space-y-1.5 mb-4 flex-1">
                            {pkg.features.map((f, i) => (
                              <li key={i} className="text-[14px] font-[400] text-[#7a7a7a] flex items-start gap-2">
                                <span className="text-[#7a7a7a] shrink-0 mt-[1px]">·</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                          <p className="text-[12px] text-[#7a7a7a] border-t border-[#e0e0e0] pt-3 mt-auto mb-4">
                            Best For: {pkg.recommend}
                          </p>
                          <button
                            onClick={(e) => { e.stopPropagation(); if (requireAuth()) { setOrderForm({ service: selectedService, pkg }); setFormStep('form'); setFormData(prev => ({ ...prev, theme: selectedService.title.includes('Thumbnail') ? prev.theme : '' })) } }}
                            className="btn-primary w-full"
                          >
                            Order Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#f5f5f7] rounded-[18px] p-6 mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-[12px] text-[#7a7a7a] uppercase tracking-wider mb-1">Starting Price</p>
                      <p className="text-[24px] font-[600] text-[#1d1d1f]">{selectedService.price}</p>
                    </div>
                    <a
                      href="mailto:nakshtr.144@gmail.com"
                      onClick={() => setSelectedService(null)}
                      className="btn-primary"
                    >
                      Book Now
                    </a>
                  </div>
                )}

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full py-3 text-[14px] font-[400] text-[#7a7a7a] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Form Modal */}
      <AnimatePresence>
        {orderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
            onClick={resetForm}
          >
            <div className="absolute inset-0 bg-black/60" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto bg-white rounded-[18px] p-8 md:p-10"
            >
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#f5f5f7] rounded-full flex items-center justify-center cursor-pointer"
              >
                <svg aria-hidden="true" className="w-[18px] h-[18px] text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
              </button>

              {formStep === 'form' && (() => {
                const title = orderForm.service.title.toLowerCase()
                const isThumbnail = title.includes('thumbnail')
                const isPoster = title.includes('poster')
                const isWebsite = title.includes('website')

                if (isWebsite) {
                  const websiteTypes = ['Portfolio', 'Business', 'E-Commerce', 'Blog', 'Landing Page', 'Agency', 'Other']
                  return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-[24px] font-[600] text-[#1d1d1f]">{orderForm.pkg.tier} — {orderForm.pkg.price}</h3>
                      <p className="text-[14px] text-[#7a7a7a]">{orderForm.service.title}</p>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="order-name" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Your Name *</label>
                          <input id="order-name" type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: undefined }) }} placeholder="Your full name" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.name ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                          {formErrors.name && <p className="text-red-500 text-[12px] mt-1">{formErrors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="order-email" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Email Address *</label>
                          <input id="order-email" type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: undefined }) }} placeholder="you@example.com" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.email ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                          {formErrors.email && <p className="text-red-500 text-[12px] mt-1">{formErrors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="order-mobile" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Mobile Number *</label>
                        <input id="order-mobile" type="tel" value={formData.mobile} onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }); setFormErrors({ ...formErrors, mobile: undefined }) }} placeholder="+91 98765 43210" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.mobile ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                        {formErrors.mobile && <p className="text-red-500 text-[12px] mt-1">{formErrors.mobile}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-website-type" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Website Type *</label>
                        <select id="order-website-type" value={formData.websiteType} onChange={(e) => { setFormData({ ...formData, websiteType: e.target.value }); setFormErrors({ ...formErrors, websiteType: undefined }) }} className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none ${formErrors.websiteType ? 'border-red-400' : 'focus:border-[#0066cc]'}`}>
                          <option value="">Select type</option>
                          {websiteTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                        {formErrors.websiteType && <p className="text-red-500 text-[12px] mt-1">{formErrors.websiteType}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-website-name" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Website Name *</label>
                        <input id="order-website-name" type="text" value={formData.websiteName} onChange={(e) => { setFormData({ ...formData, websiteName: e.target.value }); setFormErrors({ ...formErrors, websiteName: undefined }) }} placeholder="e.g. MyBusiness.com" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.websiteName ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                        {formErrors.websiteName && <p className="text-red-500 text-[12px] mt-1">{formErrors.websiteName}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-pages" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Required Pages</label>
                        <input id="order-pages" type="text" value={formData.requiredPages} onChange={(e) => setFormData({ ...formData, requiredPages: e.target.value })} placeholder="e.g. Home, About, Services, Contact" className="w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] focus:border-[#0066cc]" />
                      </div>
                      <div>
                        <label htmlFor="order-reference" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Reference Website Link (Optional)</label>
                        <input id="order-reference" type="url" value={formData.referenceLink} onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })} placeholder="https://example.com" className="w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] focus:border-[#0066cc]" />
                      </div>
                      <div>
                        <label htmlFor="order-requirements" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Additional Requirements (Optional)</label>
                        <textarea id="order-requirements" rows={3} value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} placeholder="Any specific features, integrations, or design preferences..." className="w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] focus:border-[#0066cc] resize-none" />
                      </div>
                      <button type="submit" className="btn-primary w-full">Submit Order</button>
                    </form>
                  </>
                  )
                }

                const topicLabel = isThumbnail ? 'Thumbnail Topic / Video Title *' : 'Campaign Name / Poster Topic *'
                const themeLabel = isThumbnail ? 'Thumbnail Theme *' : 'Poster Theme / Style *'
                const topicPlaceholder = isThumbnail ? 'e.g. How to Make Money Online' : 'e.g. Summer Sale 2026 — 50% Off'
                const instructionsPlaceholder = isThumbnail
                  ? 'Any specific text, colors, or references you want in your thumbnail...'
                  : 'Any specific text, brand colors, taglines, or references for your poster/ad...'
                return (
                <>
                  <div className="mb-6">
                    <h3 className="text-[24px] font-[600] text-[#1d1d1f]">{orderForm.pkg.tier} — {orderForm.pkg.price}</h3>
                    <p className="text-[14px] text-[#7a7a7a]">{orderForm.service.title}</p>
                  </div>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="order-topic" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">{topicLabel}</label>
                      <input id="order-topic" type="text" value={formData.topic} onChange={(e) => { setFormData({ ...formData, topic: e.target.value }); setFormErrors({ ...formErrors, topic: undefined }) }} placeholder={topicPlaceholder} className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.topic ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                      {formErrors.topic && <p className="text-red-500 text-[12px] mt-1">{formErrors.topic}</p>}
                    </div>
                    <div>
                      <label htmlFor="order-theme" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">{themeLabel}</label>
                      <select id="order-theme" value={formData.theme} onChange={(e) => { setFormData({ ...formData, theme: e.target.value }); setFormErrors({ ...formErrors, theme: undefined }) }} className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none ${formErrors.theme ? 'border-red-400' : 'focus:border-[#0066cc]'}`}>
                        <option value="">Select a theme</option>
                        {themes.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                      {formErrors.theme && <p className="text-red-500 text-[12px] mt-1">{formErrors.theme}</p>}
                    </div>
                    <div>
                      <label htmlFor="order-your-name" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Your Name *</label>
                      <input id="order-your-name" type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: undefined }) }} placeholder="Your full name" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.name ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                      {formErrors.name && <p className="text-red-500 text-[12px] mt-1">{formErrors.name}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="order-mobile-2" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Mobile Number *</label>
                        <input id="order-mobile-2" type="tel" value={formData.mobile} onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }); setFormErrors({ ...formErrors, mobile: undefined }) }} placeholder="+91 98765 43210" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.mobile ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                        {formErrors.mobile && <p className="text-red-500 text-[12px] mt-1">{formErrors.mobile}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-email-2" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Email Address *</label>
                        <input id="order-email-2" type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: undefined }) }} placeholder="you@example.com" className={`w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] ${formErrors.email ? 'border-red-400' : 'focus:border-[#0066cc]'}`} />
                        {formErrors.email && <p className="text-red-500 text-[12px] mt-1">{formErrors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="order-instructions" className="text-[12px] font-[500] text-[#7a7a7a] block mb-1.5">Additional Instructions (Optional)</label>
                      <textarea id="order-instructions" rows={3} value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} placeholder={instructionsPlaceholder} className="w-full bg-white border border-[#e0e0e0] rounded-[11px] px-4 py-3 text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] focus:border-[#0066cc] resize-none" />
                    </div>
                    <button type="submit" className="btn-primary w-full">Submit Order</button>
                  </form>
                </>
                )
              })()}

              {formStep === 'confirm' && (() => {
                const title = orderForm.service.title.toLowerCase()
                const isThumbnail = title.includes('thumbnail')
                const isPoster = title.includes('poster')
                const isWebsite = title.includes('website')
                const topicSummaryLabel = isThumbnail ? 'Topic' : (isPoster ? 'Campaign' : 'Website Name')
                return (
                <div className="text-center">
                  <div className="w-14 h-14 bg-[#f5f5f7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg aria-hidden="true" className="w-7 h-7 text-[#0066cc]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  </div>
                  <h3 className="text-[24px] font-[600] text-[#1d1d1f] mb-4">Order Summary</h3>
                  <div className="bg-[#f5f5f7] rounded-[18px] p-5 text-left mb-6 space-y-2">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#7a7a7a]">Package</span>
                      <span className="font-[600] text-[#1d1d1f]">{orderForm.pkg.tier}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#7a7a7a]">Price</span>
                      <span className="font-[600] text-[#0066cc]">{orderForm.pkg.price}</span>
                    </div>
                    {isWebsite ? (
                      <>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Name</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Email</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.email}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Mobile</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.mobile}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Website Type</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.websiteType}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Website Name</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.websiteName}</span>
                        </div>
                        {formData.requiredPages && (
                          <div className="flex justify-between text-[14px]">
                            <span className="text-[#7a7a7a]">Pages</span>
                            <span className="font-[600] text-[#1d1d1f] text-right max-w-[200px]">{formData.requiredPages}</span>
                          </div>
                        )}
                        {formData.referenceLink && (
                          <div className="flex justify-between text-[14px]">
                            <span className="text-[#7a7a7a]">Reference</span>
                            <span className="font-[600] text-[#1d1d1f] text-right max-w-[200px] truncate">{formData.referenceLink}</span>
                          </div>
                        )}
                        {formData.instructions && (
                          <div className="flex justify-between text-[14px]">
                            <span className="text-[#7a7a7a]">Requirements</span>
                            <span className="font-[600] text-[#1d1d1f] text-right max-w-[200px]">{formData.instructions}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">{topicSummaryLabel}</span>
                          <span className="font-[600] text-[#1d1d1f] text-right max-w-[200px]">{formData.topic}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Theme</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.theme}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Name</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Mobile</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.mobile}</span>
                        </div>
                        <div className="flex justify-between text-[14px]">
                          <span className="text-[#7a7a7a]">Email</span>
                          <span className="font-[600] text-[#1d1d1f]">{formData.email}</span>
                        </div>
                        {formData.instructions && (
                          <div className="flex justify-between text-[14px]">
                            <span className="text-[#7a7a7a]">Instructions</span>
                            <span className="font-[600] text-[#1d1d1f] text-right max-w-[200px]">{formData.instructions}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    className="btn-primary w-full"
                    onClick={() => setFormStep('submitted')}
                  >
                    Buy Package — {orderForm.pkg.price}
                  </button>
                  <button
                    onClick={() => setFormStep('form')}
                    className="w-full py-3 mt-2 text-[14px] font-[400] text-[#7a7a7a] cursor-pointer"
                  >
                    Edit Order
                  </button>
                </div>
                )
              })()}

              {formStep === 'submitted' && (
                <div className="text-center">
                  <div className="w-14 h-14 bg-[#f5f5f7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg aria-hidden="true" className="w-7 h-7 text-[#0066cc]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  </div>
                  <h3 className="text-[24px] font-[600] text-[#1d1d1f] mb-2">Order Placed!</h3>
                  <p className="text-[14px] text-[#7a7a7a] mb-6">Thank you! We've received your order. Our team will reach out within 24 hours.</p>
                  <button onClick={resetForm} className="btn-primary w-full">Close</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
