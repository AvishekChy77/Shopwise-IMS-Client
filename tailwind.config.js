/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "'Poppins', sans-serif",
        logo:"'Lobster', sans-serif",
        YSerif:"'Young Serif', serif"
      },
      screens: {
        'desktop': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyui:{
  //   themes: ['light']
  // }
}

