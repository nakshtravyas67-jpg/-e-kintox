import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kintox_cart') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('kintox_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + qty } : p)
      }
      return [...prev, { ...product, quantity: qty }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }, [])

  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) return
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = useMemo(() => cart.reduce((sum, p) => sum + p.quantity, 0), [cart])
  const cartTotal = useMemo(() => cart.reduce((sum, p) => sum + p.price * p.quantity, 0), [cart])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
