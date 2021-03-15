module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      body: ["Inter", "system-ui", "sans-serif"],
      display: ["Eudoxus Sans", "system-ui", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      navy: "#01055E",
      black: "#090808",
      slate: { light: "#8C8CA1", dark: "#3E4E6B" },
      gray: {
        50: "#F9F9F9",
        100: "#E7E7E7",
        200: "#C9C9C9",
        300: "#ACACAF",
        400: "#818187",
        500: "#656570",
        600: "#4B4B53",
        700: "#353539",
        800: "#29292D",
        900: "#1B1B1E",
        1000: "#0B0B0C",
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
    },
  },
  variants: {
    extend: {
      ringColor: ["hover"],
    },
  },
  plugins: [],
};
