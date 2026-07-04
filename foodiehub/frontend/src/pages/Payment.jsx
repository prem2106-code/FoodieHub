import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios.js'
import { useCart } from '../context/CartContext.jsx'

const METHODS = [
  { id: 'UPI', label: 'UPI' },
  { id: 'CARD', label: 'Credit / Debit Card' },
  { id: 'NETBANKING', label: 'Net Banking' },
  { id: 'COD', label: 'Cash on Delivery' },
  { id: 'RAZORPAY', label: 'Razorpay (Test Mode)' },
]

export default function Payment() {
  const { items, restaurantId, restaurantName, grandTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [method, setMethod] = useState('UPI')
  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handlePay = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: order } = await api.post('/orders', {
        restaurantId,
        restaurantName,
        items,
        deliveryAddress: address,
        mobileNumber: mobile,
        paymentMethod: method,
      })
      clearCart()
      toast.success('Payment successful!')
      navigate('/thank-you', { state: { order } })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-1">Payment</h1>
      <p className="text-stone-500 mb-6">Total amount: <span className="font-semibold text-maroon">₹{grandTotal.toFixed(2)}</span></p>

      <form onSubmit={handlePay} className="card p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-stone-600 mb-1 block">Delivery Address</label>
          <textarea
            required value={address} onChange={(e) => setAddress(e.target.value)}
            className="input-field" rows={3}
            placeholder="House no, street, city, pincode"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600 mb-1 block">Mobile Number</label>
          <input
            required value={mobile} onChange={(e) => setMobile(e.target.value)}
            className="input-field" placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600 mb-2 block">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            {METHODS.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition ${
                  method === m.id ? 'border-ember bg-ember/5' : 'border-stone-200'
                }`}
              >
                <input
                  type="radio" name="method" value={m.id}
                  checked={method === m.id} onChange={() => setMethod(m.id)}
                  className="accent-ember"
                />
                <span className="text-sm">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Processing Payment...' : `Pay ₹${grandTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}
