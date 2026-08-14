export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#030303",
        panel: "#0b0b0b",
        accent: "#d8d4cc",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      boxShadow: {
        premium: "0 35px 110px rgba(0, 0, 0, 0.36)",
      },
    },
  },
  plugins: [],
};
