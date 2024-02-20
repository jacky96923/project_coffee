/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      red: colors.red,
      blue: colors.blue,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      "light-brown": "#CB8A58",
      "dark-brown": "#562B1A",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
