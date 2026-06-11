import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTASection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.2 1', '0 0.2'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA]">
      <motion.div style={{ scale, opacity }} className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2D2D2F] overflow-hidden p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] rounded-full bg-[#0071E3] blur-[100px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] rounded-full bg-[#0071E3] blur-[100px]" />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Ready to create something <br className="hidden md:block" />
              <span className="text-[#0071E3]">extraordinary</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-white/60 text-lg max-w-lg mx-auto mb-10"
            >
              Let's discuss your project and create something amazing together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/services"
                className="px-8 py-4 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                Start Your Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a
                href="mailto:nakshtr.144@gmail.com"
                className="px-8 py-4 border border-white/20 text-white/80 font-semibold text-sm rounded-xl hover:bg-white hover:text-[#1D1D1F] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Book a Call
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
