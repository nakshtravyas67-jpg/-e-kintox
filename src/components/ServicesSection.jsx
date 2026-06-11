import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

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
  const [cardTilts, setCardTilts] = useState({})
  const cardRefs = useRef({})
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const requireAuth = (action) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/services' } })
      return false
    }
    return true
  }

  const handleCardMouseMove = (title, e) => {
    const el = cardRefs.current[title]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setCardTilts(prev => ({ ...prev, [title]: { x: x * 10, y: y * -10 } }))
  }
  const handleCardMouseLeave = (title) => {
    setCardTilts(prev => ({ ...prev, [title]: { x: 0, y: 0 } }))
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
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-16 md:pb-24">
      <div className="mb-6 md:mb-8 pt-4 md:pt-6">
        <Link to="/" className="text-[11px] text-gray-400 hover:text-primary uppercase tracking-[0.15em] transition-colors">Home</Link>
        <span className="text-[11px] text-gray-300 mx-2">/</span>
        <span className="text-[11px] text-primary font-semibold uppercase tracking-[0.15em]">Services</span>
        <p className="text-xs text-gray-400 mt-2 tracking-wide">Premium design &amp; development tailored for creators and brands.</p>
      </div>
      <div className="relative overflow-hidden rounded-[32px] bg-[#1D1D1F] min-h-[380px] md:min-h-[460px] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0071E3]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#0071E3]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center px-6 md:px-16 py-12 md:py-20">
          <div className="lg:col-span-3">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#0071E3] uppercase tracking-[0.15em] bg-[#0071E3]/10 px-4 py-1.5 rounded-full mb-5"
            >
              <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full animate-pulse" />
              OUR CAPABILITIES
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline-lg text-headline-lg text-white leading-[1.08] mb-5"
            >
              Creative Design, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#40B4FF]">Web Development</span> &amp; Digital Solutions.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-8"
            >
              From viral visuals to robust infrastructure — we empower creators and brands with world-class design and technical execution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-6 md:gap-10"
            >
              {[
                { number: 2000, suffix: '+', label: 'Projects Delivered' },
                { number: 150, suffix: '+', label: 'Happy Clients' },
                { number: 49, suffix: '★', label: 'Avg. Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-bold text-xl md:text-2xl text-white">
                    <CountUp target={stat.number} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 md:p-5 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[#0071E3]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#0071E3]/20 transition-colors">
                    <svg className="w-5 h-5 text-[#0071E3]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg>
                  </div>
                  <p className="text-white/80 text-xs md:text-sm font-semibold leading-tight">{s.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="text-center mb-12 md:mb-16 mt-12 md:mt-16">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-[#0071E3]/10 text-[#0071E3] text-[10px] font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-5"
        >
          <span className="w-1.5 h-1.5 bg-[#0071E3] rounded-full" />
          What We Offer
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="font-headline-lg text-headline-lg text-on-surface mb-4"
        >
          Every Creative Service <span className="text-primary">Under One Roof</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary text-body-md max-w-xl mx-auto"
        >
          From thumbnails that stop the scroll to full-scale web platforms — we handle every layer of your digital presence with precision and artistry.
        </motion.p>
      </div>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((s, idx) => {
          const tilt = cardTilts[s.title] || { x: 0, y: 0 }
          const setRef = (el) => { if (el) cardRefs.current[s.title] = el }
          return <motion.div
            key={s.title}
            variants={fadeUp}
            ref={setRef}
            onMouseMove={(e) => handleCardMouseMove(s.title, e)}
            onMouseLeave={() => handleCardMouseLeave(s.title)}
            onClick={() => setSelectedService(s)}
            style={{ transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
            className="bg-surface-container-lowest rounded-[24px] group hover:shadow-[0_24px_48px_-12px_rgba(11,81,211,0.2),0_8px_16px_-8px_rgba(11,81,211,0.06)] transition-all duration-[400ms] cursor-pointer will-change-transform h-full"
          >
            <div className="h-40 overflow-hidden relative">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8px] font-semibold text-[#1D1D1F] px-2 py-1 rounded-md shadow-sm">
                {s.icon === 'smart_display' ? 'Thumbnail' : s.icon === 'share' ? 'Social' : s.icon === 'auto_awesome_motion' ? 'Ad' : s.icon === 'code' ? 'Website' : s.icon === 'app_shortcut' ? 'App' : 'Brand'}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-container/10 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg>
                </div>
                <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">{s.stats}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{s.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">{s.desc}</p>
              {s.packages && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.packages.map((pkg) => (
                    <span key={pkg.tier} className={`text-[9px] font-semibold px-2 py-1 rounded-full border ${pkg.popular ? 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20 ring-1 ring-[#0071E3]/30' : 'bg-[#F5F5F7] text-[#6E6E73] border-[#E8E8ED]'}`}>
                      {pkg.badge} {pkg.price}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#6E6E73]" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6v2H8v2h8v-2h-2v-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z" /></svg>
                  <span className="text-[10px] text-secondary">{s.tools}</span>
                </div>
                {s.packages ? (
                  <span className="text-xs font-semibold text-primary">From {s.packages[0].price}</span>
                ) : (
                  <span className="text-xs font-semibold text-primary">{s.price}</span>
                )}
              </div>
              {!s.packages && (
                <div className="mt-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedService(s) }}
                    className="w-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        })}
      </motion.div>

      {/* Why Choose Us */}
      <div className="bg-[#F5F5F7] rounded-[32px] p-8 md:p-16 mt-16 md:mt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="text-center mb-10">
            <span className="font-title-uppercase text-title-uppercase text-primary block mb-4">WHY CHOOSE US</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Built for <span className="text-primary">Results</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {whyUs.map((item, i) => (
              <div key={item.title} className="relative text-center p-6 md:p-8 rounded-2xl bg-surface-container-lowest hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg>
                </div>
                <div className="absolute top-3 right-3 text-[40px] md:text-[56px] font-black text-[#0071E3]/[0.06] select-none pointer-events-none leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface mb-3">{item.title}</h3>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-16 md:mt-20 bg-on-surface text-on-primary-container rounded-[32px] p-10 md:p-20 relative overflow-hidden text-center">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg mb-6">Ready to Elevate Your Digital Presence?</h2>
          <p className="text-surface-variant text-lg mb-8 max-w-lg mx-auto">Join 2,000+ creators and brands who trust Kintox for their visual and technical needs.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:nakshtr.144@gmail.com?subject=Consultation" className="bg-primary text-on-primary px-10 py-4 rounded-2xl font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/20">
              BOOK A CONSULTATION <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
            </a>
            <Link to="/portfolio" className="border-2 border-surface-variant text-surface-variant px-10 py-4 rounded-2xl font-button-text text-button-text uppercase tracking-widest hover:bg-surface-variant hover:text-on-surface transition-all inline-flex items-center gap-2">
              VIEW WORK <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedService(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl"
            >
              <div className="h-56 md:h-72 overflow-hidden relative">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg className="w-[18px] h-[18px] text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                </button>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#0071E3]/10 flex items-center justify-center rounded-xl">
                    <svg className="w-5 h-5 text-[#0071E3]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg>
                  </div>
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">{selectedService.stats}</span>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-[#1D1D1F] mt-4 mb-3">{selectedService.title}</h2>
                <p className="text-[#6E6E73] text-base leading-relaxed mb-6">{selectedService.desc}</p>

                {selectedService.packages ? (
                  <div className="mb-8">
                    <p className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider mb-4">Packages</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedService.packages.map((pkg) => (
                        <div
                          key={pkg.tier}
                          className={`relative rounded-2xl p-5 border-2 transition-all ${
                            pkg.popular
                              ? 'border-[#0071E3] bg-[#0071E3]/5'
                              : 'border-[#E8E8ED] bg-[#F5F5F7]'
                          }`}
                        >
                          {pkg.popular && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0071E3] text-white text-[8px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                          <div className="text-center mb-3">
                            <span className="text-xl">{pkg.badge}</span>
                            <p className="font-bold text-lg text-[#1D1D1F] mt-1">{pkg.tier}</p>
                            <p className="font-bold text-2xl text-[#0071E3] mt-1">{pkg.price}</p>
                          </div>
                          <ul className="space-y-1.5 mb-3">
                            {pkg.features.map((f, i) => (
                              <li key={i} className="text-[11px] text-[#6E6E73] flex items-start gap-1.5">
                                <svg className="w-[14px] h-[14px] text-green-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                {f}
                              </li>
                            ))}
                          </ul>
                          <p className="text-[9px] text-[#6E6E73] text-center italic border-t border-[#E8E8ED] pt-2 mt-2">
                            Best For: {pkg.recommend}
                          </p>
                          <button
                            onClick={(e) => { e.stopPropagation(); if (requireAuth()) { setOrderForm({ service: selectedService, pkg }); setFormStep('form'); setFormData(prev => ({ ...prev, theme: selectedService.title.includes('Thumbnail') ? prev.theme : '' })) } }}
                            className="mt-3 w-full bg-[#0071E3] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#0077ED] transition-all cursor-pointer"
                          >
                            Order Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F5F5F7] rounded-2xl p-5">
                      <svg className="w-6 h-6 text-[#0071E3] block mb-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" /></svg>
                      <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider mb-1">Tools</p>
                      <p className="text-sm font-semibold text-[#1D1D1F]">{selectedService.tools}</p>
                    </div>
                    <div className="bg-[#F5F5F7] rounded-2xl p-5">
                      <svg className="w-6 h-6 text-[#0071E3] block mb-2" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" /></svg>
                      <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider mb-1">Starting Price</p>
                      <p className="text-sm font-semibold text-[#1D1D1F]">{selectedService.price}</p>
                    </div>
                  </div>
                )}

                <div className="bg-[#F5F5F7] rounded-2xl p-5 mb-6">
                  <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider mb-2">Tools</p>
                  <p className="text-sm font-semibold text-[#1D1D1F] mb-4">{selectedService.tools}</p>
                  <a
                    href="mailto:nakshtr.144@gmail.com"
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center gap-2 bg-[#0071E3] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#0077ED] transition-all"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                    Book Now
                  </a>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full py-3 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
            onClick={resetForm}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl p-8 md:p-10"
            >
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#F5F5F7] hover:bg-[#E8E8ED] rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-[18px] h-[18px] text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
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
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{orderForm.pkg.badge}</span>
                      <div>
                        <h3 className="font-bold text-lg text-[#1D1D1F]">{orderForm.pkg.tier} — {orderForm.pkg.price}</h3>
                        <p className="text-xs text-[#6E6E73]">{orderForm.service.title}</p>
                      </div>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="order-name" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Full Name *</label>
                          <input id="order-name" type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: undefined }) }} placeholder="Your full name" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.name ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                          {formErrors.name && <p className="text-red-500 text-[10px] mt-1">{formErrors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="order-email" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Email Address *</label>
                          <input id="order-email" type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: undefined }) }} placeholder="you@example.com" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.email ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                          {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="order-mobile" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Mobile Number *</label>
                        <input id="order-mobile" type="tel" value={formData.mobile} onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }); setFormErrors({ ...formErrors, mobile: undefined }) }} placeholder="+91 98765 43210" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.mobile ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                        {formErrors.mobile && <p className="text-red-500 text-[10px] mt-1">{formErrors.mobile}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-website-type" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Website Type *</label>
                        <select id="order-website-type" value={formData.websiteType} onChange={(e) => { setFormData({ ...formData, websiteType: e.target.value }); setFormErrors({ ...formErrors, websiteType: undefined }) }} className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all ${formErrors.websiteType ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`}>
                          <option value="">Select type</option>
                          {websiteTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                        {formErrors.websiteType && <p className="text-red-500 text-[10px] mt-1">{formErrors.websiteType}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-website-name" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Website Name *</label>
                        <input id="order-website-name" type="text" value={formData.websiteName} onChange={(e) => { setFormData({ ...formData, websiteName: e.target.value }); setFormErrors({ ...formErrors, websiteName: undefined }) }} placeholder="e.g. MyBusiness.com" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.websiteName ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                        {formErrors.websiteName && <p className="text-red-500 text-[10px] mt-1">{formErrors.websiteName}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-pages" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Required Pages</label>
                        <input id="order-pages" type="text" value={formData.requiredPages} onChange={(e) => setFormData({ ...formData, requiredPages: e.target.value })} placeholder="e.g. Home, About, Services, Contact" className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]" />
                      </div>
                      <div>
                        <label htmlFor="order-reference" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Reference Website Link (Optional)</label>
                        <input id="order-reference" type="url" value={formData.referenceLink} onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })} placeholder="https://example.com" className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]" />
                      </div>
                      <div>
                        <label htmlFor="order-requirements" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Additional Requirements (Optional)</label>
                        <textarea id="order-requirements" rows={3} value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} placeholder="Any specific features, integrations, or design preferences..." className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73] resize-none" />
                      </div>
                      <button type="submit" className="w-full bg-[#0071E3] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0077ED] transition-all cursor-pointer text-sm">Submit Order</button>
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
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{orderForm.pkg.badge}</span>
                    <div>
                      <h3 className="font-bold text-lg text-[#1D1D1F]">{orderForm.pkg.tier} — {orderForm.pkg.price}</h3>
                      <p className="text-xs text-[#6E6E73]">{orderForm.service.title}</p>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="order-topic" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">{topicLabel}</label>
                      <input id="order-topic" type="text" value={formData.topic} onChange={(e) => { setFormData({ ...formData, topic: e.target.value }); setFormErrors({ ...formErrors, topic: undefined }) }} placeholder={topicPlaceholder} className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.topic ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                      {formErrors.topic && <p className="text-red-500 text-[10px] mt-1">{formErrors.topic}</p>}
                    </div>
                    <div>
                      <label htmlFor="order-theme" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">{themeLabel}</label>
                      <select id="order-theme" value={formData.theme} onChange={(e) => { setFormData({ ...formData, theme: e.target.value }); setFormErrors({ ...formErrors, theme: undefined }) }} className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all ${formErrors.theme ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`}>
                        <option value="">Select a theme</option>
                        {themes.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                      {formErrors.theme && <p className="text-red-500 text-[10px] mt-1">{formErrors.theme}</p>}
                    </div>
                    <div>
                      <label htmlFor="order-your-name" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Your Name *</label>
                      <input id="order-your-name" type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: undefined }) }} placeholder="Your full name" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.name ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                      {formErrors.name && <p className="text-red-500 text-[10px] mt-1">{formErrors.name}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="order-mobile-2" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Mobile Number *</label>
                        <input id="order-mobile-2" type="tel" value={formData.mobile} onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }); setFormErrors({ ...formErrors, mobile: undefined }) }} placeholder="+91 98765 43210" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.mobile ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                        {formErrors.mobile && <p className="text-red-500 text-[10px] mt-1">{formErrors.mobile}</p>}
                      </div>
                      <div>
                        <label htmlFor="order-email-2" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Email Address *</label>
                        <input id="order-email-2" type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: undefined }) }} placeholder="you@example.com" className={`w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none transition-all placeholder:text-[#6E6E73] ${formErrors.email ? 'ring-2 ring-red-400' : 'focus:ring-2 focus:ring-[#0071E3]/20'}`} />
                        {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="order-instructions" className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1.5">Additional Instructions (Optional)</label>
                      <textarea id="order-instructions" rows={3} value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} placeholder={instructionsPlaceholder} className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73] resize-none" />
                    </div>
                    <button type="submit" className="w-full bg-[#0071E3] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0077ED] transition-all cursor-pointer text-sm">Submit Order</button>
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
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  </div>
                  <h3 className="font-bold text-xl text-[#1D1D1F] mb-2">Order Summary</h3>
                  <div className="bg-[#F5F5F7] rounded-2xl p-5 text-left mb-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6E6E73]">Package</span>
                      <span className="font-semibold text-[#1D1D1F]">{orderForm.pkg.badge} {orderForm.pkg.tier}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6E6E73]">Price</span>
                      <span className="font-bold text-[#0071E3]">{orderForm.pkg.price}</span>
                    </div>
                    {isWebsite ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Name</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Email</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Mobile</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.mobile}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Website Type</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.websiteType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Website Name</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.websiteName}</span>
                        </div>
                        {formData.requiredPages && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6E6E73]">Pages</span>
                            <span className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">{formData.requiredPages}</span>
                          </div>
                        )}
                        {formData.referenceLink && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6E6E73]">Reference</span>
                            <span className="font-semibold text-[#1D1D1F] text-right max-w-[200px] truncate">{formData.referenceLink}</span>
                          </div>
                        )}
                        {formData.instructions && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6E6E73]">Requirements</span>
                            <span className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">{formData.instructions}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">{topicSummaryLabel}</span>
                          <span className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">{formData.topic}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Theme</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.theme}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Name</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Mobile</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.mobile}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6E6E73]">Email</span>
                          <span className="font-semibold text-[#1D1D1F]">{formData.email}</span>
                        </div>
                        {formData.instructions && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6E6E73]">Instructions</span>
                            <span className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">{formData.instructions}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    className="w-full bg-[#0071E3] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0077ED] transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
                    onClick={() => setFormStep('submitted')}
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                    Buy Package — {orderForm.pkg.price}
                  </button>
                  <button
                    onClick={() => setFormStep('form')}
                    className="w-full py-3 mt-2 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
                  >
                    Edit Order
                  </button>
                </div>
                )
              })()}

              {formStep === 'submitted' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  </div>
                  <h3 className="font-bold text-xl text-[#1D1D1F] mb-2">Order Placed!</h3>
                  <p className="text-sm text-[#6E6E73] mb-6">Thank you! We've received your order. Our team will reach out within 24 hours.</p>
                  <button
                    onClick={resetForm}
                    className="w-full bg-[#0071E3] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0077ED] transition-all cursor-pointer text-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
