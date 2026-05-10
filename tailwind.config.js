/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#eaf4fb',
          100: '#c5dcf0',
          400: '#2e86c1',
          600: '#1a5276',
          800: '#0d3157',
          900: '#081a30',
        },
        gold: {
          50:  '#fdf6e3',
          100: '#f7e3a3',
          400: '#e0b840',
          600: '#c9a227',
          800: '#8a6d00',
        },
      },
      boxShadow: {
        card:   '0 4px 24px rgba(26,82,118,0.10)',
        'card-hover': '0 8px 48px rgba(26,82,118,0.18)',
        gold:   '0 8px 24px rgba(201,162,39,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.4)' },
          '70%':     { boxShadow: '0 0 0 12px rgba(201,162,39,0)' },
        },
      },
    },
  },
  plugins: [],
}
