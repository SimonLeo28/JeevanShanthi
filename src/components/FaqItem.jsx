import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl mb-3 overflow-hidden transition-colors ${open ? 'border-navy-400' : 'border-gray-200'}`}>
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-navy-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          className="w-7 h-7 rounded-full bg-navy-50 text-navy-600 flex items-center justify-center text-xl flex-shrink-0 font-light"
        >
          +
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
