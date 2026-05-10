import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Jeevan Shanthi"
        subtitle="Your trusted partner for financial security since 2005"
        crumbs={[{ label: 'About' }]}
      />

      {/* ── AGENT INTRO ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="bg-gradient-to-br from-navy-600 to-navy-400 rounded-3xl p-12 text-white text-center">
                <div className="text-8xl mb-5">👨‍💼</div>
                <h3 className="font-serif text-3xl text-white mb-2">S. Venkat Rao</h3>
                <p className="text-white/65 mb-8">Senior LIC Agent & Financial Advisor</p>
                <div className="grid grid-cols-2 gap-3">
                  {[['2005', 'Year Started'], ['2000+', 'Clients Served'], ['5000+', 'Policies Issued'], ['98%', 'Claim Success']].map(([n, l]) => (
                    <div key={l} className="glass-card p-4">
                      <div className="font-serif text-2xl font-bold text-gold-300">{n}</div>
                      <div className="text-xs text-white/55 mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="section-tag tag-gold mb-4 inline-block">Our Story</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">
                Nearly Two Decades of Protecting Families
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Founded in 2005, Jeevan Shanthi has grown from a single-agent practice to a trusted name in insurance advisory across Andhra Pradesh. We believe every family deserves financial security regardless of income level.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our mission is simple: recommend the right LIC plan for the right person at the right time — with complete transparency and lifetime after-sales support. We're not just selling policies; we're building long-term relationships.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🎓', label: 'B.Com Graduate, Certified LIC Agent' },
                  { icon: '📜', label: 'IRDA Licensed Insurance Advisor' },
                  { icon: '🏆', label: "LIC's Top Performing Agent Award (2018, 2021)" },
                  { icon: '🌐', label: 'Serving clients across Andhra Pradesh & Telangana' },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-3 p-3.5 bg-navy-50 rounded-xl">
                    <span className="text-2xl">{b.icon}</span>
                    <span className="text-sm font-medium text-navy-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader tag="Why Choose Us" title="The Jeevan Shanthi Difference" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '🤝', title: 'Personal Relationship', desc: 'We know our clients by name, not policy number. Personal attention at every step.' },
              { icon: '📞', title: '24/7 Availability', desc: "Questions at midnight? Premium due reminder? We're always just a call or WhatsApp away." },
              { icon: '🔍', title: 'Needs-Based Advice', desc: 'We listen first, recommend later. No plan is pushed — only what truly fits your life.' },
              { icon: '⚡', title: 'Fast Policy Issuance', desc: 'Paperwork sorted within 24–48 hours. Policy documents delivered promptly.' },
              { icon: '📋', title: 'Claim Assistance', desc: 'We personally assist your family with the entire claim process during difficult times.' },
              { icon: '📈', title: 'Annual Policy Review', desc: 'Your life changes — your insurance should too. Free annual review for all clients.' },
            ].map((item, i) => (
              <motion.div key={item.title} className="card p-7 text-center" custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="section-tag tag-blue mb-4 inline-block">Our Mission</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            "Every family deserves financial security — regardless of income"
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We are committed to simplifying the insurance process, educating clients about their options, and being there every step of the way — from policy purchase to claim settlement.
          </p>
          <Link to="/contact" className="btn-gold text-base px-10 py-4">Book Free Consultation</Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-navy-800 to-navy-600 rounded-3xl p-12 text-center">
            <h2 className="font-serif text-4xl text-white mb-4">Ready to Secure Your Future?</h2>
            <p className="text-white/65 mb-8">Let's have a conversation about your financial goals.</p>
            <Link to="/contact" className="btn-gold text-base px-10 py-4">Book Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  )
}
