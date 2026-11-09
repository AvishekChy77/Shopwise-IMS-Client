/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "'Poppins', sans-serif",
        display: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      },
      colors: {
        brand: {
          50: "#f1f7fb",
          100: "#dcebf5",
          200: "#bcd8ec",
          300: "#8ebcdd",
          400: "#5898c9",
          500: "#357cb2",
          600: "#276396",
          700: "#265073",
          800: "#224566",
          900: "#213b56",
          950: "#16263a",
        },
        leaf: {
          50: "#f6faee",
          100: "#eaf3da",
          200: "#d6e8b9",
          300: "#b9d78e",
          400: "#a2c579",
          500: "#7fa94e",
          600: "#62873a",
          700: "#4c682f",
          800: "#3f5429",
          900: "#374826",
          950: "#1b2710",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgb(38 80 115 / 0.10)",
        lift: "0 18px 40px -12px rgb(38 80 115 / 0.25)",
      },
      screens: {
        desktop: "1440px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    logs: false,
  },
};
