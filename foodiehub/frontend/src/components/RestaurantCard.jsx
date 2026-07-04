import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="card overflow-hidden cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {restaurant.offer && (
          <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {restaurant.offer}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-maroon">{restaurant.name}</h3>
          <span className="flex items-center gap-1 text-sm bg-green-600/10 text-green-700 px-2 py-0.5 rounded-full font-medium">
            ★ {restaurant.rating}
          </span>
        </div>
        <p className="text-sm text-stone-500 mt-1">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between mt-3 text-sm text-stone-500">
          <span>⏱ {restaurant.deliveryTime}</span>
        </div>
      </div>
    </div>
  )
}
