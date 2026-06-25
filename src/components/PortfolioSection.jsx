import { useState, useEffect, useRef } from 'react'
import { allProducts as hardcodedProducts } from '../data/products'
import { portfolioProjects, portfolioCategories } from '../data/portfolio'
import SEO from './SEO'
import PortfolioGrid from './PortfolioGrid'
import ProductPackages from './store/ProductPackages'
import BackToTop from './BackToTop'

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('portfolio')
  const [portfolioFilter, setPortfolioFilter] = useState('Web Design')
  const [portfolioVisible, setPortfolioVisible] = useState(6)
  const [mergedProducts] = useState(hardcodedProducts)
  const [showBackTop, setShowBackTop] = useState(false)
  const [portfolioModal, setPortfolioModal] = useState(null)

  const storeRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SEO title="Portfolio — Design Store" description="Browse KINTOX design portfolio and purchase premium digital assets including UI kits, brand identity, and social media templates." path="/portfolio" />
      <div data-nav-theme="light" className="bg-white text-[#1D1D1F] min-h-screen">
      <div className="max-w-[980px] mx-auto px-4 md:px-6 py-20 md:py-24">
        <header className="mb-8 md:mb-10 text-center">
          <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-widest block mb-4">PORTFOLIO & STORE</span>
          <h1 className="font-headline-lg text-headline-lg text-[#1D1D1F] mb-4 leading-tight">
            Work & Products
          </h1>
          <p className="text-[#6E6E73] max-w-2xl mx-auto text-lg">
            Browse our design portfolio and purchase premium digital assets.
          </p>
        </header>

        <div className="flex items-center justify-center gap-1 mb-12 bg-[#F5F5F7] p-1 rounded-2xl w-fit mx-auto">
          {[
            { key: 'portfolio', label: 'Portfolio' },
            { key: 'store', label: 'Design Store' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-[#1D1D1F] shadow-sm'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'portfolio' ? (
          <PortfolioGrid
            filter={portfolioFilter}
            onFilterChange={setPortfolioFilter}
            visible={portfolioVisible}
            onLoadMore={() => setPortfolioVisible(p => p + 6)}
            onSelectProject={setPortfolioModal}
            modalProject={portfolioModal}
            onCloseModal={() => setPortfolioModal(null)}
          />
        ) : (
          <div ref={storeRef}>
            <div className="mb-10">
              <h2 className="text-[22px] font-[600] text-[#1d1d1f] mb-1">Choose Your Package</h2>
              <p className="text-[14px] text-[#7a7a7a]">Each product comes with tiered packages to fit your needs and budget.</p>
            </div>
            {mergedProducts.map((product, i) => (
              <ProductPackages key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

      <BackToTop visible={showBackTop} />
    </div>
    </>
  )
}
