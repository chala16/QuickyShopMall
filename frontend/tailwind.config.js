/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './src/**/*.html',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'image-slider':'#fea928',
        'image-slider-secondary':'#ed8900',
        'footer': '#705227',
        'sidebar-orange':'#FC6736',
        'sidebar-blue': '#0C2D57',
        'header-orange':'#FC6736',
        'client-brown':'#714433',
        'client-yellow':'#F9E4BC',
        'admin-gray':'#EFECEC',
        'dark-brown':"#6E260E",
        'dark-purple':"#081A51",
        "light-white":"rgba(255,255,255,0.17)"
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
