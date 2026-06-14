import { Link } from 'react-router-dom'
import { portfolioProjects } from '../data/portfolio'

const items = portfolioProjects.slice(0, 9)

const heights = [
  'h-[400px]', 'h-[280px]', 'h-[340px]',
  'h-[300px]', 'h-[360px]', 'h-[260px]',
  'h-[380px]', 'h-[270px]', 'h-[350px]',
]

export default function PortfolioMasonry() {
  return (
    <section className="w-screen min-h-screen bg-[#272729] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#272729] z-10 pointer-events-none" />

      <div className="absolute top-16 left-8 md:top-20 md:left-16 z-20">
        <p className="text-[#2997ff] text-[13px] font-[600] tracking-[0.15em] uppercase mb-2">Portfolio</p>
        <h2 className="text-white text-[48px] md:text-[64px] font-[700] leading-[1.05] tracking-[-0.5px]">
          Our Work
        </h2>
        <p className="text-white/50 text-[17px] mt-3 max-w-[360px]">
          Selected projects from our design studio.
        </p>
      </div>

      <Link
        to="/portfolio"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-20 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-[14px] font-[500] hover:bg-white/20 transition-all"
      >
        View All Projects
        <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div className="w-full h-full pt-40 md:pt-48 pb-24 px-4 md:px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
          {items.map((project, i) => (
            <Link
              key={project.id}
              to={`/product/${i + 1}`}
              className={`group relative overflow-hidden rounded-[18px] block ${heights[i]}`}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-[600] text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-white text-[18px] font-[600] mt-2">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
