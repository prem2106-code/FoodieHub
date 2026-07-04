import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const {
    items, restaurantName, updateQuantity, removeFromCart,
    subtotal, gst, deliveryCharge, grandTotal,
  } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-maroon mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-6">Add some delicious food to get started.</p>
        <Link to="/menu" className="btn-primary">Browse Restaurants</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-1">Your Cart</h1>
      <p className="text-stone-500 mb-6">Ordering from <span className="font-semibold">{restaurantName}</span></p>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.foodId} className="card p-4 flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1">
              <h4 className="font-semibold text-stone-800">{item.name}</h4>
              <p className="text-maroon font-medium">₹{item.price}</p>
            </div>
            <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
              <button
                onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                className="px-3 py-1 hover:bg-stone-100"
              >−</button>
              <span className="px-3 text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                className="px-3 py-1 hover:bg-stone-100"
              >+</button>
            </div>
            <button
              onClick={() => removeFromCart(item.foodId)}
              className="text-red-500 text-sm font-medium hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-lg text-maroon mb-4">Bill Summary</h3>
        <div className="space-y-2 text-sm text-stone-600">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>GST (5%)</span><span>₹{gst.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Delivery Charge</span><span>₹{deliveryCharge.toFixed(2)}</span></div>
          <div className="border-t border-stone-200 my-2" />
          <div className="flex justify-between text-base font-bold text-maroon">
            <span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={() => navigate('/payment')} className="btn-primary w-full mt-6">
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
