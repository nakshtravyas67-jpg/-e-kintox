import { Search, X } from 'lucide-react'
import { categories } from '../data/products'
import { Globe, Monitor, Smartphone, Play, Image, Share2 } from 'lucide-react'

const catIcons = {
  'All': Globe,
  'Website UI': Monitor,
  'App UI': Smartphone,
  'YouTube Thumbnails': Play,
  'Posters': Image,
  'Social Media': Share2,
}

export default function PortfolioFilter({ searchQuery, onSearchChange, activeCategory, onCategoryChange, sortBy, onSortChange, categoryCounts }) {
  return (
    <div className="mb-10 space-y-4">
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73] pointer-events-none" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F7] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all placeholder:text-[#6E6E73]"
          placeholder="Search designs by name, category, or description..."
        />
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const Icon = catIcons[cat] || Globe
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#1D1D1F] text-white'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat}
              <span className={`ml-0.5 text-[10px] ${
                activeCategory === cat ? 'text-white/60' : 'text-[#6E6E73]'
              }`}>
                ({categoryCounts[cat]})
              </span>
            </button>
          )
        })}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="ml-2 bg-[#F5F5F7] rounded-full px-4 py-2 text-sm text-[#6E6E73] outline-none cursor-pointer border-none"
        >
          <option>Newest</option>
          <option>Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}
