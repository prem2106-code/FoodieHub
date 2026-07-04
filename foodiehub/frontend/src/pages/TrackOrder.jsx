import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios.js'

const STAGES = [
  { key: 'PLACED', label: 'Order Placed', icon: '📝' },
  { key: 'PREPARING', label: 'Preparing Food', icon: '👨‍🍳' },
  { key: 'PICKED_UP', label: 'Picked Up', icon: '📦' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: '🛵' },
  { key: 'DELIVERED', label: 'Delivered', icon: '🎉' },
]

export default function TrackOrder() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data))
  }, [id])

  if (!order) {
    return <div className="max-w-2xl mx-auto px-6 py-16 text-center text-stone-500">Loading order status...</div>
  }

  const currentIndex = STAGES.findIndex((s) => s.key === order.status)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-maroon mb-1">Track Your Order</h1>
      <p className="text-stone-500 mb-10">Order ID: <span className="font-mono">{order.id}</span></p>

      <div className="card p-8">
        {STAGES.map((stage, i) => {
          const done = i <= currentIndex
          return (
            <div key={stage.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                    done ? 'bg-ember text-white' : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {stage.icon}
                </div>
                {i < STAGES.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[2.5rem] ${done ? 'bg-ember' : 'bg-stone-200'}`} />
                )}
              </div>
              <div className="pb-8">
                <p className={`font-semibold ${done ? 'text-maroon' : 'text-stone-400'}`}>{stage.label}</p>
                {i === currentIndex && <p className="text-sm text-ember">Current status</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
