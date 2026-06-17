import { useRef, createContext, useContext } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from './SEO'

const MouseContext = createContext({ x: 0, y: 0 })

function FloatingShape({ size, offsetX, offsetY, color, radius, delay, index }) {
  const mouse = useContext(MouseContext)
  const px = useTransform(mouse.x, [-0.5, 0.5], [-15 * (1 + index * 0.3), 15 * (1 + index * 0.3)])
  const py = useTransform(mouse.y, [-0.5, 0.5], [-15 * (1 + index * 0.3), 15 * (1 + index * 0.3)])
  return (
    <motion.div
      className="absolute"
      style={{
        width: size, height: size, backgroundColor: color, borderRadius: radius,
        left: '50%', top: '50%', marginLeft: offsetX, marginTop: offsetY, x: px, y: py,
      }}
      animate={{ y: [0, -10 - index * 5, 0], rotate: [0, 10 + index * 5, 0] }}
      transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function FloatingCard({ title, desc, color, offsetX, offsetY, delay, index }) {
  const mouse = useContext(MouseContext)
  const px = useTransform(mouse.x, [-0.5, 0.5], [-20 * (1 + index * 0.4), 20 * (1 + index * 0.4)])
  const py = useTransform(mouse.y, [-0.5, 0.5], [-20 * (1 + index * 0.4), 20 * (1 + index * 0.4)])
  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%', marginLeft: offsetX, marginTop: offsetY, x: px, y: py }}
      animate={{ y: [0, -8 - index * 3, 0] }}
      transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="backdrop-blur-xl bg-white/10 rounded-[18px] px-5 py-3.5 border border-white/15 min-w-[160px] text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <p className="text-white text-[13px] font-[600]">{title}</p>
        </div>
        <p className="text-white/50 text-[11px] mt-0.5">{desc}</p>
      </div>
    </motion.div>
  )
}

const floatingCards = [
  { title: 'Web Design', desc: 'High-conversion websites', color: '#0066cc', x: -180, y: -60, delay: 0 },
  { title: 'Brand Identity', desc: 'Strategic brand systems', color: '#5856d6', x: 200, y: -80, delay: 0.15 },
  { title: 'App UI', desc: 'Intuitive mobile interfaces', color: '#34c759', x: -160, y: 80, delay: 0.3 },
  { title: 'Social Media', desc: 'Scroll-stopping visuals', color: '#ff9500', x: 190, y: 70, delay: 0.45 },
]

const floatingShapes = [
  { size: 40, x: -250, y: -140, color: 'rgba(0,102,204,0.15)', delay: 0, radius: 12 },
  { size: 24, x: 260, y: -160, color: 'rgba(88,86,214,0.15)', delay: 0.2, radius: 9999 },
  { size: 32, x: -280, y: 130, color: 'rgba(52,199,89,0.12)', delay: 0.4, radius: 8 },
  { size: 20, x: 270, y: 140, color: 'rgba(255,149,0,0.15)', delay: 0.6, radius: 9999 },
  { size: 16, x: 0, y: -180, color: 'rgba(0,102,204,0.1)', delay: 0.8, radius: 4 },
]

export default function HeroSection() {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window

  const handlePointerMove = (e) => {
    if (!ref.current || isTouch) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => { mouseX.set(0); mouseY.set(0) }

  const handleTouchMove = (e) => {
    if (!ref.current || !isTouch) return
    const rect = ref.current.getBoundingClientRect()
    const touch = e.touches[0]
    mouseX.set((touch.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((touch.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={ref}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
      className="min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4"
      style={{ background: '#272729' }}
    >
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(0,102,204,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(88,86,214,0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, rgba(52,199,89,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(255,149,0,0.08) 0%, transparent 50%)
        `
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <SEO title="Premium Graphic Design Agency" description="KINTOX — professional graphic design agency for brand identity, web design, and high-conversion visuals." path="/" />

      <MouseContext.Provider value={{ x: mouseX, y: mouseY }}>
        <div className="absolute inset-0 hidden md:block" style={{ perspective: '1000px' }}>
          {floatingShapes.map((s, i) => (
            <FloatingShape key={i} index={i} {...s} offsetX={s.x} offsetY={s.y} />
          ))}
        </div>
        <div className="absolute inset-0 block md:hidden" style={{ perspective: '1000px' }}>
          {floatingShapes.slice(0, 1).map((s, i) => (
            <FloatingShape key={i} index={i} {...s} offsetX={s.x / 3} offsetY={s.y / 3} />
          ))}
        </div>

        <div className="absolute inset-0 hidden lg:block" style={{ perspective: '1000px' }}>
          {floatingCards.map((c, i) => (
            <FloatingCard key={i} index={i} {...c} offsetX={c.x} offsetY={c.y} />
          ))}
        </div>
      </MouseContext.Provider>

      <div className="relative z-10 section-container flex flex-col items-center gap-0 pt-16 md:pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-[12px] text-white/60 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#2997ff]" />
          Trusted by 30+ brands worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] sm:text-[56px] md:text-[64px] font-[600] leading-[1.05] tracking-[-0.5px] text-white max-w-[800px] mx-auto"
        >
          Premium Design Agency<br />for Modern Brands
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[17px] sm:text-[24px] font-[400] leading-[1.3] text-white/60 max-w-[600px] mx-auto mt-4"
        >
          Brand identity, web & app design that drives growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
        >
          <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[17px] font-[400] text-white" style={{ background: '#0066cc' }}>
            View Portfolio
            <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[17px] font-[400] text-[#2997ff] border border-[#2997ff]/40 hover:bg-white/5 transition-colors">
            Book a Call
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 mt-8 md:mt-12 w-full"
      >
        <div className="flex md:flex-wrap items-center gap-2 md:gap-4 overflow-x-auto px-4 pb-2 hide-scrollbar md:justify-center snap-x snap-mandatory">
          {['Web Design', 'Brand Identity', 'App UI', 'Social Media'].map((label, i) => (
            <motion.div
              key={label}
              animate={{ y: [0, -4 - i * 2, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              className="shrink-0 snap-center backdrop-blur-xl bg-white/10 rounded-[14px] px-3 md:px-5 py-2 md:py-3 border border-white/15"
            >
              <p className="text-white text-[11px] md:text-[13px] font-[500] whitespace-nowrap">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#272729] pointer-events-none z-10" />
    </section>
  )
}
