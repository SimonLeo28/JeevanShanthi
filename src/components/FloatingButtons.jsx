import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi, I need LIC consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-3xl shadow-lg wa-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        💬
      </motion.a>

      {/* Sticky CTA — desktop only */}
      <motion.div
        className="hidden lg:flex fixed top-1/2 right-0 z-40"
        style={{ transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <Link
          to="/contact"
          className="bg-gold-600 hover:bg-navy-600 text-white text-xs font-bold tracking-widest uppercase
                     py-3 px-5 rounded-l-xl shadow-gold transition-all duration-300"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
        >
          Get Free Consultation
        </Link>
      </motion.div>
    </>
  )
}
