import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from './SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 — Page not found" description="The page you're looking for doesn't exist or has been moved." path="*" />
      <div className="min-h-screen bg-white text-[#1D1D1F] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg px-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[120px] md:text-[160px] font-headline-lg font-extrabold leading-none text-[#F5F5F7] select-none"
          >
            404
          </motion.div>
          <h1 className="font-headline-lg text-headline-lg text-[#1D1D1F] -mt-10 mb-4">Page not found</h1>
          <p className="text-[#6E6E73] text-lg mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#0071E3] text-white px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#0077ED] transition-all shadow-lg shadow-[#0071E3]/20 active:scale-[0.97]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
              Go Home
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 bg-[#F5F5F7] text-[#1D1D1F] px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#E8E8ED] transition-all active:scale-[0.97]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.36 9l.6 4H5.04l.6-4h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5z" /></svg>
              Browse Store
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
