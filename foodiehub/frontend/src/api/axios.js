import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
})

// Attach the JWT token (if present) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('foodiehub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the token is invalid/expired, bounce the user back to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('foodiehub_token')
      localStorage.removeItem('foodiehub_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
