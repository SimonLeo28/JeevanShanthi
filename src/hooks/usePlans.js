import { useState, useEffect } from 'react'
import { fetchPlans } from '../data/api'

export default function usePlans(category = 'all') {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchPlans(category)
      .then(res => {
        if (!cancelled) setPlans(res.data.data || [])
      })
      .catch(err => {
        if (!cancelled) {
          console.error('Failed to fetch plans:', err)
          setError('Unable to load plans. Please try again.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [category])

  return { plans, loading, error }
}
