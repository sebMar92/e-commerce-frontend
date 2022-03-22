module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        lora: "'Lora',serif",
        dm: "'DM Mono', monospace",
      },
      screens: {
        xs: "500px",
        xxl: "1800px",
      },
      colors: {
        dark: "#34373c",
        primary: {
          100: "#FFE9CF",
          200: "#FFDAAF",
          300: "#FFCF96",
          400: "#FEBD70",
          500: "#FFAC4B",
          600: "#FFA438",
          700: "#FF9921",
        },
        secondary: {
          100: "#EEEEEE",
          200: "#808080",
          500: "#535252",
          700: "#424242",
          900: "#2E2D2D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
