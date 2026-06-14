const brands = ['Adobe', 'Figma', 'Canva', 'Webflow', 'Shopify']

export default function TrustedBy() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        <p className="text-center text-[14px] font-normal text-[#7a7a7a] uppercase tracking-wider mb-8">
          Trusted by creators worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {brands.map((brand) => (
            <span key={brand} className="text-[21px] font-semibold text-[#1d1d1f] opacity-25">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
