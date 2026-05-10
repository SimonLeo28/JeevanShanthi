import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CAT_COLORS } from '../data/constants'

export default function PlanCard({ plan, index = 0 }) {
  const colors = CAT_COLORS[plan.category] || CAT_COLORS.endowment

  return (
    <motion.div
      className="card flex flex-col overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="p-7 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center text-3xl`}>
            {plan.icon}
          </div>
          {plan.tag && (
            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
              {plan.tag}
            </span>
          )}
        </div>
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-navy-600 transition-colors">
          {plan.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{plan.description}</p>
      </div>

      {/* Benefits */}
      <div className="p-7 flex-1 flex flex-col">
        <ul className="flex-1">
          {(plan.benefits || []).slice(0, 4).map((b, i) => (
            <li key={i} className="check-item">
              <span className="check-dot">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          to={`/plans/${plan.planId}`}
          className="btn-outline w-full justify-center mt-5 text-sm py-3"
        >
          Get Details →
        </Link>
      </div>
    </motion.div>
  )
}
