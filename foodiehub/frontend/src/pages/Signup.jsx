import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [profileImage, setProfileImage] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setProfileImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await signup({ ...form, profileImage })
      toast.success('Account created! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-cream px-4 py-10">
      <div className="card w-full max-w-md p-8 fade-in">
        <h2 className="text-3xl font-bold text-maroon text-center mb-1">Create Account</h2>
        <p className="text-center text-stone-500 mb-6 text-sm">Join FoodieHub and start ordering</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gold/50 flex items-center justify-center overflow-hidden bg-white/50">
                {profileImage ? (
                  <img src={profileImage} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-stone-400 text-center px-2">Add Photo</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>

          <input
            name="fullName" placeholder="Full Name" required
            value={form.fullName} onChange={handleChange} className="input-field"
          />
          <input
            name="mobileNumber" placeholder="Mobile Number" required
            value={form.mobileNumber} onChange={handleChange} className="input-field"
          />
          <input
            name="email" type="email" placeholder="Email Address" required
            value={form.email} onChange={handleChange} className="input-field"
          />
          <input
            name="password" type="password" placeholder="Password" required
            value={form.password} onChange={handleChange} className="input-field"
          />
          <input
            name="confirmPassword" type="password" placeholder="Confirm Password" required
            value={form.confirmPassword} onChange={handleChange} className="input-field"
          />

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-ember font-semibold">Log In</Link>
        </p>
      </div>
    </div>
  )
}
