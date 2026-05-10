import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Plans ───
export const fetchPlans = (category = 'all') =>
  api.get('/plans', { params: category !== 'all' ? { category } : {} })

export const fetchPlanById = (planId) => api.get(`/plans/${planId}`)

export const seedPlans = () => api.post('/plans/seed')

// ─── Contact ───
export const submitContact = (data) => api.post('/contact', data)

// ─── Leads ───
export const submitLead = (data) => api.post('/leads', data)

export default api
