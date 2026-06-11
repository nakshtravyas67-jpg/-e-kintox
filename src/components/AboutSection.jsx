import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from './SEO'

const stats = [
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 48, suffix: '', label: 'Hour Delivery' },
]

const team = [
  { name: 'Nakshtra Vyas', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Akshit Panwar', role: 'CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Kuldeep Vyas', role: 'Marketing Analyst', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Priya Sharma', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { name: 'Rohit Verma', role: 'Brand Strategist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Neha Kapoor', role: 'UI/UX Designer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
]

const testimonials = [
  { quote: 'Kintox completely transformed our brand identity. Our engagement increased by 200% within three months.', author: 'Vikram Patel', role: 'CEO, TechVista' },
  { quote: 'The attention to detail and creative vision is unmatched. Truly a world-class design agency.', author: 'Ananya Reddy', role: 'CMO, GreenLeaf Corp' },
  { quote: 'Working with Kintox was seamless. They delivered beyond expectations and on time every single sprint.', author: 'Rajesh Khanna', role: 'Founder, DesignCraft' },
  { quote: 'Our conversion rate jumped 150% after the redesign. The data-driven approach really works.', author: 'Sneha Iyer', role: 'Growth Head, FitLife' },
]

const process = [
  { step: '01', title: 'Discovery', desc: 'We dive deep into your brand, market, and goals to uncover opportunities.' },
  { step: '02', title: 'Strategy', desc: 'Data-driven creative direction mapped to measurable business outcomes.' },
  { step: '03', title: 'Execution', desc: 'Pixel-perfect design delivery with relentless iteration until it shines.' },
  { step: '04', title: 'Launch & Scale', desc: 'Deploy, monitor, and optimize for long-term growth and brand impact.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = Math.ceil(target / (duration / 16))
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(start)
        }, 16)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function CountUp({ value, suffix, label }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="p-4 md:p-6 bg-[#F5F5F7] rounded-xl hover:bg-[#EEE] hover:scale-[1.02] transition-all duration-300">
      <h3 className="text-[#0071E3] text-3xl md:text-4xl font-bold mb-1">{count}{suffix}</h3>
      <p className="text-[#6E6E73] text-xs font-semibold uppercase tracking-wider">{label}</p>
    </div>
  )
}

const socials = [
  { icon: 'linkedin', label: 'LinkedIn', path: 'M20.45 20.45H16.9v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.41H9.55V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.1 20.45H3.58V9h3.52v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z' },
  { icon: 'dribbble', label: 'Dribbble', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.6 5.5c.62 1.07.97 2.3 1 3.6-.15-.02-.5-.05-1.13-.05-2.33 0-4.4.5-6.14 1.37l-.13.06c-.02-.04-.03-.08-.05-.12-1.48-3.51-3.29-6.3-3.91-7.5l.06-.03c2.16-.86 4.5-1.09 6.6-.83 1.9.25 3.7.94 5.2 1.92l.5.58zm-7.98.7c.6 1.17 2.38 3.94 3.87 5.46-2.5 1.32-5.36 2.02-8.38 2.02-.47 0-.94-.02-1.4-.06.7-2.7 2.9-4.97 5.9-6.43.01.01 0 .01.01 0zm-6.7 8.08c.3-.05.62-.08.95-.08 3.55 0 6.86-1.12 9.55-3.02l.14-.1c1.07 2.34 1.86 4.88 2.1 6.28-2.68 1.56-5.8 2.37-9.06 2-1.58-.18-3.16-.66-4.53-1.36.29-.88.53-1.8.7-2.75l.15.03zm12.86 3.07c-.34-1.72-1.23-4.42-2.4-6.84 1.4-.43 2.7-.59 3.72-.59.43 0 .72.03.8.04-.06 2.72-1.06 5.2-2.12 7.39z' },
  { icon: 'twitter', label: 'Twitter', path: 'M18.24 2.25h3.3l-7.2 8.26 8.48 11.24h-6.64l-5.2-6.82-5.95 6.82H1.73l7.72-8.84L1.3 2.25h6.8l4.7 6.22 5.44-6.22zm-1.16 17.5h1.83L7.08 4.13H5.1l11.98 15.62z' },
]

export default function AboutSection() {
  const parallaxContainer = useRef(null)
  const parallaxEl = useRef(null)

  useEffect(() => {
    const container = parallaxContainer.current
    const el = parallaxEl.current
    if (!container || !el) return
    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rx = (y - rect.height / 2) / 20
      const ry = (rect.width / 2 - x) / 20
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => { el.style.transform = '' }
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <SEO title="About — Brand Identity & Design Agency" description="KINTOX is a premium design agency building brands that stand out with high-converting visuals and strategic creative direction." path="/about" />
      <section id="about" data-nav-theme="dark" className="relative w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-16 md:pb-24">
        <div className="mb-6 md:mb-8 pt-4 md:pt-6">
          <Link to="/" className="text-[11px] text-gray-400 hover:text-primary uppercase tracking-[0.15em] transition-colors">Home</Link>
          <span className="text-[11px] text-gray-300 mx-2">/</span>
          <span className="text-[11px] text-primary font-semibold uppercase tracking-[0.15em]">About</span>
          <p className="text-xs text-gray-400 mt-2 tracking-wide">The team and vision behind KINTOX.</p>
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
                ABOUT US
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-headline-lg text-headline-lg text-white leading-[1.08] mb-5"
              >
                We Build Brands That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#40B4FF]">Stand Out</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-8"
              >
                Kintox is a premium design agency specializing in high-converting visuals, brand identity, and digital experiences that drive real results.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-6 md:gap-10"
              >
                {[
                  { value: '200+', label: 'Projects Completed' },
                  { value: '30+', label: 'Happy Clients' },
                  { value: '95%', label: 'Client Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-bold text-xl md:text-2xl text-white">{stat.value}</p>
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
                {[
                  { img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80', title: 'Brand Identity', desc: 'Strategic visual storytelling' },
                  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', title: 'Web Design', desc: 'High-converting digital experiences' },
                  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', title: 'UI/UX Design', desc: 'User-centric interface solutions' },
                  { img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80', title: 'Social Media', desc: 'Engaging visual content' },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all group"
                  >
                    <div className="h-24 md:h-28 overflow-hidden">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-4 md:p-5">
                      <p className="text-white/80 text-xs md:text-sm font-semibold leading-tight">{card.title}</p>
                      <p className="text-white/30 text-[10px] mt-1">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-white py-16 md:py-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-12">

        {/* Card 1: About Intro */}
        <div className="bg-white rounded-2xl overflow-hidden p-6 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
              WHY KINTOX
            </span>
            <h2 className="text-[#1D1D1F] text-3xl md:text-4xl font-bold mb-6 leading-[1.1]">
              Design That Gets <span className="text-[#0071E3]">Attention</span>. Results That Matter.
            </h2>
            <p className="text-[#6E6E73] text-lg max-w-xl leading-relaxed mb-10">
              We transform brands into market leaders through high-converting
              visuals and strategic creative direction. Our approach balances
              aesthetic excellence with psychological triggers to drive real
              business growth.
            </p>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeUp} custom={i}>
                  <CountUp value={stat.value} suffix={stat.suffix} label={stat.label} />
                </motion.div>
              ))}
            </motion.div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all duration-300">
              Explore Portfolio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="relative group h-[250px] md:h-[500px] flex items-center justify-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div ref={parallaxContainer} className="relative z-10 w-full h-full max-w-[450px]">
              <div ref={parallaxEl} className="relative w-full h-full rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <img alt="Kintox Portfolio Showcase" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjjhK_jgAOOSChNXjUTt9dUbhEFPeql1x44FpQTzYlQOooGZDmiSR1lOS4Ju5uck5Dq5ZNeYn0-kBFS-Xc4H2yu8xjPmCZ08mca_Q9OJWJbuyskzC1FTJOwPSn997h-VNVdO8nya4ae91b0K--0R0ot11na-ry7ou2YgW07tP4WoSm2ul7Xve11OnM6p2N1TFWZHqf87cIYT4A5pzssTaUPUGPdy_NlfBQ_GNNo_MHK3xWVHfComnhIjFUPkZSu8JhMUY3Y-JxJTQ" />
                <div className="absolute inset-0 bg-on-primary-fixed/0 group-hover:bg-on-primary-fixed/10 transition-all duration-500 pointer-events-none" />
              </div>
              <div className="absolute -top-4 -right-4 w-28 h-28 md:w-40 md:h-40 bg-surface-container-lowest rounded-xl p-2 rotate-6 group-hover:rotate-12 group-hover:-translate-y-3 transition-all duration-700 hidden md:block">
                <div className="w-full h-full rounded-lg bg-surface-container-high overflow-hidden">
                  <div className="w-full h-2/3 bg-primary/10" />
                  <div className="p-2 space-y-1">
                    <div className="h-1 w-2/3 bg-outline-variant rounded" />
                    <div className="h-1 w-full bg-outline-variant rounded" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-surface-container-lowest rounded-xl p-2 -rotate-12 group-hover:-rotate-6 group-hover:translate-y-3 transition-all duration-700 hidden md:block">
                <div className="w-full h-full rounded-lg bg-surface-container-high overflow-hidden">
                  <div className="w-full h-1/2 bg-secondary/10" />
                  <div className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <div className="h-1 w-1/2 bg-outline-variant rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Team */}
        <div className="bg-white rounded-2xl overflow-hidden p-6 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
              OUR TEAM
            </span>
            <h2 className="text-[#1D1D1F] text-3xl md:text-4xl font-bold mt-4">
              Meet the <span className="text-[#0071E3]">Team</span>
            </h2>
            <p className="text-[#6E6E73] text-lg max-w-2xl mx-auto mt-4">
              A passionate team of designers, strategists, and visionaries dedicated to crafting impactful brand experiences.
            </p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp} className="bg-[#F5F5F7] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-[#0071E3]/5 transition-all duration-300">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-[#1D1D1F] font-semibold text-base mb-1">{member.name}</h3>
                  <p className="text-[#0071E3] text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <div className="flex items-center justify-center gap-3">
                    {socials.map((s) => (
                      <a key={s.icon} href="#" className="text-[#6E6E73]/40 hover:text-[#0071E3] transition-colors duration-200" aria-label={s.label}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-8"
          >
            <Link to="/team" className="inline-flex items-center gap-2 text-[#0071E3] text-sm font-medium hover:gap-3 transition-all">
              Meet everyone <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        {/* Card 3: Testimonials + Process */}
        <div className="bg-white rounded-2xl overflow-hidden p-6 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
              TESTIMONIALS
            </span>
            <h2 className="text-[#1D1D1F] text-2xl md:text-3xl font-bold mb-8">
              What Our <span className="text-[#0071E3]">Clients</span> Say
            </h2>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="space-y-6">
              {testimonials.map((t) => (
                <motion.div key={t.author} variants={fadeUp} className="bg-[#F5F5F7] rounded-xl p-6 border-l-4 border-[#0071E3] hover:shadow-lg transition-all duration-300">
                  <p className="text-[#6E6E73] text-base mb-4 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-[#1D1D1F] text-sm font-semibold">{t.author}</p>
                    <p className="text-[#6E6E73] text-xs">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
              OUR PROCESS
            </span>
            <h2 className="text-[#1D1D1F] text-2xl md:text-3xl font-bold mb-8">
              How We <span className="text-[#0071E3]">Work</span>
            </h2>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="space-y-8">
              {process.map((p, i) => (
                <motion.div key={p.step} variants={fadeUp} custom={i} className="flex gap-6 group">
                  <span className="text-[#0071E3]/30 text-4xl md:text-5xl font-bold shrink-0 group-hover:text-[#0071E3] transition-colors duration-300">{p.step}</span>
                  <div>
                    <h3 className="text-[#1D1D1F] text-lg font-semibold mb-2">{p.title}</h3>
                    <p className="text-[#6E6E73] text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="bg-[#1D1D1F] text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#0071E3]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#0071E3]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">Let's create something extraordinary together. Book a free consultation today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:nakshtr.144@gmail.com" className="px-8 py-4 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all inline-flex items-center gap-2">
                Start a Project <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link to="/portfolio" className="px-8 py-4 border-2 border-white/20 text-white/80 font-semibold text-sm rounded-xl hover:bg-white hover:text-[#1D1D1F] transition-all inline-flex items-center gap-2">
                View Our Work <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l3-3m-3 3l3 3" /></svg>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
      </div>
      </div>
    </section>
    </>
  )
}
