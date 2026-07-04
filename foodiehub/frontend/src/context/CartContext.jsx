import React, { createContext, useContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

const GST_RATE = 0.05
const DELIVERY_CHARGE = 40

export function CartProvider({ children }) {
  const [restaurantId, setRestaurantId] = useState(null)
  const [restaurantName, setRestaurantName] = useState(null)
  const [items, setItems] = useState([]) // { foodId, name, price, quantity, image }

  const addToCart = (food, restId, restName, quantity = 1) => {
    if (restaurantId && restaurantId !== restId) {
      toast.error('Your cart has items from another restaurant. Clear cart first.')
      return
    }
    setRestaurantId(restId)
    setRestaurantName(restName)

    setItems((prev) => {
      const existing = prev.find((i) => i.foodId === food.id)
      if (existing) {
        return prev.map((i) =>
          i.foodId === food.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        { foodId: food.id, name: food.name, price: food.price, quantity, image: food.image },
      ]
    })
    toast.success(`${food.name} added to cart`)
  }

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId)
      return
    }
    setItems((prev) => prev.map((i) => (i.foodId === foodId ? { ...i, quantity } : i)))
  }

  const removeFromCart = (foodId) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.foodId !== foodId)
      if (next.length === 0) {
        setRestaurantId(null)
        setRestaurantName(null)
      }
      return next
    })
  }

  const clearCart = () => {
    setItems([])
    setRestaurantId(null)
    setRestaurantName(null)
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const gst = items.length ? Math.round(subtotal * GST_RATE * 100) / 100 : 0
    const deliveryCharge = items.length ? DELIVERY_CHARGE : 0
    const grandTotal = Math.round((subtotal + gst + deliveryCharge) * 100) / 100
    return { subtotal, gst, deliveryCharge, grandTotal }
  }, [items])

  return (
    <CartContext.Provider
      value={{
        restaurantId,
        restaurantName,
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        ...totals,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
