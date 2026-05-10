import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PageHero({ title, subtitle, crumbs = [] }) {
  return (
    <section className="bg-gradient-to-br from-navy-800 via-navy-600 to-[#1a6890] pt-28 pb-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {crumbs.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>›</span>
                {c.to ? <Link to={c.to} className="hover:text-white transition-colors">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
              </span>
            ))}
          </div>
        )}
        <motion.h1
          className="font-serif text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-white/65 text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
