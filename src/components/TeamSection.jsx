import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import SEO from './SEO'

const team = [
  { name: 'Nakshtra Vyas', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', desc: 'Founder of KINTOX. Faculty, App & Web Developer. Delivered 7 full-stack websites & 2 apps. Age 17, BTech AI-DS 2nd year at Sangam University, Bhilwara. Skilled in full-stack app development & Flutter.' },
  { name: 'Akshit Panwar', role: 'CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face' },
  { name: 'Kuldeep Vyas', role: 'Marketing Analyst', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
  { name: 'Priya Sharma', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
  { name: 'Rohit Verma', role: 'Brand Strategist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
  { name: 'Neha Kapoor', role: 'UI/UX Designer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
]

const values = [
  { icon: 'stars', label: 'Creativity', desc: 'Pushing boundaries with innovative design thinking.' },
  { icon: 'handshake', label: 'Collaboration', desc: 'Working hand-in-hand with clients for the best outcomes.' },
  { icon: 'speed', label: 'Speed', desc: 'Fast turnaround without compromising quality.' },
  { icon: 'verified', label: 'Quality', desc: 'Pixel-perfect deliverables every single time.' },
]

const sidebarTeam = [
  { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80', name: 'Nakshtra V.' },
  { img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', name: 'Akshit P.' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', name: 'Kuldeep V.' },
  { img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', name: 'Priya S.' },
]

export default function TeamSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.2 1', '0 0.2'] })

  return (
    <>
      <SEO title="Our Team — KINTOX" description="Meet the creative minds behind KINTOX. A passionate team of designers, strategists, and visionaries." path="/team" />
      <section ref={ref} data-nav-theme="dark" className="relative w-full bg-[#FAFAFA]">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-16 md:pb-24">
          <div className="mb-6 md:mb-8 pt-4 md:pt-6">
            <Link to="/" className="text-[11px] text-gray-400 hover:text-primary uppercase tracking-[0.15em] transition-colors">Home</Link>
            <span className="text-[11px] text-gray-300 mx-2">/</span>
            <span className="text-[11px] text-primary font-semibold uppercase tracking-[0.15em]">Team</span>
            <p className="text-xs text-gray-400 mt-2 tracking-wide">The creative minds behind KINTOX.</p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] min-h-[380px] md:min-h-[460px] flex items-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#e94560]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#e94560]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[80px]" />
              <div className="absolute top-10 right-10 w-20 h-20 border border-white/[0.04] rounded-full" />
              <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/[0.03] rounded-full" />
            </div>

            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center px-6 md:px-16 py-12 md:py-20">
              <div className="lg:col-span-3">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#e94560] uppercase tracking-[0.15em] bg-[#e94560]/10 px-4 py-1.5 rounded-full mb-5"
                >
                  <span className="w-1.5 h-1.5 bg-[#e94560] rounded-full animate-pulse" />
                  OUR TEAM
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-headline-lg text-headline-lg text-white leading-[1.08] mb-5"
                >
                  Creative Minds, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#ff6b8a]">One Mission</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-8"
                >
                  A passionate team of designers, developers, and strategists dedicated to crafting exceptional brand experiences that drive real results.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-6 md:gap-10"
                >
                  {[
                    { value: '6', label: 'Team Members' },
                    { value: '200+', label: 'Projects Delivered' },
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
                  {sidebarTeam.map((member, i) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-white/[0.07] hover:border-[#e94560]/20 transition-all group"
                    >
                      <div className="h-24 md:h-28 overflow-hidden">
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-4 md:p-5">
                        <p className="text-white/80 text-xs md:text-sm font-semibold leading-tight">{member.name}</p>
                        <p className="text-[#e94560]/50 text-[10px] mt-1">Team KINTOX</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="bg-white py-16 md:py-24">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-12">

          <div className="bg-white rounded-2xl overflow-hidden p-6 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e94560]/10 rounded-full text-[#e94560] text-xs font-semibold tracking-wide mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e94560]" />
                MEET THE TEAM
              </span>
              <h2 className="text-[#1D1D1F] text-3xl md:text-4xl font-bold mt-4">
                The people behind <span className="text-[#e94560]">KINTOX</span>
              </h2>
              <p className="text-[#6E6E73] text-lg max-w-2xl mx-auto mt-4">
                A diverse group of creative professionals united by a passion for design and a commitment to excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-black/[0.04] hover:border-[#e94560]/20 hover:shadow-lg hover:shadow-[#e94560]/5 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#1D1D1F] font-semibold text-lg">{member.name}</h3>
                    <p className="text-[#e94560] text-sm font-medium mt-1">{member.role}</p>
                    {member.desc && <p className="text-[#6E6E73] text-xs leading-relaxed mt-3">{member.desc}</p>}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-black/[0.04]">
                      {['linkedin', 'twitter', 'dribbble'].map((s) => (
                        <a key={s} href="#" className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center hover:bg-[#e94560]/10 transition-colors text-[#6E6E73] hover:text-[#e94560]">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl overflow-hidden p-6 md:p-16"
          >
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e94560]/10 rounded-full text-[#e94560] text-xs font-semibold tracking-wide mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e94560]" />
                OUR VALUES
              </span>
              <h2 className="text-[#1D1D1F] text-3xl md:text-4xl font-bold mt-4">
                What Drives <span className="text-[#e94560]">Us</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {values.map((v) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-6 bg-[#FAFAFA] rounded-2xl border border-black/[0.04] hover:bg-[#e94560]/5 hover:border-[#e94560]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#e94560]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-[#e94560]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" /></svg>
                  </div>
                  <h4 className="text-[#1D1D1F] font-semibold text-sm">{v.label}</h4>
                  <p className="text-[#6E6E73] text-xs mt-1">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#e94560]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#e94560]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
              <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">We're always looking for talented creatives to push boundaries with us.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="mailto:nakshtr.144@gmail.com" className="px-8 py-4 bg-[#e94560] text-white font-semibold text-sm rounded-xl hover:bg-[#ff6b8a] transition-all inline-flex items-center gap-2">
                  Get in Touch <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <Link to="/contact" className="px-8 py-4 border-2 border-white/20 text-white/80 font-semibold text-sm rounded-xl hover:bg-white hover:text-[#1D1D1F] transition-all inline-flex items-center gap-2">
                  Contact Us <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l3-3m-3 3l3 3" /></svg>
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
