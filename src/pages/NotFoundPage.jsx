import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <motion.div
        className="text-center px-6"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      >
        <div className="text-8xl mb-6">🛡️</div>
        <h1 className="font-serif text-6xl font-bold text-navy-600 mb-4">404</h1>
        <h2 className="font-serif text-2xl text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist. Let us help you find what you need.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/" className="btn-primary">← Go Home</Link>
          <Link to="/plans" className="btn-outline">View LIC Plans</Link>
        </div>
      </motion.div>
    </div>
  )
}
