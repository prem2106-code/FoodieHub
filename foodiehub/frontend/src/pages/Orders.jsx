import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import { useCart } from '../context/CartContext.jsx'
import toast from 'react-hot-toast'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/orders/my-orders')
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false))
  }, [])

  const orderAgain = (order) => {
    order.items.forEach((item) => {
      addToCart(
        { id: item.foodId, name: item.name, price: item.price, image: item.image },
        order.restaurantId,
        order.restaurantName,
        item.quantity
      )
    })
    toast.success('Items added to cart')
    navigate('/cart')
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-16 text-center text-stone-500">Loading your orders...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-6xl mb-4">📦</p>
        <h2 className="text-2xl font-bold text-maroon mb-2">No orders yet</h2>
        <p className="text-stone-500 mb-6">Your order history will show up here.</p>
        <Link to="/menu" className="btn-primary">Order Now</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-6">My Orders</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-maroon">{order.restaurantName}</h3>
                <p className="text-xs text-stone-400">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
              <span className="text-xs font-semibold bg-ember/10 text-ember px-3 py-1 rounded-full">
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            <p className="text-sm text-stone-600 mb-3">
              {order.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-stone-800">₹{order.grandTotal.toFixed(2)} · {order.paymentMethod}</span>
              <div className="flex gap-3">
                <Link to={`/track-order/${order.id}`} className="text-ember font-medium hover:underline">
                  Track
                </Link>
                <button onClick={() => orderAgain(order)} className="text-maroon font-medium hover:underline">
                  Order Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
