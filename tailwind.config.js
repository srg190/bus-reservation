/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: ['class'],
  theme: {
    colors: {
      primary: '#ce565b',
      secondary: {
        100: '#f3f4f6',
        200: '#e5e5e5',
        300: '#cecccc',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252'
      },
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
}

