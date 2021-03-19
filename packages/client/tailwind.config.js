const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      maxWidth: {
        72: "288px",
      },
    },
    animation: {
      "spin-fast": "spin .75s linear infinite",
    },
    fontFamily: {
      body: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      display: ["Eudoxus Sans", "system-ui", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      navy: "#01055E",
      black: "#090808",
      transparent: "transparent",
      slate: { light: "#8C8CA1", dark: "#3E4E6B" },
      gray: {
        50: "#F9FAFB",
        100: "#F4F4F5",
        200: "#E4E4E7",
        300: "#D4D4D8",
        400: "#A1A1AA",
        500: "#737881",
        600: "#5A5F66",
        700: "#40454E",
        800: "#262A31",
        900: "#1B1E23",
      },
      primary: {
        100: "#EDF3FF",
        200: "#B4CEFF",
        300: "#87B1FE",
        400: "#578EF3",
        500: "#276EF1",
        600: "#1660E9",
        700: "#0A50D0",
      },
      red: {
        100: "#FFD2D2",
        200: "#FFA9A9",
        300: "#EF7777",
        400: "#F26565",
        500: "#E73E3E",
        600: "#DD2D2D",
        700: "#CC1F1F",
      },
      indigo: colors.indigo,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
