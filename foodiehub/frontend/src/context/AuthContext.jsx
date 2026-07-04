import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('foodiehub_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    const loggedInUser = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    }
    localStorage.setItem('foodiehub_token', data.token)
    localStorage.setItem('foodiehub_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    return loggedInUser
  }

  const signup = async (payload) => {
    await api.post('/auth/signup', payload)
  }

  const logout = () => {
    localStorage.removeItem('foodiehub_token')
    localStorage.removeItem('foodiehub_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
