import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function ThankYou() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const order = state?.order

  if (!order) {
    navigate('/home')
    return null
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card p-10 max-w-md w-full text-center fade-in relative overflow-hidden">
        {/* simple confetti dots */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: ['#D4A017', '#E85D28', '#8B1E1E'][i % 3],
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-4xl text-green-600">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-maroon mb-2">Thank You for Your Order ❤️</h1>
          <p className="text-stone-500 mb-1">Order ID</p>
          <p className="font-mono font-semibold text-stone-800 mb-6">{order.id}</p>

          <div className="text-left bg-white/60 rounded-xl p-4 mb-6 text-sm space-y-1">
            <div className="flex justify-between"><span>Restaurant</span><span className="font-medium">{order.restaurantName}</span></div>
            <div className="flex justify-between"><span>Amount Paid</span><span className="font-medium">₹{order.grandTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Payment Method</span><span className="font-medium">{order.paymentMethod}</span></div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => navigate(`/track-order/${order.id}`)} className="btn-primary w-full">
              Track Order
            </button>
            <button onClick={() => window.print()} className="btn-outline w-full">
              Download Invoice
            </button>
            <Link to="/home" className="text-sm text-stone-500 hover:text-ember mt-1">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
