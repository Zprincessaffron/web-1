/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        'scrollbar-thumb': '#ccc', // Customize scrollbar thumb color
        'scrollbar-track': '#f5f5f5', // Customize scrollbar track color
      },
      saffron: {
        light: '#F8C471', // Light saffron
        DEFAULT: '#F5B041', // Default saffron
        dark: '#E67E22', // Dark saffron
      },
      backgroundImage: {
        'custom-pattern': "url('./public/productbg.jpeg')",
      },
    },
  },
  plugins: [],
}