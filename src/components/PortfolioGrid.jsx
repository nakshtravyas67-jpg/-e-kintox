import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, ArrowUpRight, X } from 'lucide-react'
import ImagePlaceholder from './common/ImagePlaceholder'
import { portfolioCategories, portfolioProjects } from '../data/portfolio'

function PortfolioModal({ project, onClose }) {
  const modalRef = useRef(null)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    const prev = document.activeElement
    modalRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      prev?.focus()
    }
  }, [onClose])
  return (
    <motion.div
      ref={modalRef}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio project detail"
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 md:h-80 overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} width="600" height="400" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder containerClassName="w-full h-full" className="w-16 h-16" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
            <h3 className="text-white text-2xl font-bold mt-2">{project.title}</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div><span className="text-[#6E6E73]">Client:</span> <span className="text-[#1D1D1F] font-medium">{project.client}</span></div>
            <div><span className="text-[#6E6E73]">Year:</span> <span className="text-[#1D1D1F] font-medium">{project.year}</span></div>
            <div><span className="text-[#6E6E73]">Role:</span> <span className="text-[#1D1D1F] font-medium">{project.role}</span></div>
          </div>
          <p className="text-[#6E6E73] text-sm leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-medium text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-md">{tag}</span>
            ))}
          </div>
          {project.results && (
            <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
              <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{project.results}</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioGrid({ filter, onFilterChange, visible, onLoadMore, onSelectProject, modalProject, onCloseModal }) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">Featured Projects</h2>
        <div className="flex flex-wrap gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                filter === cat
                  ? 'bg-[#1D1D1F] text-white'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioProjects.filter(p => p.category === filter).slice(0, visible).map((project) => (
          <div key={project.id} onClick={() => onSelectProject(project)} className="group bg-[#F5F5F7] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium bg-[#0071E3]/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-[#0071E3] transition-all cursor-pointer">
                  View Project <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold text-[#0071E3] bg-[#0071E3]/8 px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
                <span className="text-xs text-[#6E6E73]">{project.year}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-[#1D1D1F] mb-1">{project.title}</h3>
              <p className="text-sm text-[#6E6E73] mb-1">Client: <span className="text-[#1D1D1F] font-medium">{project.client}</span></p>
              <p className="text-xs text-[#6E6E73] mb-3">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-md">{tag}</span>
                ))}
              </div>
              {project.results && (
                <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{project.results}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {visible < portfolioProjects.filter(p => p.category === filter).length && (
        <div className="mt-10 text-center">
          <button
            onClick={onLoadMore}
            className="px-8 py-3.5 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-sm hover:bg-[#E8E8ED] transition-all active:scale-[0.97] cursor-pointer"
          >
            Load More ({portfolioProjects.filter(p => p.category === filter).length - visible} remaining)
          </button>
        </div>
      )}

      <div className="mt-12 text-center">
        <a
          href="https://behance.net"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#0071E3] font-medium hover:underline"
        >
          View all projects on Behance <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <AnimatePresence>
        {modalProject && (
          <PortfolioModal project={modalProject} onClose={onCloseModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
