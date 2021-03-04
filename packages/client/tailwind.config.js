const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover"],
      ringColor: ["hover"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/typography"),
  ],
};
