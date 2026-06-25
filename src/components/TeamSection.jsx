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

export default function TeamSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['0.2 1', '0 0.2'] })

  return (
    <>
      <SEO title="Our Team — KINTOX" description="Meet the creative minds behind KINTOX. A passionate team of designers, strategists, and visionaries." path="/team" />
      <section ref={ref} data-nav-theme="dark">

        {/* ── Hero Banner ── */}
        <div className="product-tile-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80" alt="" width="1400" height="800" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#272729] via-transparent to-[#272729]" />
          </div>
          <div className="section-container text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[56px] font-[600] leading-[1.07] tracking-[-0.28px] text-white"
            >
              Creative Minds, One Mission
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lead text-white/70 mt-3 max-w-2xl mx-auto"
            >
              A passionate team of designers, developers, and strategists dedicated to crafting exceptional brand experiences that drive real results.
            </motion.p>
          </div>
        </div>

        {/* ── Team Grid ── */}
        <div className="product-tile-light">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-ink">Meet the Team</h2>
              <p className="text-caption text-muted mt-2 max-w-xl mx-auto">
                A diverse group of creative professionals united by a passion for design and a commitment to excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-canvas border border-hairline rounded-lg overflow-hidden"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-full rounded-t-md object-cover aspect-square"
                  />
                  <div className="p-6">
                    <h3 className="text-body-strong text-ink">{member.name}</h3>
                    <p className="text-caption text-muted mt-0.5">{member.role}</p>
                    {member.desc && <p className="text-caption text-muted mt-2">{member.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="product-tile-parchment">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12"
            >
              <h2 className="text-display-lg text-ink">What Drives Us</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {values.map((v) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="store-card text-center"
                >
                  <h4 className="text-body-strong text-ink">{v.label}</h4>
                  <p className="text-caption text-muted mt-1">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="product-tile-light">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-display-lg text-ink mb-3">Join Our Team</h2>
              <p className="text-caption text-muted max-w-md mx-auto mb-6">
                We're always looking for talented creatives to push boundaries with us.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="mailto:nakshtr.144@gmail.com" className="btn-primary">
                  Get in Touch
                </a>
                <Link to="/contact" className="btn-secondary-pill">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </section>
    </>
  )
}
