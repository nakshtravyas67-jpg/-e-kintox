import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMousePosition } from '../hooks/useMousePosition'
import SEO from './SEO'

gsap.registerPlugin(ScrollTrigger)

const headingWords = ['Design', 'That', 'Speaks', 'Volumes']

const portfolioCards = [
  { id: 1, label: 'Web Design', color: 'from-blue-500/20 to-indigo-600/20', delay: 0 },
  { id: 2, label: 'App Design', color: 'from-emerald-500/20 to-teal-600/20', delay: 0.8 },
  { id: 3, label: 'Brand Identity', color: 'from-blue-500/20 to-purple-600/20', delay: 1.6 },
  { id: 4, label: 'Social Media', color: 'from-cyan-500/20 to-blue-600/20', delay: 2.4 },
  { id: 5, label: 'Thumbnail Design', color: 'from-purple-500/20 to-pink-600/20', delay: 3.2 },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const mouse = useMousePosition()

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const content = contentRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    tl.to(content, { scale: 0.92, y: 60, opacity: 0.6, ease: 'power2.out' }, 0)
    tl.to(bg, { scale: 1.08, ease: 'power2.out' }, 0)

    return () => tl.kill()
  }, [])

  return (
    <>
      <SEO title="Premium Graphic Design Agency" description="KINTOX is a professional graphic design agency specializing in brand identity, web design, and high-conversion visuals." path="/" />
      <section
        ref={sectionRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          alt="Professional Creative Studio Background"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjjhK_jgAOOSChNXjUTt9dUbhEFPeql1x44FpQTzYlQOooGZDmiSR1lOS4Ju5uck5Dq5ZNeYn0-kBFS-Xc4H2yu8xjPmCZ08mca_Q9OJWJbuyskzC1FTJOwPSn997h-VNVdO8nya4ae91b0K--0R0ot11na-ry7ou2YgW07tP4WoSm2ul7Xve11OnM6p2N1TFWZHqf87cIYT4A5pzssTaUPUGPdy_NlfBQ_GNNo_MHK3xWVHfComnhIjFUPkZSu8JhMUY3Y-JxJTQ"
        />
        <div className="absolute inset-0 bg-black/65 z-10" />
      </div>

      <div ref={contentRef} className="relative z-20 w-full will-change-transform">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="max-w-5xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="inline-block text-white/80 font-title-uppercase text-title-uppercase tracking-[0.2em] mb-6"
            >
              Professional Graphic Design Agency
            </motion.span>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg leading-[1.1]"
            >
              {headingWords.map((word, i) => {
                const isHighlight = word === 'Speaks' || word === 'Volumes'
                return (
                  <motion.span
                    key={word}
                    variants={wordVariants}
                    className={`inline-block mr-[0.15em] ${isHighlight ? 'text-[#0071E3]' : 'text-white'}`}
                  >
                    {word}
                  </motion.span>
                )
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              className="text-white font-body-lg text-body-lg max-w-2xl mx-auto mt-6"
            >
              Web Design, App Design, Branding &mdash; premium creative solutions that captivate and convert.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-gutter mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0, 113, 227, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-auto px-12 py-5 bg-[#0071E3] text-white font-button-text text-button-text uppercase tracking-[0.15em] rounded-xl hover:bg-[#0077ED] transition-colors duration-300 shadow-lg"
              >
                Order Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-auto px-12 py-5 border-2 border-white/80 text-white font-button-text text-button-text uppercase tracking-[0.15em] rounded-xl hover:bg-white hover:text-[#1D1D1F] transition-colors duration-300"
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 animate-scroll-indicator" />
        </div>
      </div>

      {portfolioCards.map((card) => {
        const offsetX = (mouse.x - 0.5) * 12
        const offsetY = (mouse.y - 0.5) * 12
        const positions = [
          'top-[10%] right-[5%] md:right-[8%]',
          'top-[38%] right-[1%] md:right-[3%]',
          'top-[62%] right-[5%] md:right-[8%]',
          'top-[22%] left-[2%] md:left-[5%]',
          'top-[52%] left-[1%] md:left-[3%]',
        ]

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: [0, -12, 0],
              x: offsetX,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 1.6 + card.id * 0.2, ease: [0.16, 1, 0.3, 1] },
              y: {
                duration: 4 + card.delay * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.delay,
              },
              x: {
                duration: 0.3,
                ease: 'linear',
              },
            }}
            className={`absolute ${positions[card.id - 1]} z-30 hidden lg:block pointer-events-none`}
          >
            <div className={`bg-gradient-to-br ${card.color} backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 shadow-2xl`}>
              <p className="text-white/90 font-label-md text-label-md tracking-wide whitespace-nowrap">
                {card.label}
              </p>
            </div>
          </motion.div>
        )
      })}
    </section>
    </>
  )
}
