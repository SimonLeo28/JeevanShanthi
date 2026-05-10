import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import PlanCard from '../components/PlanCard'
import Loader from '../components/Loader'
import usePlans from '../hooks/usePlans'
import { PLAN_CATEGORIES } from '../data/constants'

export default function PlansPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCat, setActiveCat] = useState(searchParams.get('category') || 'all')
  const { plans, loading, error } = usePlans(activeCat)

  const handleCat = (id) => {
    setActiveCat(id)
    setSearchParams(id !== 'all' ? { category: id } : {})
  }

  // Group plans by category for "all" view
  const grouped = PLAN_CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
    ...cat,
    plans: plans.filter(p => p.category === cat.id),
  })).filter(g => g.plans.length > 0)

  return (
    <>
      <PageHero
        title="LIC Insurance Plans"
        subtitle="Comprehensive plans for every life stage and financial goal"
        crumbs={[{ label: 'LIC Plans' }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {PLAN_CATEGORIES.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleCat(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200
                  ${activeCat === id
                    ? 'bg-navy-600 text-white border-navy-600 shadow-md'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-navy-400 hover:text-navy-600'
                  }`}
              >
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <p className="text-gray-400 text-sm">Make sure the backend server is running and plans are seeded.<br/>
                Run: <code className="bg-gray-100 px-2 py-0.5 rounded">POST /api/plans/seed</code>
              </p>
            </div>
          )}

          {loading ? (
            <Loader />
          ) : activeCat === 'all' ? (
            /* Grouped by category */
            <div className="space-y-14">
              {grouped.map(group => (
                <div key={group.id}>
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <span className="text-4xl">{group.icon}</span>
                    <div>
                      <h3 className="font-serif text-3xl font-bold text-gray-900">{group.label}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">{group.plans.length} plan{group.plans.length !== 1 ? 's' : ''} available</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.plans.map((plan, i) => (
                      <PlanCard key={plan._id} plan={plan} index={i} />
                    ))}
                  </div>
                </div>
              ))}
              {grouped.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-400">
                  No plans found. <button onClick={() => fetch('/api/plans/seed', { method: 'POST' }).then(() => window.location.reload())} className="text-navy-600 underline">Seed plans</button>
                </div>
              )}
            </div>
          ) : (
            /* Filtered by category */
            <motion.div
              key={activeCat}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            >
              {plans.map((plan, i) => (
                <PlanCard key={plan._id} plan={plan} index={i} />
              ))}
              {plans.length === 0 && !loading && (
                <div className="col-span-3 text-center py-12 text-gray-400">No plans in this category.</div>
              )}
            </motion.div>
          )}

          {/* CTA */}
          <div className="mt-16">
            <div className="bg-gradient-to-br from-navy-800 to-navy-600 rounded-3xl p-12 text-center">
              <h2 className="font-serif text-3xl text-white mb-3">Not Sure Which Plan to Choose?</h2>
              <p className="text-white/65 mb-7">Our expert advisor will recommend the perfect plan based on your age, income, and goals.</p>
              <Link to="/contact" className="btn-gold text-base px-10 py-4">Get Free Recommendation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
