/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07101D",
        navy: "#0B1728",
        ivory: "#F3EDE2",
        beige: "#D8C7AE",
        champagne: "#B99A68",
        bronze: "#806744",
        charcoal: "#24262A",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Jost", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
