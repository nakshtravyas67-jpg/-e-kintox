import { motion } from 'framer-motion'

const brands = [
  { name: 'Google', d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z' },
  { name: 'Stripe', d: 'M13.98 11.08c0-1.2-.6-1.82-1.8-1.82h-1.8v3.64h1.8c1.2 0 1.8-.62 1.8-1.82zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.4c-3.54 0-6.4-2.86-6.4-6.4s2.86-6.4 6.4-6.4 6.4 2.86 6.4 6.4-2.86 6.4-6.4 6.4zm2.18-8.42c.64.5 1.02 1.24 1.02 2.12 0 1.8-1.36 2.8-3.2 2.8h-2.1v4H8.4V8.88h3.7c1.7 0 3.08.72 3.08 2.1z' },
  { name: 'Shopify', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.42 7.96c-.2.1-.42.16-.64.16-.46 0-.88-.24-1.12-.62-.1-.16-.16-.34-.16-.52 0-.22.06-.44.18-.62.06-.1.14-.18.24-.24.02-.02.04-.02.06-.04.02-.02.04-.02.06 0 .24.04.42.22.46.46l1.3-.3c-.14-.64-.64-1.14-1.28-1.28l-.3 1.3c.24.04.42.22.46.46l.08.04zm-2.22 2.7c-.24.12-.5.18-.78.18-.3 0-.6-.08-.86-.24s-.46-.38-.6-.66c-.14-.28-.22-.58-.22-.9s.08-.62.22-.9c.14-.28.34-.5.6-.66s.54-.24.84-.24c.28 0 .54.06.78.18l.3-1.3c-.5-.22-1.04-.34-1.6-.34-.58 0-1.12.12-1.64.34-.5.22-.94.54-1.3.94-.36.4-.64.86-.84 1.4s-.3 1.14-.3 1.78c0 .64.1 1.24.3 1.78s.48 1 .84 1.4c.36.4.8.72 1.3.94.5.22 1.06.34 1.64.34.56 0 1.1-.12 1.6-.34l-.3-1.3z' },
  { name: 'Figma', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-12h4c1.66 0 3 .9 3 2s-1.34 2-3 2h-4V5zm5 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z' },
  { name: 'Notion', d: 'M4.46 3.25c.45.36.75.44 1.4.53l12.56 1.63c.17.02.3-.13.3-.3V3.2c0-.44-.15-.73-.72-.87L5.2.5C4.76.4 4.3.57 4.46 3.25zm.3 4.48v11.5c0 .58.3.87.87.94l13.6 1.74c.37.04.6-.16.6-.52V9.84c0-.52-.3-.82-.75-.9l-14.1-1.7c-.16-.03-.22.08-.22.49zm14.56 1.2c0 .23-.16.36-.4.33l-1.15-.14v8.48c0 .37-.22.58-.55.58-.33 0-.55-.2-.55-.58V9.1l-1.15-.14c-.24-.03-.4-.16-.4-.33 0-.23.16-.36.4-.33l2.53.3c.13.02.2.08.23.14l.03.4v.15l.1-.1c.05-.07.13-.12.22-.12.14 0 .22.08.22.23zm-9.46 8.38l-.15 3.15c0 .25.13.4.37.43l3.5.42c.22.03.35-.1.37-.33l.15-3.07-.37-.45-3.5 1.26-.37.17v1.14z' },
]

export default function TrustedBy() {
  return (
    <section className="py-16 md:py-20 bg-[#FAFAFA] border-t border-[#E8E8ED]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[10px] text-[#6E6E73] uppercase tracking-[0.2em] font-semibold mb-8"
        >
          Trusted by industry leaders
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d={brand.d} /></svg>
              <span className="text-sm font-semibold">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
