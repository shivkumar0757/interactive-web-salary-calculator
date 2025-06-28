/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jetbrains: {
          blue: '#0066CC',
          purple: {
            500: '#883AE1',
            600: '#7B2CBF',
            700: '#6A1B9A'
          },
          pink: '#DA00FF',
          orange: '#FF6B35',
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F4',
            200: '#E8EAED',
            300: '#DADCE0',
            400: '#BDC1C6',
            500: '#9AA0A6',
            600: '#80868B',
            700: '#5F6368',
            800: '#3C4043',
            900: '#202124'
          }
        }
      },
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(135deg, #883AE1 0%, #DA00FF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      }
    },
  },
  plugins: [],
}