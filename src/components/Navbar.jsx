import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About' },
  { to: '/plans',   label: 'LIC Plans' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : ''
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-navy-600 to-navy-400 rounded-xl flex items-center justify-center text-2xl shadow-md">
              🛡️
            </div>
            <div>
              <div className={`font-serif text-xl font-bold leading-tight transition-colors ${scrolled || !isHome ? 'text-gray-900' : 'text-white'}`}>
                Jeevan Shanthi
              </div>
              <div className="text-[10px] text-gold-600 tracking-widest uppercase font-sans">LIC Insurance Services</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-navy-50 text-navy-600'
                      : scrolled || !isHome
                        ? 'text-gray-700 hover:bg-navy-50 hover:text-navy-600'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link to="/contact" className="btn-gold ml-2 text-xs px-5 py-2.5">
              Free Consultation
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            {[0,1,2].map(i => (
              <span key={i} className={`block w-6 h-0.5 rounded transition-colors ${scrolled || !isHome ? 'bg-gray-900' : 'bg-white'}`} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] flex flex-col p-8 pt-20 shadow-2xl"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <button
                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >✕</button>
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-serif text-2xl font-semibold text-gray-800 py-4 border-b border-gray-100 hover:text-navy-600 transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link to="/contact" className="btn-gold mt-6 justify-center">
                Free Consultation
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
