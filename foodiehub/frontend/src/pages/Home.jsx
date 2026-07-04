import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/restaurants')
      .then((res) => setRestaurants(res.data))
      .finally(() => setLoading(false))
  }, [])

  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div
          className="h-72 sm:h-96 bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139,30,30,0.85), rgba(232,93,40,0.55)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600')",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 text-white">
            <p className="uppercase tracking-widest text-sm text-gold mb-2">Good to see you</p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-3">
              Hungry, {user?.fullName?.split(' ')[0]}?
            </h1>
            <p className="text-white/85 max-w-md mb-6">
              Explore top-rated restaurants and get your favourite food delivered fresh & fast.
            </p>
            <button onClick={() => navigate('/menu')} className="btn-primary">
              Order Now
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Top rated */}
        <section>
          <h2 className="text-2xl font-bold text-maroon mb-1">Top-Rated Restaurants</h2>
          <p className="text-stone-500 mb-6 text-sm">Loved by FoodieHub customers</p>
          {loading ? (
            <SkeletonGrid />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRated.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          )}
        </section>

        {/* All restaurants */}
        <section>
          <h2 className="text-2xl font-bold text-maroon mb-1">All Restaurants</h2>
          <p className="text-stone-500 mb-6 text-sm">Pick a place, build your order</p>
          {loading ? (
            <SkeletonGrid />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-bold text-maroon mb-6">What Customers Say</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Aarav K.', text: 'Food arrived hot and exactly on time. The biryani is unbeatable!' },
              { name: 'Divya S.', text: 'Beautiful app, super easy to order, and the tracking is accurate.' },
              { name: 'Rohan M.', text: 'Great variety of restaurants — my go-to for weekend orders now.' },
            ].map((rev) => (
              <div key={rev.name} className="card p-6">
                <p className="text-gold mb-2">★★★★★</p>
                <p className="text-stone-600 italic mb-3">"{rev.text}"</p>
                <p className="text-sm font-semibold text-maroon">— {rev.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-maroon mb-3">About FoodieHub</h2>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
            FoodieHub connects you with the best restaurants in town, from beloved fast-food
            chains to authentic local kitchens. We focus on fast delivery, fair pricing, and
            a smooth ordering experience — from browsing the menu to tracking your order in
            real time.
          </p>
        </section>
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card overflow-hidden animate-pulse">
          <div className="h-44 bg-stone-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-stone-200 rounded w-2/3" />
            <div className="h-3 bg-stone-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
