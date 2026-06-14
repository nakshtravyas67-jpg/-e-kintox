import { Link } from 'react-router-dom'

export default function KintoxLogo({ dark = false, size = 'default', showTagline = false }) {
  const textColor = dark ? 'text-white' : 'text-[#1D1D1F]'
  const tagColor = dark ? 'text-white/40' : 'text-[#6E6E73]'
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'
  const tagSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-[9px]'

  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
      <svg aria-hidden="true" width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#0066cc" />
            <stop offset="100%" stopColor="#0071E3" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#logoGrad)" />
        <path
          d="M10 8L16 16L10 24M22 8L16 16L22 24"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 16H25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`${textSize} font-semibold tracking-tight transition-colors duration-300 ${textColor}`}>
          KINTOX
        </span>
        {showTagline && (
          <span className={`${tagSize} tracking-wider transition-colors duration-300 ${tagColor}`}>
            PREMIUM GRAPHICS DESIGN
          </span>
        )}
      </div>
    </Link>
  )
}
