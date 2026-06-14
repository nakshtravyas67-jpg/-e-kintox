import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, getRelatedProducts, formatPrice, allProducts, categories, getProductReviewers, getRatingDistribution } from '../data/products'
import { useCart } from '../context/CartContext'
import SEO from './SEO'
import ImagePlaceholder from './common/ImagePlaceholder'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { addToCart, cart } = useCart()

  useEffect(() => {
    setSelectedImage(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!product) {
    return (
      <>
        <SEO title="Product Not Found" path="/product/*" />
        <div className="max-w-[980px] mx-auto px-4 md:px-6 pt-20 text-center">
          <h2 className="text-[40px] font-[600] leading-[1.1] text-[#1d1d1f] mb-4">Product Not Found</h2>
          <p className="text-[17px] text-[#7a7a7a] mb-8">The design you're looking for doesn't exist.</p>
          <Link to="/portfolio" className="inline-block bg-[#0066cc] text-white px-8 py-3 rounded-full text-[14px] font-[400]">
            Back to Store
          </Link>
        </div>
      </>
    )
  }

  const relatedProducts = getRelatedProducts(product)
  const images = [product.image, ...product.screenshots].filter(Boolean)
  const isSale = product.originalPrice && product.originalPrice > product.price

  const filteredProducts = allProducts.filter((p) => {
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const techStack = product.software ? product.software.split(',').map(s => s.trim()) : []

  return (
    <>
      <SEO title={`${product.title} — ${product.category}`} description={product.desc} path={`/product/${id}`} image={product.image} />
      <div className="bg-white min-h-screen">
        <div className="border-b border-[#e0e0e0]">
          <div className="max-w-[980px] mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
            <Link to="/portfolio" className="text-[14px] font-[600] text-[#1d1d1f] shrink-0">
              KINTOX <span className="text-[#0066cc] font-[400]">Store</span>
            </Link>
            <div className="hidden md:flex items-center gap-4 flex-1 ml-8">
              <div className="relative flex-1 max-w-md">
                <svg aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#f5f5f7] rounded-full text-[14px] outline-none placeholder:text-[#7a7a7a]"
                  placeholder="Search designs..."
                />
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-[400] whitespace-nowrap snap-start ${
                      filterCategory === cat ? 'bg-[#1d1d1f] text-white' : 'bg-[#f5f5f7] text-[#7a7a7a]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button className="p-3 hover:bg-[#f5f5f7] rounded-full">
                <svg aria-hidden="true" className="w-[18px] h-[18px] text-[#1d1d1f]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.02 4.77L7.2 7h12.63l-1.97 5.68c-.2.59-.76 1-1.38 1H9.66c-.63 0-1.18-.41-1.38-1L7.2 7l-1.2-2.23C5.73 4.3 5.37 4 5 4H2v2h2l2.02 4.77zM9 20c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" /></svg>
              </button>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-3 hover:bg-[#f5f5f7] rounded-full">
                <svg aria-hidden="true" className="w-[18px] h-[18px] text-[#1d1d1f]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
              </button>
            </div>
          </div>
          {showMobileMenu && (
            <div className="md:hidden bg-white border-t border-[#e0e0e0] p-4 space-y-3">
              <div className="relative">
                <svg aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#f5f5f7] rounded-full text-[14px] outline-none"
                  placeholder="Search designs..."
                />
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-[400] whitespace-nowrap snap-start ${
                      filterCategory === cat ? 'bg-[#1d1d1f] text-white' : 'bg-[#f5f5f7] text-[#7a7a7a]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-[980px] mx-auto px-4 md:px-6 pt-[40px]">
          <nav className="flex items-center gap-2 text-[14px] text-[#7a7a7a] mb-8">
            <Link to="/portfolio" className="hover:text-[#0066cc]">Store</Link>
            <svg aria-hidden="true" className="w-[14px] h-[14px] text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
            <span>{product.category}</span>
            <svg aria-hidden="true" className="w-[14px] h-[14px] text-[#7a7a7a]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
            <span className="text-[#1d1d1f] truncate">{product.title}</span>
          </nav>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-3">
              <div className="bg-[#f5f5f7] rounded-[18px] overflow-hidden aspect-video border border-[#e0e0e0] flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder className="w-20 h-20" containerClassName="w-full h-full aspect-video" />
                )}
              </div>
              {images.filter(Boolean).length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar snap-x snap-mandatory">
                    {images.filter(Boolean).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`shrink-0 w-16 h-16 rounded-[11px] overflow-hidden border snap-start ${
                          selectedImage === i ? 'border-[#0066cc]' : 'border-[#e0e0e0]'
                        }`}
                      >
                        <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] font-[600] text-[#0066cc] uppercase tracking-wider">{product.category}</span>
              <h1 className="text-[32px] md:text-[40px] font-[600] text-[#1d1d1f] leading-[1.1] mt-2">{product.title}</h1>
              <p className="text-[17px] text-[#7a7a7a] mt-4 leading-[1.47]">{product.longDesc || product.desc}</p>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-[600] text-[#1d1d1f]">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-[17px] text-[#7a7a7a] line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <svg aria-hidden="true" className="w-[18px] h-[18px] text-[#ff9f0a]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <span className="text-[14px] font-[500] text-[#1d1d1f]">{product.rating}</span>
                  <span className="text-[14px] text-[#7a7a7a]">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-3 border border-[#e0e0e0] rounded-full px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[17px] font-[500] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-[17px] font-[500] text-[#1d1d1f] min-w-[24px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[17px] font-[500] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-[#7a7a7a]">
                  <svg aria-hidden="true" className="w-[18px] h-[18px] text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  {product.stock}
                </div>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(product)
                  setAdded(true)
                  setQuantity(1)
                  setTimeout(() => setAdded(false), 2000)
                }}
                className={`mt-6 w-full px-8 py-4 rounded-full text-[17px] font-[500] transition-all active:scale-[0.97] ${
                  added || cart.some(p => p.id === product.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-[#0066cc] text-white hover:bg-[#0055aa]'
                }`}
              >
                {added || cart.some(p => p.id === product.id) ? '✓ Added to Cart' : 'Add to Cart — ' + formatPrice(product.price * quantity)}
              </button>

              {product.features && (
                <div className="mt-8 pt-6 border-t border-[#e0e0e0]">
                  <h3 className="text-[14px] font-[600] text-[#1d1d1f] uppercase tracking-wider mb-3">What's Included</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[14px] text-[#7a7a7a]">
                        <svg aria-hidden="true" className="w-[16px] h-[16px] shrink-0 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.whatsIncluded && (
                <div className="mt-4 text-[14px] text-[#7a7a7a]">
                  <span className="font-[500] text-[#1d1d1f]">Files:</span> {product.whatsIncluded}
                </div>
              )}

              <div className="mt-6 flex items-center gap-3 text-[14px] text-[#7a7a7a]">
                <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6v2H8v2h8v-2h-2v-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z" /></svg>
                Compatible with: <span className="font-[500] text-[#1d1d1f]">{product.software}</span>
              </div>
            </div>
          </section>

          {product.screenshots?.length > 0 && (
            <section className="mt-20">
              <h2 className="text-[24px] font-[600] text-[#1d1d1f] mb-6">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.screenshots.map((img, i) => (
                  <div
                    key={i}
                    className="bg-[#f5f5f7] rounded-[18px] overflow-hidden cursor-pointer border border-[#e0e0e0]"
                  >
                    <img src={img} alt="" loading="lazy" className="w-full aspect-video object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-20">
            <h2 className="text-[24px] font-[600] text-[#1d1d1f] mb-6">Reviews</h2>
            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-[48px] font-[400] text-[#1d1d1f]">{product.rating}</div>
                <div className="flex items-center gap-0.5 justify-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg aria-hidden="true" key={i} className={`w-[18px] h-[18px] ${i <= Math.round(product.rating) ? 'text-[#ff9f0a]' : 'text-[#d2d2d7]'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ))}
                </div>
                <p className="text-[14px] text-[#7a7a7a] mt-1">{product.reviews} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const dist = getRatingDistribution(product.id)
                  const pct = dist[star] || 0
                  return (
                    <div key={star} className="flex items-center gap-2 text-[14px]">
                      <span className="text-[#7a7a7a] w-8">{star} ★</span>
                      <div className="flex-1 h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff9f0a] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[#7a7a7a] w-8 text-right">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
            {getProductReviewers(product.id).map((r, i) => (
              <div key={i} className="py-5 border-t border-[#e0e0e0]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[14px] font-[400] text-[#1d1d1f]">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-[600] text-[#1d1d1f]">{r.name}</p>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <svg aria-hidden="true" key={j} className="w-[12px] h-[12px] text-[#ff9f0a]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[12px] text-[#7a7a7a]">{r.time}</span>
                </div>
                <p className="text-[14px] text-[#7a7a7a] leading-[1.47]">{r.text}</p>
              </div>
            ))}
          </section>

          <section className="mt-20 mb-20">
            <h2 className="text-[24px] font-[600] text-[#1d1d1f] mb-6">FAQ</h2>
            <div className="space-y-3 max-w-[700px]">
              {product.faq.map((item, i) => (
                <details key={i} className="group bg-[#f5f5f7] rounded-[11px] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[#1d1d1f] text-[17px] list-none">
                    {item.q}
                    <svg aria-hidden="true" className="w-[18px] h-[18px] text-[#7a7a7a] transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-[17px] text-[#7a7a7a] leading-[1.47]">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section className="border-t border-[#e0e0e0]">
            <div className="max-w-[980px] mx-auto px-4 md:px-6 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[24px] font-[600] text-[#1d1d1f]">Related Designs</h2>
                <Link to="/portfolio" className="text-[14px] text-[#0066cc] hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="block bg-white border border-[#e0e0e0] rounded-[18px] overflow-hidden hover:border-[#0066cc] transition-colors">
                    <div className="bg-[#f5f5f7] aspect-video">
                      {p.image ? (
                        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed]">
                          <ImagePlaceholder standalone className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[12px] font-[400] text-[#7a7a7a] uppercase tracking-wider">{p.category}</p>
                      <h3 className="text-[17px] font-[600] text-[#1d1d1f] mt-1">{p.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[17px] font-[400] text-[#1d1d1f]">{formatPrice(p.price)}</span>
                        <div className="flex items-center gap-1">
                          <svg aria-hidden="true" className="w-[14px] h-[14px] text-[#ff9f0a]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                          <span className="text-[12px] text-[#7a7a7a]">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[#e0e0e0]">
          <div className="max-w-[980px] mx-auto px-4 md:px-6 py-16">
            <h2 className="text-[24px] font-[600] text-[#1d1d1f] mb-8">All Products</h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <svg aria-hidden="true" className="w-10 h-10 text-[#7a7a7a] mb-4 block mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 009.5 3C6.08 3 3.28 5.64 3.03 9h2.02c.23-2.64 2.41-4.7 5.15-4.7 2.84 0 5.15 2.31 5.15 5.15 0 1.61-.74 3.05-1.9 4.05l.27.27v.79l5 4.99L20.49 19l-4.99-5zM5.59 10l-2-2L2 9.41l2 2-2 2L3.59 15l2-2 2 2L8.41 15l-2-2 2-2L7.59 10l-2 2z" /></svg>
                <p className="text-[17px] text-[#7a7a7a]">No designs found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="block bg-white border border-[#e0e0e0] rounded-[18px] overflow-hidden hover:border-[#0066cc] transition-colors">
                    <div className="bg-[#f5f5f7] aspect-video">
                      {p.image ? (
                        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed]">
                          <ImagePlaceholder standalone className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[12px] font-[400] text-[#7a7a7a] uppercase tracking-wider">{p.category}</p>
                      <h3 className="text-[17px] font-[600] text-[#1d1d1f] mt-1">{p.title}</h3>
                      <p className="text-[12px] text-[#7a7a7a] mt-1 line-clamp-2">{p.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[17px] font-[400] text-[#1d1d1f]">{formatPrice(p.price)}</span>
                        <div className="flex items-center gap-1">
                          <svg aria-hidden="true" className="w-[14px] h-[14px] text-[#ff9f0a]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                          <span className="text-[12px] text-[#7a7a7a]">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
