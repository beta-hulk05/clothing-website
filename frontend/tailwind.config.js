/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e0d7fe', // light purple
          200: '#c4b5fd', // lighter purple
          300: '#a78bfa', // light purple
          400: '#8b5cf6', // purple
          500: '#7c3aed', // medium purple
          600: '#6d28d9', // medium-dark purple
          700: '#5b21b6', // dark purple
          800: '#4c1d95', // darker purple
          900: '#2e1065', // very dark purple
        },
        secondary: {
          100: '#dbeafe', // light indigo
          200: '#bfdbfe', // lighter indigo
          300: '#93c5fd', // light indigo
          400: '#60a5fa', // indigo
          500: '#3b82f6', // medium indigo
          600: '#2563eb', // medium-dark indigo
          700: '#1d4ed8', // dark indigo
          800: '#1e40af', // darker indigo
          900: '#1e3a8a', // very dark indigo
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}