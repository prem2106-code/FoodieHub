import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios.js'

export default function Profile() {
  const [form, setForm] = useState({ fullName: '', mobileNumber: '', address: '', profileImage: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/users/me')
      .then((res) => setForm({
        fullName: res.data.fullName || '',
        mobileNumber: res.data.mobileNumber || '',
        address: res.data.address || '',
        profileImage: res.data.profileImage || '',
      }))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((f) => ({ ...f, profileImage: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/users/me', form)
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="max-w-xl mx-auto px-6 py-16 text-center text-stone-500">Loading profile...</div>
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-6">My Profile</h1>

      <form onSubmit={handleSave} className="card p-6 space-y-4">
        <div className="flex justify-center mb-2">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gold/50 flex items-center justify-center overflow-hidden bg-white/50">
              {form.profileImage ? (
                <img src={form.profileImage} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-stone-400">Add Photo</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600 mb-1 block">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-600 mb-1 block">Mobile Number</label>
          <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-600 mb-1 block">Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} className="input-field" rows={3} />
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
