import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative z-10 text-center px-6 max-w-2xl fade-in">
        <p className="uppercase tracking-[0.3em] text-gold text-sm mb-4">Premium Food Delivery</p>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-4">
          Welcome to FoodieHub
        </h1>
        <p className="text-xl text-white/90 font-display italic mb-3">
          Fresh Food. Fast Delivery. Happiness at Your Doorstep.
        </p>
        <p className="text-white/70 mb-10 leading-relaxed">
          Order from your favourite restaurants — from crispy fried chicken to authentic
          South Indian meals — and get it delivered hot, fresh, and fast.
        </p>
        <button onClick={() => navigate('/signup')} className="btn-primary text-lg">
          Let's Start →
        </button>
      </div>
    </div>
  )
}
