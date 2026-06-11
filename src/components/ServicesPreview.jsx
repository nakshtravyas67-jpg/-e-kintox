import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  { icon: 'smart_display', title: 'YouTube Thumbnails', price: 'From ₹499', tag: 'Best Seller', color: 'from-purple-500/20 to-pink-600/20' },
  { icon: 'code', title: 'Website Development', price: 'From ₹2,999', tag: 'Popular', color: 'from-blue-500/20 to-indigo-600/20' },
  { icon: 'brush', title: 'Branding & Logo', price: 'From ₹4,999', tag: 'Premium', color: 'from-emerald-500/20 to-teal-600/20' },
  { icon: 'share', title: 'Social Media Design', price: 'From ₹1,499', tag: 'Trending', color: 'from-cyan-500/20 to-blue-600/20' },
]

const svgPaths = {
  smart_display: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 8v8l6-4z',
  code: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  brush: 'M7 14c-2.21 0-4 1.79-4 4 0 1.1-.9 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.1.9-2 2-2h-4zM5 10l5-5 5 5-5 5-5-5zM18 17h-4c0 2.21-1.79 4-4 4 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.1.9-2 2-2h-2z',
  share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z',
}

export default function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071E3]/10 rounded-full text-[#0071E3] text-xs font-semibold tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            Our Services
          </span>
          <h2 className="text-[#1D1D1F] text-3xl md:text-4xl font-bold tracking-tight mt-4">
            Premium design packages <br className="hidden md:block" />tailored for you
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#F5F5F7] rounded-2xl p-6 hover:bg-white hover:shadow-lg hover:shadow-[#0071E3]/5 hover:border-[#0071E3]/20 border border-transparent transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={svgPaths[s.icon]} /></svg>
              </div>
              <span className="text-[10px] font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">{s.tag}</span>
              <h3 className="text-[#1D1D1F] font-semibold text-base mt-2 mb-1">{s.title}</h3>
              <p className="text-[#0071E3] font-bold text-sm">{s.price}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0071E3] text-white font-semibold text-sm rounded-xl hover:bg-[#0077ED] transition-all active:scale-[0.98]">
            View All Packages
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
