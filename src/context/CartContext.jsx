import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kintox_cart') || '[]') } catch { return [] }
  })

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev
      const next = [...prev, { ...product, quantity: 1 }]
      localStorage.setItem('kintox_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const next = prev.filter(p => p.id !== id)
      localStorage.setItem('kintox_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const cartCount = useMemo(() => cart.length, [cart])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
