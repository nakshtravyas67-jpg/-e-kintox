import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[980px] px-6 py-20 text-center">
        <h2 className="text-[40px] font-[600] leading-[1.1] text-[#1d1d1f] mb-4">
          Ready to create something <br className="hidden md:block" />
          extraordinary?
        </h2>
        <p className="text-[17px] font-[400] text-[#7a7a7a] max-w-[680px] mx-auto mb-10">
          Let&apos;s discuss your project and create something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/services" className="btn-primary">
            Start Your Project
          </Link>
          <a href="mailto:nakshtr.144@gmail.com" className="btn-secondary-pill">
            Book a Call
          </a>
        </div>
      </div>
    </section>
  )
}
