import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import PageHero from '../components/PageHero'
import { submitContact } from '../data/api'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(form.phone)) { toast.error('Enter a valid 10-digit Indian phone number'); return }
    setLoading(true)
    try {
      await submitContact(form)
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', message: '' })
      toast.success('Message sent! We will contact you within 24 hours.')
    } catch (err) {
      const errMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to send. Please try again.'
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach us through any channel below."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left: contact info */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="section-tag tag-blue mb-4 inline-block">Get In Touch</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Let's Talk About Your Financial Future
              </h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                Whether you want to know more about a specific LIC plan, need help with a claim, or want a free financial review — we're just a message away.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { icon: '📞', title: 'Phone', val: '+91 9148570090', sub: 'Mon–Sat, 9 AM to 7 PM', href: 'tel:+91 9148570090' },
                  { icon: '📧', title: 'Email', val: 'jeevanshantilic@gmail.com', sub: 'Reply within 24 hours', href: 'mailto:wa9696@gmail.com' },
                  { icon: '💬', title: 'WhatsApp', val: '+91 9148570090', sub: 'Quick replies, send documents', href: 'https://wa.me/9148570090' },
                  { icon: '📍', title: 'Office', val: 'Bengaluru Karnataka', sub: 'Kalyan Nagar', href: '#' },
                ].map((c, i) => (
                  <motion.a
                    key={c.title}
                    href={c.href}
                    target={c.icon === '💬' ? '_blank' : undefined}
                    rel={c.icon === '💬' ? 'noreferrer' : undefined}
                    className="flex items-start gap-4 no-underline group"
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-navy-100 transition-colors">{c.icon}</div>
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-widest mb-0.5">{c.title}</div>
                      <div className="font-semibold text-gray-900 text-base">{c.val}</div>
                      <div className="text-xs text-gray-400">{c.sub}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-navy-600 rounded-2xl p-6 flex items-center gap-5">
                <span className="text-4xl">💬</span>
                <div className="flex-1">
                  <div className="font-semibold text-white mb-1">WhatsApp for Instant Support</div>
                  <p className="text-white/65 text-xs mb-3">Send queries, documents, or just say hello!</p>
                  <a
                    href="https://wa.me/9148570090?text=Hi, I need LIC consultation"
                    target="_blank" rel="noreferrer"
                    className="inline-block bg-[#25d366] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#20b85a] transition-colors"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              className="bg-white rounded-2xl p-10 shadow-card-hover border border-gray-100"
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h3 className="font-serif text-2xl font-bold mb-2">Send Us a Message</h3>
              <p className="text-gray-400 text-sm mb-7">We'll get back to you within 24 hours.</p>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm font-medium mb-6 flex items-center gap-2">
                  ✅ Message sent successfully! We'll contact you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Full Name *</label>
                  <input className="form-input" placeholder="Your full name" value={form.name} onChange={set('name')} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Phone Number *</label>
                  <input className="form-input" placeholder="10-digit mobile number" value={form.phone} onChange={set('phone')} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
                  <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Message / Query *</label>
                  <textarea
                    className="form-input min-h-[120px] resize-y"
                    placeholder="Tell us about your insurance needs, preferred plans, or any questions..."
                    value={form.message}
                    onChange={set('message')}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Message...' : 'Send Message →'}
                </button>
                <p className="text-center text-xs text-gray-400">🔒 Your information is 100% secure and will not be shared.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-10">Working Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Monday – Friday', '9:00 AM – 7:00 PM', 'open'],
              ['Saturday', '10:00 AM – 5:00 PM', 'open'],
              ['Sunday', 'Emergency calls only', 'limited'],
            ].map(([day, time, status]) => (
              <div key={day} className="card p-6 text-center">
                <div className="font-semibold text-gray-900 mb-2">{day}</div>
                <div className="font-serif text-xl text-navy-600 mb-3">{time}</div>
                <span className={`section-tag ${status === 'open' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {status === 'open' ? 'Open' : 'Limited'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
