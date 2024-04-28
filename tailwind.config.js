/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs3': {'min': '0px', 'max': '390px'},
      
      'xs': {'min': '0px', 'max': '640px'},

      'ss': {'min': '400px', 'max': '690px'},
      
      'xss': {'min': '0px', 'max': '1000px'},

      'size_I': {'min': '0px', 'max': '390px'},
      
      'size_II': {'min': '0px', 'max': '640px'},

      'size_III': {'min': '400px', 'max': '690px'},
      
      'size_IIII': {'min': '0px', 'max': '1000px'},

      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'auto-fill-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill-600': 'repeat(auto-fit, minmax(400px, 1fr))',
        'auto-fill-601': 'repeat(auto-fit, minmax(100%, 1fr))'
      },
    },
  },
  plugins: [],
}

