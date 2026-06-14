import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

export default function AboutSection() {
  return (
    <>
      <SEO title="About — Brand Identity & Design Agency" description="KINTOX is a premium design agency building brands that stand out with high-converting visuals and strategic creative direction." path="/about" />

      <section className="bg-[#272729] pt-20 md:pt-28 pb-24 md:pb-32 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#272729] via-transparent to-[#272729]" />
        </div>
        <div className="max-w-[980px] mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-[56px] font-semibold leading-[1.07] tracking-[-0.28px]"
          >
            We Build Brands That Stand Out
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[rgba(255,255,255,0.7)] text-[28px] max-w-[700px] mx-auto mt-5"
          >
            Kintox is a premium design agency specializing in high-converting visuals, brand identity, and digital experiences that drive real results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-10 justify-center mt-12"
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <p className="text-white text-2xl font-semibold">{stat.value}{stat.suffix}</p>
                <p className="text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20 px-4 md:px-6">
        <div className="max-w-[980px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1] mb-6">Design That Gets Attention. Results That Matter.</h2>
            <p className="text-[#1d1d1f] text-[17px] leading-[1.47] max-w-[680px] mb-10">
              We transform brands into market leaders through high-converting visuals and strategic creative direction. Our approach balances aesthetic excellence with psychological triggers to drive real business growth.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0071E3] text-white text-[17px] font-semibold rounded-[18px] hover:bg-[#0077ED] transition-colors">
              Explore Portfolio
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 md:px-6">
        <div className="max-w-[980px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1] mb-10 text-center">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1]">{stat.value}{stat.suffix}</p>
                  <p className="text-[#7a7a7a] text-[14px] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20 px-4 md:px-6">
        <div className="max-w-[980px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1] mb-4">Meet the Team</h2>
            <p className="text-[#1d1d1f] text-[17px] leading-[1.47] max-w-[680px] mx-auto">
              A passionate team of designers, strategists, and visionaries dedicated to crafting impactful brand experiences.
            </p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} custom={i} className="bg-white border border-[#e0e0e0] rounded-[18px] p-6">
                <img src={member.img} alt={member.name} loading="lazy" className="w-full aspect-square object-cover rounded-[11px] mb-4" />
                <h3 className="text-[#1d1d1f] text-[17px] font-semibold">{member.name}</h3>
                <p className="text-[#7a7a7a] text-[14px] mt-1">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10"
          >
            <Link to="/team" className="text-[#0066cc] text-[17px] font-medium hover:underline">Meet everyone →</Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 md:px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1] mb-8">What Our Clients Say</h2>
              <div className="space-y-5">
                {testimonials.map((t) => (
                  <div key={t.author} className="bg-white border border-[#e0e0e0] rounded-[18px] p-6">
                    <p className="text-[#1d1d1f] text-[17px] leading-[1.47] mb-4">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-[#1d1d1f] text-[17px] font-semibold">{t.author}</p>
                    <p className="text-[#7a7a7a] text-[14px]">{t.role}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1] mb-8">How We Work</h2>
              <div className="space-y-8">
                {process.map((p) => (
                  <div key={p.step} className="flex gap-6">
                    <span className="text-[#7a7a7a] text-[40px] font-semibold leading-[1.1] shrink-0">{p.step}</span>
                    <div>
                      <h3 className="text-[#1d1d1f] text-[17px] font-semibold mb-1.5">{p.title}</h3>
                      <p className="text-[#1d1d1f] text-[17px] leading-[1.47]">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20 px-4 md:px-6 text-center">
        <div className="max-w-[980px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[#1d1d1f] text-[40px] font-semibold leading-[1.1] mb-4">Ready to Start Your Project?</h2>
            <p className="text-[#1d1d1f] text-[17px] leading-[1.47] mb-10 max-w-[600px] mx-auto">Let&rsquo;s create something extraordinary together. Book a free consultation today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:nakshtr.144@gmail.com" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0071E3] text-white text-[17px] font-semibold rounded-[18px] hover:bg-[#0077ED] transition-colors">
                Start a Project
              </a>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#0071E3] text-[#0071E3] text-[17px] font-semibold rounded-[18px] hover:bg-[#0071E3] hover:text-white transition-colors">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
