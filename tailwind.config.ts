import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        champagne: {
          50:  '#fdfaf4',
          100: '#f9f0dc',
          200: '#f2deb0',
          300: '#e8c87e',
          400: '#dcad52',
          500: '#c9963a',
          600: '#a87a2f',
          700: '#875f27',
          800: '#6e4d25',
          900: '#5c4023',
        },
        ivory: '#faf8f3',
        blush: '#f5e6e8',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'ken-burns': 'kenBurns 12s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-2%, -1%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

