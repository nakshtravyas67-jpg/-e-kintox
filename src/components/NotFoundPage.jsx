import { Link } from 'react-router-dom'
import SEO from './SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 — Page not found" description="The page you're looking for doesn't exist or has been moved." path="*" />
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-[980px] text-center">
          <p className="text-[56px] font-[600] text-[#1d1d1f] leading-none mb-2">404</p>
          <h1 className="text-[40px] font-[600] text-[#1d1d1f] mb-3">Page not found</h1>
          <p className="text-[17px] text-[#7a7a7a] mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  )
}
