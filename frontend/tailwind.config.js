/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      normal: ["Lexend", "serif"],
      variety: ["Rubik Doodle Shadow", "sans"],
    },
    extend: {
      colors: {
        "theme-color": "rgb(15 23 42)", // bg-slate-900
        "shade": "rgb(51 65 85)", // bg-slate-700
        "bluish": "rgb(37 99 235)"
      },
    },
  },
  plugins: [],
};
