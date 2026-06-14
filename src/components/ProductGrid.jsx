import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import ProductCard from './store/ProductCard'

export default function ProductGrid({ products, visibleCount, onLoadMore, onQuickView, searchQuery }) {
  if (!products.length) {
    return (
      <div className="text-center py-20">
        <SearchX className="w-16 h-16 text-[#6E6E73] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">No designs found</h3>
        <p className="text-[#6E6E73]">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRDFEMUYiIGZpbGwtb3BhY2l0eT0iMC4wMjUiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">{searchQuery ? 'Search Results' : 'All Designs'}</h2>
          <span className="text-sm text-[#6E6E73]">{products.length} products</span>
        </div>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleCount).map((p, i) => (
            <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}>
              <ProductCard product={p} index={i} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </motion.div>
      {visibleCount < products.length && (
        <div className="mt-10 text-center">
          <button
            onClick={onLoadMore}
            className="px-8 py-3.5 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-sm hover:bg-[#E8E8ED] transition-all active:scale-[0.97] cursor-pointer"
          >
            Load More ({products.length - visibleCount} remaining)
          </button>
        </div>
      )}
      </div>
    </section>
  )
}
