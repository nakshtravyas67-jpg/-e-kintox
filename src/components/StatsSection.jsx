import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: 250, suffix: '+', label: 'Projects Delivered', icon: 'checklist' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: 'thumb_up' },
  { value: 12, suffix: '+', label: 'Industry Awards', icon: 'emoji_events' },
  { value: 8, suffix: '+', label: 'Years Experience', icon: 'calendar_today' },
]

const iconSvgs = {
  checklist: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  thumb_up: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z',
  emoji_events: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z',
  calendar_today: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z',
}

function CountUp({ end, suffix }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 2000
    const step = Math.max(1, Math.floor(end / 60))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, duration / 60)
    return () => clearInterval(timer)
  }, [visible, end])

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold tracking-tight text-[#1D1D1F]">
      {count}{suffix}
    </span>
  )
}

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.8 1', '0.2 0.2'] })

  return (
    <motion.div
      ref={ref}
      style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]), y: useTransform(scrollYProgress, [0, 0.5], [30, 0]) }}
      className="text-center p-8"
    >
      <div className="w-12 h-12 rounded-full bg-[#0071E3]/10 flex items-center justify-center mx-auto mb-5">
        <svg className="w-6 h-6 text-[#0071E3]" viewBox="0 0 24 24" fill="currentColor">
          <path d={iconSvgs[stat.icon]} />
        </svg>
      </div>
      <CountUp end={stat.value} suffix={stat.suffix} />
      <p className="text-[#6E6E73] text-sm mt-2 font-medium">{stat.label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.2 1', '0 0.2'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#F5F5F7]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 25% 50%, #0071E3 0%, transparent 50%), radial-gradient(circle at 75% 50%, #0071E3 0%, transparent 50%)` }} />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
