import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated) return null

  const linkClass = "text-stone-700 hover:text-ember font-medium transition-colors"

  return (
    <nav className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-gold/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-display font-bold text-maroon">
          Foodie<span className="text-ember">Hub</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/home" className={linkClass}>Home</Link>
          <Link to="/menu" className={linkClass}>Menu</Link>
          <Link to="/orders" className={linkClass}>My Orders</Link>
          <Link to="/cart" className={`${linkClass} relative`}>
            Cart
            {items.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-ember text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items.reduce((n, i) => n + i.quantity, 0)}
              </span>
            )}
          </Link>
          <Link to="/profile" className={linkClass}>Profile</Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-stone-500">Hi, {user?.fullName?.split(' ')[0]}</span>
          <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex justify-around border-t border-gold/20 py-2 bg-cream/90">
        <Link to="/home" className="text-xs text-stone-600">Home</Link>
        <Link to="/menu" className="text-xs text-stone-600">Menu</Link>
        <Link to="/orders" className="text-xs text-stone-600">Orders</Link>
        <Link to="/cart" className="text-xs text-stone-600">Cart ({items.length})</Link>
        <Link to="/profile" className="text-xs text-stone-600">Profile</Link>
      </div>
    </nav>
  )
}
