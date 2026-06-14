import { Link } from 'react-router-dom'
import ImagePlaceholder from './common/ImagePlaceholder'
import { formatPrice } from '../data/products'

export default function RecentlyViewed({ products }) {
  if (!products.length) return null

  return (
    <section className="mb-12">
      <h2 className="font-headline-md text-headline-md text-[#1D1D1F] mb-6">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="shrink-0 w-40 group snap-start">
            <div className="bg-[#F5F5F7] rounded-xl overflow-hidden">
              <div className="h-24 overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <ImagePlaceholder containerClassName="w-full h-full" className="w-8 h-8" />
                )}
              </div>
              <div className="p-3 bg-white">
                <p className="text-xs font-semibold text-[#1D1D1F] truncate">{p.title}</p>
                <p className="text-[10px] text-[#0071E3] font-medium mt-0.5">{formatPrice(p.price)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
