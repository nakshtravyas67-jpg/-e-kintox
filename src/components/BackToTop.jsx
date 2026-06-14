import { ArrowUp } from 'lucide-react'

export default function BackToTop({ visible }) {
  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 rounded-full bg-[#1D1D1F] text-white shadow-xl hover:bg-[#0071E3] transition-all flex items-center justify-center cursor-pointer active:scale-90 animate-bounce-slow"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  )
}
