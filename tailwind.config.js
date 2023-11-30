/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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
      }
    },
  },
  plugins: [require("daisyui")],
  // daisyui:{
  //   themes: ['light']
  // }
}

