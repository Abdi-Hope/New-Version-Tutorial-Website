/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "false",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 0.3s ease-out",
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [],
};
