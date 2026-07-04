/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EE",
        gold: "#D4A017",
        ember: "#E85D28",
        maroon: "#8B1E1E",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(139, 30, 30, 0.08)",
      },
    },
  },
  plugins: [],
}
