/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix:"tw-",   
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'theme-black': '#37435b',
        'theme-dark-black': '#222536',
        'theme-dark-black1': 'linear-gradient(90deg, #000000, #C0C0C0)',


      },
      boxShadow: {
        'text-glow': '0 0 8px #FFF, 0 0 15px #FFF, 0 0 20px #FFF', // Customize this to get the desired glow effect
      },
      fontFamily:
      {
        'quattrocento-sans': ['Quattrocento Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
