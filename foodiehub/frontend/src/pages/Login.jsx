import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/home')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-cream px-4">
      <div className="card w-full max-w-md p-8 fade-in">
        <h2 className="text-3xl font-bold text-maroon text-center mb-1">Welcome Back</h2>
        <p className="text-center text-stone-500 mb-6 text-sm">Log in to continue ordering</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email" type="email" placeholder="Email Address" required
            value={form.email} onChange={handleChange} className="input-field"
          />
          <input
            name="password" type="password" placeholder="Password" required
            value={form.password} onChange={handleChange} className="input-field"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-ember font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
