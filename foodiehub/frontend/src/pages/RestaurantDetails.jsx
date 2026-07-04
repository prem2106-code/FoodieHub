import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios.js'
import FoodCard from '../components/FoodCard.jsx'

export default function RestaurantDetails() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [foods, setFoods] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get(`/restaurants/${id}`),
      api.get(`/foods/restaurant/${id}`),
    ])
      .then(([restRes, foodRes]) => {
        setRestaurant(restRes.data)
        setFoods(foodRes.data)
      })
      .finally(() => setLoading(false))
  }, [id])

  const categories = ['All', ...new Set(foods.map((f) => f.category))]
  const visibleFoods = activeCategory === 'All'
    ? foods
    : foods.filter((f) => f.category === activeCategory)

  if (loading) {
    return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-stone-500">Loading menu...</div>
  }

  if (!restaurant) {
    return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-stone-500">Restaurant not found.</div>
  }

  return (
    <div>
      {/* Banner */}
      <div
        className="h-56 sm:h-72 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${restaurant.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 pb-6 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-white/85">{restaurant.cuisine}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="bg-green-600 px-2 py-0.5 rounded-full font-medium">★ {restaurant.rating}</span>
            <span>⏱ {restaurant.deliveryTime}</span>
            {restaurant.offer && <span className="text-gold">{restaurant.offer}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-stone-600 mb-6">{restaurant.description}</p>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-ember text-white shadow'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-ember'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {visibleFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
