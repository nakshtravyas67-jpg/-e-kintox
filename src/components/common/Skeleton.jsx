export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-[#e8e8ed] rounded-[8px] ${className}`}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden">
      <Skeleton className="h-48 w-full !rounded-none" />
      <div className="p-6 bg-white space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-16 !rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function OrderSkeleton() {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-3 w-48" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-8 w-28 !rounded-full mt-2" />
    </div>
  )
}

export function ImageSkeleton({ className = 'w-full h-48' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Skeleton className="w-full h-full !rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  )
}