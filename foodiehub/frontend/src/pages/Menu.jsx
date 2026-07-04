import React, { useEffect, useState } from 'react'
import api from '../api/axios.js'
import RestaurantCard from '../components/RestaurantCard.jsx'

export default function Menu() {
  const [restaurants, setRestaurants] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/restaurants')
      .then((res) => setRestaurants(res.data))
      .finally(() => setLoading(false))
  }, [])

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-2">Restaurants Near You</h1>
      <p className="text-stone-500 mb-6">Choose a restaurant to see the full menu</p>

      <input
        type="text"
        placeholder="Search restaurants or cuisine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field max-w-md mb-8"
      />

      {loading ? (
        <p className="text-stone-500">Loading restaurants...</p>
      ) : filtered.length === 0 ? (
        <p className="text-stone-500">No restaurants match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
    </div>
  )
}
