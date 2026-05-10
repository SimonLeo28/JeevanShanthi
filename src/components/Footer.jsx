import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-900 text-white/70 pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-navy-600 to-navy-400 rounded-xl flex items-center justify-center text-2xl">🛡️</div>
              <div>
                <div className="font-serif text-xl font-bold text-white">Jeevan Shanthi</div>
                <div className="text-[10px] text-gold-400 tracking-widest uppercase">LIC Insurance Services</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Trusted LIC insurance advisory helping families across Karnataka secure their financial future since 2005.
            </p>
            <div className="flex gap-3 mt-5">
              {['📘','📸','🐦'].map(icon => (
                <div key={icon} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-lg cursor-pointer hover:bg-white/20 transition-colors">{icon}</div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            {[['/', 'Home'], ['/about', 'About'], ['/plans', 'LIC Plans'], ['/contact', 'Contact']].map(([to, label]) => (
              <div key={to} className="mb-2.5">
                <Link to={to} className="text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            {[['📞', '+91 9148570090'], ['📧', 'wa9696@gmail.com'], ['📍', 'Bangalore, Karnataka']].map(([icon, val]) => (
              <div key={val} className="flex gap-2 mb-3 items-start">
                <span className="text-base mt-0.5">{icon}</span>
                <span className="text-sm text-white/50">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <span>© {year} Jeevan Shanthi LIC Insurance Services. All rights reserved.</span>
          <span>Licensed Insurance Advisor | LIC Agent</span>
        </div>
      </div>
    </footer>
  )
}
