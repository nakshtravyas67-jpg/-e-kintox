import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const testimonials = [
  { name: 'Sarah Chen', role: 'CEO, TechFlow', avatar: 'SC', quote: 'KINTOX transformed our brand identity. The level of detail and strategic thinking they brought was exceptional. Our engagement rates increased by 40% within the first quarter.' },
  { name: 'James Mitchell', role: 'Founder, Orbit Studio', avatar: 'JM', quote: 'Working with KINTOX was a game-changer. They didn\'t just design a website — they crafted an entire digital experience. The results exceeded every expectation we had.' },
  { name: 'Priya Patel', role: 'Marketing Director, Lumina', avatar: 'PP', quote: 'The team at KINTOX has an incredible ability to translate complex ideas into beautiful, functional design. Our customers constantly compliment the new look.' },
  { name: 'Marcus Webb', role: 'CTO, NovaTech', avatar: 'MW', quote: 'From brand strategy to final delivery, KINTOX showed unmatched professionalism. Their design system approach made scaling our product line seamless.' },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.3 1', '0.1 0.2'] })

  const next = () => setCurrent((p) => (p + 1) % testimonials.length)
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]), y: useTransform(scrollYProgress, [0, 0.3], [30, 0]) }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            Testimonials
          </span>
          <h2 className="text-[#1D1D1F] text-4xl md:text-5xl font-bold tracking-tight mt-4">
            Loved by founders <br className="hidden md:block" />and creators
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="relative min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#0071E3] flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg shadow-[#0071E3]/20">
                  {testimonials[current].avatar}
                </div>
                <p className="text-[#1D1D1F] text-lg md:text-xl leading-relaxed italic mb-8 max-w-xl">
                  "{testimonials[current].quote}"
                </p>
                <div>
                  <p className="text-[#1D1D1F] font-semibold">{testimonials[current].name}</p>
                  <p className="text-[#6E6E73] text-sm">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-black/[0.08] flex items-center justify-center hover:bg-black/[0.04] transition-colors text-[#6E6E73] hover:text-[#1D1D1F] cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-[#0071E3] w-6' : 'bg-black/[0.12] hover:bg-black/[0.2]'}`} />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full border border-black/[0.08] flex items-center justify-center hover:bg-black/[0.04] transition-colors text-[#6E6E73] hover:text-[#1D1D1F] cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
