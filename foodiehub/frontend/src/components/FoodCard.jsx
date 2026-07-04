import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function FoodCard({ food, restaurantId, restaurantName }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  return (
    <div className="card overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-300">
      <img src={food.image} alt={food.name} className="w-full sm:w-40 h-40 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-stone-800">{food.name}</h4>
            <span
              className={`shrink-0 w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                food.veg ? 'border-green-600' : 'border-red-600'
              }`}
              title={food.veg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span className={`w-2 h-2 rounded-full ${food.veg ? 'bg-green-600' : 'bg-red-600'}`} />
            </span>
          </div>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{food.description}</p>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="text-gold font-medium">★ {food.rating}</span>
            <span className="font-semibold text-maroon">₹{food.price}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 hover:bg-stone-100"
            >
              −
            </button>
            <span className="px-3 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 hover:bg-stone-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => addToCart(food, restaurantId, restaurantName, quantity)}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
