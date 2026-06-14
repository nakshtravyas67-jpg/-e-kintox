import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kintox_wishlist') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('kintox_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id)
      return exists ? prev.filter(p => p.id !== product.id) : [...prev, product]
    })
  }, [])

  const inWishlist = useCallback((id) => {
    return wishlist.some(p => p.id === id)
  }, [wishlist])

  const wishlistCount = useMemo(() => wishlist.length, [wishlist])

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, inWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
