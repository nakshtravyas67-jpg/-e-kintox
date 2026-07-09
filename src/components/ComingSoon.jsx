import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import KintoxLogo from './KintoxLogo'

const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 30)

function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) return
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}

const floatVariant = {
  animate: (i) => ({
    y: [0, -12 - i * 6, 0],
    rotate: [0, 8 + i * 4, 0],
    transition: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const shapes = [
  { w: 280, h: 280, x: '-40%', y: '-30%', c: 'rgba(0,102,204,0.08)', r: '40%', i: 0 },
  { w: 180, h: 180, x: '35%', y: '-20%', c: 'rgba(88,86,214,0.06)', r: '30%', i: 1 },
  { w: 120, h: 120, x: '-30%', y: '40%', c: 'rgba(0,102,204,0.05)', r: '50%', i: 2 },
  { w: 200, h: 200, x: '40%', y: '50%', c: 'rgba(88,86,214,0.04)', r: '35%', i: 3 },
]

export default function ComingSoon() {
  const time = useCountdown(targetDate)

  return (
    <div className="min-h-screen bg-[#1d1d1f] flex flex-col items-center justify-center relative overflow-hidden px-6">
      {shapes.map((s) => (
        <motion.div
          key={s.i}
          custom={s.i}
          variants={floatVariant}
          animate="animate"
          className="absolute"
          style={{
            width: s.w, height: s.h, backgroundColor: s.c, borderRadius: s.r,
            left: `calc(50% + ${s.x})`, top: `calc(50% + ${s.y})`,
          }}
        />
      ))}

      <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 text-center max-w-2xl">
        <motion.div variants={fadeUp} className="mb-6">
          <KintoxLogo textColor="text-white" tagColor="text-white/40" />
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-[48px] md:text-[72px] font-[600] leading-[1.05] tracking-[-0.5px] text-white mb-4">
          Something
          <br />
          <span className="text-[#2997ff]">Amazing</span> Is Coming
        </motion.h1>

        <motion.p variants={fadeUp} className="text-[17px] md:text-[21px] text-white/50 mb-12 max-w-md mx-auto leading-relaxed">
          We're crafting something exceptional. Our new website is launching soon with premium design services.
        </motion.p>

        <motion.div variants={fadeUp} className="flex justify-center gap-6 md:gap-10 mb-12">
          {Object.entries(time).map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="text-[36px] md:text-[48px] font-[600] text-white leading-none mb-1 tabular-nums">
                {String(val).padStart(2, '0')}
              </div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-white/30">{key}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:nakshtr.144@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#0066cc] text-white rounded-full text-[14px] font-[500] hover:bg-[#0055aa] transition-colors"
          >
            Notify Me
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/15 text-white/70 rounded-full text-[14px] font-[400] hover:bg-white/5 transition-colors"
          >
            Follow Us
          </a>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 text-[11px] text-white/20 tracking-wider"
      >
        KINTOX — PREMIUM DESIGN AGENCY
      </motion.p>
    </div>
  )
}
