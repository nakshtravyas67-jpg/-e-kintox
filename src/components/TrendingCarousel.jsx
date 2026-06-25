import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import ImagePlaceholder from './common/ImagePlaceholder'
import { formatPrice } from '../data/products'

export default function TrendingCarousel({ products }) {
  if (!products.length) return null

  const scroll = (dir) => {
    document.getElementById('trending-scroll').scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline-md text-headline-md text-[#1D1D1F]">Trending Products</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-11 h-11 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#E8E8ED] transition-all cursor-pointer">
            <ArrowLeft className="w-4 h-4 text-[#1D1D1F]" />
          </button>
          <button onClick={() => scroll(1)} className="w-11 h-11 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#E8E8ED] transition-all cursor-pointer">
            <ArrowRight className="w-4 h-4 text-[#1D1D1F]" />
          </button>
        </div>
      </div>
      <div id="trending-scroll" className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="shrink-0 w-[280px] snap-start group">
            <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden h-full">
              <div className="h-44 overflow-hidden relative">
                {p.image ? (
                  <img src={p.image} alt={p.title} width="300" height="170" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <ImagePlaceholder containerClassName="w-full h-full" className="w-10 h-10" />
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {p.badge && <span className="bg-[#0071E3] text-white px-3 py-1 rounded-full text-[10px] font-medium">{p.badge}</span>}
                  {p.originalPrice && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-medium">-{Math.round((1 - p.price / p.originalPrice) * 100)}%</span>}
                </div>
              </div>
              <div className="p-4 bg-white">
                <span className="text-[10px] text-[#0071E3] font-semibold uppercase tracking-wider">{p.category}</span>
                <h3 className="font-semibold text-[#1D1D1F] mt-1 group-hover:text-[#0071E3] transition-colors">{p.title}</h3>
                <p className="text-xs text-[#6E6E73] mt-1 line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-[#0071E3]">{formatPrice(p.price)}</span>
                    {p.originalPrice && <span className="text-[10px] text-[#6E6E73] line-through">{formatPrice(p.originalPrice)}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-xs text-[#6E6E73]">{p.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
