import { motion } from 'framer-motion'

export default function Loader({ fullScreen = false, text = 'Loading...' }) {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white">
        <motion.div
          className="w-14 h-14 border-4 border-navy-50 border-t-navy-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <p className="font-serif text-2xl text-navy-600 font-semibold">Jeevan Shanthi</p>
        <p className="text-sm text-gray-400">{text}</p>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        className="w-10 h-10 border-4 border-navy-50 border-t-navy-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
