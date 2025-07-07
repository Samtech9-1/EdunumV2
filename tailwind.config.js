/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'guinea-red': {
          DEFAULT: '#b91c1c',
          light: '#dc2626',
          dark: '#991b1b',
        },
        'guinea-yellow': {
          DEFAULT: '#d97706',
          light: '#f59e0b',
          dark: '#b45309',
        },
        'guinea-green': {
          DEFAULT: '#047857',
          light: '#059669',
          dark: '#065f46',
        },
        'accent-blue': {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a',
        },
        'accent-teal': {
          DEFAULT: '#0f766e',
          light: '#14b8a6',
          dark: '#134e4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'guinea-green': '0 10px 15px -3px rgba(4, 120, 87, 0.1), 0 4px 6px -2px rgba(4, 120, 87, 0.05)',
        'guinea-yellow': '0 10px 15px -3px rgba(217, 119, 6, 0.1), 0 4px 6px -2px rgba(217, 119, 6, 0.05)',
        'guinea-red': '0 10px 15px -3px rgba(185, 28, 28, 0.1), 0 4px 6px -2px rgba(185, 28, 28, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};