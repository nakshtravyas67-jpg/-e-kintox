import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const features = [
  { icon: 'brush', label: 'Brand Identity', desc: 'Strategic brand systems that communicate your story with clarity and impact across every touchpoint.' },
  { icon: 'web', label: 'Web Design', desc: 'High-performance websites with pixel-perfect design, seamless interactions, and conversion-focused layouts.' },
  { icon: 'smartphone', label: 'App Design', desc: 'Intuitive mobile interfaces that delight users, drive engagement, and turn visitors into loyal customers.' },
  { icon: 'palette', label: 'Visual Design', desc: 'Compelling visuals, illustrations, and motion design that make your brand unforgettable.' },
  { icon: 'trending_up', label: 'Growth Strategy', desc: 'Data-driven design strategies optimized for engagement, retention, and measurable business growth.' },
  { icon: ' rocket_launch', label: 'Product Launch', desc: 'End-to-end launch campaigns with premium creatives that generate buzz and drive conversions.' },
]

const iconPaths = {
  brush: 'M7 14c-2.21 0-4 1.79-4 4 0 1.1-.9 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.1.9-2 2-2h-4zM5 10l5-5 5 5-5 5-5-5zM18 17h-4c0 2.21-1.79 4-4 4 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.1.9-2 2-2h-2z',
  web: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  smartphone: 'M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zM12 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
  palette: 'M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.4 0-1.1.9-2 2-2H18c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 11c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10s1.5.67 1.5 1.5S7.33 13 6.5 13zm3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  trending_up: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  rocket_launch: 'M12 2C7.58 2 4 5.58 4 10c0 2.5 1 4.75 2.5 6.5C7.5 18 8 20 8 20h8s.5-2 1.5-3.5C19 14.75 20 12.5 20 10c0-4.42-3.58-8-8-8zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5-5.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z',
}

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.8 1', '0.2 0.2'] })

  return (
    <motion.div
      ref={ref}
      style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]), y: useTransform(scrollYProgress, [0, 0.5], [40, 0]) }}
      className="group relative p-8 rounded-2xl bg-white border border-black/[0.04] hover:border-[#0071E3]/20 hover:shadow-lg hover:shadow-[#0071E3]/5 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-xl bg-[#0071E3]/10 flex items-center justify-center mb-5 group-hover:bg-[#0071E3] transition-colors duration-500">
        <svg className="w-6 h-6 text-[#0071E3] group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
          <path d={iconPaths[feature.icon]} />
        </svg>
      </div>
      <h3 className="text-[#1D1D1F] font-semibold text-lg mb-2">{feature.label}</h3>
      <p className="text-[#6E6E73] text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.3 1', '0.1 0.2'] })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]), y: useTransform(scrollYProgress, [0, 0.3], [30, 0]) }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            What We Do
          </span>
          <h2 className="text-[#1D1D1F] text-4xl md:text-5xl font-bold tracking-tight mt-4">
            Everything you need <br className="hidden md:block" />to build a standout brand
          </h2>
          <p className="text-[#6E6E73] text-lg max-w-xl mx-auto mt-4">
            From strategy to execution, we deliver design that drives real business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.label} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
