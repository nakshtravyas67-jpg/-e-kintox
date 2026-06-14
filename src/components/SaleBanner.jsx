import { Link } from 'react-router-dom'
import { Timer, ArrowRight, CheckCircle, Sparkles, ShieldCheck, Lock } from 'lucide-react'

export default function SaleBanner({ timeLeft, onBrowseAll }) {
  return (
    <div className="mb-16 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F5F5F7] via-white to-[#F0F4FF] border border-[#E8E8ED]">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0071E3]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00C6FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-[#0071E3] uppercase tracking-[0.15em] bg-[#0071E3]/8 px-4 py-1.5 rounded-full">Limited Time Offer</span>
            <span className="flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full">
              <span className="text-xs">🔥</span> Best Seller
            </span>
          </div>
          <h2 className="text-[#1D1D1F] text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.03em]">
            Summer <span className="text-[#0071E3]">Design</span> Sale
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-[#6E6E73] text-lg leading-relaxed max-w-lg">
              Up to <strong className="text-[#1D1D1F]">50% OFF</strong> on Premium UI Kits, Website Templates, App Designs, YouTube Thumbnail Packs, and Social Media Assets.
            </p>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1D1D1F] bg-[#F5F5F7] px-3 py-1.5 rounded-full shrink-0">
              <Timer className="w-4 h-4 text-[#0071E3]" />
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.mins).padStart(2, '0')}:{String(timeLeft.secs).padStart(2, '0')}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/product/1" className="inline-flex items-center gap-2 bg-[#0071E3] text-white px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-[#0077ED] transition-all shadow-lg shadow-[#0071E3]/20 active:scale-[0.97]">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={onBrowseAll} className="inline-flex items-center gap-2 bg-white text-[#1D1D1F] px-8 py-4 rounded-2xl font-semibold text-sm border border-[#E8E8ED] hover:border-[#0071E3] hover:text-[#0071E3] transition-all active:scale-[0.97] cursor-pointer">
              Browse All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-6 pt-4">
            {[
              { icon: CheckCircle, text: 'Instant Download' },
              { icon: ShieldCheck, text: 'Commercial License' },
              { icon: Sparkles, text: 'Premium Quality' },
              { icon: Lock, text: 'Lifetime Access' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-[#6E6E73]">
                <b.icon className="w-5 h-5 text-[#0071E3]" />
                {b.text}
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-xl border border-white/40 animate-bounce-slow flex items-center gap-2 z-10">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-md">⭐</span>
            <span className="text-xs font-semibold text-[#1D1D1F]">Top Rated</span>
          </div>
          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-xl border border-white/40 animate-bounce-slow flex items-center gap-2 z-10" style={{ animationDelay: '1.5s' }}>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-bold rounded-md">🚀</span>
            <span className="text-xs font-semibold text-[#1D1D1F]">New Collection</span>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {[
              { gradient: 'from-[#0071E3] to-[#00C6FF]', label: 'Web Design', sub: 'UI Kit', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V4.07c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z' },
              { gradient: 'from-[#7C3AED] to-[#EC4899]', label: 'App UI', sub: 'Mobile Kit', icon: 'M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z' },
              { gradient: 'from-[#F59E0B] to-[#EF4444]', label: 'Thumbnail', sub: 'Pack', icon: 'M22 3H2v15h7l-2 2v1h10v-1l-2-2h7V3zm-2 13H4V5h16v11z' },
              { gradient: 'from-[#10B981] to-[#3B82F6]', label: 'Poster', sub: 'Design', icon: 'M19 9l1.26-2.75L23 5l-2.74-1.26L19 1l-1.26 2.74L15 5l2.74 1.26L19 9zm-9 2l-1.26 2.74L6 15l2.74 1.26L10 19l1.26-2.74L14 15l-2.74-1.26L10 11zm9 4l-1.26 2.74L15 19l2.74 1.26L19 23l1.26-2.74L23 19l-2.74-1.26L19 15z' },
            ].map((item, i) => (
              <div key={item.label} className={`bg-white rounded-2xl overflow-hidden shadow-xl ${i % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'} hover:rotate-0 transition-all duration-500 ${i === 2 ? '-mt-4' : ''} ${i === 1 ? 'mt-4' : ''}`}>
                <div className={`h-24 md:h-32 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <svg aria-hidden="true" className="w-8 h-8 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={item.icon} /></svg>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs font-semibold text-[#1D1D1F]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
