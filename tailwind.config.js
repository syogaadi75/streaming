/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#facc15',
        secondary: '#F47A04',
        light: '#f5f5f5',
        dark: '#27272a',
      },
      backgroundImage: {
        'cover-op': "url('./img/cover/op.jpg')",
        'cover-opm': "url('./img/cover/opm.jpg')",
        'cover-kaguya': "url('./img/cover/kaguya.jpg')",
        'cover-yourname': "url('./img/cover/yourname.jpg')",
        'cover-spy': "url('./img/cover/spy.jpg')",
        'cover-spyfamily': "url('./img/cover/spyfamily.png')",
        'cover-naruto': "url('./img/cover/naruto.jpg')",
        'cover-bcl': "url('./img/cover/black clover.jpg')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}