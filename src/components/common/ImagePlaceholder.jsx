import { Image } from 'lucide-react'

export default function ImagePlaceholder({ className = 'w-12 h-12', containerClassName, standalone, iconColor }) {
  if (standalone) {
    return <Image className={`${iconColor || 'text-[#b0b0b5]'} ${className}`} />
  }
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] ${containerClassName || ''}`}>
      <Image className={`${iconColor || 'text-[#b0b0b5]'} ${className}`} />
    </div>
  )
}
