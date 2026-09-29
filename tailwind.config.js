/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  // Dark mode is toggled by adding the "dark" class on <html>
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
        },
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: { fadeUp: "fadeUp 0.4s ease-out both" },
    },
  },
  plugins: [],
};