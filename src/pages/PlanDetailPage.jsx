import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import PageHero from '../components/PageHero'
import Loader from '../components/Loader'
import { fetchPlanById, submitLead } from '../data/api'
import { CAT_COLORS } from '../data/constants'

function QuoteSidebar({ plan }) {
  const [form, setForm] = useState({ name: '', phone: '', planName: plan?.name || '', planId: plan?.planId || '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Name and phone are required'); return }
    if (!/^[6-9]\d{9}$/.test(form.phone)) { toast.error('Enter a valid 10-digit phone number'); return }
    setLoading(true)
    try {
      await submitLead({ ...form, source: 'plan-detail' })
      toast.success("Quote request sent! We'll call you within 24 hours.")
      setForm(f => ({ ...f, name: '', phone: '' }))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-navy-600 rounded-2xl p-7 text-white sticky top-24">
      <h3 className="font-serif text-2xl text-white mb-3">Get a Free Quote</h3>
      <p className="text-white/65 text-sm leading-relaxed mb-6">Our advisor will calculate exact premium & maturity benefit for your requirements.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-gray-400 font-sans"
          placeholder="Your Name *"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-gray-400 font-sans"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Request Quote →'}
        </button>
      </form>
      <a
        href="https://wa.me/919876543210"
        target="_blank" rel="noreferrer"
        className="mt-4 flex items-center justify-center gap-2 bg-[#25d366] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#20b85a] transition-colors"
      >
        💬 WhatsApp for Instant Reply
      </a>
      {/* Info boxes */}
      <div className="space-y-2.5 mt-5">
        {[['🎂','Your Age','Affects premium & sum assured'],['💼','Annual Income','Determines SA eligibility'],['🎯','Financial Goal','Protection / Savings / Retirement']].map(([icon, label, desc]) => (
          <div key={label} className="glass-card p-3.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{icon}</span>
              <span className="font-semibold text-sm">{label}</span>
            </div>
            <p className="text-white/55 text-xs">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlanDetailPage() {
  const { planId } = useParams()
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchPlanById(planId)
      .then(res => setPlan(res.data.data))
      .catch(() => setError('Plan not found.'))
      .finally(() => setLoading(false))
  }, [planId])

  if (loading) return <div className="pt-20"><Loader fullScreen /></div>
  if (error || !plan) return (
    <div className="pt-32 text-center min-h-screen">
      <p className="text-2xl text-gray-400 mb-4">{error || 'Plan not found'}</p>
      <Link to="/plans" className="btn-primary">← Back to Plans</Link>
    </div>
  )

  const colors = CAT_COLORS[plan.category] || CAT_COLORS.endowment

  return (
    <>
      <PageHero
        title={plan.name}
        subtitle="Complete plan details and benefits"
        crumbs={[{ label: 'LIC Plans', to: '/plans' }, { label: plan.name }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <motion.div
                className={`${colors.bg} rounded-2xl p-7 flex gap-5 items-start`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-6xl">{plan.icon}</div>
                <div>
                  <span className={`section-tag ${colors.badge} mb-2 inline-block`}>{plan.tag}</span>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                  <p className="text-gray-500 leading-relaxed text-sm">{plan.description}</p>
                </div>
              </motion.div>

              {/* Benefits */}
              <div className="card p-7">
                <h3 className="font-serif text-xl font-bold mb-5 flex items-center gap-2"><span>✅</span> Key Benefits</h3>
                <ul className="space-y-0">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="check-item">
                      <span className="check-dot">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility Grid */}
              <div className="card p-7">
                <h3 className="font-serif text-xl font-bold mb-5 flex items-center gap-2"><span>📋</span> Eligibility & Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    ['👥', 'Eligibility', plan.eligibility],
                    ['📅', 'Policy Term', plan.term],
                    ['💳', 'Premium Modes', plan.premiumModes],
                    ['💰', 'Min Sum Assured', plan.minSumAssured],
                    ['🏦', 'Loan Facility', 'Available after 2 years'],
                    ['📊', 'Tax Benefits', 'Sec 80C & 10(10D)'],
                  ].map(([icon, label, val]) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xl mb-1.5">{icon}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</div>
                      <div className="text-sm font-semibold text-gray-900 leading-snug">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why this plan */}
              <div className="card p-7">
                <h3 className="font-serif text-xl font-bold mb-3 flex items-center gap-2"><span>💡</span> Why This Plan?</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  This plan is ideal for individuals seeking a perfect balance of life protection and wealth creation. With LIC's trusted track record and government backing, your money is completely safe. The plan offers flexible premium payment options and attractive bonuses that accumulate over the policy term.
                </p>
              </div>

              <div className="flex gap-4 flex-wrap">
                <Link to="/plans" className="btn-outline">← Back to All Plans</Link>
                <Link to="/contact" className="btn-primary">Contact for Full Details →</Link>
              </div>
            </div>

            {/* Sidebar */}
            <QuoteSidebar plan={plan} />
          </div>
        </div>
      </section>
    </>
  )
}
