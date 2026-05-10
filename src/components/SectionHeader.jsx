import { motion } from 'framer-motion'

export default function SectionHeader({ tag, tagVariant = 'blue', title, subtitle, center = true }) {
  return (
    <motion.div
      className={`mb-14 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {tag && (
        <span className={`section-tag tag-${tagVariant} mb-3 inline-block`}>{tag}</span>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-3 leading-tight">
        {title}
      </h2>
      {center && <div className="divider" />}
      {subtitle && (
        <p className={`text-gray-500 text-lg leading-relaxed mt-3 ${center ? 'max-w-xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
