import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 250, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '+', label: 'Industry Awards' },
  { value: 8, suffix: '+', label: 'Years Experience' },
]

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
    <span ref={ref} className="text-[40px] font-semibold text-[#1d1d1f]">
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-[#f5f5f7] py-20">
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <CountUp end={s.value} suffix={s.suffix} />
              <p className="text-[14px] font-normal text-[#7a7a7a] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
