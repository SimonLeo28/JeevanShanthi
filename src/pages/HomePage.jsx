import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../components/SectionHeader'
import FaqItem from '../components/FaqItem'
import { TESTIMONIALS, FAQS } from '../data/constants'
import usePlans from '../hooks/usePlans'
import PlanCard from '../components/PlanCard'
import Loader from '../components/Loader'

function StatCard({ end, suffix, label, prefix = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl font-bold text-gold-400 leading-none">
        {inView ? <CountUp end={end} duration={2} suffix={suffix} prefix={prefix} separator="," /> : `${prefix}0${suffix}`}
      </div>
      <div className="text-white/55 text-sm mt-2">{label}</div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
}

export default function HomePage() {
  const { plans, loading } = usePlans('all')
  const popularPlans = plans.filter(p => p.isPopular).slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-600 to-[#1a6890] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        {/* Orbs */}
        <div className="absolute w-96 h-96 bg-gold-600/10 rounded-full -top-32 -right-20 blur-3xl" />
        <div className="absolute w-64 h-64 bg-navy-400/15 rounded-full -bottom-16 -left-10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 bg-gold-600/20 border border-gold-400/40 rounded-full px-4 py-1.5 mb-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              <span className="text-gold-300 text-sm font-medium">⭐ Trusted LIC Agent Since 2005</span>
            </motion.div>

            <motion.h1
              className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-5"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              Secure Your Future with{' '}
              <em className="not-italic text-gold-300">Trusted</em> LIC Plans
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            >
              Expert guidance for life insurance, savings & retirement. Protecting families across Karnataka with personalised LIC solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/plans" className="btn-gold text-base px-8 py-4">Explore Plans →</Link>
              <Link to="/contact" className="btn-outline-white text-base px-8 py-4">Contact Now</Link>
            </motion.div>

            {/* Hero stats */}
            <motion.div
              className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/15"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              {[['2000', '+', 'Happy Families'], ['19', '+', 'Years Experience'], ['98', '%', 'Claim Success']].map(([n, s, l]) => (
                <div key={l}>
                  <div className="font-serif text-4xl font-bold text-gold-300">{n}<span>{s}</span></div>
                  <div className="text-white/50 text-xs mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[['🏆', 'LIC Certified Agent'], ['📜', 'IRDA Licensed'], ['🤝', '2000+ Clients'], ['⭐', '19+ Years Exp'], ['🔒', '100% Secure']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-gray-500">
                <div className="w-9 h-9 bg-navy-50 rounded-lg flex items-center justify-center text-lg">{icon}</div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PLAN OVERVIEW ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            tag="Our Services"
            title="Plans for Every Life Stage"
            subtitle="Whether you're planning for your family's protection, your children's future, or a comfortable retirement — we have the right LIC plan."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', bg: 'bg-navy-50', title: 'Protection Plans', desc: "Pure term insurance providing maximum life cover for your family at the lowest premiums.", items: ['Jeevan Amar', 'Tech Term', 'Saral Jeevan Bima'], cat: 'term' },
              { icon: '💰', bg: 'bg-gold-50', title: 'Savings Plans', desc: 'Endowment and money-back plans combining savings with insurance protection and bonuses.', items: ['Jeevan Anand', 'New Endowment', 'Jeevan Labh'], cat: 'endowment' },
              { icon: '🏡', bg: 'bg-green-50', title: 'Retirement Plans', desc: 'Pension and annuity plans ensuring financial independence and regular income after retirement.', items: ['Jeevan Shanti', 'Jeevan Akshay', 'New Jeevan Nidhi'], cat: 'pension' },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                className="card p-8"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 ${p.bg} rounded-2xl flex items-center justify-center text-3xl mb-5`}>{p.icon}</div>
                <h3 className="font-serif text-2xl font-bold mb-2.5">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-1.5 mb-6">
                  {p.items.map(item => (
                    <li key={item} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-600 inline-block" />{item}
                    </li>
                  ))}
                </ul>
                <Link to={`/plans?category=${p.cat}`} className="text-navy-600 text-sm font-semibold hover:text-navy-400 transition-colors">
                  View Plans →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTERS ── */}
      <section className="py-16 bg-navy-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard end={2000} suffix="+" label="Happy Families" />
            <StatCard end={19} suffix="+" label="Years Experience" />
            <StatCard end={5000} suffix="+" label="Policies Sold" />
            <StatCard end={98} suffix="%" label="Claim Success Rate" />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="section-tag tag-gold mb-4 inline-block">Why Choose Us</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">
                Your Financial Security is Our Priority
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                With nearly two decades of experience helping families across Andhra Pradesh, Jeevan Shanthi offers unmatched personalised service, transparent advice, and lifetime support.
              </p>
              <div className="space-y-5">
                {[
                  { icon: '🎯', title: 'Personalised Guidance', desc: 'We analyse your unique financial situation and recommend the most suitable LIC plan.' },
                  { icon: '📞', title: 'Lifetime After-Sales Support', desc: 'Premium reminders, policy reviews, and claim assistance — always available.' },
                  { icon: '⚡', title: 'Quick & Hassle-Free Process', desc: 'Fast policy issuance and seamless claim settlement with complete documentation support.' },
                  { icon: '🔍', title: 'Complete Transparency', desc: 'No hidden charges. Every plan explained in simple language with full premium breakdowns.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-navy-600 rounded-3xl p-12 text-white text-center"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="text-8xl mb-4 animate-float">🛡️</div>
              <h3 className="font-serif text-3xl text-white mb-3">LIC — India's Most Trusted</h3>
              <p className="text-white/65 leading-relaxed mb-8">Government-backed, 65+ years of trust, ₹40+ lakh crore in total assets under management.</p>
              {[['AAA', 'Sovereign Guarantee'], ['65+', 'Years of Legacy'], ['₹40L Cr+', 'Assets Managed']].map(([n, l]) => (
                <div key={l} className="glass-card flex justify-between items-center p-4 mb-3 text-left">
                  <span className="text-white/65 text-sm">{l}</span>
                  <span className="text-gold-300 font-bold text-lg font-serif">{n}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PLANS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader tag="Top Picks" tagVariant="blue" title="Most Popular LIC Plans" subtitle="Time-tested plans most recommended for comprehensive protection and wealth creation." />
          {loading ? <Loader /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(popularPlans.length > 0 ? popularPlans : plans.slice(0, 3)).map((plan, i) => (
                <PlanCard key={plan._id} plan={plan} index={i} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/plans" className="btn-primary text-base px-10 py-4">View All LIC Plans →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gradient-to-br from-navy-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader tag="Client Stories" tagVariant="gold" title="Trusted by 2000+ Families" subtitle="Hear from real clients whose lives we've helped secure." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="card p-7 relative"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="absolute top-4 right-6 font-serif text-7xl text-navy-50 leading-none select-none">"</div>
                <div className="text-gold-400 text-lg mb-3">{'★'.repeat(t.rating)}</div>
                <p className="text-sm text-gray-600 italic leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-600 to-navy-400 flex items-center justify-center text-white font-semibold text-sm">{t.initials}</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">📍 {t.loc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-tag tag-blue mb-4 inline-block">Common Questions</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">Frequently Asked Questions</h2>
              <p className="text-gray-500 leading-relaxed mb-8">Have questions about LIC plans? Here are answers to the most common queries from our clients.</p>
              <Link to="/contact" className="btn-primary">Ask a Question →</Link>
            </div>
            <div>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-navy-800 to-[#1a6890] rounded-3xl p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -left-10 w-60 h-60 bg-gold-600/10 rounded-full blur-3xl" />
            <span className="section-tag tag-gold mb-5 inline-block">Limited Time Offer</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Get Your FREE Insurance Consultation Today</h2>
            <p className="text-white/65 text-lg max-w-lg mx-auto mb-8 leading-relaxed">Our expert advisor will analyse your needs and recommend the perfect LIC plan — absolutely no obligation, no pressure.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="btn-gold text-base px-10 py-4">Book Free Consultation</Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-outline-white text-base px-8 py-4">💬 WhatsApp Now</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
